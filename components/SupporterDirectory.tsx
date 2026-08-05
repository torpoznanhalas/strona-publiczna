"use client";

import { UIEvent, useCallback, useEffect, useRef, useState } from "react";

type PublicSupporter = {
  firstName: string;
  lastInitial: string;
  city: string;
  postalCode: string;
  createdAt: string;
};

type SupportersResponse = {
  supporters?: PublicSupporter[];
  publicCount?: number;
  hasMore?: boolean;
};

type LoadMode = "replace" | "append" | "refresh";

const PAGE_SIZE = 50;

const dateFormatter = new Intl.DateTimeFormat("pl-PL", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  timeZone: "Europe/Warsaw"
});

function formatPlace(supporter: PublicSupporter) {
  return supporter.postalCode
    ? `${supporter.city}, ${supporter.postalCode}`
    : supporter.city;
}

function getSupporterKey(supporter: PublicSupporter) {
  return `${supporter.firstName}-${supporter.lastInitial}-${supporter.city}-${supporter.createdAt}`;
}

function mergeUnique(first: PublicSupporter[], second: PublicSupporter[]) {
  const seen = new Set<string>();
  return [...first, ...second].filter((supporter) => {
    const key = getSupporterKey(supporter);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function SupporterDirectory() {
  const [supporters, setSupporters] = useState<PublicSupporter[]>([]);
  const [publicCount, setPublicCount] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const supportersRef = useRef<PublicSupporter[]>([]);
  const loadingRef = useRef(false);

  const loadPage = useCallback(async (offset: number, mode: LoadMode) => {
    if (loadingRef.current) return;

    loadingRef.current = true;
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `/api/supporters?limit=${PAGE_SIZE}&offset=${offset}`,
        { cache: "no-store" }
      );

      if (!response.ok) {
        throw new Error("Nie udało się pobrać listy osób wspierających.");
      }

      const data = (await response.json()) as SupportersResponse;
      const nextSupporters = Array.isArray(data.supporters) ? data.supporters : [];
      const total = Number(data.publicCount) || 0;
      let merged: PublicSupporter[];

      if (mode === "replace") {
        merged = nextSupporters;
      } else if (mode === "refresh") {
        merged = mergeUnique(nextSupporters, supportersRef.current);
      } else {
        merged = mergeUnique(supportersRef.current, nextSupporters);
      }

      supportersRef.current = merged;
      setSupporters(merged);
      setPublicCount(total);
      setHasMore(merged.length < total);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Nie udało się pobrać listy osób wspierających."
      );
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const refresh = () => {
      void loadPage(0, supportersRef.current.length === 0 ? "replace" : "refresh");
    };

    refresh();
    const timer = window.setInterval(refresh, 30000);
    window.addEventListener("supporter-added", refresh);

    return () => {
      window.clearInterval(timer);
      window.removeEventListener("supporter-added", refresh);
    };
  }, [loadPage]);

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    const element = event.currentTarget;
    const distanceFromBottom =
      element.scrollHeight - element.scrollTop - element.clientHeight;

    if (distanceFromBottom < 120 && hasMore && !loading) {
      void loadPage(supportersRef.current.length, "append");
    }
  };

  return (
    <div className="supporter-directory">
      <div className="supporter-directory-header">
        <div>
          <p className="supporter-directory-eyebrow">Publiczna lista poparcia</p>
          <h3>Osoby, które dołączyły</h3>
        </div>
        <span className="supporter-directory-count">{publicCount}</span>
      </div>
      <div
        className="supporter-directory-scroll"
        onScroll={handleScroll}
        tabIndex={0}
        aria-label="Przewijana lista osób wspierających inicjatywę"
      >
        <ol className="supporter-directory-list">
          {supporters.map((supporter) => (
            <li
              className="supporter-directory-row"
              key={getSupporterKey(supporter)}
            >
              <strong>
                {supporter.firstName} {supporter.lastInitial}.
              </strong>
              <span>{formatPlace(supporter)}</span>
              <time dateTime={supporter.createdAt}>
                {dateFormatter.format(new Date(supporter.createdAt))}
              </time>
            </li>
          ))}
        </ol>

        {loading && (
          <p className="supporter-directory-message" aria-live="polite">
            Ładuję kolejne osoby…
          </p>
        )}

        {!loading && supporters.length === 0 && !error && (
          <p className="supporter-directory-message">
            Pierwsze wpisy pojawią się tutaj automatycznie po dołączeniu.
          </p>
        )}

        {error && (
          <p className="supporter-directory-message supporter-directory-error">
            {error}
          </p>
        )}

        {!loading && hasMore && supporters.length > 0 && (
          <button
            className="supporter-directory-more"
            type="button"
            onClick={() => void loadPage(supportersRef.current.length, "append")}
          >
            Pokaż kolejne osoby
          </button>
        )}

        {!hasMore && supporters.length > 0 && (
          <p className="supporter-directory-message">
            To wszystkie osoby znajdujące się obecnie na publicznej liście poparcia.
          </p>
        )}
      </div>
    </div>
  );
}
