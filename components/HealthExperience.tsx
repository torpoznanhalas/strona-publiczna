"use client";

import Link from "next/link";
import { MouseEvent, ReactNode, useEffect, useRef, useState } from "react";

const sources = {
  "who-guidelines": {
    institution: "World Health Organization",
    year: "2018",
    title: "Environmental Noise Guidelines for the European Region",
    type: "wytyczne zdrowotne",
    url: "https://www.who.int/europe/publications/i/item/9789289053563",
    scope: "Hałas drogowy, kolejowy, lotniczy, turbin wiatrowych i rekreacyjny.",
    caveat: "WHO nie wyznacza osobnego progu dla torów wyścigowych przy zabudowie mieszkaniowej."
  },
  "who-noise": {
    institution: "WHO Europe",
    year: "aktualizowane",
    title: "Noise — overview and health impacts",
    type: "przegląd skutków zdrowotnych",
    url: "https://www.who.int/europe/health-topics/noise",
    scope: "Sen, układ krążenia, metabolizm, funkcje poznawcze i dobrostan.",
    caveat: "Opisuje wiedzę populacyjną, nie indywidualną diagnozę."
  },
  "eea-report": {
    institution: "European Environment Agency",
    year: "2025 / korekta 2026",
    title: "Environmental noise in Europe 2025",
    type: "raport europejski",
    url: "https://www.eea.europa.eu/en/analysis/publications/environmental-noise-in-europe-2025",
    scope: "Hałas drogowy, kolejowy i lotniczy w Europie.",
    caveat: "Dane nie są bilansem zdrowotnym Toru Poznań."
  },
  "eea-pathways": {
    institution: "European Environment Agency",
    year: "2025",
    title: "Biological pathways through which environmental noise impacts health",
    type: "schemat mechanizmów biologicznych",
    url: "https://www.eea.europa.eu/en/analysis/publications/environmental-noise-in-europe-2025/biological-indirect-pathways-through-which-environmental-noise-impacts-health",
    scope: "Pośrednia reakcja organizmu na przewlekły hałas środowiskowy.",
    caveat: "Mechanizm nie dowodzi przyczyny choroby u konkretnej osoby."
  },
  "esc-emergency": {
    institution: "European Society of Cardiology",
    year: "2025",
    title: "Environmental Noise is a Medical Emergency",
    type: "stanowisko eksperckie",
    url: "https://www.escardio.org/news/press/press-releases/new-eea-2025-noise-report-confirms-environmental-noise-is-a-medical-emergency/",
    scope: "Hałas środowiskowy jako modyfikowalny czynnik ryzyka sercowo-naczyniowego.",
    caveat: "Komunikat cytował pierwotne liczby EEA; na stronie używamy korekty z 27.03.2026."
  },
  "circulation-review": {
    institution: "Circulation Research",
    year: "2024",
    title: "Transportation Noise Pollution and Cardiovascular Health",
    type: "przegląd naukowy",
    url: "https://doi.org/10.1161/CIRCRESAHA.123.323584",
    scope: "Pozauszne skutki hałasu transportowego dla układu krążenia.",
    caveat: "Przegląd dotyczy przede wszystkim hałasu transportowego."
  },
  "esc-night-study": {
    institution: "European Society of Cardiology",
    year: "2026",
    title: "Nighttime road traffic noise stresses the heart and blood vessels",
    type: "opis badania eksperymentalnego",
    url: "https://www.escardio.org/news/press/press-releases/new-research/",
    scope: "Jedna noc symulowanego hałasu drogowego; 74 zdrowe osoby dorosłe.",
    caveat: "To nie jest badanie Toru Poznań ani dowód długoterminowego skutku u mieszkańców."
  }
} as const;

type SourceId = keyof typeof sources;
type ModalId = "brain" | "heart" | "sleep" | "cardiologists" | "one-night" | "who";

type ModalContent = {
  title: string;
  lead: string;
  body: ReactNode;
  sourceIds: SourceId[];
};

