# DynLabel - Enterprise Implementation Guide

**TIER**: 1 | **Kompleksnost**: LOW | **Timeline**: 1-2 days

---

## 1. QUICK FACTS

- **Status**: ⚠️ INCOMPLETE (65%)
- **Type**: Text label/typography wrapper
- **State**: Stateless (presentational only)
- **Keyboard**: None required
- **ARIA**: Semantic HTML sufficient
- **Testing**: TIER 1 basic
- **Dark Mode**: ✅ Required

---

## 2. CURRENT STATE

### ✅ Exists
- Basic label component
- Primary style/weight
- Foundation for typography

### ❌ Missing
- All font weight variants (normal, medium, semibold, bold)
- Size variants (xs, sm, md, lg, xl)
- Dark mode tokens
- Line height tokens
- Comprehensive test coverage
- Storybook stories

### 📊 Completeness: 65%

---

## 3. WANTED STATE

✅ All font weight variants (normal, medium, semibold, bold)  
✅ All size tokens (xs, sm, md, lg, xl)  
✅ All line height variants  
✅ Dark mode support  
✅ Semantic HTML (use appropriate heading/span)  
✅ High contrast support  
✅ 80%+ test coverage (jest-axe included)  
✅ WCAG AA compliant  

---

## 4. GAP ANALYSIS

| Gap | Priority | Effort | Notes |
|-----|----------|--------|-------|
| Add weight tokens | 🔴 CRITICAL | 1h | normal, medium, semibold, bold |
| Add size tokens | 🔴 CRITICAL | 1h | xs, sm, md, lg, xl CSS variables |
| Add line-height tokens | 🟡 HIGH | 30m | Different ratios per size |
| Dark mode tokens | 🟡 HIGH | 30m | Text color dark mode variants |
| Comprehensive testing | 🟡 HIGH | 1.5h | Dark mode, contrast, all variants |
| Storybook enhancement | 🟡 HIGH | 1h | Stories for all weight+size combos |

**Total Effort**: 5-6 hours

---

## 5. IMPLEMENTATION

### 5.1 Token Template

