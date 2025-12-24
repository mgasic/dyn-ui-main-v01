# DYN UI - Detaljan Vodič za Unapređenje Komponenti
## Verzija 1.0 - Decembar 2025

---

## 📚 Uvod

Ovaj vodič detaljno objašnjava kako refaktorovati i unaprijediti svaku komponentu da bi slijedia DYN UI standard. Svaka sekcija sadrži:

- 🔴 Problem opis
- ✅ Rješenje sa kodom
- 💡 Best practices
- ⚙️ Korak-po-korak uputstva
- 🧪 Testiranje
- 📋 Checklist

---

## 🎯 PRINCIPI DIZAJN SISTEMA

Pre nego što počnete sa refaktorisanjem, razumiјте ove principi:

### 1. Token Naming Convention
```
--dyn-[domain]-[property]-[state]
```

**Primjeri:**
- `--dyn-button-bg` - button background (default)
- `--dyn-button-bg-hover` - button background (hover state)
- `--dyn-button-text-disabled` - button text (disabled state)
- `--dyn-color-primary-60` - foundation color token
- `--dyn-spacing-2` - foundation spacing token

### 2. Three-Layer Architecture

```
┌─────────────────────────────────────┐
│ THEME LAYER (Dark/Light/HC)         │
│ Override-a za specifične kontekste   │
└──────────┬──────────────────────────┘
           │
           ▼
┌─────────────────────────────────────┐
│ COMPONENT LAYER                      │
│ --dyn-[component]-[property]         │
│ Referencira samo Foundation layer    │
└──────────┬──────────────────────────┘
           │
           ▼
┌─────────────────────────────────────┐
│ FOUNDATION LAYER                     │
│ --dyn-color-, --dyn-spacing-, itd.   │
│ Nikad ne referencirajuđ druge tokene │
└─────────────────────────────────────┘
```

### 3. Fallback Chain (Trostruki Fallback)

```css
/* ✅ ISPRAVNO */
color: var(--dyn-button-text, var(--dyn-color-white, #FFFFFF));
       ↑ Component token
                        ↑ Foundation token
                                      ↑ Hardcoded fallback

/* ❌ POGREŠNO - Nema fallback-a */
color: var(--dyn-button-text);

/* ❌ POGREŠNO - Referencirajuđ token na token */
color: var(--dyn-button-text, var(--dyn-button-bg, ...));
```

### 4. Dark Mode i Accessibility

```css
/* Light mode - default */
:root {
  --dyn-button-bg: var(--dyn-color-primary-60, #007ACC);
  --dyn-button-text: var(--dyn-color-white, #FFFFFF);
}

/* Dark mode - override */
@media (prefers-color-scheme: dark) {
  :root {
    --dyn-button-bg: var(--dyn-color-primary-70-dark, #0E90D4);
    --dyn-button-text: var(--dyn-color-white, #FFFFFF);
  }
}

/* High contrast mode */
@media (prefers-contrast: more) {
  :root {
    --dyn-focus-ring-width: 3px;
    --dyn-focus-ring-color: var(--dyn-color-black, #000000);
  }
}
```

---

## 🔧 KORAK-PO-KORAK REFAKTORISANJE

### KORAK 1: Priprema

```bash
# 1. Kreiraj novu granu
git checkout -b refactor/din-component-name

# 2. Provjeri trenutno stanje
npm run storybook

# 3. Otvori CSS modul komponente
# src/components/DinComponentName/DinComponentName.module.css
```

### KORAK 2: Analiza

Prije refaktorisanja:

1. **Otvori Storybook priču** komponente
2. **Testiraj sve varijante:**
   - Sve properties (variant, size, state)
   - Light mode
   - Dark mode
   - High contrast mode
   - Responsive varijante
   - Keyboard navigacija
   - Screen reader (a11y)

