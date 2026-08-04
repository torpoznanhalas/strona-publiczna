import Link from "next/link";
import { SupporterCounter } from "@/components/SupporterCounter";
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
            <p className="eyebrow">Tor Poznań · hałas · fakty</p>
            <h1>
              Tor Poznań przekraczał normy. Potem ruszyła walka o <strong>zmianę zasad.</strong>
            </h1>
            <div className="button-row hero-buttons">
              <a className="button button-accent" href="#mechanizm">
                Zobacz mechanizm
              </a>
              <a className="button button-ghost" href="#nagrania">
                Posłuchaj hałasu
              </a>
            </div>
            <Link className="hero-support-counter" href="#poparcie">
              <span className="hero-support-number"><SupporterCounter /></span>
              <span className="hero-support-label">
                zweryfikowanych osób popiera egzekwowanie norm hałasu przy Torze Poznań
              </span>
            </Link>
          </div>
          <aside className="hero-aside">
            <p>
              Gdy organ ochrony środowiska utrzymał decyzję o wstrzymaniu użytkowania instalacji
              na Torze Poznań z powodu przekroczeń hałasu, uruchomiono odwołanie, rozmowy o
              podniesieniu dopuszczalnych poziomów i projekt zmiany ustawy. <strong>Pokazujemy mechanizm.</strong>
            </p>
          </aside>
        </div>
      </section>


      <section className="section" id="mechanizm">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Chronologia działań</p>
            <h2 className="section-title">Najpierw hałas. Potem decyzja. Potem polityczne ratowanie Toru Poznań.</h2>
            <p className="section-lead">
              Nie trzeba zgadywać intencji. Wystarczy zestawić kolejność zdarzeń i słowa uczestników
              posiedzenia Komisji Kultury Fizycznej, Sportu i Turystyki.
            </p>
          </div>

          <div className="timeline">
            <article className="timeline-item">
              <div className="timeline-date">KROK 1</div>
              <div>
                <h3>Organ ochrony środowiska reaguje na przekroczenia.</h3>
                <p>
                  W stenogramie sejmowej komisji przewodniczący przypomina, że Główny Inspektor
                  Ochrony Środowiska podjął decyzję o zamknięciu Toru Poznań w związku z przekraczaniem
                  norm hałasu. Wykonanie decyzji zostało następnie wstrzymane.
                </p>
              </div>
            </article>

            <article className="timeline-item">
              <div className="timeline-date">KROK 2</div>
              <div>
                <h3>Minister przyznaje: strona została poproszona o odwołanie.</h3>
                <p>
                  Sekretarz stanu w Ministerstwie Sportu mówi podczas posiedzenia: „poprosić o to,
                  aby strona się odwołała”. Następnie wskazuje, że odwołanie pozwoliło wstrzymać
                  wykonanie decyzji. To nie komentarz mieszkańców — to zapis posiedzenia Sejmu.
                </p>
              </div>
            </article>

            <article className="timeline-item">
              <div className="timeline-date">KROK 3</div>
              <div>
                <h3>Po decyzji GIOŚ pojawia się projekt zmiany prawa.</h3>
                <p>
                  Przewodniczący Komisji mówi, że wcześniej strona rządowa nie przedstawiła rozwiązania,
                  a Komisja zaproponowała je po decyzji GIOŚ. Projekt zalicza działalność na homologowanych
                  torach do „powszechnego korzystania ze środowiska”.
                </p>
              </div>
            </article>

            <article className="timeline-item">
              <div className="timeline-date">KROK 4</div>
              <div>
                <h3>Rozważany jest nie tylko cichszy Tor Poznań, lecz także wyższa norma.</h3>
                <p>
                  Podczas posiedzenia wskazano lokalną ścieżkę polegającą na zmianie kwalifikacji terenu
                  i zwiększeniu dopuszczalnego poziomu hałasu o „dosłownie kilka decybeli”. Innymi słowy:
                  zamiast wyłącznie ograniczyć emisję, można zmienić próg, według którego jest oceniana.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="history-section" aria-labelledby="historia-toru">
        <div className="container">
          <div className="history-header">
            <h2 id="historia-toru">TOR POZNAŃ: KTO BYŁ TU PIERWSZY?</h2>
            <p>Fakty, które warto znać, zanim Sejm zmieni prawo</p>
          </div>
          <div className="history-timeline">
            <article className="history-point">
              <span className="history-dot history-dot-blue" aria-hidden="true" />
              <h3>LATA 60.</h3>
              <p>Powstają pierwsze domy w bezpośrednim sąsiedztwie terenu, na którym dziś leży tor.</p>
            </article>
            <article className="history-point">
              <span className="history-dot history-dot-blue" aria-hidden="true" />
              <h3>1977</h3>
              <p>Na osiedlach Ławica i Wola oraz w Przeźmierowie mieszka już <strong>ponad 4 600 osób.</strong> W tym samym roku kończy się budowa <strong>toru doświadczalnego</strong> fabryki Polmo — nie toru wyścigowego.</p>
            </article>
            <article className="history-point history-point-alert">
              <span className="history-dot history-dot-red" aria-hidden="true" />
              <h3>PRZEŁOM LAT 70. I 80.</h3>
              <p>Tor doświadczalny zostaje przekształcony w tor wyścigowy — <strong>bez pozwolenia na budowę.</strong> Sam twórca toru nazwał go później „dziką inwestycją”.</p>
            </article>
            <article className="history-point history-point-alert">
              <span className="history-dot history-dot-red" aria-hidden="true" />
              <h3>LATA 80.</h3>
              <p>Budową toru zajmują się <strong>NIK i prokuratura.</strong> Stan wojenny przerywa postępowanie — nikt nie ponosi odpowiedzialności.</p>
            </article>
            <article className="history-point">
              <span className="history-dot history-dot-blue" aria-hidden="true" />
              <h3>2026</h3>
              <p>Główny Inspektor Ochrony Środowiska nakazuje zamknięcie toru za <strong>przekraczanie norm hałasu.</strong></p>
            </article>
            <article className="history-point history-point-alert">
              <span className="history-dot history-dot-red" aria-hidden="true" />
              <h3>15 LIPCA 2026</h3>
              <p>Sejm proceduje ustawę, która ma <strong>wyłączyć tory spod kontroli hałasu</strong> — wbrew unijnej dyrektywie 2002/49/WE i mimo zastrzeżeń Ministerstwa Klimatu i Środowiska.</p>
            </article>
          </div>
          <div className="history-conclusion">
            <strong>To nie mieszkańcy sprowadzili się do toru.</strong>
            <span>To tor powstał wśród mieszkańców — bez pozwolenia na budowę.</span>
          </div>
          <p className="history-sources">Źródła: dane meldunkowe, raport NIK, F. Czekała „Miasto nie do Poznania” | Stowarzyszenie Ławica-Bajkowe</p>
        </div>
      </section>


      <section className="section section-dark">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Debata bez równowagi</p>
            <h2 className="section-title">O mieszkańcach rozmawiano bez mieszkańców.</h2>
            <p className="section-lead">
              W wykazie uczestników widnieją przedstawiciele ministerstw, Polskiego Związku Motorowego
              i organizacji sportowych. Nie wskazano przedstawicieli Ławicy, Woli, Smochowic,
              Krzyżownik, Przeźmierowa ani Baranowa.
            </p>
          </div>

          <div className="quote-grid">
            <article className="quote-card">
              <blockquote>
                Środowisko sportów motorowych miało przy stole swoich przedstawicieli.
              </blockquote>
              <cite>Wykaz uczestników posiedzenia Komisji, 15 lipca 2026 r.</cite>
            </article>
            <article className="quote-card">
              <blockquote>
                Ludzie, których domy miały zostać objęte skutkami decyzji, nie mieli równorzędnego głosu.
              </blockquote>
              <cite>Wniosek z oficjalnej listy uczestników posiedzenia</cite>
            </article>
          </div>
        </div>
      </section>

      <VideoSection />

      <section className="section" id="poparcie">
        <div className="container support-layout">
          <div>
            <p className="eyebrow">Społeczny mandat</p>
            <h2 className="section-title">Prawo ma chronić ludzi, nie wygodę operatora Toru Poznań.</h2>
            <SupporterCounter large />
            <p className="section-lead">
              zweryfikowanych osób popiera egzekwowanie norm hałasu oraz przejrzyste zasady działania
              Toru Poznań.
            </p>
            <p className="section-lead">
              Licznik pokazuje tylko wpisy zatwierdzone po weryfikacji. Dane kontaktowe nie są publiczne.
            </p>
          </div>
          <SupportForm />
        </div>
      </section>


      <section className="section section-dark">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Nie żądamy likwidacji sportu</p>
            <h2 className="section-title">Żądamy zasad, których nie można wyłączyć politycznym wyjątkiem.</h2>
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

      <section className="section">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Masz materiał lub pytanie?</p>
            <h2 className="section-title">Pomóż nam opisać sprawę Toru Poznań precyzyjnie i uczciwie.</h2>
            <p className="section-lead">
              Przyjmujemy nagrania, pomiary, korespondencję i informacje o wydarzeniach na Torze Poznań.
              Każde mocne twierdzenie powinno dać się sprawdzić w wiarygodnym źródle.
            </p>
            <div className="button-row">
              <Link className="button button-accent" href="/media">
                Materiały dla mediów
              </Link>
              <a className="button button-ghost" href="mailto:halastorpoznan@gmail.com">
                Napisz do nas
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
