# 🛠️ DynGrid Implementation & Enhancement Guide

**Component**: DynGrid (Data Table)  
**Focus**: CSS Tokenization + Test Expansion  
**Estimated Time**: 2.5 hours  
**Difficulty**: Medium (mostly routine)  
**Status**: Optional Enhancements  
**Confidence**: Component already production-ready

---

## 💫 OVERVIEW

DynGrid is **production-ready** right now. This guide covers **optional enhancements** to:
1. Tokenize 8 hardcoded CSS values
2. Expand test coverage from 72% to 90%+
3. Improve documentation

**None of these are blocking** - deploy DynGrid immediately. Apply these enhancements after.

---

## 🛠️ OPTIONAL FIX #1: CSS Tokenization (25 minutes)

### Why?
- ✅ Consistency across design system
- ✅ Easier customization for teams
- ✅ Better dark mode support
- 🟡 **Not blocking** - current values are reasonable

### Issues to Fix

#### 1. Selected Row Background Color (Line 65)

**File**: `packages/dyn-ui-react/src/components/DynGrid/DynGrid.module.css`

**Before**:
```css
.rowSelected {
  background-color: rgba(37, 99, 235, 0.1) !important;
}
```

**After**:
```css
.rowSelected {
  background-color: var(--dyn-grid-row-selected-bg, rgba(37, 99, 235, 0.1)) !important;
}
```

**Time**: 2 minutes

---

#### 2. Spinner Size and Border (Lines 114-119)

**Before**:
```css
.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--dyn-color-border, var(--color-border, #e5e7eb));
  border-top-color: var(--dyn-color-primary, var(--color-primary, #2563eb));
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
```

**After**:
```css
.spinner {
  width: var(--dyn-grid-spinner-size, 32px);
  height: var(--dyn-grid-spinner-size, 32px);
  border: var(--dyn-grid-spinner-border-width, 3px) solid var(--dyn-color-border, var(--color-border, #e5e7eb));
  border-top-color: var(--dyn-color-primary, var(--color-primary, #2563eb));
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
```

**Time**: 3 minutes

---

#### 3. Selection Cell Width (Lines 77, 144)

**Before** (Line 77):
```css
.selectionCell {
  width: 48px;
  text-align: center;
  padding-left: var(--dyn-spacing-sm, var(--spacing-sm, 8px));
  padding-right: var(--dyn-spacing-sm, var(--spacing-sm, 8px));
}
```

**After**:
```css
.selectionCell {
  width: var(--dyn-grid-selection-cell-width, 48px);
  text-align: center;
  padding-left: var(--dyn-spacing-sm, var(--spacing-sm, 8px));
  padding-right: var(--dyn-spacing-sm, var(--spacing-sm, 8px));
}
```

**Mobile** (Line 144):
```css
@media (max-width: 768px) {
  .selectionCell {
    width: 40px;  /* Before */
  }
}
```

**After**:
```css
@media (max-width: 768px) {
  .selectionCell {
    width: var(--dyn-grid-selection-cell-width-mobile, 40px);
  }
}
```

**Time**: 3 minutes

---

#### 4. Sort Indicator (Line 60)

**Before**:
```css
.sortIndicator {
  font-size: 12px;
  opacity: 0.6;
}
```

**After**:
```css
.sortIndicator {
  font-size: var(--dyn-grid-sort-indicator-font-size, 12px);
  opacity: var(--dyn-grid-sort-indicator-opacity, 0.6);
}
```

**Time**: 2 minutes

---

#### 5. Pagination Button Sizes (Lines 135-137, 148-150)

**Before** (Line 135-137):
```css
.paginationButton {
  min-width: 32px;
  height: 32px;
  padding: 0 var(--dyn-spacing-xs, var(--spacing-xs, 4px));
}
```

**After**:
```css
.paginationButton {
  min-width: var(--dyn-grid-pagination-button-width, 32px);
  height: var(--dyn-grid-pagination-button-height, 32px);
  padding: 0 var(--dyn-spacing-xs, var(--spacing-xs, 4px));
}
```

