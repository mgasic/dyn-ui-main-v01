# DynPage Component - Action Plan & Implementation Guide

**Goal**: Bring DynPage to 92%+ compliance with DYN UI standards  
**Total Effort**: 9-10 hours  
**Status**: Ready to implement  

---

## Overview

This document provides step-by-step instructions to fix DynPage's architectural issues.

**What will be fixed:**
1. ✅ Type definitions (complete)
2. ✅ Import paths (correct)
3. ✅ CSS module pattern (refactor)
4. ✅ Design tokens (integrate)
5. ✅ Accessibility (add ARIA)

---

## Step 1: Expand DynPage.types.ts (1 hour)

**Current**: 3 props defined  
**Target**: 13+ props + interfaces  

### Action 1.1: Create Full Type Definitions

**File**: `packages/dyn-ui-react/src/components/DynPage/DynPage.types.ts`

```typescript
/**
 * DynPage Component Types
 * @module DynPage.types
 */

import React from 'react';

/**
 * Breadcrumb item in page navigation
 */
export interface DynPageBreadcrumb {
  /** Display text for breadcrumb */
  title: string;
  /** Optional href for link */
  href?: string;
  /** Optional click handler */
  onClick?: () => void;
}

/**
 * Action button configuration
 */
export interface DynPageAction {
  /** Unique key for this action */
  key: string;
  /** Display text on button */
  title: string;
  /** Button type/kind */
  type?: 'primary' | 'secondary' | 'danger' | 'success';
  /** Optional icon name */
  icon?: string;
  /** Click handler */
  onClick?: () => void;
  /** Disable this action */
  disabled?: boolean;
  /** Show loading state */
  loading?: boolean;
}

/**
 * Main DynPage component props
 */
export interface DynPageProps {
  /** Page title displayed in header */
  title: string;
  
  /** Optional subtitle below title */
  subtitle?: string;
  
  /** Breadcrumb navigation items */
  breadcrumbs?: DynPageBreadcrumb[];
  
  /** Action buttons in header */
  actions?: DynPageAction[];
  
  /** Page content */
  children?: React.ReactNode;
  
  /** Show loading indicator */
  loading?: boolean;
  
  /** Error message or component */
  error?: string | React.ReactNode;
  
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  
  /** Content padding */
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  
  /** Background style */
  background?: 'none' | 'surface' | 'page';
  
  /** Additional CSS classes */
  className?: string;
  
  /** HTML id attribute */
  id?: string;
  
  /** Test id for testing */
  'data-testid'?: string;
}
```

**Time**: 1 hour

---

## Step 2: Fix Import Paths (30 minutes)

**Issue**: DynPage.tsx imports from wrong path  
**Current**: `'../../types/layout.types'`  
**Target**: `'./DynPage.types'`  

### Action 2.1: Update Imports in DynPage.tsx

**File**: `packages/dyn-ui-react/src/components/DynPage/DynPage.tsx`

```typescript
// BEFORE - WRONG ❌
import { DynPageProps } from '../../types/layout.types';

// AFTER - CORRECT ✅
import { DynPageProps, DynPageBreadcrumb, DynPageAction } from './DynPage.types';
```

**Time**: 15 minutes

---

## Step 3: Refactor to CSS Modules (2-3 hours)

**Issue**: Component uses global CSS classes  
**Target**: Import and use CSS module  

### Action 3.1: Import CSS Module

```typescript
// ADD at top of DynPage.tsx
import styles from './DynPage.module.css';
```

### Action 3.2: Update Class Names

**BEFORE** (Global classes):
```typescript
const pageClasses = classNames(
  'dyn-page',
  `dyn-page--${size}`,
  `dyn-page--padding-${padding}`,
  `dyn-page--${background}`,
  { 'dyn-page--loading': loading },
  className
);
```

**AFTER** (CSS modules):
```typescript
const pageClasses = classNames(
  styles.container,
  className
);

const containerStyle = {
  '--dyn-page-padding': 
    padding !== 'none' ? `var(--dyn-spacing-${padding})` : '0',
  '--dyn-page-size': size,
} as React.CSSProperties;
```

