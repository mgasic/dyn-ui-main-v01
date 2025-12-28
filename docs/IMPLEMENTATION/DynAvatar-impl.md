# DynAvatar – Implementation Guide

This guide describes how to audit, refactor and extend the **DynAvatar** component to fully comply with the Dyn UI design system.  DynAvatar is already implemented in the codebase but requires token cleanup, documentation and additional features to reach production readiness.

## Component Overview

DynAvatar displays user profile images with optional initials and status indicators.  It supports five sizes (`xs`, `sm`, `md`, `lg`, `xl`), three shapes (circle, square, rounded) and four status states (online, offline, away, busy).  When an image cannot be loaded it falls back to initials generated from the `alt` text or custom content.  The component includes a 10‑second image‑load timeout, interactive mode (click and keyboard), dark‑mode styling and full ARIA support.  The source code outlines all features with JSDoc examples and usage scenarios【752205598582131†L52-L71】.

## Current State Analysis

**Existing files:** `DynAvatar.tsx`, `DynAvatar.types.ts`, `DynAvatar.module.css`, `DynAvatar.test.tsx`, `DynAvatar.stories.tsx`.

Key observations from the audit summary and code:

* The component scores **72 % (fair)** overall; tests and accessibility are good, but CSS token compliance is critical【600400310148553†L24-L27】.  Hard‑coded values remain in the CSS module; for example the status indicator and badge offsets use literal pixel values rather than token variables【600400310148553†L31-L66】.  The solution is to introduce component‑scoped tokens such as `--dyn-avatar-status-size` with three‑level fallbacks.
* Unused classes are present in the CSS module (`.badge`, `.group`, `.groupItem`, `.dyn-sr-only`), causing confusion【600400310148553†L71-L78】.  Some classes for planned features (grouped avatars) are commented out.
* Documentation is incomplete: the React component lacks JSDoc for some props and helper functions, and there are no usage examples in the README【600400310148553†L80-L84】.
* The TSX implementation already includes advanced features: click and keyboard interactivity, a configurable image‑load timeout (10 s) and fallback logic【752205598582131†L52-L71】.  However, error handling could be improved by exposing a `loadTimeout` prop and by allowing a custom `onError` callback【600400310148553†L127-L131】.
* The CSS module uses generic tokens like `--dyn-size-md` and `--dyn-color-primary-light` instead of component‑scoped tokens.  Some tokens have been partially converted (e.g. `--dyn-avatar-status-size`), but many remain generic【471416636580698†L10-L18】.
* Tests cover 78 % of branches but lack checks for dark mode, high contrast, group avatars, and error states.  Storybook examples cover common scenarios but could include size/shape variants and interactive mode.

## Identified Gaps

1. **Token compliance** – Replace all hard‑coded values and generic tokens in `DynAvatar.module.css` with component‑scoped tokens using the three‑level fallback pattern: `--dyn-avatar-…: var(--dyn-… , var(--legacy-… , <literal>));` The specification emphasises a complete set of tokens for status size, badge offset, colours, borders, animation durations, etc.【600400310148553†L31-L66】.  At lines 10‑18 of the CSS module, the size and colour tokens should be renamed (`--dyn-size-md` → `--dyn-avatar-size-md`, `--dyn-color-primary-light` → `--dyn-avatar-bg` or similar)【471416636580698†L10-L18】.
2. **Remove or refactor unused CSS classes** – The audit lists `.badge`, `.group`, `.groupItem` and `.dyn-sr-only` as unused or mis‑scoped【600400310148553†L71-L78】.  Remove these classes or move them to a separate component (e.g. a future `DynAvatarGroup`).  Ensure global utility classes like `.dyn-sr-only` reside in the foundation layer.
3. **Expand documentation** – Add JSDoc comments to all exported functions (`generateInitials`, event handlers) and to the component props interface.  Provide usage examples in the README or Storybook descriptions to illustrate size variants, shapes, statuses and interactive states【600400310148553†L80-L84】.
4. **Improve error handling** – Expose a `loadTimeout` prop (default 10000 ms) to allow consumers to specify the timeout, and provide an `onError` callback when the image fails to load or times out【600400310148553†L127-L131】.  Document these props and update tests accordingly.
5. **Group avatars feature** – The CSS module contains commented‑out classes for grouping avatars.  Implement a `DynAvatarGroup` component or remove these stubs.  If implemented, support overlap spacing tokens, stacking order and accessible labels.
6. **Testing** – Increase coverage to >90 %.  Add tests for dark mode (via `prefers-color-scheme` media query), high contrast (`prefers-contrast: more`), reduced motion and error states.  Test interactive and keyboard behaviour and ensure `onClick` and `onKeyDown` handlers call the appropriate callbacks.
7. **Storybook** – Create stories for each size, shape and status combination, interactive mode, loading and error states, and the proposed group avatars.  Include dark‑mode toggles.

