import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Polityka prywatności"
};

export default function PrivacyPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Dane osobowe</p>
          <h1>Polityka prywatności.</h1>
          <p className="section-lead">
            Wersja robocza z 3 sierpnia 2026 r. Przed publicznym uruchomieniem formularza dokument
            powinien zostać zatwierdzony przez osobę odpowiedzialną za ochronę danych w Stowarzyszeniu.
          </p>
        </div>
      </section>

      <div className="container">
        <div className="prose">
          <h2>1. Administrator danych</h2>
          <p>
            Administratorem danych osobowych jest Stowarzyszenie Mieszkańców Ławica-Bajkowe,
            ul. Juliana Tuwima 64, 60-195 Poznań, numer w ewidencji 583. Kontakt w sprawach danych
            osobowych: <a href="mailto:halastorpoznan@gmail.com">halastorpoznan@gmail.com</a>.
          </p>

          <h2>2. Jakie dane zbieramy</h2>
          <p>
            W formularzu poparcia zbieramy imię, pierwszą literę nazwiska, miejscowość, opcjonalny
            kod pocztowy, adres e-mail, potwierdzenie pełnoletności oraz informację, czy osoba zgadza
            się na publiczne pokazanie zanonimizowanego wpisu. Dla bezpieczeństwa system może
            zapisać skrót technicznego adresu IP, datę zgłoszenia i podstawowe informacje o przeglądarce.
          </p>

          <h2>3. Cele i podstawy przetwarzania</h2>
          <p>
            Dane przetwarzamy w celu prowadzenia i weryfikacji listy osób popierających żądanie
            przestrzegania norm hałasu przy Torze Poznań, prezentowania liczby zweryfikowanych osób,
            zapobiegania nadużyciom oraz obsługi wycofania poparcia. Podstawą jest zgoda osoby
            przesyłającej formularz. Ze względu na publiczny charakter inicjatywy zgoda obejmuje także
            przetwarzanie danych, które mogłyby zostać uznane za ujawniające poglądy dotyczące spraw
            publicznych. Zgoda może zostać wycofana w każdej chwili.
          </p>

          <h2>4. Co jest widoczne publicznie</h2>
          <p>
            Publicznie może zostać pokazane wyłącznie imię, pierwsza litera nazwiska i miejscowość,
            i tylko wtedy, gdy osoba zaznaczy odpowiednią zgodę. E-mail, kod pocztowy i dane techniczne
            nie są publikowane. Licznik może uwzględniać także osoby, które nie zgodziły się na
            pokazanie swojego zanonimizowanego wpisu.
          </p>

          <h2>5. Odbiorcy i dostawcy techniczni</h2>
          <p>
            Dane mogą być przetwarzane przez dostawców hostingu, bazy danych, zabezpieczeń formularza
            i poczty elektronicznej działających na zlecenie Administratora. W obecnej konfiguracji są to
            w szczególności Netlify i Supabase. Przed uruchomieniem produkcyjnym lista dostawców,
            lokalizacja danych i mechanizmy ewentualnego przekazywania danych poza Europejski Obszar
            Gospodarczy zostaną ostatecznie zweryfikowane i uzupełnione.
          </p>

          <h2>6. Okres przechowywania</h2>
          <p>
            Dane przechowujemy do czasu zakończenia inicjatywy, wycofania zgody albo utraty celu,
            dla którego zostały zebrane. Zgłoszenia odrzucone lub niepotwierdzone będą usuwane zgodnie
            z przyjętym harmonogramem retencji. Dane niezbędne do wykazania prawidłowości operacji
            mogą być przechowywane dłużej, jeżeli wymaga tego obrona przed roszczeniami lub prawo.
          </p>

          <h2>7. Prawa osoby</h2>
          <p>
            Osoba ma prawo żądać dostępu do danych, ich sprostowania, usunięcia, ograniczenia
            przetwarzania, przeniesienia oraz wycofać zgodę. Ma także prawo złożyć skargę do Prezesa
            Urzędu Ochrony Danych Osobowych. Wycofanie zgody nie wpływa na zgodność wcześniejszego
            przetwarzania z prawem.
          </p>

          <h2>8. Wycofanie poparcia</h2>
          <p>
            Aby wycofać poparcie i usunąć wpis, należy napisać z adresu użytego w formularzu na
            <a href="mailto:halastorpoznan@gmail.com"> halastorpoznan@gmail.com</a>.
          </p>

          <h2>9. Pliki cookies i statystyka</h2>
          <p>
            Pierwsza wersja strony nie korzysta z reklamowych narzędzi śledzących ani analityki
            marketingowej. Osadzone filmy YouTube są ładowane z domeny zwiększającej prywatność
            dopiero po wejściu użytkownika w sekcję z nagraniem. Zakres danych technicznych może
            zależeć od działania zewnętrznego odtwarzacza.
          </p>
        </div>
      </div>
    </>
  );
}
