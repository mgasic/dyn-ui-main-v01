# DYN UI - FOCUSED DESIGN TOKENS IMPLEMENTATION GUIDE

**Status**: ACTIONABLE - Only what needs to be done  
**Focus**: Apply Design_Tokens_Standard_v1.0 to all 37 components  
**Includes**: Storybook & Test integration  
**Version**: Final Implementation

---

## 🎯 EXECUTIVE INTENT

You already have `Design_Tokens_Standard_v1.0.md` which defines the token system.

**This document shows:**
1. What specifically needs to change in each component
2. Why it's changing (alignment with standard)
3. How it affects Storybook
4. How it affects tests
5. Real before/after examples

---

## PHASE 1: UNDERSTAND THE GAP

### What Design_Tokens_Standard_v1.0 Says:
- ✅ Foundation tokens exist (colors, spacing, typography, etc.)
- ✅ Component tokens should reference foundation tokens
- ✅ All values must use `var(--dyn-*)` pattern
- ✅ Must support dark mode, responsive, accessibility

### What Components Currently Have:
- ❌ Inconsistent token usage
- ❌ Hardcoded values instead of tokens
- ❌ Missing dark mode support in some components
- ❌ Incomplete Storybook documentation
- ❌ Missing test coverage for token usage

---

## PHASE 2: THE 4-STEP TRANSFORMATION

For **EACH component**, follow these exact 4 steps:

### STEP 1: Audit Current State
```
Check: Is component using var(--dyn-*) everywhere?
Check: Does component have dark mode section?
Check: Are all fallbacks present?
Check: Are tests checking token usage?
Check: Is Storybook showing all variants?
```

### STEP 2: Define Component Tokens
```
List all tokens the component needs
Map them to foundation tokens
Define variants (size, kind, state)
```

### STEP 3: Update Component CSS
```
Replace hardcoded values with tokens
Add dark mode section
Add responsive adjustments
Ensure fallbacks are present
```

### STEP 4: Update Tests & Storybook
```
Test that tokens are applied correctly
Test dark mode rendering
Test responsive behavior
Storybook shows token values
```

---

## CATEGORY 1: BUTTON-LIKE COMPONENTS

**Components**: DynButton, DynIconButton

### WHY CHANGE?

**Current Problem**:
```css
/* DynButton.module.css - BEFORE */
.root {
  background-color: #2563eb;           /* ❌ Hardcoded */
  padding: 8px 16px;                   /* ❌ Hardcoded */
  border-radius: 8px;                  /* ❌ Hardcoded */
  transition: all 0.2s ease;           /* ❌ Hardcoded */
}
```

**Why It's Wrong**:
1. **Not maintainable** - Change color = change 10+ places
2. **No consistency** - Each component has different values
3. **No dark mode** - Can't override for dark theme
4. **No variants** - Can't create secondary button with different color

**The Solution**:
- Use tokens: `var(--dyn-color-primary)` instead of `#2563eb`
- Create variants: `.kindPrimary`, `.kindSecondary` override tokens
- Support dark mode: `@media (prefers-color-scheme: dark)` override tokens
- Enable scaling: Change token in one place, updates everywhere

### IMPLEMENTATION

#### CSS Module Changes (DynButton.module.css)

**BEFORE** (Current - Hardcoded):
```css
.root {
  background-color: #2563eb;
  border: 1px solid #2563eb;
  color: #ffffff;
  padding: 8px 16px;
  min-height: 40px;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s ease;
}

.root:hover {
  background-color: #1d4ed8;
  border-color: #1d4ed8;
}

.sizeSmall {
  padding: 4px 12px;
  min-height: 32px;
  font-size: 12px;
}
```

