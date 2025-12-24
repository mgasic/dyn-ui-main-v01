# DYN UI - Finalni Plan Implementacije
## Verzija 2.0 - Čišćen i Fokusiran

---

## 🎯 CILJ
Transformacija DYN UI sistema u **enterprise-ready, 100% design token compliant** sistem.

---

## 📊 SITUACIJA
- ✅ 82% compliance (37 komponenti)
- ❌ 3 KRITIČNA problema (P0): DinFlex, DinBadge, DinModal
- ⚠️ 5 VAŽNIH problema (P1): DinInput i input varijante
- 🚀 Nedostaju: 6 kritičnih novih komponenti

---

## 🔴 KRITIČNI ZADACI (P0) - 11 sati

### 1. DinFlex - Lokalni Scope
**Problem:** Globalni tokeni → curenja
**Rješenje:** Prebaci u `.dynFlex` scope
**Procjena:** 3 sata

### 2. DinBadge - Ispravka Imenovanja
**Problem:** `--badge-accent` → trebalo `--dyn-badge-primary-bg`
**Rješenje:** Standardizuj sve tokene
**Procjena:** 4 sata

### 3. DinModal - Hard-kodirane Vrijednosti
**Problem:** `rgba(0,0,0,0.5)`, `500px` → trebalo tokeni
**Rješenje:** Prebaci u `--dyn-overlay-bg`, `--dyn-modal-max-width`
**Procjena:** 4 sata

---

## 🟡 VAŽNI ZADACI (P1) - 18 sati

### Input Familie - Standardizacija
- DinInput: spin buttons, error icon
- DinCheckbox, DinRadio, DinToggle, DinSelect: sve trebaju struktuirani tokeni
- **Procjena:** 18 sati

---

## 📋 TIMELINE

```
Nedelja 1-2:   P0 Refactor (DinFlex, DinBadge, DinModal)
Nedelja 3-4:   P1 Input Familie
Nedelja 5:     QA i Testiranje
Nedelja 6:     Dokumentacija
Nedelja 7+:    Nove Komponente (TIER 1)
```

---

## ✅ SUCCESS CRITERIA

1. **P0 Gotovo** → 3 komponente refaktorovane
2. **P1 Gotovo** → sve input varijante standardizovane
3. **100% Tokeni** → nema hard-kodiranih vrijednosti
4. **Dark Mode** → radi na svim komponentama
5. **A11y** → WCAG AA+ provjera na svim
6. **Dokumentovano** → sve komponente u Storybook-u

---

## 🚀 SLJEDEĆI KORAK

**Počni sa Template Files** → kreiraj shablone za sve komponente i refaktor.
