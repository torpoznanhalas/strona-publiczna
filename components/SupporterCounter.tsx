"use client";

import { useSupporters } from "@/components/SupportersProvider";

type CounterProps = {
  large?: boolean;
  className?: string;
};

export function SupporterCounter({ large = false, className = "" }: CounterProps) {
  const { data } = useSupporters();
  const count = data ? Number(data.publicCount ?? data.count) || 0 : null;

  const text = count === null ? "—" : new Intl.NumberFormat("pl-PL").format(count);

  if (large) {
    return <span className={`support-big-number ${className}`}>{text}</span>;
  }

  return <span>{text}</span>;
}
