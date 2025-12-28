# DynCard – Implementation Guide

## Component Overview

DynCard is a container component used to group related content.  It provides a consistent background, border, padding and shadow while allowing developers to compose a header, body and footer.  The card can be elevated, outlined or flat, supports hover and clickable states and offers small, medium and large padding sizes.  A loading state overlays the card with a spinner when content is being fetched.

## Current State Analysis

**Existing files:** none.  There is no `DynCard` directory under `packages/dyn‑ui‑react/src/components/` – the component has not yet been implemented.

**Identified gaps:**

- The React component, TypeScript types, CSS module, Storybook stories and tests all need to be created.
- The card must follow the compound component pattern with sub‑components for `Card.Header`, `Card.Body` and `Card.Footer`.
- Design tokens such as `--dyn-card-bg`, `--dyn-card-shadow` and padding tokens must be defined with three‑level fallbacks and scoped to the component.
- Variants (`elevated`, `outlined`, `flat`) and states (`hoverable`, `clickable`, `loading`, `disabled`) are not implemented.
- No dark‑mode overrides or responsive styles exist.

## Implementation Instructions

### 1. Code Structure

1. **Create a new folder** at `packages/dyn-ui-react/src/components/DynCard/`.
2. Inside, add the following files:
   - `DynCard.tsx` – the main component implementing the compound pattern.
   - `DynCard.types.ts` – TypeScript interfaces and enumerations.
   - `DynCard.module.css` – CSS module defining tokens, variants and states.
   - `DynCard.stories.tsx` – Storybook stories demonstrating variations.
   - `DynCard.test.tsx` – unit tests with Jest/React Testing Library.
   - `index.ts` – re‑exports for the component and types.

### 2. Define Types

In `DynCard.types.ts` define enums for padding sizes and variants and the props interface.  Example:

```ts
// File: packages/dyn-ui-react/src/components/DynCard/DynCard.types.ts
export type DynCardPadding = 'small' | 'medium' | 'large';
export type DynCardVariant = 'elevated' | 'outlined' | 'flat';

export interface DynCardProps extends React.HTMLAttributes<HTMLElement> {
  /** Visual style: elevated (default), outlined or flat */
  variant?: DynCardVariant;
  /** Padding size: small, medium (default) or large */
  padding?: DynCardPadding;
  /** Hover shadow when true */
  hoverable?: boolean;
  /** Adds pointer cursor and click styles */
  clickable?: boolean;
  /** Shows a loading overlay with a spinner */
  loading?: boolean;
  /** Disables interaction and dims the card */
  disabled?: boolean;
  /** Children to render inside the card */
  children?: React.ReactNode;
  /** Additional className for custom styling */
  className?: string;
  /** HTML element to render as (default `div`) */
  as?: keyof JSX.IntrinsicElements;
}

export interface DynCardCompound {
  Header: React.FC<React.HTMLAttributes<HTMLElement>>;
  Body: React.FC<React.HTMLAttributes<HTMLElement>>;
  Footer: React.FC<React.HTMLAttributes<HTMLElement>>;
}

```

### 3. Implement the Component

Create `DynCard.tsx` using the compound component pattern.  Use `forwardRef` and allow an `as` prop.  Example skeleton:

```tsx
// File: packages/dyn-ui-react/src/components/DynCard/DynCard.tsx
import React, { forwardRef } from 'react';
import type { DynCardProps, DynCardCompound } from './DynCard.types';
import { cn } from '../../utils/classNames';
import styles from './DynCard.module.css';

const CardBase = forwardRef<HTMLElement, DynCardProps>(
  (
    {
      variant = 'elevated',
      padding = 'medium',
      hoverable = false,
      clickable = false,
      loading = false,
      disabled = false,
      as: Component = 'div',
      className,
      children,
      ...rest
    },
    ref
  ) => {
    const rootClass = cn(
      styles.card,
      styles[`card--${variant}`],
      styles[`card--pad-${padding}`],
      {
        [styles['card--hoverable']]: hoverable,
        [styles['card--clickable']]: clickable,
        [styles['card--loading']]: loading,
        [styles['card--disabled']]: disabled,
      },
      className
    );
    return (
      <Component ref={ref as any} className={rootClass} {...rest}>
        {children}
        {loading && <div className={styles.loadingOverlay} aria-busy="true" />}
      </Component>
    );
  }
);

CardBase.displayName = 'DynCard';

const DynCard = CardBase as unknown as React.FC<DynCardProps> & DynCardCompound;

DynCard.Header = ({ children, ...rest }) => (
  <header className={styles.cardHeader} {...rest}>{children}</header>
);
DynCard.Body = ({ children, ...rest }) => (
  <section className={styles.cardBody} {...rest}>{children}</section>
);
DynCard.Footer = ({ children, ...rest }) => (
  <footer className={styles.cardFooter} {...rest}>{children}</footer>
);

export default DynCard;
export { DynCard };
```

### 4. CSS Module

In `DynCard.module.css` define tokens and classes based on the specification【550477614656846†L51-L129】.  Scope all tokens under the `.card` selector and provide three‑level fallbacks:

```css
/* File: packages/dyn-ui-react/src/components/DynCard/DynCard.module.css */
.card {
  /* Colour and layout tokens with fallbacks */
  --dyn-card-bg: var(--dyn-color-surface, var(--legacy-color-surface, #ffffff));
  --dyn-card-border: var(--dyn-color-border, var(--legacy-color-border, #d1d5db)) 1px solid;
  --dyn-card-border-radius: var(--dyn-radius-lg, var(--legacy-radius-lg, 0.75rem));
  --dyn-card-shadow: var(--dyn-shadow-sm, var(--legacy-shadow-sm, 0 1px 2px rgba(0,0,0,0.08)));
  --dyn-card-shadow-hover: var(--dyn-shadow-md, var(--legacy-shadow-md, 0 4px 6px rgba(0,0,0,0.1)));
  --dyn-card-padding-small: var(--dyn-spacing-sm, var(--legacy-spacing-sm, 0.5rem));
  --dyn-card-padding-medium: var(--dyn-spacing-md, var(--legacy-spacing-md, 1rem));
  --dyn-card-padding-large: var(--dyn-spacing-lg, var(--legacy-spacing-lg, 1.5rem));
  --dyn-card-transition: var(--dyn-transition-base, var(--legacy-transition-base, 200ms)) all;
  background: var(--dyn-card-bg);
  border: var(--dyn-card-border);
  border-radius: var(--dyn-card-border-radius);
  box-shadow: var(--dyn-card-shadow);
  transition: var(--dyn-card-transition);
  overflow: hidden;
  position: relative;
}

.card--outlined {
  /* remove shadow */
  box-shadow: none;
}
.card--flat {
  box-shadow: none;
  border: none;
}

.card--pad-small { padding: var(--dyn-card-padding-small); }
.card--pad-medium { padding: var(--dyn-card-padding-medium); }
.card--pad-large { padding: var(--dyn-card-padding-large); }

.card--hoverable:hover {
  box-shadow: var(--dyn-card-shadow-hover);
}
.card--clickable { cursor: pointer; }
.card--disabled { opacity: 0.5; pointer-events: none; }

/* Loading overlay */
.loadingOverlay {
  position: absolute;
  inset: 0;
  background: rgba(255,255,255,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
}

.cardHeader {
  padding: var(--dyn-card-padding-small) var(--dyn-card-padding-medium);
  border-bottom: var(--dyn-card-border);
}
.cardBody {
  padding: var(--dyn-card-padding-medium);
}
.cardFooter {
  padding: var(--dyn-card-padding-small) var(--dyn-card-padding-medium);
  border-top: var(--dyn-card-border);
}

@media (prefers-color-scheme: dark) {
  .card {
    --dyn-card-bg: var(--dyn-color-surface-dark, var(--legacy-color-surface-dark, #1f2937));
    --dyn-card-border: var(--dyn-color-border-dark, var(--legacy-color-border-dark, #374151)) 1px solid;
    --dyn-card-shadow: var(--dyn-shadow-sm-dark, var(--legacy-shadow-sm-dark, 0 1px 2px rgba(0,0,0,0.4)));
  }
}

@media (prefers-reduced-motion: reduce) {
  .card { transition: none; }
}
```

### 5. Testing

Use Jest and React Testing Library to verify:

- The default render includes a `div` with the base `card` class.
- Variants (`elevated`, `outlined`, `flat`) apply the correct classes.
- Padding sizes apply appropriate padding.
- Hoverable and clickable props add classes and behaviours (simulate hover, verify shadow and cursor).
- Loading overlay renders when `loading` is true.
- Compound sub‑components render content in the correct section and do not break semantics.
- Dark‑mode overrides apply using `matchMedia` mocks.

### 6. Storybook

In `DynCard.stories.tsx` create stories demonstrating:

- A basic card with header, body and footer.
- The three padding sizes (small, medium, large).
- The three variants (elevated, outlined, flat).
- Hoverable and clickable states.
- Loading and disabled states.
- Dark mode toggling via `prefers-color-scheme` in the Storybook config.

### 7. Git Workflow

- Branch: `feat/component-dyncard`.
- Use descriptive commits, for example:
  - `feat(DynCard): implement compound card component`.
  - `style(DynCard): define tokens and variants with fallbacks`.
  - `test(DynCard): add unit tests and dark mode tests`.
- Open a pull request referencing the DynCard specification and this guide.

### 8. Validation Checklist

- [ ] Compound component pattern with `Header`, `Body` and `Footer` implemented.
- [ ] All tokens follow the `--dyn-card-*` pattern with 3‑level fallbacks.
- [ ] Variants and padding sizes apply correct styles.
- [ ] Hoverable, clickable, loading and disabled states implemented.
- [ ] Dark‑mode overrides and reduced‑motion media queries added.
- [ ] Unit tests and Storybook stories cover all variations.
- [ ] Component and types exported in `index.ts`.
- [ ] Documentation and JSDoc comments added as needed.