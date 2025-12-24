# DynModal Component Specification

**Priority**: 🔴 P0 - CRITICAL (Week 2)  
**Effort**: 4 hours  
**Type**: Overlay  
**Status**: 🔴 Needs Creation

---

## PROBLEM STATEMENT

### Current Issue
Modal uses hard-coded values instead of design tokens.

### Hard-coded Values to Replace

```css
/* ❌ CURRENT - Hard-coded values */
.modal {
  background: rgba(0, 0, 0, 0.5);              /* Hardcoded overlay */
  width: 500px;                                /* Hardcoded size */
  max-height: 90vh;                            /* Hardcoded height */
  z-index: 999;                                /* Hardcoded stacking */
  box-shadow: 0 20px 25px rgba(0, 0, 0, 0.1);/* Hardcoded shadow */
  padding: 24px;                               /* Hardcoded padding */
  border-radius: 12px;                         /* Hardcoded radius */
}
```

**Problems**:
- ❌ Hard-coded pixel values
- ❌ No token usage
- ❌ Inconsistent with design system
- ❌ Hard to maintain
- ❌ No dark mode
- ❌ No responsive

---

## SOLUTION

### Token Definitions

```css
:root {
  /* Overlay */
  --dyn-modal-overlay-bg: var(--dyn-color-overlay, rgba(0, 0, 0, 0.5));
  --dyn-modal-overlay-opacity: 0.5;
  
  /* Sizing */
  --dyn-modal-max-width: var(--dyn-size-modal-md, 500px);
  --dyn-modal-max-height: 90vh;
  --dyn-modal-min-width: var(--dyn-size-modal-sm, 300px);
  
  /* Stacking */
  --dyn-modal-z-index: var(--dyn-z-index-modal, 1400);
  --dyn-modal-backdrop-z-index: var(--dyn-z-index-modal-backdrop, 1300);
  
  /* Effects */
  --dyn-modal-shadow: var(--dyn-shadow-lg, 0 20px 25px rgba(0, 0, 0, 0.1));
  --dyn-modal-border-radius: var(--dyn-radius-lg, 0.75rem);
  --dyn-modal-bg: var(--dyn-color-surface, #ffffff);
  --dyn-modal-border: none;
  
  /* Spacing */
  --dyn-modal-padding: var(--dyn-spacing-lg, 1.5rem);
  --dyn-modal-padding-header: var(--dyn-spacing-lg, 1.5rem);
  --dyn-modal-padding-body: var(--dyn-spacing-lg, 1.5rem);
  --dyn-modal-padding-footer: var(--dyn-spacing-lg, 1.5rem);
  
  /* Animation */
  --dyn-modal-transition: all var(--dyn-transition-base, 200ms);
}
```

### CSS Structure

```css
/* Backdrop */
.modalBackdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--dyn-modal-overlay-bg);
  z-index: var(--dyn-modal-backdrop-z-index);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: var(--dyn-modal-transition);
}

.modalBackdropOpen {
  opacity: 1;
}

/* Modal */
.modal {
  position: fixed;
  max-width: var(--dyn-modal-max-width);
  max-height: var(--dyn-modal-max-height);
  z-index: var(--dyn-modal-z-index);
  background-color: var(--dyn-modal-bg);
  border-radius: var(--dyn-modal-border-radius);
  box-shadow: var(--dyn-modal-shadow);
  border: var(--dyn-modal-border);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transform: scale(0.95);
  opacity: 0;
  transition: var(--dyn-modal-transition);
}

.modalOpen {
  transform: scale(1);
  opacity: 1;
}

/* Header */
.modalHeader {
  padding: var(--dyn-modal-padding-header);
  border-bottom: 1px solid var(--dyn-color-border, #d1d5db);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modalTitle {
  font-size: var(--dyn-font-size-lg, 1.125rem);
  font-weight: var(--dyn-font-weight-semibold, 600);
  margin: 0;
}

.modalCloseButton {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: var(--dyn-color-text-secondary, #6b7280);
  padding: 0;
}

/* Body */
.modalBody {
  padding: var(--dyn-modal-padding-body);
  overflow-y: auto;
  flex: 1;
}

/* Footer */
.modalFooter {
  padding: var(--dyn-modal-padding-footer);
  border-top: 1px solid var(--dyn-color-border, #d1d5db);
  display: flex;
  gap: var(--dyn-spacing-md, 0.75rem);
  justify-content: flex-end;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --dyn-modal-overlay-bg: rgba(0, 0, 0, 0.7);
    --dyn-modal-bg: var(--dyn-color-surface-dark, #1f2937);
  }
}

/* Responsive */
@media (max-width: 767px) {
  :root {
    --dyn-modal-max-width: 95vw;
    --dyn-modal-padding: var(--dyn-spacing-md, 0.75rem);
  }
  
  .modalBackdrop {
    align-items: flex-end;
  }
}
```

---

## REQUIREMENTS CHECKLIST

