---
description: Faza 2 - Provera koda i usklađenosti sa token sistemom
---

# Phase 2: Code Audit

Ova faza proverava da li kod komponente prati dokumentaciju i token sistem.

---

## Koraci

### 1. Audit CSS fajla

// turbo
```powershell
# Pronađi hardkodirane hex boje
Select-String -Path "[ComponentName].module.css" -Pattern "#[0-9a-fA-F]{3,8}"

# Pronađi hardkodirane px vrednosti
Select-String -Path "[ComponentName].module.css" -Pattern "\d+px"

# Pronađi rgb/rgba
Select-String -Path "[ComponentName].module.css" -Pattern "rgb\(|rgba\("
```

**Checklist za CSS:**
- [ ] Nema hardkodiranih hex boja
- [ ] Nema hardkodiranih px za spacing (osim u calc, transform)
- [ ] Koristi 3-nivoi fallback pattern
- [ ] Ima component-scoped tokene na `:root`
- [ ] Podržava dark mode `[data-theme="dark"]`
- [ ] Koristi camelCase za klase

### 2. Audit TSX fajla

**Checklist za TSX:**
- [ ] Koristi `forwardRef` za ref prosleđivanje
- [ ] Props tipizovani iz `.types.ts`
- [ ] `styles.className` sintaksa (CSS Modules)
- [ ] Nema inline styles sa hardkodiranim vrednostima
- [ ] Ima aria atribute za accessibility
- [ ] Pravilno rukovodi event handlers

### 3. Audit Types fajla

**Checklist za types.ts:**
- [ ] Svi props su dokumentovani JSDoc komentarima
- [ ] Koristi proper TypeScript tipove
- [ ] Exportovan je glavni interface/type

### 4. Proveri token reference

// turbo
```powershell
# Lista svih var() referenci u CSS-u
Select-String -Path "[ComponentName].module.css" -Pattern "var\(--dyn-[^)]+\)" -AllMatches
```

Za svaki token proveri:
- [ ] Token postoji u `packages/design-tokens/styles/generated/`
- [ ] Token prati naming konvenciju `--dyn-[category]-[property]`

### 5. Proveri zavisnosti

Pronađi komponente koje koriste ovu komponentu:
// turbo
```powershell
Select-String -Path "e:\PROGRAMING\AI_Projects\dyn-ui-main-v02\packages\dyn-ui-react\src" -Pattern "import.*[ComponentName]" -Recurse
```

---

## Output

Na kraju ove faze imaš:
1. Lista svih hardkodiranih vrednosti
2. Lista nedostajućih tokena
3. Lista problema sa strukturom
4. Lista zavisnih komponenti

**Ažuriraj audit fajl** (`docs/audit/[ComponentName].audit.md`):
- Popuni sekciju "Analiza trenutnog stanja"
- Popuni sekciju "Razlike: Trenutno vs Dokumentacija"

**Nastavi na:** `/3-proposal`
