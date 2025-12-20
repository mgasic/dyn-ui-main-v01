# 🏗️ DESIGN TOKENS ARCHITECTURE

**Status**: ✅ Approved  
**Last Updated**: December 20, 2025  
**Maintainer**: DYN-UI Team

---

## 📋 Overview

DYN-UI uses a **three-layer design token architecture** to manage styles consistently across all components.

### Architecture Layers

```
┌─────────────────────────────────────────┐
│  LAYER 1: GLOBAL BASE TOKENS            │
│  (packages/design-tokens/)              │
│  └─ Source of Truth                     │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│  LAYER 2: COMPONENT-SCOPED TOKENS       │
│  (each component's .module.css)         │
│  └─ Component-specific namespace        │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│  LAYER 3: CSS RULES                     │
│  (actual styles using tokens)           │
│  └─ Readable and maintainable           │
└─────────────────────────────────────────┘
```

---

## 📁 Layer 1: Global Base Tokens

**Location**: `packages/design-tokens/`

### Token Files

```
packages/design-tokens/
├── colors.css              # Color palette (~40+ tokens)
├── spacing.css             # Spacing values (xs-2xl)
├── typography.css          # Font sizes, weights, families
├── shadows.css             # Shadow definitions
├── borders.css             # Border radius values
├── animations.css          # Animation timings
└── index.css               # Master import file
```

### Example: colors.css

```css
:root {
  /* Primary Colors */
  --dyn-color-primary: #2563eb;
  --dyn-color-primary-hover: #1d4ed8;
  --dyn-color-primary-active: #1e40af;
  --dyn-color-primary-text: #ffffff;
  --dyn-color-primary-dark: #3b82f6;

  /* Text Colors */
  --dyn-color-text: #111827;
  --dyn-color-text-secondary: #475569;
  --dyn-color-text-disabled: #94a3b8;

  /* Background Colors */
  --dyn-color-surface: #ffffff;
  --dyn-color-surface-subtle: #f3f4f6;
  --dyn-color-surface-disabled: #f1f5f9;

  /* Status Colors */
  --dyn-color-success: #10b981;
  --dyn-color-warning: #f59e0b;
  --dyn-color-error: #ef4444;
  --dyn-color-error-dark: #dc2626;

  /* ... more tokens ... */
}
```

### Key Characteristics

✅ **Centralized** - Single source of truth  
✅ **Generic** - Not component-specific  
✅ **Complete** - All design values  
✅ **Versioned** - Change tracking  
✅ **Documented** - Clear naming  

---

## 🎯 Layer 2: Component-Scoped Tokens

**Location**: `packages/dyn-ui-react/src/components/<Component>/`

### Pattern: Component-Specific Namespace

Each component defines its own token namespace:

- `DynButton` → `--dyn-button-*`
- `DynInput` → `--dyn-input-*`
- `DynLabel` → `--dyn-label-*`
- `DynContainer` → `--dyn-container-*`

### Example: DynButton.module.css

```css
/* Component-Scoped Tokens */
.root {
  /* Color Tokens (reference global tokens) */
  --dyn-button-bg: var(--dyn-color-primary, #2563eb);
  --dyn-button-color: var(--dyn-color-primary-text, #ffffff);
  --dyn-button-border: var(--dyn-color-primary, #2563eb);

  /* Spacing Tokens */
  --dyn-button-padding-y: var(--dyn-spacing-sm, 0.5rem);
  --dyn-button-padding-x: var(--dyn-spacing-md, 1rem);
  --dyn-button-gap: var(--dyn-spacing-sm, 0.5rem);

  /* Size Tokens */
  --dyn-button-min-height: var(--dyn-size-md, 2.5rem);
  --dyn-button-border-radius: var(--dyn-border-radius-md, 0.5rem);

  /* Transition Tokens */
  --dyn-button-transition: var(--dyn-transition-base, 0.18s ease);

  /* CSS Rules using tokens */
  display: inline-flex;
  padding: var(--dyn-button-padding-y) var(--dyn-button-padding-x);
  background-color: var(--dyn-button-bg);
  color: var(--dyn-button-color);
  border: 1px solid var(--dyn-button-border);
  border-radius: var(--dyn-button-border-radius);
  min-height: var(--dyn-button-min-height);
  transition: all var(--dyn-button-transition);
}

/* Variant: Primary */
.kindPrimary {
  --dyn-button-bg: var(--dyn-color-primary, #2563eb);
  --dyn-button-color: var(--dyn-color-primary-text, #ffffff);
}

/* Variant: Secondary */
.kindSecondary {
  --dyn-button-bg: transparent;
  --dyn-button-border: var(--dyn-color-primary, #2563eb);
  --dyn-button-color: var(--dyn-color-primary, #2563eb);
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .kindPrimary {
    --dyn-button-bg: var(--dyn-color-primary-dark, #3b82f6);
  }
}

/* Responsive */
@media (max-width: 767px) {
  .root {
    --dyn-button-min-height: 44px; /* Touch target */
  }
}
```

