# DYN UI Component Patterns & Anti-Patterns

> **Baza znanja** izvučena iz debugovanja `DynListView` i `DynTabs` komponenti.
> Primenjiva na sve komponente u projektu.

---

## 1. CSS Modules - Kritični Problemi

### ❌ Anti-Pattern: Helper funkcije za klase
```tsx
// LOŠE - getStyleClass neće raditi sa CSS Modules hashiranjem
const getStyleClass = (name: string) => styles[name] || name;
className={getStyleClass('option__checkbox')}
```

### ✅ Pattern: Direktan pristup styles objektu
```tsx
// DOBRO - direktan pristup garantuje ispravno hashiranje
className={styles.optionCheckbox}
```

### ❌ Anti-Pattern: BEM notacija u CSS Modules
```css
/* LOŠE - BEM sa crticama ne radi dobro */
.option__checkbox { }
.option--selected { }
```

### ✅ Pattern: camelCase imenovanje
```css
/* DOBRO - camelCase za CSS Modules */
.optionCheckbox { }
.optionSelected { }
```

---

## 2. CSS Varijable - Fallback Vrednosti

### ❌ Anti-Pattern: Tokeni bez fallback-a
```css
/* LOŠE - ako token nije učitan, stil propada */
font-weight: var(--dyn-font-weight-medium);
border-radius: var(--dyn-border-radius-md);
```

### ✅ Pattern: Uvek imati hardkodirani fallback
```css
/* DOBRO - fallback osigurava vidljivost */
font-weight: var(--dyn-font-weight-medium, 500);
border-radius: var(--dyn-border-radius-md, 6px);
background: var(--dyn-semantic-background, #ffffff);
```

---

## 3. Varijante sa Descendant Selektorima

### ❌ Anti-Pattern: Prosti descendant selektori
```css
/* LOŠE - .dividers i .option se hashiraju nezavisno */
.dividers .option:nth-child(even) { }
```

### ✅ Pattern: Compound selektori sa root klasom
```css
/* DOBRO - obe klase su na istom elementu */
.root.dividers .option:nth-child(even) { }
.root.striped .option:nth-child(even) { }
```

---

## 4. Storybook - Dupli React Ključevi

### ❌ Anti-Pattern: Dupliranje podataka bez unique keys
```tsx
// LOŠE - uzrokuje "same key" upozorenja
data: [...sampleData, ...sampleData]
```

### ✅ Pattern: Mapiranje sa jedinstvenim sufiksima
```tsx
// DOBRO - svaka stavka ima jedinstven ID
data: [
  ...sampleData.map(item => ({ ...item, id: `${item.id}-1` })),
  ...sampleData.map(item => ({ ...item, id: `${item.id}-2` }))
]
```

---

## 5. Import Putanje u Storybook/Vite

### ❌ Anti-Pattern: Workspace aliasi koji ne rade
```tsx
// LOŠE - Vite ponekad ne resoluje workspace pakete
import '@dyn-ui/design-tokens/styles/foundations/index.css';
```

### ✅ Pattern: Relativne putanje za sigurnost
```tsx
// DOBRO - relativne putanje uvek rade
import '../packages/design-tokens/styles/foundations/index.css';
```

---

## 6. Veličine (Size Variants)

### ❌ Anti-Pattern: Minimalne razlike
```css
/* LOŠE - razlika od 8px nije primetna */
.optionSmall { min-height: 40px; }
.optionLarge { min-height: 48px; }
```

### ✅ Pattern: Dramatične razlike za jasnu distinkciju
```css
/* DOBRO - razlika je očigledna */
.optionSmall { min-height: 28px; padding: 2px 8px; font-size: 11px; }
.optionLarge { min-height: 80px; padding: 24px 32px; font-size: 20px; }
```

---

## 7. Layout - Pozicioniranje Akcija

### ❌ Anti-Pattern: flex: 1 gura elemente na krajeve
```css
/* LOŠE - akcije odlaze na desnu ivicu */
.optionContent { flex: 1; }
```

### ✅ Pattern: Eksplicitno poravnanje bez flex-grow
```css
/* DOBRO - elementi ostaju zajedno */
.optionContent { display: flex; /* bez flex: 1 */ }
.optionActions { margin-left: 16px; }
```

---

## 8. Dark Mode

### ✅ Pattern: Koristiti semantic tokene
```css
/* Semantic tokeni automatski menjaju boje */
background: var(--dyn-semantic-background);
color: var(--dyn-semantic-text);
border-color: var(--dyn-semantic-border);
```

### ✅ Pattern: Eksplicitni dark mode selektori (kada je potrebno)
```css
:global(.theme-dark) .component,
:global([data-theme='dark']) .component {
  --component-bg: var(--dyn-color-background-dark, #0f172a);
}
```

---

## 9. Debugging Checklist

Kada komponenta "nema stilove":

1. **Proveri Console** - da li `styles` objekat ima klase?
2. **Proveri Network** - da li se CSS fajl učitava (200)?
3. **Proveri Elements** - da li element ima `class` atribut?
4. **Proveri Computed Styles** - da li su CSS varijable definisane?
5. **Dodaj fallback boje** - privremeno hardkodiraj boje za debug

---

## 10. Komponente - Standardna Struktura

```
ComponentName/
├── ComponentName.tsx         # Glavni komponent
├── ComponentName.module.css  # Stilovi (camelCase klase)
├── ComponentName.types.ts    # TypeScript tipovi
├── ComponentName.stories.tsx # Storybook priče
├── ComponentName.test.tsx    # Unit testovi
└── index.ts                  # Export barrel
```

### CSS Module Struktura
```css
/* 1. Component Tokens (lokalni) */
.root {
  --component-bg: var(--dyn-semantic-background, #fff);
  --component-text: var(--dyn-semantic-text, #000);
}

/* 2. Base Styles */
.root { ... }

/* 3. Variants */
.rootSmall { ... }
.rootLarge { ... }

/* 4. Child Elements */
.item { ... }
.itemLabel { ... }

/* 5. States */
.itemActive { ... }
.itemDisabled { ... }

/* 6. Responsive */
@media (max-width: 768px) { ... }

/* 7. Accessibility */
@media (prefers-reduced-motion: reduce) { ... }
```

---

## Primena na Ostale Komponente

Za svaku komponentu:

1. **Audit CSS** - pretraži `var(--dyn-` bez fallback-a
2. **Audit TSX** - pretraži helper funkcije za klase
3. **Audit Stories** - pretraži duplirane podatke
4. **Proveri imenovanje** - BEM → camelCase
5. **Proveri varijante** - descendant → compound selektori
6. **Proveri veličine** - min-height razlike >= 20px
