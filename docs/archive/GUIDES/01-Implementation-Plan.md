# DYN UI - Detaljni Plan Implementacije
## Verzija 1.0 - Decembar 2025

---

## 📋 Sadržaj

1. [Pregled Projekta](#pregled-projekta)
2. [Fazna Realizacija](#fazna-realizacija)
3. [Prioriteti i Timeline](#prioriteti-i-timeline)
4. [Detaljni Zadaci po Fazama](#detaljni-zadaci-po-fazama)
5. [Kontrolne Tačke](#kontrolne-tačke)

---

## Pregled Projekta

### Cilj
Transformacija DYN UI sistema u potpuno unificiran enterprise solution sa:
- ✅ Konzistentnom primenom design tokena na svim 37 komponenti
- ✅ Eliminacijom svih hard-kodiranih vrijednosti
- ✅ Standardizovanom strukturom i imenovanja
- ✅ Enterprise-spreman pristupačnost (WCAG AA+)
- ✅ Dark mode i high contrast suportom
- ✅ Fleksibilnom i jednostavnom za održavanje arhitekturom

### Početno Stanje

**Komponente u skladu sa standardom (85% usklađenosti):**
- DinButton ✅
- DinInput ✅ (sa manjim poboljšanjima)
- DinTable ✅
- DinModal ⚠️ (hard-kodirane vrijednosti)

**Komponente koje trebaju poboljšanja:**
- DinFlex (globalni tokeni umjesto lokalno-scoped)
- DinBadge (pogrešna konvencija imenovanja tokena)
- DinIconButton (nedostaju detalji)
- DinCheckbox, DinRadio, DinToggle, DinSelect (nisu detaljno revidirane)

**Komponente koje trebaju redovnog pregleda:**
- DinTabs, DinBreadcrumb, DinPagination
- DinTooltip, DinSpinner, DinAccordion, DinStepper
- Eventualne nove komponente

---

## Fazna Realizacija

### 📌 FAZA 1: Priprema i Analiza (Sedmica 1-2)

**Aktivnosti:**
1. Detaljni audit svih 37 komponenti
2. Mapiranje svih hard-kodiranih vrijednosti
3. Identifikacija tokena koji nedostaju
4. Kreiranje compliance matrice
5. Setup alata za automatsku validaciju

**Ishod:**
- Detaljni status report svake komponente
- Identifikovani svi problemi i devijacije
- Spreadsheet sa prioritizacijom

---

### 📌 FAZA 2: Refaktorisanje Jezgre (Sedmica 3-6)

**Aktivnosti:**
1. Refaktorovanje DinFlex - lokalni tokeni
2. Refaktorovanje DinBadge - ispravka imenovanja
3. Refaktorovanje DinModal - konverzija hard-kodovanih vrijednosti
4. Kreiranje nedostajućih fondacijskih tokena

**Komponente fokusa:**
- Button-like: DinButton, DinIconButton
- Input-like: DinInput, DinCheckbox, DinRadio, DinToggle, DinSelect
- Layout: DinFlex, DinContainer
- Display: DinBadge, DinTag, DinChip
- Overlay: DinModal, DinDrawer, DinPopover

**Ishod:**
- Refaktorovane sve "problem" komponente
- Sve komponente prate istu konvenciju
- Sve hard-kodirane vrijednosti izbrisane

---

### 📌 FAZA 3: Validacija i Testiranje (Sedmica 7-9)

**Aktivnosti:**
1. Pregled svake komponente sa checklist-om
2. Vizuelno testiranje - sve varijante
3. Testiranje dark mode-a
4. Testiranje high contrast mode-a
5. Testiranje responsive dizajna
6. WCAG AA+ validacija

**Alati:**
- Storybook - vizuelna validacija
- Jest - tokenski testovi
- Axe DevTools - accessibility audit
- Contrast checker - boje validacija

**Ishod:**
- Sve komponente prošle compliance test
- Dokumentovani svi problemi i rješenja
- Sign-off od QA tima

---

### 📌 FAZA 4: Dokumentacija i Training (Sedmica 10-11)

**Aktivnosti:**
1. Ažuriranje COMPONENT_STRUCTURE.md
2. Kreiranje token kataloga
3. Pisanje migration guide-a
4. Kreiranje video tutorijalima
5. Training sessije za dev tim

**Dokumenti:**
- Token Reference Guide
- Component Implementation Guide
- Best Practices Document
- Migration Guide (v1 → v2)
- FAQ i Troubleshooting

**Ishod:**
- Kompletan dokumentacioni set
- Svi dev znaju kako koristiti sistem
- Video vodiči dostupni

---

### 📌 FAZA 5: Nove Komponente (Sedmica 12+)

**Nove komponente:**
- DinToast (notifikacije)
- DinSkeleton (loading placeholders)
- DinAlert (upozorenja)
- DinCard (kartica sa varijantama)
- DinDropdown (napredni select)
- DinDatePicker (kalender)
- DinTimePicker (vrijeme)
- DinRating (zvjezdice/rating)
- DinSteps (wizard steps)
- DinProgress (progress bar)

**Svaka nova komponenta trebala bi:**
- Template struktura
- Design tokens dokumentacija
- Implementation guide
- Storybook stories
- Jest testovi
- Accessibility audit
- Dark/Light mode

**Ishod:**
- Sve nove komponente kreirane
- Sve slijede iste standarde
- Dokumentovane i testirane

---

## Prioriteti i Timeline

### ⏱️ Prioriteti po Uticaju

**HIGH PRIORITY (P0) - KRITAN:**
1. DinButton + Varijante (destructive, outline)
2. DinInput + Sve Input varijante
3. DinFlex - lokalni tokeni
4. DinBadge - imenovanje tokena
5. DinModal - hard-kodirane vrijednosti

**MEDIUM PRIORITY (P1) - VAŽAN:**
1. DinTable - provera i poboljšanja
2. Sve Input komponente (Checkbox, Radio, Toggle, Select)
3. Layout komponente
4. Overlay komponente (Drawer, Popover)
5. Navigation komponente (Tabs, Breadcrumb, Pagination)

**LOW PRIORITY (P2) - ŽELJENO:**
1. Display komponente (Tag, Chip)
2. Tooltip, Spinner, Accordion, Stepper
3. Nove komponente (Toast, Skeleton, Alert)
4. Advanced komponente (DatePicker, TimePicker)

### 📅 Predloženi Timeline

```
Nedelja 1-2:   Analiza i audit          (5%)
Nedelja 3-6:   Refaktorovanje jezgre    (40%)
Nedelja 7-9:   Validacija i testiranje  (25%)
Nedelja 10-11: Dokumentacija            (20%)
Nedelja 12+:   Nove komponente          (10%)
```

**Ukupno vrijeme:** 12+ nedelja (3+ mjeseca)
**Tim:** 2-3 dev-a punog vremena + 1 QA

---

## Detaljni Zadaci po Fazama

### FAZA 1: ANALIZA I AUDIT

#### 1.1 Audit Checklist - DinButton
```
✅ Korišćenje tokena za sve vrijednosti
✅ Root tokeni sa trostrukim fallback
✅ Varijante: primary, secondary, tertiary
✅ Dodatne varijante: destructive, outline
✅ Stanja: hover, focus, active, disabled
✅ Dark mode support
✅ High contrast mode
✅ Responsive dizajn
✅ WCAG AA pristupačnost
✅ Focus ring (vidljivost)
✅ Touch target size (48x48px minimum)
✅ Icon alignment (ako ima ikone)
✅ Loading state (ako primjenjivo)
```

#### 1.2 Token Inventory

**Kreiraj spreadsheet sa kolona:**
- Komponenta
- Token naziv
- Vrijednost (Foundation)
- Vrijednost (Light)
- Vrijednost (Dark)
- Stanje
- Fallback lanac
- Problem status
- Prioritet
- Zaduženi

**Primjer reda:**
```
DinButton | --dyn-button-bg | #007ACC | #007ACC | #0E90D4 | default | var(--dyn-color-primary) | OK | P0 | @dev1
DinButton | --dyn-button-text | #FFFFFF | #FFFFFF | #000000 | default | var(--dyn-color-white) | OK | P0 | @dev1
DinBadge  | --badge-accent | #FF6B6B | ERROR  | ERROR  | primary | var(--dyn-color-error) | ISSUE | P1 | @dev2
```

#### 1.3 Compliance Matrix

Kreiraj tabelu sa svim komponentama:

| Komponenta | Tokeni | Varijante | Dark | A11y | Status | Priority |
|-----------|--------|-----------|------|------|--------|----------|
| DinButton | ✅ | ✅ | ✅ | ✅ | OK | P0 |
| DinInput | ⚠️ | ✅ | ✅ | ⚠️ | REVIEW | P0 |
| DinFlex | ❌ | ❌ | ❌ | - | REFACTOR | P0 |
| DinBadge | ❌ | ⚠️ | ⚠️ | ⚠️ | REFACTOR | P1 |
| DinModal | ❌ | ✅ | ✅ | ⚠️ | REFACTOR | P0 |

---

### FAZA 2: REFAKTOROVANJE

#### 2.1 DinFlex - Lokalni Tokeni

**PROBLEM:**
```css
/* TRENUTNO - GLOBALNO */
:root {
  --dyn-flex-gap: var(--dyn-spacing-2, 8px);
  --dyn-flex-direction: row;
}
```

**RJEŠENJE:**
```css
/* NOVO - LOKALNO SCOPED */
.dynFlex {
  /* Root tokeni */
  --dyn-flex-gap: var(--dyn-spacing-2, 8px);
  --dyn-flex-margin: var(--dyn-spacing-0, 0px);
  --dyn-flex-padding: var(--dyn-spacing-0, 0px);
  --dyn-flex-direction: row;
  --dyn-flex-align-items: stretch;
  --dyn-flex-justify-content: flex-start;
  
  display: flex;
  gap: var(--dyn-flex-gap);
  margin: var(--dyn-flex-margin);
  padding: var(--dyn-flex-padding);
  flex-direction: var(--dyn-flex-direction);
  align-items: var(--dyn-flex-align-items);
  justify-content: var(--dyn-flex-justify-content);
}

/* Varijante */
.dynFlex.directionColumn {
  --dyn-flex-direction: column;
}

.dynFlex.gapLarge {
  --dyn-flex-gap: var(--dyn-spacing-4, 16px);
}

.dynFlex.alignCenter {
  --dyn-flex-align-items: center;
}

.dynFlex.justifyCenter {
  --dyn-flex-justify-content: center;
}
```

**Prednosti:**
- Lokalno scope - nema curenja globalnih varijabli
- Lakše testiranje i debuging
- Bolja performansa
- Lakše za održavanje

---

#### 2.2 DinBadge - Ispravka Imenovanja

**PROBLEM:**
```css
/* TRENUTNO - POGREŠNA KONVENCIJA */
--badge-accent: var(--dyn-color-primary-60);
--badge-soft-fallback: var(--dyn-color-primary-40);
```

**RJEŠENJE:**
```css
/* NOVO - ISPRAVNA KONVENCIJA */
:root {
  /* Korijen tokeni */
  --dyn-badge-bg: var(--dyn-color-neutral-60, #E8E8E8);
  --dyn-badge-text: var(--dyn-color-neutral-1000, #000000);
  --dyn-badge-border: transparent;
  
  /* Varijante */
  --dyn-badge-primary-bg: var(--dyn-color-primary-60, #007ACC);
  --dyn-badge-primary-text: var(--dyn-color-white, #FFFFFF);
  --dyn-badge-primary-border: transparent;
  
  --dyn-badge-success-bg: var(--dyn-color-success-60, #28A745);
  --dyn-badge-success-text: var(--dyn-color-white, #FFFFFF);
  
  --dyn-badge-error-bg: var(--dyn-color-error-60, #DC3545);
  --dyn-badge-error-text: var(--dyn-color-white, #FFFFFF);
  
  --dyn-badge-warning-bg: var(--dyn-color-warning-60, #FFC107);
  --dyn-badge-warning-text: var(--dyn-color-gray-1000, #000000);
  
  --dyn-badge-info-bg: var(--dyn-color-info-60, #17A2B8);
  --dyn-badge-info-text: var(--dyn-color-white, #FFFFFF);
  
  /* Soft varijante */
  --dyn-badge-primary-soft-bg: var(--dyn-color-primary-20, rgba(0, 122, 204, 0.2));
  --dyn-badge-primary-soft-text: var(--dyn-color-primary-100, #002D5C);
  
  /* Outline varijante */
  --dyn-badge-primary-outline-bg: transparent;
  --dyn-badge-primary-outline-text: var(--dyn-color-primary-80, #0E90D4);
  --dyn-badge-primary-outline-border: var(--dyn-color-primary-80, #0E90D4);
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --dyn-badge-bg: var(--dyn-color-neutral-200, #2D2D2D);
    --dyn-badge-text: var(--dyn-color-neutral-50, #F5F5F5);
    
    --dyn-badge-primary-soft-bg: var(--dyn-color-primary-20-dark, rgba(14, 144, 212, 0.2));
    --dyn-badge-primary-soft-text: var(--dyn-color-primary-100-dark, #7ECEF5);
  }
}
```

**CSS klase:**
```css
.badge {
  background-color: var(--dyn-badge-bg, var(--dyn-color-neutral-60, #E8E8E8));
  color: var(--dyn-badge-text, var(--dyn-color-neutral-1000, #000000));
  border: 1px solid var(--dyn-badge-border, transparent);
  padding: var(--dyn-spacing-1, 4px) var(--dyn-spacing-2, 8px);
  border-radius: var(--dyn-radius-sm, 4px);
  font-size: var(--dyn-font-size-sm, 12px);
  font-weight: var(--dyn-font-weight-medium, 500);
  display: inline-block;
  white-space: nowrap;
}

.badge.variantPrimary {
  --dyn-badge-bg: var(--dyn-badge-primary-bg);
  --dyn-badge-text: var(--dyn-badge-primary-text);
  --dyn-badge-border: var(--dyn-badge-primary-border);
}

.badge.variantSuccess {
  --dyn-badge-bg: var(--dyn-badge-success-bg);
  --dyn-badge-text: var(--dyn-badge-success-text);
}

.badge.styleSoft {
  --dyn-badge-bg: var(--dyn-badge-primary-soft-bg);
  --dyn-badge-text: var(--dyn-badge-primary-soft-text);
}

.badge.styleOutline {
  --dyn-badge-bg: var(--dyn-badge-primary-outline-bg);
  --dyn-badge-text: var(--dyn-badge-primary-outline-text);
  --dyn-badge-border: var(--dyn-badge-primary-outline-border);
}
```

---

#### 2.3 DinModal - Hard-kodovane Vrijednosti

**PROBLEM:**
```css
/* TRENUTNO - HARD-KODIRANE VRIJEDNOSTI */
.modal {
  background-color: rgba(0, 0, 0, 0.5); /* Hard-kodovano! */
  max-width: 500px; /* Hard-kodovano! */
}
```

**RJEŠENJE:**
```css
/* NOVO - KORISTI TOKENE */
:root {
  /* Foundation overlay tokeni */
  --dyn-overlay-bg-color: rgba(0, 0, 0, 0.5);
  --dyn-overlay-bg-dark: rgba(0, 0, 0, 0.7);
  
  /* Modal specifični tokeni */
  --dyn-modal-max-width: var(--dyn-spacing-96, 500px); /* 500px = 16 * 31.25 */
  --dyn-modal-min-width: var(--dyn-spacing-64, 320px);
  --dyn-modal-bg: var(--dyn-color-white, #FFFFFF);
  --dyn-modal-border: 1px solid var(--dyn-color-gray-300, #D0D0D0);
  --dyn-modal-border-radius: var(--dyn-radius-lg, 8px);
  --dyn-modal-box-shadow: var(--dyn-shadow-lg, 0 10px 40px rgba(0,0,0,0.2));
  --dyn-modal-padding: var(--dyn-spacing-6, 24px);
  --dyn-modal-header-padding: var(--dyn-spacing-6, 24px);
  --dyn-modal-body-padding: var(--dyn-spacing-6, 24px);
  --dyn-modal-footer-padding: var(--dyn-spacing-4, 16px) var(--dyn-spacing-6, 24px);
  
  /* Z-index */
  --dyn-modal-overlay-z-index: var(--dyn-z-index-modal, 1040);
  --dyn-modal-dialog-z-index: var(--dyn-z-index-modal-dialog, 1050);
  
  /* Animacija */
  --dyn-modal-animation-duration: var(--dyn-animation-duration-normal, 300ms);
  --dyn-modal-animation-timing: var(--dyn-animation-timing-ease, cubic-bezier(0.4, 0, 0.2, 1));
}

@media (prefers-color-scheme: dark) {
  :root {
    --dyn-overlay-bg-color: rgba(0, 0, 0, 0.7);
    --dyn-modal-bg: var(--dyn-color-gray-900, #1A1A1A);
    --dyn-modal-border: 1px solid var(--dyn-color-gray-700, #404040);
    --dyn-modal-box-shadow: var(--dyn-shadow-lg-dark, 0 10px 40px rgba(0,0,0,0.5));
  }
}

/* CSS */
.modalBackdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--dyn-overlay-bg-color, rgba(0, 0, 0, 0.5));
  z-index: var(--dyn-modal-overlay-z-index, 1040);
  animation: fadeIn var(--dyn-modal-animation-duration) var(--dyn-modal-animation-timing);
}

.modalContent {
  background-color: var(--dyn-modal-bg, var(--dyn-color-white, #FFFFFF));
  border: var(--dyn-modal-border, 1px solid #D0D0D0);
  border-radius: var(--dyn-modal-border-radius, 8px);
  box-shadow: var(--dyn-modal-box-shadow);
  max-width: var(--dyn-modal-max-width, 500px);
  min-width: var(--dyn-modal-min-width, 320px);
  width: 90vw;
  z-index: var(--dyn-modal-dialog-z-index, 1050);
  animation: slideIn var(--dyn-modal-animation-duration) var(--dyn-modal-animation-timing);
}

.modalHeader {
  padding: var(--dyn-modal-header-padding, 24px);
  border-bottom: 1px solid var(--dyn-color-gray-200, #E0E0E0);
}

.modalBody {
  padding: var(--dyn-modal-body-padding, 24px);
}

.modalFooter {
  padding: var(--dyn-modal-footer-padding, 16px 24px);
  border-top: 1px solid var(--dyn-color-gray-200, #E0E0E0);
  display: flex;
  gap: var(--dyn-spacing-2, 8px);
  justify-content: flex-end;
}
```

---

### FAZA 3: VALIDACIJA

#### 3.1 Checklist za Svaku Komponentu

```markdown
## Komponenta: [Naziv]

### Tokenski Nivo
- [ ] Svi tokeni korištenju `--dyn-` prefiks
- [ ] Root tokeni definirani u CSS modulu
- [ ] Trostruki fallback implementiran
- [ ] Nema hard-kodiranih vrijednosti
- [ ] Nema globalnih varijabli (osim foundation)

### Varijante
- [ ] Sve varijante implementirane
- [ ] Varijante koriste fallback obrazac
- [ ] Varijante dokumentirane
- [ ] Varijante testirane u Storybook

### Dark Mode
- [ ] Dark mode override definirano
- [ ] @media (prefers-color-scheme: dark) prisutna
- [ ] Sve boje prilagođene
- [ ] Kontrast je dovoljan

### Responsive Dizajn
- [ ] Mobile varijanta (< 768px)
- [ ] Tablet varijanta (768px - 1024px)
- [ ] Desktop varijanta (> 1024px)
- [ ] Touch target minimum 44x44px

### Pristupačnost (A11y)
- [ ] WCAG AA kontrast (4.5:1 za tekst)
- [ ] Focus ring vidljiv
- [ ] Keyboard navigacija radi
- [ ] ARIA atributi gdje trebaju
- [ ] Semantički HTML elementi

### Testiranje
- [ ] Jest testovi pokrivaju tokene
- [ ] Visual regression testovi
- [ ] Accessibility audit passed
- [ ] Storybook stories dokumentirane
```

---

## Kontrolne Tačke

### Nedelja 2 - Analiza Complete
**Deliverables:**
- ✅ Compliance Matrix (sve 37 komponenti)
- ✅ Token Inventory (kompletan)
- ✅ Problem List (sa prioritetima)
- ✅ Timeline potvrđen sa stakeholders

### Nedelja 6 - Refaktor Complete
**Deliverables:**
- ✅ Svi P0 problemi otklonjeni
- ✅ Sve problem komponente refaktorovane
- ✅ Svi tokeni koherentni
- ✅ Build proces provjeren

### Nedelja 9 - QA Complete
**Deliverables:**
- ✅ Sve komponente prošle A11y audit
- ✅ Svi dark mode testovi passed
- ✅ Sve responsive varijante OK
- ✅ Build proces stabil

### Nedelja 11 - Launch Ready
**Deliverables:**
- ✅ Dokumentacija finalizovana
- ✅ Team training završen
- ✅ Migration guide gotov
- ✅ Gotov za production release

---

## Zaključak

Ovaj plan predstavlja strukturirani pristup transformaciji DYN UI u kompletno unificiran enterprise sistem. Fokus je na:

1. **Konsistentnosti** - sve komponente prate iste principe
2. **Fleksibilnosti** - lakšo za tema-ovanje i proširenja
3. **Održavanju** - minimalno dupliciranja koda
4. **Enterprise standardima** - pristupačnost, dokumentacija, testovi

Uspješna implementacija ovog plana rezultiraće:
- 🎯 Profesionalnim, enterprise-ready komponentama
- 🎯 Jednostavnim za održavanje kodom
- 🎯 Fleksibilnom tema-ovanjem
- 🎯 Sveobuhvatnom dokumentacijom
- 🎯 Happy dev tim sa jasnim standardima
