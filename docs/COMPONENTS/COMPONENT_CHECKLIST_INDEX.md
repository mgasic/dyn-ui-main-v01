# DYN UI - COMPONENT CHECKLIST INDEX

**Purpose**: Master index of all components with verification checklists  
**Format**: Organized by priority and type  
**Last Updated**: December 24, 2025  

---

## 🚀 QUICK NAVIGATION

### P0 - CRITICAL (Week 1-2) - 3 Components
1. **DynFlex** - Layout with scope isolation
2. **DynBadge** - Token naming standardization
3. **DynModal** - Hard-coded value replacement

### P1 - IMPORTANT (Week 3-4) - 5 Components
1. **DynButton** - Audit & potential refactor
2. **DynInput** - Audit & potential refactor
3. **DynCard** - NEW - Container component
4. **DynTooltip** - NEW - Overlay component
5. **DynDropdown** - NEW - Select/dropdown component

### P2 - NICE-TO-HAVE (Week 5) - 4 Components
1. **DynTab** - NEW - Tabbed interface
2. **DynPagination** - NEW - Page navigation
3. **DynAlert** - NEW - Status messages
4. **DynSpinner** - NEW - Loading indicator

---

## 📋 P0 - CRITICAL COMPONENTS

### ✅ Component Tracking Template

Each component below shows:
- **Status Badge** - 🔴 Needs work, 🟡 In progress, 🟢 Complete
- **Quick Link** - Direct to specification
- **Token Count** - How many tokens need definition
- **Verification Prompt** - AI verification command
- **Checklist** - Implementation checklist

---

## 1️⃣ DynFlex (P0)

**Status**: 🔴 Needs refactoring  
**Spec**: [01_DynFlex.md](P0_CRITICAL/01_DynFlex.md)  
**Problem**: Global tokens → component scope needed  
**Effort**: 3 hours  

### Quick Checklist
```
□ Move tokens from :root global to .module.css
□ Rename all --flex-* to --dyn-flex-*
□ Add 3-level fallback pattern
□ Add dark mode section
□ Add responsive section
□ Verify no style leakage
□ Test 80%+ coverage
```

### Verification Command
```bash
AI: Review docs/COMPONENTS/P0_CRITICAL/01_DynFlex.md
Then verify: packages/dyn-ui-react/src/components/DynFlex/DynFlex.module.css

Check:
1. All tokens use --dyn-flex- prefix
2. No global :root pollution
3. Each token has 3-level fallback
4. Variants override tokens only
5. Dark mode section present
6. Responsive section present
```

**Deadline**: Week 1 (by Dec 31)  
**Files**: See spec file

---

## 2️⃣ DynBadge (P0)

**Status**: 🔴 Needs token standardization  
**Spec**: [02_DynBadge.md](P0_CRITICAL/02_DynBadge.md)  
**Problem**: Wrong token names (--badge-accent, not --dyn-badge-bg)  
**Effort**: 4 hours  

### Quick Checklist
```
□ Rename --badge-* to --dyn-badge-*
□ Map old names to new:
  --badge-accent → --dyn-badge-bg
  --badge-bg-color → --dyn-badge-bg
  --badge-text-color → --dyn-badge-color
□ Add missing tokens (border, shadow, transition)
□ Add 3-level fallback
□ Add dark mode colors
□ Verify contrast 4.5:1
□ Test all variants
```

### Token Mapping
| Old | New | Value |
|-----|-----|-------|
| --badge-accent | --dyn-badge-bg | primary color |
| --badge-bg-color | --dyn-badge-bg | (same) |
| --badge-text-color | --dyn-badge-color | white |
| --badge-border | --dyn-badge-border | none |
| --badge-padding | --dyn-badge-padding-y/x | split y/x |

### Verification Command
```bash
AI: Review docs/COMPONENTS/P0_CRITICAL/02_DynBadge.md
Then verify: packages/dyn-ui-react/src/components/DynBadge/DynBadge.module.css

Check:
1. NO tokens with --badge-* (all renamed to --dyn-badge-*)
2. Verify token mapping correct
3. All have 3-level fallback
4. Contrast ratio 4.5:1 minimum
5. Dark mode colors updated
6. All 6 variants render correctly
```

