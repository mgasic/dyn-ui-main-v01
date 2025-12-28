# DynSearchInput – Implementation Guide

## Component Overview

`DynSearchInput` is an enhanced text input designed for search use cases.  It provides instant feedback via a suggestions dropdown, supports keyboard navigation, and uses design tokens for styling and behaviour.  Key features include:

* **Live suggestions** – displays a dropdown list of suggestions as the user types; supports loading states and empty states.
* **Debounced input** – optional debouncing to reduce API calls or heavy filtering while the user types.
* **Selectable suggestions** – users can navigate suggestions via keyboard (arrow keys) and select one with Enter or click; selected suggestion triggers a callback.
* **Clearable** – optional clear button to reset the input and suggestions.
* **Size variants** – small, medium (default) and large sizes adjusting height and padding.
* **Icon support** – built‑in search icon and optional right‑side icon/button (e.g. clear or filter).
* **Accessibility** – proper `role="combobox"`, `aria-autocomplete="list"`, `aria-controls`, `aria-expanded`, `aria-activedescendant` attributes; listbox of suggestions uses `role="listbox"` and `role="option"` for items; keyboard navigation and screen‑reader announcements.
* **Dark mode and high contrast** – tokens adapt backgrounds, borders and text colours to different themes.

## Current State Analysis

`DynSearchInput` is currently **planned**; there is no existing implementation.  The component checklist notes that search inputs share the input token namespace (`--dyn-input-*`) and have variants **default** and **with‑suggestions**【943273054351528†L628-L643】.  We must design tokens, API and implementation to match Dyn UI patterns while extending the base input behaviour to provide suggestions.  Use `DynInput` as a baseline for styling and accessibility, then add suggestion list features.

### Required Tokens

Define the following tokens in `DynSearchInput.module.css` (using the `--dyn-search-input-*` prefix unless reusing `--dyn-input-*` is required) with a three‑level fallback:

* **Input tokens** – `--dyn-search-input-bg`, `--dyn-search-input-border-color`, `--dyn-search-input-border-radius`, `--dyn-search-input-padding-y`, `--dyn-search-input-padding-x`, `--dyn-search-input-placeholder-color`, `--dyn-search-input-icon-size` (size of the search icon), `--dyn-search-input-clear-icon-size`.
* **Suggestions dropdown** – `--dyn-search-input-dropdown-bg`, `--dyn-search-input-dropdown-border-color`, `--dyn-search-input-dropdown-shadow`, `--dyn-search-input-dropdown-max-height`, `--dyn-search-input-option-padding-y`, `--dyn-search-input-option-padding-x`, `--dyn-search-input-option-hover-bg`, `--dyn-search-input-option-active-bg`, `--dyn-search-input-option-selected-bg`, `--dyn-search-input-option-color`, `--dyn-search-input-option-disabled-color`.
* **Sizes** – tokens for small and large height/padding (`--dyn-search-input-height-sm`, `--dyn-search-input-height-lg`, etc.).
* **Transitions** – `--dyn-search-input-transition` for smooth show/hide of dropdown and focus/blur effects.
* **Dark mode overrides** – define dark equivalents for backgrounds, borders and text colours.

### Variants

`DynSearchInput` has two variants:

1. **Default** – acts as a standard text input without suggestions; inherits all props from `DynInput` but remains lean.
2. **With suggestions** – provides a dropdown of suggestions; includes props to control suggestions list, loading state, empty state and custom rendering.

## Implementation Instructions

### 1. File Structure

Create a new `DynSearchInput/` folder containing:

| File | Purpose |
| --- | --- |
| `DynSearchInput.tsx` | React component implementing the search input and suggestions dropdown. |
| `DynSearchInput.types.ts` | TypeScript interfaces for props and suggestion items. |
| `DynSearchInput.module.css` | CSS module defining tokens, base styling and dropdown. |
| `DynSearchInput.stories.tsx` | Storybook stories demonstrating usage scenarios. |
| `DynSearchInput.test.tsx` | Jest tests covering typing, debouncing, suggestion selection and accessibility. |
| `index.ts` | Re‑exports component and types. |

### 2. API Design

Define the following interfaces in `DynSearchInput.types.ts`:

