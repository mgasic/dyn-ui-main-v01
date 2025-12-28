# DynProgress – Implementation Guide

## Component Overview

`DynProgress` provides both linear and circular progress indicators for displaying loading status or completion percentage.  It supports **determinate** progress (a percentage from 0 to 100) and **indeterminate** or **animated** states when progress is unknown.  The component is designed to be accessible and customizable: it exposes props for value, maximum, size, colour and labels, and uses design tokens to control track and bar colours, thickness, radius, and animations.  Variants include `linear` and `circular` forms as noted in the component checklist【943273054351528†L536-L547】.

## Current State Analysis

`DynProgress` does not currently exist in the codebase.  The AI specification classifies it as a **specialized component** with status **85%** and token namespace `--dyn-progress-*`【943273054351528†L536-L547】.  Variants `linear` and `circular` are required.  Since there is no implementation yet, we must design both the API and styling from scratch, adhering to Dyn UI guidelines.

### Required Tokens

Create the following tokens in `DynProgress.module.css` (each with three‑level fallback):

* `--dyn-progress-track-bg` – background colour of the progress track.
* `--dyn-progress-bar-bg` – colour of the filled portion (linear) or the stroke (circular).
* `--dyn-progress-height` – height/thickness of the linear bar.
* `--dyn-progress-radius` – border radius for the linear bar.
* `--dyn-progress-transition` – duration/easing for transitions.
* `--dyn-progress-label-color` – colour of optional label text.
* `--dyn-progress-circle-size` – diameter of the circular variant.
* `--dyn-progress-circle-stroke-width` – stroke width of the circle.
* `--dyn-progress-circle-gap` – gap between the circle and any label.

Define dark‑mode overrides for the track and bar colours, and provide high contrast alternatives.  Use `@media (prefers-reduced-motion)` to disable animations for users who prefer reduced motion.

## Implementation Instructions

### 1. File Structure

Create a new `DynProgress/` folder with:

| File | Purpose |
| --- | --- |
| `DynProgress.tsx` | React component implementing linear and circular progress. |
| `DynProgress.types.ts` | TypeScript interfaces for props. |
| `DynProgress.module.css` | CSS module defining tokens and styles for both variants. |
| `DynProgress.stories.tsx` | Storybook stories for each variant and state. |
| `DynProgress.test.tsx` | Jest tests covering rendering, animation, and accessibility. |
| `index.ts` | Re‑exports. |

### 2. API Design

The component should support both controlled and uncontrolled usage:

```ts
type DynProgressVariant = 'linear' | 'circular';

interface DynProgressProps {
  /** Current value between 0 and `max`. Omit for indeterminate progress. */
  value?: number;
  /** Maximum value, defaults to 100. */
  max?: number;
  /** Variant of progress bar: linear (default) or circular. */
  variant?: DynProgressVariant;
  /** Size modifier: small, medium or large. Affects height and circle diameter. */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the progress is indeterminate (shows an animated bar/spinner). */
  indeterminate?: boolean;
  /** Optional label to display current value or custom text. */
  label?: string | ((value?: number, max?: number) => React.ReactNode);
  /** ARIA label for screen readers. */
  ariaLabel?: string;
  /** Additional class names. */
  className?: string;
  /** Inline styles. */
  style?: React.CSSProperties;
}
```

### 3. React Implementation (`DynProgress.tsx`)

* Use `forwardRef<HTMLDivElement, DynProgressProps>` to expose a ref to the root element.
* Set default `variant` to `linear`, `max` to `100`, and `size` to `md`.  Normalise the `value` into a percentage (`value / max * 100`) when `indeterminate` is false.
* For linear variant:
  * Render a `<div className={styles.progress}>` container with an inner `<div className={styles.bar}>` representing the fill.  Set the width of the bar via inline style: `{ width: percentage + '%' }`.
  * Apply size classes `.progress--sm`, `.progress--md`, `.progress--lg` to adjust height using tokens.
* For circular variant:
  * Render an SVG `<svg>` with two `<circle>` elements: one for the track and one for the progress stroke.  Use `stroke-dasharray` and `stroke-dashoffset` to represent the current value.  Calculate circumference as `2 * Math.PI * radius`.
  * Use `role="progressbar"`, `aria-valuenow`, `aria-valuemin="0"`, and `aria-valuemax={max}` for accessibility.
