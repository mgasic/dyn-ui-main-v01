---
description: Faza 3 - Predlog korekcija i novih tokena
---

# Phase 3: Proposal

Ova faza kreira predlog svih potrebnih izmena pre implementacije.

---

## Koraci

### 1. Predloži nove tokene

Za svaku hardkodiranu vrednost iz Phase 2, predloži token:

**Format predloga:**

| Hardkodirana vrednost | Predloženi token | JSON lokacija |
|-----------------------|------------------|---------------|
| `#3b82f6` | `--dyn-button-bg-primary` | `tokens/button.json` |
| `12px` | `--dyn-button-padding-y` | `tokens/button.json` |

### 2. Istraživanje i Gap Analysis (Best Practices)
// turbo
```powershell
# Istraži moderne standarde za ovu komponentu (npr. WAI-ARIA, Radix UI, Material Design)
```

Uporedi `DynTabs` sa industrijskim standardima.
Klasifikuj nedostajuće funkcionalnosti:
- **Must Have** (Osnovna funkcionalnost, Accessibility)
- **Should Have** (Često korišćeno, poboljšava DX)
- **Optional** (Nice to have, napredno)

Upisi ove nalaze u audit fajl pod "Predlozi za unapređenje".

### 3. Predlozi JSON strukturu

```json
// tokens/[component].json
{
  "dyn": {
    "[component]": {
      "[property]": {
        "value": "{dyn.[category].[value]}",
        "type": "color|dimension|..."
      }
    }
  }
}
```

### 3. Predloži CSS izmene

Za svaku hardkodiranu vrednost, predloži zamenu:

```css
/* BEFORE */
.button { background: #3b82f6; }

/* AFTER */
.button { 
  background: var(--dyn-button-bg-primary, var(--dyn-color-primary, var(--dyn-color-blue-500))); 
}
```

### 4. Predloži TSX izmene (ako je potrebno)

- Dodavanje aria atributa
- Refaktoring za forwardRef
- Dodavanje novih props

### 5. Identifikuj uticaj na zavisne komponente

Za svaku zavisnu komponentu:
- [ ] Da li izmena utiče na ovu komponentu?
- [ ] Da li je potrebna kaskadna izmena?

### 6. Prioritizuj izmene

**P0 - Kritično:**
- Hardkodirane boje i spacing
- Nedostatak dark mode podrške

**P1 - Važno:**
- Nedostatak 3-nivoi fallback
- Nepravilna naming konvencija

**P2 - Nice to have:**
- Dodatni tokeni za buduću fleksibilnost
- Optimizacije

---

## Output

Na kraju ove faze imaš:
1. Lista novih tokena za JSON
2. Lista CSS izmena
3. Lista TSX izmena
4. Uticaj na zavisne komponente
5. Prioritizovani plan

**Ažuriraj audit fajl** (`docs/audit/[ComponentName].audit.md`):
- Popuni sekciju "Predlozi za unapređenje"
- Popuni sekciju "Potrebne dopune JSON tokena"
- Popuni sekciju "Potrebne izmene fajlova"

**Nastavi na:** `/4-implementation`
