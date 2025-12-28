# DynFlex - INCOMPLETE COMPONENT

**TIER**: 1 | **Kompleksnost**: LOW | **Timeline**: 0.5 day  
**Status**: ⚠️ **INCOMPLETE** (CSS Only - 30%)

---

## 1. CURRENT STATE ANALYSIS

### ⚠️ **Component PARTIALLY Exists - CSS Only**

**Lokacija**: `packages/dyn-ui-react/src/components/DynFlex/`

**Struktura Fajlova**:
```
DynFlex/
└── DynFlex.module.css (4.9 KB) ✅

MISSING:
❌ DynFlex.tsx
❌ DynFlex.types.ts
❌ DynFlex.test.tsx
❌ DynFlex.stories.tsx
❌ index.ts
```

**Total Size**: 4.9 KB (CSS only)

---

## 2. WHAT EXISTS - CSS ANALYSIS

### CSS Quality: Excellent (95%)

**The CSS is VERY well-structured**:

```css
/**
 * DynFlex Component Styles - 100% Design Token Compliance
 * 
 * Varijante: row, column, wrap, inline-flex
 * Stanja: default, responsive
 * Dark mode: Podržan
 * A11y: Uključen
 */

/* Base Flex Container */
.flex {
  display: var(--dyn-flex-display, flex);
  flex-direction: var(--dyn-flex-flex-direction, row);
  gap: var(--dyn-flex-gap);
  padding: var(--dyn-flex-padding);
  align-items: var(--dyn-flex-align-items, stretch);
  justify-content: var(--dyn-flex-justify-content, flex-start);
  flex-wrap: var(--dyn-flex-flex-wrap, nowrap);
}
```

#### ✅ **CSS Features**:

**Variants**:
- `.flexColumn` - Column direction
- `.flexWrap` - Wrapping enabled
- `.flexInline` - Inline flex

**Gap Utilities** (6 sizes):
- `.gapXSmall` - xs
- `.gapSmall` - sm
- `.gapMedium` - md (default)
- `.gapLarge` - lg
- `.gapXLarge` - xl
- `.gap2XLarge` - 2xl

**Alignment Utilities** (5 types):
- `.alignCenter`
- `.alignStart`
- `.alignEnd`
- `.alignStretch` (default)
- `.alignBaseline`

**Justify Utilities** (6 types):
- `.justifyStart` (default)
- `.justifyCenter`
- `.justifyEnd`
- `.justifyBetween`
- `.justifyAround`
- `.justifyEvenly`

**Responsive**:
```css
@media (max-width: 768px) {
  .flex {
    flex-wrap: wrap;
  }
}

@media (max-width: 480px) {
  .flex {
    --dyn-flex-gap: var(--dyn-spacing-sm);
    --dyn-flex-padding: var(--dyn-spacing-xs);
  }
}
```

**Accessibility**:
```css
/* Focus ring */
.flex > :focus-visible {
  outline: 2px solid var(--dyn-focus-ring-color, #007ACC);
  outline-offset: 2px;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .flex > * {
    animation: none !important;
    transition: none !important;
  }
}
```

**Design Tokens**:
- ✅ All CSS vars use design tokens
- ✅ Fallback values included
- ✅ Dark mode support
- ✅ High contrast mode support

**CSS Completeness: 95%** (excellent!)

---

## 3. WHAT'S MISSING - React Component

### ❌ **NO TypeScript Implementation**

This is a **CSS-only utility**, not a React component!

**To make it a proper TIER1 component, need**:

1. **DynFlex.types.ts**
2. **DynFlex.tsx**
3. **DynFlex.test.tsx**
4. **DynFlex.stories.tsx**
5. **index.ts**

---

## 4. IMPLEMENTATION SPECIFICATION

### 4.1 DynFlex.types.ts