```css
/* DynLabel.module.css */
.label {
  /* FONT WEIGHT TOKENS */
  --dyn-label-font-weight-normal: var(--dyn-font-weight-normal), var(--legacy-font-weight-normal), 400;
  --dyn-label-font-weight-medium: var(--dyn-font-weight-medium), var(--legacy-font-weight-medium), 500;
  --dyn-label-font-weight-semibold: var(--dyn-font-weight-semibold), var(--legacy-font-weight-semibold), 600;
  --dyn-label-font-weight-bold: var(--dyn-font-weight-bold), var(--legacy-font-weight-bold), 700;

  /* FONT SIZE TOKENS */
  --dyn-label-size-xs: var(--dyn-font-size-xs), var(--legacy-font-size-xs), 11px;
  --dyn-label-size-sm: var(--dyn-font-size-sm), var(--legacy-font-size-sm), 12px;
  --dyn-label-size-md: var(--dyn-font-size-md), var(--legacy-font-size-md), 14px;
  --dyn-label-size-lg: var(--dyn-font-size-lg), var(--legacy-font-size-lg), 16px;
  --dyn-label-size-xl: var(--dyn-font-size-xl), var(--legacy-font-size-xl), 18px;

  /* LINE HEIGHT TOKENS */
  --dyn-label-line-height-tight: var(--dyn-line-height-tight), var(--legacy-line-height-tight), 1.2;
  --dyn-label-line-height-normal: var(--dyn-line-height-normal), var(--legacy-line-height-normal), 1.5;
  --dyn-label-line-height-relaxed: var(--dyn-line-height-relaxed), var(--legacy-line-height-relaxed), 1.75;

  /* COLOR TOKENS */
  --dyn-label-color: var(--dyn-color-text), var(--legacy-color-text), #1f2121;
  --dyn-label-color-secondary: var(--dyn-color-text-secondary), var(--legacy-color-text-secondary), #6b7280;
  --dyn-label-color-muted: var(--dyn-color-text-muted), var(--legacy-color-text-muted), #9ca3af;

  /* DARK MODE */
  @media (prefers-color-scheme: dark) {
    --dyn-label-color: var(--dyn-color-text-dark), var(--legacy-color-text-dark), #f5f5f5;
    --dyn-label-color-secondary: var(--dyn-color-text-secondary-dark), var(--legacy-color-text-secondary-dark), #d1d5db;
    --dyn-label-color-muted: var(--dyn-color-text-muted-dark), var(--legacy-color-text-muted-dark), #9ca3af;
  }

  /* HIGH CONTRAST */
  @media (prefers-contrast: more) {
    --dyn-label-color: var(--dyn-color-text-high-contrast), var(--legacy-color-text-high-contrast), #000000;
  }
}

/* WEIGHT VARIANTS */
.label--normal { font-weight: var(--dyn-label-font-weight-normal); }
.label--medium { font-weight: var(--dyn-label-font-weight-medium); }
.label--semibold { font-weight: var(--dyn-label-font-weight-semibold); }
.label--bold { font-weight: var(--dyn-label-font-weight-bold); }

/* SIZE VARIANTS */
.label--xs { font-size: var(--dyn-label-size-xs); line-height: var(--dyn-label-line-height-tight); }
.label--sm { font-size: var(--dyn-label-size-sm); line-height: var(--dyn-label-line-height-tight); }
.label--md { font-size: var(--dyn-label-size-md); line-height: var(--dyn-label-line-height-normal); }
.label--lg { font-size: var(--dyn-label-size-lg); line-height: var(--dyn-label-line-height-normal); }
.label--xl { font-size: var(--dyn-label-size-xl); line-height: var(--dyn-label-line-height-relaxed); }

/* COLOR VARIANTS */
.label--default { color: var(--dyn-label-color); }
.label--secondary { color: var(--dyn-label-color-secondary); }
.label--muted { color: var(--dyn-label-color-muted); }
```

### 5.2 Props & Types

```typescript
export interface DynLabelProps extends React.HTMLAttributes<HTMLElement> {
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'default' | 'secondary' | 'muted';
  as?: 'label' | 'span' | 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: React.ReactNode;
  /** Screen reader text for icons or visual elements */
  srText?: string;
}

/**
 * DynLabel - Typography wrapper component
 * 
 * @example
 * <DynLabel weight="semibold" size="md">
 *   Form Label
 * </DynLabel>
 * 
 * @example
 * <DynLabel as="h2" size="lg" weight="bold">
 *   Section Title
 * </DynLabel>
 */
export const DynLabel = React.forwardRef<HTMLElement, DynLabelProps>(
  (
    {
      weight = 'normal',
      size = 'md',
      color = 'default',
      as: Component = 'span',
      className,
      ...props
    },
    ref
  ) => {
    const labelClassName = [
      'label',
      `label--${weight}`,
      `label--${size}`,
      `label--${color}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <Component ref={ref as any} className={labelClassName} {...props} />
    );
  }
);

DynLabel.displayName = 'DynLabel';
```

### 5.3 Testing (TIER 1)

Reference: `PATTERNS/04-Testing-Pattern.md` → TIER 1

```typescript
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { DynLabel } from './DynLabel';

expect.extend(toHaveNoViolations);

