# DynSpinner – Implementation Guide

## Component Overview

`DynSpinner` is a compact loading indicator that communicates an ongoing process or loading state.  It uses a pure CSS animation to rotate a circular element.  The spinner supports multiple sizes, colour variants, optional label text, overlay mode to cover the entire screen, inline mode for embedding within content, adjustable animation speed, dark‑mode overrides and responsive behaviour.  Typical use cases include indicating data fetching, form submission, or page loads.

Key features:

* **Circular spinner** – the indicator is a circle with a spinning border using CSS keyframes【493174806680301†L153-L166】.
* **Size variants** – small, medium and large sizes change the spinner’s diameter and border width【493174806680301†L153-L166】.
* **Colour variants** – primary colour for the visible segment and a secondary colour for the trail; configurable via design tokens.
* **Optional label** – display descriptive text (e.g. “Loading…”) next to or below the spinner, using tokenised typography and colour.
* **Overlay mode** – a full‑screen overlay with a semi‑transparent backdrop; centers the spinner and optional label and blocks interaction.
* **Inline mode** – default; spinner fits within its container and flows with surrounding content.
* **Adjustable animation speed** – expose a prop to control the rotation duration via a token【493174806680301†L169-L176】.
* **Dark mode & high contrast** – tokens provide appropriate colours for dark themes; use forced-colours mode support.

## Current State Analysis

The P2 Nice‑to‑Have document lists `DynSpinner` as a missing component with an estimated effort of 2 hours and provides a list of desired features: circular spinner using pure CSS animation, size variants, colour variants, label/text, overlay and inline modes, custom animation speed, dark mode and responsiveness【493174806680301†L153-L166】.  The component’s token namespace includes `--dyn-spinner-size`, `--dyn-spinner-border-width`, `--dyn-spinner-color-primary`, `--dyn-spinner-color-secondary`, `--dyn-spinner-animation-duration`, `--dyn-spinner-text-color` and `--dyn-spinner-text-size`【493174806680301†L169-L176】.  No implementation exists in the repository, so the component must be built from scratch.

## Implementation Instructions

### 1. File Structure

Create a new folder `DynSpinner/` with the following files:

| File | Purpose |
| --- | --- |
| `DynSpinner.tsx` | React component implementing the spinner and optional overlay. |
| `DynSpinner.types.ts` | TypeScript interfaces for props. |
| `DynSpinner.module.css` | CSS module defining tokens, base classes and keyframes. |
| `DynSpinner.stories.tsx` | Storybook stories demonstrating variants and modes. |
| `DynSpinner.test.tsx` | Jest tests covering rendering, props and accessibility. |
| `index.ts` | Re‑exports component and types. |

### 2. Define Design Tokens

Declare the following CSS custom properties with a three‑level fallback chain in `DynSpinner.module.css`:

* `--dyn-spinner-size` – diameter of the spinner (medium size, e.g. `2rem`).
* `--dyn-spinner-size-sm` and `--dyn-spinner-size-lg` – diameters for small and large sizes.
* `--dyn-spinner-border-width` – thickness of the spinner ring (e.g. `2px`).
* `--dyn-spinner-color-primary` – colour of the visible segment of the ring (default: primary palette)【493174806680301†L169-L176】.
* `--dyn-spinner-color-secondary` – colour of the trail/back segment (e.g. lighter shade)【493174806680301†L169-L176】.
* `--dyn-spinner-animation-duration` – duration of one full rotation (e.g. `0.75s`)【493174806680301†L169-L176】.
* `--dyn-spinner-text-color` – colour of the optional label.
* `--dyn-spinner-text-size` – font size of the label.
* `--dyn-spinner-overlay-bg` – background colour of the overlay (semi‑transparent, e.g. `rgba(0,0,0,0.4)`).

Provide dark‑mode overrides for primary and secondary colours and adjust the overlay background for accessibility.  Include a `prefers-reduced-motion` media query to reduce the spin animation speed or stop the animation completely.

### 3. API Design

Define props in `DynSpinner.types.ts`:

```ts
export interface DynSpinnerProps {
  /** Size of the spinner: 'sm', 'md' (default) or 'lg'. */
  size?: 'sm' | 'md' | 'lg';
  /** Optional label text displayed alongside the spinner. */
  label?: string;
  /** If true, the spinner covers the whole page with a dimmed overlay and centers itself. */
  overlay?: boolean;
  /** Duration of the spin animation (overrides token value). */
  animationDuration?: number | string;
  /** Primary colour for the spinner ring (overrides token value). */
  color?: string;
  /** Secondary colour for the trail/back segment (overrides token value). */
  trailColor?: string;
  /** Additional CSS class names. */
  className?: string;
  /** Inline styles. */
  style?: React.CSSProperties;
}
```

### 4. React Implementation (`DynSpinner.tsx`)

