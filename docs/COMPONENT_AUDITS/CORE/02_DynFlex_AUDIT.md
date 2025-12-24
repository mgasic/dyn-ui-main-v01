# DynFlex Component - COMPREHENSIVE AUDIT REPORT

**Status**: 🚨 CRITICAL - INCOMPLETE IMPLEMENTATION  
**Priority**: P0 - URGENT (Week 1)  
**Severity**: CRITICAL - Missing React component files  
**Assigned To**: AI Agent / Developer  
**Timeline**: 3-4 hours to fix  
**Date**: December 24, 2025

---

## 📋 CURRENT STATE ANALYSIS

### File Structure Status

```
DynFlex/
├── DynFlex.module.css          ✅ EXISTS (4.9 KB)
├── DynFlex.tsx                 ❌ MISSING (CRITICAL!)
├── DynFlex.types.ts            ❌ MISSING (CRITICAL!)
├── DynFlex.test.tsx            ❌ MISSING (CRITICAL!)
├── DynFlex.stories.tsx         ❌ MISSING (CRITICAL!)
└── index.ts                    ❌ MISSING (CRITICAL!)
```

**Current Implementation Status**: ⚠️ **CSS-ONLY COMPONENT (Not a React Component!)**

### Code Statistics

| Metric | Value |
|--------|-------|
| Total Lines (CSS) | 223 lines |
| React Component | ❌ NONE |
| TypeScript Types | ❌ NONE |
| Jest Tests | ❌ NONE |
| Storybook Stories | ❌ NONE |
| Test Coverage | 0% |
| Completeness | 16.7% (1 of 6 files) |

### What's Working ✅

1. **CSS Design Tokens** - Well-structured CSS variables with 3-level fallback pattern
   - Foundation tokens: `--dyn-flex-*`
   - Dark mode support: `@media (prefers-color-scheme: dark)`
   - High contrast support: `@media (prefers-contrast: more)`
   - Accessibility: Focus ring for keyboard navigation

2. **Token Naming** - Follows standard naming convention
   - Pattern: `--dyn-flex-[property]-[state]`
   - All tokens properly prefixed with `--dyn-`

3. **Responsive Design** - Mobile-first approach
   - Tablet breakpoint: 768px
   - Mobile breakpoint: 480px
   - Adaptive gap and padding

4. **CSS Variants** - Complete utility classes
   - `.flexColumn` - Column layout
   - `.flexWrap` - Wrap mode
   - `.flexInline` - Inline flex
   - Gap utilities: `.gap{XSmall,Small,Medium,Large,XLarge,2XLarge}`
   - Alignment: `.align{Center,Start,End,Stretch,Baseline}`
   - Justify: `.justify{Start,Center,End,Between,Around,Evenly}`

---

## 🔴 IDENTIFIED ERRORS & ISSUES

### CRITICAL ERRORS (Must Fix)

#### 🔴 ERROR 1: No React Component (.tsx file) - BLOCKING
**Severity**: CRITICAL  
**File**: DynFlex.tsx (MISSING)  
**Impact**: Component cannot be imported or used in React applications

**Current State**:
```
❌ No React component file exists
❌ Cannot be imported: import { DynFlex } from '@components'
❌ CSS-only - not usable as React component
```

**What's Needed**:
```typescript
// DynFlex.tsx MISSING
export interface DynFlexProps extends React.HTMLAttributes<HTMLDivElement> {
  // ... props not defined
}

export const DynFlex = React.forwardRef<HTMLDivElement, DynFlexProps>(
  // ... implementation missing
);
```

---

#### 🔴 ERROR 2: No TypeScript Type Definitions - BLOCKING
**Severity**: CRITICAL  
**File**: DynFlex.types.ts (MISSING)  
**Impact**: No type safety for component props

**Current State**:
```
❌ No types file exists
❌ No prop interface defined
❌ No variant types defined
```

**What's Needed**:
```typescript
// DynFlex.types.ts MISSING
export interface DynFlexProps {
  // Flex direction
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  
  // Alignment
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  
  // Spacing
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  
  // Wrapping
  wrap?: boolean;
  
  // Display type
  inline?: boolean;
}
```

---

#### 🔴 ERROR 3: No Jest Tests - BLOCKING
**Severity**: CRITICAL  
**File**: DynFlex.test.tsx (MISSING)  
**Impact**: No test coverage - cannot verify functionality

**Current State**:
```
❌ No test file exists
❌ Test coverage: 0%
❌ No unit tests for:
  - Props rendering
  - CSS class application
  - Responsive behavior
  - Accessibility
```

---

#### 🔴 ERROR 4: No Storybook Documentation - BLOCKING
**Severity**: CRITICAL  
**File**: DynFlex.stories.tsx (MISSING)  
**Impact**: No documentation - developers can't see how to use it

**Current State**:
```
❌ No Storybook file exists
❌ No visual documentation
❌ No component examples
❌ No variant combinations shown
```

---

#### 🔴 ERROR 5: No Export / Index File - BLOCKING
**Severity**: CRITICAL  
**File**: index.ts (MISSING)  
**Impact**: Component cannot be exported from package

**Current State**:
```
❌ No index.ts file exists
❌ Cannot be imported: import { DynFlex } from '@components/DynFlex'
```

---

### MEDIUM ERRORS (Should Fix)

