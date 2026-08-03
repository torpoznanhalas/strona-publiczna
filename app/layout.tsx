import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const barlow = Barlow({
  subsets: ["latin", "latin-ext"],
  weight: ["700", "800"],
  style: "normal",
  display: "swap",
  variable: "--font-barlow"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://torpoznanhalas.pl"),
  title: {
    default: "Tor Poznań: hałas, fakty i głos mieszkańców",
    template: "%s | Tor Poznań: Hałas"
  },
  description:
    "Nagrania i fakty dotyczące hałasu emitowanego przez Tor Poznań oraz działań podejmowanych po decyzji organów ochrony środowiska.",
  keywords: [
    "Tor Poznań hałas",
    "torpoznan",
    "Tor Poznań",
    "hałas Poznań Ławica",
    "Przeźmierowo hałas",
    "Automobilklub Wielkopolski",
    "normy hałasu"
  ],
  authors: [{ name: "Stowarzyszenie Mieszkańców Ławica-Bajkowe" }],
  creator: "Stowarzyszenie Mieszkańców Ławica-Bajkowe",
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: "https://torpoznanhalas.pl",
    siteName: "Tor Poznań: Hałas",
    title: "Tor Poznań przekraczał normy. Potem ruszyła walka o zmianę zasad.",
    description:
      "Posłuchaj nagrań i poprzyj egzekwowanie norm hałasu przy Torze Poznań."
  },
  twitter: {
    card: "summary_large_image",
    title: "Tor Poznań: hałas, fakty i głos mieszkańców",
    description: "Posłuchaj nagrań. Zobacz mechanizm. Dodaj swój głos."
  },
  alternates: {
    canonical: "/"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl" className={barlow.variable}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
