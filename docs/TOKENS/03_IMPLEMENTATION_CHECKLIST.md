# DYN UI - IMPLEMENTATION CHECKLIST & ACTION ITEMS

**Status**: READY TO EXECUTE  
**Total Components**: 37  
**Estimated Time**: 60 hours (1.5 weeks, 2 developers)  
**Priority**: CRITICAL - Blocks design system standardization

---

## 📋 QUICK EXECUTION GUIDE

### Step 1: Prepare Team
- [ ] Share FOCUSED_TOKENS_IMPLEMENTATION.md with team
- [ ] Share Design_Tokens_Standard_v1.0.md with team
- [ ] 30-min team sync on token structure
- [ ] Assign components (split 37/2 = 18-19 per dev)

### Step 2: For Each Component (repeat 37 times)
- [ ] Audit current CSS (5 min)
- [ ] Add token definitions (10 min)
- [ ] Update tests (10 min)
- [ ] Update Storybook (5 min)
- [ ] Verify dark mode + responsive (5 min)

### Step 3: Quality Gate
- [ ] All components use --dyn-* tokens
- [ ] No hardcoded values (except fallbacks)
- [ ] Dark mode works for all
- [ ] Tests pass
- [ ] Storybook builds

---

## COMPONENT BREAKDOWN BY CATEGORY

### CATEGORY 1: BUTTON-LIKE (2 components) - 4 hours

| Component | Status | Tokens | Dark Mode | Tests | Storybook | Time |
|-----------|--------|--------|-----------|-------|-----------|------|
| DynButton | ✅ 95% | 12 | YES | YES | YES | 2h |
| DynIconButton | ⚠️ 80% | 8 | PARTIAL | PARTIAL | YES | 2h |

**Total**: 4 hours

**What Needs Fixing**:
- DynButton: Add responsive touch targets
- DynIconButton: Add dark mode section, add responsive, ensure fallbacks

---

### CATEGORY 2: INPUT-LIKE (7 components) - 14 hours

| Component | Status | Issues | Time |
|-----------|--------|--------|------|
| DynInput | ⚠️ 85% | Hardcoded transitions, missing dark mode | 2h |
| DynTextArea | ⚠️ 80% | Similar to DynInput | 2h |
| DynSelect | ⚠️ 75% | Missing tokens, hardcoded colors | 2h |
| DynDatePicker | ❌ 50% | Major refactor needed | 3h |
| DynCheckbox | ⚠️ 70% | Missing size variants, no dark mode | 2h |
| DynRadio | ⚠️ 70% | Similar to checkbox | 2h |
| DynToggle | ⚠️ 75% | Hardcoded animation timing | 1h |

**Total**: 14 hours

**Common Fixes Across All Input Components**:
1. Replace hardcoded colors with `--dyn-color-*` tokens
2. Replace hardcoded spacing with `--dyn-spacing-*` tokens
3. Add error state tokens (`--dyn-input-error`)
4. Add focus ring tokens (`--dyn-color-focus-ring`)
5. Add dark mode section
6. Add responsive media query
7. Update tests to verify token application
8. Update Storybook to show error state

---

### CATEGORY 3: LAYOUT (7 components) - 10 hours

| Component | Status | Issues | Time |
|-----------|--------|--------|------|
| DynFlex | ⚠️ 90% | Tokens in :root (move to component scope) | 1h |
| DynGrid | ⚠️ 85% | Same as DynFlex | 1h |
| DynStack | ⚠️ 85% | Same as DynFlex | 1h |
| DynBox | ⚠️ 80% | Missing shadow tokens | 1h |
| DynContainer | ⚠️ 75% | Hardcoded max-width values | 1h |
| DynSpacer | ✅ 95% | Just add tests | 1h |
| DynSpaced | ⚠️ 70% | Major refactor | 3h |

**Total**: 10 hours

**Critical Fix**: Move tokens from :root to component scope
```css
/* WRONG: :root scope (currently) */
:root {
  --dyn-flex-gap: 12px;  /* Affects all DynFlex globally */
}

/* RIGHT: Component scope (what we need) */
.container {
  --dyn-flex-gap: var(--dyn-spacing-md);  /* Each component independent */
}
```

---

### CATEGORY 4: DISPLAY (5 components) - 8 hours

