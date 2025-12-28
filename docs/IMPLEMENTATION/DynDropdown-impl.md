# DynDropdown – Implementation Guide

## Component Overview

DynDropdown is an advanced select component supporting both single and multiple selection.  It provides a searchable list of options with optional grouping, custom rendering hooks and full keyboard navigation.  The component renders its menu in a portal and automatically positions it to avoid viewport edges.  It supports disabled and loading states, displays selected items as tags when using multi‑select and provides a clear selection button.  The dropdown integrates with form fields through an accessible label, helper text and error state.

## Current State Analysis

**Existing files:** none.  There is no `DynDropdown` implementation in the repository.

**Identified gaps:**

- React component, TypeScript types, custom hook, CSS module, tests and stories need to be created.
- The component must implement both single and multi‑select modes with a searchable input and optional grouping.
- Portal rendering and auto‑positioning are not available.
- Design tokens such as `--dyn-dropdown-bg`, `--dyn-dropdown-border` and others listed in the specification are not defined in a component‑scoped CSS module【911863440239002†L38-L58】.
- Keyboard navigation (arrow keys, Enter, ESC, Tab) and focus management logic need to be implemented.
- Multi‑select tag display and clear button functionality require careful design and testing.

## Implementation Instructions

### 1. Code Structure

1. **Create a new directory** `packages/dyn-ui-react/src/components/DynDropdown/`.
2. Add the following files:
   - `DynDropdown.tsx` – main component for UI rendering.
   - `DynDropdown.types.ts` – defines option and props types.
   - `DynDropdown.module.css` – CSS module for tokens and styling.
   - `useDropdown.ts` – custom hook encapsulating state and behaviour.
   - `DynDropdown.stories.tsx` – Storybook stories.
   - `DynDropdown.test.tsx` – unit and integration tests.
   - `index.ts` – exports the component and types.

### 2. Define Types

In `DynDropdown.types.ts` define the option type and props interface.  Example:

```ts
// File: packages/dyn-ui-react/src/components/DynDropdown/DynDropdown.types.ts
export interface DynDropdownOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  group?: string;
}

export interface DynDropdownProps {
  /** Array of option objects */
  options: DynDropdownOption[];
  /** Selected value(s) */
  value?: string | number | Array<string | number>;
  /** Callback fired when the selection changes */
  onChange: (value: string | string[] | number | number[]) => void;
  /** Enable multi‑select mode */
  multiple?: boolean;
  /** Show a search input to filter options */
  searchable?: boolean;
  /** Show a button to clear the selection */
  clearable?: boolean;
  /** Disable the entire component */
  disabled?: boolean;
  /** Show loading indicator instead of options */
  loading?: boolean;
  /** Placeholder text when no value is selected */
  placeholder?: string;
  /** Custom renderer for each option */
  renderOption?: (option: DynDropdownOption, selected: boolean) => React.ReactNode;
  /** Custom renderer for the selected value(s) */
  renderValue?: (value: string | string[]) => React.ReactNode;
  /** Close the menu when selecting an option (default true in single‑select) */
  closeOnSelect?: boolean;
  /** Maximum height for the options menu (e.g. `200px`) */
  maxHeight?: string;
  /** Maximum number of tags visible in multi‑select mode */
  maxTags?: number;
  /** Accessibility label */
  label?: string;
  /** Mark field as required */
  required?: boolean;
  /** Display error styling */
  error?: boolean;
  /** Helper text below the trigger */
  helperText?: string;
  /** Additional className for custom styling */
  className?: string;
}
```

### 3. Create a Custom Hook

The interaction logic can be encapsulated in `useDropdown.ts`.  The hook should manage open/close state, selected values, search text, filtered options, keyboard navigation index and focus management.  It should expose functions to toggle the menu, select/deselect options, handle key events, clear selection and compute menu positioning for auto‑positioning.

Example outline:

```ts
// File: packages/dyn-ui-react/src/components/DynDropdown/useDropdown.ts
import { useState, useRef, useEffect } from 'react';
import type { DynDropdownProps, DynDropdownOption } from './DynDropdown.types';

export function useDropdown(props: DynDropdownProps) {
  const { options, value, onChange, multiple = false, closeOnSelect = !multiple } = props;
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [highlightIndex, setHighlightIndex] = useState(0);
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  // Compute filtered options based on search
  const filtered = options.filter(o => o.label.toLowerCase().includes(search.toLowerCase()));

  // Toggle open state and reset highlight
  const toggleOpen = () => {
    setOpen(prev => !prev);
    setHighlightIndex(0);
    setSearch('');
  };

  // Handle selection
  const selectOption = (option: DynDropdownOption) => {
    if (option.disabled) return;
    if (multiple) {
      const current = Array.isArray(value) ? value : [];
      const exists = current.includes(option.value);
      const newValues = exists ? current.filter(v => v !== option.value) : [...current, option.value];
      onChange(newValues);
    } else {
      onChange(option.value);
      if (closeOnSelect) setOpen(false);
    }
  };

  // Keyboard navigation (up/down, enter, esc)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightIndex(i => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const option = filtered[highlightIndex];
      if (option) selectOption(option);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  // Return state and handlers
  return {
    open,
    setOpen,
    search,
    setSearch,
    filtered,
    highlightIndex,
    setHighlightIndex,
    toggleOpen,
    selectOption,
    handleKeyDown,
    triggerRef,
    menuRef,
  };
}
```

### 4. Implement the Component

Use the hook in `DynDropdown.tsx` to render the trigger and menu.  The trigger should display the selected value(s) or placeholder and handle click, focus and keyboard events.  The menu should be rendered into a portal (e.g. `document.body`) and positioned below the trigger.  The component should support tags for multi‑select mode and a clear button when `clearable` is true.

Outline skeleton:

```tsx
// File: packages/dyn-ui-react/src/components/DynDropdown/DynDropdown.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import type { DynDropdownProps, DynDropdownOption } from './DynDropdown.types';
import { useDropdown } from './useDropdown';
import styles from './DynDropdown.module.css';

export const DynDropdown: React.FC<DynDropdownProps> = (props) => {
  const {
    open,
    search,
    setSearch,
    filtered,
    highlightIndex,
    toggleOpen,
    selectOption,
    handleKeyDown,
    triggerRef,
    menuRef,
  } = useDropdown(props);
  const {
    options,
    value,
    multiple = false,
    searchable = false,
    clearable = false,
    disabled = false,
    loading = false,
    placeholder = 'Select…',
    renderOption,
    renderValue,
    maxHeight,
    maxTags,
    className,
  } = props;

  // Render selected value or tags
  const renderSelected = () => {
    if (renderValue) return renderValue(value as any);
    if (multiple) {
      const selectedValues = Array.isArray(value) ? value : [];
      return selectedValues.slice(0, maxTags ?? selectedValues.length).map((val, index) => {
        const opt = options.find(o => o.value === val);
        if (!opt) return null;
        return (
          <span key={opt.value} className={styles.dropdownTag}>
            {opt.label}
            <span
              className={styles.dropdownTagRemove}
              onClick={e => {
                e.stopPropagation();
                selectOption(opt);
              }}
            >×</span>
          </span>
        );
      });
    }
    const selected = options.find(o => o.value === value);
    return selected ? selected.label : placeholder;
  };

  // Menu element
  const menu = open && (
    <ul
      className={`${styles.dropdownMenu} ${styles.dropdownMenuOpen}`}
      ref={menuRef}
      role="listbox"
      style={{ maxHeight }}
    >
      {loading ? (
        <li className={styles.dropdownLoading}>Loading…</li>
      ) : filtered.length === 0 ? (
        <li className={styles.dropdownEmpty}>No options</li>
      ) : (
        filtered.map((option: DynDropdownOption, index) => {
          const selected = multiple
            ? Array.isArray(value) && (value as any).includes(option.value)
            : value === option.value;
          return (
            <li
              key={option.value}
              role="option"
              aria-selected={selected}
              className={
                `${styles.dropdownOption} ${selected ? styles.dropdownOptionSelected : ''} ${option.disabled ? styles.dropdownOptionDisabled : ''}`
              }
              onClick={() => selectOption(option)}
              onMouseEnter={() => props.searchable && setSearch('')} // reset search highlight
            >
              {renderOption ? renderOption(option, selected) : option.label}
            </li>
          );
        })
      )}
    </ul>
  );

  return (
    <div
      className={`${styles.dropdown} ${disabled ? styles.dropdownDisabled : ''} ${className ?? ''}`}
      ref={triggerRef as any}
      tabIndex={0}
      role="combobox"
      aria-expanded={open}
      aria-haspopup="listbox"
      aria-disabled={disabled}
      aria-required={props.required}
      onClick={() => !disabled && toggleOpen()}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.dropdownTrigger}>
        {renderSelected()}
        {clearable && !multiple && value && (
          <button
            type="button"
            className={styles.dropdownClear}
            onClick={e => {
              e.stopPropagation();
              props.onChange('');
            }}
          >×</button>
        )}
      </div>
      {searchable && open && (
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className={styles.dropdownSearch}
          autoFocus
        />
      )}
      {ReactDOM.createPortal(menu, document.body)}
      {props.helperText && <p className={styles.dropdownHelper}>{props.helperText}</p>}
    </div>
  );
};

DynDropdown.displayName = 'DynDropdown';
export default DynDropdown;
```

