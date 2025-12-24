# DynCard Component Specification (NEW)

**Priority**: 🟡 P1 - IMPORTANT (Week 3)  
**Effort**: 2 hours  
**Type**: Container/Layout  
**Status**: 🔴 MISSING - CREATE NEW

---

## PURPOSE

Reusable card container component for displaying grouped content with consistent styling, spacing, and optional header/footer.

---

## FEATURES

### Core Functionality

- [ ] Card container with background and border
- [ ] Optional header section
- [ ] Body content area
- [ ] Optional footer section
- [ ] Hover effects (shadow elevation)
- [ ] Clickable variant (link card)
- [ ] Loading state
- [ ] Multiple padding sizes
- [ ] Rounded corners
- [ ] Dark mode support
- [ ] Responsive design

### Sub-Components

```tsx
<DynCard>
  <DynCard.Header>
    <h3>Title</h3>
  </DynCard.Header>
  
  <DynCard.Body>
    Content here
  </DynCard.Body>
  
  <DynCard.Footer>
    Footer content
  </DynCard.Footer>
</DynCard>
```

---

## TOKEN DEFINITIONS

```
✅ --dyn-card-bg              /* Background color */
✅ --dyn-card-border          /* Border style */
✅ --dyn-card-border-radius   /* Corner radius */
✅ --dyn-card-shadow          /* Box shadow */
✅ --dyn-card-shadow-hover    /* Hover shadow */
✅ --dyn-card-padding         /* Overall padding */
✅ --dyn-card-padding-header  /* Header padding */
✅ --dyn-card-padding-body    /* Body padding */
✅ --dyn-card-padding-footer  /* Footer padding */
✅ --dyn-card-transition      /* Hover animation */
✅ --dyn-card-color           /* Text color */
✅ --dyn-card-color-header    /* Header text */
```

---

## VARIANTS

### Padding Sizes
- [ ] `padding="small"` - 0.5rem
- [ ] `padding="medium"` (default) - 1rem
- [ ] `padding="large"` - 1.5rem

### Styles
- [ ] `variant="elevated"` (default) - Box shadow
- [ ] `variant="outlined"` - Border only
- [ ] `variant="flat"` - No shadow, no border

### States
- [ ] `hoverable={true}` - Shadow on hover
- [ ] `clickable={true}` - Cursor pointer, states
- [ ] `loading={true}` - Overlay with spinner
- [ ] `disabled={false}` - Grayed out

---

## CSS STRUCTURE

```css
:root {
  --dyn-card-bg: var(--dyn-color-surface, #ffffff);
  --dyn-card-border: 1px solid var(--dyn-color-border, #d1d5db);
  --dyn-card-border-radius: var(--dyn-radius-lg, 0.75rem);
  --dyn-card-shadow: var(--dyn-shadow-sm);
  --dyn-card-shadow-hover: var(--dyn-shadow-md);
  --dyn-card-padding: var(--dyn-spacing-md, 1rem);
  --dyn-card-transition: all var(--dyn-transition-base, 200ms);
}

.card {
  background: var(--dyn-card-bg);
  border: var(--dyn-card-border);
  border-radius: var(--dyn-card-border-radius);
  box-shadow: var(--dyn-card-shadow);
  transition: var(--dyn-card-transition);
  overflow: hidden;
}

.cardHoverable:hover {
  box-shadow: var(--dyn-card-shadow-hover);
}

.cardHeader {
  padding: var(--dyn-card-padding-header);
  border-bottom: var(--dyn-card-border);
}

.cardBody {
  padding: var(--dyn-card-padding-body);
}

.cardFooter {
  padding: var(--dyn-card-padding-footer);
  border-top: var(--dyn-card-border);
}

/* Variants */
.cardOutlined {
  --dyn-card-shadow: none;
}

.cardFlat {
  --dyn-card-shadow: none;
  --dyn-card-border: none;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --dyn-card-bg: var(--dyn-color-surface-dark, #1f2937);
    --dyn-card-border: 1px solid #374151;
  }
}
```

---

## REQUIREMENTS CHECKLIST

### CSS
- [ ] All tokens use `--dyn-card-*`
- [ ] All values tokenized
- [ ] 3-level fallback
- [ ] Sub-components styled
- [ ] Hover states
- [ ] Dark mode
- [ ] Responsive

### React Component
- [ ] Compound component pattern (Card.Header, Card.Body, Card.Footer)
- [ ] ForwardRef support
- [ ] TypeScript types
- [ ] JSDoc comments
- [ ] Proper prop spreading

### Testing
- [ ] All variants render
- [ ] All sizes work
- [ ] Hover animation
- [ ] Dark mode
- [ ] Sub-components
- [ ] Accessibility
- [ ] 80%+ coverage

### Storybook
- [ ] Basic card
- [ ] With header only
- [ ] With footer only
- [ ] Complete (header+body+footer)
- [ ] All variants (elevated, outlined, flat)
- [ ] All sizes (small, medium, large)
- [ ] Hoverable
- [ ] Clickable
- [ ] Loading state
- [ ] Dark mode

---

## AI VERIFICATION PROMPT

```
AI Task: Verify DynCard Implementation

1. COMPONENT STRUCTURE
   - Verify compound pattern works
   - Test Card.Header, Card.Body, Card.Footer
   - Verify composition works correctly

2. TOKEN VERIFICATION
   - All tokens use --dyn-card-*
   - All have 3-level fallback
   - No hard-coded values

3. VARIANT TESTING
   - Elevated variant shows shadow
   - Outlined variant has border only
   - Flat variant has no shadow/border

4. DARK MODE
   - Colors update in dark mode
   - Contrast maintained (4.5:1)
   - Border visible in dark

5. ACCESSIBILITY
   - Focus indicators visible
   - Clickable has proper role
   - Touch targets 44px minimum

Output: Detailed verification report
```

---

## DELIVERABLES

### Files to Create
1. `packages/dyn-ui-react/src/components/DynCard/DynCard.tsx`
2. `packages/dyn-ui-react/src/components/DynCard/DynCard.types.ts`
3. `packages/dyn-ui-react/src/components/DynCard/DynCard.module.css`
4. `packages/dyn-ui-react/src/components/DynCard/DynCard.stories.tsx`
5. `packages/dyn-ui-react/src/components/DynCard/DynCard.test.tsx`
6. `packages/dyn-ui-react/src/components/DynCard/index.ts`

### PR Checklist
- [ ] All features working
- [ ] All variants working
- [ ] Dark mode tested
- [ ] Responsive tested
- [ ] 80%+ coverage
- [ ] Commit: `feat(DynCard): create container with token compliance`

---

**Status**: 🔴 MISSING - Create new  
**Effort**: 2 hours  
**Deadline**: Week 3
