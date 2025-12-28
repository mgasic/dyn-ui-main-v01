# DYN UI - COMPLETE KNOWLEDGE BASE v2.0

## Unified Documentation (All-in-One)

**Status**: ✅ READY FOR IMPLEMENTATION
**Version**: 2.0 - Unified & Standardized
**Date**: December 24, 2025
**Purpose**: Single, consolidated source of truth

---

## TABLE OF CONTENTS

1. [Executive Summary](#executive-summary)
2. [Three-Layer Token System](#three-layer-token-system)
3. [Token Categories & Values](#token-categories--values)
4. [Naming Conventions](#naming-conventions)
5. [Component Structure](#component-structure)
6. [Implementation Workflow](#implementation-workflow)
7. [Verification Checklist](#verification-checklist)
8. [P0 Priority Roadmap](#p0-priority-roadmap)
9. [Common Patterns & Examples](#common-patterns--examples)
10. [Troubleshooting](#troubleshooting)

---

## EXECUTIVE SUMMARY

### What This Is

This document consolidates **19 scattered files** into **1 unified knowledge base**:

- ✅ CLEAN-PLAN.md
- ✅ P0-REFACTOR-START.md
- ✅ IMPLEMENTATION-READY.md
- ✅ COMPONENT-TEMPLATES-README.md
- ✅ COMPREHENSIVE_AUDIT_REPORT.md
- ✅ ARCHITECTURE/ (5 files)
- ✅ GUIDES/ (6 files)

**Result**: Single source of truth for AI agents and developers

### Project Vision

**100% Design Token Compliance** - Every component uses standardized CSS tokens across three-layer architecture.

### Current Status

| Phase | Priority | Components | Timeline | Status |
|-------|----------|-----------|----------|--------|
| **P0** | 🔴 CRITICAL | 3 | 2 weeks | ⏳ Next |
| **P1** | 🟡 HIGH | 5+ | 2 weeks | 📋 Queued |
| **QA** | 🟢 STANDARD | All | 1 week | ⏹️ Queued |
| **Docs** | 🟢 STANDARD | All | 1 week | ⏹️ Queued |

---

## THREE-LAYER TOKEN SYSTEM

### Layer 1: Foundation Tokens (Global, Immutable)

**Location**: `packages/design-tokens/styles/foundations/`

**Scope**: Global `:root` (affects all components)

**Rule**: Never reference other tokens, only hardcoded values

#### Colors

```css
--dyn-color-primary: #2563eb
--dyn-color-secondary: #f3f4f6
--dyn-color-success: #10b981
--dyn-color-warning: #f59e0b
--dyn-color-error: #ef4444
--dyn-color-info: #3b82f6
--dyn-color-background: #ffffff
--dyn-color-surface: #f9fafb
--dyn-color-text: #1f2937
--dyn-color-text-secondary: #6b7280
--dyn-color-border: #d1d5db
--dyn-color-disabled: #d1d5db
```

#### Spacing

```css
--dyn-spacing-xs: 0.25rem    /* 4px */
--dyn-spacing-sm: 0.5rem     /* 8px */
--dyn-spacing-md: 0.75rem    /* 12px */
--dyn-spacing-lg: 1rem       /* 16px */
--dyn-spacing-xl: 1.5rem     /* 24px */
--dyn-spacing-2xl: 2rem      /* 32px */
--dyn-spacing-3xl: 3rem      /* 48px */
```

#### Typography

```css
/* Font Sizes */
--dyn-font-size-xs: 0.75rem    /* 12px */
--dyn-font-size-sm: 0.875rem   /* 14px */
--dyn-font-size-base: 1rem     /* 16px */
--dyn-font-size-lg: 1.125rem   /* 18px */
--dyn-font-size-xl: 1.25rem    /* 20px */

/* Font Weights */
--dyn-font-weight-normal: 400
--dyn-font-weight-medium: 500
--dyn-font-weight-semibold: 600
--dyn-font-weight-bold: 700

/* Line Heights */
--dyn-line-height-tight: 1.2
--dyn-line-height-normal: 1.5
--dyn-line-height-relaxed: 1.75
```

#### Shadows

```css
--dyn-shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05)
--dyn-shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1)
--dyn-shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1)
--dyn-shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1)
--dyn-shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1)
```

#### Border Radius

```css
--dyn-radius-none: 0
--dyn-radius-sm: 0.25rem     /* 4px */
--dyn-radius-md: 0.5rem      /* 8px */
--dyn-radius-lg: 0.75rem     /* 12px */
--dyn-radius-xl: 1rem        /* 16px */
--dyn-radius-full: 9999px
```

#### Transitions

```css
--dyn-transition-fast: 150ms
--dyn-transition-base: 200ms
--dyn-transition-slow: 300ms
--dyn-transition-easing: cubic-bezier(0.4, 0, 0.2, 1)
```

#### Z-Index

```css
--dyn-z-index-dropdown: 1000
--dyn-z-index-sticky: 1100
--dyn-z-index-fixed: 1200
--dyn-z-index-modal-backdrop: 1300
--dyn-z-index-modal: 1400
--dyn-z-index-popover: 1500
--dyn-z-index-tooltip: 1600
```

### Layer 2: Component Tokens (Component-Scoped)

**Location**: Component `DynComponent.module.css :root` section

**Scope**: Component-only (no leakage)

**Rule**: MUST reference foundation tokens with 3-level fallback

#### Button Example

```css
:root {
  /* Base tokens */
  --dyn-button-bg: var(--dyn-color-primary, var(--legacy-button-bg, #2563eb));
  --dyn-button-color: var(--dyn-color-white, var(--legacy-button-text, #ffffff));
  --dyn-button-padding-y: var(--dyn-spacing-md, var(--legacy-button-pad-y, 0.75rem));
  --dyn-button-padding-x: var(--dyn-spacing-lg, var(--legacy-button-pad-x, 1rem));
  --dyn-button-font-size: var(--dyn-font-size-base, var(--legacy-button-size, 1rem));
  --dyn-button-font-weight: var(--dyn-font-weight-medium, 500);
  --dyn-button-border-radius: var(--dyn-radius-md, var(--legacy-button-radius, 0.5rem));
  --dyn-button-shadow: none;
  --dyn-button-transition: all var(--dyn-transition-base, 200ms) var(--dyn-transition-easing);
  --dyn-button-touch-target: var(--dyn-spacing-xl, 2.75rem);

  /* State variants */
  --dyn-button-bg-hover: var(--dyn-color-primary-hover, #1d4ed8);
  --dyn-button-bg-active: var(--dyn-color-primary-active, #1e40af);
  --dyn-button-opacity-disabled: 0.5;
}
```

#### Input Example

```css
:root {
  --dyn-input-bg: var(--dyn-color-surface, var(--legacy-input-bg, #ffffff));
  --dyn-input-color: var(--dyn-color-text, var(--legacy-input-text, #1f2937));
  --dyn-input-border: var(--dyn-color-border, var(--legacy-input-border, #d1d5db));
  --dyn-input-border-hover: var(--dyn-color-border-hover, #9ca3af);
  --dyn-input-border-focus: var(--dyn-color-primary, #2563eb);
  --dyn-input-placeholder: var(--dyn-color-text-secondary, #9ca3af);
  --dyn-input-padding-y: var(--dyn-spacing-sm, 0.5rem);
  --dyn-input-padding-x: var(--dyn-spacing-md, 0.75rem);
  --dyn-input-font-size: var(--dyn-font-size-base, 1rem);
}
```

### Layer 3: Theme Tokens (Optional Overrides)

**Location**: `@media` queries or `themes/` folder

**Scope**: Override foundation tokens only

**Rule**: Only change what's different, component tokens inherit automatically

#### Dark Mode Example

```css
@media (prefers-color-scheme: dark) {
  :root {
    /* Override foundation tokens */
    --dyn-color-primary: #1e3a8a;
    --dyn-color-secondary: #1f2937;
    --dyn-color-background: #0f172a;
    --dyn-color-surface: #1e293b;
    --dyn-color-text: #f9fafb;
    --dyn-color-border: rgba(255, 255, 255, 0.1);

    /* Component tokens automatically use new values */
    /* No need to redefine component tokens */
  }
}
```

#### High Contrast Example

```css
@media (prefers-contrast: more) {
  :root {
    --dyn-color-primary: #000000;
    --dyn-shadow-sm: none;
    --dyn-shadow-md: none;
  }
}
```

---

## NAMING CONVENTIONS

### Pattern

```
--dyn-[component]-[property]-[state]
```

### Components

1. **Prefix** (`--dyn-`)
   - Purpose: Namespace to avoid conflicts
   - Always lowercase with hyphens
   - Example: `--dyn-button-bg`

2. **Domain** (component type)
   - Singular noun (button, not buttons)
   - Examples: `button`, `input`, `flex`, `table`, `modal`
   - Never abbreviated: `button` not `btn`

3. **Property** (what's being styled)
   - Examples: `bg`, `color`, `border`, `padding`, `shadow`
   - Use standard abbreviations: `bg`, `padding-y`, `padding-x`
   - Full words for others: `color`, `border`, `shadow`

4. **State** (optional, for variants)
   - Examples: `hover`, `focus`, `disabled`, `error`, `dark`
   - Only if distinguishes behavior/appearance
   - Lowercase adjective

### Examples (Correct ✅)

```css
--dyn-button-bg                 /* component-property */
--dyn-button-bg-hover           /* component-property-state */
--dyn-input-border-focus        /* component-property-state */
--dyn-badge-padding-y           /* component-property (axis) */
--dyn-table-header-bg           /* component-subcomponent-property */
--dyn-nav-item-active-bg        /* component-subcomponent-property-state */
```

### Examples (Wrong ❌)

```css
--btn-bg                        /* no prefix, abbreviated domain */
--dyn-buttons-bg                /* plural domain */
--dyn-button-backgroundColor    /* camelCase property */
--button_padding                /* underscore separator */
--DynButtonBg                   /* uppercase */
--dyn-badge-accent              /* vague property */
```

---

## COMPONENT STRUCTURE

### 6-File Template

Every component MUST have exactly these files:

```
DynComponent/
├── DynComponent.tsx              # React component
├── DynComponent.types.ts         # TypeScript types
├── DynComponent.module.css       # Styles with tokens
├── DynComponent.stories.tsx      # Storybook documentation
├── DynComponent.test.tsx         # Jest tests (80%+ coverage)
├── index.ts                      # Exports
└── README.md                     # Optional: component docs
```

### CSS Module Structure

```css
/* DynComponent.module.css */

/* ================================================
   1. COMPONENT TOKENS (define at top)
   ================================================ */
:root {
  --dyn-component-bg: var(--dyn-color-primary, #2563eb);
  --dyn-component-color: var(--dyn-color-white, #ffffff);
  --dyn-component-padding-y: var(--dyn-spacing-md, 0.75rem);
  --dyn-component-padding-x: var(--dyn-spacing-lg, 1rem);
  --dyn-component-font-size: var(--dyn-font-size-base, 1rem);
  --dyn-component-border-radius: var(--dyn-radius-md, 0.5rem);
  --dyn-component-transition: all var(--dyn-transition-base, 200ms);
}

/* ================================================
   2. BASE STYLES (use tokens, no hardcoding)
   ================================================ */
.component {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--dyn-component-padding-y) var(--dyn-component-padding-x);
  background-color: var(--dyn-component-bg);
  color: var(--dyn-component-color);
  font-size: var(--dyn-component-font-size);
  border-radius: var(--dyn-component-border-radius);
  transition: var(--dyn-component-transition);
  cursor: pointer;
}

/* ================================================
   3. INTERACTIVE STATES
   ================================================ */
.component:hover {
  background-color: var(--dyn-color-primary-hover, #1d4ed8);
}

.component:active {
  background-color: var(--dyn-color-primary-active, #1e40af);
}

.component:focus-visible {
  outline: 2px solid var(--dyn-color-focus, #3b82f6);
  outline-offset: 2px;
}

.component:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* ================================================
   4. VARIANTS (override tokens only, never properties)
   ================================================ */
.componentSecondary {
  --dyn-component-bg: var(--dyn-color-secondary, #f3f4f6);
  --dyn-component-color: var(--dyn-color-text, #1f2937);
}

.componentTertiary {
  --dyn-component-bg: transparent;
  --dyn-component-color: var(--dyn-color-primary, #2563eb);
}

/* ================================================
   5. DARK MODE (override tokens only)
   ================================================ */
@media (prefers-color-scheme: dark) {
  :root {
    --dyn-component-bg: var(--dyn-color-primary-dark, #1e3a8a);
    --dyn-component-color: var(--dyn-color-text-dark, #f9fafb);
  }

  .componentSecondary {
    --dyn-component-bg: var(--dyn-color-surface-dark, #1f2937);
    --dyn-component-color: var(--dyn-color-text-dark, #f9fafb);
  }
}

/* ================================================
   6. RESPONSIVE (override tokens for mobile)
   ================================================ */
@media (max-width: 767px) {
  :root {
    --dyn-component-padding-y: var(--dyn-spacing-sm, 0.5rem);
    --dyn-component-padding-x: var(--dyn-spacing-md, 0.75rem);
  }

  .component {
    width: 100%;
  }
}

/* ================================================
   7. ACCESSIBILITY
   ================================================ */
@media (prefers-reduced-motion: reduce) {
  .component {
    --dyn-component-transition: none;
  }
}

@media (prefers-contrast: more) {
  .component {
    border: 2px solid currentColor;
  }
}
```

---

## IMPLEMENTATION WORKFLOW FOR NEW COMPONENTS

### Step-by-Step

#### Step 1: Copy Template

```bash
cp -r docs/TEMPLATES/TEMPLATE-Component src/components/DynNewComponent
```

#### Step 2: Rename Files

```bash
cd src/components/DynNewComponent
sed -i 's/DinComponentTemplate/DynNewComponent/g' *
sed -i 's/componentTemplate/newComponent/g' *
```

#### Step 3: Implement Component Logic

**DynNewComponent.tsx** - React component

```typescript
import React from 'react';
import styles from './DynNewComponent.module.css';
import type { DynNewComponentProps } from './DynNewComponent.types';

export const DynNewComponent = React.forwardRef<
  HTMLButtonElement,
  DynNewComponentProps
>(({ children, variant = 'primary', disabled = false, ...rest }, ref) => {
  const className = [
    styles.component,
    variant === 'secondary' && styles.componentSecondary,
    variant === 'tertiary' && styles.componentTertiary,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button ref={ref} className={className} disabled={disabled} {...rest}>
      {children}
    </button>
  );
});

DynNewComponent.displayName = 'DynNewComponent';
```

**DynNewComponent.types.ts** - TypeScript types

```typescript
import { ReactNode } from 'react';

export interface DynNewComponentProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Component variant
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'tertiary';

  /**
   * Children content
   */
  children: ReactNode;

  /**
   * Is component disabled
   * @default false
   */
  disabled?: boolean;
}
```

**DynNewComponent.module.css** - Styles with tokens (see CSS Module Structure above)

**DynNewComponent.stories.tsx** - Storybook

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { DynNewComponent } from './DynNewComponent';

const meta = {
  title: 'Components/DynNewComponent',
  component: DynNewComponent,
  tags: ['autodocs'],
} satisfies Meta<typeof DynNewComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { children: 'Primary', variant: 'primary' },
};

export const Secondary: Story = {
  args: { children: 'Secondary', variant: 'secondary' },
};

export const DarkMode: Story = {
  args: { children: 'Dark Mode' },
  parameters: { backgrounds: { default: 'dark' } },
};
```

**DynNewComponent.test.tsx** - Jest tests (80%+ coverage)

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DynNewComponent } from './DynNewComponent';

describe('DynNewComponent', () => {
  it('renders with children', () => {
    render(<DynNewComponent>Click</DynNewComponent>);
    expect(screen.getByText('Click')).toBeInTheDocument();
  });

  it('applies primary variant', () => {
    const { container } = render(<DynNewComponent variant="primary">Button</DynNewComponent>);
    expect(container.querySelector('button')).not.toHaveClass('componentSecondary');
  });

  it('applies secondary variant', () => {
    const { container } = render(<DynNewComponent variant="secondary">Button</DynNewComponent>);
    expect(container.querySelector('button')).toHaveClass('componentSecondary');
  });

  it('handles click events', async () => {
    const handleClick = jest.fn();
    render(<DynNewComponent onClick={handleClick}>Click</DynNewComponent>);
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('supports disabled state', () => {
    render(<DynNewComponent disabled>Disabled</DynNewComponent>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

**index.ts** - Exports

```typescript
export { DynNewComponent } from './DynNewComponent';
export type { DynNewComponentProps } from './DynNewComponent.types';
```

#### Step 4: Test Locally

```bash
npm test DynNewComponent
npm run storybook
npm run a11y-audit
```

#### Step 5: Verify Against Checklist

See Verification Checklist section below

#### Step 6: Commit & Push

```bash
git add .
git commit -m "feat(DynNewComponent): implement with 100% design token compliance"
git push origin feat/new-component
```

#### Step 7: Create PR

Include full checklist in PR description

---

## VERIFICATION CHECKLIST

### Pre-Commit CSS Standards

- [ ] All tokens use `--dyn-` prefix
- [ ] Pattern: `--dyn-[component]-[property]-[state]`
- [ ] No hardcoded values (except in fallback)
- [ ] 3-level fallback on ALL tokens:

  ```css
  var(--dyn-component, var(--legacy-component, fallback-value))
  ```

- [ ] All variants override tokens only (not CSS properties)
- [ ] Dark mode: `@media (prefers-color-scheme: dark)` present
- [ ] Responsive: `@media (max-width: 767px)` present
- [ ] Accessibility: focus ring (3px+), contrast, touch targets (44px+)

### Pre-Commit Testing

- [ ] 80%+ Jest code coverage
- [ ] All variants tested
- [ ] All states tested (hover, focus, active, disabled)
- [ ] Dark mode tested
- [ ] Accessibility tested (Axe-core: 0 violations)
- [ ] Responsive design tested

### Pre-Commit React Standards

- [ ] Component uses `React.forwardRef`
- [ ] All props properly destructured
- [ ] No hardcoded styles
- [ ] `displayName` present
- [ ] Proper TypeScript types (no `any`)
- [ ] JSDoc comments on props

### Pre-Commit Git Standards

- [ ] Branch: `feat/component-name` or `fix/issue-name`
- [ ] Commit message is clear and descriptive
- [ ] No merge conflicts
- [ ] No node_modules or build artifacts

### Pre-Commit Storybook Standards

- [ ] Story for each variant
- [ ] Dark mode story present
- [ ] Disabled/interactive stories present
- [ ] Token usage documented
- [ ] `autodocs` tag present

### Pre-PR Requirements

- [ ] All checklist items above completed
- [ ] PR title: `feat(Component): 100% design token compliance`
- [ ] PR description includes this full checklist
- [ ] Related issues linked

---

## ISSUE EXAMPLE AND SOLUTION

### 1. DynFlex (3 hours) - GLOBAL TOKENS ISSUE

**Problem**: Uses global tokens → style leakage between components

```css
/* ❌ BEFORE - Global scope */
:root {
  --flex-gap: 12px;  /* Affects all components! */
  --flex-padding: 8px;
}

/* ✅ AFTER - Component scope with --dyn- prefix */
.flex {
  --dyn-flex-gap: var(--dyn-spacing-md, 12px);
  --dyn-flex-padding: var(--dyn-spacing-md, 8px);
}
```

**Solution**:

1. Move token definitions from global `:root` to component `.flex` scope
2. Rename tokens: `--flex-*` → `--dyn-flex-*`
3. Add 3-level fallback to all tokens
4. Test all flex variants in Storybook
5. Verify dark mode works

### 2. DynBadge (4 hours) - WRONG TOKEN NAMES

**Problem**: Token names don't follow convention

```css
/* ❌ BEFORE - Wrong names */
--badge-accent
--badge-bg-color
--badge-text-color

/* ✅ AFTER - Correct pattern */
--dyn-badge-bg
--dyn-badge-color
--dyn-badge-padding
```

**Solution**:

1. Rename all tokens to `--dyn-badge-*`
2. Follow: `--dyn-badge-[property]-[state]`
3. Reference foundation tokens
4. Add dark mode overrides
5. Test all badge variants

### 3. DynModal (4 hours) - HARD-CODED VALUES

**Problem**: Hard-coded pixels and colors instead of tokens

```css
/* ❌ BEFORE - Hard-coded */
.modal {
  background: rgba(0, 0, 0, 0.5);
  width: 500px;
  max-height: 90vh;
  z-index: 999;
  box-shadow: 0 20px 25px rgba(0, 0, 0, 0.1);
}

/* ✅ AFTER - Tokenized */
:root {
  --dyn-modal-overlay-bg: var(--dyn-color-overlay, rgba(0, 0, 0, 0.5));
  --dyn-modal-max-width: var(--dyn-modal-width, 500px);
  --dyn-modal-max-height: var(--dyn-modal-height, 90vh);
  --dyn-modal-z-index: var(--dyn-z-index-modal, 1400);
  --dyn-modal-shadow: var(--dyn-shadow-lg, 0 20px 25px rgba(0, 0, 0, 0.1));
}

.modal {
  background: var(--dyn-modal-overlay-bg);
  max-width: var(--dyn-modal-max-width);
  max-height: var(--dyn-modal-max-height);
  z-index: var(--dyn-modal-z-index);
  box-shadow: var(--dyn-modal-shadow);
}
```

**Solution**:

1. Identify all hard-coded values
2. Create component tokens for each
3. Add 3-level fallback
4. Test all modal sizes (small, medium, large)
5. Verify dark mode and responsive

---

## COMMON PATTERNS & EXAMPLES

### Pattern: Using Tokens in Variants

```css
/* ✅ Correct - override tokens only */
.buttonPrimary {
  --dyn-button-bg: var(--dyn-color-primary, #2563eb);
  --dyn-button-color: var(--dyn-color-white, #ffffff);
}

.buttonSecondary {
  --dyn-button-bg: var(--dyn-color-secondary, #f3f4f6);
  --dyn-button-color: var(--dyn-color-text, #1f2937);
}

/* ❌ Wrong - duplicating properties */
.buttonSecondary {
  display: inline-flex;  /* redundant */
  padding: 0.75rem 1rem;  /* hardcoded */
  background-color: #f3f4f6;  /* hardcoded */
}
```

### Pattern: Touch Targets

```css
/* Ensure mobile-friendly sizes */
:root {
  --dyn-button-touch-target: var(--dyn-spacing-xl, 2.75rem);  /* 44px */
}

.button {
  min-width: var(--dyn-button-touch-target);
  min-height: var(--dyn-button-touch-target);
}
```

### Pattern: Focus Rings

```css
/* Accessible focus indicator */
.button:focus-visible {
  outline: 2px solid var(--dyn-color-focus, #3b82f6);
  outline-offset: 2px;  /* space between element and outline */
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);  /* additional visibility */
}
```

---

## TROUBLESHOOTING

### Issue: Token not applying

**Symptom**: CSS property doesn't show the token value

**Diagnosis**:

1. Check token is defined
2. Check CSS property references token
3. Check 3-level fallback is correct
4. Check component scope (not global)

**Solution**:

```css
/* Wrong */
var(--dyn-button-bg)

/* Right */
var(--dyn-button-bg, var(--legacy-button-bg, #2563eb))
```

### Issue: Dark mode not working

**Symptom**: Colors don't change in dark mode

**Diagnosis**:

1. Check `@media (prefers-color-scheme: dark)` exists
2. Check tokens are overridden inside media query
3. Check browser supports color scheme preference

**Solution**:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --dyn-button-bg: var(--dyn-color-primary-dark, #1e3a8a);
    --dyn-button-color: var(--dyn-color-text-dark, #f9fafb);
  }
}
```

### Issue: Styles leaking to other components

**Symptom**: Changes to one component affect others

**Diagnosis**:

1. Check tokens defined in component `.module.css`, not global CSS
2. Check `:root` is not setting global scope
3. Check CSS Module is being imported

**Solution**:

```css
/* ❌ Wrong - in global style.css */
:root { --flex-gap: 12px; }  /* affects all */

/* ✅ Right - in DynFlex.module.css */
:root { --dyn-flex-gap: var(--dyn-spacing-md, 12px); }  /* component scope */
```

### Issue: Token naming inconsistent

**Symptom**: Tokens don't follow standard pattern

**Diagnosis**:

1. Check pattern: `--dyn-[component]-[property]-[state]`
2. Check domain is singular (button, not buttons)
3. Check property is not camelCase

**Solution**:

```css
/* Wrong */
--btn-bg
--dyn-buttons-bg
--dyn-button-backgroundColor
--button_padding

/* Right */
--dyn-button-bg
--dyn-button-padding-y
--dyn-button-bg-hover
```

---

## KEY RULES TO MEMORIZE

1. **Token Prefix**: Always `--dyn-`
2. **Naming**: `--dyn-[component]-[property]-[state]`
3. **Fallback**: Always 3-level chain
4. **No Hardcode**: Except in fallback values
5. **Dark Mode**: `@media (prefers-color-scheme: dark)`
6. **Responsive**: `@media (max-width: 767px)`
7. **Testing**: Min 80% coverage
8. **Accessibility**: Focus (3px), contrast (4.5:1), touch (44px)

---

**VERSION 2.0**
**Unified, Consolidated, Complete**
**December 24, 2025**

**Status**: ✅ **READY FOR IMPLEMENTATION**
