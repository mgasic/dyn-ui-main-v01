# DynBadge - Enterprise Implementation Guide

**TIER**: 1 | **Complexity**: LOW | **Timeline**: 2-3 days

---

## 1. QUICK FACTS

- **Status**: ⚠️ INCOMPLETE (77%)
- **Type**: Display/Status indicator
- **State**: Stateless (presentational only)
- **Keyboard**: None required
- **ARIA**: Semantic HTML sufficient
- **Testing**: TIER 1 basic
- **Dark Mode**: ✅ Required

---

## 2. CURRENT STATE

### ✅ Exists
- Basic badge component (DynBadge.tsx)
- Primary variant implemented
- Token system foundation
- CSS module (DynBadge.module.css)

### ❌ Missing
- Ghost variant (transparent)
- All size tokens (xs, sm, md, lg, xl)
- State suffixes on tokens (-hover, -active, -focus)
- Comprehensive test coverage
- Dark mode validation

### 📊 Completeness: 77%

---

## 3. WANTED STATE

✅ All 5 variants: primary, secondary, tertiary, success, error  
✅ All 5 sizes: xs, sm, md, lg, xl  
✅ Token-driven styling with 3-level fallbacks  
✅ Dark mode + high contrast support  
✅ 80%+ test coverage (jest-axe included)  
✅ Storybook stories for all combinations  
✅ WCAG AA compliant  

---

## 4. GAP ANALYSIS

| Gap | Priority | Effort | Notes |
|-----|----------|--------|-------|
| Add missing variants | 🔴 CRITICAL | 1h | Secondary, tertiary, success, error |
| Add all size tokens | 🔴 CRITICAL | 1h | xs, sm, md, lg, xl CSS variables |
| Add state suffixes | 🟡 HIGH | 30m | -hover, -active, -focus on all variants |
| Comprehensive testing | 🟡 HIGH | 2h | Dark mode, high contrast, all sizes |
| Storybook enhancement | 🟡 HIGH | 1h | Stories for all combinations |

**Total Effort**: 5-6 hours

---

## 5. IMPLEMENTATION

### 5.1 Token Template

```css
/* DynBadge.module.css */
.badge {
  /* SIZE TOKENS */
  --dyn-badge-size-xs: var(--dyn-spacing-xs), var(--legacy-spacing-xs), 4px;
  --dyn-badge-size-sm: var(--dyn-spacing-sm), var(--legacy-spacing-sm), 6px;
  --dyn-badge-size-md: var(--dyn-spacing-md), var(--legacy-spacing-md), 8px;
  --dyn-badge-size-lg: var(--dyn-spacing-lg), var(--legacy-spacing-lg), 12px;
  --dyn-badge-size-xl: var(--dyn-spacing-xl), var(--legacy-spacing-xl), 16px;

  /* COLOR TOKENS - PRIMARY */
  --dyn-badge-bg-primary: var(--dyn-color-primary), var(--legacy-color-primary), #2563eb;
  --dyn-badge-text-primary: var(--dyn-color-white), var(--legacy-color-white), #ffffff;
  --dyn-badge-bg-primary-hover: var(--dyn-color-primary-hover), var(--legacy-color-primary-90), #1e3a8a;

  /* COLOR TOKENS - SECONDARY */
  --dyn-badge-bg-secondary: var(--dyn-color-secondary), var(--legacy-color-secondary), #6b7280;
  --dyn-badge-text-secondary: var(--dyn-color-white), var(--legacy-color-white), #ffffff;

  /* COLOR TOKENS - SUCCESS */
  --dyn-badge-bg-success: var(--dyn-color-success), var(--legacy-color-success), #10b981;
  --dyn-badge-text-success: var(--dyn-color-white), var(--legacy-color-white), #ffffff;

  /* COLOR TOKENS - ERROR */
  --dyn-badge-bg-error: var(--dyn-color-error), var(--legacy-color-error), #ef4444;
  --dyn-badge-text-error: var(--dyn-color-white), var(--legacy-color-white), #ffffff;

  /* DARK MODE */
  @media (prefers-color-scheme: dark) {
    --dyn-badge-bg-primary: var(--dyn-color-primary-dark), var(--legacy-color-primary-dark), #1e3a8a;
    --dyn-badge-bg-secondary: var(--dyn-color-secondary-dark), var(--legacy-color-secondary-dark), #4b5563;
  }

  /* HIGH CONTRAST */
  @media (prefers-contrast: more) {
    --dyn-badge-border: 2px solid currentColor;
  }
}

/* VARIANTS */
.badge--primary {
  background-color: var(--dyn-badge-bg-primary);
  color: var(--dyn-badge-text-primary);
}

.badge--secondary {
  background-color: var(--dyn-badge-bg-secondary);
  color: var(--dyn-badge-text-secondary);
}

.badge--success {
  background-color: var(--dyn-badge-bg-success);
  color: var(--dyn-badge-text-success);
}

.badge--error {
  background-color: var(--dyn-badge-bg-error);
  color: var(--dyn-badge-text-error);
}

/* SIZES */
.badge--xs { padding: var(--dyn-badge-size-xs); }
.badge--sm { padding: var(--dyn-badge-size-sm); }
.badge--md { padding: var(--dyn-badge-size-md); }
.badge--lg { padding: var(--dyn-badge-size-lg); }
.badge--xl { padding: var(--dyn-badge-size-xl); }
```

