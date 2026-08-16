import Link from "next/link";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <p className="footer-title">Stowarzyszenie Mieszkańców Ławica-Bajkowe.<br></br>
            Stowarzyszenie Przyjaciół Przeźmierowa i Baranowa.<br></br>
            Stowarzyszenie Wolna Wola.<br></br>
            Mieszkańcy Smochowic.<br></br><br></br>
          </p>

          <p>
            Kontakt: <a href="mailto:halastorpoznan@gmail.com">halastorpoznan@gmail.com</a>
          </p>
        </div>
        <div className="footer-links">
          <Link href="/fakty">Fakty</Link>
          <Link href="/historia">Historia Toru Poznań</Link>
          <Link href="/polityka-prywatnosci">Polityka prywatności</Link>
          <Link href="/kontakt">Kontakt</Link>
        </div>
      </div>
    </footer>
  );
}
