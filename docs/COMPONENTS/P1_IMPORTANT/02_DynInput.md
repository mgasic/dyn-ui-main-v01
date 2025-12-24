# DynInput Component Specification

**Priority**: 🟡 P1 - IMPORTANT (Week 3)  
**Effort**: 3-5 hours (audit + potential refactor)  
**Type**: Form  
**Status**: 🌟 Likely exists but needs audit

---

## REQUIREMENTS CHECKLIST

### Token Definitions

```
✅ --dyn-input-bg              /* Background color */
✅ --dyn-input-border          /* Border style */
✅ --dyn-input-border-color    /* Border color */
✅ --dyn-input-color           /* Text color */
✅ --dyn-input-padding-y       /* Vertical padding */
✅ --dyn-input-padding-x       /* Horizontal padding */
✅ --dyn-input-font-size       /* Font size */
✅ --dyn-input-border-radius   /* Border radius */
✅ --dyn-input-shadow          /* Box shadow */
✅ --dyn-input-focus-border    /* Focus border */
✅ --dyn-input-focus-shadow    /* Focus shadow */
✅ --dyn-input-disabled-bg     /* Disabled bg */
✅ --dyn-input-disabled-color  /* Disabled text */
✅ --dyn-input-error-border    /* Error border */
✅ --dyn-input-placeholder     /* Placeholder color */
```

### States to Support

- [ ] Default state
- [ ] Hover state (shadow increase)
- [ ] Focus state (border color + ring)
- [ ] Disabled state (opacity, cursor not-allowed)
- [ ] Error state (red border)
- [ ] Success state (green border)
- [ ] Loading state (spinner indicator)
- [ ] Placeholder text

### Variants

- [ ] `size="small"` - Compact
- [ ] `size="medium"` (default) - Normal
- [ ] `size="large"` - Larger touch target
- [ ] `variant="outlined"` (default) - Bordered
- [ ] `variant="filled"` - Filled background
- [ ] `variant="ghost"` - Minimal
- [ ] `type="text"` (default)
- [ ] `type="password"`
- [ ] `type="email"`
- [ ] `type="number"`
- [ ] `type="search"`
- [ ] Icon support (prefix/suffix)
- [ ] Label support
- [ ] Helper text
- [ ] Error message display

### CSS Requirements

- [ ] All tokens use `--dyn-input-*` prefix
- [ ] All values tokenized
- [ ] 3-level fallback on each token
- [ ] No hard-coded colors/sizes
- [ ] Focus ring visible (accessibility)
- [ ] Placeholder styling
- [ ] :focus-visible support
- [ ] Dark mode support
- [ ] Responsive sizing
- [ ] Touch target 44px minimum

### Accessibility Requirements

- [ ] Label properly associated (htmlFor)
- [ ] Focus ring visible
- [ ] Error messages linked (aria-describedby)
- [ ] Helper text linked (aria-describedby)
- [ ] Disabled state indicated
- [ ] Required indicator if needed
- [ ] Contrast 4.5:1 minimum
- [ ] Keyboard navigation

### Dark Mode

```css
@media (prefers-color-scheme: dark) {
  :root {
    --dyn-input-bg: /* dark background */
    --dyn-input-border-color: /* dark border */
    --dyn-input-color: /* light text */
    --dyn-input-placeholder: /* light placeholder */
  }
}
```

### Responsive

```css
@media (max-width: 767px) {
  :root {
    --dyn-input-font-size: /* adjust */
    --dyn-input-padding-y: /* adjust */
  }
}
```

---

## AI VERIFICATION PROMPT

### Use this for component audit:

```
AI Task: Audit DynInput Component

File: packages/dyn-ui-react/src/components/DynInput/

1. TOKEN NAMING AUDIT
   - List all CSS variables in DynInput.module.css
   - Check each starts with --dyn-input-
   - Flag any that don't
   - Check for duplicates

2. FALLBACK AUDIT
   - For each token, verify 3-level fallback:
     var(--dyn-input-X, var(--legacy-input-X, fallback))
   - List tokens with incomplete fallbacks

3. VARIANT AUDIT
   - List all variant classes
   - For each variant:
     * Verify ONLY overrides token values
     * Flag any that change CSS properties directly

4. STATE AUDIT
   - Check :hover state
   - Check :focus state
   - Check :focus-visible state
   - Check :disabled state
   - Check [aria-invalid="true"] state
   - Check ::placeholder styling

5. DARK MODE AUDIT
   - @media (prefers-color-scheme: dark) present?
   - Which tokens overridden?
   - Contrast maintained (4.5:1)?

6. ACCESSIBILITY AUDIT
   - Focus ring visible?
   - Focus ring color uses token?
   - Focus ring size adequate (min 2px)?
   - Placeholder contrast?
   - Error message contrast?

7. REFACTOR RECOMMENDATION
   - List issues needing fixing
   - Estimate hours for refactor
   - Suggest priority (urgent/important/nice-to-have)

Output: Detailed audit report with recommendations
```

---

## COMMON ISSUES TO CHECK

- [ ] Tokens use `--dyn-input-` prefix (not `--input-`)
- [ ] Focus ring is 2px+ and visible
- [ ] Placeholder is visible and accessible
- [ ] Error state has color alternative (not just color)
- [ ] Disabled state uses opacity + cursor
- [ ] Dark mode colors are appropriate
- [ ] Touch targets are 44px or more
- [ ] All states tested in 80%+ coverage

---

## DELIVERABLES

If refactoring needed:

### Files to Modify
1. `packages/dyn-ui-react/src/components/DynInput/DynInput.module.css`
   - Rename all tokens to --dyn-input-*
   - Add 3-level fallback
   - Add dark mode section
   - Add responsive section

2. `packages/dyn-ui-react/src/components/DynInput/DynInput.test.tsx`
   - Add tests for all states
   - Add dark mode test
   - Add accessibility tests

3. `packages/dyn-ui-react/src/components/DynInput/DynInput.stories.tsx`
   - Add story for each state
   - Add story for each variant
   - Add story for each size
   - Add dark mode story

### PR Checklist
- [ ] All tokens renamed and verified
- [ ] All states working
- [ ] Dark mode tested
- [ ] Accessibility tested
- [ ] 80%+ coverage
- [ ] Commit: `refactor(DynInput): 100% token compliance`

---

**Status**: 🌟 Pending audit  
**Deadline**: Week 3 (by Jan 6)  
**Reference**: [COMPLETE_KNOWLEDGE_BASE.md](../../00_MASTER_KNOWLEDGE_BASE.md)