3. **Dokumentuj sve hard-kodirane vrijednosti:**
   ```
   Komponenta: DinButton
   Hard-kodovane vrijednosti:
   - padding: 8px 16px (trebalo bi --dyn-button-padding-x, --dyn-button-padding-y)
   - color: #007ACC (trebalo bi --dyn-color-primary-60)
   - border-radius: 4px (trebalo bi --dyn-radius-sm)
   ```

### KORAK 3: Refaktorisanje CSS Modula

**Šablon za CSS modul:**

```css
/**
 * DinComponentName - Komponenta opis
 * 
 * Tokeni:
 * - --dyn-component-bg: Background color
 * - --dyn-component-text: Text color
 * - --dyn-component-padding: Padding
 * 
 * Varijante:
 * - variant: primary, secondary, tertiary
 * - size: small, medium, large
 * 
 * Stanja:
 * - default, hover, focus, active, disabled
 * 
 * Dark mode: Podržano
 * Responsive: Podržano
 */

/* ============================================
   COMPONENT TOKENS - Default (Light Mode)
   ============================================ */

:root {
  /* Base tokens */
  --dyn-component-bg: var(--dyn-color-white, #FFFFFF);
  --dyn-component-text: var(--dyn-color-gray-1000, #000000);
  --dyn-component-border: var(--dyn-color-gray-300, #D0D0D0);
  --dyn-component-padding: var(--dyn-spacing-3, 12px);
  --dyn-component-border-radius: var(--dyn-radius-md, 6px);
  
  /* Hover state */
  --dyn-component-bg-hover: var(--dyn-color-gray-100, #F5F5F5);
  --dyn-component-border-hover: var(--dyn-color-gray-400, #999999);
  
  /* Focus state */
  --dyn-component-focus-ring: var(--dyn-focus-ring-width, 2px) solid var(--dyn-focus-ring-color, #007ACC);
  
  /* Disabled state */
  --dyn-component-disabled-opacity: var(--dyn-opacity-50, 0.5);
  
  /* Variants */
  --dyn-component-primary-bg: var(--dyn-color-primary-60, #007ACC);
  --dyn-component-primary-text: var(--dyn-color-white, #FFFFFF);
  --dyn-component-secondary-bg: var(--dyn-color-gray-200, #F0F0F0);
  --dyn-component-secondary-text: var(--dyn-color-gray-1000, #000000);
}

/* ============================================
   DARK MODE OVERRIDES
   ============================================ */

@media (prefers-color-scheme: dark) {
  :root {
    --dyn-component-bg: var(--dyn-color-gray-900, #1A1A1A);
    --dyn-component-text: var(--dyn-color-gray-50, #F5F5F5);
    --dyn-component-border: var(--dyn-color-gray-700, #404040);
    --dyn-component-bg-hover: var(--dyn-color-gray-800, #2D2D2D);
    --dyn-component-secondary-bg: var(--dyn-color-gray-800, #2D2D2D);
    --dyn-component-secondary-text: var(--dyn-color-gray-50, #F5F5F5);
  }
}

/* ============================================
   HIGH CONTRAST MODE
   ============================================ */

@media (prefers-contrast: more) {
  :root {
    --dyn-component-focus-ring: 3px solid var(--dyn-color-black, #000000);
    --dyn-component-border: var(--dyn-color-black, #000000);
  }
}

/* ============================================
   COMPONENT STYLES
   ============================================ */

.component {
  background-color: var(--dyn-component-bg, var(--dyn-color-white, #FFFFFF));
  color: var(--dyn-component-text, var(--dyn-color-gray-1000, #000000));
  border: 1px solid var(--dyn-component-border, var(--dyn-color-gray-300, #D0D0D0));
  padding: var(--dyn-component-padding, var(--dyn-spacing-3, 12px));
  border-radius: var(--dyn-component-border-radius, var(--dyn-radius-md, 6px));
  transition: background-color 150ms ease-in-out,
              border-color 150ms ease-in-out;
}

.component:hover {
  background-color: var(--dyn-component-bg-hover, var(--dyn-color-gray-100, #F5F5F5));
  border-color: var(--dyn-component-border-hover, var(--dyn-color-gray-400, #999999));
}

.component:focus {
  outline: var(--dyn-component-focus-ring, 2px solid #007ACC);
  outline-offset: 2px;
}

.component:disabled {
  opacity: var(--dyn-component-disabled-opacity, 0.5);
  cursor: not-allowed;
}

/* ============================================
   VARIANTS
   ============================================ */

.componentPrimary {
  --dyn-component-bg: var(--dyn-component-primary-bg);
  --dyn-component-text: var(--dyn-component-primary-text);
}

.componentSecondary {
  --dyn-component-bg: var(--dyn-component-secondary-bg);
  --dyn-component-text: var(--dyn-component-secondary-text);
}

/* ============================================
   RESPONSIVE
   ============================================ */

@media (max-width: 768px) {
  .component {
    padding: var(--dyn-spacing-2, 8px);
    min-height: 44px; /* Touch target minimum */
  }
}
```