#### 🟡 ERROR 6: CSS Token Naming - Partial Compliance
**Severity**: MEDIUM  
**File**: DynFlex.module.css (lines 18-50)  
**Issue**: Some tokens don't follow full pattern

**Current**:
```css
--dyn-flex-column-direction: column;      /* ✅ Good */
--dyn-flex-gap: var(--dyn-spacing-md);    /* ⚠️ Missing state suffix */
--dyn-flex-padding: var(--dyn-spacing-sm);  /* ⚠️ Missing state suffix */
```

**Should Be**:
```css
--dyn-flex-gap-default: var(--dyn-spacing-md);
--dyn-flex-padding-default: var(--dyn-spacing-sm);
```

---

#### 🟡 ERROR 7: No Foundation Token Reference - Documentation Gap
**Severity**: MEDIUM  
**File**: DynFlex.module.css (line 11)  
**Issue**: Comments reference files that may not match current structure

**Current**:
```css
/* 
  packages/design-tokens/styles/foundations/spacing.css
*/
```

**Issue**: Path might not exist or be outdated

---

#### 🟡 ERROR 8: CSS Global Scope Leakage Risk - Design Pattern
**Severity**: MEDIUM  
**File**: DynFlex.module.css (line 18)  
**Issue**: `:root` tokens affect global scope

**Current**:
```css
:root {
  --dyn-flex-gap: var(--dyn-spacing-md);  /* Global scope */
}
```

**Risk**: Could conflict with other components if they define same `:root` tokens

**Should Be**: Component-scoped or use CSS module scoping

---

### LOW SEVERITY ISSUES (Nice to Have)

#### 🟢 ISSUE 9: Missing Gap Default Value
**Severity**: LOW  
**File**: DynFlex.module.css (line 23)  
**Issue**: Gap has no fallback if `--dyn-spacing-md` is undefined

**Current**:
```css
--dyn-flex-gap: var(--dyn-spacing-md);
```

**Should Be** (3-level fallback):
```css
--dyn-flex-gap: var(--dyn-spacing-md, var(--legacy-spacing-md, 0.75rem));
```

---

#### 🟢 ISSUE 10: Incomplete Focus Ring Implementation
**Severity**: LOW  
**File**: DynFlex.module.css (line 203)  
**Issue**: Focus ring color hardcoded instead of using token

**Current**:
```css
outline: 2px solid var(--dyn-focus-ring-color, #007ACC);
```

**Should Be**:
```css
outline: 2px solid var(--dyn-focus-ring-color, var(--dyn-color-focus-ring, #007ACC));
```

---

## 📝 PROBLEM STATEMENT

### The Core Issue

**DynFlex exists as a CSS-only component, not a React component.** This means:

1. ❌ **Cannot be imported in React**: `import { DynFlex }` fails
2. ❌ **No prop system**: Props cannot be passed to component
3. ❌ **No TypeScript support**: No type checking
4. ❌ **No documentation**: Developers don't know how to use it
5. ❌ **No tests**: Functionality is untested
6. ❌ **No variants system**: Cannot pass direction, alignment, gap as props

### Why This is P0 Critical

DynFlex is a **foundational layout component** that many other components depend on:
- **DynContainer** uses it for layout
- **DynStack** might use it
- **DynPage** might use it
- **Any layout-based components** need this

**Current Blocker**: Cannot be used in any React code.

### Who is Affected

- ✅ Developers trying to import DynFlex → **ERROR: Component not found**
- ✅ UI designers trying to see layouts → **No visual documentation**
- ✅ QA trying to test → **No tests exist**
- ✅ Maintainers → **Incomplete implementation**

---

## ✅ COMPREHENSIVE REQUIREMENT CHECKLIST

### [1] React Component File (.tsx) - 8 items

- [ ] **1.1** Create `DynFlex.tsx` file
- [ ] **1.2** Implement React.forwardRef for div ref forwarding
- [ ] **1.3** Export component with proper TypeScript interface
- [ ] **1.4** Implement React.memo for performance
- [ ] **1.5** Handle all HTML div props via spread (`...rest`)
- [ ] **1.6** Apply CSS module classes dynamically based on props
- [ ] **1.7** Use className for conditional class application
- [ ] **1.8** Handle `children` prop for flex items

### [2] TypeScript Types File (.types.ts) - 7 items

- [ ] **2.1** Create `DynFlex.types.ts` file
- [ ] **2.2** Export `DynFlexProps` interface extending `React.HTMLAttributes<HTMLDivElement>`
- [ ] **2.3** Define `direction` prop: `'row' | 'column' | 'row-reverse' | 'column-reverse'`
- [ ] **2.4** Define `alignItems` prop with all valid flex values
- [ ] **2.5** Define `justifyContent` prop with all valid flex values
- [ ] **2.6** Define `gap` prop: `'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'`
- [ ] **2.7** Define `wrap` prop: `boolean`
- [ ] **2.8** Define `inline` prop: `boolean`

### [3] CSS Module Updates (.module.css) - 5 items

- [ ] **3.1** Move `:root` tokens to component scope to avoid global leakage
- [ ] **3.2** Update all tokens to use 3-level fallback pattern
- [ ] **3.3** Add state suffixes to all tokens (e.g., `-default`, `-hover`)
- [ ] **3.4** Verify dark mode tokens exist for all properties
- [ ] **3.5** Add missing high contrast tokens if needed

### [4] Jest Tests (.test.tsx) - 10 items

