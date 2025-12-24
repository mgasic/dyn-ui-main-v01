# DynButton Component Specification

**Priority**: 🟡 P1 - IMPORTANT (Week 3)  
**Effort**: 3 hours  
**Type**: Interactive  
**Status**: 🌟 Likely exists but needs audit

---

## REQUIREMENTS CHECKLIST

### Token Definitions

```
✅ --dyn-button-bg              /* Background color */
✅ --dyn-button-color           /* Text color */
✅ --dyn-button-border          /* Border style */
✅ --dyn-button-padding-y       /* Vertical padding */
✅ --dyn-button-padding-x       /* Horizontal padding */
✅ --dyn-button-font-size       /* Font size */
✅ --dyn-button-font-weight     /* Font weight */
✅ --dyn-button-border-radius   /* Border radius */
✅ --dyn-button-shadow          /* Box shadow */
✅ --dyn-button-transition      /* Animation */
✅ --dyn-button-hover-bg        /* Hover background */
✅ --dyn-button-active-bg       /* Active background */
✅ --dyn-button-disabled-opacity /* Disabled opacity */
```

### Variants to Support

- [ ] `variant="primary"` - Filled primary
- [ ] `variant="secondary"` - Outlined
- [ ] `variant="tertiary"` - Ghost (text only)
- [ ] `variant="danger"` - Red filled
- [ ] `size="small"` - Compact
- [ ] `size="medium"` (default) - Normal
- [ ] `size="large"` - Large
- [ ] `disabled` - Disabled state
- [ ] `loading` - With spinner
- [ ] `icon` - Icon button (square)
- [ ] `fullWidth` - 100% width

### CSS Requirements
- [ ] All tokens use `--dyn-button-*` prefix
- [ ] All states (hover, active, disabled, focus)
- [ ] 3-level fallback
- [ ] Dark mode support
- [ ] Responsive sizing
- [ ] Accessibility (focus ring, contrast)

### Variants Override Pattern
```css
.buttonSecondary {
  --dyn-button-bg: transparent;
  --dyn-button-border: 1px solid var(--dyn-color-primary);
  --dyn-button-color: var(--dyn-color-primary);
}

.buttonDanger {
  --dyn-button-bg: var(--dyn-color-error);
}

.buttonSmall {
  --dyn-button-padding-y: var(--dyn-spacing-xs);
  --dyn-button-padding-x: var(--dyn-spacing-sm);
  --dyn-button-font-size: var(--dyn-font-size-sm);
}
```

### AI Verification Points

1. **Token Naming**: All tokens start with `--dyn-button-`
2. **Fallback Chain**: Each token has 3-level fallback
3. **No Hard-Code**: No inline colors, padding, or sizes
4. **Variants Override Tokens**: Not properties
5. **States Included**: Hover, active, focus, disabled
6. **Dark Mode**: @media query overrides tokens
7. **Responsive**: Mobile adjusts sizes
8. **Accessibility**: Focus ring, contrast 4.5:1

---

**Status**: 🌟 Pending audit  
**Deadline**: Week 3 (refactor if needed)
