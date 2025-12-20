# COMPONENT STRUCTURE & FILE ORGANIZATION

**Purpose**: Define where every file goes in the project  
**Audience**: AI Agent + Technical Architects  
**Date**: December 20, 2025

---

## 📁 COMPLETE PROJECT FILE STRUCTURE

### React Components Directory

```
packages/dyn-ui-react/src/components/
│
├── DynButton/
│   ├── DynButton.module.css
│   │   └─ CSS module with --dyn-button-* tokens
│   │   └─ Token definitions at .root level
│   │   └─ Variants as token overrides only
│   │   └─ Dark mode in @media (prefers-color-scheme: dark)
│   │   └─ Responsive in @media (max-width: 767px)
│   │   └─ Accessibility rules (focus ring, contrast)
│   │
│   ├── DynButton.tsx
│   │   └─ React component
│   │   └─ Props interface
│   │   └─ Default exports
│   │
│   ├── DynButton.types.ts
│   │   └─ TypeScript interfaces
│   │   └─ Props type
│   │
│   ├── DynButton.stories.tsx
│   │   └─ Storybook stories
│   │   └─ All variants shown
│   │   └─ Dark mode story
│   │   └─ Token values documented
│   │
│   ├── DynButton.test.tsx
│   │   └─ Jest/Vitest tests
│   │   └─ Token application tests
│   │   └─ Variant tests
│   │   └─ Dark mode tests
│   │   └─ Responsive tests
│   │
│   └── index.ts
│       └─ export { DynButton }
│
├── DynInput/
│   └─ Same structure as DynButton
│
├── DynFlex/
│   └─ Same structure as DynButton
│
└── [34 more components]
```

### Design Tokens Directory

```
packages/design-tokens/
│
├── src/
│   └─ Token definitions (TypeScript)
│
├── styles/
│   │
│   ├── foundations/
│   │   ├── colors.css
│   │   │   └─ --dyn-color-* tokens (light + dark)
│   │   ├── spacing.css
│   │   │   └─ --dyn-spacing-* tokens
│   │   ├── typography.css
│   │   │   └─ --dyn-font-* tokens
│   │   ├── shadows.css
│   │   │   └─ --dyn-shadow-* tokens
│   │   ├── radius.css
│   │   │   └─ --dyn-radius-* tokens
│   │   └── transitions.css
│   │       └─ --dyn-transition-* tokens
│   │
│   ├── components/
│   │   ├── buttons.css
│   │   │   └─ --dyn-button-* tokens
│   │   ├── inputs.css
│   │   │   └─ --dyn-input-* tokens
│   │   ├── layout.css
│   │   │   └─ --dyn-flex-*, --dyn-grid-* tokens
│   │   ├── display.css
│   │   │   └─ --dyn-badge-*, --dyn-tag-* tokens
│   │   ├── data.css
│   │   │   └─ --dyn-table-*, --dyn-list-* tokens
│   │   ├── navigation.css
│   │   │   └─ --dyn-nav-*, --dyn-breadcrumb-* tokens
│   │   ├── overlay.css
│   │   │   └─ --dyn-modal-*, --dyn-tooltip-* tokens
│   │   └── specialized.css
│   │       └─ --dyn-[specialized]-* tokens
│   │
│   └── themes/
│       ├── light.css
│       │   └─ Light mode overrides (if needed)
│       ├── dark.css
│       │   └─ Dark mode overrides (if needed)
│       ├── high-contrast.css
│       │   └─ High contrast overrides
│       └── seasonal.css
│           └─ Seasonal/custom overrides
│
└── tokens/
    └─ JSON or YAML token definitions
```

### Documentation Directory (For AI Agent)

```
docs/
│
├── TOKENS/                          [6 files - Human readable]
│   ├── 00_README_START_HERE.md
│   ├── 01_TOKENS_KNOWLEDGE_BASE.md
│   ├── 02_FOCUSED_TOKENS_IMPLEMENTATION.md
│   ├── 03_IMPLEMENTATION_CHECKLIST.md
│   ├── 04_QUICK_REFERENCE_WALL_POSTER.md
│   └── 05_Design_Tokens_Standard_v1.md
│
├── ARCHITECTURE/                    [5 files - Technical specs]
│   ├── 00_COMPONENT_STRUCTURE.md
│   ├── 01_TOKEN_HIERARCHY.md
│   ├── 02_COMPONENT_CATEGORIES.md
│   ├── 03_NAMING_CONVENTIONS.md
│   └── 04_FILE_ORGANIZATION.md
│
├── GUIDES/                          [4 files - Step-by-step]
│   ├── 00_AI_AGENT_SETUP.md
│   ├── 01_COMPONENT_IMPLEMENTATION.md
│   ├── 02_VERIFICATION_PROTOCOL.md
│   └── 03_ERROR_HANDLING.md
│
└── AI-SPECS/                        [5 JSON files - For parser]
    ├── token-mappings.json
    ├── component-checklist.json
    ├── category-templates.json
    ├── css-patterns.json
    └── verification-rules.json
```

