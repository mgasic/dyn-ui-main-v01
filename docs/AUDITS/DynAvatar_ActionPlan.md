# 🚀 DynAvatar Action Plan

**Audit Score**: 72% (FAIR)
**Target Score**: 85%+ (GOOD)
**Total Time**: 4-5 hours
**Complexity**: Medium

---

## 👀 Overview

DynAvatar needs 3 phases of fixes to reach production-ready status:

1. **Phase 1 - CRITICAL** (2-3 hours): CSS token compliance
2. **Phase 2 - IMPORTANT** (1-2 hours): Documentation
3. **Phase 3 - OPTIONAL** (1 hour): Polish & optimize

---

## 🚨 PHASE 1: CRITICAL - CSS Token Fixes (2-3 hours)

### Task 1.1: Replace Hardcoded Values (1.5-2 hours)

**File**: `packages/dyn-ui-react/src/components/DynAvatar/DynAvatar.module.css`

**Issue**: Multiple hardcoded pixel values

**Changes Required**:

#### 1.1.1 Status Indicator Size

**Current**:

```css
.status {
  width: 12px;
  height: 12px;
  border: 2px solid var(--dyn-color-surface, var(--color-surface, #ffffff));
}
```

**New**:

```css
.status {
  width: var(--dyn-avatar-status-size, var(--avatar-status-size, 12px));
  height: var(--dyn-avatar-status-size, var(--avatar-status-size, 12px));
  border: var(--dyn-border-width, 1px) solid var(--dyn-color-surface, var(--color-surface, #ffffff));
}
```

#### 1.1.2 Badge Size and Position

**Current**:

```css
.badge {
  top: -4px;
  right: -4px;
  min-width: 20px;
  height: 20px;
  padding: 0 4px;
}
```

**New**:

```css
.badge {
  top: var(--dyn-avatar-badge-offset, var(--avatar-badge-offset, -4px));
  right: var(--dyn-avatar-badge-offset, var(--avatar-badge-offset, -4px));
  min-width: var(--dyn-avatar-badge-size, var(--avatar-badge-size, 20px));
  height: var(--dyn-avatar-badge-size, var(--avatar-badge-size, 20px));
  padding: var(--dyn-avatar-badge-padding, var(--avatar-badge-padding, 0 4px));
}
```

#### 1.1.3 Group Item Margins

**Current**:

```css
.groupItem {
  margin-left: -8px;
  border-color: var(--dyn-color-surface, var(--color-surface, #ffffff));
}

.groupItem:first-child {
  margin-left: 0;
}
```

**New**:

```css
.groupItem {
  margin-left: var(--dyn-avatar-group-margin-negative, var(--avatar-group-margin-negative, -8px));
  border-color: var(--dyn-color-surface, var(--color-surface, #ffffff));
}

.groupItem:first-child {
  margin-left: 0;
}
```

#### 1.1.4 Accessibility SR-Only

**Current**:

```css
.dyn-sr-only {
  position: absolute !important;
  /* ... other properties */
}
```

**New**: Delete this entirely - move to global utilities file

**File to Update**: `packages/dyn-ui-react/src/styles/globals/a11y.css` (or similar)

```css
/* Add to global file */
.dyn-sr-only {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}
```

### Task 1.2: Remove Unused CSS Classes (0.5-1 hour)

**File**: `packages/dyn-ui-react/src/components/DynAvatar/DynAvatar.module.css`

**Classes to Remove**:

- `.badge` (if not planned for immediate use)
- `.group` (if not planned for immediate use)
- `.groupItem` (if not planned for immediate use)

**Action**: Comment them out with explanation or remove entirely

```css
/*
  TODO: Uncomment when implementing avatar groups

.badge {
  ...
}

.group {
  ...
}

.groupItem {
  ...
}
*/
```

### Task 1.3: Verify Dark Mode Tokens (0.5 hour)

**File**: Same CSS file

**Check**: Dark mode section at bottom

**Current Dark Mode**:

```css
@media (prefers-color-scheme: dark) {
  .container {
    background-color: var(--dyn-color-primary-light-dark, rgba(59, 130, 246, 0.15));
    /* ... */
  }
}
```

**Verify**: All dark mode tokens follow the same pattern:

- Use `--dyn-color-*-dark` naming
- Include 3-level fallback
- Test in dark mode

---

## 📄 PHASE 2: IMPORTANT - Documentation (1-2 hours)

### Task 2.1: Add JSDoc to Component (0.5 hour)

**File**: `packages/dyn-ui-react/src/components/DynAvatar/DynAvatar.tsx`

**Add Before Export**:

```tsx
/**
 * DynAvatar Component
 *
 * Displays a user avatar with optional image, initials fallback, and status indicator.
 * Supports multiple sizes, shapes, and interactive states.
 *
 * @component
 * @example
 * // Basic usage with initials
 * <DynAvatar alt="John Doe" />
 *
 * @example
 * // With image and status
 * <DynAvatar
 *   src="/avatars/john.jpg"
 *   alt="John Doe"
 *   status="online"
 *   size="lg"
 * />
 *
 * @example
 * // Interactive avatar
 * <DynAvatar
 *   alt="Profile"
 *   onClick={() => navigate('/profile')}
 * />
 *
 * @param {DynAvatarProps} props - Component props
 * @param {HTMLDivElement} ref - Forwarded ref
 * @returns {JSX.Element} Avatar component
 */
export const DynAvatar = forwardRef<DynAvatarRef, DynAvatarProps>(
  ({
    /* props */
  }, ref) => {
    /* implementation */
  }
);
```

### Task 2.2: Add JSDoc to Utility Functions (0.5 hour)

**File**: Same file

