# DYN UI Design Tokens - Token Structure & Architecture

## Overview

The design token system is organized into three layers with clear separation of concerns:

```
┌────────────────────────────┐
│  THEME LAYER (Override)                  │
│  - Dark mode customizations               │
│  - High contrast mode                     │
│  - Brand-specific overrides               │
└────────────────────────────┘
                       ↑
┌────────────────────────────┐
│  COMPONENT LAYER (Application)          │
│  - Button tokens                         │
│  - Input tokens                          │
│  - Layout tokens                         │
└────────────────────────────┘
                       ↑
┌────────────────────────────┐
│  FOUNDATION LAYER (Core Design)         │
│  - Colors, Typography, Spacing,         │
│  - Sizing, Borders, Shadows,            │
│  - Animations, Opacity, Z-Index         │
└────────────────────────────┘
```

## Directory Structure

```
packages/design-tokens/
├─ styles/                           # CSS token files (output)
│  ├─ foundations/
│  │  ├─ index.css                   # Foundation layer index
│  │  ├─ colors.css                  # Color tokens (~100 tokens)
│  │  ├─ typography.css              # Typography tokens (~20 tokens)
│  │  ├─ spacing.css                 # Spacing scale (~8 tokens)
│  │  ├─ sizing.css                  # Component sizes (~10 tokens)
│  │  ├─ borders.css                 # Border radius & width (~14 tokens)
│  │  ├─ shadows.css                 # Shadow/elevation (~4 tokens)
│  │  ├─ animations.css              # Duration, easing, transitions (~9 tokens)
│  │  ├─ opacity.css                 # Opacity values (~4 tokens)
│  │  ├─ zindex.css                  # Z-index scale (~8 tokens)
│  │  └─ focus-states.css            # Accessibility focus (~4 tokens)
│  │
│  ├─ components/
│  │  ├─ index.css                   # Component layer index
│  │  ├─ button-like.css             # Button variants
│  │  ├─ input-like.css              # Input variants
│  │  ├─ layout.css                  # Layout patterns
│  │  ├─ interactive-states.css      # Interactive patterns
│  │  └─ data-display.css            # Table, list patterns
│  │
│  ├─ themes/
│  │  ├─ index.css                   # Theme layer index
│  │  ├─ dark.css                    # Dark mode overrides
│  │  └─ high-contrast.css           # Accessibility overrides
│  │
│  └─ index.css                     # Main entry point
│
├─ docs/                            # Documentation
│  ├─ NAMING_CONVENTIONS.md         # Naming guide
│  ├─ TOKEN_STRUCTURE.md           # This file
│  └─ TOKEN_USAGE_GUIDE.md         # Usage examples
│
└─ package.json
```

## Foundation Layer

**Purpose:** Define core design system values that never change within a theme.

**Location:** `styles/foundations/`

### Color Tokens (`colors.css`)
Defines all color values including:
- Neutrals & backgrounds (8+ tokens)
- Text colors (6+ tokens)
- Borders (5+ tokens)
- Brand colors (7+ tokens)
- Status colors (25+ tokens)
- Accessibility colors (1+ token)

**Features:**
- Dark mode overrides via `@media (prefers-color-scheme: dark)`
- Semantic color naming
- Complete status color set (success, warning, error, info, danger)

### Typography Tokens (`typography.css`)
Defines all text-related tokens:
- Font families (2 tokens: base, mono)
- Font sizes (8 tokens: xs through 3xl)
- Font weights (4 tokens: normal through bold)
- Line heights (3 tokens: tight, normal, relaxed)
- Letter spacing (3 tokens)

### Spacing Tokens (`spacing.css`)
Defines 8px base scale:
- xxs through 3xl (8 tokens)
- Layout helpers (gutter, section)

### Sizing Tokens (`sizing.css`)
Defines component sizes:
- xs through lg (4 tokens)
- Touch targets (3 tokens)
- Icon sizes (4 tokens)

### Border Tokens (`borders.css`)
Defines shape and structure:
- Radius scale (7 tokens)
- Width scale (3 tokens)
- Responsive in high contrast mode

### Shadow Tokens (`shadows.css`)
Defines elevation levels:
- sm, md, lg (3 tokens)
- Focus shadow (1 token)
- Dark mode variants

### Animation Tokens (`animations.css`)
Defines motion language:
- Durations (3 tokens)
- Easing functions (4 tokens)
- Transition presets (6 tokens)
- Respects `prefers-reduced-motion`

### Opacity Tokens (`opacity.css`)
Defines transparency values:
- disabled, hover, active, subtle (4 tokens)

### Z-Index Tokens (`zindex.css`)
Defines stacking context:
- base through tooltip (8 tokens)
- Predictable layering

### Focus State Tokens (`focus-states.css`)
Defines accessibility tokens:
- Focus ring styling (4 tokens)
- High contrast support
- Dark mode support

## Component Layer

**Purpose:** Create reusable component patterns by composing foundation tokens.

**Location:** `styles/components/`

