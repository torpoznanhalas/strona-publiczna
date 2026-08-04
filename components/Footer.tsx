import Link from "next/link";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <p className="footer-title">Stowarzyszenie Mieszkańców Ławica-Bajkowe</p>
          <p>Stowarzyszenie zwykłe · nr w ewidencji 583</p>
          <p>
            Kontakt: <a href="mailto:halastorpoznan@gmail.com">halastorpoznan@gmail.com</a>
          </p>
        </div>
        <div className="footer-links">
          <Link href="/polityka-prywatnosci">Polityka prywatności</Link>
          <Link href="/kontakt">Kontakt</Link>
          <Link href="/media">Dla mediów</Link>
        </div>
      </div>
    </footer>
  );
}
