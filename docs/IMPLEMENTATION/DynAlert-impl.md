# DynAlert – Implementation Guide

## Component Overview

DynAlert displays concise status messages to users.  It supports several variants such as success, warning, error and information, with optional icons and actions.  Alerts can be closable (with a dismiss button) and may include a title and additional descriptive text.  Variants may be presented in filled or outlined styles and in different sizes.  The component should announce itself as a live region for screen readers and support dark mode styling.

## Current State Analysis

This component is marked as **Planned** in the inventory.  There is no implementation code yet.  Consult the specification in `docs/COMPONENTS/P2_NICE_TO_HAVE/README.md` under the DynAlert section to understand the desired props, variants and behaviours.  Because the component does not exist, the implementation will start from scratch following Dyn UI conventions for tokens, accessibility and state management.

## Implementation Instructions

1. **Define props and types**.  Create `DynAlert.types.ts` defining a `DynAlertProps` interface with fields such as:
   * `variant?: 'success' | 'warning' | 'error' | 'info'` – controls the visual styling.
   * `title?: React.ReactNode` – optional heading.
   * `message: React.ReactNode` – main alert content.
   * `icon?: React.ReactNode` – optional icon override.
   * `closable?: boolean` and `onClose?: () => void` – whether the alert can be dismissed.
   * `actionLabel?: string` and `onAction?: () => void` – optional secondary action button.
   * `size?: 'sm' | 'md'` – adjust padding and font size.
   Document each prop with JSDoc and ensure the interface extends `BaseComponentProps` and `AccessibilityProps`.

2. **Implement the component**.  Create `DynAlert.tsx` as a functional component.  Render a container with `role="alert"` to ensure screen readers announce new alerts.  Include an icon appropriate to the variant (provide sensible defaults) and the message content.  If a title is provided, render it as a bold heading.  When `closable` is true, render a button with `aria-label="Close alert"` that calls `onClose` and conditionally hides the alert.  If `actionLabel` is provided, render an action button calling `onAction`.  Apply CSS classes corresponding to the variant and size props.

3. **Tokenise the CSS**.  Create `DynAlert.module.css` with tokens for background colour, border colour, text colour, icon colour, padding and border radius.  Follow the naming pattern `--dyn-alert-*` with three‑level fallbacks.  Provide variant-specific tokens, e.g., `--dyn-alert-bg-success`, `--dyn-alert-text-error`, and define dark mode overrides within a media query scoped to the component.  Ensure states (hover for action button, focus outline) and sizes use tokens.  Provide a `.closable` class to adjust spacing when a close button is present.

4. **Testing**.  Write unit tests verifying that each variant applies the correct classes and tokens, that the alert renders `role="alert"`, that clicking the close button triggers `onClose` and removes the alert, and that the action button triggers `onAction`.  Test dark mode token application and size variants.  Use `jest-axe` for basic accessibility checks.

5. **Storybook documentation**.  Add stories for each variant and size, with and without close and action buttons.  Include dark mode examples.  Document props in the story description and provide examples of custom icons and token overrides.

## Validation Checklist

- [ ] Props for variant, title, message, icon, closable, actions and size are fully typed and documented.
- [ ] Styles are tokenised using `--dyn-alert-*` variables with three‑level fallback and dark mode overrides scoped to the component.
- [ ] The component uses `role="alert"` and is accessible; dismiss and action buttons have proper ARIA labels.
- [ ] Unit tests cover variant rendering, closing, action handling, dark mode and accessibility.
- [ ] Storybook stories demonstrate all variants, sizes and features, including dark mode.

## Validation Checklist

- [ ] Tokens use the `--dyn-<component>-*` pattern with 3‑level fallback.
- [ ] All required variants, sizes and states are implemented.
- [ ] Dark mode, high contrast and reduced motion support.
- [ ] Unit tests and Storybook stories cover the API surface.
- [ ] Component and types exported correctly.
