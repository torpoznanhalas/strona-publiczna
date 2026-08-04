"use client";

import { useEffect, useState } from "react";

type PublicSupporter = {
  firstName: string;
  lastInitial: string;
  createdAt: string;
};

type SupportersResponse = {
  supporters?: PublicSupporter[];
};

const dateFormatter = new Intl.DateTimeFormat("pl-PL", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Europe/Warsaw"
});

export function SupporterActivity() {
  const [supporters, setSupporters] = useState<PublicSupporter[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const response = await fetch("/api/supporters", { cache: "no-store" });
        if (!response.ok) return;

        const data = (await response.json()) as SupportersResponse;
        if (active) {
          setSupporters(Array.isArray(data.supporters) ? data.supporters.slice(0, 3) : []);
          setLoaded(true);
        }
      } catch {
        if (active) setLoaded(true);
      }
    };

    void load();
    const timer = window.setInterval(load, 30000);

    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);

  if (loaded && supporters.length === 0) {
    return null;
  }

  return (
    <section className="supporter-activity" aria-label="Ostatnie osoby wspierające inicjatywę">
      <div className="container supporter-activity-inner">
        <div className="supporter-activity-heading">
          <span className="supporter-activity-dot" aria-hidden="true" />
          <span>Dołączają kolejni</span>
        </div>

        <div className="supporter-activity-window" aria-live="polite">
          <ol className="supporter-activity-list">
            {(supporters.length > 0 ? supporters : [null, null, null]).map((supporter, index) => (
              <li className={supporter ? "supporter-activity-item" : "supporter-activity-item is-loading"} key={supporter ? `${supporter.firstName}-${supporter.lastInitial}-${supporter.createdAt}` : `loading-${index}`}>
                {supporter ? (
                  <>
                    <strong>{supporter.firstName} {supporter.lastInitial}.</strong>
                    <time dateTime={supporter.createdAt}>{dateFormatter.format(new Date(supporter.createdAt))}</time>
                  </>
                ) : (
                  <>
                    <span className="supporter-activity-placeholder" />
                    <span className="supporter-activity-placeholder supporter-activity-placeholder-short" />
                  </>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
