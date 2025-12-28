# DynImage – Implementation Guide

## Component Overview

`DynImage` is a versatile image component that provides a consistent way to display photos, illustrations, avatars or logos in your application.  It should handle common scenarios such as loading states, error fallbacks and responsive resizing while exposing an accessible API.  The component supports both **responsive** and **fixed** sizing variants, optional captions and overlays, and custom cropping via `object-fit` settings.

Key capabilities include:

- **Responsive or fixed sizing** – Choose between a responsive layout that scales with its container or a fixed width/height defined via props.
- **Object fit modes** – Support `cover`, `contain`, `fill`, `scale-down` and `none` to control how the image fits within its container.
- **Lazy loading and loading placeholder** – Display a skeleton or blurred placeholder while the image is loading, improving perceived performance on slow connections.
- **Error fallback** – Show a fallback image, icon or coloured box when the `src` fails to load, and expose an `onError` callback for custom handling.
- **Alt text and captions** – Require an `alt` description for accessibility and optionally render a caption below the image.
- **Border radius and shadow** – Customise rounded corners and drop shadows using tokens.
- **Overlay support** – Optionally overlay a gradient or solid colour on the image; useful for darkening a background behind text.
- **Interactive features** – Accept a click handler to trigger actions such as opening a lightbox or navigating to a link.
- **Dark mode** – Adjust placeholder and overlay colours to suit dark themes.

## Current State Analysis

The `DynImage` component is currently listed in the component checklist as a **Planned** item with early planning status【787202815150762†L591-L606】.  There is no existing React implementation, CSS module, type definitions or tests in the repository.  The component specification notes that it will require its own token namespace (`--dyn-image-*`) and supports two variants: **responsive** and **fixed**【787202815150762†L591-L606】.  Beyond this, no detailed design exists, so the component must be designed from scratch following the DynUI design system conventions.

To provide a solid foundation, you should define a comprehensive set of design tokens for sizing, border radius, shadow, placeholder colours and overlay colours.  These tokens must use the `--dyn-image-*` prefix and implement the three‑level fallback pattern (component → system → hardcoded value) to ensure theming and dark mode support.

## Implementation Instructions

The following steps outline how to implement `DynImage` to meet the DynUI standards.

### 1. Create file structure

Generate a new component folder at `packages/dyn-ui-react/src/components/DynImage/` and create the following files:

```
DynImage.tsx
DynImage.types.ts
DynImage.module.css
DynImage.stories.tsx
DynImage.test.tsx
index.ts
```

This matches the standard structure used across other DynUI components and facilitates type exports, stories and tests.

### 2. Define design tokens

In `DynImage.module.css`, declare a set of component‑scoped CSS variables with the `--dyn-image-*` prefix.  Use a three‑level fallback pattern for each token.  Suggested tokens include:

| Token | Purpose | Example fallback |
|------|---------|------------------|
| `--dyn-image-width` | Default width for fixed variant | `var(--dyn-size-8, 2rem)` |
| `--dyn-image-height` | Default height for fixed variant | `var(--dyn-size-8, 2rem)` |
| `--dyn-image-border-radius` | Border radius of the image container | `var(--dyn-radius-medium, 8px)` |
| `--dyn-image-shadow` | Drop shadow applied to the image | `var(--dyn-shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.1))` |
| `--dyn-image-placeholder-bg` | Background colour while loading or on error | `var(--dyn-color-surface-subtle, #f0f0f0)` |
| `--dyn-image-placeholder-color` | Colour of placeholder icon or text | `var(--dyn-color-text-muted, #999999)` |
| `--dyn-image-overlay-color` | Overlay colour applied on hover or permanently (e.g. for darkening a background) | `rgba(0, 0, 0, 0.3)` |
| `--dyn-image-caption-color` | Colour for optional caption text | `var(--dyn-color-text-secondary, #666666)` |
| `--dyn-image-focus-ring` | Outline/border colour when the component is focusable | `var(--dyn-color-primary, #007acc)` |

Add dark mode overrides within an `@media (prefers-color-scheme: dark)` block; for example, invert the placeholder colours and adjust overlay opacity.

### 3. Implement React component

In `DynImage.tsx`, implement a functional component using `forwardRef<HTMLImageElement, DynImageProps>`.  Important aspects:

1. **Props interface** – In `DynImage.types.ts`, define a `DynImageProps` interface with the following fields:
   - `src: string` – URL of the image (required).
   - `alt: string` – Accessible description (required).  It should never be empty; enforce this via type or runtime check.
   - `width?: number | string` and `height?: number | string` – Override default dimensions for the fixed variant.  When both are provided, use a fixed container; when omitted and `responsive` is true, the image should scale to 100 % width.
   - `responsive?: boolean` – When true (default), the image scales to fit its container; when false, it uses the `width`/`height` props.
   - `objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'` – CSS object‑fit property controlling how the image scales within its container.
   - `placeholder?: React.ReactNode` – Optional custom placeholder to display while loading or on error (e.g. an icon or skeleton component).
   - `errorSrc?: string` – Fallback image URL shown if `src` fails to load; if omitted, show the placeholder instead.
   - `showOverlay?: boolean` – When true, render a semi‑transparent overlay over the image; optional `overlayContent` prop can provide text or icons.
   - `caption?: string | React.ReactNode` – Optional caption displayed below the image.
   - `radius?: 'none' | 'sm' | 'md' | 'lg' | number` – Predefined or numeric radius values mapped to tokens.
   - `shadow?: boolean` – Whether to apply the tokenised shadow.
   - `onClick?: (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void` – Click handler for interactive images.
   - `className?: string` and `style?: React.CSSProperties` for custom styling.

