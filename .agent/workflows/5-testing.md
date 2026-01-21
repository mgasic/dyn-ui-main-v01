---
description: Faza 5 - Testiranje i vizuelna verifikacija
---

# Phase 5: Testing

Ova faza verifikuje sve izmene pre isporuke.

---

## Koraci

### 1. Token Validation

// turbo
```powershell
cd e:\PROGRAMING\AI_Projects\dyn-ui-main-v02
pnpm --filter @dyn-ui/design-tokens tokens:validate
```

- [ ] PASS - Svi tokeni validni
- [ ] FAIL - Ispravi greške i ponovi

### 2. Token Generation

// turbo
```powershell
pnpm --filter @dyn-ui/design-tokens build
```

- [ ] PASS - Tokeni generisani
- [ ] FAIL - Ispravi greške i ponovi

### 3. Build Check

// turbo
```powershell
pnpm --filter @dyn-ui/react build
```

- [ ] PASS - Build uspešan
- [ ] FAIL - Ispravi greške i ponovi

### 4. Type Check

// turbo
```powershell
pnpm --filter @dyn-ui/react typecheck
```

- [ ] PASS - Nema type errors
- [ ] FAIL - Ispravi greške i ponovi

### 5. Lint Check

// turbo
```powershell
pnpm --filter @dyn-ui/react lint
```

- [ ] PASS - Nema grešaka (warnings OK)
- [ ] FAIL - Ispravi kritične greške

### 6. Unit Tests

// turbo
```powershell
pnpm --filter @dyn-ui/react test -- --grep="[ComponentName]"
```

- [ ] PASS - Svi testovi prolaze
- [ ] FAIL - Ispravi test failures

### 7. Visual Verification (Storybook)

// turbo
```powershell
pnpm storybook
```

Koristi `browser_subagent` za vizuelnu verifikaciju:

**Checklist:**
- [ ] Light mode - izgleda ispravno
- [ ] Dark mode - izgleda ispravno
- [ ] Sve size varijante
- [ ] Sve color varijante
- [ ] Hover state
- [ ] Active state
- [ ] Focus state
- [ ] Disabled state
- [ ] Responsive (ako je relevantno)

---

## Ako bilo koji test FAIL

1. Identifikuj problem
2. Vrati se na `/4-implementation`
3. Ispravi problem
4. Ponovi `/5-testing`

**LOOP dok svi testovi ne prođu!**

---

## Output

Kad svi testovi prođu:

| Test | Status |
|------|--------|
| Token Validation | ✅ PASS |
| Token Generation | ✅ PASS |
| Build | ✅ PASS |
| TypeCheck | ✅ PASS |
| Lint | ✅ PASS |
| Unit Tests | ✅ PASS |
| Storybook Visual | ✅ PASS |

**Nastavi na:** `/6-audit-log`
