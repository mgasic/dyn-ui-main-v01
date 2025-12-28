# 🤖 DYN UI - MASTER AI IMPLEMENTATION GUIDE

**Date**: December 28, 2025  
**Version**: 2.0 - AI-Optimized  
**Status**: ✅ Complete & Ready for AI-Powered Development

---

## 📌 EXECUTIVE SUMMARY

This guide provides **AI-powered developers/agents** with a complete, step-by-step workflow to implement DYN UI components. It covers:

- ✅ **Workflow Map** (8-step process)
- ✅ **Quality Standards** (100% enforced)
- ✅ **Component Specification Format** (machine-readable)
- ✅ **Verification Protocols** (automated checks)
- ✅ **Error Handling & Recovery** (troubleshooting)
- ✅ **Current State Analysis** (40 components audited)

### Key Stats
- **Total Components**: 40 (DinCheckbox + 39 Dyn* + ThemeSwitcher)
- **Component Files Structure**: 6-7 files per component (consistent)
- **Quality Standards**: 100% token compliance + 80%+ test coverage
- **Estimated Timeline**: 6 weeks for full completion
- **AI-Ready Level**: ⭐⭐⭐⭐⭐ (5/5 - highly structured)

---

## 🎯 WHAT IS THIS?

### For AI Agents
This is a **machine-optimized implementation guide** designed so that:
1. Every step is unambiguous
2. Every rule is quantifiable/testable
3. Every format is parseable
4. Every error has a recovery path

### For Human Developers
This is a **structured workflow** that ensures:
1. Consistency across all 40 components
2. Quality standards are met
3. Token system is properly applied
4. Tests are comprehensive
5. Documentation is complete

### For Project Managers
This is a **tracking document** that shows:
1. Current state of each component
2. What needs to be done
3. Effort estimates
4. Timeline & dependencies

---

## 📋 TABLE OF CONTENTS

