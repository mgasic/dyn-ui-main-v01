---
description: Workflow za osiguranje usklađenosti komponenti sa dokumentacijom iz docs foldera
---

# Component Documentation Compliance Workflow

Master workflow koji orkestira sve faze za potpunu usklađenost komponente sa dokumentacijom i design token sistemom.

---

## 🎯 CILJ

Osigurati da svaka komponenta:
1. Koristi ISKLJUČIVO design tokene iz `design-tokens` paketa
2. Prati sve smernice iz `docs/` foldera
3. Prolazi sve verifikacione korake pre isporuke

---

## 📋 PREREQUISITES

Pre pokretanja ovog workflow-a:
1. Pročitaj skill: `.agent/skills/component-compliance/SKILL.md`
2. Identifikuj komponentu za obradu

---

## 🔄 WORKFLOW FAZE

Izvršavaj faze SEKVENCIJALNO. Ne prelazi na sledeću dok trenutna nije kompletna.

### Faza 1: Analysis
```
/1-analysis
```
- Učitaj dokumentaciju
- Identifikuj komponentu i fajlove
- Proveri organizaciju

### Faza 2: Code Audit
```
/2-code-audit
```
- Skeniraj za hardkodirane vrednosti
- Proveri token usklađenost
- Identifikuj nedostatke

### Faza 3: Proposal
```
/3-proposal
```
- Predloži nove tokene za JSON
- Predloži CSS/TSX izmene
- Identifikuj uticaj na zavisne komponente

### Faza 4: Implementation
```
/4-implementation
```
- Ažuriraj JSON token fajlove
- Regeneriši tokene
- Ažuriraj CSS/TSX/Types

### Faza 5: Testing
```
/5-testing
```
- Token validation
- Build & TypeCheck
- Unit tests
- Storybook vizuelna verifikacija

### Faza 6: Audit Log
```
/6-audit-log
```
- Dokumentuj sve promene
- Ažuriraj checklist

---

## 🔁 ITERATION LOOP

```
┌─────────────────────────────────────────────────┐
│                                                 │
│   START → Analysis → Code Audit → Proposal      │
│              ↓                                  │
│         Implementation → Testing ─┬─→ Audit    │
│              ↑                    │     ↓      │
│              └──── FAIL ──────────┘   DONE     │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Ako Testing FAIL**: Vrati se na Implementation i ispravi
**Loop dok**: Svi testovi ne prođu

---

## ⚡ QUICK COMMANDS

```powershell
# Token regeneration
pnpm --filter @dyn-ui/design-tokens build

# Build check
pnpm --filter @dyn-ui/react build

# Type check
pnpm --filter @dyn-ui/react typecheck

# Tests
pnpm --filter @dyn-ui/react test

# Storybook
pnpm storybook
```

---

## 📚 DOCUMENTATION PRIORITY

1. `docs/DESIGN_TOKEN_SYSTEM.md` - Najviši prioritet
2. `docs/COMPLETE_KNOWLEDGE_BASE.md` - Kompletna referenca
3. `docs/ARCHITECTURE/*` - Tehnički detalji
4. `.agent/skills/component-compliance/SKILL.md` - Golden rules

---

## 🚫 STOP CONDITIONS

ZAUSTAVI se i obavesti korisnika ako:
- Postoji fundamentalni problem sa token sistemom
- Potrebna je odluka o dizajnu
- Breaking change utiče na mnoge komponente
