# 💻 Implementation Plan for Component Audit

**Status**: Active  
**Date**: 26 January 2026  
**Target**: Launch-Ready Components by 9 February 2026

---

## Phase 1: Fundamentals (15 hours)

### 1.1 Fix CSS Modules Issues (4h)

**Problem**: Helper functions breaking CSS module hashification

**Affected Components**:
- DynListView
- DynTabs
- DynSelect
- DynDropdown

**Solution**:
```tsx
// BEFORE
const getStyleClass = (name: string) => styles[name] || name;
className={getStyleClass('option__checkbox')}

// AFTER
className={styles.optionCheckbox}
```

**PR Template**: `fix(components): Replace CSS module helper functions with direct access`

---

### 1.2 Add Token Fallbacks (3h)

**Problem**: CSS variables without fallback values

**Solution**:
```css
/* BEFORE */
font-weight: var(--dyn-font-weight-medium);

/* AFTER */
font-weight: var(--dyn-font-weight-medium, 500);
```

**Checklist**:
- [ ] Find all `var(--dyn-` instances
- [ ] Add appropriate fallback values
- [ ] Test with token file missing
- [ ] Verify Storybook renders

**PR Template**: `fix(tokens): Add fallback values to all CSS variables`

---

### 1.3 Fix Accessibility (6h)

**Problem**: Missing ARIA attributes and keyboard navigation

**Requirements** (WCAG 2.1 Level AA):

1. **Buttons**
```tsx
// Add aria-label for icon-only buttons
<button aria-label="Close dialog" onClick={onClose}>
  <X />
</button>
```

2. **Form Fields**
```tsx
// Connect label to input
<label htmlFor="email">Email</label>
<input id="email" type="email" />
```

3. **Interactive Elements**
```tsx
// Ensure focusable
<div role="button" tabIndex={0} onKeyDown={handleKey}>
  Action
</div>
```

4. **Lists**
```tsx
// Semantic list markup
<ul role="list">
  <li key={id}>{item}</li>
</ul>
```

**Components to Fix**:
- [ ] DynInput
- [ ] DynCheckbox
- [ ] DynSelect
- [ ] DynListView
- [ ] DynTable
- [ ] DynModal
- [ ] DynDropdown
- [ ] DynMenu
- [ ] DynTabs
- [ ] DynMenu

**PR Template**: `a11y: Add WCAG 2.1 AA compliance to components`

---

### 1.4 Create Component Checklist (2h)

**Deliverable**: `docs/COMPONENT_CHECKLIST.md`

**Content**:
```markdown
# Component Compliance Checklist

## TypeScript
- [ ] All props fully typed
- [ ] JSDoc comments for public APIs
- [ ] Type exports

## CSS
- [ ] camelCase class names
- [ ] No hardcoded colors
- [ ] Token fallbacks on all var()
- [ ] Dark mode tested

## Accessibility
- [ ] ARIA labels where needed
- [ ] Keyboard navigation working
- [ ] Focus management
- [ ] Color contrast >= 4.5:1
- [ ] Screen reader friendly

## Tests
- [ ] Unit tests >= 80% coverage
- [ ] E2E for critical paths
- [ ] Accessibility tests (axe)

## Storybook
- [ ] >= 3 stories
- [ ] Props documentation
- [ ] Accessibility tab
- [ ] Dark mode story
```

**PR Template**: `docs: Add component compliance checklist`

---

## Phase 2: Quality (27 hours)

### 2.1 Setup E2E Testing (8h)

**Setup Playwright**:
```bash
npm install -D @playwright/test
```

**Config**: `playwright.config.ts`
```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  webServer: {
    command: 'npm run storybook',
    port: 6006,
  },
  use: {
    baseURL: 'http://localhost:6006',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
```

**Test Examples**: `e2e/components/`
- `DynButton.e2e.ts` - Click, keyboard, accessibility
- `DynInput.e2e.ts` - Type, validation, focus
- `DynSelect.e2e.ts` - Open, select, keyboard
- `DynTable.e2e.ts` - Render, sort, pagination

**PR Template**: `test(e2e): Setup Playwright testing framework`

---

### 2.2 Write Unit Tests (10h)

**Target**: 80%+ coverage per component

**Example**: `DynInput.test.tsx`
```typescript
import { render, screen } from '@testing-library/react';
import { DynInput } from './DynInput';

describe('DynInput', () => {
  it('should render', () => {
    render(<DynInput />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should have accessibility attributes', () => {
    render(<DynInput aria-label="Email" />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('should handle onChange', () => {
    const onChange = jest.fn();
    render(<DynInput onChange={onChange} />);
    const input = screen.getByRole('textbox');
    
    fireEvent.change(input, { target: { value: 'test' } });
    expect(onChange).toHaveBeenCalledWith('test');
  });

  it('should be disabled when disabled prop is true', () => {
    render(<DynInput disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });
});
```