**Key principle:** Components only reference foundation tokens. Never hardcode values.

### Button-Like (`button-like.css`)
Tokens for all button-style components:
- Primary variant
- Secondary variant
- Tertiary variant
- Danger variant
- Size variants (small, medium, large)

### Input-Like (`input-like.css`)
Tokens for all input-style components:
- Base styles
- Size variants (small, medium, large)
- State styles (error, disabled, readonly)

### Layout (`layout.css`)
Tokens for layout components:
- Flex layout tokens
- Grid layout tokens
- Stack layout tokens
- Container tokens
- Density variants

### Interactive States (`interactive-states.css`)
Reusable state patterns:
- Hover state
- Focus state
- Active state
- Disabled state
- Error, Success, Warning states
- Loading state

### Data Display (`data-display.css`)
Tokens for data components:
- Table tokens (header, cell, row)
- ListView tokens
- Compact/spacious variants

## Theme Layer

**Purpose:** Support multiple visual themes while maintaining token structure.

**Location:** `styles/themes/`

**Applied via media queries - automatic theme switching based on user preferences.**

### Dark Mode (`dark.css`)
Overrides all color tokens for dark mode:
- Applied when `prefers-color-scheme: dark`
- Maintains contrast ratios
- Updates shadows for depth perception
- Swaps color values while keeping token names same

### High Contrast (`high-contrast.css`)
Accessibility improvements:
- Applied when `prefers-contrast: high`
- Thicker borders
- Wider focus rings
- Adjusted shadows

## Token Rules

### 1. Foundation tokens NEVER reference other layers

✅ **CORRECT:**
```css
:root {
  --dyn-color-primary: #2563eb;
  --dyn-spacing-md: 0.75rem;
}
```

❌ **WRONG:**
```css
:root {
  --dyn-color-primary: var(--dyn-button-color);  /* Circular */
}
```

### 2. Component tokens reference foundation only

✅ **CORRECT:**
```css
.button-base {
  --dyn-button-bg: var(--dyn-color-primary);
  --dyn-button-padding: var(--dyn-spacing-md);
}
```

❌ **WRONG:**
```css
.button-base {
  --dyn-button-bg: #2563eb;  /* Hardcoded */
}
```

### 3. Component CSS modules consume component tokens

✅ **CORRECT:**
```css
/* DynButton.module.css */
.root {
  background: var(--dyn-button-bg);
  padding: var(--dyn-button-padding-y) var(--dyn-button-padding-x);
}
```

### 4. Theme layer overrides only color tokens

✅ **CORRECT:**
```css
/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --dyn-color-primary: #3b82f6;
    --dyn-color-background: #0f172a;
  }
}
```

❌ **WRONG:**
```css
/* Don't override spacing or sizing in theme */
@media (prefers-color-scheme: dark) {
  :root {
    --dyn-spacing-md: 1rem;  /* Wrong layer */
  }
}
```

## File Size Guidelines

| Layer | File | Max Size | Current |
|-------|------|----------|----------|
| Foundation | colors.css | 500 lines | 100 lines |
| Foundation | typography.css | 100 lines | 50 lines |
| Foundation | spacing.css | 50 lines | 30 lines |
| Foundation | sizing.css | 50 lines | 30 lines |
| Foundation | borders.css | 50 lines | 40 lines |
| Foundation | shadows.css | 50 lines | 30 lines |
| Foundation | animations.css | 100 lines | 70 lines |
| Foundation | opacity.css | 30 lines | 20 lines |
| Foundation | zindex.css | 30 lines | 20 lines |
| Foundation | focus-states.css | 50 lines | 40 lines |
| Component | button-like.css | 300 lines | 120 lines |
| Component | input-like.css | 250 lines | 80 lines |
| Component | layout.css | 150 lines | 60 lines |
| Component | interactive-states.css | 150 lines | 60 lines |
| Component | data-display.css | 200 lines | 80 lines |
| Theme | dark.css | 400 lines | 100 lines |
| Theme | high-contrast.css | 100 lines | 30 lines |

## Fallback Strategy

Every token should have a chain of fallbacks:

```css
/* Preferred -> Component Base -> Foundation -> Hardcoded Fallback */
color: var(
  --dyn-button-color,           /* Component-specific */
  var(
    --dyn-color-primary,        /* Foundation */
    #2563eb                     /* Final fallback */
  )
);
```

This ensures rendering even if:
- CSS files partially load
- A token is missing
- Browser doesn't support CSS variables

## Import Order

```css
/* 1. Foundation layer (all core values) */
@import './foundations/index.css';

/* 2. Component layer (reusable patterns) */
@import './components/index.css';

/* 3. Theme layer (media query overrides) */
@import './themes/index.css';

/* 4. Component CSS modules (consume tokens) */
/* Import in components, not here */
```

## Questions?

See:
- `NAMING_CONVENTIONS.md` - Token naming rules
- `TOKEN_USAGE_GUIDE.md` - How to use tokens in components
- `05_Design_Tokens_Standard_v1.md` - Complete specification
