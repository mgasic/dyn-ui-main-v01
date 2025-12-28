# DynToggle – Implementation Guide

## Component Overview

`DynToggle` is a binary switch component that allows users to turn a setting on or off.  It provides a more explicit and modern alternative to a checkbox.  The toggle comprises a track and a thumb that slides along it.  It supports different sizes, controlled and uncontrolled modes, disabled state, accessible labels and keyboard interaction.  Design tokens control the track width, height, border radius, colours in the on/off/disabled states, thumb size, transition duration and focus ring.  Dark mode and high‑contrast styles are included.  Typical use cases include toggling dark mode, enabling notifications or activating features.

## Current State Analysis

The component checklist identifies `DynToggle` as an input‑like component with tokens prefixed `--dyn-toggle-*` and variants `on`, `off` and `disabled`【288744069544077†L156-L172】.  Its status is 70 %, indicating early planning.  No code exists for the toggle; thus, a complete implementation is required.  We will define tokens, design the API, implement the React component, create the CSS module, build Storybook stories and write unit tests.

## Implementation Instructions

### 1. File Structure

Create a folder `packages/dyn-ui-react/src/components/DynToggle/` with:

```
DynToggle.tsx         – React component
DynToggle.types.ts    – TypeScript interfaces and enums
DynToggle.module.css  – CSS module with tokens and classes
DynToggle.stories.tsx – Storybook stories for variants and sizes
DynToggle.test.tsx    – Unit tests covering behaviour and accessibility
index.ts              – Barrel file exporting component and types
```

### 2. Define Design Tokens

Define the following tokens with three‑level fallback chains:

| Token | Purpose | Example fallback |
|------|---------|------------------|
| `--dyn-toggle-track-width` | Width of the toggle in medium size | `2.5rem` |
| `--dyn-toggle-track-height` | Height of the toggle in medium size | `1.4rem` |
| `--dyn-toggle-track-width-sm` | Width for small size | `2rem` |
| `--dyn-toggle-track-height-sm` | Height for small size | `1.25rem` |
| `--dyn-toggle-track-width-lg` | Width for large size | `3rem` |
| `--dyn-toggle-track-height-lg` | Height for large size | `1.6rem` |
| `--dyn-toggle-track-radius` | Border radius of the track | `9999px` (for pill shape) |
| `--dyn-toggle-thumb-size` | Diameter of the thumb | `calc(var(--dyn-toggle-track-height) - 4px)` |
| `--dyn-toggle-track-bg-off` | Background colour when off | `var(--dyn-color-neutral-light, #e5e7eb)` |
| `--dyn-toggle-track-bg-on` | Background colour when on | `var(--dyn-color-primary, #3b82f6)` |
| `--dyn-toggle-track-bg-disabled` | Background colour when disabled | `var(--dyn-color-neutral, #d1d5db)` |
| `--dyn-toggle-thumb-bg` | Colour of the thumb | `var(--dyn-color-white, #ffffff)` |
| `--dyn-toggle-thumb-bg-disabled` | Colour of the thumb when disabled | `var(--dyn-color-neutral-light, #f3f4f6)` |
| `--dyn-toggle-transition` | Duration of the thumb sliding animation | `0.2s` |
| `--dyn-toggle-focus-ring` | Box‑shadow for focus state | `0 0 0 3px rgba(59, 130, 246, 0.5)` |

Provide dark mode overrides for `--dyn-toggle-track-bg-off` and `--dyn-toggle-track-bg-on` (e.g. darker neutrals and primary colours).  Respect high‑contrast settings by adjusting colours and border radii.

### 3. API Design (`DynToggle.types.ts`)

Define the props interface:

```ts
export type DynToggleSize = 'sm' | 'md' | 'lg';

export interface DynToggleProps extends Omit<React.HTMLAttributes<HTMLButtonElement>, 'onChange'> {
  /** Whether the toggle is currently checked (controlled mode). */
  checked?: boolean;
  /** Initial checked state (uncontrolled mode). */
  defaultChecked?: boolean;
  /** Callback fired when the toggle changes state. */
  onChange?: (checked: boolean) => void;
  /** Size of the toggle: 'sm', 'md' (default) or 'lg'. */
  size?: DynToggleSize;
  /** Disabled state. */
  disabled?: boolean;
  /** Accessible label for screen readers. */
  ariaLabel?: string;
}
```

### 4. React Implementation (`DynToggle.tsx`)

