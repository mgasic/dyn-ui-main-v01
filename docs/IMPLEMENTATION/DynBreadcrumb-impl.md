# DynBreadcrumb – Implementation Guide

## Component Overview
DynBreadcrumb displays a hierarchical path, usually at the top of a page, allowing users to understand their current location within a site and navigate to parent levels.  It renders a series of breadcrumb items separated by a visual divider (e.g., slash, chevron or custom separator).  Features include automatic collapsing of long paths into an ellipsis, optional icons, customizable separators, click handlers for each item and keyboard navigation.  It must be accessible (`nav` element with `aria‑label="breadcrumb"`) and support dark mode, high contrast and responsive truncation.

## Current State Analysis
The audit notes that DynBreadcrumb has good functionality (separator styles, collapsing, icon support and accessible markup), but it suffers from several medium‑severity issues.  The dark‑mode styles are currently scoped globally using `:root`, which leaks CSS variables into the entire application【428422323515794†L25-L46】.  Tokens are defined at the root rather than within the component, and the three‑level fallback pattern is missing.  Type definitions are incomplete: several props and item definitions are missing or loosely typed【428422323515794†L50-L76】.  Test coverage is limited, particularly for dark mode, collapsed state and responsive behaviour.  Documentation and JSDoc are minimal.

## Implementation Instructions
1. **Component‑scoped tokens** – Create `--dyn-breadcrumb-*` tokens for text colour, link colour, separator colour, background, font size, spacing between items, collapsed ellipsis spacing and hover/active styles.  Provide a three‑level fallback chain referencing global design tokens and primitives.  Define dark‑mode tokens scoped under `.dark .dyn-breadcrumb`.

2. **Fix dark‑mode scoping** – Move CSS variables from the global `:root` selector into `.dyn-breadcrumb` to prevent leaking into other components【428422323515794†L25-L46】.  Update the CSS module to use a root class `.dyn-breadcrumb` with BEM sub‑classes such as `.dyn-breadcrumb__list`, `.dyn-breadcrumb__item`, `.dyn-breadcrumb__separator`, and `.dyn-breadcrumb__ellipsis`.  Replace any hard‑coded values with tokens.  Provide modifier classes for separator styles (e.g., `.separatorSlash`, `.separatorChevron`), collapsed mode, and responsive truncation.

3. **Enhance TypeScript definitions** – Define `DynBreadcrumbItem` with properties `label: ReactNode`, `href?: string`, `icon?: ReactNode`, `onClick?: () => void`, `disabled?: boolean`.  Define `DynBreadcrumbProps` with `items: DynBreadcrumbItem[]`, `maxItems?: number` (number of visible items before collapsing), `separator?: ReactNode | 'slash' | 'chevron' | 'dot'`, `collapseFrom?: 'start' | 'middle' | 'end'`, and `className?`.  Export these types from `index.ts`.

4. **Refactor the React component** – Use `forwardRef<HTMLNavElement, DynBreadcrumbProps>`.  Render a `<nav>` with `aria-label="breadcrumb"` and an ordered list `<ol>` containing list items `<li>`.  Apply proper roles (`role="list"`, `role="listitem"`) and provide keyboard navigation: the first and last crumbs should be reachable via `Tab`, intermediate crumbs should not be focusable.  Support collapsed mode by rendering an ellipsis item that reveals hidden crumbs on focus or click.

5. **Testing and documentation** – Expand tests to cover dark mode, collapsed state, custom separators, icons, keyboard navigation and responsive truncation.  Provide Storybook examples for default, custom separator, collapsed and long breadcrumb scenarios.  Write JSDoc comments for all public APIs and update the README to document tokens and usage patterns.  Ensure the component exports both the React component and the associated types.

## Validation Checklist
Use this checklist when finalising DynBreadcrumb:

- [ ] All design tokens (`--dyn-breadcrumb-*`) are defined with three‑level fallbacks and dark‑mode overrides.
- [ ] CSS variables are scoped within `.dyn-breadcrumb`; no `:root` leakage【428422323515794†L25-L46】.
- [ ] Types `DynBreadcrumbItem` and `DynBreadcrumbProps` are fully defined and exported【428422323515794†L50-L76】.
- [ ] Component uses semantic `<nav>` and `<ol>`, with ARIA attributes and keyboard navigation.
- [ ] Collapsing/truncation behaviour and custom separator variants are implemented.
- [ ] Tests cover dark mode, collapsed states, icons, custom separators and responsiveness.
- [ ] Storybook and JSDoc are updated to reflect all props and usage patterns.
