# NAMING CONVENTIONS & RULES

**Purpose**: Define CSS variable naming rules for consistency  
**Audience**: AI Agent + Developers  
**Date**: December 20, 2025

---

## 📝 CSS VARIABLE NAMING CONVENTION

### Format Pattern

```
--dyn-[domain]-[property]-[state]
```

### Components

1. **Prefix** (`--dyn-`)
   - Purpose: Namespace to avoid conflicts
   - Example: `--dyn-button-bg`
   - Format: Always lowercase with hyphens

2. **Domain** (component type)
   - Purpose: Identifies which component uses it
   - Examples: `button`, `input`, `flex`, `table`, `modal`
   - Format: Singular noun

3. **Property** (what is being styled)
   - Purpose: Describes the CSS property being set
   - Examples: `bg`, `color`, `border`, `padding`, `shadow`
   - Format: Abbreviated or full word

4. **State** (optional, for variants)
   - Purpose: Distinguishes different states/variants
   - Examples: `hover`, `focus`, `disabled`, `error`, `dark`
   - Format: Lowercase adjective

---

## ✅ NAMING EXAMPLES (CORRECT)

### Button Component

```css
/* Base tokens */
--dyn-button-bg              ✅ Primary background
--dyn-button-color           ✅ Text color
--dyn-button-border          ✅ Border color
--dyn-button-padding-y       ✅ Vertical padding
--dyn-button-padding-x       ✅ Horizontal padding
--dyn-button-font-size       ✅ Font size
--dyn-button-font-weight     ✅ Font weight
--dyn-button-border-radius   ✅ Border radius
--dyn-button-shadow          ✅ Box shadow
--dyn-button-transition      ✅ Transition duration

/* Variant states */
--dyn-button-bg-hover        ✅ Hover state background
--dyn-button-bg-active       ✅ Active state background
--dyn-button-bg-disabled     ✅ Disabled state background
--dyn-button-border-focus    ✅ Focus state border
```

### Input Component

```css
--dyn-input-bg               ✅ Background color
--dyn-input-color            ✅ Text color
--dyn-input-border           ✅ Border color
--dyn-input-border-hover     ✅ Border on hover
--dyn-input-border-focus     ✅ Border on focus
--dyn-input-border-error     ✅ Border on error
--dyn-input-placeholder      ✅ Placeholder color
--dyn-input-padding-y        ✅ Vertical padding
--dyn-input-padding-x        ✅ Horizontal padding
--dyn-input-font-size        ✅ Font size
--dyn-input-font-weight      ✅ Font weight
```

### Layout Components

```css
--dyn-flex-gap               ✅ Gap between flex items
--dyn-flex-padding           ✅ Padding inside flex
--dyn-grid-gap               ✅ Gap between grid items
--dyn-grid-padding           ✅ Padding inside grid
--dyn-container-padding      ✅ Container padding
```

### Display Components

```css
--dyn-badge-bg               ✅ Badge background
--dyn-badge-color            ✅ Badge text color
--dyn-badge-padding          ✅ Badge padding
--dyn-badge-font-size        ✅ Badge font size
--dyn-badge-bg-success       ✅ Success variant
--dyn-badge-bg-error         ✅ Error variant
```

### Data Components

```css
--dyn-table-bg               ✅ Table background
--dyn-table-border           ✅ Table border
--dyn-table-header-bg        ✅ Header background
--dyn-table-row-hover-bg     ✅ Row hover background
--dyn-list-item-padding      ✅ List item padding
--dyn-pagination-bg          ✅ Pagination background
```

### Navigation Components

```css
--dyn-nav-bg                 ✅ Navigation background
--dyn-nav-color              ✅ Navigation text color
--dyn-nav-item-hover-bg      ✅ Item hover background
--dyn-nav-item-active-bg     ✅ Item active background
--dyn-nav-item-active-color  ✅ Item active text color
--dyn-nav-z-index            ✅ Navigation z-index
```

### Overlay Components

```css
--dyn-modal-bg               ✅ Modal background
--dyn-modal-shadow           ✅ Modal shadow
--dyn-modal-z-index          ✅ Modal z-index
--dyn-tooltip-bg             ✅ Tooltip background
--dyn-tooltip-color          ✅ Tooltip text color
--dyn-popover-bg             ✅ Popover background
```

---

## ❌ NAMING EXAMPLES (INCORRECT)

```css
/* Wrong prefix */
--btn-background             ❌ Should be --dyn-button-bg
--button_background          ❌ Should be --dyn-button-bg (wrong separator)
--DynButtonBackground        ❌ Should be --dyn-button-bg (wrong case)

/* Wrong domain */
--dyn-buttons-bg             ❌ Should be singular (button, not buttons)
--dyn-btn-bg                 ❌ Should be full word (button, not btn)

/* Wrong property */
--dyn-button-backgroundColor ❌ Should be --dyn-button-bg (abbreviated)
--dyn-button-text-color      ❌ Should be --dyn-button-color
--dyn-button-pad-top         ❌ Should be --dyn-button-padding-y

/* Wrong state */
--dyn-button-onHover         ❌ Should be --dyn-button-bg-hover
--dyn-button-hover_state     ❌ Should be --dyn-button-bg-hover
--dyn-button-h               ❌ Should be spelled out (hover)

/* No prefix */
--button-bg                  ❌ Missing --dyn- prefix
--color-primary              ❌ Missing component domain
```

