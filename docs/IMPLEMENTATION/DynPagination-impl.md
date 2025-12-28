# DynPagination – Implementation Guide

## Component Overview

`DynPagination` is a navigation control used to traverse multi‑page datasets such as tables, list views or search results.  It provides intuitive controls for moving backward and forward, jumping directly to specific pages and adjusting how many items are shown per page.  The component must support both desktop and mobile experiences, with an optional **compact** mode on smaller screens.

Key features include:

- **Previous/Next buttons** – Navigate sequentially through pages with disabled states when at the beginning or end of the dataset.
- **Page number buttons** – Render clickable buttons for nearby pages; include active styling on the current page and ellipses to indicate skipped ranges【583582458318191†L74-L87】.
- **Go‑to page input** – Optionally allow users to type a page number and jump directly to that page【583582458318191†L74-L87】.
- **Items per page selector** – Optionally present a drop‑down to change the page size (e.g. 10, 25, 50, 100).  When the page size changes the current page should reset or adjust accordingly.
- **Total items display** – Show the total number of items or pages so users understand the data set size.
- **Keyboard navigation** – Support arrow keys and home/end to move between pages and ensure buttons are focusable and labelled with `aria-label`.
- **Ellipsis support** – When there are many pages, display an ellipsis (`…`) between the first/last page and the current window of pages【583582458318191†L74-L87】.
- **Compact/mobile mode** – Provide a variant that reduces visual weight and may collapse page numbers into a simple “Page X of Y” display on small screens【583582458318191†L74-L87】.
- **Dark mode** – Define dark‑theme overrides for backgrounds, borders and text colours.

## Current State Analysis

`DynPagination` is listed as a **Planned** component in the DynUI inventory and does not currently exist in the source code.  The only reference to this component appears in the **P2 – NICE‑TO‑HAVE** specification, which outlines its purpose, features and required design tokens【583582458318191†L74-L87】【583582458318191†L89-L101】.  No React implementation, TypeScript types, CSS module, tests or stories have been created yet.  As such, the component must be built entirely from scratch using the design patterns established in other DynUI components and the token list provided in the specification.

The specification lists the following design tokens (each must have three‑level fallbacks)【583582458318191†L89-L101】:

| Token | Purpose |
|------|---------|
| `--dyn-pagination-bg` | Background colour for the pagination container |
| `--dyn-pagination-border` | Border colour/width around the container |
| `--dyn-pagination-color` | Default text colour for page labels |
| `--dyn-pagination-button-bg` | Background colour for inactive buttons |
| `--dyn-pagination-button-bg-active` | Background colour for the active page button |
| `--dyn-pagination-button-color-active` | Text colour for the active page button |
| `--dyn-pagination-button-padding-y` | Vertical padding for page buttons |
| `--dyn-pagination-button-padding-x` | Horizontal padding for page buttons |
| `--dyn-pagination-button-border-radius` | Border radius for page buttons |
| `--dyn-pagination-gap` | Gap/spacing between page buttons and other controls |

Because no code exists, there are no existing tests, storybook stories or accessible attributes.  Implementation must consider accessibility from the start (e.g. `role="navigation"`, `aria-label` and ARIA semantics for lists of pages).

## Implementation Instructions

The following steps describe how to implement `DynPagination` from scratch while complying with the DynUI design system.  Use `DynButton` and `DynInput` as references for token usage and accessibility patterns.

### 1. Set up file structure

Create a new folder `packages/dyn-ui-react/src/components/DynPagination/` containing:

```
DynPagination.tsx      // React component
DynPagination.types.ts // Type definitions
DynPagination.module.css // CSS module with tokens and variants
DynPagination.stories.tsx // Storybook stories
DynPagination.test.tsx   // Jest/RTL tests
index.ts                // Barrel export
```

### 2. Define design tokens

In `DynPagination.module.css`, declare all required tokens listed above using the `--dyn-pagination-*` naming pattern and provide three‑level fallbacks: component level → system theme level → hardcoded value.  For example:

```css
/* DynPagination.module.css */
:root {
  /* Default values (light mode) */
  --dyn-pagination-bg: var(--dyn-color-surface, #ffffff);
  --dyn-pagination-border: var(--dyn-color-border, #e0e0e0);
  --dyn-pagination-color: var(--dyn-color-text-primary, #333333);
  --dyn-pagination-button-bg: var(--dyn-color-surface-secondary, #f5f5f5);
  --dyn-pagination-button-bg-active: var(--dyn-color-primary-light, #e0f4ff);
  --dyn-pagination-button-color-active: var(--dyn-color-primary-dark, #0066a6);
  --dyn-pagination-button-padding-y: var(--dyn-size-spacing-2, 0.25rem);
  --dyn-pagination-button-padding-x: var(--dyn-size-spacing-3, 0.5rem);
  --dyn-pagination-button-border-radius: var(--dyn-radius-small, 4px);
  --dyn-pagination-gap: var(--dyn-size-spacing-2, 0.25rem);
}
@media (prefers-color-scheme: dark) {
  :root {
    /* Dark mode overrides */
    --dyn-pagination-bg: var(--dyn-color-surface-dark, #1a1a1a);
    --dyn-pagination-border: var(--dyn-color-border-dark, #444444);
    --dyn-pagination-color: var(--dyn-color-text-primary-dark, #e0e0e0);
    --dyn-pagination-button-bg: var(--dyn-color-surface-dark-secondary, #2a2a2a);
    --dyn-pagination-button-bg-active: var(--dyn-color-primary-darkest, #004d73);
    --dyn-pagination-button-color-active: var(--dyn-color-primary-lightest, #b3e6ff);
  }
}
```

Define additional tokens for compact mode if needed (e.g. `--dyn-pagination-compact-padding-x`).  Group tokens logically (background, border, button) and document them in comments.

### 3. Implement the React component

In `DynPagination.tsx`, implement a functional component using `forwardRef<HTMLNavElement, DynPaginationProps>`.  Key points:

1. **Props** – Define a `DynPaginationProps` interface in `DynPagination.types.ts` with the following fields:
   - `currentPage: number` – Currently selected page (1‑based).
   - `totalPages: number` – Total number of pages.
   - `onPageChange?: (page: number) => void` – Callback fired when the user selects a new page.
   - `pageSize?: number` – Current number of items per page.
   - `pageSizes?: number[]` – List of selectable page sizes (e.g. `[10,25,50,100]`).
   - `onPageSizeChange?: (size: number) => void` – Callback fired when the page size changes.
   - `showPageSizeSelector?: boolean` – Whether to render a page size selector dropdown.
   - `showGoToInput?: boolean` – Whether to render an input allowing users to jump to a specific page.
   - `showTotal?: boolean` – Whether to display the total item count (requires a `totalItems` prop).
   - `totalItems?: number` – Optional total number of items for display.
   - `compact?: boolean` – Whether to render a compact layout on mobile.
   - `className?: string` and `style?: React.CSSProperties` for custom styling.
   - `prevLabel?`, `nextLabel?` – Strings or ReactNodes to override the default “Previous”/“Next” labels (useful for i18n).
   - `disabled?: boolean` – Disables all controls.

2. **Rendering** – Wrap the component in a `<nav>` element with `role="navigation"` and an `aria-label` (e.g. `"Pagination"`).  Render an unordered list `<ul role="list">` containing `<li>` elements for previous/next buttons, page numbers and optional controls.  Apply CSS classes using the tokens defined above.

3. **Page number generation** – Compute an array of page numbers to display based on the `currentPage` and `totalPages`.  Implement logic to show the first and last page, a range around the current page and ellipses when the number of pages is large.  Provide an `ellipsisIcon` prop if you want to customise the ellipsis.

4. **Event handling** – On click of a page button, call `onPageChange`.  Disable the previous button when `currentPage === 1` and the next button when `currentPage === totalPages`.  When `showGoToInput` is enabled, use an `<input type="number">` with `min=1` and `max=totalPages` to allow direct page entry; debounce or validate the input and call `onPageChange` when confirmed.

5. **Page size selector** – If `showPageSizeSelector` is true, render a `<select>` with `pageSizes` options.  When changed, call `onPageSizeChange` and update the current page accordingly (e.g. reset to page 1).

6. **Accessibility** – Ensure each page button has `aria-label` and use `aria-current="page"` on the current page.  Use `aria-disabled` on disabled buttons.  Support keyboard navigation: allow left/right arrows to navigate between pages and Enter/Space to activate.  Provide focus ring styles using tokens or the `:focus-visible` pseudo‑class.

7. **ForwardRef** – Forward a ref to the `<nav>` element so parent components can access the underlying DOM.

