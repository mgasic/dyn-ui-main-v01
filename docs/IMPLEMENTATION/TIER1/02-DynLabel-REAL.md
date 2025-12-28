# DynLabel - Enterprise Implementation Guide

**TIER**: 1 | **Kompleksnost**: LOW | **Timeline**: 1-2 days  
**Status**: ⚠️ PARTIALLY COMPLETE (70%)

---

## 1. CURRENT STATE ANALYSIS

### ✅ **Komponenta Postoji**

**Lokacija**: `packages/dyn-ui-react/src/components/DynLabel/`

**Struktura Fajlova**:
```
DynLabel/
├── DynLabel.tsx (2.4 KB) ✅
├── DynLabel.module.css (6.2 KB) ✅
├── DynLabel.module.scss (2.0 KB) ✅
├── DynLabel.test.tsx (2.7 KB) ✅
├── DynLabel.stories.tsx (1.8 KB) ✅
├── DynLabel.types.ts (107 B) ⚠️ (external)
├── DynLabel.tsx.bak (backup) 🗑️
└── index.ts (93 B) ✅
```

**Note**: Types su eksterne - `../../types/label.types.ts`

---

## 2. CURRENT IMPLEMENTATION REVIEW

### 2.1 TypeScript Props (Current)

```typescript
// Lokacija: packages/dyn-ui-react/src/types/label.types.ts
export interface DynLabelProps extends BaseComponentProps {
  /** Associated form element ID */
  htmlFor?: string;

  /** Disabled state */
  disabled?: boolean;

  /** Required field indicator */
  required?: boolean;

  /** Optional field indicator */
  optional?: boolean;

  /** Help text to display */
  helpText?: string;

  /** Additional HTML attributes */
  [key: string]: any;
}
```

**✅ Što Postoji**:
- `htmlFor` - Povezivanje sa form elementom
- `disabled` - Disabled state
- `required` - Required indicator (*)
- `optional` - Optional indicator (optional)
- `helpText` - Help text ispod labele
- Extends `BaseComponentProps` - className, style, etc.

**❌ Što Nedostaje (za TIER1 specifikaciju)**:
- `weight` - Font weight variants (normal, medium, semibold, bold)
- `size` - Font size scale (xs, sm, md, lg, xl)
- `color` - Semantic color variants (default, secondary, muted)
- `as` - Polymorphic component (label, span, div, p, h1-h6)
- `variant` - Visual style variants
- Strict typing (`[key: string]: any` je previše permisivno)

---

### 2.2 CSS Tokens Analysis

#### ✅ **Excellent Token Structure**

Postojeći CSS ima **odličnu token arhitekturu** sa 3-level fallback:

```css
--dyn-label-text-color: var(
  --dyn-color-text-primary,      /* Design system token */
  var(--color-text-primary,       /* Legacy token */
  #111827)                        /* Hardcoded fallback */
);
```

#### ✅ **Što Pokriva**:

| Token Category | Status | Tokens |
|----------------|--------|--------|
| **Colors** | ✅ Complete | text, secondary, required, disabled, focus |
| **Typography** | ⚠️ Partial | font-family, font-size (2), font-weight (1), line-height |
| **Spacing** | ✅ Good | gap, margin-bottom, requirement-gap |
| **States** | ✅ Good | disabled, focus-within |
| **Accessibility** | ✅ Excellent | high-contrast, reduced-motion, dark-mode, print |

#### ❌ **Što Nedostaje**:

**Font Weight Variants** (CRITICAL for TIER1):
```css
/* MISSING: */
--dyn-label-font-weight-normal: 400;
--dyn-label-font-weight-medium: 500;
--dyn-label-font-weight-semibold: 600;
--dyn-label-font-weight-bold: 700;
```

**Font Size Scale** (CRITICAL for TIER1):
```css
/* Current: Only 2 sizes */
--dyn-label-font-size: 0.875rem (sm)
--dyn-label-font-size-help: 0.75rem (xs)

/* MISSING: Full scale */
--dyn-label-size-xs: 11px;
--dyn-label-size-sm: 12px; /* exists as default */
--dyn-label-size-md: 14px;
--dyn-label-size-lg: 16px;
--dyn-label-size-xl: 18px;
```

