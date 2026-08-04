import Link from "next/link";
import { SupporterCounter } from "@/components/SupporterCounter";
import { SupporterActivity } from "@/components/SupporterActivity";
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
              Tor Poznań <em>od lat przekracza normy hałasu</em>, szkodząc zdrowiu tysięcy
              Poznaniaków. A teraz próbuje zmienić prawo. <em>Mówimy STOP!</em>
            </h1>
            <p className="hero-description">
              Gdy Główny Inspektor Ochrony Środowiska utrzymał decyzję o wstrzymaniu użytkowania
              Toru Poznań z powodu przekroczeń hałasu, uruchomiono odwołanie, rozmowy o podniesieniu
              dopuszczalnych poziomów i projekt zmiany ustawy. Do rozmów nie zaproszono mieszkańców.
              <strong>Dlatego pokazujemy fakty.</strong>
            </p>
            <div className="button-row hero-buttons">
              <a className="button button-accent" href="#mechanizm">
                Poznaj fakty
              </a>
              <a className="button button-ghost" href="#nagrania">
                Posłuchaj hałasu
              </a>
            </div>
          </div>
          <aside className="hero-aside">
            <Link className="hero-support-counter hero-support-counter-aside" href="#poparcie">
              <span className="hero-support-number"><SupporterCounter /></span>
              <span className="hero-support-label">
                zweryfikowanych osób popiera egzekwowanie norm hałasu przy Torze Poznań
              </span>
            </Link>
          </aside>
        </div>
      </section>

      <SupporterActivity />

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


      <section className="section" id="mechanizm">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Co wydarzyło się po decyzji GIOŚ?</p>
            <h2 className="section-title">
              Najpierw stwierdzono przekroczenia hałasu. Potem zatrzymano wykonanie decyzji.
              Następnie ruszyły prace nad zmianą prawa.
            </h2>
            <div className="mechanism-intro">
              <p>
                Ta historia nie zaczęła się od konfliktu politycznego ani od żądania zamknięcia
                Toru Poznań. Zaczęła się od wieloletnich skarg mieszkańców, kontroli oraz
                stwierdzonych przekroczeń dopuszczalnych poziomów hałasu.
              </p>
              <p>
                Kiedy organy ochrony środowiska zdecydowały o wstrzymaniu użytkowania instalacji
                na Torze Poznań, rozpoczęły się równolegle trzy działania: odwołanie od decyzji,
                próby podniesienia dopuszczalnego poziomu hałasu oraz prace nad zmianą ustawy.
              </p>
            </div>
          </div>

          <div className="timeline">
            <article className="timeline-item">
              <div className="timeline-date">31 MARCA 2026</div>
              <div>
                <h3>GIOŚ potwierdza przekroczenia i utrzymuje decyzję o wstrzymaniu użytkowania instalacji.</h3>
                <p>
                  Główny Inspektor Ochrony Środowiska utrzymał decyzję Wielkopolskiego
                  Wojewódzkiego Inspektora Ochrony Środowiska dotyczącą Toru Poznań.
                </p>
                <p>
                  Powodem były stwierdzone przekroczenia dopuszczalnych poziomów hałasu.
                  Zarządzający Torem Poznań otrzymał wcześniej dodatkowy czas i możliwość
                  zastosowania zabezpieczeń akustycznych, ale nie wykazał trwałego przestrzegania norm.
                </p>
                <p>
                  GIOŚ podkreślił, że nie była to decyzja uznaniowa. Przy nieusunięciu naruszeń
                  organ miał obowiązek zastosować przepisy prawa.
                </p>
                <p className="timeline-source">
                  <a
                    href="https://www.gov.pl/web/gios/decyzja-gios-w-sprawie-toru-poznan--dzialania-wynikajace-z-przepisow-prawa-i-licznych-skarg-mieszkancow"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Źródło: komunikat GIOŚ
                  </a>
                </p>
              </div>
            </article>

            <article className="timeline-item">
              <div className="timeline-date">PO WYDANIU DECYZJI</div>
              <div>
                <h3>Ministerstwo Sportu pomaga doprowadzić do wstrzymania jej wykonania.</h3>
                <p>
                  Podczas posiedzenia komisji sejmowej sekretarz stanu w Ministerstwie Sportu
                  i Turystyki Piotr Borys powiedział:
                </p>
                <p>
                  <strong>„Udało nam się także poprosić o to, aby strona się odwołała”.</strong>
                </p>
                <p>
                  Minister dodał, że odwołanie pozwoliło zawiesić wykonanie decyzji i dało czas
                  na dalsze działania. GIOŚ potwierdza, że po wniosku zarządzającego Torem Poznań
                  wykonanie decyzji zostało wstrzymane. Do czasu rozstrzygnięcia sprawy przez
                  Wojewódzki Sąd Administracyjny Tor Poznań może działać na dotychczasowych warunkach.
                </p>
                <p className="timeline-source">
                  <a
                    href="https://www.gov.pl/web/gios/gios-wstrzymuje-decyzje-w-sprawie-toru-poznan"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Źródło: komunikat GIOŚ o wstrzymaniu wykonania decyzji
                  </a>
                </p>
              </div>
            </article>

            <article className="timeline-item">
              <div className="timeline-date">15 MAJA 2026</div>
              <div>
                <h3>Do Sejmu trafia projekt zmieniający zasady dotyczące hałasu na torach.</h3>
                <p>
                  Zaledwie 45 dni po decyzji GIOŚ Komisja Kultury Fizycznej, Sportu i Turystyki
                  skierowała do Sejmu projekt zmiany ustawy o sporcie.
                </p>
                <p>
                  Projekt ma uznać uprawianie sportu, szkolenia i aktywność rekreacyjną na
                  homologowanych torach sportów motorowych za „powszechne korzystanie ze środowiska”.
                </p>
                <p>
                  W oficjalnej ocenie skutków projektu zapisano wprost, że proponowana zmiana ma
                  umożliwić <strong>wyłączenie działalności na takich torach spod norm hałasu
                  przewidzianych dla działalności gospodarczej.</strong> Dokumentacja projektu
                  wielokrotnie wskazuje Tor Poznań jako bezpośrednią przyczynę proponowanej zmiany.
                </p>
                <p className="timeline-source">
                  <a
                    href="https://api.sejm.gov.pl/sejm/term10/prints/2647/2647.pdf"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Źródło: druk sejmowy nr 2647
                  </a>
                </p>
              </div>
            </article>

            <article className="timeline-item">
              <div className="timeline-date">RÓWNOLEGLE</div>
              <div>
                <h3>Rozważane jest nie tylko ograniczenie hałasu, lecz także podniesienie jego dopuszczalnego poziomu.</h3>
                <p>
                  Podczas posiedzenia komisji minister Piotr Borys przedstawił również rozwiązanie
                  lokalne: zwiększenie dopuszczalnego poziomu hałasu o — jak powiedział —
                  <strong> „dosłownie kilka decybeli”.</strong>
                </p>
                <p>
                  Dyskutowano też o uznaniu części otoczenia Toru Poznań za teren
                  usługowo-mieszkaniowy zamiast mieszkaniowego. Taka zmiana mogłaby umożliwić
                  stosowanie wyższych limitów hałasu.
                </p>
                <p>
                  <strong>Nie obniżyłoby to faktycznego hałasu słyszanego w domach. Zmieniłby się
                  poziom, od którego hałas jest prawnie traktowany jako przekroczenie.</strong>
                </p>
              </div>
            </article>

            <article className="timeline-item">
              <div className="timeline-date">OSTRZEŻENIE MINISTERSTWA KLIMATU</div>
              <div>
                <h3>Ministerstwo ostrzega, że projekty mogą naruszać prawo Unii Europejskiej.</h3>
                <p>
                  Podsekretarz stanu w Ministerstwie Klimatu i Środowiska Anita Sowińska stwierdziła
                  podczas posiedzenia, że oba rozpatrywane projekty stoją — zdaniem ministerstwa —
                  w kolizji z unijną dyrektywą dotyczącą hałasu.
                </p>
                <p>
                  Ministerstwo zwróciło także uwagę, że użytkownicy torów korzystają z nich w sposób
                  zorganizowany i odpłatny, dlatego trudno automatycznie uznać taką działalność za
                  „powszechne korzystanie ze środowiska”.
                </p>
                <p>
                  Według ministerstwa przyjęcie przepisów może narazić Polskę na zarzut
                  nieprawidłowego stosowania prawa Unii oraz wywołać podobne konflikty w innych
                  miejscach kraju. Jednocześnie opinia Biura Ekspertyz Sejmu uznała projekt za
                  niesprzeczny z prawem Unii Europejskiej.
                </p>
              </div>
            </article>

            <article className="timeline-item">
              <div className="timeline-date">15 LIPCA 2026</div>
              <div>
                <h3>Komisja przyjmuje projekt bez sprzeciwu.</h3>
                <p>
                  Pomimo zastrzeżeń Ministerstwa Klimatu i Środowiska Komisja wybrała projekt
                  komisyjny jako wiodący i przyjęła sprawozdanie bez sprzeciwu. Zarekomendowała
                  Sejmowi uchwalenie projektu.
                </p>
                <p>
                  Projekt nie jest jeszcze obowiązującym prawem. Decyzja GIOŚ pozostaje jednak
                  wstrzymana do czasu rozstrzygnięcia przez Wojewódzki Sąd Administracyjny, dzięki
                  czemu Tor Poznań nadal funkcjonuje na dotychczasowych warunkach.
                </p>
                <p className="timeline-source">
                  <a
                    href="https://api.sejm.gov.pl/sejm/term10/prints/2812/2812.pdf"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Źródło: sprawozdanie Komisji, druk nr 2812
                  </a>
                </p>
              </div>
            </article>
          </div>

          <div className="mechanism-summary">
            <p className="eyebrow">Co wydarzyło się w praktyce?</p>
            <p>
              Gdy obowiązujące normy doprowadziły do decyzji niekorzystnej dla zarządzającego
              Torem Poznań, nie ograniczono się do żądania skutecznego zmniejszenia hałasu.
            </p>
            <p>
              Pomagano zatrzymać wykonanie decyzji, rozpoczęto rozmowy o podniesieniu
              dopuszczalnego poziomu i skierowano do Sejmu projekt zmieniający zasady.
            </p>
            <p className="mechanism-summary-final">
              Stawką nie jest istnienie sportu motorowego. Stawką jest to, czy Tor Poznań ma
              ograniczyć hałas, czy państwo ma zmienić prawo po wydaniu niekorzystnej decyzji.
            </p>
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
