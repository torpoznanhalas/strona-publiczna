import type { Metadata } from "next";
import { Children, cloneElement, isValidElement, type ReactNode } from "react";

export const metadata: Metadata = {
  title: "Historia Toru Poznań",
  description:
    "Historia zabudowy wokół Toru Poznań i najważniejsze fakty dotyczące powstania oraz funkcjonowania obiektu."
};

function preventPolishOrphans(node: ReactNode): ReactNode {
  return Children.map(node, (child) => {
    if (typeof child === "string") {
      return child.replace(/(^|\s)([aiouwz])\s+/gi, "$1$2\u00a0");
    }

    if (isValidElement<{ children?: ReactNode }>(child)) {
      return cloneElement(child, undefined, preventPolishOrphans(child.props.children));
    }

    return child;
  });
}

function PolishTypography({ children }: { children: ReactNode }) {
  return <>{preventPolishOrphans(children)}</>;
}

export default function HistoryPage() {
  return (
    <>
      <section className="history-section" aria-labelledby="historia-toru">
        <div className="container">
          <div className="history-header">
            <h2 id="historia-toru">Tor Poznań: kto był tu pierwszy?</h2>
            <p>Fakty, które warto znać, zanim Sejm zmieni prawo</p>
          </div>
          <div
            className="history-timeline-scroll"
            role="region"
            aria-label="Przewijana oś czasu historii Toru Poznań"
            tabIndex={0}
          >
            <div className="history-timeline">
              <PolishTypography>
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
                <article className="history-point history-point-alert">
                <span className="history-dot history-dot-red" aria-hidden="true" />
                <h3>OD 2012 ROKU</h3>
                <p>Nasilenie zawodów i treningów emitujących hałas sięgający 60-70dB, trwający godzinami, przez wiele dni roku.</p>
                </article>
                <article className="history-point">
                <span className="history-dot history-dot-blue" aria-hidden="true" />
                <h3>2021 ROK</h3>
                <p>WIOŚ nakazuje Automobilklubowi Wielkopolskiemu wyciszenie toru lub dostosowanie jego eksploatacji do przepisów prawa.</p>
                </article>
                <article className="history-point history-point-alert">
                <span className="history-dot history-dot-red" aria-hidden="true" />
                <h3>PAŹDZIERNIK 2023</h3>
                <p>Wobec bezczynności Automobilklubu Wielkopolskiego, WIOŚ wydaje nakaz wstrzymania użytkowania toru, po tym jak 31 lipca 2023 mija termin na usunięcie naruszeń akustycznych.</p>
                </article>
                <article className="history-point history-point-alert">
                <span className="history-dot history-dot-red" aria-hidden="true" />
                <h3>JESIEŃ 2023</h3>
                <p>Automobilklub Wielkopolski odwołuje się od decyzji zaskarżając ją do GIOŚ, i dalej organizuje hałaśliwe zawody i jazdy.</p>
                </article>
                <article className="history-point">
                <span className="history-dot history-dot-blue" aria-hidden="true" />
                <h3>2026</h3>
                <p>Główny Inspektor Ochrony Środowiska nakazuje zamknięcie toru za <strong>przekraczanie norm hałasu.</strong></p>
                </article>
                <article className="history-point history-point-alert">
                <span className="history-dot history-dot-red" aria-hidden="true" />
                <h3>15 LIPCA 2026</h3>
                <p>Wybrani posłowie lobbują ustawę, która ma <strong>wyłączyć tory spod kontroli hałasu</strong> — wbrew unijnej dyrektywie 2002/49/WE i mimo zastrzeżeń Ministerstwa Klimatu i Środowiska.</p>
                </article>
              </PolishTypography>
            </div>
          </div>
          <div className="history-conclusion">
            <strong>To nie mieszkańcy sprowadzili się do toru.</strong>
            <span>To tor powstał wśród mieszkańców — bez pozwolenia na budowę.</span>
          </div>
          <p className="history-sources">Źródła: dane meldunkowe, raport NIK, F. Czekała „Miasto nie do Poznania” | Stowarzyszenie Ławica-Bajkowe</p>
        </div>
      </section>
    </>
  );
}
