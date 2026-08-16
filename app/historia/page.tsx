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
            aria-label="Pionowa oś czasu historii Toru Poznań"
          >
            <div className="history-timeline">
              <PolishTypography>
                <article className="history-point">
                  <span className="history-dot history-dot-blue" aria-hidden="true" />
                  <h3>LATA 30.</h3>
                  <p>Przeźmierowo zostaje rozparcelowane pod osiedle-ogród (1933 r.). Pierwsze wille powstają jeszcze przed wojną. Stara Ławica rozbudowuje się.</p>
                </article>
                <article className="history-point">
                  <span className="history-dot history-dot-blue" aria-hidden="true" />
                  <h3>LATA 60.</h3>
                  <p>Kolejne domy powstają w bezpośrednim sąsiedztwie terenu, na którym dziś leży tor. Od 1968 r. wzdłuż ulicy Bukowskiej buduje się Osiedle Bajkowe, intensywnie rozrastają się Smochowice i Wola, istniejące już dużo wcześniej. Do 1976 r. ukształtowała się już tu docelowa siatka ulic i zabudowań.</p>
                </article>
                <article className="history-point history-point-alert">
                  <span className="history-dot history-dot-red" aria-hidden="true" />
                  <h3>1975</h3>
                  <p>W maju rusza budowa toru — pół roku przed wykonaniem projektu i bez pozwolenia na budowę. Formalnie to „tor doświadczalny” dla tarpanów z Polmo.</p>
                </article>
                <article className="history-point">
                  <span className="history-dot history-dot-blue" aria-hidden="true" />
                  <h3>1977</h3>
                  <p>Wokół przyszłego toru mieszka już ponad 5000 osób (samo Przeźmierowo: ponad 2600). W grudniu następuje otwarcie toru — od pierwszego dnia służy wyścigom, nie testom.</p>
                </article>
                <article className="history-point history-point-alert">
                  <span className="history-dot history-dot-red" aria-hidden="true" />
                  <h3>LATA 80.</h3>
                  <p>Nielegalną budową toru interesuje się Prokuratura Generalna. Twórca toru Andrzej Bobiński przyznał po latach, że budował go „częściowo jako dziką inwestycję”<sup>*</sup>.</p>
                </article>
                <article className="history-point history-point-alert">
                  <span className="history-dot history-dot-red" aria-hidden="true" />
                  <h3>2001–2005</h3>
                  <p>Pojawiają się pierwsze skargi mieszkańców na hałas (2001). Miasto ustala normy: 50–55 dB (2005). Kontrole wykazują przekroczenia.</p>
                </article>
                <article className="history-point">
                  <span className="history-dot history-dot-blue" aria-hidden="true" />
                  <h3>2007</h3>
                  <p>Po wieloletnich konfliktach i protestach mieszkańców na torze, u prezydenta Grobelnego zapada długo wypracowywany kompromis z Automobilklubem: jazdy z hałasem jeden weekend w miesiącu i do 20 dni roboczych w roku, w godz. 10–16, pod stałym monitoringiem, z kontrolą wydechów i niezbędnymi inwestycjami infrastrukturalnymi (wały od strony wschodniej, podniesienie wałów od strony Bukowskiej, profesjonalne ekranowanie toru). Nastaje względny spokój i długo wyczekiwana koegzystencja.</p>
                </article>
                <article className="history-point history-point-alert">
                  <span className="history-dot history-dot-red" aria-hidden="true" />
                  <h3>2018</h3>
                  <p>Nowe władze Automobilklubu łamią wynegocjowany kompromis: liczba jazd zostaje zwielokrotniona, a normy hałasu są nagminnie przekraczane.</p>
                </article>
                <article className="history-point">
                  <span className="history-dot history-dot-blue" aria-hidden="true" />
                  <h3>2021 ROK</h3>
                  <p>WIOŚ nakazuje Automobilklubowi Wielkopolskiemu wyciszenie toru lub dostosowanie jego eksploatacji do przepisów prawa.</p>
                </article>
                <article className="history-point history-point-alert">
                  <span className="history-dot history-dot-red" aria-hidden="true" />
                  <h3>2024–2026</h3>
                  <p>WIOŚ wstrzymuje działalność toru (31.10.2024) z uwagi na łamanie norm hałasu. GIOŚ utrzymuje decyzję (31.03.2026). Tor działa tylko warunkowo — do wyroku sądu.</p>
                </article>
                <article className="history-point history-point-alert">
                  <span className="history-dot history-dot-red" aria-hidden="true" />
                  <h3>15 LIPCA 2026</h3>
                  <p>Wybrani posłowie lobbują ustawę, która ma wyłączyć tory spod kontroli hałasu — wbrew unijnej dyrektywie 2002/49/WE i mimo zastrzeżeń Ministerstwa Klimatu i Środowiska.</p>
                </article>
              </PolishTypography>
            </div>
          </div>
          <p className="history-sources"><sup>*</sup> F. Czekała, „Miasto nie do Poznania”, s. 267. A. Bobiński był ówczesnym dyrektorem FSR Polmo i prezesem Automobilklubu Wielkopolskiego.</p>
          <div className="history-conclusion">
            <strong>To nie mieszkańcy sprowadzili się do toru.</strong>
            <span>To tor powstał wśród mieszkańców — bez pozwolenia na budowę.</span>
          </div>
        </div>
      </section>
    </>
  );
}
