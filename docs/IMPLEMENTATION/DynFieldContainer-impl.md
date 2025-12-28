# DynFieldContainer – Implementation Guide

## Component Overview

`DynFieldContainer` wraps form controls (inputs, selects, text areas) with a label, optional description/help text, required/optional indicators and error messages.  It ensures consistent spacing and alignment between labels and fields and integrates with form validation.  It should provide props for `label`, `helpText`, `errorText`, `required`, `optional`, `orientation` (vertical or horizontal), `size` (sm/md/lg) and alignments.  The container itself should not impose semantics beyond grouping; field semantics remain on the child control.  The component should be accessible (linking labels to controls via `htmlFor` and `aria-describedby`) and support dark mode and high contrast.

## Current State Analysis

No audit exists for DynFieldContainer, but inspection of its CSS reveals that design tokens are defined globally at the `:root` level rather than being scoped to the component【838460634379423†L5-L34】.  The module defines variables for colours, typography, spacing and transitions, along with classes for error state, required and optional indicators, high contrast and dark mode【838460634379423†L84-L110】【838460634379423†L156-L194】.  The component renders a `<div>` wrapper with a label and helper/error text and passes children to a `field` slot.  Current shortcomings include:

- Tokens could leak globally because they are defined in `:root`; they should be scoped to `.dyn-field-container`.
- Only vertical orientation is supported; horizontal alignment (label and field side by side) is not.
- No props for size variants; spacing is fixed.
- Accessibility could be improved by exposing `id` and linking label via `htmlFor`, and by using `aria-describedby` for help and error text.
- Tests and documentation are limited; there is no Storybook for this component.

## Implementation Instructions

1. **Refactor tokens** – Move all token definitions under `.dyn-field-container` and prefix them with `--dyn-field-container-*`.  Provide variables such as:
   - `--dyn-field-container-label-color`, `--dyn-field-container-helper-color`, `--dyn-field-container-error-color`
   - `--dyn-field-container-label-font-size`, `--dyn-field-container-helper-font-size`
   - `--dyn-field-container-margin-bottom`
   - `--dyn-field-container-gap`
   - `--dyn-field-container-required-color`, `--dyn-field-container-optional-color`
   Ensure tokens have three‑level fallback and define dark mode and high contrast overrides【838460634379423†L156-L194】.

2. **Add size and orientation props** – Modify `DynFieldContainer.tsx` and `types.ts` to accept `size` (`sm`, `md`, `lg`) and `orientation` (`vertical`, `horizontal`).  Adjust classes accordingly:
   - Vertical orientation stacks label, field and helper/error text.
   - Horizontal orientation places the label and field side by side; use CSS grid or flex.  Provide tokens for label width and gap.

3. **Improve accessibility** – Accept an `id` prop that is passed to the underlying field.  Use `htmlFor={id}` on the `<label>` and `aria-describedby` referencing the helper/error text IDs.  When `errorText` is provided, set `role="alert"` and `aria-live="polite"` on the error message.  Add `aria-required` when `required` is true.

4. **API enhancements** – Define a `DynFieldContainerProps` interface:

   ```ts
   export interface DynFieldContainerProps extends React.HTMLAttributes<HTMLDivElement> {
     id: string;
     label?: string | React.ReactNode;
     helpText?: string | React.ReactNode;
     errorText?: string | React.ReactNode;
     required?: boolean;
     optional?: boolean;
     size?: 'sm' | 'md' | 'lg';
     orientation?: 'vertical' | 'horizontal';
     children: React.ReactElement;
     className?: string;
   }
   ```

   Validate that `required` and `optional` are not both true.

5. **Tests** – Write tests to ensure labels are correctly associated with inputs via `htmlFor`; help and error texts are connected via `aria-describedby`; required and optional indicators show appropriate tokens; orientation and size classes apply correct spacing; dark mode and high contrast overrides apply【838460634379423†L84-L110】【838460634379423†L156-L194】.

6. **Storybook and docs** – Add stories demonstrating vertical and horizontal layouts with various sizes, presence/absence of help and error text, required and optional indicators, dark mode and high contrast.  Document the API and tokens in README and add JSDoc comments.

## Validation Checklist

- [ ] Tokens scoped to `.dyn-field-container` with prefix and three‑level fallback; dark mode and high contrast overrides defined【838460634379423†L156-L194】.
- [ ] Props include `id`, `label`, `helpText`, `errorText`, `required`, `optional`, `size` and `orientation`.
- [ ] Horizontal and vertical orientations implemented; size variants adjust spacing and typography.
- [ ] Accessibility: label uses `htmlFor` with provided `id`; `aria-describedby` links to help/error; `role="alert"` and `aria-live` used for errors; `aria-required` set.
- [ ] Tests cover association of labels and descriptions, orientation and size, required/optional indicators and dark/high contrast states.
- [ ] Storybook examples illustrate all variations; documentation and JSDoc updated.