### Key Characteristics

✅ **Component-Specific** - Clear namespace  
✅ **References Global** - Uses layer 1 tokens  
✅ **Fallback Values** - `var(--token, fallback)`  
✅ **Variant Support** - Multiple styles  
✅ **Media Queries** - Dark mode, responsive  

---

## 🎨 Layer 3: CSS Rules

**Location**: Same file, uses layer 2 tokens

### CSS Rules Pattern

```css
.root {
  /* Always use component-scoped tokens */
  padding: var(--dyn-button-padding-y) var(--dyn-button-padding-x);
  background-color: var(--dyn-button-bg);
  color: var(--dyn-button-color);
  /* Never hardcode values */
}

.variant {
  /* Override component-scoped tokens for variants */
  --dyn-button-bg: var(--dyn-color-secondary, #6b7280);
  --dyn-button-color: var(--dyn-color-secondary-text, #1f2937);
}

@media (max-width: 767px) {
  .root {
    /* Adjust tokens for responsive */
    --dyn-button-padding-y: var(--dyn-spacing-sm, 0.5rem);
  }
}

@media (prefers-color-scheme: dark) {
  .root {
    /* Adjust tokens for dark mode */
    --dyn-button-bg: var(--dyn-color-primary-dark, #3b82f6);
  }
}
```

---

## 🌓 Dark Mode Support

Dark mode is handled automatically through token reassignment:

```css
/* Light Mode (default) */
:root {
  --dyn-color-primary: #2563eb;      /* Blue */
  --dyn-color-text: #111827;         /* Dark */
  --dyn-color-surface: #ffffff;      /* Light */
}

/* Dark Mode (automatic) */
@media (prefers-color-scheme: dark) {
  :root {
    --dyn-color-primary: #3b82f6;    /* Lighter Blue */
    --dyn-color-text: #f1f5f9;       /* Light */
    --dyn-color-surface: #1e293b;    /* Dark */
  }
}
```

**Result**: Components automatically adapt without CSS changes!

---

## 📱 Responsive Design

Responsive behavior is token-based:

```css
/* Desktop */
.root {
  --dyn-button-padding-x: var(--dyn-spacing-md, 1rem);    /* 16px */
  --dyn-button-min-height: 2.5rem;                        /* 40px */
}

/* Mobile (< 768px) */
@media (max-width: 767px) {
  .root {
    --dyn-button-padding-x: var(--dyn-spacing-md, 1rem);  /* Same */
    --dyn-button-min-height: 44px;                        /* Touch target */
  }
}
```

---

## ✅ Adding a New Token

### Step 1: Add to Global Tokens

```css
/* packages/design-tokens/colors.css */
:root {
  --dyn-color-brand: #ff6b35;        /* NEW */
  --dyn-color-brand-hover: #e55a2b;  /* NEW */
}
```

### Step 2: Reference in Component

```css
/* DynButton.module.css */
.root {
  --dyn-button-brand-bg: var(--dyn-color-brand, #ff6b35);     /* NEW */
}

.kindBrand {
  --dyn-button-bg: var(--dyn-button-brand-bg);               /* NEW */
  --dyn-button-border: var(--dyn-button-brand-bg);           /* NEW */
}
```

### Step 3: Use in CSS

```css
/* DynButton.module.css */
.kindBrand {
  background-color: var(--dyn-button-bg);        /* Uses new token */
}
```

### Step 4: Test Dark Mode

```css
/* Add dark mode support */
@media (prefers-color-scheme: dark) {
  :root {
    --dyn-color-brand: #ff8555;        /* Lighter in dark */
  }
}
```

---

## 🔄 Token Inheritance Chain

```
Global Token
  ↓
  └─ var(--dyn-color-primary, #2563eb)
       ↓
       Component-Scoped Token
         ↓
         └─ var(--dyn-button-bg, ...)
              ↓
              CSS Rule
                ↓
                └─ background-color: var(--dyn-button-bg)
                     ↓
                     Rendered as: #2563eb
```

---

## 📊 Token Categories

### Colors (40+ tokens)
- Primary, secondary, tertiary colors
- Status colors (success, warning, error)
- Text colors (primary, secondary, disabled)
- Background colors (surface, subtle, disabled)
- Dark mode variants

### Spacing (8 tokens)
- `xs`: 0.25rem (4px)
- `sm`: 0.5rem (8px)
- `md`: 1rem (16px)
- `lg`: 1.5rem (24px)
- `xl`: 2rem (32px)
- `2xl`: 2.5rem (40px)

### Typography (20+ tokens)
- Font sizes (xs, sm, base, md, lg, xl, 2xl)
- Font weights (normal, medium, semibold, bold)
- Line heights (tight, normal, relaxed)
- Font families (base, mono)