describe('DynLabel', () => {
  describe('Rendering', () => {
    test('renders with children', () => {
      render(<DynLabel>Label Text</DynLabel>);
      expect(screen.getByText('Label Text')).toBeInTheDocument();
    });

    test('applies weight class', () => {
      const { container } = render(
        <DynLabel weight="semibold">Bold</DynLabel>
      );
      expect(container.querySelector('.label--semibold')).toBeInTheDocument();
    });

    test('applies size class', () => {
      const { container } = render(
        <DynLabel size="lg">Large</DynLabel>
      );
      expect(container.querySelector('.label--lg')).toBeInTheDocument();
    });

    test('applies color class', () => {
      const { container } = render(
        <DynLabel color="muted">Muted</DynLabel>
      );
      expect(container.querySelector('.label--muted')).toBeInTheDocument();
    });
  });

  describe('Semantic HTML', () => {
    test('renders as span by default', () => {
      const { container } = render(<DynLabel>Text</DynLabel>);
      expect(container.querySelector('span')).toBeInTheDocument();
    });

    test('renders as specified element (as prop)', () => {
      const { container } = render(
        <DynLabel as="h2">Heading</DynLabel>
      );
      expect(container.querySelector('h2')).toBeInTheDocument();
    });

    test('renders as label for form inputs', () => {
      const { container } = render(
        <DynLabel as="label" htmlFor="input-id">
          Form Label
        </DynLabel>
      );
      const label = container.querySelector('label');
      expect(label).toBeInTheDocument();
      expect(label).toHaveAttribute('for', 'input-id');
    });
  });

  describe('Dark Mode', () => {
    test('applies dark mode color tokens', () => {
      // Mock prefers-color-scheme: dark
      const mockMatchMedia = (query: string) => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      });
      window.matchMedia = mockMatchMedia as any;

      const { container } = render(<DynLabel>Dark Mode Text</DynLabel>);
      const element = container.querySelector('.label');
      expect(element).toBeInTheDocument();
    });
  });

  describe('High Contrast', () => {
    test('supports high contrast mode', () => {
      const mockMatchMedia = (query: string) => ({
        matches: query === '(prefers-contrast: more)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      });
      window.matchMedia = mockMatchMedia as any;

      const { container } = render(<DynLabel>High Contrast Text</DynLabel>);
      const element = container.querySelector('.label');
      expect(element).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    test('has no accessibility violations', async () => {
      const { container } = render(<DynLabel>Accessible Text</DynLabel>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('supports aria attributes', () => {
      const { container } = render(
        <DynLabel aria-label="Custom Label">Text</DynLabel>
      );
      const element = container.querySelector('[aria-label]');
      expect(element).toHaveAttribute('aria-label', 'Custom Label');
    });
  });

  describe('Forwarded Refs', () => {
    test('forwards ref correctly', () => {
      const ref = React.createRef<HTMLSpanElement>();
      render(<DynLabel ref={ref}>Text with Ref</DynLabel>);
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });
  });

  describe('Weight Variants', () => {
    const weights = ['normal', 'medium', 'semibold', 'bold'] as const;

    weights.forEach((weight) => {
      test(`renders ${weight} weight variant`, () => {
        const { container } = render(
          <DynLabel weight={weight}>{weight}</DynLabel>
        );
        expect(container.querySelector(`.label--${weight}`)).toBeInTheDocument();
      });
    });
  });

  describe('Size Variants', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

    sizes.forEach((size) => {
      test(`renders ${size} size variant`, () => {
        const { container } = render(
          <DynLabel size={size}>{size}</DynLabel>
        );
        expect(container.querySelector(`.label--${size}`)).toBeInTheDocument();
      });
    });
  });
});
```

### 5.4 Storybook Stories

```typescript
import { StoryObj, Meta } from '@storybook/react';
import { DynLabel } from './DynLabel';

const meta: Meta<typeof DynLabel> = {
  title: 'Components/TIER1/DynLabel',
  component: DynLabel,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    weight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold', 'bold'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    color: {
      control: 'select',
      options: ['default', 'secondary', 'muted'],
    },
    as: {
      control: 'select',
      options: ['label', 'span', 'div', 'p', 'h1', 'h2', 'h3'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default Label',
    weight: 'normal',
    size: 'md',
    color: 'default',
  },
};

export const AllWeights: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <DynLabel weight="normal">Normal Weight (400)</DynLabel>
      <DynLabel weight="medium">Medium Weight (500)</DynLabel>
      <DynLabel weight="semibold">Semibold Weight (600)</DynLabel>
      <DynLabel weight="bold">Bold Weight (700)</DynLabel>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <DynLabel size="xs">Extra Small (11px)</DynLabel>
      <DynLabel size="sm">Small (12px)</DynLabel>
      <DynLabel size="md">Medium (14px)</DynLabel>
      <DynLabel size="lg">Large (16px)</DynLabel>
      <DynLabel size="xl">Extra Large (18px)</DynLabel>
    </div>
  ),
};

export const AllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <DynLabel color="default">Default Color</DynLabel>
      <DynLabel color="secondary">Secondary Color</DynLabel>
      <DynLabel color="muted">Muted Color</DynLabel>
    </div>
  ),
};