---

## 📏 ABBREVIATION RULES

### Property Abbreviations (Use when standard)

| Full | Short | Usage |
|------|-------|-------|
| background | bg | ✅ Use |
| color | - | ✅ Use full (color is short) |
| border | - | ✅ Use full |
| padding | - | ✅ Use full (or pad if > 20 chars) |
| padding-top/bottom | padding-y | ✅ Use |
| padding-left/right | padding-x | ✅ Use |
| shadow | - | ✅ Use full |
| font-size | font-size | ✅ Use full |
| font-weight | font-weight | ✅ Use full |
| border-radius | border-radius | ✅ Use full |
| z-index | z-index | ✅ Use full |
| transition | transition | ✅ Use full |

### Forbidden Abbreviations

```
❌ --dyn-btn-bg          (use button)
❌ --dyn-input-txt       (use color)
❌ --dyn-button-p        (use padding)
❌ --dyn-button-m        (use margin)
❌ --dyn-table-h         (use hover)
❌ --dyn-modal-z         (use z-index)
```

---

## 🔗 REFERENCE PATTERN

### How to Reference Tokens

```css
/* Component CSS Module :root */
:root {
  /* Reference foundation token with 3-level fallback */
  --dyn-button-bg: var(--dyn-color-primary, var(--legacy-button-bg, #2563eb));
  
  /* Another token */
  --dyn-button-padding: var(--dyn-spacing-md, var(--legacy-padding, 0.75rem));
}

/* Use in CSS property */
.button {
  background-color: var(--dyn-button-bg);
  padding: var(--dyn-button-padding);
}

/* Variant - only override tokens, not properties */
.buttonSecondary {
  --dyn-button-bg: var(--dyn-color-secondary, var(--legacy-button-secondary, #f3f4f6));
  --dyn-button-color: var(--dyn-color-secondary-contrast, var(--legacy-text, #1f2937));
}
```

---

## 🎯 DARK MODE NAMING

### Convention for Dark Mode

```css
/* Option 1: Separate tokens */
--dyn-color-primary: #2563eb        /* Light mode */
--dyn-color-primary-dark: #1e3a8a   /* Dark mode */

@media (prefers-color-scheme: dark) {
  :root {
    --dyn-color-primary: var(--dyn-color-primary-dark);
  }
}

/* Option 2: Override in media query */
@media (prefers-color-scheme: dark) {
  :root {
    --dyn-button-bg: #1e3a8a;
    --dyn-button-color: #f9fafb;
  }
}
```

**Recommendation**: Use Option 2 (override only what changes)

---

## ✅ VALIDATION CHECKLIST

Before naming a token:

- [ ] Starts with `--dyn-` prefix
- [ ] Domain is singular (button, not buttons)
- [ ] Property is clear and abbreviated only when standard
- [ ] State is optional but meaningful if included
- [ ] Lowercase with hyphens only
- [ ] No camelCase or underscores
- [ ] No abbreviations except standard ones (bg, y, x)
- [ ] Follows format: `--dyn-[domain]-[property]-[state]`
- [ ] References foundation tokens (has fallback)
- [ ] Not hardcoded (except in fallback)

---

## 🔍 EXAMPLES BY CATEGORY

### Button-like Tokens
```
--dyn-button-*
--dyn-icon-button-*
```

### Input-like Tokens
```
--dyn-input-*
--dyn-textarea-*
--dyn-select-*
--dyn-checkbox-*
--dyn-radio-*
--dyn-toggle-*
--dyn-search-input-*
```

### Layout Tokens
```
--dyn-flex-*
--dyn-grid-*
--dyn-stack-*
--dyn-box-*
--dyn-container-*
```

### Display Tokens
```
--dyn-badge-*
--dyn-tag-*
--dyn-alert-*
--dyn-label-*
--dyn-caption-*
```

### Data Tokens
```
--dyn-table-*
--dyn-pagination-*
--dyn-list-*
```

### Navigation Tokens
```
--dyn-nav-*
--dyn-nav-item-*
--dyn-breadcrumb-*
--dyn-tabs-*
--dyn-sidebar-*
```

### Overlay Tokens
```
--dyn-modal-*
--dyn-tooltip-*
--dyn-popover-*
```

### Specialized Tokens
```
--dyn-card-*
--dyn-progress-*
--dyn-spinner-*
--dyn-avatar-*
--dyn-image-*
--dyn-video-*
```

