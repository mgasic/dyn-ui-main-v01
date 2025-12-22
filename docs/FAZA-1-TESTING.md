# FAZA 1 - TESTING PROCEDURE

## DynResponsiveTabs Design Tokens Implementation

**Status:** ✅ Ready for Testing  
**Branch:** `feature/design-tokens-responsive-tabs`  
**Date:** 22.12.2025

---

## 🧪 TESTING CHECKLIST

### 1. VISUAL TESTING

- [ ] **Inactive Tab Boja** - #E0D78C krem/žuta
- [ ] **Active Tab Boja** - #FFFEF7 svetla krem
- [ ] **Border Boja** - #9C905C braon (2px)
- [ ] **Text Inactive** - #666666 siva
- [ ] **Text Active** - #333333 tamna
- [ ] **Border Radius** - 8px zaobljeni uglovi vidljivi
- [ ] **Content Area** - beli background sa padding-om
- [ ] **Hover State** - #EDE8B0 žuta na hover

**Očekivani Rezultat:**  
Komponenta izgleda **identično kao na slici** iz zahteva.

---

### 2. THEME TESTING

#### Light Theme (Default)
- [ ] Sve boje su vidljive kao na slici
- [ ] Kontrast je dobar
- [ ] Tekst je čitljiv

#### Dark Theme
- [ ] Dark mode se aktivira (prefers-color-scheme: dark)
- [ ] Boje se menjaju na:
  - Background: #2E2E24
  - Active: #3A3A2E
  - Border: #B5AC5F
  - Text: #F0EDD8
- [ ] Kontrast je dobar i u dark mode

**Testiranje:**
```bash
# Sistem light mode
Otvarate aplikaciju na light mode

# Sistem dark mode
Otvarate aplikaciju na dark mode (Preferences > Appearance)

# Manualni dark mode (ako postoji toggle)
Kliknete na theme toggle dugme
```

---

### 3. RESPONSIVE TESTING

#### Desktop (1200px+)
- [ ] Svi tabovi se prikazuju u jednoj liniji
- [ ] Tab padding je 0.75rem 1.5rem
- [ ] Font size je 14px
- [ ] Sve boje se vide jasno

#### Tablet (768px)
- [ ] Tabovi se prikazuju u jednoj liniji
- [ ] Padding se smanjuje na 0.6rem 1rem
- [ ] Font size se smanjuje na 12px
- [ ] Layout ostaje ispravan

#### Mobile (480px)
- [ ] Padding se smanjuje na 0.5rem 0.75rem
- [ ] Font size je 11px
- [ ] Accordion mode se aktivira ili vertikalni layout
- [ ] Sve je čitljivo na malim ekranima

**Testiranje:**
```bash
# Chrome DevTools
F12 > Toggle Device Toolbar (Ctrl+Shift+M)
Testiraj na: 1200px, 768px, 480px
```

---

### 4. ACCESSIBILITY TESTING

- [ ] **Keyboard Navigation**
  - [ ] TAB tipka ide kroz tabove
  - [ ] SHIFT+TAB ide unazad
  - [ ] ENTER/SPACE aktivira tab
  - [ ] Arrow keys rade u vertical orientaciji

- [ ] **Focus Indicator**
  - [ ] 2px outline vidljiv na focus
  - [ ] Outline je 2px solid sa boja border-a
  - [ ] Focus je vidljiv na svim tab-ovima

- [ ] **Screen Reader**
  - [ ] Roles su ispravne (tablist, tab, tabpanel)
  - [ ] aria-selected="true/false" je prisutna
  - [ ] aria-controls je ispravno postavljena
  - [ ] id atributi su jedinstveni

