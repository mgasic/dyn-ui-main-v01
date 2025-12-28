# DynTag – Implementation Guide

## Component Overview

`DynTag` is a pill‑shaped label used to highlight metadata, categories or statuses.  It is similar to `DynBadge` but designed for inline use, with optional icons and a removable variant.  Tags can display short text, optionally include an icon at the start and a close (remove) button at the end.  They support semantic tones (success, warning, danger, info, neutral), size variants and dark/high‑contrast themes.  Typical scenarios include filtering chips, labels in lists or interactive tag inputs.

Key features:

* **Tone variants** – semantic colours such as success, warning, error, info and neutral using tokenised backgrounds and text colours.
* **Size options** – small, medium and large sizes adjust padding, font size and border radius.
* **Removable option** – a close button appears on the right when `removable` is true; clicking it triggers `onRemove`.
* **Icon support** – show an icon on the left side of the label; accepts strings, React elements or dictionary keys.
* **Rounded corners** – consistent pill shape using a tokenised border radius.
* **Accessible and interactive** – interactive tags are focusable, support keyboard navigation and provide appropriate ARIA labels.
* **Dark mode and high contrast** – tokens ensure legible colours across themes.

## Current State Analysis

`DynTag` is listed in the component checklist as a Phase 1 display component with 90 % readiness.  It reuses `--dyn-badge-*` tokens and introduces two variants: **default** and **removable**【288744069544077†L274-L286】.  There is no implementation code in the repository.  To create a robust component, we need to define additional tokens for icon sizing and close button spacing, design the API for tone and size variants, implement the React component, create a CSS module with tokenised styles, and write stories and tests.

## Implementation Instructions

### 1. File Structure

Create a new directory `packages/dyn-ui-react/src/components/DynTag/` containing:

```
DynTag.tsx          – React component
DynTag.types.ts     – TypeScript types and enums
DynTag.module.css   – CSS module defining tokens and classes
DynTag.stories.tsx  – Storybook stories demonstrating tones, sizes and removable variant
DynTag.test.tsx     – Unit tests verifying interactions and accessibility
index.ts           – Barrel file exporting component and types
```

### 2. Define Design Tokens

Extend the badge token set to include tag‑specific tokens.  Suggested tokens and fallbacks:

| Token | Purpose | Example fallback |
|------|---------|------------------|
| `--dyn-tag-bg` | Default background colour | `var(--dyn-badge-bg, var(--color-neutral-light, #f5f5f5))` |
| `--dyn-tag-color` | Text colour | `var(--dyn-badge-color, var(--color-neutral-dark, #333))` |
| `--dyn-tag-radius` | Border radius for the pill | `var(--dyn-badge-radius, var(--radius-pill, 1rem))` |
| `--dyn-tag-padding-y` | Vertical padding | `var(--dyn-badge-padding-y, 0.25rem)` |
| `--dyn-tag-padding-x` | Horizontal padding | `var(--dyn-badge-padding-x, 0.5rem)` |
| `--dyn-tag-gap` | Space between icon and label | `var(--dyn-badge-gap, 0.25rem)` |
| `--dyn-tag-font-size` | Font size | `var(--dyn-badge-font-size, var(--font-size-sm, 0.875rem))` |
| `--dyn-tag-icon-size` | Size of the leading icon | `var(--dyn-icon-size-small, 0.875rem)` |
| `--dyn-tag-remove-size` | Size of the remove icon | `var(--dyn-icon-size-small, 0.875rem)` |
| `--dyn-tag-color-success` | Background for success tone | `var(--dyn-badge-bg-success, var(--color-success-light, #e6f7e6))` |
| `--dyn-tag-color-warning` | Background for warning tone | `var(--dyn-badge-bg-warning, var(--color-warning-light, #fff4e5))` |
| `--dyn-tag-color-error` | Background for error tone | `var(--dyn-badge-bg-error, var(--color-error-light, #fdecea))` |
| `--dyn-tag-color-info` | Background for info tone | `var(--dyn-badge-bg-info, var(--color-info-light, #e6f4ff))` |
| `--dyn-tag-color-neutral` | Background for neutral tone | `var(--dyn-badge-bg-neutral, var(--color-neutral-light, #f5f5f5))` |

Define dark‑mode overrides with `@media (prefers-color-scheme: dark)` to adjust backgrounds and text colours for each tone.  Use a three‑level fallback chain: component → semantic token → hardcoded value.

### 3. API Design (`DynTag.types.ts`)

