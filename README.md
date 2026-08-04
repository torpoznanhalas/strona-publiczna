# torpoznanhalas.pl

Minimalistyczna strona Stowarzyszenia Mieszkańców Ławica-Bajkowe poświęcona hałasowi emitowanemu przez Tor Poznań, nagraniom i liście społecznego poparcia.

## Hosting

Strona jest wdrażana automatycznie z GitHuba do Netlify. Baza zgłoszeń działa w Supabase.

## Zmienne środowiskowe w Netlify

```text
NEXT_PUBLIC_SUPABASE_URL
SUPABASE_SECRET_KEY lub SUPABASE_SERVICE_ROLE_KEY
IP_HASH_SALT
```

Kluczy serwerowych nigdy nie umieszczaj w kodzie ani w publicznym repozytorium.

## Filmy YouTube

Nagrania są konfigurowane w `content/videos.ts`. W polu `youtubeId` wpisujemy identyfikator filmu, nie cały adres.

## Moderowanie poparcia

Nowe wpisy otrzymują status `pending`. Licznik obejmuje wyłącznie wpisy ze statusem `approved`.

- `approved` — doliczony do licznika,
- `pending` — czeka na weryfikację,
- `rejected` — odrzucony,
- `withdrawn` — poparcie wycofane.

## Ważne przed publiczną premierą

1. Zatwierdź politykę prywatności z osobą znającą RODO.
2. Skonfiguruj ochronę formularza przed botami.
3. Uzupełnij NIP i REGON po ich nadaniu.
4. Każde oskarżenie personalne lub dotyczące bezprawności oprzyj na wiarygodnym źródle.


## Publiczna lista poparcia

Pasek pod nagłówkiem i przewijana lista przy formularzu korzystają z endpointu
`/api/supporters`. Pokazują tylko zatwierdzone wpisy z włączoną zgodą na publiczną prezentację.
Nowe zgłoszenia zapisują wersję zgody `2026-08-04-v2`, która obejmuje pełny kod pocztowy,
jeżeli osoba go podała.
