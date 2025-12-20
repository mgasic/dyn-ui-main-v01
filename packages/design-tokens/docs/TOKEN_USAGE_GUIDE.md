# DYN UI Design Tokens - Usage Guide

## Quick Start

### 1. Import Design Tokens in Your App

```css
/* In your main CSS file (e.g., app.css or global.css) */
@import '@dyn/design-tokens/styles/index.css';
```

This imports all three layers:
- Foundation tokens
- Component base tokens
- Theme tokens (dark mode, high contrast automatically applied)

### 2. Use Tokens in Your CSS

```css
.button {
  background-color: var(--dyn-button-bg);
  color: var(--dyn-button-color);
  padding: var(--dyn-button-padding-y) var(--dyn-button-padding-x);
}
```

### 3. Tokens Automatically Support Dark Mode

No additional work needed! When user's OS is set to dark mode:
```css
/* Automatically switches to dark theme values */
--dyn-color-primary: #3b82f6;        /* Light mode: #2563eb */
--dyn-color-background: #0f172a;     /* Light mode: #ffffff */
```

## Common Usage Patterns

### Colors

**Primary Actions:**
```css
.button {
  background-color: var(--dyn-color-primary);
  color: var(--dyn-color-primary-contrast);
}

.button:hover {
  background-color: var(--dyn-color-primary-hover);
}

.button:active {
  background-color: var(--dyn-color-primary-active);
}
```

**Text Colors:**
```css
.text-primary {
  color: var(--dyn-color-text-primary);
}

.text-secondary {
  color: var(--dyn-color-text-secondary);
}

.text-disabled {
  color: var(--dyn-color-text-disabled);
}
```

**Backgrounds:**
```css
.card {
  background-color: var(--dyn-color-surface);
  border: 1px solid var(--dyn-color-border);
}

.card:hover {
  background-color: var(--dyn-color-surface-muted);
}
```

**Status Colors:**
```css
.success {
  color: var(--dyn-color-success);
  background-color: var(--dyn-color-success-alpha);
  border: 1px solid var(--dyn-color-success);
}

.error {
  color: var(--dyn-color-error);
  background-color: var(--dyn-color-error-alpha);
  border: 1px solid var(--dyn-color-error);
}

.warning {
  color: var(--dyn-color-warning);
  background-color: var(--dyn-color-warning-alpha);
  border: 1px solid var(--dyn-color-warning);
}
```

### Typography

**Font Families:**
```css
.body-text {
  font-family: var(--dyn-font-family-base);
}

.code-block {
  font-family: var(--dyn-font-family-mono);
}
```

**Font Sizes:**
```css
.text-xs { font-size: var(--dyn-font-size-xs); }    /* 12px */
.text-sm { font-size: var(--dyn-font-size-sm); }    /* 14px */
.text-base { font-size: var(--dyn-font-size-base); } /* 16px */
.text-lg { font-size: var(--dyn-font-size-lg); }    /* 20px */
.text-xl { font-size: var(--dyn-font-size-xl); }    /* 24px */
```

**Font Weights & Line Heights:**
```css
.heading {
  font-weight: var(--dyn-font-weight-semibold);
  line-height: var(--dyn-line-height-tight);
}

.body {
  font-weight: var(--dyn-font-weight-normal);
  line-height: var(--dyn-line-height-normal);
}
```

### Spacing

**Padding:**
```css
.button {
  padding: var(--dyn-spacing-sm) var(--dyn-spacing-md);
  /* = 8px 12px */
}

.card {
  padding: var(--dyn-spacing-lg);
  /* = 16px */
}

.section {
  padding: var(--dyn-spacing-2xl);
  /* = 32px */
}
```

**Margin:**
```css
.element + .element {
  margin-top: var(--dyn-spacing-lg);
  /* = 16px gap between elements */
}
```

**Gap (Flex/Grid):**
```css
.flex-container {
  display: flex;
  gap: var(--dyn-spacing-md);
  /* = 12px gap between items */
}

.grid-container {
  display: grid;
  gap: var(--dyn-spacing-xl);
  /* = 24px gap */
}
```

### Sizing

**Component Sizes:**
```css
.icon-sm {
  width: var(--dyn-size-xs);
  height: var(--dyn-size-xs);
  /* = 16px */
}

.icon-md {
  width: var(--dyn-size-sm);
  height: var(--dyn-size-sm);
  /* = 24px */
}

.avatar-lg {
  width: var(--dyn-size-lg);
  height: var(--dyn-size-lg);
  /* = 48px */
}
```