**Components** (in priority order):
1. Input components (DynInput, DynSelect, DynCheckbox, etc.)
2. Data display (DynCard, DynList, DynTable)
3. Navigation (DynMenu, DynBreadcrumb, DynSidebar)
4. Feedback (DynAlert, DynToast, DynSpinner)

**PR Template**: `test(unit): Add 80%+ coverage for [component]`

---

### 2.3 Storybook Stories (5h)

**Example**: `DynInput.stories.tsx`
```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { DynInput } from './DynInput';

const meta: Meta<typeof DynInput> = {
  component: DynInput,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'error', 'success'],
    },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithError: Story = {
  args: {
    variant: 'error',
    helperText: 'Field is required',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <DynInput size="sm" placeholder="Small" />
      <DynInput size="md" placeholder="Medium" />
      <DynInput size="lg" placeholder="Large" />
    </div>
  ),
};
```

**Requirements per Component**:
- [ ] Default state
- [ ] All size variants
- [ ] All variants (primary, secondary, outline, etc.)
- [ ] Disabled state
- [ ] Error/success states
- [ ] Dark mode
- [ ] Responsive (if applicable)

**PR Template**: `docs(storybook): Add comprehensive stories for [component]`

---

### 2.4 Visual Regression Testing (4h)

**Setup Percy or Chromatic**:
```bash
npm install -D @percy/cli @percy/storybook
```

**Configuration**: `percy.config.js`
```javascript
module.exports = {
  version: 2,
  static: {
    cleanUrls: true,
    include: '**/*.html',
    exclude: [],
  },
  discovery: {
    allowed-hosts: ['localhost'],
    network-idle-timeout: 750,
  },
  static: {
    include: 'storybook-static/',
  },
};
```

**Baseline Snapshots**: First run captures baselines
```bash
percy storybook
```

**CI Integration**: 
```yaml
# .github/workflows/visual-regression.yml
name: Visual Regression Tests
on: [pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run storybook
      - run: percy storybook
```

**PR Template**: `test(visual): Setup visual regression testing`

---

## Phase 3: Polish (15 hours)

### 3.1 Dark Mode QA (4h)

**Checklist for each component**:
- [ ] Semantic tokens applied (background, text, border)
- [ ] Tested with `@media (prefers-color-scheme: dark)`
- [ ] Tested with `[data-theme='dark']` class
- [ ] All text readable (contrast >= 4.5:1)
- [ ] All icons visible
- [ ] No hardcoded colors remaining

**Test Command**:
```bash
# In Storybook, toggle dark mode and verify
npm run storybook
# Navigate to any component and toggle dark mode button
```

**PR Template**: `fix(dark-mode): Ensure WCAG contrast and visibility in dark mode`

---

### 3.2 Performance Optimization (5h)

**Bundle Analysis**:
```bash
npm run build:analyze
```

**Optimizations**:
- [ ] Remove unused CSS
- [ ] Memoize where needed
- [ ] Lazy load heavy dependencies
- [ ] Code-split Storybook
- [ ] Optimize image assets

**Targets**:
- Bundle size: < 500KB (gzipped)
- Build time: < 60s
- Lighthouse: >= 90

**PR Template**: `perf: Optimize bundle size and build performance`

---

### 3.3 Responsive Design QA (3h)

**Breakpoints to test**:
- Mobile: 320px, 480px
- Tablet: 768px
- Desktop: 1024px, 1440px

**Checklist**:
- [ ] Touch targets >= 44px
- [ ] Text readable at all sizes
- [ ] Responsive images
- [ ] Flexible layouts (no fixed widths)
- [ ] Mobile navigation works

**Test Command**:
```bash
npm run storybook
# Use DevTools responsive mode to test all breakpoints
```

**PR Template**: `fix(responsive): Ensure mobile-first responsive design`

---

### 3.4 Final Documentation (3h)

**Documents to finalize**:
1. `docs/COMPONENT_CHECKLIST.md` - Update with all completed items
2. `docs/UNIFIED_PROPS_INTERFACE.md` - Standardized props
3. `docs/ACCESSIBILITY_GUIDE.md` - WCAG compliance guide
4. Update `README.md` with launch status
5. Create `LAUNCH_CHECKLIST.md` - Pre-release verification

**PR Template**: `docs: Final documentation for v1.0 launch`

---

## Summary

| Phase | Focus | Effort | Timeline |
|-------|-------|--------|----------|
| 1 | Fix fundamentals | 15h | Week 1-2 |
| 2 | Add quality | 27h | Week 2-3 |
| 3 | Polish & launch | 15h | Week 3-4 |
| **Total** | **Launch-Ready** | **57h** | **2-3 weeks** |

---

**Next**: Start with Phase 1.1 - Fix CSS Modules Issues
