# DynStack – Implementation Guide

## Component Overview

`DynStack` is a flexible layout utility for arranging multiple child elements with consistent spacing.  It supports horizontal (row) and vertical (column) directions, configurable gap size, wrapping behaviour, alignment and justification options, reversing order, responsive settings and dark/high‑contrast modes.  `DynStack` uses Flexbox to handle alignment and ensures the spacing between items is controlled via design tokens.  Common use cases include stacking buttons, form fields, cards or icons in a row or column with equal spacing.

## Current State Analysis

According to the component checklist, `DynStack` is planned but not yet implemented.  It has its own token namespace `--dyn-stack-*` and will likely support direction variants (`row`, `column`) and spacing tokens.  No implementation files exist, so we must define tokens, API and build the component from scratch.

## Implementation Instructions

### 1. File Structure

Create `packages/dyn-ui-react/src/components/DynStack/` with:

- `DynStack.tsx` – React component
- `DynStack.types.ts` – TypeScript interfaces
- `DynStack.module.css` – CSS module with token definitions and classes
- `DynStack.stories.tsx` – Storybook stories for orientations, alignment, wrap and spacing
- `DynStack.test.tsx` – Unit tests covering props and responsive behaviour
- `index.ts` – Barrel file to export the component and types

### 2. Define Design Tokens

In `DynStack.module.css`, declare CSS custom properties with `--dyn-stack-*` prefix and three‑level fallbacks.  Suggested tokens:

| Token | Purpose | Example fallback |
|------|---------|------------------|
| `--dyn-stack-gap` | Default spacing between child elements | `var(--dyn-space-3, 0.75rem)` |
| `--dyn-stack-gap-sm` | Gap for small size variant | `var(--dyn-space-2, 0.5rem)` |
| `--dyn-stack-gap-lg` | Gap for large size variant | `var(--dyn-space-4, 1rem)` |
| `--dyn-stack-align` | Default align‑items value | `stretch` |
| `--dyn-stack-justify` | Default justify‑content value | `flex-start` |
| `--dyn-stack-direction` | Default flex‑direction | `row` |
| `--dyn-stack-wrap` | Default flex‑wrap behaviour | `nowrap` |
| `--dyn-stack-padding` | Optional padding inside the stack container | `0` |

Provide dark‑mode overrides as necessary (e.g. adjust spacing for high‑contrast mode) and respect reduced‑motion preferences.

### 3. API Design (`DynStack.types.ts`)

Define the props:

```ts
export type DynStackDirection = 'row' | 'column';
export type DynStackSize = 'sm' | 'md' | 'lg';

export interface DynStackProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Direction of stacking: horizontal (row) or vertical (column). */
  direction?: DynStackDirection;
  /** Gap size between children: 'sm', 'md' (default) or 'lg'. */
  size?: DynStackSize;
  /** Whether items should wrap to new lines when there is not enough space. */
  wrap?: boolean;
  /** Align items along the cross axis. */
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  /** Justify items along the main axis. */
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  /** Reverse the order of children. */
  reverse?: boolean;
  /** Render as a different HTML element, e.g. `ul` or `section`. */
  as?: React.ElementType;
  /** Additional CSS class names. */
  className?: string;
  /** Inline styles. */
  style?: React.CSSProperties;
  /** Children elements to render inside the stack. */
  children: React.ReactNode;
}
```

### 4. React Implementation (`DynStack.tsx`)

1. Use `forwardRef<HTMLElement, DynStackProps>` to forward a ref to the root element.
2. Destructure props with defaults: `direction = 'row'`, `size = 'md'`, `wrap = false`, `align = undefined`, `justify = undefined`, `reverse = false`, `as = 'div'`.
3. Determine the element type (`const Component = as || 'div'`) and compute the class names: apply `styles.row` or `styles.column`, `styles.wrap` if `wrap` is true, `styles.reverse` if `reverse` is true, and size modifiers `styles.sizeSm`, `styles.sizeMd` or `styles.sizeLg`.  For align and justify, apply inline CSS using the `style` prop or define additional classes if preferred.
4. Pass through any remaining props to the element.  Render children inside the component.
5. To respect the gap token, set `gap: var(--dyn-stack-gap)` in the CSS module for the default size and override it with `--dyn-stack-gap-sm` or `--dyn-stack-gap-lg` in size modifiers.

### 5. CSS Module (`DynStack.module.css`)

Define base classes:

```css
.stack {
  display: flex;
  flex-direction: var(--dyn-stack-direction, row);
  flex-wrap: var(--dyn-stack-wrap, nowrap);
  align-items: var(--dyn-stack-align, stretch);
  justify-content: var(--dyn-stack-justify, flex-start);
  gap: var(--dyn-stack-gap, 0.75rem);
  padding: var(--dyn-stack-padding, 0);
}
.row {
  flex-direction: row;
}
.column {
  flex-direction: column;
}
.wrap {
  flex-wrap: wrap;
}
.reverse {
  flex-direction: row-reverse;
}
.sizeSm {
  gap: var(--dyn-stack-gap-sm, 0.5rem);
}
.sizeMd {
  gap: var(--dyn-stack-gap, 0.75rem);
}
.sizeLg {
  gap: var(--dyn-stack-gap-lg, 1rem);
}
.row.reverse {
  flex-direction: row-reverse;
}
.column.reverse {
  flex-direction: column-reverse;
}
```

If you choose to expose alignment and justification values via tokens instead of props, add corresponding CSS variables (e.g. `--dyn-stack-align`) with fallbacks.  Provide dark‑mode and high‑contrast overrides if necessary (usually not needed for spacing).  Include a `@media (prefers-reduced-motion: reduce)` block to remove any transitions if they are added later.

### 6. Storybook Stories

Create `DynStack.stories.tsx` with scenarios:

1. **Horizontal stack** – default row stacking with medium gap.
2. **Vertical stack** – set `direction='column'`; show with small and large gaps.
3. **Wrapping** – items wrap to multiple lines when container is narrow (`wrap=true`).
4. **Alignment and justification** – demonstrate combinations of `align` and `justify` values.
5. **Reverse order** – show reversed stacking.
6. **Custom element** – render the stack as `<ul>` with list items.
7. **Dark mode** – verify the component in a dark theme (mostly spacing unaffected).

### 7. Unit Tests

Write tests to verify:

* Correct element type is rendered based on `as`.
* Proper classes apply for direction, size and wrap.
* Inline styles or classes reflect `align` and `justify`.
* `reverse` prop reverses the order of children.
* Gap size adjusts according to the `size` prop.
* Children are rendered correctly in order.
* Accessibility: as a layout container, no special roles are necessary; ensure ARIA attributes are passed through.

### 8. Export (`index.ts`)

Export the component and its types:

```ts
export { DynStack } from './DynStack';
export type { DynStackProps, DynStackDirection, DynStackSize } from './DynStack.types';
```

## Validation Checklist

- [ ] All `--dyn-stack-*` tokens are defined with three‑level fallbacks.
- [ ] Supports direction (`row`/`column`), wrap, align, justify, reverse and size props.
- [ ] Gap sizes adjust via tokens and size modifiers.
- [ ] Component is responsive and respects dark and reduced‑motion preferences.
- [ ] Storybook stories cover basic usage, orientation, wrap, align/justify and reverse.
- [ ] Unit tests ensure correct class names and prop behaviours.
- [ ] Component and types exported correctly.