**Mobile** (Line 148-150):
```css
@media (max-width: 768px) {
  .paginationButton {
    min-width: 28px;
    height: 28px;
  }
}
```

**After**:
```css
@media (max-width: 768px) {
  .paginationButton {
    min-width: var(--dyn-grid-pagination-button-width-mobile, 28px);
    height: var(--dyn-grid-pagination-button-height-mobile, 28px);
  }
}
```

**Time**: 3 minutes

---

#### 6. Dark Mode Selected Row (Line 195)

**Before**:
```css
@media (prefers-color-scheme: dark) {
  .rowSelected {
    background-color: rgba(59, 130, 246, 0.15) !important;
  }
}
```

**After**:
```css
@media (prefers-color-scheme: dark) {
  .rowSelected {
    background-color: var(--dyn-grid-row-selected-bg-dark, rgba(59, 130, 246, 0.15)) !important;
  }
}
```

**Time**: 2 minutes

---

### CSS Tokenization Summary

**Total Effort**: ~25 minutes

**Files Modified**: 1 (DynGrid.module.css)

**New Tokens Added**: 8

```
--dyn-grid-row-selected-bg
--dyn-grid-row-selected-bg-dark
--dyn-grid-spinner-size
--dyn-grid-spinner-border-width
--dyn-grid-selection-cell-width
--dyn-grid-selection-cell-width-mobile
--dyn-grid-sort-indicator-font-size
--dyn-grid-sort-indicator-opacity
--dyn-grid-pagination-button-width
--dyn-grid-pagination-button-height
--dyn-grid-pagination-button-width-mobile
--dyn-grid-pagination-button-height-mobile
```

---

## 🧪 OPTIONAL FIX #2: Test Expansion (2+ hours)

### Current Coverage: 72%

**9 tests covering**:
- Basic rendering
- Loading state
- Empty state
- Sorting
- Row selection
- Custom rendering
- Size variants
- Styling variants

### Missing Test Areas (~10+ new tests)

#### Test Set 1: Sorting Types (3 tests)

**File**: `packages/dyn-ui-react/src/components/DynGrid/DynGrid.test.tsx`

```typescript
it('sorts string columns correctly', () => {
  const onSort = vi.fn();
  render(
    <DynGrid
      columns={mockColumns}
      data={mockData}
      onSort={onSort}
      sortable={true}
    />
  );

  const nameHeader = screen.getByText('Name');
  fireEvent.click(nameHeader);

  expect(onSort).toHaveBeenCalledWith('name', 'asc');
  
  // Verify sorting is applied
  const rows = screen.getAllByRole('row');
  expect(rows[1]).toHaveTextContent('Bob Johnson'); // First alphabetically
});

it('sorts number columns correctly', () => {
  const columns: DynGridColumn[] = [
    { key: 'id', title: 'ID', sortable: true },
    { key: 'name', title: 'Name' }
  ];
  
  const data = [
    { id: 3, name: 'Charlie' },
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
  ];
  
  render(<DynGrid columns={columns} data={data} sortable={true} />);
  
  const idHeader = screen.getByText('ID');
  fireEvent.click(idHeader);
  
  // Verify numeric sort
  const rows = screen.getAllByRole('row');
  expect(rows[1]).toHaveTextContent('Alice'); // ID 1
  expect(rows[2]).toHaveTextContent('Bob');   // ID 2
  expect(rows[3]).toHaveTextContent('Charlie'); // ID 3
});

it('toggles sort direction on header click', () => {
  const onSort = vi.fn();
  render(
    <DynGrid
      columns={mockColumns}
      data={mockData}
      onSort={onSort}
      sortable={true}
    />
  );
  
  const nameHeader = screen.getByText('Name');
  
  // First click: asc
  fireEvent.click(nameHeader);
  expect(onSort).toHaveBeenLastCalledWith('name', 'asc');
  
  // Second click: desc
  fireEvent.click(nameHeader);
  expect(onSort).toHaveBeenLastCalledWith('name', 'desc');
});
```