---

## 🏗️ PRIMJERI REFAKTORISANJA

### Primjer 1: DinBadge - Kompletan Refactor

#### ❌ PRIJE

```css
/* POGREŠNO */
:root {
  --badge-accent: var(--dyn-color-primary-60);
  --badge-soft-fallback: var(--dyn-color-primary-40);
}

.badge {
  background-color: var(--badge-accent);
  color: #FFFFFF;
  padding: 4px 8px;
  border-radius: 4px;
}

.badge.variantSuccess {
  background-color: #28A745;
  color: white;
}

.badge.variantError {
  background-color: #DC3545;
}
```

#### ✅ NAKON

```css
/**
 * DinBadge - Etiketa za statusne poruke
 * 
 * Varijante:
 * - variant: primary, success, warning, error, info, neutral
 * 
 * Stilovi:
 * - solid (default), soft, outline
 * 
 * Dark mode: Podržano
 */

/* Component tokens - Light mode */
:root {
  /* Base badge */
  --dyn-badge-bg: var(--dyn-color-neutral-60, #E8E8E8);
  --dyn-badge-text: var(--dyn-color-neutral-1000, #000000);
  --dyn-badge-border: transparent;
  --dyn-badge-padding-y: var(--dyn-spacing-1, 4px);
  --dyn-badge-padding-x: var(--dyn-spacing-2, 8px);
  --dyn-badge-font-size: var(--dyn-font-size-sm, 12px);
  --dyn-badge-font-weight: var(--dyn-font-weight-medium, 500);
  --dyn-badge-border-radius: var(--dyn-radius-sm, 4px);
  
  /* Primary variant - Solid */
  --dyn-badge-primary-bg: var(--dyn-color-primary-60, #007ACC);
  --dyn-badge-primary-text: var(--dyn-color-white, #FFFFFF);
  --dyn-badge-primary-border: transparent;
  
  /* Primary variant - Soft */
  --dyn-badge-primary-soft-bg: rgba(0, 122, 204, 0.15);
  --dyn-badge-primary-soft-text: var(--dyn-color-primary-80, #0E90D4);
  --dyn-badge-primary-soft-border: transparent;
  
  /* Primary variant - Outline */
  --dyn-badge-primary-outline-bg: transparent;
  --dyn-badge-primary-outline-text: var(--dyn-color-primary-80, #0E90D4);
  --dyn-badge-primary-outline-border: var(--dyn-color-primary-80, #0E90D4);
  
  /* Success variant */
  --dyn-badge-success-bg: var(--dyn-color-success-60, #28A745);
  --dyn-badge-success-text: var(--dyn-color-white, #FFFFFF);
  --dyn-badge-success-soft-bg: rgba(40, 167, 69, 0.15);
  --dyn-badge-success-soft-text: var(--dyn-color-success-80, #4CAF50);
  
  /* Error variant */
  --dyn-badge-error-bg: var(--dyn-color-error-60, #DC3545);
  --dyn-badge-error-text: var(--dyn-color-white, #FFFFFF);
  --dyn-badge-error-soft-bg: rgba(220, 53, 69, 0.15);
  --dyn-badge-error-soft-text: var(--dyn-color-error-80, #F57373);
  
  /* Warning variant */
  --dyn-badge-warning-bg: var(--dyn-color-warning-60, #FFC107);
  --dyn-badge-warning-text: var(--dyn-color-gray-1000, #000000);
  --dyn-badge-warning-soft-bg: rgba(255, 193, 7, 0.15);
  --dyn-badge-warning-soft-text: var(--dyn-color-warning-80, #FFD54F);
  
  /* Info variant */
  --dyn-badge-info-bg: var(--dyn-color-info-60, #17A2B8);
  --dyn-badge-info-text: var(--dyn-color-white, #FFFFFF);
  --dyn-badge-info-soft-bg: rgba(23, 162, 184, 0.15);
  --dyn-badge-info-soft-text: var(--dyn-color-info-80, #4DD0E1);
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --dyn-badge-bg: var(--dyn-color-neutral-200, #2D2D2D);
    --dyn-badge-text: var(--dyn-color-neutral-50, #F5F5F5);
    
    --dyn-badge-primary-soft-bg: rgba(14, 144, 212, 0.25);
    --dyn-badge-primary-soft-text: var(--dyn-color-primary-100-dark, #7ECEF5);
    
    /* Slično za sve varijante... */
  }
}

/* Component structure */
.badge {
  display: inline-block;
  white-space: nowrap;
  padding: var(--dyn-badge-padding-y, var(--dyn-spacing-1, 4px))
           var(--dyn-badge-padding-x, var(--dyn-spacing-2, 8px));
  background-color: var(--dyn-badge-bg, var(--dyn-color-neutral-60, #E8E8E8));
  color: var(--dyn-badge-text, var(--dyn-color-neutral-1000, #000000));
  border: 1px solid var(--dyn-badge-border, transparent);
  border-radius: var(--dyn-badge-border-radius, var(--dyn-radius-sm, 4px));
  font-size: var(--dyn-badge-font-size, var(--dyn-font-size-sm, 12px));
  font-weight: var(--dyn-badge-font-weight, var(--dyn-font-weight-medium, 500));
  line-height: 1;
  vertical-align: baseline;
  transition: background-color 150ms ease-in-out,
              color 150ms ease-in-out,
              border-color 150ms ease-in-out;
}

/* Variant classes */
.badge.variantPrimary {
  --dyn-badge-bg: var(--dyn-badge-primary-bg);
  --dyn-badge-text: var(--dyn-badge-primary-text);
  --dyn-badge-border: var(--dyn-badge-primary-border);
}

.badge.variantSuccess {
  --dyn-badge-bg: var(--dyn-badge-success-bg);
  --dyn-badge-text: var(--dyn-badge-success-text);
}

.badge.variantError {
  --dyn-badge-bg: var(--dyn-badge-error-bg);
  --dyn-badge-text: var(--dyn-badge-error-text);
}

.badge.variantWarning {
  --dyn-badge-bg: var(--dyn-badge-warning-bg);
  --dyn-badge-text: var(--dyn-badge-warning-text);
}

.badge.variantInfo {
  --dyn-badge-bg: var(--dyn-badge-info-bg);
  --dyn-badge-text: var(--dyn-badge-info-text);
}

/* Style variants */
.badge.styleSoft {
  --dyn-badge-bg: var(--dyn-badge-primary-soft-bg);
  --dyn-badge-text: var(--dyn-badge-primary-soft-text);
  --dyn-badge-border: transparent;
}

.badge.variantSuccess.styleSoft {
  --dyn-badge-bg: var(--dyn-badge-success-soft-bg);
  --dyn-badge-text: var(--dyn-badge-success-soft-text);
}

.badge.styleOutline {
  --dyn-badge-bg: var(--dyn-badge-primary-outline-bg);
  --dyn-badge-text: var(--dyn-badge-primary-outline-text);
  --dyn-badge-border: var(--dyn-badge-primary-outline-border);
}

.badge.variantSuccess.styleOutline {
  --dyn-badge-bg: transparent;
  --dyn-badge-text: var(--dyn-badge-success-bg);
  --dyn-badge-border: var(--dyn-badge-success-bg);
}
```

