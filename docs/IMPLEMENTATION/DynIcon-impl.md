# DynIcon – Implementation Guide

## Component Overview

`DynIcon` is a versatile component used to render icons throughout the Dyn UI library.  It accepts a variety of icon sources (icon dictionary keys, FontAwesome class strings, SVG React elements or arbitrary children) and exposes props to control size, tone/semantic colouring, spinning animation, disabled state and custom colour.  The component is interactive when an `onClick` handler is provided and will behave as a button with keyboard focus and appropriate ARIA roles.  Typical features include:

* **Multiple icon sources** – pass a string that matches a key in the icon dictionary, a FontAwesome class (e.g. `fa fa-user`), a React element (such as an imported SVG) or children to render custom content.
* **Size tokens** – predefined sizes (`small`, `medium`, `large`) map to CSS classes, while numeric/string values set inline dimensions【142796488148114†L24-L176】.  Sizes adjust both the font size and the width/height of the container.
* **Semantic tones** – semantic colours (`success`, `warning`, `danger`, `info`) apply tokenised colours via CSS classes【464985335347037†L86-L101】.
* **Custom colour override** – the `color` prop overrides the current colour and applies it inline.
* **Spinning animation** – setting `spin` rotates the icon using a CSS keyframes animation【464985335347037†L110-L121】.
* **Interactive mode** – when `onClick` is defined and not disabled, the component becomes focusable, applies hover/active styles and uses `role="button"`【142796488148114†L161-L177】.
* **Disabled state** – disables click handling and reduces opacity【464985335347037†L103-L108】.
* **Accessibility** – automatically chooses `role="img"` or `role="button"`, hides purely decorative icons from screen readers when possible and forwards additional ARIA attributes【142796488148114†L177-L244】.

## Current State Analysis

`DynIcon` is already implemented under `packages/dyn-ui-react/src/components/DynIcon`【142796488148114†L24-L176】.  The component is robust and covers many use cases: it supports dictionary icons via `useIconDictionary`, falls back to registry icons if a dictionary lookup fails, parses multiple class tokens (e.g. FontAwesome), applies size and tone classes, and handles interactive and disabled states.  The CSS module defines classes for size variants, tone states, interactive hover/active styles, spinning animation, dark‑mode and high‑contrast overrides【464985335347037†L67-L171】.  However, the implementation uses generic design tokens (`--dyn-color-success`, `--dyn-font-size-sm`, etc.) rather than component‑scoped tokens.  To fully comply with the design‑token guidelines, we should introduce `--dyn-icon-*` tokens for sizes, colours and interactive backgrounds and provide three‑level fallbacks.  The component also lacks tokens for the hover background when clickable and for controlling the spin animation duration.  There is limited Storybook documentation and tests.

## Implementation Instructions

### 1. Introduce component‑scoped tokens

Create or update `DynIcon.module.css` to define custom properties prefixed with `--dyn-icon-*`, each with a three‑level fallback (component → semantic → hardcoded):

| Token | Purpose | Example fallback |
|------|---------|------------------|
| `--dyn-icon-size-small` | Font size and dimensions for `small` icons | `var(--dyn-font-size-sm, var(--font-size-sm, 0.875rem))` |
| `--dyn-icon-size-medium` | Size for `medium` icons (default) | `var(--dyn-font-size-base, var(--font-size-base, 1rem))` |
| `--dyn-icon-size-large` | Size for `large` icons | `var(--dyn-font-size-lg, var(--font-size-lg, 1.25rem))` |
| `--dyn-icon-color-success` | Colour for `tone="success"` | `var(--dyn-color-success, var(--color-success, #059669))` |
| `--dyn-icon-color-warning` | Colour for `tone="warning"` | `var(--dyn-color-warning, var(--color-warning, #d97706))` |
| `--dyn-icon-color-danger` | Colour for `tone="danger"` | `var(--dyn-color-danger, var(--color-danger, #dc2626))` |
| `--dyn-icon-color-info` | Colour for `tone="info"` | `var(--dyn-color-info, var(--color-info, #0891b2))` |
| `--dyn-icon-hover-bg` | Background colour when clickable and hovered | `var(--dyn-color-surface-hover, rgba(0,0,0,0.05))` |
| `--dyn-icon-active-bg` | Background on active state | `var(--dyn-color-surface-active, rgba(0,0,0,0.05))` |
| `--dyn-icon-border-radius` | Corner radius for clickable icons | `var(--dyn-radius-sm, 4px)` |
| `--dyn-icon-spin-duration` | Duration of the spinning animation | `1s` |