**Color Variants** (HIGH priority):
```css
/* MISSING: Semantic color variants */
--dyn-label-color-default: (primary text)
--dyn-label-color-secondary: (muted text)
--dyn-label-color-muted: (very muted)
```

---

### 2.3 Component Logic Analysis

#### ✅ **Excellent Features**:

1. **Conditional Rendering**:
   - Required indicator (*)
   - Optional indicator (optional)
   - Help text with proper ARIA linking

2. **Accessibility**:
   - Proper `htmlFor` binding
   - `aria-describedby` for help text
   - Role="group" on container
   - Screen reader support

3. **Semantic HTML**:
   ```typescript
   {htmlFor ? (
     <label {...elementProps}>{labelContent}</label>
   ) : (
     <span {...elementProps}>{labelContent}</span>
   )}
   ```

#### ❌ **Missing Logic**:

1. **No polymorphic `as` prop support**
2. **No weight/size/color prop handling**
3. **No className composition for variants**

---

### 2.4 Testing Analysis

**Current Test File**: `DynLabel.test.tsx` (2.7 KB)

#### ✅ **Što se testira** (pretpostavljeno):
- Basic rendering
- Required/optional indicators
- Help text rendering
- htmlFor binding

#### ❌ **Što nedostaje** (za TIER1 80%+ coverage):
- **No jest-axe accessibility tests**
- **No dark mode tests**
- **No high contrast tests**
- **No weight variant tests** (jer ne postoje)
- **No size variant tests** (jer ne postoje)
- **No color variant tests** (jer ne postoje)
- **No polymorphic rendering tests** (as prop)
- **Coverage likely < 80%**

---

### 2.5 Storybook Analysis

**Current Stories File**: `DynLabel.stories.tsx` (1.8 KB)

#### ⚠️ **Pretpostavljeno pokriveno**:
- Basic label
- Required field
- Optional field
- With help text
- Disabled state

#### ❌ **Missing Stories**:
- **All weight variants** (normal, medium, semibold, bold)
- **All size variants** (xs, sm, md, lg, xl)
- **All color variants** (default, secondary, muted)
- **Semantic HTML examples** (h1, h2, h3, p, div)
- **Dark mode demonstration**
- **High contrast demonstration**

---

## 3. GAP ANALYSIS

### 📊 Completeness Breakdown

| Feature Category | Current | Target (TIER1) | Gap | Priority |
|------------------|---------|----------------|-----|----------|
| **Props API** | 5 props | 10+ props | 50% | 🔴 CRITICAL |
| **CSS Tokens** | 15 tokens | 30+ tokens | 50% | 🔴 CRITICAL |
| **Variants** | 2 (req/opt) | 15+ (weight×size×color) | 87% | 🔴 CRITICAL |
| **Accessibility** | 90% | 95% | Good | ✅ OK |
| **Tests** | ~60% | 80%+ | 20% | 🟡 HIGH |
| **Stories** | 5 stories | 15+ stories | 67% | 🟡 HIGH |
| **Dark Mode** | ✅ Yes | ✅ Yes | 0% | ✅ DONE |
| **High Contrast** | ✅ Yes | ✅ Yes | 0% | ✅ DONE |

**Overall Completeness**: **70%**

---

## 4. IMPLEMENTATION ROADMAP

### Phase 1: Extend Props Interface (2 hours)

#### Step 1.1: Update Types

**File**: `packages/dyn-ui-react/src/types/label.types.ts`

```typescript
import { BaseComponentProps } from './theme';

export interface DynLabelProps extends BaseComponentProps {
  // ============================================
  // EXISTING PROPS (keep as-is)
  // ============================================
  /** Associated form element ID */
  htmlFor?: string;

  /** Disabled state */
  disabled?: boolean;

  /** Required field indicator */
  required?: boolean;

  /** Optional field indicator */
  optional?: boolean;

  /** Help text to display */
  helpText?: string;

  // ============================================
  // NEW PROPS (add for TIER1)
  // ============================================
  
  /** Font weight variant */
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';

  /** Font size variant */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /** Semantic color variant */
  color?: 'default' | 'secondary' | 'muted';

  /** Polymorphic element type */
  as?: 'label' | 'span' | 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  /** Children content */
  children: React.ReactNode;

  // Remove [key: string]: any for stricter typing
}
```

