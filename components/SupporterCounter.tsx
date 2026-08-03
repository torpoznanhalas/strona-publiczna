"use client";

import { useEffect, useState } from "react";

type CounterProps = {
  large?: boolean;
  className?: string;
};

export function SupporterCounter({ large = false, className = "" }: CounterProps) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const response = await fetch("/api/supporters", { cache: "no-store" });
        if (!response.ok) return;
        const data = (await response.json()) as { count: number };
        if (active) setCount(data.count);
      } catch {
        // Licznik pozostanie w stanie zastępczym, jeżeli API jest chwilowo niedostępne.
      }
    };

    void load();
    const timer = window.setInterval(load, 30000);

    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);

  const text = count === null ? "—" : new Intl.NumberFormat("pl-PL").format(count);

  if (large) {
    return <span className={`support-big-number ${className}`}>{text}</span>;
  }

  return <span>{text}</span>;
}
