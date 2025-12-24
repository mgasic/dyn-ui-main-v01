# DynChart - Detailed Action Plan

**Component**: DynChart (Canvas-Based Charting)  
**Audit Date**: December 25, 2025  
**Current Score**: 68% (🟡 MEDIUM - HOLD FOR FIXES)  
**Target Score**: 92%+ (✅ EXCELLENT - READY)  
**Total Effort**: ~5-6 hours  

---

## 🔍 Phase 1: Critical Fixes (2 hours)

### Task 1.1: Fix Dark Mode CSS Bug

**Severity**: 🔴 CRITICAL  
**File**: `packages/dyn-ui-react/src/components/DynChart/DynChart.module.css`  
**Lines**: 198-205  
**Time**: 15 minutes

**Current Issue**:
```css
@media (prefers-color-scheme: dark) {
  :root {  /* 🔴 PROBLEM: Affects ENTIRE app */
    --dyn-color-background: var(--dyn-color-background-dark, var(--color-background-dark, #1f2937));
    --dyn-color-border: var(--dyn-color-border-dark, var(--color-border-dark, #374151));
    --dyn-color-text-primary: var(--dyn-color-text-primary-dark, var(--color-text-primary-dark, #f1f5f9));
    --dyn-color-text-secondary: var(--dyn-color-text-secondary-dark, var(--color-text-secondary-dark, #9ca3af));
  }
}
```

**Why It's Wrong**:
1. `:root` selector sets app-wide variables
2. All other components inherit these changes
3. Can't customize per-component
4. Breaks dark mode for entire application

**Correct Solution**:
```css
@media (prefers-color-scheme: dark) {
  .root {
    background: var(--dyn-color-background-dark, var(--color-background-dark, #1f2937));
    border-color: var(--dyn-color-border-dark, var(--color-border-dark, #374151));
    color: var(--dyn-color-text-primary-dark, var(--color-text-primary-dark, #f1f5f9));
  }

  .title,
  .legendItem {
    color: var(--dyn-color-text-primary-dark, var(--color-text-primary-dark, #f1f5f9));
  }

  .subtitle,
  .description {
    color: var(--dyn-color-text-secondary-dark, var(--color-text-secondary-dark, #9ca3af));
  }
}
```

**Verification Steps**:
```bash
# 1. Check that :root is not modified
grep -n "@media.*dark" DynChart.module.css
# Should NOT have :root selector

# 2. Test dark mode doesn't break app
npm run storybook
# Toggle dark mode
# Verify other components still work

# 3. Test DynChart dark mode
# Verify background/text colors change
# Verify other components unaffected
```

**PR Checklist**:
- [ ] Removed `:root` from dark mode media query
- [ ] Updated `.root`, `.title`, `.subtitle` selectors
- [ ] Tested dark mode in storybook
- [ ] Verified other components work
- [ ] No console warnings

---

### Task 1.2: Tokenize Canvas Drawing Colors

**Severity**: 🔴 CRITICAL  
**File**: `packages/dyn-ui-react/src/components/DynChart/DynChart.tsx`  
**Locations**: Lines 298, 325, 328, 371, 551  
**Time**: 45 minutes

**Current Hardcoded Values**:

| Line | Element | Color | Problem |
|------|---------|-------|----------|
| 298 | Grid lines | #e0e0e0 | Invisible in dark mode |
| 325 | Axis lines | #333 | Barely visible in dark mode |
| 328 | Axis text | #666 | Hard to read in dark mode |
| 371 | Axis labels | #fff | Wrong color light mode |
| 551 | Pie labels | #fff | Invisible on light colors |

**Solution - Step 1: Add CSS Variables**

Add to `DynChart.module.css` (after line 195):

```css
/* Canvas drawing tokens */
:root {
  --dyn-chart-grid-color: #e0e0e0;
  --dyn-chart-axis-color: #333333;
  --dyn-chart-axis-text-color: #666666;
  --dyn-chart-axis-label-color: #ffffff;
  --dyn-chart-pie-label-color: #ffffff;
}

@media (prefers-color-scheme: dark) {
  .root {
    --dyn-chart-grid-color: #444444;
    --dyn-chart-axis-color: #999999;
    --dyn-chart-axis-text-color: #cccccc;
    --dyn-chart-axis-label-color: #f5f5f5;
    --dyn-chart-pie-label-color: #f5f5f5;
  }
}
```

**Solution - Step 2: Update DynChart.tsx**

Create helper function (add after imports, around line 20):

