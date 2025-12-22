# DynTable Design Tokens

## 📋 Quick Overview

This folder contains design tokens (CSS custom properties) for the DynTable component.

### Files

1. **`tokens/table.json`** - Token definitions (source)
   - 44 design tokens with metadata
   - Used as source of truth for token values
   - Can be imported into design tools

2. **`table.css`** - CSS variables (output)
   - Auto-generated CSS custom properties
   - Ready to use in component stylesheets
   - Includes all CSS rules for DynTable

### Token Categories

```Colors (24 tokens)
├─ Header: bg, text, font-weight, border
├─ Row states: striped, hover, selected
├─ Buttons: default, primary, danger
├─ Sortable: cursor, hover, active
├─ Border colors
└─ Interactive elements

Spacing (6 tokens)
├─ Small: padding, font-size
├─ Medium: padding, font-size
├─ Large: padding, font-size

Typography (8 tokens)
├─ Font family
├─ Font sizes (root, small, medium, large)
├─ Font weights
└─ Letter spacing

Effects (4 tokens)
├─ Transitions
├─ Focus states
└─ Borders

Other (2 tokens)
├─ Gap values
└─ Border radius
```

## 🔧 Using Tokens

### In CSS

```css
@import './table.css';

.my-table {
  background-color: var(--dyn-table-bg-color);
  font-family: var(--dyn-table-font-family);
  font-size: var(--dyn-table-font-size);
}
```

### Complete Token List

See full reference: [`packages/dyn-ui-react/src/components/DynTable/DESIGN_TOKENS.md`](../../dyn-ui-react/src/components/DynTable/DESIGN_TOKENS.md)

## 📚 Documentation

1. **Token Reference**
   - Path: `packages/dyn-ui-react/src/components/DynTable/DESIGN_TOKENS.md`
   - Complete list of all 44 tokens with descriptions

2. **Implementation Guide**
   - Path: `packages/dyn-ui-react/src/components/DynTable/IMPLEMENTATION_GUIDE.md`
   - Step-by-step integration instructions

3. **Summary**
   - Path: `DYNTABLE_DESIGN_TOKENS_SUMMARY.md` (root)
   - Complete overview and mapping

## 🛰️ Build Process

```bash
# Generate CSS from tokens
cd packages/design-tokens
npm run build
```

This processes `tokens/table.json` and generates `table.css`.

## 📚 Token Naming Convention

```--dyn-table-[component]-[property]
```

**Examples:**

- `--dyn-table-header-bg-color` - Header background
- `--dyn-table-button-padding` - Button padding
- `--dyn-table-row-selected-bg-color` - Selected row background

## 🎨 Customization

Override tokens in your global CSS:

```css
:root {
  --dyn-table-header-bg-color: #f0f0f0;
  --dyn-table-button-primary-bg-color: #2196f3;
}
```

## 🔗 Integration Points

- **DynTable Component**
  - Path: `packages/dyn-ui-react/src/components/DynTable/`
  - Imports: `packages/design-tokens/table.css`
  - Uses: CSS variables in DynTable.module.css

## 🎈 Benefits

- ✅ Centralized design values
- ✅ Easy to maintain
- ✅ Simple theme switching
- ✅ Self-documenting
- ✅ Reusable across components
- ✅ Version controlled

## 💫 Notes

- Tokens follow design system principles
- All values are CSS variables
- Fully compatible with modern browsers
- No build-time dependencies
- Works with existing CSS module system

---

**Created**: December 20, 2025
**Status**: ✅ Ready for integration with DynTable component
