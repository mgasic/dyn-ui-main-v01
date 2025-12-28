# DynBadge – Implementation Guide

## Component Overview

DynBadge displays counts and status indicators with customizable colors, sizes and variants. It supports solid, soft, outline and dot variants, along with semantic colors (primary, secondary, success, danger, warning, info, neutral) and sizes (xs, sm, md, lg, xl). The badge can be positioned relative to its parent (topRight, topLeft, bottomRight, bottomLeft, centre) and can display pulsing or entrance animations.

## Current State Analysis

**Existing files:** `DynBadge.tsx`, `DynBadge.types.ts`, `DynBadge.module.css`, `DynBadge.test.tsx`, `DynBadge.stories.tsx`.

- The React component implements props such as `count`, `variant`, `color`, `size`, `position`, `animated`, `pulse` and more, with appropriate default values and ARIA attributes【529211794097145†L82-L123】.
- The CSS module defines component‑scoped tokens and implements solid, soft, outline and dot variants with dark mode and accessibility support【57591921547556†L24-L58】.
- Tests cover basic rendering, but lack dark mode and high‑contrast checks; legacy spacing tokens like `--space-2` remain (line 220) and not all tokens follow the `--dyn-badge-` pattern.
- There is no “ghost” variant (transparent background) described in the spec, and not all tokens include state suffixes for hover, active or focus.

**Identified gaps:**

- Replace remaining `--space-*` or other non‑dyn tokens with `--dyn-badge-gap-*` tokens (for example at line 220 of `DynBadge.module.css`).
- Ensure every token has 3‑level fallbacks (design, legacy and default literal values).
- Add state suffixes (`-hover`, `-active`, `-focus`) to tokens and update the CSS accordingly.
- Implement the “ghost” variant if required by design: transparent background with colour on hover.
- Expand tests to cover dark mode, high‑contrast and reduced motion scenarios.
- Update Storybook examples for all variants and document the new token names and behaviours.

## Implementation Instructions

### 1. Code Changes

1. **Audit and refactor CSS tokens**: search for any uses of generic tokens such as `--space-2` or hard‑coded values. Replace them with properly scoped component tokens. For example:
   ```css
   /* File: DynBadge.module.css, line 220 */
   /* Old */
   gap: var(--space-2, 2px);
   /* New */
   gap: var(--dyn-badge-gap-default, var(--dyn-spacing-xs, var(--legacy-spacing-xs, 4px)));
   ```
   Define missing tokens near the top of the `.badge` block:
   ```css
   --dyn-badge-gap-xs: var(--dyn-spacing-0, var(--legacy-spacing-0, 2px));
   --dyn-badge-gap-sm: var(--dyn-spacing-1, var(--legacy-spacing-1, 4px));
   --dyn-badge-gap-md: var(--dyn-spacing-2, var(--legacy-spacing-2, 6px));
   --dyn-badge-gap-lg: var(--dyn-spacing-3, var(--legacy-spacing-3, 8px));
   ```

2. **Add ghost variant**: extend `DynBadgeVariant` type in `DynBadge.types.ts`:
   ```ts
   export type DynBadgeVariant = 'solid' | 'soft' | 'outline' | 'dot' | 'ghost';
   ```
   In `DynBadge.tsx`, accept `ghost` as a valid variant and apply appropriate classes. In the CSS module, add `.badge--ghost` styles:
   ```css
   .badge--ghost.badge--primary {
     background-color: transparent;
     color: var(--dyn-badge-text-primary);
     border: none;
   }
   .badge--ghost.badge--primary:hover {
     background-color: var(--dyn-badge-bg-primary-hover);
   }
   ```

3. **Add state suffix tokens**: ensure each colour token has `-hover`, `-active` and `-focus` suffixes, and update the respective selectors. For example:
   ```css
   --dyn-badge-bg-primary-active: var(--dyn-color-primary-90, var(--legacy-color-primary-90, #004380));
   .badge--primary:active { background-color: var(--dyn-badge-bg-primary-active); }
   ```

4. **Prop validation**: update prop validation in `DynBadge.tsx` to include the new variant. Ensure invalid variants fall back to `solid`.

### 2. Design Token Integration

- Add 3‑level fallback tokens for all colours, borders, sizes and animation durations at the top of the `.badge` selector. The pattern should be:
  ```css
  --dyn-badge-border-default: var(--dyn-border-none, var(--legacy-border-none, none));
  ```
- Import foundation tokens indirectly through CSS variables; avoid hard‑coded values.
- Map tokens consistently to variant classes.

### 3. Testing Requirements

- Extend `DynBadge.test.tsx`:
  - Render the ghost variant and verify correct classes and styles.
  - Use `jest-axe` to ensure no accessibility violations.
  - Mock `prefers-color-scheme: dark` and `prefers-contrast: more` using `window.matchMedia` and verify that dark‑mode and high‑contrast tokens are applied.
  - Test that animations are disabled when `prefers-reduced-motion: reduce` is active.
  - Use snapshots for each variant and size.

### 4. Stories and Documentation

- Update `DynBadge.stories.tsx` to include the ghost variant and to demonstrate dark mode and high contrast. Provide interactive controls for variant, colour, size, position and animations.
- Update JSDoc comments in `DynBadge.tsx` and the component’s README (if applicable) to document the new variant and token names.

### 5. Git Workflow

- Branch: `feat/component-dynbadge`.
- Suggested commit messages:
  - `refactor(DynBadge): replace legacy tokens with dyn-badge tokens`.
  - `feat(DynBadge): add ghost variant and token suffixes`.
  - `test(DynBadge): add dark mode and high-contrast tests`.
- Delete any obsolete files (e.g. `DynBadge.old.tsx`) and update exports accordingly.

### 6. Validation Checklist

- [ ] All tokens follow the `--dyn-badge-*` pattern with 3‑level fallback.
- [ ] Added ghost variant and updated TypeScript types.
- [ ] All variants have hover, active and focus states.
- [ ] Tests cover dark mode, high contrast and reduced motion.
- [ ] Updated Storybook stories for new variant and tokens.
- [ ] Component exported properly and documentation updated.