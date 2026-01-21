# DYN UI Project Rules

Ova pravila se primenjuju na sve agentske interakcije sa ovim projektom.

---

## 🎯 PRIORITETI

### 1. Dokumentacija je izvor istine
- **UVEK** konsultuj `docs/` folder pre bilo kakve izmene
- Pri konfliktu: dokumentacija > postojeći kod
- Ako dokumentacija nedostaje, predloži ažuriranje

### 2. Token sistem je obavezan
- **NIKADA** ne koristi hardkodirane vrednosti (hex, px, rem)
- **UVEK** koristi `var(--dyn-*)` reference
- Nedostajuće tokene dodaj u `packages/design-tokens/tokens/`

---

## 📋 OBAVEZNE PROVERE

Pre svake isporuke:
1. `pnpm --filter @dyn-ui/design-tokens build` - regeneracija tokena
2. `pnpm --filter @dyn-ui/react build` - build komponenti
3. `pnpm --filter @dyn-ui/react typecheck` - provera tipova
4. Storybook vizuelna verifikacija

---

## 🏗️ STRUKTURA KOMPONENTE

Svaka komponenta MORA imati 6 fajlova:
```
[ComponentName]/
├── [ComponentName].tsx
├── [ComponentName].types.ts
├── [ComponentName].module.css
├── [ComponentName].stories.tsx
├── [ComponentName].test.tsx
└── index.ts
```

---

## 🎨 CSS PRAVILA

### 3-nivoi Fallback Pattern (OBAVEZNO)
```css
property: var(--dyn-[component]-[prop], var(--dyn-[category]-[prop], var(--dyn-[foundation])));
```

### Dark Mode (OBAVEZNO)
```css
[data-theme="dark"] .component { ... }
```

### Naming
- CSS klase: camelCase (`buttonPrimary`, `inputWrapper`)
- Tokeni: kebab-case (`--dyn-button-bg-primary`)

---

## 📚 DOKUMENTACIJA ZA ČITANJE

| Prioritet | Dokument | Kada |
|-----------|----------|------|
| 1 | `docs/DESIGN_TOKEN_SYSTEM.md` | Uvek prvi |
| 2 | `docs/COMPLETE_KNOWLEDGE_BASE.md` | Za detalje |
| 3 | `docs/ARCHITECTURE/*` | Za strukturu |
| 4 | `.agent/skills/component-compliance/SKILL.md` | Za workflow |

---

## 🔄 WORKFLOW FAZE

Za svaku komponentu koristi faze:
1. `/1-analysis` - Analiza
2. `/2-code-audit` - Audit koda
3. `/3-proposal` - Predlog
4. `/4-implementation` - Implementacija
5. `/5-testing` - Testiranje
6. `/6-audit-log` - Dokumentovanje

---

## 🚫 ZABRANE

1. ❌ Hardkodirane hex boje
2. ❌ Hardkodirani px za spacing
3. ❌ Inline styles u React
4. ❌ Preskakanje Storybook verifikacije
5. ❌ Isporuka ako build ne prolazi
6. ❌ Ignorisanje dokumentacije
7. ❌ Kreiranje tokena bez dodavanja u JSON

---

## ✅ OBAVEZE

1. ✅ Čitaj dokumentaciju pre rada
2. ✅ Koristi design tokene
3. ✅ Prati 3-nivoi fallback
4. ✅ Podrži dark mode
5. ✅ Testiraj pre isporuke
6. ✅ Dokumentuj promene u audit logu

---

## 🔗 KLJUČNE LOKACIJE

| Šta | Gde |
|-----|-----|
| Dokumentacija | `docs/` |
| Token JSON | `packages/design-tokens/tokens/` |
| Generisani CSS | `packages/design-tokens/styles/generated/` |
| Komponente | `packages/dyn-ui-react/src/components/` |
| Skill | `.agent/skills/component-compliance/` |
| Workflows | `.agent/workflows/` |
