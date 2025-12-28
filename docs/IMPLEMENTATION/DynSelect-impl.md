# DynSelect – Implementation Guide

## Component Overview

DynSelect is an advanced dropdown form control that allows users to pick a single item or multiple items from a list.  It supports searching and filtering options, clearing selections, grouping items by category, displaying selected items as removable tags, and exposes callbacks for `onChange` and `onSearchChange`.  The component is expected to be fully accessible, responsive and themeable via design tokens, with dark‑mode support and high contrast.  Internationalization should be handled via prop‑driven labels or an i18n hook so that UI strings are not hard‑coded in English.

## Current State Analysis

The existing implementation lives at `packages/dyn-ui-react/src/components/DynSelect` with accompanying Storybook stories and tests.  The audit report (`docs/COMPONENT_AUDITS/DynSelect_AUDIT.md`) highlights several deficiencies:

* **Incomplete type definitions** – `DynSelect.types.ts` only re‑exports a shared prop type.  It lacks local definitions for props such as `options`, `multi`, `searchable`, `clearable`, `groupBy`, `maxTags`, `emptyMessage` and localisation labels, as well as a ref interface.
* **Dark mode scoping bug** – The CSS module uses `:root` inside a dark‑mode media query to set component tokens, which leaks variables to the global scope and breaks isolation【836205723209676†L121-L180】.
* **Internationalization mismatch** – Tests expect Portuguese strings while the component uses English labels.  The component does not expose a way to customise UI strings.
* **Feature gaps and incomplete tests** – Multi‑select tag rendering, grouping and ARIA roles are only partially implemented; tests cover roughly 65 % of the API surface and miss ref methods, search behaviour, tag removal, dark‑mode rendering and accessibility.

## Implementation Instructions

To bring DynSelect in line with Dyn UI standards, undertake the following tasks:

1. **Define comprehensive types**.  In `DynSelect.types.ts`, declare an interface `DynSelectProps` that extends `BaseComponentProps` and `AccessibilityProps`, documenting all props.  Include:
   * `options: Array<{ value: string | number; label: string; disabled?: boolean; group?: string; }>` – the selectable items; if consumers supply complex objects, allow a generic type parameter.
   * `multi?: boolean` – enable multi‑select mode.
   * `searchable?: boolean` – enable a search input to filter options.
   * `clearable?: boolean` – show a clear button to reset the selection.
   * `groupBy?: (option) => string` – optional function to group options by a category.
   * `maxTags?: number` – maximum number of tags to display when multi‑select; show an overflow indicator when exceeded.
   * `emptyMessage?: string` – message shown when no options match the search.
   * `labels?: { noOptions?: string; clear?: string; placeholder?: string; search?: string }` – override default UI strings for internationalization.
   * `placement?: 'auto' | 'top' | 'bottom'` – preferred dropdown placement.
   * `value` and `defaultValue` for controlled/uncontrolled usage, plus `onChange` and `onSearchChange` callbacks.
   Define a `DynSelectRef` interface with methods `focus()`, `open()`, `close()`, `clear()`, `getValue(): any`, `setValue(value: any): void` to allow imperative control via `forwardRef`.

2. **Refactor the React component**.  Update `DynSelect.tsx` to accept the new props and forward a ref typed as `DynSelectRef`.  Handle multi‑select by rendering selected values as removable tag components; enforce `maxTags` by showing “+ N more” when necessary.  Use the `labels` prop to supply all user‑visible text (placeholder, no options message, clear button label).  Replace any hard‑coded strings with lookups from `labels` or fallback to English defaults if undefined.  Implement grouping support by grouping options based on the `groupBy` function and rendering section headers.  Ensure keyboard interaction: ArrowDown/ArrowUp moves through options, Enter selects, Esc closes the listbox, and `Home`/`End` jump to the first and last option.  Add ARIA roles (`combobox`, `listbox`, `option`) and attributes (`aria-expanded`, `aria-controls`, `aria-selected`) for accessibility.