**Ključne izmjene:**
- ✅ Sve varijable koriste `--dyn-` prefiks
- ✅ Standardni format: `--dyn-badge-[variant]-[style]-[property]`
- ✅ Trostruki fallback na svim tokenim
- ✅ Dark mode i high contrast podrška
- ✅ Bez hard-kodiranih vrijednosti

---

### Primjer 2: DinFlex - Lokalni Scope

#### ❌ PRIJE

```css
/* POGREŠNO - Globalni scope */
:root {
  --dyn-flex-gap: var(--dyn-spacing-2, 8px);
  --dyn-flex-direction: row;
}

.flex {
  display: flex;
  gap: var(--dyn-flex-gap);
  flex-direction: var(--dyn-flex-direction);
}
```

#### ✅ NAKON

```css
/**
 * DinFlex - Fleksibilan layout kontejner
 * 
 * Varijante:
 * - direction: row, column
 * - gap: none, small, medium, large
 * - align: start, center, end, stretch
 * - justify: start, center, end, between, around
 * 
 * Dark mode: N/A
 */

/* Component tokens - LOKALNO SCOPED */
.flex {
  /* Base tokens - definirani u .flex scope-u */
  --dyn-flex-display: flex;
  --dyn-flex-direction: row;
  --dyn-flex-gap: var(--dyn-spacing-2, 8px);
  --dyn-flex-margin: var(--dyn-spacing-0, 0);
  --dyn-flex-padding: var(--dyn-spacing-0, 0);
  --dyn-flex-align-items: stretch;
  --dyn-flex-justify-content: flex-start;
  --dyn-flex-flex-wrap: nowrap;
  
  /* Apply tokens */
  display: var(--dyn-flex-display);
  flex-direction: var(--dyn-flex-direction);
  gap: var(--dyn-flex-gap);
  margin: var(--dyn-flex-margin);
  padding: var(--dyn-flex-padding);
  align-items: var(--dyn-flex-align-items);
  justify-content: var(--dyn-flex-justify-content);
  flex-wrap: var(--dyn-flex-flex-wrap);
}

/* Variants - overwrite relevant tokens */
.flex.directionColumn {
  --dyn-flex-direction: column;
}

.flex.directionRow {
  --dyn-flex-direction: row;
}

.flex.gapNone {
  --dyn-flex-gap: var(--dyn-spacing-0, 0);
}

.flex.gapSmall {
  --dyn-flex-gap: var(--dyn-spacing-1, 4px);
}

.flex.gapMedium {
  --dyn-flex-gap: var(--dyn-spacing-3, 12px);
}

.flex.gapLarge {
  --dyn-flex-gap: var(--dyn-spacing-4, 16px);
}

.flex.alignStart {
  --dyn-flex-align-items: flex-start;
}

.flex.alignCenter {
  --dyn-flex-align-items: center;
}

.flex.alignEnd {
  --dyn-flex-align-items: flex-end;
}

.flex.alignStretch {
  --dyn-flex-align-items: stretch;
}

.flex.justifyStart {
  --dyn-flex-justify-content: flex-start;
}

.flex.justifyCenter {
  --dyn-flex-justify-content: center;
}

.flex.justifyEnd {
  --dyn-flex-justify-content: flex-end;
}

.flex.justifyBetween {
  --dyn-flex-justify-content: space-between;
}

.flex.wrap {
  --dyn-flex-flex-wrap: wrap;
}

/* Responsive */
@media (max-width: 768px) {
  .flex.responsiveColumn {
    --dyn-flex-direction: column;
  }
}
```

