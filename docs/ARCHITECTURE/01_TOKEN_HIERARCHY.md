# TOKEN HIERARCHY & ORGANIZATION

**Purpose**: Define how tokens are organized in 3 layers  
**Audience**: AI Agent + Developers  
**Date**: December 20, 2025

---

## 🏗️ THREE-LAYER TOKEN ARCHITECTURE

### LAYER 1: FOUNDATION TOKENS (Global, immutable)

```
Purpose: Define primitive design decisions
Location: packages/design-tokens/styles/foundations/
Scope: :root (global)
Examples:
  --dyn-color-primary: #2563eb
  --dyn-spacing-md: 0.75rem
  --dyn-font-size-base: 1rem
```

**Categories:**

#### 1.1 Colors (Foundation)
```css
--dyn-color-primary: #2563eb
--dyn-color-secondary: #f3f4f6
--dyn-color-success: #10b981
--dyn-color-warning: #f59e0b
--dyn-color-error: #ef4444
--dyn-color-info: #3b82f6
--dyn-color-neutral: #6b7280

/* Dark mode variants */
--dyn-color-primary-dark: #1e3a8a
--dyn-color-secondary-dark: #1f2937
/* ... etc for all colors */
```

#### 1.2 Spacing (Foundation)
```css
--dyn-spacing-xs: 0.25rem
--dyn-spacing-sm: 0.5rem
--dyn-spacing-md: 0.75rem
--dyn-spacing-lg: 1rem
--dyn-spacing-xl: 1.5rem
--dyn-spacing-2xl: 2rem
```

#### 1.3 Typography (Foundation)
```css
--dyn-font-size-xs: 0.75rem
--dyn-font-size-sm: 0.875rem
--dyn-font-size-base: 1rem
--dyn-font-size-lg: 1.125rem
--dyn-font-size-xl: 1.25rem

--dyn-font-weight-normal: 400
--dyn-font-weight-medium: 500
--dyn-font-weight-semibold: 600
--dyn-font-weight-bold: 700

--dyn-line-height-tight: 1.2
--dyn-line-height-normal: 1.5
--dyn-line-height-relaxed: 1.75
```

#### 1.4 Shadows (Foundation)
```css
--dyn-shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05)
--dyn-shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1)
--dyn-shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1)
--dyn-shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1)
--dyn-shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1)
```

#### 1.5 Border Radius (Foundation)
```css
--dyn-radius-none: 0
--dyn-radius-sm: 0.25rem
--dyn-radius-md: 0.5rem
--dyn-radius-lg: 0.75rem
--dyn-radius-xl: 1rem
--dyn-radius-full: 9999px
```

#### 1.6 Transitions (Foundation)
```css
--dyn-transition-fast: 150ms
--dyn-transition-base: 200ms
--dyn-transition-slow: 300ms
--dyn-transition-easing: cubic-bezier(0.4, 0, 0.2, 1)
```

#### 1.7 Z-Index (Foundation)
```css
--dyn-z-index-dropdown: 1000
--dyn-z-index-sticky: 1100
--dyn-z-index-fixed: 1200
--dyn-z-index-modal-backdrop: 1300
--dyn-z-index-modal: 1400
--dyn-z-index-popover: 1500
--dyn-z-index-tooltip: 1600
```

---

### LAYER 2: COMPONENT TOKENS (Component-scoped, references foundation)

```
Purpose: Define component-level decisions
Location: packages/design-tokens/styles/components/
Scope: .root (component CSS module scope, NOT global)
Pattern: Reference foundation tokens
Examples:
  --dyn-button-bg: var(--dyn-color-primary)
  --dyn-button-padding: var(--dyn-spacing-md)
```

**Categories:**

#### 2.1 Button-like Component Tokens
```css
/* In DynButton.module.css :root */
--dyn-button-bg: var(--dyn-color-primary, #2563eb)
--dyn-button-color: var(--dyn-color-primary-contrast, #ffffff)
--dyn-button-border: var(--dyn-color-border, rgba(0, 0, 0, 0.1))
--dyn-button-padding-y: var(--dyn-spacing-md, 0.75rem)
--dyn-button-padding-x: var(--dyn-spacing-lg, 1rem)
--dyn-button-font-size: var(--dyn-font-size-base, 1rem)
--dyn-button-font-weight: var(--dyn-font-weight-medium, 500)
--dyn-button-border-radius: var(--dyn-radius-md, 0.5rem)
--dyn-button-shadow: var(--dyn-shadow-sm, none)
--dyn-button-transition: var(--dyn-transition-base, 200ms)
--dyn-button-touch-target: var(--dyn-spacing-xl, 2.75rem)

/* Variants */
.componentSecondary {
  --dyn-button-bg: var(--dyn-color-secondary, #f3f4f6)
  --dyn-button-color: var(--dyn-color-secondary-contrast, #1f2937)
}
```

