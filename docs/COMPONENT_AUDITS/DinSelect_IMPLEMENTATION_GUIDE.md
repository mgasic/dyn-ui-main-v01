# 🎨 DinSelect Implementation Guide

**Status**: Implementation Blueprint  
**Estimated Time**: 12-16 hours  
**Priority**: P1 - Essential Input Component  
**Date**: December 25, 2025  

---

## 🖺 PHASE 1: File Creation (1 hour)

### Step 1.1: Create Missing Files

```bash
# Navigate to DinSelect directory
cd packages/dyn-ui-react/src/components/DinSelect

# Create all missing files
touch DinSelect.tsx
touch DinSelect.types.ts
touch DinSelect.stories.tsx
touch DinSelect.test.tsx
touch index.ts

# Verify structure
ls -la
```

**Expected Output**:
```
DinSelect.module.css       (existing ✅)
DinSelect.tsx              (new)
DinSelect.types.ts         (new)
DinSelect.stories.tsx      (new)
DinSelect.test.tsx         (new)
index.ts                   (new)
```

---

## 📊 PHASE 2: TypeScript Types (1 hour)

### Step 2.1: Create `DinSelect.types.ts`

```typescript
/**
 * DinSelect Component Types
 * 
 * Defines all interfaces for the DinSelect component
 * Following DynUI standard patterns
 */

export interface DinSelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface DinSelectProps {
  /** Array of options to display */
  options: DinSelectOption[];
  
  /** Currently selected value */
  value?: string | number | null;
  
  /** Placeholder text when no option selected */
  placeholder?: string;
  
  /** Callback when option is selected */
  onChange?: (value: string | number) => void;
  
  /** Called when select loses focus */
  onBlur?: () => void;
  
  /** Called when select gains focus */
  onFocus?: () => void;
  
  /** Disable the select */
  disabled?: boolean;
  
  /** Show error state */
  error?: boolean;
  
  /** Show success state */
  success?: boolean;
  
  /** Helper text below select */
  helperText?: string;
  
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  
  /** Custom CSS class */
  className?: string;
  
  /** Unique identifier */
  id?: string;
  
  /** Name attribute */
  name?: string;
  
  /** Allow custom input (combobox mode) */
  searchable?: boolean;
  
  /** Allow multiple selections */
  multiple?: boolean;
  
  /** Max height of dropdown */
  maxHeight?: string | number;
  
  /** Custom icon for dropdown arrow */
  icon?: React.ReactNode;
  
  /** ARIA label */
  'aria-label'?: string;
  
  /** ARIA describedby */
  'aria-describedby'?: string;
  
  /** Data test ID */
  'data-testid'?: string;
}

export interface DinSelectState {
  isOpen: boolean;
  selectedValue: string | number | null;
  highlightedIndex: number;
  searchTerm: string;
}
```

---

## 👩 PHASE 3: React Component Implementation (6 hours)

### Step 3.1: Create `DinSelect.tsx`

