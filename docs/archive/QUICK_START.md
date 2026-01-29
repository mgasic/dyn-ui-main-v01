# DYN UI - QUICK START GUIDE

**Read this in 5 minutes** → Get started with design tokens immediately

---

## 🔽 TLDR (30 Seconds)

**Token Pattern**:

```css
--dyn-[component]-[property]-[state]
```

**Example**:

```css
--dyn-button-bg         /* primary token */
--dyn-button-bg-hover   /* with state */
--dyn-input-border      /* another component */
```

**3-Level Fallback** (REQUIRED):

```css
var(--dyn-button-bg, var(--legacy-button-bg, #2563eb))
     ↑                     ↑                     ↑
  Primary           Legacy support      Hardcoded default
```

**NO** hardcoding values. **YES** use tokens everywhere.

---

## 📋 WHERE TO START


1. **Parse**:

   ```
   File: docs/COMPLETE_KNOWLEDGE_BASE.md
   Sections to load:
   - Three-Layer Token System
   - Naming Conventions
   - Component Structure
   - Implementation Workflow
   ```

2. **Template**:

   ```bash
   Find: docs/TEMPLATES/TEMPLATE-Component.*
   Copy: to src/components/DynNew
   Rename: DinComponentTemplate → DynNew
   ```

3. **Implement**:
   - Follow COMPLETE_KNOWLEDGE_BASE.md workflow
   - Copy examples from reference doc
   - Apply checklist


---

## 🗐️ FOUNDATION TOKENS (Memorize These)

### Colors

```css
--dyn-color-primary: #2563eb
--dyn-color-secondary: #f3f4f6
--dyn-color-success: #10b981
--dyn-color-warning: #f59e0b
--dyn-color-error: #ef4444
--dyn-color-text: #1f2937
--dyn-color-text-secondary: #6b7280
--dyn-color-background: #ffffff
--dyn-color-surface: #f9fafb
--dyn-color-border: #d1d5db
```

### Spacing

```css
--dyn-spacing-xs: 0.25rem    /* 4px */
--dyn-spacing-sm: 0.5rem     /* 8px */
--dyn-spacing-md: 0.75rem    /* 12px */
--dyn-spacing-lg: 1rem       /* 16px */
--dyn-spacing-xl: 1.5rem     /* 24px */
--dyn-spacing-2xl: 2rem      /* 32px */
--dyn-spacing-3xl: 3rem      /* 48px */
```

### Typography

```css
/* Font Sizes */
--dyn-font-size-xs: 0.75rem    /* 12px */
--dyn-font-size-sm: 0.875rem   /* 14px */
--dyn-font-size-base: 1rem     /* 16px */
--dyn-font-size-lg: 1.125rem   /* 18px */
--dyn-font-size-xl: 1.25rem    /* 20px */

/* Font Weights */
--dyn-font-weight-normal: 400
--dyn-font-weight-medium: 500
--dyn-font-weight-semibold: 600
--dyn-font-weight-bold: 700
```

**For complete list**, see COMPLETE_KNOWLEDGE_BASE.md section "Token Categories & Values"

---

## ✅ NAMING RULES (COPY-PASTE THESE)

### Pattern

```
--dyn-[component]-[property]-[state]
```

### Components

- Singular: `button` not `buttons`
- Lowercase: `button` not `Button`
- No abbreviations: `button` not `btn`

### Properties

```css
--dyn-button-bg           /* background */
--dyn-button-color        /* text color */
--dyn-button-border       /* border */
--dyn-button-padding      /* padding both axes */
--dyn-button-padding-y    /* vertical padding */
--dyn-button-padding-x    /* horizontal padding */
--dyn-button-shadow       /* box shadow */
--dyn-button-radius       /* border radius */
--dyn-button-font-size    /* font size */
```

### States (Optional)

```css
--dyn-button-bg-hover     /* on hover */
--dyn-button-bg-active    /* on click */
--dyn-button-bg-focus     /* on focus */
--dyn-button-bg-disabled  /* when disabled */
--dyn-button-bg-error     /* error state */
```

### Examples (Check These)

✅ **Correct**:

```css
--dyn-button-bg
--dyn-button-bg-hover
--dyn-input-border
--dyn-input-border-focus
--dyn-modal-shadow
```

