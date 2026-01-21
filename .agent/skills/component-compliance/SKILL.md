---
name: Component Compliance
description: Osigurava da sve komponente prate dokumentaciju i koriste design tokene iz design-tokens paketa
---

# Component Compliance Skill

Ovaj skill osigurava da sve DYN UI komponente budu potpuno usklađene sa projektnom dokumentacijom i design token sistemom.

---

## 🎯 GOLDEN RULES

### 1. Svi stilovi MORAJU dolaziti iz design-tokens paketa

```css
/* ❌ ZABRANJENO - hardkodirane vrednosti */
.button { 
  background: #3b82f6; 
  padding: 12px 24px;
  font-size: 14px;
}

/* ✅ OBAVEZNO - tokeni iz design-tokens */
.button {
  background: var(--dyn-button-bg, var(--dyn-color-primary, var(--dyn-color-blue-500)));
  padding: var(--dyn-button-padding-y, var(--dyn-spacing-3)) var(--dyn-button-padding-x, var(--dyn-spacing-6));
  font-size: var(--dyn-button-font-size, var(--dyn-font-size-sm));
}
```

### 2. Token JSON fajlovi su jedini izvor istine

**Lokacija**: `packages/design-tokens/tokens/`

```
tokens/
├── animation/transition.json   # Animacije i tranzicije
├── color/
│   ├── base.json              # Bazne boje (palette)
│   ├── semantic.json          # Semantičke boje
│   ├── action.json            # Akcione boje
│   ├── feedback.json          # Feedback boje
│   ├── neutral.json           # Neutralne boje
│   └── theme.json             # Tema boje
├── size/
│   ├── spacing.json           # Spacing vrednosti
│   ├── font.json              # Font sizes
│   └── border.json            # Border values
├── shadow/elevation.json       # Shadows
├── layout/layout.json          # Layout tokeni
└── [component].json            # Component-specific tokeni
```

### 3. 3-nivoi Fallback Pattern

```css
var(--dyn-[component]-[property], var(--dyn-[category]-[property], var(--dyn-[foundation])))
```

**Primer**:
```css
color: var(--dyn-button-text-color, var(--dyn-color-text-primary, var(--dyn-color-gray-900)));
```

### 4. Organizacija fajlova mora pratiti dokumentaciju

**Komponenta mora imati 6 fajlova**:
```
packages/dyn-ui-react/src/components/[ComponentName]/
├── [ComponentName].tsx           # React komponenta
├── [ComponentName].types.ts      # TypeScript tipovi
├── [ComponentName].module.css    # CSS stilovi
├── [ComponentName].stories.tsx   # Storybook
├── [ComponentName].test.tsx      # Jest testovi
└── index.ts                      # Export
```

### 5. Ista pravila važe za funkcionalnost komponenti

Pored stilova, ista logika se primenjuje na:
- **Props i API** - moraju pratiti dokumentaciju
- **Accessibility** - aria atributi, keyboard navigation
- **Event handling** - konzistentno sa drugim komponentama
- **State management** - forwardRef, controlled/uncontrolled

Ako nedostaje ključna funkcionalnost → dokumentuj u audit fajlu → implementiraj.

---

## 📋 COMPONENT AUDIT SISTEM

### Lokacija
```
docs/audit/
├── README.md           # Vodič za audit
├── _TEMPLATE.md        # Template za novi audit
└── [Component].audit.md # Audit fajl za svaku komponentu
```

### Kada kreirati audit fajl
- Pre svake modifikacije komponente
- Kada se otkrije nedostatak
- Kada funkcionalnost ne prati dokumentaciju

### Šta dokumentovati
1. **Sugestije** - predlozi za poboljšanje
2. **Razlike** - trenutno stanje vs dokumentacija
3. **Nedostaci** - funkcionalnosti koje fale
4. **Token dopune** - JSON tokeni koji nedostaju
5. **Čeklista** - stavke za implementaciju

### Kako koristiti
```powershell
# Kopiraj template za novu komponentu
Copy-Item "docs/audit/_TEMPLATE.md" "docs/audit/[ComponentName].audit.md"
```

### Životni ciklus audit fajla
1. **Kreiranje**: Tokom `/1-analysis` faze
2. **Popunjavanje**: Tokom `/2-code-audit` i `/3-proposal` faza
3. **Ažuriranje čekliste**: Tokom `/4-implementation` faze
4. **Finalizacija**: Tokom `/6-audit-log` faze
5. **Ponovno otvaranje**: Ako se otkriju novi problemi

---

## 📚 OBAVEZNA DOKUMENTACIJA

Pre rada na bilo kojoj komponenti, MORAŠ pročitati:

### Primarna dokumentacija
1. `docs/DESIGN_TOKEN_SYSTEM.md` - Token sistem (NAJVIŠI PRIORITET)
2. `docs/COMPLETE_KNOWLEDGE_BASE.md` - Kompletna referenca
3. `docs/QUICK_START.md` - Brzi pregled

