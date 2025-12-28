# DynLabel – Implementation Guide

## Component Overview
DynLabel is an accessible label component used to annotate form controls or other UI elements.  It can display a text label, optional required indicator (asterisk), help text or description, and an error message.  The component should support different sizes and allow custom styling via design tokens.  When associated with a form control, the `htmlFor` prop must link the label to the control’s `id` for screen reader support.  Variants include disabled state styling, error state styling and optional inline positioning.

## Current State Analysis
DynLabel is mostly production‑ready, scoring around 78%.  The audit notes that CSS tokens are used correctly, dark‑mode support is good and the React architecture is sound.  However, the TypeScript definitions are incomplete (missing props such as `required`, `helpText` and `error`), and unused `.scss` and `.bak` files remain in the component directory【234322296600479†L52-L71】.  Storybook examples are limited and do not showcase disabled or help‑text states, and test coverage is lacking.  The audit recommends expanding types, removing legacy files and adding more documentation and tests【234322296600479†L193-L223】.

## Implementation Instructions
1. **Clean up legacy files** – Delete unused `.scss` or `.bak` files from the component directory and ensure that all styles live in a `.module.css` file.  This reduces maintenance overhead and avoids confusion【234322296600479†L52-L71】.

2. **Define label tokens** – Create `--dyn-label-*` tokens for colour, font size, font weight, margin, required indicator colour, disabled colour, help‑text colour and error colour.  Provide three‑level fallbacks referencing global typography and colour tokens.  Define dark‑mode variants within `.dark .dyn-label`.  Suggested tokens:

   - `--dyn-label-color` / `--dyn-label-font-size` / `--dyn-label-font-weight`  
   - `--dyn-label-required-color` / `--dyn-label-required-margin-left`  
   - `--dyn-label-disabled-color`  
   - `--dyn-label-help-color` / `--dyn-label-help-font-size`  
   - `--dyn-label-error-color`  

3. **Enhance TypeScript definitions** – Expand `DynLabelProps` to include: `children: ReactNode` (label text), `htmlFor?: string`, `required?: boolean`, `helpText?: ReactNode`, `error?: ReactNode`, `disabled?: boolean`, `size?: 'small' | 'medium' | 'large'`, `inline?: boolean`, `className?`.  Export the type.  Ensure the component uses `forwardRef<HTMLLabelElement, DynLabelProps>` and spreads additional props onto the `<label>` element.

4. **Refactor the component and CSS** – Use `.dyn-label` as the root class and BEM sub‑classes `.dyn-label__text`, `.dyn-label__required`, `.dyn-label__help`, `.dyn-label__error`.  Apply tokens to colours and spacing and add modifier classes for size, disabled and inline positioning.  Render help text and error messages within `<small>` elements with appropriate ARIA associations.  When `error` is provided, set `aria-invalid="true"` on the associated form control; optionally accept an `errorId` to link the message.  Ensure the required indicator is hidden from screen readers by setting `aria-hidden="true"`.

5. **Testing and documentation** – Write unit tests covering the required indicator, help text, error state, disabled state and size variants.  Add tests ensuring `htmlFor` is passed correctly and that the component renders with and without children.  Provide Storybook examples demonstrating default usage, required labels, labels with help text or errors and dark‑mode styling.  Write JSDoc comments for props and update the README section with an API table and token reference【234322296600479†L193-L223】.

## Validation Checklist
Confirm the following before merging DynLabel:

- [ ] Legacy `.scss` and `.bak` files have been removed【234322296600479†L52-L71】.
- [ ] A full set of `--dyn-label-*` tokens (with dark‑mode overrides) is defined and used in the CSS module.
- [ ] `DynLabelProps` includes `required`, `helpText`, `error`, `disabled`, `size`, `inline` and `htmlFor`, and the component uses `forwardRef` and spreads props.
- [ ] The CSS module implements BEM classes (`.dyn-label`, `.dyn-label__required`, etc.) and supports sizes, disabled and inline variants.
- [ ] Tests cover required indicators, help text, error states, disabled state, size variants and the `htmlFor` behaviour.
- [ ] Storybook examples demonstrate all states and dark‑mode styling; the README and JSDoc are updated【234322296600479†L193-L223】.
