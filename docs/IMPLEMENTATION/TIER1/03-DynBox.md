# DynBox - Enterprise Implementation Guide

**TIER**: 1 | **Kompleksnost**: LOW | **Timeline**: 1-2 days

---

## 1. QUICK FACTS

- **Status**: ⚠️ INCOMPLETE (60%)
- **Type**: Flex layout container
- **State**: Stateless (presentational only)
- **Keyboard**: None required
- **ARIA**: Semantic HTML sufficient
- **Testing**: TIER 1 basic
- **Dark Mode**: ✅ Required

---

## 2. CURRENT STATE

### ✅ Exists
- Basic flexbox component
- Primary layout direction
- Foundation for spacing

### ❌ Missing
- All direction variants (row, column, row-reverse, column-reverse)
- All align variants (flex-start, center, flex-end, stretch)
- All justify variants (flex-start, center, flex-end, space-between, space-around)
- All gap tokens (xs, sm, md, lg, xl)
- Comprehensive test coverage
- Storybook stories for all combinations

### 📊 Completeness: 60%

---

## 3. WANTED STATE

✅ All direction variants (row, column, row-reverse, column-reverse)  
✅ All align-items variants (flex-start, center, flex-end, stretch)  
✅ All justify-content variants (flex-start, center, flex-end, space-between, space-around)  
✅ All gap tokens (xs, sm, md, lg, xl)  
✅ Wrap support (wrap, nowrap, wrap-reverse)  
✅ 80%+ test coverage  
✅ WCAG AA compliant  

---

## 4. GAP ANALYSIS

| Gap | Priority | Effort | Notes |
|-----|----------|--------|-------|
| Add direction variants | 🔴 CRITICAL | 1h | row, column, row-reverse, column-reverse |
| Add align variants | 🔴 CRITICAL | 1h | flex-start, center, flex-end, stretch |
| Add justify variants | 🔴 CRITICAL | 1h | flex-start, center, flex-end, space-between, space-around |
| Add wrap support | 🟡 HIGH | 30m | wrap, nowrap, wrap-reverse |
| Add gap tokens | 🟡 HIGH | 1h | xs, sm, md, lg, xl CSS variables |
| Comprehensive testing | 🟡 HIGH | 1.5h | All combinations, responsive behavior |
| Storybook enhancement | 🟡 HIGH | 1h | Stories for all property combinations |

**Total Effort**: 6-7 hours

---

## 5. IMPLEMENTATION

### 5.1 Token Template

```css
/* DynBox.module.css */
.box {
  display: flex;

  /* GAP TOKENS */
  --dyn-box-gap-xs: var(--dyn-spacing-xs), var(--legacy-spacing-xs), 4px;
  --dyn-box-gap-sm: var(--dyn-spacing-sm), var(--legacy-spacing-sm), 8px;
  --dyn-box-gap-md: var(--dyn-spacing-md), var(--legacy-spacing-md), 16px;
  --dyn-box-gap-lg: var(--dyn-spacing-lg), var(--legacy-spacing-lg), 24px;
  --dyn-box-gap-xl: var(--dyn-spacing-xl), var(--legacy-spacing-xl), 32px;
}

/* DIRECTION VARIANTS */
.box--row { flex-direction: row; }
.box--column { flex-direction: column; }
.box--row-reverse { flex-direction: row-reverse; }
.box--column-reverse { flex-direction: column-reverse; }

/* ALIGN VARIANTS */
.box--align-start { align-items: flex-start; }
.box--align-center { align-items: center; }
.box--align-end { align-items: flex-end; }
.box--align-stretch { align-items: stretch; }

/* JUSTIFY VARIANTS */
.box--justify-start { justify-content: flex-start; }
.box--justify-center { justify-content: center; }
.box--justify-end { justify-content: flex-end; }
.box--justify-between { justify-content: space-between; }
.box--justify-around { justify-content: space-around; }

/* WRAP VARIANTS */
.box--wrap { flex-wrap: wrap; }
.box--nowrap { flex-wrap: nowrap; }
.box--wrap-reverse { flex-wrap: wrap-reverse; }

/* GAP VARIANTS */
.box--gap-xs { gap: var(--dyn-box-gap-xs); }
.box--gap-sm { gap: var(--dyn-box-gap-sm); }
.box--gap-md { gap: var(--dyn-box-gap-md); }
.box--gap-lg { gap: var(--dyn-box-gap-lg); }
.box--gap-xl { gap: var(--dyn-box-gap-xl); }
```

### 5.2 Props & Types

```typescript
export interface DynBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Flex direction */
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  /** Align items along cross axis */
  align?: 'start' | 'center' | 'end' | 'stretch';
  /** Justify content along main axis */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  /** Flex wrap behavior */
  wrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
  /** Gap between flex items */
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Child elements */
  children: React.ReactNode;
}

/**
 * DynBox - Flexible layout container using flexbox
 * 
 * @example
 * <DynBox direction="column" gap="md" align="center">
 *   <DynText>Item 1</DynText>
 *   <DynText>Item 2</DynText>
 * </DynBox>
 * 
 * @example
 * <DynBox direction="row" justify="between" align="center" gap="sm">
 *   <span>Left</span>
 *   <span>Right</span>
 * </DynBox>
 */
export const DynBox = React.forwardRef<HTMLDivElement, DynBoxProps>(
  (
    {
      direction = 'row',
      align = 'start',
      justify = 'start',
      wrap = 'nowrap',
      gap = 'md',
      className,
      ...props
    },
    ref
  ) => {
    const boxClassName = [
      'box',
      `box--${direction}`,
      `box--align-${align}`,
      `box--justify-${justify}`,
      `box--${wrap}`,
      `box--gap-${gap}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return <div ref={ref} className={boxClassName} {...props} />;
  }
);

