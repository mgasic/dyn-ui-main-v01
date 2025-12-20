# FILE ORGANIZATION RULES

**Purpose**: Define rules for organizing files in components and tokens  
**Audience**: AI Agent + Developers  
**Date**: December 20, 2025

---

## 📝 CSS MODULE FILE RULES

### Maximum Lines per File
- **Max 300 lines** per component CSS module
- **Rationale**: Easy to read, maintain, and debug

### Structure Order

```css
/* 1. :root (TOKEN DEFINITIONS) - 20-40 lines */
:root {
  --dyn-component-bg: var(...);
  --dyn-component-color: var(...);
  /* ... all token definitions here ... */
}

/* 2. BASE COMPONENT STYLES - 20-40 lines */
.component {
  /* base styles here */
}

/* 3. COMPONENT INTERACTIONS - 10-20 lines */
.component:hover { }
.component:active { }
.component:focus-visible { }
.component:disabled { }

/* 4. VARIANTS - 30-60 lines */
.componentSecondary {
  --dyn-component-bg: var(...);
}
.componentTertiary {
  --dyn-component-bg: var(...);
}

/* 5. DARK MODE - @media (prefers-color-scheme: dark) - 30-50 lines */
@media (prefers-color-scheme: dark) {
  :root {
    --dyn-component-bg: var(...);
  }
  .componentSecondary {
    --dyn-component-bg: var(...);
  }
}

/* 6. RESPONSIVE - @media (max-width: 767px) - 20-30 lines */
@media (max-width: 767px) {
  :root {
    --dyn-component-padding: var(...);
  }
  .component {
    width: 100%;
  }
}

/* 7. ACCESSIBILITY - @media (prefers-reduced-motion/contrast) - 10-20 lines */
@media (prefers-reduced-motion: reduce) {
  .component {
    --dyn-component-transition: none;
  }
}

/* TOTAL: ~180-250 lines (well under 300) */
```

### Token Definition Rules at :root

```css
:root {
  /* Foundation token references ONLY */
  /* Pattern: var(--dyn-foundation, fallback) */
  
  --dyn-component-bg: var(--dyn-color-primary, #2563eb);
  --dyn-component-color: var(--dyn-color-primary-contrast, #ffffff);
  --dyn-component-padding-y: var(--dyn-spacing-md, 0.75rem);
  --dyn-component-border-radius: var(--dyn-radius-md, 0.5rem);
  
  /* 3-level fallback if needed */
  --dyn-component-shadow: var(--dyn-shadow-sm, var(--legacy-button-shadow, 0 1px 3px rgba(0,0,0,0.1)));
}
```

### Variant Rules (Tokens ONLY)

```css
/* ✅ CORRECT: Override tokens only */
.componentSecondary {
  --dyn-component-bg: var(--dyn-color-secondary, #f3f4f6);
  --dyn-component-color: var(--dyn-color-secondary-contrast, #1f2937);
}

/* ❌ WRONG: Duplicate CSS properties */
.componentSecondary {
  display: inline-flex;  /* Don't repeat base styles */
  padding: var(--dyn-component-padding-y) var(--dyn-component-padding-x);
  background-color: var(--dyn-color-secondary, #f3f4f6);
}
```

### Dark Mode Rules

```css
/* ✅ CORRECT: Override changed tokens ONLY */
@media (prefers-color-scheme: dark) {
  :root {
    --dyn-component-bg: var(--dyn-color-primary-dark, #1e3a8a);
    --dyn-component-color: var(--dyn-color-primary-contrast-dark, #f9fafb);
    --dyn-component-border: var(--dyn-color-border-dark, rgba(255,255,255,0.1));
  }
  
  /* Only variants that change in dark mode */
  .componentSecondary {
    --dyn-component-bg: var(--dyn-color-secondary-dark, #1f2937);
    --dyn-component-color: var(--dyn-color-secondary-contrast-dark, #f9fafb);
  }
}

/* ❌ WRONG: Don't repeat entire component styles */
@media (prefers-color-scheme: dark) {
  .component {
    display: inline-flex;  /* Don't repeat */
    padding: ...;          /* Don't repeat */
    background-color: ...;
  }
}
```

### Responsive Rules

```css
/* ✅ CORRECT: Override changed values ONLY */
@media (max-width: 767px) {
  :root {
    --dyn-component-padding-y: var(--dyn-spacing-sm, 0.5rem);
    --dyn-component-padding-x: var(--dyn-spacing-md, 0.75rem);
    --dyn-component-touch-target: var(--dyn-spacing-lg, 3rem);
  }
  
  /* Only layout that changes */
  .component {
    width: 100%;
  }
}

/* ❌ WRONG: Don't repeat styles that don't change */
@media (max-width: 767px) {
  .component {
    display: inline-flex;  /* Don't repeat */
    padding: ...;
    border-radius: ...;
    color: ...;
    background-color: var(...);  /* Changed? OK, keep */
  }
}
```

---

## 📄 TYPESCRIPT FILE RULES

### Types File (DynComponent.types.ts)

```typescript
/* Keep it PURE TypeScript - no imports from React unless needed */
export interface DynComponentProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Component variant - maps to CSS class
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'tertiary';

  /**
   * Is component disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Children content
   */
  children: ReactNode;
}
```

### Component File (DynComponent.tsx)