```typescript
import type { CSSProperties, ElementType, ReactNode } from 'react';
import type { BaseComponentProps } from '../../types';
import type { LayoutAlignment, LayoutJustify, LayoutSpacing } from '../../types/layout.types';

export type DynFlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
export type DynFlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';
export type DynFlexDisplay = 'flex' | 'inline-flex';

export interface DynFlexOwnProps {
  /** Flex direction */
  direction?: DynFlexDirection;
  
  /** Flex wrap */
  wrap?: DynFlexWrap;
  
  /** Display type */
  display?: DynFlexDisplay;
  
  /** Gap between items (using spacing tokens) */
  gap?: LayoutSpacing;
  
  /** Align items on cross axis */
  align?: LayoutAlignment;
  
  /** Justify content on main axis */
  justify?: LayoutJustify;
  
  /** Padding (using spacing tokens or custom value) */
  padding?: LayoutSpacing | number | string;
  
  /** Whether children should grow to fill space */
  grow?: boolean;
  
  /** Whether children should shrink if needed */
  shrink?: boolean;
  
  /** Custom flex value for container */
  flex?: string | number;
  
  /** Inline styles */
  style?: CSSProperties;
  
  /** Children elements */
  children?: ReactNode;
  
  /** Polymorphic component type */
  as?: ElementType;
}

export type DynFlexProps = BaseComponentProps &
  DynFlexOwnProps &
  Omit<React.HTMLAttributes<HTMLElement>, keyof BaseComponentProps | keyof DynFlexOwnProps>;

export type DynFlexRef = HTMLElement;

export const DYN_FLEX_DEFAULT_PROPS = {
  direction: 'row' as DynFlexDirection,
  wrap: 'nowrap' as DynFlexWrap,
  display: 'flex' as DynFlexDisplay,
  gap: 'md' as LayoutSpacing,
  align: 'stretch' as LayoutAlignment,
  justify: 'start' as LayoutJustify,
  'data-testid': 'dyn-flex',
};
```

---

### 4.2 DynFlex.tsx

```typescript
import { forwardRef, useMemo } from 'react';
import type { ForwardedRef } from 'react';
import { cn } from '../../utils/classNames';
import {
  DYN_FLEX_DEFAULT_PROPS,
  DynFlexProps,
  DynFlexRef,
} from './DynFlex.types';
import styles from './DynFlex.module.css';

const toPascalCase = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

const DynFlexComponent = (
  {
    direction,
    wrap,
    display,
    gap,
    align,
    justify,
    padding,
    grow = false,
    shrink = true,
    flex,
    className,
    style,
    children,
    as: Component = 'div',
    'data-testid': dataTestId,
    ...rest
  }: DynFlexProps,
  ref: ForwardedRef<DynFlexRef>
) => {
  // Apply defaults
  const effectiveDirection = direction ?? DYN_FLEX_DEFAULT_PROPS.direction;
  const effectiveWrap = wrap ?? DYN_FLEX_DEFAULT_PROPS.wrap;
  const effectiveDisplay = display ?? DYN_FLEX_DEFAULT_PROPS.display;
  const effectiveGap = gap ?? DYN_FLEX_DEFAULT_PROPS.gap;
  const effectiveAlign = align ?? DYN_FLEX_DEFAULT_PROPS.align;
  const effectiveJustify = justify ?? DYN_FLEX_DEFAULT_PROPS.justify;
  const effectiveDataTestId = dataTestId ?? DYN_FLEX_DEFAULT_PROPS['data-testid'];

  // Build class names
  const flexClassName = cn(
    styles.flex,
    effectiveDirection === 'column' && styles.flexColumn,
    effectiveWrap !== 'nowrap' && styles.flexWrap,
    effectiveDisplay === 'inline-flex' && styles.flexInline,
    
    // Gap classes
    effectiveGap === 'xs' && styles.gapXSmall,
    effectiveGap === 'sm' && styles.gapSmall,
    effectiveGap === 'md' && styles.gapMedium,
    effectiveGap === 'lg' && styles.gapLarge,
    effectiveGap === 'xl' && styles.gapXLarge,
    effectiveGap === '2xl' && styles.gap2XLarge,
    
    // Align classes
    effectiveAlign === 'center' && styles.alignCenter,
    effectiveAlign === 'start' && styles.alignStart,
    effectiveAlign === 'end' && styles.alignEnd,
    effectiveAlign === 'stretch' && styles.alignStretch,
    effectiveAlign === 'baseline' && styles.alignBaseline,
    
    // Justify classes
    effectiveJustify === 'start' && styles.justifyStart,
    effectiveJustify === 'center' && styles.justifyCenter,
    effectiveJustify === 'end' && styles.justifyEnd,
    effectiveJustify === 'between' && styles.justifyBetween,
    effectiveJustify === 'around' && styles.justifyAround,
    effectiveJustify === 'evenly' && styles.justifyEvenly,
    
    className
  );

  // Build inline styles
  const inlineStyle = useMemo(() => {
    const result: React.CSSProperties = { ...style };

    if (padding !== undefined) {
      result.padding = typeof padding === 'number' ? `${padding}px` : padding;
    }

    if (grow) {
      result.flexGrow = 1;
    }

    if (!shrink) {
      result.flexShrink = 0;
    }

    if (flex !== undefined) {
      result.flex = flex;
    }

    return Object.keys(result).length > 0 ? result : undefined;
  }, [padding, grow, shrink, flex, style]);

  return (
    <Component
      ref={ref}
      className={flexClassName}
      style={inlineStyle}
      data-testid={effectiveDataTestId}
      {...rest}
    >
      {children}
    </Component>
  );
};

const DynFlex = forwardRef<DynFlexRef, DynFlexProps>(DynFlexComponent);

DynFlex.displayName = 'DynFlex';

export { DynFlex };
export default DynFlex;
```