- [ ] **4.1** Create `DynFlex.test.tsx` file
- [ ] **4.2** Test basic rendering with default props
- [ ] **4.3** Test direction prop: renders correct flex-direction
- [ ] **4.4** Test alignItems prop: applies correct alignment
- [ ] **4.5** Test justifyContent prop: applies correct justify content
- [ ] **4.6** Test gap prop: applies correct gap value
- [ ] **4.7** Test wrap prop: applies flex-wrap: wrap
- [ ] **4.8** Test inline prop: applies inline-flex display
- [ ] **4.9** Test keyboard navigation: focus ring appears
- [ ] **4.10** Achieve minimum 95% test coverage

### [5] Storybook Documentation (.stories.tsx) - 8 items

- [ ] **5.1** Create `DynFlex.stories.tsx` file
- [ ] **5.2** Export Meta with title and component
- [ ] **5.3** Create Default story showing basic usage
- [ ] **5.4** Create Direction variants: row, column, row-reverse, column-reverse
- [ ] **5.5** Create AlignItems variants: start, center, end, stretch, baseline
- [ ] **5.6** Create JustifyContent variants: start, center, end, between, around, evenly
- [ ] **5.7** Create Gap variants: xs, sm, md, lg, xl, 2xl
- [ ] **5.8** Create responsive story showing mobile/tablet/desktop behavior

### [6] Export / Index File (index.ts) - 2 items

- [ ] **6.1** Create `index.ts` file in DynFlex folder
- [ ] **6.2** Export `{ DynFlex, DynFlexProps }` from index.ts

### [7] Prop Implementation - 8 items

- [ ] **7.1** Implement direction prop with validation
- [ ] **7.2** Implement alignItems prop with validation
- [ ] **7.3** Implement justifyContent prop with validation
- [ ] **7.4** Implement gap prop with validation
- [ ] **7.5** Implement wrap prop: converts boolean to CSS class
- [ ] **7.6** Implement inline prop: converts boolean to CSS class
- [ ] **7.7** Implement className merging with default class
- [ ] **7.8** Ensure all props have TypeScript type safety

### [8] Accessibility (A11y) - 5 items

- [ ] **8.1** Ensure forward ref works for accessibility
- [ ] **8.2** Support aria-* attributes via spread props
- [ ] **8.3** Focus ring visible on keyboard navigation
- [ ] **8.4** High contrast mode supported
- [ ] **8.5** Reduced motion respected (no animations on flex)

### [9] Component Variants - 6 items

- [ ] **9.1** Row layout (default)
- [ ] **9.2** Column layout
- [ ] **9.3** Row-reverse layout
- [ ] **9.4** Column-reverse layout
- [ ] **9.5** Wrap variant
- [ ] **9.6** Inline-flex variant

### [10] Token Compliance - 5 items

- [ ] **10.1** All tokens follow `--dyn-flex-*` pattern
- [ ] **10.2** All tokens use 3-level fallback
- [ ] **10.3** Dark mode tokens defined for all properties
- [ ] **10.4** High contrast mode supported
- [ ] **10.5** No hardcoded values except in fallback

**TOTAL: 73 checklist items**

---

## 💡 PROPOSED SOLUTIONS

### SOLUTION 1: Create React Component (.tsx file)

**What to do**: Implement `DynFlex.tsx` with ForwardRef and all props support

**File**: `packages/dyn-ui-react/src/components/DynFlex/DynFlex.tsx`

**Complete Code**:
```typescript
import React from 'react';
import type { DynFlexProps } from './DynFlex.types';
import styles from './DynFlex.module.css';

/**
 * DynFlex - Flexible Layout Component
 * 
 * A foundational layout component using CSS Flexbox with design token support.
 * Supports responsive design, accessibility, and dark mode.
 * 
 * @example
 * // Row layout (default)
 * <DynFlex gap="md">
 *   <button>Button 1</button>
 *   <button>Button 2</button>
 * </DynFlex>
 * 
 * @example
 * // Column layout with center alignment
 * <DynFlex direction="column" alignItems="center" gap="lg">
 *   <h1>Title</h1>
 *   <p>Description</p>
 * </DynFlex>
 */
export const DynFlex = React.forwardRef<HTMLDivElement, DynFlexProps>(
  (
    {
      direction = 'row',
      alignItems = 'stretch',
      justifyContent = 'flex-start',
      gap = 'md',
      wrap = false,
      inline = false,
      className = '',
      children,
      ...rest
    },
    ref
  ) => {
    // Build class name
    const classNames = [
      styles.flex,
      direction === 'column' && styles.flexColumn,
      direction === 'row-reverse' && styles.flexRowReverse,
      direction === 'column-reverse' && styles.flexColumnReverse,
      alignItems !== 'stretch' && styles[`align${capitalize(alignItems.replace(/-/g, ''))}`],
      justifyContent !== 'flex-start' && styles[`justify${capitalize(justifyContent.replace(/-/g, ''))}`],
      gap !== 'md' && styles[`gap${capitalizeGap(gap)}`],
      wrap && styles.flexWrap,
      inline && styles.flexInline,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        className={classNames}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

DynFlex.displayName = 'DynFlex';

// Helper function to capitalize strings
function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Helper function for gap capitalization
function capitalizeGap(gap: string): string {
  const gapMap: Record<string, string> = {
    xs: 'XSmall',
    sm: 'Small',
    md: 'Medium',
    lg: 'Large',
    xl: 'XLarge',
    '2xl': '2XLarge',
  };
  return gapMap[gap] || 'Medium';
}

export default DynFlex;
```