const modalContent: Record<ModalId, ModalContent> = {
  brain: {
    title: "Mózg i stres",
    lead: "Źródła opisują biologiczną drogę od bodźca akustycznego do reakcji stresowej.",
    body: (
      <>
        <ul>
          <li>wzrost aktywności układu współczulnego;</li>
          <li>uwalnianie hormonów stresu;</li>
          <li>zmiany tętna i ciśnienia;</li>
          <li>przy długim narażeniu: stres oksydacyjny i stan zapalny.</li>
        </ul>
        <blockquote>
          Dźwięk znika z powietrza. Alarm w organizmie nie zawsze znika razem z nim.
        </blockquote>
        <p className="hz-modal-caveat">
          Sam mechanizm nie pozwala stwierdzić, że konkretny przypadek choroby spowodowało
          konkretne źródło hałasu.
        </p>
      </>
    ),
    sourceIds: ["eea-pathways", "circulation-review"]
  },
  heart: {
    title: "Serce i naczynia",
    lead: "Przeglądy dotyczą głównie długotrwałego hałasu transportowego.",
    body: (
      <>
        <p>
          Badania opisują kilka powiązanych dróg: reakcję stresową, zaburzenia snu, stan zapalny,
          stres oksydacyjny oraz zaburzenia pracy śródbłonka naczyń.
        </p>
        <blockquote>
          Nie każdy narażony człowiek zachoruje. Przewlekły hałas zwiększa ryzyko — tak działają
          czynniki ryzyka.
        </blockquote>
        <p className="hz-modal-caveat">
          Ryzyko populacyjne nie jest diagnozą ani pewnością choroby u jednej osoby.
        </p>
      </>
    ),
    sourceIds: ["esc-emergency", "circulation-review"]
  },
  sleep: {
    title: "Sen",
    lead: "WHO i ESC opisują sen jako jeden z głównych obszarów oddziaływania hałasu.",
    body: (
      <>
        <p>
          Sen to czas obniżenia pobudzenia układu nerwowego i regeneracji układu krążenia.
          Powtarzające się bodźce akustyczne mogą ten proces przerywać — także bez pełnego
          przebudzenia.
        </p>
        <p>
          Sen nie odbywa się wyłącznie w nocy. W dzień śpią małe dzieci, osoby chore i pracownicy
          zmianowi.
        </p>
        <p className="hz-modal-caveat">
          Większość dużych badań dotyczy dróg, kolei i lotnictwa. Lokalny wpływ innego źródła
          wymaga pomiarów ekspozycji.
        </p>
      </>
    ),
    sourceIds: ["who-noise", "esc-emergency"]
  },
  cardiologists: {
    title: "Stanowisko kardiologów",
    lead: "Europejskie Towarzystwo Kardiologiczne, 25 czerwca 2025 roku.",
    body: (
      <>
        <p>
          Prof. Thomas Münzel, kardiolog i przewodniczący Environmental Sustainability Task Force
          ESC, wskazuje hałas jako modyfikowalny czynnik ryzyka sercowo-naczyniowego.
        </p>
        <p>
          Stanowisko opisuje związek przewlekłej ekspozycji z reakcją stresową, fragmentacją snu,
          stanem zapalnym i zaburzeniami pracy naczyń.
        </p>
        <p className="hz-modal-caveat">
          Komunikat ESC przytaczał pierwotne liczby raportu EEA. Liczby widoczne na tej stronie
          pochodzą ze skorygowanej wersji EEA z 27 marca 2026 roku.
        </p>
      </>
    ),
    sourceIds: ["esc-emergency", "eea-report"]
  },
  "one-night": {
    title: "Jedna noc — badanie eksperymentalne",
    lead: "Randomizowane, podwójnie zaślepione badanie krzyżowe objęło 74 zdrowe osoby dorosłe.",
    body: (
      <>
        <p>
          Nocna ekspozycja na nagrania hałasu drogowego pogorszyła funkcję naczyń, zwiększyła
          tętno i zakłóciła sen. Zaobserwowano też zmiany białek związanych ze stresem i stanem
          zapalnym.
        </p>
        <p className="hz-modal-caveat hz-modal-caveat-strong">
          Badanie dotyczyło symulowanego hałasu drogowego. Nie jest bezpośrednim badaniem Toru
          Poznań.
        </p>
      </>
    ),
    sourceIds: ["esc-night-study"]
  },
  who: {
    title: "Jak czytać wytyczne WHO?",
    lead: "To zalecenia zdrowotne dla długotrwałej ekspozycji, a nie jeden uniwersalny limit.",
    body: (
      <>
        <div className="hz-guideline-table" role="region" aria-label="Wytyczne WHO" tabIndex={0}>
          <table>
            <thead>
              <tr>
                <th>Źródło</th>
                <th>Lden</th>
                <th>Lnight</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>ruch drogowy</td><td>&lt; 53 dB</td><td>&lt; 45 dB</td></tr>
              <tr><td>kolej</td><td>&lt; 54 dB</td><td>&lt; 44 dB</td></tr>
              <tr><td>lotnictwo</td><td>&lt; 45 dB</td><td>&lt; 40 dB</td></tr>
            </tbody>
          </table>
        </div>
        <ul>
          <li>Lden i Lnight są wskaźnikami długookresowymi, nie chwilowym odczytem z telefonu.</li>
          <li>WHO nie podaje osobnego progu dla torów wyścigowych przy domach.</li>
          <li>Progu dla drogi, kolei lub lotniska nie należy mechanicznie przypisywać torowi.</li>
          <li>Ocena lokalna wymaga prawidłowych pomiarów i analizy zdarzeń akustycznych.</li>
        </ul>
      </>
    ),
    sourceIds: ["who-guidelines"]
  }
};

