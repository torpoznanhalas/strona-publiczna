"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";

type HistoricalMapCardProps = {
  alt: string;
  eager?: boolean;
  height: number;
  src: string;
  title: string;
  width: number;
};

function MapAttribution() {
  return (
    <figcaption className="history-map-attribution">
      <strong>Właściciel: Archiwum Państwowe w Poznaniu.</strong>{" "}
      <span>
        Źródło: CYRYL —{" "}
        <a href="https://cyryl.poznan.pl/" target="_blank" rel="noreferrer">
          cyryl.poznan.pl
        </a>
      </span>
    </figcaption>
  );
}

export function HistoricalMapCard({
  alt,
  eager = false,
  height,
  src,
  title,
  width
}: HistoricalMapCardProps) {
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        window.requestAnimationFrame(() => triggerRef.current?.focus());
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const closeMap = () => {
    setOpen(false);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  };

  return (
    <article className="history-point history-map-point">
      <span className="history-dot history-dot-blue" aria-hidden="true" />
      <h3>{title}</h3>
      <figure className="history-map-figure">
        <button
          className="history-map-trigger"
          type="button"
          ref={triggerRef}
          aria-haspopup="dialog"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <Image
            className="history-map-image"
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading={eager ? "eager" : "lazy"}
            sizes="(max-width: 760px) calc(100vw - 98px), 840px"
          />
          <span className="history-map-enlarge">
            <span aria-hidden="true">＋</span> Kliknij, aby powiększyć
          </span>
        </button>
        <MapAttribution />
      </figure>

      {open && (
        <div className="history-map-lightbox" onMouseDown={closeMap}>
          <div
            className="history-map-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="history-map-dialog-header">
              <h2 id={titleId}>{title}</h2>
              <button
                className="history-map-close"
                type="button"
                ref={closeButtonRef}
                aria-label="Zamknij powiększenie mapy"
                onClick={closeMap}
              >
                ×
              </button>
            </div>
            <figure className="history-map-dialog-figure">
              <Image
                className="history-map-dialog-image"
                src={src}
                alt={alt}
                width={width}
                height={height}
                sizes="96vw"
                priority
              />
              <MapAttribution />
            </figure>
          </div>
        </div>
      )}
    </article>
  );
}