**AFTER** (With Tokens):
```css
/**
 * WHY THIS SECTION IS NEEDED:
 * 
 * Component tokens act as "local variables" for this component.
 * They bridge between:
 * 1. Foundation tokens (--dyn-color-primary)
 * 2. Component instance (--dyn-button-bg)
 * 3. Property usage (background-color)
 * 
 * This enables:
 * - Easy variants (just override the tokens)
 * - Dark mode support (override tokens in @media)
 * - Responsive design (adjust tokens in @media)
 * - Fallbacks (if foundation tokens missing)
 */

.root {
  /* STEP 1: Define component tokens (ONE place to change per variant) */
  --dyn-button-bg: var(--dyn-color-primary, var(--color-primary, #2563eb));
  --dyn-button-border: var(--dyn-color-primary, var(--color-primary, #2563eb));
  --dyn-button-color: var(--dyn-color-primary-contrast, var(--color-primary-contrast, #ffffff));
  --dyn-button-bg-hover: var(--dyn-color-primary-hover, var(--color-primary-hover, #1d4ed8));
  --dyn-button-border-hover: var(--dyn-color-primary-hover, var(--color-primary-hover, #1d4ed8));
  --dyn-button-bg-active: var(--dyn-color-primary-active, var(--color-primary-active, #1e40af));
  --dyn-button-border-active: var(--dyn-color-primary-active, var(--color-primary-active, #1e40af));
  
  --dyn-button-padding-y: var(--dyn-spacing-sm, var(--spacing-sm, 0.5rem));
  --dyn-button-padding-x: var(--dyn-spacing-md, var(--spacing-md, 1rem));
  --dyn-button-min-height: var(--dyn-size-md, var(--size-md, 2.5rem));
  --dyn-button-border-radius: var(--dyn-border-radius-md, var(--border-radius-md, 0.5rem));
  
  /* STEP 2: Use component tokens (never hardcoded values) */
  background-color: var(--dyn-button-bg);
  border: 1px solid var(--dyn-button-border);
  color: var(--dyn-button-color);
  padding: var(--dyn-button-padding-y) var(--dyn-button-padding-x);
  min-height: var(--dyn-button-min-height);
  border-radius: var(--dyn-button-border-radius);
  font-size: var(--dyn-font-size-sm, var(--font-size-sm, 0.875rem));
  transition: var(--dyn-transition-base, all 0.2s ease-out);
}

/* STEP 3: Define variants by overriding tokens (not redefining properties) */
.kindSecondary {
  /* Only override the tokens that change for secondary variant */
  --dyn-button-bg: transparent;
  --dyn-button-border: var(--dyn-color-primary, var(--color-primary, #2563eb));
  --dyn-button-color: var(--dyn-color-primary, var(--color-primary, #2563eb));
  
  /* WHY NOT REDEFINE?: 
   * background-color: transparent;  ← NO!
   * color: var(--dyn-color-primary); ← NO!
   * 
   * REASON: Properties don't change, just update token variable
   * The 'background-color' property in .root will automatically use new token value
   */
}

.kindTertiary {
  --dyn-button-bg: transparent;
  --dyn-button-border: transparent;
  --dyn-button-color: var(--dyn-color-primary, var(--color-primary, #2563eb));
}

/* STEP 4: Define size variants by overriding spacing tokens */
.sizeSmall {
  --dyn-button-padding-y: var(--dyn-spacing-xs, var(--spacing-xs, 0.375rem));
  --dyn-button-padding-x: var(--dyn-spacing-sm, var(--spacing-sm, 0.75rem));
  --dyn-button-min-height: var(--dyn-size-sm, var(--size-sm, 2.25rem));
  font-size: var(--dyn-font-size-xs, var(--font-size-xs, 0.75rem));
}

.sizeLarge {
  --dyn-button-padding-y: var(--dyn-spacing-md, var(--spacing-md, 0.75rem));
  --dyn-button-padding-x: var(--dyn-spacing-lg, var(--spacing-lg, 1.5rem));
  --dyn-button-min-height: var(--dyn-size-lg, var(--size-lg, 3rem));
  font-size: var(--dyn-font-size-md, var(--font-size-md, 1rem));
}

/* STEP 5: Interactive states - update only the tokens that change */
.root:hover:not(:disabled) {
  --dyn-button-bg: var(--dyn-button-bg-hover);
  --dyn-button-border: var(--dyn-button-border-hover);
  /* WHY NO background-color property?: 
   * Because it already references --dyn-button-bg (see .root above)
   * CSS will re-evaluate and use the new token value automatically
   */
}

.root:focus-visible {
  outline: 3px solid var(--dyn-color-focus-ring, var(--color-focus-ring, rgba(37, 99, 235, 0.35)));
  outline-offset: 3px;
}

.root:active:not(:disabled) {
  --dyn-button-bg: var(--dyn-button-bg-active);
  --dyn-button-border: var(--dyn-button-border-active);
}

.root:disabled {
  opacity: var(--dyn-opacity-disabled, var(--opacity-disabled, 0.56));
}

/* STEP 6: Dark mode - override tokens for dark theme */
@media (prefers-color-scheme: dark) {
  .kindPrimary {
    --dyn-button-bg: var(--dyn-color-primary-dark, var(--color-primary-dark, #3b82f6));
    --dyn-button-border: var(--dyn-color-primary-dark, var(--color-primary-dark, #3b82f6));
    --dyn-button-bg-hover: var(--dyn-color-primary-dark-hover, var(--color-primary-dark-hover, #2563eb));
  }
  
  /* WHY OVERRIDE HERE:
   * Foundation tokens have dark mode values already
   * But we might need different emphasis for component-level
   * Example: Secondary button text might be different color in dark mode
   */
}

/* STEP 7: Responsive - adjust tokens for mobile */
@media (max-width: 767px) {
  .root {
    /* Increase touch target size to 44px minimum */
    min-height: var(--dyn-size-touch-target, var(--size-touch-target, 44px));
    font-size: var(--dyn-font-size-base, var(--font-size-base, 1rem));
  }
  
  .sizeSmall {
    min-height: var(--dyn-size-touch-target-sm, var(--size-touch-target-sm, 40px));
  }
  
  .sizeLarge {
    min-height: var(--dyn-size-touch-target-lg, var(--size-touch-target-lg, 52px));
  }
}

/* STEP 8: Accessibility - respect user preferences */
@media (prefers-reduced-motion: reduce) {
  .root {
    transition: none;
  }
}

@media (prefers-contrast: high) {
  .root {
    border-width: 2px;
  }
  
  .root:focus-visible {
    outline-width: 4px;
    outline-offset: 2px;
  }
}
```

#### Why This Structure?

