# DYN UI v2.0 - QUICK REFERENCE GUIDE

**Print this page and post on team wall!**

---

## 🎯 THE 3 DOCUMENTS

### 1️⃣ COMPREHENSIVE STANDARD v2.0
**What to build** | 5,000+ lines | Architecture + Patterns + Tokens

### 2️⃣ IMPLEMENTATION GUIDE
**How to build it** | 3,000+ lines | Step-by-Step + Checklists + Fixes

### 3️⃣ ARCHITECTURE MAP
**Where it fits** | 2,000+ lines | Hierarchy + Categories + Strategy

---

## 🔍 WHAT WE FOUND

### DynButton: ✅ 95% - PERFECT
- ✅ All tokens use `--dyn-` prefix
- ✅ 3-level fallback pattern
- ✅ Complete dark mode
- ✅ Full accessibility
- ✅ Responsive (44px touch targets)
- **USE AS TEMPLATE**

### Issues Found (3)

| Component | Issue | Fix Time | Priority |
|-----------|-------|----------|----------|
| DynTable | External @import | 4 hours | 🔴 CRITICAL |
| DynInput | Hardcoded transitions | 1 hour | 🟡 MEDIUM |
| DynFlex | Tokens in :root | 1 hour | 🟡 MEDIUM |

---

## 📊 CURRENT STATE

```
Token Compliance:     85-90% → 100% ✅
Dark Mode Support:    ~70%  → 100% ✅
Accessibility:        90%   → 100% ✅
Test Coverage:        ~75%  → >90% ✅
Documentation:        60%   → 100% ✅
```

**Overall**: 85% → 100% in 4 weeks

---

## 🛠️ THE PLAN

### WEEK 1 (Critical Fixes)
- Fix DynTable (4h)
- Fix DynInput (1h)
- Fix DynFlex (1h)

### WEEKS 2-3 (Apply Templates)
- Button-like (2)
- Input-like (7)
- Layout (7)
- Display (5)

### WEEK 4 (Complete)
- Data Display (3)
- Navigation (5)
- Overlay (3)
- Specialized (6)
- Testing & Docs

**Total**: 60 hours = 1 dev × 2 weeks (or 3 devs × 1 week)

---

## ✅ QUALITY GATES (Before Merge)

- [ ] All tokens `--dyn-` prefixed
- [ ] No hardcoded values (except fallbacks)
- [ ] Component-scoped tokens (not `:root`)
- [ ] 3-level fallback pattern
- [ ] Dark mode tested
- [ ] Accessibility audit passed (WCAG 2.1 AA)
- [ ] 4.5:1 color contrast
- [ ] Focus rings visible (3px)
- [ ] Reduced motion respected
- [ ] 44px touch targets (mobile)
- [ ] >80% test coverage
- [ ] Storybook complete

---

## 📝 FOR EACH COMPONENT

### CSS Module (`.module.css`)

✅ Token Definition
```css
.root {
  --dyn-component-bg: var(--dyn-color-surface, var(--color-surface, #fff));
  --dyn-component-text: var(--dyn-color-text, var(--color-text, #000));
  background-color: var(--dyn-component-bg);
  color: var(--dyn-component-text);
}
```

✅ Interactive States
```css
.root:hover:not(:disabled) { }
.root:focus-visible { }
.root:active:not(:disabled) { }
.root:disabled { }
```

✅ Variants & Sizes
```css
.variantName { --dyn-component-bg: override; }
.sizeName { --dyn-component-padding: override; }
```

✅ Dark Mode
```css
@media (prefers-color-scheme: dark) {
  .variantName { --dyn-component-bg: dark-color; }
}
```

✅ Accessibility
```css
@media (prefers-reduced-motion: reduce) {
  .root { transition: none; }
}

@media (prefers-contrast: high) {
  .root { border-width: 2px; }
}
```

✅ Responsive
```css
@media (max-width: 767px) {
  .root { min-height: var(--dyn-size-touch-target, 44px); }
}
```

### TypeScript Component (`.tsx`)

✅ Structure
```typescript
export const DynComponent = React.forwardRef<HTMLElement, DynComponentProps>(
  ({ children, variant = 'primary', size = 'medium', ...props }, ref) => {
    const classes = [
      styles.root,
      styles[`variant${variant}`],
      styles[`size${size}`],
    ].filter(Boolean).join(' ');

    return <div ref={ref} className={classes} {...props}>{children}</div>;
  }
);

DynComponent.displayName = 'DynComponent';
```