8. **TypeScript** – In `DynPagination.types.ts`, export the `DynPaginationProps` interface and any helper types.  Ensure all props are strictly typed and optional where appropriate.

### 4. Write CSS module

In `DynPagination.module.css`, implement classes for:

- `.pagination` – The root container with background, border and gap tokens.
- `.list` – The unordered list wrapper (display: flex; gap using `--dyn-pagination-gap`).
- `.button` – Base button style with padding tokens, border radius, color and hover/focus states.
- `.button--active` – Active page button style using `--dyn-pagination-button-bg-active` and `--dyn-pagination-button-color-active`.
- `.button--disabled` – Disabled state using `opacity` or `cursor: not-allowed`.
- `.compact` – Optional class that reduces spacing and hides page numbers; show only “Page X of Y” and previous/next controls.

Use the tokens defined earlier and ensure a 3‑level fallback pattern.  Include dark mode overrides using `@media (prefers-color-scheme: dark)` if needed.  For reduced motion, wrap transitions in `@media (prefers-reduced-motion: no-preference)`.

### 5. Develop Storybook stories

Create `DynPagination.stories.tsx` with multiple examples:

- **Default** – Basic pagination with 10 pages.
- **With page size selector** – Show how to change items per page.
- **With go‑to input** – Include the jump input.
- **Compact mode** – Demonstrate the compact/mobile layout.
- **Dark mode** – Use the `dark` storybook theme to preview dark colours.
- **Internationalisation** – Example with custom previous/next labels.

Each story should document the props and show how to integrate `DynPagination` with a data table or list.

### 6. Write unit tests

In `DynPagination.test.tsx`, use React Testing Library and Jest to cover at least 80 % of the component code:

- Render with a small number of pages and verify that page buttons appear and call `onPageChange` when clicked.
- Test the disabled state of previous/next buttons at the edges.
- Test the ellipsis logic by rendering with many pages and asserting that ellipses appear in the correct places.
- Test the page size selector and ensure `onPageSizeChange` is called with the selected value.
- Test the go‑to input: simulate typing a page number and pressing Enter to change pages.
- Verify ARIA attributes (`aria-current`, `aria-label`, `aria-disabled`).
- Test keyboard navigation by sending arrow key events and ensuring focus and page change behaviour.

### 7. Export and documentation

In `index.ts`, export `DynPagination` and `DynPaginationProps` so consumers can import it as `import { DynPagination } from 'dyn-ui-react'`.

Document the component in the package README or reference docs.  Include a table of props, usage examples and a note on token customisation.  Ensure that all exported types are documented in JSDoc and that the Storybook stories provide adequate examples.

## Validation Checklist

Use this checklist to verify the implementation before merging:

### Tokens & CSS
- [ ] All tokens defined in the specification are implemented with the `--dyn-pagination-*` naming convention and three‑level fallbacks【583582458318191†L89-L101】.
- [ ] No hardcoded pixel values remain in the CSS; spacing, colours and radii derive from tokens.
- [ ] Dark mode overrides are implemented within `@media (prefers-color-scheme: dark)` blocks.
- [ ] High contrast and reduced motion preferences are respected (e.g. wrap animations in `@media (prefers-reduced-motion: no-preference)`).

### Functionality
- [ ] Previous/next buttons disable at the boundaries and trigger `onPageChange` correctly.
- [ ] Page numbers render correctly for small and large page counts with ellipsis handling【583582458318191†L74-L87】.
- [ ] Compact mode collapses page numbers into a concise display and reduces spacing.
- [ ] Page size selector and go‑to input (if enabled) function correctly and call the appropriate callbacks.
- [ ] Keyboard navigation works (arrow keys, home/end, Enter/Space) and focus management follows WCAG guidelines.

### Accessibility
- [ ] The component uses semantic elements (`<nav>` and `<ul>`) and includes an accessible `aria-label`.
- [ ] `aria-current="page"`, `aria-disabled` and other attributes are applied appropriately.
- [ ] Input and select elements are labelled with `<label>` or `aria-label`.
- [ ] Focus styles are visible and respect high contrast mode.

### Testing & Documentation
- [ ] Unit tests achieve ≥80 % coverage and include all state/variant combinations.
- [ ] Storybook stories cover default, page size selector, go‑to input, compact, dark mode and i18n examples.
- [ ] All exported types are documented and the component is exported from `index.ts`.
- [ ] A migration or usage guide explains how to integrate `DynPagination` with data components.
