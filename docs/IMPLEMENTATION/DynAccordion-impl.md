# DynAccordion – Implementation Guide

## Component Overview

DynAccordion groups multiple panels of content where only one or several panels can be expanded at a time.  Each accordion item has a header that toggles the visibility of its content.  It should support single and multiple expansion modes, allow disabling individual items, expose callbacks when an item is opened or closed, and provide keyboard navigation (Up/Down arrows to move focus, Enter/Space to toggle).  The component must be accessible (using `aria-expanded`, `aria-controls`, `role="button"`/`role="region"`) and responsive.

## Current State Analysis

This component is marked as **Planned** in the inventory and has no existing implementation.  There may be a specification in the `docs/COMPONENTS` directory for DynAccordion which describes required props, variants and behaviours.  Review that spec to understand the desired API and UX.  Since there is no code yet, you will be implementing the component from scratch and should pay attention to token architecture, accessibility and state management patterns used across Dyn UI.

## Implementation Instructions

1. **Design the API and types**.  Create a `DynAccordion.types.ts` file defining a `DynAccordionProps` interface that extends `BaseComponentProps` and `AccessibilityProps`.  Include props such as:
   * `items: Array<{ id: string; header: React.ReactNode; content: React.ReactNode; disabled?: boolean; }>` – the panels to display.
   * `multi?: boolean` – whether multiple panels can be open simultaneously (default: false).
   * `defaultOpenIds?: string[]` and `openIds?: string[]` – uncontrolled and controlled open panel identifiers.
   * `onChange?: (openIds: string[]) => void` – callback when open panels change.
   * `animation?: boolean` – enable/disable expand/collapse animation.
   Define a ref interface with methods like `toggle(id: string)`, `open(id: string)`, `close(id: string)` to allow imperative control.

2. **Implement the React component**.  Use `forwardRef` and `useImperativeHandle` to expose the ref API.  Manage open panel state internally or via controlled props.  Render each item with a button element for the header; set `aria-expanded` and `aria-controls` attributes, and ensure the header is focusable.  The content region should have `role="region"` and `id` matching the `aria-controls` of the header.  Handle keyboard navigation: Up/Down arrow keys move focus between headers; Home/End jump to first/last; Enter/Space toggles the focused panel.  Support disabled items by preventing toggling.

3. **Tokenise the styles**.  Create `DynAccordion.module.css` defining tokens for header background, border, text, icon rotation, content background, padding and animation durations.  Use the `--dyn-accordion-*` naming pattern with three‑level fallbacks (component token → semantic token → foundation token).  Provide tokens for states: hover, active, disabled, open, and dark mode overrides scoped to the component container.  Example:

    ```css
    .container {
      --dyn-accordion-header-bg: var(--dyn-accordion-header-bg-base, var(--dyn-color-surface, #ffffff));
      --dyn-accordion-header-text: var(--dyn-accordion-header-text-base, var(--dyn-color-text-primary, #24292e));
      --dyn-accordion-content-bg: var(--dyn-accordion-content-bg-base, var(--dyn-color-background-muted, #f6f8fa));
      /* tokens for border, hover, active, disabled, dark mode, etc. */
    }

    @media (prefers-color-scheme: dark) {
      .container {
        --dyn-accordion-header-bg: var(--dyn-accordion-header-bg-dark, var(--dyn-color-surface-dark, #0d1117));
        --dyn-accordion-header-text: var(--dyn-accordion-header-text-dark, var(--dyn-color-text-primary-dark, #c9d1d9));
        /* ... */
      }
    }
    ```

    Use these variables to style `.header`, `.content`, `.icon` classes.  Ensure transitions are smooth and respect the `prefers-reduced-motion` media query.

4. **Testing**.  Write tests covering: controlled vs. uncontrolled modes; multi and single open behaviours; keyboard navigation; disabled items; ref methods; token application in light and dark modes; and accessibility compliance using `jest-axe`.

5. **Storybook and documentation**.  Add stories demonstrating single and multi open modes, disabled items, animated vs. non‑animated panels, dark mode, and custom header and content rendering.  Document all props and ref methods in the README using JSDoc.  Provide examples of customizing tokens via CSS variables.

## Validation Checklist

- [ ] Tokens follow the `--dyn-accordion-*` pattern with three‑level fallbacks and dark mode overrides scoped to the component.
- [ ] The API exposes `items`, `multi`, controlled/uncontrolled open IDs, and provides a ref with imperative methods.
- [ ] Keyboard and mouse interactions comply with accessibility guidelines; ARIA attributes are correctly applied.
- [ ] Unit tests cover open state changes, keyboard navigation, ref methods, dark mode and accessibility.
- [ ] Storybook stories demonstrate major configurations and include documentation.

## Validation Checklist

- [ ] Tokens use the `--dyn-<component>-*` pattern with 3‑level fallback.
- [ ] All required variants, sizes and states are implemented.
- [ ] Dark mode, high contrast and reduced motion support.
- [ ] Unit tests and Storybook stories cover the API surface.
- [ ] Component and types exported correctly.
