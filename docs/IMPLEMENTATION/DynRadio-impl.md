# DynRadio – Implementation Guide

## Component Overview

`DynRadio` is a form control that allows the user to select **one option from a list**.  It behaves similarly to the native `<input type="radio">` element but is fully styled using the Dyn UI design token system.  Key features include:

* **Single‑select behaviour** – when used inside a radio group, only one radio can be selected at a time.
* **Controlled and uncontrolled modes** – accept a `checked` prop for controlled usage or `defaultChecked` for uncontrolled initial state.
* **Label support** – a `label` prop renders a descriptive text next to the radio; label positioning can be inline or stacked.
* **Size variants** – support small, medium (default) and large sizes that adjust the radio diameter and spacing.
* **Disabled and error states** – visually indicate when the control is disabled or has an error; support `aria-invalid` for accessibility.
* **Custom icon** – optionally accept a custom checked icon (e.g. checkmark) instead of the default dot.
* **Accessibility** – proper association between label and input via `id`/`htmlFor`; keyboard navigation via tab and space/enter keys; ARIA attributes for checked and disabled states; high contrast and dark mode support.

## Current State Analysis

This component is currently **planned**; there is no implementation in the repository.  The component checklist notes that radio inputs should use the same token namespace as inputs (`--dyn-input-*`) and provide variants for **default**, **selected**, and **disabled** states【943273054351528†L137-L154】.  Therefore, we must design the API, tokens and component from the ground up, ensuring compliance with Dyn UI token and accessibility standards.  Use similar patterns from existing input components (e.g. `DynCheckbox` and `DynInput`) for guidance.

### Required Tokens

Define the following tokens in `DynRadio.module.css`, each with a 3‑level fallback (`component token → semantic token → hardcoded fallback`).  These tokens should be namespaced under `--dyn-radio-*` unless the library standard dictates using `--dyn-input-*` for form controls (adjust accordingly):

* `--dyn-radio-size` – diameter of the outer circle for the medium size (e.g. `1rem`).
* `--dyn-radio-size-sm`, `--dyn-radio-size-lg` – diameters for small and large variants.
* `--dyn-radio-border-width` – thickness of the radio outline.
* `--dyn-radio-border-color` – colour of the outer circle in the unselected state.
* `--dyn-radio-bg` – background of the radio control (often transparent).
* `--dyn-radio-icon-size` – diameter of the checked indicator (dot or custom icon).
* `--dyn-radio-icon-color` – colour of the checked indicator.
* `--dyn-radio-disabled-border-color` – colour when disabled.
* `--dyn-radio-disabled-icon-color` – colour for the icon when disabled.
* `--dyn-radio-error-border-color` – colour when `aria-invalid` is true.
* `--dyn-radio-label-color` – colour of the label text.
* `--dyn-radio-spacing` – horizontal spacing between the radio and its label.
* `--dyn-radio-focus-ring-color` – colour for focus-visible outline.
* Dark mode overrides – provide appropriate values for border and icon colours in dark mode.

### Variants and States

`DynRadio` should support the following sizes: **small**, **medium**, and **large**.  Additionally, support the states **unchecked**, **checked**, **disabled**, and **error**.  The CSS module should include classes for each combination (e.g. `.radio`, `.radio--sm`, `.radio--disabled`, `.radio--error`) and apply the correct tokens.

## Implementation Instructions

### 1. File Structure

Create a new folder `DynRadio/` with the following files:

| File | Purpose |
| --- | --- |
| `DynRadio.tsx` | React component implementing the radio input and label. |
| `DynRadio.types.ts` | TypeScript interfaces for props and group context. |
| `DynRadio.module.css` | CSS module defining tokens and classes for all variants and states. |
| `DynRadio.stories.tsx` | Storybook stories demonstrating variants, states and usage in a group. |
| `DynRadio.test.tsx` | Jest tests for interaction, state, accessibility and styling. |
| `index.ts` | Re‑exports component and types. |

### 2. API Design

Define a `DynRadioProps` interface in `DynRadio.types.ts`:

```ts
export interface DynRadioProps {
  /** Value associated with this radio; used with groups. */
  value: string | number;
  /** Controlled checked state.  If provided, the component becomes controlled. */
  checked?: boolean;
  /** Uncontrolled initial checked state. */
  defaultChecked?: boolean;
  /** Change handler called with `(value: string | number, checked: boolean)` when toggled. */
  onChange?: (value: string | number, checked: boolean) => void;
  /** Name attribute to group radios; matches native `<input>` behaviour. */
  name?: string;
  /** Unique id for the input element; generates one if omitted. */
  id?: string;
  /** Label displayed next to the radio. */
  label?: React.ReactNode;
  /** Position of the label relative to the radio: `right` (default) or `left`. */
  labelPosition?: 'left' | 'right';
  /** Size of the radio: `sm`, `md` (default) or `lg`. */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the radio is disabled. */
  disabled?: boolean;
  /** If the radio has an error (e.g. invalid form state). */
  invalid?: boolean;
  /** Custom checked icon; overrides default dot. */
  icon?: React.ReactNode;
  /** Additional class names. */
  className?: string;
  /** Inline styles. */
  style?: React.CSSProperties;
}
```

If needed, create a `DynRadioGroup` component to manage a group of radios, passing the `name`, `value` and `onChange` down via context.  This group can support horizontal or vertical layout, gap spacing and labelled legends.

### 3. React Implementation (`DynRadio.tsx`)