**Deadline**: Week 1 (by Jan 2)  

---

## 3️⃣ DynModal (P0)

**Status**: 🔴 Hard-coded values → tokens needed  
**Spec**: [03_DynModal.md](P0_CRITICAL/03_DynModal.md)  
**Problem**: Hard-coded pixels (500px, 90vh, rgba(0,0,0,0.5))  
**Effort**: 4 hours  
**Type**: NEW component

### Quick Checklist
```
□ Create DynModal component
□ Replace all hard-coded values:
  500px → --dyn-modal-max-width
  90vh → --dyn-modal-max-height
  rgba(0,0,0,0.5) → --dyn-modal-overlay-bg
  999 → --dyn-z-index-modal
□ Add header/body/footer sections
□ Add close button
□ Add ESC key handler
□ Add focus trap
□ Add dark mode
□ Add responsive
□ Test 80%+ coverage
```

### Verification Command
```bash
AI: Review docs/COMPONENTS/P0_CRITICAL/03_DynModal.md
Then verify: packages/dyn-ui-react/src/components/DynModal/DynModal.module.css

Check:
1. ZERO hard-coded pixel values (except fallback)
2. All tokens use --dyn-modal-*
3. Z-index tokens correct (modal 1400, backdrop 1300)
4. Overlay color uses token
5. All sections styled (header, body, footer)
6. Animations smooth
7. ESC key closes modal
8. Focus trap working
```

**Deadline**: Week 2 (by Jan 3)  

---

## 📋 P1 - IMPORTANT COMPONENTS

### 4️⃣ DynButton (P1)

**Status**: 🟡 Likely exists, needs audit  
**Spec**: [P1_IMPORTANT/01_DynButton.md](P1_IMPORTANT/01_DynButton.md)  
**Effort**: 3 hours (audit) or 5 hours (refactor)  

### Audit Checklist
```
□ Review existing DynButton.module.css
□ Check all tokens start with --dyn-button-
□ Check 3-level fallback on each
□ Check variants override tokens only
□ Check dark mode present
□ Check all states covered (hover, active, focus, disabled)
□ Check all variants present (primary, secondary, danger)
□ Verify 80%+ test coverage
```

### Verification Command
```bash
AI: Audit packages/dyn-ui-react/src/components/DynButton/

Review against spec: docs/COMPONENTS/P1_IMPORTANT/01_DynButton.md

Report:
1. Which tokens are missing/wrong
2. Which variants are working/broken
3. Which states need testing
4. Refactor effort (hours)
```

**Deadline**: Week 3 (by Jan 6)  

---

### 5️⃣ DynCard (NEW, P1)

**Status**: 🔴 MISSING - Create new  
**Spec**: [NEW_COMPONENTS/01_DynCard.md](NEW_COMPONENTS/01_DynCard.md)  
**Effort**: 2 hours  
**Type**: Container/Layout

### Quick Checklist
```
□ Create compound component
□ Implement Card.Header, Card.Body, Card.Footer
□ Define all --dyn-card-* tokens
□ Add variants (elevated, outlined, flat)
□ Add sizes (small, medium, large)
□ Add hover effects
□ Add dark mode
□ Add responsive
□ Write stories (all variants + sizes)
□ Test 80%+ coverage
```

### Verification Command
```bash
AI: Create DynCard per spec: docs/COMPONENTS/NEW_COMPONENTS/01_DynCard.md

Implement:
1. Compound component pattern (Card, Card.Header, Card.Body, Card.Footer)
2. All --dyn-card-* tokens
3. Variant classes (elevated, outlined, flat)
4. Dark mode support
5. Full test coverage

Verify in PR:
1. All variants render
2. All sizes work
3. Dark mode correct
4. 80%+ coverage
```

**Deadline**: Week 3 (by Jan 7)  

---

### 6️⃣ DynTooltip (NEW, P1)

**Status**: 🔴 MISSING - Create new  
**Spec**: [NEW_COMPONENTS/02_DynTooltip.md](NEW_COMPONENTS/02_DynTooltip.md)  
**Effort**: 2.5 hours  
**Type**: Overlay/Info