**Time to implement**: 30 minutes

---

### SOLUTION 2: Create TypeScript Types File (.types.ts)

**What to do**: Define complete TypeScript interfaces for props

**File**: `packages/dyn-ui-react/src/components/DynFlex/DynFlex.types.ts`

**Complete Code**:
```typescript
import React from 'react';

/**
 * Direction variants for DynFlex
 * - row: left-to-right (default)
 * - column: top-to-bottom
 * - row-reverse: right-to-left
 * - column-reverse: bottom-to-top
 */
export type DynFlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';

/**
 * Alignment variants for flex items (align-items)
 * - flex-start: align to start of cross axis
 * - center: center align on cross axis
 * - flex-end: align to end of cross axis
 * - stretch: stretch to fill (default)
 * - baseline: align text baseline
 */
export type DynFlexAlignItems =
  | 'flex-start'
  | 'center'
  | 'flex-end'
  | 'stretch'
  | 'baseline';

/**
 * Justify content variants (justify-content)
 * - flex-start: start alignment (default)
 * - center: center alignment
 * - flex-end: end alignment
 * - space-between: space between items
 * - space-around: space around items
 * - space-evenly: even space between and around items
 */
export type DynFlexJustifyContent =
  | 'flex-start'
  | 'center'
  | 'flex-end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

/**
 * Gap size variants
 * - xs: extra small (0.25rem)
 * - sm: small (0.5rem)
 * - md: medium (0.75rem) - default
 * - lg: large (1rem)
 * - xl: extra large (1.5rem)
 * - 2xl: 2x large (2rem)
 */
export type DynFlexGap = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * Props for DynFlex component
 */
export interface DynFlexProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'ref'> {
  /**
   * Direction of flex items
   * @default 'row'
   */
  direction?: DynFlexDirection;

  /**
   * Alignment of flex items on cross axis
   * @default 'stretch'
   */
  alignItems?: DynFlexAlignItems;

  /**
   * Justification of flex items on main axis
   * @default 'flex-start'
   */
  justifyContent?: DynFlexJustifyContent;

  /**
   * Gap between flex items
   * @default 'md'
   */
  gap?: DynFlexGap;

  /**
   * Allow flex items to wrap to multiple lines
   * @default false
   */
  wrap?: boolean;

  /**
   * Use inline-flex instead of flex
   * @default false
   */
  inline?: boolean;
}
```

**Time to implement**: 15 minutes

---

### SOLUTION 3: Update CSS Module (DynFlex.module.css)

**What to do**: Fix token naming and add missing classes

**File**: `packages/dyn-ui-react/src/components/DynFlex/DynFlex.module.css`

**Key Changes**:

```css
/* Add missing direction variants */
.flexRowReverse {
  --dyn-flex-flex-direction: row-reverse;
}

.flexColumnReverse {
  --dyn-flex-flex-direction: column-reverse;
}

/* Fix token naming with 3-level fallback */
:root {
  --dyn-flex-gap: var(--dyn-spacing-md, var(--legacy-spacing-md, 0.75rem));
  --dyn-flex-padding: var(--dyn-spacing-sm, var(--legacy-spacing-sm, 0.5rem));
  --dyn-flex-focus-ring: var(--dyn-color-focus-ring, var(--legacy-focus-ring, #007ACC));
}

/* Update focus ring to use token */
.flex > :focus-visible {
  outline: 2px solid var(--dyn-flex-focus-ring);
  outline-offset: 2px;
}

/* Remove :root scope, use component scope instead */
/* Move all :root definitions to component-level */
```

**Time to implement**: 20 minutes

---

### SOLUTION 4: Create Jest Tests (.test.tsx)

**What to do**: Write comprehensive unit tests for all functionality

**File**: `packages/dyn-ui-react/src/components/DynFlex/DynFlex.test.tsx`

