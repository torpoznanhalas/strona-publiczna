import { SupporterActivity } from "@/components/SupporterActivity";
import { SupporterDirectory } from "@/components/SupporterDirectory";
import { SupportForm } from "@/components/SupportForm";
import { SupportersProvider } from "@/components/SupportersProvider";
import { VideoSection } from "@/components/VideoSection";

const demands = [
  {
    title: "Stały i niezależny monitoring",
    description:
      "Pomiary natężenia hałasu w okolicznych dzielnicach prowadzone przez niezależny system, dostępne publicznie w czasie rzeczywistym."
  },
  {
    title: "Kontrola każdego pojazdu",
    description:
      "Pomiar głośności w trakcie trwania wyścigów i zawodów, oraz bezwzględne wykluczanie z nich pojazdów przekraczających limit."
  },
  {
    title: "Harmonogram i limity wyścigów",
    description:
      "Wyścigi i zawody wyłącznie w dni robocze, w godzinach 8.00-16.00. Nie więcej niż 20 dni w ciągu roku. "
  },
  {
    title: "Bezwzględna ochrona weekendów",
    description:
      "Zakaz wyścigów i zawodów na torze w weekendy - jedyne dni odpoczynku dla tysięcy okolicznych rodzin."
  },
  {
    title: "Równy głos mieszkańców",
    description:
      "Stały zespół konsultacyjny z równą reprezentacją mieszkańców, samorządów i władz Automobilklubu Wielkopolskiego."
  }
];

export default function Home() {
  return (
    <SupportersProvider>
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
              hałasu przez Tor Poznań i utrzymał decyzję o wstrzymaniu jego użytkowania.
              Wykonanie decyzji zostało jednak wstrzymane, a w Sejmie procedowany jest projekt
              próbujący wyłączyć tory wyścigowe z norm hałasu. Nie żądamy likwidacji Toru Poznań.
              Żądamy przestrzegania prawa, profesjonalnego wyciszenia toru,
              ograniczenia dni i godzin hałaśliwych jazd, oraz uwzględnienia mieszkańców w decyzjach.
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

      <section className="section support-section" id="poparcie">
        <div className="container">
          <div className="support-section-header">
            <h2 className="section-title">
              Wyraź poparcie dla przestrzegania norm hałasu przez Tor Poznań.
            </h2>
          </div>
          <div className="support-cards-grid">
            <SupportForm />
            <SupporterDirectory />
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Żądamy przestrzegania praw do ciszy i wypoczynku, mieszkańców Ławicy, os. Bajkowego, Przeźmierowa i Smochowic.
            </h2>
            <p className="section-lead">
              Tor Poznań może działać tylko wtedy, gdy jego działalność jest ściśle kontrolowana, zaplanowana,
              i nie szkodzi zdrowiu tysięcy dorosłych i dzieci mieszkających wokół.
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
    </SupportersProvider>
  );
}
