# DYN UI - Design Token Strategija i Konsolidacija
## Verzija 1.0 - Decembar 2025

---

## 📍 Uvod

Ovo je strategijski dokument o kako da se koriste design tokeni u DYN UI sistemu kako bi se:

✅ Osigurao **globalni konsistentnost**
✅ Minimiziralo **dupliciranje**
✅ Maksimizirala **fleksibilnost**
✅ Olakšalo **održavanje**
✅ Omogućilo **brzo tematizovanje**

---

## 🏗️ ARHITEKTURA TOKENA

### Tri Sloja Tokena

```
┌─────────────────────────────────────────────┐
│ THEME LAYER (Prilagođavanja)                │
│ Dark mode, Light mode, High Contrast        │
│ @media (prefers-color-scheme: dark)         │
│ @media (prefers-contrast: more)             │
└──────────┬──────────────────────────────────┘
           │ Override samo coloističke vrijednosti
           │
           ▼
┌─────────────────────────────────────────────┐
│ COMPONENT LAYER (Semantika)                 │
│ --dyn-[component]-[property]-[state]        │
│ Referencira samo Foundation tokens          │
│ Primjeri:                                   │
│ --dyn-button-bg                             │
│ --dyn-input-border-color-focus              │
│ --dyn-modal-box-shadow                      │
└──────────┬──────────────────────────────────┘
           │ Svi su van :root (komponentni scope)
           │
           ▼
┌─────────────────────────────────────────────┐
│ FOUNDATION LAYER (Primitivne Vrijednosti)   │
│ --dyn-[category]-[name]                     │
│ Primjeri:                                   │
│ --dyn-color-primary-60                      │
│ --dyn-spacing-2                             │
│ --dyn-font-size-lg                          │
│ --dyn-radius-md                             │
│ --dyn-shadow-lg                             │
│ --dyn-font-weight-bold                      │
│ --dyn-animation-duration-fast               │
│ --dyn-opacity-50                            │
│ --dyn-z-index-modal                         │
│ --dyn-focus-ring-width                      │
│ --dyn-focus-ring-color                      │
└─────────────────────────────────────────────┘
```

### Foundation Token Kategorije

#### 🎨 Color Tokens
```css
:root {
  /* Primary Colors */
  --dyn-color-primary-20: #CCE5FF;
  --dyn-color-primary-40: #99CBFF;
  --dyn-color-primary-60: #007ACC;
  --dyn-color-primary-80: #0E90D4;
  --dyn-color-primary-100: #004A7C;

  /* Neutral Colors */
  --dyn-color-neutral-50: #FFFFFF;
  --dyn-color-neutral-100: #F8F8F8;
  --dyn-color-neutral-200: #F0F0F0;
  --dyn-color-neutral-300: #E0E0E0;
  --dyn-color-neutral-400: #CCCCCC;
  --dyn-color-neutral-500: #999999;
  --dyn-color-neutral-600: #666666;
  --dyn-color-neutral-700: #404040;
  --dyn-color-neutral-800: #262626;
  --dyn-color-neutral-900: #1A1A1A;
  --dyn-color-neutral-1000: #000000;

  /* Semantic Colors */
  --dyn-color-success-60: #28A745;
  --dyn-color-warning-60: #FFC107;
  --dyn-color-error-60: #DC3545;
  --dyn-color-info-60: #17A2B8;
}
```

**Naming pattern:**
- `--dyn-color-[hue]-[value]`
- Value: 20 (lightest), 40, 60 (mid), 80, 100 (darkest)
- Semantic: success, warning, error, info

---

