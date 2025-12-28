# DynTable – Implementation Guide

## Component Overview

`DynTable` is a powerful data table component supporting sortable columns, single and multi selection, pagination, custom column renderers, row actions (edit/delete), sticky headers, responsive layout, dark mode and high contrast, and keyboard navigation.  It aims to provide a flexible and accessible table for data display and manipulation.

## Current State Analysis

The audit rates DynTable at around **89 % ready**【174359927557074†L14-L25】.  The component features a clean architecture, extensive functionality (sorting, multi‑select, pagination, row actions), excellent dark mode and high contrast support【174359927557074†L343-L364】【174359927557074†L372-L384】, and good test coverage (85–90 %)【174359927557074†L452-L494】.  It uses design tokens extensively for colours, spacing and typography.  Remaining issues include:

- A handful of hard‑coded values in CSS: selected row background colour, selection cell width, sort indicator sizes, pagination button sizes, row height, row hover colours and responsive breakpoints【174359927557074†L171-L339】.  These should be tokenised.
- Responsive design has only one breakpoint; adding extra breakpoints for tablet and small desktop would improve layout【174359927557074†L171-L339】.
- Test coverage could be expanded to cover edge cases such as dynamic column widths, multi‑row selection with shift keys, keyboard navigation across pages and custom row actions【174359927557074†L452-L494】.
- Optional enhancements include virtualization for large datasets, column resizing and reordering, and asynchronous loading of data.

## Implementation Instructions

1. **Tokenise hard‑coded values** – Define tokens for:
   - Selected row background: `--dyn-table-row-selected-bg`.
   - Selection cell width: `--dyn-table-selection-col-width`.
   - Sort indicator size and opacity: `--dyn-table-sort-icon-size`, `--dyn-table-sort-icon-opacity`.
   - Pagination button sizes and margins: `--dyn-table-pagination-button-size`, `--dyn-table-pagination-gap`.
   - Row height and hover colour: `--dyn-table-row-height`, `--dyn-table-row-hover-bg`.
   Provide three‑level fallback patterns and dark mode/high contrast overrides【174359927557074†L171-L339】.  Update CSS accordingly and remove magic numbers.

2. **Responsive improvements** – Add additional breakpoints (e.g., `md` at 768 px and `lg` at 1024 px) with tokens such as `--dyn-table-breakpoint-md`, `--dyn-table-breakpoint-lg`.  Adjust column display, spacing and pagination controls at each breakpoint.

3. **Accessibility enhancements** – Ensure data cells have `role="gridcell"` and header cells `role="columnheader"`; provide `aria-sort` on sortable headers and `aria-selected` on selected rows.  When row actions are present, ensure they are keyboard accessible and labelled.  Add `aria-live="polite"` to announce page changes.  Provide tokens for focus ring on interactive elements.

4. **API extensions** – Consider adding props for:
   - `virtualized` to enable virtualization of large datasets.
   - `resizableColumns` and `reorderableColumns` to allow user to adjust column widths/order.
   - `onRowClick` and `rowActions` to customise actions for each row.
   - `responsive` boolean to enable responsive modes with breakpoints.

5. **Tests** – Expand test suite to cover:
   - Token values applied in both light and dark modes.
   - Multi‑row selection with keyboard modifiers (Shift/Ctrl).
   - Sorting state and aria attributes.
   - Pagination navigation across pages and `aria-live` announcements.
   - Responsive behaviour at different breakpoints.
   Achieve ≥ 90 % coverage【174359927557074†L452-L494】.

6. **Storybook examples** – Add stories showcasing:
   - Basic sortable and paginated table.
   - Multi‑select with custom row actions.
   - Virtualised table for 1000+ rows.
   - Column resizing and reordering (if implemented).
   - Dark mode and high contrast.
   - Responsive layouts for mobile, tablet and desktop.

7. **Documentation** – Update README with new tokens and optional props.  Provide a migration guide for tokenised values and instructions on enabling responsive and virtualisation features.  Add JSDoc comments.

## Validation Checklist

- [ ] All previously hard‑coded values tokenised with `--dyn-table-*` variables; tokens use three‑level fallback and dark mode/high contrast overrides【174359927557074†L171-L339】.
- [ ] Responsive breakpoints defined via tokens; table adjusts layout at `md` and `lg` widths.
- [ ] Accessibility roles (`gridcell`, `columnheader`, `aria-sort`, `aria-selected`, `aria-live`) implemented and tested【174359927557074†L372-L384】.
- [ ] API optionally supports virtualization, column resizing, reordering, row actions and responsive behaviour; props typed.
- [ ] Tests expanded to cover selection, sorting, pagination, responsiveness and dark mode【174359927557074†L452-L494】.
- [ ] Storybook demonstrates new features and states; docs updated.
- [ ] Named exports and types included in `index.ts`; tokens documented.