* Use `forwardRef<HTMLInputElement, DynRadioProps>` to expose a ref to the native input.
* Generate a unique `id` using `useId()` if the caller does not supply one, and map the label’s `htmlFor` to this id.
* For controlled usage, compute `isChecked` from the `checked` prop; for uncontrolled, use `useState` with `defaultChecked`.
* On click or keyboard toggle (`onChange`), call the `onChange` handler with the `value` and new checked state.  Do not toggle if `disabled`.
* Apply classes based on size and state: `.radio`, `.radio--sm`, `.radio--lg`, `.radio--checked`, `.radio--disabled`, `.radio--error`.
* Render the custom `icon` (if provided) inside the inner circle when checked; otherwise, render a default dot.
* Place the label before or after the radio based on `labelPosition` and wrap the control and label in a flex container (`<label>` tag) to associate them.
* Set `role="radio"`, `aria-checked`, `aria-disabled` and `aria-invalid` for accessibility.  Use `tabIndex={0}` on a wrapping element to make the radio focusable and handle `space` and `enter` key events to toggle.

### 4. CSS Module (`DynRadio.module.css`)

Define classes for the radio container, input and label.  Use pseudo-elements (`::before` and `::after`) to draw the outer circle and inner dot so that the native input can remain visually hidden but accessible.  Example structure:

```css
.radio {
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  gap: var(--dyn-radio-spacing, 0.5rem);
  color: var(--dyn-radio-label-color, var(--dyn-color-text-primary, #111827));
}

/* Hide the native input but retain accessibility */
.radioInput {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

/* Outer circle */
.radioBox {
  width: var(--dyn-radio-size, 1rem);
  height: var(--dyn-radio-size, 1rem);
  border: var(--dyn-radio-border-width, 2px) solid var(--dyn-radio-border-color, var(--dyn-color-gray-400, #9ca3af));
  border-radius: 50%;
  background: var(--dyn-radio-bg, transparent);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.2s ease, background-color 0.2s ease;
}

/* Checked indicator */
.radioBox::after {
  content: '';
  width: var(--dyn-radio-icon-size, 0.5rem);
  height: var(--dyn-radio-icon-size, 0.5rem);
  border-radius: 50%;
  background: var(--dyn-radio-icon-color, var(--dyn-color-primary-base, #3b82f6));
  opacity: 0;
  transition: opacity 0.2s ease;
}

.radio--checked .radioBox::after {
  opacity: 1;
}

.radio--disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.radio--error .radioBox {
  border-color: var(--dyn-radio-error-border-color, var(--dyn-color-danger-base, #dc2626));
}

/* Size modifiers */
.radio--sm .radioBox {
  width: var(--dyn-radio-size-sm, 0.75rem);
  height: var(--dyn-radio-size-sm, 0.75rem);
}
.radio--sm .radioBox::after {
  width: calc(var(--dyn-radio-icon-size, 0.5rem) * 0.75);
  height: calc(var(--dyn-radio-icon-size, 0.5rem) * 0.75);
}
.radio--lg .radioBox {
  width: var(--dyn-radio-size-lg, 1.25rem);
  height: var(--dyn-radio-size-lg, 1.25rem);
}
.radio--lg .radioBox::after {
  width: calc(var(--dyn-radio-icon-size, 0.5rem) * 1.25);
  height: calc(var(--dyn-radio-icon-size, 0.5rem) * 1.25);
}

/* Focus ring */
.radio:focus-visible .radioBox {
  outline: 2px solid var(--dyn-radio-focus-ring-color, var(--dyn-color-primary-light, #93c5fd));
  outline-offset: 2px;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :where(.radio) {
    --dyn-radio-border-color: var(--dyn-color-gray-600, #4b5563);
    --dyn-radio-icon-color: var(--dyn-color-blue-400, #60a5fa);
    --dyn-radio-label-color: var(--dyn-color-gray-200, #e5e7eb);
  }
}

/* High contrast */
@media (forced-colors: active) {
  .radioBox {
    border-color: Highlight;
  }
  .radioBox::after {
    background: Highlight;
  }
}
```

### 5. Storybook Stories

Create stories demonstrating:

1. **Basic usage** – a single radio with a label, uncontrolled.
2. **Sizes** – small, medium and large radios.
3. **Disabled** – disabled radio that cannot be toggled.
4. **Error** – radio with `invalid` prop set and error styling.
5. **Custom icon** – radio using a custom checkmark or shape.
6. **Radio Group** – group of three radios with `value`/`onChange` logic to allow one selection.
7. **Dark mode** – show the component in dark mode via Storybook theme switcher.

### 6. Unit Tests

Write tests to ensure:

* Clicking toggles the checked state (controlled and uncontrolled).  When controlled, it calls `onChange` with correct arguments.
* Keyboard interaction (space or enter) toggles the radio.
* Disabled radios do not toggle or call `onChange`.
* Error state applies correct class and `aria-invalid` attribute.
* Custom icon renders when provided.
* Focus ring appears on keyboard focus and respects dark mode and high contrast.

### 7. Export

In `index.ts`, export the component and types:

```ts
export { DynRadio } from './DynRadio';
export type { DynRadioProps } from './DynRadio.types';
```

## Validation Checklist

- [ ] **Token compliance**: All visual properties (size, border, colours, spacing, focus ring) use `--dyn-radio-*` tokens (or `--dyn-input-*` if following shared input tokens) with three‑level fallback.
- [ ] **Variants and states**: Small/medium/large sizes, checked/unchecked, disabled and error states implemented.
- [ ] **Accessibility**: Proper ARIA roles/attributes; keyboard toggling; focus management; label association; dark mode and high contrast support.
- [ ] **Tests**: Comprehensive tests cover interactions, controlled/uncontrolled modes, disabled/error states, custom icon and accessibility.
- [ ] **Documentation**: Storybook stories demonstrate all variants, group usage, custom icons and dark mode; props documented in JSDoc.
- [ ] **Exports**: Component and types are exported from `index.ts`.
