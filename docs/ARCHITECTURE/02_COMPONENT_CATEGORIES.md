# COMPONENT CATEGORIES & MAPPING

**Purpose**: Map all 37 components to categories and templates  
**Audience**: AI Agent + Project Manager  
**Date**: December 20, 2025

---

## 📊 COMPLETE COMPONENT MAPPING (37 components)

### CATEGORY 1: BUTTON-LIKE (2 components)

| Component | Priority | Status | Time | Template |
|-----------|----------|--------|------|----------|
| DynButton | 1 | 95% | 2h | TOKENS/02 > Category 1 |
| DynIconButton | 1 | 90% | 2h | TOKENS/02 > Category 1 |

**Template Location**: docs/TOKENS/02_FOCUSED_TOKENS_IMPLEMENTATION.md > "CATEGORY 1: BUTTON-LIKE COMPONENTS"

**Key Tokens**:
- `--dyn-button-bg`
- `--dyn-button-color`
- `--dyn-button-padding-y`
- `--dyn-button-padding-x`
- `--dyn-button-font-size`
- `--dyn-button-border-radius`
- `--dyn-button-shadow`

**Variants**: primary, secondary, tertiary, outline, ghost

---

### CATEGORY 2: INPUT-LIKE (7 components)

| Component | Priority | Status | Time | Template |
|-----------|----------|--------|------|----------|
| DynInput | 1 | 70% | 3h | TOKENS/02 > Category 2 |
| DynTextArea | 1 | 65% | 3h | TOKENS/02 > Category 2 |
| DynSelect | 2 | 60% | 3h | TOKENS/02 > Category 2 |
| DynCheckbox | 2 | 75% | 2h | TOKENS/02 > Category 2 |
| DynRadio | 2 | 75% | 2h | TOKENS/02 > Category 2 |
| DynToggle | 2 | 80% | 2h | TOKENS/02 > Category 2 |
| DynSearchInput | 3 | 55% | 3h | TOKENS/02 > Category 2 |

**Template Location**: docs/TOKENS/02_FOCUSED_TOKENS_IMPLEMENTATION.md > "CATEGORY 2: INPUT-LIKE COMPONENTS"

**Key Tokens**:
- `--dyn-input-bg`
- `--dyn-input-color`
- `--dyn-input-border`
- `--dyn-input-border-focus`
- `--dyn-input-padding-y`
- `--dyn-input-padding-x`
- `--dyn-input-font-size`
- `--dyn-input-placeholder`

**Variants**: default, focused, disabled, error, success

---

### CATEGORY 3: LAYOUT (7 components)

| Component | Priority | Status | Time | Template |
|-----------|----------|--------|------|----------|
| DynFlex | 1 | 40% | 2h | TOKENS/02 > Category 3 |
| DynGrid | 2 | 35% | 2h | TOKENS/02 > Category 3 |
| DynStack | 2 | 45% | 1.5h | TOKENS/02 > Category 3 |
| DynBox | 2 | 50% | 1h | TOKENS/02 > Category 3 |
| DynContainer | 3 | 30% | 1.5h | TOKENS/02 > Category 3 |
| DynAspectRatio | 3 | 40% | 1.5h | TOKENS/02 > Category 3 |
| DynSpacer | 3 | 60% | 1h | TOKENS/02 > Category 3 |

**Template Location**: docs/TOKENS/02_FOCUSED_TOKENS_IMPLEMENTATION.md > "CATEGORY 3: LAYOUT"

**Key Tokens**:
- `--dyn-flex-gap`
- `--dyn-grid-gap`
- `--dyn-container-padding`
- `--dyn-spacing-*` (reference)

**Note**: No colors, only spacing and layout tokens

---

### CATEGORY 4: DISPLAY (5 components)

| Component | Priority | Status | Time | Template |
|-----------|----------|--------|------|----------|
| DynBadge | 2 | 70% | 2h | TOKENS/02 > Category 4 |
| DynTag | 2 | 65% | 2h | TOKENS/02 > Category 4 |
| DynAlert | 2 | 60% | 2.5h | TOKENS/02 > Category 4 |
| DynLabel | 2 | 75% | 1.5h | TOKENS/02 > Category 4 |
| DynCaption | 3 | 80% | 1h | TOKENS/02 > Category 4 |

**Template Location**: docs/TOKENS/02_FOCUSED_TOKENS_IMPLEMENTATION.md > "CATEGORY 4: DISPLAY"

**Key Tokens**:
- `--dyn-badge-bg`
- `--dyn-badge-color`
- `--dyn-alert-bg-[status]`
- `--dyn-alert-border-[status]`
- `--dyn-label-color`

**Variants**: success, warning, error, info

---

### CATEGORY 5: DATA (3 components)

| Component | Priority | Status | Time | Template |
|-----------|----------|--------|------|----------|
| DynTable | 1 | 25% | 4h | TOKENS/02 > Category 5 |
| DynPagination | 2 | 55% | 2.5h | TOKENS/02 > Category 5 |
| DynList | 2 | 50% | 2.5h | TOKENS/02 > Category 5 |

**Template Location**: docs/TOKENS/02_FOCUSED_TOKENS_IMPLEMENTATION.md > "CATEGORY 5: DATA"

**Key Tokens**:
- `--dyn-table-bg`
- `--dyn-table-border`
- `--dyn-table-hover-bg`
- `--dyn-list-item-padding`
- `--dyn-pagination-[state]`

**Note**: Table is CRITICAL (external @import issue)

---

### CATEGORY 6: NAVIGATION (5 components)