#### 2.2 Input-like Component Tokens
```css
/* In DynInput.module.css :root */
--dyn-input-bg: var(--dyn-color-surface, #ffffff)
--dyn-input-color: var(--dyn-color-text, #1f2937)
--dyn-input-border: var(--dyn-color-border, #d1d5db)
--dyn-input-border-hover: var(--dyn-color-border-hover, #9ca3af)
--dyn-input-border-focus: var(--dyn-color-primary, #2563eb)
--dyn-input-placeholder: var(--dyn-color-text-secondary, #9ca3af)
--dyn-input-padding-y: var(--dyn-spacing-sm, 0.5rem)
--dyn-input-padding-x: var(--dyn-spacing-md, 0.75rem)
--dyn-input-font-size: var(--dyn-font-size-base, 1rem)
--dyn-input-border-radius: var(--dyn-radius-md, 0.5rem)
--dyn-input-transition: var(--dyn-transition-base, 200ms)
--dyn-input-touch-target-height: var(--dyn-spacing-xl, 2.75rem)
```

#### 2.3 Layout Component Tokens
```css
/* In DynFlex.module.css :root */
--dyn-flex-gap: var(--dyn-spacing-md, 0.75rem)
--dyn-flex-padding: var(--dyn-spacing-lg, 1rem)

/* In DynGrid.module.css :root */
--dyn-grid-gap: var(--dyn-spacing-md, 0.75rem)
--dyn-grid-column-count: 12
```

#### 2.4 Display Component Tokens
```css
/* In DynBadge.module.css :root */
--dyn-badge-bg: var(--dyn-color-primary, #2563eb)
--dyn-badge-color: var(--dyn-color-primary-contrast, #ffffff)
--dyn-badge-padding-y: var(--dyn-spacing-xs, 0.25rem)
--dyn-badge-padding-x: var(--dyn-spacing-sm, 0.5rem)
--dyn-badge-font-size: var(--dyn-font-size-sm, 0.875rem)
--dyn-badge-border-radius: var(--dyn-radius-full, 9999px)
```

---

### LAYER 3: THEME TOKENS (Optional overrides for themes)

```
Purpose: Define theme-specific overrides
Location: packages/design-tokens/styles/themes/
Scope: :root (global, theme-specific)
Pattern: Override only changed tokens
Examples:
  Dark mode, high contrast, seasonal
```

**Categories:**

#### 3.1 Dark Mode Theme
```css
/* themes/dark.css or @media (prefers-color-scheme: dark) */
@media (prefers-color-scheme: dark) {
  :root {
    --dyn-color-primary: #1e3a8a
    --dyn-color-secondary: #1f2937
    --dyn-color-background: #111827
    --dyn-color-surface: #1f2937
    --dyn-color-text: #f9fafb
    --dyn-color-border: rgba(255, 255, 255, 0.1)
    
    /* Component tokens automatically inherit */
  }
}
```

#### 3.2 High Contrast Theme
```css
/* themes/high-contrast.css or @media (prefers-contrast: more) */
@media (prefers-contrast: more) {
  :root {
    --dyn-color-primary: #000000
    --dyn-color-error: #ff0000
    --dyn-shadow-sm: none
    
    /* Component tokens automatically inherit */
  }
}
```

---

## 🔗 HIERARCHICAL REFERENCE PATTERN

### Example: Button Token Resolution

```
In DynButton.module.css:
  --dyn-button-bg: var(--dyn-color-primary, #2563eb)
           ↓
In DynButton CSS property:
  background-color: var(--dyn-button-bg)
           ↓
Resolved value:
  → var(--dyn-color-primary, #2563eb)
  → #2563eb (light mode)
  → #1e3a8a (dark mode)
```

### Complete Reference Chain

```
CSS Property
  ↓
Component Token (Layer 2)
  --dyn-button-bg
  ↓
Foundation Token (Layer 1)
  --dyn-color-primary
  ↓
Theme Override (Layer 3)
  @media (prefers-color-scheme: dark)
  ↓
Final Computed Value
  #1e3a8a (dark mode) or #2563eb (light mode)
```

