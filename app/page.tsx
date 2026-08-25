import { SupporterDirectory } from "@/components/SupporterDirectory";
import { SupportForm } from "@/components/SupportForm";
import { VideoSection } from "@/components/VideoSection";

const demands = [
  {
    title: "Ochrona poranków i sztywny harmonogram",
    description:
      "Ścisłe ograniczenie jazd do godzin 10.00–16.00 (max. 20 dni w roku). Bezwzględna ochrona godzin porannych dla mieszkańców pracujących zdalnie, freelancerów oraz medyków i pracowników odpoczywających po nocnych dyżurach."
  },
  {
    title: "Ścisła ochrona weekendów",
    description:
      "Zakaz hałaśliwych jazd i wyścigów w soboty i niedziele — weekendy to jedyne dni odpoczynku dla tysięcy okolicznych rodzin. Zgadzamy się na 1 weekend jazd w miesiącu, w okresie czerwiec-wrzesień."
  },
  {
    title: "Pilne inwestycje infrastrukturalne",
    description:
      "Podwyższenie wałów przy ul. Bukowskiej, usypanie wałów wschodnich (od strony lotniska) oraz montaż odpowiednio sparametryzowanych ekranów akustycznych."
  },
  {
    title: "Równy głos mieszkańców",
    description:
      "Powołanie stałego zespołu konsultacyjnego z równą reprezentacją mieszkańców, samorządu, władz miasta oraz Automobilklubu Wielkopolskiego."
  },
  {
    title: "Kontrola każdego pojazdu",
    description:
      "Bezkompromisowy pomiar głośności w trakcie trwania jazd i wyścigów oraz natychmiastowe, bezwzględne wykluczanie z toru pojazdów przekraczających normy."
  },
  {
    title: "Stały i niezależny monitoring",
    description:
      "Pomiary natężenia hałasu w okolicznych dzielnicach prowadzone przez niezależny system, dostępne publicznie w czasie rzeczywistym."
  }
];

export default function Home() {
  return (
    <>
      <section className="hero" id="strona-glowna">
        <div className="container hero-grid">
          <div className="hero-main">
            <h1>
              Nie chcemy likwidacji Toru Poznań.{" "}
              <span className="hero-highlight">
                Chcemy, by działał zgodnie z normami i pozwalał mieszkańcom normalnie żyć i
                odpoczywać.
              </span>
            </h1>
            <p className="hero-description">
              Kontrole WIOŚ potwierdziły wielokrotne przekroczenia dopuszczalnych poziomów hałasu
              na Torze Poznań. Domagamy się skutecznego wyciszenia toru, przestrzegania norm i
              przewidywalnych zasad jego funkcjonowania. Jeśli popierasz te postulaty — dołącz do
              apelu mieszkańców.
            </p>
            <div className="button-row hero-buttons">
              <a className="button button-accent hero-primary-cta" href="#poparcie">
                Popieram te postulaty
              </a>
              <a className="button button-ghost" href="#nagrania">
                Posłuchaj nagrań
              </a>
            </div>
          </div>
        </div>
      </section>

      <VideoSection />

      <section className="section support-section">
        <div className="container">
          <div className="support-section-header section-anchor" id="poparcie">
            <h2 className="section-title">
              Poprzyj apel mieszkańców
            </h2>
          </div>
          <div className="support-decision-box">
            <p>
              Popierając apel, nie opowiadasz się za likwidacją Toru Poznań. Popierasz
              przestrzeganie norm hałasu, skuteczne zabezpieczenia akustyczne, przewidywalne
              zasady funkcjonowania toru i udział mieszkańców w podejmowanych decyzjach.
            </p>
            <a className="support-demands-link" href="#postulaty">
              Poznaj wszystkie postulaty <span aria-hidden="true">→</span>
            </a>
          </div>
          <div className="support-cards-grid">
            <SupportForm />
            <SupporterDirectory />
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div className="section-header section-anchor" id="postulaty">
            <h2 className="section-title">
              6. postulatów mieszkańców Ławicy, Osiedla Bajkowego, Przeźmierowa, Woli i Smochowic.
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
    </>
  );
}