| Component | Status | Issues | Time |
|-----------|--------|--------|------|
| DynBadge | ⚠️ 80% | Missing status color tokens | 1h |
| DynAvatar | ⚠️ 75% | Hardcoded colors, no variants | 2h |
| DynLabel | ⚠️ 85% | Simple fix - just tokens | 1h |
| DynDivider | ✅ 95% | Just verify dark mode | 1h |
| DynIcon | ⚠️ 70% | Missing size scale tokens | 1h |

**Total**: 8 hours

---

### CATEGORY 5: DATA DISPLAY (3 components) - 12 hours

| Component | Status | Issues | Time |
|-----------|--------|--------|------|
| DynTable | ❌ CRITICAL | External @import, must inline tokens | 4h |
| DynListView | ⚠️ 60% | Major refactor, missing many tokens | 4h |
| DynTreeView | ⚠️ 50% | Similar to DynListView | 4h |

**Total**: 12 hours

**Critical Issue - DynTable**:
```css
/* CURRENT (WRONG) */
@import url('@design-tokens/table.css');  /* ❌ External dependency */

/* REQUIRED (RIGHT) */
.root {
  --dyn-table-header-bg: var(--dyn-color-surface-muted);  /* ✅ Inline */
  --dyn-table-border: var(--dyn-color-border);
  /* ... all tokens inline */
}
```

---

### CATEGORY 6: NAVIGATION (5 components) - 9 hours

| Component | Status | Issues | Time |
|-----------|--------|--------|------|
| DynMenu | ⚠️ 70% | Missing z-index tokens | 2h |
| DynTabs | ⚠️ 75% | Hardcoded colors, missing states | 2h |
| DynBreadcrumb | ⚠️ 80% | Missing separator tokens | 1h |
| DynSidebar | ⚠️ 60% | Hardcoded width/colors | 2h |
| DynAppbar | ⚠️ 65% | Missing shadow tokens | 2h |

**Total**: 9 hours

---

### CATEGORY 7: OVERLAY (3 components) - 6 hours

| Component | Status | Issues | Time |
|-----------|--------|--------|------|
| DynModal | ⚠️ 75% | Missing z-index token for backdrop | 2h |
| DynDropdown | ⚠️ 70% | Missing shadow tokens, z-index | 2h |
| DynPopover | ⚠️ 70% | Similar to DynDropdown | 2h |

**Total**: 6 hours

---

### CATEGORY 8: SPECIALIZED (6 components) - 10 hours

| Component | Status | Issues | Time |
|-----------|--------|--------|------|
| DynChart | ⚠️ 50% | Complex, needs color scale tokens | 3h |
| DynGauge | ⚠️ 50% | Complex, needs gradient tokens | 2h |
| DynStepper | ⚠️ 70% | Missing status color tokens | 2h |
| DynToolbar | ⚠️ 80% | Just spacing/color tokens | 1h |
| DynPage | ⚠️ 75% | Missing container padding tokens | 1h |
| DynFieldContainer | ⚠️ 80% | Missing spacing tokens | 1h |

**Total**: 10 hours

---

## 🎯 PHASE 1: CRITICAL FIXES (6 hours)

These MUST be done first:

### 1. DynTable - External Import Fix (4h)
**Current Issue**:
```css
@import url('@design-tokens/table.css');  /* ❌ CRITICAL */
```

**What to Do**:
- [ ] Remove @import statement
- [ ] Move all table tokens inline into DynTable.module.css
- [ ] Define 15 tokens for table styling
- [ ] Add dark mode section
- [ ] Add responsive adjustments
- [ ] Update tests to verify inline tokens

**Tokens to Add**:
```
--dyn-table-header-bg
--dyn-table-header-text
--dyn-table-header-font-weight
--dyn-table-header-border
--dyn-table-row-bg
--dyn-table-row-text
--dyn-table-row-border
--dyn-table-row-bg-hover
--dyn-table-row-bg-selected
--dyn-table-cell-padding
--dyn-table-cell-font-size
--dyn-table-border-width
--dyn-table-border-radius
--dyn-table-row-striped-bg
--dyn-table-row-striped-text
```

### 2. DynInput - Hardcoded Transitions Fix (1h)
**Current Issue**:
```css
transition: all 0.2s ease;  /* ❌ Hardcoded */
```

**What to Do**:
- [ ] Replace with token: `var(--dyn-transition-base)`
- [ ] Add fallback: `var(--dyn-transition-base, all 0.2s ease-out)`
- [ ] Update dark mode section (if missing)
- [ ] Add focus ring color token

### 3. DynFlex - Move Tokens from :root (1h)
**Current Issue**:
```css
:root {
  --dyn-flex-gap: 12px;  /* ❌ Global, affects all DynFlex */
}
```