```typescript
const getCanvasColor = (cssVariable: string, fallback: string): string => {
  if (typeof document === 'undefined') return fallback;
  try {
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue(cssVariable)
      .trim();
    return value || fallback;
  } catch {
    return fallback;
  }
};
```

**Solution - Step 3: Update drawGrid Function (Line 298)**

```diff
const drawGrid = useCallback(
  (ctx: CanvasRenderingContext2D) => {
    if (!showGrid || type === 'pie') return;

    const { padding, chartWidth, chartHeight } = chartDimensions;

    ctx.save();
-   ctx.strokeStyle = '#e0e0e0';
+   ctx.strokeStyle = getCanvasColor('--dyn-chart-grid-color', '#e0e0e0');
    ctx.lineWidth = 1;
    ctx.setLineDash([2, 2]);
```

**Solution - Step 4: Update drawAxes Function (Lines 325, 328, 371)**

```diff
const drawAxes = useCallback(
  (ctx: CanvasRenderingContext2D) => {
    if (type === 'pie') return;

    const { padding, chartWidth, chartHeight } = chartDimensions;

    ctx.save();
-   ctx.strokeStyle = '#333';
+   ctx.strokeStyle = getCanvasColor('--dyn-chart-axis-color', '#333333');
    ctx.lineWidth = 2;

    // ... axis drawing code ...

-   ctx.fillStyle = '#666';
+   ctx.fillStyle = getCanvasColor('--dyn-chart-axis-text-color', '#666666');
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';

    // ... more code ...

    ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
      const value = dataRanges.minY + ((dataRanges.maxY - dataRanges.minY) / 5) * (5 - i);
      const y = padding.top + (chartHeight / 5) * i;
-     ctx.fillText(value.toFixed(1), padding.left - 10, y + 5);
+     ctx.fillStyle = getCanvasColor('--dyn-chart-axis-label-color', '#ffffff');
+     ctx.fillText(value.toFixed(1), padding.left - 10, y + 5);
    }
```

**Solution - Step 5: Update drawPieChart Function (Line 551)**

```diff
if (point.value / total > 0.05) {
  const labelAngle = currentAngle + sliceAngle / 2;
  const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7);
  const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7);

- ctx.fillStyle = '#fff';
+ ctx.fillStyle = getCanvasColor('--dyn-chart-pie-label-color', '#ffffff');
  ctx.font = '12px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(`${percentage.toFixed(1)}%`, labelX, labelY);
}
```

**Verification Steps**:
```bash
# 1. Check all hardcoded colors replaced
grep -n "ctx.*Style = '[#0-9a-f]" DynChart.tsx
# Should only show pattern like: ctx.???Style = getCanvasColor(...)

# 2. Test light mode
npm run storybook
# Open DynChart stories
# Verify grid, axes, labels are visible

# 3. Test dark mode
# Toggle dark mode in storybook
# Verify grid lines are visible
# Verify axis lines are visible
# Verify axis text readable

# 4. Run tests
npm test -- DynChart
# All tests should pass
```

**PR Checklist**:
- [ ] Added `getCanvasColor()` helper function
- [ ] Added CSS variables for all canvas colors
- [ ] Updated `drawGrid()` to use tokens
- [ ] Updated `drawAxes()` to use tokens
- [ ] Updated `drawPieChart()` to use tokens
- [ ] Tested light mode rendering
- [ ] Tested dark mode rendering
- [ ] All tests pass
- [ ] No console warnings

---

### Task 1.3: Add Canvas Accessibility Fallback

**Severity**: 🔴 CRITICAL (WCAG 2.1 violation)  
**File**: `packages/dyn-ui-react/src/components/DynChart/DynChart.tsx`  
**Lines**: 583-610 (render function)  
**Time**: 1 hour

**Current Issue**:
```jsx
<canvas
  role="img"
  aria-label={canvasAriaLabel}
  // 🔴 NO FALLBACK - Screen readers can't access data
/>
```

**WCAG Requirement**: Canvas must have accessible alternative

**Solution - Step 1: Create Fallback Table Component**

Add before render, around line 270:

```typescript
const renderDataTable = useCallback(() => {
  if (!normalizedData.length) return null;

  const dataPoints = Math.max(
    ...normalizedData.map(series => series.data.length)
  );

  return (
    <table className={styles.dataTable} role="presentation">
      <thead>
        <tr>
          <th>Label</th>
          {normalizedData.map(series => (
            <th key={series.name}>{series.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: dataPoints }, (_, i) => (
          <tr key={i}>
            <td>
              {normalizedData[0]?.data[i]?.label ?? `Point ${i + 1}`}
            </td>
            {normalizedData.map(series => (
              <td key={series.name}>
                {series.data[i]?.value ?? '-'}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}, [normalizedData]);
```