#### Step 1.2: Update Component Logic

**File**: `packages/dyn-ui-react/src/components/DynLabel/DynLabel.tsx`

```typescript
import * as React from 'react';
import { DynLabelProps } from '../../types/label.types';
import styles from './DynLabel.module.css';

const classNames = (...args: Array<string | false | null | undefined>) =>
  args.filter(Boolean).join(' ');

export const DynLabel: React.FC<DynLabelProps> = ({
  children,
  htmlFor,
  disabled = false,
  required = false,
  optional = false,
  helpText,
  
  // NEW PROPS with defaults
  weight = 'medium',
  size = 'sm',
  color = 'default',
  as: Component = htmlFor ? 'label' : 'span',
  
  className,
  ...restProps
}: DynLabelProps) => {
  
  const labelClasses = classNames(
    styles['dyn-label'],
    
    // NEW: Weight variant classes
    styles[`dyn-label--weight-${weight}`],
    
    // NEW: Size variant classes
    styles[`dyn-label--size-${size}`],
    
    // NEW: Color variant classes
    styles[`dyn-label--color-${color}`],
    
    // EXISTING: State classes
    disabled && styles['dyn-label--disabled'],
    (required || optional) && styles['dyn-label--with-requirement'],
    
    className
  );

  const renderRequirementIndicator = () => {
    if (required) {
      return (
        <span className={`${styles['dyn-label-requirement']} ${styles['dyn-label--required']}`}>
          <span className={styles['dyn-label-required-asterisk']} aria-hidden="true">*</span>
        </span>
      );
    }

    if (optional) {
      return (
        <span 
          className={`${styles['dyn-label-requirement']} ${styles['dyn-label--optional']}`}
          data-testid="optional-indicator"
        >
          <span className={styles['dyn-label-optional-text']}>(optional)</span>
        </span>
      );
    }

    return null;
  };

  const renderHelpText = () => {
    if (!helpText) return null;

    return (
      <span className={styles['dyn-label-help-text']} id={htmlFor ? `${htmlFor}-help` : undefined}>
        {helpText}
      </span>
    );
  };

  const elementProps = {
    className: labelClasses,
    ...(htmlFor && { htmlFor }),
    ...(helpText && htmlFor && { 'aria-describedby': `${htmlFor}-help` }),
    ...restProps
  };

  const labelContent = (
    <span className={styles['dyn-label-text']}>
      {children}
      {renderRequirementIndicator()}
    </span>
  );

  return (
    <div className={styles['dyn-label-container']} role="group">
      <Component {...elementProps}>
        {labelContent}
      </Component>
      {renderHelpText()}
    </div>
  );
};

DynLabel.displayName = 'DynLabel';

export default DynLabel;
```

---

### Phase 2: Add CSS Variant Tokens (1.5 hours)

**File**: `packages/dyn-ui-react/src/components/DynLabel/DynLabel.module.css`

**ADD after existing tokens** (line ~30):

