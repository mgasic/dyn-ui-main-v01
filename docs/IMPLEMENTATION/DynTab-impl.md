# DynTab – Implementation Guide

## Component Overview

`DynTab` provides a tabbable interface for organising related content into separate panels.  It displays a horizontal or vertical row of tab headers with an active indicator and associates each tab with a content panel.  Users can click or use the keyboard (left/right or up/down arrows) to navigate between tabs.  The component supports icons, disabled tabs, lazy mounting of panels, scrollable headers on overflow, responsive orientation (vertical on mobile) and dark mode styling.  It adheres to WAI‑ARIA guidelines for tabbed interfaces.  Typical use cases include settings pages, dashboard sections, or multi‑step forms.

## Current State Analysis

The P2 Nice‑to‑Have specification lists `DynTab` as a missing component (3 hours, Phase 2) with features including a tab header with active indicator, content panels, keyboard navigation, ARIA labels and roles, scroll on overflow, icon support, disabled tab states, lazy‑load option, dark mode and responsive vertical orientation【547186295044551†L29-L40】.  The document defines tokens such as `--dyn-tab-bg`, `--dyn-tab-color`, `--dyn-tab-active-color`, `--dyn-tab-padding-x`, `--dyn-tab-padding-y`, `--dyn-tab-hover-bg`, and `--dyn-tab-transition`【547186295044551†L41-L52】.  No implementation exists in the repository.  This guide provides a full plan for building the component.

## Implementation Instructions

### 1. File Structure

Create `packages/dyn-ui-react/src/components/DynTab/` with the following files:

```
DynTab.tsx         – React component containing tab list and panels
DynTab.types.ts    – TypeScript interfaces and enums for props
DynTab.module.css  – CSS module defining tokens and classes
DynTab.stories.tsx – Storybook stories demonstrating features
DynTab.test.tsx    – Unit tests verifying keyboard navigation and ARIA roles
index.ts           – Barrel file exporting component and types
```

### 2. Define Design Tokens

Create the following tokens with three‑level fallback chains:

| Token | Purpose | Example fallback |
|------|---------|------------------|
| `--dyn-tab-bg` | Background colour of tab header area | `var(--dyn-color-surface, #f9fafb)` |
| `--dyn-tab-color` | Text colour for inactive tabs | `var(--dyn-color-on-surface, #6b7280)` |
| `--dyn-tab-active-color` | Text colour for the active tab | `var(--dyn-color-primary, #3b82f6)` |
| `--dyn-tab-border-bottom` | Border under the tab list | `1px solid var(--dyn-color-border, #e5e7eb)` |
| `--dyn-tab-active-border-color` | Colour of the active indicator | `var(--dyn-color-primary, #3b82f6)` |
| `--dyn-tab-padding-x` | Horizontal padding for each tab | `1rem` |
| `--dyn-tab-padding-y` | Vertical padding for each tab | `0.5rem` |
| `--dyn-tab-font-weight` | Font weight of the tab text | `600` |
| `--dyn-tab-hover-bg` | Background colour on hover | `var(--dyn-color-primary-light, #eff6ff)` |
| `--dyn-tab-transition` | Duration/easing of indicator transitions | `0.2s ease` |
| `--dyn-tab-icon-size` | Size of icons within tabs | `1rem` |
| `--dyn-tab-gap` | Space between icon and label | `0.5rem` |

Include dark‑mode overrides to invert backgrounds, adjust hover colours and active indicator colour.  Provide high‑contrast adjustments using forced-colors media queries.

### 3. API Design (`DynTab.types.ts`)

Define the shape of a single tab and the component props:

```ts
import { ReactNode } from 'react';

export interface DynTabItem {
  /** Unique key for the tab. */
  key: string;
  /** Label text. */
  label: string;
  /** Optional icon to display before the label. */
  icon?: ReactNode;
  /** If true, the tab is disabled. */
  disabled?: boolean;
  /** Content of the tab panel. */
  content: ReactNode;
}

export interface DynTabProps {
  /** Array of tab items. */
  items: DynTabItem[];
  /** The key of the active tab (controlled) */
  activeKey?: string;
  /** Default active tab (uncontrolled) */
  defaultActiveKey?: string;
  /** Callback when the active tab changes. */
  onTabChange?: (key: string) => void;
  /** If true, mount panels only when their tab becomes active. */
  lazy?: boolean;
  /** Orientation: horizontal (default) or vertical. */
  orientation?: 'horizontal' | 'vertical';
  /** Whether the tab list scrolls horizontally on overflow (e.g. mobile). */
  scrollable?: boolean;
  /** Additional class name for the root element. */
  className?: string;
}
```

### 4. React Implementation (`DynTab.tsx`)

