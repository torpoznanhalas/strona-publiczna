import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontakt ze Stowarzyszeniem Mieszkańców Ławica-Bajkowe oraz możliwość przekazania materiałów dotyczących hałasu z Toru Poznań."
};

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Pomóż nam opisać sprawę Toru Poznań precyzyjnie i uczciwie.</h1>
          <p className="page-hero-lead">
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
      </section>

      <section className="section">
        <div className="container">
          <div className="prose">
            <h2>Stowarzyszenie Mieszkańców Ławica-Bajkowe</h2>
            <p>Numer w ewidencji stowarzyszeń zwykłych: 583</p>
            <p>
              E-mail: <a href="mailto:halastorpoznan@gmail.com">halastorpoznan@gmail.com</a>
            </p>
            <p>NIP i REGON zostaną uzupełnione po ich nadaniu.</p>
          </div>
        </div>
      </section>
    </>
  );
}
