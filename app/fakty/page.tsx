import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fakty o hałasie z Toru Poznań",
  description:
    "Chronologia decyzji GIOŚ, wstrzymania jej wykonania i prac nad zmianą zasad dotyczących homologowanych torów sportów motorowych."
};

export default function FactsPage() {
  return (
    <>
      <section className="section" id="mechanizm">
        <div className="container">
          <div className="section-header">
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
            <h3 className="mechanism-summary-title">Co wydarzyło się w praktyce?</h3>
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
    </>
  );
}
