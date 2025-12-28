# DynFlex – Implementation Guide

## Component Overview

DynFlex is a flexible container component that wraps children and provides layout utilities similar to CSS Flexbox. It supports customizable direction, alignment, justification, wrapping, gap spacing and responsive variants. It is a core building block for aligning other Dyn UI components.

## Current State Analysis

**Existing files:** `packages/dyn-ui-react/src/components/DynFlex/DynFlex.module.css`

- Only the CSS module exists. There is no React component (`DynFlex.tsx`), no `DynFlex.types.ts`, no tests, story or index export.
- The CSS defines component tokens (gap, direction, padding, alignment, etc.) and variant classes for responsive layouts, dark mode and high contrast states【387576811075621†L0-L46】.
- Important tokens are defined at lines 29–58, e.g. `--dyn-flex-gap-default`, `--dyn-flex-direction-row`, etc.
- There are no fallback values for tokens or state suffixes, as required by the new token pattern.
- Tokens are defined in the root of the module; they should be scoped to the `.flex` selector. The audit recommends moving tokens to component scope and adding 3‑level fallback values【387576811075621†L0-L46】.

**Identified gaps:**

- Missing TypeScript component and types: the component cannot be imported in React.
- Missing index export, tests (`DynFlex.test.tsx`), and storybook (`DynFlex.stories.tsx`).
- Tokens need to be updated to follow the `--dyn-flex-*` pattern with default, responsive and state suffixes (e.g. `--dyn-flex-gap-default`, `--dyn-flex-gap-sm`, `--dyn-flex-gap-lg`).
- No props are implemented to control direction, gap, alignment, justification, wrapping and element type.
- Accessibility attributes (focus ring, reduced motion) and responsive tokens require improvements.
- No documentation or API for the component.

## Implementation Instructions

### 1. Code Changes

1. **Create the React component** at `packages/dyn-ui-react/src/components/DynFlex/DynFlex.tsx`. Use `forwardRef<HTMLDivElement, DynFlexProps>` and define props such as `direction`, `gap`, `align`, `justify`, `wrap`, `as` and `className`. The component should return the specified element (`div` by default) with computed class names:

```tsx
// File: packages/dyn-ui-react/src/components/DynFlex/DynFlex.tsx (new)
import React, { forwardRef } from 'react';
import type { DynFlexProps } from './DynFlex.types';
import { cn } from '../../utils/classNames';
import styles from './DynFlex.module.css';

export const DynFlex = forwardRef<HTMLDivElement, DynFlexProps>(
  (
    {
      direction = 'row',
      gap = 'md',
      align = 'stretch',
      justify = 'flexStart',
      wrap = false,
      className,
      children,
      as: Component = 'div',
      ...rest
    },
    ref
  ) => {
    const rootClass = cn(
      styles.flex,
      styles[`flex--${direction}`],
      styles[`flex--gap-${gap}`],
      styles[`flex--align-${align}`],
      styles[`flex--justify-${justify}`],
      {
        [styles['flex--wrap']]: wrap,
      },
      className
    );
    return (
      <Component ref={ref as any} className={rootClass} {...rest}>
        {children}
      </Component>
    );
  }
);

DynFlex.displayName = 'DynFlex';
export default DynFlex;
```

2. **Define the props interface** in `packages/dyn-ui-react/src/components/DynFlex/DynFlex.types.ts`:

```ts
// File: packages/dyn-ui-react/src/components/DynFlex/DynFlex.types.ts
export type DynFlexDirection = 'row' | 'rowReverse' | 'column' | 'columnReverse';
export type DynFlexGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type DynFlexAlign = 'stretch' | 'center' | 'start' | 'end' | 'baseline';
export type DynFlexJustify = 'flexStart' | 'flexEnd' | 'center' | 'spaceBetween' | 'spaceAround';

export interface DynFlexProps extends React.HTMLAttributes<HTMLElement> {
  direction?: DynFlexDirection;
  gap?: DynFlexGap;
  align?: DynFlexAlign;
  justify?: DynFlexJustify;
  wrap?: boolean;
  as?: keyof JSX.IntrinsicElements;
}
```

