# DynGrid – Implementation Guide

## Component Overview

DynGrid is a data table (grid) component used to display tabular data with interactive features.  It supports column configuration (custom keys, titles, widths, alignment), sorting on multiple data types (string, number, boolean, date), single or multiple row selection with checkboxes or radio buttons, pagination controls, loading and empty states, custom cell rendering, row striping, hover effects and optional borders.  Size variants (small, medium, large) control padding and font size, and the component is responsive with a mobile breakpoint at 768 px.  Dark mode, high‑contrast and reduced‑motion media queries are implemented.  The API exposes props for data, columns, default sorting, selection mode and callbacks, and the TypeScript definitions provide strong type safety.

## Current State Analysis

According to the comprehensive audit report, DynGrid scores **82 %** overall and is considered ready for production with a few minor improvements【221761879126546†L24-L24】.  The component has a complete file structure (TSX component, types, CSS module, Storybook, tests and index) and a clean React implementation with proper `forwardRef`, state management and memoisation【221761879126546†L51-L75】.  It offers a rich feature set: sorting, selection, pagination, loading and empty states, custom cell rendering, column alignment and striping【221761879126546†L57-L68】.  Type safety is strong, accessibility is good (semantic table elements, ARIA roles and labels, aria‑live for loading) and responsive design is mobile‑first【221761879126546†L76-L84】【221761879126546†L345-L367】.

**Strengths**

* **Token usage:** The CSS module uses the `--dyn-*` naming pattern with 3‑level fallbacks for colours, spacing, typography, borders and transitions【221761879126546†L121-L140】.
* **Dark mode:** Every light‑mode rule has a corresponding dark‑mode rule, yielding excellent coverage (98 %)【221761879126546†L305-L331】.
* **Accessibility:** Semantic HTML, ARIA roles and labels, screen‑reader support, high‑contrast and reduced‑motion media queries【221761879126546†L345-L367】.
* **Responsive design:** Mobile breakpoint at 768 px with adjusted padding, font size and control sizes【221761879126546†L374-L398】.
* **Feature completeness:** All primary features (sorting, selection, pagination, loading, empty state, custom rendering, striping, hoverable, bordered, size variants) work correctly【221761879126546†L462-L476】.

**Issues and Opportunities**

* **Hard‑coded values:** Approximately eight pixel values remain hard‑coded in the CSS (selected row background, spinner size and border width, selection cell width, sort indicator size and opacity, pagination button sizes)【221761879126546†L142-L183】.  These should be replaced with component‑scoped tokens such as `--dyn-grid-row-selected-bg`, `--dyn-grid-spinner-size`, `--dyn-grid-selection-cell-width`, `--dyn-grid-sort-indicator-size` and `--dyn-grid-pagination-button-width` and `height`.
* **Unused variables:** The TSX file defines variables (`effectiveFilterable`, `onFilter`) for a planned filter feature that are not implemented【221761879126546†L101-L110】.  This indicates a future feature but may confuse contributors.
* **Width calculations:** Column width properties mix strings and numbers without validation【221761879126546†L111-L118】.
* **Dark‑mode selected row colour:** In the dark‑mode CSS the selected row colour is hard‑coded and should be tokenised【221761879126546†L334-L341】.
* **Test coverage gaps:** Only nine tests exist (approx. 72 % coverage).  Missing tests include multi‑type sorting, sorting direction toggling, select‑all and indeterminate states, column hiding, alignment and custom rendering, pagination controls, dark‑mode rendering, accessibility attributes and selection mode transitions【221761879126546†L405-L435】.
* **Responsive breakpoints:** The component uses only a single mobile breakpoint (768 px).  Adding a tablet breakpoint (e.g., 1024 px) could improve the layout【221761879126546†L399-L401】.
* **Accessibility enhancements:** The component lacks an `aria-live` region to announce sort state changes and does not use `aria-current="page"` for pagination【221761879126546†L365-L368】.

Overall the component is stable and feature‑rich.  Addressing the tokenisation and test gaps would polish the implementation.

## Implementation Instructions

Follow these steps to bring DynGrid into full compliance and enhance its robustness:

1. **Tokenise remaining hard‑coded values.**  In `DynGrid.module.css`, define new tokens with 3‑level fallback for the remaining pixel values and replace the literals:
   - `--dyn-grid-row-selected-bg` (default `rgba(37, 99, 235, 0.1)`) and dark‑mode counterpart; use this token for `.rowSelected` in both light and dark mode【221761879126546†L144-L160】.
   - `--dyn-grid-spinner-size` and `--dyn-grid-spinner-border-width` for the spinner dimensions and border width【221761879126546†L164-L182】.
   - `--dyn-grid-selection-cell-width` and `--dyn-grid-selection-cell-width-mobile` for the selection checkbox column width in desktop and mobile breakpoints【221761879126546†L189-L227】.
   - `--dyn-grid-sort-indicator-size` and `--dyn-grid-sort-indicator-opacity`【221761879126546†L231-L247】.
   - `--dyn-grid-pagination-button-width`, `--dyn-grid-pagination-button-height`, `--dyn-grid-pagination-button-width-mobile` and `--dyn-grid-pagination-button-height-mobile`【221761879126546†L251-L283】.
   Ensure each token follows the fallback pattern `var(--dyn-grid-token, var(--legacy-token, fallback))`.

2. **Expose new tokens.**  Document the new tokens in a constants or design tokens file and update `DynGrid.tsx` to reference them through CSS classes.  Do not hard‑code values in the TSX.

3. **Clarify future features.**  Either implement the planned filter feature (with `filterable`, `onFilter`, column filter definitions and UI) or remove the unused variables to avoid confusion【221761879126546†L101-L110】.  If implementing, define tokens for filter controls and update types and stories accordingly.

4. **Validate width properties.**  Ensure `column.width` and `column.minWidth` accept only pixel or percentage strings.  Provide helper functions to normalise width values or update the type definitions to restrict values.

5. **Enhance accessibility.**  Add an `aria-live="polite"` region to announce sort direction changes to screen readers.  In pagination controls, set `aria-current="true"` on the current page button and document this behaviour in the Storybook【221761879126546†L365-L368】.

6. **Improve responsive design.**  Add an intermediate tablet breakpoint around 1024 px to adjust padding and font sizes for medium screens.  Consider adding horizontal scroll indicators when the grid is wider than the viewport.

7. **Expand test coverage.**  Add tests for: multi‑type sorting (strings, numbers, booleans, dates); toggling sorting direction; select‑all and indeterminate states; column hiding and alignment; custom cell rendering edge cases; pagination controls (first, last, next, previous); dark‑mode rendering; accessibility attributes; row key resolution; selection mode transitions【221761879126546†L405-L435】.  Aim for >90 % coverage.

8. **Update documentation.**  In the Storybook examples, include a dark‑mode preview, responsive examples for tablet breakpoints, and highlight accessibility features such as aria labels and live regions.  Document the new tokens and how to override them.

9. **Optional enhancements.**  Consider implementing planned features like filterable columns, sticky columns (`column.fixed`), column resizing and keyboard shortcuts for sorting.  Document these features separately and provide tokens as needed.

## Validation Checklist

Use this checklist to verify that DynGrid meets all compliance and quality requirements:

- [ ] **Tokenisation:** All styling values (including selected row background, spinner size and border width, selection cell width and mobile width, sort indicator size and opacity, pagination button sizes) are defined as `--dyn-grid-*` tokens with 3‑level fallback.
- [ ] **Dark mode:** The dark‑mode selected row colour and other variants use tokens rather than hard‑coded values, and there are matching tokens for light and dark modes.
- [ ] **Feature completeness:** Sorting, selection, pagination, loading, empty state, custom rendering, size variants and other features function correctly after refactoring.
- [ ] **Accessibility:** Semantic table elements remain; there is an `aria-live` region for sort state changes and `aria-current` for pagination; focus management, high‑contrast and reduced‑motion queries are intact.
- [ ] **Responsive design:** Breakpoints include mobile and tablet widths with appropriate adjustments; no horizontal scrolling issues; layout adapts gracefully.
- [ ] **Tests:** Coverage is expanded to include all major scenarios (multi‑type sorting, select‑all, column hiding, custom rendering, pagination controls, dark mode, accessibility attributes).  All tests pass.
- [ ] **Documentation:** Storybook shows dark‑mode and responsive examples; new tokens are documented; accessibility features are described.
- [ ] **Exports:** The component and its types (`DynGridColumn`, `DynGridPagination`, etc.) are exported correctly from the package index.
