# DynBadge Component Specification

**Priority**: 🔴 P0 - CRITICAL (Week 1)  
**Effort**: 4 hours  
**Type**: Display  
**Status**: 🔴 Needs Refactoring

---

## PROBLEM STATEMENT

### Current Issue
Token names don't follow standardization pattern - inconsistent and confusing.

### Token Naming Problems

| Current (❌ WRONG) | Target (✅ CORRECT) | Issue |
|------------------|-------------------|-------|
| `--badge-accent` | `--dyn-badge-bg` | Vague property, no prefix |
| `--badge-bg-color` | `--dyn-badge-bg` | Redundant naming |
| `--badge-text-color` | `--dyn-badge-color` | Verbose |
| `--badge-border` | `--dyn-badge-border` | Missing prefix |
| `--badge-padding` | `--dyn-badge-padding` | Missing prefix |
| `--badge-radius` | `--dyn-badge-radius` | Missing prefix |
| `--badge-font-size` | `--dyn-badge-font-size` | Missing prefix |
| `--badge-font-weight` | `--dyn-badge-font-weight` | Missing prefix |

### Current Code (
❌ WRONG)
```css
:root {
  --badge-accent: #2563eb;              /* Vague! */
  --badge-bg-color: #2563eb;            /* Redundant */
  --badge-text-color: #ffffff;          /* Verbose */
  --badge-border: 1px solid #2563eb;    /* Direct value */
  --badge-padding: 0.5rem 0.75rem;      /* Hardcoded */
}
```

**Problems**:
- ❌ No `--dyn-` prefix
- ❌ Inconsistent naming
- ❌ No 3-level fallback
- ❌ Hardcoded values
- ❌ No dark mode
- ❌ No responsive

---

## SOLUTION

### New Pattern (✅ CORRECT)

**File**: `packages/dyn-ui-react/src/components/DynBadge/DynBadge.module.css`

```css
/* Component-scoped tokens */
:root {
  /* Background */
  --dyn-badge-bg: var(--dyn-color-primary, #2563eb);
  --dyn-badge-color: var(--dyn-color-white, #ffffff);
  
  /* Styling */
  --dyn-badge-padding-y: var(--dyn-spacing-xs, 0.25rem);
  --dyn-badge-padding-x: var(--dyn-spacing-sm, 0.5rem);
  --dyn-badge-font-size: var(--dyn-font-size-xs, 0.75rem);
  --dyn-badge-font-weight: var(--dyn-font-weight-semibold, 600);
  --dyn-badge-border-radius: var(--dyn-radius-full, 9999px);
  --dyn-badge-border: none;
  --dyn-badge-shadow: none;
  --dyn-badge-line-height: 1;
  --dyn-badge-min-width: auto;
  --dyn-badge-transition: all var(--dyn-transition-base, 200ms);
}

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--dyn-badge-padding-y) var(--dyn-badge-padding-x);
  background-color: var(--dyn-badge-bg);
  color: var(--dyn-badge-color);
  font-size: var(--dyn-badge-font-size);
  font-weight: var(--dyn-badge-font-weight);
  border-radius: var(--dyn-badge-border-radius);
  border: var(--dyn-badge-border);
  box-shadow: var(--dyn-badge-shadow);
  line-height: var(--dyn-badge-line-height);
  min-width: var(--dyn-badge-min-width);
  white-space: nowrap;
  transition: var(--dyn-badge-transition);
}

/* Variants - override tokens ONLY */
.badgeSuccess {
  --dyn-badge-bg: var(--dyn-color-success, #10b981);
}

.badgeWarning {
  --dyn-badge-bg: var(--dyn-color-warning, #f59e0b);
}

.badgeError {
  --dyn-badge-bg: var(--dyn-color-error, #ef4444);
}

.badgeInfo {
  --dyn-badge-bg: var(--dyn-color-info, #3b82f6);
}

.badgeOutlined {
  --dyn-badge-bg: transparent;
  --dyn-badge-color: var(--dyn-badge-bg, var(--dyn-color-primary, #2563eb));
  --dyn-badge-border: 1px solid var(--dyn-badge-bg, var(--dyn-color-primary, #2563eb));
}

.badgeSmall {
  --dyn-badge-padding-y: var(--dyn-spacing-xs, 0.25rem);
  --dyn-badge-padding-x: var(--dyn-spacing-xs, 0.25rem);
  --dyn-badge-font-size: var(--dyn-font-size-xs, 0.75rem);
}

.badgeLarge {
  --dyn-badge-padding-y: var(--dyn-spacing-sm, 0.5rem);
  --dyn-badge-padding-x: var(--dyn-spacing-md, 0.75rem);
  --dyn-badge-font-size: var(--dyn-font-size-sm, 0.875rem);
}

.badgeDot {
  --dyn-badge-min-width: 8px;
  --dyn-badge-padding: 4px;
  border-radius: 50%;
  font-size: 0;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --dyn-badge-bg: var(--dyn-color-primary-dark, #1e3a8a);
    --dyn-badge-color: var(--dyn-color-text-dark, #f9fafb);
  }
  
  .badgeSuccess {
    --dyn-badge-bg: var(--dyn-color-success-dark, #059669);
  }
  
  .badgeWarning {
    --dyn-badge-bg: var(--dyn-color-warning-dark, #d97706);
  }
  
  .badgeError {
    --dyn-badge-bg: var(--dyn-color-error-dark, #dc2626);
  }
  
  .badgeInfo {
    --dyn-badge-bg: var(--dyn-color-info-dark, #2563eb);
  }
  
  .badgeOutlined {
    --dyn-badge-bg: transparent;
    --dyn-badge-border-color: var(--dyn-badge-bg);
  }
}

/* Responsive */
@media (max-width: 767px) {
  :root {
    --dyn-badge-font-size: var(--dyn-font-size-xs, 0.75rem);
  }
}
```