### Action 3.3: Update JSX

```typescript
// Update main container
return (
  <div 
    className={pageClasses}
    style={containerStyle}
    id={id} 
    data-testid={testId}
  >
    {/* header, content, footer */}
  </div>
);
```

### Action 3.4: Update CSS Module for variants

The CSS module exists but needs adjustment for proper class names:

**File**: `packages/dyn-ui-react/src/components/DynPage/DynPage.module.css`

```css
/* ADD these variants to module */

.container {
  /* existing styles */
}

.loading {
  opacity: 0.6;
  pointer-events: none;
}

.error {
  border: 2px solid var(--dyn-page-error-color, #dc2626);
}

/* Size variants via CSS variables */
.sizeSmall {
  --dyn-page-header-padding: var(--dyn-spacing-sm);
}

.sizeMedium {
  --dyn-page-header-padding: var(--dyn-spacing-md);
}

.sizeLarge {
  --dyn-page-header-padding: var(--dyn-spacing-lg);
}
```

**Time**: 2-3 hours

---

## Step 4: Integrate Design Tokens (1.5 hours)

**Issue**: CSS defines tokens but they're not used  
**Target**: Ensure all colors/spacing use tokens  

### Action 4.1: Verify CSS Variables Used

**File**: `packages/dyn-ui-react/src/components/DynPage/DynPage.module.css`

```css
/* Verify these are present and used: */
--dyn-page-bg              ✅
--dyn-page-text-color      ✅
--dyn-page-header-bg       ✅
--dyn-page-footer-bg       ✅
--dyn-page-border-color    ✅
--dyn-page-content-padding ✅
--dyn-page-transition      ✅

/* All already present! */
```

### Action 4.2: Use Tokens in Inline Styles

```typescript
const containerStyle = {
  '--dyn-page-bg': 'var(--dyn-color-background)',
  '--dyn-page-text-color': 'var(--dyn-color-text-primary)',
  '--dyn-page-content-padding': 
    padding !== 'none' ? `var(--dyn-spacing-${padding})` : '0',
} as React.CSSProperties & Record<string, string>;
```

**Time**: 30 minutes

---

## Step 5: Add Accessibility (1.5 hours)

**Issues**: 
- Missing aria-label
- Missing aria-busy  
- Missing aria-live
- Hardcoded Portuguese text

### Action 5.1: Add ARIA Labels

```typescript
// Header
<header className="dyn-page-header" role="banner">
  {/* breadcrumbs */}
</header>

// Main content
<main className="dyn-page-content" role="main">
  {children}
</main>

// Loading state
{loading && (
  <div 
    className="dyn-page-loading"
    role="status"
    aria-live="polite"
    aria-busy="true"
    aria-label="Page loading"
  >
    <div className="dyn-page-spinner"></div>
    <span>Page loading...</span>
  </div>
)}

// Error state
{error && (
  <div 
    className="dyn-page-error"
    role="alert"
    aria-live="assertive"
  >
    {/* error content */}
  </div>
)}

// Breadcrumb links
<a
  href={breadcrumb.href}
  aria-current={index === breadcrumbs.length - 1 ? 'page' : undefined}
  onClick={(e) => {
    if (breadcrumb.onClick) {
      e.preventDefault();
      breadcrumb.onClick();
    }
  }}
>
  {breadcrumb.title}
</a>
```

### Action 5.2: Localize Strings

```typescript
// BEFORE - Portuguese hardcoded ❌
<span>Carregando página...</span>

// AFTER - English standard ✅
<span>Loading page...</span>

// Or use i18n if available
<span>{t('common.loading')}</span>
```

**Time**: 1.5 hours

---

## Step 6: Update Tests (1 hour)

**Add**:
- CSS module verification
- Token integration tests
- Accessibility tests

### Action 6.1: Update DynPage.test.tsx