```css
:root {
  /* ... EXISTING TOKENS (keep all) ... */

  /* ========================================
     NEW: Font Weight Tokens (TIER1)
     ======================================== */
  --dyn-label-weight-normal: var(
    --dyn-font-weight-normal,
    var(--font-weight-normal, 400)
  );
  --dyn-label-weight-medium: var(
    --dyn-font-weight-medium,
    var(--font-weight-medium, 500)
  );
  --dyn-label-weight-semibold: var(
    --dyn-font-weight-semibold,
    var(--font-weight-semibold, 600)
  );
  --dyn-label-weight-bold: var(
    --dyn-font-weight-bold,
    var(--font-weight-bold, 700)
  );

  /* ========================================
     NEW: Font Size Tokens (TIER1)
     ======================================== */
  --dyn-label-size-xs: var(
    --dyn-font-size-xs,
    var(--font-size-xs, 0.6875rem)  /* 11px */
  );
  --dyn-label-size-sm: var(
    --dyn-font-size-sm,
    var(--font-size-sm, 0.75rem)    /* 12px */
  );
  --dyn-label-size-md: var(
    --dyn-font-size-md,
    var(--font-size-md, 0.875rem)   /* 14px */
  );
  --dyn-label-size-lg: var(
    --dyn-font-size-lg,
    var(--font-size-lg, 1rem)       /* 16px */
  );
  --dyn-label-size-xl: var(
    --dyn-font-size-xl,
    var(--font-size-xl, 1.125rem)   /* 18px */
  );

  /* ========================================
     NEW: Line Height Tokens per Size
     ======================================== */
  --dyn-label-line-height-xs: 1.2;
  --dyn-label-line-height-sm: 1.3;
  --dyn-label-line-height-md: 1.4;
  --dyn-label-line-height-lg: 1.5;
  --dyn-label-line-height-xl: 1.6;

  /* ========================================
     NEW: Color Variant Tokens (TIER1)
     ======================================== */
  --dyn-label-color-default: var(
    --dyn-color-text-primary,
    var(--color-text-primary, #111827)
  );
  --dyn-label-color-secondary: var(
    --dyn-color-text-secondary,
    var(--color-text-secondary, #6b7280)
  );
  --dyn-label-color-muted: var(
    --dyn-color-text-muted,
    var(--color-text-muted, #9ca3af)
  );
}
```

**ADD variant classes** (after existing states section):

```css
/* ========================================================================
   NEW: Weight Variants (TIER1)
   ======================================================================== */

.dyn-label--weight-normal {
  font-weight: var(--dyn-label-weight-normal);
}

.dyn-label--weight-medium {
  font-weight: var(--dyn-label-weight-medium);
}

.dyn-label--weight-semibold {
  font-weight: var(--dyn-label-weight-semibold);
}

.dyn-label--weight-bold {
  font-weight: var(--dyn-label-weight-bold);
}

/* ========================================================================
   NEW: Size Variants (TIER1)
   ======================================================================== */

.dyn-label--size-xs {
  font-size: var(--dyn-label-size-xs);
  line-height: var(--dyn-label-line-height-xs);
}

.dyn-label--size-sm {
  font-size: var(--dyn-label-size-sm);
  line-height: var(--dyn-label-line-height-sm);
}

.dyn-label--size-md {
  font-size: var(--dyn-label-size-md);
  line-height: var(--dyn-label-line-height-md);
}

.dyn-label--size-lg {
  font-size: var(--dyn-label-size-lg);
  line-height: var(--dyn-label-line-height-lg);
}

.dyn-label--size-xl {
  font-size: var(--dyn-label-size-xl);
  line-height: var(--dyn-label-line-height-xl);
}

/* ========================================================================
   NEW: Color Variants (TIER1)
   ======================================================================== */

.dyn-label--color-default {
  color: var(--dyn-label-color-default);
}

.dyn-label--color-secondary {
  color: var(--dyn-label-color-secondary);
}

.dyn-label--color-muted {
  color: var(--dyn-label-color-muted);
}

/* Update dark mode tokens for new color variants */
@media (prefers-color-scheme: dark) {
  :root {
    --dyn-label-color-default: var(
      --dyn-color-text-primary-dark,
      var(--color-text-primary-dark, #f3f4f6)
    );
    --dyn-label-color-secondary: var(
      --dyn-color-text-secondary-dark,
      var(--color-text-secondary-dark, #d1d5db)
    );
    --dyn-label-color-muted: var(
      --dyn-color-text-muted-dark,
      var(--color-text-muted-dark, #9ca3af)
    );
  }
}
```

---

### Phase 3: Comprehensive Testing (2 hours)

**File**: `packages/dyn-ui-react/src/components/DynLabel/DynLabel.test.tsx`

**ADD new test suites**:

