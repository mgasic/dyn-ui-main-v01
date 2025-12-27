# Design Tokens - Badge & Avatar Implementation

This document describes the new design tokens for Badge and Avatar components.

## Overview

Two new component token files have been added to the design tokens package:

### 1. Badge Component Tokens (`packages/design-tokens/tokens/badge.json`)

**Purpose**: Define design tokens for the DynBadge component

**Token Groups**:
- **Color Tokens**: Primary, Secondary, Success, Danger, Warning, Info, Neutral
- **Status Tokens**: Online, Offline, Away, Busy (for DynAvatar integration)
- **Variant Tokens**: Solid, Soft, Outline, Dot
- **Sizing Tokens**: Small (8px), Medium (12px), Large (16px)
- **Position Tokens**: TopRight, TopLeft, BottomRight, BottomLeft, Center
- **Spacing & Typography**: Padding, Border Radius, Font Size, Font Weight
- **Animation Tokens**: Pulse duration, Transition duration
- **Accessibility Tokens**: High Contrast, Reduced Motion support

**Key Features**:
- 10 color variants
- 4 badge variants (solid, soft, outline, dot)
- 5 position options for overlay badges
- Full accessibility support (WCAG AA)
- Dark mode support

### 2. Avatar Component Tokens (`packages/design-tokens/tokens/avatar.json`)

**Purpose**: Define design tokens for the DynAvatar component

**Token Groups**:
- **Size Tokens**: XS (24px), SM (32px), MD (40px), LG (56px), XL (80px)
- **Border Tokens**: Width, Color, Radius variants (Circle, Rounded, Square)
- **Color Tokens**: Background, Text colors
- **Status Indicator Tokens**: Size, Offset, Border, Colors (Online, Offline, Away, Busy)
- **Typography Tokens**: Font sizes for each size variant, Font weight
- **Shadow & Animation**: Avatar shadow, Transition settings
- **Dark Mode**: Color adjustments for dark theme

**Key Features**:
- 5 size variants
- 3 shape options (circle, rounded, square)
- Integrated status indicator sizing
- Full dark mode support
- Smooth transitions

## Style Dictionary Configuration Changes

Updated `packages/design-tokens/style-dictionary.config.v2.js`:

### New File Filters Added

```javascript
// Badge Component Tokens
{
  destination: 'dyn-badge.css',
  format: 'css/variables-with-dark',
  filter: (token) => token.filePath.includes('badge.json')
}

// Avatar Component Tokens
{
  destination: 'dyn-avatar.css',
  format: 'css/variables-with-dark',
  filter: (token) => token.filePath.includes('avatar.json')
}
```

### Generated CSS Files

After running `npm run tokens:build`, two new CSS files are generated:

1. **`packages/design-tokens/styles/generated/dyn-badge.css`**
   - Contains all badge component CSS variables
   - Prefix: `--dyn-badge-*`
   - Includes dark mode media queries

2. **`packages/design-tokens/styles/generated/dyn-avatar.css`**
   - Contains all avatar component CSS variables
   - Prefix: `--dyn-avatar-*`
   - Includes dark mode media queries

## Token Naming Convention

All tokens follow the pattern:

```
--dyn-<component>-<category>-<subcategory>-<property>
```

### Examples

**Badge Tokens**:
```css
--dyn-badge-color-primary-background: #007ACC;
--dyn-badge-status-online-background: #28A745;
--dyn-badge-variant-dot-size: 12px;
--dyn-badge-position-topRight-offset: -8px;
--dyn-badge-animation-pulse-duration: 2000ms;
```

**Avatar Tokens**:
```css
--dyn-avatar-size-md: 40px;
--dyn-avatar-border-radius-circle: 50%;
--dyn-avatar-status-indicator-online-background-color: #28A745;
--dyn-avatar-typography-font-size-lg: 18px;
```

## Using These Tokens

### In React Components

```css
/* DynBadge.module.css */
.badge--primary {
  background-color: var(--dyn-badge-color-primary-background);
  color: var(--dyn-badge-color-primary-text);
}

.badge--dot {
  width: var(--dyn-badge-variant-dot-size);
  height: var(--dyn-badge-variant-dot-size);
  border-radius: var(--dyn-badge-spacing-dot-radius);
}

.badge--topRight {
  top: var(--dyn-badge-position-topRight-offset);
  right: var(--dyn-badge-position-topRight-offset);
  z-index: var(--dyn-badge-position-topRight-zIndex);
}
```

```css
/* DynAvatar.module.css */
.avatar--md {
  width: var(--dyn-avatar-size-md);
  height: var(--dyn-avatar-size-md);
}

.avatar--circle {
  border-radius: var(--dyn-avatar-border-radius-circle);
}

.avatar__status--online {
  background-color: var(--dyn-avatar-status-indicator-online-background-color);
}
```

### In design-tokens.css

The generated CSS files need to be imported in the main design tokens file:

```css
/* packages/dyn-ui-react/src/styles/design-tokens.css */

@import url('../../design-tokens/styles/generated/dyn-badge.css');
@import url('../../design-tokens/styles/generated/dyn-avatar.css');
```

## Dark Mode Support

Both token files include dark mode variations. When users enable dark mode (system preference or `prefers-color-scheme: dark`), the CSS variables automatically update:

```css
/* Light Mode (default) */
:root {
  --dyn-avatar-border-color: #FFFFFF;
  --dyn-avatar-background-color: #E8E8E8;
}

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  :root {
    --dyn-avatar-border-color: #212121;
    --dyn-avatar-background-color: #424242;
  }
}
```

## Building and Validating Tokens

### Build Tokens
```bash
cd packages/design-tokens
npm run tokens:build
```

This generates:
- `styles/generated/dyn-badge.css`
- `styles/generated/dyn-avatar.css`
- Updates to `styles/generated/foundations.css`

### Validate Tokens
```bash
npm run tokens:validate
```

This checks:
- JSON syntax validity
- Token references
- Naming conventions
- Potential naming conflicts

## File Changes Summary

### Created
- `packages/design-tokens/tokens/badge.json` (6.6 KB)
- `packages/design-tokens/tokens/avatar.json` (4.4 KB)

### Modified
- `packages/design-tokens/style-dictionary.config.v2.js` - Added badge and avatar filters

### Generated (after build)
- `packages/design-tokens/styles/generated/dyn-badge.css`
- `packages/design-tokens/styles/generated/dyn-avatar.css`

## Next Steps

Once these tokens are merged:

1. **Feature Branch**: Create `feat/dynbadge-dynavatar-token-alignment`
   - Merge this branch into feature branch
   - Update DynBadge CSS to use tokens
   - Update DynAvatar CSS to use tokens
   - Add DynBadge integration to DynAvatar
   - Add/update tests

2. **Create Pull Request**
   - Reference this documentation
   - Include token mapping examples
   - Request review

## References

- [Design Tokens Documentation](./docs/)
- [Style Dictionary](https://amzn.github.io/style-dictionary/)
- [Badge Component](./packages/dyn-ui-react/src/components/DynBadge/)
- [Avatar Component](./packages/dyn-ui-react/src/components/DynAvatar/)