```typescript
import React, { useRef, useState, useCallback, useEffect } from 'react';
import styles from './DinSelect.module.css';
import { DinSelectProps, DinSelectState } from './DinSelect.types';

/**
 * DinSelect Component
 * 
 * A fully accessible, keyboard-navigable select component
 * with design token compliance and dark mode support.
 * 
 * Features:
 * - Full keyboard navigation (arrows, enter, escape)
 * - ARIA attributes for accessibility (WCAG AA+)
 * - Dark mode support
 * - Size variants (small, medium, large)
 * - Error/success states
 * - Custom styling via tokens
 * 
 * @example
 * ```tsx
 * <DinSelect
 *   options={[
 *     { value: 'option1', label: 'Option 1' },
 *     { value: 'option2', label: 'Option 2' },
 *   ]}
 *   value={selected}
 *   onChange={setSelected}
 *   placeholder="Choose an option"
 * />
 * ```
 */
const DinSelect = React.forwardRef<HTMLDivElement, DinSelectProps>(
  (
    {
      options = [],
      value = null,
      placeholder = 'Select an option',
      onChange,
      onBlur,
      onFocus,
      disabled = false,
      error = false,
      success = false,
      helperText = '',
      size = 'medium',
      className = '',
      id,
      name,
      searchable = false,
      maxHeight = '300px',
      icon,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      'data-testid': dataTestId,
    },
    ref,
  ) => {
    // ============================================
    // State Management
    // ============================================
    
    const [state, setState] = useState<DinSelectState>({
      isOpen: false,
      selectedValue: value,
      highlightedIndex: -1,
      searchTerm: '',
    });

    const containerRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // ============================================
    // Synchronize External Value
    // ============================================
    
    useEffect(() => {
      setState(prev => ({
        ...prev,
        selectedValue: value,
      }));
    }, [value]);

    // ============================================
    // Get Selected Option Label
    // ============================================
    
    const selectedOption = options.find(opt => opt.value === state.selectedValue);
    const displayLabel = selectedOption?.label || placeholder;

    // ============================================
    // Handle Click Outside
    // ============================================
    
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setState(prev => ({ ...prev, isOpen: false }));
          onBlur?.();
        }
      };

      if (state.isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }
    }, [state.isOpen, onBlur]);

    // ============================================
    // Handle Toggle Dropdown
    // ============================================
    
    const handleToggle = useCallback(() => {
      if (disabled) return;
      
      setState(prev => {
        const newState = { ...prev, isOpen: !prev.isOpen, highlightedIndex: -1 };
        return newState;
      });

      if (!state.isOpen) {
        onFocus?.();
      }
    }, [disabled, state.isOpen, onFocus]);

    // ============================================
    // Handle Option Select
    // ============================================
    
    const handleSelectOption = useCallback(
      (optionValue: string | number) => {
        setState(prev => ({
          ...prev,
          selectedValue: optionValue,
          isOpen: false,
          searchTerm: '',
        }));
        onChange?.(optionValue);
        onBlur?.();
      },
      [onChange, onBlur],
    );

    // ============================================
    // Keyboard Navigation
    // ============================================
    
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (disabled) return;

        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault();
            setState(prev => {
              const newIndex = Math.min(prev.highlightedIndex + 1, options.length - 1);
              return { ...prev, isOpen: true, highlightedIndex: newIndex };
            });
            break;

          case 'ArrowUp':
            e.preventDefault();
            setState(prev => {
              const newIndex = Math.max(prev.highlightedIndex - 1, -1);
              return { ...prev, isOpen: true, highlightedIndex: newIndex };
            });
            break;

          case 'Enter':
            e.preventDefault();
            if (state.isOpen && state.highlightedIndex >= 0) {
              handleSelectOption(options[state.highlightedIndex].value);
            } else {
              handleToggle();
            }
            break;

          case 'Escape':
            e.preventDefault();
            setState(prev => ({ ...prev, isOpen: false }));
            onBlur?.();
            break;

          case ' ':
            if (!searchable) {
              e.preventDefault();
              handleToggle();
            }
            break;

          default:
            break;
        }
      },
      [disabled, state, options, searchable, handleToggle, handleSelectOption, onBlur],
    );

    // ============================================
    // CSS Classes
    // ============================================
    
    const containerClasses = [
      styles.selectContainer,
      state.isOpen && styles.open,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const selectClasses = [
      styles.select,
      size === 'small' && styles.selectSmall,
      size === 'large' && styles.selectLarge,
      error && styles.selectError,
      success && styles.selectSuccess,
      disabled && styles.selectDisabled,
    ]
      .filter(Boolean)
      .join(' ');

    const labelClasses = [
      styles.selectLabel,
      !selectedOption && styles.placeholder,
    ]
      .filter(Boolean)
      .join(' ');

    // ============================================
    // Render
    // ============================================
    
    return (
      <>
        <div
          ref={ref || containerRef}
          className={containerClasses}
          role="combobox"
          aria-expanded={state.isOpen}
          aria-haspopup="listbox"
          aria-label={ariaLabel || name}
          aria-describedby={ariaDescribedBy}
          data-testid={dataTestId}
        >
          {/* Select Trigger Button */}
          <button
            className={selectClasses}
            onClick={handleToggle}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            id={id}
            name={name}
            aria-controls="select-dropdown"
            type="button"
          >
            <span className={labelClasses}>{displayLabel}</span>
            <span className={styles.selectIcon} aria-hidden="true">
              {icon || ↑}
            </span>
          </button>

          {/* Dropdown Menu */}
          {state.isOpen && (
            <div
              ref={dropdownRef}
              className={styles.dropdown}
              role="listbox"
              id="select-dropdown"
              style={{ maxHeight }}
            >
              {options.map((option, index) => (
                <div
                  key={`${option.value}-${index}`}
                  className={[
                    styles.option,
                    option.disabled && styles.disabled,
                    option.value === state.selectedValue && styles.selected,
                    index === state.highlightedIndex && styles.highlighted,
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => !option.disabled && handleSelectOption(option.value)}
                  onMouseEnter={() =>
                    !option.disabled &&
                    setState(prev => ({ ...prev, highlightedIndex: index }))
                  }
                  role="option"
                  aria-selected={option.value === state.selectedValue}
                  aria-disabled={option.disabled}
                >
                  {option.value === state.selectedValue && (
                    <span className={styles.optionIndicator}>✓</span>
                  )}
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Helper Text */}
        {helperText && (
          <small
            className={styles.helperText}
            id={ariaDescribedBy}
            role="status"
          >
            {helperText}
          </small>
        )}
      </>
    );
  },
);

DinSelect.displayName = 'DinSelect';

export default DinSelect;
```