### 5.2 Props & Types

```typescript
export interface DynBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'success' | 'error';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  icon?: React.ReactNode;
  count?: number;
}

export const DynBadge = React.forwardRef<HTMLSpanElement, DynBadgeProps>(
  ({ variant = 'primary', size = 'md', ...props }, ref) => (
    <span
      ref={ref}
      className={`badge badge--${variant} badge--${size}`}
      {...props}
    />
  )
);
```

### 5.3 Testing (TIER 1)

Reference: `PATTERNS/04-Testing-Pattern.md` → TIER 1

```typescript
describe('DynBadge', () => {
  test('renders with children', () => {
    render(<DynBadge>Badge</DynBadge>);
    expect(screen.getByText('Badge')).toBeInTheDocument();
  });

  test('applies variant class', () => {
    const { container } = render(
      <DynBadge variant="success">Success</DynBadge>
    );
    expect(container.querySelector('.badge--success')).toBeInTheDocument();
  });

  test('applies size class', () => {
    const { container } = render(
      <DynBadge size="lg">Large</DynBadge>
    );
    expect(container.querySelector('.badge--lg')).toBeInTheDocument();
  });

  test('has no accessibility violations', async () => {
    const { container } = render(<DynBadge>Badge</DynBadge>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### 5.4 Storybook Stories

```typescript
export default {
  title: 'Components/TIER1/DynBadge',
  component: DynBadge,
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'success', 'error'] },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  },
};

export const Primary = () => <DynBadge variant="primary">Primary</DynBadge>;
export const Secondary = () => <DynBadge variant="secondary">Secondary</DynBadge>;
export const AllSizes = () => (
  <div style={{ display: 'flex', gap: '8px' }}>
    <DynBadge size="xs">XS</DynBadge>
    <DynBadge size="sm">SM</DynBadge>
    <DynBadge size="md">MD</DynBadge>
    <DynBadge size="lg">LG</DynBadge>
    <DynBadge size="xl">XL</DynBadge>
  </div>
);
```

---

## 6. ENTERPRISE CHECKLIST

Reference: `PATTERNS/05-Enterprise-Checklist.md` → TIER 1

- [ ] TypeScript strict mode
- [ ] No `any` types, Props interface exported
- [ ] All colors use CSS variables (--dyn-badge-*)
- [ ] 3-level fallback pattern (design / legacy / literal)
- [ ] Dark mode tokens defined and tested
- [ ] Semantic HTML
- [ ] jest-axe tests pass (no violations)
- [ ] All variants tested (primary, secondary, success, error)
- [ ] All sizes tested (xs, sm, md, lg, xl)
- [ ] Storybook stories for all variants + dark mode
- [ ] 80%+ test coverage
- [ ] JSDoc comments
- [ ] No hardcoded colors/sizes
- [ ] Feature branch + clear commit messages
- [ ] Code review passed
- [ ] CI/CD checks pass

---

## 7. REFERENCES

- `00-MASTER-TEMPLATE.md` - Structure reference
- `PATTERNS/02-ARIA-Attributes-Pattern.md` - Semantic HTML (TIER 1)
- `PATTERNS/04-Testing-Pattern.md` - TIER 1 test template
- `PATTERNS/05-Enterprise-Checklist.md` - TIER 1 checklist

---

**Status**: ✅ GUIDE READY FOR IMPLEMENTATION
