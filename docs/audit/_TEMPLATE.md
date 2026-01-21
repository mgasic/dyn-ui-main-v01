# [ComponentName] - Audit Report

**Datum kreiranja**: [YYYY-MM-DD]  
**Poslednje ažuriranje**: [YYYY-MM-DD]  
**Status**: 🔴 Nije započeto | 🟡 U toku | 🟢 Završeno

---

## 📋 Sažetak

[Kratak opis trenutnog stanja komponente i glavnih problema]

---

## 🔍 Analiza trenutnog stanja

### Stilovi (CSS)
| Problem | Opis | Prioritet |
|---------|------|-----------|
| [tip problema] | [detaljan opis] | P0/P1/P2 |

### Funkcionalnost (TSX)
| Nedostatak | Opis | Prioritet |
|------------|------|-----------|
| [funkcionalnost] | [detaljan opis] | P0/P1/P2 |

### Tipovi (types.ts)
| Problem | Opis | Prioritet |
|---------|------|-----------|
| [tip problema] | [detaljan opis] | P0/P1/P2 |

---

## 📊 Razlike: Trenutno vs Dokumentacija

### Prema DESIGN_TOKEN_SYSTEM.md
| Zahtev iz dokumentacije | Trenutno stanje | Usklađeno? |
|-------------------------|-----------------|------------|
| 3-nivoi fallback | [da/ne/delimično] | ✅/❌/🟡 |
| Dark mode podrška | [da/ne/delimično] | ✅/❌/🟡 |
| Bez hardkodiranih vrednosti | [da/ne/delimično] | ✅/❌/🟡 |

### Prema COMPONENT_STRUCTURE.md
| Zahtev | Trenutno stanje | Usklađeno? |
|--------|-----------------|------------|
| forwardRef | [da/ne] | ✅/❌ |
| aria atributi | [da/ne] | ✅/❌ |
| CSS Modules | [da/ne] | ✅/❌ |

---

## 💡 Predlozi za unapređenje

### Stilovi
1. **[Predlog 1]**
   - Opis: [detaljan opis]
   - Benefit: [zašto je ovo važno]
   - Effort: [Low/Medium/High]

2. **[Predlog 2]**
   - Opis: [detaljan opis]
   - Benefit: [zašto je ovo važno]
   - Effort: [Low/Medium/High]

### Funkcionalnost
1. **[Predlog 1]**
   - Opis: [detaljan opis]
   - Benefit: [zašto je ovo važno]
   - Effort: [Low/Medium/High]

---

## 🎨 Potrebne dopune JSON tokena

### Novi tokeni za dodavanje

```json
// packages/design-tokens/tokens/[component].json
{
  "dyn": {
    "[component]": {
      "[property]": {
        "value": "{dyn.[category].[value]}",
        "type": "[color|dimension|...]"
      }
    }
  }
}
```

### Lista tokena
| Token | Vrednost | Svrha |
|-------|----------|-------|
| `--dyn-[component]-[prop]` | `{dyn.x.y}` | [opis] |

---

## 🔧 Potrebne izmene fajlova

### [ComponentName].module.css
```css
/* BEFORE */
.example { property: hardcoded-value; }

/* AFTER */
.example { property: var(--dyn-token); }
```

### [ComponentName].tsx
```tsx
// Opisati potrebne izmene
```

### [ComponentName].types.ts
```typescript
// Opisati potrebne izmene
```

---

## ✅ Čeklista za implementaciju

### Faza 1: Tokeni
- [ ] Dodati nedostajuće tokene u JSON
- [ ] Regenerisati tokene (`pnpm --filter @dyn-ui/design-tokens build`)
- [ ] Verifikovati generisane CSS varijable

### Faza 2: Stilovi
- [ ] Zameniti hardkodirane boje tokenima
- [ ] Zameniti hardkodirane spacing vrednosti
- [ ] Implementirati 3-nivoi fallback
- [ ] Dodati dark mode podršku
- [ ] Konvertovati u camelCase klase

### Faza 3: Funkcionalnost
- [ ] [Specifična funkcionalnost 1]
- [ ] [Specifična funkcionalnost 2]
- [ ] Dodati forwardRef (ako nedostaje)
- [ ] Dodati aria atribute

### Faza 4: Tipovi
- [ ] Ažurirati type definicije
- [ ] Dodati JSDoc komentare

### Faza 5: Testiranje
- [ ] Build prolazi
- [ ] TypeCheck prolazi
- [ ] Unit tests prolaze
- [ ] Storybook vizuelna verifikacija - Light mode
- [ ] Storybook vizuelna verifikacija - Dark mode

### Faza 6: Dokumentacija
- [ ] Ažuriran ovaj audit fajl
- [ ] Ažuriran component-compliance-checklist.md

---

## 📝 Istorija promena

| Datum | Autor | Opis promene |
|-------|-------|--------------|
| [YYYY-MM-DD] | [agent/user] | Kreiran audit fajl |
| [YYYY-MM-DD] | [agent/user] | [opis promene] |

---

## 🆕 Dodatne stavke (dodati po potrebi)

<!-- 
Ovde dodaj nove stavke ako se tokom kasnijeg rada otkriju dodatni problemi.
Format:
### [Datum] - [Kratak opis]
- Problem: [opis]
- Rešenje: [predlog]
- Status: ⬜ Nije implementirano | ✅ Implementirano
-->
