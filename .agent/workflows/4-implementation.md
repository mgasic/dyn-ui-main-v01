---
description: Faza 4 - Implementacija svih predloženih izmena
---

# Phase 4: Implementation

Ova faza implementira sve predložene izmene iz Phase 3.

---

## Koraci

### 1. Ažuriraj JSON token fajlove (ako je potrebno)

**Lokacija:** `packages/design-tokens/tokens/`

// turbo
```powershell
# Otvori JSON fajl za editovanje
code "e:\PROGRAMING\AI_Projects\dyn-ui-main-v02\packages\design-tokens\tokens\[component].json"
```

Dodaj nove tokene prema predlogu iz Phase 3.

### 2. Regeneriši tokene

// turbo
```powershell
cd e:\PROGRAMING\AI_Projects\dyn-ui-main-v02
pnpm --filter @dyn-ui/design-tokens tokens:validate
pnpm --filter @dyn-ui/design-tokens build
```

Proveri output:
- [ ] Validacija prošla bez grešaka
- [ ] Novi tokeni generisani u `styles/generated/`

### 3. Ažuriraj CSS fajl

Koristi `replace_file_content` ili `multi_replace_file_content` za:
- Zamenu hardkodiranih vrednosti tokenima
- Dodavanje 3-nivoi fallback pattern
- Dodavanje dark mode selektora
- Refaktoring na camelCase klase

### 4. Ažuriraj TSX fajl (ako je potrebno)

- Ažuriraj className reference ako su klase promenjene
- Dodaj aria atribute
- Implementiraj forwardRef ako nedostaje

### 5. Ažuriraj Types fajl (ako je potrebno)

- Dodaj nove props
- Ažuriraj dokumentaciju

### 6. Proveri zavisne komponente

Za svaku zavisnu komponentu:
// turbo
```powershell
# Proveri da izmene ne kvare zavisne komponente
pnpm --filter @dyn-ui/react build
```

Ako ima problema, kaskadno ažuriraj zavisne komponente.

### 7. Organizuj fajlove (ako je potrebno)

Ako fajlovi nisu na pravom mestu:
// turbo
```powershell
# Premesti fajl na pravo mesto
Move-Item -Path "[source]" -Destination "[destination]"
```

Ažuriraj import putanje u svim fajlovima.

---

## Checkpoint

Pre prelaska na testiranje, proveri:
- [ ] Svi JSON tokeni dodati
- [ ] Tokeni regenerisani
- [ ] CSS ažuriran sa tokenima
- [ ] TSX ažuriran (ako potrebno)
- [ ] Types ažuriran (ako potrebno)
- [ ] Fajlovi na pravim lokacijama
- [ ] Import putanje ažurirane

**Ažuriraj audit fajl** (`docs/audit/[ComponentName].audit.md`):
- Označi implementirane stavke u čeklisti ✅
- Dodaj nove stavke ako su otkrivene tokom implementacije

**Nastavi na:** `/5-testing`