- [ ] **Color Contrast** (WCAG AA)
  - [ ] Inactive text (#666666) na inactive tab (#E0D78C) ≥ 4.5:1
  - [ ] Active text (#333333) na active tab (#FFFEF7) ≥ 4.5:1
  - [ ] Dark mode kontrast je dobar

**Testiranje:**
```bash
# Contrast Checker
https://webaim.org/resources/contrastchecker/

# WAVE Accessibility Tool
Browser Extension > WAVE

# Screen Reader
Windows: NVDA (besplatan)
Mac: VoiceOver (ugrađen)
```

---

### 5. TOKEN VERIFICATION TESTING

- [ ] **CSS Variables Exist**
  ```bash
  DevTools > Elements > Computed
  Traži:
  --dyn-responsive-tabs-bg-inactive
  --dyn-responsive-tabs-bg-active
  --dyn-responsive-tabs-border-color
  // ... svi tokeni
  ```

- [ ] **Token Values su Ispravni**
  ```bash
  DevTools > Elements > Styles > :root
  Proverite sve vrednosti:
  --dyn-responsive-tabs-bg-inactive: #E0D78C ✓
  --dyn-responsive-tabs-bg-active: #FFFEF7 ✓
  // itd.
  ```

- [ ] **CSS File je Učitan**
  ```bash
  DevTools > Network
  Traži: responsive-tabs.css
  Status: 200 OK
  ```

- [ ] **index.css Import Radi**
  ```bash
  DevTools > Console
  Nema grešaka
  CSS se pravilno učitava
  ```

---

## 📝 TEST PLAN EXECUTION

### Step 1: Setup (5 minuta)
```bash
git clone https://github.com/mgasic/dyn-ui-main-v01.git
cd dyn-ui-main-v01
git checkout feature/design-tokens-responsive-tabs
npm install
npm run dev
```

### Step 2: Visual Inspection (10 minuta)
- Otvorite aplikaciju
- Navigujte na DynResponsiveTabs komponentu
- Posmatrajte boje, layout, spacing
- Uporedite sa originalnom slikom

### Step 3: Theme Testing (5 minuta)
- Prebacite u dark mode
- Proverite da se boje menjaju
- Proverite contrast

### Step 4: Responsive Testing (10 minuta)
- Otvorite DevTools (F12)
- Aktivirajte Device Toolbar (Ctrl+Shift+M)
- Testirajte na 1200px, 768px, 480px
- Proverite padding, font size, layout

### Step 5: Accessibility Testing (10 minuta)
- Testirajte keyboard navigaciju
- Testirajte focus indicator
- Ako je moguće, testirajte sa screen readerom
- Proverite color contrast

### Step 6: Token Verification (5 minuta)
- Otvorite DevTools
- Idite na Elements tab
- Pronađite DynResponsiveTabs element
- U Computed sekciji potražite CSS varijable
- Proverite da su vrednosti ispravne

### Total Time: ~45 minuta

---

## ✅ SUCCESS CRITERIA

**Komponenta se Smatra Uspešnom ako:**

1. ✓ Vizuelno izgleda identično kao na slici
2. ✓ Dark theme se aktivira i izgleda dobro
3. ✓ Responsive na svim veličinama ekrana
4. ✓ Keyboard navigacija radi
5. ✓ Focus indicator je vidljiv
6. ✓ Color contrast je dobar
7. ✓ CSS varijable su učitane i imaju ispravne vrednosti
8. ✓ Nema grešaka u konzoli

---

## 🐛 ISSUE REPORTING

Ako naiđete na problem:

```markdown
## Issue: [Naziv problema]

**Lokacija:** [Gde je problem]
**Šta očekujete:** [Očekivano ponašanje]
**Šta se dešava:** [Stvarno ponašanje]
**Koraci za reprodukciju:**
1. ...
2. ...
3. ...

**Screenshot:** [Ako je dostupan]
**Browser:** [Chrome, Firefox, Safari]
**OS:** [Windows, macOS, Linux]
```

---

## 🚀 AFTER TESTING

Kada su svi testovi prošli:

1. [ ] Kreirajte Pull Request
2. [ ] Dodajte opis promena
3. [ ] Link test rezultate
4. [ ] Merge u main
5. [ ] Kreirajte Release

---

## 📚 REFERENCE

- **Token File:** `packages/design-tokens/components/responsive-tabs.css`
- **Component File:** `packages/dyn-ui-react/src/components/DynResponsiveTabs/DynResponsiveTabs.module.css`
- **Index File:** `packages/design-tokens/index.css`
- **Branch:** `feature/design-tokens-responsive-tabs`

---

**Status:** 🟢 Ready for Testing  
**Next Step:** Execute tests and report findings