#### 📐 Spacing Tokens
```css
:root {
  --dyn-spacing-0: 0px;      /* 0 */
  --dyn-spacing-1: 4px;      /* 4 */
  --dyn-spacing-2: 8px;      /* 8 */
  --dyn-spacing-3: 12px;     /* 12 */
  --dyn-spacing-4: 16px;     /* 16 */
  --dyn-spacing-5: 20px;     /* 20 */
  --dyn-spacing-6: 24px;     /* 24 */
  --dyn-spacing-7: 28px;     /* 28 */
  --dyn-spacing-8: 32px;     /* 32 */
  --dyn-spacing-10: 40px;    /* 40 */
  --dyn-spacing-12: 48px;    /* 48 */
  --dyn-spacing-16: 64px;    /* 64 */
  --dyn-spacing-20: 80px;    /* 80 */
  --dyn-spacing-24: 96px;    /* 96 */
  --dyn-spacing-32: 128px;   /* 128 */
}
```

**Korištenje:**
- Padding, margin, gap
- Minimum 8px (1 unit)
- Skalira se za responsive (2x na mobilu)

---

#### 🔤 Typography Tokens
```css
:root {
  /* Font Family */
  --dyn-font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --dyn-font-family-mono: 'Courier New', monospace;

  /* Font Size */
  --dyn-font-size-xs: 10px;     /* Extra small */
  --dyn-font-size-sm: 12px;     /* Small */
  --dyn-font-size-base: 14px;   /* Base */
  --dyn-font-size-md: 16px;     /* Medium */
  --dyn-font-size-lg: 18px;     /* Large */
  --dyn-font-size-xl: 20px;     /* Extra large */
  --dyn-font-size-2xl: 24px;
  --dyn-font-size-3xl: 32px;
  --dyn-font-size-4xl: 40px;

  /* Font Weight */
  --dyn-font-weight-light: 300;
  --dyn-font-weight-normal: 400;
  --dyn-font-weight-medium: 500;
  --dyn-font-weight-semibold: 600;
  --dyn-font-weight-bold: 700;

  /* Line Height */
  --dyn-line-height-tight: 1.2;
  --dyn-line-height-normal: 1.5;
  --dyn-line-height-loose: 1.8;

  /* Letter Spacing */
  --dyn-letter-spacing-tight: -0.02em;
  --dyn-letter-spacing-normal: 0;
  --dyn-letter-spacing-wide: 0.02em;
}
```

**Korištenje u komponentama:**
```css
.component {
  font-family: var(--dyn-font-family-base);
  font-size: var(--dyn-font-size-base);
  font-weight: var(--dyn-font-weight-medium);
  line-height: var(--dyn-line-height-normal);
}
```

---

#### 🎲 Border Radius Tokens
```css
:root {
  --dyn-radius-none: 0px;
  --dyn-radius-sm: 4px;
  --dyn-radius-base: 6px;
  --dyn-radius-md: 8px;
  --dyn-radius-lg: 12px;
  --dyn-radius-xl: 16px;
  --dyn-radius-2xl: 24px;
  --dyn-radius-full: 9999px;  /* Circular */
}
```

**Korištenje:**
- `--dyn-radius-sm` - buttons, inputs (compact)
- `--dyn-radius-md` - cards, modals (medium)
- `--dyn-radius-lg` - large cards, layouts (spacious)
- `--dyn-radius-full` - avatars, badges

---

#### 🌑 Shadow Tokens
```css
:root {
  --dyn-shadow-none: none;
  --dyn-shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05);
  --dyn-shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1),
                   0 1px 2px rgba(0, 0, 0, 0.06);
  --dyn-shadow-base: 0 4px 6px rgba(0, 0, 0, 0.07),
                     0 2px 4px rgba(0, 0, 0, 0.06);
  --dyn-shadow-md: 0 10px 15px rgba(0, 0, 0, 0.1),
                   0 4px 6px rgba(0, 0, 0, 0.05);
  --dyn-shadow-lg: 0 20px 25px rgba(0, 0, 0, 0.1),
                   0 10px 10px rgba(0, 0, 0, 0.04);
  --dyn-shadow-xl: 0 25px 50px rgba(0, 0, 0, 0.15);
  --dyn-shadow-2xl: 0 40px 80px rgba(0, 0, 0, 0.2);

  /* Inset shadows */
  --dyn-shadow-inset-sm: inset 0 1px 2px rgba(0, 0, 0, 0.05);
}
```

