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
const INITIAL_PUBLIC_SUPPORTERS_COUNT = 57;
const SUPPORTERS_COUNT_STORAGE_KEY = "tor-poznan-public-supporters-count";

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
  displayCount: number;
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

function getPublicCount(data: SupportersResponse) {
  const count = Number(data.publicCount ?? data.count);
  return Number.isFinite(count) && count >= 0 ? count : null;
}

function readStoredCount() {
  try {
    const storedCount = window.localStorage.getItem(SUPPORTERS_COUNT_STORAGE_KEY);
    if (storedCount === null) return null;

    const count = Number(storedCount);
    return Number.isFinite(count) && count >= 0 ? count : null;
  } catch {
    return null;
  }
}

function storeCount(count: number) {
  try {
    window.localStorage.setItem(SUPPORTERS_COUNT_STORAGE_KEY, String(count));
  } catch {
    // Licznik nadal działa, gdy przeglądarka blokuje localStorage.
  }
}

export function SupportersProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SupportersResponse | null>(null);
  const [displayCount, setDisplayCount] = useState(INITIAL_PUBLIC_SUPPORTERS_COUNT);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const applyData = useCallback((nextData: SupportersResponse) => {
    setData(nextData);

    const nextCount = getPublicCount(nextData);
    if (nextCount === null) return;

    setDisplayCount(nextCount);
    storeCount(nextCount);
  }, []);

  const load = useCallback(async (mode: LoadMode) => {
    setLoading(true);
    setError("");

    try {
      const nextData =
        mode === "initial"
          ? await requestInitialData()
          : await requestFirstPage(mode === "bypass-cache");
      applyData(nextData);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Nie udało się pobrać listy osób wspierających."
      );
    } finally {
      setLoading(false);
    }
  }, [applyData]);

  useEffect(() => {
    let active = true;
    const storedCount = readStoredCount();
    const storedCountTimer =
      storedCount === null
        ? null
        : window.setTimeout(() => {
            if (active) setDisplayCount(storedCount);
          }, 0);

    requestInitialData()
      .then((nextData) => {
        if (active) applyData(nextData);
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
      if (storedCountTimer !== null) window.clearTimeout(storedCountTimer);
      window.clearInterval(timer);
      window.removeEventListener("supporter-added", handleSupporterAdded);
    };
  }, [applyData, load]);

  return (
    <SupportersContext.Provider value={{ data, displayCount, loading, error }}>
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