## Implementation Instructions

### 1. Audit and refactor CSS tokens

1. Move all token definitions into a dedicated block at the top of `.container` and rename them using the `--dyn-avatar-*` prefix.  For example, convert:

```css
/* Old */
.container {
  width: var(--dyn-size-md, var(--size-md, 40px));
  background-color: var(--dyn-color-primary-light, #eff6ff);
  border: 2px solid var(--dyn-color-border, #d1d5db);
  /* … */
}

/* New */
.container {
  --dyn-avatar-size-xs: var(--dyn-size-xs, var(--legacy-size-xs, 24px));
  --dyn-avatar-size-sm: var(--dyn-size-sm, var(--legacy-size-sm, 32px));
  --dyn-avatar-size-md: var(--dyn-size-md, var(--legacy-size-md, 40px));
  --dyn-avatar-size-lg: var(--dyn-size-lg, var(--legacy-size-lg, 56px));
  --dyn-avatar-size-xl: var(--dyn-size-xl, var(--legacy-size-xl, 80px));
  --dyn-avatar-bg: var(--dyn-color-primary-light, var(--legacy-color-primary-light, #eff6ff));
  --dyn-avatar-border-color: var(--dyn-color-border, var(--legacy-color-border, #d1d5db));
  --dyn-avatar-text-color: var(--dyn-color-primary, var(--legacy-color-primary, #2563eb));
  --dyn-avatar-font-weight: var(--dyn-font-weight-semibold, var(--legacy-font-weight-semibold, 600));
  --dyn-avatar-status-size: var(--dyn-avatar-status-size, var(--legacy-avatar-status-size, 12px));
  --dyn-avatar-badge-size: var(--dyn-avatar-badge-size, var(--legacy-avatar-badge-size, 20px));
  /* Add additional tokens as needed */
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--dyn-avatar-size-md);
  height: var(--dyn-avatar-size-md);
  background-color: var(--dyn-avatar-bg);
  border: var(--dyn-border-width, 1px) solid var(--dyn-avatar-border-color);
  border-radius: 50%;
  color: var(--dyn-avatar-text-color);
  font-weight: var(--dyn-avatar-font-weight);
  /* … */
}
```

2. Replace all remaining hard‑coded values or generic tokens with the new component tokens.  For example, in the `.status` class replace `background-color: var(--dyn-color-text-secondary)` with `background-color: var(--dyn-avatar-status-color-neutral, var(--legacy-avatar-status-color-neutral, #6b7280));` and define corresponding tokens for each status (online, away, busy, offline) at the top of `.container`.

3. Define hover, active and focus state tokens for interactive mode, and add dark‑mode and high‑contrast equivalents.  Follow the pattern used in other implementation guides: define `--dyn-avatar-bg-hover`, `--dyn-avatar-border-color-hover`, etc., with 3‑level fallbacks.

### 2. Clean up unused and legacy classes

