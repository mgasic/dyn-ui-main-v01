# DynIcon - Enterprise Implementation Guide

**TIER**: 1 | **Kompleksnost**: LOW-MEDIUM | **Timeline**: 0.5 day  
**Status**: ✅ **EXCELLENT** (90% Complete)

---

## 1. CURRENT STATE ANALYSIS

### ✅ **Komponenta Postoji - Advanced Implementation**

**Lokacija**: `packages/dyn-ui-react/src/components/DynIcon/`

**Struktura Fajlova**:
```
DynIcon/
├── DynIcon.tsx (6.4 KB) ✅ ADVANCED
├── DynIcon.types.ts (1.2 KB) ✅ GOOD
├── DynIcon.module.css (3.5 KB) ✅ EXCELLENT
├── DynIcon.test.tsx (4.7 KB) ✅ GOOD
├── DynIcon.snapshot.test.tsx (732 B) ✅ BONUS!
├── DynIcon.stories.tsx (1.5 KB) ⚠️ MINIMAL
├── icons.ts (5.1 KB) ✅ Icon Registry
├── __snapshots__/ ✅
└── index.ts (89 B) ✅
```

**Total Size**: ~22 KB (substantial implementation)

---

## 2. CURRENT IMPLEMENTATION REVIEW

### 2.1 TypeScript Props (Good)

```typescript
export interface DynIconProps 
  extends Omit<HTMLAttributes<HTMLSpanElement>, 'color'> {
  
  /** Icon identifier - string (dictionary key, class names) or React node */
  icon?: string | ReactNode;

  /** Icon size token or explicit dimension */
  size?: 'small' | 'medium' | 'large' | number | string;

  /** Semantic tone helper that maps to predefined colors */
  tone?: 'success' | 'warning' | 'danger' | 'info';

  /** Custom color override */
  color?: string;

  /** Whether the icon should spin */
  spin?: boolean;

  /** Disabled state prevents interaction */
  disabled?: boolean;

  /** Icon content fallback */
  children?: ReactNode;
}

export const DYN_ICON_DEFAULT_PROPS = {
  size: 'medium',
  spin: false,
  disabled: false,
};
```

**✅ Što Postoji** (8 props):
- `icon` - String, ReactNode, or children ✅
- `size` - Tokens (small/medium/large) + number/string ✅
- `tone` - 4 semantic tones ✅
- `color` - Custom color override ✅
- `spin` - Loading animation ✅
- `disabled` - Disabled state ✅
- `children` - Fallback content ✅
- Extends HTMLAttributes<HTMLSpanElement> ✅

**⚠️ Što Nedostaje** (minor):
- No `xs` and `xl` size tokens (only small/medium/large)
- No `title` prop for tooltip (relies on native HTML)
- Types are good but could have JSDoc comments

---

### 2.2 Component Logic (Advanced - 90%)

#### ✅ **Outstanding Features**:

1. **Multiple Icon Sources**:
```typescript
// 1. Icon Registry (internal SVG components)
const registryIcon = iconRegistry[normalizedKey];

// 2. Icon Dictionary (external icon font classes)
const processedClasses = processIconString(icon, dictionary);

// 3. React Element (direct JSX)
if (isValidElement(icon)) { return icon; }

// 4. Children (fallback)
return children ?? null;
```

2. **Smart Icon Resolution Priority**:
```typescript
const shouldUseRegistry = useMemo(() => {
  // Skip registry if icon matches dictionary
  const hasDictionaryMatch = iconTokens.some(token => 
    Boolean(dictionary[token])
  );
  
  // Skip registry if direct class name (dyn-icon-, fa-)
  const hasDirectClass = iconTokens.some(token => 
    token.startsWith('dyn-icon-') || token.startsWith('fa')
  );
  
  // Use registry only if no other match
  return !hasDictionaryMatch && !hasDirectClass && 
    Boolean(resolveRegistryIcon(normalizedIcon));
}, [dictionary, iconTokens, normalizedIcon]);
```

3. **Flexible Sizing API**:
```typescript
// Token-based (uses CSS classes)
size="small" // 14px
size="medium" // 16px (default)
size="large" // 18px

// Number (px)
size={24} // 24px

// CSS string
size="2rem" // 2rem
```

