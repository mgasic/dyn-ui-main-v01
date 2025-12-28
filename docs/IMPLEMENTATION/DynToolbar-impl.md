# DynToolbar – Implementation Guide

## Component Overview
DynToolbar is a flexible horizontal or vertical bar used to group a set of actions such as buttons, dropdowns, search fields or custom controls.  It acts as the top‑level navigation or secondary command bar in many layouts.  The toolbar should support grouping of items, separators, overflow handling and optional search.  Variants for size (small, medium, large) and orientation (horizontal/vertical) allow it to adapt to different layouts.  Good accessibility is critical: the component must expose a semantic role of `toolbar` and provide correct ARIA labels for items and groups.

## Current State Analysis
This component is marked as **Existing** in the inventory with a medium score.  The audit highlights several critical gaps.  The CSS uses a generic `.container` class instead of a component‑scoped name and does not define `--dyn-toolbar-*` tokens.  Many styles are hard‑coded, variants are incomplete and the three‑level fallback pattern is missing【720249764602203†L51-L70】.  Required tokens for separators, items, dropdown triggers and search input are absent【720249764602203†L71-L84】.  There is minimal JSDoc, the API is under‑documented and test coverage is low.  Accessibility is rudimentary: there is no `role="toolbar"` on the root element and no keyboard navigation.  Optional improvements suggested by the audit include implementing a compound component API (e.g., `<Toolbar.Item>` and `<Toolbar.Separator>`) and adding keyboard shortcuts for focusing the search field.

## Implementation Instructions
1. **Define tokens and variants** – Introduce a full set of `--dyn-toolbar-*` tokens for background colour, text colour, height, horizontal and vertical padding, gap between items, border colour, separator colour/width, dropdown z‑index, search field styles and focus ring.  Each token should provide a three‑level fallback: component value → global `--dyn-ui-<category>` value → primitive (e.g., system‑colour).  Add dark‑mode tokens by scoping under `.dark .dyn-toolbar` and high‑contrast/responsive fallbacks.  Recommended tokens include:

   - `--dyn-toolbar-bg` / `--dyn-toolbar-color`  
   - `--dyn-toolbar-padding-x` / `--dyn-toolbar-padding-y`  
   - `--dyn-toolbar-gap` (spacing between items)  
   - `--dyn-toolbar-border-color` / `--dyn-toolbar-border-width`  
   - `--dyn-toolbar-separator-color` / `--dyn-toolbar-separator-size`  
   - `--dyn-toolbar-item-hover-bg` / `--dyn-toolbar-item-focus-ring`  
   - `--dyn-toolbar-z-index` (for dropdown/overflow panels)  
   - Size variants: `--dyn-toolbar-height-sm`, `--dyn-toolbar-height-md`, `--dyn-toolbar-height-lg`

2. **Refactor the CSS module** – Rename the root class from `.container` to `.dyn-toolbar` and adopt a BEM style naming convention for sub‑elements: e.g., `.dyn-toolbar__item`, `.dyn-toolbar__separator`, `.dyn-toolbar__group`, `.dyn-toolbar__search`.  Replace all hard‑coded values with the tokens defined above.  Provide modifier classes for size (`.sizeSmall`, `.sizeLarge`), orientation (`.vertical`) and overflow states.  Add dark‑mode and high‑contrast sections and ensure all tokens follow the three‑level fallback pattern【720249764602203†L51-L70】.  Implement responsive behavior: collapse items into an overflow menu when the width is constrained, and expose an `overflowToggleLabel` for screen readers.

3. **Enhance the React component** – Use `forwardRef` and define a `DynToolbarProps` interface with properties such as `orientation` (`'horizontal' | 'vertical'`), `size` (`'small' | 'medium' | 'large'`), `items` (array of toolbar item descriptors), `search` (optional search input props), and `overflowBehaviour` (`'collapse' | 'scroll' | 'wrap'`).  Provide compound components (`Toolbar.Item`, `Toolbar.Separator`, `Toolbar.Group`) to allow declarative composition.  Ensure the root element has `role="toolbar"` and that separators use `role="separator"`.  Support keyboard navigation (arrow keys to move between items, `Tab` to move out of the toolbar) and allow custom key shortcuts to focus the search input【720249764602203†L71-L84】.

4. **Documentation and tests** – Write JSDoc comments for all public interfaces and add a README section describing supported props, variants and tokens.  Expand the test suite to cover orientation, size variants, separators, overflow behavior, dark mode and keyboard navigation.  Add Storybook stories demonstrating horizontal and vertical toolbars, toolbars with search, overflow menus and custom items.  Ensure that the tests verify correct token application and ARIA roles.

5. **Migration and versioning** – Update the exports in `index.ts` and ensure the component remains backward compatible.  Provide a migration note in the README describing how existing consumers should update class names and props.

## Validation Checklist

Use this checklist when finalising the component:

- [ ] All design tokens (`--dyn-toolbar-*`) are defined with three‑level fallbacks and dark‑mode/high‑contrast overrides.
- [ ] CSS classes follow the BEM naming convention and replace the generic `.container` class【720249764602203†L51-L70】.
- [ ] Size, orientation and overflow variants are implemented and documented.
- [ ] The root element has `role="toolbar"` and separators use `role="separator"`; keyboard navigation and search focus shortcuts work.
- [ ] Unit tests cover orientation, size, separators, overflow, dark mode and accessibility behaviours.
- [ ] Storybook stories demonstrate all variants and the migration guidance is documented.
- [ ] Type definitions and exports are complete and JSDoc is included.