---

## 📄 PHASE 4: Exports & Index File (30 minutes)

### Step 4.1: Create `index.ts`

```typescript
/**
 * DinSelect Component Exports
 */

export { default as DinSelect } from './DinSelect';
export type { DinSelectProps, DinSelectOption, DinSelectState } from './DinSelect.types';
export { default as DinSelectStyles } from './DinSelect.module.css';
```

---

## 📈 PHASE 5: Storybook Documentation (2 hours)

### Step 5.1: Create `DinSelect.stories.tsx`

```typescript
import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import DinSelect from './DinSelect';
import { DinSelectProps } from './DinSelect.types';

const meta: Meta<typeof DinSelect> = {
  title: 'Components/Forms/DinSelect',
  component: DinSelect,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A fully accessible dropdown select component with design token compliance.',
      },
    },
  },
  argTypes: {
    value: {
      description: 'Currently selected value',
      control: 'text',
    },
    disabled: {
      description: 'Disable the select',
      control: 'boolean',
    },
    error: {
      description: 'Show error state',
      control: 'boolean',
    },
    success: {
      description: 'Show success state',
      control: 'boolean',
    },
    size: {
      description: 'Size variant',
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    placeholder: {
      description: 'Placeholder text',
      control: 'text',
    },
    helperText: {
      description: 'Helper text below select',
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4', disabled: true },
  { value: 'option5', label: 'Option 5' },
];

// ============================================
// Default Story
// ============================================

export const Default: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Select an option',
  },
  render: (args) => {
    const [value, setValue] = useState<string | number | null>(null);
    return (
      <DinSelect {...args} value={value} onChange={setValue} />
    );
  },
};

// ============================================
// Size Variants
// ============================================

export const SizeSmall: Story = {
  args: {
    options: defaultOptions,
    size: 'small',
    placeholder: 'Small select',
  },
  render: (args) => {
    const [value, setValue] = useState<string | number | null>(null);
    return (
      <DinSelect {...args} value={value} onChange={setValue} />
    );
  },
};

export const SizeLarge: Story = {
  args: {
    options: defaultOptions,
    size: 'large',
    placeholder: 'Large select',
  },
  render: (args) => {
    const [value, setValue] = useState<string | number | null>(null);
    return (
      <DinSelect {...args} value={value} onChange={setValue} />
    );
  },
};

// ============================================
// States
// ============================================

export const Disabled: Story = {
  args: {
    options: defaultOptions,
    disabled: true,
    placeholder: 'Disabled select',
  },
};

export const Error: Story = {
  args: {
    options: defaultOptions,
    error: true,
    placeholder: 'Error state',
    helperText: 'This field is required',
  },
  render: (args) => {
    const [value, setValue] = useState<string | number | null>(null);
    return (
      <DinSelect {...args} value={value} onChange={setValue} />
    );
  },
};

export const Success: Story = {
  args: {
    options: defaultOptions,
    success: true,
    placeholder: 'Success state',
    value: 'option1',
    helperText: 'Selection confirmed',
  },
};

// ============================================
// With Helper Text
// ============================================

export const WithHelperText: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Select an option',
    helperText: 'This is a helper text to guide the user',
  },
  render: (args) => {
    const [value, setValue] = useState<string | number | null>(null);
    return (
      <DinSelect {...args} value={value} onChange={setValue} />
    );
  },
};

// ============================================
// Controlled Component
// ============================================

export const ControlledComponent: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Controlled select',
    value: 'option2',
  },
  render: (args) => {
    const [value, setValue] = useState<string | number | null>('option2');
    return (
      <div>
        <DinSelect {...args} value={value} onChange={setValue} />
        <p>Selected value: {value}</p>
      </div>
    );
  },
};
```