**Solution - Step 2: Update Canvas Element**

Replace canvas JSX (around line 583):

```jsx
<div className={styles.content}>
  <canvas
    ref={canvasRef}
    className={styles.canvas}
    role="img"
    aria-label={canvasAriaLabel}
    aria-describedby={describedBy || undefined}
    width={chartDimensions.totalWidth}
    height={chartDimensions.totalHeight}
    style={{ width, height }}
    onMouseMove={showTooltip ? handleMouseMove : undefined}
    onMouseLeave={showTooltip ? handleMouseLeave : undefined}
  >
    {/* Data table fallback for screen readers */}
    {renderDataTable()}
  </canvas>

  {/* ... rest of tooltip code ... */}
</div>
```

**Solution - Step 3: Add CSS for Visually Hidden Table**

Add to `DynChart.module.css` (at end, before media queries):

```css
.dataTable {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

**Verification Steps**:
```bash
# 1. Test with screen reader (NVDA/JAWS on Windows, VoiceOver on Mac)
# Read canvas element
# Verify data table is announced
# Verify labels and values are readable

# 2. Test keyboard navigation
npm run storybook
# Tab to canvas
# Verify it has role="img"
# Verify aria-label is announced

# 3. Test visual rendering
# Verify table is NOT visible on screen
# Verify chart canvas still displays

# 4. Run accessibility tests
npm run a11y-audit
# Should pass WCAG 2.1 Level AA
```

**PR Checklist**:
- [ ] Added `renderDataTable()` utility function
- [ ] Updated canvas element with fallback table
- [ ] Added `.dataTable` CSS class for hiding
- [ ] Tested with screen reader
- [ ] Tested keyboard navigation
- [ ] Verified table not visible
- [ ] Verified chart still renders
- [ ] All a11y tests pass
- [ ] No console warnings

---

## 🟡 Phase 2: High-Priority Fixes (1.5 hours)

### Task 2.1: Remove Commented-Out Code

**Severity**: 🟡 MEDIUM  
**File**: `packages/dyn-ui-react/src/components/DynChart/DynChart.tsx`  
**Lines**: 51-75  
**Time**: 10 minutes

**Current**:
```typescript
// const createTooltipState = (
//   target: TooltipTarget,
//   offsetX: number,
//   offsetY: number
// ): TooltipState => {
//   const nextState: TooltipState = {
//     visible: true,
//     x: offsetX + 12,
//     y: offsetY - 12,
//     value: target.value,
//   };
//   // ... more commented code ...
// };
```

**Issue**: Logic is duplicated inline at lines 217-241

**Action**: Delete lines 51-75

**Verification**:
```bash
# Ensure inline logic still works
npm test -- DynChart
# Verify tooltip still shows on hover
```

---

### Task 2.2: Improve Error Handling

**Severity**: 🟡 MEDIUM  
**File**: `packages/dyn-ui-react/src/components/DynChart/DynChart.tsx`  
**Location**: Canvas context access (line 368)  
**Time**: 20 minutes

**Current**:
```typescript
const context = canvas.getContext('2d');
if (!context) {
  return;  // 🟡 Silent failure
}
```

**Improved**:
```typescript
const context = canvas.getContext('2d');
if (!context) {
  console.error('DynChart: Unable to get 2D canvas context');
  return;
}

if (!normalizedData.length) {
  // Render empty state
  context.fillStyle = getCanvasColor('--dyn-chart-background', '#ffffff');
  context.fillRect(0, 0, chartDimensions.totalWidth, chartDimensions.totalHeight);
  
  context.fillStyle = getCanvasColor('--dyn-chart-axis-text-color', '#666666');
  context.font = '14px Arial';
  context.textAlign = 'center';
  context.fillText(
    emptyStateMessage,
    chartDimensions.totalWidth / 2,
    chartDimensions.totalHeight / 2
  );
  return;
}
```

---

### Task 2.3: Add Dark Mode Pie Chart Label Contrast Fix

**Severity**: 🟡 MEDIUM  
**File**: `packages/dyn-ui-react/src/components/DynChart/DynChart.tsx`  
**Location**: Pie chart rendering (line 530+)  
**Time**: 15 minutes

**Issue**: White text on light pie slices is unreadable

**Solution**: Calculate text color based on background slice color

```typescript
const getContrastColor = (hexColor: string): string => {
  // Convert hex to RGB
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return white or black based on background brightness
  return luminance > 0.5 ? '#000000' : '#ffffff';
};