❌ **Wrong**:

```css
--btn-bg                    /* abbreviated domain */
--dyn-buttons-bg            /* plural */
--dyn-button-backgroundColor /* camelCase */
--button_padding            /* underscore */
```

---

## 🏗️ COMPONENT STRUCTURE (Copy-Paste Template)

```
DynMyComponent/
├── DynMyComponent.tsx              # React component
├── DynMyComponent.types.ts         # TypeScript types
├── DynMyComponent.module.css       # CSS with tokens
├── DynMyComponent.stories.tsx      # Storybook
├── DynMyComponent.test.tsx         # Jest tests
├── index.ts                        # Exports
└── README.md                       # Optional docs
```

**Each file has example in**: `docs/COMPLETE_KNOWLEDGE_BASE.md` section "CSS Module Structure"

---

## 📚 CSS PATTERN (Most Important)

### Structure

```css
/* ===== COMPONENT TOKENS (at top) ===== */
:root {
  --dyn-component-bg: var(--dyn-color-primary, #2563eb);
  --dyn-component-color: var(--dyn-color-white, #ffffff);
  --dyn-component-padding: var(--dyn-spacing-md, 0.75rem);
}

/* ===== BASE STYLES (use tokens) ===== */
.component {
  background-color: var(--dyn-component-bg);
  color: var(--dyn-component-color);
  padding: var(--dyn-component-padding);
}

/* ===== STATES (hover, focus, etc) ===== */
.component:hover {
  background-color: var(--dyn-color-primary-hover, #1d4ed8);
}

/* ===== VARIANTS (override tokens only) ===== */
.componentSecondary {
  --dyn-component-bg: var(--dyn-color-secondary, #f3f4f6);
  --dyn-component-color: var(--dyn-color-text, #1f2937);
}

/* ===== DARK MODE ===== */
@media (prefers-color-scheme: dark) {
  :root {
    --dyn-component-bg: var(--dyn-color-primary-dark, #1e3a8a);
    --dyn-component-color: var(--dyn-color-text-dark, #f9fafb);
  }
}

/* ===== RESPONSIVE ===== */
@media (max-width: 767px) {
  :root {
    --dyn-component-padding: var(--dyn-spacing-sm, 0.5rem);
  }
}
```

**Rule**: Tokens at top, use everywhere, variants override tokens only (never properties)

---

## 🐛 BEFORE COMMIT CHECKLIST

```
✓ All tokens use --dyn- prefix
✓ Pattern: --dyn-[component]-[property]-[state]
✓ 3-level fallback on ALL tokens
✓ No hardcoded values (except in fallback)
✓ Variants override tokens only (not properties)
✓ Dark mode: @media (prefers-color-scheme: dark)
✓ 80%+ test coverage
✓ All variants tested
✓ All states tested (hover, focus, disabled)
✓ Accessibility tested
✓ Focus ring present (3px)
✓ Touch targets 44px minimum

```

---

## 🚀 NEXT STEPS

### For Full Details

See: `docs/COMPLETE_KNOWLEDGE_BASE.md` (all sections)

### For Troubleshooting

See: `docs/COMPLETE_KNOWLEDGE_BASE.md` section "Troubleshooting"

---

## 📄 QUICK REFERENCE

| Need | Location |
|------|----------|
| **Token values** | COMPLETE_KNOWLEDGE_BASE.md #Token Categories |
| **Naming rules** | This file + COMPLETE_KNOWLEDGE_BASE.md #Naming |
| **Component template** | docs/TEMPLATES/TEMPLATE-Component.* |
| **CSS pattern** | COMPLETE_KNOWLEDGE_BASE.md #CSS Module Structure |
| **Workflow** | COMPLETE_KNOWLEDGE_BASE.md #Implementation Workflow |
| **Checklist** | COMPLETE_KNOWLEDGE_BASE.md #Verification Checklist |
| **P0 details** | COMPLETE_KNOWLEDGE_BASE.md #P0 Priority Roadmap |
| **Troubleshooting** | COMPLETE_KNOWLEDGE_BASE.md #Troubleshooting |

---

**Status**: ✅ Ready to start

**Next**: Open `docs/COMPLETE_KNOWLEDGE_BASE.md` and pick a P0 component to refactor