---

## 🗪 PHASE 6: Unit Tests (4 hours)

### Step 6.1: Create `DinSelect.test.tsx`

```typescript
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DinSelect from './DinSelect';

const defaultOptions = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
];

describe('DinSelect', () => {
  // ============================================
  // Render Tests
  // ============================================

  test('renders select component', () => {
    render(
      <DinSelect options={defaultOptions} placeholder="Select..." />
    );
    expect(screen.getByText('Select...')).toBeInTheDocument();
  });

  test('renders with label', () => {
    render(
      <DinSelect
        options={defaultOptions}
        placeholder="Choose"
        aria-label="Test Select"
      />
    );
    expect(screen.getByLabelText('Test Select')).toBeInTheDocument();
  });

  // ============================================
  // Interaction Tests
  // ============================================

  test('opens dropdown on click', async () => {
    render(
      <DinSelect options={defaultOptions} placeholder="Select..." />
    );
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });
  });

  test('selects option on click', async () => {
    const handleChange = jest.fn();
    render(
      <DinSelect
        options={defaultOptions}
        placeholder="Select..."
        onChange={handleChange}
      />
    );
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    const option = screen.getByText('Option 1');
    fireEvent.click(option);
    
    expect(handleChange).toHaveBeenCalledWith('1');
  });

  // ============================================
  // Keyboard Navigation Tests
  // ============================================

  test('opens dropdown with Enter key', async () => {
    render(
      <DinSelect options={defaultOptions} placeholder="Select..." />
    );
    
    const button = screen.getByRole('button');
    button.focus();
    
    fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' });
    
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });
  });

  test('closes dropdown with Escape key', async () => {
    render(
      <DinSelect options={defaultOptions} placeholder="Select..." />
    );
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });
    
    fireEvent.keyDown(button, { key: 'Escape', code: 'Escape' });
    
    await waitFor(() => {
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });

  test('navigates options with arrow keys', async () => {
    render(
      <DinSelect options={defaultOptions} placeholder="Select..." />
    );
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    fireEvent.keyDown(button, { key: 'ArrowDown', code: 'ArrowDown' });
    fireEvent.keyDown(button, { key: 'ArrowDown', code: 'ArrowDown' });
    
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });
  });

  // ============================================
  // State Tests
  // ============================================

  test('disables select when disabled prop is true', () => {
    render(
      <DinSelect
        options={defaultOptions}
        placeholder="Select..."
        disabled={true}
      />
    );
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  test('shows error state', () => {
    render(
      <DinSelect
        options={defaultOptions}
        placeholder="Select..."
        error={true}
      />
    );
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('selectError');
  });

  test('shows success state', () => {
    render(
      <DinSelect
        options={defaultOptions}
        placeholder="Select..."
        success={true}
      />
    );
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('selectSuccess');
  });

  // ============================================
  // Helper Text Tests
  // ============================================

  test('displays helper text', () => {
    render(
      <DinSelect
        options={defaultOptions}
        placeholder="Select..."
        helperText="This is helpful"
      />
    );
    
    expect(screen.getByText('This is helpful')).toBeInTheDocument();
  });

  // ============================================
  // Accessibility Tests
  // ============================================

  test('has proper ARIA attributes', () => {
    render(
      <DinSelect
        options={defaultOptions}
        placeholder="Select..."
        aria-label="Test Select"
      />
    );
    
    const combobox = screen.getByRole('combobox');
    expect(combobox).toHaveAttribute('aria-haspopup', 'listbox');
    expect(combobox).toHaveAttribute('aria-expanded');
  });

  test('closes dropdown when clicking outside', async () => {
    render(
      <div>
        <DinSelect options={defaultOptions} placeholder="Select..." />
        <button>Outside</button>
      </div>
    );
    
    const select = screen.getByRole('button', { name: /Select\.\.\./ });
    fireEvent.click(select);
    
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });
    
    const outside = screen.getByRole('button', { name: 'Outside' });
    fireEvent.mouseDown(outside);
    
    await waitFor(() => {
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });
});
```

---

