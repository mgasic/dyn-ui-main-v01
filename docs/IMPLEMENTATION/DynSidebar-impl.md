# DynSidebar – Implementation Guide

## Component Overview

`DynSidebar` is a navigation container that appears along the left edge of the viewport.  It provides a persistent area for navigation links, optional header and footer sections, and a collapse/expand feature to save space.  It also adapts to mobile devices by sliding in as a drawer.  Key features include:

* **Collapsible width** – expands to a full width (e.g. 256 px) or collapses to a narrow bar (e.g. 64 px) that shows icons only【293635245565880†L45-L48】【293635245565880†L91-L94】.
* **Navigation items** – supports a list of items with icons and labels; highlights the active item and applies hover/focus states【293635245565880†L55-L59】.
* **Header, content and footer sections** – allows custom content at the top and bottom of the sidebar and a scrollable content area【293635245565880†L51-L58】.
* **Dark mode and responsive design** – CSS already provides full dark‑mode support, mobile drawer behaviour and reduced‑motion/high‑contrast modes【293635245565880†L40-L61】.
* **Accessibility** – focus management, touch‑friendly hit targets (40 px+)【293635245565880†L47-L49】; ARIA roles to indicate navigation region.

## Current State Analysis

According to the audit summary, `DynSidebar` has an **excellent CSS foundation** but **no React implementation**【293635245565880†L23-L29】.  Only `DynSidebar.module.css` exists; the component file, types, tests and stories are missing【293635245565880†L23-L29】.  The CSS defines tokens for colours, borders, text and states with three‑level fallbacks and full dark‑mode support【293635245565880†L33-L41】【293635245565880†L43-L51】.  The CSS covers collapsed and expanded widths, header/content/footer layout, item hover and active states, mobile slide‑in and reduced motion【293635245565880†L45-L61】.  There is no JavaScript logic for managing collapse/expand state, handling navigation events or rendering items.  There are no tests or documentation.  The overall audit score is 38 % because the implementation is incomplete【293635245565880†L2-L3】.

## Implementation Instructions

Your primary goal is to **implement the React component and associated files**, leveraging the existing CSS and tokens.

### 1. Define Design Tokens

The CSS already provides many tokens under the `--dyn-sidebar-*` namespace.  Review `DynSidebar.module.css` to identify these tokens and ensure they cover:

* `--dyn-sidebar-width` – expanded width (default 256 px).
* `--dyn-sidebar-width-collapsed` – collapsed width (default 64 px).
* `--dyn-sidebar-bg` – background colour.
* `--dyn-sidebar-border-color` – border colour.
* `--dyn-sidebar-item-height` – height of each navigation item (default 40 px).
* `--dyn-sidebar-item-gap` – vertical spacing between items.
* `--dyn-sidebar-item-padding-x` – horizontal padding for items.
* `--dyn-sidebar-item-color` – text colour for inactive items.
* `--dyn-sidebar-item-hover-bg` – background when hovering.
* `--dyn-sidebar-item-active-bg` – background for active item.
* `--dyn-sidebar-collapse-button-size` – size of the collapse/expand toggle.
* `--dyn-sidebar-transition-duration` – duration for collapse/expand transitions.

Ensure each token has a three‑level fallback.  If any tokens are missing (e.g. border radius, shadow), define them.  Dark‑mode variants are already implemented; verify and adjust if necessary【293635245565880†L40-L61】.

### 2. File Structure

Create a new `DynSidebar/` folder with these files:

| File | Purpose |
| --- | --- |
| `DynSidebar.tsx` | React component implementing collapse/expand logic, navigation rendering and responsive drawer. |
| `DynSidebar.types.ts` | TypeScript interfaces for props and navigation items. |
| `DynSidebar.module.css` | Existing CSS module with tokens and styling (verify and refine if needed). |
| `DynSidebar.stories.tsx` | Storybook stories demonstrating default, collapsed and mobile drawer modes. |
| `DynSidebar.test.tsx` | Jest tests covering interaction, state, accessibility and responsiveness. |
| `index.ts` | Re‑exports component and types. |

### 3. API Design

Define the props interface in `DynSidebar.types.ts`:

```ts
export interface DynSidebarItem {
  /** Unique key for the item. */
  key: string;
  /** Label displayed for the item. */
  label: React.ReactNode;
  /** Icon component displayed to the left of the label. */
  icon?: React.ReactNode;
  /** Callback when the item is clicked. */
  onClick?: (key: string) => void;
  /** If true, the item is disabled. */
  disabled?: boolean;
  /** If true, the item is currently active. */
  active?: boolean;
  /** Optional nested items (for hierarchical navigation). */
  children?: DynSidebarItem[];
}

export interface DynSidebarProps {
  /** List of navigation items to render. */
  items: DynSidebarItem[];
  /** Controlled open/collapsed state (true = expanded). */
  open?: boolean;
  /** Default open state (uncontrolled). */
  defaultOpen?: boolean;
  /** Callback when the open state changes (collapse/expand). */
  onToggle?: (open: boolean) => void;
  /** Custom content for the header area. */
  header?: React.ReactNode;
  /** Custom content for the footer area. */
  footer?: React.ReactNode;
  /** Width when expanded; overrides token. */
  expandedWidth?: number | string;
  /** Width when collapsed; overrides token. */
  collapsedWidth?: number | string;
  /** Whether the sidebar should slide in as a drawer on mobile. */
  responsive?: boolean;
  /** CSS class name for the root element. */
  className?: string;
  /** Inline styles. */
  style?: React.CSSProperties;
}
```