```ts
export interface DynSearchSuggestion<T = any> {
  /** Unique identifier for the suggestion item. */
  id: string | number;
  /** Display label for the suggestion. */
  label: string;
  /** Optional underlying value/data associated with the suggestion. */
  value?: T;
  /** If true, the suggestion is disabled and not selectable. */
  disabled?: boolean;
}

export interface DynSearchInputProps<T = any> {
  /** Current input value (controlled). */
  value?: string;
  /** Default value (uncontrolled). */
  defaultValue?: string;
  /** Handler called when the input value changes. */
  onChange?: (value: string) => void;
  /** List of suggestions to display. */
  suggestions?: DynSearchSuggestion<T>[];
  /** Handler called when a suggestion is selected. */
  onSelectSuggestion?: (suggestion: DynSearchSuggestion<T>) => void;
  /** Whether suggestions are loading; shows a spinner or loading text. */
  loading?: boolean;
  /** Message to display when there are no suggestions. */
  emptyMessage?: string;
  /** Delay in milliseconds before invoking onChange (debouncing). */
  debounceTime?: number;
  /** Size of the input: 'sm', 'md' (default) or 'lg'. */
  size?: 'sm' | 'md' | 'lg';
  /** Placeholder text. */
  placeholder?: string;
  /** If true, shows a clear button when there is a value. */
  clearable?: boolean;
  /** Disables the input and suggestions. */
  disabled?: boolean;
  /** Additional class names. */
  className?: string;
  /** Inline styles. */
  style?: React.CSSProperties;
}
```

### 3. React Implementation (`DynSearchInput.tsx`)

* Use `forwardRef<HTMLInputElement, DynSearchInputProps>` to forward a ref to the underlying input element.
* Manage local state for uncontrolled `value` and for tracking the index of the highlighted suggestion.  Use a debouncing utility or `useEffect` to delay calls to `onChange` based on `debounceTime`.
* Render a container with the input and optional left/right icons.  Apply size classes (`searchInput--sm`, `searchInput--lg`) to adjust height and padding via tokens.
* When `suggestions` are provided and the input is focused, display a dropdown list with `role="listbox"` inside a portal or absolutely positioned container.  Each suggestion renders with `role="option"`, `aria-selected` (true when highlighted) and `aria-disabled` when disabled.  Use tokens for spacing, hover and active states.
* Implement keyboard navigation: up/down arrows change the highlighted index; Enter selects the highlighted suggestion and calls `onSelectSuggestion`; Escape closes the dropdown.  When `clearable` is true, display a clear icon on the right; clicking it resets the input and triggers `onChange` with an empty string.
* Set ARIA attributes on the input: `role="combobox"`, `aria-autocomplete="list"`, `aria-expanded` when the dropdown is open, `aria-controls` referencing the listbox id, `aria-activedescendant` referencing the highlighted option id.  Provide `aria-label` or `aria-labelledby` for accessibility.
* Handle focus and blur events to open/close the dropdown appropriately.  Prevent closing when clicking inside the dropdown by using event.stopPropagation() or similar.

### 4. CSS Module (`DynSearchInput.module.css`)

Use the defined tokens to style the input and dropdown:

```css
.searchInput {
  width: 100%;
  position: relative;
  display: inline-flex;
  align-items: center;
  background: var(--dyn-search-input-bg, var(--dyn-input-bg, #fff));
  border: 1px solid var(--dyn-search-input-border-color, var(--dyn-input-border-color, #d1d5db));
  border-radius: var(--dyn-search-input-border-radius, var(--dyn-input-border-radius, 0.375rem));
  padding: var(--dyn-search-input-padding-y, 0.5rem) var(--dyn-search-input-padding-x, 0.75rem);
  color: var(--dyn-search-input-text-color, var(--dyn-input-text-color, #374151));
  transition: var(--dyn-search-input-transition, border-color 0.2s ease, box-shadow 0.2s ease);
}

/* Size modifiers */
.searchInput--sm {
  padding: calc(var(--dyn-search-input-padding-y, 0.5rem) * 0.75) calc(var(--dyn-search-input-padding-x, 0.75rem) * 0.75);
}
.searchInput--lg {
  padding: calc(var(--dyn-search-input-padding-y, 0.5rem) * 1.25) calc(var(--dyn-search-input-padding-x, 0.75rem) * 1.25);
}

/* Input element */
.searchField {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: inherit;
  font: inherit;
  min-width: 0;
}

/* Icon sizes */
.searchIcon {
  width: var(--dyn-search-input-icon-size, 1rem);
  height: var(--dyn-search-input-icon-size, 1rem);
  margin-right: 0.5rem;
}
.clearIcon {
  width: var(--dyn-search-input-clear-icon-size, 0.75rem);
  height: var(--dyn-search-input-clear-icon-size, 0.75rem);
  margin-left: 0.5rem;
  cursor: pointer;
}

/* Dropdown */
.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1000;
  background: var(--dyn-search-input-dropdown-bg, #fff);
  border: 1px solid var(--dyn-search-input-dropdown-border-color, #d1d5db);
  box-shadow: var(--dyn-search-input-dropdown-shadow, 0 4px 8px rgba(0,0,0,0.1));
  max-height: var(--dyn-search-input-dropdown-max-height, 15rem);
  overflow-y: auto;
  border-radius: var(--dyn-search-input-border-radius, var(--dyn-input-border-radius, 0.375rem));
  margin-top: 0.25rem;
}

.dropdownItem {
  padding: var(--dyn-search-input-option-padding-y, 0.5rem) var(--dyn-search-input-option-padding-x, 0.75rem);
  cursor: pointer;
  color: var(--dyn-search-input-option-color, #374151);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.dropdownItem:hover:not(.dropdownItem--disabled),
.dropdownItem--active {
  background: var(--dyn-search-input-option-hover-bg, #f3f4f6);
}
.dropdownItem--selected {
  background: var(--dyn-search-input-option-selected-bg, #e5e7eb);
}
.dropdownItem--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :where(.searchInput) {
    --dyn-search-input-bg: var(--dyn-color-gray-800, #1f2937);
    --dyn-search-input-border-color: var(--dyn-color-gray-700, #374151);
    --dyn-search-input-text-color: var(--dyn-color-gray-100, #f3f4f6);
    --dyn-search-input-dropdown-bg: var(--dyn-color-gray-800, #1f2937);
    --dyn-search-input-dropdown-border-color: var(--dyn-color-gray-700, #374151);
    --dyn-search-input-option-color: var(--dyn-color-gray-100, #f3f4f6);
    --dyn-search-input-option-hover-bg: var(--dyn-color-gray-700, #374151);
    --dyn-search-input-option-selected-bg: var(--dyn-color-gray-600, #4b5563);
  }
}

/* High contrast */
@media (forced-colors: active) {
  .searchInput {
    border-color: ButtonText;
    background: Field;
  }
  .dropdown {
    border-color: ButtonText;
    background: Field;
  }
  .dropdownItem--active,
  .dropdownItem--selected {
    background: Highlight;
    color: HighlightText;
  }
}
```

### 5. Storybook Stories

Create stories covering:

1. **Default** – basic search input without suggestions.
2. **With suggestions** – search input showing filtered suggestions as the user types; include a loading state and empty state demonstration.
3. **Debounced** – input with a debounce delay; show how results appear after a delay.
4. **Clearable** – input with clear button; demonstrates clearing value and resetting suggestions.
5. **Sizes** – display small, medium and large inputs.
6. **Disabled** – search input disabled; suggestions not displayed.
7. **Dark mode** – demonstrate the component under dark‑mode theme.

### 6. Unit Tests

Write tests that cover:

* Controlled and uncontrolled input value behaviour.
* Debouncing: ensure `onChange` is called after the specified delay and not before.
* Suggestions dropdown: opens when there are suggestions and closes on blur or selection; arrow keys and Enter navigate/select suggestions; disabled suggestions are skipped.
* Clear button: appears only when `clearable` and `value` are truthy; clicking it resets the value.
* ARIA attributes: verify `role="combobox"`, `aria-autocomplete`, `aria-expanded`, `aria-controls`, `aria-activedescendant` and proper roles for listbox and options.
* Dark mode and high contrast: snapshot tests verify token changes.

### 7. Export

Export the component and types from `index.ts`:

```ts
export { DynSearchInput } from './DynSearchInput';
export type { DynSearchInputProps, DynSearchSuggestion } from './DynSearchInput.types';
```

## Validation Checklist

- [ ] **Token compliance** – All visual properties (colours, borders, padding, spacing, dropdown, icons) use `--dyn-search-input-*` (or shared `--dyn-input-*`) tokens with three‑level fallback.
- [ ] **Variants** – Default and with‑suggestions variants implemented; sizes small/medium/large supported; clearable and debounced options available.
- [ ] **Accessibility** – Implements combobox pattern with proper ARIA attributes; suggestions accessible via keyboard; labelled for screen readers; dark mode and high contrast support.
- [ ] **Tests** – Comprehensive tests cover typing, debouncing, suggestion selection, keyboard navigation, clear button and ARIA attributes.
- [ ] **Documentation** – Storybook stories demonstrate all variants, sizes, loading and empty states, clearable input and dark mode; props are documented with JSDoc.
- [ ] **Exports** – Component and types exported from `index.ts`.