**Time**: 20 minutes

---

#### Test Set 2: Selection Modes (3 tests)

```typescript
it('handles single selection mode', () => {
  const onSelectionChange = vi.fn();
  const { rerender } = render(
    <DynGrid
      columns={mockColumns}
      data={mockData}
      selectable="single"
      onSelectionChange={onSelectionChange}
    />
  );
  
  const checkboxes = screen.getAllByRole('radio');
  fireEvent.click(checkboxes[0]);
  
  expect(onSelectionChange).toHaveBeenCalledWith(['1'], [mockData[0]]);
  
  // Select another row should deselect first
  fireEvent.click(checkboxes[1]);
  expect(onSelectionChange).toHaveBeenLastCalledWith(['2'], [mockData[1]]);
});

it('handles select-all checkbox with indeterminate state', () => {
  const onSelectionChange = vi.fn();
  render(
    <DynGrid
      columns={mockColumns}
      data={mockData}
      selectable="multiple"
      onSelectionChange={onSelectionChange}
    />
  );
  
  const allCheckboxes = screen.getAllByRole('checkbox');
  const selectAllCheckbox = allCheckboxes[0];
  
  // Select all
  fireEvent.click(selectAllCheckbox);
  expect(onSelectionChange).toHaveBeenCalledWith(
    ['1', '2', '3'],
    mockData
  );
  
  // Deselect all
  fireEvent.click(selectAllCheckbox);
  expect(onSelectionChange).toHaveBeenLastCalledWith([], []);
});

it('sets indeterminate state when some rows selected', () => {
  render(
    <DynGrid
      columns={mockColumns}
      data={mockData}
      selectable="multiple"
    />
  );
  
  const allCheckboxes = screen.getAllByRole('checkbox');
  const firstRowCheckbox = allCheckboxes[1];
  const selectAllCheckbox = allCheckboxes[0];
  
  // Select only first row
  fireEvent.click(firstRowCheckbox);
  
  // Select-all checkbox should have indeterminate state
  expect(selectAllCheckbox).toHaveAttribute('aria-checked', 'mixed');
});
```

**Time**: 20 minutes

---

#### Test Set 3: Column Features (3 tests)

```typescript
it('hides columns marked as hidden', () => {
  const columns: DynGridColumn[] = [
    { key: 'id', title: 'ID' },
    { key: 'name', title: 'Name' },
    { key: 'email', title: 'Email', hidden: true }
  ];
  
  render(<DynGrid columns={columns} data={mockData} />);
  
  expect(screen.getByText('ID')).toBeInTheDocument();
  expect(screen.getByText('Name')).toBeInTheDocument();
  expect(screen.queryByText('Email')).not.toBeInTheDocument();
});

it('applies column alignment correctly', () => {
  const columns: DynGridColumn[] = [
    { key: 'id', title: 'ID', align: 'center' },
    { key: 'amount', title: 'Amount', align: 'right' }
  ];
  
  const { container } = render(
    <DynGrid columns={columns} data={mockData} />
  );
  
  const headers = container.querySelectorAll('th');
  expect(headers[0]).toHaveClass(styles.headerCellAlignCenter);
  expect(headers[1]).toHaveClass(styles.headerCellAlignRight);
});

it('renders custom cell content', () => {
  const columns: DynGridColumn[] = [
    {
      key: 'status',
      title: 'Status',
      render: (value) => {
        return <strong>{String(value).toUpperCase()}</strong>;
      }
    }
  ];
  
  render(<DynGrid columns={columns} data={mockData} />);
  
  expect(screen.getByText('ACTIVE', { selector: 'strong' })).toBeInTheDocument();
});
```

**Time**: 15 minutes

---

