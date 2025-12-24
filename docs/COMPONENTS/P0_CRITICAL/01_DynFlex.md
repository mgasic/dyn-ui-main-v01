# DynFlex Component Specification

**Priority**: 🔴 P0 - CRITICAL (Week 1)  
**Effort**: 3 hours  
**Type**: Layout  
**Status**: 🔴 Needs Refactoring

---

## PROBLEM STATEMENT

### Current Issue
DynFlex uses **global tokens** that leak to other components, causing style conflicts.

### Current Code Pattern (❌ WRONG)
```css
/* Global scope - affects ALL components */
:root {
  --flex-gap: 12px;           /* Vague! No --dyn- prefix */
  --flex-padding: 8px;        /* Global pollution */
  --flex-direction: row;      /* Affects everything */
}

/* Component class */
.flex {
  gap: var(--flex-gap);
  padding: var(--flex-padding);
  flex-direction: var(--flex-direction);
}
```

**Problems**:
- ❌ Tokens defined globally (`:root` in HTML or global CSS)
- ❌ No `--dyn-` prefix (doesn't follow standard)
- ❌ Leaks to other components
- ❌ No 3-level fallback
- ❌ Hard to track dependencies

---

## SOLUTION

### New Pattern (✅ CORRECT)

**File**: `packages/dyn-ui-react/src/components/DynFlex/DynFlex.module.css`

```css
/* Component-scoped tokens ONLY */
:root {
  /* Properly named with --dyn- prefix */
  --dyn-flex-gap: var(--dyn-spacing-md, 0.75rem);
  --dyn-flex-padding: var(--dyn-spacing-md, 0.75rem);
  --dyn-flex-direction: row;
  --dyn-flex-align-items: stretch;
  --dyn-flex-justify-content: flex-start;
  --dyn-flex-wrap: nowrap;
  
  /* Added missing tokens for consistency */
  --dyn-flex-bg: transparent;
  --dyn-flex-border: none;
  --dyn-flex-border-radius: 0;
}

/* Base styles - use tokens */
.flex {
  display: flex;
  gap: var(--dyn-flex-gap);
  padding: var(--dyn-flex-padding);
  flex-direction: var(--dyn-flex-direction);
  align-items: var(--dyn-flex-align-items);
  justify-content: var(--dyn-flex-justify-content);
  flex-wrap: var(--dyn-flex-wrap);
  background: var(--dyn-flex-bg);
  border: var(--dyn-flex-border);
  border-radius: var(--dyn-flex-border-radius);
}

/* Variants override tokens ONLY */
.flexColumn {
  --dyn-flex-direction: column;
}

.flexWrap {
  --dyn-flex-wrap: wrap;
}

.flexGapSmall {
  --dyn-flex-gap: var(--dyn-spacing-sm, 0.5rem);
}

.flexGapLarge {
  --dyn-flex-gap: var(--dyn-spacing-lg, 1rem);
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --dyn-flex-bg: transparent;  /* Most flex containers stay transparent */
    --dyn-flex-border: none;
  }
}

/* Responsive */
@media (max-width: 767px) {
  :root {
    --dyn-flex-gap: var(--dyn-spacing-sm, 0.5rem);
    --dyn-flex-padding: var(--dyn-spacing-sm, 0.5rem);
  }
}
```

---

## REQUIREMENTS CHECKLIST

### CSS Requirements
- [ ] Move all tokens to component `.module.css` (not global)
- [ ] All tokens use `--dyn-` prefix
- [ ] All tokens follow pattern: `--dyn-flex-[property]-[state]`
- [ ] No bare hardcoded values (except in fallback)
- [ ] 3-level fallback on ALL tokens:
  - Primary: `--dyn-flex-*`
  - Legacy: `--legacy-flex-*` (if exists)
  - Hardcoded: actual value
- [ ] Variants override tokens only (not properties)
- [ ] Dark mode section with `@media (prefers-color-scheme: dark)`
- [ ] Responsive section with `@media (max-width: 767px)`
- [ ] No inline styles in React component

### React Component Requirements
- [ ] Uses `React.forwardRef` to expose DOM element
- [ ] Accepts all standard HTMLAttributes
- [ ] Proper prop destructuring
- [ ] `displayName` set for debugging
- [ ] JSDoc comments on props

### Token Definitions

All these tokens MUST be defined in `:root` of DynFlex.module.css:

```
✅ --dyn-flex-gap                    /* Space between items */
✅ --dyn-flex-padding               /* Padding inside container */
✅ --dyn-flex-direction              /* row or column */
✅ --dyn-flex-align-items            /* Vertical alignment */
✅ --dyn-flex-justify-content        /* Horizontal alignment */
✅ --dyn-flex-wrap                   /* Wrap or nowrap */
✅ --dyn-flex-bg                     /* Background color */
✅ --dyn-flex-border                 /* Border style */
✅ --dyn-flex-border-radius          /* Rounded corners */
```

### Variants to Support

- [ ] `direction="row"` (default) - Horizontal layout
- [ ] `direction="column"` - Vertical layout
- [ ] `wrap={true}` - Allow wrapping
- [ ] `gap="small"` - `--dyn-spacing-sm`
- [ ] `gap="medium"` (default) - `--dyn-spacing-md`
- [ ] `gap="large"` - `--dyn-spacing-lg`
- [ ] `align="start"` - `flex-start`
- [ ] `align="center"` - `center`
- [ ] `align="end"` - `flex-end`
- [ ] `align="stretch"` (default) - `stretch`
- [ ] `justify="start"` (default) - `flex-start`
- [ ] `justify="center"` - `center`
- [ ] `justify="end"` - `flex-end`
- [ ] `justify="between"` - `space-between`
- [ ] `justify="around"` - `space-around`

### Testing Checklist
- [ ] Renders with children
- [ ] All direction variants work
- [ ] All gap sizes work
- [ ] All alignment options work
- [ ] Wrapping works
- [ ] Dark mode renders correctly
- [ ] Responsive sizes change correctly
- [ ] No styles leak to siblings
- [ ] Focus visible on interactive children
- [ ] Touch targets 44px minimum
- [ ] 80%+ Jest coverage

### Storybook Stories
- [ ] Default (row, medium gap)
- [ ] Column layout
- [ ] With wrapping
- [ ] Different gap sizes (small, medium, large)
- [ ] Different alignments
- [ ] Nested flex containers
- [ ] With content (buttons, cards, etc.)
- [ ] Dark mode version
- [ ] Responsive demo

---

## AI VERIFICATION PROMPT

### Use this prompt to verify the component:

```
AI Task: Verify DynFlex Component Compliance

File to review: packages/dyn-ui-react/src/components/DynFlex/DynFlex.module.css

1. SCOPE VERIFICATION
   - Check where :root is defined
   - Confirm it's in DynFlex.module.css (not global)
   - Verify no global style file contains --flex-* tokens
   - List all --flex-* tokens still in global scope (should be 0)

2. NAMING VERIFICATION
   - Find all CSS variables in the file
   - For each variable:
     * Confirm it starts with --dyn-flex-
     * Confirm no abbreviations (flex not flx, gap not gp)
     * Confirm pattern is --dyn-flex-[property]-[state]
     * Flag any deviations

3. FALLBACK VERIFICATION
   - For each token, verify 3-level fallback:
     var(--dyn-flex-X, var(--legacy-flex-X, fallback-value))
   - List tokens with incomplete fallbacks
   - Check no bare var() calls exist

4. SCOPE LEAKAGE CHECK
   - Search entire component file for :global
   - Search entire component file for !important
   - Search entire component file for global selectors
   - Report any found

5. VARIANT VERIFICATION
   - List all variant classes (flexColumn, flexWrap, etc.)
   - For each variant:
     * Verify it ONLY overrides token values
     * Verify it DOES NOT duplicate CSS properties
     * Flag any direct property changes

6. DARK MODE VERIFICATION
   - Verify @media (prefers-color-scheme: dark) exists
   - List all tokens overridden in dark mode
   - Verify no properties changed in dark mode (only tokens)

7. RESPONSIVE VERIFICATION
   - Verify @media (max-width: 767px) exists
   - Check gap/padding reduced on mobile
   - Verify direction adjusted if needed

8. REACT COMPONENT CHECK
   - Verify React.forwardRef usage
   - Check no inline styles (all CSS)
   - Verify displayName set
   - Check JSDoc on props

Output format:

✅ PASSED - Item verified
⚠️  PARTIAL - Needs review
❌ FAILED - Issue found

For each FAILED or PARTIAL, provide:
- Specific location (line number if possible)
- Exact issue
- Suggested fix
```

---

## EXAMPLE: BEFORE & AFTER

### BEFORE (❌ WRONG - Current)
```css
/* In global styles.css or HTML :root */
:root {
  --flex-gap: 12px;
  --flex-padding: 8px;
  --flex-direction: row;
}

/* In DynFlex.module.css */
.flex {
  gap: var(--flex-gap);           /* Uses global token */
  padding: var(--flex-padding);   /* Uses global token */
}

.flexColumn {
  flex-direction: column;          /* Direct property */
}
```

**Problems**:
- Tokens in global scope
- Tokens affect all components
- Variant changes property directly
- No fallbacks
- No dark mode

### AFTER (✅ CORRECT - Target)
```css
/* In DynFlex.module.css ONLY */
:root {
  --dyn-flex-gap: var(--dyn-spacing-md, 0.75rem);
  --dyn-flex-padding: var(--dyn-spacing-md, 0.75rem);
  --dyn-flex-direction: row;
}

.flex {
  gap: var(--dyn-flex-gap);         /* Uses scoped token */
  padding: var(--dyn-flex-padding); /* Uses scoped token */
  flex-direction: var(--dyn-flex-direction);
}

.flexColumn {
  --dyn-flex-direction: column;     /* Override token only */
}

@media (prefers-color-scheme: dark) {
  :root {
    /* Override tokens for dark mode if needed */
  }
}
```

**Benefits**:
- Component-scoped tokens
- No global pollution
- Variants override tokens
- Proper fallbacks
- Dark mode support
- Responsive design

---

## DELIVERABLES

### Files to Modify
1. `packages/dyn-ui-react/src/components/DynFlex/DynFlex.module.css`
   - Move tokens to component scope
   - Add `--dyn-` prefix
   - Add 3-level fallback
   - Add dark mode section
   - Add responsive section

2. `packages/dyn-ui-react/src/components/DynFlex/DynFlex.tsx`
   - Ensure no inline styles
   - Verify proper ref forwarding
   - Update JSDoc if needed

3. `packages/dyn-ui-react/src/components/DynFlex/DynFlex.test.tsx`
   - Add token value tests
   - Add scope isolation test
   - Add dark mode test
   - Add responsive test

4. `packages/dyn-ui-react/src/components/DynFlex/DynFlex.stories.tsx`
   - Add stories for each variant
   - Add dark mode story
   - Add responsive story

### PR Checklist
- [ ] All files modified
- [ ] 80%+ test coverage
- [ ] Dark mode tested
- [ ] Responsive tested
- [ ] No style leakage
- [ ] Commit message: `refactor(DynFlex): 100% design token compliance`
- [ ] PR includes this checklist (filled)

---

## REFERENCE DOCUMENTATION

**See Also**:
- COMPLETE_KNOWLEDGE_BASE.md
  - Section 2: Three-Layer Token System
  - Section 4: Naming Conventions
  - Section 5: Component Structure
  - Section 6: Implementation Workflow

- QUICK_START.md
  - Token naming rules
  - 3-level fallback pattern
  - CSS module structure

---

**Status**: 🗐️ Ready for implementation  
**Effort**: 3 hours  
**Deadline**: Week 1 (by end of Wednesday)
