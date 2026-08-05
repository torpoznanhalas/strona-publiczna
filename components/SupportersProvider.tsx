"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState
} from "react";

export const SUPPORTERS_PAGE_SIZE = 50;

export type PublicSupporter = {
  firstName: string;
  lastInitial: string;
  city: string;
  postalCode: string;
  createdAt: string;
};

export type SupportersResponse = {
  count?: number;
  publicCount?: number;
  supporters?: PublicSupporter[];
  hasMore?: boolean;
};

type SupportersContextValue = {
  data: SupportersResponse | null;
  loading: boolean;
  error: string;
};

type LoadMode = "initial" | "refresh" | "bypass-cache";

const SupportersContext = createContext<SupportersContextValue | null>(null);

let initialRequest: Promise<SupportersResponse> | null = null;
let initialRequestStartedAt = 0;

async function requestFirstPage(bypassCache = false) {
  const response = await fetch(
    `/api/supporters?limit=${SUPPORTERS_PAGE_SIZE}&offset=0`,
    bypassCache ? { cache: "no-store" } : undefined
  );

  if (!response.ok) {
    throw new Error("Nie udało się pobrać listy osób wspierających.");
  }

  return (await response.json()) as SupportersResponse;
}

function requestInitialData() {
  const now = Date.now();

  if (!initialRequest || now - initialRequestStartedAt >= 30000) {
    initialRequest = requestFirstPage();
    initialRequestStartedAt = now;
  }

  return initialRequest;
}

export function SupportersProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SupportersResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async (mode: LoadMode) => {
    setLoading(true);
    setError("");

    try {
      const nextData =
        mode === "initial"
          ? await requestInitialData()
          : await requestFirstPage(mode === "bypass-cache");
      setData(nextData);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Nie udało się pobrać listy osób wspierających."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;

    requestInitialData()
      .then((nextData) => {
        if (active) setData(nextData);
      })
      .catch((caughtError) => {
        if (!active) return;
        setError(
          caughtError instanceof Error
            ? caughtError.message
            : "Nie udało się pobrać listy osób wspierających."
        );
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    const timer = window.setInterval(() => void load("refresh"), 30000);
    const handleSupporterAdded = () => void load("bypass-cache");
    window.addEventListener("supporter-added", handleSupporterAdded);

    return () => {
      active = false;
      window.clearInterval(timer);
      window.removeEventListener("supporter-added", handleSupporterAdded);
    };
  }, [load]);

  return (
    <SupportersContext.Provider value={{ data, loading, error }}>
      {children}
    </SupportersContext.Provider>
  );
}

export function useSupporters() {
  const context = useContext(SupportersContext);

  if (!context) {
    throw new Error("useSupporters wymaga SupportersProvider.");
  }

  return context;
}
