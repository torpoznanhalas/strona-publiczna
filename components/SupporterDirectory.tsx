"use client";

import { UIEvent, useEffect, useState } from "react";

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

export function SupporterDirectory() {
  const [supporters, setSupporters] = useState<PublicSupporter[]>([]);
  const [publicCount, setPublicCount] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadPage = async (offset: number) => {
    if (loading || !hasMore) return;

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

      setSupporters((current) => {
        const existing = new Set(
          current.map(
            (supporter) =>
              `${supporter.firstName}-${supporter.lastInitial}-${supporter.city}-${supporter.createdAt}`
          )
        );

        return [
          ...current,
          ...nextSupporters.filter(
            (supporter) =>
              !existing.has(
                `${supporter.firstName}-${supporter.lastInitial}-${supporter.city}-${supporter.createdAt}`
              )
          )
        ];
      });
      setPublicCount(Number(data.publicCount) || 0);
      setHasMore(data.hasMore === true);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Nie udało się pobrać listy osób wspierających."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadPage(0);
    // Pierwsza strona ma zostać pobrana tylko raz po zamontowaniu komponentu.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    const element = event.currentTarget;
    const distanceFromBottom =
      element.scrollHeight - element.scrollTop - element.clientHeight;

    if (distanceFromBottom < 120 && hasMore && !loading) {
      void loadPage(supporters.length);
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
              key={`${supporter.firstName}-${supporter.lastInitial}-${supporter.city}-${supporter.createdAt}`}
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
            Pierwsze publiczne wpisy pojawią się po ich zatwierdzeniu.
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
            onClick={() => void loadPage(supporters.length)}
          >
            Pokaż kolejne osoby
          </button>
        )}

        {!hasMore && supporters.length > 0 && (
          <p className="supporter-directory-message">
            To wszystkie osoby, które zgodziły się na publiczne pokazanie wpisu.
          </p>
        )}
      </div>
    </div>
  );
}