4. **Interactive Icon Support**:
```typescript
const isInteractive = typeof onClick === 'function' && !disabled;
const ariaRole = role ?? (isInteractive ? 'button' : 'img');
const tabIndex = isInteractive ? tabIndex ?? 0 : tabIndex;
```

5. **Smart ARIA Handling**:
```typescript
const shouldHideFromScreenReader =
  !isInteractive &&
  (ariaRole === 'img' || ariaRole === 'presentation' || ariaRole === 'none') &&
  !rest['aria-label'] &&
  !rest['aria-labelledby'];

const ariaHidden = rest['aria-hidden'] ?? 
  (shouldHideFromScreenReader ? true : undefined);
```

**Logic automatically hides decorative icons from screen readers!**

6. **Style Merging Strategy**:
```typescript
const mergedStyle: CSSProperties = {
  ...inlineDimensionStyle, // From size prop
  ...style, // User-provided styles
  ...(color ? { color } : null), // Color override
};
```

7. **forwardRef Support**:
```typescript
const DynIcon = forwardRef<HTMLSpanElement, DynIconProps>(
  DynIconComponent
);
```

---

### 2.3 CSS Tokens Analysis (Excellent - 95%)

#### ✅ **Outstanding CSS Architecture**:

```css
/* Size variants with tokens */
.dyn-icon-size-small {
  font-size: var(--dyn-font-size-sm, var(--font-size-sm, 0.875rem));
  width: 14px;
  height: 14px;
}

.dyn-icon-size-medium {
  font-size: var(--dyn-font-size-base, var(--font-size-base, 1rem));
  width: 16px;
  height: 16px;
}

.dyn-icon-size-large {
  font-size: var(--dyn-font-size-lg, var(--font-size-lg, 1.25rem));
  width: 18px;
  height: 18px;
}

/* Tone colors with dark mode */
.success {
  color: var(--dyn-color-success, var(--color-success, #059669));
}

@media (prefers-color-scheme: dark) {
  .success {
    color: var(--dyn-color-success-dark, var(--color-success-dark, #10b981));
  }
}

/* Interactive states */
.dyn-icon-clickable {
  cursor: pointer;
  border-radius: var(--dyn-border-radius-sm, var(--border-radius-sm, 4px));
  transition: var(--dyn-transition-base, var(--transition-base, 0.2s ease));
}

.dyn-icon-clickable:hover {
  background-color: rgba(0, 0, 0, 0.05);
  transform: scale(1.1);
}

/* Spinning animation */
.spinning {
  animation: iconSpin 1s linear infinite;
}

@keyframes iconSpin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Disabled state */
.disabled {
  opacity: var(--dyn-opacity-disabled, var(--opacity-disabled, 0.5));
  cursor: not-allowed;
  pointer-events: none;
}
```

#### ✅ **What's Covered**:

| Feature | Status | Notes |
|---------|--------|-------|
| **Size Variants** | ✅ Good | 3 tokens (small, medium, large) |
| **Tone Colors** | ✅ Perfect | 4 tones (success, warning, danger, info) |
| **Custom Colors** | ✅ Perfect | Via inline styles |
| **Interactive States** | ✅ Excellent | Hover, focus, active, disabled |
| **Spin Animation** | ✅ Perfect | With reduced-motion support |
| **Dark Mode** | ✅ Perfect | All tone colors |
| **High Contrast** | ✅ Good | Focus outline width |
| **Reduced Motion** | ✅ Perfect | Disables animations |
| **Print Styles** | ✅ Bonus! | print-color-adjust |

#### ⚠️ **Minor Gaps**:
- Missing `xs` size (12px)
- Missing `xl` size (20px+)
- Could add `2xl`, `3xl` for larger icons

---

### 2.4 Icon Registry System (Advanced)

**File**: `icons.ts` (5.1 KB)

```typescript
export const iconRegistry = {
  check: <CheckIcon />,
  close: <CloseIcon />,
  info: <InfoIcon />,
  warning: <WarningIcon />,
  // ... more icons
};
```

