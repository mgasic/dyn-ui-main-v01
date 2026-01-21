---
description: Faza 1 - Analiza komponente i dokumentacije pre modifikacije
---

# Phase 1: Analysis

Ova faza se izvršava PRVA pre bilo kakve modifikacije komponente.

---

## Koraci

### 1. Učitaj obaveznu dokumentaciju
// turbo
Koristi `view_file` tool za učitavanje:
```
docs/DESIGN_TOKEN_SYSTEM.md
docs/COMPLETE_KNOWLEDGE_BASE.md
docs/ARCHITECTURE/01_ARCHITECTURE_TOKEN_HIERARCHY.md
docs/ARCHITECTURE/03_ARCHITECTURE_NAMING_CONVENTIONS.md
```

### 2. Identifikuj komponentu
Odredi:
- Naziv komponente (npr. `DynButton`)
- Kategoriju (Atom, Molecule, Organism)
- Sve fajlove komponente

### 3. Lociraj sve fajlove komponente
// turbo
```powershell
# Pronađi sve fajlove za komponentu
Get-ChildItem -Path "e:\PROGRAMING\AI_Projects\dyn-ui-main-v02\packages\dyn-ui-react\src\components\[ComponentName]" -Recurse
```

Očekivana struktura:
- `[ComponentName].tsx`
- `[ComponentName].types.ts`
- `[ComponentName].module.css`
- `[ComponentName].stories.tsx`
- `[ComponentName].test.tsx`
- `index.ts`

### 4. Proveri JSON token fajlove
// turbo
```powershell
# Proveri da li postoji JSON za ovu komponentu
Get-ChildItem -Path "e:\PROGRAMING\AI_Projects\dyn-ui-main-v02\packages\design-tokens\tokens" -Recurse -Filter "*.json" | Select-String -Pattern "[componentname]"
```

### 5. Proveri organizaciju fajlova
Prema `docs/ARCHITECTURE/04_ARCHITECTURE_FILE_ORGANIZATION.md`:
- [ ] Komponenta je u `packages/dyn-ui-react/src/components/[Name]/`
- [ ] Token JSON je u `packages/design-tokens/tokens/`
- [ ] Stories je u folderu komponente ILI u `stories/`

### 6. Dokumentuj nalaze
Zapamti:
- Koji fajlovi postoje
- Koji fajlovi nedostaju
- Da li treba premestiti neke fajlove
- Da li postoje JSON tokeni za komponentu

### 7. Kreiraj ili otvori audit fajl
// turbo
```powershell
# Proveri da li audit fajl postoji
$auditFile = "e:\PROGRAMING\AI_Projects\dyn-ui-main-v02\docs\audit\[ComponentName].audit.md"
if (!(Test-Path $auditFile)) {
    Copy-Item "e:\PROGRAMING\AI_Projects\dyn-ui-main-v02\docs\audit\_TEMPLATE.md" $auditFile
}
```

Popuni početne sekcije audit fajla:
- Datum kreiranja
- Sažetak trenutnog stanja
- Analiza fajlova komponente

---

## Output

Na kraju ove faze imaš:
1. Lista svih fajlova komponente
2. Status organizacije fajlova
3. Status token JSON fajlova
4. Lista dokumentacije koja je relevantna
5. **Kreiran/ažuriran audit fajl**

**Nastavi na:** `/2-code-audit`
