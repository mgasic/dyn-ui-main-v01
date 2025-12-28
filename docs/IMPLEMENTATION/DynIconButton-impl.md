# DynIconButton – Implementation Guide

## Component Overview

`DynIconButton` is a specialised button component that combines an icon with optional label text.  It builds on top of `DynButton` and is intended for actions where the icon conveys meaning at a glance, such as “Download”, “Settings” or “Close”.  The component supports the same semantic variants as `DynButton` (**primary**, **secondary**), introduces an **icon‑only** variant and provides size options.  It is fully accessible, ensuring that icon‑only buttons supply an `aria‑label` and respond to keyboard interactions.  Key features include:

* **Icon support** – accepts an `icon` prop to render an icon (string, React element or dictionary key) on the left of the label.
* **Optional label** – show or hide the label; hide it completely for the `icon‑only` variant but still require an accessible name.
* **Variants** – inherits `primary` and `secondary` variants from `DynButton` and adds an `icon‑only` variant【288744069544077†L35-L48】.
* **Sizes** – support small, medium and large sizes through tokens that control padding and icon size.
* **Loading and disabled states** – display a spinner when loading and prevent interactions when disabled.
* **Full‑width option** – stretch to fill the width of its container.
* **Dark mode and high‑contrast support** – tokens adapt colours for dark themes and forced‑colour modes.

`DynIconButton` aims to provide a consistent and accessible pattern for action buttons that rely on icons.

## Current State Analysis

The component checklist lists `DynIconButton` as a Phase 1 button‑like component with 90 % readiness.  It reuses all `--dyn-button-*` tokens and defines three variants: **primary**, **secondary** and **icon‑only**【288744069544077†L35-L48】.  There is no React implementation yet.  Some existing CSS templates may exist to demonstrate spacing and variant styles, but they need to be adapted and refactored into a proper component.  This guide provides a comprehensive plan to implement the component from scratch.

## Implementation Instructions

### 1. File structure

Create a new folder `packages/dyn-ui-react/src/components/DynIconButton/` containing:

```
DynIconButton.tsx      – React component extending DynButton and composing DynIcon
DynIconButton.types.ts – TypeScript interfaces and union types
DynIconButton.module.css – CSS module with tokens and variant classes
DynIconButton.stories.tsx – Storybook stories for variant and size combinations
DynIconButton.test.tsx  – Unit tests verifying behaviour and accessibility
index.ts                – Barrel file exporting the component and types
```

### 2. Define design tokens

Because `DynIconButton` extends `DynButton`, most tokens should piggyback on the button tokens.  However, you should define additional tokens specific to layout and spacing of the icon:

| Token | Purpose | Example fallback |
|------|---------|------------------|
| `--dyn-icon-button-gap` | Space between the icon and label | `var(--dyn-button-gap, 0.5rem)` |
| `--dyn-icon-button-size-sm` | Icon size for small buttons | `var(--dyn-icon-size-small, 0.875rem)` |
| `--dyn-icon-button-size-md` | Icon size for medium buttons | `var(--dyn-icon-size-medium, 1rem)` |
| `--dyn-icon-button-size-lg` | Icon size for large buttons | `var(--dyn-icon-size-large, 1.25rem)` |
| `--dyn-icon-button-padding-y` | Vertical padding for `icon-only` variant | `var(--dyn-button-padding-y, 0.5rem)` |
| `--dyn-icon-button-padding-x` | Horizontal padding for `icon-only` variant | `var(--dyn-button-padding-x, 0.5rem)` |

These tokens should follow the three‑level fallback chain: component → semantic token (e.g. `--dyn-spacing-sm`) → hardcoded value.  Provide dark‑mode overrides for colours via the underlying `--dyn-button-*` tokens.

### 3. API Design (`DynIconButton.types.ts`)

Define the props interface by extending `DynButtonProps` and adding icon‑specific fields:

```ts
import { DynButtonProps } from '../DynButton/DynButton.types';
import { ReactNode } from 'react';

export interface DynIconButtonProps extends Omit<DynButtonProps, 'children'> {
  /** Icon to display. Accepts a string key, a React element or null. */
  icon: ReactNode;
  /** Optional text label. Required when variant is not 'icon-only'. */
  label?: string;
  /** Variant of the button: 'primary', 'secondary' or 'icon-only'. */
  variant?: 'primary' | 'secondary' | 'icon-only';
  /** Size of the button: 'sm', 'md' (default), 'lg'. */
  size?: 'sm' | 'md' | 'lg';
  /** If true, stretch to fill the width of the container. */
  fullWidth?: boolean;
}
```

### 4. React Implementation (`DynIconButton.tsx`)

1. Use `forwardRef<HTMLButtonElement, DynIconButtonProps>` to forward the ref to the underlying `<button>`.
2. Destructure props with sensible defaults: `variant = 'primary'`, `size = 'md'`.
3. If `variant` is `'icon-only'`, require that either `label` or an `aria-label` is provided for accessibility.  For icon‑only buttons, hide the label visually but include it in an `aria-label`.
4. Compute class names based on `variant` and `size`, and include a class that applies `--dyn-icon-button-gap` to align the icon and label.  Compose these with the base `DynButton` classes (e.g. `styles.button`, `styles.primary`, etc.) and any custom classes passed via `className`.
5. Render a `<button>` element and include a `DynIcon` (or direct icon) inside.  The structure could be:

```tsx
<button ref={ref} className={buttonClassName} {...buttonProps} aria-label={ariaLabel}>
  <DynIcon icon={icon} size={sizeMap[size]} />
  {variant !== 'icon-only' && <span className={styles.label}>{label}</span>}
  {loading && <DynSpinner size="sm" />}
</button>
```
6. Forward event handlers and additional props to the button element.  When `loading` is true, disable the button and show a spinner.
7. Ensure keyboard accessibility by supporting `Space`/`Enter` key activation.

### 5. CSS Module (`DynIconButton.module.css`)

Create classes to apply spacing and size adjustments:

* `.button` – base styles inherited from `DynButton` (padding, border, etc.).
* `.primary`, `.secondary`, `.iconOnly` – variant classes that adjust background and colour using the underlying button tokens.
* `.sizeSm`, `.sizeMd`, `.sizeLg` – adjust padding and font size according to tokens; set the icon’s font size with `--dyn-icon-button-size-sm`, etc.
* `.fullWidth` – set `width: 100%`.
* `.label` – margin‑left using `--dyn-icon-button-gap`.
* `.loading` – optional style to position the spinner relative to text.
* Dark‑mode overrides – rely on `@media (prefers-color-scheme: dark)` and update colours based on semantic tokens.

### 6. Storybook Stories (`DynIconButton.stories.tsx`)

Document the component with stories demonstrating:

* Primary and secondary variants with labels and icons.
* Icon‑only variant with different `aria-label` values.
* Small, medium and large sizes.
* Loading state (displaying a spinner instead of icon).
* Full‑width buttons.
* Dark‑mode and high‑contrast examples.

### 7. Unit tests (`DynIconButton.test.tsx`)

Use React Testing Library to cover:

* Rendering of icon and label combinations.
* Correct `aria-label` handling for icon‑only variant.
* Variant and size class application.
* Disabled and loading states.
* Keyboard activation and `onClick` handler invocation.
* Snapshot tests for dark mode and high‑contrast themes.

### 8. Exports (`index.ts`)

Export the component and prop types:

```ts
export { DynIconButton } from './DynIconButton';
export type { DynIconButtonProps } from './DynIconButton.types';
```

## Validation Checklist

- [ ] All `--dyn-icon-button-*` tokens use three‑level fallback and are documented.
- [ ] Variants `primary`, `secondary` and `icon-only` are implemented and share semantics with `DynButton`.
- [ ] Sizes `sm`, `md` and `lg` adjust padding and icon size via tokens.
- [ ] Icon and label render correctly; icon‑only variant requires `aria-label` for accessibility.
- [ ] Loading and disabled states are handled properly.
- [ ] Dark mode, high contrast and reduced motion are supported through token overrides.
- [ ] Storybook stories and Jest tests cover variants, states and sizes.
- [ ] Component and types exported correctly.
