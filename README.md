# LUPO Pizza – review preview

Nezávislý, **neoficiálny demo návrh** webovej prezentácie pre LUPO Pizza (Považská Bystrica).
Tento repozitár slúži výlučne na trvalé preview prostredie vetvy `review` na Verceli.
Nie je to produkčný web ani oficiálna stránka pizzerie.

## Vetvy

- `main` – prázdna vstupná vetva (žiadny production deployment aplikácie)
- `review` – zdrojový kód preview webu; každý push automaticky aktualizuje preview

## Lokálny beh

```bash
npm install
npm run dev     # http://localhost:3000
npm run typecheck
npm run build
```

## Poznámka

Súbory v `tools/` a lokálne `.cmd`/`.ps1` skripty sú zámerne vylúčené z repozitára
(obsahujú lokálne tunelovacie nástroje a logy). Nikdy sa nahrávajú na externé služby.