1. Remove the `.badge`, `.group`, `.groupItem` and `.badgeContainer` classes from `DynAvatar.module.css`.  If a badge overlay is needed, rely on the `DynBadge` component for positioning, as already done in the TSX code (lines 344‑356).  For the planned group feature, create a separate `DynAvatarGroup` component with its own CSS module.

2. Move the `.dyn-sr-only` utility class to the global styles (foundation layer).  Use the existing `DynScreenReaderOnly` utility if available.

### 3. Expose configuration props and improve error handling

1. Add a `loadTimeout` prop to `DynAvatarProps` in `DynAvatar.types.ts` with a default of `10000`.  Use this value instead of the hard‑coded `IMAGE_LOAD_TIMEOUT` constant.  Remove the constant or set it to the default fallback.  Example:

```ts
export interface DynAvatarProps {
  /* … existing props … */
  /** Maximum time (ms) to wait for the image to load before falling back */
  loadTimeout?: number;
  /** Callback when the image fails to load or times out */
  onError?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
}
```

2. In `DynAvatar.tsx`, update the timeout effect to use `props.loadTimeout` and call `props.onError` inside `handleImageError`.  Pass `onError` down to the `<img>` element.

### 4. Add documentation and examples

1. Ensure every exported function and component in `DynAvatar.tsx` and `DynAvatar.types.ts` has a JSDoc block with descriptions, parameter types and examples.  Use the existing JSDoc examples (lines 96‑134 of the TSX file) as a model【752205598582131†L96-L134】.
2. Create a README section or MDX file in `docs/COMPONENTS/P1_IMPORTANT` that explains the component API, supported sizes, shapes, statuses, custom fallback content and interactive mode.  Provide code examples for basic usage, status indicator, interactive avatars and group avatars (if implemented).

### 5. Enhance testing

1. Expand `DynAvatar.test.tsx` to cover dark mode, high‑contrast and reduced‑motion preferences.  Use `window.matchMedia` mocks to simulate these environments and verify that correct tokens are applied.  Test interactive behaviour by simulating clicks and keyboard events (Enter, Space) and verifying `onClick` calls.
2. Add tests for the `loadTimeout` prop: set a short timeout and assert that fallback content appears and `onError` is called.  Test that clearing the timeout on unmount prevents memory leaks.
3. Write tests for the `DynAvatarGroup` component (if implemented) to ensure correct spacing and z‑index stacking.

### 6. Create comprehensive Storybook stories

1. For each size variant, create a story showing the avatar with and without images, with status indicators and in interactive mode.
2. For each shape variant, show how the avatar looks.  Include dark mode toggles to verify token changes.
3. Provide examples of loading state, error state, custom fallback content and the effect of the `loadTimeout` prop.
4. If group avatars are implemented, include a story illustrating overlapping avatars with configurable spacing.

### 7. Git Workflow and Branching

* Create a feature branch: `refactor/dyn-avatar-tokens`.
* Suggested commit messages:
  - `refactor(DynAvatar): rename tokens to dyn-avatar-* and add fallbacks`
  - `feat(DynAvatar): expose loadTimeout and onError props`
  - `docs(DynAvatar): add README and JSDoc examples`
  - `test(DynAvatar): improve dark mode and accessibility coverage`
* After code review, merge into `main`.  Delete legacy CSS classes and update exports accordingly.

## Validation Checklist

- [ ] All CSS variables follow the `--dyn-avatar-*` pattern with 3‑level fallbacks.
- [ ] Unused or mis‑scoped classes removed; group avatars moved to separate component or implemented.
- [ ] `loadTimeout` and `onError` props implemented and documented.
- [ ] JSDoc comments and examples added for all public API surfaces.
- [ ] Unit tests cover dark mode, high contrast, reduced motion, timeout and interactive behaviour.
- [ ] Storybook stories include all sizes, shapes, statuses and states, with dark mode examples.
- [ ] Changes committed on a feature branch with clear commit messages and merged after review.