// In drawPieChart, replace ctx.fillStyle = '#fff'
if (point.value / total > 0.05) {
  const labelAngle = currentAngle + sliceAngle / 2;
  const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7);
  const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7);

  ctx.fillStyle = getContrastColor(color);  // ✅ Dynamic color
  ctx.font = '12px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(`${percentage.toFixed(1)}%`, labelX, labelY);
}
```

---

## 🧪 Phase 3: Test Coverage Expansion (3-4 hours)

### Task 3.1: Add Canvas Rendering Tests

**File**: `packages/dyn-ui-react/src/components/DynChart/DynChart.test.tsx`  
**Add Tests For**:
1. Line chart rendering
2. Bar chart rendering
3. Pie chart rendering
4. Area chart rendering
5. Tooltip hit detection
6. Data normalization
7. Color palette fallback
8. Dark mode rendering

**Example Test**:
```typescript
it('renders line chart with correct canvas calls', () => {
  render(<DynChart data={sampleData} type="line" />);
  
  expect(mockCanvasContext.beginPath).toHaveBeenCalled();
  expect(mockCanvasContext.arc).toHaveBeenCalled();
  expect(mockCanvasContext.stroke).toHaveBeenCalled();
});

it('uses tokenized colors for grid', () => {
  render(<DynChart data={sampleData} showGrid />);
  
  // Verify getCanvasColor was called with correct token
  expect(mockGetComputedStyle).toHaveBeenCalledWith('--dyn-chart-grid-color');
});
```

**Time**: 2 hours

---

### Task 3.2: Add Accessibility Tests

**Time**: 1-2 hours

**Tests**:
1. Canvas fallback table exists
2. Table contains correct data
3. Screen reader can access data
4. Keyboard navigation works
5. ARIA labels correct
6. High contrast mode compatible

---

## 📋 Phase 4: Documentation (30 minutes)

### Task 4.1: Add README.md

**File**: `packages/dyn-ui-react/src/components/DynChart/README.md`

**Contents**:
- Component overview
- Props documentation
- Usage examples
- Chart types
- Token customization
- Accessibility features
- Performance tips

---

## 🎯 Implementation Timeline

### Day 1: Critical Fixes (2 hours)
- [ ] 9:00 AM - Fix dark mode bug (15 min)
- [ ] 9:20 AM - Tokenize canvas colors (45 min)
- [ ] 10:10 AM - Add canvas fallback (1 hour)
- [ ] 11:10 AM - Test all fixes
- [ ] 11:30 AM - Create PR

### Day 2: High-Priority Fixes (1.5 hours)
- [ ] 9:00 AM - Remove commented code (10 min)
- [ ] 9:15 AM - Add error handling (20 min)
- [ ] 9:40 AM - Pie chart contrast fix (15 min)
- [ ] 10:00 AM - Test
- [ ] 10:30 AM - Review & merge

### Week 2: Test Coverage (3-4 hours)
- [ ] Expand test suite
- [ ] Add accessibility tests
- [ ] Add documentation

---

## ✅ Validation Checklist

### Before PR
- [ ] All 3 critical fixes implemented
- [ ] Dark mode not broken for other components
- [ ] Canvas rendering works light/dark modes
- [ ] Canvas fallback table exists
- [ ] No console errors/warnings
- [ ] All tests pass
- [ ] Code formatted (prettier)
- [ ] TypeScript compiles

### Before Merge
- [ ] Code review approved
- [ ] Tests pass on CI/CD
- [ ] Accessibility audit passes
- [ ] Storybook updated
- [ ] CHANGELOG updated

### After Merge
- [ ] Deploy to staging
- [ ] QA verification
- [ ] User feedback
- [ ] Plan future improvements

---

## 📄 References

- **Audit Report**: `docs/COMPONENT_AUDITS/DynChart_AUDIT.md`
- **Quick Reference**: `docs/COMPONENT_AUDITS/DynChart_QUICK_REFERENCE.md`
- **Token System**: `docs/KB_01_TOKEN_SYSTEM.md`
- **WCAG 2.1**: https://www.w3.org/WAI/WCAG21/quickref/
- **Canvas Accessibility**: https://www.w3.org/WAI/tutorials/canvas/

---

**Version**: 1.0  
**Created**: December 25, 2025  
**Status**: Ready for Implementation  
**Estimated Total Time**: 5-6 hours  
**Target Completion**: This week  

**Next Step**: Assign tasks to team members and begin implementation