---

## 📊 TOKEN DEPENDENCY MATRIX

### Foundation → Component → Theme

```
Foundation Tokens (Layer 1)
├─ --dyn-color-primary
├─ --dyn-spacing-md
├─ --dyn-font-size-base
└─ --dyn-shadow-sm

        ↓ (referenced by)

Component Tokens (Layer 2)
├─ --dyn-button-bg
│  └─ references: --dyn-color-primary
├─ --dyn-button-padding-y
│  └─ references: --dyn-spacing-md
├─ --dyn-button-font-size
│  └─ references: --dyn-font-size-base
└─ --dyn-button-shadow
   └─ references: --dyn-shadow-sm

        ↓ (overridden by)

Theme Tokens (Layer 3)
├─ @media (prefers-color-scheme: dark)
│  └─ Overrides: --dyn-color-primary
├─ @media (prefers-contrast: more)
│  └─ Overrides: --dyn-shadow-sm
└─ Custom themes
   └─ Overrides: specific tokens
```

---

## ✅ TOKEN VALIDATION RULES

### Rule 1: Foundation Tokens
- ✅ Must be defined in styles/foundations/
- ✅ Must be global (:root scope)
- ✅ Should NOT reference other tokens
- ✅ Should NOT be component-specific

### Rule 2: Component Tokens
- ✅ Must be defined in component .module.css :root
- ✅ Must be component-scoped (NOT global)
- ✅ MUST reference foundation tokens
- ✅ Should NOT hardcode values (except fallbacks)

### Rule 3: Theme Tokens
- ✅ Must override foundation tokens
- ✅ MUST be in themes/ folder or @media queries
- ✅ Should only change what's necessary
- ✅ Component tokens automatically inherit

### Rule 4: Naming Convention
- ✅ Format: `--dyn-[domain]-[property]-[state]`
- ✅ Examples:
  - `--dyn-button-bg` ✅
  - `--dyn-button-bg-hover` ✅
  - `--dyn-input-border-focus` ✅
  - `--btn-background` ❌ (wrong prefix)
  - `--button_background` ❌ (wrong separator)

---

## 📁 FILE ORGANIZATION BY LAYER

```
packages/design-tokens/styles/

LAYER 1 - FOUNDATIONS/
├─ colors.css
│  └─ --dyn-color-*
├─ spacing.css
│  └─ --dyn-spacing-*
├─ typography.css
│  └─ --dyn-font-*
├─ shadows.css
│  └─ --dyn-shadow-*
├─ radius.css
│  └─ --dyn-radius-*
├─ transitions.css
│  └─ --dyn-transition-*
└─ z-index.css
   └─ --dyn-z-index-*

LAYER 2 - COMPONENTS/
├─ buttons.css
│  └─ --dyn-button-* (in .module.css)
├─ inputs.css
│  └─ --dyn-input-* (in .module.css)
├─ layout.css
│  └─ --dyn-flex-*, --dyn-grid-* (in .module.css)
├─ display.css
│  └─ --dyn-badge-* (in .module.css)
├─ data.css
│  └─ --dyn-table-*, --dyn-list-* (in .module.css)
├─ navigation.css
│  └─ --dyn-nav-*, --dyn-breadcrumb-* (in .module.css)
├─ overlay.css
│  └─ --dyn-modal-*, --dyn-tooltip-* (in .module.css)
└─ specialized.css
   └─ --dyn-[specialized]-* (in .module.css)

LAYER 3 - THEMES/
├─ light.css
│  └─ Light mode overrides (if needed)
├─ dark.css
│  └─ @media (prefers-color-scheme: dark)
├─ high-contrast.css
│  └─ @media (prefers-contrast: more)
└─ seasonal.css
   └─ Custom seasonal overrides
```

---

## 🎯 IMPLEMENTATION CHECKLIST

Before committing token changes:

- [ ] Foundation tokens defined in styles/foundations/
- [ ] Foundation tokens are global (:root scope)
- [ ] Component tokens defined in component .module.css :root
- [ ] Component tokens reference foundation tokens
- [ ] No hardcoded values in component tokens
- [ ] 3-level fallback present on all tokens
- [ ] Dark mode overrides in @media or themes/dark.css
- [ ] High contrast support in @media or themes/high-contrast.css
- [ ] Naming convention followed (--dyn-domain-property-state)
- [ ] All token categories covered
- [ ] Tests verify token application
- [ ] Storybook documents token usage