* Use `forwardRef<HTMLDivElement, DynSpinnerProps>` to forward a ref to the spinner container.
* Destructure props with sensible defaults (`size = 'md'`).  Compute spinner size and border width classes based on `size`.  Use CSS variables to override colours and animation duration when `color`, `trailColor` or `animationDuration` props are provided.
* If `overlay` is true, render a `<div className={styles.overlay}>` containing the spinner.  Position the overlay fixed to cover the viewport; center the spinner and label using Flexbox.  Otherwise, render the spinner inline.
* Render the spinner as a `<div className={styles.spinner}>`.  The spinner uses a pseudo element or border segments to create the rotating effect.  Optionally render a `<span className={styles.label}>` for the text.
* Apply `role="status"` and `aria-live="polite"` to the container so screen readers announce loading.  If a label is provided, set `aria-label` or `aria-describedby` accordingly.  Mark the element as hidden from screen readers when no label is provided and rely on context.

### 5. CSS Module (`DynSpinner.module.css`)

Define base classes:

```css
.spinner {
  display: inline-block;
  width: var(--dyn-spinner-size, 2rem);
  height: var(--dyn-spinner-size, 2rem);
  border: var(--dyn-spinner-border-width, 2px) solid var(--dyn-spinner-color-secondary, rgba(0,0,0,0.1));
  border-top-color: var(--dyn-spinner-color-primary, #3b82f6);
  border-right-color: var(--dyn-spinner-color-primary, #3b82f6);
  border-bottom-color: var(--dyn-spinner-color-secondary, rgba(0,0,0,0.1));
  border-left-color: var(--dyn-spinner-color-secondary, rgba(0,0,0,0.1));
  border-radius: 50%;
  animation: dyn-spinner-rotate var(--dyn-spinner-animation-duration, 0.75s) linear infinite;
}

@keyframes dyn-spinner-rotate {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Size modifiers */
.spinner--sm {
  width: var(--dyn-spinner-size-sm, 1.5rem);
  height: var(--dyn-spinner-size-sm, 1.5rem);
  border-width: calc(var(--dyn-spinner-border-width, 2px) * 0.75);
}
.spinner--lg {
  width: var(--dyn-spinner-size-lg, 3rem);
  height: var(--dyn-spinner-size-lg, 3rem);
  border-width: calc(var(--dyn-spinner-border-width, 2px) * 1.5);
}

/* Overlay */
.overlay {
  position: fixed;
  inset: 0;
  background: var(--dyn-spinner-overlay-bg, rgba(0,0,0,0.4));
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.label {
  margin-top: 0.5rem;
  font-size: var(--dyn-spinner-text-size, 0.875rem);
  color: var(--dyn-spinner-text-color, var(--dyn-color-text-primary, #374151));
  text-align: center;
}

/* Dark mode overrides */
@media (prefers-color-scheme: dark) {
  :where(.spinner) {
    --dyn-spinner-color-primary: var(--dyn-color-blue-400, #60a5fa);
    --dyn-spinner-color-secondary: rgba(255,255,255,0.1);
  }
  :where(.label) {
    --dyn-spinner-text-color: var(--dyn-color-gray-100, #f3f4f6);
  }
  :where(.overlay) {
    --dyn-spinner-overlay-bg: rgba(0,0,0,0.6);
  }
}

/* High contrast */
@media (forced-colors: active) {
  .spinner {
    border-color: GrayText;
    border-top-color: ButtonText;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .spinner {
    animation-duration: 1.5s;
  }
}
```

### 6. Storybook Stories

Create stories illustrating:

1. **Default** – medium spinner without label.
2. **With label** – spinner with text (e.g. “Loading…”).
3. **Size variants** – small, medium and large spinners side by side.
4. **Overlay mode** – full‑screen overlay spinner.
5. **Custom colours** – override `color` and `trailColor` props.
6. **Custom speed** – modify `animationDuration` prop.
7. **Dark mode** – demonstrate spinner in dark theme.

### 7. Unit Tests

Write tests using React Testing Library to verify:

* The spinner renders with appropriate classes for each size.
* Custom colours and animation duration override CSS variables.
* Label text appears when provided.
* Overlay mode renders a full‑screen overlay; clicking inside does not close it (the overlay is purely visual and should not handle clicks).
* Accessibility: container uses `role="status"` and `aria-live="polite"`; when no label is provided, ensure screen readers can still infer progress using context or `aria-busy` if implemented.
* Dark mode snapshot tests for token changes.

### 8. Export

In `index.ts`, re‑export the component and props:

```ts
export { DynSpinner } from './DynSpinner';
export type { DynSpinnerProps } from './DynSpinner.types';
```

## Validation Checklist

- [ ] **Token compliance** – All size, colour, border and animation properties use `--dyn-spinner-*` tokens with three‑level fallbacks.
- [ ] **Variants** – Supports small, medium and large sizes; overlay and inline modes; custom colours and animation duration; optional label.
- [ ] **Accessibility** – Uses `role="status"`, `aria-live` and appropriate ARIA attributes; dark mode and high contrast support; reduced motion honoured.
- [ ] **Tests** – Unit tests validate rendering, customisation, overlay, accessibility and dark mode.
- [ ] **Documentation** – Storybook stories demonstrate size variants, overlay, custom colours, speed and dark mode; props documented with JSDoc.
- [ ] **Exports** – Component and props exported from `index.ts`.