3. **Update CSS module** `DynFlex.module.css`:

   - Move all token definitions into the `.flex` selector instead of the root.
   - Rename tokens to follow the pattern `--dyn-flex-*` and provide 3‑level fallback values. Example:
     ```css
     .flex {
       /* Gap sizes */
       --dyn-flex-gap-xs: var(--dyn-spacing-1, var(--legacy-spacing-1, 2px));
       --dyn-flex-gap-sm: var(--dyn-spacing-2, var(--legacy-spacing-2, 4px));
       --dyn-flex-gap-md: var(--dyn-spacing-3, var(--legacy-spacing-3, 8px));
       --dyn-flex-gap-lg: var(--dyn-spacing-4, var(--legacy-spacing-4, 16px));
       --dyn-flex-gap-xl: var(--dyn-spacing-5, var(--legacy-spacing-5, 24px));
       /* Defaults */
       --dyn-flex-direction-default: row;
       --dyn-flex-align-default: stretch;
       --dyn-flex-justify-default: flex-start;
     }
     .flex {
       display: flex;
       gap: var(--dyn-flex-gap-md);
     }
     /* Direction variants */
     .flex--row { flex-direction: row; }
     .flex--rowReverse { flex-direction: row-reverse; }
     .flex--column { flex-direction: column; }
     .flex--columnReverse { flex-direction: column-reverse; }
     /* Gap variants */
     .flex--gap-none { gap: 0; }
     .flex--gap-xs { gap: var(--dyn-flex-gap-xs); }
     .flex--gap-sm { gap: var(--dyn-flex-gap-sm); }
     .flex--gap-lg { gap: var(--dyn-flex-gap-lg); }
     .flex--gap-xl { gap: var(--dyn-flex-gap-xl); }
     /* Alignment and justification */
     .flex--align-start { align-items: flex-start; }
     .flex--align-end { align-items: flex-end; }
     .flex--align-center { align-items: center; }
     .flex--align-baseline { align-items: baseline; }
     .flex--justify-flexEnd { justify-content: flex-end; }
     .flex--justify-center { justify-content: center; }
     .flex--justify-spaceBetween { justify-content: space-between; }
     .flex--justify-spaceAround { justify-content: space-around; }
     /* Wrap */
     .flex--wrap { flex-wrap: wrap; }
     ```
   - Provide dark mode and high‑contrast media queries as required.

4. **Create index file** `packages/dyn-ui-react/src/components/DynFlex/index.ts` to re‑export the component and types:

```ts
export { DynFlex } from './DynFlex';
export type { DynFlexProps, DynFlexDirection, DynFlexGap, DynFlexAlign, DynFlexJustify } from './DynFlex.types';
```

5. **Write unit tests** in `packages/dyn-ui-react/src/components/DynFlex/DynFlex.test.tsx`:

   - Test that the default render produces a `div` with class `flex`.
   - Test that props `direction`, `gap`, `align`, `justify` and `wrap` apply the correct classes.
   - Test that the `as` prop renders the specified HTML element.
   - Test dark mode classes if tokens are overridden under `prefers-color-scheme: dark`.

6. **Create Storybook file** `packages/dyn-ui-react/src/components/DynFlex/DynFlex.stories.tsx`:

   - Provide stories for each variant and demonstrate responsive behaviour.
   - Include interactive controls for props.

7. **Update index export** `packages/dyn-ui-react/src/components/index.ts` to export the new component.

### 2. Design Token Integration

- Define new tokens in `DynFlex.module.css` under the `.flex` selector with 3‑level fallbacks, as shown above. Tokens should use the `--dyn-` prefix and map to design system spacing tokens.
- Import foundation tokens (spacing, colors, shadows) only via CSS variables; do not use hard‑coded values.
- Provide fallback to legacy tokens using the `var(--legacy-… , default)` pattern.
- Use tokens consistently in CSS classes (e.g. `gap: var(--dyn-flex-gap-md)`).

### 3. Testing Requirements

- All unit tests must pass in Jest. Ensure coverage includes default rendering, each prop combination and dark mode tokens.
- Add visual regression tests in Storybook and verify the ARIA accessibility with axe.
- Write snapshot tests for default and variant combinations.

### 4. Git Workflow

- Create a feature branch: `feat/component-dynflex`.
- Use atomic commits with clear messages, for example:
  - `feat(DynFlex): implement DynFlex component with props and tokens`
  - `test(DynFlex): add unit tests for DynFlex variants`
  - `docs(DynFlex): add Storybook stories for DynFlex`
- When ready, open a PR and link to this implementation guide.

### 5. Validation Checklist

- [ ] All props and types defined in `DynFlex.types.ts`.
- [ ] Tokens renamed to `--dyn-flex-*` with 3‑level fallback.
- [ ] React component renders correct HTML element and classes.
- [ ] Unit tests and Storybook stories added.
- [ ] Component exported from `index.ts`.
- [ ] Accessibility checks (focus ring, keyboard navigation) implemented.
- [ ] Documentation updated if needed.
- [ ] PR passes CI and review.