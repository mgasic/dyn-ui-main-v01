# DynResponsiveTabs – Implementation Guide

## Component Overview

`DynResponsiveTabs` is a sophisticated navigation component that organises content into tabbed panels and automatically adapts to different screen sizes.  It supports both horizontal and vertical layouts, gracefully converts to an accordion on smaller screens and includes full keyboard and screen‑reader accessibility.  Key features include:

* **Horizontal and vertical orientations** – controlled via an `orientation` prop【691769592418766†L47-L50】.
* **Responsive behaviour** – automatically transforms into an accordion on tablet and mobile breakpoints (below 768 px)【691769592418766†L52-L59】, with adaptive padding and font sizes【691769592418766†L327-L341】.
* **Nested tabs** – supports nested structures using a unique `tabIdentifier` and separate token namespace `--dyn-responsive-tabs-nested-*`【691769592418766†L62-L66】.
* **Keyboard navigation** – arrow keys move focus between tabs; Enter or Space activates; Tab cycles through interactive elements【691769592418766†L68-L71】.
* **ARIA accessibility** – uses `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, `aria-controls` and other attributes to meet WCAG AA standards【691769592418766†L72-L77】.
* **Rich customisation** – tokenised styling for layout, borders, backgrounds, text, radius and transitions (over 40 tokens)【691769592418766†L85-L147】; Storybook examples cover horizontal/vertical, accordion, nested, disabled and responsive previews【691769592418766†L361-L373】.

## Current State Analysis

`DynResponsiveTabs` already exists in the repository and is **production ready** with an overall audit score of **87 %**【691769592418766†L14-L22】.  The audit notes:

* **Complete implementation** – all six files (`.tsx`, `.types.ts`, `.module.css`, `.stories.tsx`, `.test.tsx`, `index.ts`) are present【691769592418766†L30-L37】.
* **Excellent responsive design** – three breakpoints with automatic accordion fallback【691769592418766†L52-L59】 and strong mobile/touch support【691769592418766†L327-L341】.
* **Good accessibility** – proper roles and keyboard interactions; minor improvements recommended (add `aria-disabled` and `aria-expanded`)【691769592418766†L318-L320】.
* **Good token naming** – uses the `--dyn-responsive-tabs-[property]-[state]` pattern with three‑level fallback【691769592418766†L83-L141】【691769592418766†L264-L274】.
* **Areas for improvement** – several hardcoded values remain in the CSS (focus outline offset, icon margin, accordion label gap, toggle button size and transition duration)【691769592418766†L153-L247】.  Dark‑mode overrides are missing【691769592418766†L278-L299】.  Adding `aria-disabled` and `aria-expanded` attributes would enhance accessibility【691769592418766†L318-L320】.

## Implementation Instructions

Because the component is already implemented, the following tasks focus on **token cleanup**, **dark‑mode support** and **minor accessibility enhancements**.

### 1. Define Missing Tokens

Add these tokens to `DynResponsiveTabs.module.css`, each with a three‑level fallback (component → semantic → hardcoded default):

* `--dyn-responsive-tabs-focus-outline-offset` – controls the offset of the focus outline (currently hardcoded to `2px`【691769592418766†L153-L169】).
* `--dyn-responsive-tabs-icon-margin` – controls the margin between a tab’s icon and its label (currently `0.5rem`【691769592418766†L173-L193】).
* `--dyn-responsive-tabs-accordion-label-gap` – controls the gap inside accordion headers (currently `0.5rem`【691769592418766†L197-L216】).
* `--dyn-responsive-tabs-toggle-size` – controls the width/height of the accordion toggle button (currently `20px`【691769592418766†L221-L247】).
* `--dyn-responsive-tabs-transition-duration` – controls transition durations (currently `0.3s`【691769592418766†L251-L260】).

Optionally define `--dyn-responsive-tabs-focus-outline-color` to decouple the focus ring colour from the active border colour.

### 2. Update CSS to Use Tokens

Replace the remaining hardcoded values in `DynResponsiveTabs.module.css` with the new tokens.  For example:

```css
.tab:focus-visible {
  outline-offset: var(--dyn-responsive-tabs-focus-outline-offset, 2px);
}