* If `indeterminate` is true, add a CSS class to animate the bar or spinner continuously.
* Render the optional label below or alongside the bar using the `label` prop; support `label` as a function to customise the displayed text (e.g. show `value%`).  Use `--dyn-progress-label-color` token for styling.

### 4. CSS Module (`DynProgress.module.css`)

Define classes and tokens for both variants:

```css
.progress {
  width: 100%;
  background: var(--dyn-progress-track-bg, #e5e7eb);
  border-radius: var(--dyn-progress-radius, 0.25rem);
  position: relative;
  overflow: hidden;
}
.bar {
  height: var(--dyn-progress-height, 0.5rem);
  background: var(--dyn-progress-bar-bg, #3b82f6);
  border-radius: inherit;
  transition: var(--dyn-progress-transition, width 0.3s ease);
}
/* Size modifiers */
.progress--sm .bar { height: calc(var(--dyn-progress-height, 0.5rem) * 0.75); }
.progress--lg .bar { height: calc(var(--dyn-progress-height, 0.5rem) * 1.5); }

/* Circular variant */
.circular {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--dyn-progress-circle-size, 2rem);
  height: var(--dyn-progress-circle-size, 2rem);
  position: relative;
}
.circleTrack {
  stroke: var(--dyn-progress-track-bg, #e5e7eb);
  stroke-width: var(--dyn-progress-circle-stroke-width, 4);
  fill: transparent;
}
.circleBar {
  stroke: var(--dyn-progress-bar-bg, #3b82f6);
  stroke-width: var(--dyn-progress-circle-stroke-width, 4);
  fill: transparent;
  transition: var(--dyn-progress-transition, stroke-dashoffset 0.3s ease);
}
.indeterminate .bar {
  animation: progress-indeterminate 1.5s infinite linear;
}
@keyframes progress-indeterminate {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
/* Dark mode overrides */
@media (prefers-color-scheme: dark) {
  :where(.progress) {
    --dyn-progress-track-bg: var(--dyn-color-gray-800, #374151);
    --dyn-progress-bar-bg: var(--dyn-color-blue-400, #60a5fa);
    --dyn-progress-label-color: var(--dyn-color-gray-200, #e5e7eb);
  }
}
```

Ensure that all pixel values are replaced with tokens (e.g. stroke widths) and that `indeterminate` animations are disabled in reduced motion mode via `@media (prefers-reduced-motion)`.

### 5. Storybook Stories

Provide the following demos:

1. **Linear Determinate** – Show progress at 0%, 50% and 100%.
2. **Linear Indeterminate** – Demonstrate the animated bar.
3. **Circular Determinate** – Display a circular progress with dynamic value and label.
4. **Circular Indeterminate** – Show a spinner style indicator.
5. **Sizes** – Compare small, medium and large sizes.
6. **Dark Mode** – Display examples in dark mode.

### 6. Unit Tests

Write tests to ensure:

* Correct calculation of progress percentage and rendering of width/stroke offset.
* The component sets appropriate ARIA attributes (`aria-valuemin`, `aria-valuemax`, `aria-valuenow`).
* Indeterminate state triggers continuous animation (skip for reduced motion).
* Size variants change the bar height/circle diameter.
* Snapshot tests for dark mode and indeterminate animations.

### 7. Export

Export the component and types from `index.ts`:

```ts
export { DynProgress } from './DynProgress';
export type { DynProgressProps, DynProgressVariant } from './DynProgress.types';
```

## Validation Checklist

- [ ] **Token compliance**: All visual values for track, bar, radius, height, circle size and transitions use `--dyn-progress-*` tokens with three‑level fallbacks.
- [ ] **Variants**: Both `linear` and `circular` implementations exist; `indeterminate` and determinate modes supported.
- [ ] **Sizes**: Small, medium and large sizes adjust thickness or diameter appropriately via tokens.
- [ ] **Dark mode & accessibility**: Dark mode overrides apply; high contrast tokens provided; ARIA attributes correctly set for progressbars.
- [ ] **Reduced motion**: Animations respect the `prefers-reduced-motion` media query.
- [ ] **Tests**: Comprehensive unit tests verify percentage calculations, ARIA attributes, animations, size variants and dark mode.
- [ ] **Documentation**: Storybook stories cover all states and sizes and include dark mode previews.
- [ ] **Exports**: Component and types exported from `index.ts`.