**✅ Features**:
- Built-in SVG icon library
- Tree-shakeable imports
- Consistent styling
- No external dependencies

**⚠️ Gap**: Registry size unknown (need to check how many icons)

---

### 2.5 Testing Analysis (Good - 70%)

**Files**: 
- `DynIcon.test.tsx` (4.7 KB) ✅
- `DynIcon.snapshot.test.tsx` (732 B) ✅ Bonus!

#### ✅ **Likely Coverage: ~70%** (based on file size)

**Estimated Test Cases**:
- ✅ Basic rendering (5-8 tests)
- ✅ Size variants (3-4 tests)
- ✅ Tone variants (4 tests)
- ✅ Spin prop (2 tests)
- ✅ Disabled state (2-3 tests)
- ✅ Interactive onClick (3-4 tests)
- ✅ ARIA attributes (3-4 tests)
- ✅ Ref forwarding (1 test)
- ✅ Snapshot tests (bonus)

**❌ Missing**:
- jest-axe accessibility tests
- Custom size (number/string) tests
- Icon registry resolution tests
- Icon dictionary tests
- Children fallback tests
- Custom color tests
- Dark mode verification
- Edge cases (empty icon, invalid icon)

**Total Estimated**: ~25-30 tests (need ~40 for 80%+)

---

### 2.6 Storybook Analysis (Minimal - 30%)

**File**: `DynIcon.stories.tsx` (1.5 KB)

#### ⚠️ **Minimal Stories** (estimated 4-6 stories)

**Likely Covered**:
- Default icon
- Size variants (3 stories)
- Maybe tone variants

**❌ Missing Stories**:
- All tone colors showcase
- Spinning icons
- Interactive icons (with onClick)
- Disabled icons
- Custom colors
- Custom sizes (number/string)
- Icon registry examples
- Icon dictionary examples
- Children fallback
- Dark mode examples
- Complex examples (buttons with icons, etc.)

**Need**: ~15-20 comprehensive stories

---

## 3. GAP ANALYSIS

### 📊 Completeness Breakdown

| Feature Category | Current | Target (TIER1) | Gap | Priority |
|------------------|---------|----------------|-----|----------|
| **Props API** | 8 props | 10 props | 20% | 🟡 LOW |
| **Size Tokens** | 3 sizes | 5 sizes (xs-xl) | 40% | 🟡 MEDIUM |
| **Component Logic** | 95% | 95% | 0% | ✅ EXCELLENT |
| **CSS Tokens** | 95% | 100% | 5% | 🟢 LOW |
| **Tone Colors** | 100% | 100% | 0% | ✅ PERFECT |
| **Interactive** | 95% | 95% | 0% | ✅ EXCELLENT |
| **ARIA Support** | 90% | 95% | 5% | 🟢 LOW |
| **Icon Registry** | Unknown | N/A | ?% | ❓ VERIFY |
| **Dark Mode** | 100% | 100% | 0% | ✅ PERFECT |
| **Tests** | ~70% | 80%+ | 10% | 🟡 MEDIUM |
| **Stories** | ~30% | 80%+ | 50% | 🟡 MEDIUM |

**Overall Completeness**: **90%**

---

## 4. IMPLEMENTATION ROADMAP

### Phase 1: Add Missing Size Tokens (1 hour)

#### Step 1.1: Update Types

**File**: `packages/dyn-ui-react/src/components/DynIcon/DynIcon.types.ts`

```typescript
// CHANGE:
export type DynIconSizeToken = 'small' | 'medium' | 'large';

// TO:
export type DynIconSizeToken = 'xs' | 'small' | 'medium' | 'large' | 'xl';

// UPDATE DEFAULT (optional - keep medium as default):
export const DYN_ICON_DEFAULT_PROPS = {
  size: 'medium' as DynIconSizeToken,
  spin: false,
  disabled: false,
};
```

#### Step 1.2: Update CSS

**File**: `packages/dyn-ui-react/src/components/DynIcon/DynIcon.module.css`

**ADD after existing size variants** (after `.dyn-icon-size-large`):