**Ključne izmjene:**
- ✅ Tokeni su definirani u `.flex` scope-u, ne u `:root`
- ✅ Nema curenja globalnih varijabli
- ✅ Lakšo testiranje - svaki instance ima svoju tokene
- ✅ Lakšo proširivanje sa novim varijantama

---

### Primjer 3: DinModal - Hard-kodirane Vrijednosti

#### ❌ PRIJE

```css
/* POGREŠNO - Hard-kodirane vrijednosti */
.modal {
  background-color: rgba(0, 0, 0, 0.5);
  max-width: 500px;
  padding: 24px;
}

.modalContent {
  background-color: white;
  box-shadow: 0 10px 40px rgba(0,0,0,0.2);
}
```

#### ✅ NAKON

```css
/**
 * DinModal - Modalni dijalog
 * 
 * Varijante:
 * - size: small, medium, large
 * 
 * Dark mode: Podržano
 */

/* Foundation tokens - reuse što postoji */
:root {
  /* Overlay tokens */
  --dyn-overlay-bg: rgba(0, 0, 0, 0.5);
  --dyn-overlay-bg-dark: rgba(0, 0, 0, 0.7);
  
  /* Modal tokens */
  --dyn-modal-max-width: var(--dyn-spacing-96, 500px);
  --dyn-modal-min-width: var(--dyn-spacing-64, 320px);
  --dyn-modal-bg: var(--dyn-color-white, #FFFFFF);
  --dyn-modal-border: 1px solid var(--dyn-color-gray-300, #D0D0D0);
  --dyn-modal-border-radius: var(--dyn-radius-lg, 8px);
  --dyn-modal-box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  --dyn-modal-padding: var(--dyn-spacing-6, 24px);
  
  /* Z-index */
  --dyn-z-index-modal-backdrop: 1040;
  --dyn-z-index-modal: 1050;
  
  /* Animation */
  --dyn-modal-animation-duration: var(--dyn-animation-duration-normal, 300ms);
  --dyn-modal-animation-timing: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --dyn-overlay-bg: rgba(0, 0, 0, 0.7);
    --dyn-modal-bg: var(--dyn-color-gray-900, #1A1A1A);
    --dyn-modal-border: 1px solid var(--dyn-color-gray-700, #404040);
    --dyn-modal-box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  }
}

/* Component styles */
.modalBackdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--dyn-overlay-bg, rgba(0, 0, 0, 0.5));
  z-index: var(--dyn-z-index-modal-backdrop, 1040);
  animation: fadeIn var(--dyn-modal-animation-duration) var(--dyn-modal-animation-timing);
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--dyn-modal-bg, var(--dyn-color-white, #FFFFFF));
  border: var(--dyn-modal-border, 1px solid #D0D0D0);
  border-radius: var(--dyn-modal-border-radius, 8px);
  box-shadow: var(--dyn-modal-box-shadow, 0 10px 40px rgba(0,0,0,0.15));
  max-width: var(--dyn-modal-max-width, 500px);
  min-width: var(--dyn-modal-min-width, 320px);
  width: 90vw;
  z-index: var(--dyn-z-index-modal, 1050);
  animation: slideIn var(--dyn-modal-animation-duration) var(--dyn-modal-animation-timing);
}

.modalHeader {
  padding: var(--dyn-modal-padding, 24px);
  border-bottom: 1px solid var(--dyn-color-gray-200, #E0E0E0);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modalBody {
  padding: var(--dyn-modal-padding, 24px);
}

.modalFooter {
  padding: var(--dyn-modal-padding, 24px);
  border-top: 1px solid var(--dyn-color-gray-200, #E0E0E0);
  display: flex;
  gap: var(--dyn-spacing-2, 8px);
  justify-content: flex-end;
}

/* Varijante veličine */
.modalSmall {
  --dyn-modal-max-width: var(--dyn-spacing-64, 320px);
}

.modalLarge {
  --dyn-modal-max-width: var(--dyn-spacing-128, 800px);
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translate(-50%, -48%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}
```

