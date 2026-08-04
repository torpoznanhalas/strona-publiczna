import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Historia Toru Poznań",
  description:
    "Historia zabudowy wokół Toru Poznań i najważniejsze fakty dotyczące powstania oraz funkcjonowania obiektu."
};

export default function HistoryPage() {
  return (
    <>
      <section className="history-section" aria-labelledby="historia-toru">
        <div className="container">
          <div className="history-header">
            <h2 id="historia-toru">Tor Poznań: kto był tu pierwszy?</h2>
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
    </>
  );
}
