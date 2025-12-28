# DynPage – Implementation Guide

## Component Overview
DynPage is a layout component that provides a consistent container for full pages or sections within an application.  It can render a header (title, subtitle and actions), a content area and an optional sidebar or footer.  The page should manage padding, max‑width constraints and responsive breakpoints, and expose variants for background colours and scroll behaviour.  Accessibility requires using semantic regions (`<header>`, `<main>`, `<aside>`) and proper ARIA roles.

## Current State Analysis
The audit reports that DynPage suffers from significant architectural issues.  The current implementation uses global CSS rather than a scoped `.module.css`, leading to style leakage and difficulty applying tokens.  Type definitions are incomplete and imported from incorrect locations; many props are loosely typed【374420869836637†L33-L47】.  The component does not employ design tokens for layout properties (padding, background, width) and therefore cannot support dark mode or responsive variants【374420869836637†L48-L92】.  Accessibility is poor: there are no semantic region elements, missing ARIA attributes and limited keyboard focus management.  Tests and Storybook examples are sparse.

## Implementation Instructions
1. **Introduce scoped CSS and design tokens** – Replace the global CSS file with a `.module.css` file.  Define `--dyn-page-*` tokens for page background, text colour, padding (x/y), max width, header background, content background, sidebar background, shadow and gap.  Provide size tokens for small/medium/large padding and set three‑level fallback chains.  Add dark‑mode overrides under `.dark .dyn-page` and include high‑contrast media queries.

2. **Refactor the React component** – Use `forwardRef<HTMLElement, DynPageProps>` and split the layout into semantic elements: `<header>` for the page header (title, subtitle, action slots), `<main>` for the content and `<aside>` for an optional sidebar.  Define `DynPageProps` with `title?: ReactNode`, `subtitle?: ReactNode`, `actions?: ReactNode`, `sidebar?: ReactNode`, `children: ReactNode`, `maxWidth?: number | 'sm' | 'md' | 'lg' | 'xl'`, `padding?: 'none' | 'sm' | 'md' | 'lg'`, `background?: 'default' | 'muted' | 'transparent'`, `stickyHeader?: boolean`, `className?`.  Move type imports into a `types.ts` file and export them from the component index.

3. **Apply tokens in CSS** – Create a `.dyn-page` root class and BEM sub‑classes `.dyn-page__header`, `.dyn-page__content` and `.dyn-page__sidebar`.  Use tokens for padding, margin and colours.  Support variants: `maxWidth` modifies the `max-width` property; `padding` sets `padding-inline` and `padding-block`; `background` chooses among different background tokens.  Implement dark‑mode and responsive breakpoints.  If `stickyHeader` is true, apply `position: sticky; top: 0` with an appropriate `z-index` token.

4. **Accessibility improvements** – Wrap the header and content in `<header>` and `<main>` elements and provide an `aria-label` for the main region.  If a sidebar is present, render it in `<aside>` with `aria-label` and ensure focus order flows logically.  Use proper heading levels (`<h1>` for the page title) and ensure `subtitle` is associated via `aria-describedby`.  Provide `role="main"` on the main content container.

5. **Testing and documentation** – Add unit tests covering header, subtitle and actions rendering, sidebar layout, sticky header behaviour, dark mode and responsive behaviour.  Write tests ensuring that tokens are applied correctly and that the component does not leak global styles.  Provide Storybook stories demonstrating default and variant usages, including pages with sidebars, sticky headers, dark mode and different max widths.  Write JSDoc comments and update the README to document the new props and tokens【374420869836637†L48-L92】.

## Validation Checklist
Before considering DynPage ready:

- [ ] The global CSS has been replaced with a `.module.css` file using `--dyn-page-*` tokens and three‑level fallbacks【374420869836637†L48-L92】.
- [ ] The React component exposes `DynPageProps` with `title`, `subtitle`, `actions`, `sidebar`, `children`, `maxWidth`, `padding`, `background` and `stickyHeader` and uses `forwardRef`.
- [ ] Semantic regions (`<header>`, `<main>`, `<aside>`) and ARIA labels are implemented for accessibility【374420869836637†L33-L47】.
- [ ] CSS classes follow BEM pattern and support variants (max width, padding, background, sticky header) with dark‑mode and responsive support.
- [ ] Unit tests cover header, subtitle, actions, sidebar, sticky header, dark mode and responsiveness.
- [ ] Storybook shows default, with sidebar, sticky header and dark‑mode examples; the README documents tokens and props.