| Component | Priority | Status | Time | Template |
|-----------|----------|--------|------|----------|
| DynNav | 2 | 40% | 3h | TOKENS/02 > Category 6 |
| DynNavItem | 2 | 45% | 2h | TOKENS/02 > Category 6 |
| DynBreadcrumb | 3 | 50% | 2h | TOKENS/02 > Category 6 |
| DynTabs | 2 | 55% | 2.5h | TOKENS/02 > Category 6 |
| DynSidebar | 3 | 35% | 3h | TOKENS/02 > Category 6 |

**Template Location**: docs/TOKENS/02_FOCUSED_TOKENS_IMPLEMENTATION.md > "CATEGORY 6: NAVIGATION"

**Key Tokens**:
- `--dyn-nav-bg`
- `--dyn-nav-color`
- `--dyn-nav-item-hover-bg`
- `--dyn-nav-item-active-bg`
- `--dyn-nav-z-index`

---

### CATEGORY 7: OVERLAY (3 components)

| Component | Priority | Status | Time | Template |
|-----------|----------|--------|------|----------|
| DynModal | 2 | 45% | 3h | TOKENS/02 > Category 7 |
| DynTooltip | 3 | 50% | 2h | TOKENS/02 > Category 7 |
| DynPopover | 3 | 40% | 2.5h | TOKENS/02 > Category 7 |

**Template Location**: docs/TOKENS/02_FOCUSED_TOKENS_IMPLEMENTATION.md > "CATEGORY 7: OVERLAY"

**Key Tokens**:
- `--dyn-modal-bg`
- `--dyn-modal-shadow`
- `--dyn-modal-z-index`
- `--dyn-tooltip-bg`
- `--dyn-tooltip-color`

---

### CATEGORY 8: SPECIALIZED (6 components)

| Component | Priority | Status | Time | Template |
|-----------|----------|--------|------|----------|
| DynCard | 2 | 50% | 2.5h | TOKENS/02 > Category 8 |
| DynProgressBar | 3 | 55% | 2h | TOKENS/02 > Category 8 |
| DynSpinner | 3 | 60% | 1.5h | TOKENS/02 > Category 8 |
| DynAvatar | 3 | 65% | 2h | TOKENS/02 > Category 8 |
| DynImage | 3 | 70% | 1.5h | TOKENS/02 > Category 8 |
| DynVideo | 3 | 45% | 2h | TOKENS/02 > Category 8 |

**Template Location**: docs/TOKENS/02_FOCUSED_TOKENS_IMPLEMENTATION.md > "CATEGORY 8: SPECIALIZED"

**Key Tokens**:
- `--dyn-card-bg`
- `--dyn-card-shadow`
- `--dyn-card-padding`
- `--dyn-progress-height`
- `--dyn-progress-bg`
- `--dyn-avatar-size`

---

## 📋 IMPLEMENTATION ROADMAP

### PHASE 1: CRITICAL (6 hours) - HIGH PRIORITY
```
Priority 1 components ONLY:
├─ DynButton (2h)
├─ DynIconButton (2h)
├─ DynInput (2h) - has hardcoded transitions
├─ DynTextArea (2h) - has hardcoded transitions
├─ DynTable (2h) - CRITICAL: external @import
└─ DynFlex (2h) - tokens in :root

TOTAL: 6 components, 12 hours
RESOURCE: 2 developers = 6 hours wall time
STATUS: Done by Day 1 end
```

### PHASE 2: MAJOR (30 hours) - PRIORITY 2 & 3
```
18 components (2-3 hours each):
├─ Category 2: 5 remaining (DynSelect, DynCheckbox, DynRadio, DynToggle, DynSearchInput)
├─ Category 3: 7 (DynGrid, DynStack, etc.)
├─ Category 4: 5 (DynBadge, DynTag, etc.)
├─ Category 5: 2 remaining (DynPagination, DynList)
└─ Category 6: 5 (DynNav, etc.)

TOTAL: 24 components, 40 hours
RESOURCE: 2 developers = 20 hours wall time
STATUS: Done by Day 7
```

### PHASE 3: COMPLETION (24 hours) - PRIORITY 3
```
11 components (1.5-3 hours each):
├─ Category 7: 3 (DynModal, DynTooltip, DynPopover)
└─ Category 8: 6 (DynCard, DynProgressBar, etc.)
├─ Remaining: 2 (DynBreadcrumb, DynSidebar)

TOTAL: 11 components, 24 hours
RESOURCE: 1-2 developers = 12-24 hours wall time
STATUS: Done by Day 12-15
```

---

## 🎯 TOTAL SUMMARY

```
PHASE 1: 6 components  × avg 2.0h = 12h / 2 devs = 6h wall
PHASE 2: 24 components × avg 1.7h = 41h / 2 devs = 21h wall
PHASE 3: 11 components × avg 2.2h = 24h / 1 dev  = 24h wall

GRAND TOTAL:
  ├─ AI Agent: 77 hours of work ÷ 10 min per component = ~12 hours (8 min/component optimized)
  ├─ Human: 77 hours of work ÷ 45 min per component = ~60 hours (2 developers × 30 hours = 10 days)
  └─ Combined: 20 days with human + AI hybrid approach
```

---

## ✅ MAPPING VERIFICATION

Before starting implementation:

- [ ] All 37 components listed
- [ ] All components assigned to category
- [ ] All categories have templates in TOKENS/02
- [ ] Priority levels set correctly
- [ ] Time estimates reasonable
- [ ] Status tracking in checklist
- [ ] Dependencies identified
- [ ] Critical issues flagged (Phase 1)

