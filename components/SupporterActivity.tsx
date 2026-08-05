"use client";

import { SupporterCounter } from "@/components/SupporterCounter";
import {
  PublicSupporter,
  useSupporters
} from "@/components/SupportersProvider";

const dateFormatter = new Intl.DateTimeFormat("pl-PL", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Europe/Warsaw"
});

function formatPlace(supporter: PublicSupporter) {
  return supporter.postalCode
    ? `${supporter.city}, ${supporter.postalCode}`
    : supporter.city;
}

export function SupporterActivity() {
  const { data, loading } = useSupporters();
  const supporters = Array.isArray(data?.supporters)
    ? data.supporters.slice(0, 8)
    : [];

  if (!loading && supporters.length === 0) {
    return null;
  }

  const visibleItems = supporters.length > 0 ? supporters : [null, null, null, null, null];

  return (
    <section className="supporter-activity" aria-label="Ostatnie osoby wspierające inicjatywę">
      <div className="container supporter-activity-inner">
        <div className="supporter-activity-heading">
          <span>Wspiera nas już <strong><SupporterCounter /></strong> osób!</span>
        </div>
        <div className="supporter-activity-window">
          <div className="supporter-activity-scroller" aria-live="polite">
            <ol className="supporter-activity-list">
              {visibleItems.map((supporter, index) => (
                <li
                  className={supporter ? "supporter-activity-item" : "supporter-activity-item is-loading"}
                  key={
                    supporter
                      ? `${supporter.firstName}-${supporter.lastInitial}-${supporter.createdAt}`
                      : `loading-${index}`
                  }
                >
                  {supporter ? (
                    <>
                      <strong>
                        {supporter.firstName} {supporter.lastInitial}.
                      </strong>
                      <span className="supporter-activity-place">{formatPlace(supporter)}</span>
                      <time dateTime={supporter.createdAt}>
                        {dateFormatter.format(new Date(supporter.createdAt))}
                      </time>
                    </>
                  ) : (
                    <>
                      <span className="supporter-activity-placeholder" />
                      <span className="supporter-activity-placeholder supporter-activity-placeholder-medium" />
                      <span className="supporter-activity-placeholder supporter-activity-placeholder-short" />
                    </>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
