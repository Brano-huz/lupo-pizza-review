# LUPO Pizza – trvalé review preview

Stabilná verejná adresa: **https://lupo-pizza-review-review.vercel.app**

Ide o **neoficiálny demo návrh** webovej prezentácie LUPO Pizza, nie o oficiálny web podniku. Stránka je zámerne označená `noindex, nofollow` – nie je určená na indexovanie vyhľadávačmi.

## Čo je nastavené

- GitHub repozitár: `Brano-huz/lupo-pizza-review` (verejný, obsahuje iba odsúhlasené súbory).
- Vetva `main`: iba README (žiadna aplikácia).
- Vetva `review`: kompletný zdrojový kód aplikácie.
- Vercel projekt: `lupo-pizza-review`.
- Deployment typu **Preview** (nie Production) beží na Verceli, funguje aj pri vypnutom počítači.
- Stabilný alias: `lupo-pizza-review-review.vercel.app`.
- `NEXT_PUBLIC_SITE_URL` = stabilná adresa, aby canonical/OG odkazy zostávali rovnaké.
- Vercel Authentication (prihlasovacia ochrana) je pre tento projekt vypnutá, aby bola stránka prístupná bez konta a bez CAPTCHA.
- Framework projektu je nastavený na `nextjs` (inyak Vercel nenasmeroval routy `/` a `/menu`).

## Aktuálna adresa

Aktuálna adresa je uložená aj v súbore `review-url.txt`.

## Ako aktualizovať preview (spôsob, ktorý funguje teraz)

V priečinku projektu (`projects\lupo-pizza`) v PowerShelli:

```powershell
# 1) Urob zmenu v kóde a potvrď ju do vetvy review
git checkout review
git add -A
git commit -m "Popis zmeny"
git push origin review

# 2) Vytvor nový Preview deployment
npx vercel@latest deploy --target preview --yes
```

Výstup príkazu `deploy` vypíše novú adresu v tvare
`https://lupo-pizza-review-<id>-brano-huz.vercel.app`. Presmeruj na ňu stabilný alias:

```powershell
npx vercel@latest alias set <nová-adresa-z-vystupu> lupo-pizza-review-review.vercel.app
```

Overenie:

```powershell
curl.exe -sS -o NUL -w "%{http_code}`n" https://lupo-pizza-review-review.vercel.app/
curl.exe -sS -o NUL -w "%{http_code}`n" https://lupo-pizza-review-review.vercel.app/menu
```

Očakávaný výsledok je `200` pre obe adresy.

> Pozor: nepoužívaj `npx vercel deploy --prod` ani `vercel promote` – vytvorili by Production deployment, čo nie je želaný stav.

## Automatická aktualizácia po pushi do `review`

Automatické spustenie deploymentu priamo z GitHubu vyžaduje, aby mal Vercel v GitHub účte nainštalovanú aplikáciu **Vercel** s prístupom k repozitáru `lupo-pizza-review`. Táto inštalácia zatiaľ dokončená nie je (vyžaduje autorizáciu v prehliadači, ktorá sa nedá urobiť cez API bez prístupu k kľúčom GitHub App).

Po jednorazovej inštalácii aplikácie už stačí urobiť tieto kroky:

1. V termináli v projekte:
   ```powershell
   npx vercel@latest git connect https://github.com/Brano-huz/lupo-pizza-review.git --project lupo-pizza-review
   ```
2. Nastaviť produkčnú vetvu na neexistujúcu vetvu, aby nevznikol Production deployment:
   ```powershell
   npx vercel@latest project update lupo-pizza-review --git-branch production
   ```
3. Overiť v prehliadači v časti projektu **Settings → Git**, že repozitár je pripojený a Production Branch je `production`.

Odvtedy každý push do vetvy `review` vytvorí nový Preview deployment. Ak by sa zmenila adresa deploymentu, treba znova nastaviť alias podľa kroku vyššie.

## Bezpečnosť

- Do repozitára sa nenahrávajú súkromné kľúče, logy, tunely ani lokálne skripty – pozri `.gitignore`.
- Prihlásenie do GitHubu a Vercelu prebehlo v prehliadači; žiadne heslá ani tokeny sa nepredávali.
- Administrácia projektu ani osobné údaje nie sú súčasťou verzie zverejnenej na adrese vyššie.
