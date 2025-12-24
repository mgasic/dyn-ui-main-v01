# DynChart - Quick Reference & Action Items

**Status**: 🟡 MEDIUM (68%) - HOLD FOR CRITICAL FIXES  
**Priority**: P1 - Data Visualization  
**Last Audit**: December 25, 2025

---

## 🔴 3 CRITICAL ISSUES

### Issue 1: Dark Mode Breaks App
**File**: `DynChart.module.css` (Line 198-205)  
**Problem**: `:root` selector modifies entire app  
**Fix Time**: 15 minutes  
**Action**:
```diff
- @media (prefers-color-scheme: dark) {
-   :root {
-     --dyn-color-background: ...
-   }
- }

+ @media (prefers-color-scheme: dark) {
+   .root {
+     background: ...
+     border-color: ...
+     color: ...
+   }
+ }
```

### Issue 2: Canvas Colors Not Tokenized
**File**: `DynChart.tsx` (Lines 298, 325, 328, 371, 551)  
**Problem**: Hardcoded #e0e0e0, #333, #666, #fff for canvas rendering  
**Fix Time**: 45 minutes  
**Impact**: Unreadable in dark mode, not customizable  
**Action**: Replace with CSS variables
```typescript
// Grid color
ctx.strokeStyle = '#e0e0e0';  // BEFORE
ctx.strokeStyle = getComputedStyle(document.documentElement)
  .getPropertyValue('--dyn-chart-grid-color')
  .trim() || '#e0e0e0';  // AFTER
```

### Issue 3: Missing Canvas Accessibility Fallback
**File**: `DynChart.tsx` (Line 583-600)  
**Problem**: No WCAG 2.1 fallback content  
**Fix Time**: 1 hour  
**Action**: Add HTML table fallback
```jsx
<canvas role="img" aria-label={...}>
  <table role="presentation" className={styles.visuallyHidden}>
    {/* Data table for screen readers */}
  </table>
</canvas>
```

---

## 📊 Score Breakdown

| Category | Score | Status | Risk |
|----------|-------|--------|------|
| **File Structure** | 85% | ✅ Good | Low |
| **Token Naming** | 92% | ✅ Excellent | Low |
| **Dark Mode** | 50% | 🔴 Broken | **CRITICAL** |
| **Canvas Colors** | 65% | 🟡 Bad | **CRITICAL** |
| **Accessibility** | 65% | 🟡 Medium | **HIGH** |
| **Testing** | 55% | 🟡 Medium | Medium |
| **Documentation** | 60% | 🟡 Medium | Low |
| **React Quality** | 70% | 🟡 Good | Low |
| **Feature Complete** | 95% | ✅ Excellent | Low |
| **Overall** | **68%** | **🟡 MEDIUM** | **HOLD** |

---

## ✅ What Works Well

- ✅ 4 chart types (line, bar, pie, area)
- ✅ Clean file organization
- ✅ Good TypeScript types
- ✅ Responsive design
- ✅ Proper data normalization
- ✅ Legend and tooltip features
- ✅ Most CSS tokens correct
- ✅ ARIA semantics (partial)

---

## ⚠️ High Priority Issues

### Dark Mode CSS Bug
- **Severity**: 🔴 CRITICAL
- **File**: `DynChart.module.css:198-205`
- **Line**: Affects app-wide dark mode
- **Fix**: Move `:root` to `.root`
- **Test**: `npm run test -- DynChart`

### Hardcoded Canvas Colors (~15+ values)
- **Severity**: 🔴 CRITICAL
- **Impact**: Invisible grid/axes in dark mode
- **Missing Tokens**:
  - `--dyn-chart-grid-color`
  - `--dyn-chart-axis-color`
  - `--dyn-chart-axis-text-color`
  - `--dyn-chart-pie-label-color`
  - Dark mode variants

### No Canvas Fallback
- **Severity**: 🟠 HIGH (WCAG 2.1 violation)
- **Fix**: Add HTML table inside canvas
- **Impact**: Screen readers can't access data

### Commented-Out Code
- **Severity**: 🟡 MEDIUM
- **Lines**: 51-75
- **Action**: Remove or implement as utility
- **Impact**: Reduces code clarity

---

## 🧪 Test Coverage Gap

**Current**: ~55% coverage  
**Missing**: ~65% (20+ test gaps)

**Untested Areas**:
- Canvas rendering output
- Tooltip hit detection
- Dark mode canvas colors
- Data transformation edge cases
- Large dataset performance
- Keyboard navigation
- Error handling

---

## 🚀 Deployment Checklist

### Before Deploying
- [ ] Fix dark mode `:root` → `.root` (15 min)
- [ ] Add canvas color tokens (45 min)
- [ ] Add canvas fallback table (1 hour)
- [ ] Remove commented code (10 min)
- [ ] Test dark mode rendering
- [ ] Test screen reader access
- [ ] Run full test suite

**Total Time**: 2-2.5 hours

### After Deploying
- [ ] Expand test coverage (+3-4 hours)
- [ ] Add keyboard navigation
- [ ] Gather user feedback
- [ ] Optimize for large datasets

---

## 📋 File Locations

```
DynChart/
├── DynChart.tsx              (20.5 KB) - Component
├── DynChart.module.css       (5.7 KB)  - Styles 🔴 DARK MODE BUG HERE
├── DynChart.types.ts         (1.9 KB)  - Types
├── DynChart.utils.ts         (3.7 KB)  - Utilities
├── DynChart.stories.tsx      (4.8 KB)  - Storybook
├── DynChart.test.tsx         (5.0 KB)  - Tests 🟡 LOW COVERAGE
└── index.ts                  (93 B)    - Exports
```

**Audit Report**: `docs/COMPONENT_AUDITS/DynChart_AUDIT.md`

---

## 🔧 Quick Fixes

### Fix 1: Dark Mode (15 min)
```css
/* REMOVE */
@media (prefers-color-scheme: dark) {
  :root { /* breaks entire app */ }
}

/* ADD */
@media (prefers-color-scheme: dark) {
  .root {
    background: var(--dyn-color-background-dark, var(--color-background-dark, #1f2937));
    border-color: var(--dyn-color-border-dark, var(--color-border-dark, #374151));
    color: var(--dyn-color-text-primary-dark, var(--color-text-primary-dark, #f1f5f9));
  }
}
```

### Fix 2: Canvas Grid Color (10 min)
```typescript
// DynChart.tsx Line 298
const computedStyle = getComputedStyle(canvasRef.current?.parentElement || document.documentElement);
const gridColor = computedStyle.getPropertyValue('--dyn-chart-grid-color').trim() || '#e0e0e0';
ctx.strokeStyle = gridColor;
```

### Fix 3: Remove Commented Code (5 min)
```typescript
// DELETE Lines 51-75 (the commented createTooltipState function)
// Logic is already inlined at Line 217-241
```

---

## 📞 Key Contacts

- **Component Owner**: (assign)
- **Design Tokens**: Check `docs/KB_01_TOKEN_SYSTEM.md`
- **Accessibility**: Check WCAG 2.1 guidelines

---

## 🎯 Recommendation

### Current State: 🟡 NOT READY

- Dark mode bug affects entire app
- Canvas not readable in dark mode
- Missing accessibility fallback

### After Critical Fixes: ✅ READY

**Estimated Time**: 2 hours  
**Action**: Fix now, deploy today

---

**Updated**: December 25, 2025  
**Status**: Hold for fixes  
**Next Review**: After deployment