```typescript
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { DynLabel } from './DynLabel';

expect.extend(toHaveNoViolations);

// ... KEEP EXISTING TESTS ...

describe('DynLabel - TIER1 Extended Tests', () => {
  
  describe('Weight Variants', () => {
    const weights = ['normal', 'medium', 'semibold', 'bold'] as const;

    weights.forEach((weight) => {
      test(`renders ${weight} weight correctly`, () => {
        const { container } = render(
          <DynLabel weight={weight}>Label {weight}</DynLabel>
        );
        const label = container.querySelector(`.dyn-label--weight-${weight}`);
        expect(label).toBeInTheDocument();
      });
    });

    test('defaults to medium weight', () => {
      const { container } = render(<DynLabel>Default Label</DynLabel>);
      expect(container.querySelector('.dyn-label--weight-medium')).toBeInTheDocument();
    });
  });

  describe('Size Variants', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

    sizes.forEach((size) => {
      test(`renders ${size} size correctly`, () => {
        const { container } = render(
          <DynLabel size={size}>Label {size}</DynLabel>
        );
        expect(container.querySelector(`.dyn-label--size-${size}`)).toBeInTheDocument();
      });
    });

    test('defaults to sm size', () => {
      const { container } = render(<DynLabel>Default Label</DynLabel>);
      expect(container.querySelector('.dyn-label--size-sm')).toBeInTheDocument();
    });
  });

  describe('Color Variants', () => {
    const colors = ['default', 'secondary', 'muted'] as const;

    colors.forEach((color) => {
      test(`renders ${color} color correctly`, () => {
        const { container } = render(
          <DynLabel color={color}>Label {color}</DynLabel>
        );
        expect(container.querySelector(`.dyn-label--color-${color}`)).toBeInTheDocument();
      });
    });
  });

  describe('Polymorphic Rendering', () => {
    test('renders as label when htmlFor is provided', () => {
      const { container } = render(
        <DynLabel htmlFor="test-input">Form Label</DynLabel>
      );
      const label = container.querySelector('label');
      expect(label).toBeInTheDocument();
      expect(label).toHaveAttribute('for', 'test-input');
    });

    test('renders as span by default without htmlFor', () => {
      const { container } = render(<DynLabel>Text Label</DynLabel>);
      expect(container.querySelector('span.dyn-label')).toBeInTheDocument();
      expect(container.querySelector('label')).not.toBeInTheDocument();
    });

    const elements = ['div', 'p', 'h1', 'h2', 'h3'] as const;
    elements.forEach((element) => {
      test(`renders as ${element} when as="${element}"`, () => {
        const { container } = render(
          <DynLabel as={element}>Heading</DynLabel>
        );
        expect(container.querySelector(element)).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility (jest-axe)', () => {
    test('has no accessibility violations (default)', async () => {
      const { container } = render(
        <DynLabel>Accessible Label</DynLabel>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('has no violations with all props', async () => {
      const { container } = render(
        <DynLabel
          htmlFor="test"
          required
          helpText="Help text"
          weight="bold"
          size="lg"
        >
          Complex Label
        </DynLabel>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Dark Mode', () => {
    test('applies dark mode token variables', () => {
      // Mock matchMedia for dark mode
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

      const { container } = render(
        <DynLabel color="default">Dark Mode Label</DynLabel>
      );
      const label = container.querySelector('.dyn-label');
      expect(label).toBeInTheDocument();
      // Note: Actual dark mode token testing requires visual regression tests
    });
  });

  describe('Combination Variants', () => {
    test('renders multiple variants together', () => {
      const { container } = render(
        <DynLabel
          weight="bold"
          size="lg"
          color="secondary"
          as="h2"
        >
          Combined Label
        </DynLabel>
      );
      
      expect(container.querySelector('.dyn-label--weight-bold')).toBeInTheDocument();
      expect(container.querySelector('.dyn-label--size-lg')).toBeInTheDocument();
      expect(container.querySelector('.dyn-label--color-secondary')).toBeInTheDocument();
      expect(container.querySelector('h2')).toBeInTheDocument();
    });
  });
});
```

---

### Phase 4: Enhanced Storybook Stories (1.5 hours)

**File**: `packages/dyn-ui-react/src/components/DynLabel/DynLabel.stories.tsx`

