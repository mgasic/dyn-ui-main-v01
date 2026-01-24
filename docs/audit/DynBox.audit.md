# DynBox - Audit Report

**Datum kreiranja**: 2026-01-23  
**Poslednje ažuriranje**: 2026-01-23  
**Status**: 🟡 U toku

---

## 📋 Sažetak

`DynBox` trenutno implementira sopstveni "CSS-in-JS" sistem unutar React koda, ručno mapirajući propove na CSS varijable i generišući stilove kroz kompleksnu logiku (`toTokenVar`, `getStyleClass`). Ovo direktno krši pravila o separaciji stilova, otežava održavanje i performanse, i zaobilazi standardni token sistem definisan u `DESIGN_TOKEN_SYSTEM.md`.

---

## 🔍 Analiza trenutnog stanja

### Stilovi (CSS)
| Problem | Opis | Prioritet |
|---------|------|-----------|
| **Hardcoded Defaults** | TSX fajl sadrži mapu (`toTokenVar`) sa hardkodovanim vrednostima (npr. 'xs': '0.25rem') umesto referenciranja tokene. | P0 |
| **Bypass Token System** | Stilovi se generišu inline kroz `styleVars` umesto korišćenja klasa koje konzumiraju `var(--dyn-*)`. | P0 |
| **Nepotrebna Kompleksnost** | Dinamičko generisanje imena klasa (`getStyleClass`) je krhko i otežava statičku analizu. | P1 |

### Funkcionalnost (TSX)
| Nedostatak | Opis | Prioritet |
|------------|------|-----------|
| **Manual Prop Filtering** | `FILTERED_PROPS` lista je manuelna i podložna greškama. | P2 |
| **Logic in View** | Previše logike za stilizovanje unutar same komponente. | P1 |

---

## 📊 Razlike: Trenutno vs Dokumentacija

### Prema DESIGN_TOKEN_SYSTEM.md
| Zahtev iz dokumentacije | Trenutno stanje | Usklađeno? |
|-------------------------|-----------------|------------|
| **Korišćenje `var(--dyn-*)` za SVE** | Koristi hardkodovane rem vrednosti kao fallback | ❌ |
| **Separacija Stilova** | Stilovi su duboko spregnuti sa TSX logikom | ❌ |
| **Token Hijerarhija** | Ne koristi definisanu strukturu foldera i CSS modula na standardan način | ❌ |

---

## 💡 Predlozi za unapređenje

### 1. Striktno korišćenje Tokena
Umesto hardkodovane mape u TSX-u:
```typescript
// LOŠE
const map = { 'xs': '0.25rem' };

// DOBRO
// Koristiti CSS klase koje mapiraju tokene
```

### 2. CSS Modules umesto Inline Styles
Refaktorisati komponentu da koristi predefinisane klase za varijante.
Za dinamičke vrednosti (npr. custom width), koristiti style varijablu, ali za sistemske vrednosti (spacing, color) koristiti klase.

### 3. Implementacija `clsx` / `classnames`
Koristiti standardne biblioteke za uslovno spajanje klasa umesto custom `getStyleClass` funkcije.

---

## 🔧 Potrebne izmene fajlova

### DynBox.module.css
Definisati klase za svaku varijantu tokena:
```css
/* Padding Tokens */
.p-xs { padding: var(--dyn-spacing-xs); }
.p-sm { padding: var(--dyn-spacing-sm); }
/* ... */

/* Color Tokens */
.bg-primary { background-color: var(--dyn-theme-primary); }
```

### DynBox.tsx
Izbaciti kompletnu `toTokenVar` logiku i `FILTERED_PROPS`.
Mapirati propove direktno na klase:

```tsx
const classes = cn(
  styles.root,
  // Padding
  p && styles[`p-${p}`],
  // ...
);

return <Component className={classes} {...rest} />;
```

---

## ✅ Čeklista za implementaciju

### Faza 1: Analiza & Audit
- [x] Identifikovati probleme (Ovaj fajl)

### Faza 2: Refactor Design
- [ ] Kreirati mapiranje propova na CSS modul klase
- [ ] Definisati sve potrebne klase u CSS modulu koristeći `var(--dyn-*)`

### Faza 3: Implementation
- [ ] Obrisati `toTokenVar` i `styleVars` logiku
- [ ] Implementirati čist CSS Modules pristup
- [ ] Verifikovati da nema hardkodovanih vrednosti

### Faza 4: Verifikacija
- [ ] Build check (`pnpm build`)
- [ ] Storybook vizuelna verifikacija
