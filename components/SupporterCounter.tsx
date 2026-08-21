"use client";

import { useSupporters } from "@/components/SupportersProvider";

type CounterProps = {
  large?: boolean;
  className?: string;
};

export function SupporterCounter({ large = false, className = "" }: CounterProps) {
  const { displayCount } = useSupporters();
  const text = new Intl.NumberFormat("pl-PL").format(displayCount);

  if (large) {
    return <span className={`support-big-number ${className}`}>{text}</span>;
  }

  return <span>{text}</span>;
}
