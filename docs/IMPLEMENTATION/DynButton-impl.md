# DynButton – Implementation Guide

## Component Overview

DynButton is the primary clickable element for actions. It supports variants (primary, secondary, tertiary, danger), sizes (small, medium, large), loading state, full‑width and icon‑only modes. It provides accessibility features such as proper ARIA labels for icon buttons and exposes events like onClick, onBlur and onKeyDown.

## Current State Analysis

**Existing files:** `DynButton.tsx`, `DynButton.types.ts`, `DynButton.module.css`, `DynButton.test.tsx`, `DynButton.stories.tsx`.

- The React component implements extensive props and accessibility features, using helpers like `generateId` and dynamic class names. It supports icon‑only buttons with proper ARIA labels【243587807435540†L86-L103】.
- The CSS module defines styling tokens for kinds, sizes, danger state, loading spinner, full‑width and mobile variants. Some tokens still rely on legacy names and lack dark‑mode fallbacks.
- Tests cover default rendering, prop variations and event handling, but lack dark‑mode and high‑contrast checks.
- The audit notes a backup file (`DynButton.old.tsx`) should be deleted, some helper functions could be moved to `utils/`, and test coverage should be improved.

**Identified gaps:**

- Dark‑mode tokens are missing in the CSS module; unify token naming to the `--dyn-button-*` pattern and add 3‑level fallbacks.
- Some classes reference legacy tokens or hard‑coded values.
- Tests do not cover reduced motion, dark‑mode, high contrast or keyboard focus ring.
- Documentation for props is missing or outdated.
- Helper functions `normalizeAriaLabel` and `generateIconAriaLabel` could be moved to a shared utility (`src/utils/accessibility.ts`).
- Remove stale backup files and update exports.

## Implementation Instructions

### 1. Code Refactoring

1. **Move helpers to a shared utility**: create `src/utils/accessibility.ts` and move `normalizeAriaLabel` and `generateIconAriaLabel` from `DynButton.tsx` into this file. Update imports accordingly in `DynButton.tsx` and any other component that may reuse these helpers.

2. **Delete backup files**: remove `DynButton.old.tsx` or any stale backup from the repository. Ensure `index.ts` exports only the current component.

3. **Review the component**: search for inline magic numbers or hard‑coded strings and replace them with tokens or constants defined in the CSS or the types file.

### 2. Design Token Updates

1. **Add dark‑mode variables**: in `DynButton.module.css`, define tokens such as `--dyn-button-bg-dark`, `--dyn-button-text-dark` and `--dyn-button-border-dark`. Override these in a `@media (prefers-color-scheme: dark)` block.

2. **Ensure 3‑level fallbacks**: replace any direct values with the pattern:
   ```css
   --dyn-button-radius: var(--dyn-radius-md, var(--legacy-radius-md, 8px));
   --dyn-button-padding-sm: var(--dyn-spacing-2, var(--legacy-spacing-2, 8px));
   ```

3. **Update hover and active states**: define tokens like `--dyn-button-bg-primary-hover` and apply them in the `:hover` and `:active` selectors. Ensure focus styles use a token for the outline colour.

### 3. Testing Enhancements

- Expand `DynButton.test.tsx`:
  - Use `jest-axe` to ensure no accessibility violations in the rendered button.
  - Mock `prefers-color-scheme: dark` and test dark‑mode rendering.
  - Mock `prefers-reduced-motion: reduce` and ensure animations (loading spinner) are disabled or replaced.
  - Test high‑contrast mode by setting `window.matchMedia('(prefers-contrast: more)')` and verifying that border widths and colours adjust.
  - Test keyboard navigation: ensure that pressing `Tab` moves focus to the button and the focus ring appears using the defined token.
  - Achieve at least 90 % coverage.

### 4. Documentation and Stories

- Update `DynButton.stories.tsx` to show dark‑mode variations. Use Storybook controls for `kind`, `size`, `loading`, `fullWidth` and mobile‑specific props. Document the purpose of each prop in the stories’ notes.
- Update JSDoc comments in `DynButton.tsx` and optionally add a README file in the component directory describing all props, defaults and accessibility considerations.

### 5. Git Workflow

- Branch: `refactor/component-dynbutton`.
- Suggested commit messages:
  - `refactor(DynButton): extract accessibility helpers to utils`
  - `feat(DynButton): add dark‑mode tokens and improve CSS`
  - `test(DynButton): extend test coverage and accessibility checks`
- Ensure each commit is atomic and accompanied by tests when appropriate.

### 6. Validation Checklist

- [ ] Removed backup files and moved helpers to utils.
- [ ] All tokens use the `--dyn-button-*` pattern with 3‑level fallbacks and dark‑mode overrides.
- [ ] Tests cover dark mode, reduced motion, high contrast and keyboard interaction.
- [ ] Storybook stories updated and documented.
- [ ] Export statements updated and linting passes.