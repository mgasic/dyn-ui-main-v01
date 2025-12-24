# 🚀 P0 REFACTOR - POČNI OVDJE

## DynFlex, DynBadge, DynModal → 100% Design Token Compliance

---

## 📋 Struktura Rada

```
main branch
    ↓
1. Čitaj dokumentaciju
2. Kreiraj branch: feat/refactor-dyn{Component}
3. Refaktoruj komponentu
4. Test & Commit
5. Push i napravi PR
6. Review i Merge
```

---

## 🎯 P0 - TRI KRITIČNA KOMPONENTE

### 1️⃣ DynFlex (3 sata)

**Lokacija:** `packages/dyn-ui-react/src/components/DynFlex/`

**Problem:** Koristi globalne tokene → curenja stilova između komponenti

**Šta Trebalo Biti Refaktorovano:**

```css
/* ❌ PRIJE - Globalni tokeni */
:root {
  --flex-gap: 12px;
  --flex-padding: 8px;
}

/* ✅ NAKON - Lokalni scope */
.flex {
  --dyn-flex-gap: var(--dyn-spacing-3, 12px);
  --dyn-flex-padding: var(--dyn-spacing-2, 8px);
}
```

**Koraci:**

1. Otvori `DynFlex.module.css`
2. Prebaci sve globalne varijable u `.flex` scope
3. Dodaj `--dyn-` prefiks na sve tokene
4. Testiraj sve varijante u Storybook-u
5. Commit: `refactor(DynFlex): convert to design token compliance`

---

### 2️⃣ DynBadge (4 sata)

**Lokacija:** `packages/dyn-ui-react/src/components/DynBadge/`

**Problem:** Pogrešna konvencija imenovanja tokena

**Šta Trebalo Biti Refaktorovano:**

```css
/* ❌ PRIJE - Pogrešna imena */
--badge-accent
--badge-bg-color
--badge-text-color

/* ✅ NAKON - Ispravna imena */
--dyn-badge-primary-bg
--dyn-badge-primary-text
--dyn-badge-secondary-bg
--dyn-badge-secondary-text
```

**Naming Convention:**

- Format: `--dyn-[component]-[property]-[state]`
- Property: `bg`, `text`, `border`, `shadow`
- State: `default`, `hover`, `active`, `disabled`

**Koraci:**

1. Otvori `DynBadge.module.css`
2. Preimenuj sve tokene u `--dyn-badge-*`
3. Koristi Foundation tokene za vrijednosti
4. Dodaj dark mode override-e
5. Commit: `refactor(DynBadge): fix token naming convention`

---

### 3️⃣ DynModal (4 sata)

**Lokacija:** `packages/dyn-ui-react/src/components/DynModal/`

**Problem:** Hard-kodirane vrijednosti umjesto tokena

**Šta Trebalo Biti Refaktorovano:**

```css
/* ❌ PRIJE - Hard-kodirane vrijednosti */
.modal {
  background: rgba(0, 0, 0, 0.5);
  width: 500px;
  max-height: 90vh;
  z-index: 999;
}

/* ✅ NAKON - Tokenizovane vrijednosti */
.modal {
  background: var(--dyn-overlay-bg, rgba(0, 0, 0, 0.5));
  max-width: var(--dyn-modal-max-width, 500px);
  max-height: var(--dyn-modal-max-height, 90vh);
  z-index: var(--dyn-z-index-modal, 999);
}
```

**Koraci:**

1. Otvori `DynModal.module.css`
2. Identifikuj sve hard-kodirane vrijednosti
3. Prebaci ih u tokene sa trostrukim fallback-om
4. Testiraj sve varijante (small, medium, large)
5. Commit: `refactor(DynModal): convert hard-coded values to tokens`

---

## ✅ CHECKLIST ZA SVAKI COMMIT

### Prije Commit-a

- [ ] Sve klase koriste `--dyn-` prefiks
- [ ] Naming: `--dyn-component-property-state`
- [ ] Fallback: `var(--dyn-component, var(--dyn-foundation, #hardcoded))`
- [ ] Dark mode override-i su implementirani
- [ ] Nema hard-kodiranih vrijednosti

### CSS Standards

- [ ] Foundation tokeni se ne referenciraju
- [ ] Component tokeni samo Foundation + fallback
- [ ] Theme samo override boja za dark mode
- [ ] Responsive design je uključen