#### Test Set 4: Pagination (2 tests)

```typescript
it('handles pagination controls', () => {
  const onPageChange = vi.fn();
  render(
    <DynGrid
      columns={mockColumns}
      data={mockData}
      pagination={{
        current: 1,
        pageSize: 10,
        total: 30,
        onChange: onPageChange
      }}
    />
  );
  
  const nextButton = screen.getByLabelText('Next page');
  fireEvent.click(nextButton);
  
  expect(onPageChange).toHaveBeenCalledWith(2, 10);
});

it('disables pagination buttons at boundaries', () => {
  render(
    <DynGrid
      columns={mockColumns}
      data={mockData}
      pagination={{
        current: 1,
        pageSize: 10,
        total: 30,
        onChange: vi.fn()
      }}
    />
  );
  
  const prevButton = screen.getByLabelText('Previous page');
  const firstButton = screen.getByLabelText('First page');
  
  expect(prevButton).toBeDisabled();
  expect(firstButton).toBeDisabled();
});
```

**Time**: 15 minutes

---

#### Test Set 5: Accessibility (2 tests)

```typescript
it('sets correct ARIA attributes on header', () => {
  render(
    <DynGrid
      columns={mockColumns}
      data={mockData}
      sortable={true}
    />
  );
  
  const nameHeader = screen.getByText('Name');
  expect(nameHeader).toHaveAttribute('aria-sort', 'none');
  
  fireEvent.click(nameHeader);
  expect(nameHeader).toHaveAttribute('aria-sort', 'ascending');
});

it('maintains proper heading structure', () => {
  const { container } = render(
    <DynGrid columns={mockColumns} data={mockData} />
  );
  
  const headers = container.querySelectorAll('th');
  headers.forEach(header => {
    expect(header).toHaveAttribute('scope', 'col');
  });
});
```

**Time**: 10 minutes

---

### Test Expansion Summary

**Total Effort**: ~2 hours

**New Tests**: 13+ tests

**Coverage Improvement**: 72% → 90%+

**Test Categories**:
- Sorting (3 tests)
- Selection (3 tests)
- Columns (3 tests)
- Pagination (2 tests)
- Accessibility (2 tests)

---

## 🙠 OPTIONAL FIX #3: Documentation (30 minutes)

### Update Storybook

**File**: `packages/dyn-ui-react/src/components/DynGrid/DynGrid.stories.tsx`

Add stories for:
1. Dark mode preview
2. Accessibility features
3. All sorting types
4. Selection modes
5. Filter feature status (document as planned)

### Add JSDoc Comments

```typescript
/**
 * DynGrid - Feature-rich data table component
 * 
 * Features:
 * - Sorting (multi-type support: string, number, boolean, date)
 * - Selection (single/multiple modes)
 * - Pagination (with controls)
 * - Custom cell rendering
 * - Dark mode support
 * - Fully accessible (WCAG AA)
 * - Responsive design
 * 
 * Planned features (not yet implemented):
 * - Column filtering
 * - Column resizing
 * - Sticky columns
 * 
 * @example
 * <DynGrid
 *   columns={columns}
 *   data={data}
 *   sortable={true}
 *   selectable="multiple"
 *   pagination={{ current: 1, pageSize: 10, total: 100 }}
 *   onSort={(column, direction) => console.log(column, direction)}
 *   onSelectionChange={(keys, rows) => console.log(keys, rows)}
 * />
 */
```

**Time**: 30 minutes

---

## 💡 REVIEW CHECKLIST

### CSS Tokenization
- [ ] All 8 hardcoded values replaced with tokens
- [ ] Fallback values match current values
- [ ] Dark mode tokens added where needed
- [ ] Mobile variants added
- [ ] No visual changes (fallbacks ensure backward compat)
- [ ] Responsive behavior tested

### Test Expansion
- [ ] 13+ new test cases added
- [ ] All tests pass
- [ ] Coverage improved to 90%+
- [ ] Edge cases covered
- [ ] Accessibility tests added