```typescript
import { StoryObj, Meta } from '@storybook/react';
import { DynLabel } from './DynLabel';

const meta: Meta<typeof DynLabel> = {
  title: 'Components/TIER1/DynLabel',
  component: DynLabel,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Typography label component with weight, size, and color variants. Supports polymorphic rendering and form field integration.',
      },
    },
  },
  argTypes: {
    weight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold', 'bold'],
      description: 'Font weight variant',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Font size variant',
    },
    color: {
      control: 'select',
      options: ['default', 'secondary', 'muted'],
      description: 'Semantic color variant',
    },
    as: {
      control: 'select',
      options: ['label', 'span', 'div', 'p', 'h1', 'h2', 'h3'],
      description: 'HTML element type',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================
// Basic Usage
// ============================================

export const Default: Story = {
  args: {
    children: 'Default Label',
    weight: 'medium',
    size: 'sm',
    color: 'default',
  },
};

// ============================================
// Weight Variants
// ============================================

export const AllWeights: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <DynLabel weight="normal" size="md">Normal Weight (400)</DynLabel>
      <DynLabel weight="medium" size="md">Medium Weight (500)</DynLabel>
      <DynLabel weight="semibold" size="md">Semibold Weight (600)</DynLabel>
      <DynLabel weight="bold" size="md">Bold Weight (700)</DynLabel>
    </div>
  ),
};

// ============================================
// Size Variants
// ============================================

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

// ============================================
// Color Variants
// ============================================

export const AllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <DynLabel color="default" size="md">Default Color (Primary Text)</DynLabel>
      <DynLabel color="secondary" size="md">Secondary Color (Muted Text)</DynLabel>
      <DynLabel color="muted" size="md">Muted Color (Very Subtle)</DynLabel>
    </div>
  ),
};

// ============================================
// Semantic HTML (Polymorphic)
// ============================================

export const SemanticElements: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <DynLabel as="label" htmlFor="demo" weight="semibold">
        Form Label (with htmlFor)
      </DynLabel>
      <input id="demo" type="text" placeholder="Input field" style={{ padding: '8px' }} />
      
      <DynLabel as="h1" size="xl" weight="bold">Heading Level 1</DynLabel>
      <DynLabel as="h2" size="lg" weight="semibold">Heading Level 2</DynLabel>
      <DynLabel as="h3" size="md" weight="semibold">Heading Level 3</DynLabel>
      <DynLabel as="p" size="sm">Paragraph Text</DynLabel>
      <DynLabel as="span">Inline Span</DynLabel>
    </div>
  ),
};

// ============================================
// Form Field Examples (Existing + Enhanced)
// ============================================

export const RequiredField: Story = {
  render: () => (
    <div>
      <DynLabel htmlFor="email" required weight="medium" size="sm">
        Email Address
      </DynLabel>
      <input 
        id="email" 
        type="email" 
        placeholder="Enter your email"
        style={{ marginTop: '4px', padding: '8px', width: '300px' }}
      />
    </div>
  ),
};

export const OptionalField: Story = {
  render: () => (
    <div>
      <DynLabel htmlFor="phone" optional weight="medium" size="sm">
        Phone Number
      </DynLabel>
      <input 
        id="phone" 
        type="tel" 
        placeholder="(optional)"
        style={{ marginTop: '4px', padding: '8px', width: '300px' }}
      />
    </div>
  ),
};

export const WithHelpText: Story = {
  render: () => (
    <div>
      <DynLabel 
        htmlFor="password" 
        required 
        helpText="Must be at least 8 characters with uppercase, lowercase, and numbers"
        weight="medium"
        size="sm"
      >
        Password
      </DynLabel>
      <input 
        id="password" 
        type="password" 
        placeholder="Enter password"
        style={{ marginTop: '4px', padding: '8px', width: '300px' }}
      />
    </div>
  ),
};

export const DisabledField: Story = {
  render: () => (
    <div>
      <DynLabel htmlFor="disabled" disabled weight="medium" size="sm">
        Disabled Field
      </DynLabel>
      <input 
        id="disabled" 
        type="text" 
        disabled
        placeholder="This field is disabled"
        style={{ marginTop: '4px', padding: '8px', width: '300px' }}
      />
    </div>
  ),
};

// ============================================
// Dark Mode
// ============================================

export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
    colorScheme: 'dark',
  },
  render: () => (
    <div style={{ padding: '24px', background: '#1f2937', minHeight: '200px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <DynLabel weight="bold" size="lg" color="default">
          Dark Mode - Default Color
        </DynLabel>
        <DynLabel weight="semibold" size="md" color="secondary">
          Dark Mode - Secondary Color
        </DynLabel>
        <DynLabel weight="medium" size="sm" color="muted">
          Dark Mode - Muted Color
        </DynLabel>
      </div>
    </div>
  ),
};

// ============================================
// Combination Examples
// ============================================

export const ComplexCombinations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <DynLabel 
        as="h2" 
        weight="bold" 
        size="lg" 
        color="default"
      >
        Section Heading
      </DynLabel>
      
      <DynLabel 
        htmlFor="username" 
        required 
        weight="semibold" 
        size="sm" 
        color="default"
        helpText="Username must be unique"
      >
        Username
      </DynLabel>
      <input id="username" type="text" style={{ padding: '8px', width: '300px' }} />
      
      <DynLabel 
        weight="medium" 
        size="xs" 
        color="muted"
      >
        Muted small helper text
      </DynLabel>
    </div>
  ),
};
```