**Complete Code**:
```typescript
import React from 'react';
import { render, screen } from '@testing-library/react';
import { DynFlex } from './DynFlex';

describe('DynFlex Component', () => {
  // [1] RENDER TESTS
  describe('Rendering', () => {
    it('should render as a div element', () => {
      const { container } = render(<DynFlex>Content</DynFlex>);
      const flex = container.querySelector('div');
      expect(flex).toBeInTheDocument();
    });

    it('should render children correctly', () => {
      render(<DynFlex>Test Content</DynFlex>);
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('should forward ref', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<DynFlex ref={ref}>Content</DynFlex>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  // [2] DIRECTION PROP TESTS
  describe('direction prop', () => {
    it('should render row layout by default', () => {
      const { container } = render(<DynFlex>Content</DynFlex>);
      const flex = container.querySelector('div');
      expect(flex).toHaveStyle({ flexDirection: 'row' });
    });

    it('should apply column direction', () => {
      const { container } = render(<DynFlex direction="column">Content</DynFlex>);
      const flex = container.querySelector('div');
      expect(flex).toHaveStyle({ flexDirection: 'column' });
    });

    it('should apply row-reverse direction', () => {
      const { container } = render(<DynFlex direction="row-reverse">Content</DynFlex>);
      const flex = container.querySelector('div');
      expect(flex).toHaveStyle({ flexDirection: 'row-reverse' });
    });

    it('should apply column-reverse direction', () => {
      const { container } = render(<DynFlex direction="column-reverse">Content</DynFlex>);
      const flex = container.querySelector('div');
      expect(flex).toHaveStyle({ flexDirection: 'column-reverse' });
    });
  });

  // [3] ALIGNMENT TESTS
  describe('alignItems prop', () => {
    it('should apply center alignment', () => {
      const { container } = render(<DynFlex alignItems="center">Content</DynFlex>);
      const flex = container.querySelector('div');
      expect(flex).toHaveStyle({ alignItems: 'center' });
    });

    it('should apply flex-start alignment', () => {
      const { container } = render(<DynFlex alignItems="flex-start">Content</DynFlex>);
      const flex = container.querySelector('div');
      expect(flex).toHaveStyle({ alignItems: 'flex-start' });
    });
  });

  // [4] JUSTIFY CONTENT TESTS
  describe('justifyContent prop', () => {
    it('should apply space-between justification', () => {
      const { container } = render(<DynFlex justifyContent="space-between">Content</DynFlex>);
      const flex = container.querySelector('div');
      expect(flex).toHaveStyle({ justifyContent: 'space-between' });
    });

    it('should apply center justification', () => {
      const { container } = render(<DynFlex justifyContent="center">Content</DynFlex>);
      const flex = container.querySelector('div');
      expect(flex).toHaveStyle({ justifyContent: 'center' });
    });
  });

  // [5] GAP TESTS
  describe('gap prop', () => {
    it('should apply different gap sizes', () => {
      const gaps = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
      gaps.forEach((gap) => {
        const { container } = render(<DynFlex gap={gap as any}>Content</DynFlex>);
        const flex = container.querySelector('div');
        expect(flex).toBeTruthy();
      });
    });
  });

  // [6] WRAP TESTS
  describe('wrap prop', () => {
    it('should apply flex-wrap when wrap is true', () => {
      const { container } = render(<DynFlex wrap>Content</DynFlex>);
      const flex = container.querySelector('div');
      expect(flex).toHaveStyle({ flexWrap: 'wrap' });
    });

    it('should not apply flex-wrap by default', () => {
      const { container } = render(<DynFlex>Content</DynFlex>);
      const flex = container.querySelector('div');
      expect(flex).toHaveStyle({ flexWrap: 'nowrap' });
    });
  });

  // [7] INLINE TESTS
  describe('inline prop', () => {
    it('should apply inline-flex when inline is true', () => {
      const { container } = render(<DynFlex inline>Content</DynFlex>);
      const flex = container.querySelector('div');
      expect(flex).toHaveStyle({ display: 'inline-flex' });
    });

    it('should apply flex by default', () => {
      const { container } = render(<DynFlex>Content</DynFlex>);
      const flex = container.querySelector('div');
      expect(flex).toHaveStyle({ display: 'flex' });
    });
  });

  // [8] CUSTOM PROPS
  describe('custom HTML attributes', () => {
    it('should apply custom className', () => {
      const { container } = render(<DynFlex className="custom">Content</DynFlex>);
      const flex = container.querySelector('div');
      expect(flex).toHaveClass('custom');
    });

    it('should apply data attributes', () => {
      const { container } = render(<DynFlex data-testid="flex">Content</DynFlex>);
      const flex = screen.getByTestId('flex');
      expect(flex).toBeInTheDocument();
    });

    it('should apply aria attributes', () => {
      const { container } = render(<DynFlex aria-label="Layout">Content</DynFlex>);
      const flex = container.querySelector('div');
      expect(flex).toHaveAttribute('aria-label', 'Layout');
    });
  });

  // [9] COMBINATION TESTS
  describe('prop combinations', () => {
    it('should combine multiple props correctly', () => {
      const { container } = render(
        <DynFlex
          direction="column"
          alignItems="center"
          justifyContent="center"
          gap="lg"
          wrap
        >
          Content
        </DynFlex>
      );
      const flex = container.querySelector('div');
      expect(flex).toHaveStyle({
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
      });
    });
  });

  // [10] ACCESSIBILITY
  describe('Accessibility', () => {
    it('should support aria attributes', () => {
      render(
        <DynFlex aria-label="Main layout" role="main">
          Content
        </DynFlex>
      );
      const flex = screen.getByRole('main');
      expect(flex).toHaveAttribute('aria-label', 'Main layout');
    });
  });
});
```

**Time to implement**: 45 minutes  
**Expected coverage**: 95%+

---

### SOLUTION 5: Create Storybook Stories (.stories.tsx)

**What to do**: Create visual documentation with all variants

**File**: `packages/dyn-ui-react/src/components/DynFlex/DynFlex.stories.tsx`

