# DynStepper – Implementation Guide

## Component Overview
DynStepper guides users through a sequence of steps in a process (e.g., forms, wizards).  It displays a list of step indicators (numbers, icons or labels) connected by lines.  The component supports horizontal and vertical orientations, clickable or read‑only steps, completed/error states and size variants.  Accessibility requires using lists or progress indicators with appropriate ARIA attributes (`aria-current`, `aria-disabled`, etc.), and keyboard navigation should allow moving between clickable steps.

## Current State Analysis
The audit rates DynStepper as production‑ready (82%) with strong architecture, type safety and comprehensive feature support.  CSS tokens are used well, and dark mode and responsive design are implemented.  However, a few properties are still hard‑coded: the border radius of step circles and the `flex-shrink` behaviour for tabs are not tokenised【439501997761072†L43-L69】.  The component lacks `aria-invalid` support for error states and could benefit from JSDoc examples and keyboard shortcuts for navigating steps【439501997761072†L221-L257】.  Tests are adequate but do not cover error state accessibility.

## Implementation Instructions
1. **Add missing tokens** – Introduce tokens for properties that are currently hard‑coded, such as `--dyn-stepper-border-radius` (radius of the step circles), `--dyn-stepper-flex-shrink` (controls how tabs shrink when space is limited) and `--dyn-stepper-line-color` (colour of the connecting lines).  Provide three‑level fallbacks and dark‑mode overrides.  Replace hard‑coded values in the CSS module with these tokens【439501997761072†L43-L69】.

2. **Update CSS and classes** – Ensure `.dyn-stepper` and BEM sub‑classes `.dyn-stepper__step`, `.dyn-stepper__line`, `.dyn-stepper__label` use the new tokens.  Provide modifier classes for orientation (`.vertical`) and size variations.  Add high‑contrast and reduced‑motion sections where appropriate.

3. **Enhance accessibility** – Add an `error` state to `DynStepperProps` and apply `aria-invalid="true"` to steps representing errors.  Expose a `getStepLabel` prop or allow passing a `stepAriaLabel` for screen readers.  Ensure that keyboard navigation allows users to move through clickable steps using arrow keys or dedicated shortcuts, and that completed and disabled steps are marked with `aria-disabled`.

4. **Improve TypeScript and examples** – Extend `DynStepperProps` to include `onStepClick?: (index: number) => void`, `errorIndices?: number[]`, `orientation?: 'horizontal' | 'vertical'`, `size?: 'small' | 'medium' | 'large'`, `className?`.  Provide JSDoc descriptions for each prop and add examples of horizontal and vertical steppers with different states.  Update the exports accordingly【439501997761072†L221-L257】.

5. **Expand tests and documentation** – Write tests for the error state (ensuring `aria-invalid` is applied), keyboard navigation (arrow keys and optional shortcuts), and token usage for border radius and flex‑shrink.  Add Storybook stories demonstrating error states, horizontal and vertical orientations, dark mode and reduced motion.  Include JSDoc examples in the component file and update the README.

## Validation Checklist
Finalise DynStepper when the following are met:

- [ ] New tokens (`--dyn-stepper-border-radius`, `--dyn-stepper-flex-shrink`, `--dyn-stepper-line-color`) are defined and used in the CSS module【439501997761072†L43-L69】.
- [ ] Error state support includes `aria-invalid` and optional `errorIndices` props, and tokens apply correctly.
- [ ] Orientation, size and click handling are fully typed and documented with JSDoc【439501997761072†L221-L257】.
- [ ] Keyboard navigation and optional shortcuts work and are covered by unit tests.
- [ ] Storybook examples include error states, vertical orientation, dark mode and reduced‑motion scenarios.
- [ ] Type definitions and exports are updated and tests cover token usage and accessibility.
