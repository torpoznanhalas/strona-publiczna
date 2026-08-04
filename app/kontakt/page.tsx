import type { Metadata } from "next";

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
          <h1>Skontaktuj się z nami</h1>
          <p className="page-hero-lead">
            Spotykamy się z przedstawicielami prasy, przyjmujemy nagrania z okolicznych dzielnic,
            wspieramy inne stowarzyszenia i mieszkańców Poznania w walce z hałasem!
          </p>
          <div className="button-row">
            <a className="button button-accent" href="mailto:halastorpoznan@gmail.com">
              Napisz do nas
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="prose" style={{ paddingTop: 0 }}>
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
