# DynList – Implementation Guide

## Component Overview

`DynList` is a lightweight list component that provides consistent spacing, typography and marker styling for ordered and unordered lists across your application.  It supports three variants – **ordered**, **unordered** and **custom** – allowing you to render numbered lists, bulleted lists or lists with completely custom markers.  The component is designed to work with plain text items as well as complex JSX content and to support nested lists out of the box.  Key features include:

* **Ordered, unordered and custom markers** – choose the semantic element (`<ol>` or `<ul>`) or supply your own marker renderer for custom designs.
* **Tokenised spacing and typography** – all margins, padding, font sizes and bullet sizes are controlled via design tokens so they can be themed and scaled consistently.
* **Nested lists** – easily nest additional `DynList` components inside list items with automatic indentation and marker alignment.
* **Accessible semantics** – uses appropriate HTML elements (`<ol>`, `<ul>`, `<li>`) and ARIA roles to communicate list structure to assistive technologies.
* **Dark mode and reduced‑motion support** – colours and animations adapt to dark themes and user motion preferences.

This component aims to remove the guesswork when styling lists by centralising all styling into a single, reusable component.

## Current State Analysis

According to the component checklist, `DynList` is currently a **Planned** component with a status of 85 % and has not yet been implemented in the repository【480681578444987†L366-L379】.  It is assigned its own token namespace (`--dyn-list-*`) and supports three variants: **ordered**, **unordered** and **custom**【480681578444987†L366-L379】.  No React files, types, CSS modules, tests or stories exist at present.  Therefore, this guide lays out the full design and implementation plan for the component.

## Implementation Instructions

### 1. File structure

Create a new folder `packages/dyn-ui-react/src/components/DynList/` with the following files:

```
DynList.tsx           – React component implementation
DynList.types.ts      – TypeScript interfaces and type aliases
DynList.module.css    – CSS module containing token definitions and classes
DynList.stories.tsx   – Storybook stories showcasing variants and features
DynList.test.tsx      – Jest/Testing Library tests
index.ts              – Exports the component and types
```

### 2. Define design tokens

Within `DynList.module.css`, define a set of CSS custom properties using the `--dyn-list-*` prefix.  Each token should implement a three‑level fallback pattern: component‑level → semantic token (if available) → hardcoded default.  Suggested tokens include:

| Token | Purpose | Example fallback |
|------|---------|------------------|
| `--dyn-list-padding-left` | Left padding for list container and nested lists | `var(--dyn-space-4, 1rem)` |
| `--dyn-list-item-margin-y` | Vertical margin between list items | `var(--dyn-space-2, 0.5rem)` |
| `--dyn-list-bullet-size` | Size of the bullet or custom marker | `var(--dyn-size-3, 0.75rem)` |
| `--dyn-list-bullet-color` | Colour of bullet markers for unordered lists | `var(--dyn-color-primary, #007acc)` |
| `--dyn-list-number-color` | Colour of numbers for ordered lists | `var(--dyn-color-primary, #007acc)` |
| `--dyn-list-font-size` | Font size for list items | `var(--dyn-font-size-base, 1rem)` |
| `--dyn-list-font-weight` | Font weight for list items | `var(--dyn-font-weight-normal, 400)` |
| `--dyn-list-item-border-radius` | Corner radius for list items (useful if items have backgrounds) | `var(--dyn-radius-none, 0px)` |
| `--dyn-list-item-hover-bg` | Background colour on list item hover | `var(--dyn-color-surface-hover, rgba(0,0,0,0.03))` |
| `--dyn-list-item-hover-color` | Text colour on hover | `var(--dyn-color-primary, #007acc)` |

Add dark‑mode overrides using `@media (prefers-color-scheme: dark)` to adjust bullet and number colours, hover backgrounds and text colours.  Include a reduced motion section to remove any hover animations for users with motion sensitivity.

### 3. Implement the React component

In `DynList.tsx`, implement a functional component using `forwardRef<HTMLElement, DynListProps>`.  Key aspects:

1. **Props definition** – Define the following props in `DynList.types.ts`:
   ```ts
   export type DynListVariant = 'ordered' | 'unordered' | 'custom';

   export interface DynListProps {
     variant?: DynListVariant;        // Determines whether to render an <ol>, <ul>, or a custom list
     items?: Array<React.ReactNode>;  // Optional array of list item contents; alternatively accept children
     marker?: React.ReactNode | ((index: number) => React.ReactNode); // Custom marker renderer for the 'custom' variant
     spacing?: number;                // Custom vertical spacing; maps to --dyn-list-item-margin-y
     className?: string;
     style?: React.CSSProperties;
     children?: React.ReactNode;      // For manual composition of <li> elements
   }
   ```

