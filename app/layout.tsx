import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MetaPixel } from "@/components/MetaPixel";

const barlow = Barlow({
  subsets: ["latin", "latin-ext"],
  weight: ["700", "800"],
  style: "normal",
  display: "swap",
  variable: "--font-barlow"
});

const themeInitializer = `
  (function () {
    try {
      var savedTheme = localStorage.getItem("tor-poznan-theme");
      var systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      var theme = savedTheme === "light" || savedTheme === "dark"
        ? savedTheme
        : systemDark ? "dark" : "light";
      document.documentElement.dataset.theme = theme;
      document.documentElement.style.colorScheme = theme;
    } catch (_) {}
  })();
`;

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
    title: "Posłuchaj nagrań hałasu z Toru Poznań!",
    description:
      "Poznaj fakty i historię o torze, zobacz jak Automobilklub Wielkopolski próbuje zmieniać prawo i poprzyj okolicznych mieszkańców!"
  },
  twitter: {
    card: "summary_large_image",
    title: "Posłuchaj nagrań hałasu z Toru Poznań!",
    description:
      "Poznaj fakty i historię o torze, zobacz jak Automobilklub Wielkopolski próbuje zmieniać prawo i poprzyj okolicznych mieszkańców!"
  },
  alternates: {
    canonical: "/"
  },
  icons: {
    icon: [{ url: "/logo-transparent.png", type: "image/png" }],
    apple: [{ url: "/logo-transparent.png", type: "image/png" }]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl" className={barlow.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitializer }} />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <MetaPixel />
      </body>
    </html>
  );
}
