# DynListView – Implementation Guide

## Component Overview

`DynListView` provides a flexible list component for displaying a collection of items with optional selection, multi‑select and custom rendering.  It supports features such as single or multi selection, keyboard navigation, focus management, virtualization for large lists, configurable sizes (small, medium, large), optional icons, badges or secondary actions, group headers and responsive design.  Developers can supply custom render functions for list items and handle selection events.  The list must be accessible and support dark mode and high contrast.

## Current State Analysis

The audit rates DynListView around 75 % complete【287736174497843†L14-L25】.  The component implements multi‑select, keyboard navigation, custom rendering and dark mode using tokens; however it suffers from several significant issues:

- **CSS class mismatch** – The component uses class names like `.rootSmall` internally, while tests and docs expect BEM‑style names (`.dyn-list-view--small` etc.)【287736174497843†L45-L90】【287736174497843†L93-L151】.  This mismatch causes tests to fail and makes the API confusing.
- **Hard‑coded values** – Several values such as checkbox size (18 px) and list item minimum heights and paddings are hard‑coded rather than tokenised【287736174497843†L153-L179】【287736174497843†L185-L219】.  Tokens exist for colours, fonts and spacing but not for sizes【287736174497843†L328-L357】.
- **Heuristic item detection** – The implementation uses heuristics to decide if an item is “complex” based on the presence of certain fields; this can break with custom renderers【287736174497843†L283-L325】.
- **Accessibility gaps** – Missing ARIA attributes such as `aria-disabled`, `aria-expanded`, `aria-selected` on items; no `role="listbox"` or `role="option"`; and incomplete keyboard navigation【287736174497843†L383-L406】.
- **Test coverage** – Only a fraction of scenarios are tested; there are no tests for dark mode, multi‑select, disabled items or virtualisation【287736174497843†L430-L541】.  The audit lists a comprehensive set of missing tests and tasks to fix before deployment【287736174497843†L535-L574】【287736174497843†L601-L620】.

## Implementation Instructions

1. **Refactor class names** – Adopt a consistent BEM‑style naming scheme: `.dyn-list-view` for the root; modifier classes `.dyn-list-view--small`, `.dyn-list-view--medium`, `.dyn-list-view--large`; state classes `.dyn-list-view--disabled`, `.dyn-list-view--focused`; and element classes `.dyn-list-view__item`, `.dyn-list-view__checkbox`, `.dyn-list-view__icon`, `.dyn-list-view__secondaryAction`, `.dyn-list-view__groupHeader`.  Update the CSS module and TSX accordingly.  Provide a deprecation warning for old class names.

2. **Define size and spacing tokens** – Create component‑scoped variables such as `--dyn-list-view-item-height-sm`, `--dyn-list-view-item-height-md`, `--dyn-list-view-item-height-lg`, `--dyn-list-view-checkbox-size`, `--dyn-list-view-padding-x`, `--dyn-list-view-padding-y`.  Use these tokens for all measurements previously hard coded【287736174497843†L153-L179】【287736174497843†L185-L219】.  Ensure tokens have a three‑level fallback pattern and provide dark mode and high contrast overrides.

3. **Simplify item rendering** – Remove heuristic detection of “complex” items【287736174497843†L283-L325】.  Instead, require a `renderItem` prop that accepts the item and returns a React node; if omitted, default to a simple renderer that renders `label` and optional `icon`.  Provide type definitions for item shape and selection state.  This eliminates brittle heuristics.

4. **Enhance accessibility** – Wrap the list with `role="listbox"` and each item with `role="option"`; set `aria-selected`, `aria-disabled` and `aria-expanded` on items where appropriate【287736174497843†L383-L406】.  Add `tabIndex={0}` to the root container and implement keyboard navigation (ArrowUp/ArrowDown to move focus, Home/End to jump, Space/Enter to toggle selection).  When groups are used, use `role="group"` for headers.  Ensure focus ring tokens are defined.

5. **Extend API** – Update `DynListView.types.ts` with typed props:

   ```ts
   export interface DynListViewItem {
     id: string | number;
     label: string;
     icon?: React.ReactNode;
     disabled?: boolean;
     children?: DynListViewItem[];
   }
   export interface DynListViewProps extends React.HTMLAttributes<HTMLDivElement> {
     items: DynListViewItem[];
     size?: 'small' | 'medium' | 'large';
     selectionMode?: 'none' | 'single' | 'multiple';
     selectedIds?: Array<string | number>;
     onSelectionChange?: (selected: Array<string | number>) => void;
     renderItem?: (item: DynListViewItem, state: { selected: boolean; disabled: boolean; expanded?: boolean }) => React.ReactNode;
     className?: string;
   }
   ```

6. **Update CSS module** – Define tokens at the root of `.dyn-list-view` and ensure three‑level fallbacks.  Implement styles for each size variant, disabled state, hover and active states, and optional icon and secondary action.  Provide dark mode and high contrast overrides.  Remove any hard‑coded pixel values.

7. **Expand tests** – Cover selection modes (none/single/multiple), keyboard navigation, disabled and expanded states, dark mode and high contrast appearance, custom renderers, responsive behaviour and focus management【287736174497843†L430-L541】.  Use `aria-selected` assertions to verify accessibility.  Achieve ≥ 80 % coverage.

8. **Storybook examples** – Add stories for small/medium/large sizes; single vs multi‑select; custom renderers (e.g., with icons and secondary actions); grouping; disabled items; dark mode and high contrast; and virtualization.  Provide interactive controls to toggle selection and size.

9. **Documentation and migration** – Document the new API and tokens in the README.  Provide a migration guide from the previous class names and props.  Add JSDoc comments for types and component.  Create a pull request summarising the changes and referencing the audit; request design and QA review.

## Validation Checklist

- [ ] Class names follow the `.dyn-list-view` BEM pattern; old class names are deprecated【287736174497843†L45-L90】【287736174497843†L93-L151】.
- [ ] Tokens are defined for item heights, checkbox size, paddings and spacing; tokens use three‑level fallback and have dark mode and high contrast variants【287736174497843†L153-L179】【287736174497843†L185-L219】.
- [ ] Heuristic item detection removed; a `renderItem` prop allows custom rendering【287736174497843†L283-L325】.
- [ ] Accessibility attributes (`role="listbox"`, `role="option"`, `aria-selected`, `aria-disabled`, `aria-expanded`) implemented【287736174497843†L383-L406】.
- [ ] Tests cover selection, keyboard navigation, custom renders, disabled/expanded states, dark mode, high contrast and responsive behaviour【287736174497843†L430-L541】【287736174497843†L535-L574】.
- [ ] Storybook demonstrates sizes, selection modes, custom renderers, grouping, dark mode and high contrast.
- [ ] Component and types exported correctly from `index.ts`; documentation and JSDoc updated.