---

## 📝 CSS MODULE FILE STRUCTURE

### Template: DynComponent.module.css

```css
/* DynComponent.module.css */

:root {
  /* Foundation tokens - referenced from design-tokens/ */
  --dyn-component-bg: var(--dyn-color-primary, #2563eb);
  --dyn-component-color: var(--dyn-color-primary-contrast, #ffffff);
  --dyn-component-border: var(--dyn-color-border, rgba(0, 0, 0, 0.1));
  --dyn-component-padding-y: var(--dyn-spacing-md, 0.75rem);
  --dyn-component-padding-x: var(--dyn-spacing-lg, 1rem);
  --dyn-component-font-size: var(--dyn-font-size-base, 1rem);
  --dyn-component-font-weight: var(--dyn-font-weight-medium, 500);
  --dyn-component-border-radius: var(--dyn-radius-md, 0.5rem);
  --dyn-component-shadow: var(--dyn-shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.1));
  --dyn-component-transition: var(--dyn-transition-base, 150ms ease-out);
  --dyn-component-touch-target: var(--dyn-spacing-xl, 2.75rem);
}

/* Base component styles */
.component {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: var(--dyn-component-touch-target);
  min-height: var(--dyn-component-touch-target);
  padding: var(--dyn-component-padding-y) var(--dyn-component-padding-x);
  background-color: var(--dyn-component-bg);
  color: var(--dyn-component-color);
  border: 1px solid var(--dyn-component-border);
  border-radius: var(--dyn-component-border-radius);
  font-size: var(--dyn-component-font-size);
  font-weight: var(--dyn-component-font-weight);
  box-shadow: var(--dyn-component-shadow);
  transition: all var(--dyn-component-transition);
  cursor: pointer;
}

.component:hover {
  --dyn-component-bg: var(--dyn-color-primary-hover, #1d4ed8);
  --dyn-component-shadow: var(--dyn-shadow-md, 0 4px 6px rgba(0, 0, 0, 0.1));
}

.component:active {
  --dyn-component-bg: var(--dyn-color-primary-active, #1e40af);
}

.component:focus-visible {
  outline: 2px solid var(--dyn-color-focus, #3b82f6);
  outline-offset: 2px;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.component:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* Variants */
.componentSecondary {
  --dyn-component-bg: var(--dyn-color-secondary, #f3f4f6);
  --dyn-component-color: var(--dyn-color-secondary-contrast, #1f2937);
  --dyn-component-border: var(--dyn-color-secondary-border, #e5e7eb);
}

.componentTertiary {
  --dyn-component-bg: transparent;
  --dyn-component-color: var(--dyn-color-primary, #2563eb);
  --dyn-component-border: var(--dyn-color-primary, #2563eb);
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --dyn-component-bg: var(--dyn-color-primary-dark, #1e3a8a);
    --dyn-component-color: var(--dyn-color-primary-contrast-dark, #f9fafb);
    --dyn-component-border: var(--dyn-color-border-dark, rgba(255, 255, 255, 0.1));
  }

  .componentSecondary {
    --dyn-component-bg: var(--dyn-color-secondary-dark, #1f2937);
    --dyn-component-color: var(--dyn-color-secondary-contrast-dark, #f9fafb);
  }
}

/* Responsive */
@media (max-width: 767px) {
  :root {
    --dyn-component-padding-y: var(--dyn-spacing-sm, 0.5rem);
    --dyn-component-padding-x: var(--dyn-spacing-md, 0.75rem);
    --dyn-component-touch-target: var(--dyn-spacing-lg, 3rem);
  }

  .component {
    width: 100%;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .component {
    --dyn-component-transition: none;
  }
}

@media (prefers-contrast: more) {
  .component {
    border-width: 2px;
  }
}
```

---

## 🏗️ COMPONENT ORGANIZATION RULES

### Rule 1: Token Definitions
- ✅ Define at `:root` level (component scope, NOT `:root` global)
- ✅ 3-level fallback: `var(--dyn-*, var(--legacy-*, fallback-value))`
- ✅ Reference foundation tokens from design-tokens/
- ✅ Never hardcode values (except fallbacks)

### Rule 2: Variants
- ✅ Create as token overrides only
- ✅ Example: `.componentSecondary { --dyn-component-bg: ... }`
- ✅ No duplicate CSS properties
- ✅ All variants share base styles

