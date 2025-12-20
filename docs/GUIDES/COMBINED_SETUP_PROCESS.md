# GUIDES - QUICK SETUP & REFERENCE

**Purpose**: Condensed setup and process guides for AI agent  
**Audience**: AI Agent  
**Date**: December 20, 2025

---

## GUIDE 00: AI AGENT SETUP (30 minutes)

### Pre-Flight Checklist

```
BEFORE YOU START:
- [ ] Load all documentation files
- [ ] Parse all JSON specifications  
- [ ] Initialize templates
- [ ] Understand mapping
- [ ] Verify token database
- [ ] Confirm 37-component checklist
```

### Documentation Load Order

```
STEP 1 (5 min): Load core specs
  ├─ docs/TOKENS/05_Design_Tokens_Standard_v1.md
  ├─ docs/AI-SPECS/token-mappings.json
  └─ docs/AI-SPECS/component-checklist.json

STEP 2 (5 min): Load structure
  ├─ docs/ARCHITECTURE/00_COMPONENT_STRUCTURE.md
  ├─ docs/ARCHITECTURE/01_TOKEN_HIERARCHY.md
  ├─ docs/ARCHITECTURE/03_NAMING_CONVENTIONS.md
  └─ docs/ARCHITECTURE/04_FILE_ORGANIZATION.md

STEP 3 (5 min): Load templates
  ├─ docs/TOKENS/02_FOCUSED_TOKENS_IMPLEMENTATION.md
  ├─ docs/AI-SPECS/category-templates.json
  └─ docs/AI-SPECS/css-patterns.json

STEP 4 (5 min): Load process
  ├─ docs/GUIDES/01_COMPONENT_IMPLEMENTATION.md
  ├─ docs/GUIDES/02_VERIFICATION_PROTOCOL.md
  ├─ docs/GUIDES/03_ERROR_HANDLING.md
  └─ docs/AI-SPECS/verification-rules.json

STEP 5 (5 min): Initialize systems
  ├─ Cache token definitions
  ├─ Load component list (37 items)
  ├─ Prepare CSS/TS/Storybook templates
  └─ Ready for processing
```

### Key Systems to Understand

```
SYSTEM 1: Token Resolution
  Property → Component Token → Foundation Token → Final Value
  Example: button-bg → --dyn-button-bg → --dyn-color-primary → #2563eb

SYSTEM 2: Component Categories
  37 components → 8 categories → 1 template each
  Mapping in: docs/ARCHITECTURE/02_COMPONENT_CATEGORIES.md

SYSTEM 3: Naming Convention
  --dyn-[domain]-[property]-[state]
  Reference: docs/ARCHITECTURE/03_NAMING_CONVENTIONS.md

SYSTEM 4: Layer Architecture
  Layer 1 (Foundation) → Layer 2 (Component) → Layer 3 (Theme)
  Reference: docs/ARCHITECTURE/01_TOKEN_HIERARCHY.md

SYSTEM 5: File Organization
  Component files in packages/dyn-ui-react/src/components/[Component]/
  Token files in packages/design-tokens/styles/
  Reference: docs/ARCHITECTURE/00_COMPONENT_STRUCTURE.md + 04
```

---

## GUIDE 01: COMPONENT IMPLEMENTATION (8-Step Process)

### For Each Component: 15 Minutes Average

```
┌─────────────────────────────────────────────────────┐
│ COMPONENT PROCESSING WORKFLOW                       │
├─────────────────────────────────────────────────────┤
│                                                     │
│ STEP 1: Load Component Info (1 min)                │
│   Source: docs/AI-SPECS/component-checklist.json   │
│   Get: Category, Status, Priority, Tokens          │
│                                                     │
│ STEP 2: Find Template (1 min)                      │
│   Source: TOKENS/02 Category section + JSON        │
│   Get: CSS template, Storybook, Test structure     │
│                                                     │
│ STEP 3: Map Required Tokens (2 min)                │
│   Source: ARCHITECTURE/02 + TOKENS/05              │
│   Get: Exact token names for this component        │
│                                                     │
│ STEP 4: Generate CSS File (5 min)                  │
│   Output: packages/dyn-ui-react/.../Component.module.css
│   Include: :root, base, interactions, variants     │
│   Include: dark mode, responsive, accessibility    │
│                                                     │
│ STEP 5: Generate Storybook (3 min)                 │
│   Output: packages/dyn-ui-react/.../Component.stories.tsx
│   Include: All variants, dark mode story           │
│   Document: Token usage in JSDoc                   │
│                                                     │
│ STEP 6: Generate Tests (3 min)                     │
│   Output: packages/dyn-ui-react/.../Component.test.tsx
│   Include: Token tests, variant tests, a11y tests  │
│   Include: Dark mode + responsive tests            │
│                                                     │
│ STEP 7: Verify Quality (2 min)                     │
│   Source: docs/AI-SPECS/verification-rules.json    │
│   Check: 24 verification items                     │
│   Result: ✅ PASS or ❌ FAIL + reason              │
│                                                     │
│ STEP 8: Report Status (1 min)                      │
│   Output: Status log entry                         │
│   Include: Component name, time, result, issues    │
│                                                     │
└─────────────────────────────────────────────────────┘

TOTAL: ~15-18 minutes per component
FOR 37 COMPONENTS: 9-11 hours processing time
```