**Dark mode varijacije:**
```css
@media (prefers-color-scheme: dark) {
  :root {
    --dyn-shadow-md: 0 10px 15px rgba(0, 0, 0, 0.3),
                     0 4px 6px rgba(0, 0, 0, 0.2);
    /* Tamnija sjanka u dark mode-u */
  }
}
```

---

#### ⏱️ Animation Tokens
```css
:root {
  /* Duration */
  --dyn-animation-duration-fast: 150ms;
  --dyn-animation-duration-normal: 250ms;
  --dyn-animation-duration-slow: 350ms;
  --dyn-animation-duration-slower: 500ms;

  /* Easing */
  --dyn-animation-timing-ease-in: cubic-bezier(0.4, 0, 1, 1);
  --dyn-animation-timing-ease-out: cubic-bezier(0, 0, 0.2, 1);
  --dyn-animation-timing-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --dyn-animation-timing-ease-linear: linear;
}
```

**Korištenje:**
```css
.component {
  transition: all var(--dyn-animation-duration-normal) 
              var(--dyn-animation-timing-ease-in-out);
}

@keyframes slideIn {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

.component.animated {
  animation: slideIn var(--dyn-animation-duration-normal) 
             var(--dyn-animation-timing-ease-out);
}
```

---

#### 👁️ Opacity Tokens
```css
:root {
  --dyn-opacity-0: 0;
  --dyn-opacity-10: 0.1;
  --dyn-opacity-20: 0.2;
  --dyn-opacity-30: 0.3;
  --dyn-opacity-40: 0.4;
  --dyn-opacity-50: 0.5;
  --dyn-opacity-60: 0.6;
  --dyn-opacity-70: 0.7;
  --dyn-opacity-80: 0.8;
  --dyn-opacity-90: 0.9;
  --dyn-opacity-100: 1;
}
```

**Korištenje:**
```css
.disabled {
  opacity: var(--dyn-opacity-50);
}

.button:hover {
  background-color: rgba(0, 122, 204, var(--dyn-opacity-10));
}
```

---

#### 📐 Z-Index Tokens
```css
:root {
  --dyn-z-index-hide: -1;
  --dyn-z-index-base: 0;
  --dyn-z-index-dropdown: 100;
  --dyn-z-index-sticky: 500;
  --dyn-z-index-fixed: 800;
  --dyn-z-index-modal-backdrop: 1040;
  --dyn-z-index-modal: 1050;
  --dyn-z-index-popover: 1060;
  --dyn-z-index-tooltip: 1070;
}
```

**Stratégija:**
- 0-100: Normal flow
- 100-500: Dropdowns, popovers
- 500-800: Sticky, fixed
- 1000+: Modal overlays

---

#### 🎯 Focus/Accessibility Tokens
```css
:root {
  /* Focus ring */
  --dyn-focus-ring-width: 2px;
  --dyn-focus-ring-color: #007ACC;
  --dyn-focus-ring-offset: 2px;
  --dyn-focus-ring: var(--dyn-focus-ring-width) solid var(--dyn-focus-ring-color);

  /* High contrast mode */
  --dyn-focus-ring-width-hc: 3px;
  --dyn-focus-ring-color-hc: #000000;
}

/* High contrast */
@media (prefers-contrast: more) {
  :root {
    --dyn-focus-ring-width: var(--dyn-focus-ring-width-hc);
    --dyn-focus-ring-color: var(--dyn-focus-ring-color-hc);
  }
}
```

---

## 🔄 COMPONENT TOKEN PATTERN

### Component Level Tokens

Svaka komponenta trebala bi definiirati svoje tokene koji referenciraju **samo Foundation** tokene:

```css
/* ✅ ISPRAVNO */
.component {
  --dyn-component-bg: var(--dyn-color-white, #FFFFFF);
  --dyn-component-text: var(--dyn-color-neutral-1000, #000000);
  --dyn-component-border: var(--dyn-color-neutral-300, #D0D0D0);
  --dyn-component-padding: var(--dyn-spacing-3, 12px);
  --dyn-component-border-radius: var(--dyn-radius-md, 8px);
  --dyn-component-font-size: var(--dyn-font-size-base, 14px);
  --dyn-component-shadow: var(--dyn-shadow-sm);
  --dyn-component-transition: var(--dyn-animation-duration-normal) var(--dyn-animation-timing-ease-in-out);
  
  background-color: var(--dyn-component-bg);
  color: var(--dyn-component-text);
  border: 1px solid var(--dyn-component-border);
  padding: var(--dyn-component-padding);
  border-radius: var(--dyn-component-border-radius);
  font-size: var(--dyn-component-font-size);
  box-shadow: var(--dyn-component-shadow);
  transition: all var(--dyn-component-transition);
}

/* ❌ POGREŠNO - komponenti token referencira drugi komponenti token */
.component {
  --dyn-component-bg: var(--dyn-button-bg);  /* LOŠE! */
}

/* ❌ POGREŠNO - hard-kodirane vrijednosti */
.component {
  background-color: #007ACC;  /* LOŠE! */
  padding: 12px;              /* LOŠE! */
}
```

---

## 🌓 DARK MODE STRATEGIJA

### Principi

1. **Light mode je default**
2. **Dark mode je override**
3. **Samo boje se mijenjaju u dark mode-u**
4. **Spacing, sizing, timing ostaju isti**

### Implementacija

```css
/* Light mode - default */
:root {
  --dyn-bg: var(--dyn-color-neutral-50, #FFFFFF);
  --dyn-text: var(--dyn-color-neutral-1000, #000000);
  --dyn-border: var(--dyn-color-neutral-300, #D0D0D0);
}

/* Dark mode - override samo boje */
@media (prefers-color-scheme: dark) {
  :root {
    --dyn-bg: var(--dyn-color-neutral-900, #1A1A1A);
    --dyn-text: var(--dyn-color-neutral-50, #F8F8F8);
    --dyn-border: var(--dyn-color-neutral-700, #404040);
  }
}

/* Component koristi iste tokene */
.component {
  background-color: var(--dyn-bg);
  color: var(--dyn-text);
  border-color: var(--dyn-border);
  /* Automatski se prilagođava sa dark mode! */
}
```

### Kontrast u Dark Mode-u

```css
/* Osiguraj dobar kontrast u dark mode-u */

:root {
  /* Light mode */
  --dyn-color-neutral-50: #FFFFFF;      /* Kontrast 21:1 sa #000 */
  --dyn-color-neutral-100: #F8F8F8;     /* Kontrast 19.5:1 sa #000 */
  
  /* Dark mode */
  --dyn-color-neutral-950: #0A0A0A;     /* Kontrast 17.5:1 sa #FFF */
  --dyn-color-neutral-900: #1A1A1A;     /* Kontrast 14.5:1 sa #FFF */
}

@media (prefers-color-scheme: dark) {
  :root {
    /* Koristimo svetlijke verzije teksta */
    --dyn-text-primary: var(--dyn-color-neutral-50, #FFFFFF);      /* #FFF */
    --dyn-text-secondary: var(--dyn-color-neutral-200, #F0F0F0);   /* ~4.5:1 */
    --dyn-text-tertiary: var(--dyn-color-neutral-400, #CCCCCC);    /* ~7:1 */
  }
}
```

---

## ♿ ACCESSIBILITY (A11y) TOKENI

### Focus Indicators

```css
:root {
  --dyn-focus-visible-outline: 2px solid var(--dyn-color-primary-60, #007ACC);
  --dyn-focus-visible-outline-offset: 2px;
}

/* Korištenje */
.interactive:focus-visible {
  outline: var(--dyn-focus-visible-outline);
  outline-offset: var(--dyn-focus-visible-outline-offset);
}
```