**What to Do**:
- [ ] Remove tokens from :root
- [ ] Add to .container class
- [ ] Use foundation tokens as fallbacks
- [ ] Update all variant classes

---

## 📦 PHASE 2: APPLY TEMPLATES (30 hours)

Once Phase 1 is done, apply this pattern to remaining components:

### For Button-Like Components (DynButton, DynIconButton)

**Template**:
```css
.root {
  --dyn-component-bg: var(--dyn-color-primary, #2563eb);
  --dyn-component-color: var(--dyn-color-primary-contrast, #ffffff);
  --dyn-component-padding-y: var(--dyn-spacing-sm, 0.5rem);
  --dyn-component-padding-x: var(--dyn-spacing-md, 1rem);
  
  background-color: var(--dyn-component-bg);
  color: var(--dyn-component-color);
  padding: var(--dyn-component-padding-y) var(--dyn-component-padding-x);
}

.variantName {
  --dyn-component-bg: var(--dyn-color-secondary, #f3f4f6);
}

.sizeName {
  --dyn-component-padding-y: var(--dyn-spacing-xs, 0.375rem);
}

@media (prefers-color-scheme: dark) {
  .root {
    --dyn-component-bg: var(--dyn-color-primary-dark, #3b82f6);
  }
}

@media (max-width: 767px) {
  .root {
    min-height: var(--dyn-size-touch-target, 44px);
  }
}
```

**Checklist**:
- [ ] Define tokens (one per distinct value)
- [ ] Add variants (override tokens, not properties)
- [ ] Add dark mode section
- [ ] Add responsive adjustments
- [ ] Add focus/hover/active states (token updates only)

**Time per component**: 1-2 hours

**Components**: DynButton (done), DynIconButton, etc.

### For Input-Like Components (7 total)

**Template**:
```css
.container {
  --dyn-input-bg: var(--dyn-color-surface, #ffffff);
  --dyn-input-border: var(--dyn-color-border, #d1d5db);
  --dyn-input-color: var(--dyn-color-text-primary, #111827);
  --dyn-input-placeholder: var(--dyn-color-text-placeholder, #9ca3af);
  --dyn-input-border-focus: var(--dyn-color-primary, #2563eb);
  --dyn-input-focus-ring: var(--dyn-color-focus-ring, rgba(37, 99, 235, 0.35));
  --dyn-input-padding-y: var(--dyn-spacing-sm, 0.5rem);
  --dyn-input-padding-x: var(--dyn-spacing-md, 1rem);
}

.input {
  background-color: var(--dyn-input-bg);
  border: 1px solid var(--dyn-input-border);
  padding: var(--dyn-input-padding-y) var(--dyn-input-padding-x);
}

.input:focus-visible {
  border-color: var(--dyn-input-border-focus);
  box-shadow: 0 0 0 3px var(--dyn-input-focus-ring);
}

.input.error {
  --dyn-input-border: var(--dyn-color-danger, #d32f2f);
}

@media (prefers-color-scheme: dark) {
  .container {
    --dyn-input-bg: var(--dyn-color-surface-dark, #1a1f35);
  }
}
```

**Checklist**:
- [ ] Color tokens (bg, border, text, placeholder, error)
- [ ] Focus tokens (border-focus, focus-ring)
- [ ] Spacing tokens (padding)
- [ ] All states (focus, error, disabled, readonly)
- [ ] Dark mode section
- [ ] Responsive adjustments

**Time per component**: 2-3 hours
**Components**: DynInput, DynTextArea, DynSelect, DynDatePicker, DynCheckbox, DynRadio, DynToggle

### For Layout Components (7 total)

**Template**:
```css
.container {
  --dyn-flex-gap: var(--dyn-spacing-md, 0.75rem);
  --dyn-flex-padding: var(--dyn-spacing-lg, 1.5rem);
  
  display: flex;
  gap: var(--dyn-flex-gap);
  padding: var(--dyn-flex-padding);
}

.gapSmall {
  --dyn-flex-gap: var(--dyn-spacing-sm, 0.5rem);
}

@media (max-width: 767px) {
  .container {
    --dyn-flex-gap: var(--dyn-spacing-sm, 0.5rem);
    --dyn-flex-padding: var(--dyn-spacing-md, 0.75rem);
  }
}
```

**Key Difference**: Layout components DON'T use color tokens, only spacing/sizing

