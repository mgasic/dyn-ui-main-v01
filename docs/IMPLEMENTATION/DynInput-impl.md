# DynInput – Implementation Guide

## Component Overview

DynInput is an advanced input component providing text, number, currency and masked input with built‑in validation and formatting. It wraps `DynFieldContainer` for labels, help text and error display, and supports features such as clear buttons, spin buttons, icons and accessibility attributes.

## Current State Analysis

**Existing files:** `DynInput.tsx`, `DynInput.module.css`, `DynInput.test.tsx`, `DynInput.stories.tsx`, plus shared validation and masking hooks.

- The component file is large (~22 KB) and handles many responsibilities including currency formatting, masking, validation and state management【283672116327748†L41-L106】.
- There is an unused backup file (`DynInput.old.tsx`) and helper functions within `DynInput.tsx` that could be extracted.
- The audit scores the component 78 % and suggests improvements: split the large file into smaller modules, increase test coverage beyond 70 %, and remove dead code.
- CSS tokens are mostly compliant but should be reviewed for proper `--dyn-input-*` naming and 3‑level fallback pattern. Some classes still use generic names like `input--focused` that need tokens.
- Dark‑mode tokens are missing in some parts of CSS, and responsive adjustments could be improved.

**Identified gaps:**

- Refactor the component into smaller units: a base `InputBase` component, currency helpers, mask helpers and spin button logic.
- Extract helper functions (e.g. `resolveCurrencyConfig`, `sanitizeCurrencyInput`) into separate utilities under `src/utils/`.
- Add missing tokens and dark‑mode overrides in the CSS module.
- Remove the backup `.old.tsx` file and unused props.
- Improve test coverage to cover currency input, masked input, validation, spin buttons, focus and blur events, and dark mode.
- Update storybook with examples for each variant and document the available props.

## Implementation Instructions

### 1. File Refactoring

1. **Create a base component** `InputBase.tsx` in the same directory. This file should handle generic input rendering, including the label, icon, clear button and spin buttons. The base component accepts props like `value`, `onChange`, `onBlur`, `type`, `mask`, and handles only the UI layer.

2. **Extract utilities**: move currency functions (`resolveCurrencyConfig`, `parseCurrencyLikeValue`, `formatCurrencyValue`, `sanitizeCurrencyInput`, `processCurrencyChange`) into `src/utils/currency.ts`. Move mask functions into `src/utils/mask.ts`. Update imports in the main component.

3. **Simplify `DynInput.tsx`**: import the helpers and the `InputBase` component. Compose the final component by managing validation and formatting around `InputBase`, forwarding refs and exposing imperative handles. Remove unused legacy props and delete `DynInput.old.tsx`.

4. **Define types**: create `DynInput.types.ts` if not already present. Define discriminated unions for the `type` prop (e.g. `'text' | 'number' | 'currency' | 'password' | 'email'`) to enable type narrowing.

### 2. CSS Tokens

- Audit `DynInput.module.css`:
  - Define tokens such as `--dyn-input-border-color-default`, `--dyn-input-border-color-hover`, `--dyn-input-border-color-error`, `--dyn-input-radius`, `--dyn-input-padding-sm`, etc., with 3‑level fallbacks.
  - Add dark‑mode overrides under `@media (prefers-color-scheme: dark)` for background, border and text colours.
  - Update class names to reflect token usage; for example, replace hard‑coded border colours with `var(--dyn-input-border-color-default)`.
  - Provide responsive adjustments if necessary (e.g. reduced padding on small screens).

### 3. Testing

- Extend `DynInput.test.tsx` to achieve > 90 % coverage:
  - Test currency input formatting for different locales and precision values.
  - Test masked input to ensure mask and unmask functions work correctly.
  - Test validation scenarios: required, minLength, maxLength, pattern, custom validator.
  - Test spin buttons for number and currency types (increment and decrement behaviours).
  - Test clearing input via the clear button.
  - Use `jest-axe` for accessibility and test dark‑mode rendering by mocking `prefers-color-scheme: dark`.
  - Test focus and blur events to ensure proper focus styling and error clearing.

### 4. Documentation and Stories

- Update `DynInput.stories.tsx` to show examples of each input type (text, number, currency, password, masked) with controls for validation, icons, clear button and spin buttons.
- Document the new helper utilities (`currency.ts` and `mask.ts`) via JSDoc or README updates.

### 5. Git Workflow

- Branch: `refactor/component-dyninput`.
- Suggested commit messages:
  - `refactor(DynInput): split component into base and helpers`.
  - `feat(DynInput): add 3-level token fallbacks and dark mode`.
  - `test(DynInput): improve coverage for currency and masked inputs`.
  - `docs(DynInput): update stories and documentation`.

### 6. Validation Checklist

- [ ] Large file split into smaller units with clear responsibilities.
- [ ] Helper utilities extracted and imported in `DynInput.tsx`.
- [ ] CSS tokens follow the `--dyn-input-*` pattern with dark‑mode and responsive overrides.
- [ ] Tests cover all features and achieve at least 90 % coverage.
- [ ] Storybook stories updated to reflect new API.
- [ ] Removed backup files and updated exports.