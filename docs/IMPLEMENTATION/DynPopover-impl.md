# DynPopover – Implementation Guide

## Component Overview

`DynPopover` is an overlay component that displays contextual information anchored to a trigger element.  Unlike a simple tooltip, the popover can contain arbitrary JSX content such as menus, forms or rich text.  It supports four placements (**top**, **right**, **bottom** and **left**), multiple trigger modes (click, hover, focus or manual control) and optional arrows.  Key features include:

* **Configurable placement** – choose where the popover appears relative to the trigger (`top`, `right`, `bottom` or `left`).
* **Multiple triggers** – open the popover on click, hover, focus or under manual control via props.
* **Controlled and uncontrolled modes** – support controlled open state via `open` and `onOpenChange` props or use internal state with `defaultOpen`.
* **Optional arrow and offset** – display a small arrow pointing to the trigger and adjust its offset from the trigger element.
* **Portal support** – optionally render the popover in a portal to avoid clipping or z‑index issues.
* **Accessibility** – use appropriate roles (`tooltip` or `dialog`), ARIA attributes and focus management when the popover contains interactive elements.
* **Dark mode and reduced‑motion support** – tokenised colours, transitions and animations adapt to dark themes and user preferences.

## Current State Analysis

The component checklist marks `DynPopover` as a **Planned** component in Phase 2 with a 75 % status and early planning designation【480681578444987†L496-L510】.  It uses the token namespace `--dyn-popover-*` and supports placements **top**, **right**, **bottom** and **left**【480681578444987†L496-L510】.  No implementation files currently exist, so this guide provides a full design and implementation roadmap.

## Implementation Instructions

### 1. File structure

Create a new directory `packages/dyn-ui-react/src/components/DynPopover/` containing:

```
DynPopover.tsx        – React component
DynPopover.types.ts   – TypeScript interfaces and enums
DynPopover.module.css – CSS module defining tokens and positions
DynPopover.stories.tsx – Storybook stories demonstrating triggers and placements
DynPopover.test.tsx   – Unit tests for interaction and positioning
index.ts              – Barrel file exporting the component and types
```

### 2. Define design tokens

In `DynPopover.module.css`, declare CSS custom properties prefixed with `--dyn-popover-*` and implement a three‑level fallback chain.  Suggested tokens:

| Token | Purpose | Example fallback |
|------|---------|------------------|
| `--dyn-popover-bg` | Background colour of the popover container | `var(--dyn-color-surface, #ffffff)` |
| `--dyn-popover-color` | Text colour inside the popover | `var(--dyn-color-text-primary, #333333)` |
| `--dyn-popover-border-color` | Border colour | `var(--dyn-color-border, #e5e5e5)` |
| `--dyn-popover-border-radius` | Corner radius | `var(--dyn-radius-md, 8px)` |
| `--dyn-popover-shadow` | Box shadow | `var(--dyn-shadow-lg, 0 4px 8px rgba(0,0,0,0.1))` |
| `--dyn-popover-padding` | Padding inside the popover | `var(--dyn-space-4, 1rem)` |
| `--dyn-popover-max-width` | Maximum width of the popover | `24rem` |
| `--dyn-popover-z-index` | Stacking context to ensure the popover overlays other content | `1000` |
| `--dyn-popover-arrow-size` | Width and height of the arrow triangle | `0.5rem` |
| `--dyn-popover-arrow-color` | Colour of the arrow (usually matches background) | `var(--dyn-popover-bg)` |
| `--dyn-popover-transition-duration` | Duration of fade/slide animations | `0.2s` |

Provide dark‑mode overrides to switch the background and border colours and adjust the shadow opacity.  Include high‑contrast adjustments.  Define a `prefers-reduced-motion` media query to reduce or remove transitions for motion‑sensitive users.

### 3. Define the API and types

Create the following types in `DynPopover.types.ts`:

```ts
export type DynPopoverPlacement = 'top' | 'right' | 'bottom' | 'left';
export type DynPopoverTrigger = 'click' | 'hover' | 'focus' | 'manual';

export interface DynPopoverProps {
  /** The content to display inside the popover */
  content: React.ReactNode | ((props: { close: () => void }) => React.ReactNode);
  /** A single React element that acts as the trigger */
  children: React.ReactElement;
  /** Where the popover appears relative to the trigger */
  placement?: DynPopoverPlacement;
  /** How the popover is triggered */
  trigger?: DynPopoverTrigger;
  /** Controlled open state */
  open?: boolean;
  /** Default open state (for uncontrolled usage) */
  defaultOpen?: boolean;
  /** Callback fired when the open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Distance in pixels between the popover and the trigger */
  offset?: number;
  /** Whether to render the popover’s arrow */
  showArrow?: boolean;
  /** Whether clicking outside closes the popover (default: true) */
  closeOnOutsideClick?: boolean;
  /** Whether pressing Escape closes the popover (default: true) */
  closeOnEsc?: boolean;
  /** Render the popover into a portal (default: true) */
  portal?: boolean;
  /** Accessible label for screen readers (if the content is not purely descriptive) */
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}
```

### 4. Implement the React component

In `DynPopover.tsx`, write a functional component using `forwardRef<HTMLDivElement, DynPopoverProps>`.  Implementation guidelines:

1. **State and refs** – Use `useState` for uncontrolled open state if `open` prop is undefined.  Create refs for the trigger element and the popover element.  Use `useId` (from React) to generate unique IDs for ARIA attributes.