### 5. CSS Module

Define tokens and classes in `DynDropdown.module.css` according to the specification【911863440239002†L124-L247】.  Scope tokens under `.dropdown` and define transitions, colours and spacing with 3‑level fallbacks:

```css
/* File: packages/dyn-ui-react/src/components/DynDropdown/DynDropdown.module.css */
.dropdown {
  --dyn-dropdown-bg: var(--dyn-color-surface, var(--legacy-color-surface, #ffffff));
  --dyn-dropdown-border: 1px solid var(--dyn-color-border, var(--legacy-color-border, #d1d5db));
  --dyn-dropdown-color: var(--dyn-color-text, var(--legacy-color-text, #1f2937));
  --dyn-dropdown-padding-y: var(--dyn-spacing-sm, var(--legacy-spacing-sm, 0.5rem));
  --dyn-dropdown-padding-x: var(--dyn-spacing-md, var(--legacy-spacing-md, 0.75rem));
  --dyn-dropdown-font-size: var(--dyn-font-size-base, var(--legacy-font-size-base, 1rem));
  --dyn-dropdown-border-radius: var(--dyn-radius-md, var(--legacy-radius-md, 0.5rem));
  --dyn-dropdown-shadow: var(--dyn-shadow-md, var(--legacy-shadow-md, 0 4px 6px rgba(0,0,0,0.1)));
  --dyn-dropdown-focus-shadow: 0 0 0 3px var(--dyn-color-primary-light, var(--legacy-color-primary-light, rgba(37,99,235,0.1)));
  --dyn-dropdown-z-index: var(--dyn-z-index-dropdown, 1300);
  --dyn-dropdown-option-padding: var(--dyn-spacing-sm, var(--legacy-spacing-sm, 0.5rem));
  --dyn-dropdown-option-bg-hover: var(--dyn-color-neutral-100, var(--legacy-color-neutral-100, #f3f4f6));
  --dyn-dropdown-option-bg-selected: var(--dyn-color-primary-light, var(--legacy-color-primary-light, #dbeafe));
  --dyn-dropdown-tag-bg: var(--dyn-color-primary-light, var(--legacy-color-primary-light, #dbeafe));
  --dyn-dropdown-tag-color: var(--dyn-color-primary-dark, var(--legacy-color-primary-dark, #1e40af));
  --dyn-dropdown-max-height: 300px;
  --dyn-dropdown-transition: var(--dyn-transition-base, var(--legacy-transition-base, 200ms)) all;
  position: relative;
  display: inline-block;
  width: 100%;
}

.dropdownTrigger {
  display: flex;
  align-items: center;
  gap: var(--dyn-spacing-xs, 0.25rem);
  background: var(--dyn-dropdown-bg);
  border: var(--dyn-dropdown-border);
  color: var(--dyn-dropdown-color);
  padding: var(--dyn-dropdown-padding-y) var(--dyn-dropdown-padding-x);
  border-radius: var(--dyn-dropdown-border-radius);
  cursor: pointer;
  font-size: var(--dyn-dropdown-font-size);
  transition: var(--dyn-dropdown-transition);
}

.dropdownTrigger:hover {
  border-color: var(--dyn-color-primary, var(--legacy-color-primary, #2563eb));
}

.dropdownTrigger:focus {
  outline: none;
  box-shadow: var(--dyn-dropdown-focus-shadow);
}

.dropdownMenu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--dyn-dropdown-bg);
  border: var(--dyn-dropdown-border);
  border-radius: var(--dyn-dropdown-border-radius);
  box-shadow: var(--dyn-dropdown-shadow);
  z-index: var(--dyn-dropdown-z-index);
  max-height: var(--dyn-dropdown-max-height);
  overflow-y: auto;
  margin-top: 4px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-8px);
  transition: var(--dyn-dropdown-transition);
}

.dropdownMenuOpen {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdownOption {
  padding: var(--dyn-dropdown-option-padding);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: var(--dyn-spacing-xs, 0.25rem);
  transition: var(--dyn-dropdown-transition);
}
.dropdownOption:hover {
  background-color: var(--dyn-dropdown-option-bg-hover);
}
.dropdownOptionSelected {
  background-color: var(--dyn-dropdown-option-bg-selected);
  color: var(--dyn-color-primary, var(--legacy-color-primary, #2563eb));
  font-weight: 500;
}
.dropdownOptionDisabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.dropdownTag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: var(--dyn-dropdown-tag-bg);
  color: var(--dyn-dropdown-tag-color);
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
}
.dropdownTagRemove {
  cursor: pointer;
  font-weight: bold;
}

.dropdownSearch {
  width: 100%;
  padding: var(--dyn-spacing-xs, 0.25rem) var(--dyn-spacing-sm, 0.5rem);
  border: none;
  border-bottom: var(--dyn-dropdown-border);
  outline: none;
}

.dropdownClear {
  background: transparent;
  border: none;
  cursor: pointer;
  margin-left: auto;
  font-weight: bold;
  padding: 0;
}

.dropdownHelper {
  font-size: 0.875rem;
  color: var(--dyn-color-neutral-600, var(--legacy-color-neutral-600, #6b7280));
  margin-top: 4px;
}

.dropdownDisabled {
  opacity: 0.5;
  pointer-events: none;
}

@media (prefers-color-scheme: dark) {
  .dropdown {
    --dyn-dropdown-bg: var(--dyn-color-surface-dark, var(--legacy-color-surface-dark, #1f2937));
    --dyn-dropdown-border: 1px solid var(--dyn-color-border-dark, var(--legacy-color-border-dark, #374151));
    --dyn-dropdown-color: var(--dyn-color-text-dark, var(--legacy-color-text-dark, #f9fafb));
    --dyn-dropdown-option-bg-hover: var(--dyn-color-neutral-700, var(--legacy-color-neutral-700, #374151));
  }
}

@media (prefers-reduced-motion: reduce) {
  .dropdownMenu { transition: none; }
}
```

