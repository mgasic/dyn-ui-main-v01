# DynDatePicker – Implementation Guide

## Component Overview

DynDatePicker is an advanced date input component that allows users to select dates via an input field with parsing of natural language (e.g., “today”, “tomorrow”) and optionally a calendar popover.  It must support specifying minimum and maximum dates, localisation of formats and labels, validation, keyboard navigation and accessible ARIA roles.  The component exposes a ref with methods like `focus`, `validate`, `getValue`, `setValue` and `clear` to integrate with form libraries.  It must be fully tokenised and theme‑aware to support dark mode and high contrast.

## Current State Analysis

The code for DynDatePicker exists at `packages/dyn-ui-react/src/components/DynDatePicker`.  According to the audit report (`docs/COMPONENT_AUDITS/DynDatePicker_AUDIT.md`) dated December 25 2025, the component is flagged **Do Not Deploy** because of systemic issues:

* **Types file is minimal** – `DynDatePicker.types.ts` merely re‑exports a shared field type.  It lacks local prop definitions for `format`, `locale`, `minDate`, `maxDate`, `customParser`, and a ref interface with methods like `focus`, `validate`, `getValue`, `setValue` and `clear`【69902854305848†L30-L69】.
* **Dark mode CSS bug** – As with DynSelect and DynChart, the CSS module uses `:root` inside a dark‑mode media query to set component tokens, leaking values globally【69902854305848†L75-L140】.
* **Internationalisation mismatch** – Tests are written expecting Portuguese labels (e.g., “Abrir calendário”, “Hoje”), while the component uses English strings.  There is no `labels` prop or i18n integration to control UI text【69902854305848†L144-L205】.
* **Incomplete validation** – The current validation logic for `minDate`/`maxDate` silently aborts updates without informing the user; there is no error state or message, and no integration with the form validation API【69902854305848†L239-L275】.
* **Test coverage gap** – Only 60 % of functionality is tested.  Missing tests include ref methods, date range validation, custom parser, locale‑specific parsing, natural language parsing and dark mode rendering【69902854305848†L282-L303】.
* **Documentation** – The usage of the `customParser` prop is undocumented, and Storybook does not demonstrate all features【69902854305848†L307-L337】.

## Implementation Instructions

1. **Define comprehensive types**.  In `DynDatePicker.types.ts`, define an interface `DynDatePickerProps` that extends `BaseComponentProps` and `AccessibilityProps`.  Include:
   * `format?: string` – date format string (e.g., `'yyyy-MM-dd'` or `'dd/MM/yyyy'`).
   * `locale?: string` – BCP‑47 locale code for formatting and parsing.
   * `minDate?: Date | string` and `maxDate?: Date | string` – optional boundaries.
   * `customParser?: (input: string) => Date | null` – optional function to parse custom input tokens (“tmr”, “next Monday”); document usage with JSDoc and examples.
   * `labels?: { openCalendar?: string; today?: string; clear?: string; }` – override default UI strings for internationalisation.
   * `value`/`defaultValue` for controlled/uncontrolled usage and `onChange`, `onBlur`, `onFocus`, `onError` callbacks.
   * `disabled?: boolean` – disable input and calendar interactions.
   Define a `DynDatePickerRef` with methods: `focus(): void`, `validate(): Promise<boolean>`, `getValue(): Date | null`, `setValue(date: Date | null): void`, `clear(): void`【69902854305848†L62-L68】.

2. **Refactor the React component**.  Update `DynDatePicker.tsx` to use the new props and to forward a ref typed as `DynDatePickerRef`.  Ensure that the component uses controlled state when `value` is provided and uncontrolled state when not.  Integrate natural language parsing and fallback to `customParser` if provided.  When the calendar popover is used, manage its open state via internal state and provide `onCalendarOpen`/`onCalendarClose` callbacks if necessary.  Replace hard‑coded strings with lookups from `labels` or an i18n hook.

3. **Implement validation logic**.  Enhance the `handleInputChange` function to validate against `minDate` and `maxDate`.  Instead of silently discarding invalid values, set an error state and optionally call an `onError` callback.  Display an error message using a tokenised CSS class (e.g., `.error` with `--dyn-date-picker-error-text`).  Provide `validate()` in the ref implementation to allow parent forms to trigger validation programmatically.

