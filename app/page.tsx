import { SupporterActivity } from "@/components/SupporterActivity";
import { SupporterDirectory } from "@/components/SupporterDirectory";
import { SupportForm } from "@/components/SupportForm";
import { SupportersProvider } from "@/components/SupportersProvider";
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
    <SupportersProvider>
      <section className="hero" id="strona-glowna">
        <div className="container hero-grid">
          <div className="hero-main">
            <h1>
              Tor Poznań od lat przekracza normy hałasu, szkodząc zdrowiu tysięcy poznaniaków.{" "}
              <span className="hero-highlight">
                Posłuchaj, poznaj fakty, poprzyj mieszkańców.
              </span>
            </h1>
            <p className="hero-description">
              GIOŚ nakazał wstrzymanie użytkowania Toru Poznań, ale wykonanie decyzji zawieszono, a w Sejmie – przy wsparciu wybranych posłów – trwa
               próba napisania ustawy pod Automobilklub Wielkopolski i wyłączenia obiektu spod prawa. Żądamy ukrócenia tych patologicznych układów,
              wyegzekwowania norm hałasu, profesjonalnego wyciszenia toru i ograniczenia jazd w imię ochrony zdrowia mieszkańców.
              Nie żądamy likwidacji Toru Poznań – żądamy praworządności.
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
    </SupportersProvider>
  );
}
