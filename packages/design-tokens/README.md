# DYN UI Design Tokens

**Version:** 1.0.0
**Status:** Complete Implementation
**Last Updated:** December 20, 2025

## Overview

DYN UI Design Tokens is a comprehensive CSS custom properties system that defines all visual design values for the DYN UI component library. It implements a three-layer architecture ensuring consistency, maintainability, and extensibility.

## Features

✅ **180+ CSS Custom Properties** covering all design aspects
✅ **Three-Layer Architecture** - Foundation, Component, Theme
✅ **Dark Mode Support** - Automatic theme switching
✅ **Accessibility First** - High contrast, focus states, reduced motion
✅ **Type Safe** - Full TypeScript definitions
✅ **Zero Dependencies** - Pure CSS, no build tools required
✅ **Well Documented** - Comprehensive guides and examples

## Quick Start

### Installation

```bash
npm install @dyn/design-tokens
# or
pnpm add @dyn/design-tokens
```

### Usage

```css
/* Import all tokens */
@import '@dyn/design-tokens/styles/index.css';
```

```css
/* Use tokens in your components */
.button {
  background-color: var(--dyn-button-bg);
  color: var(--dyn-button-color);
  padding: var(--dyn-button-padding-y) var(--dyn-button-padding-x);
  transition: var(--dyn-transition-base);
}

.button:hover {
  background-color: var(--dyn-button-bg-hover);
}

.button:focus-visible {
  outline: var(--dyn-focus-outline);
}
```

## Architecture

### Layer 1: Foundation

Core design system values that never change within a theme.

```
styles/foundations/
├── colors.css              (~100 tokens)
├── typography.css          (~20 tokens)
├── spacing.css             (~8 tokens)
├── sizing.css              (~10 tokens)
├── borders.css             (~14 tokens)
├── shadows.css             (~4 tokens)
├── animations.css          (~9 tokens)
├── opacity.css             (~4 tokens)
├── zindex.css              (~8 tokens)
├── focus-states.css        (~4 tokens)
└── index.css               (imports all)
```

**Examples:**

```css
--dyn-color-primary: #2563eb;
--dyn-spacing-md: 0.75rem;     /* 12px */
--dyn-font-size-base: 1rem;    /* 16px */
--dyn-border-radius-md: 0.5rem;/* 8px */
```

### Layer 2: Component Base

Reusable component patterns by composing foundation tokens.

```
styles/components/
├── button-like.css         (button variants)
├── input-like.css          (input variants)
├── layout.css              (layout patterns)
├── interactive-states.css  (state patterns)
├── data-display.css        (table, list patterns)
└── index.css               (imports all)
```

**Examples:**

```css
--dyn-button-bg: var(--dyn-color-primary);
--dyn-button-padding-y: var(--dyn-spacing-sm);
--dyn-input-border-focus: var(--dyn-color-primary);
```

### Layer 3: Theme

Multi-theme support via media queries.

```
styles/themes/
├── dark.css                (dark mode overrides)
├── high-contrast.css       (accessibility)
└── index.css               (imports all)
```

**Automatic switching:**

```css
/* Light mode (default) */
--dyn-color-primary: #2563eb;

/* Dark mode (automatic) */
@media (prefers-color-scheme: dark) {
  --dyn-color-primary: #3b82f6;
}
```

## Token Categories

| Category | Count | File | Purpose |
|----------|-------|------|----------|
| **Colors** | 100+ | colors.css | All color values |
| **Typography** | 20+ | typography.css | Fonts, sizes, weights |
| **Spacing** | 8 | spacing.css | 8px scale |
| **Sizing** | 10 | sizing.css | Component sizes |
| **Borders** | 14 | borders.css | Radius & width |
| **Shadows** | 4 | shadows.css | Elevation |
| **Animations** | 9 | animations.css | Duration, easing |
| **Opacity** | 4 | opacity.css | Transparency |
| **Z-Index** | 8 | zindex.css | Stacking |
| **Focus** | 4 | focus-states.css | Accessibility |
| **Component Base** | 50+ | components/ | Reusable patterns |
| **TOTAL** | **180+** | | Complete system |

## Naming Convention

```
--dyn-[domain]-[property]-[state]
```

### Examples

```css
/* Colors */
--dyn-color-primary
--dyn-color-primary-hover
--dyn-color-error
--dyn-color-text-primary

/* Spacing */
--dyn-spacing-xs          /* 4px */
--dyn-spacing-md          /* 12px */
--dyn-spacing-lg          /* 16px */

/* Typography */
--dyn-font-size-base      /* 16px */
--dyn-font-weight-medium  /* 500 */
--dyn-line-height-normal  /* 1.5 */

/* Components */
--dyn-button-bg
--dyn-button-bg-hover
--dyn-input-border-focus
--dyn-table-header-bg-color
```

## Dark Mode

**Automatic support** - No additional work needed!

```css
/* Your component CSS */
.button {
  background-color: var(--dyn-button-bg);
}

/* Automatically switches when user's OS is set to dark mode */
/* Light: #2563eb → Dark: #3b82f6 */
```

**Testing in DevTools:**

```javascript
// Chrome/Firefox console
document.documentElement.style.colorScheme = 'dark';
```

## Accessibility

### Focus States