---

### 4.3 DynFlex.test.tsx

```typescript
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { DynFlex } from './DynFlex';

expect.extend(toHaveNoViolations);

describe('DynFlex', () => {
  describe('Basic Rendering', () => {
    test('renders with default props', () => {
      render(<DynFlex>Content</DynFlex>);
      expect(screen.getByTestId('dyn-flex')).toBeInTheDocument();
    });

    test('renders children', () => {
      render(<DynFlex>Test Content</DynFlex>);
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    test('applies custom className', () => {
      render(<DynFlex className="custom-class">Content</DynFlex>);
      expect(screen.getByTestId('dyn-flex')).toHaveClass('custom-class');
    });
  });

  describe('Direction', () => {
    test('renders row direction (default)', () => {
      const { container } = render(<DynFlex>Content</DynFlex>);
      expect(container.firstChild).toHaveClass('flex');
      expect(container.firstChild).not.toHaveClass('flexColumn');
    });

    test('renders column direction', () => {
      const { container } = render(<DynFlex direction="column">Content</DynFlex>);
      expect(container.firstChild).toHaveClass('flexColumn');
    });
  });

  describe('Wrap', () => {
    test('renders nowrap (default)', () => {
      const { container } = render(<DynFlex>Content</DynFlex>);
      expect(container.firstChild).not.toHaveClass('flexWrap');
    });

    test('renders wrap', () => {
      const { container } = render(<DynFlex wrap="wrap">Content</DynFlex>);
      expect(container.firstChild).toHaveClass('flexWrap');
    });
  });

  describe('Display', () => {
    test('renders flex (default)', () => {
      const { container } = render(<DynFlex>Content</DynFlex>);
      expect(container.firstChild).not.toHaveClass('flexInline');
    });

    test('renders inline-flex', () => {
      const { container } = render(<DynFlex display="inline-flex">Content</DynFlex>);
      expect(container.firstChild).toHaveClass('flexInline');
    });
  });

  describe('Gap', () => {
    const gaps = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;
    
    gaps.forEach((gap) => {
      test(`renders ${gap} gap`, () => {
        const { container } = render(<DynFlex gap={gap}>Content</DynFlex>);
        const expectedClass = `gap${gap.charAt(0).toUpperCase()}${gap.slice(1).replace('xl', 'XLarge').replace('lg', 'Large').replace('md', 'Medium').replace('sm', 'Small').replace('xs', 'XSmall')}`;
        expect(container.firstChild).toHaveClass(expectedClass);
      });
    });
  });

  describe('Alignment', () => {
    const alignments = ['center', 'start', 'end', 'stretch', 'baseline'] as const;
    
    alignments.forEach((align) => {
      test(`renders ${align} alignment`, () => {
        const { container } = render(<DynFlex align={align}>Content</DynFlex>);
        const expectedClass = `align${align.charAt(0).toUpperCase() + align.slice(1)}`;
        expect(container.firstChild).toHaveClass(expectedClass);
      });
    });
  });

  describe('Justify', () => {
    const justifies = ['start', 'center', 'end', 'between', 'around', 'evenly'] as const;
    
    justifies.forEach((justify) => {
      test(`renders ${justify} justify`, () => {
        const { container } = render(<DynFlex justify={justify}>Content</DynFlex>);
        const expectedClass = `justify${justify.charAt(0).toUpperCase() + justify.slice(1)}`;
        expect(container.firstChild).toHaveClass(expectedClass);
      });
    });
  });

  describe('Polymorphic', () => {
    test('renders as div by default', () => {
      const { container } = render(<DynFlex>Content</DynFlex>);
      expect(container.firstChild?.nodeName).toBe('DIV');
    });

    test('renders as custom element', () => {
      const { container } = render(<DynFlex as="section">Content</DynFlex>);
      expect(container.firstChild?.nodeName).toBe('SECTION');
    });
  });

  describe('Ref Forwarding', () => {
    test('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<DynFlex ref={ref}>Content</DynFlex>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('Accessibility', () => {
    test('has no axe violations', async () => {
      const { container } = render(<DynFlex>Content</DynFlex>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('has no axe violations with all props', async () => {
      const { container } = render(
        <DynFlex
          direction="column"
          wrap="wrap"
          gap="lg"
          align="center"
          justify="between"
        >
          <div>Item 1</div>
          <div>Item 2</div>
        </DynFlex>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
```