**Add to `generateInitials`**:

```tsx
/**
 * Generate initials from a name string
 *
 * Extracts up to 2 first letters from words, trimmed and uppercased.
 * Example: "John Doe" -> "JD", "Mary Jane Watson" -> "MW"
 *
 * @param {string} name - Full name to extract initials from
 * @returns {string} Initials (up to 2 characters)
 *
 * @example
 * generateInitials("John Doe") // "JD"
 * generateInitials("Alice") // "A"
 */
const generateInitials = (name: string): string => {
  /* implementation */
};
```

**Add to Handlers**:

```tsx
/**
 * Handle image load successfully
 * Updates state to show image and hide initials fallback
 */
const handleImageLoad = () => { /* ... */ };

/**
 * Handle image load error
 * Falls back to initials when image fails to load
 */
const handleImageError = () => { /* ... */ };

/**
 * Handle avatar click when interactive
 * Prevents bubbling and calls onClick prop if provided
 */
const handleClick = (event: React.MouseEvent<HTMLDivElement>) => { /* ... */ };

/**
 * Handle keyboard activation
 * Supports Enter and Space keys for accessibility
 */
const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => { /* ... */ };
```

### Task 2.3: Add Usage Examples (0.5 hour)

**File**: `docs/COMPONENT_EXAMPLES/DynAvatar_Examples.md` (Create new)

```markdown
# DynAvatar Examples

## Basic Usage

### With Initials
```tsx
<DynAvatar alt="John Doe" />
// Displays: "JD"
```

### With Image

```tsx
<DynAvatar
  src="/avatars/john.jpg"
  alt="John Doe"
/>
```

## Variants

### Sizes

```tsx
<DynAvatar alt="Test" size="xs" />
<DynAvatar alt="Test" size="sm" />
<DynAvatar alt="Test" size="md" />  {/* Default */}
<DynAvatar alt="Test" size="lg" />
<DynAvatar alt="Test" size="xl" />
```

### Shapes

```tsx
<DynAvatar alt="Test" shape="circle" />    {/* Default */}
<DynAvatar alt="Test" shape="square" />
<DynAvatar alt="Test" shape="rounded" />
```

### Status

```tsx
<DynAvatar alt="Test" status="online" />
<DynAvatar alt="Test" status="offline" />
<DynAvatar alt="Test" status="away" />
<DynAvatar alt="Test" status="busy" />
```

## States

### Loading

```tsx
<DynAvatar src="/avatar.jpg" alt="Loading" loading />
```

### Error

```tsx
<DynAvatar alt="Error" error />
```

## Interactive

```tsx
<DynAvatar
  src="/avatar.jpg"
  alt="Profile"
  onClick={() => navigate('/profile')}
/>
```

```

---

## 🎪 PHASE 3: OPTIONAL - Polish & Optimize (1 hour)

### Task 3.1: Improve Error Handling (0.5 hour)

**File**: `packages/dyn-ui-react/src/components/DynAvatar/DynAvatar.tsx`

**Current**:
```tsx
const [imageLoaded, setImageLoaded] = useState(false);
const [imageError, setImageError] = useState(false);
```

**Add**: Image load timeout

```tsx
const [imageLoaded, setImageLoaded] = useState(false);
const [imageError, setImageError] = useState(false);
const timeoutRef = useRef<NodeJS.Timeout>();

const handleImageLoad = useCallback(() => {
  if (timeoutRef.current) clearTimeout(timeoutRef.current);
  setImageLoaded(true);
  setImageError(false);
}, []);

const handleImageError = useCallback(() => {
  if (timeoutRef.current) clearTimeout(timeoutRef.current);
  setImageError(true);
  setImageLoaded(false);
}, []);

useEffect(() => {
  if (src && !imageLoaded && !imageError) {
    // Set 10 second timeout for image load
    timeoutRef.current = setTimeout(() => {
      setImageError(true);
      setImageLoaded(false);
    }, 10000);
  }

  return () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };
}, [src, imageLoaded, imageError]);
```

### Task 3.2: Optimize with useCallback (0.5 hour)

**Wrap functions**:

```tsx
import { useCallback } from 'react';

const handleImageLoad = useCallback(() => {
  // ...
}, []);

const handleImageError = useCallback(() => {
  // ...
}, []);

const handleClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
  // ...
}, [onClick]);

const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
  // ...
}, [onClick]);
```

---

## ✅ Testing After Each Phase

### After Phase 1

```bash
# Run tests to ensure CSS changes don't break components
npm test DynAvatar.test.tsx

# Check dark mode
# Visual test: Open component in dark mode browser
```

### After Phase 2

```bash
# Verify no TypeScript errors
npm run type-check

# Generate docs
npm run docs
```

### After Phase 3

```bash
# Full test suite
npm test

# Performance check
npm run performance

# Accessibility audit
npm run a11y-audit
```

---

## 📃 Summary

| Phase | Tasks | Time | Impact |
|-------|-------|------|--------|
| 1 | CSS tokens, remove unused classes | 2-3h | 72% → 82% |
| 2 | JSDoc, examples | 1-2h | 82% → 87% |
| 3 | Error handling, optimization | 1h | 87% → 90% |
| **Total** | **8 tasks** | **4-5h** | **72% → 87%+** |

---

## 🚀 Next Steps

1. ✅ Create a new branch: `feat/DynAvatar-refactor-tokens`
2. ✅ Apply Phase 1 fixes
3. ✅ Run tests
4. ✅ Apply Phase 2 fixes
5. ✅ Create PR with description
6. ✅ Request review
7. ✅ Deploy when approved

---

**Estimated Completion**: 4-5 hours
**Expected Result**: 85%+ (GOOD)
