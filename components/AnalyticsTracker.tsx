"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { captureAttribution, trackFunnelEvent } from "@/lib/client-analytics";

export function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();
  const isSupportLanding = pathname === "/poprzyj";

  useEffect(() => {
    captureAttribution();
    void trackFunnelEvent(isSupportLanding ? "landing_page_view" : "page_view");
  }, [isSupportLanding, pathname, search]);

  useEffect(() => {
    const section = document.getElementById("poparcie");
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;

        void trackFunnelEvent(
          isSupportLanding ? "support_section_view" : "support_form_view"
        ).then((saved) => {
          if (saved) observer.disconnect();
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [isSupportLanding, pathname]);

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const scrollToHash = () => {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      target?.scrollIntoView({ block: "start" });
    };

    const frame = window.requestAnimationFrame(scrollToHash);
    const timer = window.setTimeout(scrollToHash, 350);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [pathname]);

  return null;
}