---

### 4.4 DynFlex.stories.tsx

```typescript
import { Meta, StoryObj } from '@storybook/react';
import { DynFlex } from './DynFlex';
import { DynBox } from '../DynBox';

const meta: Meta<typeof DynFlex> = {
  title: 'Components/TIER1/DynFlex',
  component: DynFlex,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Flexbox layout component with design token support. Use for arranging items in rows or columns with flexible spacing and alignment.',
      },
    },
  },
  argTypes: {
    direction: {
      control: 'select',
      options: ['row', 'column', 'row-reverse', 'column-reverse'],
    },
    wrap: {
      control: 'select',
      options: ['nowrap', 'wrap', 'wrap-reverse'],
    },
    display: {
      control: 'select',
      options: ['flex', 'inline-flex'],
    },
    gap: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch', 'baseline'],
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Helper component for examples
const Box = ({ children, ...props }: any) => (
  <DynBox
    padding="md"
    background="primary"
    style={{ minWidth: '80px', textAlign: 'center' }}
    {...props}
  >
    {children}
  </DynBox>
);

export const Default: Story = {
  args: {
    children: (
      <>
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
      </>
    ),
  },
};

export const Column: Story = {
  args: {
    direction: 'column',
    children: (
      <>
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
      </>
    ),
  },
};

export const AllGaps: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {['xs', 'sm', 'md', 'lg', 'xl', '2xl'].map((gap) => (
        <div key={gap}>
          <h4>Gap: {gap}</h4>
          <DynFlex gap={gap as any}>
            <Box>1</Box>
            <Box>2</Box>
            <Box>3</Box>
          </DynFlex>
        </div>
      ))}
    </div>
  ),
};

export const AllAlignments: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {['start', 'center', 'end', 'stretch'].map((align) => (
        <div key={align}>
          <h4>Align: {align}</h4>
          <DynFlex align={align as any} style={{ height: '100px', background: '#f0f0f0' }}>
            <Box>Item</Box>
            <Box>Item</Box>
            <Box>Item</Box>
          </DynFlex>
        </div>
      ))}
    </div>
  ),
};

export const AllJustify: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {['start', 'center', 'end', 'between', 'around', 'evenly'].map((justify) => (
        <div key={justify}>
          <h4>Justify: {justify}</h4>
          <DynFlex justify={justify as any} style={{ background: '#f0f0f0' }}>
            <Box>1</Box>
            <Box>2</Box>
            <Box>3</Box>
          </DynFlex>
        </div>
      ))}
    </div>
  ),
};

export const Wrapping: Story = {
  args: {
    wrap: 'wrap',
    gap: 'md',
    style: { maxWidth: '400px' },
    children: (
      <>
        {Array.from({ length: 10 }, (_, i) => (
          <Box key={i}>Item {i + 1}</Box>
        ))}
      </>
    ),
  },
};

export const ResponsiveLayout: Story = {
  args: {
    direction: 'column',
    gap: 'lg',
    children: (
      <>
        <DynFlex gap="md">
          <Box style={{ flex: 1 }}>Card 1</Box>
          <Box style={{ flex: 1 }}>Card 2</Box>
        </DynFlex>
        <DynFlex gap="md">
          <Box style={{ flex: 1 }}>Card 3</Box>
          <Box style={{ flex: 1 }}>Card 4</Box>
        </DynFlex>
      </>
    ),
  },
};
```

