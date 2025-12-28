# DynTooltip – Implementation Guide

## Component Overview

DynTooltip is a lightweight overlay component used to display contextual information when users interact with an element.  It appears above other content and can be positioned on the top, bottom, left or right of the trigger.  The tooltip supports automatic positioning to avoid viewport edges, optional arrow pointers, multiple trigger types (hover, focus or click) and theme variants (dark, light, info, warning).  Smooth animations and a configurable delay improve the user experience.  The component must be accessible with appropriate ARIA roles and keyboard handling.

## Current State Analysis

**Existing files:** none – there is no `DynTooltip` directory in the codebase.

**Identified gaps:**

- A React component implementing positioning logic, triggers, portal rendering and accessibility does not exist.
- Type definitions for props (`position`, `trigger`, `variant`, `autoPosition`, `delayShow`, `delayHide`) need to be created.
- A CSS module with tokens such as `--dyn-tooltip-bg`, `--dyn-tooltip-padding-y` and `--dyn-tooltip-arrow-size` is missing.  Tokens must include dark‑mode overrides and 3‑level fallbacks as described in the specification【735682384227771†L34-L109】.
- Auto‑positioning logic and arrow positioning classes must be implemented for each direction.
- There are no unit tests or Storybook stories demonstrating various positions, triggers and themes.

## Implementation Instructions

### 1. Code Structure

1. **Create a new directory** `packages/dyn-ui-react/src/components/DynTooltip/`.
2. Add files:
   - `DynTooltip.tsx` – the main component.
   - `DynTooltip.types.ts` – defines types and props.
   - `DynTooltip.module.css` – tokens, base styles and position/theme classes.
   - `DynTooltip.stories.tsx` – Storybook stories.
   - `DynTooltip.test.tsx` – unit tests.
   - `index.ts` – re‑exports.

### 2. Define Types

In `DynTooltip.types.ts` define enums for position, trigger and variant and the props interface.  Example:

```ts
// File: packages/dyn-ui-react/src/components/DynTooltip/DynTooltip.types.ts
export type DynTooltipPosition = 'top' | 'bottom' | 'left' | 'right';
export type DynTooltipTrigger = 'hover' | 'focus' | 'click';
export type DynTooltipVariant = 'dark' | 'light' | 'info' | 'warning';

export interface DynTooltipProps {
  /** The text or JSX to display inside the tooltip */
  content: React.ReactNode;
  /** Position relative to the trigger (default `top`) */
  position?: DynTooltipPosition;
  /** How the tooltip is triggered (default `hover`) */
  trigger?: DynTooltipTrigger;
  /** Automatically reposition to avoid viewport edges */
  autoPosition?: boolean;
  /** Theme variant (dark, light, info or warning) */
  variant?: DynTooltipVariant;
  /** Maximum width (e.g. `200px`) */
  maxWidth?: string;
  /** Delay before showing (ms) */
  delayShow?: number;
  /** Delay before hiding (ms) */
  delayHide?: number;
  /** Children as trigger element */
  children: React.ReactElement;
  /** Additional className for custom styling */
  className?: string;
}
```

### 3. Implement the Component

In `DynTooltip.tsx` implement a functional component using hooks to handle state and positioning.  Use a portal to render the tooltip in `document.body`.  Outline skeleton:

```tsx
// File: packages/dyn-ui-react/src/components/DynTooltip/DynTooltip.tsx
import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import type { DynTooltipProps } from './DynTooltip.types';
import styles from './DynTooltip.module.css';

export const DynTooltip: React.FC<DynTooltipProps> = ({
  content,
  children,
  position = 'top',
  trigger = 'hover',
  autoPosition = true,
  variant = 'dark',
  maxWidth,
  delayShow = 0,
  delayHide = 0,
  className,
}) => {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const showTooltip = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setVisible(true), delayShow);
  };
  const hideTooltip = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setVisible(false), delayHide);
  };

  // Update position when visible
  useEffect(() => {
    if (!visible || !triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const tooltipSize = { width: 0, height: 0 };
    const offset = 8;
    // Compute simple positions; refine later for autoPosition
    let top = 0;
    let left = 0;
    if (position === 'top') {
      top = rect.top - offset;
      left = rect.left + rect.width / 2;
    } else if (position === 'bottom') {
      top = rect.bottom + offset;
      left = rect.left + rect.width / 2;
    } else if (position === 'left') {
      top = rect.top + rect.height / 2;
      left = rect.left - offset;
    } else if (position === 'right') {
      top = rect.top + rect.height / 2;
      left = rect.right + offset;
    }
    setCoords({ top, left });
  }, [visible, position]);

  // Trigger event handlers
  const triggerProps: any = {};
  if (trigger === 'hover') {
    triggerProps.onMouseEnter = showTooltip;
    triggerProps.onMouseLeave = hideTooltip;
  } else if (trigger === 'focus') {
    triggerProps.onFocus = showTooltip;
    triggerProps.onBlur = hideTooltip;
  } else if (trigger === 'click') {
    triggerProps.onClick = () => setVisible(v => !v);
  }
  // Hide on ESC
  useEffect(() => {
    const escHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setVisible(false);
    };
    document.addEventListener('keydown', escHandler);
    return () => document.removeEventListener('keydown', escHandler);
  }, []);

  const tooltip = visible ? (
    <div
      className={
        `${styles.tooltip} ${styles.tooltipVisible} ${styles[`tooltip--${position}`]} ${styles[`tooltip--${variant}`]} ${className ?? ''}`
      }
      style={{ top: coords.top, left: coords.left, maxWidth }}
      role="tooltip"
    >
      {content}
      <span className={styles.tooltipArrow} />
    </div>
  ) : null;

  return (
    <>
      {React.cloneElement(children, { ref: triggerRef, ...triggerProps, 'aria-describedby': visible ? 'dyn-tooltip' : undefined })}
      {ReactDOM.createPortal(tooltip, document.body)}
    </>
  );
};

DynTooltip.displayName = 'DynTooltip';
export default DynTooltip;
```

### 4. CSS Module

Define tokens and classes in `DynTooltip.module.css` following the specification【735682384227771†L94-L176】.  Tokens should be scoped under `.tooltip` and use 3‑level fallbacks.  Include variants for `light`, `info` and `warning` themes and classes for each position’s arrow:

```css
/* File: packages/dyn-ui-react/src/components/DynTooltip/DynTooltip.module.css */
.tooltip {
  --dyn-tooltip-bg: var(--dyn-color-neutral-900, var(--legacy-color-neutral-900, rgba(31,41,55,0.95)));
  --dyn-tooltip-color: var(--dyn-color-neutral-0, var(--legacy-color-neutral-0, #ffffff));
  --dyn-tooltip-padding-y: var(--dyn-spacing-xs, var(--legacy-spacing-xs, 0.25rem));
  --dyn-tooltip-padding-x: var(--dyn-spacing-sm, var(--legacy-spacing-sm, 0.5rem));
  --dyn-tooltip-border-radius: var(--dyn-radius-sm, var(--legacy-radius-sm, 0.375rem));
  --dyn-tooltip-shadow: var(--dyn-shadow-lg, var(--legacy-shadow-lg, 0 4px 6px rgba(0,0,0,0.1)));
  --dyn-tooltip-max-width: 250px;
  --dyn-tooltip-z-index: var(--dyn-z-index-tooltip, 1500);
  --dyn-tooltip-gap: 8px;
  --dyn-tooltip-transition: var(--dyn-transition-base, var(--legacy-transition-base, 200ms)) all;
  --dyn-tooltip-arrow-size: 6px;
  position: absolute;
  background-color: var(--dyn-tooltip-bg);
  color: var(--dyn-tooltip-color);
  padding: var(--dyn-tooltip-padding-y) var(--dyn-tooltip-padding-x);
  border-radius: var(--dyn-tooltip-border-radius);
  box-shadow: var(--dyn-tooltip-shadow);
  max-width: var(--dyn-tooltip-max-width);
  z-index: var(--dyn-tooltip-z-index);
  opacity: 0;
  pointer-events: none;
  transition: var(--dyn-tooltip-transition);
  transform: translateY(-4px);
}

.tooltipVisible {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
}

/* Position modifiers for arrow placement */
.tooltip--top .tooltipArrow {
  position: absolute;
  bottom: calc(-1 * var(--dyn-tooltip-arrow-size));
  left: 50%;
  transform: translateX(-50%);
  border-width: var(--dyn-tooltip-arrow-size) var(--dyn-tooltip-arrow-size) 0;
  border-style: solid;
  border-color: var(--dyn-tooltip-bg) transparent transparent;
}
.tooltip--bottom .tooltipArrow {
  position: absolute;
  top: calc(-1 * var(--dyn-tooltip-arrow-size));
  left: 50%;
  transform: translateX(-50%);
  border-width: 0 var(--dyn-tooltip-arrow-size) var(--dyn-tooltip-arrow-size);
  border-style: solid;
  border-color: transparent transparent var(--dyn-tooltip-bg);
}
.tooltip--left .tooltipArrow {
  position: absolute;
  top: 50%;
  right: calc(-1 * var(--dyn-tooltip-arrow-size));
  transform: translateY(-50%);
  border-width: var(--dyn-tooltip-arrow-size) 0 var(--dyn-tooltip-arrow-size) var(--dyn-tooltip-arrow-size);
  border-style: solid;
  border-color: transparent transparent transparent var(--dyn-tooltip-bg);
}
.tooltip--right .tooltipArrow {
  position: absolute;
  top: 50%;
  left: calc(-1 * var(--dyn-tooltip-arrow-size));
  transform: translateY(-50%);
  border-width: var(--dyn-tooltip-arrow-size) var(--dyn-tooltip-arrow-size) var(--dyn-tooltip-arrow-size) 0;
  border-style: solid;
  border-color: transparent var(--dyn-tooltip-bg) transparent transparent;
}

/* Theme variants */
.tooltip--light {
  --dyn-tooltip-bg: var(--dyn-color-neutral-0, var(--legacy-color-neutral-0, #ffffff));
  --dyn-tooltip-color: var(--dyn-color-neutral-900, var(--legacy-color-neutral-900, #1f2937));
  border: 1px solid var(--dyn-color-border, var(--legacy-color-border, #d1d5db));
}
.tooltip--info {
  --dyn-tooltip-bg: var(--dyn-color-info, var(--legacy-color-info, #2563eb));
  --dyn-tooltip-color: var(--dyn-color-neutral-0, #ffffff);
}
.tooltip--warning {
  --dyn-tooltip-bg: var(--dyn-color-warning, var(--legacy-color-warning, #f59e0b));
  --dyn-tooltip-color: var(--dyn-color-neutral-0, #ffffff);
}

@media (prefers-color-scheme: dark) {
  .tooltip {
    --dyn-tooltip-bg: var(--dyn-color-neutral-800, var(--legacy-color-neutral-800, rgba(55,65,81,0.95)));
  }
}

@media (prefers-reduced-motion: reduce) {
  .tooltip { transition: none; }
}
```

