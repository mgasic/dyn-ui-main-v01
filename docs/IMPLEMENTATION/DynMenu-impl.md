# DynMenu – Implementation Guide

## Component Overview
DynMenu is a contextual dropdown or popup menu used to display a list of actions or navigation options.  It can be attached to a trigger element (e.g., button, icon) and supports features such as grouping, icons, separators, disabled items, keyboard navigation and search.  Variants include different sizes or densities, light or dark themes and vertical orientation.  Accessibility is essential: the menu and its items must use proper ARIA roles (`menu`, `menuitem`) and manage focus correctly.

## Current State Analysis
DynMenu exists but is not production‑ready.  The audit reveals critical mismatches between the TypeScript interfaces and the actual implementation: many properties defined on `MenuItem` are unused or unimplemented, and the `onAction` callback type is misaligned【883821753372467†L45-L103】.  CSS uses some `--dyn-menu-*` variables but several values (outline offset, z‑index, minimum width, dark‑mode colours) remain hard‑coded【883821753372467†L139-L160】.  Tests cover basic selection but omit vertical orientation, keyboard navigation, ARIA attributes and dark‑mode behaviour.  Documentation is sparse.

## Implementation Instructions
1. **Rationalise the API and types** – Redefine the `MenuItem` interface to include only supported properties: `id: string`, `label: ReactNode`, `icon?: ReactNode`, `href?: string`, `disabled?: boolean`, `danger?: boolean`, `shortcut?: string`.  Remove unused fields or implement them if they are part of the design specification.  Define `DynMenuProps` with `items: MenuItem[]`, `trigger: ReactElement`, `onAction: (item: MenuItem) => void`, `placement?: 'bottom' | 'top' | 'left' | 'right'`, `align?: 'start' | 'center' | 'end'`, `open?: boolean`, `onOpenChange?: (open: boolean) => void`, `searchable?: boolean`, `onSearch?: (query: string) => void`, `size?: 'small' | 'medium' | 'large'`, `dense?: boolean`, `className?`.  Export these types from `index.ts` and align the implementation accordingly【883821753372467†L45-L103】.

2. **Tokenize CSS values** – Create a comprehensive set of `--dyn-menu-*` tokens to replace all hard‑coded CSS values.  Include variables for background colour, text colour, border colour, border radius, shadow, z‑index, min‑width, padding, gap between items, hover and active states, focus outline and scroll container.  For example:

   - `--dyn-menu-bg` / `--dyn-menu-color`  
   - `--dyn-menu-border-color` / `--dyn-menu-border-radius` / `--dyn-menu-shadow`  
   - `--dyn-menu-item-hover-bg` / `--dyn-menu-item-active-bg` / `--dyn-menu-item-disabled-color`  
   - `--dyn-menu-z-index`  
   - `--dyn-menu-min-width` / `--dyn-menu-padding-x` / `--dyn-menu-padding-y`  
   - Size tokens for small, medium and large item heights.  

   Provide three‑level fallbacks and dark‑mode variants.  Replace the outline offset, z‑index and other hard‑coded values noted in the audit【883821753372467†L139-L160】.

3. **Refactor the CSS module** – Use `.dyn-menu` as the root class and BEM sub‑classes `.dyn-menu__list`, `.dyn-menu__item`, `.dyn-menu__separator`, `.dyn-menu__group`, `.dyn-menu__shortcut`.  Apply tokens to all relevant properties and add modifier classes for size (`.sizeSmall`, `.sizeLarge`), density (`.dense`) and orientation (`.vertical`).  Implement dark‑mode selectors and high‑contrast overrides.  Provide animation for open/close states using CSS transitions respecting reduced‑motion settings.

4. **Enhance the React component** – Implement the menu using `forwardRef<HTMLDivElement, DynMenuProps>` and manage open state internally or via controlled props.  Use the `useMenu` hook pattern to handle keyboard navigation: arrow keys navigate between items; `Enter` or `Space` selects; `Esc` closes.  Ensure focus is trapped within the menu when open and restore focus to the trigger on close.  Provide ARIA roles (`menu`, `menuitem`, `separator`) and set `aria-disabled` on disabled items.  Implement optional search: if `searchable` is true, render a search input at the top of the list and call `onSearch` on change.  Add support for sections/groups by rendering labelled groups.

5. **Testing and documentation** – Expand the test suite to cover controlled/uncontrolled open state, keyboard navigation, vertical orientation, disabled items, danger variants and search filtering.  Add tests for dark mode and z‑index stacking.  Write JSDoc for the props and types and update README with an API table and token reference.  Provide Storybook stories covering default, dense, searchable, with icons, grouped and dark mode menus.

## Validation Checklist
Confirm the following before merging DynMenu:

- [ ] `MenuItem` and `DynMenuProps` are fully defined and aligned with the implementation, with unused properties removed【883821753372467†L45-L103】.
- [ ] All CSS values (outline offset, z‑index, min‑width, colours) have been replaced with `--dyn-menu-*` tokens that include three‑level fallbacks【883821753372467†L139-L160】.
- [ ] The CSS module uses `.dyn-menu` and BEM sub‑classes with variant modifiers; dark‑mode and high‑contrast overrides exist.
- [ ] The React component supports controlled and uncontrolled open state, keyboard navigation, search and groups, and exposes ARIA roles.
- [ ] Unit tests cover vertical orientation, dark mode, search filtering, disabled items and keyboard interactions.
- [ ] Storybook demonstrates dense/regular, searchable, grouped and dark‑mode menus.
- [ ] JSDoc and README describe the API, tokens and migration path.