**Touch Targets (Mobile):**
```css
.button-mobile {
  min-width: var(--dyn-size-touch-target);
  min-height: var(--dyn-size-touch-target);
  /* = 44px (WCAG accessible) */
}

.button-mobile-small {
  min-width: var(--dyn-size-touch-target-sm);
  min-height: var(--dyn-size-touch-target-sm);
  /* = 40px */
}

.button-mobile-large {
  min-width: var(--dyn-size-touch-target-lg);
  min-height: var(--dyn-size-touch-target-lg);
  /* = 52px */
}
```

### Borders

**Border Radius:**
```css
.rounded-sm { border-radius: var(--dyn-border-radius-sm); }   /* 4px */
.rounded-md { border-radius: var(--dyn-border-radius-md); }   /* 8px */
.rounded-lg { border-radius: var(--dyn-border-radius-lg); }   /* 12px */
.rounded-pill { border-radius: var(--dyn-border-radius-pill); } /* 999px */
.rounded-full { border-radius: var(--dyn-border-radius-full); } /* 9999px */
```

**Border Width:**
```css
.border-thin {
  border: var(--dyn-border-width-thin) solid var(--dyn-color-border);
  /* = 2px */
}

.border-thick {
  border: var(--dyn-border-width-thick) solid var(--dyn-color-border);
  /* = 3px (or 4px in high contrast mode) */
}
```

### Shadows

**Elevation Shadows:**
```css
.card-sm {
  box-shadow: var(--dyn-shadow-sm);
  /* Subtle elevation */
}

.card-md {
  box-shadow: var(--dyn-shadow-md);
  /* Medium elevation */
}

.modal {
  box-shadow: var(--dyn-shadow-lg);
  /* High elevation */
}
```

**Focus Shadow:**
```css
.element:focus-visible {
  box-shadow: var(--dyn-shadow-focus);
}
```

### Animations

**Durations:**
```css
.transition-fast {
  animation-duration: var(--dyn-animation-duration-fast);
  /* 0.1s */
}

.transition-normal {
  animation-duration: var(--dyn-animation-duration-base);
  /* 0.2s */
}

.transition-slow {
  animation-duration: var(--dyn-animation-duration-slow);
  /* 0.4s */
}
```

**Easing Functions:**
```css
.ease-out {
  animation-timing-function: var(--dyn-animation-easing-ease-out);
}

.ease-in-out {
  animation-timing-function: var(--dyn-animation-easing-ease-in-out);
}
```

**Transition Presets:**
```css
.button {
  transition: var(--dyn-transition-base);
  /* all 0.2s ease-out */
}

.button:hover {
  background-color: var(--dyn-color-primary-hover);
  /* Automatically animated by transition */
}
```

**Respects Reduced Motion:**
```css
/* Automatically respects prefers-reduced-motion */
/* Users with reduced motion preference get instant transitions (0.01ms) */
```

### Opacity

**State Opacity:**
```css
.button:disabled {
  opacity: var(--dyn-opacity-disabled);
  /* 0.56 */
}

.hover-effect {
  background-color: rgba(37, 99, 235, var(--dyn-opacity-hover));
  /* 0.08 opacity overlay */
}

.active-effect {
  background-color: rgba(37, 99, 235, var(--dyn-opacity-active));
  /* 0.16 opacity overlay */
}
```

### Z-Index

**Stacking Context:**
```css
.dropdown {
  z-index: var(--dyn-zindex-dropdown);
  /* 100 */
}

.modal-backdrop {
  z-index: var(--dyn-zindex-modal-backdrop);
  /* 900 */
}

.modal {
  z-index: var(--dyn-zindex-modal);
  /* 1000 */
}

.tooltip {
  z-index: var(--dyn-zindex-tooltip);
  /* 1200 */
}
```

### Focus States (Accessibility)

**Keyboard Navigation:**
```css
.button:focus-visible {
  outline: var(--dyn-focus-outline);
  outline-offset: var(--dyn-focus-ring-offset);
  /* Automatically adapts for high contrast mode */
}

/* Alternative: using box-shadow */
.input:focus-visible {
  border-color: var(--dyn-color-primary);
  box-shadow: 0 0 0 var(--dyn-focus-ring-width) var(--dyn-focus-ring-color);
}
```