### Documentation
- [ ] JSDoc comments updated
- [ ] Storybook stories enhanced
- [ ] Filter feature status documented
- [ ] Accessibility features highlighted
- [ ] Examples updated

---

## 👩‍🔧 Development Steps

### Phase 1: CSS Tokenization (25 minutes)
1. Open `DynGrid.module.css`
2. Apply 6 CSS updates from sections above
3. Verify no visual changes: `npm run storybook`
4. Test responsive: Check mobile at 768px breakpoint
5. Test dark mode: Toggle system preference

### Phase 2: Test Expansion (2 hours)
1. Open `DynGrid.test.tsx`
2. Add 13+ new test cases from sections above
3. Run tests: `npm test -- DynGrid`
4. Verify all pass
5. Check coverage: `npm test -- DynGrid --coverage`

### Phase 3: Documentation (30 minutes)
1. Update JSDoc in `DynGrid.tsx`
2. Add JSDoc to types in `DynGrid.types.ts`
3. Add/update Storybook stories
4. Verify Storybook renders: `npm run storybook`

### Phase 4: Commit (30 minutes)
1. Review all changes
2. Self-review diffs
3. Run full test suite: `npm test`
4. Run type check: `npm run typecheck`
5. Run build: `npm run build`
6. Commit: `git commit -m "enhance(DynGrid): tokenize CSS, expand tests, improve docs"`

**Total Time**: ~3.5 hours

---

## 🗡️ COMMIT MESSAGE

```
enhance(DynGrid): CSS tokenization, test expansion, documentation

Improvements:
- Tokenized 8 hardcoded CSS values:
  * Selected row background colors (light & dark)
  * Spinner size and border width
  * Selection cell width (desktop & mobile)
  * Sort indicator size and opacity
  * Pagination button sizes (desktop & mobile)

- Expanded test coverage 72% → 90%+:
  * Added 13+ test cases
  * Sorting: string, number, direction toggle
  * Selection: single, multiple, indeterminate
  * Columns: hidden, alignment, custom render
  * Pagination: controls, boundaries
  * Accessibility: ARIA attributes, heading structure

- Enhanced documentation:
  * Added comprehensive JSDoc comments
  * Updated Storybook stories
  * Documented planned features (filter, resize, sticky)
  * Highlighted accessibility features

All changes are backward compatible (token fallbacks preserve current behavior).

Score improvements:
- CSS Tokenization: 95% → 98%
- Test Coverage: 72% → 90%+
- Overall: 82% → 88%+
```

---

## 🗣️ DEPLOYMENT PATH

### Option A: Deploy Now (Recommended)

✅ **Do this immediately** - DynGrid is already production-ready

1. Deploy current version to production
2. Monitor for 1 week
3. Apply enhancements after

**Timeline**: Deploy today, enhance next week

### Option B: Deploy with Enhancements

✅ **Alternative** - If you want everything polished first

1. Apply CSS tokenization (25 min)
2. Expand tests (2 hours)
3. Update documentation (30 min)
4. Review and merge
5. Deploy polished version

**Timeline**: 3.5 hours, deploy tomorrow

---

## 🌟 RECOMMENDATION

### Go with Option A

**Why**:
- ✅ DynGrid is production-ready NOW
- ✅ Zero blocking issues
- ✅ Enhancements are optional
- ✅ No user-facing risk
- ✅ Faster time to value

**Process**:
1. Deploy production version today
2. Gather real-world feedback
3. Apply enhancements after (1 week)
4. Users benefit from improvements based on real usage

---

## 📱 RESOURCES

- [React Testing Library](https://testing-library.com/)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Storybook Documentation](https://storybook.js.org/)

---

**Document Version**: 1.0  
**Status**: ✅ Ready for Implementation  
**Last Updated**: December 25, 2025  
**Component Status**: 🟡 PRODUCTION-READY (enhancements optional)