### Arhitektura
4. `docs/ARCHITECTURE/00_ARCHITECTURE_COMPONENT_STRUCTURE.md`
5. `docs/ARCHITECTURE/01_ARCHITECTURE_TOKEN_HIERARCHY.md`
6. `docs/ARCHITECTURE/02_ARCHITECTURE_COMPONENT_CATEGORIES.md`
7. `docs/ARCHITECTURE/03_ARCHITECTURE_NAMING_CONVENTIONS.md`
8. `docs/ARCHITECTURE/04_ARCHITECTURE_FILE_ORGANIZATION.md`

### Template (za referencu)
9. `docs/TEMPLATE/DinComponentTemplate.tsx`
10. `docs/TEMPLATE/DinComponentTemplate.module.css`

---

## 🔄 WORKFLOW FAZE

Ovaj skill koristi 6 workflow faza. Svaka faza se izvršava sekvencijalno:

| Faza | Workflow | Opis |
|------|----------|------|
| 1 | `/1-analysis` | Analiza komponente i dokumentacije |
| 2 | `/2-code-audit` | Provera koda i token usklađenosti |
| 3 | `/3-proposal` | Predlog korekcija i dodataka |
| 4 | `/4-implementation` | Implementacija rešenja |
| 5 | `/5-testing` | Testiranje i verifikacija |
| 6 | `/6-audit-log` | Ažuriranje audit loga |

---

## ✅ PRE-DELIVERY CHECKLIST

Pre isporuke bilo kog rešenja, OBAVEZNO:

### Build & Tokens
```powershell
# 1. Ako si menjao JSON token fajlove
cd e:\PROGRAMING\AI_Projects\dyn-ui-main-v02
pnpm --filter @dyn-ui/design-tokens tokens:validate
pnpm --filter @dyn-ui/design-tokens build

# 2. Build komponente
pnpm --filter @dyn-ui/react build

# 3. Type check
pnpm --filter @dyn-ui/react typecheck
```

### Testing
```powershell
# 4. Unit tests za komponentu
pnpm --filter @dyn-ui/react test -- --grep="ComponentName"

# 5. Lint
pnpm --filter @dyn-ui/react lint
```

### Visual Verification
```powershell
# 6. Storybook
pnpm storybook
```

U Storybook-u proveri:
- [ ] Light mode izgled
- [ ] Dark mode izgled
- [ ] Sve varijante (size, variant)
- [ ] Sva stanja (hover, active, disabled, focus)
- [ ] Responsive ponašanje

---

## 🔍 KAKO PRONAĆI NEDOSTAJUĆE TOKENE

### Korak 1: Skeniraj CSS za hardkodirane vrednosti

Traži:
- Hex boje: `#[0-9a-fA-F]{3,8}`
- RGB: `rgb\(|rgba\(`
- Hardkodiran px: `\d+px` (osim u calc())
- Hardkodiran rem/em: `\d+rem|\d+em`

### Korak 2: Proveri da li token postoji

```powershell
# Pretraži postojeće tokene
cd e:\PROGRAMING\AI_Projects\dyn-ui-main-v02\packages\design-tokens
grep -r "property-name" tokens/
```

### Korak 3: Dodaj nedostajući token u JSON

```json
// tokens/[component].json
{
  "dyn": {
    "button": {
      "padding": {
        "x": { "value": "{dyn.spacing.6}" },
        "y": { "value": "{dyn.spacing.3}" }
      }
    }
  }
}
```

### Korak 4: Regeneriši tokene

```powershell
pnpm --filter @dyn-ui/design-tokens build
```

---

## 🚫 ZABRANE

1. **NIKADA** ne koristi hardkodirane hex boje
2. **NIKADA** ne koristi hardkodirane px vrednosti za spacing
3. **NIKADA** ne koristi inline styles u React komponentama
4. **NIKADA** ne preskači vizuelnu verifikaciju u Storybook
5. **NIKADA** ne isporučuj rešenje ako build ne prolazi

---

## 📝 AUDIT LOG FORMAT

Za svaku obrađenu komponentu, dokumentuj:

```markdown
## [ComponentName] - [Datum]

### Promene
- [ ] CSS: [opis promena]
- [ ] TSX: [opis promena]
- [ ] Tokens: [novi tokeni dodati]

### Verifikacija
- [ ] Build: PASS/FAIL
- [ ] TypeCheck: PASS/FAIL
- [ ] Tests: PASS/FAIL
- [ ] Storybook: PASS/FAIL

### Napomene
[Bilo kakve dodatne napomene]
```

---

## 🔗 REFERENCE

- Token Generation: `packages/design-tokens/style-dictionary.config.v2.js`
- Token Validation: `packages/design-tokens/scripts/validate-tokens.js`
- Generated CSS: `packages/design-tokens/styles/generated/`
- Generated JS: `packages/design-tokens/build/js/`