### Quick Checklist
```
□ Create Tooltip component
□ Define all --dyn-tooltip-* tokens
□ Implement positioning (top, bottom, left, right)
□ Auto-detect edge positioning
□ Add arrow pointer
□ Implement triggers (hover, focus, click)
□ Add keyboard support (ESC)
□ Add delay support
□ Add themes (dark, light, warning)
□ Use Portal for rendering
□ Add dark mode
□ Test 80%+ coverage
```

### Verification Command
```bash
AI: Create DynTooltip per spec: docs/COMPONENTS/NEW_COMPONENTS/02_DynTooltip.md

Implement:
1. Position calculation and auto-detection
2. Portal rendering
3. Arrow pointing correctly
4. All --dyn-tooltip-* tokens
5. Multiple triggers support
6. ESC key handler
7. Full ARIA support

Verify in PR:
1. All 4 positions work
2. Auto-position avoids edges
3. All triggers (hover, focus, click)
4. ESC closes
5. Arrow correct
6. 80%+ coverage
```

**Deadline**: Week 3 (by Jan 8)  

---

## 📊 STATUS TRACKING

### Progress Summary

| Component | Status | Week | Hours | PR Link |
|-----------|--------|------|-------|----------|
| DynFlex | 🔴 Pending | 1 | 3 | - |
| DynBadge | 🔴 Pending | 1 | 4 | - |
| DynModal | 🔴 Pending | 2 | 4 | - |
| DynButton | 🟡 Audit | 3 | 3-5 | - |
| DynInput | 🟡 Audit | 3 | 3-5 | - |
| DynCard | 🔴 Pending | 3 | 2 | - |
| DynTooltip | 🔴 Pending | 3 | 2.5 | - |
| DynDropdown | 🔴 Pending | 4 | 4 | - |
| DynTab | 🔴 Pending | 5 | 3 | - |
| DynAlert | 🔴 Pending | 5 | 2 | - |

---

## 🤖 FOR AI AGENTS

### How to Use This Index

1. **Pick a component** from above
2. **Read the spec** (link provided)
3. **Run verification** (command provided)
4. **Follow checklist** (tasks to complete)
5. **Create PR** with checklist items marked

### Example Workflow

```bash
# 1. Pick component
Component: DynFlex

# 2. Read spec
open docs/COMPONENTS/P0_CRITICAL/01_DynFlex.md

# 3. Review code
open packages/dyn-ui-react/src/components/DynFlex/DynFlex.module.css

# 4. Make changes per checklist
- Move tokens to .module.css
- Rename to --dyn-flex-*
- Add fallback
- Add dark mode
- Add responsive

# 5. Test
npm test DynFlex
npm run storybook

# 6. Verify
AI: Run verification command from spec

# 7. Commit & PR
git add .
git commit -m "refactor(DynFlex): 100% token compliance"
git push origin feat/dynflex-refactor
```

---

## 📞 REFERENCE

### All Component Specs

**P0 - CRITICAL**
- [01_DynFlex.md](P0_CRITICAL/01_DynFlex.md)
- [02_DynBadge.md](P0_CRITICAL/02_DynBadge.md)
- [03_DynModal.md](P0_CRITICAL/03_DynModal.md)

**P1 - IMPORTANT**  
- [01_DynButton.md](P1_IMPORTANT/01_DynButton.md)

**NEW COMPONENTS**
- [01_DynCard.md](NEW_COMPONENTS/01_DynCard.md)
- [02_DynTooltip.md](NEW_COMPONENTS/02_DynTooltip.md)

### Master Knowledge Base
- [COMPLETE_KNOWLEDGE_BASE.md](../00_MASTER_KNOWLEDGE_BASE.md)
- [Token System](../KB_01_TOKEN_SYSTEM.md)
- [Component Structure](../KB_02_COMPONENTS.md)
- [Naming Rules](../KB_03_NAMING.md)

---

**Last Updated**: December 24, 2025  
**Next Review**: After P0 completion (Week 2)