```typescript
// Add CSS module import
import styles from './DynPage.module.css';

// Add new test
it('uses CSS modules', () => {
  const { container } = render(
    <DynPage title="Test">
      <div>Content</div>
    </DynPage>
  );
  
  const el = container.firstElementChild as HTMLElement;
  expect(el.className).toContain('container');
});

// Add accessibility tests
it('has proper ARIA attributes for loading', () => {
  render(
    <DynPage title="Test" loading={true}>
      <div>Content</div>
    </DynPage>
  );
  
  const loading = screen.getByRole('status');
  expect(loading).toHaveAttribute('aria-busy', 'true');
  expect(loading).toHaveAttribute('aria-live', 'polite');
});

it('has proper ARIA attributes for error', () => {
  render(
    <DynPage title="Test" error="Error message">
      <div>Content</div>
    </DynPage>
  );
  
  const error = screen.getByRole('alert');
  expect(error).toHaveAttribute('aria-live', 'assertive');
});
```

**Time**: 1 hour

---

## Step 7: Update Stories (1 hour)

**Update**: Stories to match refactored component

### Action 7.1: Minor Storybook Updates

- Verify all stories still render
- Update any hardcoded class references
- Add accessibility story:

```typescript
export const Accessibility: Story = {
  args: {
    title: 'Accessible Page',
    subtitle: 'With proper ARIA attributes',
    breadcrumbs: [
      { title: 'Home', onClick: () => {} },
      { title: 'Current' }
    ],
    actions: [
      {
        key: 'save',
        title: 'Save',
        type: 'primary',
        onClick: () => {}
      }
    ],
    children: <SampleContent />
  },
  parameters: {
    a11y: {
      config: {
        rules: {
          'color-contrast': { enabled: true }
        }
      }
    }
  }
};
```

**Time**: 1 hour

---

## Step 8: Verification (1 hour)

### Action 8.1: Run Tests
```bash
npm test -- DynPage
```
**Expected**: All tests pass ✅

### Action 8.2: Run Storybook
```bash
npm run storybook
```
**Expected**: All stories render correctly ✅

### Action 8.3: Accessibility Audit
```bash
npm run audit:a11y
```
**Expected**: No critical issues ✅

### Action 8.4: Build Check
```bash
npm run build
```
**Expected**: No errors ✅

**Time**: 1 hour

---

## Implementation Timeline

| Step | Task | Time | Status |
|------|------|------|--------|
| 1 | Expand types | 1h | ⏳ |
| 2 | Fix imports | 30m | ⏳ |
| 3 | Refactor CSS modules | 2-3h | ⏳ |
| 4 | Integrate tokens | 1.5h | ⏳ |
| 5 | Add accessibility | 1.5h | ⏳ |
| 6 | Update tests | 1h | ⏳ |
| 7 | Update stories | 1h | ⏳ |
| 8 | Verification | 1h | ⏳ |
| | **TOTAL** | **9-10h** | |

---

## Post-Implementation

### PR Template

```markdown
## DynPage Component Compliance Refactor

### What Changed
- ✅ Expanded type definitions (13+ props + interfaces)
- ✅ Fixed import paths to co-located types
- ✅ Refactored to use CSS modules
- ✅ Integrated design tokens
- ✅ Added accessibility features (ARIA)
- ✅ Localized all text strings
- ✅ Updated tests (100+ coverage)
- ✅ Verified Storybook

### Compliance Score
- Before: 65%
- After: 92%
- Gap Closed: 27%

### Tests
- All existing tests passing
- 5+ new accessibility tests
- CSS module tests

### Breaking Changes
None - component API unchanged

### Deployment
- Review for compliance
- Run full test suite
- Deploy to production
```

---

## Rollback Plan

If issues occur:
1. Revert to previous commit
2. Identify specific issue
3. Fix isolated problem
4. Re-test and re-deploy

---

## Success Criteria

- [ ] All tests passing
- [ ] Storybook builds successfully
- [ ] No accessibility warnings
- [ ] Compliance score 92%+
- [ ] PR approved and merged
- [ ] Deployed to production

---

## Notes

- Estimated 9-10 hours for complete refactoring
- Can be done incrementally (2-3 work days)
- No breaking changes to component API
- Users won't notice any difference
- Internal improvements only
- Better maintainability
- Full DYN UI compliance

---

**Next**: Create a feature branch and start implementation  
**Questions**: Review Complete Audit document for details