Define the props interface:

```ts
import { ReactNode } from 'react';

export type DynTagTone = 'neutral' | 'success' | 'warning' | 'error' | 'info';
export type DynTagSize = 'sm' | 'md' | 'lg';

export interface DynTagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Visual tone of the tag. Defaults to 'neutral'. */
  tone?: DynTagTone;
  /** Size of the tag. Controls padding, font size and radius. Defaults to 'md'. */
  size?: DynTagSize;
  /** Leading icon element or key from the icon dictionary. */
  icon?: ReactNode;
  /** If true, displays a remove button. */
  removable?: boolean;
  /** Handler called when the remove button is clicked. */
  onRemove?: () => void;
  /** Accessible label for the remove button; defaults to 'Remove tag'. */
  removeLabel?: string;
  /** Content of the tag. */
  children: ReactNode;
}
```

### 4. React Implementation (`DynTag.tsx`)

1. Use `forwardRef<HTMLSpanElement, DynTagProps>` to forward the ref to the `<span>` wrapper.
2. Destructure props with defaults: `tone = 'neutral'`, `size = 'md'`, `removable = false`, `removeLabel = 'Remove tag'`.
3. Compute class names based on tone and size using the CSS module.  For example, `styles.neutral`, `styles.success`, `styles.sizeSm`.
4. If an `icon` is provided, render it before the label using `DynIcon` or an inline element with a class for sizing.
5. Wrap the children in a `<span className={styles.content}>` for proper spacing.
6. If `removable` is true, render a `<button className={styles.removeButton}>` with `aria-label={removeLabel}`.  Use a small `X` icon from the icon dictionary.  Call `onRemove` when clicked; prevent event propagation.
7. Spread remaining props and apply `ref` to the outer `<span>`.
8. Use role `status` or `text` as appropriate; ensure interactive tags have `tabIndex={0}` if needed.

### 5. CSS Module (`DynTag.module.css`)

Implement base styles and variants:

* `.tag` – base pill style: `display: inline-flex; align-items: center; border-radius: var(--dyn-tag-radius); padding: var(--dyn-tag-padding-y) var(--dyn-tag-padding-x); font-size: var(--dyn-tag-font-size); background: var(--dyn-tag-bg); color: var(--dyn-tag-color); gap: var(--dyn-tag-gap);`
* Tone classes `.neutral`, `.success`, `.warning`, `.error`, `.info` set background and colour using corresponding tokens (e.g. `var(--dyn-tag-color-success)` etc.).
* Size classes `.sizeSm`, `.sizeMd`, `.sizeLg` adjust padding, font size, border radius and icon size (`--dyn-tag-icon-size`) accordingly.
* `.icon` – sets `width`/`height` equal to `--dyn-tag-icon-size` and ensures it aligns to the text.
* `.removeButton` – styles the close icon: `margin-left: var(--dyn-tag-gap); cursor: pointer; background: none; border: none; padding: 0; color: inherit;`  On hover/focus, change opacity or colour for feedback.
* Provide dark‑mode overrides for backgrounds and text colours.

### 6. Storybook Stories (`DynTag.stories.tsx`)

Create stories covering:

* Default tone with different sizes.
* All tones (neutral, success, warning, error, info).
* Tags with icons.
* Removable tags; verify `onRemove` callback via action logger.
* Dark mode examples.
* High‑contrast mode (via forcing colour scheme).

### 7. Unit Tests (`DynTag.test.tsx`)

Tests should cover:

* Rendering of tones and sizes – verify correct class names and tokens.
* Icon rendering and sizing.
* Removable tag – clicking the remove button calls `onRemove` and does not propagate to parent.
* Accessible labels for the remove button.
* Snapshot tests for dark mode and high‑contrast themes.

### 8. Exports (`index.ts`)

Export the component and its types:

```ts
export { DynTag } from './DynTag';
export type { DynTagProps, DynTagTone, DynTagSize } from './DynTag.types';
```

## Validation Checklist

- [ ] `--dyn-tag-*` tokens use three‑level fallbacks and extend badge tokens.
- [ ] Tones, sizes and removable variant are implemented.
- [ ] Icon support and remove button behave correctly; `onRemove` is optional.
- [ ] Dark mode, high contrast and reduced motion handled through token overrides.
- [ ] Comprehensive Storybook stories demonstrate tones, sizes, icons and removable tags.
- [ ] Unit tests cover rendering, variants, remove behaviour and accessibility.
- [ ] Component and types exported correctly.
