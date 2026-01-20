# 🎨 DYN UI Design Token System

## Definitivni Vodič (v1.0)

**Svrha**: Jedan izvor istine za generisanje i primenu design tokena u DYN UI biblioteci.

---

## 📋 Sadržaj

1. [Šta su Design Tokeni?](#šta-su-design-tokeni)
2. [Arhitektura Sistema](#arhitektura-sistema)
3. [Katalog Tokena](#katalog-tokena)
4. [Generisanje CSS Varijabli](#generisanje-css-varijabli)
5. [Primena na Komponente](#primena-na-komponente)
6. [Dark Mode Podrška](#dark-mode-podrška)
7. [Dodavanje Novih Tokena](#dodavanje-novih-tokena)
8. [Pravila i Konvencije](#pravila-i-konvencije)

---

## Šta su Design Tokeni?

**Design tokeni** su atomske vrednosti dizajna (boje, razmaci, veličine, animacije) definisane na **jednom mestu** i korišćene **svuda** u aplikaciji.

### Zašto koristimo tokene?

| Problem bez tokena | Rešenje sa tokenima |
|---|---|
| `color: #007bff;` hardkodovano u 50 fajlova | Jedna promena u `theme.json` → ažurira sve |
| Nedosledan dizajn (različiti nijanse plave) | Garantovana konzistentnost |
| Teško održavanje | Lako skaliranje i brendiranje |
| Ručni dark mode | Automatski dark mode kroz tokene |

### Osnovni princip

```
📁 JSON Token Fajl          🔄 Build Process           🎨 CSS Varijable
     ↓                           ↓                          ↓
color/theme.json     →    Style Dictionary     →    --dyn-theme-primary
"#007bff"                                               #007bff
```

---

## Arhitektura Sistema

### Struktura Direktorijuma

```
packages/design-tokens/
├── tokens/                          # 📝 IZVOR: JSON definicije
│   ├── animation/
│   │   └── transition.json          # Tranzicije, trajanja, easing
│   ├── color/
│   │   ├── action.json              # Akcijske boje (default, hover, pressed)
│   │   ├── base.json                # Bazne boje (white, black)
│   │   ├── feedback.json            # Feedback boje (success, error, warning, info)
│   │   ├── neutral.json             # Grayscale paleta (light, mid, dark)
│   │   ├── semantic.json            # ⭐ Semantičke boje (background, text, border)
│   │   └── theme.json               # Tema boje (primary, secondary, accent)
│   ├── layout/
│   │   └── layout.json              # Z-index, opacity, breakpoints, containers
│   ├── shadow/
│   │   └── elevation.json           # Senke i elevacije
│   └── size/
│       ├── border.json              # Debljine i radijusi
│       ├── font.json                # Font veličine, težine, line-height
│       └── spacing.json             # Razmaci (2xs do 4xl)
│
├── styles/                          # 🎨 IZLAZ: Generisani CSS
│   ├── foundations/
│   │   └── index.css                # ⭐ Svi foundation tokeni
│   ├── components/
│   │   ├── badge.css                # Badge-specifični tokeni
│   │   ├── avatar.css               # Avatar-specifični tokeni
│   │   └── ...
│   └── themes/
│       └── dark.css                 # Dark tema override-ovi
│
├── style-dictionary.config.v2.js    # ⚙️ Build konfiguracija
└── package.json
```

### Hijerarhija Tokena (3 Sloja)

```
┌─────────────────────────────────────────────────────────────────┐
│                      LAYER 3: THEME TOKENS                       │
│                    (Optional, Dark Mode, Branding)                │
│   @media (prefers-color-scheme: dark) { --dyn-semantic-bg: ... } │
├─────────────────────────────────────────────────────────────────┤
│                    LAYER 2: COMPONENT TOKENS                      │
│                      (CSS Module :root block)                     │
│   :root { --dyn-button-bg: var(--dyn-theme-primary); }           │
├─────────────────────────────────────────────────────────────────┤
│                   LAYER 1: FOUNDATION TOKENS                      │
│              (Generated from JSON, Immutable Base)                │
│   :root { --dyn-theme-primary: #007bff; }                        │
└─────────────────────────────────────────────────────────────────┘
```

---

## Katalog Tokena

### 🎨 Boje

#### Semantičke (koriste se najčešće)
| Token | Light | Dark | Upotreba |
|-------|-------|------|----------|
| `--dyn-semantic-background` | #ffffff | #121212 | Pozadina stranice |
| `--dyn-semantic-surface` | #fafafa | #212121 | Kartice, paneli |
| `--dyn-semantic-surface-muted` | #f5f5f5 | #424242 | Disabled pozadine |
| `--dyn-semantic-surface-hover` | #f5f5f5 | #424242 | Hover stanja |
| `--dyn-semantic-text` | #212121 | #fafafa | Primarni tekst |
| `--dyn-semantic-text-secondary` | #757575 | #bdbdbd | Sekundarni tekst |
| `--dyn-semantic-text-muted` | #bdbdbd | #757575 | Placeholder |
| `--dyn-semantic-text-inverse` | #ffffff | #121212 | Tekst na tamnoj pozadini |
| `--dyn-semantic-border` | #eeeeee | #424242 | Borderi |
| `--dyn-semantic-input-bg` | #ffffff | #121212 | Input pozadina |
| `--dyn-semantic-input-border` | #eeeeee | #424242 | Input border |

#### Tema
| Token | Vrednost | Upotreba |
|-------|----------|----------|
| `--dyn-theme-primary` | #007bff | Primarna akcija |
| `--dyn-theme-primary-light` | #4da3ff | Hover/lighter |
| `--dyn-theme-primary-dark` | #0056b3 | Pressed/darker |
| `--dyn-theme-secondary` | #6c757d | Sekundarna akcija |
| `--dyn-theme-accent` | #17a2b8 | Akcentna boja |

#### Feedback
| Token | Vrednost | Upotreba |
|-------|----------|----------|
| `--dyn-feedback-positive` | #28a745 | Uspeh |
| `--dyn-feedback-negative-default` | #dc3545 | Greška |
| `--dyn-feedback-warning` | #ffc107 | Upozorenje |
| `--dyn-feedback-info` | #17a2b8 | Informacija |

#### Neutralne (Grayscale)
| Token | Vrednost |
|-------|----------|
| `--dyn-neutral-light-50` | #fafafa |
| `--dyn-neutral-light-100` | #f5f5f5 |
| `--dyn-neutral-light-200` | #eeeeee |
| `--dyn-neutral-mid-400` | #bdbdbd |
| `--dyn-neutral-mid-500` | #9e9e9e |
| `--dyn-neutral-mid-600` | #757575 |
| `--dyn-neutral-dark-700` | #616161 |
| `--dyn-neutral-dark-800` | #424242 |
| `--dyn-neutral-dark-900` | #212121 |
| `--dyn-neutral-dark-950` | #121212 |

#### Bazne
| Token | Vrednost |
|-------|----------|
| `--dyn-base-white` | #ffffff |
| `--dyn-base-black` | #000000 |

---

### 📏 Razmaci (Spacing)

| Token | Vrednost | Pikseli |
|-------|----------|---------|
| `--dyn-spacing-none` | 0 | 0px |
| `--dyn-spacing-2xs` | 2px | 2px |
| `--dyn-spacing-xs` | 4px | 4px |
| `--dyn-spacing-sm` | 8px | 8px |
| `--dyn-spacing-md` | 16px | 16px |
| `--dyn-spacing-lg` | 24px | 24px |
| `--dyn-spacing-xl` | 32px | 32px |
| `--dyn-spacing-2xl` | 48px | 48px |
| `--dyn-spacing-3xl` | 64px | 64px |
| `--dyn-spacing-4xl` | 96px | 96px |

---

### 🔤 Tipografija

#### Font Veličine
| Token | Vrednost |
|-------|----------|
| `--dyn-font-size-2xs` | 10px |
| `--dyn-font-size-xs` | 12px |
| `--dyn-font-size-sm` | 14px |
| `--dyn-font-size-md` | 16px |
| `--dyn-font-size-lg` | 18px |
| `--dyn-font-size-xl` | 20px |
| `--dyn-font-size-2xl` | 24px |
| `--dyn-font-size-3xl` | 30px |

#### Font Težine
| Token | Vrednost |
|-------|----------|
| `--dyn-font-weight-normal` | 400 |
| `--dyn-font-weight-medium` | 500 |
| `--dyn-font-weight-semibold` | 600 |
| `--dyn-font-weight-bold` | 700 |

---

### 🔲 Borderi

#### Debljine
| Token | Vrednost |
|-------|----------|
| `--dyn-border-width-none` | 0px |
| `--dyn-border-width-sm` | 1px |
| `--dyn-border-width-md` | 2px |
| `--dyn-border-width-lg` | 3px |
| `--dyn-border-width-xl` | 4px |

#### Radijusi
| Token | Vrednost |
|-------|----------|
| `--dyn-border-radius-none` | 0px |
| `--dyn-border-radius-xs` | 2px |
| `--dyn-border-radius-sm` | 4px |
| `--dyn-border-radius-md` | 6px |
| `--dyn-border-radius-lg` | 8px |
| `--dyn-border-radius-xl` | 12px |
| `--dyn-border-radius-full` | 9999px |

---

### ⏱️ Animacije

#### Tranzicije (gotove vrednosti)
| Token | Vrednost | Upotreba |
|-------|----------|----------|
| `--dyn-transition-none` | none | Bez tranzicije |
| `--dyn-transition-fast` | 0.1s ease | Mikro-interakcije |
| `--dyn-transition-normal` | 0.2s ease-in-out | Standardna |
| `--dyn-transition-slow` | 0.3s ease-in-out | Naglašena |
| `--dyn-transition-slower` | 0.5s ease-in-out | Dramatična |

#### Trajanja (samo brzina)
| Token | Vrednost |
|-------|----------|
| `--dyn-duration-instant` | 0ms |
| `--dyn-duration-fast` | 100ms |
| `--dyn-duration-normal` | 200ms |
| `--dyn-duration-slow` | 300ms |
| `--dyn-duration-slower` | 500ms |
| `--dyn-duration-slowest` | 1000ms |

---

### 📊 Elevacije (Senke)

| Token | Upotreba |
|-------|----------|
| `--dyn-elevation-none` | Bez senke |
| `--dyn-elevation-low` | Kartice, paneli |
| `--dyn-elevation-medium` | Dropdown, popovers |
| `--dyn-elevation-high` | Modali |
| `--dyn-elevation-highest` | Tooltips, notifikacije |

---

### 📐 Z-Index

| Token | Vrednost | Upotreba |
|-------|----------|----------|
| `--dyn-z-index-hide` | -1 | Skriveno |
| `--dyn-z-index-base` | 0 | Normalan sadržaj |
| `--dyn-z-index-dropdown` | 100 | Dropdown meniji |
| `--dyn-z-index-sticky` | 200 | Sticky elementi |
| `--dyn-z-index-fixed` | 300 | Fixed elementi |
| `--dyn-z-index-overlay` | 400 | Overlay pozadine |
| `--dyn-z-index-modal` | 500 | Modali |
| `--dyn-z-index-popover` | 600 | Popovers |
| `--dyn-z-index-toast` | 700 | Toast notifikacije |

---

## Generisanje CSS Varijabli

### Build Komanda

```bash
# Iz root direktorijuma projekta
npm run tokens:build

# Ili direktno u design-tokens paketu
cd packages/design-tokens
npm run build
```

### Šta se dešava tokom build-a?

```
1. Čitanje JSON fajlova      →  tokens/**/*.json
2. Transformacija imena      →  color.theme.primary → --dyn-theme-primary
3. Transformacija vrednosti  →  {color.neutral.light.50.value} → #fafafa
4. Generisanje CSS           →  styles/foundations/index.css
5. Dark mode generisanje     →  @media (prefers-color-scheme: dark) { ... }
```

### Izlazni Fajlovi

| Fajl | Sadržaj |
|------|---------|
| `styles/foundations/index.css` | Svi foundation tokeni (boje, spacing, tipografija, itd.) |
| `styles/components/badge.css` | Badge-specifični tokeni |
| `build/js/tokens.js` | JavaScript export |
| `build/ts/tokens.d.ts` | TypeScript tipovi |

---

## Primena na Komponente

### Struktura CSS Modula

```css
/* DynComponent.module.css */

/* ================================================
   1. COMPONENT TOKENS (Layer 2) - u :root bloku
   ================================================ */
:root {
  --dyn-component-bg: var(--dyn-semantic-surface);
  --dyn-component-color: var(--dyn-semantic-text);
  --dyn-component-border: var(--dyn-semantic-border);
  --dyn-component-radius: var(--dyn-border-radius-md);
  --dyn-component-padding: var(--dyn-spacing-md);
  --dyn-component-transition: var(--dyn-transition-normal);
}

/* ================================================
   2. BASE STYLES - koriste tokene
   ================================================ */
.root {
  background-color: var(--dyn-component-bg);
  color: var(--dyn-component-color);
  border: var(--dyn-border-width-sm) solid var(--dyn-component-border);
  border-radius: var(--dyn-component-radius);
  padding: var(--dyn-component-padding);
  transition: all var(--dyn-component-transition);
}

/* ================================================
   3. INTERACTIVE STATES
   ================================================ */
.root:hover {
  background-color: var(--dyn-semantic-surface-hover);
}

.root:focus-visible {
  outline: var(--dyn-border-width-md) solid var(--dyn-semantic-border-focus);
  outline-offset: var(--dyn-spacing-2xs);
}

/* ================================================
   4. VARIANTS (override-uju samo tokene)
   ================================================ */
.primary {
  --dyn-component-bg: var(--dyn-theme-primary);
  --dyn-component-color: var(--dyn-semantic-text-inverse);
}

/* ================================================
   5. DARK MODE
   Note: Automatski kroz semantičke tokene!
   ================================================ */
```

### ⚠️ ZABRANJENO

```css
/* ❌ NIKADA ovo: */
.button {
  background: #007bff;           /* Hardkodovana boja */
  padding: 8px 16px;             /* Hardkodovani pikseli */
  border-radius: 4px;            /* Hardkodovan radijus */
  transition: 0.2s ease;         /* Hardkodovana tranzicija */
}

/* ✅ UVEK ovo: */
.button {
  background: var(--dyn-theme-primary);
  padding: var(--dyn-spacing-sm) var(--dyn-spacing-md);
  border-radius: var(--dyn-border-radius-sm);
  transition: var(--dyn-transition-normal);
}
```

---

## Dark Mode Podrška

### Kako Funkcioniše

1. **Semantički tokeni** (npr. `--dyn-semantic-background`) automatski preuzimaju dark vrednosti
2. **Style Dictionary** generiše `@media (prefers-color-scheme: dark)` blok
3. **Komponente ne trebaju eksplicitne dark override-ove**

### Generisani CSS

```css
/* Light (default) */
:root {
  --dyn-semantic-background: #ffffff;
  --dyn-semantic-text: #212121;
}

/* Dark (automatski) */
@media (prefers-color-scheme: dark) {
  :root {
    --dyn-semantic-background: #121212;
    --dyn-semantic-text: #fafafa;
  }
}

/* Class-based override */
[data-theme='dark'],
.theme-dark {
  --dyn-semantic-background: #121212;
  --dyn-semantic-text: #fafafa;
}
```

---

## Dodavanje Novih Tokena

### 1. Kreiraj/Ažuriraj JSON Fajl

```json
// tokens/color/theme.json
{
  "color": {
    "theme": {
      "brand-new": {
        "value": "#ff5500",
        "description": "Nova brend boja"
      }
    }
  }
}
```

### 2. Za Dark Mode Podršku

```json
{
  "color": {
    "semantic": {
      "new-surface": {
        "value": "#ffffff",
        "darkTheme": {
          "value": "#1a1a1a"
        },
        "description": "Nova površina sa dark podrškom"
      }
    }
  }
}
```

### 3. Rebuild Tokene

```bash
npm run tokens:build
```

### 4. Koristi u Komponenti

```css
.new-element {
  background: var(--dyn-theme-brand-new);
}
```

---

## Pravila i Konvencije

### Imenovanje Tokena

```
--dyn-[kategorija]-[svojstvo]-[varijanta]

Primeri:
--dyn-spacing-md              # kategorija-svojstvo
--dyn-theme-primary           # kategorija-svojstvo
--dyn-semantic-text-secondary # kategorija-svojstvo-varijanta
--dyn-feedback-positive-dark  # kategorija-svojstvo-varijanta
```

### ✅ Dozvoljeno

- Korišćenje `var(--dyn-*)` za SVE vrednosti
- `calc()` sa token varijablama: `calc(var(--dyn-spacing-md) * 2)`
- Relative units tamo gde ima smisla: `1em`, `100%`
- Media query breakpoints kao konstante (mada bi mogli biti tokeni)

### ❌ Zabranjeno

- Hardkodovane boje: `#fff`, `rgb(0,0,0)`, `rgba(...)`
- Hardkodovani pikseli za spacing/sizing: `8px`, `16px`
- Hardkodovane tranzicije: `0.2s ease`
- Duplikacija vrednosti umesto referenci

---

## Brzi Pregled

```
┌────────────────────────────────────────────────────────────┐
│                    DESIGN TOKEN FLOW                        │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  📝 tokens/*.json                                          │
│       ↓                                                    │
│  ⚙️ style-dictionary build                                 │
│       ↓                                                    │
│  🎨 styles/foundations/index.css                           │
│       ↓                                                    │
│  📦 import u Storybook/App                                 │
│       ↓                                                    │
│  🧩 Korišćenje u .module.css: var(--dyn-*)                 │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

**Datum**: Januar 2026
**Verzija**: 1.0
**Autor**: DYN UI Team