## Component Base Tokens

These tokens combine foundation tokens for specific component types:

### Button-Like Components

```css
.button {
  background-color: var(--dyn-button-bg);
  color: var(--dyn-button-color);
  border: 1px solid var(--dyn-button-border);
  padding: var(--dyn-button-padding-y) var(--dyn-button-padding-x);
  gap: var(--dyn-button-gap);
  min-height: var(--dyn-button-min-height);
  transition: var(--dyn-button-transition);
}

.button:hover {
  background-color: var(--dyn-button-bg-hover);
  border-color: var(--dyn-button-border-hover);
  box-shadow: var(--dyn-button-shadow-hover);
}

.button-secondary {
  /* Uses --dyn-button-* tokens redefined for secondary style */
}

.button-large {
  /* Uses --dyn-button-* tokens redefined for large size */
}
```

### Input-Like Components

```css
.input {
  background-color: var(--dyn-input-bg);
  color: var(--dyn-input-color);
  border: 1px solid var(--dyn-input-border);
  padding: var(--dyn-input-padding-y) var(--dyn-input-padding-x);
  font-family: var(--dyn-input-font-family);
  font-size: var(--dyn-input-font-size);
  transition: var(--dyn-input-transition);
}

.input::placeholder {
  color: var(--dyn-input-placeholder);
}

.input:focus {
  border-color: var(--dyn-input-border-focus);
  box-shadow: 0 0 0 3px var(--dyn-input-focus-ring);
}

.input:disabled {
  background-color: var(--dyn-input-disabled-bg);
  color: var(--dyn-input-disabled-color);
}
```

## Dark Mode & Theming

**Automatic Switching:**
```css
/* No special code needed! */

/* Light mode (default) */
:root {
  --dyn-color-primary: #2563eb;
}

/* Dark mode (automatic when user switches) */
@media (prefers-color-scheme: dark) {
  :root {
    --dyn-color-primary: #3b82f6;
  }
}
```

**Testing Dark Mode:**
```css
/* Dev tools: Toggle dark mode */
/* Chrome/Firefox DevTools > Console: */
/* document.documentElement.style.colorScheme = 'dark' */
```

## Best Practices

### ✅ DO:

1. **Use tokens for all design values:**
   ```css
   .button {
     color: var(--dyn-color-primary);     /* ✅ Good */
   }
   ```

2. **Use component base tokens in components:**
   ```css
   .button {
     background: var(--dyn-button-bg);    /* ✅ Good */
   }
   ```

3. **Include fallbacks:**
   ```css
   .element {
     color: var(--dyn-color-text-primary, #111827);
   }
   ```

4. **Respect user preferences:**
   ```css
   /* Animations automatically respect prefers-reduced-motion */
   transition: var(--dyn-transition-base);
   ```

5. **Use semantic color names:**
   ```css
   .error {
     color: var(--dyn-color-error);       /* ✅ Good */
   }
   ```

### ❌ DON'T:

1. **Hardcode color values:**
   ```css
   .button {
     color: #2563eb;                      /* ❌ Bad */
   }
   ```

2. **Use hardcoded spacing:**
   ```css
   .button {
     padding: 8px 12px;                   /* ❌ Bad */
   }
   ```

3. **Create new tokens for single use:**
   ```css
   --my-custom-color: #abc123;            /* ❌ Bad */
   ```

4. **Mix token and hardcoded values:**
   ```css
   .button {
     color: var(--dyn-color-primary);
     background: #ffffff;                 /* ❌ Mixed */
   }
   ```

5. **Override tokens in component CSS:**
   ```css
   .button {
     --dyn-spacing-md: 20px;              /* ❌ Don't override */
   }
   ```

## Debugging Tokens

**Check available tokens:**
```javascript
/* In browser console: */
getComputedStyle(document.documentElement)
  .getPropertyValue('--dyn-color-primary')
  .trim();
/* Output: "#2563eb" or "#3b82f6" (dark mode) */
```

**List all tokens:**
```javascript
const styles = getComputedStyle(document.documentElement);
const tokens = Array.from(styles)
  .filter(name => name.startsWith('--dyn-'));
console.log(tokens);
```

## Questions?

See:
- `NAMING_CONVENTIONS.md` - Token naming rules
- `TOKEN_STRUCTURE.md` - File structure and layers
- `05_Design_Tokens_Standard_v1.md` - Complete specification