### Detailed Step Guide

```
STEP 1: LOAD INFO
  Component: "DynButton"
  Category: "button-like"
  Priority: 1
  Status: 95%
  Required tokens:
    - --dyn-button-bg
    - --dyn-button-color
    - --dyn-button-padding-y
    - --dyn-button-padding-x
    - --dyn-button-font-size
    - --dyn-button-font-weight
    - --dyn-button-border-radius
    - --dyn-button-shadow
    - --dyn-button-transition

STEP 2: FIND TEMPLATE
  Source: docs/TOKENS/02 > CATEGORY 1: BUTTON-LIKE COMPONENTS
  OR: docs/AI-SPECS/category-templates.json > "button-like"
  Get:
    - CSS Module structure (180-250 lines)
    - Storybook structure (70-100 lines)
    - Test structure (120-150 lines)

STEP 3: MAP TOKENS
  Get from: ARCHITECTURE/02 or TOKENS/05
  Button tokens map to:
    - --dyn-color-primary (foundation)
    - --dyn-spacing-md (foundation)
    - --dyn-font-size-base (foundation)
    - --dyn-radius-md (foundation)
    - etc.

STEP 4: GENERATE CSS
  Copy template from TOKENS/02 or category-templates.json
  Replace placeholders:
    - [COMPONENT] → "Button"
    - [component] → "button"
    - [TOKENS] → actual token names from mapping
    - [DOMAIN] → "button"
  Output to: packages/dyn-ui-react/src/components/DynButton/DynButton.module.css

STEP 5: GENERATE STORYBOOK
  Copy template from TOKENS/02 or category-templates.json
  Add stories for:
    - Primary (default variant)
    - Secondary (if exists)
    - Tertiary (if exists)
    - Disabled state
    - Dark mode
  Document token mapping in JSDoc
  Output to: packages/dyn-ui-react/src/components/DynButton/DynButton.stories.tsx

STEP 6: GENERATE TESTS
  Copy template from TOKENS/02
  Test cases:
    - Token application (each variant)
    - CSS class assignment
    - Dark mode rendering
    - Responsive behavior
    - Accessibility (focus, contrast)
  Output to: packages/dyn-ui-react/src/components/DynButton/DynButton.test.tsx

STEP 7: VERIFY QUALITY
  Check against: docs/AI-SPECS/verification-rules.json
  Run checklist:
    CSS: 10 checks (no hardcoded, 3-level fallback, etc.)
    Code: 4 checks (exports, types, JSDoc, etc.)
    Tests: 6 checks (coverage, variants, a11y, etc.)
    Storybook: 4 checks (variants, dark mode, documented, etc.)
  Total: 24 verification items
  If ANY fail: Log issue and continue OR escalate

STEP 8: REPORT
  Log entry:
    {
      "component": "DynButton",
      "status": "✅ DONE",
      "time_minutes": 15,
      "category": "button-like",
      "files_created": 3,
      "tests_passed": 24/24,
      "issues": "none"
    }
```

---

## GUIDE 02 & 03: VERIFICATION & ERROR HANDLING

### Verification Rules (24 Items)

