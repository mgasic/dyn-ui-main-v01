# DynTextArea – Implementation Guide

## Component Overview

`DynTextArea` is an enhanced multiline text input that supports controlled and uncontrolled modes, custom rows, resize directions, character counters, maximum rows with auto‑expand, status states (disabled, error, readOnly), optional label and help text via `DynFieldContainer`, and decorative icons.  The component should align with form controls across Dyn UI, using design tokens for sizing, spacing, borders and focus styles.  It must be fully accessible and support dark mode and high contrast.

## Current State Analysis

The audit summary rates DynTextArea at **88 %** ready【226851066994460†L65-L80】.  The component has strong accessibility (92 %), a rich set of props, proper use of CSS modules with `--dyn-text-area-*` tokens and robust tests.  Only minor improvements are recommended: expand test coverage for edge cases (e.g., max length and auto‑resize), add JSDoc comments, and tokenise the focus ring and border radius【226851066994460†L146-L165】.  There is also an opportunity to add optional features such as `maxRows`, a character counter position and custom resize handling.

## Implementation Instructions

1. **Extend API** – In `DynTextArea.types.ts`, add optional props:

   ```ts
   export interface DynTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
     /** Minimum number of rows to display; default 3. */
     rows?: number;
     /** Maximum number of rows before the textarea scrolls; undefined means no limit. */
     maxRows?: number;
     /** Allows resizing: 'none' | 'both' | 'horizontal' | 'vertical'; default 'vertical'. */
     resize?: 'none' | 'both' | 'horizontal' | 'vertical';
     /** Shows a character counter; default false. */
     showCounter?: boolean;
     /** Places the counter: 'inside' | 'outside' | 'below'; default 'below'. */
     counterPosition?: 'inside' | 'outside' | 'below';
     /** Callback when value changes. */
     onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
     className?: string;
   }
   ```

   Support controlled and uncontrolled values via `value` and `defaultValue`.  Provide a `ref` to the underlying `<textarea>` using `forwardRef`.

2. **Tokenise focus and border** – Define tokens such as `--dyn-text-area-border-radius`, `--dyn-text-area-border-color`, `--dyn-text-area-focus-ring-color`, and `--dyn-text-area-focus-ring-width`.  Use a three‑level fallback and provide dark mode and high contrast overrides.  Remove any hard‑coded values for border radius or ring width and instead reference tokens【226851066994460†L146-L165】.

3. **Implement auto‑resize** – If `maxRows` is provided, implement logic to automatically adjust `rows` as the user types up to `maxRows`, then allow scroll.  Use a hidden shadow textarea to measure height.  Respect the `resize` prop by applying CSS `resize` property accordingly.

4. **Character counter** – When `showCounter` is true, render a counter showing `value.length / maxLength` at the specified `counterPosition`.  Use tokens for font size and colour.

5. **Accessibility** – Use `aria-invalid` when `error` prop is true; allow `aria-describedby` to link to help or error text.  Provide `aria-live="polite"` on the counter if it’s visible, so screen readers announce remaining characters.  Support `disabled` and `readOnly` attributes properly.

6. **Tests** – Expand the test suite to cover auto‑resize, `maxRows`, resize directions, character counter positions, dark mode, high contrast and accessibility properties【226851066994460†L65-L80】.  Achieve ≥ 90 % coverage.

7. **Storybook and docs** – Add stories for auto‑expand and fixed height; show character counter variations; different resize options; disabled and readOnly states; dark and high contrast.  Document new props and tokens in README and add JSDoc comments.

## Validation Checklist

- [ ] Design tokens include border radius and focus ring variables for the textarea; tokens use three‑level fallback and dark/high contrast overrides【226851066994460†L146-L165】.
- [ ] Props support `rows`, `maxRows`, `resize`, `showCounter`, `counterPosition` and controlled/uncontrolled value.
- [ ] Component automatically resizes up to `maxRows` and respects the `resize` CSS property.
- [ ] Character counter is displayed when enabled, positioned according to `counterPosition`, and uses tokens for styling.
- [ ] Accessibility features: `aria-invalid`, `aria-live`, `aria-describedby` supported; disabled and readOnly states handled.
- [ ] Expanded tests cover auto‑resize, character counter, dark mode and high contrast【226851066994460†L65-L80】.
- [ ] Storybook examples illustrate new features; documentation and JSDoc updated.
