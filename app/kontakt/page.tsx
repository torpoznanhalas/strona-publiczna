import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Skontaktuj się z lokalnymi stowarzyszeniami i mieszkańcami działającymi na rzecz ograniczenia hałasu z Toru Poznań."
};

export default function ContactPage() {
  return (
    <>
      <section className="page-hero contact-hero">
        <div className="container">
          <h1>Skontaktuj się z nami i dołącz do działania!</h1>
          <p className="page-hero-lead">
            Jesteś mieszkańcem <strong>Ławicy, Osiedla Bajkowego, Przeźmierowa, Smochowic lub
            Woli</strong>? Chcesz zadbać o zdrowie swoje, swoich dzieci i całej rodziny? Nie bądź
            bierny — Twój głos i zaangażowanie mają realną moc!
          </p>

          <div className="contact-reasons">
            <h2>Dlaczego warto do nas napisać i zostawić kontakt?</h2>
            <ul>
              <li>
                <strong>Inicjujemy dialog z władzami:</strong> Planujemy oficjalne rozmowy z władzami
                Miasta Poznania, Gminy Tarnowo Podgórne oraz zarządem Automobilklubu Wielkopolskiego.
              </li>
              <li>
                <strong>Łączymy lokalne siły:</strong> Organizujemy spotkania z przedstawicielami
                naszych lokalnych społeczności, by budować silną, wspólną reprezentację.
              </li>
              <li>
                <strong>Współpracujemy z mediami i stowarzyszeniami:</strong> Nagłaśniamy problem,
                przyjmujemy nagrania hałasu z Waszych okolic i wspieramy inne grupy walczące o
                praworządność.
              </li>
            </ul>
          </div>

          <div className="button-row">
            <a className="button button-accent" href="mailto:halastorpoznan@gmail.com">
              Napisz do nas
            </a>
          </div>
        </div>
      </section>

      <section className="section contact-details-section">
        <div className="container">
          <div className="prose contact-details">
            <h2>Organizacje i społeczności zaangażowane w działania</h2>
            <ul className="contact-organizations">
              <li>Stowarzyszenie Mieszkańców Ławica-Bajkowe</li>
              <li>Stowarzyszenie Przyjaciół Przeźmierowa i Baranowa</li>
              <li>Stowarzyszenie Wolna Wola</li>
              <li>Mieszkańcy Smochowic</li>
            </ul>

          </div>
        </div>
      </section>
    </>
  );
}