**Ključne izmjene:**
- ✅ Sve hard-kodirane vrijednosti prebačene u tokene
- ✅ Dark mode podrška sa override-ima
- ✅ Trostruki fallback na svim tokenima
- ✅ Z-index consistency
- ✅ Animation tokeni

---

## 🧪 TESTIRANJE

### Checklist za Svaku Komponentu

```markdown
## Testing Checklist - [Komponenta]

### Visual Testing
- [ ] Light mode - sve varijante
- [ ] Dark mode - sve varijante
- [ ] High contrast mode
- [ ] Responsive: 320px, 768px, 1024px, 1920px

### Tokenski Testovi
- [ ] npm run test -- DinComponent.module.css
- [ ] Nijedan token nema hard-kodovane vrijednosti
- [ ] Svi tokeni koriste trostruki fallback
- [ ] Dark mode tokeni pravilno override-ani

### Accessibility
- [ ] axe-core audit - bez grešaka
- [ ] WCAG AA kontrast - sve varijante
- [ ] Keyboard navigacija - Tab, Enter, Escape
- [ ] Screen reader - sve interakcije jasan
- [ ] Focus ring - vidljiv na svim state-ovima

### Storybook
- [ ] Sve varijante dokumentirane
- [ ] Svi state-ovi prikazani
- [ ] Dark mode primjer
- [ ] Code preview dostupan

### Browser Testing
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)
```

