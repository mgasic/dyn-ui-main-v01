# CSS Module Standards - DYN UI Design System

**Version:** 1.0.0  
**Last Updated:** 2026-01-24  
**Status:** ✅ Finalized for Batch 1

---

## 📐 Naming Conventions

### 1. Class Names
**Standard:** **camelCase** for all CSS class names

```css
/* ✅ CORRECT */
.root
.container
.sizeLarge
.variantPrimary
.boxInteractive
.badgeClickable

/* ❌ INCORRECT - Do NOT use */
.size-large         /* kebab-case */
.variant_primary    /* snake_case */
.badge--clickable   /* BEM notation */
```

### 2. Internal Variables

**Standard:** Use `-val` suffix for resolved/internal variables

Koristi se kada komponenta definiše interne varijable koje kombinuju override, component token, i foundation fallback u jednu "resolved" vrednost radi čitljivosti.

```css
/* ✅ CORRECT */
--dyn-avatar-size-val: var(--dyn-avatar-size-md, 40px);
--dyn-table-bg-val: var(--dyn-table-bg, var(--dyn-table-root-backgroundColor));
--dyn-flex-gap-val: var(--dyn-flex-gap, 0);

/* ❌ INCORRECT */
--dyn-avatar-size-internal: ...    /* Stari stil, ne koristiti */
--dyn-table-bg-value: ...          /* Previše opširno */
```

**Kada koristiti `-val`:**
- Kada ista varijabla ima višestruke override nivoe
- Kada želiš da pojednostaviš čitljivost koda
- Kada ista vrednost se koristi na više mesta u fajlu

---

## 🏗️ 3-Level Fallback Pattern

**Standard:** Svaka CSS property koja koristi tokene MORA implementirati 3-level fallback:

```css
property: var(--override-token, var(--component-token, var(--foundation-token, hardcoded-fallback)));
```

### Nivoi:

1. **Layer 3 (Override)** - `--dyn-component-override` - Korisnik može da setuje
2. **Layer 2 (Component)** - `--dyn-component-property` - Generisan iz tokens
3. **Layer 1 (Foundation)** - `--dyn-foundation-token` - Globalni token
4. **Hardcoded Fallback** - `#3b82f6`, `16px` - Krajnji fallback

### Primer implementacije:

```css
.root {
  /* 3-level fallback sa internal -val varijablom za čitljivost */
  --dyn-button-bg-val: var(
    --dyn-button-bg,                          /* Layer 3: Override */
    var(--dyn-button-root-backgroundColor,    /* Layer 2: Component */
      var(--dyn-theme-primary, #3b82f6)       /* Layer 1 + Hardcoded */
    )
  );
  
  background-color: var(--dyn-button-bg-val);
}
```

---

## ♿ Accessibility Standards

### 1. **Reduced Motion** (OBAVEZNO ✅)

Sve komponente MORAJU imati `prefers-reduced-motion` blok:

```css
@media (prefers-reduced-motion: reduce) {
  .component {
    transition: none;
    animation: none;
  }
}
```

### 2. **High Contrast** (OBAVEZNO ✅)

Sve komponente MORAJU imati `prefers-contrast: high` blok:

```css
@media (prefers-contrast: high) {
  /* Povećanje debljine bordera */
  .bordered {
    border-width: 2px;
  }
  
  /* Pojačavanje focus outline-a */
  .root:focus-visible {
    outline-width: 3px;
  }
}
```

**Pravila:**
- Uvećaj `border-width` za **50-100%** (1px → 2px, 2px → 3px)
- Povećaj `outline-width` na **3px** za focus states
- Pojačaj `font-weight` za important text (npr. errors, labels)

### 3. **Focus-Visible** (OBAVEZNO za interaktivne elemente ✅)

Svi interaktivni elementi (buttons, links, clickable containers) MORAJU imati `focus-visible`:

```css
/* Za root/button elemente */
.root:focus-visible {
  outline: var(--dyn-border-width-md, 2px) solid var(--dyn-semantic-border-focus);
  outline-offset: var(--dyn-spacing-2xs, 2px);
  z-index: 1;
}

/* Za child elemente (npr. u flex/stack) */
.container > :focus-visible {
  outline: 2px solid var(--dyn-semantic-border-focus);
  outline-offset: 2px;
}

/* Za table/grid ćelije (inside outline) */
.cell:focus-visible {
  outline: 2px solid var(--dyn-semantic-border-focus);
  outline-offset: -2px;  /* Negative za inside */
}
```

**Token za focus:**
- Uvek koristi `var(--dyn-semantic-border-focus)`
- Fallback: `#3b82f6` ili odgovarajuća primary boja

---

## 📁 File Structure

### Standardni CSS Module Layout:

```css
/**
 * ComponentName Component Styles
 * 100% Design Token Compliance
 * Unified Token Strategy: 3-Level Fallback Pattern
 */

.root {
  /* ==========================================================================
     COMPONENT TOKENS (Layer 2)
     ========================================================================== */
  
  /* Internal resolved variables (-val) */
  --dyn-comp-size-val: var(--dyn-comp-size, var(--dyn-comp-token, fallback));
  
  /* ==========================================================================
     BASE STYLES
     ========================================================================== */
  
  property: var(--dyn-comp-size-val);
}

/* ==========================================================================
   VARIANTS
   ========================================================================== */

.variantPrimary { ... }
.sizeLarge { ... }

/* ==========================================================================
   ACCESSIBILITY
   ========================================================================== */

.root:focus-visible { ... }

@media (prefers-reduced-motion: reduce) { ... }

@media (prefers-contrast: high) { ... }

/* ==========================================================================
   RESPONSIVE
   ========================================================================== */

@media (max-width: 768px) { ... }
```

---

## 🚫 Hardcoded Values - Kad su Dozvoljeni

### ✅ DOZVOLJENO:

1. **Accessibility vrednosti:**
   ```css
   outline: 2px solid ...;
   outline-offset: 2px;
   border-width: 2px;    /* u high-contrast */
   ```

2. **Responsive breakpoints:**
   ```css
   @media (max-width: 768px) { ... }
   @media (max-width: 640px) { ... }
   ```

3. **Fixed layout values** (ako nema smisla tokenizovati):
   ```css
   z-index: 1;
   position: absolute;
   flex: 1;
   ```

### ❌ NIJE DOZVOLJENO:

1. **Hex boje:** `#3b82f6` - Mora kroz token
2. **RGB/RGBA:** `rgba(0,0,0,0.5)` - Mora kroz token  
3. **Spacing px:** `padding: 16px` - Mora kroz token
4. **Font sizes:** `font-size: 14px` - Mora kroz token

---

## ✅ Checklist za Novu Komponentu

Kada kreiras novu komponentu, proveri:

- [ ] Svi class names su **camelCase**
- [ ] Sve boje koriste **tokene** (nema hex/rgb)
- [ ] Svi spacing koriste **tokene** (nema px osim za a11y)
- [ ] Internal varijable koriste **`-val` sufiks**
- [ ] Implementiran **3-level fallback** pattern
- [ ] Dodat **`@media (prefers-reduced-motion)`** blok
- [ ] Dodat **`@media (prefers-contrast: high)`** blok
- [ ] Dodato **`:focus-visible`** za interaktivne elemente
- [ ] Komentari organizovani sa **section headers** (`/* === SECTION === */`)
- [ ] Testirano u **Storybook** (light/dark mode, focus states)

---

## 📚 Related Documentation

- [`TOKEN_MAINTENANCE_GUIDE.md`](./TOKEN_MAINTENANCE_GUIDE.md) - Kako kreirati/modifikovati tokene
- [`COMPONENT_DEVELOPMENT_GUIDE.md`](./COMPONENT_DEVELOPMENT_GUIDE.md) - React component best practices
- [`GOLDEN_AUDIT_CHECKLIST.md`](./GOLDEN_AUDIT_CHECKLIST.md) - Audit checklist za komponente

---

**Ovi standardi su finalizirani na osnovu Batch 1 audit-a i primenjuju se na sve buduće komponente.**
