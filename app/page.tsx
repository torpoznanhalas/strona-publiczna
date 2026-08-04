import { SupporterCounter } from "@/components/SupporterCounter";
import { SupporterActivity } from "@/components/SupporterActivity";
import { SupporterDirectory } from "@/components/SupporterDirectory";
import { SupportForm } from "@/components/SupportForm";
import { VideoSection } from "@/components/VideoSection";

const demands = [
  {
    title: "Stały i niezależny monitoring",
    description:
      "Pomiary prowadzone przez niezależny system oraz publiczny raport po każdym dniu działalności Toru Poznań."
  },
  {
    title: "Kontrola każdego pojazdu",
    description:
      "Pomiar głośności przed wjazdem na Tor Poznań i bezwzględne niedopuszczanie pojazdów przekraczających limit."
  },
  {
    title: "Limit szczególnie głośnych dni",
    description:
      "Roczny limit najbardziej uciążliwych wydarzeń oraz harmonogram ogłaszany mieszkańcom z dużym wyprzedzeniem."
  },
  {
    title: "Ochrona dni roboczych",
    description:
      "Zakaz wielogodzinnych, głośnych imprez komercyjnych w dni robocze bez skutecznych ograniczeń emisji."
  },
  {
    title: "Równy głos mieszkańców",
    description:
      "Stały zespół konsultacyjny z równą reprezentacją mieszkańców, samorządów, ekspertów i operatora Toru Poznań."
  }
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-main">
            <h1>
              Tor Poznań od lat przekracza normy hałasu, szkodząc zdrowiu tysięcy poznaniaków.{" "}
              <span className="hero-highlight">
                Posłuchaj, poznaj fakty, poprzyj mieszkańców.
              </span>
            </h1>
            <p className="hero-description">
              Główny Inspektor Ochrony Środowiska potwierdził przekroczenia dopuszczalnych poziomów
              hałasu i utrzymał decyzję o wstrzymaniu użytkowania instalacji na terenie Toru Poznań.
              Wykonanie decyzji zostało jednak wstrzymane, a w Sejmie procedowany jest projekt
              zmieniający zasady dotyczące homologowanych torów sportów motorowych. Nie żądamy
              likwidacji Toru Poznań. Żądamy przestrzegania norm, niezależnego monitoringu i realnego
              udziału mieszkańców w podejmowaniu decyzji.
            </p>
            <div className="button-row hero-buttons">
              <a className="button button-accent" href="#nagrania">
                Posłuchaj nagrań
              </a>
              <a className="button button-ghost" href="#poparcie">
                Poprzyj mieszkańców
              </a>
            </div>
          </div>
        </div>
      </section>

      <SupporterActivity />

      <VideoSection />

      <section className="section" id="poparcie">
        <div className="container support-layout">
          <div>
            <h2 className="section-title">
              Wyraź poparcie dla przestrzegania norm hałasu przez Tor Poznań.
            </h2>
            <SupporterCounter large />
            <p className="section-lead">
              zweryfikowanych osób popiera egzekwowanie norm hałasu oraz przejrzyste zasady działania
              Toru Poznań.
            </p>
            <p className="section-lead">
              Licznik pokazuje tylko wpisy zatwierdzone po weryfikacji. Dane kontaktowe nie są publiczne.
            </p>
            <SupporterDirectory />
          </div>
          <SupportForm />
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Żądamy zasad, których nie można wyłączyć politycznym wyjątkiem.
            </h2>
            <p className="section-lead">
              Tor Poznań może działać tylko wtedy, gdy jego działalność jest przewidywalna, kontrolowana
              i nie przerzuca kosztów komercyjnych wydarzeń na tysiące osób mieszkających wokół.
            </p>
          </div>

          <div className="demand-grid">
            {demands.map((demand, index) => (
              <article className="demand-card" key={demand.title}>
                <span className="demand-index">0{index + 1}</span>
                <h3>{demand.title}</h3>
                <p>{demand.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