**Checklist**:
- [ ] Spacing tokens only (gap, padding)
- [ ] Size variants (small, medium, large)
- [ ] Responsive adjustments
- [ ] NO color tokens (layout is transparent)

**Time per component**: 1-1.5 hours
**Components**: DynFlex (fix), DynGrid, DynStack, DynBox, DynContainer, DynSpacer, DynSpaced

---

## 🔍 PHASE 3: TESTING & DOCUMENTATION (15 hours)

### Test Coverage Requirements

For **EACH component**, add tests:

```typescript
describe('Token Application', () => {
  it('should apply component tokens to DOM', () => {
    // Verify tokens are used, not hardcoded values
  });

  it('should update tokens for variants', () => {
    // Verify variant tokens override root tokens
  });

  it('should apply dark mode tokens', () => {
    // Verify dark theme token overrides work
  });

  it('should use responsive tokens', () => {
    // Verify mobile viewport uses different tokens
  });

  it('should not use hardcoded CSS values', () => {
    // Verify no hardcoded colors/sizes/fonts
  });
});
```

**Time per component**: 1-2 hours
**Total**: 37-74 hours (covered in development time above)

### Storybook Documentation

For **EACH component**, add:

```typescript
/**
 * Token Usage
 * 
 * This component uses:
 * - --dyn-color-primary (button background)
 * - --dyn-spacing-md (button padding)
 * - --dyn-font-size-sm (button text)
 * - --dyn-border-radius-md (button radius)
 * 
 * Supports:
 * - Dark mode (automatic via @media query)
 * - Responsive (44px touch targets on mobile)
 * - Accessibility (focus ring, reduced motion)
 */
```

**Time per component**: 30 min
**Total**: 18.5 hours (covered in development time above)

---

## ✅ QUALITY GATES (MUST PASS)

Before considering a component "done":

### CSS Validation
- [ ] All property values use `var(--dyn-*)` tokens
- [ ] No hardcoded colors (except fallbacks in var())
- [ ] No hardcoded sizes (except fallbacks)
- [ ] No hardcoded fonts (except fallbacks)
- [ ] Fallback pattern present: `var(--dyn-token, var(--legacy, value))`
- [ ] Dark mode section present (@media prefers-color-scheme)
- [ ] Responsive section present (@media max-width)
- [ ] Accessibility section present (@media prefers-reduced-motion, prefers-contrast)

### Test Validation
- [ ] Tokens applied to DOM (not hardcoded)
- [ ] Variants work correctly
- [ ] Dark mode tokens applied
- [ ] Responsive tokens applied
- [ ] No hardcoded values in CSS
- [ ] At least 80% coverage

### Storybook Validation
- [ ] All variants shown visually
- [ ] All sizes shown
- [ ] Dark mode story included
- [ ] Token values documented
- [ ] Accessibility features noted

### Accessibility
- [ ] Focus ring visible (3px minimum)
- [ ] Color contrast 4.5:1 (WCAG AA)
- [ ] Touch targets 44px (mobile)
- [ ] Reduced motion respected
- [ ] High contrast mode supported

---

## 📅 EXECUTION TIMELINE

### Week 1: Phase 1 (Critical Fixes)
**Monday**: Team sync + DynTable start  
**Tuesday-Wednesday**: DynTable completion + DynInput fix + DynFlex fix  
**Thursday**: Tests for Phase 1 fixes  
**Friday**: Storybook updates + QA verification  

**Time**: 6-8 hours
**Deliverable**: 3 components 100% compliant

### Week 2: Phase 2 (Template Application)
**Day 1**: Button-like components (2 × 2h = 4h)  
**Day 2**: Input-like Part 1 (4 × 2.5h = 10h, split across 2 days)  
**Day 3**: Input-like Part 2 + Layout Part 1 (3 × 2h = 6h + 2 × 1.5h = 3h)  
**Day 4**: Layout Part 2 + Display (2 × 1.5h = 3h + 5 × 1.5h = 7.5h, split)  
**Day 5**: Data Display + Navigation Part 1  

**Time**: 40-45 hours
**Deliverable**: 27 components 100% compliant

### Week 3: Phase 3 (Complete)
**Testing**: 10-15 hours  
**Storybook**: 8-10 hours  
**QA & Cleanup**: 5-10 hours  

**Time**: 23-35 hours
**Deliverable**: All 37 components 100% compliant + full test coverage + complete Storybook

---

## 🚀 HOW TO TRACK PROGRESS

### Component Status Matrix

Create a spreadsheet:

```
Component | Category | Status | Tokens | Dark Mode | Tests | Storybook | Date | Dev |
-----------|----------|--------|--------|-----------|-------|-----------|------|-----|
DynButton | Button | ✅ DONE | 12/12 | ✅ | ✅ | ✅ | 12/21 | Dev1 |
DynInput | Input | 🟡 IN PROGRESS | 14/15 | 🟡 | ⚪ | ⚪ | TBD | Dev2 |
DynFlex | Layout | 🔴 TODO | 0/8 | ⚪ | ⚪ | ⚪ | TBD | Dev1 |
```

Update daily.

---

## 💡 COMMON MISTAKES TO AVOID

### ❌ MISTAKE 1: Forgetting Fallbacks
```css
/* WRONG */
--dyn-button-bg: var(--dyn-color-primary);

/* RIGHT */
--dyn-button-bg: var(--dyn-color-primary, var(--color-primary, #2563eb));
```

**Impact**: Breaks if foundation tokens missing

---

### ❌ MISTAKE 2: Repeating Properties Instead of Updating Tokens
```css
/* WRONG */
.root {
  background-color: var(--dyn-button-bg);
}

.variant {
  background-color: var(--dyn-color-secondary);  /* ❌ Hardcoded, not token */
}

/* RIGHT */
.root {
  --dyn-button-bg: var(--dyn-color-primary);
  background-color: var(--dyn-button-bg);
}

.variant {
  --dyn-button-bg: var(--dyn-color-secondary);
  /* background-color uses updated token automatically */
}
```

**Impact**: Defeats purpose of token system

---

### ❌ MISTAKE 3: Defining Tokens in :root (for Layout)
```css
/* WRONG */
:root {
  --dyn-flex-gap: 12px;  /* Affects all DynFlex globally */
}

/* RIGHT */
.container {
  --dyn-flex-gap: var(--dyn-spacing-md);  /* Each component independent */
}
```

**Impact**: Can't have two DynFlex with different gaps on same page

---

### ❌ MISTAKE 4: No Dark Mode Section
```css
/* WRONG - no dark mode support */
.root {
  --dyn-button-bg: var(--dyn-color-primary, #2563eb);
  background-color: var(--dyn-button-bg);
}

/* RIGHT */
.root {
  --dyn-button-bg: var(--dyn-color-primary, #2563eb);
  background-color: var(--dyn-button-bg);
}

@media (prefers-color-scheme: dark) {
  .root {
    --dyn-button-bg: var(--dyn-color-primary-dark, #3b82f6);
  }
}
```

**Impact**: Component looks broken in dark mode

---

### ❌ MISTAKE 5: Forgetting Responsive
```css
/* WRONG - no touch target increase */
.root {
  min-height: 40px;
}

/* RIGHT */
.root {
  min-height: 40px;
}

@media (max-width: 767px) {
  .root {
    min-height: var(--dyn-size-touch-target, 44px);
  }
}
```

**Impact**: Mobile users can't tap buttons easily

---

## 📞 NEED HELP?

If a developer gets stuck:

1. **"What tokens should this component use?"**  
   → Read Design_Tokens_Standard_v1.0.md, Section: Component Analysis Map

2. **"How do I structure the CSS?"**  
   → Copy template from FOCUSED_TOKENS_IMPLEMENTATION.md for your category

3. **"How do I test token usage?"**  
   → Use test examples from FOCUSED_TOKENS_IMPLEMENTATION.md, Category examples

4. **"How do I show variants in Storybook?"**  
   → Copy Storybook example from DynButton in FOCUSED_TOKENS_IMPLEMENTATION.md

5. **"Is my CSS ready for merge?"**  
   → Check Quality Gates section (✅ all must pass)

---

## 🎯 SUCCESS CRITERIA

**Phase 1 (Week 1)**: 3 components 100% compliant
- DynTable: tokens inlined, no external imports
- DynInput: transitions tokenized
- DynFlex: tokens scoped to component

**Phase 2 (Week 2)**: 27 more components 100% compliant
- All use --dyn-* tokens consistently
- All have dark mode support
- All have responsive adjustments
- All have tests
- All have Storybook documentation

**Phase 3 (Week 3)**: Polish & verification
- 100% test coverage across all components
- 100% Storybook documentation
- No hardcoded values anywhere
- Team trained on token system

**Final Result**: **37/37 components 100% token-compliant**

---

**Last Updated**: December 20, 2025  
**Owner**: Frontend Architecture Team  
**Status**: Ready for Execution

