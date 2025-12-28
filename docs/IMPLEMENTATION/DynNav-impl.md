# DynNav – Implementation Guide

## Component Overview

`DynNav` is a flexible navigation bar component that arranges a set of navigation items horizontally or vertically.  It can be used for top‑level site navigation, sidebar menus or secondary sub‑menus.  The component supports two orientations (**horizontal** and **vertical**) and is fully customisable through design tokens for colours, spacing, border radius, shadows and interactive states.  Features include:

* **Orientation control** – choose between a horizontal bar (default) and a vertical sidebar using the `orientation` prop.
* **Navigation items with icons and labels** – accept an array of items with text, icons and optional nested children for dropdown menus.
* **Active and hover states** – apply tokenised styles to indicate the currently selected page and respond to user hover/focus.
* **Responsive behaviour** – allow the bar to collapse into a hamburger menu or a drawer on smaller screens by exposing a `collapseBreakpoint` prop and toggling classes.
* **Accessibility** – use semantic elements (`<nav>`, `<ul>`, `<li>`, `<a>`) with ARIA attributes to communicate roles, states and current page context.
* **Dark‑mode and reduced‑motion support** – adjust colours and transitions based on user preferences.

## Current State Analysis

The component checklist lists `DynNav` as a **Planned** component with a status of 90 %【480681578444987†L386-L397】.  It has a designated token namespace (`--dyn-nav-*`) and two variants: **horizontal** and **vertical**【480681578444987†L386-L397】.  There is no existing implementation or specification beyond these definitions, so this guide outlines a complete design and implementation plan.

## Implementation Instructions

### 1. File structure

Create a new directory `packages/dyn-ui-react/src/components/DynNav/` with the following files:

```
DynNav.tsx         – React component and internal helper subcomponents
DynNav.types.ts    – TypeScript interfaces and enums
DynNav.module.css  – CSS module defining tokens and classes
DynNav.stories.tsx – Storybook stories demonstrating various layouts
DynNav.test.tsx    – Unit tests using React Testing Library
index.ts           – Barrel file exporting the component and types
```

### 2. Define design tokens

In `DynNav.module.css`, declare CSS variables under the `--dyn-nav-*` prefix with three‑level fallbacks.  Suggested tokens include:

| Token | Purpose | Example fallback |
|------|---------|------------------|
| `--dyn-nav-bg` | Background colour of the nav container | `var(--dyn-color-surface, #ffffff)` |
| `--dyn-nav-color` | Default text/icon colour | `var(--dyn-color-text-primary, #333333)` |
| `--dyn-nav-hover-bg` | Background on hover/focus | `var(--dyn-color-surface-hover, rgba(0,0,0,0.03))` |
| `--dyn-nav-hover-color` | Text colour on hover/focus | `var(--dyn-color-primary, #007acc)` |
| `--dyn-nav-active-bg` | Background for the active item | `var(--dyn-color-surface-active, rgba(0,0,0,0.05))` |
| `--dyn-nav-active-color` | Text colour for the active item | `var(--dyn-color-primary, #007acc)` |
| `--dyn-nav-padding-x` | Horizontal padding for the nav container | `var(--dyn-space-4, 1rem)` |
| `--dyn-nav-padding-y` | Vertical padding for the nav container | `var(--dyn-space-3, 0.75rem)` |
| `--dyn-nav-item-gap` | Gap between items | `var(--dyn-space-3, 0.75rem)` |
| `--dyn-nav-border-radius` | Corner radius for the nav container | `var(--dyn-radius-md, 8px)` |
| `--dyn-nav-height` | Height of the horizontal nav bar | `var(--dyn-size-10, 2.5rem)` |
| `--dyn-nav-shadow` | Box shadow for the nav container | `var(--dyn-shadow-sm, 0 1px 3px rgba(0,0,0,0.1))` |
| `--dyn-nav-divider-color` | Colour of optional dividers between items | `var(--dyn-color-border, #e5e5e5)` |

Add dark‑mode overrides to adjust backgrounds and text colours, and a reduced motion section to tone down or remove animations.

### 3. Design the API and types

Define the following types in `DynNav.types.ts`:

```ts
export type DynNavOrientation = 'horizontal' | 'vertical';

export interface DynNavItem {
  /** Unique identifier for the item */
  id: string;
  /** Text label displayed in the navigation */
  label: string;
  /** Optional icon component to render before the label */
  icon?: React.ReactNode;
  /** URL or path to navigate to when clicked */
  href?: string;
  /** Whether this item is currently active */
  active?: boolean;
  /** Whether this item is disabled */
  disabled?: boolean;
  /** Nested child items to create drop‑down or sub‑menus */
  children?: DynNavItem[];
}

export interface DynNavProps {
  items: DynNavItem[];
  orientation?: DynNavOrientation;
  /** Breakpoint (in px) below which the nav collapses into a drawer or hamburger */
  collapseBreakpoint?: number;
  /** Callback fired when an item is selected */
  onItemSelect?: (item: DynNavItem) => void;
  /** Custom renderer for nav items */
  renderItem?: (item: DynNavItem) => React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
```

### 4. Implement the React component

In `DynNav.tsx`, build a functional component using `forwardRef<HTMLElement, DynNavProps>`.  Key implementation points:

1. **Orientation** – Use `orientation` to apply `styles.horizontal` or `styles.vertical` to the `<nav>` element.  For horizontal orientation, render items in a row using Flexbox; for vertical orientation, stack them in a column.
2. **Responsive collapse** – If `collapseBreakpoint` is defined, use a `useWindowWidth` or matchMedia hook to detect viewport size and toggle between a collapsed/drawer state and the regular state.  In collapsed mode, render a hamburger button that toggles a side drawer containing the vertical nav.
3. **Rendering items** – Map over `items` to render `<li>` elements inside a `<ul>`.  For each item, if `renderItem` is provided, call it; otherwise, render a `<a>` element with `href`, `onClick` and `aria-current` attributes.  Apply classes for active and disabled states.  For nested `children`, recursively render a sub‑list with appropriate indentation and ARIA attributes such as `aria-haspopup="menu"`.
4. **Accessibility** – Wrap the list in a `<nav role="navigation">` element.  Use `aria-label` to describe the navigation region (pass this via props if needed).  For interactive elements, add `aria-current="page"` on the active link, `aria-disabled` on disabled items and `aria-expanded` on items with dropdowns.  Keyboard support should allow tabbing through items and, when collapsed, toggling the drawer with Enter/Space.
5. **Styling** – Apply tokens for background, padding, gap and colours via CSS variables.  Use classes `styles.item`, `styles.link`, `styles.active`, `styles.disabled` and `styles.children` for nested lists.  Provide transitions for hover and active states.

### 5. Implement the CSS module

Define the base styles in `DynNav.module.css`:

```css
.nav {
  background-color: var(--dyn-nav-bg);
  color: var(--dyn-nav-color);
  padding: var(--dyn-nav-padding-y) var(--dyn-nav-padding-x);
  border-radius: var(--dyn-nav-border-radius);
  box-shadow: var(--dyn-nav-shadow);
}
.horizontal ul {
  display: flex;
  gap: var(--dyn-nav-item-gap);
  list-style: none;
  margin: 0;
  padding: 0;
}
.vertical ul {
  display: flex;
  flex-direction: column;
  gap: var(--dyn-nav-item-gap);
  list-style: none;
  margin: 0;
  padding: 0;
}
.item {
  position: relative;
}
.link {
  display: flex;
  align-items: center;
  gap: var(--dyn-space-2, 0.5rem);
  padding: var(--dyn-space-2, 0.5rem) var(--dyn-space-3, 0.75rem);
  border-radius: var(--dyn-nav-border-radius);
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}
.link:hover,
.link:focus-visible {
  background-color: var(--dyn-nav-hover-bg);
  color: var(--dyn-nav-hover-color);
}
.active {
  background-color: var(--dyn-nav-active-bg);
  color: var(--dyn-nav-active-color);
}
.disabled {
  opacity: 0.5;
  cursor: default;
  pointer-events: none;
}
.children {
  padding-left: var(--dyn-nav-padding-left, 1rem);
  border-left: 1px solid var(--dyn-nav-divider-color);
  margin-top: var(--dyn-nav-item-gap);
}
```

Add dark‑mode overrides to invert colours and adjust hover/active backgrounds.  Include a high‑contrast mode section with thicker outlines.  For mobile collapse, define classes for the drawer (position fixed, width, animation) and hamburger button.

### 6. Storybook stories

Create stories in `DynNav.stories.tsx` to demonstrate:

1. **Horizontal navigation** – Render a simple top bar with a few items and an active state.
2. **Vertical navigation** – Show a sidebar with icons and labels.
3. **Nested menus** – Include items with children to demonstrate sub‑navigation.
4. **Responsive collapse** – Configure `collapseBreakpoint` and display the nav collapsing into a drawer with a hamburger toggle.
5. **Custom item renderer** – Provide a story using the `renderItem` prop to render complex items (e.g. with badges or avatars).
6. **Dark mode** – Use Storybook’s dark theme to verify token overrides.

Document each prop and provide knobs/controls for orientation and collapse breakpoint.

### 7. Unit tests

Write tests with React Testing Library to verify:

* Proper orientation class (`horizontal` or `vertical`) is applied.
* Items render correctly and call `onItemSelect` when clicked.
* Active and disabled states apply appropriate classes and ARIA attributes.
* Nested items are rendered inside a sub‑list with correct indentation and roles.
* The drawer toggles open/closed when the collapse breakpoint is reached and the hamburger button is clicked.
* Dark‑mode classes apply when the theme is switched.

Aim for at least 75–80 % coverage.

### 8. Export the component

In `index.ts`, export the component and its types:

```ts
export { default as DynNav } from './DynNav';
export type { DynNavProps, DynNavItem, DynNavOrientation } from './DynNav.types';
```

## Validation Checklist

- [ ] All tokens starting with `--dyn-nav-*` are defined with three‑level fallbacks.
- [ ] Orientation props render the correct layout and apply appropriate styles.
- [ ] Navigation items support icons, labels, active/disabled states and nesting.
- [ ] Responsive collapse works at the specified breakpoint with accessible toggle controls.
- [ ] Dark mode, high contrast and reduced motion preferences are supported.
- [ ] Storybook stories cover horizontal, vertical, nested, responsive and dark‑mode examples.
- [ ] Unit tests cover rendering, interaction and accessibility behaviours.
- [ ] Component and type definitions are exported from `index.ts`.
