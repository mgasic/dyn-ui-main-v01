# DynRating – Implementation Guide

## Component Overview

`DynRating` is a star‑based (or icon‑based) rating component that lets users select a rating on a scale (e.g. 1–5).  It can be either **interactive**, allowing users to choose a value, or **readonly**, displaying a fixed rating.  Key features include:

* **Customizable icons** – by default uses stars but accepts custom icon components (e.g. hearts, thumbs).  Icons may support half‑filled states for fractional ratings.
* **Variable scale** – specify the number of rating items (`max`), defaulting to 5.
* **Interactive or readonly modes** – interactive mode allows pointer and keyboard selection; readonly mode is decorative with no focusable elements.
* **Half‑step increments** – optionally allow half values (0.5 increments) by detecting pointer position or keyboard arrow increments.
* **Tooltips/labels** – optionally show a tooltip or label for each rating value (e.g. “Poor”, “Excellent”).
* **Size variants** – small, medium and large icons with adjustable gap spacing.
* **Accessibility** – uses a `radiogroup` role with `radio` children when interactive; conveys current value via `aria-valuenow` and `aria-valuemax`; supports keyboard navigation with arrow keys and selection with Space/Enter; appropriate ARIA semantics for readonly mode.
* **Dark mode and high contrast** – design tokens adapt icon colours and hover/focus states for different themes.

## Current State Analysis

The Dyn UI component inventory lists `DynRating` as a **planned** component with a token namespace `--dyn-rating-*` and variants `readonly` and `interactive`【943273054351528†L698-L715】.  There is no existing implementation, so the component needs to be built from scratch.  We must design tokens to control icon sizes, colours, spacing, transitions and states (active, hover, disabled).  Use interactive patterns from the `DynTabs` or `DynListView` components for guidance on keyboard navigation and ARIA roles.

### Required Tokens

Define tokens in `DynRating.module.css` with three‑level fallback:

* `--dyn-rating-icon-size` – default icon dimension (e.g. `1.25rem`).  Provide `--dyn-rating-icon-size-sm` and `--dyn-rating-icon-size-lg` for size variants.
* `--dyn-rating-gap` – space between icons.
* `--dyn-rating-color-inactive` – colour for unselected icons.
* `--dyn-rating-color-hover` – colour when hovering over an icon.
* `--dyn-rating-color-active` – colour for selected icons.
* `--dyn-rating-color-half` – colour for half‑filled icons (may match active colour).
* `--dyn-rating-disabled-opacity` – opacity applied when the rating is disabled.
* `--dyn-rating-label-color` – colour for optional labels or tooltips.
* `--dyn-rating-transition` – transition duration/easing for colour and fill changes.
* Dark mode tokens – override inactive and active colours appropriately.

### Variants and States

`DynRating` supports two variants: **interactive** (default) and **readonly**.  In interactive mode, pointer and keyboard interactions update the value and call an `onChange` callback; in readonly mode, the component is decorative only.  States include **normal**, **hover**, **active**, **half‑active**, **disabled** and **focus**.

## Implementation Instructions

### 1. File Structure

Create a new `DynRating/` folder with the following files:

| File | Purpose |
| --- | --- |
| `DynRating.tsx` | React component implementing interactive and readonly rating. |
| `DynRating.types.ts` | TypeScript interfaces for props. |
| `DynRating.module.css` | CSS module containing tokens, classes and variants. |
| `DynRating.stories.tsx` | Storybook stories for various configurations. |
| `DynRating.test.tsx` | Jest tests covering interaction, accessibility and styles. |
| `index.ts` | Re‑exports component and types. |

### 2. API Design

Define the props for `DynRating` in `DynRating.types.ts`:

```ts
export interface DynRatingProps {
  /** Current rating value (controlled). */
  value?: number;
  /** Default rating value (uncontrolled). */
  defaultValue?: number;
  /** Maximum rating (number of icons). Defaults to 5. */
  max?: number;
  /** Whether fractional values (half increments) are allowed. */
  allowHalf?: boolean;
  /** Whether the rating is interactive. If false, the component is readonly. */
  readOnly?: boolean;
  /** Callback invoked when the rating changes (interactive mode only). */
  onChange?: (value: number) => void;
  /** Custom icon component for the star (receives `filled`, `half` and `hovered` props). */
  icon?: React.ComponentType<{ filled: boolean; half: boolean; hovered: boolean }>;
  /** Size variant: 'sm', 'md' (default), 'lg'. */
  size?: 'sm' | 'md' | 'lg';
  /** Array of labels/tooltips for each rating value (1-indexed). */
  labels?: string[];
  /** Whether the rating is disabled. */
  disabled?: boolean;
  /** Additional class names. */
  className?: string;
  /** Inline styles. */
  style?: React.CSSProperties;
}
```

### 3. React Implementation (`DynRating.tsx`)