### High Contrast Mode

```css
@media (prefers-contrast: more) {
  :root {
    --dyn-color-primary-60: #0060FF;    /* Jača boja */
    --dyn-color-error-60: #FF0000;      /* Jača crvena */
    --dyn-border: #000000;              /* Crna umjesto sive */
    --dyn-focus-ring-width: 3px;        /* Deblji ring */
  }
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 🔧 MAINTENANCE I GOVERNANCE

### Token Registry

Kreiraj spreadsheet sa svim token-ima:

| Token | Light | Dark | HC | Komponente | Status |
|-------|-------|------|----|----|--------|
| `--dyn-color-primary-60` | #007ACC | #0E90D4 | #0060FF | Button, Input, Link | ✅ Active |
| `--dyn-spacing-2` | 8px | 8px | 8px | All | ✅ Active |

### Versioniranje

```
Version: 1.0.0
Last Updated: 2025-12-23
Generator: Style Dictionary 3.x
Compatible with: DYN UI React 1.0+
```

### Deprecated Tokens

```css
/* DEPRECATED - Koristi --dyn-color-error-60 umjesto toga */
--dyn-color-danger-60: ...;

/* DEPRECATED v1.2 - Koristi --dyn-spacing-3 */
--dyn-padding-default: ...;
```

### Review Process

1. **Proposal** - Nova tokena trebala bi biti dokumentovana
2. **Design Review** - Design team odobrava
3. **Dev Review** - Tekući developers pregledavaju
4. **Testing** - QA proverava sve komponente
5. **Merge** - Merge u main branch
6. **Deploy** - Build proces generiše nove tokene

---

## 📊 KONSOLIDACIJA POSTOJEĆIH TOKENA

### Audit Checklist

```markdown
## Token Audit - [Kategorija]

### Foundation Level
- [ ] Sve vrijednosti su u Foundation (ne Component) sloju
- [ ] Nema hard-kodiranih vrijednosti
- [ ] Nema referenci na druge tokene
- [ ] Naming je konzistentan
- [ ] Dark mode varijacije su definirane

### Component Level
- [ ] Koriste samo Foundation tokene
- [ ] Imaju trostruki fallback
- [ ] Su lokalno scoped (ne u :root)
- [ ] Su dokumentovane u Storybook
- [ ] Testirane su u svim mode-ima

### Coverage
- [ ] 100% komponenti koriste tokene
- [ ] 0% hard-kodiranih vrijednosti
- [ ] Svi color tokeni imaju dark mode override
```

### Refaktorisanje Prioriteti

**KRITIČNO (P0):**
- Foundation tokeni - trebalo bi da su potpuni
- Boje za all semantic states (error, warning, success)
- Spacing skala - trebalo bi biti konsistentna

**VAŽNO (P1):**
- Component tokeni - trebalo bi biti standardizovani
- Animation tokeni
- Z-index tokeni

**ŽELJENO (P2):**
- Adicional semantic tokeni
- Locale-specific tokens
- Custom theme tokens

---

## 🎨 KORIŠTENJE TOKENA U PROIZVODNJI

### Primjer: Button Komponenta

```css
/**
 * DinButton - Akcijski gumb
 * Koristi Foundation i Component tokene
 */

