# DynContainer – Implementation Guide

## Component Overview
DynContainer is a versatile layout component that groups child elements with configurable spacing, alignment, justification, background and shadow.  It acts as a flexible wrapper similar to a `<div>` but with built‑in styling and utility props.  Variants include spacing (none, xs, sm, md, lg, xl), size (xs, sm, md, lg), flex direction (row or column), alignment (`start`, `center`, `end`, `stretch`), justification, background colour and border/shadow options.  The component is intended to be the workhorse layout primitive in Dyn UI.

## Current State Analysis
The audit rates DynContainer at approximately **68 %**, describing it as *moderate‑poor* and not ready for Phase 1 deployment【141744942687013†L1-L25】.  The component uses design tokens with the `--dyn-container-*` prefix and applies a three‑level fallback pattern for many values【141744942687013†L118-L149】.  It offers flexible spacing, size, alignment, justification, background, border and shadow options using props, and internally uses `forwardRef` and `useMemo` for performance【141744942687013†L118-L149】.  However, three critical issues block adoption:

1. **Low test coverage** – Only nine tests cover roughly half of the component’s behaviours【141744942687013†L26-L76】.  There are no tests for spacing, size, alignment, background or dark mode variants, resulting in untested edge cases.
2. **Poor accessibility** – The component renders a bare `<div>` without semantic roles or landmarks【141744942687013†L79-L104】.  There are no ARIA attributes, no link between container and labelled headings, and no focus management for scrollable containers.
3. **Weak type safety** – Props are loosely typed and not exported; the component does not accept an `as` prop for custom elements and there is confusion between default and named exports【141744942687013†L108-L116】.  Consumers cannot easily discover the available variants.

The audit warns that using DynContainer as‑is carries moderate risk and recommends at least 6–7 hours of remediation before shipping【141744942687013†L170-L180】【141744942687013†L199-L208】.

## Implementation Instructions
1. **Expand test coverage** – Build a comprehensive test suite covering all prop combinations: spacing sizes, size variants (`xs`–`lg`), direction (`row`/`column`), alignment and justification options, wrapping behaviour, background colours, border and shadow variants, and dark mode and high contrast states.  Include tests for responsive breakpoints (mobile vs desktop) and zero‑child scenarios.  Add accessibility tests verifying that correct roles are applied and that containers with scroll behaviour are focusable.  Aim for ≥ 80 % coverage【141744942687013†L26-L76】.

2. **Improve accessibility** – Allow consumers to specify the underlying element via an `as` prop (default `div`).  When rendering a generic container, apply `role="group"`; if a semantic grouping is intended, allow `role="region"` with an `aria-label` or `aria-labelledby` prop.  For scrollable containers, add `tabIndex={0}` to make them keyboard focusable.  Ensure colour contrast meets WCAG guidelines.  Provide optional props for `aria-labelledby` and `aria-describedby` to link the container with headings or explanatory text【141744942687013†L79-L104】.

3. **Enhance type safety** – Define and export a `DynContainerProps` interface capturing all layout options:

   ```ts
   export interface DynContainerProps extends React.HTMLAttributes<HTMLElement> {
     as?: keyof JSX.IntrinsicElements;
     children: React.ReactNode;
     spacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
     size?: 'xs' | 'sm' | 'md' | 'lg';
     direction?: 'row' | 'column';
     align?: 'start' | 'center' | 'end' | 'stretch';
     justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
     background?: 'none' | 'muted' | 'primary' | 'secondary';
     border?: 'none' | 'solid' | 'dashed';
     shadow?: 'none' | 'small' | 'medium' | 'large';
     wrap?: boolean;
     className?: string;
     ariaLabel?: string;
     ariaLabelledby?: string;
     ariaDescribedby?: string;
   }
   ```

   Use generics and `forwardRef` to type the component correctly; export both the component and the props【141744942687013†L108-L116】.

4. **Refactor CSS and tokens** – Confirm that every layout property maps to a design token.  Define tokens such as `--dyn-container-gap-xs`–`xl`, `--dyn-container-size-xs`–`lg`, `--dyn-container-bg-muted`, `--dyn-container-bg-primary`, `--dyn-container-border-width`, `--dyn-container-border-color`, `--dyn-container-shadow-small`, etc.  Ensure tokens have 3‑level fallback and provide dark mode and high contrast variants【141744942687013†L118-L149】.  Remove any hard‑coded pixel values.

5. **Storybook and documentation** – Add JSDoc comments to all exported types and to the component; include usage examples demonstrating different combinations of props.  Expand Storybook to show each spacing size, size, direction, alignment and justification combination, as well as background and border/shadow variants.  Provide examples using the `as` prop to render semantic containers such as `<section>` or `<article>`, and examples showing dark mode and responsiveness.  Update the README with an API table and token reference.

6. **Review exports and naming** – Avoid default exports; instead, export `DynContainer` as a named export along with its types.  Document the export names in the README.  Ensure the component resides under `packages/dyn-ui-react/src/components/DynContainer` and is re‑exported from the package index.

## Validation Checklist
Ensure these criteria are satisfied before releasing DynContainer:

- [ ] Test suite covers ≥ 80 % of branches and exercises all spacing, size, direction, align, justify, background, border/shadow and wrap options across light, dark and high contrast modes【141744942687013†L26-L76】.
- [ ] Accessibility is addressed: the component exposes an `as` prop, applies appropriate `role` attributes, supports `aria-label`, `aria-labelledby` and `aria-describedby`, provides focus management for scrollable containers and meets colour contrast guidelines【141744942687013†L79-L104】.
- [ ] `DynContainerProps` defines all layout variants and is exported; no loose `any` types remain【141744942687013†L108-L116】.
- [ ] Design tokens exist for spacing, size, background, border and shadow variants; tokens follow the three‑level fallback pattern and include dark mode and high contrast overrides【141744942687013†L118-L149】.
- [ ] Storybook stories and documentation illustrate every prop combination, including semantic element usage, dark mode and responsive behaviour; JSDoc and README updated.
- [ ] Named exports are used consistently in the package’s `index.ts`.