2. **Component logic** – Choose the underlying element based on `variant`.  For `ordered`, render an `<ol>`; for `unordered` and `custom`, render a `<ul>`.  When using the `custom` variant and a `marker` prop, hide the default list marker via `list-style: none` and render a `<span className={styles.marker}>` before each list item.

3. **Rendering list items** – If `items` is provided, map over the array to create `<li>` elements.  Otherwise, render `children` directly.  Apply the `styles.item` class to each `<li>` and, for nested lists, apply an additional `styles.nested` class to increase indentation via `padding-left`.

4. **Custom marker renderer** – When `variant="custom"` and `marker` is defined, call `marker(index)` to render the marker or render the provided React node.  Use a wrapper `<span>` to control spacing and size via tokens.

5. **Accessibility** – Use semantic elements by default.  When implementing a custom list that does not use `<ul>` or `<ol>`, set `role="list"` on the root and `role="listitem"` on each item.  Support keyboard navigation (e.g. ArrowUp/ArrowDown could be wired for interactive lists) if the component becomes interactive.

6. **Styling** – Apply classes for the root element (`styles.ordered`, `styles.unordered` or `styles.custom`) and items.  Use inline style overrides for `spacing` when provided (e.g. `style={{ '--dyn-list-item-margin-y': `${spacing}px` }}` via CSS variables).

### 4. Create the CSS module

Define base classes in `DynList.module.css` using the tokens above:

```css
.ordered {
  padding-left: var(--dyn-list-padding-left);
  list-style-type: decimal;
  color: var(--dyn-list-number-color);
  font-size: var(--dyn-list-font-size);
  font-weight: var(--dyn-list-font-weight);
}
.unordered {
  padding-left: var(--dyn-list-padding-left);
  list-style-type: disc;
  color: var(--dyn-list-bullet-color);
  font-size: var(--dyn-list-font-size);
  font-weight: var(--dyn-list-font-weight);
}
.custom {
  padding-left: var(--dyn-list-padding-left);
  list-style: none;
}
.item {
  margin-block: var(--dyn-list-item-margin-y);
  border-radius: var(--dyn-list-item-border-radius);
}
.item:hover {
  background-color: var(--dyn-list-item-hover-bg);
  color: var(--dyn-list-item-hover-color);
}
.marker {
  display: inline-block;
  width: var(--dyn-list-bullet-size);
  height: var(--dyn-list-bullet-size);
  margin-right: var(--dyn-space-2, 0.5rem);
  color: var(--dyn-list-bullet-color);
}
.nested {
  padding-left: calc(var(--dyn-list-padding-left) * 1.5);
}
```

Add dark‑mode overrides for colours and hover backgrounds.  Provide a high‑contrast mode section to adjust colours appropriately.  Include a `@media (prefers-reduced-motion: reduce)` block to disable hover transitions if you implement any animations.

### 5. Develop Storybook stories

In `DynList.stories.tsx`, create stories that illustrate:

1. **Unordered list** – Basic usage with an array of strings.
2. **Ordered list** – Show numbered items with default styling.
3. **Custom markers** – Demonstrate passing an icon component or a function that returns a custom element (e.g. coloured dots or avatars).
4. **Nested lists** – Render lists within list items to show indentation behaviour.
5. **Dark mode** – Use Storybook’s dark theme to showcase dark‑mode token overrides.

Document each prop with controls so developers can adjust variants, spacing and custom markers in the UI.

### 6. Write unit tests

Use React Testing Library to verify:

* The correct underlying element (`ol` or `ul`) is rendered based on `variant`.
* Custom markers are inserted for the custom variant and default markers are hidden.
* Items passed via `items` and `children` render correctly.
* Nested lists inherit increased padding and maintain semantic structure.
* CSS classes toggle correctly for ordered/unordered/custom variants.
* Dark mode classes apply when the theme changes (if using a theme context).

Aim for at least 80 % test coverage.

### 7. Export the component

Create an `index.ts` file that re‑exports `DynList` and its types:

```ts
export { default as DynList } from './DynList';
export type { DynListProps, DynListVariant } from './DynList.types';
```

## Validation Checklist

- [ ] All design tokens are defined with `--dyn-list-*` prefix and use 3‑level fallback.
- [ ] Variants **ordered**, **unordered** and **custom** are implemented and tested.
- [ ] Nested lists render correctly with increased indentation.
- [ ] Dark mode, high contrast and reduced motion preferences are supported.
- [ ] Storybook stories demonstrate basic, ordered, custom marker and nested usage, including dark‑mode examples.
- [ ] Unit tests cover the API surface (80 %+ coverage).
- [ ] Component and type definitions are exported from `index.ts`.