export const SemanticHTML: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <DynLabel as="label" htmlFor="demo-input" weight="semibold">
        Form Label
      </DynLabel>
      <input id="demo-input" type="text" placeholder="Input field" />
      <DynLabel as="h1" size="lg" weight="bold">
        Heading Level 1
      </DynLabel>
      <DynLabel as="h2" size="md" weight="semibold">
        Heading Level 2
      </DynLabel>
      <DynLabel as="p">Paragraph Text</DynLabel>
    </div>
  ),
};

export const DarkMode: Story = {
  parameters: {
    colorMode: 'dark',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <DynLabel weight="semibold">Dark Mode Default</DynLabel>
      <DynLabel color="secondary">Dark Mode Secondary</DynLabel>
      <DynLabel color="muted">Dark Mode Muted</DynLabel>
    </div>
  ),
};

export const HighContrast: Story = {
  parameters: {
    a11y: {
      config: {
        rules: [{ id: 'color-contrast', enabled: true }],
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <DynLabel weight="semibold" size="lg">
        High Contrast Text
      </DynLabel>
      <DynLabel weight="bold">High Contrast Bold</DynLabel>
    </div>
  ),
};
```

---

## 6. ENTERPRISE CHECKLIST

Reference: `PATTERNS/05-Enterprise-Checklist.md` → TIER 1

- [ ] TypeScript strict mode enabled
- [ ] No `any` types, Props interface fully exported
- [ ] All colors use CSS variables (--dyn-label-*)
- [ ] All font sizes use CSS variables (--dyn-label-size-*)
- [ ] All font weights use CSS variables (--dyn-label-font-weight-*)
- [ ] 3-level fallback pattern (design / legacy / literal) on all tokens
- [ ] Dark mode tokens defined and tested
- [ ] High contrast mode tested
- [ ] Semantic HTML (as prop) works correctly
- [ ] jest-axe tests pass (no violations)
- [ ] All weight variants tested (normal, medium, semibold, bold)
- [ ] All size variants tested (xs, sm, md, lg, xl)
- [ ] All color variants tested (default, secondary, muted)
- [ ] Dark mode tested with prefers-color-scheme
- [ ] High contrast tested with prefers-contrast
- [ ] Storybook stories complete (all weights, sizes, colors, semantic HTML, dark mode)
- [ ] 80%+ test coverage
- [ ] JSDoc comments on all exported functions and interfaces
- [ ] README updated with usage examples
- [ ] No hardcoded colors, sizes, or font weights
- [ ] Feature branch + clear commit messages
- [ ] Code review passed
- [ ] CI/CD checks pass

---

## 7. REFERENCES

- `00-MASTER-TEMPLATE.md` - Structure reference
- `PATTERNS/02-ARIA-Attributes-Pattern.md` - Semantic HTML (TIER 1)
- `PATTERNS/04-Testing-Pattern.md` - TIER 1 test template
- `PATTERNS/05-Enterprise-Checklist.md` - TIER 1 checklist
- [MDN: Typography Best Practices](https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Fundamentals)
- [WCAG 2.1: Color Contrast](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)

---

**Status**: ✅ GUIDE READY FOR IMPLEMENTATION