2. **State management** – Use `useState` to track `isLoaded` and `hasError`.  Set `isLoaded` to true in the image’s `onLoad` event and `hasError` to true in `onError`.  Render the placeholder or fallback content accordingly.

3. **Styling** – Apply CSS module classes based on variant and props:
   - Root wrapper (`<figure>`) for semantic grouping with optional caption.
   - Inner wrapper (`<div className={styles.container}>`) to enforce aspect ratio and border radius.
   - Image element with `className={styles.image}` and style overrides for `objectFit` and `width`/`height` props.  Use `loading="lazy"` by default.
   - Placeholder wrapper (`<div className={styles.placeholder}>`) visible when `!isLoaded || hasError`.
   - Overlay element (`<div className={styles.overlay}>`) if `showOverlay` is true.
   - Caption element (`<figcaption>`) with appropriate styling.

4. **Accessibility** – Always include the `alt` attribute.  When the image is clickable, set `role="button"` and attach keyboard handlers (e.g. activate on Enter/Space).  Ensure focus ring is visible using the `--dyn-image-focus-ring` token and the `:focus-visible` pseudo‑class.

5. **ForwardRef** – Forward a ref to the `<img>` element to enable parent components to control focusing or measurement.

### 4. Create CSS module

Define classes in `DynImage.module.css` using the tokens above:

- `.container` – Relative positioning and overflow hidden; apply border radius (`--dyn-image-border-radius`) and optional shadow (`--dyn-image-shadow`).
- `.image` – Absolute positioning to fill the container; apply `object-fit` via inline style; set width/height to 100 % for responsive variant.
- `.placeholder` – Centered flex container using `--dyn-image-placeholder-bg` and `--dyn-image-placeholder-color`; display skeleton or icon.
- `.overlay` – Absolutely positioned overlay with background colour `--dyn-image-overlay-color` and optional content alignment.
- `.caption` – Margin‑top and text colour `--dyn-image-caption-color`.
- Variants `.radius-sm`, `.radius-md`, `.radius-lg` etc., mapping to different border radius tokens.

Respect dark mode by overriding placeholder and overlay colours inside a dark mode media query.  Add reduced motion checks for any fade‑in animation used when the image loads (e.g. `@keyframes fadeIn`).

### 5. Develop Storybook stories

In `DynImage.stories.tsx`, add stories demonstrating common use cases:

- **Responsive image** – Default usage with responsive scaling.
- **Fixed size** – Provide explicit `width` and `height` props.
- **Cover vs contain** – Two stories showing different `objectFit` values.
- **Placeholder and error fallback** – Simulate slow loading and error states.
- **With caption and overlay** – Example with caption text and a dark overlay.
- **Dark mode** – Use Storybook’s dark theme to showcase dark mode styles.

Each story should document required props and show how to customise tokens via CSS variables.

### 6. Write unit tests

Create `DynImage.test.tsx` with tests using React Testing Library:

- Verify that the image renders with the correct `src` and `alt` attributes.
- Simulate a successful load and ensure the placeholder disappears and the image becomes visible.
- Simulate an error and verify that the fallback or placeholder is displayed and the `onError` callback (if provided) is called.
- Test that `objectFit` prop applies the correct inline style.
- Test interactive behaviour: clicking triggers `onClick` and keyboard interaction works for button roles.
- Test variant props: responsive vs fixed; radius sizes; shadow; overlay.
- Check accessibility: alt text must be present; interactive images expose `role="button"` and are keyboard focusable.

### 7. Documentation and exports

Export the component and its types from `index.ts` and update the public API reference.  Document the props in JSDoc and the package README.  Provide examples of overriding tokens via CSS custom properties.

### 8. Optional enhancements

- Add support for a **lightbox** feature that opens the image in a modal when clicked.  This should be implemented as a separate component or an optional prop to avoid bloating the core component.
- Provide a **blur-up** placeholder using CSS filters for progressive image loading.

## Validation Checklist

Before opening a pull request, verify that:

### Tokens & CSS
- [ ] All defined tokens start with `--dyn-image-` and have three‑level fallbacks.【787202815150762†L591-L606】
- [ ] Placeholder, border radius, shadow and overlay colours can be customised via tokens.
- [ ] Dark mode overrides are provided for placeholder and overlay colours.
- [ ] Reduced motion preferences are respected for any fade‑in animations.

### Functionality & API
- [ ] The component supports both responsive and fixed variants controlled via props.
- [ ] Loading and error states are handled gracefully with placeholders or fallback images.
- [ ] `objectFit` and sizing props correctly adjust the rendered image.
- [ ] Optional overlay and caption render when provided.
- [ ] Interactive images forward refs and handle click/keyboard events properly.

### Accessibility
- [ ] All images have non‑empty `alt` text.
- [ ] Interactive images use `role="button"` and support keyboard activation (Enter/Space).
- [ ] Focus styles are visible and accessible using tokens for outline/shadow.

### Testing & Documentation
- [ ] Unit tests cover the core logic, including load/error states and interactive behaviour, achieving ≥80 % coverage.
- [ ] Storybook stories demonstrate responsive vs fixed, object fit variants, placeholders, dark mode and overlays.
- [ ] The component and its types are exported via `index.ts` and documented in the README.