* Use `forwardRef<HTMLDivElement, DynRatingProps>` to provide a ref to the outer container.
* Manage internal state for uncontrolled usage (`defaultValue`) using `useState`.  Derive `currentValue` by clamping `value` or state between `0` and `max`.
* Handle pointer events: on `mousemove` over an icon, compute the hovered rating (consider half values if `allowHalf` is true).  On `click`, update the value and call `onChange` if interactive.
* Handle keyboard events: treat the component as a slider or radiogroup; use arrow keys to increment/decrement the rating and space/enter to select.  Use `role="slider"` or `role="radiogroup"` plus individual `radio` roles depending on implementation; ensure ARIA attributes `aria-valuemin=0`, `aria-valuemax=max`, `aria-valuenow=currentValue`, `aria-valuetext` (optional), `aria-readonly` when `readOnly`, and `aria-disabled` when disabled.
* Compute classes based on size and state (e.g. `.rating`, `.rating--sm`, `.rating--disabled`).  For each icon, apply classes `.icon`, `.icon--filled`, `.icon--half`, `.icon--hover` depending on state.
* Render tooltips or labels near each icon when provided.  Use `aria-describedby` to link icons with tooltips for accessibility.

### 4. CSS Module (`DynRating.module.css`)

Define base styles and tokens for icons and container:

```css
.rating {
  display: inline-flex;
  align-items: center;
  gap: var(--dyn-rating-gap, 0.25rem);
  color: var(--dyn-rating-color-inactive, var(--dyn-color-gray-400, #9ca3af));
}

/* Icon wrapper */
.icon {
  width: var(--dyn-rating-icon-size, 1.25rem);
  height: var(--dyn-rating-icon-size, 1.25rem);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: color var(--dyn-rating-transition, 0.2s ease);
}

/* Filled (active) state */
.icon--filled {
  color: var(--dyn-rating-color-active, var(--dyn-color-amber-500, #f59e0b));
}

/* Half filled state */
.icon--half {
  position: relative;
  color: var(--dyn-rating-color-active, var(--dyn-color-amber-500, #f59e0b));
}
.icon--half::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  background: currentColor;
  overflow: hidden;
  clip-path: inset(0 50% 0 0);
}

/* Hover state */
.icon--hover {
  color: var(--dyn-rating-color-hover, var(--dyn-color-amber-400, #fbbf24));
}

/* Disabled */
.rating--disabled {
  cursor: not-allowed;
  opacity: var(--dyn-rating-disabled-opacity, 0.5);
}

/* Size modifiers */
.rating--sm .icon {
  width: var(--dyn-rating-icon-size-sm, 1rem);
  height: var(--dyn-rating-icon-size-sm, 1rem);
}
.rating--lg .icon {
  width: var(--dyn-rating-icon-size-lg, 1.5rem);
  height: var(--dyn-rating-icon-size-lg, 1.5rem);
}

/* Focus outline for keyboard navigation */
.icon:focus-visible {
  outline: 2px solid var(--dyn-rating-color-active, var(--dyn-color-amber-500, #f59e0b));
  outline-offset: 2px;
}

/* Dark mode overrides */
@media (prefers-color-scheme: dark) {
  :where(.rating) {
    --dyn-rating-color-inactive: var(--dyn-color-gray-700, #374151);
    --dyn-rating-color-active: var(--dyn-color-amber-300, #fdba74);
    --dyn-rating-color-hover: var(--dyn-color-amber-200, #fde68a);
  }
}

/* High contrast */
@media (forced-colors: active) {
  .icon {
    color: ButtonText;
  }
  .icon--filled, .icon--half {
    color: Highlight;
  }
}
```

### 5. Storybook Stories

Add stories for the following scenarios:

1. **Interactive rating** – default 5 stars, interactive, uncontrolled.
2. **Controlled rating** – parent component controls value and updates on change.
3. **Half steps** – allow half increments; display a half-filled icon.
4. **Custom icons** – use custom SVG icons (e.g. heart) for rating items.
5. **Readonly** – display a static rating (e.g. 3.5) with no interactivity.
6. **Sizes** – show small, medium and large sizes side by side.
7. **Disabled** – rating is disabled and cannot be changed.
8. **Dark mode** – preview interactive rating in dark mode.

### 6. Unit Tests

Your tests should cover:

* Rendering correct number of icons based on `max`.
* Controlled vs uncontrolled behaviour – verifying `value` and `defaultValue` logic.
* Pointer interactions: hover and click update rating; half values if enabled.
* Keyboard interactions: arrow keys navigate; space/enter selects.
* Disabled state prevents interactions and sets `aria-disabled`.
* Readonly state renders a decorative rating with no interactive behaviour and appropriate ARIA attributes (`aria-readonly` or `role="img"`).
* Custom icons render correctly in filled/half/hover states.
* Dark mode and high contrast style snapshots.

### 7. Export

Export the component and types from `index.ts`:

```ts
export { DynRating } from './DynRating';
export type { DynRatingProps } from './DynRating.types';
```

## Validation Checklist

- [ ] **Token compliance**: All icon sizes, colours, spacing, transitions and opacities use `--dyn-rating-*` tokens with three‑level fallback.
- [ ] **Variants**: Supports interactive and readonly modes; optional half steps; small/medium/large sizes; labels/tooltips.
- [ ] **Accessibility**: Uses correct ARIA roles (`radiogroup`/`radio` or `slider`), labels, keyboard navigation; supports dark mode and high contrast.
- [ ] **Tests**: Unit tests verify interactive and readonly behaviour, keyboard and pointer interactions, custom icons, controlled/uncontrolled logic and accessibility.
- [ ] **Documentation**: Storybook covers all variants, sizes, custom icons and dark mode; props documented in JSDoc.
- [ ] **Exports**: Component and types are exported from `index.ts`.