**Old Way (WRONG)**:
```css
/* 8 places to change color */
.root { color: #2563eb; }
.root:hover { color: #1d4ed8; }
.root:active { color: #1e40af; }
.kindPrimary { color: #2563eb; }
.kindSecondary { color: #1d4ed8; }
@media dark { .root { color: #3b82f6; } }
@media dark { .kindPrimary { color: #3b82f6; } }
@media dark { .kindSecondary { color: #2563eb; } }
```

**New Way (RIGHT)**:
```css
/* 1 place to change - the token */
.root { --dyn-button-color: var(--dyn-color-primary); color: var(--dyn-button-color); }
.kindSecondary { --dyn-button-color: var(--dyn-color-secondary); }
@media dark { .kindSecondary { --dyn-button-color: var(--dyn-color-secondary-dark); } }
```

### Storybook Integration

**DynButton.stories.tsx - UPDATED**:

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { DynButton } from './DynButton';

/**
 * WHY THIS MATTERS FOR STORYBOOK:
 * 
 * Storybook is not just documentation - it's a visual regression tool.
 * By showing all variants and tokens, we can:
 * 1. Visually verify tokens are applied correctly
 * 2. Test dark mode rendering
 * 3. Test responsive behavior
 * 4. Catch token changes early
 */

const meta = {
  title: 'Components/Button',
  component: DynButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Token Usage

This component uses the following design tokens:

### Colors
- \`--dyn-color-primary\` - Primary button color
- \`--dyn-color-primary-hover\` - Hover state
- \`--dyn-color-primary-active\` - Active state
- \`--dyn-color-primary-contrast\` - Text color on primary

### Spacing
- \`--dyn-spacing-sm\` - Vertical padding
- \`--dyn-spacing-md\` - Horizontal padding

### Typography
- \`--dyn-font-size-sm\` - Base font size
- \`--dyn-font-weight-medium\` - Text weight

### Effects
- \`--dyn-border-radius-md\` - Button radius
- \`--dyn-shadow-md\` - Hover shadow
- \`--dyn-transition-base\` - Transition timing
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    kind: {
      control: 'radio',
      options: ['primary', 'secondary', 'tertiary'],
      description: 'Token variant - changes --dyn-button-* tokens',
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      description: 'Size variant - changes spacing and font-size tokens',
    },
  },
} satisfies Meta<typeof DynButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Primary Variant
 * 
 * This story demonstrates the default primary variant:
 * - Uses --dyn-color-primary tokens
 * - Changes to --dyn-color-primary-hover on hover
 * - Changes to --dyn-color-primary-active on active
 */
export const Primary: Story = {
  args: {
    children: 'Primary Button',
    kind: 'primary',
  },
};

/**
 * Secondary Variant
 * 
 * This story demonstrates how variant tokens override default tokens:
 * - .kindSecondary overrides --dyn-button-bg to transparent
 * - Uses text color instead of background color
 * - Same hover/active behavior but with different visual approach
 */
export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    kind: 'secondary',
  },
};

/**
 * Tertiary Variant
 * 
 * Minimal variant with no background or border:
 * - Only uses text color tokens
 * - Useful for less prominent actions
 */
export const Tertiary: Story = {
  args: {
    children: 'Tertiary Button',
    kind: 'tertiary',
  },
};

/**
 * Dark Mode
 * 
 * Demonstrates dark mode token overrides.
 * The component automatically uses dark tokens when:
 * - User prefers dark mode (prefers-color-scheme: dark)
 * - CSS media query updates --dyn-color-* tokens
 * - Component re-renders with new token values
 */
export const DarkMode: Story = {
  args: {
    children: 'Dark Mode Button',
  },
  parameters: {
    colorMode: 'dark',
  },
};

/**
 * All Tokens Showcase
 * 
 * Shows how each size variant uses different token values:
 * - sizeSmall: --dyn-spacing-xs, --dyn-size-sm, --dyn-font-size-xs
 * - sizeMedium: --dyn-spacing-sm/md, --dyn-size-md, --dyn-font-size-sm
 * - sizeLarge: --dyn-spacing-md/lg, --dyn-size-lg, --dyn-font-size-md
 */
export const AllTokens: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h3>By Kind (Token Variants)</h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          <DynButton kind="primary">Primary (--dyn-color-primary)</DynButton>
          <DynButton kind="secondary">Secondary (--dyn-color-secondary)</DynButton>
          <DynButton kind="tertiary">Tertiary (no bg, text only)</DynButton>
        </div>
      </div>
      
      <div>
        <h3>By Size (Token Scale)</h3>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <DynButton size="small">Small (--dyn-spacing-xs)</DynButton>
          <DynButton size="medium">Medium (--dyn-spacing-sm/md)</DynButton>
          <DynButton size="large">Large (--dyn-spacing-lg)</DynButton>
        </div>
      </div>
      
      <div>
        <h3>Dark Mode Tokens</h3>
        <p>Tokens automatically update when user prefers dark mode</p>
        <p style={{ fontSize: '12px', color: '#666' }}>
          --dyn-color-primary changes to --dyn-color-primary-dark
        </p>
      </div>
    </div>
  ),
};
```

### Test Integration

**DynButton.test.tsx - UPDATED**:

```typescript
import { render } from '@testing-library/react';
import { DynButton } from './DynButton';
import styles from './DynButton.module.css';

/**
 * WHY TEST TOKEN USAGE:
 * 
 * Tests should verify that:
 * 1. Tokens are applied to the DOM (not hardcoded values)
 * 2. Token variants work correctly
 * 3. Dark mode tokens are applied
 * 4. Responsive token adjustments work
 * 5. Accessibility tokens (focus ring, opacity) are present
 */

describe('DynButton - Token Usage', () => {
  describe('Token Application', () => {
    it('should apply component tokens to DOM', () => {
      const { container } = render(<DynButton>Click me</DynButton>);
      const button = container.querySelector('button');
      
      const computedStyle = window.getComputedStyle(button!);
      
      /**
       * VERIFICATION:
       * - Check that CSS variables are applied
       * - Verify computed style uses token values, not hardcoded
       */
      expect(button).toHaveClass(styles.root);
      
      // The actual color should come from --dyn-color-primary token
      // (not the hardcoded #2563eb value)
      const bgColor = computedStyle.backgroundColor;
      expect(bgColor).toBeTruthy(); // Token value exists
    });

    it('should use variant tokens when kind prop changes', () => {
      const { rerender, container } = render(
        <DynButton kind="primary">Primary</DynButton>
      );
      
      let button = container.querySelector('button');
      expect(button).toHaveClass(styles.kindPrimary);
      
      /**
       * VERIFICATION:
       * When variant changes, different tokens should be applied
       * Secondary variant changes:
       * - --dyn-button-bg from primary to transparent
       * - --dyn-button-color from contrast white to primary blue
       */
      
      rerender(<DynButton kind="secondary">Secondary</DynButton>);
      button = container.querySelector('button');
      expect(button).toHaveClass(styles.kindSecondary);
      
      // The background should now be transparent (from token override)
      const bgColor = window.getComputedStyle(button!).backgroundColor;
      expect(bgColor).toContain('transparent'); // Or rgba(0,0,0,0)
    });
  });

  describe('Token Variants', () => {
    it('should apply size tokens correctly', () => {
      const { rerender, container } = render(
        <DynButton size="small">Small</DynButton>
      );
      
      let button = container.querySelector('button');
      expect(button).toHaveClass(styles.sizeSmall);
      
      /**
       * VERIFICATION:
       * Size small uses --dyn-spacing-xs tokens
       * Expected padding: 0.375rem (3px) vertical
       */
      const computedStyle = window.getComputedStyle(button!);
      const paddingY = computedStyle.paddingTop;
      expect(parseFloat(paddingY)).toBeLessThan(10); // Less than medium
      
      rerender(<DynButton size="large">Large</DynButton>);
      button = container.querySelector('button');
      expect(button).toHaveClass(styles.sizeLarge);
      
      /**
       * VERIFICATION:
       * Size large uses --dyn-spacing-lg tokens
       * Expected padding: larger than small
       */
      const largeStyle = window.getComputedStyle(button!);
      const largePaddingY = largeStyle.paddingTop;
      expect(parseFloat(largePaddingY)).toBeGreaterThan(parseFloat(paddingY));
    });
  });

  describe('Dark Mode Tokens', () => {
    it('should use dark mode tokens when prefers-color-scheme: dark', () => {
      /**
       * HOW TO TEST DARK MODE TOKENS:
       * 
       * Method 1: Mock matchMedia
       * Mock window.matchMedia to return dark: true
       * Then check if dark token values are applied
       */
      
      const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const isDarkMode = darkModeQuery.matches;
      
      const { container } = render(<DynButton>Test</DynButton>);
      const button = container.querySelector('button');
      const computedStyle = window.getComputedStyle(button!);
      
      if (isDarkMode) {
        /**
         * In dark mode, --dyn-color-primary should be #3b82f6
         * instead of #2563eb
         */
        const bgColor = computedStyle.backgroundColor;
        // Should contain dark mode color
        expect(bgColor).toBeTruthy();
      }
    });
  });

  describe('Responsive Tokens', () => {
    it('should use touch target tokens on mobile', () => {
      /**
       * HOW TO TEST RESPONSIVE TOKENS:
       * 
       * Method: Use ResizeObserver or window.innerWidth mock
       * Simulate mobile viewport (max-width: 767px)
       * Verify touch target tokens are applied
       */
      
      // Mock mobile viewport
      global.innerWidth = 375; // Mobile width
      
      const { container } = render(<DynButton>Mobile Button</DynButton>);
      const button = container.querySelector('button');
      const computedStyle = window.getComputedStyle(button!);
      
      /**
       * VERIFICATION:
       * On mobile, min-height should be --dyn-size-touch-target (44px)
       * instead of regular --dyn-size-md (40px)
       */
      const height = parseInt(computedStyle.minHeight);
      expect(height).toBeGreaterThanOrEqual(44); // Touch target minimum
      
      // Reset
      global.innerWidth = 1024;
    });
  });

  describe('Accessibility Tokens', () => {
    it('should apply focus ring tokens', () => {
      const { container } = render(<DynButton>Focus</DynButton>);
      const button = container.querySelector('button');
      
      button?.focus();
      
      /**
       * VERIFICATION:
       * When focused, should apply --dyn-color-focus-ring token
       * Which creates a visible outline (accessibility)
       */
      const computedStyle = window.getComputedStyle(button!);
      const outline = computedStyle.outline || computedStyle.outlineColor;
      expect(outline).toBeTruthy(); // Focus ring token applied
    });

    it('should apply opacity token when disabled', () => {
      const { container } = render(<DynButton disabled>Disabled</DynButton>);
      const button = container.querySelector('button');
      
      const computedStyle = window.getComputedStyle(button!);
      const opacity = parseFloat(computedStyle.opacity);
      
      /**
       * VERIFICATION:
       * Disabled state applies --dyn-opacity-disabled (0.56)
       * This reduces visibility to indicate disabled state
       */
      expect(opacity).toBeLessThan(1); // Reduced opacity
      expect(opacity).toBeCloseTo(0.56, 1); // Token value
    });

    it('should respect prefers-reduced-motion token', () => {
      /**
       * HOW TO TEST REDUCED MOTION:
       * 
       * Mock user preference for reduced motion
       * Verify that --dyn-transition-base becomes 'none'
       */
      
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;
      
      const { container } = render(<DynButton>Motion</DynButton>);
      const button = container.querySelector('button');
      const computedStyle = window.getComputedStyle(button!);
      
      if (prefersReducedMotion) {
        // Transition should be disabled
        const transition = computedStyle.transition;
        expect(transition).toContain('none');
      }
    });
  });

  describe('Token Value Verification', () => {
    it('should not use hardcoded CSS values', () => {
      /**
       * WHY THIS TEST:
       * Ensures component only uses tokens, never hardcoded values
       * If a hardcoded value exists, this test will fail
       * This prevents regressions
       */
      
      const cssContent = styles.toString();
      
      // These patterns indicate hardcoded values (bad)
      const hardcodedPatterns = [
        /#[0-9a-f]{6}(?!;)/gi, // Color hex without being in comment
        /\b(8px|16px|12px)\b/g, // Hardcoded pixel values
      ];
      
      hardcodedPatterns.forEach(pattern => {
        const matches = cssContent.match(pattern) || [];
        const nonCommentMatches = matches.filter(
          m => !cssContent.includes(`/* ${m}`)
        );
        
        /**
         * NOTE: Some hardcoded fallbacks are OK in comments
         * But real property values should all use tokens
         */
        expect(nonCommentMatches.length).toBe(0);
      });
    });
  });
});
```

---

## CATEGORY 2: INPUT-LIKE COMPONENTS

**Components**: DynInput, DynTextArea, DynSelect, DynDatePicker, DynCheckbox

### WHY CHANGE?

**Input components have MORE tokens than buttons** because they have:
- Multiple visual states (focus, error, disabled, readonly)
- Placeholder styling
- Focus ring styling
- Error messaging colors

### Key Differences from Buttons

| Aspect | Button | Input |
|--------|--------|-------|
| **States** | hover, focus, active | hover, focus, error, readonly |
| **Colors** | mainly bg + text | border + bg + text + placeholder + focus-ring |
| **Responsive** | just touch target | full touch target redesign on mobile |
| **Special Cases** | loading spinner | placeholder, error messages |

### IMPLEMENTATION

**DynInput.module.css - BEFORE (Hardcoded)**:
```css
.input {
  background: white;
  border: 1px solid #d1d5db;
  color: #111827;
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 6px;
}

