"use client";

import { useEffect, useState } from "react";

type CounterProps = {
  large?: boolean;
  className?: string;
};

type SupporterCountResponse = {
  count?: number;
  publicCount?: number;
};

export function SupporterCounter({ large = false, className = "" }: CounterProps) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const response = await fetch("/api/supporters?limit=1&offset=0", {
          cache: "no-store"
        });
        if (!response.ok) return;

        const data = (await response.json()) as SupporterCountResponse;
        if (active) {
          setCount(Number(data.publicCount ?? data.count) || 0);
        }
      } catch {
        // Licznik pozostanie w stanie zastępczym, jeżeli API jest chwilowo niedostępne.
      }
    };

    const handleSupporterAdded = () => {
      void load();
    };

    void load();
    const timer = window.setInterval(load, 30000);
    window.addEventListener("supporter-added", handleSupporterAdded);

    return () => {
      active = false;
      window.clearInterval(timer);
      window.removeEventListener("supporter-added", handleSupporterAdded);
    };
  }, []);

  const text = count === null ? "—" : new Intl.NumberFormat("pl-PL").format(count);

  if (large) {
    return <span className={`support-big-number ${className}`}>{text}</span>;
  }

  return <span>{text}</span>;
}