3. **Tokenize the CSS module**.  Refactor `DynSelect.module.css` so all styling is controlled by component‑scoped CSS variables with proper fallback.  For example:

    ```css
    /* Component container sets tokens with three‑level fallback */
    .container {
      --dyn-select-bg: var(--dyn-select-bg-base, var(--dyn-color-surface, #ffffff));
      --dyn-select-border: var(--dyn-select-border-base, var(--dyn-color-border, #d0d7de));
      --dyn-select-text: var(--dyn-select-text-base, var(--dyn-color-text-primary, #24292e));
      /* Add tokens for hover, active, disabled states, tag backgrounds, and focus ring */
    }

    /* Dark mode override scoped locally */
    @media (prefers-color-scheme: dark) {
      .container {
        --dyn-select-bg: var(--dyn-select-bg-dark, var(--dyn-color-surface-dark, #0d1117));
        --dyn-select-border: var(--dyn-select-border-dark, var(--dyn-color-border-dark, #30363d));
        --dyn-select-text: var(--dyn-select-text-dark, var(--dyn-color-text-primary-dark, #c9d1d9));
        /* … other dark tokens … */
      }
    }

    /* Tag appearance for multi‑select */
    .tag {
      background-color: var(--dyn-select-tag-bg, var(--dyn-color-background-muted, #eaecef));
      color: var(--dyn-select-tag-text, var(--dyn-color-text-primary, #24292e));
      /* Add border, padding, radius tokens */
    }
    ```

    Do **not** use `:root` to apply dark‑mode tokens.  Always scope overrides to the component’s container (`.container`).  Provide tokens for states (hover, active, disabled) and ensure each token has a three‑level fallback: component token → semantic token → foundation token.  Add classes for variants (e.g., `.multi` for multi‑select, `.open` for open state, `.disabled` for disabled) and define styling accordingly.

4. **Add missing features and fix bugs**:
   * Implement the search input for `searchable` mode.  Debounce the `onSearchChange` callback and filter options based on the current search term.  When `searchable` is false, hide the search input.
   * Render tags for multi‑select values with a close icon; allow removing tags via both mouse and keyboard (Backspace/Delete when the input is empty).  When the number of selected items exceeds `maxTags`, display the first `maxTags` tags and a summary indicator like “+3 more”.
   * Support grouped options by grouping them according to the `groupBy` function.  Render group headers and apply appropriate ARIA attributes (use `role="group"` on sections if needed).  Allow custom rendering via a `renderOption` prop if defined in the spec (check docs).
   * Fix i18n mismatches by exposing a `labels` prop or by integrating with an i18n hook (e.g., use `i18n.t('dynSelect.clear', 'Clear')`).  Update tests accordingly to use the same strings.
   * Provide a fully controlled API: accept `value`/`onChange` props (for single and multi‑select) and `defaultValue` for uncontrolled mode.  Ensure the component calls `onChange` with the new value(s) whenever selection changes.

5. **Testing**.  Expand the test suite (`DynSelect.test.tsx`) to cover at least 80 % of the API surface.  Add tests for:
   * All ref methods (`focus`, `open`, `close`, `clear`, `getValue`, `setValue`).
   * Search functionality: filtering results, custom placeholder text, and accessibility of the search input.
   * Multi‑select tag behaviour: rendering tags, removing with mouse and keyboard, respecting `maxTags`.
   * Grouped options: rendering group headers and navigating through grouped items.
   * i18n: passing custom `labels` and verifying strings in the UI and tests.
   * Dark mode styling: verifying that component tokens override correctly in dark mode by inspecting computed styles.
   * Accessibility: using `jest-axe` to ensure there are no basic a11y violations, and verifying ARIA roles and attributes.

6. **Documentation and Storybook**.  Update the README and add comprehensive Storybook stories demonstrating:
   * Single select vs. multi select modes.
   * Searchable dropdown with a lot of items.
   * Clearable selection and max tag display.
   * Grouped options and custom rendering.
   * Dark mode demonstration with theme toggler.
   * i18n variations using the `labels` prop or i18n provider.
   Each story should document props, default values and provide interactive controls.  Use JSDoc comments to document the types file.

7. **Git workflow**.  Work on a feature branch (e.g., `feat/refactor-dyn-select`).  Commit in logical chunks: types definitions, component refactoring, CSS tokenization, feature implementation, tests and documentation.  Link the pull request to the audit issues and update the implementation summary.  Seek review from a teammate and address feedback before merging.

## Validation Checklist

- [ ] Component tokens use the `--dyn-select-*` naming convention and follow a three‑level fallback pattern for both base and dark mode values.
- [ ] `DynSelect.types.ts` defines all props and a `DynSelectRef` interface with documented methods, and the component forwards the ref correctly.
- [ ] The React component implements single and multi select, search, clearable tags, grouped options, controlled/uncontrolled usage, and exposes proper callbacks.
- [ ] CSS module defines classes and variables for all variants (multi, searchable), states (open, disabled, hover, active), tags and dark mode; no `:root` usage.
- [ ] The component supports internationalization via a `labels` prop or integration with an i18n library; tests match these strings.
- [ ] Unit tests cover at least 80 % of the API surface, including ref methods, search filtering, multi‑select behaviour, grouping, i18n and dark mode.
- [ ] Storybook stories demonstrate all major features and serve as living documentation for props and usage.
- [ ] The component is exported correctly from the package’s index file and included in the component inventory.
