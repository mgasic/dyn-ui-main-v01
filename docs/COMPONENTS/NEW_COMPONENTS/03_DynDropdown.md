# DynDropdown Component Specification (NEW)

**Priority**: 🟡 P1 - IMPORTANT (Week 4)  
**Effort**: 4 hours  
**Type**: Form/Selection  
**Status**: 🔴 MISSING - CREATE NEW

---

## PURPOSE

Reusable dropdown/select component for selecting from a list of options. Supports single/multi-select, searchable options, custom rendering, and keyboard navigation.

---

## FEATURES

### Core Functionality

- [ ] Single select mode
- [ ] Multi-select mode (checkboxes)
- [ ] Searchable options
- [ ] Option grouping
- [ ] Custom option rendering
- [ ] Keyboard navigation (arrow keys, Enter, ESC)
- [ ] Focus management
- [ ] Portal rendering (outside DOM)
- [ ] Auto-position (avoid edges)
- [ ] Disabled state
- [ ] Loading state
- [ ] Empty state message
- [ ] Clear selection button
- [ ] Tag display for multi-select
- [ ] Dark mode support
- [ ] Responsive design

---

## TOKEN DEFINITIONS

```
✅ --dyn-dropdown-bg              /* Background */
✅ --dyn-dropdown-border          /* Border */
✅ --dyn-dropdown-border-color    /* Border color */
✅ --dyn-dropdown-color           /* Text color */
✅ --dyn-dropdown-padding-y       /* Vertical padding */
✅ --dyn-dropdown-padding-x       /* Horizontal padding */
✅ --dyn-dropdown-font-size       /* Font size */
✅ --dyn-dropdown-border-radius   /* Border radius */
✅ --dyn-dropdown-shadow          /* Box shadow */
✅ --dyn-dropdown-focus-shadow    /* Focus shadow */
✅ --dyn-dropdown-z-index         /* Z-index (1300) */
✅ --dyn-dropdown-option-padding  /* Option padding */
✅ --dyn-dropdown-option-bg-hover /* Hover bg */
✅ --dyn-dropdown-option-bg-selected /* Selected bg */
✅ --dyn-dropdown-tag-bg          /* Tag background */
✅ --dyn-dropdown-tag-color       /* Tag text */
✅ --dyn-dropdown-max-height      /* List max height */
✅ --dyn-dropdown-transition      /* Animation */
```

---

## PROPS INTERFACE

```tsx
interface DropdownProps {
  /* Data */
  options: Array<{
    value: string | number;
    label: string;
    disabled?: boolean;
    group?: string;
  }>;
  
  /* Selection */
  value?: string | string[] | number | number[];
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
  
  /* UI */
  placeholder?: string;
  searchable?: boolean;
  clearable?: boolean;
  disabled?: boolean;
  loading?: boolean;
  
  /* Rendering */
  renderOption?: (option) => React.ReactNode;
  renderValue?: (selected) => React.ReactNode;
  
  /* Behavior */
  closeOnSelect?: boolean;  /* Default true for single */
  maxHeight?: string;
  maxTags?: number;  /* Multi-select max visible tags */
  
  /* Accessibility */
  label?: string;
  required?: boolean;
  error?: boolean;
  helperText?: string;
}
```

---

## VARIANTS

### Selection Mode
- [ ] `multiple={false}` (default) - Single select
- [ ] `multiple={true}` - Multi-select with checkboxes

### Features
- [ ] `searchable={true}` - Filter options by text
- [ ] `clearable={true}` - Clear selection button
- [ ] `disabled={true}` - Disabled state
- [ ] `loading={true}` - Loading indicator

### Display
- [ ] `maxTags={n}` - Show n tags, hide rest as "+n more"
- [ ] `renderOption={fn}` - Custom option rendering
- [ ] `renderValue={fn}` - Custom selected value display

---

## CSS STRUCTURE