### Component Types (`.types.ts`)

✅ Export Types
```typescript
export type DynComponentVariant = 'primary' | 'secondary';
export type DynComponentSize = 'small' | 'medium' | 'large';

export interface DynComponentProps extends HTMLAttributes<HTMLElement> {
  /** Visual variant */
  variant?: DynComponentVariant;
  /** Size variant */
  size?: DynComponentSize;
  /** Children content */
  children?: ReactNode;
}
```

---

## 🎨 TOKEN REFERENCE

### Colors
```css
--dyn-color-primary
--dyn-color-secondary
--dyn-color-danger
--dyn-color-success
--dyn-color-surface
--dyn-color-text-primary
--dyn-color-border
```

### Spacing
```css
--dyn-spacing-xs, sm, md, lg, xl
```

### Typography
```css
--dyn-font-size-xs, sm, base, md, lg, xl
--dyn-font-weight-normal, medium, semibold, bold
--dyn-line-height-tight, normal, relaxed
```

### Borders & Effects
```css
--dyn-border-radius-sm, md, lg
--dyn-shadow-sm, md, lg
--dyn-transition-duration: 0.2s
--dyn-transition-easing: ease-out
```

---

## 🏗️ 8 COMPONENT CATEGORIES

```
1. BUTTON-LIKE (2)
   ├─ DynButton ✅
   └─ DynIconButton

2. INPUT-LIKE (7)
   ├─ DynInput ⚠️
   ├─ DynTextArea
   ├─ DynSelect
   ├─ DynDatePicker
   ├─ DynCheckbox
   ├─ DynRadio
   └─ DynToggle

3. LAYOUT (7)
   ├─ DynFlex ⚠️
   ├─ DynGrid
   ├─ DynStack
   ├─ DynBox
   ├─ DynContainer
   ├─ DynSpacer
   └─ DynSpaced

4. DISPLAY (5)
   ├─ DynBadge
   ├─ DynAvatar
   ├─ DynLabel
   ├─ DynDivider
   └─ DynIcon

5. DATA DISPLAY (3)
   ├─ DynTable ❌
   ├─ DynListView
   └─ DynTreeView

6. NAVIGATION (5)
   ├─ DynMenu
   ├─ DynTabs
   ├─ DynBreadcrumb
   ├─ DynSidebar
   └─ DynAppbar

7. OVERLAY (3)
   ├─ DynModal
   ├─ DynDropdown
   └─ DynPopover

8. SPECIALIZED (6)
   ├─ DynChart
   ├─ DynGauge
   ├─ DynStepper
   ├─ DynToolbar
   ├─ DynPage
   └─ DynFieldContainer
```

---

## 🚀 THIS WEEK

1. Read the documents (2-3 hours)
2. Start Phase 1 fixes (6 hours)
3. Report daily progress
4. Ask questions in team channel

---

## 📞 NEED HELP?

| Question | Read |
|----------|------|
| "What CSS pattern?" | Doc 1, Section 3 |
| "How to implement?" | Doc 2, entire |
| "Where does it fit?" | Doc 3, entire |
| "What about dark mode?" | Doc 1, Section 9 |
| "Accessibility?" | Doc 1, Section 9 |
| "Token reference?" | Doc 1, Section 2 |
| "Specific component?" | Doc 2, Category section |

---

## ✨ KEY METRICS

- ✅ 37 components → 100% compliant
- ✅ 0 hardcoded CSS values
- ✅ 100% --dyn- prefix usage
- ✅ 100% dark mode support
- ✅ 100% WCAG 2.1 AA compliance
- ✅ >90% test coverage
- ✅ 100% Storybook documentation
- ✅ 80% faster component creation (8-12h → 1-2h)

---

## 🎉 SUCCESS = 4 WEEKS

**Week 1**: Critical fixes (6h)  
**Week 2**: Apply templates (15h)  
**Week 3**: Apply more (12h)  
**Week 4**: Finalize (23h)  

**Total**: 60 hours → **ALL 37 COMPONENTS 100% COMPLIANT**

---

**Print this. Post it. Reference it. Live it.**

*Last Updated: December 20, 2025*