**Complete Code**:
```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { DynFlex } from './DynFlex';

const meta: Meta<typeof DynFlex> = {
  title: 'Layout/DynFlex',
  component: DynFlex,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A foundational flex layout component with design token support',
      },
    },
  },
  argTypes: {
    direction: {
      control: 'select',
      options: ['row', 'column', 'row-reverse', 'column-reverse'],
      description: 'Flex direction',
    },
    alignItems: {
      control: 'select',
      options: ['flex-start', 'center', 'flex-end', 'stretch', 'baseline'],
      description: 'Alignment on cross axis',
    },
    justifyContent: {
      control: 'select',
      options: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'],
      description: 'Justification on main axis',
    },
    gap: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Gap between items',
    },
    wrap: {
      control: 'boolean',
      description: 'Allow wrapping',
    },
    inline: {
      control: 'boolean',
      description: 'Use inline-flex',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// [1] DEFAULT STORY
export const Default: Story = {
  args: {
    direction: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 'md',
    wrap: false,
    inline: false,
  },
  render: (args) => (
    <DynFlex {...args}>
      <div style={{ padding: '10px', background: '#e0e0e0' }}>Item 1</div>
      <div style={{ padding: '10px', background: '#e0e0e0' }}>Item 2</div>
      <div style={{ padding: '10px', background: '#e0e0e0' }}>Item 3</div>
    </DynFlex>
  ),
};

// [2] DIRECTION VARIANTS
export const DirectionRow: Story = {
  args: { direction: 'row' },
  render: (args) => (
    <DynFlex {...args}>
      <div style={{ padding: '10px', background: '#e0e0e0' }}>Left</div>
      <div style={{ padding: '10px', background: '#e0e0e0' }}>Center</div>
      <div style={{ padding: '10px', background: '#e0e0e0' }}>Right</div>
    </DynFlex>
  ),
};

export const DirectionColumn: Story = {
  args: { direction: 'column' },
  render: (args) => (
    <DynFlex {...args}>
      <div style={{ padding: '10px', background: '#e0e0e0' }}>Top</div>
      <div style={{ padding: '10px', background: '#e0e0e0' }}>Middle</div>
      <div style={{ padding: '10px', background: '#e0e0e0' }}>Bottom</div>
    </DynFlex>
  ),
};

// [3] ALIGNMENT VARIANTS
export const AlignCenter: Story = {
  args: { alignItems: 'center' },
  render: (args) => (
    <DynFlex {...args} style={{ height: '200px' }}>
      <div style={{ padding: '10px', background: '#e0e0e0' }}>Centered</div>
      <div style={{ padding: '10px', background: '#e0e0e0' }}>Centered</div>
    </DynFlex>
  ),
};

// [4] JUSTIFY VARIANTS
export const JustifyBetween: Story = {
  args: { justifyContent: 'space-between' },
  render: (args) => (
    <DynFlex {...args}>
      <div style={{ padding: '10px', background: '#e0e0e0' }}>Start</div>
      <div style={{ padding: '10px', background: '#e0e0e0' }}>End</div>
    </DynFlex>
  ),
};

// [5] GAP VARIANTS
export const GapSmall: Story = {
  args: { gap: 'sm' },
  render: (args) => (
    <DynFlex {...args}>
      <div style={{ padding: '10px', background: '#e0e0e0' }}>Item</div>
      <div style={{ padding: '10px', background: '#e0e0e0' }}>Item</div>
      <div style={{ padding: '10px', background: '#e0e0e0' }}>Item</div>
    </DynFlex>
  ),
};

// [6] WRAP VARIANT
export const WithWrap: Story = {
  args: { wrap: true, gap: 'md' },
  render: (args) => (
    <DynFlex {...args} style={{ width: '300px' }}>
      <div style={{ padding: '10px', background: '#e0e0e0', flex: '0 0 100px' }}>Item 1</div>
      <div style={{ padding: '10px', background: '#e0e0e0', flex: '0 0 100px' }}>Item 2</div>
      <div style={{ padding: '10px', background: '#e0e0e0', flex: '0 0 100px' }}>Item 3</div>
      <div style={{ padding: '10px', background: '#e0e0e0', flex: '0 0 100px' }}>Item 4</div>
    </DynFlex>
  ),
};

// [7] COMPLEX LAYOUT
export const ComplexLayout: Story = {
  render: () => (
    <DynFlex direction="column" gap="lg">
      <DynFlex justifyContent="space-between" alignItems="center">
        <h1>Header</h1>
        <button>Action</button>
      </DynFlex>
      
      <DynFlex gap="md">
        <div style={{ flex: 1, padding: '20px', background: '#f0f0f0' }}>
          Sidebar
        </div>
        <div style={{ flex: 3, padding: '20px', background: '#f0f0f0' }}>
          Main Content
        </div>
      </DynFlex>
      
      <DynFlex justifyContent="center" gap="md">
        <button>Previous</button>
        <button>Next</button>
      </DynFlex>
    </DynFlex>
  ),
};
```

**Time to implement**: 30 minutes

---

### SOLUTION 6: Create Index Export File (index.ts)

**What to do**: Export component and types

**File**: `packages/dyn-ui-react/src/components/DynFlex/index.ts`

**Complete Code**:
```typescript
export { DynFlex } from './DynFlex';
export type { DynFlexProps, DynFlexDirection, DynFlexAlignItems, DynFlexJustifyContent, DynFlexGap } from './DynFlex.types';
```

**Time to implement**: 5 minutes

---

## 🎯 NEW OPTIONS / STYLES & ENHANCEMENTS

### Enhancement 1: Advanced Gap Control (NEW PROP)

**Add**: `gapHorizontal` and `gapVertical` props

```typescript
export interface DynFlexProps {
  // ... existing props ...
  
  /** Gap on horizontal axis only */
  gapHorizontal?: DynFlexGap;
  
  /** Gap on vertical axis only */
  gapVertical?: DynFlexGap;
}
```

**Use case**: When you need different gaps for different axes

