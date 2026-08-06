import type { Metadata } from "next";
import { HealthExperience } from "@/components/HealthExperience";

export const metadata: Metadata = {
  title: "Hałas a zdrowie",
  description:
    "Co przewlekły i powtarzający się hałas robi z mózgiem, sercem, naczyniami i snem.",
  alternates: { canonical: "/zdrowie" },
  openGraph: {
    title: "Hałas nie kończy się w uszach",
    description:
      "Krótko i na podstawie źródeł: reakcja stresowa, układ krążenia i sen.",
    url: "/zdrowie",
    type: "article"
  }
};

export default function HealthPage() {
  return <HealthExperience />;
}
