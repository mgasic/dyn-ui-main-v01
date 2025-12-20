# DYN UI Design Tokens - Naming Conventions

## Overview

All design tokens follow a consistent naming convention to ensure clarity, discoverability, and maintainability across the design system.

## Standard Format

```
--dyn-[domain]-[property]-[state]
```

### Components

- **`dyn`**: Prefix (company/product identifier)
- **`domain`**: Category (color, spacing, border, animation, etc.)
- **`property`**: Specific property name
- **`state`**: Optional state modifier (hover, focus, active, disabled, dark, etc.)

## Domain Definitions

### COLOR DOMAIN

```
--dyn-color-[semantic]-[variant]-[state]
```

**Examples:**
```css
--dyn-color-primary              /* Brand primary */
--dyn-color-primary-hover        /* Primary in hover state */
--dyn-color-primary-dark         /* Primary in dark theme */
--dyn-color-text-primary         /* Text semantic color */
--dyn-color-text-disabled        /* Disabled text */
--dyn-color-surface-subtle       /* Subtle surface */
--dyn-color-surface-hover        /* Surface on hover */
--dyn-color-border-light         /* Light border variant */
--dyn-color-status-success       /* Status color */
--dyn-color-status-error         /* Error status */
```

### SPACING DOMAIN

```
--dyn-spacing-[scale]
```

**Examples:**
```css
--dyn-spacing-xxs                /* 0.125rem (2px) */
--dyn-spacing-xs                 /* 0.25rem (4px) */
--dyn-spacing-sm                 /* 0.5rem (8px) */
--dyn-spacing-md                 /* 0.75rem (12px) */
--dyn-spacing-lg                 /* 1rem (16px) */
--dyn-spacing-xl                 /* 1.5rem (24px) */
--dyn-spacing-2xl                /* 2rem (32px) */
--dyn-spacing-3xl                /* 3rem (48px) */
```

### SIZING DOMAIN

```
--dyn-size-[semantic]-[variant]
```

**Examples:**
```css
--dyn-size-xs                    /* Extra small (1rem) */
--dyn-size-sm                    /* Small (1.5rem) */
--dyn-size-md                    /* Medium (2.5rem) */
--dyn-size-lg                    /* Large (3rem) */
--dyn-size-touch-target          /* Minimum touch target (44px) */
--dyn-size-touch-target-sm       /* Small touch target (40px) */
--dyn-size-touch-target-lg       /* Large touch target (52px) */
```

### TYPOGRAPHY DOMAIN

```
--dyn-font-[property]-[variant]
```

**Examples:**
```css
--dyn-font-family-base           /* Base font stack */
--dyn-font-family-mono           /* Monospace font stack */
--dyn-font-size-xs               /* Extra small (0.75rem) */
--dyn-font-size-sm               /* Small (0.875rem) */
--dyn-font-size-base             /* Base size (1rem) */
--dyn-font-size-lg               /* Large (1.25rem) */
--dyn-font-weight-normal         /* 400 */
--dyn-font-weight-medium         /* 500 */
--dyn-font-weight-semibold       /* 600 */
--dyn-line-height-tight          /* 1.25 */
--dyn-line-height-normal         /* 1.5 */
--dyn-letter-spacing-tight       /* -0.01em */
```

### BORDER DOMAIN

```
--dyn-border-radius-[size]
--dyn-border-width-[weight]
```

**Examples:**
```css
--dyn-border-radius-xs           /* 0.125rem */
--dyn-border-radius-sm           /* 0.25rem */
--dyn-border-radius-md           /* 0.5rem */
--dyn-border-radius-lg           /* 0.75rem */
--dyn-border-radius-full         /* 9999px */

--dyn-border-width-hairline      /* 1px */
--dyn-border-width-thin          /* 2px */
--dyn-border-width-thick         /* 3px */
```

### SHADOW DOMAIN

```
--dyn-shadow-[elevation]
```

**Examples:**
```css
--dyn-shadow-sm                  /* Small elevation */
--dyn-shadow-md                  /* Medium elevation */
--dyn-shadow-lg                  /* Large elevation */
--dyn-shadow-focus               /* Focus state shadow */
```

### ANIMATION DOMAIN

```
--dyn-animation-[property]
--dyn-transition-[property]
```

**Examples:**
```css
--dyn-animation-duration-base    /* 0.2s */
--dyn-animation-duration-slow    /* 0.4s */
--dyn-animation-easing-ease-out  /* cubic-bezier(...) */
--dyn-animation-easing-ease-in-out /* cubic-bezier(...) */
--dyn-transition-base            /* all 0.2s ease-out */
--dyn-transition-slow            /* all 0.4s ease-out */
```

### OPACITY DOMAIN

```
--dyn-opacity-[level]
```

**Examples:**
```css
--dyn-opacity-disabled           /* 0.56 */
--dyn-opacity-hover              /* 0.08 */
--dyn-opacity-active             /* 0.16 */
```

### Z-INDEX DOMAIN

```
--dyn-zindex-[layer]
```

**Examples:**
```css
--dyn-zindex-base                /* 0 */
--dyn-zindex-dropdown            /* 100 */
--dyn-zindex-sticky              /* 200 */
--dyn-zindex-fixed               /* 300 */
--dyn-zindex-modal               /* 1000 */
--dyn-zindex-tooltip             /* 1200 */
```

