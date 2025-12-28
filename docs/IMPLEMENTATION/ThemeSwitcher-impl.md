# ThemeSwitcher – Implementation Guide

## Component Overview

`ThemeSwitcher` allows users to toggle between available themes (light, dark, high contrast, etc.) within the Dyn UI application.  It should present a group of buttons or tabs for each theme option and update the application’s theme context on selection.  The component must be accessible (ARIA roles and keyboard navigation), use design tokens for sizes, spacing, colours and border radius, and support custom labels and icons.

## Current State Analysis

The existing ThemeSwitcher component is a simple functional component that renders a set of buttons with inline styles.  It uses helper functions to calculate spacing and border radius, and logs theme changes to the console.  Tokens are applied only for border and background colour; spacing and border radius are hard‑coded, and there is no CSS module【877114876844265†L12-L24】【877114876844265†L37-L41】【877114876844265†L43-L83】.  The component sets `role="tablist"` and `role="tab"` but lacks keyboard navigation and proper focus management.  It uses `console.log` which should be removed.  There are no tests or documentation.

## Implementation Instructions

1. **Create a CSS module and tokens** – Move inline styles into `ThemeSwitcher.module.css`.  Define tokens under `.dyn-theme-switcher`, such as:
   - `--dyn-theme-switcher-button-size`
   - `--dyn-theme-switcher-gap`
   - `--dyn-theme-switcher-border-radius`
   - `--dyn-theme-switcher-border-color`
   - `--dyn-theme-switcher-bg-color`
   - `--dyn-theme-switcher-bg-color-active`
   Provide three‑level fallback and dark/high contrast overrides.  Use these tokens for button dimensions, spacing and colours instead of computing pixel values with helper functions【877114876844265†L12-L24】【877114876844265†L43-L83】.

2. **Refactor the component** – In `ThemeSwitcher.tsx`:
   - Accept props: `themes` (array of `{ name: string; label?: string; icon?: React.ReactNode }`), `value` (currently selected theme), `onChange`, `size` (`sm` | `md` | `lg`), `rounded` (boolean) and `className`.  Remove helper functions that compute spacing; instead rely on tokens.
   - Render a container `<div>` with `role="tablist"` and individual `<button>` elements with `role="tab"`.  Use `aria-selected={theme.name === value}` and `aria-controls` pointing to a hidden panel if needed.
   - Implement keyboard navigation: ArrowLeft/ArrowRight to move focus; Space/Enter to select a theme; Home/End to jump to first/last.  Manage focus with `tabIndex` appropriately.
   - Remove `console.log`; call the `onChange` prop to propagate selection.

3. **Accessibility** – Provide a `label` prop for screen readers to describe the switcher’s purpose.  Use `aria-orientation="horizontal"` for the tablist.  Ensure button elements have appropriate `aria-label` when only icons are present.  Handle focus styles via tokens and high contrast overrides.

4. **Tests** – Implement tests to verify:
   - Clicking a theme button calls `onChange` and updates selection.
   - Keyboard navigation works and sets `aria-selected`.
   - Tokens apply correct sizes, colours and border radius in light, dark and high contrast modes.
   - Accessibility attributes (`role`, `aria-selected`, `aria-orientation`) are present【877114876844265†L43-L83】.

5. **Storybook and docs** – Add stories showing default usage with two or more themes; custom icons and labels; different sizes and rounded vs square buttons; dark mode and high contrast.  Document the API and tokens in README and add JSDoc comments.

## Validation Checklist

- [ ] Tokens for button size, gap, border radius and colours defined with `--dyn-theme-switcher-*` prefix and three‑level fallback【877114876844265†L12-L24】【877114876844265†L43-L83】.
- [ ] Props include `themes`, `value`, `onChange`, `size`, `rounded`, `label` and `className`.
- [ ] Component uses a CSS module; no inline spacing or border radius calculations; `console.log` removed【877114876844265†L12-L24】【877114876844265†L37-L41】.
- [ ] Keyboard and click interaction supported; ARIA attributes correctly applied (`tablist`, `tab`, `aria-selected`, `aria-orientation`).
- [ ] Tests verify interaction, accessibility and token usage.
- [ ] Storybook examples demonstrate variations; docs and JSDoc updated.