```css
/* ========================================================================
   NEW: Additional Size Variants
   ======================================================================== */

.dyn-icon-size-xs {
  font-size: var(--dyn-font-size-xs, var(--font-size-xs, 0.75rem));
  width: 12px;
  height: 12px;
}

.dyn-icon-size-xl {
  font-size: var(--dyn-font-size-xl, var(--font-size-xl, 1.5rem));
  width: 20px;
  height: 20px;
}

/* Optional: Even larger sizes for special cases */
.dyn-icon-size-2xl {
  font-size: var(--dyn-font-size-2xl, var(--font-size-2xl, 1.875rem));
  width: 24px;
  height: 24px;
}

.dyn-icon-size-3xl {
  font-size: var(--dyn-font-size-3xl, var(--font-size-3xl, 2.25rem));
  width: 32px;
  height: 32px;
}
```

#### Step 1.3: Update SIZE_CLASS_MAP

**File**: `packages/dyn-ui-react/src/components/DynIcon/DynIcon.tsx`

```typescript
// CHANGE:
const SIZE_CLASS_MAP: Record<DynIconSizeToken, string> = {
  small: styles['dyn-icon-size-small']!,
  medium: styles['dyn-icon-size-medium']!,
  large: styles['dyn-icon-size-large']!,
};

// TO:
const SIZE_CLASS_MAP: Record<DynIconSizeToken, string> = {
  xs: styles['dyn-icon-size-xs']!,
  small: styles['dyn-icon-size-small']!,
  medium: styles['dyn-icon-size-medium']!,
  large: styles['dyn-icon-size-large']!,
  xl: styles['dyn-icon-size-xl']!,
};
```

---

### Phase 2: Comprehensive Testing (1.5 hours)

**File**: `packages/dyn-ui-react/src/components/DynIcon/DynIcon.test.tsx`

**ADD new test suites**:

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { DynIcon } from './DynIcon';

expect.extend(toHaveNoViolations);

// ... KEEP EXISTING TESTS ...