```css
.button:focus-visible {
  outline: var(--dyn-focus-outline);
  outline-offset: var(--dyn-focus-ring-offset);
}
```

### High Contrast Mode

Automatically applied when `prefers-contrast: high`:

```css
/* Thicker focus rings and borders */
--dyn-focus-ring-width: 4px;      /* Light: 3px */
--dyn-border-width-thick: 4px;    /* Light: 3px */
```

### Reduced Motion

Automatically applied when `prefers-reduced-motion: reduce`:

```css
/* Animations disabled for users who prefer reduced motion */
--dyn-transition-base: none;       /* Light: all 0.2s ease-out */
```

## File Structure

```
packages/design-tokens/
├── styles/                       # CSS token files
│   ├── foundations/              # Foundation layer (10 files)
│   ├── components/               # Component layer (5 files)
│   ├── themes/                   # Theme overrides (2 files)
│   └── index.css                 # Main entry point
├── docs/                         # Documentation
│   ├── NAMING_CONVENTIONS.md
│   ├── TOKEN_STRUCTURE.md
│   ├── TOKEN_USAGE_GUIDE.md
│   └── 05_Design_Tokens_Standard_v1.md
├── package.json
└── README.md                     # This file
```

## Documentation

- **[TOKEN_USAGE_GUIDE.md](./docs/TOKEN_USAGE_GUIDE.md)** - How to use tokens in components
- **[NAMING_CONVENTIONS.md](./docs/NAMING_CONVENTIONS.md)** - Token naming rules
- **[TOKEN_STRUCTURE.md](./docs/TOKEN_STRUCTURE.md)** - Architecture and layer details
- **[05_Design_Tokens_Standard_v1.md](./docs/05_Design_Tokens_Standard_v1.md)** - Complete specification

## Common Usage Patterns

### Colors

```css
.button {
  background-color: var(--dyn-color-primary);
  color: var(--dyn-color-primary-contrast);
}

.button:hover {
  background-color: var(--dyn-color-primary-hover);
}

.error {
  color: var(--dyn-color-error);
  background-color: var(--dyn-color-error-alpha);
}
```

### Spacing

```css
.container {
  padding: var(--dyn-spacing-lg);
}

.flex {
  display: flex;
  gap: var(--dyn-spacing-md);
}
```

### Typography

```css
.heading {
  font-family: var(--dyn-font-family-base);
  font-size: var(--dyn-font-size-lg);
  font-weight: var(--dyn-font-weight-semibold);
}
```

### Animations

```css
.button {
  transition: var(--dyn-transition-base);
}

.button:hover {
  background-color: var(--dyn-color-primary-hover);
  /* Automatically animated */
}
```

## Browser Support

- ✅ Chrome 49+
- ✅ Firefox 31+
- ✅ Safari 9.1+
- ✅ Edge 15+
- ✅ iOS Safari 9.3+
- ✅ Android Chrome

CSS custom properties are supported in all modern browsers.

## Best Practices

### ✅ DO

1. **Use tokens for all design values**

   ```css
   color: var(--dyn-color-primary);  /* Good */
   ```

2. **Use component tokens in components**

   ```css
   background: var(--dyn-button-bg);  /* Good */
   ```

3. **Include fallbacks for older browsers**

   ```css
   color: var(--dyn-color-primary, #2563eb);
   ```

4. **Respect user preferences**

   ```css
   transition: var(--dyn-transition-base);  /* Respects reduced-motion */
   ```

### ❌ DON'T

1. **Hardcode color values**

   ```css
   color: #2563eb;  /* Bad */
   ```

2. **Override tokens in components**

   ```css
   --dyn-spacing-md: 20px;  /* Bad - don't override */
   ```

3. **Mix tokens and hardcoded values**

   ```css
   padding: var(--dyn-spacing-md) 10px;  /* Mixed - avoid */
   ```

## Contributing

When adding new tokens:

1. **Determine the layer**: Foundation, Component, or Theme
2. **Follow naming conventions**: `--dyn-[domain]-[property]-[state]`
3. **Use semantic names**: Prefer meaning over description
4. **Document in comments**: Explain token purpose
5. **Add to appropriate file**: Don't mix domains
6. **Update documentation**: Add to relevant docs

## Roadmap

- ✅ Foundation layer complete (180+ tokens)
- ✅ Component base layer complete (50+ tokens)
- ✅ Theme layer complete (dark mode, high contrast)
- ✅ Documentation complete
- ⏳ Phase 2: Component integration
- ⏳ Phase 3: Advanced themes (seasonal, brand variants)

## FAQ

**Q: How do I add a new token?**
A: Add it to the appropriate foundation file, following naming conventions. Update documentation.

**Q: Can I override tokens?**
A: Foundation tokens should not be overridden. Use component layer for customization.

**Q: Does dark mode require extra CSS?**
A: No! Token values automatically switch based on user preference.

**Q: What about IE 11 support?**
A: CSS custom properties are not supported. Provide fallback values.

**Q: How many tokens are there?**
A: 180+ tokens across foundation, component, and theme layers.

## License

MIT

## Support

For questions or issues:

1. Check the documentation in `docs/`
2. Review examples in `TOKEN_USAGE_GUIDE.md`
3. See the full specification in `05_Design_Tokens_Standard_v1.md`