1. [🚀 Quick Start](#quick-start)
2. [🔄 AI Implementation Workflow](#ai-implementation-workflow)
3. [📊 Current State Analysis](#current-state-analysis)
4. [✅ Component Structure Standard](#component-structure-standard)
5. [🎨 Token System Reference](#token-system-reference)
6. [🧪 Quality Standards](#quality-standards)
7. [📝 Component Specification Template](#component-specification-template)
8. [🔍 Verification Checklist](#verification-checklist)
9. [⚠️ Common Issues & Solutions](#common-issues--solutions)
10. [📚 Reference Links](#reference-links)

---

## 🚀 QUICK START

### If You're an AI Agent

**Step 1**: Read this entire document (15 minutes)

**Step 2**: Choose a component from [Component Priority List](#component-priority-list)

**Step 3**: Read the component's specification file (if exists) or use template in [Section 7](#component-specification-template)

**Step 4**: Follow the [8-Step Workflow](#8-step-ai-implementation-workflow)

**Step 5**: Use [Verification Checklist](#verification-checklist) to validate your work

**Step 6**: Submit PR with all checklist items complete

---

## 🔄 AI IMPLEMENTATION WORKFLOW

### 8-Step Process (AI-Optimized)

```
┌─────────────────────────────────────────────────────────────┐
│                   START: Component Assigned                  │
└─────────────────────┬───────────────────────────────────────┘
                      │
        ┌─────────────▼──────────────┐
        │  STEP 1: Analyze Current   │
        │  Read spec, find existing  │
        │  component files, identify │
        │  gap vs. requirements      │
        └─────────────┬──────────────┘
                      │
        ┌─────────────▼──────────────┐
        │  STEP 2: Structure Files   │
        │  Create/update 6-7 files   │
        │  per standard template     │
        └─────────────┬──────────────┘
                      │
        ┌─────────────▼──────────────┐
        │  STEP 3: Implement CSS     │
        │  All tokens, fallbacks,    │
        │  dark mode, responsive     │
        └─────────────┬──────────────┘
                      │
        ┌─────────────▼──────────────┐
        │  STEP 4: Code React        │
        │  All props, variants,      │
        │  accessibility             │
        └─────────────┬──────────────┘
                      │
        ┌─────────────▼──────────────┐
        │  STEP 5: Write Tests       │
        │ 80%+ coverage required,     │
        │  all variants tested       │
        └─────────────┬──────────────┘
                      │
        ┌─────────────▼──────────────┐
        │  STEP 6: Document Stories  │
        │  Storybook with variants,  │
        │  dark mode, responsive     │
        └─────────────┬──────────────┘
                      │
        ┌─────────────▼──────────────┐
        │  STEP 7: Verify Quality    │
        │  Run checklist, validate   │
        │  all requirements met      │
        └─────────────┬──────────────┘
                      │
        ┌─────────────▼──────────────┐
        │  STEP 8: Submit & Review   │
        │  PR with all checks passed │
        │  Ready for merge           │
        └─────────────┬──────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                   END: Component Complete                    │
└─────────────────────────────────────────────────────────────┘
```

### Detailed Steps

#### STEP 1: Analyze Current State
**Duration**: 5-10 minutes  
**Effort**: Low  
**Output**: Understanding of current gaps

**Task Checklist**:
- [ ] Open `packages/dyn-ui-react/src/components/[ComponentName]` folder
- [ ] List all existing files (usually 6-7 files)
- [ ] Check if component has:
  - [ ] `.tsx` main component file
  - [ ] `.types.ts` TypeScript types file
  - [ ] `.module.css` CSS file
  - [ ] `.stories.tsx` Storybook file
  - [ ] `.test.tsx` test file
  - [ ] `__snapshots__` folder (auto-generated)
  - [ ] `index.ts` barrel export
- [ ] Open component spec document (if exists) or refer to this guide's Section 7
- [ ] Identify what's missing or needs improvement
- [ ] Note current issues (hardcoded values, missing tokens, incomplete tests, etc.)

**Success Criteria**:
- ✅ You understand what the component should do
- ✅ You can list missing pieces
- ✅ You know what quality standards need to be met

---

#### STEP 2: Structure Files
**Duration**: 5 minutes  
**Effort**: Low  
**Output**: File structure ready for implementation

**Template Structure**:
```
ComponentName/
├── ComponentName.tsx              (Main React component)
├── ComponentName.types.ts         (TypeScript interfaces)
├── ComponentName.module.css       (All styles with tokens)
├── ComponentName.stories.tsx      (Storybook documentation)
├── ComponentName.test.tsx         (Unit & integration tests)
├── ComponentName.snapshot.test.tsx (Snapshot tests)
├── __snapshots__/                 (Auto-generated)
├── index.ts                       (Barrel export)
└── [OPTIONAL] ComponentName.constants.ts (If complex logic)
```

**Task Checklist**:
- [ ] If files don't exist, create them using template
- [ ] If files exist, review structure
- [ ] Ensure naming follows pattern: `ComponentName.*`
- [ ] Check that `index.ts` exports main component and types
- [ ] Verify no extra files that should be in shared utils

**Success Criteria**:
- ✅ All required files exist
- ✅ File structure matches template
- ✅ No naming inconsistencies
- ✅ Index file properly exports

---

#### STEP 3: Implement CSS
**Duration**: 15-25 minutes  
**Effort**: Medium  
**Output**: Complete, token-based CSS

**Token System Reference**:

Every CSS class MUST use design tokens:

```css
/* CORRECT - Using tokens with 3-level fallback */
.button {
  background-color: var(--dyn-button-bg, var(--legacy-button-bg, #3b82f6));
  color: var(--dyn-button-text, var(--legacy-button-text, #ffffff));
  padding: var(--dyn-spacing-md, var(--legacy-spacing-md, 12px));
  border-radius: var(--dyn-radius-sm, var(--legacy-radius-sm, 6px));
}

/* DARK MODE REQUIRED */
@media (prefers-color-scheme: dark) {
  .button {
    background-color: var(--dyn-button-bg-dark, var(--legacy-button-bg-dark, #1e40af));
    color: var(--dyn-button-text-dark, var(--legacy-button-text-dark, #f0f9ff));
  }
}

/* RESPONSIVE REQUIRED */
@media (max-width: 768px) {
  .button {
    padding: var(--dyn-spacing-sm, var(--legacy-spacing-sm, 8px));
  }
}

/* STATES REQUIRED */
.button:hover {
  background-color: var(--dyn-button-bg-hover, var(--legacy-button-bg-hover, #2563eb));
}

.button:focus {
  outline: 2px solid var(--dyn-focus-color, var(--legacy-focus-color, #3b82f6));
}

.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

**Task Checklist**:
- [ ] All color values use `--dyn-*` tokens
- [ ] All spacing uses `--dyn-spacing-*` tokens
- [ ] All font sizes use `--dyn-font-size-*` tokens
- [ ] All border radius uses `--dyn-radius-*` tokens
- [ ] All shadows use `--dyn-shadow-*` tokens
- [ ] Every token has 3-level fallback: `var(--dyn-*, var(--legacy-*, fallback))`
- [ ] Dark mode defined for all interactive states
- [ ] Responsive breakpoints at 768px, 1024px (if needed)
- [ ] Hover, focus, active, disabled states defined
- [ ] No hardcoded color values (except in fallback)
- [ ] CSS uses CSS Module pattern (imported in TSX as styles)

**Token Naming Pattern**:
```
--dyn-[component]-[property]-[state]
```

Examples:
- `--dyn-button-bg` (background)
- `--dyn-button-bg-hover` (background on hover)
- `--dyn-button-text` (text color)
- `--dyn-input-border` (border color)
- `--dyn-input-border-focus` (border on focus)

**Success Criteria**:
- ✅ Zero hardcoded colors
- ✅ All tokens follow `--dyn-*` naming
- ✅ All fallbacks present
- ✅ Dark mode styles defined
- ✅ All states covered (hover, focus, active, disabled)
- ✅ Responsive design implemented

---

#### STEP 4: Code React Component
**Duration**: 20-30 minutes  
**Effort**: Medium  
**Output**: Complete, accessible React component

**Component Template**:

```tsx
import React, { forwardRef, ReactNode } from 'react';
import { DynButtonProps } from './DynButton.types';
import styles from './DynButton.module.css';

/**
 * DynButton - A flexible, accessible button component
 *
 * @example
 * <DynButton variant="primary" size="md">
 *   Click me
 * </DynButton>
 */
export const DynButton = forwardRef<HTMLButtonElement, DynButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      disabled = false,
      type = 'button',
      className,
      ...props
    },
    ref
  ) => {
    const buttonClassName = [
      styles.button,
      styles[`button--${variant}`],
      styles[`button--${size}`],
      disabled && styles['button--disabled'],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        type={type}
        className={buttonClassName}
        disabled={disabled}
        aria-pressed={false}
        {...props}
      >
        {children}
      </button>
    );
  }
);

DynButton.displayName = 'DynButton';
```

**Task Checklist**:
- [ ] Component exported as named export
- [ ] Uses `forwardRef` for ref handling
- [ ] All props from `.types.ts` properly destructured
- [ ] Accepts `className` prop for extending styles
- [ ] Uses CSS Module `styles` import
- [ ] Proper className concatenation (filters empty values)
- [ ] Default prop values defined
- [ ] JSDoc comments added
- [ ] `displayName` property set (helps debugging)
- [ ] Accessibility attributes applied (aria-*, role, etc.)
- [ ] All variants/sizes properly handled
- [ ] Props spread to underlying element

**Task Checklist - Accessibility**:
- [ ] All interactive elements have proper ARIA labels
- [ ] `aria-pressed`, `aria-expanded`, `aria-selected` used where appropriate
- [ ] Focus management implemented if needed
- [ ] Keyboard navigation supported
- [ ] Color not sole means of communication
- [ ] Text contrast meets WCAG AA (4.5:1 minimum)

**Success Criteria**:
- ✅ Component renders without errors
- ✅ All props work correctly
- ✅ TypeScript types are correct
- ✅ Accessibility standards met
- ✅ Variants work as expected
- ✅ Responsive on mobile/desktop

---

#### STEP 5: Write Tests
**Duration**: 25-35 minutes  
**Effort**: Medium-High  
**Output**: 80%+ test coverage

**Test File Template**:

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DynButton } from './DynButton';

describe('DynButton', () => {
  // SMOKE TESTS
  it('should render successfully', () => {
    render(<DynButton>Click me</DynButton>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  // PROPS TESTS
  describe('Props', () => {
    it('should handle variant prop', () => {
      const { container } = render(
        <DynButton variant="secondary">Click</DynButton>
      );
      expect(container.querySelector('.button--secondary')).toBeInTheDocument();
    });

    it('should handle size prop', () => {
      const { container } = render(<DynButton size="lg">Click</DynButton>);
      expect(container.querySelector('.button--lg')).toBeInTheDocument();
    });

    it('should disable when disabled prop is true', () => {
      render(<DynButton disabled>Click</DynButton>);
      expect(screen.getByRole('button')).toBeDisabled();
    });
  });

  // INTERACTION TESTS
  describe('Interactions', () => {
    it('should call onClick handler', async () => {
      const handleClick = vi.fn();
      render(<DynButton onClick={handleClick}>Click</DynButton>);
      
      const button = screen.getByRole('button');
      await userEvent.click(button);
      
      expect(handleClick).toHaveBeenCalledOnce();
    });

    it('should not call onClick when disabled', async () => {
      const handleClick = vi.fn();
      render(
        <DynButton disabled onClick={handleClick}>
          Click
        </DynButton>
      );
      
      const button = screen.getByRole('button');
      await userEvent.click(button);
      
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  // ACCESSIBILITY TESTS
  describe('Accessibility', () => {
    it('should be keyboard accessible', async () => {
      const handleClick = vi.fn();
      render(<DynButton onClick={handleClick}>Click</DynButton>);
      
      const button = screen.getByRole('button');
      button.focus();
      
      await userEvent.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalled();
    });

    it('should have accessible button role', () => {
      render(<DynButton>Click</DynButton>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  // SNAPSHOT TEST
  it('should match snapshot', () => {
    const { container } = render(
      <DynButton variant="primary" size="md">
        Click me
      </DynButton>
    );
    expect(container).toMatchSnapshot();
  });
});
```

**Task Checklist**:
- [ ] Create `.test.tsx` file with test cases
- [ ] Smoke test (component renders)
- [ ] Props tests (all props work)
- [ ] Interaction tests (events fire)
- [ ] Accessibility tests (keyboard, ARIA)
- [ ] Snapshot test included
- [ ] Dark mode tested (if applicable)
- [ ] Responsive behavior tested (if applicable)
- [ ] All variants tested
- [ ] All states tested (disabled, hover, focus, etc.)
- [ ] Edge cases handled (empty children, long text, etc.)
- [ ] Coverage minimum 80% met

**Running Tests**:
```bash
# Run tests for this component
pnpm test DynButton

# Run with coverage
pnpm test --coverage DynButton

# Watch mode during development
pnpm test --watch DynButton
```

**Coverage Targets**:
- Statements: 80%+
- Branches: 80%+
- Functions: 80%+
- Lines: 80%+

**Success Criteria**:
- ✅ 80%+ coverage achieved
- ✅ All variants tested
- ✅ Accessibility verified
- ✅ No console warnings/errors
- ✅ Tests are readable and maintainable

---

#### STEP 6: Document in Storybook
**Duration**: 15-20 minutes  
**Effort**: Low-Medium  
**Output**: Complete component documentation

**Storybook Template**:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { DynButton } from './DynButton';

const meta = {
  title: 'Components/DynButton',
  component: DynButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
    onClick: {
      action: 'clicked',
    },
  },
} satisfies Meta<typeof DynButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// PRIMARY VARIANT
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

// SECONDARY VARIANT
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

// SIZES
export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small Button',
  },
};

// DISABLED STATE
export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};

// DARK MODE
export const DarkMode: Story = {
  args: {
    children: 'Dark Mode Button',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};
```

**Task Checklist**:
- [ ] Meta information defined (title, component, tags)
- [ ] argTypes defined for all props
- [ ] All variants have their own story
- [ ] All sizes have their own story
- [ ] All states documented (disabled, loading, etc.)
- [ ] Dark mode story included
- [ ] Responsive story included (if applicable)
- [ ] Stories are self-documenting
- [ ] Examples show real-world usage

**Success Criteria**:
- ✅ Storybook builds without errors
- ✅ All variants visible
- ✅ Dark mode toggle works
- ✅ Component renders correctly in Storybook
- ✅ Documentation is clear

---

#### STEP 7: Verify Quality
**Duration**: 5-10 minutes  
**Effort**: Low  
**Output**: Quality confirmation

See [Section 8: Verification Checklist](#verification-checklist) for complete checklist.

**Quick Verification**:
```bash
# 1. Build check
pnpm build

# 2. Type check
pnpm tsc --noEmit

# 3. Linting
pnpm lint

# 4. Test coverage
pnpm test --coverage [ComponentName]

# 5. Storybook
pnpm storybook

# 6. Component exports
pnpm test components/index.test.tsx
```

---

#### STEP 8: Submit & Review
**Duration**: 5 minutes  
**Effort**: Low  
**Output**: PR ready for merge

**PR Checklist**:
- [ ] All checklist items from STEP 7 passed
- [ ] Code follows linting standards
- [ ] Tests are passing (80%+ coverage)
- [ ] Storybook stories created
- [ ] Dark mode implemented & tested
- [ ] Responsive design implemented & tested
- [ ] Accessibility standards met
- [ ] Token naming consistent
- [ ] No console warnings/errors
- [ ] Commit messages are clear
- [ ] PR description references component spec
- [ ] Ready for peer review

**PR Description Template**:
```markdown
## [Component] Implementation

### What
Implemented/updated [ComponentName] according to specification

### Changes
- [ ] CSS with design tokens
- [ ] React component with all props
- [ ] TypeScript types
- [ ] Unit & integration tests (80%+ coverage)
- [ ] Storybook documentation
- [ ] Dark mode support
- [ ] Responsive design
- [ ] Accessibility (WCAG 2.1 AA)

### Verification
- [x] All checklist items passed
- [x] Tests passing
- [x] Coverage 80%+
- [x] Storybook builds
- [x] No console errors

### Links
- Spec: [Link to component spec]
- Jira: [Link to ticket]
```

---

## 📊 CURRENT STATE ANALYSIS

### Component Inventory

**Total Components**: 40

#### By Category

| Category | Components | Status |
|----------|-----------|--------|
| **Layout** | DynFlex, DynStack, DynBox, DynContainer, DynGrid, DynSpaced | ✅ Mostly Complete |
| **Forms** | DynInput, DynTextArea, DynLabel, DynFieldContainer, DynCheckbox, DynSelect | ⚠️ Needs Audit |
| **Navigation** | DynAppbar, DynMenu, DynSidebar, DynTabs, DynResponsiveTabs, DynToolbar, DynBreadcrumb, DynTreeView, DynListView | ⚠️ Needs Audit |
| **Data Display** | DynTable, DynChart, DynGauge | ⚠️ Needs Audit |
| **Feedback** | DynModal, DynBadge, DynAvatar, DynIcon | ⚠️ Needs Audit |
| **Other** | DynButton, DynDropdown, DynDatePicker, DynDivider, DynPage, DynStepper, DynLabel, ThemeSwitcher | ⚠️ Mixed State |

#### Priority Breakdown

**P0 - CRITICAL** (Week 1-2)
- [ ] DynFlex - Fix scope leakage issues
- [ ] DynBadge - Standardize token naming
- [ ] DynModal - Replace hardcoded values

**P1 - IMPORTANT** (Week 3-4)
- [ ] DynButton - Audit & polish
- [ ] DynInput - Audit & polish
- [ ] DynCard (NEW) - Create from scratch
- [ ] DynTooltip (NEW) - Create from scratch
- [ ] DynDropdown - Create/enhance

**P2 - NICE-TO-HAVE** (Week 5)
- [ ] DynTabs
- [ ] DynPagination (NEW)
- [ ] DynAlert (NEW)
- [ ] DynSpinner (NEW)
- [ ] DynBreadcrumb

**P3+** (Week 6+)
- All remaining components

---

## ✅ COMPONENT STRUCTURE STANDARD

### File Template for Every Component

```
ComponentName/
│
├── ComponentName.tsx
│   └── Main React component
│       - forwardRef for ref handling
│       - All props from .types.ts
│       - CSS Module styles
│       - Proper className management
│       - JSDoc comments
│
├── ComponentName.types.ts
│   └── TypeScript interfaces
│       - Props interface extending React component props
│       - Event handler types
│       - Variant/size union types
│       - All properties documented
│
├── ComponentName.module.css
│   └── All styles with design tokens
│       - Zero hardcoded colors
│       - All tokens with 3-level fallback
│       - Dark mode variants
│       - Responsive design
│       - All states (hover, focus, disabled, etc.)
│
├── ComponentName.stories.tsx
│   └── Storybook documentation
│       - Meta with argTypes
│       - One story per variant
│       - One story per size
│       - Dark mode story
│       - Responsive story
│
├── ComponentName.test.tsx
│   └── Comprehensive tests (80%+ coverage)
│       - Smoke tests
│       - Props tests
│       - Interaction tests
│       - Accessibility tests
│       - Snapshot test
│
├── ComponentName.snapshot.test.tsx (optional)
│   └── Snapshot testing
│
├── __snapshots__/ (auto-generated)
│   └── Generated by testing library
│
└── index.ts
    └── Barrel export
        - export { ComponentName } from './ComponentName'
        - export type { ComponentProps } from './ComponentName.types'
```

### File Naming Rules

✅ **CORRECT**:
- `DynButton.tsx`
- `DynButton.types.ts`
- `DynButton.module.css`
- `DynButton.stories.tsx`
- `DynButton.test.tsx`
- `DynButton.snapshot.test.tsx`

❌ **INCORRECT**:
- `Button.tsx` (missing Dyn prefix)
- `dyn-button.tsx` (wrong case)
- `Button.module.css` (inconsistent)
- `button.test.tsx` (lowercase)

---

## 🎨 TOKEN SYSTEM REFERENCE

### Token Categories

#### 1. **Colors**
```css
--dyn-color-primary: #3b82f6;
--dyn-color-primary-dark: #1e40af;
--dyn-color-success: #10b981;
--dyn-color-warning: #f59e0b;
--dyn-color-danger: #ef4444;
--dyn-color-neutral-50: #f9fafb;
--dyn-color-neutral-900: #111827;
```

#### 2. **Spacing**
```css
--dyn-spacing-xs: 4px;
--dyn-spacing-sm: 8px;
--dyn-spacing-md: 12px;
--dyn-spacing-lg: 16px;
--dyn-spacing-xl: 24px;
--dyn-spacing-2xl: 32px;
```

#### 3. **Typography**
```css
--dyn-font-size-xs: 12px;
--dyn-font-size-sm: 14px;
--dyn-font-size-md: 16px;
--dyn-font-size-lg: 18px;
--dyn-font-size-xl: 20px;

--dyn-font-weight-normal: 400;
--dyn-font-weight-medium: 500;
--dyn-font-weight-bold: 600;

--dyn-line-height-tight: 1.2;
--dyn-line-height-normal: 1.5;
--dyn-line-height-relaxed: 1.75;
```

#### 4. **Border Radius**
```css
--dyn-radius-xs: 2px;
--dyn-radius-sm: 4px;
--dyn-radius-md: 6px;
--dyn-radius-lg: 8px;
--dyn-radius-full: 9999px;
```

#### 5. **Shadows**
```css
--dyn-shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--dyn-shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
--dyn-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--dyn-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
```

#### 6. **Z-Index**
```css
--dyn-z-base: 0;
--dyn-z-dropdown: 1000;
--dyn-z-modal: 1050;
--dyn-z-popover: 1060;
--dyn-z-tooltip: 1070;
```

### Token Naming Convention

```
--dyn-[component]-[property]-[state/modifier]
```

**Examples**:
- `--dyn-button-bg` → Button background
- `--dyn-button-bg-hover` → Button background on hover
- `--dyn-button-text` → Button text color
- `--dyn-input-border` → Input border
- `--dyn-input-border-focus` → Input border when focused
- `--dyn-link-color` → Link color
- `--dyn-link-color-visited` → Link color when visited

### 3-Level Fallback Pattern (REQUIRED)

```css
/* ✅ CORRECT - Always has 3-level fallback */
color: var(--dyn-button-text, var(--legacy-button-text, #ffffff));
background: var(--dyn-button-bg, var(--legacy-button-bg, #3b82f6));

/* ❌ WRONG - Missing fallbacks */
color: var(--dyn-button-text);
background: #3b82f6;
```

**Why 3 levels?**
1. **Level 1** (`--dyn-*`) - New DYN UI token
2. **Level 2** (`--legacy-*`) - Legacy token for compatibility
3. **Level 3** (hardcoded) - Fallback color value

---

## 🧪 QUALITY STANDARDS

### 1. **Test Coverage**

**Minimum**: 80% across all metrics

- Statements: 80%+
- Branches: 80%+
- Functions: 80%+
- Lines: 80%+

**Test Categories**:
- ✅ Smoke tests (component renders)
- ✅ Props tests (all props work)
- ✅ Interaction tests (events fire)
- ✅ Accessibility tests (WCAG 2.1 AA)
- ✅ Snapshot tests
- ✅ State tests (dark mode, responsive)

### 2. **Token Compliance**

**100% Compliance Required**

- ✅ All colors use `--dyn-*` or `--legacy-*` tokens
- ✅ All spacing uses tokens
- ✅ All font sizes use tokens
- ✅ All border radius uses tokens
- ✅ All shadows use tokens
- ✅ Zero hardcoded colors except in fallback

**Verification Command**:
```bash
# Check for hardcoded colors in CSS
grep -r "rgb\|#[0-9a-f]" packages/dyn-ui-react/src/components/[ComponentName]/*.module.css
# Should only find colors in fallback comments
```

### 3. **Dark Mode Support**

**Required for all components**

```css
/* Always define dark mode variants */
@media (prefers-color-scheme: dark) {
  .component {
    background-color: var(--dyn-component-bg-dark, ...);
    color: var(--dyn-component-text-dark, ...);
  }
}
```

**Test in Storybook**: Dark mode toggle should work

### 4. **Responsive Design**

**Required for all interactive components**

```css
/* Mobile-first approach */
.component {
  /* Mobile styles (< 768px) */
}

@media (min-width: 768px) {
  .component {
    /* Tablet+ styles */
  }
}

@media (min-width: 1024px) {
  .component {
    /* Desktop+ styles */
  }
}
```

**Breakpoints**:
- Mobile: < 768px
- Tablet: 768px - 1023px
- Desktop: 1024px+

### 5. **Accessibility (WCAG 2.1 AA)**

**Required checklist**:
- ✅ Color contrast ≥ 4.5:1 (normal text)
- ✅ Color contrast ≥ 3:1 (large text)
- ✅ Keyboard navigation supported
- ✅ Focus indicators visible
- ✅ ARIA labels where appropriate
- ✅ Semantic HTML used
- ✅ No color-only information
- ✅ Screen reader tested

**Testing Tool**: Use axe DevTools browser extension

### 6. **TypeScript Compliance**

**No `any` types allowed**

```typescript
// ❌ WRONG
export interface DynButtonProps {
  onClick: any;
  className: any;
}

// ✅ CORRECT
export interface DynButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}
```

### 7. **Linting & Formatting**

**Command**: `pnpm lint`

- No ESLint warnings
- No unused variables
- No console.log statements
- Proper import/export syntax

---

## 📝 COMPONENT SPECIFICATION TEMPLATE

Use this template when creating a new component or documenting existing one:

```markdown
# [ComponentName] Specification

## Overview
Brief description of what the component does.

## Purpose
Why does this component exist? What problem does it solve?

## Current State
- **Status**: [Not Started | In Progress | Complete | Audit Needed]
- **Location**: `packages/dyn-ui-react/src/components/[ComponentName]`
- **Files**: [List existing files]
- **Issues**: [List any known issues]

## Requirements

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | 'primary' \| 'secondary' | 'primary' | Button style variant |
| `size` | 'sm' \| 'md' \| 'lg' | 'md' | Button size |
| `disabled` | boolean | false | Disable button |

### CSS Classes
- `.button` - Base button
- `.button--primary` - Primary variant
- `.button--secondary` - Secondary variant
- `.button--sm` - Small size
- `.button--md` - Medium size
- `.button--lg` - Large size
- `.button--disabled` - Disabled state

### Design Tokens
| Token | Purpose | Value |
|-------|---------|-------|
| `--dyn-button-bg` | Background color | #3b82f6 |
| `--dyn-button-text` | Text color | #ffffff |
| `--dyn-button-border` | Border color | transparent |

## Implementation Checklist
- [ ] All files created/updated
- [ ] CSS with tokens implemented
- [ ] React component complete
- [ ] TypeScript types defined
- [ ] Unit tests (80%+ coverage)
- [ ] Storybook documentation
- [ ] Dark mode support
- [ ] Responsive design
- [ ] Accessibility verified
- [ ] PR submitted

## Verification Checklist
Use [Section 8](#verification-checklist) checklist

## Related Components
- [Link to related components]

## References
- [Design system documentation]
- [WCAG 2.1 AA guidelines]
```

---

## 🔍 VERIFICATION CHECKLIST

### Pre-Submission Checklist (STEP 7)

**Must pass ALL items before submitting PR**

#### CSS & Design Tokens

- [ ] **Color tokens**: All colors use `--dyn-*` tokens (zero hardcoded colors except fallback)
- [ ] **Spacing tokens**: All spacing uses `--dyn-spacing-*` tokens
- [ ] **Font tokens**: All font sizes use `--dyn-font-size-*` tokens
- [ ] **Radius tokens**: All border radius uses `--dyn-radius-*` tokens
- [ ] **Shadow tokens**: All shadows use `--dyn-shadow-*` tokens
- [ ] **3-level fallback**: Every token has `var(--dyn-*, var(--legacy-*, fallback))`
- [ ] **Dark mode**: All color-dependent styles have dark mode variant
- [ ] **Responsive**: Component responds to `max-width: 768px` breakpoint
- [ ] **States**: Hover, focus, active, disabled states styled
- [ ] **No scoped leakage**: Styles don't affect parent/child elements

**Run this command**:
```bash
pnpm lint
# Should show 0 CSS-related errors
```

#### React Component

- [ ] **Exports**: Named export with correct name
- [ ] **Props**: All props from `.types.ts` properly handled
- [ ] **forwardRef**: Component uses `forwardRef` for ref handling
- [ ] **className**: Accepts and applies `className` prop
- [ ] **Spreading**: Props correctly spread to underlying element
- [ ] **Default values**: All props have appropriate defaults
- [ ] **Display name**: `displayName` property set
- [ ] **JSDoc**: Component documented with `/**` comments
- [ ] **No console**: No `console.log`, `console.error`, etc.
- [ ] **No any types**: No `any` TypeScript types

**Run this command**:
```bash
pnpm tsc --noEmit
# Should show 0 TypeScript errors
```

#### TypeScript Types

- [ ] **Props interface**: Extends appropriate React type
- [ ] **Exports**: Types exported for external use
- [ ] **Documentation**: All properties documented
- [ ] **Union types**: Variant/size as union types (not strings)
- [ ] **No any**: Zero `any` types
- [ ] **Proper typing**: All event handlers properly typed

#### Unit Tests

- [ ] **Smoke test**: Component renders without props
- [ ] **Props tests**: Each prop tested individually
- [ ] **Variants**: Each variant renders correctly
- [ ] **Sizes**: Each size renders correctly
- [ ] **States**: Disabled, active, etc. states tested
- [ ] **Interactions**: Click, focus, keyboard events tested
- [ ] **Accessibility**: Keyboard nav, ARIA, roles tested
- [ ] **Dark mode**: Tested with dark mode variant (if applicable)
- [ ] **Coverage**: 80%+ coverage achieved
- [ ] **No warnings**: No test warnings/errors in console

**Run this command**:
```bash
pnpm test --coverage [ComponentName]
# Should show 80%+ coverage in all metrics
```

#### Storybook Documentation

- [ ] **Meta defined**: title, component, parameters set
- [ ] **argTypes**: All props have control/documentation
- [ ] **Primary story**: Main/default variant shown
- [ ] **Variant stories**: One story per variant
- [ ] **Size stories**: One story per size
- [ ] **State stories**: Disabled, loading, error states
- [ ] **Dark mode**: Separate story with dark background
- [ ] **Responsive**: Mobile view demonstrable
- [ ] **Real usage**: Stories show real-world usage
- [ ] **Autodocs**: Generated documentation accurate

**Run this command**:
```bash
pnpm storybook
# Navigate to component story and verify all variants render
```

#### Accessibility

- [ ] **WCAG 2.1 AA**: All standards met
- [ ] **Contrast**: Text contrast ≥ 4.5:1 (normal), ≥ 3:1 (large)
- [ ] **Keyboard**: Full keyboard navigation supported
- [ ] **Focus visible**: Focus indicators clearly visible
- [ ] **ARIA labels**: Interactive elements have labels
- [ ] **Semantic HTML**: Proper semantic elements used
- [ ] **Color**: Not sole means of information
- [ ] **Screen reader**: Screen reader navigation works

**Run this command**:
```bash
# Install axe DevTools in browser and run accessibility check
```

#### Build & Exports

- [ ] **TypeScript build**: `pnpm build` completes without errors
- [ ] **Barrel export**: Component exported in `packages/dyn-ui-react/src/components/index.ts`
- [ ] **Test export**: Component test in `components/index.test.tsx` includes component
- [ ] **No unused**: No unused imports/variables
- [ ] **Tree-shakeable**: Component properly exported for tree-shaking

**Run this command**:
```bash
pnpm build
# Should complete without errors
```

#### Documentation

- [ ] **Component spec**: Spec file created/updated (if applicable)
- [ ] **Comments**: Code has clear comments
- [ ] **JSDoc**: Functions have JSDoc comments
- [ ] **README**: Component README created (if complex)
- [ ] **Examples**: Example usage shown in comments

#### Git & PR

- [ ] **Commits**: Clear, descriptive commit messages
- [ ] **Branch**: Feature branch with descriptive name
- [ ] **PR title**: Clear title referencing component
- [ ] **PR description**: Checklist filled, changes described
- [ ] **No conflicts**: No merge conflicts
- [ ] **All checks pass**: CI/CD all green

---

## ⚠️ COMMON ISSUES & SOLUTIONS

### Issue 1: Token Not Applying

**Symptom**: Style looks wrong, tokens seem ignored

**Solutions**:
1. Check CSS Module import: `import styles from './Button.module.css'`
2. Verify token name exists in CSS variable list
3. Check fallback chain: `var(--dyn-*, var(--legacy-*, fallback))`
4. Run: `pnpm lint` (might show undefined tokens)
5. Verify CSS Module scoping (shouldn't affect global styles)

**Verification**:
```css
/* Good - Token is available */
color: var(--dyn-button-text, var(--legacy-button-text, #ffffff));

/* Bad - Token name typo */
color: var(--dyn-btn-txt, var(--legacy-btn-txt, #ffffff));
```

### Issue 2: Dark Mode Not Working

**Symptom**: Component looks same in light and dark mode

**Solutions**:
1. Add `@media (prefers-color-scheme: dark)` block to CSS
2. Define all color tokens for dark mode
3. Test with browser dev tools: F12 → Rendering → Emulate CSS media feature
4. Ensure Storybook dark mode story created
5. Check that fallback colors are different for dark mode

**Verification**:
```css
/* Light mode */
.button {
  background-color: var(--dyn-button-bg, #3b82f6);
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  .button {
    background-color: var(--dyn-button-bg-dark, #1e40af);
  }
}
```

### Issue 3: Styles Leaking to Other Components

**Symptom**: Styling affects parent/child elements unexpectedly

**Solutions**:
1. Ensure using CSS Modules (`.module.css`)
2. Don't use global selectors (e.g., `button { }`)
3. Scope all styles to component class
4. Don't use `!important` (indicates scoping issue)
5. Check for parent selector abuse

**Verification**:
```css
/* ❌ Bad - affects all buttons */
button {
  color: #000;
}

/* ✅ Good - scoped to component */
.button {
  color: #000;
}

.button > span {
  /* Child styling OK, but scoped */
}
```

### Issue 4: Test Coverage Below 80%

**Symptom**: Coverage report shows <80% in some metrics

**Solutions**:
1. Add more test cases for uncovered branches
2. Test all props individually
3. Test all variant combinations
4. Test error states and edge cases
5. Use `pnpm test --coverage --verbose` to see uncovered lines

**Verification**:
```bash
pnpm test --coverage [ComponentName]
# Look at coverage output, add tests for red lines
```

### Issue 5: TypeScript Errors

**Symptom**: `tsc --noEmit` shows type errors

**Solutions**:
1. Avoid `any` types - use proper TypeScript
2. Extend appropriate interface from React
3. Import types properly: `import type { SomeType } from '...'`
4. Check prop types in `.types.ts` file
5. Use union types instead of string literals

**Verification**:
```typescript
/* ❌ Bad */
export interface Props {
  onClick: any;
}

/* ✅ Good */
export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
```

### Issue 6: Linting Failures

**Symptom**: `pnpm lint` shows errors

**Common issues**:
- Unused imports: Remove or use
- console.log: Remove for production
- Missing semicolons: Add (if rule enabled)
- Line length: Break long lines
- Variable naming: Use camelCase for variables

**Fix all at once**:
```bash
pnpm lint -- --fix
```

### Issue 7: Build Fails

**Symptom**: `pnpm build` fails

**Solutions**:
1. Run `pnpm tsc --noEmit` to check TypeScript
2. Run `pnpm lint` to check linting
3. Check for missing dependencies
4. Verify CSS imports are correct
5. Look at error message for specific issue

**Debug**:
```bash
# More verbose output
pnpm build -- --verbose
```

### Issue 8: Snapshot Test Mismatch

**Symptom**: Snapshot tests fail after changes

**Solutions**:
1. Review the diff - is change intentional?
2. If intentional: `pnpm test -- -u` to update snapshots
3. If not intentional: fix code to match snapshot
4. Only update snapshots if change is correct

---

## 📚 REFERENCE LINKS

### Documentation Files in This System
- [AI-WORKFLOW/00_MASTER_AI_IMPLEMENTATION_GUIDE.md](./00_MASTER_AI_IMPLEMENTATION_GUIDE.md) ← You are here
- [AI-WORKFLOW/01_COMPONENT_ANALYSIS_TOOL.md](./01_COMPONENT_ANALYSIS_TOOL.md) - Analyze existing components
- [AI-WORKFLOW/02_AI_WORKFLOW_VALIDATOR.md](./02_AI_WORKFLOW_VALIDATOR.md) - Validate workflow clarity
- [AI-WORKFLOW/03_IMPLEMENTATION_READINESS_CHECKLIST.md](./03_IMPLEMENTATION_READINESS_CHECKLIST.md) - Pre-implementation checklist

### External References
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [WCAG 2.1 AA Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [CSS Modules Documentation](https://github.com/css-modules/css-modules)
- [Storybook Documentation](https://storybook.js.org/docs/)
- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

### Project Files
- **Main docs**: `/docs/` folder
- **Components**: `/packages/dyn-ui-react/src/components/`
- **Configuration**: `/packages/dyn-ui-react/tsconfig.json`
- **Testing config**: `/vitest.config.ts`
- **Storybook config**: `/.storybook/`

---

## ✅ CHECKLIST: Am I Ready to Start?

Before you begin implementation, verify:

- [ ] You've read this entire guide (15 minutes)
- [ ] You understand the 8-step workflow
- [ ] You understand the token system
- [ ] You know which quality standards apply
- [ ] You have a specific component to work on
- [ ] You understand the PR process
- [ ] You know how to run tests locally
- [ ] You know how to run Storybook locally
- [ ] You have linting/formatting set up
- [ ] You're ready to start Step 1: Analyze Current State

---

## 🚀 NEXT STEPS

### For AI Agents
1. ✅ Read this guide completely
2. ✅ Choose a component from [Current State Analysis](#current-state-analysis)
3. ✅ Follow the [8-Step Workflow](#8-step-ai-implementation-workflow)
4. ✅ Use [Verification Checklist](#verification-checklist) before PR

### For Human Developers
1. ✅ Read sections relevant to your role
2. ✅ Use this guide as reference while coding
3. ✅ Follow the checklist section for quality assurance
4. ✅ Ask questions if anything is unclear

### For Project Managers
1. ✅ Use [Current State Analysis](#current-state-analysis) for tracking
2. ✅ Reference timeline in priority breakdown
3. ✅ Monitor checklist completion for PRs

---

**Document Version**: 2.0 - AI-Optimized  
**Last Updated**: December 28, 2025  
**Next Review**: January 15, 2026  
**Status**: ✅ COMPLETE & READY FOR AI IMPLEMENTATION