.tabIcon {
  margin-right: var(--dyn-responsive-tabs-icon-margin, 0.5rem);
}

.accordionLabel {
  gap: var(--dyn-responsive-tabs-accordion-label-gap, 0.5rem);
}

.accordionToggle {
  width: var(--dyn-responsive-tabs-toggle-size, 20px);
  height: var(--dyn-responsive-tabs-toggle-size, 20px);
}

.tabIcon,
.accordionToggle {
  transition: transform var(--dyn-responsive-tabs-transition-duration, 0.3s) ease;
}
```

Ensure every value has a three‑level fallback chain and update any tests that refer to hardcoded values.

### 3. Add Dark‑Mode Overrides

Introduce a dark‑mode override block in `DynResponsiveTabs.module.css` to set appropriate background, border and text colours.  Use the recommended palette from the audit【691769592418766†L278-L299】:

```css
@media (prefers-color-scheme: dark) {
  :where(.dyn-responsive-tabs) {
    --dyn-responsive-tabs-bg-inactive: var(--dyn-color-gray-800, #242424);
    --dyn-responsive-tabs-bg-hover: var(--dyn-color-gray-700, #383838);
    --dyn-responsive-tabs-bg-active: var(--dyn-color-gray-900, #1a1a1a);
    --dyn-responsive-tabs-bg-content: var(--dyn-color-gray-900, #1a1a1a);
    --dyn-responsive-tabs-text-inactive: var(--dyn-color-gray-400, #999999);
    --dyn-responsive-tabs-text-active: var(--dyn-color-gray-100, #e0e0e0);
    --dyn-responsive-tabs-border-default: var(--dyn-color-gray-600, #404040);
    --dyn-responsive-tabs-border-active: var(--dyn-color-cyan-400, #22d3ee);
    /* Override new tokens if necessary */
    --dyn-responsive-tabs-focus-outline-offset: 2px;
    --dyn-responsive-tabs-icon-margin: 0.5rem;
    --dyn-responsive-tabs-accordion-label-gap: 0.5rem;
    --dyn-responsive-tabs-toggle-size: 20px;
    --dyn-responsive-tabs-transition-duration: 0.3s;
  }
}
```

### 4. Update Storybook and Tests

* **Storybook** – Update stories to demonstrate the component with customised tokens (e.g. larger toggle size or different icon margin).  Add a dark‑mode story.  Continue showcasing horizontal and vertical tabs, accordion mode, nested tabs, disabled tabs and responsive previews【691769592418766†L361-L373】.  Provide guidelines for how developers can override tokens via CSS variables.
* **Tests** – Modify tests that assert specific pixel values to instead check for the presence of CSS variables.  Add tests to verify that dark‑mode overrides apply correctly and that `aria-disabled` and `aria-expanded` are present where appropriate【691769592418766†L318-L320】.

### 5. Minor Accessibility Enhancements

Add `aria-disabled="true"` on disabled tabs and `aria-expanded` on accordion headers to improve accessibility as suggested in the audit【691769592418766†L318-L320】.  Verify that focus outlines remain clearly visible in dark and high‑contrast modes.

## Validation Checklist

- [ ] **Token compliance** – All previously hardcoded values (focus offset, icon margin, accordion gap, toggle size, transition duration) replaced by `--dyn-responsive-tabs-*` tokens with three‑level fallback.
- [ ] **Dark mode** – Dark‑mode overrides defined; component renders correctly in dark mode with appropriate colours and spacing.
- [ ] **Accessibility** – Keyboard navigation remains functional; `aria-disabled` and `aria-expanded` attributes added; focus states visible in dark and high‑contrast modes.
- [ ] **Responsive** – Layout converts to accordion on tablet/mobile; nested tabs still supported; no layout regressions.
- [ ] **Testing** – Tests updated to check CSS variables instead of hardcoded values; dark mode and new ARIA attributes tested; manual QA across browsers and devices performed.
- [ ] **Documentation** – Storybook updated with dark‑mode examples and token customisation guidelines; API documentation reflects new tokens and props.
- [ ] **Exports** – Component and types exported from `index.ts` remain unchanged.