### 5. Testing

Tests should verify:

- Tooltip shows and hides correctly for each trigger type (hover, focus, click).
- Positioning classes and arrow positions reflect the `position` prop.
- Auto‑positioning logic (to be implemented) relocates the tooltip when near viewport edges.
- The portal renders into `document.body` and cleans up on unmount.
- Keyboard `Escape` closes the tooltip.
- Delay show/hide times are honoured.
- Theme variants override background and text colours appropriately.
- Dark‑mode overrides apply when `prefers-color-scheme: dark` is mocked.

### 6. Storybook

Create stories demonstrating:

- Basic tooltip with default settings.
- All positions (`top`, `bottom`, `left`, `right`).
- All triggers (`hover`, `focus`, `click`).
- All theme variants (dark, light, info, warning).
- Long text with automatic wrapping and max‑width demonstration.
- Auto‑position near the edges of the viewport.
- Dark‑mode preview using Storybook’s theme switcher.

### 7. Git Workflow

- Branch: `feat/component-dyntooltip`.
- Recommended commits:
  - `feat(DynTooltip): initial implementation with positioning and triggers`.
  - `style(DynTooltip): add tokens, variants and arrow styles`.
  - `test(DynTooltip): add unit tests for triggers and positioning`.
- After tests pass and stories are created, open a PR referencing the DynTooltip specification and this guide.

### 8. Validation Checklist

- [ ] All tokens follow the `--dyn-tooltip-*` pattern with 3‑level fallback values.
- [ ] Component supports `top`, `bottom`, `left` and `right` positions with arrow pointers.
- [ ] `hover`, `focus` and `click` triggers work as expected.
- [ ] Auto‑positioning and portal rendering implemented.
- [ ] Variants `dark`, `light`, `info` and `warning` apply correct colours.
- [ ] Dark‑mode overrides and reduced‑motion rules added.
- [ ] Unit tests and Storybook stories cover positions, triggers and themes.
- [ ] Component and types exported from `index.ts`.