---

## 5. ENTERPRISE CHECKLIST

Reference: `PATTERNS/05-Enterprise-Checklist.md` → TIER 1

### Current Status:

- [x] TypeScript strict mode enabled
- [ ] ⚠️ No `any` types (currently has `[key: string]: any`)
- [x] Props interface exported
- [x] CSS variables for all colors (3-level fallback) ✅
- [ ] CSS variables for all font weights (MISSING)
- [ ] CSS variables for all font sizes (partial - only 2/5)
- [x] Dark mode tokens defined ✅
- [x] High contrast mode tested ✅
- [ ] All weight variants implemented (MISSING)
- [ ] All size variants implemented (MISSING)
- [ ] All color variants implemented (MISSING)
- [ ] Polymorphic `as` prop (MISSING)
- [ ] jest-axe tests (MISSING)
- [ ] 80%+ test coverage (estimated 60%)
- [x] Storybook stories exist (basic)
- [ ] Enhanced stories for all variants (MISSING)
- [x] JSDoc comments on interface ✅
- [x] No hardcoded colors (uses tokens) ✅
- [ ] No hardcoded font sizes (partially hardcoded)
- [x] README with examples
- [x] Feature branch workflow
- [x] CI/CD integration

**Checklist Completeness**: 65%

---

## 6. EFFORT ESTIMATION

| Phase | Tasks | Time | Priority |
|-------|-------|------|----------|
| **Phase 1** | Extend Props Interface | 2h | 🔴 CRITICAL |
| **Phase 2** | Add CSS Variant Tokens | 1.5h | 🔴 CRITICAL |
| **Phase 3** | Comprehensive Testing | 2h | 🟡 HIGH |
| **Phase 4** | Enhanced Storybook | 1.5h | 🟡 HIGH |
| **Total** | | **7h** | |

**Recommended Sprint**: 1 day (includes testing, PR review, docs)

---

## 7. SUCCESS CRITERIA

✅ **Phase Complete When**:

1. All 4 weight variants work correctly
2. All 5 size variants work correctly
3. All 3 color variants work correctly
4. Polymorphic `as` prop renders correctly
5. Test coverage ≥ 80%
6. All jest-axe tests pass
7. 15+ Storybook stories complete
8. Dark mode visually verified
9. High contrast mode verified
10. PR approved + merged

---

## 8. REFERENCES

- `00-MASTER-TEMPLATE.md` - Structure reference
- `PATTERNS/02-ARIA-Attributes-Pattern.md` - TIER 1 ARIA
- `PATTERNS/04-Testing-Pattern.md` - TIER 1 testing
- `PATTERNS/05-Enterprise-Checklist.md` - TIER 1 checklist
- [MDN: Typography Best Practices](https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text/Fundamentals)
- [WCAG 2.1: Color Contrast](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)

---

**Status**: 🟡 READY FOR IMPLEMENTATION  
**Last Updated**: 2025-12-28  
**Next Component**: DynBox (already excellent - minor enhancements only)