### 6. Testing

Tests should cover:

- Rendering single and multi‑select modes and verifying state updates on selection.
- Filtering of options when `searchable` is enabled.
- Keyboard navigation: arrow keys cycle through options, Enter selects, ESC closes and Tab moves focus.
- Portal rendering of the menu and correct cleanup on unmount.
- Multi‑select tag display, removal and `maxTags` truncation.
- Disabled and loading states.
- Dark‑mode styling by mocking `matchMedia`.
- Accessibility attributes (`role="combobox"`, `aria-expanded`, `aria-disabled`, etc.).

### 7. Storybook

Demonstrate scenarios in `DynDropdown.stories.tsx`:

- Basic single select with placeholder and a list of options.
- Multi‑select with tags and clear button.
- Searchable dropdown filtering results.
- Grouped options using custom rendering.
- Disabled and loading states.
- Custom rendering of options and values.
- Dark‑mode view and responsive layout.

### 8. Git Workflow

- Branch: `feat/component-dyndropdown`.
- Commit messages may include:
  - `feat(DynDropdown): implement single and multi select modes`.
  - `feat(DynDropdown): add search, clear and tags support`.
  - `style(DynDropdown): define tokens and responsive styles`.
  - `test(DynDropdown): add keyboard navigation tests`.
- After code, tests and stories are complete, open a PR referencing the DynDropdown specification and this guide.

### 9. Validation Checklist

- [ ] All tokens start with `--dyn-dropdown-` and include 3‑level fallbacks.
- [ ] Component supports both single and multi‑select modes with proper state management.
- [ ] Search, clear and tag features work as specified.
- [ ] Keyboard navigation (arrow keys, Enter, ESC, Tab) is implemented.
- [ ] Menu renders in a portal and auto‑positions relative to the trigger.
- [ ] Custom rendering functions for options and values are supported.
- [ ] Dark‑mode overrides and reduced‑motion rules implemented.
- [ ] Tests and stories cover all variants and behaviours.
- [ ] Component, hook and types exported from `index.ts`.