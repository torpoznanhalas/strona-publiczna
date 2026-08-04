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
    default: "Hałas z Toru Poznań — nagrania, fakty i apel mieszkańców",
    template: "%s | Hałas z Toru Poznań"
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
    siteName: "Hałas z Toru Poznań",
    title: "Hałas z Toru Poznań — nagrania, fakty i apel mieszkańców",
    description:
      "Posłuchaj nagrań, poznaj fakty i poprzyj apel mieszkańców o przestrzeganie norm hałasu."
  },
  twitter: {
    card: "summary_large_image",
    title: "Hałas z Toru Poznań — nagrania, fakty i apel mieszkańców",
    description: "Posłuchaj nagrań, poznaj fakty i poprzyj mieszkańców."
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