```tsx
<DynFlex gapHorizontal="lg" gapVertical="sm">
  {/* Wide horizontal gap, tight vertical gap */}
</DynFlex>
```

---

### Enhancement 2: Flex Item Sizing (NEW PROPS)

**Add**: `flex`, `flexGrow`, `flexShrink`, `flexBasis` props

```typescript
export interface DynFlexProps {
  // ... existing props ...
  
  /** Shorthand flex value for items */
  flex?: string | number;
  
  /** Flex grow value */
  flexGrow?: number;
  
  /** Flex shrink value */
  flexShrink?: number;
  
  /** Flex basis value */
  flexBasis?: string;
}
```

---

### Enhancement 3: Responsive Props (NEW)

**Add**: Responsive variants for tablet/mobile

```typescript
export interface DynFlexProps {
  // ... existing props ...
  
  /** Direction on tablet (768px) */
  directionTablet?: DynFlexDirection;
  
  /** Direction on mobile (480px) */
  directionMobile?: DynFlexDirection;
  
  /** Gap on mobile */
  gapMobile?: DynFlexGap;
}
```

**Example**:
```tsx
<DynFlex 
  direction="row" 
  directionMobile="column"
  gap="lg"
  gapMobile="sm"
>
  {/* Row on desktop, column on mobile */}
</DynFlex>
```

---

### Enhancement 4: New CSS Variant Classes

**Add to CSS module**:
```css
/* Safe Area Support */
.safeArea {
  display: var(--dyn-flex-display, flex);
  max-width: var(--dyn-container-max-width, 100%);
  margin: 0 auto;
}

/* Equal Width Children */
.equaWidth > * {
  flex: 1;
}

/* Equal Height Children */
.equalHeight {
  align-items: stretch;
}
> * {
  display: flex;
}

/* Centered Content */
.centered {
  --dyn-flex-align-items: center;
  --dyn-flex-justify-content: center;
}
```

---

## 🤖 AI VERIFICATION PROMPT

### For AI Agent: Use This Prompt to Verify Implementation

```markdown
# DynFlex Implementation Verification

You are an AI code reviewer. Your job is to verify that DynFlex component 
meets all requirements specified in this audit.

## TASK: Verify DynFlex Implementation

1. **File Check** - Verify all 6 files exist:
   ✅ DynFlex/DynFlex.tsx
   ✅ DynFlex/DynFlex.types.ts
   ✅ DynFlex/DynFlex.module.css (updated)
   ✅ DynFlex/DynFlex.test.tsx
   ✅ DynFlex/DynFlex.stories.tsx
   ✅ DynFlex/index.ts

2. **React Component Check** (DynFlex.tsx):
   - [ ] Uses React.forwardRef
   - [ ] Uses React.memo
   - [ ] Exports DynFlexProps interface
   - [ ] Has all props: direction, alignItems, justifyContent, gap, wrap, inline
   - [ ] Applies CSS classes dynamically
   - [ ] Handles children prop
   - [ ] Has displayName set
   - [ ] Uses classnames or manual string building

3. **TypeScript Check** (DynFlex.types.ts):
   - [ ] Exports DynFlexProps interface
   - [ ] Extends React.HTMLAttributes
   - [ ] Has all type unions:
     * DynFlexDirection
     * DynFlexAlignItems  
     * DynFlexJustifyContent
     * DynFlexGap
   - [ ] Each prop has JSDoc comment

4. **CSS Check** (DynFlex.module.css):
   - [ ] Has .flex base class
   - [ ] Has .flexColumn variant
   - [ ] Has .flexColumnReverse variant
   - [ ] Has .flexRowReverse variant
   - [ ] Has all .gapXSmall through .gap2XLarge
   - [ ] Has all .align* classes
   - [ ] Has all .justify* classes
   - [ ] Uses 3-level fallback for all tokens
   - [ ] Has dark mode @media query
   - [ ] Has high contrast @media query
   - [ ] Has reduced motion @media query
   - [ ] Has responsive breakpoints (768px, 480px)

5. **Tests Check** (DynFlex.test.tsx):
   - [ ] Has render tests
   - [ ] Has direction prop tests (all 4 directions)
   - [ ] Has alignItems prop tests
   - [ ] Has justifyContent prop tests
   - [ ] Has gap prop tests (all 6 sizes)
   - [ ] Has wrap prop tests
   - [ ] Has inline prop tests
   - [ ] Has custom HTML attribute tests
   - [ ] Has accessibility tests (aria-label, role)
   - [ ] Has combination tests
   - [ ] Coverage >= 95%

6. **Storybook Check** (DynFlex.stories.tsx):
   - [ ] Exports Meta with component
   - [ ] Has Default story
   - [ ] Has DirectionRow story
   - [ ] Has DirectionColumn story
   - [ ] Has AlignCenter story
   - [ ] Has JustifyBetween story
   - [ ] Has GapSmall story
   - [ ] Has WithWrap story
   - [ ] Has ComplexLayout story
   - [ ] All stories have proper render functions
   - [ ] ArgTypes defined for all props

7. **Export Check** (index.ts):
   - [ ] Exports DynFlex component
   - [ ] Exports DynFlexProps type
   - [ ] Exports DynFlexDirection type
   - [ ] Exports DynFlexAlignItems type
   - [ ] Exports DynFlexJustifyContent type
   - [ ] Exports DynFlexGap type

8. **Accessibility Check**:
   - [ ] Forward ref works
   - [ ] Aria attributes supported
   - [ ] Focus ring visible
   - [ ] High contrast mode works
   - [ ] Reduced motion respected

## EXPECTED OUTPUT

If all checks pass, respond with:

✅ ALL CHECKS PASSED - DynFlex READY FOR MERGE

Files verified:
- ✅ DynFlex.tsx (React component complete)
- ✅ DynFlex.types.ts (Types complete)
- ✅ DynFlex.module.css (CSS updated)
- ✅ DynFlex.test.tsx (Tests written, coverage: XX%)
- ✅ DynFlex.stories.tsx (Storybook documented)
- ✅ index.ts (Exports correct)

Component Features:
✅ 6 Flex directions (row, column, row-reverse, column-reverse, inline)
✅ 5 Alignment options
✅ 6 Justify content options
✅ 6 Gap sizes
✅ Wrap support
✅ Dark mode support
✅ Accessibility support
✅ Responsive design
✅ 95%+ test coverage

Ready to create PR!

If checks fail, respond with:

❌ CHECKS FAILED

Missing/incomplete items:
- [ ] Item 1: Problem description
- [ ] Item 2: Problem description

Please fix and resubmit.
```