```typescript
/* Rules:
   - Keep it SHORT and FOCUSED
   - Main logic only (no helpers)
   - Export as default or named
   - Include displayName for debugging
*/

export const DynComponent = React.forwardRef<
  HTMLButtonElement,
  DynComponentProps
>(({ children, variant = 'primary', ...rest }, ref) => {
  const className = [
    styles.component,
    variant === 'secondary' && styles.componentSecondary,
    variant === 'tertiary' && styles.componentTertiary,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button ref={ref} className={className} {...rest}>
      {children}
    </button>
  );
});

DynComponent.displayName = 'DynComponent';
```

### Index File (index.ts)

```typescript
/* Rules:
   - Export component (default or named)
   - Export types (for TypeScript consumers)
*/

export { DynComponent } from './DynComponent';
export type { DynComponentProps } from './DynComponent.types';
```

---

## 🎨 STORYBOOK FILE RULES

### Story Template

```typescript
/* Rules:
   - Use Meta + StoryObj types
   - Set component title (Components/DynComponent)
   - Include all variants as stories
   - Document token usage in JSDoc
   - Include dark mode story
*/

const meta = {
  title: 'Components/DynComponent',
  component: DynComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Clear description of component and token usage',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DynComponent>;

export default meta;

/* Stories - one per variant + dark mode */
export const Primary: Story = { args: { variant: 'primary' } };
export const Secondary: Story = { args: { variant: 'secondary' } };
export const DarkMode: Story = {
  args: { variant: 'primary' },
  parameters: { backgrounds: { default: 'dark' } },
};
```

---

## ✅ TEST FILE RULES

### Test Template

```typescript
/* Rules:
   - Test token application (not CSS values)
   - Test variant selection
   - Test dark mode rendering
   - Test responsive behavior
   - Test accessibility
   - Use describe/it structure
*/

describe('DynComponent', () => {
  /* Token application tests */
  it('applies primary variant token', () => {
    render(<DynComponent variant="primary">Button</DynComponent>);
    expect(...).toBe(...);
  });

  /* Variant tests */
  it('applies secondary variant token', () => {
    render(<DynComponent variant="secondary">Button</DynComponent>);
    expect(...).toBe(...);
  });

  /* Dark mode tests */
  it('renders dark mode styles', () => {
    render(<DynComponent>Button</DynComponent>);
    // Verify dark mode class/styles applied
  });

  /* Responsive tests */
  it('adjusts padding on mobile', () => {
    // Mock mobile viewport
    render(<DynComponent>Button</DynComponent>);
    // Verify mobile tokens applied
  });

  /* Accessibility tests */
  it('has focus visible state', () => {
    render(<DynComponent>Button</DynComponent>);
    // Verify focus ring visible
  });
});
```

---

## 📁 DIRECTORY STRUCTURE RULES

### Component Directory Layout

```
DynButton/
├─ DynButton.module.css      [Max 300 lines]
├─ DynButton.tsx             [Max 100 lines]
├─ DynButton.types.ts        [Max 50 lines]
├─ DynButton.stories.tsx     [Max 150 lines]
├─ DynButton.test.tsx        [Max 200 lines]
└─ index.ts                  [Max 10 lines]
```

### Design Tokens Directory Layout

```
packages/design-tokens/styles/

FOUNDATIONS/
├─ colors.css                [All color tokens]
├─ spacing.css               [All spacing tokens]
├─ typography.css            [All font tokens]
├─ shadows.css               [All shadow tokens]
├─ radius.css                [All radius tokens]
├─ transitions.css           [All animation tokens]
└─ z-index.css               [All z-index tokens]

COMPONENTS/
├─ buttons.css               [--dyn-button-* reference docs]
├─ inputs.css                [--dyn-input-* reference docs]
├─ layout.css                [--dyn-flex-*, --dyn-grid-* reference docs]
├─ display.css               [--dyn-badge-*, --dyn-tag-* reference docs]
├─ data.css                  [--dyn-table-*, --dyn-list-* reference docs]
├─ navigation.css            [--dyn-nav-*, --dyn-breadcrumb-* reference docs]
├─ overlay.css               [--dyn-modal-*, --dyn-tooltip-* reference docs]
└─ specialized.css           [--dyn-card-*, --dyn-progress-* reference docs]

THEMES/
├─ light.css                 [Light mode overrides if needed]
├─ dark.css                  [Dark mode overrides if needed]
├─ high-contrast.css         [Accessibility overrides]
└─ seasonal.css              [Custom theme overrides]
```

---

## ✅ FILE CHECKLIST

Before committing:

### CSS Module
- [ ] Max 300 lines
- [ ] :root (tokens) at top
- [ ] Base styles next
- [ ] Interactions after base
- [ ] Variants as token overrides
- [ ] Dark mode section present
- [ ] Responsive section present
- [ ] Accessibility rules present

### TypeScript
- [ ] Types in separate .types.ts file
- [ ] Component imports types
- [ ] Index exports component + types
- [ ] ForwardRef used for HTML elements
- [ ] displayName set

### Storybook
- [ ] Meta object configured
- [ ] Component title set
- [ ] All variants as stories
- [ ] Dark mode story included
- [ ] Token values documented

### Tests
- [ ] Token application tested
- [ ] All variants tested
- [ ] Dark mode tested
- [ ] Responsive tested
- [ ] Accessibility tested