---

## REQUIREMENTS CHECKLIST

### CSS Requirements
- [ ] All tokens renamed to `--dyn-badge-*`
- [ ] Follows pattern: `--dyn-badge-[property]-[state]`
- [ ] 3-level fallback on all tokens
- [ ] No hardcoded values (except fallback)
- [ ] Foundation tokens referenced (colors, spacing, typography)
- [ ] Dark mode with `@media (prefers-color-scheme: dark)`
- [ ] Responsive with `@media (max-width: 767px)`
- [ ] Contrast ratio 4.5:1 minimum

### Token Definitions

All must be in `:root` of DynBadge.module.css:

```
✅ --dyn-badge-bg              /* Background color */
✅ --dyn-badge-color           /* Text color */
✅ --dyn-badge-padding-y       /* Vertical padding */
✅ --dyn-badge-padding-x       /* Horizontal padding */
✅ --dyn-badge-font-size       /* Font size */
✅ --dyn-badge-font-weight     /* Font weight */
✅ --dyn-badge-border-radius   /* Border radius */
✅ --dyn-badge-border          /* Border */
✅ --dyn-badge-shadow          /* Box shadow */
✅ --dyn-badge-line-height     /* Line height */
✅ --dyn-badge-min-width       /* Minimum width */
✅ --dyn-badge-transition      /* Animation */
```

### Variants to Support

- [ ] `variant="primary"` (default) - Blue
- [ ] `variant="success"` - Green
- [ ] `variant="warning"` - Yellow
- [ ] `variant="error"` - Red
- [ ] `variant="info"` - Light blue
- [ ] `variant="outlined"` - Border only
- [ ] `size="small"` - Compact
- [ ] `size="medium"` (default) - Normal
- [ ] `size="large"` - Larger
- [ ] `shape="pill"` (default) - Rounded
- [ ] `shape="dot"` - Circular (8px)
- [ ] `shape="square"` - 4px radius

### Testing Checklist
- [ ] Each variant renders correctly
- [ ] Each size renders correctly
- [ ] Each shape renders correctly
- [ ] Contrast ratio 4.5:1 minimum
- [ ] Dark mode colors correct
- [ ] Responsive sizing works
- [ ] Icon support (if any)
- [ ] 80%+ test coverage

### Storybook Stories
- [ ] All variants (primary, success, warning, error, info, outlined)
- [ ] All sizes (small, medium, large)
- [ ] All shapes (pill, dot, square)
- [ ] With icons
- [ ] With numbers
- [ ] Dark mode
- [ ] Responsive

---

## AI VERIFICATION PROMPT

```
AI Task: Verify DynBadge Token Standardization

File: packages/dyn-ui-react/src/components/DynBadge/DynBadge.module.css

1. TOKEN NAMING AUDIT
   - Find all CSS variables (--*)
   - For each variable:
     * Check starts with --dyn-badge-
     * Check follows pattern --dyn-badge-[property]-[state]
     * Flag any without prefix or wrong pattern
   - Report any old tokens (--badge-*)

2. MAPPING VERIFICATION
   - Verify these OLD names are NOT used:
     --badge-accent, --badge-bg-color, --badge-text-color
   - Verify these NEW names ARE used:
     --dyn-badge-bg, --dyn-badge-color, --dyn-badge-padding-*
   - Check values reference foundation tokens

3. FALLBACK VERIFICATION
   - Each token should be: var(--dyn-badge-X, var(--legacy, fallback))
   - List tokens missing fallbacks
   - Check no bare hardcoded values

4. VARIANT VERIFICATION
   - List all variant classes
   - Verify each variant ONLY overrides token values
   - Flag any that change CSS properties directly
   - Check outline variant works correctly

5. DARK MODE VERIFICATION
   - @media (prefers-color-scheme: dark) present
   - List tokens overridden for dark
   - Check colors are appropriate
   - Verify contrast maintained

6. CONTRAST CHECK
   - For each color variant, verify contrast:
     * Success: text vs success bg
     * Warning: text vs warning bg
     * Error: text vs error bg
     * All should be 4.5:1 minimum

Output: Detailed compliance report with any violations
```

---

## DELIVERABLES

### Files to Modify
1. `packages/dyn-ui-react/src/components/DynBadge/DynBadge.module.css`
   - Rename all tokens to `--dyn-badge-*`
   - Add 3-level fallback
   - Add dark mode section
   - Add responsive section

2. `packages/dyn-ui-react/src/components/DynBadge/DynBadge.tsx`
   - Update className mappings if needed

3. `packages/dyn-ui-react/src/components/DynBadge/DynBadge.test.tsx`
   - Add token tests
   - Add variant tests
   - Add dark mode test

4. `packages/dyn-ui-react/src/components/DynBadge/DynBadge.stories.tsx`
   - Add all variants
   - Add all sizes
   - Add dark mode

### PR Checklist
- [ ] All token names updated
- [ ] All variants tested
- [ ] Dark mode works
- [ ] Contrast 4.5:1 minimum
- [ ] 80%+ coverage
- [ ] Commit: `refactor(DynBadge): standardize token naming`

---

**Status**: 🔴 Ready for implementation  
**Effort**: 4 hours  
**Deadline**: Week 1 (by Thursday)
