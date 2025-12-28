# DynTreeView – Implementation Guide

## Component Overview

`DynTreeView` displays hierarchical data in collapsible tree nodes with optional checkboxes and icons.  It supports single or multi selection, lazy loading, keyboard navigation, search filtering and expand/collapse behaviours.  Each node can display a label, icon, badge or action.  The tree view must be accessible with appropriate ARIA attributes (`role="tree"`, `role="treeitem"`, `aria-expanded`, `aria-level`, `aria-selected`) and support dark mode and high contrast.

## Current State Analysis

The audit rates DynTreeView at roughly 80 % complete.  It features a rich set of props (selection mode, default expanded nodes, renderItem, load children), proper design tokens and dark mode support【632005508782768†L163-L183】.  However there are notable issues:

- **Unimplemented prop** – `checkStrictly` is declared but not implemented; selection currently cascades to child nodes or does not behave as expected【632005508782768†L45-L74】.  This must either be implemented or removed.
- **Search placeholder bug** – The audit notes a bug where the search placeholder text is in Spanish while tests expect English【632005508782768†L115-L132】.
- **Duplicate classes and hard‑coded values** – The CSS module contains duplicate class definitions and hard‑coded values for spacing, indicator sizes and icons【632005508782768†L185-L401】.
- **Accessibility gaps** – Missing `aria-expanded` and `aria-level` on tree items and no `role="tree"` wrapper【632005508782768†L446-L467】.
- **Low test coverage** – Only about half of the scenarios are tested; there are no tests for dark mode, multi‑select, lazy loading or search【632005508782768†L505-L540】.

## Implementation Instructions

1. **Implement or remove `checkStrictly`** – Decide if the tree should support selection propagation.  If yes, implement logic to treat each node independently when `checkStrictly` is true (no parent/child cascade).  If not, remove the prop to avoid confusion and update docs【632005508782768†L45-L74】.

2. **Fix search placeholder** – Replace the Spanish placeholder with an English default (e.g., “Search…”), or accept a `searchPlaceholder` prop for localisation.  Update tests accordingly【632005508782768†L115-L132】.

3. **Tokenise and clean CSS** – Review the CSS module and remove duplicate classes and unused rules.  Define tokens for node indentation (`--dyn-tree-view-indent`), caret size (`--dyn-tree-view-caret-size`), checkbox size, node height and spacing.  Replace hard‑coded pixel values with tokens【632005508782768†L185-L401】.  Provide dark mode and high contrast overrides.

4. **Enhance accessibility** – Wrap the root with `role="tree"` and each node with `role="treeitem"`.  Use `aria-level` to indicate depth, `aria-expanded` to reflect collapsed/expanded state and `aria-selected` or `aria-checked` for selection【632005508782768†L446-L467】.  When checkboxes are used, ensure they are properly labelled via `aria-labelledby`.  Provide keyboard support: ArrowLeft/ArrowRight to collapse/expand, ArrowUp/ArrowDown to move between visible items, Home/End to jump, Space to toggle selection.

5. **Expand API** – Define a `DynTreeViewItem` type containing `id`, `label`, `children`, `icon`, `disabled` and optional `asyncChildren` function.  Expose props such as `defaultExpandedIds`, `expandedIds`, `onExpandedChange`, `selectionMode` (`none` | `single` | `multi`), `selectedIds`, `onSelectionChange`, `searchable`, `searchPlaceholder`, `renderItem` and `loadChildren`.  Document the `checkStrictly` prop clearly if kept.

6. **Add search and filter** – If search is enabled, implement a text input that filters visible items; highlight matches.  Use tokens for search bar styling.  For asynchronous loading, call `loadChildren` when a node is expanded.

7. **Tests** – Write unit tests for selection (strict vs cascade), expansion and collapse, lazy loading, search filtering, keyboard navigation, dark mode, high contrast and ARIA attributes【632005508782768†L505-L540】.  Achieve ≥ 80 % test coverage.

8. **Storybook examples** – Provide stories for single and multi select, with icons, asynchronous loading, search bar, strict selection, dark mode and high contrast.  Add knobs to control expanded nodes and selection.

9. **Documentation** – Add JSDoc comments describing props and behaviours, update the README and API tables.  Provide a migration guide for any removed props (e.g., `checkStrictly`).

## Validation Checklist

- [ ] `checkStrictly` is implemented correctly or removed; selection cascades behave as documented【632005508782768†L45-L74】.
- [ ] Placeholder text is localisable; default is in English; tests updated【632005508782768†L115-L132】.
- [ ] CSS tokens define indent, caret size, node height and spacing; duplicate classes removed; tokens have three‑level fallback【632005508782768†L185-L401】.
- [ ] Accessibility: root has `role="tree"`, items have `role="treeitem"`, `aria-level`, `aria-expanded` and `aria-selected`; keyboard navigation fully supports tree interactions【632005508782768†L446-L467】.
- [ ] API includes props for selection, expansion, search and lazy loading; types exported.
- [ ] Tests cover selection modes, expansion, search, keyboard navigation, lazy loading, dark mode and high contrast【632005508782768†L505-L540】.
- [ ] Storybook demonstrates all variants and states; documentation and JSDoc updated.