2. **Positioning** – To position the popover relative to the trigger, use a lightweight positioning hook.  You can implement a simple `usePosition` hook that calculates the top/left coordinates based on the trigger’s bounding rect, the desired `placement` and the `offset`.  Alternatively, integrate a library like Popper.js for robust positioning.

3. **Trigger handling** – Clone the `children` element with additional props to handle the chosen trigger:
   * **Click** – on click, toggle the popover and call `onOpenChange` if provided.
   * **Hover** – on mouse enter, open; on mouse leave, close after a short delay.
   * **Focus** – on focus, open; on blur, close.
   * **Manual** – never attach event handlers; rely on `open` and `onOpenChange`.

   Merge the original event handlers from the child element to avoid overriding custom logic.

4. **Outside click and Escape handling** – If `closeOnOutsideClick` is true, attach a `mousedown` listener on the document when the popover is open.  When a click occurs outside both the trigger and the popover, call the `close` function.  Similarly, attach a `keydown` listener to close the popover on Escape when `closeOnEsc` is true.

5. **Portal rendering** – If `portal` is true, use `ReactDOM.createPortal` to render the popover into `document.body` or a custom container.  Ensure correct z‑index stacking by applying `--dyn-popover-z-index`.

6. **Arrow** – If `showArrow` is true, render an additional `<div className={styles.arrow}>`.  Use CSS to create a triangle by rotating a square (via `transform: rotate(45deg)`) and position it using the computed placement.  Set its background colour via `--dyn-popover-arrow-color`.

7. **Accessibility** – When the popover content is purely decorative, set `role="tooltip"` and connect it to the trigger via `aria-describedby`.  For interactive content, use `role="dialog"` and set `aria-modal="false"`; trap focus within the popover using a focus trap library if necessary.  Use `aria-label` when `ariaLabel` is provided.

### 5. Create the CSS module

Define base classes in `DynPopover.module.css`:

```css
.popover {
  position: absolute;
  z-index: var(--dyn-popover-z-index);
  background-color: var(--dyn-popover-bg);
  color: var(--dyn-popover-color);
  border: 1px solid var(--dyn-popover-border-color);
  border-radius: var(--dyn-popover-border-radius);
  box-shadow: var(--dyn-popover-shadow);
  padding: var(--dyn-popover-padding);
  max-width: var(--dyn-popover-max-width);
  transition: opacity var(--dyn-popover-transition-duration) ease,
              transform var(--dyn-popover-transition-duration) ease;
  opacity: 0;
  pointer-events: none;
}
.open {
  opacity: 1;
  pointer-events: auto;
}
.arrow {
  position: absolute;
  width: var(--dyn-popover-arrow-size);
  height: var(--dyn-popover-arrow-size);
  background-color: var(--dyn-popover-arrow-color);
  transform: rotate(45deg);
}
/* Placement modifiers: adjust position and transform origin */
.placement-top   { transform-origin: bottom center; }
.placement-right { transform-origin: center left; }
.placement-bottom{ transform-origin: top center; }
.placement-left  { transform-origin: center right; }
```

Define additional classes to position the arrow relative to the popover for each placement (e.g. `.arrowTop` sets `bottom: -calc(var(--dyn-popover-arrow-size) / 2)` and `left: 50%`).  Add dark‑mode overrides for background and border colours and remove transitions in reduced‑motion mode.

### 6. Develop Storybook stories

In `DynPopover.stories.tsx`, write stories demonstrating:

1. **Click trigger** – A button that opens the popover on click and closes on outside click.
2. **Hover trigger** – A text element that opens on hover and closes on leave.
3. **Focus trigger** – An input that shows a popover when focused.
4. **Manual control** – A controlled popover with a toggle button.
5. **Placement variations** – Show top, right, bottom and left placements with arrows.
6. **Dark mode** – Display the popover in Storybook’s dark theme to verify colour tokens.

Provide controls to toggle `showArrow`, `placement`, `trigger` and `offset` so developers can experiment.

### 7. Write unit tests

Use React Testing Library and Jest to test:

* The popover opens and closes on the correct events for each trigger type.
* Clicking outside or pressing Escape closes the popover when enabled.
* Controlled mode respects the `open` prop and calls `onOpenChange` appropriately.
* The correct placement classes apply based on the `placement` prop.
* The arrow appears when `showArrow` is true and is hidden otherwise.
* ARIA attributes (`role`, `aria-describedby`, `aria-expanded`) are set correctly.

Aim for at least 80 % test coverage.

### 8. Export the component

In `index.ts`, export the component and its types:

```ts
export { default as DynPopover } from './DynPopover';
export type { DynPopoverProps, DynPopoverPlacement, DynPopoverTrigger } from './DynPopover.types';
```

## Validation Checklist

- [ ] All `--dyn-popover-*` tokens are defined with a 3‑level fallback and dark‑mode overrides.
- [ ] Placements (`top`, `right`, `bottom`, `left`) render the popover and arrow in the correct positions.
- [ ] Trigger modes (`click`, `hover`, `focus`, `manual`) work as expected, with outside‑click and Escape handling.
- [ ] Controlled and uncontrolled usage patterns are supported.
- [ ] Portal rendering behaves correctly and respects z‑index tokens.
- [ ] Accessibility: proper roles, ARIA attributes and focus management.
- [ ] Storybook stories illustrate triggers, placements, manual control and dark mode.
- [ ] Unit tests cover opening/closing logic, positioning, props and accessibility.
- [ ] Component and types are exported via `index.ts`.