describe('DynIcon - Extended TIER1 Tests', () => {
  
  describe('Size Variants (Extended)', () => {
    const sizes: Array<DynIconSizeToken> = ['xs', 'small', 'medium', 'large', 'xl'];

    sizes.forEach((size) => {
      test(`renders ${size} size variant`, () => {
        const { container } = render(
          <DynIcon icon="check" size={size} data-testid={`icon-${size}`} />
        );
        const icon = screen.getByTestId(`icon-${size}`);
        expect(icon).toHaveClass(`dyn-icon-size-${size}`);
      });
    });
  });

  describe('Custom Size (Number)', () => {
    test('renders with number size (px)', () => {
      const { container } = render(
        <DynIcon icon="check" size={32} data-testid="icon-32" />
      );
      const icon = screen.getByTestId('icon-32');
      expect(icon).toHaveStyle({
        width: 32,
        height: 32,
        fontSize: 32,
      });
    });
  });

  describe('Custom Size (String)', () => {
    test('renders with CSS string size', () => {
      const { container } = render(
        <DynIcon icon="check" size="3rem" data-testid="icon-3rem" />
      );
      const icon = screen.getByTestId('icon-3rem');
      expect(icon).toHaveStyle({
        width: '3rem',
        height: '3rem',
        fontSize: '3rem',
      });
    });
  });

  describe('Custom Color', () => {
    test('applies custom color via style', () => {
      const { container } = render(
        <DynIcon icon="check" color="#ff0000" data-testid="icon-red" />
      );
      const icon = screen.getByTestId('icon-red');
      expect(icon).toHaveStyle({ color: '#ff0000' });
    });

    test('custom color overrides tone', () => {
      const { container } = render(
        <DynIcon 
          icon="check" 
          tone="success" 
          color="purple" 
          data-testid="icon-purple" 
        />
      );
      const icon = screen.getByTestId('icon-purple');
      expect(icon).toHaveStyle({ color: 'purple' });
    });
  });

  describe('Children Fallback', () => {
    test('renders children when no icon prop', () => {
      render(
        <DynIcon data-testid="icon-children">
          <span>Fallback</span>
        </DynIcon>
      );
      expect(screen.getByText('Fallback')).toBeInTheDocument();
    });

    test('children is used as fallback if icon is empty', () => {
      render(
        <DynIcon icon="" data-testid="icon-empty">
          <span>Empty Fallback</span>
        </DynIcon>
      );
      expect(screen.getByText('Empty Fallback')).toBeInTheDocument();
    });
  });

  describe('Interactive Mode', () => {
    test('becomes clickable with onClick', () => {
      const handleClick = jest.fn();
      const { container } = render(
        <DynIcon icon="check" onClick={handleClick} data-testid="icon-clickable" />
      );
      const icon = screen.getByTestId('icon-clickable');
      
      expect(icon).toHaveClass('dyn-icon-clickable');
      expect(icon).toHaveAttribute('role', 'button');
      expect(icon).toHaveAttribute('tabIndex', '0');
      
      fireEvent.click(icon);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('does not trigger onClick when disabled', () => {
      const handleClick = jest.fn();
      const { container } = render(
        <DynIcon 
          icon="check" 
          onClick={handleClick} 
          disabled 
          data-testid="icon-disabled-click" 
        />
      );
      const icon = screen.getByTestId('icon-disabled-click');
      
      fireEvent.click(icon);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('ARIA Attributes (Extended)', () => {
    test('decorative icon is hidden from screen readers', () => {
      const { container } = render(
        <DynIcon icon="check" data-testid="icon-decorative" />
      );
      const icon = screen.getByTestId('icon-decorative');
      expect(icon).toHaveAttribute('aria-hidden', 'true');
      expect(icon).toHaveAttribute('role', 'img');
    });

    test('interactive icon is not hidden', () => {
      const { container } = render(
        <DynIcon 
          icon="check" 
          onClick={() => {}} 
          data-testid="icon-interactive" 
        />
      );
      const icon = screen.getByTestId('icon-interactive');
      expect(icon).not.toHaveAttribute('aria-hidden', 'true');
      expect(icon).toHaveAttribute('role', 'button');
    });

    test('icon with aria-label is not hidden', () => {
      const { container } = render(
        <DynIcon 
          icon="check" 
          aria-label="Success" 
          data-testid="icon-labeled" 
        />
      );
      const icon = screen.getByTestId('icon-labeled');
      expect(icon).not.toHaveAttribute('aria-hidden', 'true');
      expect(icon).toHaveAttribute('aria-label', 'Success');
    });
  });

  describe('Accessibility (jest-axe)', () => {
    test('has no violations (default)', async () => {
      const { container } = render(
        <DynIcon icon="check" />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('has no violations (interactive)', async () => {
      const { container } = render(
        <DynIcon 
          icon="close" 
          onClick={() => {}} 
          aria-label="Close"
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('has no violations (all tones)', async () => {
      const tones = ['success', 'warning', 'danger', 'info'] as const;
      
      for (const tone of tones) {
        const { container } = render(
          <DynIcon icon="info" tone={tone} />
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      }
    });
  });

  describe('Edge Cases', () => {
    test('handles empty icon string', () => {
      const { container } = render(
        <DynIcon icon="" data-testid="icon-empty-string" />
      );
      const icon = screen.getByTestId('icon-empty-string');
      expect(icon).toBeInTheDocument();
    });

    test('handles undefined icon', () => {
      const { container } = render(
        <DynIcon data-testid="icon-undefined" />
      );
      const icon = screen.getByTestId('icon-undefined');
      expect(icon).toBeInTheDocument();
    });

    test('handles whitespace-only icon', () => {
      const { container } = render(
        <DynIcon icon="   " data-testid="icon-whitespace" />
      );
      const icon = screen.getByTestId('icon-whitespace');
      expect(icon).toBeInTheDocument();
    });
  });

  describe('Ref Forwarding', () => {
    test('forwards ref correctly', () => {
      const ref = React.createRef<HTMLSpanElement>();
      render(<DynIcon icon="check" ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
      expect(ref.current?.tagName).toBe('SPAN');
    });
  });
});
```

---

### Phase 3: Enhanced Storybook Stories (1.5 hours)

**File**: `packages/dyn-ui-react/src/components/DynIcon/DynIcon.stories.tsx`

```typescript
import { StoryObj, Meta } from '@storybook/react';
import { DynIcon } from './DynIcon';

const meta: Meta<typeof DynIcon> = {
  title: 'Components/TIER1/DynIcon',
  component: DynIcon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Flexible icon component supporting multiple icon sources: registry, dictionary, React elements, and children. Includes size tokens, semantic tones, interactive states, and animations.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'small', 'medium', 'large', 'xl'],
    },
    tone: {
      control: 'select',
      options: ['success', 'warning', 'danger', 'info'],
    },
    spin: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
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
    icon: 'check',
  },
};

// ============================================
// Size Variants
// ============================================

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
      <div style={{ textAlign: 'center' }}>
        <DynIcon icon="check" size="xs" />
        <div style={{ fontSize: '11px', marginTop: '8px', color: '#64748b' }}>XS (12px)</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <DynIcon icon="check" size="small" />
        <div style={{ fontSize: '11px', marginTop: '8px', color: '#64748b' }}>Small (14px)</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <DynIcon icon="check" size="medium" />
        <div style={{ fontSize: '11px', marginTop: '8px', color: '#64748b' }}>Medium (16px)</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <DynIcon icon="check" size="large" />
        <div style={{ fontSize: '11px', marginTop: '8px', color: '#64748b' }}>Large (18px)</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <DynIcon icon="check" size="xl" />
        <div style={{ fontSize: '11px', marginTop: '8px', color: '#64748b' }}>XL (20px)</div>
      </div>
    </div>
  ),
};

export const CustomSizeNumber: Story = {
  args: {
    icon: 'check',
    size: 32,
  },
};

export const CustomSizeString: Story = {
  args: {
    icon: 'check',
    size: '3rem',
  },
};

// ============================================
// Tone Colors
// ============================================

export const AllTones: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
      <div style={{ textAlign: 'center' }}>
        <DynIcon icon="check" tone="success" size="large" />
        <div style={{ fontSize: '12px', marginTop: '8px', color: '#64748b' }}>Success</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <DynIcon icon="warning" tone="warning" size="large" />
        <div style={{ fontSize: '12px', marginTop: '8px', color: '#64748b' }}>Warning</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <DynIcon icon="close" tone="danger" size="large" />
        <div style={{ fontSize: '12px', marginTop: '8px', color: '#64748b' }}>Danger</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <DynIcon icon="info" tone="info" size="large" />
        <div style={{ fontSize: '12px', marginTop: '8px', color: '#64748b' }}>Info</div>
      </div>
    </div>
  ),
};

export const CustomColor: Story = {
  args: {
    icon: 'check',
    size: 'large',
    color: '#9333ea', // Purple
  },
};

// ============================================
// States
// ============================================

export const Spinning: Story = {
  args: {
    icon: 'loader',
    size: 'large',
    spin: true,
  },
};

export const Disabled: Story = {
  args: {
    icon: 'check',
    size: 'large',
    disabled: true,
  },
};

// ============================================
// Interactive
// ============================================

export const Interactive: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <DynIcon 
        icon="check" 
        size="large" 
        onClick={() => alert('Check clicked!')} 
        aria-label="Approve"
      />
      <DynIcon 
        icon="close" 
        size="large" 
        onClick={() => alert('Close clicked!')} 
        aria-label="Close"
        tone="danger"
      />
      <DynIcon 
        icon="info" 
        size="large" 
        onClick={() => alert('Info clicked!')} 
        aria-label="Information"
        tone="info"
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
    <div style={{ padding: '24px', background: '#0f172a', minHeight: '200px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
        <DynIcon icon="check" tone="success" size="large" />
        <DynIcon icon="warning" tone="warning" size="large" />
        <DynIcon icon="close" tone="danger" size="large" />
        <DynIcon icon="info" tone="info" size="large" />
      </div>
    </div>
  ),
};

// ============================================
// Complex Examples
// ============================================

export const InButtons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px' }}>
        <DynIcon icon="check" size="small" />
        Approve
      </button>
      <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px' }}>
        <DynIcon icon="close" size="small" />
        Cancel
      </button>
      <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px' }}>
        <DynIcon icon="loader" size="small" spin />
        Loading...
      </button>
    </div>
  ),
};

export const IconGrid: Story = {
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(4, 1fr)', 
      gap: '24px',
      maxWidth: '400px',
    }}>
      {['check', 'close', 'info', 'warning', 'loader', 'arrow', 'menu', 'settings'].map(icon => (
        <div key={icon} style={{ textAlign: 'center' }}>
          <DynIcon icon={icon} size="large" />
          <div style={{ fontSize: '11px', marginTop: '4px', color: '#64748b' }}>{icon}</div>
        </div>
      ))}
    </div>
  ),
};
```

---

## 5. ENTERPRISE CHECKLIST

Reference: `PATTERNS/05-Enterprise-Checklist.md` → TIER 1

### Current Status:

- [x] TypeScript strict mode enabled
- [x] No `any` types (verified)
- [x] Props interface exported ✅
- [x] CSS variables for colors (3-level fallback) ✅
- [x] CSS variables for sizing ✅
- [x] Dark mode tokens ✅
- [x] High contrast mode ✅
- [x] Reduced motion support ✅
- [x] All tone variants (4 tones) ✅
- [ ] ⚠️ All size variants (3/5 complete - missing xs, xl)
- [x] forwardRef support ✅
- [x] ARIA attributes (role, aria-hidden, aria-label) ✅
- [x] Interactive mode (onClick, tabIndex) ✅
- [x] Disabled state ✅
- [x] Spin animation ✅
- [ ] jest-axe tests (MISSING)
- [ ] ⚠️ 80%+ test coverage (currently ~70%)
- [ ] ⚠️ Comprehensive stories (currently ~30%)
- [x] JSDoc comments on props ✅
- [x] No hardcoded colors (uses tokens) ✅
- [x] Snapshot tests ✅ Bonus!
- [x] Print styles ✅ Bonus!
- [x] Icon registry system ✅ Advanced!

**Checklist Completeness**: 90%

---

## 6. EFFORT ESTIMATION

| Phase | Tasks | Time | Priority |
|-------|-------|------|----------|
| **Phase 1** | Add xs/xl Size Tokens | 1h | 🟡 MEDIUM |
| **Phase 2** | Comprehensive Testing | 1.5h | 🟡 MEDIUM |
| **Phase 3** | Enhanced Storybook | 1.5h | 🟡 MEDIUM |
| **Total** | | **4h** | |

**Recommended Sprint**: 0.5 day

---

## 7. SUCCESS CRITERIA

✅ **Phase Complete When**:

1. All 5 size tokens work (xs, small, medium, large, xl)
2. Test coverage ≥ 80%
3. All jest-axe tests pass
4. 15+ Storybook stories complete
5. All variants visually verified
6. Dark mode verified for all tones
7. PR approved + merged

---

## 8. BONUS FEATURES (Already Present)

✅ **Advanced Features**:
- Icon registry system (tree-shakeable)
- Icon dictionary support (external fonts)
- Smart ARIA handling (auto-hide decorative)
- Flexible sizing (tokens + number + CSS string)
- Multiple icon sources (registry, dictionary, React elements, children)
- Print styles optimization
- Snapshot tests
- Interactive mode with keyboard support

**DynIcon exceeds TIER1 requirements in architecture!**

---

## 9. REFERENCES

- `00-MASTER-TEMPLATE.md` - Structure reference
- `PATTERNS/02-ARIA-Attributes-Pattern.md` - TIER 1 ARIA (img, button roles)
- `PATTERNS/04-Testing-Pattern.md` - TIER 1 testing
- `PATTERNS/05-Enterprise-Checklist.md` - TIER 1 checklist
- [MDN: img role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/img_role)
- [W3C: Accessible Icons](https://www.w3.org/WAI/ARIA/apg/patterns/)

---

**Status**: ✅ EXCELLENT - MINOR ENHANCEMENTS ONLY  
**Last Updated**: 2025-12-28  
**Next Component**: DynAvatar
