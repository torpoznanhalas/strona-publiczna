"use client";

import { UIEvent, useCallback, useEffect, useRef, useState } from "react";
import {
  PublicSupporter,
  SUPPORTERS_PAGE_SIZE,
  SupportersResponse,
  useSupporters
} from "@/components/SupportersProvider";

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
  const {
    data,
    displayCount,
    loading: initialLoading,
    error: initialError
  } = useSupporters();
  const [supporters, setSupporters] = useState<PublicSupporter[]>([]);
  const [publicCount, setPublicCount] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const supportersRef = useRef<PublicSupporter[]>([]);
  const loadingRef = useRef(false);

  useEffect(() => {
    if (!data) return;

    const firstPage = Array.isArray(data.supporters) ? data.supporters : [];
    const merged = mergeUnique(firstPage, supportersRef.current);
    const total = Number(data.publicCount) || 0;

    supportersRef.current = merged;
    setSupporters(merged);
    setPublicCount(total);
    setHasMore(merged.length < total && data.hasMore !== false);
    setError("");
  }, [data]);

  const loadNextPage = useCallback(async () => {
    if (loadingRef.current) return;

    loadingRef.current = true;
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `/api/supporters?limit=${SUPPORTERS_PAGE_SIZE}&offset=${supportersRef.current.length}`
      );

      if (!response.ok) {
        throw new Error("Nie udało się pobrać listy osób wspierających.");
      }

      const data = (await response.json()) as SupportersResponse;
      const nextSupporters = Array.isArray(data.supporters) ? data.supporters : [];
      const total = Number(data.publicCount) || 0;
      const merged = mergeUnique(supportersRef.current, nextSupporters);

      supportersRef.current = merged;
      setSupporters(merged);
      setPublicCount(total);
      setHasMore(merged.length < total && data.hasMore !== false);
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

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    const element = event.currentTarget;
    const distanceFromBottom =
      element.scrollHeight - element.scrollTop - element.clientHeight;

    if (distanceFromBottom < 120 && hasMore && !loading) {
      void loadNextPage();
    }
  };

  const isInitialLoading = initialLoading && supporters.length === 0;
  const visibleError = error || (data ? "" : initialError);

  return (
    <div className="supporter-directory">
      <div className="supporter-directory-header">
        <div>
          <p className="supporter-directory-eyebrow">Publiczna lista poparcia</p>
          <h3>Osoby, które dołączyły</h3>
        </div>
        <span className="supporter-directory-count">
          {data ? publicCount : displayCount}
        </span>
      </div>
      <div
        className="supporter-directory-scroll"
        onScroll={handleScroll}
        tabIndex={0}
        aria-label="Przewijana lista osób wspierających inicjatywę"
      >
        <ol className="supporter-directory-list">
          {isInitialLoading &&
            Array.from({ length: 10 }, (_, index) => (
              <li
                className="supporter-directory-row is-loading"
                key={`loading-${index}`}
                aria-hidden="true"
              >
                <span className="supporter-directory-placeholder" />
                <span className="supporter-directory-placeholder supporter-directory-placeholder-medium" />
                <span className="supporter-directory-placeholder supporter-directory-placeholder-short" />
              </li>
            ))}
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

        {loading && supporters.length > 0 && (
          <p className="supporter-directory-message" aria-live="polite">
            Ładuję kolejne osoby…
          </p>
        )}

        {!isInitialLoading && supporters.length === 0 && !visibleError && (
          <p className="supporter-directory-message">
            Pierwsze wpisy pojawią się tutaj automatycznie po dołączeniu.
          </p>
        )}

        {visibleError && (
          <p className="supporter-directory-message supporter-directory-error">
            {visibleError}
          </p>
        )}

        {!loading && hasMore && supporters.length > 0 && (
          <button
            className="supporter-directory-more"
            type="button"
            onClick={() => void loadNextPage()}
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
