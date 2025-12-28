# DynCheckbox – Implementation Guide

## Component Overview

DynCheckbox is a form control that allows users to select a boolean value.  It supports checked, unchecked and indeterminate states, as well as disabled and read‑only modes.  The component exposes an imperative ref API (`focus`, `validate`, `clear`, `getValue`, `setValue`) for form libraries.  It integrates with Dyn UI’s validation system to display error messages, and it must be fully tokenised for customisable colours, sizes and states.  Accessibility is critical: the checkbox must include proper ARIA attributes, keyboard interactions (Space/Enter toggles) and focus handling.  Multiple size variants (small, medium, large) and optional help or error text are supported.

## Current State Analysis

The current implementation, located in `packages/dyn-ui-react/src/components/DynCheckbox`, is largely production ready according to the audit report (`docs/COMPONENT_AUDITS/DynCheckbox_AUDIT.md`).  Key strengths include comprehensive TypeScript definitions, robust token usage, extensive feature support (checked, indeterminate, disabled, read‑only, error, required indicators, help text), a complete ref API and good accessibility.  However, the audit flagged two issues:

1. **Dark mode CSS uses `:root`** – In the dark‑mode media query, the CSS module defines component tokens on the global `:root` selector, which leaks dark‑mode tokens to the entire application【609187122130884†L140-L175】.  This is part of a systemic pattern across components.  Tokens should instead be scoped to `.container` or `.checkbox`.
2. **One Portuguese string** – The optional indicator uses the text “opcional”, while the rest of the component uses English.  Tests expect English, so the string should be corrected【609187122130884†L181-L216】.
3. **Test coverage gap** – Current tests cover about 75 % of scenarios.  The audit notes missing cases: ref methods edge cases, multiple state transitions, Enter key toggling, custom validation, dark‑mode styling, size variant styling and combinations of disabled/readonly【609187122130884†L219-L236】.
4. **Minimal Storybook documentation** – Stories exist but do not showcase all variants, interactive examples or accessibility guidelines【609187122130884†L243-L258】.

## Implementation Instructions

1. **Fix dark‑mode scoping**.  In `DynCheckbox.module.css`, locate the `@media (prefers-color-scheme: dark)` block.  Replace `:root` with the component’s container class (e.g., `.container`).  Ensure tokens are defined as `--dyn-checkbox-*` variables within `.container`, with three‑level fallbacks to semantic and foundation tokens.  For example:

    ```css
    .container {
      --dyn-checkbox-bg: var(--dyn-checkbox-bg-base, var(--dyn-color-surface, #ffffff));
      --dyn-checkbox-border: var(--dyn-checkbox-border-base, var(--dyn-color-border, #d0d7de));
      --dyn-checkbox-check: var(--dyn-checkbox-check-base, var(--dyn-color-accent-primary, #1f77b4));
      /* tokens for hover, active, disabled, indeterminate, error, focus ring, sizes, etc. */
    }

    @media (prefers-color-scheme: dark) {
      .container {
        --dyn-checkbox-bg: var(--dyn-checkbox-bg-dark, var(--dyn-color-surface-dark, #0d1117));
        --dyn-checkbox-border: var(--dyn-checkbox-border-dark, var(--dyn-color-border-dark, #30363d));
        --dyn-checkbox-check: var(--dyn-checkbox-check-dark, var(--dyn-color-accent-primary-dark, #58a6ff));
        /* dark versions for other tokens */
      }
    }
    ```

    Remove any global `:root` declarations.  Ensure states such as `:hover`, `:active`, `.checked`, `.indeterminate`, `.disabled`, `.error` use the tokens appropriately.  Provide tokens for size variants (e.g., `--dyn-checkbox-size-small`, `--dyn-checkbox-size-large`) to define dimensions and padding.

2. **Correct localisation**.  Replace the Portuguese string “opcional” in `DynCheckbox.tsx` with the English “optional” (or accept a `labels.optional` prop if desired).  Ensure consistency of language throughout the component and tests【609187122130884†L181-L216】.

3. **Expand test coverage**.  Enhance `DynCheckbox.test.tsx` by adding tests for:
   * Ref methods edge cases – calling `setValue` with non‑boolean values should not change state; ensure `validate` returns expected results for custom validation rules.
   * Multiple state transitions – toggling from checked to indeterminate to unchecked; verify that ARIA attributes update accordingly.
   * Keyboard handling – ensure both Space and Enter keys toggle the checkbox; check that toggling is prevented when disabled or read‑only.
   * Validation with custom rules – pass a custom validator through `useDynFieldValidation` and verify error states and messages.
   * Dark mode rendering – mount the component with a dark‑mode wrapper and verify token values and computed styles.  Use `jest-axe` to check for accessibility issues in dark mode.
   * Size variants – render small and large checkboxes and assert that dimensions and spacing match the design guidelines (e.g., 16 px vs. 20 px).  Test optional indicator text and visibility.
   * Combined props – disabled + read‑only combinations and their effect on interaction.

4. **Enhance Storybook stories**.  Add examples for:
   * Each size variant (small, medium, large) side‑by‑side for comparison.
   * Checked, unchecked, indeterminate and disabled states with and without labels and help text.
   * Validation states with custom error messages and required indicators.
   * Dark mode demonstration using the theme toggler.
   * Interactive playground with controls for `checked`, `indeterminate`, `disabled`, `required`, `error`, `size` and `label` props.  Document the ref API and show how to use imperative methods.

5. **Documentation**.  Update the README and JSDoc comments to include all props (`checked`, `defaultChecked`, `onChange`, `label`, `helpText`, `error`, `size`, `required`, `optional`, `disabled`, `readOnly`) and the ref API.  Provide guidance on validation integration and token customisation.

6. **Git workflow**.  Create a branch (e.g., `fix/dyn-checkbox-dark-mode`).  Commit the dark‑mode CSS fix and localisation update, then commit test additions and Storybook enhancements.  Reference the audit issues in the PR description.  Once merged, update the master index and implementation summary to reflect the improvements.

## Validation Checklist

- [ ] Dark mode tokens are scoped to `.container`, not `:root`, and include three‑level fallbacks for all checkbox tokens.
- [ ] All UI text strings are consistently English (or support a `labels` prop for localisation); no Portuguese strings remain.
- [ ] Tests cover at least 85 % of the component API, including ref methods, multiple state transitions, keyboard interactions, validation rules, dark mode and size variants.
- [ ] Storybook stories demonstrate all states, variants and error conditions, including dark mode and interactive examples.
- [ ] Documentation and JSDoc comments describe all props and the ref API, and provide guidance on validation and token customisation.
- [ ] Component exports remain correct and the implementation summary is updated.
