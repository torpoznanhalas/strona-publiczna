import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dla mediów",
  description: "Podstawowe fakty, nagrania i kontakt prasowy w sprawie hałasu z Toru Poznań."
};

export default function MediaPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Dla dziennikarzy</p>
          <h1>Sprawa w pięć minut.</h1>
          <p className="section-lead">
            Kontakt prasowy: Stowarzyszenie Mieszkańców Ławica-Bajkowe ·{" "}
            <a href="mailto:halastorpoznan@gmail.com">halastorpoznan@gmail.com</a>
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="prose" style={{ paddingTop: 0 }}>
            <h2>Istota sprawy</h2>
            <p>
              Spór nie dotyczy samego istnienia sportu motorowego. Dotyczy tego, czy komercyjnie
              wykorzystywany Tor Poznań może regularnie przerzucać koszty hałasu na okolicznych
              mieszkańców, a po decyzji organu ochrony środowiska uzyskiwać polityczne wsparcie dla
              zmiany zasad.
            </p>
            <h2>Najważniejsza chronologia</h2>
            <ol>
              <li>GIOŚ podejmuje decyzję dotyczącą zamknięcia Toru Poznań z powodu przekroczeń norm hałasu.</li>
              <li>Po odwołaniu wykonanie decyzji zostaje wstrzymane.</li>
              <li>W Sejmie procedowany jest projekt zmieniający status homologowanych torów.</li>
              <li>W debacie pojawia się możliwość podniesienia dopuszczalnego poziomu hałasu lokalnie.</li>
              <li>W oficjalnym wykazie uczestników posiedzenia nie ma reprezentacji okolicznych osiedli.</li>
            </ol>
            <h2>Nagrania i komentarz</h2>
            <p>
              Nagrania dokumentujące hałas są osadzone na stronie głównej. W sprawie komentarza,
              rozmów z mieszkańcami, dodatkowych materiałów i uzgodnienia zasad wykorzystania nagrań
              prosimy o kontakt mailowy.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
