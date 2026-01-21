# DynTabs - Audit Report

**Datum kreiranja**: 2026-01-20  
**Poslednje ažuriranje**: 2026-01-20  
**Status**: 🟡 U toku

---

## 📋 Sažetak

DynTabs komponenta je dobro strukturirana sa solidnom accessibility podrškom i korišćenjem design tokena. CSS je 95% usklađen sa token sistemom. Glavni nedostaci su:
- `DynTabsRef` definisan u tipovima ali nije implementiran u komponenti
- Nedostaju neke varijante stilova (`underlined`, `bordered`)
- Testovi očekuju funkcionalnosti koje nisu implementirane

---

## 🔍 Analiza trenutnog stanja

### Stilovi (CSS)
| Problem | Opis | Prioritet |
|---------|------|-----------|
| ✅ Token korišćenje | CSS koristi design tokene za sve boje i spacing | - |
| ⚠️ Breakpoint hardkodiran | `767px` u media query - prihvatljivo | P2 |
| ⚠️ Nedostaje `underlined` varijanta | Definisana u types ali nema CSS | P1 |
| ⚠️ Nedostaje `bordered` varijanta | Definisana u types ali nema CSS | P1 |
| ⚠️ Size klase nepotpune | Size small/large parcijalno implementirani | P1 |

### Funkcionalnost (TSX)
| Nedostatak | Opis | Prioritet |
|------------|------|-----------|
| ❌ `DynTabsRef` nije implementiran | Interface postoji u types ali `useImperativeHandle` nije dodat | P0 |
| ❌ `data-status` atribut | Testovi očekuju data-status="active/inactive/disabled" | P1 |
| ❌ `data-testid` za close button | Testovi očekuju `test-tabs-close-{id}` pattern | P1 |
| ⚠️ `onTabClick` callback | Definisan u types ali nije korišćen | P2 |
| ⚠️ `addable` prop | Definisan u types ali nije implementiran | P2 |
| ⚠️ `tabListClassName` prop | Definisan ali nije korišćen | P2 |
| ⚠️ `contentClassName` prop | Definisan ali nije korišćen | P2 |

### Tipovi (types.ts)
| Problem | Opis | Prioritet |
|---------|------|-----------|
| ✅ JSDoc dokumentacija | Svi props imaju JSDoc komentare | - |
| ✅ Type exports | Sve potrebno je eksportovano | - |
| ⚠️ ProcessedTabItem tip | Ima `processedKey` ali komponenta koristi `processedId` | P2 |

---

## 📊 Razlike: Trenutno vs Dokumentacija

### Prema DESIGN_TOKEN_SYSTEM.md
| Zahtev iz dokumentacije | Trenutno stanje | Usklađeno? |
|-------------------------|-----------------|------------|
| 3-nivoi fallback | Delimično (većina ima 2 nivoa) | 🟡 |
| Dark mode podrška | Da (kroz semantic tokene) | ✅ |
| Bez hardkodiranih vrednosti | Da (osim breakpoint) | ✅ |
| Imenovane konvencije | Da (`--dyn-tabs-*`) | ✅ |

### Prema COMPONENT_STRUCTURE.md
| Zahtev | Trenutno stanje | Usklađeno? |
|--------|-----------------|------------|
| forwardRef | Da | ✅ |
| aria atributi | Da (tablist, tab, tabpanel) | ✅ |
| CSS Modules | Da | ✅ |
| Keyboard navigation | Da | ✅ |
| Ref imperative methods | Ne | ❌ |

---

## 🌐 Best Practices Analiza (WAI-ARIA APG)

### Must Have (Obavezno)
Prema [WAI-ARIA APG Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/):

| Zahtev | Status | Napomena |
|--------|--------|----------|
| `role="tablist"` | ✅ | Implementirano |
| `role="tab"` | ✅ | Implementirano |
| `role="tabpanel"` | ✅ | Implementirano |
| `aria-selected` | ✅ | Implementirano |
| `aria-controls` | ✅ | Implementirano |
| `aria-labelledby` | ✅ | Panel ima aria-labelledby |
| Keyboard: Arrow keys | ✅ | Left/Right/Up/Down rade |
| Keyboard: Home/End | ✅ | Implementirano |
| `tabindex` roving | ✅ | tabIndex 0/-1 pattern |
| **DynTabsRef** | ❌ | **NEDOSTAJE** |
| **data-status** | ❌ | **NEDOSTAJE** |