```css
:root {
  --dyn-dropdown-bg: var(--dyn-color-surface, #ffffff);
  --dyn-dropdown-border: 1px solid var(--dyn-color-border, #d1d5db);
  --dyn-dropdown-color: var(--dyn-color-text, #1f2937);
  --dyn-dropdown-padding-y: var(--dyn-spacing-sm, 0.5rem);
  --dyn-dropdown-padding-x: var(--dyn-spacing-md, 0.75rem);
  --dyn-dropdown-font-size: var(--dyn-font-size-base, 1rem);
  --dyn-dropdown-border-radius: var(--dyn-radius-md, 0.5rem);
  --dyn-dropdown-shadow: var(--dyn-shadow-md);
  --dyn-dropdown-z-index: var(--dyn-z-index-dropdown, 1300);
  --dyn-dropdown-max-height: 300px;
  --dyn-dropdown-transition: all var(--dyn-transition-base, 200ms);
}

.dropdown {
  position: relative;
  display: inline-block;
  width: 100%;
}

.dropdownTrigger {
  display: flex;
  align-items: center;
  gap: var(--dyn-spacing-sm);
  background: var(--dyn-dropdown-bg);
  border: var(--dyn-dropdown-border);
  color: var(--dyn-dropdown-color);
  padding: var(--dyn-dropdown-padding-y) var(--dyn-dropdown-padding-x);
  border-radius: var(--dyn-dropdown-border-radius);
  cursor: pointer;
  transition: var(--dyn-dropdown-transition);
}

.dropdownTrigger:hover {
  border-color: var(--dyn-color-primary, #2563eb);
}

.dropdownTrigger:focus {
  outline: none;
  box-shadow: 0 0 0 3px var(--dyn-color-primary-light, rgba(37, 99, 235, 0.1));
}

/* Menu */
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

/* Options */
.dropdownOption {
  padding: var(--dyn-dropdown-option-padding);
  cursor: pointer;
  transition: var(--dyn-dropdown-transition);
  display: flex;
  align-items: center;
  gap: var(--dyn-spacing-sm);
}

.dropdownOption:hover {
  background-color: #f3f4f6;
}

.dropdownOptionSelected {
  background-color: var(--dyn-dropdown-option-bg-selected, #dbeafe);
  color: var(--dyn-color-primary, #2563eb);
  font-weight: 500;
}

.dropdownOptionDisabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* Tags (multi-select) */
.dropdownTag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: var(--dyn-dropdown-tag-bg, #dbeafe);
  color: var(--dyn-dropdown-tag-color, #1e40af);
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.dropdownTagRemove {
  cursor: pointer;
  font-weight: bold;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --dyn-dropdown-bg: var(--dyn-color-surface-dark, #1f2937);
    --dyn-dropdown-border: 1px solid #374151;
    --dyn-dropdown-color: var(--dyn-color-text-dark, #f9fafb);
  }
  
  .dropdownOption:hover {
    background-color: #374151;
  }
}
```

---

## REQUIREMENTS CHECKLIST

### CSS
- [ ] All tokens use `--dyn-dropdown-*`
- [ ] All values tokenized
- [ ] 3-level fallback
- [ ] Z-index correct (1300, below modal 1400)
- [ ] Portal rendering styling
- [ ] Multi-select tag styling
- [ ] Dark mode support
- [ ] Responsive sizing

### React Component
- [ ] Single select mode
- [ ] Multi-select mode
- [ ] Searchable filtering
- [ ] Keyboard navigation
  - Up/Down arrows
  - Enter to select
  - ESC to close
  - Tab to move focus
- [ ] Portal for menu
- [ ] Position calculation
- [ ] Focus management
- [ ] ARIA support

### Testing
- [ ] Single select works
- [ ] Multi-select works
- [ ] Search filtering works
- [ ] Keyboard navigation
- [ ] Opening/closing
- [ ] Custom rendering
- [ ] Disabled options
- [ ] Dark mode
- [ ] 80%+ coverage

### Storybook
- [ ] Basic single select
- [ ] Multi-select
- [ ] Searchable
- [ ] Grouped options
- [ ] Custom rendering
- [ ] Disabled options
- [ ] Loading state
- [ ] Empty state
- [ ] Dark mode
- [ ] Responsive

---

## AI VERIFICATION PROMPT

```
AI Task: Create DynDropdown per specification

File: docs/COMPONENTS/NEW_COMPONENTS/03_DynDropdown.md
Target: packages/dyn-ui-react/src/components/DynDropdown/

1. COMPONENT STRUCTURE
   - Single select works
   - Multi-select works
   - Search filtering works
   - Option grouping works

2. KEYBOARD SUPPORT
   - Arrow keys navigate
   - Enter selects
   - ESC closes
   - Tab moves focus

3. TOKEN VERIFICATION
   - All --dyn-dropdown-* tokens
   - 3-level fallback
   - Z-index 1300 (below modal)

4. PORTAL RENDERING
   - Menu rendered outside DOM
   - Position calculated correctly
   - Auto-position avoids edges

5. MULTI-SELECT
   - Checkboxes shown
   - Tags displayed
   - Max tags limiting
   - Remove tags

6. DARK MODE
   - Colors update
   - Contrast maintained
   - Tags visible

7. ACCESSIBILITY
   - ARIA roles
   - ARIA labels
   - Keyboard navigation
   - Focus visible

Output: Comprehensive verification report
```

---

## DELIVERABLES

### Files to Create
1. `packages/dyn-ui-react/src/components/DynDropdown/DynDropdown.tsx`
2. `packages/dyn-ui-react/src/components/DynDropdown/DynDropdown.types.ts`
3. `packages/dyn-ui-react/src/components/DynDropdown/DynDropdown.module.css`
4. `packages/dyn-ui-react/src/components/DynDropdown/DynDropdown.stories.tsx`
5. `packages/dyn-ui-react/src/components/DynDropdown/DynDropdown.test.tsx`
6. `packages/dyn-ui-react/src/components/DynDropdown/index.ts`
7. `packages/dyn-ui-react/src/components/DynDropdown/useDropdown.ts` (hook for logic)

### PR Checklist
- [ ] Both modes working (single, multi)
- [ ] Search/filtering
- [ ] Keyboard navigation
- [ ] Portal rendering
- [ ] Portal positioning
- [ ] Tags for multi-select
- [ ] Dark mode
- [ ] 80%+ coverage
- [ ] Commit: `feat(DynDropdown): create with token compliance`

---

**Status**: 🔴 MISSING - Create new  
**Effort**: 4 hours  
**Deadline**: Week 4 (by Jan 10)