### 4. React Implementation (`DynSidebar.tsx`)

* Use `forwardRef<HTMLDivElement, DynSidebarProps>` to expose a ref to the root element.
* Manage the open/collapsed state: use the controlled `open` prop if provided, otherwise use internal state initialised from `defaultOpen`.  Provide a `toggle` function that toggles the open state and calls `onToggle`.
* Compute dynamic classes based on state: `.sidebar`, `.sidebar--collapsed`, `.sidebar--drawer`.  Use CSS variables or inline styles to apply `expandedWidth`/`collapsedWidth` if provided.
* Render header, navigation items and footer.  For navigation items:
  * Wrap each item in a `<button>` or `<a>` element; apply classes `.sidebarItem`, `.sidebarItem--active`, `.sidebarItem--disabled`.
  * When collapsed, show only the icon; optionally show tooltip with the label on hover (using `aria-label`).
  * When nested children exist, render a submenu inside the content area; support indentation via tokens.
* Render a collapse/expand toggle button at the bottom of the sidebar or near the header.  This button uses the `--dyn-sidebar-collapse-button-size` token for width/height and toggles the open state.
* Implement responsive drawer: if `responsive` is true and the viewport width is below a threshold (e.g. 768 px), render the sidebar as a slide‑in drawer.  Use a `useMediaQuery` hook or CSS media queries to apply `.sidebar--drawer`.  Provide an overlay that closes the drawer when clicked or when Escape is pressed.
* Accessibility:
  * Use `nav` element with `aria-label="Sidebar Navigation"` for the container.
  * Mark the active item with `aria-current="page"`.
  * Use `tabIndex={0}` on collapsed icons to make them focusable.  Add `aria-expanded` to indicate whether nested items or the sidebar itself are expanded.
  * Manage focus order: when sidebar collapses, preserve the active/focused item; when expanding, focus should remain on the toggle or active item.

### 5. CSS Enhancements

* Review `DynSidebar.module.css` to ensure tokens are correctly namespaced (`--dyn-sidebar-*`) and have three‑level fallback.  Add missing tokens such as `--dyn-sidebar-transition-duration` if collapse transitions are hardcoded.  Add high‑contrast overrides if needed.
* For mobile drawer, ensure transitions are smooth and respect `prefers-reduced-motion`.  Provide classes for overlay and ensure it uses tokens for colour and opacity.
* Document the tokens within the CSS file so developers know how to override widths, colours and item spacing.

### 6. Storybook Stories

Create comprehensive stories:

1. **Expanded** – default state with header, items and footer.
2. **Collapsed** – collapsed state showing only icons; includes tooltips for labels.
3. **Controlled** – sidebar controlled by parent with a toggle button outside the component.
4. **Responsive drawer** – show behaviour on mobile: collapsed by default, slide‑in drawer when toggled.
5. **Custom widths** – override `expandedWidth` and `collapsedWidth` via props or CSS variables.
6. **Nested navigation** – items with nested children; show expand/collapse of submenus.
7. **Dark mode** – demonstrate dark theme and high contrast.

### 7. Unit Tests

Write Jest tests covering:

* Controlled and uncontrolled open state: toggling collapses/expands as expected.
* Navigation item click calls `onClick` with correct key; disabled items do not trigger callbacks.
* Active item is highlighted and has `aria-current="page"`.
* Collapse/expand toggle button toggles state and calls `onToggle`.
* Responsive drawer: when viewport width is below threshold, sidebar appears as a drawer; overlay closes it on click; Escape key closes drawer.
* Accessibility: ensures appropriate roles and ARIA attributes are set; tab order is logical; collapsed icons have tooltips or `aria-label`.
* Snapshot tests for dark mode and collapsed/expanded states.

### 8. Export

In `index.ts`, export the component and types:

```ts
export { DynSidebar } from './DynSidebar';
export type { DynSidebarProps, DynSidebarItem } from './DynSidebar.types';
```

## Validation Checklist

- [ ] **Token compliance** – All visual values for widths, colours, spacing, item sizes and transitions use `--dyn-sidebar-*` tokens with three‑level fallback.
- [ ] **Implementation** – React component (`DynSidebar.tsx`) is created with collapse/expand state, item rendering, responsive drawer and nested items.
- [ ] **Accessibility** – Uses `nav` element and ARIA roles/attributes; supports keyboard navigation; provides tooltips for collapsed icons; meets WCAG AA; dark and high contrast modes supported.
- [ ] **Testing** – Tests cover collapse/expand logic, item interactions, responsive drawer, accessibility and dark mode; 80 %+ coverage achieved.
- [ ] **Documentation** – Storybook stories cover expanded, collapsed, responsive and nested usage; tokens documented for customisation; API documented in README or JSDoc.
- [ ] **Exports** – Component and types are exported from `index.ts`.