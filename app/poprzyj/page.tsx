import type { Metadata } from "next";
import Link from "next/link";
import { SupporterCounter } from "@/components/SupporterCounter";
import { SupportForm } from "@/components/SupportForm";
import { siteFeatures } from "@/lib/site-features";

export const metadata: Metadata = {
  title: "Poprzyj apel mieszkańców",
  description:
    "Poprzyj apel o przestrzeganie norm hałasu, skuteczne wyciszenie Toru Poznań i przewidywalne zasady jego funkcjonowania.",
  robots: {
    index: false,
    follow: true
  }
};

const shortDemands = [
  "Przestrzeganie obowiązujących norm hałasu",
  "Skuteczne wyciszenie Toru Poznań",
  "Ograniczenie najbardziej uciążliwych godzin i dni jazd",
  "Kontrola głośności pojazdów korzystających z toru",
  "Niezależny monitoring hałasu",
  "Udział mieszkańców w ustalaniu zasad funkcjonowania obiektu"
];

const detailLinks = [
  { label: "Posłuchaj nagrań", href: "/#nagrania" },
  { label: "Poznaj historię Toru Poznań", href: "/historia" },
  { label: "Zobacz pełne postulaty", href: "/#postulaty" }
];

export default function SupportLandingPage() {
  return (
    <article className="support-landing">
      <section className="support-landing-hero">
        <div className="container support-landing-container">
          <h1>
            Nie chcemy likwidacji Toru Poznań. Chcemy, by działał zgodnie z normami i pozwalał
            mieszkańcom normalnie żyć i odpoczywać.
          </h1>
          <p>
            Kontrole potwierdziły przekroczenia dopuszczalnych poziomów hałasu. Domagamy się
            skutecznego wyciszenia toru, przestrzegania norm i przewidywalnych zasad jego
            funkcjonowania. Jeśli popierasz te postulaty — możesz dołączyć do apelu mieszkańców.
          </p>
        </div>
      </section>

      <section className="support-landing-demands" aria-labelledby="support-demands-title">
        <div className="container support-landing-container">
          <h2 id="support-demands-title">Co popierasz?</h2>
          <ol className="support-landing-demand-list">
            {shortDemands.map((demand, index) => (
              <li key={demand}>
                <span aria-hidden="true">0{index + 1}</span>
                {demand}
              </li>
            ))}
          </ol>
          <p className="support-landing-reassurance">
            <strong>Nie postulujemy likwidacji Toru Poznań.</strong> Chcemy rozwiązania, które
            pozwoli funkcjonować zarówno torowi, jak i jego sąsiadom.
          </p>
          <Link className="support-landing-text-link" href="/#postulaty">
            Poznaj pełne postulaty →
          </Link>
        </div>
      </section>

      <section className="support-landing-form-section">
        <div className="container support-landing-form-container">
          <div className="support-landing-form-header section-anchor" id="poparcie">
            {siteFeatures.showSupporterCount && (
              <p className="support-landing-proof">
                Już <strong><SupporterCounter /></strong> mieszkańców poparło apel
              </p>
            )}
            <h2>Poprzyj apel mieszkańców</h2>
          </div>
          <SupportForm variant="landing" />
          <p className="support-landing-privacy">
            Adres e-mail i dane techniczne nie są publikowane. Zakres publicznego wpisu wynika z
            zaznaczonej zgody. Szczegóły znajdziesz w{" "}
            <Link href="/polityka-prywatnosci">polityce prywatności</Link>.
          </p>
        </div>
      </section>

      <section className="support-landing-more" aria-labelledby="support-more-title">
        <div className="container support-landing-container">
          <h2 id="support-more-title">Chcesz najpierw poznać więcej faktów?</h2>
          <div className="support-landing-link-grid">
            {detailLinks.map((link) => (
              <Link href={link.href} key={link.href}>
                <span>{link.label}</span>
                <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
