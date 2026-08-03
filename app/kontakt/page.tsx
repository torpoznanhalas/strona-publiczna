import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt"
};

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Kontakt</p>
          <h1>Napisz do nas.</h1>
        </div>
      </section>
      <div className="container">
        <div className="prose">
          <h2>Stowarzyszenie Mieszkańców Ławica-Bajkowe</h2>
          <p>
            ul. Juliana Tuwima 64<br />
            60-195 Poznań<br />
            numer w ewidencji: 583
          </p>
          <p>
            E-mail: <a href="mailto:halastorpoznan@gmail.com">halastorpoznan@gmail.com</a>
          </p>
          <p>NIP i REGON zostaną uzupełnione po ich nadaniu.</p>
        </div>
      </div>
    </>
  );
}