### Rule 3: Dark Mode
- ✅ Use `@media (prefers-color-scheme: dark)`
- ✅ Override only changed tokens
- ✅ Never duplicate entire ruleset
- ✅ Include ALL dark variants

### Rule 4: Responsive
- ✅ Use `@media (max-width: 767px)` for mobile
- ✅ Override only changed tokens/properties
- ✅ Mobile-first approach
- ✅ Touch targets >= 44px on mobile

### Rule 5: Accessibility
- ✅ Focus ring visible (3px+)
- ✅ Color contrast >= 4.5:1
- ✅ Support `prefers-reduced-motion: reduce`
- ✅ Support `prefers-contrast: more`

---

## 📄 TYPESCRIPT FILE STRUCTURE

### Template: DynComponent.tsx

```typescript
import React, { ReactNode } from 'react';
import styles from './DynComponent.module.css';
import type { DynComponentProps } from './DynComponent.types';

/**
 * DynComponent - Description of component
 *
 * @component
 * @example
 * const [count, setCount] = React.useState(0);
 * return <DynComponent onClick={() => setCount(count + 1)}>{count}</DynComponent>
 */
export const DynComponent = React.forwardRef<
  HTMLButtonElement,
  DynComponentProps
>(
  (
    {
      children,
      variant = 'primary',
      disabled = false,
      onClick,
      ...rest
    },
    ref,
  ) => {
    const className = [
      styles.component,
      variant === 'secondary' && styles.componentSecondary,
      variant === 'tertiary' && styles.componentTertiary,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        className={className}
        disabled={disabled}
        onClick={onClick}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

DynComponent.displayName = 'DynComponent';
```

### Template: DynComponent.types.ts

```typescript
import { ReactNode } from 'react';

export interface DynComponentProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button variant
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'tertiary';

  /**
   * Children content
   */
  children: ReactNode;

  /**
   * Is button disabled
   * @default false
   */
  disabled?: boolean;
}
```

---

## 🎨 STORYBOOK FILE STRUCTURE

### Template: DynComponent.stories.tsx

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { DynComponent } from './DynComponent';

const meta = {
  title: 'Components/DynComponent',
  component: DynComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'DynComponent - primary action component',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DynComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};

export const DarkMode: Story = {
  args: {
    children: 'Dark Mode Button',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};
```

---

## ✅ TEST FILE STRUCTURE

### Template: DynComponent.test.tsx

```typescript
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DynComponent } from './DynComponent';

describe('DynComponent', () => {
  it('renders with text', () => {
    render(<DynComponent>Click me</DynComponent>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies primary variant token', () => {
    const { container } = render(
      <DynComponent variant="primary">Button</DynComponent>,
    );
    expect(container.querySelector('button')).not.toHaveClass(
      'componentSecondary',
    );
  });

  it('applies secondary variant token', () => {
    const { container } = render(
      <DynComponent variant="secondary">Button</DynComponent>,
    );
    expect(container.querySelector('button')).toHaveClass('componentSecondary');
  });

  it('handles click events', async () => {
    const handleClick = jest.fn();
    render(<DynComponent onClick={handleClick}>Click</DynComponent>);

    await userEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('supports disabled state', () => {
    render(<DynComponent disabled>Disabled</DynComponent>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('renders dark mode styles', () => {
    const { container } = render(<DynComponent>Button</DynComponent>);
    const button = container.querySelector('button');

    // Check that dark mode media query is present in CSS
    expect(button?.className).toBeDefined();
  });

  it('meets WCAG contrast requirements', () => {
    const { container } = render(<DynComponent>Button</DynComponent>);
    // This would require visual regression testing
    expect(container.firstChild).toBeInTheDocument();
  });

  it('has focus visible state', async () => {
    render(<DynComponent>Button</DynComponent>);
    const button = screen.getByRole('button');

    await userEvent.tab();
    expect(button).toHaveFocus();
  });
});
```

---

## 📦 INDEX FILE STRUCTURE

### Template: index.ts

```typescript
export { DynComponent } from './DynComponent';
export type { DynComponentProps } from './DynComponent.types';
```

---

## 🎯 VERIFICATION CHECKLIST

Before moving component to production:

- [ ] CSS module exists with token definitions
- [ ] TypeScript types are complete
- [ ] Component exports from index.ts
- [ ] All variants have token overrides
- [ ] Dark mode section exists
- [ ] Responsive section exists
- [ ] Accessibility rules present
- [ ] Tests cover all variants
- [ ] Storybook stories exist
- [ ] JSDoc comments present
- [ ] No hardcoded values (except fallbacks)
- [ ] Touch targets >= 44px on mobile