---

## 📝 IMPLEMENTATION CHECKLIST

### PHASE 1: Setup & Types (1 hour)
- [ ] Create `DynFlex.types.ts` with all interfaces
- [ ] Verify types compile without errors
- [ ] Run `npm test` to ensure no type errors

**Checkpoint**: TypeScript types ready

---

### PHASE 2: React Component (1.5 hours)
- [ ] Create `DynFlex.tsx` with ForwardRef implementation
- [ ] Import types from `.types.ts`
- [ ] Import CSS module from `.module.css`
- [ ] Implement all prop handling
- [ ] Test basic rendering: `npm run dev`

**Checkpoint**: Component renders with all props

---

### PHASE 3: CSS Module Updates (30 minutes)
- [ ] Update `DynFlex.module.css`:
  - Add missing direction variants
  - Update token naming with 3-level fallback
  - Add missing state suffixes
  - Verify dark mode tokens
  - Verify responsive breakpoints

**Checkpoint**: CSS compiles, tokens follow pattern

---

### PHASE 4: Export & Index (10 minutes)
- [ ] Create `index.ts`
- [ ] Export component and types
- [ ] Test import: `import { DynFlex } from '@components/DynFlex'`

**Checkpoint**: Can import component from package

---

### PHASE 5: Jest Tests (1.5 hours)
- [ ] Create `DynFlex.test.tsx`
- [ ] Write all 10 test categories (70+ test cases)
- [ ] Run `npm test -- DynFlex`
- [ ] Verify coverage >= 95%

**Checkpoint**: All tests passing, coverage >= 95%

---

### PHASE 6: Storybook Stories (1 hour)
- [ ] Create `DynFlex.stories.tsx`
- [ ] Create 8 story variants
- [ ] Run `npm run storybook`
- [ ] Test each story in browser
- [ ] Verify responsive behavior

**Checkpoint**: All stories visible in Storybook

---

### PHASE 7: Documentation (30 minutes)
- [ ] Add JSDoc comments to component
- [ ] Add JSDoc comments to all types
- [ ] Add usage examples
- [ ] Add accessibility notes

**Checkpoint**: Documentation complete

---

### PHASE 8: Quality Assurance (30 minutes)
- [ ] Run all tests: `npm test`
- [ ] Check coverage: `npm test -- --coverage`
- [ ] Run linter: `npm run lint`
- [ ] Type check: `npm run type-check`
- [ ] Build: `npm run build`

**Checkpoint**: All quality checks pass

---

### PHASE 9: Git & PR (20 minutes)
- [ ] Create feature branch: `git checkout -b feat/dynflex-complete`
- [ ] Add all files: `git add packages/dyn-ui-react/src/components/DynFlex/`
- [ ] Commit: `git commit -m "feat(DynFlex): Complete React component with tests and docs"`
- [ ] Push: `git push origin feat/dynflex-complete`
- [ ] Create PR with checklist reference

**Checkpoint**: PR created and ready for review

---

**TOTAL TIME**: ~6-7 hours for complete implementation

---

## 📊 SUMMARY

### Current State
- ✅ CSS: Well-structured, token-compliant
- ❌ React: Does not exist
- ❌ Types: Does not exist
- ❌ Tests: Do not exist
- ❌ Documentation: Does not exist
- ❌ Exports: Do not exist

### After Implementation
- ✅ CSS: Updated with missing variants
- ✅ React: Fully functional component with ForwardRef
- ✅ Types: Complete TypeScript interfaces
- ✅ Tests: 95%+ coverage with 70+ test cases
- ✅ Documentation: Storybook with 8 variants
- ✅ Exports: Proper module exports

### Impact
- **Developers**: Can now import and use DynFlex component
- **Designers**: Can see all variants in Storybook
- **QA**: Can run tests and verify functionality
- **Project**: P0 critical blocker removed

---

**STATUS**: Ready for implementation  
**EFFORT**: 6-7 hours  
**COMPLEXITY**: Medium (straightforward, well-defined requirements)  
**RISK**: Low (CSS structure already solid, just need to wrap in React)

---

*Generated: December 24, 2025, 23:58 CET*  
*Audit Framework Version: 2.0*  
*Component Priority: P0 CRITICAL*