4. **Tokenise the CSS module**.  Refactor `DynDatePicker.module.css` so that all styling is controlled via tokens scoped to the component container.  Define variables for input background, border, text, placeholder, focus ring, calendar popover background, calendar border, selected day background and text, hover states, disabled state, and error message colours.  For example:

    ```css
    .container {
      --dyn-date-picker-input-bg: var(--dyn-date-picker-input-bg-base, var(--dyn-color-surface, #ffffff));
      --dyn-date-picker-input-border: var(--dyn-date-picker-input-border-base, var(--dyn-color-border, #d0d7de));
      --dyn-date-picker-input-text: var(--dyn-date-picker-input-text-base, var(--dyn-color-text-primary, #24292e));
      --dyn-date-picker-calendar-bg: var(--dyn-date-picker-calendar-bg-base, var(--dyn-color-surface, #ffffff));
      /* ... tokens for selected day, hover, disabled, error text, etc. ... */
    }

    @media (prefers-color-scheme: dark) {
      .container {
        --dyn-date-picker-input-bg: var(--dyn-date-picker-input-bg-dark, var(--dyn-color-surface-dark, #0d1117));
        --dyn-date-picker-input-border: var(--dyn-date-picker-input-border-dark, var(--dyn-color-border-dark, #30363d));
        --dyn-date-picker-input-text: var(--dyn-date-picker-input-text-dark, var(--dyn-color-text-primary-dark, #c9d1d9));
        --dyn-date-picker-calendar-bg: var(--dyn-date-picker-calendar-bg-dark, var(--dyn-color-surface-dark, #0d1117));
        /* … dark tokens for selected day, hover, etc. … */
      }
    }
    ```

    Scope dark‑mode overrides to `.container` rather than `:root`.  Add classes for states such as `.disabled`, `.error` and for popover open state; style them using tokens.  Provide three‑level fallbacks for all tokens.

5. **Fix internationalisation**.  Provide a `labels` prop (as described above) and replace all UI strings with values from `labels` or sensible defaults.  Alternatively, use an i18n hook (e.g., `useTranslation`) if Dyn UI has one.  Update tests to use the same strings or supply the `labels` prop when rendering in Portuguese.

6. **Expand test coverage**.  In `DynDatePicker.test.tsx`, add tests for:
   * Ref methods: focusing, validation, getting/setting value, clearing input and calendar interactions.
   * Validation logic: verifying that `minDate`/`maxDate` boundaries show error messages and prevent invalid input; ensure the `validate()` method resolves correctly when valid.
   * `customParser`: supply custom parsers and verify that natural language tokens (e.g., “today”, “tmr”) are parsed correctly and that invalid tokens return `null`.
   * Locale parsing: test that the component respects the `locale` prop and correctly formats dates using `format`.
   * Natural language parsing: test built‑in phrases like “tomorrow” and ensure they work across locales.
   * Dark mode rendering: verify that tokens for input and calendar backgrounds change appropriately in dark mode.
   * Error handling and error message styling.
   * Accessibility: verify ARIA attributes on the input (`aria-label`, `role="combobox"`), the calendar dialog (`role="dialog"`, `aria-modal`), and keyboard navigation within the calendar grid.  Use `jest-axe` to ensure no accessibility violations.

7. **Documentation and Storybook**.  Update the README with a detailed API reference for DynDatePicker.  Include examples of using `minDate`, `maxDate`, `format`, `locale`, `customParser` and `labels`.  Add Storybook stories for:
   * Basic usage with placeholder and calendar popover.
   * Custom date formats and locales.
   * Min/max date restrictions.
   * Natural language input and custom parser functions.
   * Error states and validation messages.
   * Dark mode demonstration.
   Document the ref API and show how to integrate the component into a form with validation.

8. **Git workflow**.  Create a branch (e.g., `feat/refactor-dyn-date-picker`).  Commit changes in logical increments: types definitions, component refactor, validation logic, tokenised CSS, i18n integration, tests and documentation.  Reference the audit report in your pull request description and update the master index and implementation summary when complete.

## Validation Checklist

- [ ] All styling is controlled via `--dyn-date-picker-*` tokens with three‑level fallbacks, and dark mode tokens are scoped to the component container.
- [ ] `DynDatePicker.types.ts` defines a full `DynDatePickerProps` interface and a `DynDatePickerRef` interface; the component forwards a ref implementing these methods.
- [ ] The React component implements natural language parsing, supports `minDate`/`maxDate`, localised formats, `customParser`, and exposes error messages; all UI strings can be overridden via `labels` or i18n.
- [ ] Validation logic sets an error state when dates are out of range and provides a method `validate()` on the ref.
- [ ] The CSS module defines tokens for input and calendar styling, with classes for error and disabled states; no global `:root` usage.
- [ ] Unit tests cover at least 80 % of the API, including validation, ref methods, i18n, natural language parsing, dark mode and accessibility.
- [ ] Storybook stories demonstrate all features and document props and ref usage.
- [ ] Exports and documentation are updated in the master index and implementation summary.
