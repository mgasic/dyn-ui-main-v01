# Medium Size Pattern - Official Documentation

## Problem Statement

Across the codebase, we discovered a **systematic issue**: Medium size variants are consistently missing or incorrectly implemented in components with `size` prop.

**Components Affected:** DynCheckbox, DynBadge, DynTabs, DynInput, DynAvatar (5 out of 5 checked)

---

## The Pattern

### ❌ Anti-Pattern: Missing Medium

```css
/* Common mistake #1: No medium class at all */
.componentSmall { /* values */ }
.componentLarge { /* values */ }
/* Medium missing entirely! */

/* Common mistake #2: Empty medium class */
.componentMedium {
  color: inherit; /* Only non-size property */
}

/* Common mistake #3: Circular reference */
.component {
  --component-size: var(--component-size, 20px); /* Self-reference! */
}
```

### ✅ Correct Pattern

```css
/* Explicit medium between small and large */
.componentSmall {
  --component-size: 16px;
  --component-padding: var(--dyn-spacing-xs) var(--dyn-spacing-sm);
  --component-font-size: var(--dyn-font-size-xs);
}

.componentMedium {
  /* EXPLICIT values - do NOT rely on defaults */
  --component-size: 20px;
  --component-padding: var(--dyn-spacing-sm) var(--dyn-spacing-md);
  --component-font-size: var(--dyn-font-size-sm);
}

.componentLarge {
  --component-size: 24px;
  --component-padding: var(--dyn-spacing-md) var(--dyn-spacing-lg);
  --component-font-size: var(--dyn-font-size-md);
}
```

---

## Why Does This Happen?

### Root Cause Analysis

1. **Assumption of Defaults**
   - Developers assume medium uses root/default values
   - Root values are often set to medium initially
   - But root values != explicit medium class values

2. **Development Order**
   - Small and Large created first (obvious edge cases)
   - Medium "assumed to work" without explicit definition
   - Testing focuses on extremes, not middle

3. **Copy-Paste Errors**
   - Copying from components that have this bug
   - Pattern propagates across codebase

---

## Mandatory Checklist

When creating a component with `size` prop:

- [ ] Define ALL size variants explicitly
- [ ] Medium MUST have its own class with explicit values
- [ ] Verify size hierarchy: xs < sm < **md** < lg < xl
- [ ] Do NOT use circular token references
- [ ] Do NOT leave medium class empty
- [ ] Test ALL sizes visually in Storybook

---

## Size Hierarchy Standards

### Standard Size Scale

| Size | Relative Scale | Common Use Case |
|------|----------------|-----------------|
| xs | 60% of medium | Very compact, dense UI |
| sm | 80% of medium | Compact, secondary actions |
| **md** | **100% (base)** | **Default, most common** |
| lg | 125% of medium | Prominent, primary actions |
| xl | 150% of medium | Hero elements, emphasis |

### Property Mapping

For each size variant, define:

```typescript
{
  fontSize: number | string;
  padding: string; // e.g., "4px 8px"
  height?: number | string;
  width?: number | string; // for avatars, icons, etc.
  gap?: string; // for containers
}
```

---

## Code Templates

### Template 1: Button/Input Components

```css
/* SIZE VARIANTS */
.componentSmall {
  padding: var(--dyn-spacing-xs) var(--dyn-spacing-sm);
  font-size: var(--dyn-font-size-xs);
  min-height: var(--dyn-size-sm, 2rem);
}

.componentMedium {
  padding: var(--dyn-spacing-sm) var(--dyn-spacing-md);
  font-size: var(--dyn-font-size-sm);
  min-height: var(--dyn-size-md, 2.5rem);
}

.componentLarge {
  padding: var(--dyn-spacing-md) var(--dyn-spacing-lg);
  font-size: var(--dyn-font-size-md);
  min-height: var(--dyn-size-lg, 3rem);
}
```

### Template 2: Icon/Avatar Components

```css
/* SIZE VARIANTS */
.sizeXs {
  --component-size: var(--component-size-xs, 24px);
  --component-font-size: var(--component-font-size-xs, 10px);
}

.sizeSm {
  --component-size: var(--component-size-sm, 32px);
  --component-font-size: var(--component-font-size-sm, 12px);
}

.sizeM {
  --component-size: var(--component-size-md, 40px);
  --component-font-size: var(--component-font-size-md, 14px);
}

.sizeLg {
  --component-size: var(--component-size-lg, 48px);
  --component-font-size: var(--component-font-size-lg, 16px);
}

.sizeXl {
  --component-size: var(--component-size-xl, 64px);
  --component-font-size: var(--component-font-size-xl, 20px);
}
```

### Template 3: Badge/Chip Components