### Testing

- [ ] Storybook priče su ažurirane
- [ ] Dark mode je testiran
- [ ] Responsive je testiran
- [ ] Axe-core audit je prođen (0 violations)
- [ ] Jest testovi su pass-uju

### Git

- [ ] Branch: `feat/refactor-dyn{Component}`
- [ ] Commit message: `refactor(Dyn{Component}): 100% design token compliance`
- [ ] PR sa checklist-om iz START-HERE.md

---

## 🔧 Template Token Structure

Koristi ovu strukturu za svaku komponentu:

```css
/* ============================================
   COMPONENT TOKENS - Default (Light Mode)
   ============================================ */

:root {
  /* Base tokens */
  --dyn-component-bg: var(--dyn-color-white, #FFFFFF);
  --dyn-component-text: var(--dyn-color-gray-1000, #000000);
  --dyn-component-border: var(--dyn-color-gray-300, #D0D0D0);

  /* State: Hover */
  --dyn-component-bg-hover: var(--dyn-color-gray-100, #F5F5F5);

  /* Variant: Primary */
  --dyn-component-primary-bg: var(--dyn-color-primary-60, #007ACC);
  --dyn-component-primary-text: var(--dyn-color-white, #FFFFFF);
}

/* ============================================
   DARK MODE OVERRIDES
   ============================================ */

@media (prefers-color-scheme: dark) {
  :root {
    --dyn-component-bg: var(--dyn-color-gray-900, #1A1A1A);
    --dyn-component-text: var(--dyn-color-gray-50, #F5F5F5);
  }
}

/* ============================================
   COMPONENT STYLES
   ============================================ */

.component {
  background-color: var(--dyn-component-bg);
  color: var(--dyn-component-text);
  border: 1px solid var(--dyn-component-border);
  /* etc */
}
```

---

## 📊 Timeline

```
Nedelja 1:
  Mon-Tue:  DynFlex (3h)
  Wed-Thu:  DynBadge (4h)

Nedelja 2:
  Mon-Tue:  DynModal (4h)
  Wed-Thu:  Testing & Code Review
  Fri:      Merge all P0 PR-s
```

---

## 🎯 Success Criteria P0

✅ **DynFlex**

- [ ] Nema globalnih tokena
- [ ] Svi tokeni u `.flex` scope
- [ ] Dark mode radi
- [ ] Storybook je ažurirat

✅ **DynBadge**

- [ ] Svi tokeni kreću sa `--dyn-badge-`
- [ ] Konvencija: `--dyn-badge-[property]-[state]`
- [ ] Dark mode radi
- [ ] A11y je provjeren

✅ **DynModal**

- [ ] Nema hard-kodiranih vrijednosti
- [ ] Sve vrijednosti su tokeni
- [ ] Trostruki fallback je implementiran
- [ ] Responsive je testiran

---

## 📝 Commit Messages

```
refactor(DynFlex): convert global tokens to component scope

- Move tokens from :root to .flex scope
- Add --dyn- prefix to all variables
- Implement dark mode overrides
- Update Storybook stories

Fixes: #123
```

```
refactor(DynBadge): fix token naming convention

- Rename badges tokens to --dyn-badge-*
- Follow --dyn-component-property-state pattern
- Add Foundation token references
- Implement dark mode

Fixes: #124
```

```
refactor(DynModal): convert hard-coded values to tokens

- Replace hard-coded values with CSS variables
- Implement trostruki fallback pattern
- Add responsive design tokens
- Test all modal sizes

Fixes: #125
```

---

## 🚀 Počni Sada

1. **Pročitaj** `CLEAN-PLAN.md` (10 min)
2. **Kreiraj branch:**

   ```bash
   git checkout -b feat/refactor-dyn-flex
   ```

3. **Otvori komponentes CSS:**

   ```bash
   code packages/dyn-ui-react/src/components/DynFlex/DynFlex.module.css
   ```

4. **Slijedi Checklist** iz ovog dokumenta
5. **Commit & Push:**

   ```bash
   git add .
   git commit -m "refactor(DynFlex): 100% design token compliance"
   git push origin feat/refactor-dyn-flex
   ```

6. **Napravi PR** sa checklist-om iz `START-HERE.md`

---

**Status:** Ready for Implementation
**Priority:** 🔴 CRITICAL
**Timeline:** Nedelje 1-2
**Owner:** Development Team