### Shadows (4+ tokens)
- `sm`: Small shadow
- `md`: Medium shadow
- `lg`: Large shadow
- `xl`: Extra large shadow

### Borders (3+ tokens)
- Border radius (sm, md, lg, full)
- Border width (1px, 2px)

### Animations (8+ tokens)
- Transition durations
- Easing functions
- Animation keyframes

---

## 🎓 Best Practices

### ✅ DO

```css
/* Use tokens */
--dyn-button-bg: var(--dyn-color-primary, #2563eb);
padding: var(--dyn-button-padding-y) var(--dyn-button-padding-x);
font-size: var(--dyn-font-size-sm, 0.875rem);
```

### ❌ DON'T

```css
/* Hardcode values */
background-color: #2563eb;           /* ❌ NO */
padding: 8px 16px;                   /* ❌ NO */
font-size: 14px;                     /* ❌ NO */
color: #111827;                      /* ❌ NO */
```

### ✅ Fallback Values

```css
/* Always include fallback */
--dyn-button-bg: var(--dyn-color-primary, #2563eb);
                                      ↑
                                      Fallback for safety
```

### ✅ Dark Mode

```css
@media (prefers-color-scheme: dark) {
  .root {
    --dyn-button-bg: var(--dyn-color-primary-dark, #3b82f6);
  }
}
```

### ✅ Responsive

```css
@media (max-width: 767px) {
  .root {
    --dyn-button-min-height: 44px;  /* Touch target */
  }
}
```

---

## 📖 Component Token Reference

### DynButton Tokens

```css
--dyn-button-bg                /* Background color */
--dyn-button-color             /* Text color */
--dyn-button-border            /* Border color */
--dyn-button-padding-y         /* Vertical padding */
--dyn-button-padding-x         /* Horizontal padding */
--dyn-button-gap               /* Gap between elements */
--dyn-button-min-height        /* Minimum height */
--dyn-button-border-radius     /* Border radius */
--dyn-button-font-size         /* Font size */
--dyn-button-font-weight       /* Font weight */
--dyn-button-transition        /* Transition timing */
```

### DynInput Tokens

```css
--dyn-input-bg                 /* Background color */
--dyn-input-border             /* Border color */
--dyn-input-color              /* Text color */
--dyn-input-placeholder        /* Placeholder color */
--dyn-input-padding            /* Padding */
--dyn-input-border-radius      /* Border radius */
--dyn-input-font-size          /* Font size */
--dyn-input-min-height         /* Minimum height */
```

### DynLabel Tokens

```css
--dyn-label-text-color         /* Text color */
--dyn-label-font-size          /* Font size */
--dyn-label-font-weight        /* Font weight */
--dyn-label-line-height        /* Line height */
--dyn-label-margin-bottom      /* Margin bottom */
```

### DynContainer Tokens

```css
--dyn-container-padding        /* Padding */
--dyn-container-gap            /* Gap between children */
--dyn-container-border-color   /* Border color */
--dyn-container-background     /* Background color */
--dyn-container-border-radius  /* Border radius */
```

---

## 🚀 Standardization Process

### Phase 1: Analysis
1. Review component's current CSS
2. Identify hardcoded values
3. Map to available tokens
4. Document findings

### Phase 2: Conversion
1. Add component-scoped tokens (`:root`)
2. Replace hardcoded values with token references
3. Standardize all variants
4. Add dark mode support

### Phase 3: Testing
1. Test locally (`npm test`)
2. Visual check in Storybook
3. Test responsive design
4. Test dark mode

### Phase 4: Commit & Push
1. `git add <files>`
2. `git commit -m "feat: standardize <component> with design tokens"`
3. `git push origin feat/standardize-<component>`
4. Create Pull Request

### Phase 5: Review & Merge
1. Team review
2. Implement feedback
3. Merge to main
4. Deploy

---

## 🏆 Why Three-Layer Model?

### Flexibility ✅
Change global tokens → All components update automatically

### Consistency ✅
Each component uses same naming pattern → Easy to understand

### Maintainability ✅
Clear separation of concerns → Easy to debug

### Scalability ✅
Works with 5 or 500 components → No complexity overhead

### Industry Standard ✅
Used by Google (Material Design), Adobe (Figma), Airbnb, etc.

---

## 📞 Questions?

Refer to:
- `DESIGN_TOKENS_STANDARDIZATION_STRATEGY.md` - Detailed strategy
- `IMPLEMENTATION_GUIDE.md` - Step-by-step guide
- `REAL_WORLD_EXAMPLES.md` - Code examples
- `STANDARDIZATION_CHECKLIST.md` - Component checklist

---

**Last Updated**: December 20, 2025  
**Status**: ✅ Approved & In Use