DynBox.displayName = 'DynBox';
```

### 5.3 Testing (TIER 1)

```typescript
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { DynBox } from './DynBox';

expect.extend(toHaveNoViolations);

describe('DynBox', () => {
  describe('Direction variants', () => {
    const directions = ['row', 'column', 'row-reverse', 'column-reverse'] as const;
    
    directions.forEach((direction) => {
      test(`renders with direction=${direction}`, () => {
        const { container } = render(
          <DynBox direction={direction}>
            <div>Child</div>
          </DynBox>
        );
        expect(container.querySelector(`.box--${direction}`)).toBeInTheDocument();
      });
    });
  });

  describe('Align variants', () => {
    const aligns = ['start', 'center', 'end', 'stretch'] as const;
    
    aligns.forEach((align) => {
      test(`renders with align=${align}`, () => {
        const { container } = render(
          <DynBox align={align}>
            <div>Child</div>
          </DynBox>
        );
        expect(container.querySelector(`.box--align-${align}`)).toBeInTheDocument();
      });
    });
  });

  describe('Justify variants', () => {
    const justifies = ['start', 'center', 'end', 'between', 'around'] as const;
    
    justifies.forEach((justify) => {
      test(`renders with justify=${justify}`, () => {
        const { container } = render(
          <DynBox justify={justify}>
            <div>Child</div>
          </DynBox>
        );
        expect(container.querySelector(`.box--justify-${justify}`)).toBeInTheDocument();
      });
    });
  });

  describe('Gap variants', () => {
    const gaps = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
    
    gaps.forEach((gap) => {
      test(`renders with gap=${gap}`, () => {
        const { container } = render(
          <DynBox gap={gap}>
            <div>Child 1</div>
            <div>Child 2</div>
          </DynBox>
        );
        expect(container.querySelector(`.box--gap-${gap}`)).toBeInTheDocument();
      });
    });
  });

  test('has no accessibility violations', async () => {
    const { container } = render(
      <DynBox>
        <div>Child</div>
      </DynBox>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### 5.4 Storybook Stories

```typescript
import { StoryObj, Meta } from '@storybook/react';
import { DynBox } from './DynBox';

const meta: Meta<typeof DynBox> = {
  title: 'Components/TIER1/DynBox',
  component: DynBox,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <DynBox gap="md" direction="row">
      <div style={{ flex: 1, background: '#f0f0f0', padding: '12px' }}>Item 1</div>
      <div style={{ flex: 1, background: '#f0f0f0', padding: '12px' }}>Item 2</div>
      <div style={{ flex: 1, background: '#f0f0f0', padding: '12px' }}>Item 3</div>
    </DynBox>
  ),
};

export const DirectionRow: Story = {
  render: () => (
    <DynBox direction="row" gap="md">
      <div style={{ background: '#e8f4f8', padding: '12px' }}>Row 1</div>
      <div style={{ background: '#e8f4f8', padding: '12px' }}>Row 2</div>
    </DynBox>
  ),
};

export const DirectionColumn: Story = {
  render: () => (
    <DynBox direction="column" gap="md">
      <div style={{ background: '#f8e8f4', padding: '12px' }}>Column 1</div>
      <div style={{ background: '#f8e8f4', padding: '12px' }}>Column 2</div>
      <div style={{ background: '#f8e8f4', padding: '12px' }}>Column 3</div>
    </DynBox>
  ),
};

export const AlignCenter: Story = {
  render: () => (
    <DynBox direction="row" align="center" gap="md" style={{ height: '100px' }}>
      <div style={{ background: '#f4f8e8', padding: '12px' }}>Aligned</div>
      <div style={{ background: '#f4f8e8', padding: '12px' }}>Center</div>
    </DynBox>
  ),
};

export const JustifyBetween: Story = {
  render: () => (
    <DynBox direction="row" justify="between" gap="md">
      <div style={{ background: '#f8f4e8', padding: '12px' }}>Left</div>
      <div style={{ background: '#f8f4e8', padding: '12px' }}>Right</div>
    </DynBox>
  ),
};

export const WithWrap: Story = {
  render: () => (
    <DynBox direction="row" wrap="wrap" gap="md" style={{ width: '300px' }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} style={{ background: '#e8e8f8', padding: '12px', flex: '0 0 100px' }}>
          Item {i}
        </div>
      ))}
    </DynBox>
  ),
};
```

---

## 6. ENTERPRISE CHECKLIST

- [ ] TypeScript strict mode enabled
- [ ] No `any` types, Props interface fully exported
- [ ] All gaps use CSS variables (--dyn-box-gap-*)
- [ ] 3-level fallback pattern on all tokens
- [ ] All direction variants work correctly
- [ ] All align variants work correctly
- [ ] All justify variants work correctly
- [ ] All gap variants work correctly
- [ ] jest-axe tests pass (no violations)
- [ ] Responsive behavior tested
- [ ] Storybook stories complete
- [ ] 80%+ test coverage
- [ ] JSDoc comments present
- [ ] No hardcoded sizes

---

## 7. REFERENCES

- `00-MASTER-TEMPLATE.md` - Structure reference
- `PATTERNS/04-Testing-Pattern.md` - TIER 1 test template
- `PATTERNS/05-Enterprise-Checklist.md` - TIER 1 checklist
- [MDN: CSS Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout)

---

**Status**: ✅ GUIDE READY FOR IMPLEMENTATION