---

## 💡 BEST PRACTICES

### 1. Organizacija CSS-a

```css
/**
 * Komponenta - Opis
 * Token dokumentacija
 */

/* ===== KOMPONENTI TOKENI ===== */
:root {
  /* ... */
}

/* ===== DARK MODE ===== */
@media (prefers-color-scheme: dark) {
  :root {
    /* ... */
  }
}

/* ===== COMPONENT STYLES ===== */
.component {
  /* ... */
}

/* ===== VARIANTS ===== */
.component.variant {
  /* ... */
}

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
  .component {
    /* ... */
  }
}
```

### 2. Naming Conventions

```
✅ DOBRO:
--dyn-button-bg
--dyn-button-bg-hover
--dyn-button-text-disabled
--dyn-color-primary-60

❌ LOŠE:
--button-bg (nema --dyn-)
--buttonBg (kebab-case, ne camelCase!)
--primary (previše opšte)
--color-blue (hard-kodirano)
```

### 3. Fallback Lancima

```
✅ DOBRO:
color: var(--dyn-button-text, var(--dyn-color-white, #FFFFFF));

❌ LOŠE:
color: var(--dyn-button-text); /* Ako nedostaje token, nema fallback-a! */
color: #007ACC; /* Hard-kodirano - ne koristiti! */
```

### 4. Dark Mode Pattern

```css
/* Light mode - default */
:root {
  --dyn-bg: var(--dyn-color-white, #FFFFFF);
  --dyn-text: var(--dyn-color-black, #000000);
}

/* Dark mode - override samo što se mijenja */
@media (prefers-color-scheme: dark) {
  :root {
    --dyn-bg: var(--dyn-color-gray-900, #1A1A1A);
    --dyn-text: var(--dyn-color-gray-50, #F5F5F5);
  }
}

/* CSS komponente koristi iste tokene */
.component {
  background-color: var(--dyn-bg);
  color: var(--dyn-text);
  /* Automatski se mijenja sa dark mode! */
}
```

---

## 📋 ZAKLJUČAK

Ovaj vodič predstavlja detaljan proces za refaktorisanje svake komponente. Ključni koraci su:

1. **Razumiјte standarde** - 3 sloja, naming, fallback
2. **Analizirajte** - sve hard-kodirane vrijednosti
3. **Refaktorujte** - kreirajte tokene
4. **Testirajte** - sve varijante i mode-e
5. **Dokumentujte** - update Storybook i docs

Sljeđenjem ovog vodiča, sve komponente će biti:
- 🎯 Konzistentne
- 🎯 Fleksibilne
- 🎯 Maintainable
- 🎯 Enterprise-ready