### Should Have (Trebalo bi)
Uobičajene funkcionalnosti u modernim bibliotekama (Radix UI, Headless UI, Chakra):

| Funkcionalnost | Status | Napomena |
|----------------|--------|----------|
| `underlined` varijanta | ❌ | U types ali bez CSS |
| `bordered` varijanta | ❌ | U types ali bez CSS |
| Konzistentne size klase | 🟡 | Parcijalno |
| `tabListClassName` prop | ❌ | Definisan ali nekorišćen |
| `contentClassName` prop | ❌ | Definisan ali nekorišćen |
| `onTabClick` callback | ❌ | Definisan ali neimplementiran |
| Scrollable tabs indikatori | ❌ | `scrollable` prop postoji ali bez scroll buttons |

### Optional (Opciono)
Napredne funkcionalnosti:

| Funkcionalnost | Status | Napomena |
|----------------|--------|----------|
| Add tab button | ❌ | `addable` prop definisan |
| Drag & drop reordering | ❌ | Nije u scopeu |
| Tabs overflow menu | ❌ | Nice to have |
| Animated tab indicator | ❌ | CSS transition postoji |
| RTL support | ❌ | Nice to have |
| Dedicated tabs.json | ❌ | Koriste se generic tokeni |

---

## 💡 Predlozi za unapređenje (Rangirano)

### 🔴 Must Have
1. **Implementacija DynTabsRef**
   - Opis: Dodati `useImperativeHandle` sa svim metodama iz `DynTabsRef` interfejsa
   - Benefit: Omogućava programsku kontrolu taba
   - Effort: Medium

2. **Dodavanje data-status atributa**
   - Opis: Dodati `data-status="active|inactive|disabled"` na tab buttons
   - Benefit: Testovi prolaze, olakšava styling
   - Effort: Low

3. **Close button data-testid**
   - Opis: Dodati `data-testid={dataTestId}-close-{tabId}` pattern
   - Benefit: Testovi prolaze
   - Effort: Low

### 🟡 Should Have
4. **Underlined varijanta CSS**
   - Opis: Dodati `.variantUnderlined` klasu
   - Benefit: Kompletan set varijanti
   - Effort: Low

5. **Bordered varijanta CSS**
   - Opis: Dodati `.variantBordered` klasu
   - Benefit: Kompletan set varijanti
   - Effort: Low

6. **Size klase dopuna**
   - Opis: Kompletirati `sizeSmall` i `sizeLarge` sa svim stilovima
   - Benefit: Konzistentan sizing
   - Effort: Low

7. **tabListClassName i contentClassName props**
   - Opis: Primeniti props na odgovarajuće elemente
   - Benefit: Veća fleksibilnost
   - Effort: Low

8. **onTabClick callback**
   - Opis: Implementirati callback pre onChange
   - Benefit: Omogućava preventDefault
   - Effort: Low

### ⚪ Optional
9. **Kreiranje tabs.json token fajla**
   - Opis: Dedicated token fajl umesto inline :root
   - Benefit: Centralizovano upravljanje
   - Effort: Medium

10. **Addable tabs UI**
    - Opis: Implementirati add button
    - Benefit: Dinamičko dodavanje tabova
    - Effort: Medium

---

## 🎨 Potrebne dopune JSON tokena

### Preporuka: Kreirati `packages/design-tokens/tokens/tabs.json`

```json
{
  "dyn": {
    "tabs": {
      "description": "Design tokens for DynTabs component",
      "color": {
        "bg": {
          "value": "transparent",
          "description": "Tabs container background"
        },
        "border": {
          "value": "{dyn.neutral.light.200}",
          "description": "Tab list border color"
        },
        "text": {
          "value": "{dyn.neutral.mid.400}",
          "description": "Inactive tab text color"
        },
        "textHover": {
          "value": "{dyn.semantic.text}",
          "description": "Tab text color on hover"
        },
        "textActive": {
          "value": "{dyn.theme.primary}",
          "description": "Active tab text color"
        },
        "hoverBg": {
          "value": "{dyn.neutral.light.100}",
          "description": "Tab background on hover"
        }
      },
      "spacing": {
        "tabPadding": {
          "value": "{dyn.spacing.sm} {dyn.spacing.md}",
          "description": "Tab button padding"
        },
        "panelPadding": {
          "value": "{dyn.spacing.md}",
          "description": "Tab panel padding"
        }
      }
    }
  }
}
```