### CSS Requirements
- [ ] All values use tokens (no hard-coded pixels)
- [ ] All tokens use `--dyn-modal-*` prefix
- [ ] 3-level fallback on all tokens
- [ ] Z-index from `--dyn-z-index-*` tokens
- [ ] Shadows from `--dyn-shadow-*` tokens
- [ ] Colors from `--dyn-color-*` tokens
- [ ] Spacing from `--dyn-spacing-*` tokens
- [ ] Dark mode with override tokens
- [ ] Responsive sizing for mobile
- [ ] Smooth animations

### Token Definitions

```
✅ --dyn-modal-overlay-bg        /* Backdrop color */
✅ --dyn-modal-max-width         /* Width (500px default) */
✅ --dyn-modal-max-height        /* Height (90vh default) */
✅ --dyn-modal-min-width         /* Min width (300px) */
✅ --dyn-modal-z-index           /* Stacking (1400) */
✅ --dyn-modal-backdrop-z-index  /* Backdrop z-index (1300) */
✅ --dyn-modal-shadow            /* Box shadow */
✅ --dyn-modal-border-radius     /* Corner radius */
✅ --dyn-modal-bg                /* Background color */
✅ --dyn-modal-padding-*         /* Padding sections */
✅ --dyn-modal-transition        /* Animation timing */
```

### Features to Implement

- [ ] Modal header with title
- [ ] Close button (X)
- [ ] Modal body for content
- [ ] Modal footer for actions
- [ ] Backdrop with click-to-close
- [ ] ESC key closes modal
- [ ] Focus trap (focus stays inside)
- [ ] Scroll handling (body scrolls, modal doesn't)
- [ ] Multiple size variants (small, medium, large, fullscreen)
- [ ] Animations (fade in/out)
- [ ] ARIA attributes
- [ ] Dark mode support
- [ ] Responsive (mobile adapts)

### Variants

- [ ] `size="small"` - 300px
- [ ] `size="medium"` (default) - 500px
- [ ] `size="large"` - 800px
- [ ] `size="fullscreen"` - 100vw
- [ ] `scrollable={true}` - Body scrolls
- [ ] `centered={true}` (default) - Center on screen
- [ ] `position="top"` - Top of screen

### Testing Checklist

- [ ] Opens with animation
- [ ] Closes with animation
- [ ] Backdrop click closes
- [ ] ESC key closes
- [ ] Focus trap works (Tab stays inside)
- [ ] Content scrolls when too long
- [ ] All sizes work correctly
- [ ] Dark mode renders
- [ ] Responsive on mobile
- [ ] ARIA labels present
- [ ] 80%+ coverage

---

## AI VERIFICATION PROMPT

```
AI Task: Verify DynModal Tokenization

File: packages/dyn-ui-react/src/components/DynModal/DynModal.module.css

1. HARD-CODED VALUES HUNT
   - Search for all number patterns (px, vh, %, numbers)
   - List any hard-coded values found
   - For each:
     * Identify what it represents
     * Check if token exists
     * Report if not tokenized

2. TOKEN VERIFICATION
   - Verify these tokens are used:
     --dyn-modal-max-width
     --dyn-modal-max-height
     --dyn-modal-z-index
     --dyn-modal-shadow
     --dyn-modal-border-radius
   - Verify each has 3-level fallback

3. COLOR VERIFICATION
   - List all colors in component
   - Verify each uses --dyn-color-* token
   - Check contrast (4.5:1 minimum)

4. SPACING VERIFICATION
   - List all padding/margin values
   - Verify each uses --dyn-spacing-* token
   - Check consistency

5. Z-INDEX VERIFICATION
   - Verify uses --dyn-z-index-modal
   - Verify uses --dyn-z-index-modal-backdrop
   - Confirm backdrop z-index < modal z-index

6. DARK MODE
   - @media (prefers-color-scheme: dark) present
   - Colors updated for dark
   - Contrast maintained

7. RESPONSIVE
   - @media (max-width: 767px) present
   - Width adjusts for mobile
   - Padding adjusts for mobile
   - Layout adapts

8. FUNCTIONALITY
   - Check close button
   - Check backdrop click
   - Check ESC key handler
   - Check focus trap

Output: Comprehensive audit report
```

---

## DELIVERABLES

### New Files
1. `packages/dyn-ui-react/src/components/DynModal/DynModal.tsx`
2. `packages/dyn-ui-react/src/components/DynModal/DynModal.types.ts`
3. `packages/dyn-ui-react/src/components/DynModal/DynModal.module.css`
4. `packages/dyn-ui-react/src/components/DynModal/DynModal.stories.tsx`
5. `packages/dyn-ui-react/src/components/DynModal/DynModal.test.tsx`
6. `packages/dyn-ui-react/src/components/DynModal/index.ts`

### PR Checklist
- [ ] All values tokenized
- [ ] All functionality working
- [ ] Dark mode tested
- [ ] Responsive tested
- [ ] 80%+ coverage
- [ ] Commit: `feat(DynModal): create with 100% token compliance`

---

**Status**: 🔴 Ready for implementation  
**Effort**: 4 hours  
**Deadline**: Week 2 (by Friday)