### FOCUS DOMAIN

```
--dyn-focus-[property]
```

**Examples:**
```css
--dyn-focus-ring-width           /* 3px */
--dyn-focus-ring-offset          /* 3px */
--dyn-focus-ring-color           /* color */
--dyn-focus-outline              /* 3px solid ... */
```

## Component-Specific Tokens

```
--dyn-[component-name]-[property]-[state]
```

**Examples:**
```css
/* Button */
--dyn-button-bg                  /* Button background */
--dyn-button-bg-hover            /* Button background on hover */
--dyn-button-color               /* Button text color */
--dyn-button-border              /* Button border */
--dyn-button-padding-y           /* Button vertical padding */
--dyn-button-padding-x           /* Button horizontal padding */

/* Input */
--dyn-input-bg                   /* Input background */
--dyn-input-border               /* Input border */
--dyn-input-border-focus         /* Input border on focus */
--dyn-input-placeholder          /* Placeholder text color */
--dyn-input-disabled-bg          /* Disabled input background */

/* Table */
--dyn-table-header-bg-color      /* Table header background */
--dyn-table-border-color         /* Table border */
--dyn-table-row-hover-bg-color   /* Table row on hover */
```

## Naming Rules

### 1. Use Lowercase Kebab Case

✅ **CORRECT:**
```css
--dyn-color-primary-dark
--dyn-button-bg-hover
--dyn-font-size-base
```

❌ **WRONG:**
```css
--dyn-colorPrimaryDark           /* camelCase */
--dyn-BUTTON_BG_HOVER            /* UPPER_SNAKE_CASE */
--dyn-fontSizeBase               /* camelCase */
```

### 2. Use Semantic Names Over Descriptive

✅ **CORRECT:**
```css
--dyn-color-primary-dark
--dyn-color-error
--dyn-color-success
```

❌ **WRONG:**
```css
--dyn-color-blue-900             /* Too descriptive */
--dyn-color-red-500              /* Too descriptive */
--dyn-color-green-600            /* Too descriptive */
```

### 3. Order from General to Specific

✅ **CORRECT:**
```
--dyn-[domain]-[type]-[variant]-[state]
--dyn-button-bg-hover
--dyn-color-primary-dark
--dyn-font-size-base
```

❌ **WRONG:**
```
--dyn-hover-button-bg            /* State first */
--dyn-dark-color-primary         /* State first */
```

### 4. Avoid Abbreviations (except legacy aliases)

✅ **CORRECT:**
```css
--dyn-background
--dyn-padding
--dyn-margin
--dyn-border
```

❌ **WRONG:**
```css
--dyn-bg                         /* Abbreviated */
--dyn-pad                        /* Abbreviated */
--dyn-mg                         /* Abbreviated */
--dyn-bd                         /* Abbreviated */
```

### 5. State Modifiers at End

✅ **CORRECT:**
```css
--dyn-button-bg-hover
--dyn-button-border-focus
--dyn-input-bg-disabled
```

❌ **WRONG:**
```css
--dyn-button-hover-bg            /* State in middle */
--dyn-button-focus-border        /* State in middle */
--dyn-input-disabled-bg          /* This is correct */
```

### 6. Pluralize Only When Necessary

✅ **CORRECT:**
```css
--dyn-color-primary              /* Single value */
--dyn-colors                     /* Collection of colors */
```

❌ **WRONG:**
```css
--dyn-colors-primary             /* Wrong structure */
```

### 7. Consistency Across Similar Tokens

✅ **CORRECT:**
All sizes use consistent pattern:
```css
--dyn-size-xs
--dyn-size-sm
--dyn-size-md
--dyn-size-lg
```

All font sizes use consistent pattern:
```css
--dyn-font-size-xs
--dyn-font-size-sm
--dyn-font-size-base
--dyn-font-size-lg
```

## Token Aliases (Deprecated)

Legacy aliases may be defined for backward compatibility:

```css
--dyn-color-primary: #2563eb;

/* Deprecated alias - use --dyn-color-primary */
--dyn-primary-color: var(--dyn-color-primary);
```

> Note: Aliases should be marked with `@deprecated` comments and removed in next major version.

## Usage Examples

### In CSS

```css
.button {
  background-color: var(--dyn-button-bg);
  color: var(--dyn-button-color);
  padding: var(--dyn-button-padding-y) var(--dyn-button-padding-x);
  border-radius: var(--dyn-border-radius-md);
  transition: var(--dyn-transition-base);
}

.button:hover {
  background-color: var(--dyn-button-bg-hover);
}

.button:focus-visible {
  outline: var(--dyn-focus-outline);
  outline-offset: var(--dyn-focus-ring-offset);
}
```

### With Fallbacks

```css
.element {
  color: var(--dyn-color-text-primary, var(--color-text-primary, #111827));
}
```

## When to Create New Tokens

✅ **CREATE if:**
- Value is reused in 2+ places
- Value is a design system value (color, size, etc.)
- Value needs to be theme-able
- Value appears in design guidelines

❌ **DON'T CREATE if:**
- Value is specific to one component
- Value is temporary or experimental
- Value is a calculated value (use CSS math)
- Value is markup-dependent (use BEM classes instead)

## Questions?

Refer to the full Design Tokens Standard for complete details: `05_Design_Tokens_Standard_v1.md`