## ✅ PHASE 7: CSS Fixes (30 minutes)

### Step 7.1: Update `DinSelect.module.css`

Make the following changes to fix hardcoded values:

**Fix #1: Hardcoded Shadows**
```css
/* BEFORE */
--dyn-select-open-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
--dyn-select-dropdown-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);

/* AFTER */
--dyn-select-open-shadow: var(--dyn-shadow-lg, var(--legacy-shadow-lg, 0 10px 20px rgba(0, 0, 0, 0.1)));
--dyn-select-dropdown-shadow: var(--dyn-shadow-lg, var(--legacy-shadow-lg, 0 10px 20px rgba(0, 0, 0, 0.1)));
```

**Fix #2: Hardcoded Colors (Add RGB Variables)**
```css
/* Add to :root */
:root {
  /* ... existing tokens ... */
  
  /* RGB versions for opacity */
  --dyn-select-primary-rgb: 0, 122, 204;
  --dyn-select-danger-rgb: 220, 53, 69;
  --dyn-select-success-rgb: 40, 167, 69;
}

/* BEFORE */
--dyn-select-option-hover-bg: rgba(0, 122, 204, 0.1);
--dyn-select-option-selected-bg: rgba(0, 122, 204, 0.15);

/* AFTER */
--dyn-select-option-hover-bg: rgba(var(--dyn-select-primary-rgb), 0.1);
--dyn-select-option-selected-bg: rgba(var(--dyn-select-primary-rgb), 0.15);
```

---

## 🔍 VERIFICATION CHECKLIST

### File Structure
- [ ] `DinSelect.tsx` created
- [ ] `DinSelect.types.ts` created
- [ ] `DinSelect.stories.tsx` created
- [ ] `DinSelect.test.tsx` created
- [ ] `index.ts` created
- [ ] All files properly linked

### React Component
- [ ] Component renders correctly
- [ ] Props interface defined
- [ ] State management working
- [ ] Event handlers implemented
- [ ] All props working (onChange, onBlur, onFocus, etc.)

### Keyboard Navigation
- [ ] Arrow Up/Down working
- [ ] Enter to select
- [ ] Escape to close
- [ ] Space to toggle
- [ ] Tab focus management

### Accessibility (WCAG AA+)
- [ ] Focus visible on button
- [ ] Focus ring visible
- [ ] ARIA attributes present
- [ ] Keyboard navigation working
- [ ] Screen reader friendly
- [ ] Semantic HTML

### Styling
- [ ] Dark mode toggle works
- [ ] All size variants render
- [ ] Error state visible
- [ ] Success state visible
- [ ] Disabled state functional
- [ ] Helper text displays

### Testing
- [ ] Unit tests pass
- [ ] 80%+ code coverage
- [ ] All variants tested
- [ ] All states tested
- [ ] Keyboard navigation tested
- [ ] Accessibility tested

### CSS Token Compliance
- [ ] All hardcoded values removed
- [ ] RGB variables added
- [ ] 3-level fallback on all tokens
- [ ] Dark mode tokens updated
- [ ] No CSS errors

---

## 📚 TESTING COMMANDS

```bash
# Run tests
npm test -- DinSelect.test.tsx

# Run tests with coverage
npm test -- DinSelect.test.tsx --coverage

# Run Storybook
npm run storybook

# View component in Storybook
# Navigate to: Components/Forms/DinSelect

# Build component
npm run build

# Type check
npm run type-check
```

---

## 🔗 Next Steps After Implementation

1. **Rename to DynSelect** (optional, follows naming convention)
   - Rename folder `DinSelect` → `DynSelect`
   - Update all references
   - Create migration guide

2. **Comprehensive QA**
   - Manual testing in all browsers
   - Accessibility audit (WCAG AAA)
   - Performance testing
   - Dark mode verification

3. **Create Pull Request**
   - Branch: `feat/dinselect-implementation`
   - Include checklist from above
   - Include test results
   - Include Storybook screenshots

4. **Code Review**
   - Peer review
   - QA approval
   - Accessibility review

5. **Merge & Deploy**
   - Merge to main
   - Tag release
   - Update documentation

---

**Estimated Total Time**: 12-16 hours  
**Start Date**: When approved  
**Target Completion**: Within 2 weeks  

---

**Document Version**: 1.0  
**Status**: Ready for Implementation  
**Last Updated**: December 25, 2025