const healthCards: Array<{
  id: ModalId;
  index: string;
  title: string;
  headline: string;
  text: string;
  button: string;
}> = [
  {
    id: "brain",
    index: "01",
    title: "Mózg i stres",
    headline: "Hałas uruchamia alarm.",
    text: "Układ nerwowy zwiększa czujność. Przy długim narażeniu oznacza to mniej czasu na prawdziwy spokój i regenerację.",
    button: "Co dzieje się w organizmie?"
  },
  {
    id: "heart",
    index: "02",
    title: "Serce i naczynia",
    headline: "Serce nie wie, skąd pochodzi dźwięk.",
    text: "Długotrwały hałas środowiskowy jest wiązany z nadciśnieniem i większym ryzykiem chorób sercowo-naczyniowych.",
    button: "Jak hałas obciąża serce?"
  },
  {
    id: "sleep",
    index: "03",
    title: "Sen",
    headline: "Nie trzeba się obudzić, żeby sen przestał regenerować.",
    text: "Hałas może utrudniać zasypianie, spłycać sen i wywoływać reakcje fizjologiczne bez pełnego przebudzenia.",
    button: "Dlaczego sen jest tak ważny?"
  }
];

export function HealthExperience() {
  const [activeModal, setActiveModal] = useState<ModalId | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!activeModal || !dialog) return;

    dialog.showModal();
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [activeModal]);

  const openModal = (id: ModalId, event: MouseEvent<HTMLButtonElement>) => {
    openerRef.current = event.currentTarget;
    setActiveModal(id);
  };

  const handleClose = () => {
    document.body.style.overflow = "";
    setActiveModal(null);
    window.requestAnimationFrame(() => openerRef.current?.focus());
  };

  const closeModal = () => dialogRef.current?.close();

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) closeModal();
  };

  const currentModal = activeModal ? modalContent[activeModal] : null;

  return (
    <article className="hz-page">
      <section className="hz-section hz-opening" aria-labelledby="health-opening-title">
        <div className="container hz-opening-grid">
          <div className="hz-opening-copy">
            <p className="hz-eyebrow">Hałas a zdrowie</p>
            <h1 id="health-opening-title">Hałas nie kończy się w uszach.</h1>
            <p className="hz-opening-lead">
              Przechodzi przez mózg. Uruchamia reakcję stresową. Może zaburzać sen i obciążać
              układ krążenia.
            </p>
            <p>
              Powtarzany przez miesiące i lata nie jest już tylko przykrym dźwiękiem. Staje się
              czynnikiem ryzyka dla zdrowia.
            </p>
            <blockquote>
              Tego nie widać od razu. Właśnie dlatego tak łatwo to zlekceważyć.
            </blockquote>
            <a className="button button-accent" href="#trzy-skutki">
              Zobacz, co dzieje się w ciele
            </a>
          </div>

          <div className="hz-body-visual" aria-label="Droga bodźca: ucho, mózg, serce i sen">
            <div className="hz-signal-path" aria-hidden="true">
              <span className="hz-path-node hz-path-ear">Ucho</span>
              <span className="hz-path-node hz-path-brain">Mózg</span>
              <span className="hz-path-node hz-path-heart">Serce</span>
              <span className="hz-path-node hz-path-sleep">Sen</span>
            </div>
            <div className="hz-person" aria-hidden="true">
              <span className="hz-person-head" />
              <span className="hz-person-body" />
            </div>
            <button className="hz-hotspot hz-hotspot-brain" type="button" onClick={(event) => openModal("brain", event)}>
              <span aria-hidden="true" />
              Mózg
            </button>
            <button className="hz-hotspot hz-hotspot-heart" type="button" onClick={(event) => openModal("heart", event)}>
              <span aria-hidden="true" />
              Serce
            </button>
            <button className="hz-hotspot hz-hotspot-sleep" type="button" onClick={(event) => openModal("sleep", event)}>
              <span aria-hidden="true" />
              Sen
            </button>
          </div>
        </div>
        <div className="container">
          <p className="hz-method-note">
            Informacje opierają się na wytycznych WHO, danych EEA i publikacjach kardiologicznych.
            Nie przypisujemy Torowi Poznań konkretnych zachorowań bez lokalnego badania zdrowia
            mieszkańców.
          </p>
        </div>
      </section>

      <section className="hz-section hz-effects" id="trzy-skutki" aria-labelledby="health-effects-title">
        <div className="container">
          <div className="hz-section-heading">
            <p className="hz-eyebrow">Trzy drogi oddziaływania</p>
            <h2 id="health-effects-title">Nie trzeba ogłuchnąć, żeby hałas szkodził.</h2>
            <p>
              Organizm może odbierać niechciany dźwięk jak sygnał alarmowy — nawet wtedy, gdy
              człowiek próbuje go ignorować.
            </p>
          </div>
          <div className="hz-card-grid">
            {healthCards.map((card) => (
              <article className="hz-health-card" key={card.id}>
                <div className="hz-card-topline">
                  <span>{card.index}</span>
                  <strong>{card.title}</strong>
                </div>
                <h3>{card.headline}</h3>
                <p>{card.text}</p>
                <button type="button" onClick={(event) => openModal(card.id, event)}>
                  {card.button}<span aria-hidden="true"> →</span>
                </button>
              </article>
            ))}
          </div>
          <p className="hz-control-sentence">
            Ryzyko nie jest pewnością choroby u jednej osoby. Jest powodem, dla którego chroni się
            całą narażoną społeczność.
          </p>
        </div>
      </section>

      <section className="hz-section hz-experts" aria-labelledby="health-experts-title">
        <div className="container">
          <div className="hz-section-heading">
            <p className="hz-eyebrow">Głos medycyny</p>
            <h2 id="health-experts-title">To nie jest tylko „uciążliwość”.</h2>
          </div>
          <div className="hz-expert-grid">
            <article className="hz-expert-card">
              <span className="hz-monogram" aria-hidden="true">TM</span>
              <blockquote>
                „Hałas środowiskowy nie jest już tylko problemem planowania miast. To medyczny
                alarm wymagający pilnej reakcji.”
              </blockquote>
              <div>
                <strong>Prof. Thomas Münzel</strong>
                <p>Kardiolog, przewodniczący Environmental Sustainability Task Force ESC</p>
                <small>Tłumaczenie własne.</small>
              </div>
              <button type="button" onClick={(event) => openModal("cardiologists", event)}>
                Zobacz pełny kontekst<span aria-hidden="true"> →</span>
              </button>
            </article>
            <article className="hz-expert-card hz-expert-card-red">
              <span className="hz-monogram" aria-hidden="true">OH</span>
              <blockquote>
                „Już jedna noc z hałasem drogowym obciążyła układ sercowo-naczyniowy.”
              </blockquote>
              <div>
                <strong>Dr Omar Hahad</strong>
                <p>University Medical Center Mainz, główny autor badania eksperymentalnego</p>
                <small>Tłumaczenie własne.</small>
              </div>
              <button type="button" onClick={(event) => openModal("one-night", event)}>
                Co zbadano?<span aria-hidden="true"> →</span>
              </button>
            </article>
          </div>
        </div>
      </section>

      <section className="hz-section hz-scale" aria-labelledby="health-scale-title">
        <div className="container">
          <div className="hz-guidelines-row">
            <div className="hz-section-heading">
              <p className="hz-eyebrow">Wytyczne i skala</p>
              <h2 id="health-scale-title">Zdrowie ma własne progi ostrzegawcze.</h2>
            </div>
            <div className="hz-guidelines-copy">
              <p>
                WHO publikuje zdrowotne zalecenia dotyczące długotrwałej ekspozycji na hałas. Nie
                są one jednym uniwersalnym limitem dla każdego źródła i nie zastępują polskiego
                prawa.
              </p>
              <button type="button" onClick={(event) => openModal("who", event)}>
                Pokaż wytyczne WHO<span aria-hidden="true"> →</span>
              </button>
            </div>
          </div>

          <div className="hz-stat-grid" aria-label="Skala problemu według Europejskiej Agencji Środowiska">
            <article><strong>Ponad 30%</strong><span>Europejczyków powyżej zaleceń WHO</span></article>
            <article><strong>4,6 mln</strong><span>osób z poważnymi zaburzeniami snu</span></article>
            <article><strong>73 000</strong><span>przedwczesnych zgonów rocznie</span></article>
          </div>
          <p className="hz-eea-caveat">
            <strong>To nie jest bilans Toru Poznań.</strong> Są to skorygowane w marcu 2026 roku
            szacunki dla hałasu drogowego, kolejowego i lotniczego w Europie. Pokazują wagę
            problemu zdrowotnego, nie liczbę lokalnych zachorowań.
          </p>

          <div className="hz-closing">
            <h2>Hałas nie zostawia siniaków.</h2>
            <p>
              Nie widać go na ścianie domu. Ale organizm może zapamiętać go jako przerwany
              odpoczynek, kolejne pobudzenie i kolejną reakcję stresową.
            </p>
            <blockquote>
              Decyzje zapadają w ciszy. Ich zdrowotne skutki mieszkańcy odczuwają we własnych
              domach.
            </blockquote>
            <div className="hz-closing-actions">
              <details className="hz-sources-panel">
                <summary>Zobacz wszystkie źródła</summary>
                <div>
                  {Object.entries(sources).map(([id, source]) => (
                    <a key={id} href={source.url} target="_blank" rel="noreferrer">
                      <span>{source.institution} · {source.year}</span>
                      <strong>{source.title}</strong>
                      <small>{source.type} · {source.scope}</small>
                    </a>
                  ))}
                </div>
              </details>
              <Link className="button button-accent" href="/#nagrania">
                Posłuchaj hałasu
              </Link>
            </div>
          </div>
        </div>
      </section>

      <dialog
        className="hz-dialog"
        ref={dialogRef}
        aria-labelledby="hz-dialog-title"
        aria-describedby="hz-dialog-description"
        onClose={handleClose}
        onClick={handleBackdropClick}
      >
        {currentModal && (
          <div className="hz-dialog-panel">
            <button className="hz-dialog-close" type="button" onClick={closeModal} aria-label="Zamknij okno">
              <span aria-hidden="true">×</span>
            </button>
            <p className="hz-dialog-kicker">Hałas a zdrowie</p>
            <h2 id="hz-dialog-title">{currentModal.title}</h2>
            <p className="hz-dialog-lead" id="hz-dialog-description">{currentModal.lead}</p>
            <div className="hz-dialog-body">{currentModal.body}</div>
            <div className="hz-dialog-sources">
              {currentModal.sourceIds.map((sourceId) => {
                const source = sources[sourceId];
                return (
                  <a key={sourceId} href={source.url} target="_blank" rel="noreferrer">
                    <span>{source.institution} · {source.year}</span>
                    <strong>Otwórz źródło<span aria-hidden="true"> ↗</span></strong>
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </dialog>
    </article>
  );
}