Provide dark‑mode overrides in the CSS module to adjust colours (e.g. success becomes a lighter green) and hover backgrounds (use white with transparency)【464985335347037†L152-L170】.  Include a high‑contrast section to thicken focus outlines and ensure sufficient contrast.

### 2. Refactor CSS classes

Update `DynIcon.module.css` to use the new tokens.  For example, replace the hardcoded width/height values in `.dyn-icon-size-small`, `.dyn-icon-size-medium` and `.dyn-icon-size-large` with `var(--dyn-icon-size-small)`, etc.  Replace colour classes such as `.success`, `.warning`, `.danger` and `.info` with classes that set `color` to the corresponding `--dyn-icon-color-*` token.  For clickable icons, update `.dyn-icon-clickable:hover` and `.dyn-icon-clickable:active` to use `--dyn-icon-hover-bg` and `--dyn-icon-active-bg` instead of hard‑coded RGBA values【464985335347037†L52-L56】.  Use `--dyn-icon-border-radius` in place of `--dyn-border-radius-sm`.  Replace the fixed `1s` animation duration with `var(--dyn-icon-spin-duration)` in `.spinning`.

### 3. Update the component

In `DynIcon.tsx`:

1. Expose an optional `spinDuration` prop that overrides the `--dyn-icon-spin-duration` token via inline styles.  Update the component to merge this value into the style object when provided.
2. When `tone` is specified, apply the corresponding token class (e.g. `styles.success`) as before.  Ensure these classes reference the new `--dyn-icon-color-*` tokens.
3. For clickable icons (`onClick` defined), apply the hover/active background by adding a `styles.clickable` class; the CSS class should set background colours using the new tokens.
4. Ensure interactive icons have `role="button"` and `tabIndex={0}` if `tabIndex` is not provided.  Keep existing accessibility logic but add an automated test to verify that icons with `onClick` are keyboard focusable.
5. Document the new `spinDuration` prop and update TypeScript types in `DynIcon.types.ts`.

### 4. Storybook and examples

Create or update `DynIcon.stories.tsx` to include:

* **Basic usage** – rendering dictionary icons, FontAwesome classes and custom SVG components.
* **Size variants** – show `small`, `medium` and `large` icons with custom numeric and string sizes.
* **Tone examples** – render icons with `success`, `warning`, `danger` and `info` tones to demonstrate token colours.
* **Interactive icon** – a clickable icon that functions as a button; demonstrate hover and active backgrounds and keyboard interaction.
* **Spinning icon** – show the `spin` and `spinDuration` props.
* **Dark mode** – toggle Storybook’s dark theme to verify dark‑mode token overrides.

### 5. Testing

Add unit tests with React Testing Library and Jest:

* Verify that dictionary icon keys render the correct SVG (mock the dictionary).
* Check that size tokens result in the expected `width`/`height` styles when a size token is used and that custom values produce inline styles.
* Confirm that tone props apply the correct classes and computed colours.
* Ensure the `spin` and `spinDuration` props apply the spinning class and override the animation duration.
* Test interactive behaviour: icons with `onClick` should respond to click and keypress (Enter/Space) and set `role="button"` and `tabIndex={0}`.
* Test that `aria-hidden` is applied appropriately when the icon is purely decorative.
* Snapshot or style tests for dark‑mode and high‑contrast overrides.

## Validation Checklist

- [ ] All new `--dyn-icon-*` tokens are defined with three‑level fallbacks.
- [ ] Size variants and custom sizes use tokenised values.
- [ ] Tone classes reference component‑scoped colour tokens.
- [ ] Clickable icons use hover and active background tokens.
- [ ] Optional `spinDuration` prop overrides the animation duration token.
- [ ] Dark mode, high contrast and reduced motion modes are supported.
- [ ] Storybook stories demonstrate all key scenarios.
- [ ] Unit tests cover size, tone, colour, spin and interactive behaviour (80 %+ coverage).
- [ ] Type definitions and documentation are updated and exported.
