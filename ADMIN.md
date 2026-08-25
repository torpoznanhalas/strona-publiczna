# Moderowanie listy poparcia

## Codzienna procedura

1. Otwórz Supabase > Table Editor > `supporters`.
2. Ustaw filtr `status = pending`.
3. Sprawdź, czy imię, litera nazwiska i miejscowość wyglądają wiarygodnie.
4. Sprawdź, czy adres e-mail nie jest oczywistym adresem tymczasowym lub błędnym.
5. W razie wątpliwości napisz krótką wiadomość weryfikacyjną z `halastorpoznan@gmail.com`.
6. Zmień status na:
   - `approved`, gdy zgłoszenie uznano za prawidłowe;
   - `rejected`, gdy jest spamem, duplikatem lub zgłoszeniem fikcyjnym.
7. W `moderator_note` zapisz wyłącznie krótką, neutralną informację potrzebną do obsługi zgłoszenia.

## Wycofanie poparcia

Po otrzymaniu wiadomości z adresu e-mail użytego w formularzu:

1. wyszukaj rekord po adresie e-mail;
2. zmień status na `withdrawn`;
3. jeżeli osoba zażąda usunięcia danych i nie istnieje podstawa do dalszego przechowywania, usuń rekord;
4. odpowiedz, że operacja została wykonana.

## Zasady bezpieczeństwa

- Nie eksportuj bazy na prywatny komputer bez wyraźnej potrzeby.
- Nie przesyłaj arkuszy z danymi przez komunikatory.
- Dostęp do Supabase powinny mieć maksymalnie 2–3 upoważnione osoby.
- Każda osoba używa własnego konta i uwierzytelniania dwuskładnikowego.
- Klucz serwerowy Supabase pozostaje wyłącznie w zmiennych środowiskowych Netlify.
- Nie publikuj adresów e-mail, kodów pocztowych, adresów IP ani notatek moderatora.

## Lejek kampanii

Widok `support_funnel_by_content` pokazuje dla każdej ścieżki (`page_path`) i każdego `utm_content`
liczbę wizyt, wyświetleń formularza, rozpoczęć i skutecznych zapisów. Szczegółowe UTM skutecznej
konwersji są także zapisane w rekordzie `supporters`; nie są publicznie zwracane przez API strony.


## Publiczna lista osób wspierających

Publiczna lista i pasek pod nagłówkiem pokazują wyłącznie wpisy ze statusem `approved`
oraz z `public_display_consent = true`.

Dla zgłoszeń zapisanych z wersją zgody `2026-08-04-v2` publicznie mogą być pokazane:
imię, pierwsza litera nazwiska, miejscowość, pełny kod pocztowy (jeżeli podany) i data dołączenia.
Starsze zgłoszenia są wyświetlane bez kodu pocztowego.