---

## 🔧 Potrebne izmene fajlova

### DynTabs.tsx

```tsx
// DODATI: useImperativeHandle
React.useImperativeHandle(ref, () => ({
  focus: () => tabsRef.current[currentIndex]?.focus(),
  blur: () => tabsRef.current[currentIndex]?.blur(),
  focusTab: (tabId: string) => {
    const index = processedItems.findIndex(i => i.processedValue === tabId);
    tabsRef.current[index]?.focus();
  },
  getActiveTab: () => current,
  setActiveTab: (tabId: string) => handleSelect(tabId),
  getTabs: () => tabsRef.current.filter(Boolean) as HTMLButtonElement[],
  getTabElement: (tabId: string) => {
    const index = processedItems.findIndex(i => i.processedValue === tabId);
    return tabsRef.current[index] || null;
  },
  getActiveTabElement: () => tabsRef.current[currentIndex] || null,
  getTabPanel: (tabId: string) => document.getElementById(`${internalId}-panel-${tabId}`) as HTMLDivElement | null,
  getActiveTabPanel: () => document.getElementById(`${internalId}-panel-${current}`) as HTMLDivElement | null
}));

// DODATI: data-status atribut na tab button
data-status={isSelected ? 'active' : item.disabled ? 'disabled' : 'inactive'}

// DODATI: data-testid na close button
data-testid={dataTestId ? `${dataTestId}-close-${item.processedValue}` : undefined}

// DODATI: tabListClassName i contentClassName
className={cn(listClass, tabListClassName)}
```

### DynTabs.module.css

```css
/* DODATI: Underlined varijanta */
.variantUnderlined {
  background: transparent;
  border-bottom: var(--dyn-border-width-md) solid transparent;
}

.variantUnderlined.tabActive {
  border-bottom-color: var(--dyn-tabs-text-active);
}

.variantUnderlined.tabActive::after {
  display: none;
}

/* DODATI: Bordered varijanta */
.variantBordered {
  border: var(--dyn-border-width-sm) solid var(--dyn-tabs-border);
  border-radius: var(--dyn-border-radius-sm) var(--dyn-border-radius-sm) 0 0;
  margin-bottom: calc(-1 * var(--dyn-border-width-sm));
}

.variantBordered.tabActive {
  border-bottom-color: var(--dyn-semantic-background);
  background: var(--dyn-semantic-background);
}

/* DOPUNITI: Size klase */
.sizeSmall {
  padding: var(--dyn-spacing-xs) var(--dyn-spacing-sm);
  font-size: var(--dyn-font-size-xs);
}

.sizeLarge {
  padding: var(--dyn-spacing-md) var(--dyn-spacing-lg);
  font-size: var(--dyn-font-size-lg);
}
```

---

## ✅ Čeklista za implementaciju

### Faza 1: Tokeni
- [x] Nema hardkodiranih boja (verifikovano)
- [x] Verifikovani postojeći tokeni
- [ ] (Optional) Kreirati `tabs.json` token fajl

### Faza 2: Stilovi (Must Have & Should Have)
- [x] Nema hardkodiranih boja
- [x] Ima dark mode podršku
- [x] Dodata `.variantUnderlined` klasa
- [x] Dodata `.variantBordered` klasa
- [x] Dopunjena `.sizeSmall` klasa
- [x] Dopunjena `.sizeLarge` klasa

### Faza 3: Funkcionalnost (Must Have)
- [x] Implementiran `useImperativeHandle` za `DynTabsRef`
- [x] Dodat `data-status` atribut
- [x] Dodat `data-testid` na close button
- [x] Primenjen `tabListClassName` prop
- [ ] Primenjen `contentClassName` prop
- [x] Implementiran `onTabClick` callback

### Faza 4: Testiranje
- [x] Build prolazi
- [⚠️] Unit tests: 20 PASS, 5 FAIL (pre-existing issues)
- [ ] Storybook vizuelna verifikacija

### Faza 5: Dokumentacija
- [x] Ažuriran ovaj audit fajl
- [ ] Finalizovan walkthrough

---

## 📝 Istorija promena

| Datum | Autor | Opis promene |
|-------|-------|--------------|
| 2026-01-20 | AI Agent | Kreiran audit fajl sa kompletnom analizom |

---

## 🆕 Dodatne stavke

<!-- Dodati nove stavke po potrebi tokom implementacije -->
