# 💎 Token Maintenance Guide

Ovaj vodič definiše standarde za upravljanje Design Tokenima u `dyn-ui` sistemu.

## 📐 Arhitektura (Unified Token Strategy)
Sistem se oslanja na 3 nivoa varijabli:
1. **Layer 1 (Foundations)**: Globalni defaulti (`--dyn-font-size-sm`). Definisani u `tokens/foundations/`.
2. **Layer 2 (Semantic Bridge)**: Komponentni tokeni (`--dyn-btn-bg: var(--dyn-theme-primary)`). Definisani u `tokens/<component>.json`.
3. **Layer 3 (Overrides)**: Korisnički override (`--dyn-btn-bg: red`). Definiše se inline ili u eksternom CSS-u.

## 📝 Pravila za JSON definicije
- **Bez `.value` sufiksa u aliasima**: Koristi `{size.spacing.md}` a ne `{size.spacing.md.value}`.
- **Semantičko imenovanje**: Token treba da opisuje *namenu*, ne *vrednost* (npr. `action-fontSize` a ne `font-size-12`).
- **Referenciranje**: Uvek referenciraj Foundation tokene umesto hardkodovanja hex boja ili px vrednosti.
- **Dark Mode**: Nemoj praviti manuelne `darkMode` blokove u komponentnim JSON-ovima. Koristi **Semantic Tokens** iz `color/semantic.json` koji već imaju definisanu `darkTheme` granu.

## 🚀 Kako dodati novi token?
1. Otvori odgovarajući JSON fajl u `packages/design-tokens/tokens/`.
2. Dodaj novu definiciju prateći hijerarhiju.
3. Ako je to nova komponenta, dodaj njen `.json` fajl i ažuriraj `style-dictionary.config.v2.js` da generiše odgovarajući `.css`.
4. Pokreni `npm run build:tokens-only` u `packages/design-tokens`.

## 🛠️ Modifikacija i brisanje
- **Modifikacija**: Promena u JSON-u će automatski uticati na sve komponente koje koriste taj token nakon builda.
- **Brisanje**: Pre brisanja, proveri `grep` pretragom da se token ne koristi u `.tsx` ili `.module.css` fajlovima.