:root {
  /* Component tokens - koriste samo Foundation */
  --dyn-button-bg: var(--dyn-color-primary-60, #007ACC);
  --dyn-button-bg-hover: var(--dyn-color-primary-80, #0E90D4);
  --dyn-button-bg-active: var(--dyn-color-primary-100, #004A7C);
  --dyn-button-bg-disabled: var(--dyn-color-neutral-300, #D0D0D0);
  
  --dyn-button-text: var(--dyn-color-white, #FFFFFF);
  --dyn-button-text-disabled: var(--dyn-color-neutral-600, #666666);
  
  --dyn-button-border: transparent;
  --dyn-button-border-hover: transparent;
  
  --dyn-button-padding: var(--dyn-spacing-3, 12px) var(--dyn-spacing-4, 16px);
  --dyn-button-border-radius: var(--dyn-radius-md, 6px);
  --dyn-button-font-size: var(--dyn-font-size-base, 14px);
  --dyn-button-font-weight: var(--dyn-font-weight-semibold, 600);
  
  --dyn-button-focus-ring: var(--dyn-focus-ring);
  --dyn-button-transition: var(--dyn-animation-duration-normal) var(--dyn-animation-timing-ease-in-out);
}

/* Dark mode - samo override boje */
@media (prefers-color-scheme: dark) {
  :root {
    --dyn-button-bg: var(--dyn-color-primary-70-dark, #0E90D4);
    --dyn-button-text: var(--dyn-color-white, #FFFFFF);
  }
}

/* CSS */
.button {
  background-color: var(--dyn-button-bg, var(--dyn-color-primary-60, #007ACC));
  color: var(--dyn-button-text, var(--dyn-color-white, #FFFFFF));
  border: 1px solid var(--dyn-button-border, transparent);
  padding: var(--dyn-button-padding, 12px 16px);
  border-radius: var(--dyn-button-border-radius, 6px);
  font-size: var(--dyn-button-font-size, 14px);
  font-weight: var(--dyn-button-font-weight, 600);
  cursor: pointer;
  transition: all var(--dyn-button-transition, 250ms ease-in-out);
}

.button:hover {
  background-color: var(--dyn-button-bg-hover, var(--dyn-color-primary-80, #0E90D4));
}

.button:active {
  background-color: var(--dyn-button-bg-active, var(--dyn-color-primary-100, #004A7C));
}

.button:focus-visible {
  outline: var(--dyn-button-focus-ring, 2px solid #007ACC);
  outline-offset: 2px;
}

.button:disabled {
  background-color: var(--dyn-button-bg-disabled, #D0D0D0);
  color: var(--dyn-button-text-disabled, #666666);
  cursor: not-allowed;
  opacity: var(--dyn-opacity-50, 0.5);
}
```

---

## 📦 BUILD PROCESS - Style Dictionary

### style-dictionary.config.js

```js
const StyleDictionary = require('style-dictionary');
const fs = require('fs');

module.exports = {
  source: [
    'packages/design-tokens/tokens/**/*.json'
  ],
  
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'packages/dyn-ui-react/src/styles/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: {
            outputReferences: true,
            showFileHeader: true
          }
        }
      ],
      actions: ['build']
    },
    
    js: {
      transformGroup: 'js',
      buildPath: 'packages/design-tokens/build/',
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/es6',
          options: {
            outputReferences: true
          }
        }
      ],
      actions: ['build']
    },
    
    ts: {
      transformGroup: 'js',
      buildPath: 'packages/design-tokens/build/',
      files: [
        {
          destination: 'tokens.ts',
          format: 'typescript/es6-declarations'
        }
      ],
      actions: ['build']
    }
  }
};
```

### Build Command

```bash
npm run tokens:build
# Generiše:
# - CSS fajl sa svim tokenima
# - JavaScript/TypeScript definicije
# - Type definitions za IDE autocomplete
```

---

## ✅ ZAKLJUČAK

Ovaj design token sistem omogućava:

✅ **Globalnu konsistentnost** - svi koriste iste vrijednosti
✅ **Fleksibilnost tema** - lako dark mode, high contrast
✅ **Jednostavnu održavanja** - promjena na jednom mjestu
✅ **Developer iskustvo** - autocomplete, dokumentacija
✅ **Enterprise standardy** - WCAG AA+ compliance
✅ **Skalabilnost** - novi projekti koriste iste tokene

Sljeđenjem ovog vodiča, DYN UI će biti best-in-class design sistem.