---

### 4.5 index.ts

```typescript
export { DynFlex } from './DynFlex';
export type {
  DynFlexProps,
  DynFlexRef,
  DynFlexDirection,
  DynFlexWrap,
  DynFlexDisplay,
} from './DynFlex.types';
export { DYN_FLEX_DEFAULT_PROPS } from './DynFlex.types';
```

---

## 5. EFFORT ESTIMATION

| Phase | Tasks | Time | Priority |
|-------|-------|------|----------|
| **Phase 1** | Create DynFlex.types.ts | 0.5h | 🔴 HIGH |
| **Phase 2** | Create DynFlex.tsx | 1h | 🔴 HIGH |
| **Phase 3** | Create DynFlex.test.tsx | 1.5h | 🔴 HIGH |
| **Phase 4** | Create DynFlex.stories.tsx | 1h | 🔴 HIGH |
| **Phase 5** | Create index.ts | 0.1h | 🔴 HIGH |
| **Phase 6** | Update CSS if needed | 0.5h | 🟢 LOW |
| **Total** | | **4.6h** | |

**Recommended Sprint**: 1 day (with testing & review)

---

## 6. CURRENT COMPLETENESS

### Overall: 30%

| Component | Status | Completeness |
|-----------|--------|-------------|
| **CSS** | ✅ Excellent | 95% |
| **Types** | ❌ Missing | 0% |
| **Component** | ❌ Missing | 0% |
| **Tests** | ❌ Missing | 0% |
| **Stories** | ❌ Missing | 0% |
| **Index** | ❌ Missing | 0% |
| **Overall** | ⚠️ Incomplete | **30%** |

---

## 7. PRIORITY

**DynFlex is CRITICAL for TIER1**:

- ✅ **Essential layout component** (alongside Grid)
- ✅ **CSS is already excellent**
- ✅ **Low complexity** (simple wrapper)
- ✅ **High ROI** (widely used)
- ✅ **Clear specification** (well-understood pattern)

**Recommendation**: **HIGH PRIORITY** - Complete ASAP

---

## 8. ALTERNATIVE

**IF React component not created**, developers must:

```tsx
// Manual className management
import styles from './DynFlex/DynFlex.module.css';

<div className={cn(
  styles.flex,
  styles.flexColumn,
  styles.gapMedium,
  styles.alignCenter,
  styles.justifyBetween
)}>
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

**This is cumbersome and error-prone!**

**With React component**:
```tsx
<DynFlex direction="column" gap="md" align="center" justify="between">
  <div>Item 1</div>
  <div>Item 2</div>
</DynFlex>
```

**Much better DX!**

---

## 9. SUCCESS CRITERIA

✅ **Phase Complete When**:

1. All 5 files created (types, component, tests, stories, index)
2. Tests pass with 80%+ coverage
3. All stories render correctly
4. jest-axe tests pass
5. Component exported from package
6. Documentation updated
7. PR approved + merged

---

## 10. REFERENCES

- `00-MASTER-TEMPLATE.md` - Structure reference
- `03-DynBox-REAL.md` - Similar layout component
- `PATTERNS/01-Props-Composition-Pattern.md` - Prop patterns
- `PATTERNS/04-Testing-Pattern.md` - Testing requirements
- [MDN: Flexbox](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox)

---

**Status**: ⚠️ **INCOMPLETE - NEEDS IMPLEMENTATION**  
**Last Updated**: 2025-12-28  
**Priority**: 🔴 **HIGH**