1. Use `forwardRef<HTMLDivElement, DynTabProps>` to forward a ref to the root element.
2. Manage controlled vs. uncontrolled state: if `activeKey` is provided, treat the component as controlled; otherwise maintain `internalActiveKey` initialised to `defaultActiveKey` or the first non‑disabled tab.
3. On click or keyboard navigation, update the active key and call `onTabChange` if provided.
4. Render a `<div className={styles.container}>` containing two children: a tab list and tab panels.  The tab list uses a `<div role="tablist">` and each tab is a `<button role="tab">` with `id` and `aria-controls` linking to the panel.  Disabled tabs should have `disabled` attribute and `tabIndex={-1}`.
5. The tab panels container uses `<div role="tabpanel">` for each panel; hidden panels should be removed from the DOM when `lazy` is true or be hidden with `hidden` attribute when not active.
6. Implement keyboard navigation: when the tab list has focus, handle arrow keys (left/right or up/down for vertical orientation) to focus the next or previous enabled tab.  The `Home` and `End` keys move to first and last enabled tabs.  Use `space` and `enter` to activate the focused tab.
7. Apply class names based on the active state: active tabs get an indicator under the label and use `--dyn-tab-active-color`.  Use CSS transitions for the indicator position.
8. When `scrollable` is true, wrap the tab list in a container with `overflow-x: auto` and show scroll indicators (optional).  Ensure focusable elements are scrolled into view when activated.
9. In vertical orientation (mobile), stack the tab list above or to the side of the panels; adjust class names accordingly.

### 5. CSS Module (`DynTab.module.css`)

Define styles for:

* `.container` – root wrapper; sets orientation classes (`vertical` or `horizontal`).
* `.tabList` – flex container for the tab buttons; apply `--dyn-tab-bg` and border.  When `scrollable`, set `overflow-x: auto` and hide scrollbar if desired.
* `.tab` – base styles: `display: flex; align-items: center; padding: var(--dyn-tab-padding-y) var(--dyn-tab-padding-x); font-weight: var(--dyn-tab-font-weight); color: var(--dyn-tab-color); background: transparent; border: none; cursor: pointer; transition: color var(--dyn-tab-transition), background var(--dyn-tab-transition);`  On hover or focus, set background to `var(--dyn-tab-hover-bg)`.  When active, change colour to `var(--dyn-tab-active-color)`.
* `.tabDisabled` – reduce opacity and set `cursor: not-allowed`.
* `.indicator` – active underline: absolute positioned element at bottom of the tab; width equal to the tab width; height 2px; background `--dyn-tab-active-border-color`; transition left/width using `--dyn-tab-transition`.
* `.tabIcon` – sets `width` and `height` using `--dyn-tab-icon-size`; adds `margin-right: var(--dyn-tab-gap)`.
* `.panels` – container for tab panels; when vertical orientation, optionally set margin or border.
* `.panel` – panel styles: `padding: 1rem;`  Only active panel is displayed; others are hidden or unmounted if `lazy`.
* Dark‑mode overrides – invert backgrounds and colours; adjust indicator colour.  Add `@media (forced-colors: active)` for high contrast.

### 6. Storybook Stories (`DynTab.stories.tsx`)

Provide examples demonstrating:

* Basic usage with two or more tabs.
* Tabs with icons and disabled states.
* Lazy loaded panels.
* Scrollable tab list with many tabs and keyboard navigation.
* Vertical orientation on mobile (use viewport add‑on in Storybook).
* Dark mode and high‑contrast themes.

### 7. Unit Tests (`DynTab.test.tsx`)

Write tests covering:

* Controlled and uncontrolled active tab selection.
* Click and keyboard navigation (arrow keys, Home/End) across tabs; disabled tabs are skipped.
* ARIA attributes: `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, `aria-controls` and `aria-labelledby`.
* Indicator movement and proper classes when active.
* Lazy loading of panels.
* Scrollable behaviour ensures active tab is scrolled into view.

### 8. Exports (`index.ts`)

Export the component and types:

```ts
export { DynTab } from './DynTab';
export type { DynTabProps, DynTabItem } from './DynTab.types';
```

## Validation Checklist

- [ ] All `--dyn-tab-*` tokens defined with three‑level fallbacks and dark‑mode overrides.
- [ ] Tab header, panels, keyboard navigation and ARIA roles implemented per specification.
- [ ] Support for icons, disabled tabs, lazy content and responsive orientation.
- [ ] Scrollable tab list works and scrolls active tab into view.
- [ ] Design tokens applied for padding, colours, indicator and transitions.
- [ ] Storybook stories cover base, icon, disabled, lazy and responsive scenarios with dark mode.
- [ ] Unit tests verify controlled/uncontrolled behaviour, accessibility and keyboard navigation.
- [ ] Component and types exported correctly.