```css
/* SIZE VARIANTS */
.badgeXs {
  --badge-font-size: var(--dyn-font-size-2xs, 10px);
  --badge-padding-y: var(--dyn-spacing-3xs, 1px);
  --badge-padding-x: var(--dyn-spacing-2xs, 4px);
}

.badgeSm {
  --badge-font-size: var(--dyn-font-size-xs, 11px);
  --badge-padding-y: var(--dyn-spacing-2xs, 2px);
  --badge-padding-x: var(--dyn-spacing-xs, 4px);
}

.badgeMd {
  --badge-font-size: var(--dyn-font-size-xs, 12px);
  --badge-padding-y: var(--dyn-spacing-2xs, 2px);
  --badge-padding-x: var(--dyn-spacing-sm, 8px);
}

.badgeLg {
  --badge-font-size: var(--dyn-font-size-sm, 14px);
  --badge-padding-y: var(--dyn-spacing-xs, 4px);
  --badge-padding-x: var(--dyn-spacing-md, 12px);
}

.badgeXl {
  --badge-font-size: var(--dyn-font-size-md, 16px);
  --badge-padding-y: var(--dyn-spacing-sm, 6px);
  --badge-padding-x: var(--dyn-spacing-lg, 16px);
}
```

---

## TypeScript Pattern

```typescript
// ComponentName.types.ts
export type ComponentSize = 'small' | 'medium' | 'large';
// or
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export const COMPONENT_DEFAULT_PROPS = {
  size: 'medium' as ComponentSize, // ALWAYS default to medium
  // ...
};

// ComponentName.tsx
const SIZE_CLASS_MAP: Record<ComponentSize, string | undefined> = {
  small: styles.componentSmall,
  medium: styles.componentMedium, // MUST exist in CSS!
  large: styles.componentLarge,
};

// NEVER do this:
const SIZE_CLASS_MAP = {
  small: styles.componentSmall,
  medium: undefined, // ❌ Wrong!
  large: styles.componentLarge,
};
```

---

## Validation Script

Use this automated checker (see `check-size-variants.ps1`):

```bash
npm run check:size-variants
```

Will output:
```
✅ DynButton - All size variants present
⚠️ DynCard - Missing .sizeMedium class
🔴 DynModal - Empty .sizeMd class (no properties)
```

---

## Real-World Examples

### Example 1: DynCheckbox (Fixed)

**Before:**
```css
.container {
  --dyn-checkbox-size: var(--dyn-checkbox-size, 20px); /* ❌ Circular! */
}
```

**After:**
```css
.container {
  --dyn-checkbox-size: 20px; /* ✅ Explicit medium */
}

.boxSmall {
  --dyn-checkbox-size: 16px;
}

.boxLarge {
  --dyn-checkbox-size: 24px;
}
```

### Example 2: DynTabs (Fixed)

**Before:**
```css
.sizeSmall { /* ... */ }
/* .sizeMedium missing! */
.sizeLarge { /* ... */ }
```

**After:**
```css
.sizeSmall {
  min-height: 2rem;
  padding: var(--dyn-spacing-xxs) var(--dyn-spacing-sm);
  font-size: 0.75rem;
}

.sizeMedium {
  min-height: 2.75rem;
  padding: var(--dyn-spacing-xs) var(--dyn-spacing-md);
  font-size: 0.875rem;
}

.sizeLarge {
  min-height: 3.5rem;
  padding: var(--dyn-spacing-md) var(--dyn-spacing-xl);
  font-size: 1rem;
}
```

---

## Testing Guidelines

### Manual Testing Checklist

For each component with size variants:

1. **Visual Check in Storybook**
   - [ ] Small size renders smaller than medium
   - [ ] Medium size is visually balanced (not too big/small)
   - [ ] Large size renders larger than medium
   - [ ] Sizes increase proportionally

2. **Code Review**
   - [ ] All size classes exist in CSS
   - [ ] Medium has explicit property values
   - [ ] No circular token references
   - [ ] Size hierarchy is correct (numeric check)

3. **Browser DevTools**
   - [ ] Inspect computed styles for each size
   - [ ] Verify CSS variables resolve correctly
   - [ ] Check for any `undefined` or `0` values

---

## Prevention

### PR Checklist Addition

Add to your PR template:

```markdown
## Size Variants (if applicable)

- [ ] Component has explicit medium size class
- [ ] All size variants tested in Storybook
- [ ] Size hierarchy verified (xs < sm < md < lg < xl)
- [ ] No circular CSS variable references
- [ ] Ran `npm run check:size-variants`
```

### Code Review Focus

When reviewing components with `size` prop:

1. **First check:** Does `.sizeMedium` / `.componentMd` exist?
2. **Second check:** Does it have actual property values?
3. **Third check:** Are values between small and large?

---

## Summary

> [!IMPORTANT]
> **Golden Rule:** Medium size ALWAYS gets explicit definition, never rely on defaults!

**Remember:**
- Medium is NOT optional
- Medium is NOT empty
- Medium is NOT a circular reference
- Medium IS explicitly defined with values between small and large

**Pattern detected in 5/5 components checked - this is a systemic issue that requires vigilance!**