1. Use `forwardRef<HTMLButtonElement, DynToggleProps>` to expose a ref.
2. Manage controlled vs. uncontrolled behaviour: if `checked` is provided, rely on it; otherwise, maintain internal state initialised from `defaultChecked`.
3. Derive `isChecked` and compute class names based on `size`, `isChecked` and `disabled` (e.g. `.checked`, `.sizeSm`, `.disabled`).
4. On click or keyboard activation (`Space` or `Enter` keys), toggle the state and call `onChange` with the new value.  Prevent toggling when `disabled`.
5. Render a `<button type="button">` with `role="switch"`, `aria-checked={isChecked}` and, if disabled, `aria-disabled="true"`.  Provide `aria-label={ariaLabel}`; if not provided and the component is not accompanied by visible text, warn developers in dev mode.
6. The button should contain a `<span className={styles.thumb} />` representing the knob.  Use inline `style` to translate the thumb along the X axis when `isChecked`.
7. Apply `tabIndex={0}` and handle focus and blur to show a focus ring using the token `--dyn-toggle-focus-ring`.

### 5. CSS Module (`DynToggle.module.css`)

Define the following styles:

* `.toggle` – base container: `position: relative; display: inline-flex; align-items: center; justify-content: flex-start; cursor: pointer; border: none; background: var(--dyn-toggle-track-bg-off); width: var(--dyn-toggle-track-width); height: var(--dyn-toggle-track-height); border-radius: var(--dyn-toggle-track-radius); transition: background var(--dyn-toggle-transition); outline: none;`  When `.checked`, set `background` to `var(--dyn-toggle-track-bg-on)`.  When `.disabled`, set `background` to `var(--dyn-toggle-track-bg-disabled)` and `cursor: not-allowed`.
* `.thumb` – the knob: `position: absolute; top: 50%; left: 2px; width: var(--dyn-toggle-thumb-size); height: var(--dyn-toggle-thumb-size); border-radius: 50%; background: var(--dyn-toggle-thumb-bg); transform: translateY(-50%) translateX(0); transition: transform var(--dyn-toggle-transition), background var(--dyn-toggle-transition);`  When `.checked`, translate the knob to `calc(var(--dyn-toggle-track-width) - var(--dyn-toggle-thumb-size) - 2px)` horizontally.  When `.disabled`, set `background` to `var(--dyn-toggle-thumb-bg-disabled)`.
* Size modifiers `.sizeSm`, `.sizeMd`, `.sizeLg` adjust `--dyn-toggle-track-width`, `--dyn-toggle-track-height` and the computed `--dyn-toggle-thumb-size` via CSS variables.
* `.focusVisible` – apply `box-shadow: var(--dyn-toggle-focus-ring)` when the component is focused using keyboard.
* Provide dark‑mode overrides and high‑contrast adjustments via `@media (prefers-color-scheme: dark)` and `@media (forced-colors: active)`.

### 6. Storybook Stories (`DynToggle.stories.tsx`)

Create stories for:

* Controlled vs. uncontrolled toggles.
* Sizes (small, medium, large) and disabled states.
* Toggles with different labels or external labels.
* Dark mode and high‑contrast examples.
* Keyboard accessibility demonstration.

### 7. Unit Tests (`DynToggle.test.tsx`)

Tests should verify:

* Controlled behaviour – component reflects the `checked` prop and calls `onChange` without updating internal state.
* Uncontrolled behaviour – toggles internal state on click and keyboard events.
* Disabled state – cannot be toggled and `onChange` is not called.
* Size and state classes apply correctly.
* Accessibility attributes (`role`, `aria-checked`, `aria-disabled`, `aria-label`).
* Focus ring appears on keyboard focus.

### 8. Exports (`index.ts`)

Export the component and types:

```ts
export { DynToggle } from './DynToggle';
export type { DynToggleProps, DynToggleSize } from './DynToggle.types';
```

## Validation Checklist

- [ ] All `--dyn-toggle-*` tokens defined with three‑level fallback and dark mode overrides.
- [ ] Sizes, on/off/disabled states and controlled/uncontrolled modes implemented.
- [ ] Accessible: uses `role="switch"`, `aria-checked`, `aria-disabled` and supports keyboard interaction.
- [ ] Visual design matches specs: track and thumb sizes, colours and motion.
- [ ] Dark mode, high contrast and reduced motion handled via tokens and media queries.
- [ ] Storybook stories and unit tests cover variants, sizes and states.
- [ ] Component and types exported correctly.
