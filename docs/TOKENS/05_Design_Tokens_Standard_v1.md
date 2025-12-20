# DYN UI - Design Tokens Implementation Standard v1.0

**Date**: December 20, 2025  
**Status**: Finalized  
**Version**: 1.0  

---

## TABLE OF CONTENTS

1. [Executive Summary](#executive-summary)
2. [Project Structure](#project-structure)
3. [Token Hierarchy & Architecture](#token-hierarchy--architecture)
4. [Naming Conventions](#naming-conventions)
5. [Token Categories & Definitions](#token-categories--definitions)
6. [CSS Organization & Files](#css-organization--files)
7. [Inheritance & Overrides](#inheritance--overrides)
8. [Component Token Implementation](#component-token-implementation)
9. [Themes & Variants](#themes--variants)
10. [Testing & Validation](#testing--validation)
11. [Migration & Deprecation](#migration--deprecation)

---

## EXECUTIVE SUMMARY

### Current State Assessment
The DYN UI design system has a **partially implemented token system** with **critical gaps** requiring standardization:

- ✅ Foundation tokens exist (colors, typography, spacing, borders, shadows)
- ✅ 37 React components implemented
- ✅ Style Dictionary build pipeline configured
- ❌ Inconsistent token naming across components
- ❌ No component token inheritance pattern
- ❌ Missing critical token categories (animations, z-index, opacity, transitions)
- ❌ Dark mode support incomplete
- ❌ No accessibility-specific tokens

### Implementation Priority
This standard establishes:
1. **Foundational layer** - Core design values (non-negotiable)
2. **Component base layer** - Reusable patterns (high priority)
3. **Component specific layer** - Individual component customization (medium priority)
4. **Theme layer** - Multi-theme support (future)

### Governance
- **Owner**: Frontend Architecture Team
- **Review Cycle**: Quarterly
- **Breaking Changes**: Require team consensus
- **Token Deprecation**: 2-version grace period

---

## PROJECT STRUCTURE

### Current Directory Layout
```
packages/
├── design-tokens/
│   ├── src/
│   │   ├── index.ts              # Main export
│   │   ├── generated.d.ts         # TypeScript definitions (auto-generated)
│   │   ├── index.test.ts          # Token validation tests
│   ├── tokens/                   # Source of truth (JSON)
│   │   ├── color/                # Color token definitions
│   │   ├── animation/            # Animation token definitions
│   │   ├── shadow/               # Shadow token definitions
│   │   ├── size/                 # Size token definitions
│   │   └── table.json            # Table-specific tokens
│   ├── build/                    # Compiled outputs
│   │   ├── css/                  # Generated CSS files
│   │   └── js/                   # Generated JavaScript files
│   ├── scripts/                  # Build automation
│   ├── themes/                   # Theme variant definitions
│   ├── animations.css            # Animation tokens (CSS)
│   ├── borders.css               # Border radius & width tokens
│   ├── colors.css                # Color tokens
│   ├── index.css                 # Central import file
│   ├── shadows.css               # Elevation tokens
│   ├── spacing.css               # Spacing scale tokens
│   ├── typography.css            # Typography tokens
│   ├── table.css                 # **DEPRECATED** - Table tokens (move to component)
│   ├── style-dictionary.config.js # Build configuration
│   └── package.json
│
└── dyn-ui-react/
    ├── src/
    │   └── components/
    │       ├── DynButton/
    │       │   ├── DynButton.module.css      # Component styles
    │       │   ├── DynButton.tsx             # Component implementation
    │       │   ├── DynButton.types.ts        # Component types
    │       │   ├── DynButton.stories.tsx     # Storybook documentation
    │       │   ├── DynButton.test.tsx        # Component tests
    │       │   └── index.ts                  # Component export
    │       ├── DynInput/
    │       │   └── [Same structure as DynButton]
    │       └── [35 additional components...]
```

### Recommended Structure (UPDATED)
```
packages/design-tokens/
├── src/
│   ├── index.ts
│   ├── tokens.d.ts               # Exported token types
│   ├── foundations/              # NEW: Foundation token types
│   ├── components/               # NEW: Component token definitions
│   └── themes/                   # NEW: Theme management
├── tokens/                       # JSON source files
│   ├── foundations/              # NEW: Core design values
│   │   ├── colors.json
│   │   ├── typography.json
│   │   ├── spacing.json
│   │   ├── sizing.json
│   │   ├── borders.json
│   │   ├── shadows.json
│   │   ├── animations.json
│   │   ├── opacity.json
│   │   ├── zindex.json
│   │   └── focus-states.json
│   ├── components/               # NEW: Component-specific tokens
│   │   ├── button.json
│   │   ├── input.json
│   │   ├── table.json
│   │   ├── select.json
│   │   └── [all component tokens]
│   └── themes/                   # Theme overrides
│       ├── light.json
│       └── dark.json
├── styles/                       # NEW: Output CSS files
│   ├── foundations/              # Foundation layer CSS
│   ├── components/               # Component layer CSS
│   └── themes/                   # Theme layer CSS
└── docs/                         # NEW: Token documentation
    ├── NAMING_CONVENTIONS.md
    ├── TOKEN_STRUCTURE.md
    └── TOKEN_USAGE_GUIDE.md
```

---

## TOKEN HIERARCHY & ARCHITECTURE

### Three-Layer Architecture

```
┌─────────────────────────────────────────────────────────┐
│  THEME LAYER (Override)                                 │
│  - Dark mode customizations                              │
│  - Brand-specific overrides                              │
│  - Seasonal themes                                       │
└─────────────────────────────────────────────────────────┘
                            ↑
┌─────────────────────────────────────────────────────────┐
│  COMPONENT LAYER (Application)                          │
│  - Button tokens (bg, border, color, size, etc.)       │
│  - Input tokens (border, focus, error states)          │
│  - Layout tokens (gap, gutter, alignment)              │
└─────────────────────────────────────────────────────────┘
                            ↑
┌─────────────────────────────────────────────────────────┐
│  FOUNDATION LAYER (Core Design)                         │
│  - Primary colors                                        │
│  - Typography scales                                     │
│  - Spacing scale                                         │
│  - Border radius variants                                │
│  - Elevation (shadows)                                   │
│  - Transitions & animations                              │
└─────────────────────────────────────────────────────────┘
```

### Layer Responsibilities

#### Foundation Layer
**Purpose**: Define core design system values that never change within a theme

**Contains**:
- Color palette (swatches, not semantic)
- Typography system (font families, sizes, weights, line heights)
- Spacing scale (base unit and multiples)
- Border system (radius sizes, widths)
- Elevation system (shadows)
- Animation timings and easing functions
- Opacity/transparency values
- Z-index scale
- Accessibility focus states

**Rules**:
- ✅ Can be overridden at theme level
- ✅ Must have complete color contrast specifications
- ❌ Cannot reference other layers
- ❌ No component-specific values
- ❌ No state-specific values (hover, focus, disabled)

#### Component Base Layer
**Purpose**: Create reusable component patterns by composing foundation tokens

**Contains**:
- Button-like component tokens
- Input-like component tokens
- Layout/spacing patterns
- Interactive state patterns (hover, focus, active, disabled, error)
- Size variants (small, medium, large)
- Density variants (compact, normal, spacious)

**Rules**:
- ✅ References foundation tokens only
- ✅ Defines state transformations (e.g., hover color darker by 10%)
- ✅ Reusable across multiple components
- ❌ No component-specific logic
- ❌ Cannot override theme tokens directly

#### Component Specific Layer
**Purpose**: Customize component-base tokens for individual components

**Contains**:
- Button-specific token overrides
- Input-specific configurations
- Table-specific spacing
- Component-unique properties

**Rules**:
- ✅ References foundation and component-base tokens
- ✅ Only add new tokens when necessary
- ✅ Component CSS modules consume these tokens
- ❌ Should not duplicate foundation tokens
- ❌ Should reuse component-base patterns where possible

#### Theme Layer
**Purpose**: Support multiple visual themes while maintaining token structure

**Contains**:
- Dark mode color mappings
- High contrast mode customizations
- Brand variant overrides
- Seasonal/holiday themes

**Rules**:
- ✅ Overrides any lower layer
- ✅ Media query based (`prefers-color-scheme`)
- ✅ Can add new tokens for theme-specific needs
- ❌ Cannot remove foundation tokens
- ❌ Should maintain accessibility standards

---

## NAMING CONVENTIONS

### Standard Format

```
--dyn-[domain]-[property]-[state]
```

**Components**:
- `dyn`: Prefix (company/product identifier)
- `domain`: Category (color, spacing, border, animation, etc.)
- `property`: Specific property name
- `state`: Optional state modifier (hover, focus, active, disabled, dark, etc.)

### Domain Definitions

#### COLOR DOMAIN
```
--dyn-color-[semantic]-[variant]-[state]

Examples:
--dyn-color-primary              # Brand primary
--dyn-color-primary-hover        # Primary in hover state
--dyn-color-primary-dark         # Primary in dark theme
--dyn-color-text-primary         # Text semantic color
--dyn-color-text-disabled        # Disabled text
--dyn-color-surface-subtle       # Subtle surface
--dyn-color-surface-hover        # Surface on hover
--dyn-color-border-light         # Light border variant
--dyn-color-status-success       # Status color
--dyn-color-status-error         # Error status
```

#### SPACING DOMAIN
```
--dyn-spacing-[scale]

Examples:
--dyn-spacing-xxs                # 0.125rem (2px)
--dyn-spacing-xs                 # 0.25rem (4px)
--dyn-spacing-sm                 # 0.5rem (8px)
--dyn-spacing-md                 # 0.75rem (12px)
--dyn-spacing-lg                 # 1rem (16px)
--dyn-spacing-xl                 # 1.5rem (24px)
--dyn-spacing-2xl                # 2rem (32px)
--dyn-spacing-3xl                # 3rem (48px)
```

#### SIZING DOMAIN
```
--dyn-size-[semantic]-[variant]

Examples:
--dyn-size-xs                    # Extra small (1rem)
--dyn-size-sm                    # Small (1.5rem)
--dyn-size-md                    # Medium (2.5rem)
--dyn-size-lg                    # Large (3rem)
--dyn-size-touch-target          # Minimum touch target (44px)
--dyn-size-touch-target-sm       # Small touch target (40px)
--dyn-size-touch-target-lg       # Large touch target (52px)
```

#### TYPOGRAPHY DOMAIN
```
--dyn-font-[property]-[variant]

Examples:
--dyn-font-family-base           # Base font stack
--dyn-font-family-mono           # Monospace font stack
--dyn-font-size-xs               # Extra small (0.75rem)
--dyn-font-size-sm               # Small (0.875rem)
--dyn-font-size-base             # Base size (1rem)
--dyn-font-size-lg               # Large (1.25rem)
--dyn-font-weight-normal         # 400
--dyn-font-weight-medium         # 500
--dyn-font-weight-semibold       # 600
--dyn-font-line-height-tight     # 1.25
--dyn-font-line-height-normal    # 1.5
--dyn-font-letter-spacing-tight  # -0.01em
```

#### BORDER DOMAIN
```
--dyn-border-radius-[size]
--dyn-border-width-[weight]

Examples:
--dyn-border-radius-xs           # 0.125rem
--dyn-border-radius-sm           # 0.25rem
--dyn-border-radius-md           # 0.5rem
--dyn-border-radius-lg           # 0.75rem
--dyn-border-radius-xl           # 1rem
--dyn-border-radius-pill         # 999px
--dyn-border-radius-full         # 9999px

--dyn-border-width-hairline      # 1px
--dyn-border-width-thin          # 2px
--dyn-border-width-thick         # 3px
```

#### SHADOW DOMAIN
```
--dyn-shadow-[elevation]

Examples:
--dyn-shadow-sm                  # Small elevation
--dyn-shadow-md                  # Medium elevation
--dyn-shadow-lg                  # Large elevation
--dyn-shadow-focus               # Focus state shadow
```

#### ANIMATION DOMAIN
```
--dyn-animation-[property]
--dyn-transition-[property]

Examples:
--dyn-animation-duration-base    # 0.2s
--dyn-animation-duration-slow    # 0.4s
--dyn-animation-easing-ease-out  # cubic-bezier(0.25, 0.46, 0.45, 0.94)
--dyn-animation-easing-ease-in-out # cubic-bezier(0.42, 0, 0.58, 1)
--dyn-transition-base            # all 0.2s ease-out
--dyn-transition-slow            # all 0.4s ease-out
```

#### OPACITY DOMAIN
```
--dyn-opacity-[level]

Examples:
--dyn-opacity-disabled           # 0.56
--dyn-opacity-hover              # 0.08
--dyn-opacity-active             # 0.16
```

#### Z-INDEX DOMAIN
```
--dyn-zindex-[layer]

Examples:
--dyn-zindex-base                # 0
--dyn-zindex-dropdown            # 100
--dyn-zindex-sticky              # 200
--dyn-zindex-fixed               # 300
--dyn-zindex-modal-backdrop      # 900
--dyn-zindex-modal               # 1000
--dyn-zindex-popover             # 1100
--dyn-zindex-tooltip             # 1200
```

### Component-Specific Tokens
```
--dyn-[component-name]-[property]-[state]

Examples:
--dyn-button-bg                  # Button background
--dyn-button-bg-hover            # Button background on hover
--dyn-button-color               # Button text color
--dyn-button-border              # Button border
--dyn-button-padding-y           # Button vertical padding
--dyn-button-padding-x           # Button horizontal padding
--dyn-button-min-height          # Button minimum height

--dyn-input-bg                   # Input background
--dyn-input-border               # Input border
--dyn-input-border-focus         # Input border on focus
--dyn-input-placeholder          # Placeholder text color
--dyn-input-disabled-bg          # Disabled input background

--dyn-table-header-bg-color      # Table header background
--dyn-table-border-color         # Table border
--dyn-table-row-hover-bg-color   # Table row on hover
```

### Naming Rules

1. **Use Lowercase Kebab Case**: `--dyn-color-primary-dark` ✅ vs `--dyn-colorPrimaryDark` ❌
2. **Semantic Over Descriptive**: `--dyn-color-primary-dark` ✅ vs `--dyn-color-blue-900` ❌
3. **Order from General to Specific**: `--dyn-[domain]-[type]-[variant]-[state]`
4. **Avoid Abbreviations**: `--dyn-background` ✅ vs `--dyn-bg` ❌ (except legacy aliases)
5. **State Modifiers at End**: `--dyn-button-bg-hover` ✅ vs `--dyn-button-hover-bg` ❌
6. **Pluralize Only When Necessary**: `--dyn-colors` only for collections
7. **Consistency Across Similar Tokens**: All sizes use `xs`, `sm`, `md`, `lg` pattern

---

## TOKEN CATEGORIES & DEFINITIONS

### 1. COLOR TOKENS

#### Structure
```json
{
  "color": {
    "primary": { "value": "#2563eb", "description": "Brand primary color" },
    "primary-hover": { "value": "#1d4ed8", "description": "Primary on hover" },
    "primary-active": { "value": "#1e40af", "description": "Primary on active" },
    "text-primary": { "value": "#111827", "description": "Primary text color" },
    "text-disabled": { "value": "#94a3b8", "description": "Disabled text color" }
  }
}
```

#### Foundation Colors (Light Mode)

**Neutrals & Backgrounds**:
| Token | Value | Usage |
|-------|-------|-------|
| `--dyn-color-background` | `#ffffff` | Page background |
| `--dyn-color-background-secondary` | `#f8fafc` | Secondary background |
| `--dyn-color-background-hover` | `#f1f5f9` | Background on hover |
| `--dyn-color-background-selected` | `#e2e8f0` | Selected state background |
| `--dyn-color-surface` | `#ffffff` | Component surface |
| `--dyn-color-surface-subtle` | `#f3f4f6` | Subtle surface |
| `--dyn-color-surface-muted` | `#e2e8f0` | Muted surface |
| `--dyn-color-surface-disabled` | `#f1f5f9` | Disabled surface |

**Text Colors**:
| Token | Value | Usage |
|-------|-------|-------|
| `--dyn-color-text-primary` | `#111827` | Primary body text |
| `--dyn-color-text-secondary` | `#475569` | Secondary text |
| `--dyn-color-text-tertiary` | `#64748b` | Tertiary/hint text |
| `--dyn-color-text-disabled` | `#94a3b8` | Disabled text |
| `--dyn-color-text-placeholder` | `#94a3b8` | Placeholder text |
| `--dyn-color-text-inverse` | `#f8fafc` | Inverse/light text |

**Borders**:
| Token | Value | Usage |
|-------|-------|-------|
| `--dyn-color-border` | `#d0d5dd` | Default border |
| `--dyn-color-border-light` | `#e2e8f0` | Light border |
| `--dyn-color-border-subtle` | `rgba(15, 23, 42, 0.08)` | Subtle border |
| `--dyn-color-border-hover` | `#94a3b8` | Border on hover |
| `--dyn-color-border-disabled` | `#e2e8f0` | Disabled border |

**Brand Colors**:
| Token | Value | Usage |
|-------|-------|-------|
| `--dyn-color-primary` | `#2563eb` | Primary CTA, links |
| `--dyn-color-primary-hover` | `#1d4ed8` | Primary on hover |
| `--dyn-color-primary-active` | `#1e40af` | Primary on active |
| `--dyn-color-primary-light` | `#60a5fa` | Light variant |
| `--dyn-color-primary-dark` | `#1e3a8a` | Dark variant |
| `--dyn-color-primary-contrast` | `#ffffff` | Text on primary |
| `--dyn-color-primary-alpha` | `rgba(37, 99, 235, 0.16)` | Transparent primary |

**Status Colors**:
| Token | Value | Usage |
|-------|-------|-------|
| `--dyn-color-success` | `#10b981` | Success state |
| `--dyn-color-warning` | `#f59e0b` | Warning state |
| `--dyn-color-info` | `#0ea5e9` | Info state |
| `--dyn-color-error` | `#ef4444` | Error state |
| `--dyn-color-danger` | `#dc2626` | Danger action |
| `--dyn-color-danger-hover` | `#b91c1c` | Danger on hover |

#### Dark Mode Overrides
```css
@media (prefers-color-scheme: dark) {
  :root {
    --dyn-color-background: #0f172a;
    --dyn-color-background-secondary: #1e293b;
    --dyn-color-text-primary: #f1f5f9;
    --dyn-color-text-secondary: #cbd5f5;
    --dyn-color-primary: #3b82f6;
    --dyn-color-primary-hover: #2563eb;
    /* ... all dark mode mappings */
  }
}
```

### 2. TYPOGRAPHY TOKENS

#### Font Families
```css
:root {
  --dyn-font-family-base: 'Inter', 'Segoe UI', system-ui, -apple-system, 
    BlinkMacSystemFont, 'Helvetica Neue', sans-serif;
  --dyn-font-family-mono: 'Fira Code', 'SFMono-Regular', Menlo, Monaco, 
    Consolas, 'Liberation Mono', 'Courier New', monospace;
}
```

#### Font Sizes Scale
| Token | Value | Usage |
|-------|-------|-------|
| `--dyn-font-size-xs` | `0.75rem` (12px) | Small labels, badges |
| `--dyn-font-size-sm` | `0.875rem` (14px) | Small text, secondary |
| `--dyn-font-size-base` | `1rem` (16px) | Body text |
| `--dyn-font-size-md` | `1.125rem` (18px) | Larger body |
| `--dyn-font-size-lg` | `1.25rem` (20px) | Subheadings |
| `--dyn-font-size-xl` | `1.5rem` (24px) | Headings |
| `--dyn-font-size-2xl` | `1.75rem` (28px) | Large headings |

#### Font Weights
| Token | Value | Usage |
|-------|-------|-------|
| `--dyn-font-weight-normal` | `400` | Regular text |
| `--dyn-font-weight-medium` | `500` | Slightly emphasized |
| `--dyn-font-weight-semibold` | `600` | Emphasized text |
| `--dyn-font-weight-bold` | `700` | Strong emphasis |

#### Line Heights
| Token | Value | Usage |
|-------|-------|-------|
| `--dyn-line-height-tight` | `1.25` | Headings |
| `--dyn-line-height-normal` | `1.5` | Body text |
| `--dyn-line-height-relaxed` | `1.75` | Long-form content |

#### Letter Spacing
| Token | Value | Usage |
|-------|-------|-------|
| `--dyn-letter-spacing-tight` | `-0.01em` | Headings |
| `--dyn-letter-spacing-normal` | `0` | Default |

### 3. SPACING TOKENS

```css
:root {
  /* 8px base scale */
  --dyn-spacing-xxs: 0.125rem;   /* 2px */
  --dyn-spacing-xs: 0.25rem;     /* 4px */
  --dyn-spacing-sm: 0.5rem;      /* 8px */
  --dyn-spacing-md: 0.75rem;     /* 12px */
  --dyn-spacing-lg: 1rem;        /* 16px */
  --dyn-spacing-xl: 1.5rem;      /* 24px */
  --dyn-spacing-2xl: 2rem;       /* 32px */
  --dyn-spacing-3xl: 3rem;       /* 48px */
  
  /* Layout helpers */
  --dyn-spacing-gutter: 1.5rem;
  --dyn-spacing-section: 3rem;
}
```

**Application Rules**:
- Padding: Use `spacing-md` to `spacing-xl`
- Margin: Use `spacing-sm` to `spacing-2xl`
- Gap: Use `spacing-md` to `spacing-2xl`
- Gutter: Use predefined `spacing-gutter`

### 4. SIZING TOKENS

```css
:root {
  /* Component sizes */
  --dyn-size-xs: 1rem;           /* 16px */
  --dyn-size-sm: 1.5rem;         /* 24px */
  --dyn-size-md: 2.5rem;         /* 40px */
  --dyn-size-lg: 3rem;           /* 48px */
  
  /* Touch targets */
  --dyn-size-touch-target: 44px;
  --dyn-size-touch-target-sm: 40px;
  --dyn-size-touch-target-lg: 52px;
}
```

### 5. BORDER TOKENS

#### Radius Scale
| Token | Value | Usage |
|-------|-------|-------|
| `--dyn-border-radius-xs` | `0.125rem` | Minimal rounding |
| `--dyn-border-radius-sm` | `0.25rem` | Subtle rounding |
| `--dyn-border-radius-md` | `0.5rem` | Default rounding |
| `--dyn-border-radius-lg` | `0.75rem` | Increased rounding |
| `--dyn-border-radius-xl` | `1rem` | Large rounding |
| `--dyn-border-radius-pill` | `999px` | Pill-shaped |
| `--dyn-border-radius-full` | `9999px` | Fully circular |

#### Width Scale
| Token | Value | Usage |
|-------|-------|-------|
| `--dyn-border-width-hairline` | `1px` | Subtle border |
| `--dyn-border-width-thin` | `2px` | Standard border |
| `--dyn-border-width-thick` | `3px` | Bold border |

### 6. SHADOW TOKENS

```css
:root {
  --dyn-shadow-sm: 0 1px 2px rgba(15, 23, 42, 0.08);
  --dyn-shadow-md: 0 3px 6px rgba(15, 23, 42, 0.12);
  --dyn-shadow-lg: 0 10px 20px rgba(15, 23, 42, 0.16);
  --dyn-shadow-focus: 0 0 0 3px var(--dyn-color-focus-ring);
}
```

**Elevation Levels**:
- `sm`: Subtle elevation (cards, popovers)
- `md`: Standard elevation (modals, menus)
- `lg`: High elevation (dropdowns, tooltips)
- `focus`: Accessible focus indicator

### 7. ANIMATION TOKENS

```css
:root {
  /* Durations */
  --dyn-animation-duration-fast: 0.1s;
  --dyn-animation-duration-base: 0.2s;
  --dyn-animation-duration-slow: 0.4s;
  
  /* Easing functions */
  --dyn-animation-easing-ease-out: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --dyn-animation-easing-ease-in: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  --dyn-animation-easing-ease-in-out: cubic-bezier(0.42, 0, 0.58, 1);
  --dyn-animation-easing-ease-linear: linear;
  
  /* Transitions */
  --dyn-transition-base: all 0.2s var(--dyn-animation-easing-ease-out);
  --dyn-transition-slow: all 0.4s var(--dyn-animation-easing-ease-out);
  --dyn-transition-fast: all 0.1s var(--dyn-animation-easing-ease-out);
}

/* Respects reduced motion */
@media (prefers-reduced-motion: reduce) {
  :root {
    --dyn-animation-duration-fast: 0.01ms;
    --dyn-animation-duration-base: 0.01ms;
    --dyn-animation-duration-slow: 0.01ms;
    --dyn-transition-base: none;
    --dyn-transition-slow: none;
    --dyn-transition-fast: none;
  }
}
```

### 8. OPACITY TOKENS

```css
:root {
  --dyn-opacity-disabled: 0.56;
  --dyn-opacity-hover: 0.08;
  --dyn-opacity-active: 0.16;
  --dyn-opacity-subtle: 0.04;
}
```

### 9. Z-INDEX TOKENS

```css
:root {
  --dyn-zindex-base: 0;
  --dyn-zindex-dropdown: 100;
  --dyn-zindex-sticky: 200;
  --dyn-zindex-fixed: 300;
  --dyn-zindex-modal-backdrop: 900;
  --dyn-zindex-modal: 1000;
  --dyn-zindex-popover: 1100;
  --dyn-zindex-tooltip: 1200;
}
```

### 10. FOCUS STATE TOKENS (ACCESSIBILITY)

```css
:root {
  --dyn-focus-ring-width: 3px;
  --dyn-focus-ring-offset: 3px;
  --dyn-focus-ring-color: var(--dyn-color-focus-ring);
  --dyn-focus-outline: 
    3px solid var(--dyn-focus-ring-color);
  
  /* High contrast mode */
}

@media (prefers-contrast: high) {
  :root {
    --dyn-focus-ring-width: 4px;
    --dyn-focus-outline: 
      4px solid var(--dyn-color-focus-ring);
  }
}
```

---

## CSS ORGANIZATION & FILES

### File Organization Strategy

#### Level 1: Foundation CSS Files
**Location**: `packages/design-tokens/styles/foundations/`

```
foundations/
├── colors.css              # 400 lines max
├── typography.css          # 50 lines max
├── spacing.css             # 80 lines max
├── sizing.css              # 60 lines max
├── borders.css             # 40 lines max
├── shadows.css             # 50 lines max
├── animations.css          # 80 lines max
├── opacity.css             # 30 lines max
├── zindex.css              # 40 lines max
└── focus-states.css        # 60 lines max
```

**Size Guidelines**: Each file < 500 lines

**Import Order**:
```css
/* foundations/index.css */
@import './colors.css';
@import './typography.css';
@import './spacing.css';
@import './sizing.css';
@import './borders.css';
@import './shadows.css';
@import './animations.css';
@import './opacity.css';
@import './zindex.css';
@import './focus-states.css';
```

#### Level 2: Component Base CSS Files
**Location**: `packages/design-tokens/styles/components/`

```
components/
├── button-like.css         # Base for all button-style components
├── input-like.css          # Base for all input-style components
├── layout.css              # Layout helper patterns
├── interactive-states.css  # Hover, focus, active, disabled patterns
└── density-variants.css    # Compact, normal, spacious patterns
```

**Size Guidelines**: Each file < 300 lines

#### Level 3: Component-Specific CSS Files
**Location**: `packages/dyn-ui-react/src/components/[ComponentName]/`

**File Structure**:
```
DynButton/
├── DynButton.module.css         # Component styles (< 200 lines)
├── DynButton.types.ts           # Component types
├── DynButton.tsx                # Component implementation
├── DynButton.stories.tsx        # Storybook
├── DynButton.test.tsx           # Tests
└── index.ts                     # Export

DynInput/
├── DynInput.module.css          # Component styles (< 250 lines)
├── DynInput.types.ts
├── DynInput.tsx
├── DynInput.stories.tsx
├── DynInput.test.tsx
└── index.ts
```

**Size Limits**:
- Component CSS Module: ≤ 200 lines (simple) / ≤ 300 lines (complex)
- Reason: Too large indicates missing component-base layer

#### Level 4: Theme CSS Files
**Location**: `packages/design-tokens/styles/themes/`

```
themes/
├── dark.css                # Dark mode overrides
├── high-contrast.css       # High contrast mode
└── colorblind.css          # Color-blind accessible
```

### Complete Import Chain

```css
/* Application root CSS */
@import '@dyn/design-tokens/styles/foundations/index.css';
@import '@dyn/design-tokens/styles/components/index.css';
@import '@dyn/design-tokens/styles/themes/dark.css';
```

### CSS File Template

**Foundation File Template**:
```css
/**
 * Design Token: [Category]
 * Domain: [Domain]
 * 
 * Provides: [List of tokens]
 * Used by: [Components that use these tokens]
 * 
 * Supports:
 * - Dark mode: YES/NO
 * - High contrast: YES/NO
 * - Reduced motion: YES/NO
 */

:root {
  /* [Section Name] */
  --dyn-[token-name]: [value];
  --dyn-[token-name]-variant: [value];
  
  /* [Fallback aliases] */
  --dyn-[legacy-name]: var(--dyn-[token-name]);
}

/* Dark mode support (if applicable) */
@media (prefers-color-scheme: dark) {
  :root {
    --dyn-[token-name]: [dark-value];
  }
}

/* High contrast support (if applicable) */
@media (prefers-contrast: high) {
  :root {
    --dyn-[token-name]: [high-contrast-value];
  }
}

/* Reduced motion support (if applicable) */
@media (prefers-reduced-motion: reduce) {
  :root {
    --dyn-[token-name]: [reduced-motion-value];
  }
}
```

**Component CSS Module Template**:
```css
/**
 * Component: DynButton
 * 
 * Token Dependencies:
 * - Foundation: colors, spacing, typography, borders, shadows, animations
 * - Component Base: button-like, interactive-states
 * - Tokens: --dyn-button-*, --dyn-size-*
 * 
 * States: primary, secondary, tertiary, danger
 * Sizes: small, medium, large
 * Interactive: hover, focus, active, disabled, loading
 */

.root {
  /* Component-level token definitions */
  --dyn-button-bg: var(--dyn-color-primary);
  --dyn-button-border: var(--dyn-color-primary);
  --dyn-button-color: var(--dyn-color-primary-contrast);
  --dyn-button-bg-hover: var(--dyn-color-primary-hover);
  --dyn-button-padding-y: var(--dyn-spacing-sm);
  --dyn-button-padding-x: var(--dyn-spacing-md);
  --dyn-button-gap: var(--dyn-spacing-sm);
  --dyn-button-min-height: var(--dyn-size-md);
  
  /* Component implementation */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--dyn-button-gap);
  padding: var(--dyn-button-padding-y) var(--dyn-button-padding-x);
  min-height: var(--dyn-button-min-height);
  border-radius: var(--dyn-border-radius-md);
  border: 1px solid var(--dyn-button-border);
  background-color: var(--dyn-button-bg);
  color: var(--dyn-button-color);
  /* ... rest of implementation */
}

/* Variants */
.kindPrimary { /* ... */ }
.kindSecondary { /* ... */ }

.sizeSmall { /* ... */ }
.sizeMedium { /* ... */ }
.sizeLarge { /* ... */ }

/* Interactive states */
.root:hover { /* ... */ }
.root:focus-visible { /* ... */ }
.root:active { /* ... */ }
.root:disabled { /* ... */ }

/* Dark mode */
@media (prefers-color-scheme: dark) {
  .root { /* ... */ }
}

/* Responsive */
@media (max-width: 767px) {
  .root { /* ... */ }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .root { transition: none; }
}
```

---

## INHERITANCE & OVERRIDES

### Cascade Rules

```
Component CSS (highest priority)
    ↓ overrides
Component Base CSS
    ↓ overrides
Foundation CSS
    ↓ overrides
Browser Defaults (lowest priority)
```

### Proper Override Strategy

#### ✅ CORRECT: Reference Lower Layers

```css
/* Foundation */
:root {
  --dyn-color-primary: #2563eb;
}

/* Component Base */
.button-like {
  --dyn-button-bg: var(--dyn-color-primary);
}

/* Component Specific */
.root {
  --dyn-button-bg: var(--dyn-color-primary);
  background-color: var(--dyn-button-bg);
}
```

#### ❌ WRONG: Direct Value Duplication

```css
/* Foundation */
:root {
  --dyn-color-primary: #2563eb;
}

/* Component - WRONG: Hardcoded value */
.root {
  background-color: #2563eb;  /* ❌ Duplicates foundation value */
}
```

#### ❌ WRONG: Breaking Chain

```css
/* Foundation */
:root {
  --dyn-color-primary: #2563eb;
}

/* Component Base - WRONG: Skips reference */
.button-like {
  --dyn-button-bg: #2563eb;  /* ❌ Hardcoded instead of var() */
}

/* Component */
.root {
  background-color: var(--dyn-button-bg);
}
```

### Fallback Pattern (Required)

**Every component token must have fallbacks**:

```css
.root {
  /* Preferred -> Component Base -> Foundation -> Hardcoded Fallback */
  background-color: var(
    --dyn-button-bg,           /* Component-specific */
    var(
      --dyn-color-primary,     /* Foundation */
      #2563eb                  /* Final fallback */
    )
  );
}
```

**Why**: Ensures rendering even if CSS files partially load

### State Overrides

#### Interactive States

```css
.root {
  --dyn-button-bg: var(--dyn-color-primary);
  background-color: var(--dyn-button-bg);
  transition: var(--dyn-transition-base);
}

/* Hover state override */
.root:hover:not(:disabled) {
  --dyn-button-bg: var(--dyn-color-primary-hover);
  /* No need to repeat background-color, it uses updated variable */
}

/* Focus state override */
.root:focus-visible {
  outline: var(--dyn-focus-outline);
  box-shadow: var(--dyn-shadow-focus);
}

/* Active state override */
.root:active:not(:disabled) {
  --dyn-button-bg: var(--dyn-color-primary-active);
}

/* Disabled state override */
.root:disabled {
  opacity: var(--dyn-opacity-disabled);
}
```

#### Variant Overrides

```css
.root {
  --dyn-button-bg: var(--dyn-color-primary);
  --dyn-button-border: var(--dyn-color-primary);
}

/* Primary variant: uses root defaults */
.kindPrimary {
  /* Inherits from .root */
}

/* Secondary variant: override specific tokens */
.kindSecondary {
  --dyn-button-bg: transparent;
  --dyn-button-border: var(--dyn-color-primary);
  --dyn-button-color: var(--dyn-color-primary);
}

/* Tertiary variant: different override */
.kindTertiary {
  --dyn-button-bg: transparent;
  --dyn-button-border: transparent;
  --dyn-button-color: var(--dyn-color-primary);
}
```

#### Size Overrides

```css
.root {
  --dyn-button-padding-y: var(--dyn-spacing-sm);
  --dyn-button-padding-x: var(--dyn-spacing-md);
  --dyn-button-min-height: var(--dyn-size-md);
}

.sizeSmall {
  --dyn-button-padding-y: var(--dyn-spacing-xs);
  --dyn-button-padding-x: var(--dyn-spacing-sm);
  --dyn-button-min-height: var(--dyn-size-sm);
  font-size: var(--dyn-font-size-xs);
}

.sizeLarge {
  --dyn-button-padding-y: var(--dyn-spacing-md);
  --dyn-button-padding-x: var(--dyn-spacing-lg);
  --dyn-button-min-height: var(--dyn-size-lg);
  font-size: var(--dyn-font-size-md);
}
```

### Theme Overrides

```css
/* Light mode (default) */
:root {
  --dyn-color-primary: #2563eb;
  --dyn-color-background: #ffffff;
}

/* Dark mode override */
@media (prefers-color-scheme: dark) {
  :root {
    --dyn-color-primary: #3b82f6;
    --dyn-color-background: #0f172a;
  }
}

/* Component automatically updates */
.root {
  background-color: var(--dyn-color-background);
  color: var(--dyn-color-primary);
  /* Works correctly in both themes */
}
```

### No Unnecessary Resets

❌ Don't reset values that inherit:

```css
/* WRONG */
.sizeSmall {
  --dyn-button-padding-y: var(--dyn-spacing-xs);
  --dyn-button-padding-x: var(--dyn-spacing-sm);
  --dyn-button-min-height: var(--dyn-size-sm);
  --dyn-button-border: var(--dyn-button-border);  /* ❌ Unnecessary reset */
}
```

✅ Only override what changes:

```css
/* CORRECT */
.sizeSmall {
  --dyn-button-padding-y: var(--dyn-spacing-xs);
  --dyn-button-padding-x: var(--dyn-spacing-sm);
  --dyn-button-min-height: var(--dyn-size-sm);
  /* --dyn-button-border inherited from .root */
}
```

---

## COMPONENT TOKEN IMPLEMENTATION

### Component Analysis Map

#### Button-Like Components
Components: **DynButton**, DynIconButton

**Required Tokens**:
```
Colors:
  - --dyn-button-bg
  - --dyn-button-border
  - --dyn-button-color
  - --dyn-button-bg-hover
  - --dyn-button-border-hover
  - --dyn-button-color-hover
  - --dyn-button-bg-active
  - --dyn-button-border-active
  - --dyn-button-color-active
  - --dyn-button-bg-disabled (via opacity)

Sizing:
  - --dyn-button-min-height
  - --dyn-button-padding-y
  - --dyn-button-padding-x
  - --dyn-button-gap

Typography:
  - --dyn-font-size-base / --dyn-font-size-sm (variants)
  - --dyn-font-weight-medium

Effects:
  - --dyn-border-radius-md
  - --dyn-shadow-md (on hover)
  - --dyn-shadow-sm (on active)

Transitions:
  - --dyn-transition-base
```

**Variants**:
1. **Kind**: primary, secondary, tertiary
2. **Size**: small, medium, large
3. **Danger**: danger flag modifier

#### Input-Like Components
Components: **DynInput**, **DynTextArea**, **DynSelect**, DynDatePicker, DynCheckbox

**Required Tokens**:
```
Colors:
  - --dyn-input-bg
  - --dyn-input-border
  - --dyn-input-color
  - --dyn-input-placeholder
  - --dyn-input-border-hover
  - --dyn-input-border-focus
  - --dyn-input-focus-ring
  - --dyn-input-disabled-bg
  - --dyn-input-disabled-color
  - --dyn-input-readonly-bg
  - --dyn-input-error

Sizing:
  - --dyn-input-height (variants: sm, md, lg)
  - --dyn-input-padding-y
  - --dyn-input-padding-x

Typography:
  - --dyn-font-family-base
  - --dyn-font-size-base / --dyn-font-size-sm (variants)
  - --dyn-line-height-base

Effects:
  - --dyn-border-radius-md
  - --dyn-border-width-hairline

Transitions:
  - --dyn-transition-base
```

**Variants**:
1. **Size**: small, medium, large
2. **State**: error, readonly, disabled
3. **Type**: text, email, number, password, etc.

#### Layout Components
Components: **DynFlex**, **DynGrid**, **DynStack**, **DynBox**, DynContainer

**Required Tokens**:
```
Spacing:
  - --dyn-spacing-* (gap, padding, margin)

Typography:
  - --dyn-line-height-* (for text flow)

Sizing:
  - --dyn-size-* (responsive sizes)

Effects:
  - --dyn-shadow-* (optional elevation)
  - --dyn-border-radius-* (optional rounding)
```

#### Data Display Components
Components: **DynTable**, **DynListView**, DynTreeView

**Required Tokens**:
```
Colors:
  - --dyn-table-header-bg-color
  - --dyn-table-header-text-color
  - --dyn-table-border-color
  - --dyn-table-row-hover-bg-color
  - --dyn-table-row-selected-bg-color
  - --dyn-table-text-color

Sizing:
  - --dyn-table-size-*-padding
  - --dyn-table-size-*-font-size
  - --dyn-table-checkbox-size

Typography:
  - --dyn-table-font-family
  - --dyn-table-header-font-weight
  - --dyn-table-header-text-transform

Effects:
  - --dyn-table-border-width
  - --dyn-table-header-border-width
```

### Component CSS Module Standards

#### DynButton.module.css Example (CORRECT)

```css
/**
 * Component: DynButton
 * 
 * Token Dependencies:
 * - Colors: primary, danger, text colors
 * - Spacing: padding tokens
 * - Typography: font sizes, weights
 * - Borders: border-radius-md
 * - Shadows: shadow-md, shadow-sm
 * - Animations: transition-base
 * 
 * Variants: primary, secondary, tertiary, danger
 * Sizes: small, medium, large
 * States: hover, focus, active, disabled, loading
 */

.root {
  /* Component token definitions - CRITICAL SECTION */
  --dyn-button-bg: var(--dyn-color-primary, var(--color-primary, #2563eb));
  --dyn-button-border: var(--dyn-color-primary, var(--color-primary, #2563eb));
  --dyn-button-color: var(--dyn-color-primary-contrast, var(--color-primary-contrast, #ffffff));
  --dyn-button-bg-hover: var(--dyn-color-primary-hover, var(--color-primary-hover, #1d4ed8));
  --dyn-button-border-hover: var(--dyn-color-primary-hover, var(--color-primary-hover, #1d4ed8));
  --dyn-button-bg-active: var(--dyn-color-primary-active, var(--color-primary-active, #1e40af));
  --dyn-button-border-active: var(--dyn-color-primary-active, var(--color-primary-active, #1e40af));
  --dyn-button-shadow-hover: var(--dyn-shadow-md, var(--shadow-md, 0 8px 16px rgba(37, 99, 235, 0.18)));
  --dyn-button-shadow-active: var(--dyn-shadow-sm, var(--shadow-sm, 0 4px 10px rgba(30, 64, 175, 0.24)));
  --dyn-button-padding-y: var(--dyn-spacing-sm, var(--spacing-sm, 0.5rem));
  --dyn-button-padding-x: var(--dyn-spacing-md, var(--spacing-md, 1rem));
  --dyn-button-gap: var(--dyn-spacing-sm, var(--spacing-sm, 0.5rem));
  --dyn-button-min-height: var(--dyn-size-md, var(--size-md, 2.5rem));

  /* Component implementation */
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--dyn-button-gap);
  padding: var(--dyn-button-padding-y) var(--dyn-button-padding-x);
  min-height: var(--dyn-button-min-height);
  border-radius: var(--dyn-border-radius-md, var(--border-radius-md, 0.5rem));
  border: 1px solid var(--dyn-button-border);
  background-color: var(--dyn-button-bg);
  color: var(--dyn-button-color);
  font-family: var(--dyn-font-family-base, var(--font-family-base, inherit));
  font-size: var(--dyn-font-size-sm, var(--font-size-sm, 0.875rem));
  font-weight: var(--dyn-font-weight-medium, var(--font-weight-medium, 500));
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  transition: var(--dyn-transition-base, all 0.2s ease-out);
}

/* Focus state - REQUIRED for accessibility */
.root:focus-visible {
  outline: 3px solid var(--dyn-color-focus-ring, var(--color-focus-ring, rgba(37, 99, 235, 0.35)));
  outline-offset: 3px;
  z-index: 1;
}

/* Hover state */
.root:hover:not(:disabled):not(.loading) {
  background-color: var(--dyn-button-bg-hover);
  border-color: var(--dyn-button-border-hover);
  box-shadow: var(--dyn-button-shadow-hover);
  transform: translateY(-1px);
}

/* Active state */
.root:active:not(:disabled):not(.loading) {
  background-color: var(--dyn-button-bg-active);
  border-color: var(--dyn-button-border-active);
  box-shadow: var(--dyn-button-shadow-active);
  transform: translateY(0);
}

/* Disabled state */
.root:disabled {
  cursor: not-allowed;
  opacity: var(--dyn-opacity-disabled, var(--opacity-disabled, 0.56));
}

/* ========== VARIANT CLASSES ========== */

.kindPrimary {
  /* Default variant, already set in .root */
}

.kindSecondary {
  --dyn-button-bg: transparent;
  --dyn-button-border: var(--dyn-color-primary, var(--color-primary, #2563eb));
  --dyn-button-color: var(--dyn-color-primary, var(--color-primary, #2563eb));
  --dyn-button-bg-hover: var(--dyn-color-surface-subtle, var(--color-surface-subtle, rgba(37, 99, 235, 0.08)));
  --dyn-button-border-hover: var(--dyn-color-primary-hover, var(--color-primary-hover, #1d4ed8));
  --dyn-button-bg-active: var(--dyn-color-surface-muted, var(--color-surface-muted, rgba(37, 99, 235, 0.16)));
}

.kindTertiary {
  --dyn-button-bg: transparent;
  --dyn-button-border: transparent;
  --dyn-button-color: var(--dyn-color-primary, var(--color-primary, #2563eb));
  --dyn-button-bg-hover: var(--dyn-color-surface-subtle, var(--color-surface-subtle, rgba(37, 99, 235, 0.1)));
  --dyn-button-bg-active: var(--dyn-color-surface-muted, var(--color-surface-muted, rgba(37, 99, 235, 0.18)));
}

/* ========== SIZE CLASSES ========== */

.sizeSmall {
  --dyn-button-padding-y: var(--dyn-spacing-xs, var(--spacing-xs, 0.375rem));
  --dyn-button-padding-x: var(--dyn-spacing-sm, var(--spacing-sm, 0.75rem));
  --dyn-button-gap: var(--dyn-spacing-xs, var(--spacing-xs, 0.375rem));
  --dyn-button-min-height: var(--dyn-size-sm, var(--size-sm, 2.25rem));
  font-size: var(--dyn-font-size-xs, var(--font-size-xs, 0.75rem));
}

.sizeMedium {
  /* Uses .root defaults */
}

.sizeLarge {
  --dyn-button-padding-y: var(--dyn-spacing-md, var(--spacing-md, 0.75rem));
  --dyn-button-padding-x: var(--dyn-spacing-lg, var(--spacing-lg, 1.5rem));
  --dyn-button-gap: var(--dyn-spacing-md, var(--spacing-md, 0.625rem));
  --dyn-button-min-height: var(--dyn-size-lg, var(--size-lg, 3rem));
  font-size: var(--dyn-font-size-md, var(--font-size-md, 1rem));
}

/* ========== DANGER VARIANT ========== */

.danger {
  --dyn-button-danger-flag: 1;
}

.danger.kindPrimary {
  --dyn-button-bg: var(--dyn-color-danger, var(--color-danger, #d32f2f));
  --dyn-button-border: var(--dyn-color-danger, var(--color-danger, #d32f2f));
  --dyn-button-color: var(--dyn-color-danger-contrast, var(--color-danger-contrast, #ffffff));
  --dyn-button-bg-hover: var(--dyn-color-danger-hover, var(--color-danger-hover, #b91c1c));
  --dyn-button-border-hover: var(--dyn-color-danger-hover, var(--color-danger-hover, #b91c1c));
  --dyn-button-bg-active: var(--dyn-color-danger-active, var(--color-danger-active, #991b1b));
  --dyn-button-border-active: var(--dyn-color-danger-active, var(--color-danger-active, #991b1b));
}

/* ========== LAYOUT UTILITIES ========== */

.fullWidth {
  width: 100%;
}

.iconOnly {
  --dyn-button-padding-x: var(--dyn-spacing-md, var(--spacing-md, 0.75rem));
  --dyn-button-padding-y: var(--dyn-spacing-md, var(--spacing-md, 0.75rem));
  width: var(--dyn-button-min-height);
  min-width: var(--dyn-button-min-height);
}

/* ========== DARK MODE ========== */

@media (prefers-color-scheme: dark) {
  .kindPrimary {
    --dyn-button-bg: var(--dyn-color-primary-dark, var(--color-primary-dark, #3b82f6));
    --dyn-button-border: var(--dyn-color-primary-dark, var(--color-primary-dark, #3b82f6));
    --dyn-button-bg-hover: var(--dyn-color-primary-dark-hover, var(--color-primary-dark-hover, #2563eb));
  }
  
  .danger.kindPrimary {
    --dyn-button-bg: var(--dyn-color-danger-dark, var(--color-danger-dark, #ef4444));
    --dyn-button-border: var(--dyn-color-danger-dark, var(--color-danger-dark, #ef4444));
  }
}

/* ========== RESPONSIVE ========== */

@media (max-width: 767px) {
  .root {
    min-height: var(--dyn-size-touch-target, var(--size-touch-target, 44px));
    --dyn-button-padding-y: var(--dyn-spacing-sm, var(--spacing-sm, 0.625rem));
    --dyn-button-padding-x: var(--dyn-spacing-md, var(--spacing-md, 1rem));
  }
  
  .sizeSmall {
    min-height: var(--dyn-size-touch-target-sm, var(--size-touch-target-sm, 40px));
  }
  
  .sizeLarge {
    min-height: var(--dyn-size-touch-target-lg, var(--size-touch-target-lg, 52px));
  }
  
  .iconOnly {
    min-width: var(--dyn-size-touch-target, var(--size-touch-target, 44px));
    width: var(--dyn-size-touch-target, var(--size-touch-target, 44px));
  }
}

/* ========== ACCESSIBILITY ========== */

@media (prefers-reduced-motion: reduce) {
  .root {
    transition: none;
  }
  
  .spinner {
    animation: none;
  }
}

@media (prefers-contrast: high) {
  .root {
    border-width: 2px;
  }
  
  .root:focus-visible {
    outline-width: 4px;
    outline-offset: 2px;
  }
}
```

#### DynInput.module.css Example (CORRECT)

```css
/**
 * Component: DynInput
 * 
 * Token Dependencies:
 * - Colors: surface, text, border, primary, error
 * - Spacing: padding tokens
 * - Typography: font families, sizes
 * - Borders: border-radius-md, border-width-hairline
 * - Animations: transition-base
 * 
 * Sizes: small, medium, large
 * States: focus, disabled, readonly, error
 */

.container {
  --dyn-input-bg: var(--dyn-color-surface, var(--color-surface, #ffffff));
  --dyn-input-color: var(--dyn-color-text-primary, var(--color-text-primary, #111827));
  --dyn-input-border: var(--dyn-color-border, var(--color-border, #d1d5db));
  --dyn-input-border-hover: var(--dyn-color-border-hover, var(--color-border-hover, #9ca3af));
  --dyn-input-border-focus: var(--dyn-color-primary, var(--color-primary, #2563eb));
  --dyn-input-focus-ring: var(--dyn-color-focus-ring, var(--color-focus-ring, rgba(37, 99, 235, 0.35)));
  --dyn-input-placeholder: var(--dyn-color-text-placeholder, var(--color-text-placeholder, #9ca3af));
  --dyn-input-disabled-bg: var(--dyn-color-surface-disabled, var(--color-surface-disabled, #f3f4f6));
  --dyn-input-disabled-color: var(--dyn-color-text-disabled, var(--color-text-disabled, #9ca3af));
  --dyn-input-readonly-bg: var(--dyn-color-surface-readonly, var(--color-surface-readonly, #f9fafb));
  --dyn-input-error: var(--dyn-color-danger, var(--color-danger, #d32f2f));

  display: flex;
  align-items: center;
  position: relative;
}

.input {
  appearance: none;
  width: 100%;
  color: var(--dyn-input-color);
  background: var(--dyn-input-bg);
  border: 1px solid var(--dyn-input-border);
  border-radius: var(--dyn-border-radius-md, var(--border-radius-md, 0.5rem));
  padding: var(--dyn-spacing-sm, var(--spacing-sm, 0.5rem)) var(--dyn-spacing-md, var(--spacing-md, 1rem));
  font-family: var(--dyn-font-family-base, var(--font-family-base, system-ui));
  font-size: var(--dyn-font-size-base, var(--font-size-base, 1rem));
  line-height: var(--dyn-line-height-base, var(--line-height-base, 1.5));
  transition: var(--dyn-transition-base, all 0.2s ease-out);
}

.input::placeholder {
  color: var(--dyn-input-placeholder);
}

.input:hover:not(.input--disabled):not(.input--readonly) {
  border-color: var(--dyn-input-border-hover);
}

.input:focus-visible {
  outline: none;
  border-color: var(--dyn-input-border-focus);
  box-shadow: 0 0 0 3px var(--dyn-input-focus-ring);
}

.input--disabled,
.input:disabled {
  background: var(--dyn-input-disabled-bg);
  color: var(--dyn-input-disabled-color);
  cursor: not-allowed;
}

.input--readonly,
.input[readonly] {
  background: var(--dyn-input-readonly-bg);
}

.input--small {
  --dyn-input-height: 2.25rem;
  height: var(--dyn-input-height);
  font-size: var(--dyn-font-size-sm, var(--font-size-sm, 0.875rem));
  padding: var(--dyn-spacing-xs, var(--spacing-xs, 0.375rem)) var(--dyn-spacing-sm, var(--spacing-sm, 0.75rem));
}

.input--medium {
  --dyn-input-height: 2.5rem;
  height: var(--dyn-input-height);
}

.input--large {
  --dyn-input-height: 3rem;
  height: var(--dyn-input-height);
  font-size: var(--dyn-font-size-md, var(--font-size-md, 1rem));
  padding: var(--dyn-spacing-md, var(--spacing-md, 0.75rem)) var(--dyn-spacing-lg, var(--spacing-lg, 1.5rem));
}

.input--error {
  border-color: var(--dyn-input-error);
}

/* Responsive */
@media (max-width: 767px) {
  .input,
  .input--small,
  .input--medium,
  .input--large {
    min-height: var(--dyn-size-touch-target, var(--size-touch-target, 44px));
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .input {
    transition: none;
  }
}

@media (prefers-contrast: high) {
  .input {
    border-width: 2px;
  }
}
```

### Anti-Patterns to Avoid

#### ❌ PATTERN 1: Hardcoded Values Instead of Tokens

```css
/* WRONG */
.root {
  background-color: #2563eb;          /* ❌ Hardcoded */
  padding: 8px 16px;                  /* ❌ Hardcoded */
  border-radius: 8px;                 /* ❌ Hardcoded */
  transition: all 0.2s ease;          /* ❌ Hardcoded */
}

/* CORRECT */
.root {
  background-color: var(--dyn-color-primary);
  padding: var(--dyn-spacing-sm) var(--dyn-spacing-md);
  border-radius: var(--dyn-border-radius-md);
  transition: var(--dyn-transition-base);
}
```

#### ❌ PATTERN 2: Nested CSS Variables Without Foundation Reference

```css
/* WRONG */
.root {
  --dyn-button-bg: #2563eb;           /* ❌ Hardcoded foundation value */
  background: var(--dyn-button-bg);
}

/* CORRECT */
.root {
  --dyn-button-bg: var(--dyn-color-primary);
  background: var(--dyn-button-bg);
}
```

#### ❌ PATTERN 3: Duplicate Token Definitions Across Components

```css
/* DynButton.module.css */
.root {
  --dyn-border-radius: 8px;           /* ❌ Duplicate */
}

/* DynInput.module.css */
.input {
  --dyn-border-radius: 8px;           /* ❌ Duplicate */
}

/* CORRECT: Use foundation token */
.root {
  border-radius: var(--dyn-border-radius-md);
}
```

#### ❌ PATTERN 4: Skipping Fallbacks

```css
/* WRONG */
.root {
  color: var(--dyn-color-text-primary);  /* ❌ No fallback */
}

/* CORRECT */
.root {
  color: var(--dyn-color-text-primary, var(--color-text-primary, #111827));
}
```

#### ❌ PATTERN 5: Not Using Interactive States

```css
/* WRONG */
.root {
  background: var(--dyn-color-primary);
  /* No hover/focus/active states */
}

/* CORRECT */
.root {
  background: var(--dyn-color-primary);
  transition: var(--dyn-transition-base);
}

.root:hover:not(:disabled) {
  background: var(--dyn-color-primary-hover);
}

.root:focus-visible {
  outline: 3px solid var(--dyn-color-focus-ring);
  outline-offset: 3px;
}

.root:active:not(:disabled) {
  background: var(--dyn-color-primary-active);
}

.root:disabled {
  opacity: var(--dyn-opacity-disabled);
}
```

---

## THEMES & VARIANTS

### Dark Mode Implementation

**Global Dark Mode Override**:

```css
/* /packages/design-tokens/styles/themes/dark.css */

@media (prefers-color-scheme: dark) {
  :root {
    /* Update all color tokens for dark mode */
    --dyn-color-background: #0f172a;
    --dyn-color-background-secondary: #1e293b;
    --dyn-color-surface: #1a1f35;
    --dyn-color-surface-subtle: #2d3748;
    --dyn-color-surface-muted: #4a5568;
    
    --dyn-color-text-primary: #f1f5f9;
    --dyn-color-text-secondary: #cbd5f5;
    --dyn-color-text-tertiary: #a0aec0;
    
    --dyn-color-border: #334155;
    --dyn-color-border-light: #475569;
    
    --dyn-color-primary: #3b82f6;
    --dyn-color-primary-hover: #2563eb;
    --dyn-color-primary-active: #1d4ed8;
    
    --dyn-color-danger: #ef4444;
    
    /* Shadows need adjustment for dark mode */
    --dyn-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
    --dyn-shadow-md: 0 3px 6px rgba(0, 0, 0, 0.4);
    --dyn-shadow-lg: 0 10px 20px rgba(0, 0, 0, 0.5);
  }
}
```

**Component-Level Dark Mode Overrides**:

```css
/* DynButton.module.css - include dark mode section */

@media (prefers-color-scheme: dark) {
  .kindPrimary {
    --dyn-button-bg: var(--dyn-color-primary-dark, var(--color-primary-dark, #3b82f6));
    --dyn-button-bg-hover: var(--dyn-color-primary-dark-hover, var(--color-primary-dark-hover, #2563eb));
    /* Only override if different from foundation */
  }
  
  .kindSecondary {
    /* Inherit updated foundation tokens */
  }
}
```

### High Contrast Mode

```css
/* /packages/design-tokens/styles/themes/high-contrast.css */

@media (prefers-contrast: high) {
  :root {
    /* Increase border widths */
    --dyn-border-width-thin: 3px;
    --dyn-border-width-thick: 4px;
    
    /* Increase outline size */
    --dyn-focus-ring-width: 4px;
  }
  
  /* Components */
  .root {
    border-width: var(--dyn-border-width-thin);
  }
  
  .root:focus-visible {
    outline-width: var(--dyn-focus-ring-width);
    outline-offset: 2px;
  }
}
```

### Density Variants

```css
/* Component base: density-variants.css */

.density-compact {
  --dyn-spacing-factor: 0.75;
  --dyn-button-padding-y: calc(var(--dyn-spacing-sm) * var(--dyn-spacing-factor));
  --dyn-button-padding-x: calc(var(--dyn-spacing-md) * var(--dyn-spacing-factor));
}

.density-normal {
  /* Default, no override needed */
}

.density-spacious {
  --dyn-spacing-factor: 1.25;
  --dyn-button-padding-y: calc(var(--dyn-spacing-sm) * var(--dyn-spacing-factor));
  --dyn-button-padding-x: calc(var(--dyn-spacing-md) * var(--dyn-spacing-factor));
}
```

---

## TESTING & VALIDATION

### Token Validation Tests

**File**: `/packages/design-tokens/src/index.test.ts`

```typescript
import { describe, it, expect } from 'vitest';

describe('Design Tokens', () => {
  describe('Token Existence', () => {
    it('should have all required color tokens', () => {
      const colors = [
        '--dyn-color-primary',
        '--dyn-color-text-primary',
        '--dyn-color-background',
        '--dyn-color-border',
      ];
      
      colors.forEach(token => {
        expect(getComputedStyle(document.documentElement).getPropertyValue(token).trim())
          .toBeTruthy();
      });
    });
    
    it('should have all required spacing tokens', () => {
      const spacings = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'];
      
      spacings.forEach(size => {
        const value = getComputedStyle(document.documentElement)
          .getPropertyValue(`--dyn-spacing-${size}`).trim();
        expect(value).toMatch(/^\d+(\.\d+)?(rem|px)$/);
      });
    });
  });
  
  describe('Token Values', () => {
    it('should have valid color values', () => {
      const colorRegex = /^#[0-9a-f]{6}$|^rgba\(/i;
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue('--dyn-color-primary').trim();
      
      expect(value).toMatch(colorRegex);
    });
    
    it('should have no duplicate token names', () => {
      // Add logic to check for duplicate token definitions
    });
  });
  
  describe('Dark Mode', () => {
    it('should update tokens in dark mode', async () => {
      // Create test element with dark mode media query
      const darkMode = window.matchMedia('(prefers-color-scheme: dark)');
      
      if (darkMode.matches) {
        const darkValue = getComputedStyle(document.documentElement)
          .getPropertyValue('--dyn-color-background').trim();
        
        expect(darkValue).toBe('#0f172a'); // Dark background
      }
    });
  });
  
  describe('Component Tokens', () => {
    it('should have required button tokens', () => {
      const buttonTokens = [
        '--dyn-button-bg',
        '--dyn-button-border',
        '--dyn-button-color',
        '--dyn-button-bg-hover',
        '--dyn-button-padding-y',
        '--dyn-button-padding-x',
      ];
      
      buttonTokens.forEach(token => {
        expect(getComputedStyle(document.documentElement).getPropertyValue(token).trim())
          .toBeTruthy();
      });
    });
    
    it('should have required input tokens', () => {
      const inputTokens = [
        '--dyn-input-bg',
        '--dyn-input-border',
        '--dyn-input-color',
        '--dyn-input-placeholder',
        '--dyn-input-focus-ring',
      ];
      
      inputTokens.forEach(token => {
        expect(getComputedStyle(document.documentElement).getPropertyValue(token).trim())
          .toBeTruthy();
      });
    });
  });
  
  describe('Accessibility', () => {
    it('should have sufficient color contrast', () => {
      // Use WCAG contrast ratio calculation
      // validate text color vs background color
    });
    
    it('should have focus ring tokens', () => {
      expect(getComputedStyle(document.documentElement).getPropertyValue('--dyn-focus-ring-width').trim())
        .toBeTruthy();
    });
  });
  
  describe('Responsive', () => {
    it('should have touch target sizes', () => {
      const touchTokens = [
        '--dyn-size-touch-target',
        '--dyn-size-touch-target-sm',
        '--dyn-size-touch-target-lg',
      ];
      
      touchTokens.forEach(token => {
        const value = getComputedStyle(document.documentElement).getPropertyValue(token).trim();
        expect(parseInt(value)).toBeGreaterThanOrEqual(40); // Minimum 40px
      });
    });
  });
});
```

### Component CSS Validation

**File**: `/packages/dyn-ui-react/src/components/index.test.tsx`

```typescript
import { describe, it, expect } from 'vitest';
import * as components from './index';

describe('Component Token Usage', () => {
  const componentList = Object.keys(components);
  
  componentList.forEach(componentName => {
    describe(`${componentName} CSS`, () => {
      it('should use design tokens instead of hardcoded values', async () => {
        const componentPath = `./${componentName}/${componentName}.module.css`;
        const content = await import(componentPath, { assert: { type: 'css' } });
        
        // Check for hardcoded color values (simplified check)
        const colorPattern = /#[0-9a-f]{6}(?!;)/gi;
        const hardcodedColors = (content.toString().match(colorPattern) || [])
          .filter((color: string) => !isCommonFallback(color));
        
        expect(hardcodedColors.length).toBe(0);
      });
      
      it('should define required component tokens', async () => {
        // Based on component type, verify required tokens exist
      });
    });
  });
});
```

### Build-Time Validation

**File**: `/packages/design-tokens/scripts/validate-tokens.js`

```javascript
const fs = require('fs');
const path = require('path');

const validateTokens = () => {
  const cssFiles = [];
  const tokenRegex = /--dyn-[\w-]+:/g;
  const allTokens = new Set();
  const duplicates = [];
  
  // Scan all CSS files for tokens
  const walkDir = (dir) => {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        walkDir(fullPath);
      } else if (file.endsWith('.css')) {
        const content = fs.readFileSync(fullPath, 'utf8');
        const matches = content.match(tokenRegex);
        
        if (matches) {
          matches.forEach(match => {
            const token = match.slice(0, -1); // Remove ':'
            if (allTokens.has(token)) {
              duplicates.push({token, file: fullPath});
            }
            allTokens.add(token);
          });
        }
      }
    });
  };
  
  walkDir('./styles');
  
  if (duplicates.length > 0) {
    console.error('❌ Duplicate token definitions found:');
    duplicates.forEach(dup => {
      console.error(`  ${dup.token} in ${dup.file}`);
    });
    process.exit(1);
  }
  
  console.log(`✅ ${allTokens.size} unique tokens validated`);
};

validateTokens();
```

---

## MIGRATION & DEPRECATION

### Deprecation Timeline

**Phase 1: Announcement (Version X.0.0)**
- Document deprecated tokens
- Update CHANGELOG
- Add deprecation warnings in comments

**Phase 2: Grace Period (Versions X.0.0 → X.2.0)**
- Keep deprecated tokens functional
- Emit console warnings in dev mode
- Provide migration guide

**Phase 3: Removal (Version X+1.0.0)**
- Remove deprecated tokens
- Update all components
- Release as breaking change

### Deprecation Template

```css
/**
 * @deprecated Use --dyn-spacing-md instead (will be removed in v2.0.0)
 * Migration: Replace all instances of --dyn-padding with --dyn-spacing-md
 */
--dyn-padding: var(--dyn-spacing-md);
```

### Migration Path Example

**Scenario**: Moving table tokens from global CSS to component-specific

**Before**:
```css
/* table.css (DEPRECATED) */
:root {
  --dyn-table-header-bg-color: #f5f5f5;
  --dyn-table-border-color: #e0e0e0;
}

/* DynTable.module.css */
.header {
  background: var(--dyn-table-header-bg-color);
  border: 1px solid var(--dyn-table-border-color);
}
```

**After**:
```css
/* DynTable.module.css */
.root {
  --dyn-table-header-bg-color: var(--dyn-color-surface-subtle);
  --dyn-table-border-color: var(--dyn-color-border);
}

.header {
  background: var(--dyn-table-header-bg-color);
  border: 1px solid var(--dyn-table-border-color);
}
```

**Deprecation Notice**:
```css
/**
 * @deprecated table.css is deprecated as of v1.1.0
 * Migration: Import DynTable component CSS instead
 * Removed in: v2.0.0
 * 
 * Before:
 *   @import '@dyn/design-tokens/table.css';
 * 
 * After:
 *   @import '@dyn/dyn-ui-react/components/DynTable/DynTable.module.css';
 */
```

---

## SUMMARY OF KEY STANDARDS

### Token Definition Rules
1. ✅ Use `--dyn-` prefix for all tokens
2. ✅ Use kebab-case naming: `--dyn-color-primary-hover`
3. ✅ Always include fallback values: `var(--dyn-color-primary, #2563eb)`
4. ✅ Reference lower layers only (no circular references)
5. ✅ Update tokens in interactive states without repeating properties

### CSS Organization Rules
1. ✅ Foundation tokens in dedicated files (< 500 lines each)
2. ✅ Component tokens in component CSS modules (< 300 lines)
3. ✅ Theme overrides in separate theme files
4. ✅ Clear import order: foundation → component → theme

### Component Implementation Rules
1. ✅ Define all component tokens at `.root` level
2. ✅ Define variants as separate classes (`.kindPrimary`, `.sizeLarge`)
3. ✅ Include all interactive states (hover, focus, active, disabled)
4. ✅ Support dark mode with `@media (prefers-color-scheme: dark)`
5. ✅ Support accessibility (focus-visible, reduced-motion, high-contrast)
6. ✅ Support responsive design with appropriate media queries

### Testing & Validation Rules
1. ✅ Write token validation tests
2. ✅ Check for hardcoded values in components
3. ✅ Validate color contrast ratios
4. ✅ Ensure all tokens are used
5. ✅ Run build-time validation

### Maintenance Rules
1. ✅ Follow deprecation timeline (announce → grace period → remove)
2. ✅ Document all token changes
3. ✅ Maintain backward compatibility during grace period
4. ✅ Provide migration guides for breaking changes
5. ✅ Review tokens quarterly for optimization

---

## APPENDIX A: TOKEN REFERENCE CHECKLIST

### Required Foundation Tokens
- [ ] Color: 40+ tokens (brand, status, text, backgrounds, borders)
- [ ] Typography: 10+ tokens (families, sizes, weights, line heights)
- [ ] Spacing: 8 tokens (xxs through 3xl scale)
- [ ] Sizing: 7+ tokens (component heights, touch targets)
- [ ] Borders: 10 tokens (radius variants, width variants)
- [ ] Shadows: 4 tokens (elevation levels + focus)
- [ ] Animations: 9+ tokens (durations, easing, transitions)
- [ ] Opacity: 4 tokens (disabled, hover, active, subtle)
- [ ] Z-Index: 8 tokens (layering system)
- [ ] Focus States: 4 tokens (ring, outline, width, offset)

### Required Component Types
- [ ] Button-like: DynButton, DynIconButton
- [ ] Input-like: DynInput, DynTextArea, DynSelect, DynDatePicker, DynCheckbox
- [ ] Layout: DynFlex, DynGrid, DynStack, DynBox, DynContainer
- [ ] Data: DynTable, DynListView, DynTreeView
- [ ] Navigation: DynMenu, DynTabs, DynBreadcrumb, DynSidebar
- [ ] Overlay: DynModal, DynDropdown, DynPopover
- [ ] Display: DynBadge, DynAvatar, DynDivider, DynLabel
- [ ] Specialized: DynChart, DynGauge, DynStepper, DynToolbar, DynAppbar, DynPage

### Files to Create/Update
- [ ] `/packages/design-tokens/styles/foundations/` (10 files)
- [ ] `/packages/design-tokens/styles/components/` (5 files)
- [ ] `/packages/design-tokens/styles/themes/` (3 files)
- [ ] `/packages/design-tokens/src/tokens.d.ts` (TypeScript definitions)
- [ ] `/packages/design-tokens/src/index.test.ts` (Validation tests)
- [ ] `/packages/design-tokens/scripts/validate-tokens.js` (Build validation)
- [ ] Component CSS modules (37 components)

---

## APPENDIX B: CODE EXAMPLES

### Complete Button Component Example

See "Component Token Implementation" section for full DynButton.module.css and DynInput.module.css examples with all patterns, states, variants, and accessibility features.

---

## DOCUMENT CHANGELOG

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Dec 20, 2025 | Initial standard document creation |

---

## APPROVAL RECORD

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Frontend Architect | [Name] | [Date] | [ ] |
| Design System Lead | [Name] | [Date] | [ ] |
| Engineering Lead | [Name] | [Date] | [ ] |

---

**END OF DOCUMENT**

This standard is effective immediately and applies to all new component development and token implementations within the DYN UI design system.