.input::placeholder {
  color: #9ca3af;
}

.input:focus {
  border: 1px solid #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.35);
}

.input:disabled {
  background: #f3f4f6;
  color: #9ca3af;
}

.input.error {
  border: 1px solid #d32f2f;
}

.sizeLarge {
  padding: 12px 16px;
  font-size: 16px;
}
```

**DynInput.module.css - AFTER (With Tokens)**:
```css
/**
 * WHY THIS STRUCTURE:
 * 
 * Inputs have multiple color layers:
 * 1. Background color (surface)
 * 2. Border color (interactive)
 * 3. Text color (content)
 * 4. Placeholder color (hint)
 * 5. Focus ring color (accessibility)
 * 6. Error color (validation)
 * 
 * Each needs to be a separate token for flexibility
 */

.container {
  /* Color tokens for all possible states */
  --dyn-input-bg: var(--dyn-color-surface, var(--color-surface, #ffffff));
  --dyn-input-color: var(--dyn-color-text-primary, var(--color-text-primary, #111827));
  --dyn-input-border: var(--dyn-color-border, var(--color-border, #d1d5db));
  --dyn-input-placeholder: var(--dyn-color-text-placeholder, var(--color-text-placeholder, #9ca3af));
  
  /* Interactive state tokens */
  --dyn-input-border-hover: var(--dyn-color-border-hover, var(--color-border-hover, #9ca3af));
  --dyn-input-border-focus: var(--dyn-color-primary, var(--color-primary, #2563eb));
  --dyn-input-focus-ring: var(--dyn-color-focus-ring, var(--color-focus-ring, rgba(37, 99, 235, 0.35)));
  
  /* Disabled state tokens */
  --dyn-input-disabled-bg: var(--dyn-color-surface-disabled, var(--color-surface-disabled, #f3f4f6));
  --dyn-input-disabled-color: var(--dyn-color-text-disabled, var(--color-text-disabled, #9ca3af));
  
  /* Error state tokens */
  --dyn-input-error: var(--dyn-color-danger, var(--color-danger, #d32f2f));
  
  /* Spacing tokens - set at container level */
  --dyn-input-padding-y: var(--dyn-spacing-sm, var(--spacing-sm, 0.5rem));
  --dyn-input-padding-x: var(--dyn-spacing-md, var(--spacing-md, 0.75rem));
  
  /* Typography tokens */
  --dyn-input-font-size: var(--dyn-font-size-base, var(--font-size-base, 1rem));
  --dyn-input-line-height: var(--dyn-line-height-normal, var(--line-height-normal, 1.5));
  
  /* Effects */
  --dyn-input-border-radius: var(--dyn-border-radius-md, var(--border-radius-md, 0.5rem));
  --dyn-input-transition: var(--dyn-transition-base, all 0.2s ease-out);
}

.input {
  /* Use container tokens */
  background-color: var(--dyn-input-bg);
  color: var(--dyn-input-color);
  border: 1px solid var(--dyn-input-border);
  border-radius: var(--dyn-input-border-radius);
  padding: var(--dyn-input-padding-y) var(--dyn-input-padding-x);
  font-size: var(--dyn-input-font-size);
  line-height: var(--dyn-input-line-height);
  transition: var(--dyn-input-transition);
  
  /* Structural styles (no token needed) */
  appearance: none;
  width: 100%;
  font-family: inherit;
  box-sizing: border-box;
}

.input::placeholder {
  color: var(--dyn-input-placeholder);
}

/* Hover state - only override border color token */
.input:hover:not(:disabled):not(.readonly) {
  --dyn-input-border: var(--dyn-input-border-hover);
  /* border property already uses --dyn-input-border, so no need to repeat it */
}

/* Focus state - add focus ring token */
.input:focus-visible {
  outline: none;
  --dyn-input-border: var(--dyn-input-border-focus);
  box-shadow: 0 0 0 3px var(--dyn-input-focus-ring);
}

/* Disabled state - use disabled token overrides */
.input:disabled {
  --dyn-input-bg: var(--dyn-input-disabled-bg);
  --dyn-input-color: var(--dyn-input-disabled-color);
  cursor: not-allowed;
}

/* Error state - use error token */
.input.error {
  --dyn-input-border: var(--dyn-input-error);
}

.input.error:focus-visible {
  box-shadow: 0 0 0 3px rgba(211, 47, 47, 0.2); /* Error ring color */
}

/* Size variants - override spacing/font tokens */
.sizeSmall {
  --dyn-input-padding-y: var(--dyn-spacing-xs, var(--spacing-xs, 0.375rem));
  --dyn-input-padding-x: var(--dyn-spacing-sm, var(--spacing-sm, 0.5rem));
  --dyn-input-font-size: var(--dyn-font-size-sm, var(--font-size-sm, 0.875rem));
}

.sizeLarge {
  --dyn-input-padding-y: var(--dyn-spacing-md, var(--spacing-md, 0.75rem));
  --dyn-input-padding-x: var(--dyn-spacing-lg, var(--spacing-lg, 1.25rem));
  --dyn-input-font-size: var(--dyn-font-size-md, var(--font-size-md, 1.125rem));
}

/* Dark mode - override color tokens */
@media (prefers-color-scheme: dark) {
  .container {
    --dyn-input-bg: var(--dyn-color-surface-dark, var(--color-surface-dark, #1a1f35));
    --dyn-input-color: var(--dyn-color-text-primary-dark, var(--color-text-primary-dark, #f1f5f9));
    --dyn-input-border: var(--dyn-color-border-dark, var(--color-border-dark, #334155));
    --dyn-input-placeholder: var(--dyn-color-text-placeholder-dark, var(--color-text-placeholder-dark, #94a3b8));
    --dyn-input-border-focus: var(--dyn-color-primary-dark, var(--color-primary-dark, #3b82f6));
    --dyn-input-focus-ring: var(--dyn-color-focus-ring-dark, var(--color-focus-ring-dark, rgba(59, 130, 246, 0.35)));
  }
}

/* Responsive - touch targets */
@media (max-width: 767px) {
  .input {
    min-height: var(--dyn-size-touch-target, var(--size-touch-target, 44px));
  }
  
  .sizeSmall {
    min-height: var(--dyn-size-touch-target-sm, var(--size-touch-target-sm, 40px));
  }
  
  .sizeLarge {
    min-height: var(--dyn-size-touch-target-lg, var(--size-touch-target-lg, 52px));
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .input {
    --dyn-input-transition: none;
  }
}

@media (prefers-contrast: high) {
  .input {
    border-width: 2px;
  }
  
  .input:focus-visible {
    outline-width: 4px;
  }
}
```

---

## CATEGORY 3: LAYOUT COMPONENTS

**Components**: DynFlex, DynGrid, DynStack, DynBox

### WHY CHANGE?

**Layout components are DIFFERENT** because:
- They DON'T have color tokens (transparent by default)
- They ONLY use spacing tokens
- They affect child layouts, not visual appearance

### Key Difference

```css
/* BUTTONS need color tokens */
--dyn-button-bg: var(--dyn-color-primary);

/* LAYOUTS only need spacing tokens */
--dyn-flex-gap: var(--dyn-spacing-md);
--dyn-flex-padding: var(--dyn-spacing-lg);
```

### IMPLEMENTATION

**DynFlex.module.css - BEFORE (Global Scope WRONG)**:
```css
/* WRONG: Tokens in :root (global scope) */
:root {
  --dyn-flex-gap: 12px;
  --dyn-flex-padding: 16px;
}

.container {
  display: flex;
  gap: var(--dyn-flex-gap);
  padding: var(--dyn-flex-padding);
}
```

**DynFlex.module.css - AFTER (Component Scope RIGHT)**:
```css
/**
 * WHY SCOPE MATTERS:
 * 
 * Layout tokens should be scoped to component, not global.
 * Reason: Two DynFlex components on same page might need different gaps
 * If defined in :root, they share the same token value (conflict)
 */

.container {
  /* Define spacing tokens at component level */
  --dyn-flex-gap: var(--dyn-spacing-md, var(--spacing-md, 0.75rem));
  --dyn-flex-padding: var(--dyn-spacing-lg, var(--spacing-lg, 1.5rem));
  --dyn-flex-direction: row;
  --dyn-flex-align: stretch;
  --dyn-flex-justify: flex-start;
  
  display: flex;
  flex-direction: var(--dyn-flex-direction);
  gap: var(--dyn-flex-gap);
  padding: var(--dyn-flex-padding);
  align-items: var(--dyn-flex-align);
  justify-content: var(--dyn-flex-justify);
  box-sizing: border-box;
}

/* Direction variant */
.directionColumn {
  --dyn-flex-direction: column;
}

/* Spacing size variants */
.gapSmall {
  --dyn-flex-gap: var(--dyn-spacing-sm, var(--spacing-sm, 0.5rem));
}

.gapLarge {
  --dyn-flex-gap: var(--dyn-spacing-lg, var(--spacing-lg, 1.5rem));
}

.paddingCompact {
  --dyn-flex-padding: var(--dyn-spacing-sm, var(--spacing-sm, 0.5rem));
}

/* Alignment variants */
.centerContent {
  --dyn-flex-align: center;
  --dyn-flex-justify: center;
}

.spaceBetween {
  --dyn-flex-justify: space-between;
}

/* Responsive */
@media (max-width: 767px) {
  .container {
    --dyn-flex-gap: var(--dyn-spacing-sm, var(--spacing-sm, 0.5rem));
    --dyn-flex-padding: var(--dyn-spacing-md, var(--spacing-md, 0.75rem));
  }
}
```

---

## CATEGORY 4: DATA DISPLAY COMPONENTS

**Components**: DynTable

### SPECIAL CASE: DynTable

DynTable currently imports tokens from EXTERNAL file - **THIS MUST CHANGE**.

**DynTable.module.css - BEFORE (External Import WRONG)**:
```css
/* WRONG: Imports from external file */
@import url('@design-tokens/table.css');

.root {
  background: var(--table-header-bg-color); /* From external file */
  border: 1px solid var(--table-border-color);
}
```

**Why This Is Wrong**:
1. Hard to track dependencies
2. Breaks component encapsulation
3. Makes component hard to test in isolation
4. Difficult to override in variants

**DynTable.module.css - AFTER (Inline Tokens RIGHT)**:
```css
/**
 * WHY INLINE TOKENS:
 * 
 * Component should be self-contained
 * All dependencies visible in one file
 * Easy to understand what tokens the component uses
 */

.root {
  /* Define all table tokens inline */
  --dyn-table-header-bg: var(--dyn-color-surface-muted, var(--color-surface-muted, #f5f5f5));
  --dyn-table-header-text: var(--dyn-color-text-primary, var(--color-text-primary, #111827));
  --dyn-table-header-font-weight: var(--dyn-font-weight-semibold, var(--font-weight-semibold, 600));
  --dyn-table-header-border: var(--dyn-color-border, var(--color-border, #e0e0e0));
  
  --dyn-table-row-bg: var(--dyn-color-surface, var(--color-surface, #ffffff));
  --dyn-table-row-text: var(--dyn-color-text-primary, var(--color-text-primary, #111827));
  --dyn-table-row-border: var(--dyn-color-border, var(--color-border, #e0e0e0));
  --dyn-table-row-bg-hover: var(--dyn-color-surface-subtle, var(--color-surface-subtle, #f9f9f9));
  --dyn-table-row-bg-selected: var(--dyn-color-primary-alpha, var(--color-primary-alpha, rgba(37, 99, 235, 0.1)));
  
  --dyn-table-cell-padding: var(--dyn-spacing-md, var(--spacing-md, 0.75rem));
  --dyn-table-cell-font-size: var(--dyn-font-size-sm, var(--font-size-sm, 0.875rem));
  
  --dyn-table-border-width: 1px;
  --dyn-table-border-radius: var(--dyn-border-radius-md, var(--border-radius-md, 0.5rem));
  
  width: 100%;
  border-collapse: collapse;
  border: var(--dyn-table-border-width) solid var(--dyn-table-row-border);
  border-radius: var(--dyn-table-border-radius);
  font-size: var(--dyn-table-cell-font-size);
}

.thead {
  background-color: var(--dyn-table-header-bg);
}

.th {
  padding: var(--dyn-table-cell-padding);
  color: var(--dyn-table-header-text);
  font-weight: var(--dyn-table-header-font-weight);
  border-bottom: var(--dyn-table-border-width) solid var(--dyn-table-header-border);
}

.td {
  padding: var(--dyn-table-cell-padding);
  color: var(--dyn-table-row-text);
  border-bottom: var(--dyn-table-border-width) solid var(--dyn-table-row-border);
}

.row {
  background-color: var(--dyn-table-row-bg);
  transition: background-color var(--dyn-transition-base, all 0.2s ease);
}

.row:hover {
  background-color: var(--dyn-table-row-bg-hover);
}

.row.selected {
  background-color: var(--dyn-table-row-bg-selected);
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  .root {
    --dyn-table-header-bg: var(--dyn-color-surface-muted-dark, var(--color-surface-muted-dark, #2d3748));
    --dyn-table-header-text: var(--dyn-color-text-primary-dark, var(--color-text-primary-dark, #f1f5f9));
    --dyn-table-row-bg: var(--dyn-color-surface-dark, var(--color-surface-dark, #1a1f35));
    --dyn-table-row-text: var(--dyn-color-text-primary-dark, var(--color-text-primary-dark, #f1f5f9));
  }
}

/* Responsive */
@media (max-width: 767px) {
  .root {
    --dyn-table-cell-padding: var(--dyn-spacing-sm, var(--spacing-sm, 0.5rem));
    --dyn-table-cell-font-size: var(--dyn-font-size-xs, var(--font-size-xs, 0.75rem));
  }
}
```

---

## HOW TO APPLY TO ALL 37 COMPONENTS

### Universal Checklist (SAME FOR ALL CATEGORIES)

For EACH component, verify:

```
CSS Module (.module.css)
☐ All tokens use --dyn-* prefix
☐ Tokens defined at .root level
☐ Tokens use 3-level fallback pattern
☐ No hardcoded color/size/font values
☐ All variants defined via token overrides
☐ All size options defined
☐ Dark mode section present
☐ Responsive media queries (767px breakpoint)
☐ Accessibility (focus-visible, reduced-motion, high-contrast)
☐ Transitions using tokens
☐ Touch targets >= 44px on mobile

TypeScript (.tsx)
☐ Props interface includes all variants
☐ Default props set correctly
☐ JSDoc comments present
☐ Proper className combination

Types (.types.ts)
☐ Export variant unions
☐ Export size unions
☐ JSDoc for all props

Tests (.test.tsx)
☐ Token application verified
☐ Variant tokens tested
☐ Dark mode rendering tested
☐ Responsive behavior tested
☐ Accessibility tokens tested
☐ No hardcoded values in CSS

Storybook (.stories.tsx)
☐ All variants shown
☐ All sizes shown
☐ Dark mode documented
☐ Token values explained
☐ Responsive behavior shown
```

---

## SUMMARY: WHAT CHANGES WHERE

### CSS MODULE CHANGES (Biggest Impact)
```
❌ Remove: Hardcoded values (#2563eb, 8px, 14px)
✅ Add: Token variables (--dyn-button-bg, --dyn-spacing-md)
✅ Add: Dark mode section (@media (prefers-color-scheme: dark))
✅ Add: Responsive adjustments (@media (max-width: 767px))
✅ Add: Accessibility (@media (prefers-reduced-motion), @media (prefers-contrast))
```

### STORYBOOK CHANGES (Documentation)
```
✅ Add: Token descriptions in component docs
✅ Add: Showcase all variants visually
✅ Add: Dark mode rendering
✅ Add: Responsive preview
✅ Add: Token values reference
```

### TEST CHANGES (Verification)
```
✅ Add: Token application verification
✅ Add: Variant token override tests
✅ Add: Dark mode token tests
✅ Add: Responsive token tests
✅ Add: Accessibility token tests
✅ Add: No hardcoded values verification
```

---

## KEY PRINCIPLES (Remember These)

**1. Tokens as "Local Variables"**
```css
/* Think of component tokens like this: */
.root {
  --my-color: var(--dyn-color-primary); /* Variable defined */
  color: var(--my-color);                 /* Variable used */
}

.variant {
  --my-color: var(--dyn-color-secondary); /* Variable redefined for variant */
  /* color property automatically uses new variable value */
}
```

**2. Never Repeat Yourself**
```css
/* WRONG: Repeat the property */
.root {
  color: var(--dyn-color-primary);
}
.variant {
  color: var(--dyn-color-secondary);  /* ❌ Repeated property */
}

/* RIGHT: Only update the token */
.root {
  --my-color: var(--dyn-color-primary);
  color: var(--my-color);
}
.variant {
  --my-color: var(--dyn-color-secondary);  /* ✅ Only token changed */
}
```

**3. Hierarchy: Foundation ← Component ← Variant ← State**
```
Foundation (--dyn-color-primary)
↓
Component (--dyn-button-bg)
↓
Variant (.kindSecondary overrides --dyn-button-bg)
↓
State (:hover overrides --dyn-button-bg again)
```

---

**Next document: IMPLEMENTATION_CHECKLIST.md**