```
CSS MODULE (10 checks)
  [ ] No hardcoded values (except fallbacks)
  [ ] 3-level fallback present: var(--dyn-*, var(--legacy-*, fallback))
  [ ] Token definitions at :root level only
  [ ] Dark mode section exists
  [ ] Responsive section exists
  [ ] Accessibility rules present (focus, contrast, motion)
  [ ] Max 300 lines
  [ ] Variants override tokens only (no duplicate properties)
  [ ] Naming convention: --dyn-[domain]-[property]-[state]
  [ ] All tokens referenced from foundation

CODE FILES (4 checks)
  [ ] Component exports from index.ts
  [ ] TypeScript types in separate .types.ts file
  [ ] JSDoc comments present on exports
  [ ] ForwardRef used for HTML elements

TESTS (6 checks)
  [ ] Token application tests for each variant
  [ ] Dark mode rendering tests
  [ ] Responsive behavior tests
  [ ] Accessibility tests (focus, contrast)
  [ ] Test coverage >= 80%
  [ ] All tests passing

STORYBOOK (4 checks)
  [ ] All variants documented as stories
  [ ] Dark mode story included
  [ ] Token usage documented in JSDoc
  [ ] Component description clear
```

### Error Handling

```
ERROR 1: Token Not Found
  Action: Check TOKENS/05 and AI-SPECS/token-mappings.json
  Fallback: Use legacy token name or hardcode with comment
  Report: Issue in status log

ERROR 2: Category Mismatch
  Action: Check ARCHITECTURE/02_COMPONENT_CATEGORIES.md
  Fallback: Assign to closest matching category
  Report: Escalate to human review

ERROR 3: Template Syntax Error
  Action: Check TOKENS/02 source document
  Fallback: Use previous working template as reference
  Report: Template error in status

ERROR 4: Verification Failure
  Action: Review specific failing check
  Fallback: Fix and retry verification
  Report: Continue only if critical passes, escalate non-critical

ERROR 5: File I/O Error
  Action: Verify file path is correct
  Fallback: Log detailed error with path info
  Report: Stop processing, escalate
```

---

## QUICK REFERENCE TABLES

### Token Reference (Quick Lookup)

```
FOUNDATION LAYER:
  Colors:     --dyn-color-[primary|secondary|success|warning|error|info]
  Spacing:    --dyn-spacing-[xs|sm|md|lg|xl|2xl]
  Typography: --dyn-font-[size|weight], --dyn-line-height-*
  Shadows:    --dyn-shadow-[xs|sm|md|lg|xl]
  Radius:     --dyn-radius-[none|sm|md|lg|xl|full]
  Transitions: --dyn-transition-[fast|base|slow]
  Z-Index:    --dyn-z-index-[dropdown|sticky|fixed|modal|popover|tooltip]

COMPONENT LAYER:
  Buttons:    --dyn-button-[bg|color|padding|border|radius|shadow]
  Inputs:     --dyn-input-[bg|color|border|padding|font]
  Layout:     --dyn-flex/grid-gap, --dyn-container-padding
  Display:    --dyn-badge/tag-[bg|color|padding]
  Data:       --dyn-table/list-[bg|border|hover]
  Navigation: --dyn-nav/breadcrumb-[bg|color|hover]
  Overlay:    --dyn-modal/tooltip-[bg|shadow|z]
  Specialized: --dyn-card/progress-[bg|shadow|padding]
```

### Time Estimate by Category

```
CATEGORY 1 (Button-like):      2 hours per component × 2 = 4h total
CATEGORY 2 (Input-like):       2.5 hours per component × 7 = 17.5h total
CATEGORY 3 (Layout):           2 hours per component × 7 = 14h total
CATEGORY 4 (Display):          2 hours per component × 5 = 10h total
CATEGORY 5 (Data):             3 hours per component × 3 = 9h total
CATEGORY 6 (Navigation):       2.5 hours per component × 5 = 12.5h total
CATEGORY 7 (Overlay):          2.5 hours per component × 3 = 7.5h total
CATEGORY 8 (Specialized):      2 hours per component × 6 = 12h total

TOTAL: 37 components = 86 hours (at normal pace)
OPTIMIZED: 37 components = 55-60 hours (with caching + templates)
AI AGENT: 37 components = 10-12 hours (parallel capable, templated)
```

---

## 🎯 FINAL CHECKLIST BEFORE STARTING

- [ ] All 6 TOKENS documents loaded
- [ ] All 5 ARCHITECTURE documents loaded
- [ ] All 5 AI-SPECS JSON files parsed
- [ ] Component mapping understood (37 → 8 categories)
- [ ] Token hierarchy understood (3 layers)
- [ ] File organization rules understood
- [ ] CSS template structure memorized
- [ ] Naming convention rules understood
- [ ] 24-point verification checklist ready
- [ ] 37-component list loaded and ready to process

**Status: READY FOR COMPONENT PROCESSING** 🚀

