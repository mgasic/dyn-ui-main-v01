# 📚 WEEK 6 - Documentation & Team Training Plan

**Status:** 🔴 Ready for Week 6 (After P1 QA)  
**Duration:** 1 Week (Nedelja 6)  
**Target:** Complete documentation + Team trained

---

## 📊 Overview

After P1 QA phase completes and all 5 PRs are merged to `main`, Week 6 focuses on:

1. **README Documentation** (2 hours)
2. **Token Registry** (2 hours)
3. **Migration Guide** (1.5 hours)
4. **Team Training** (2 hours)
5. **Project Wrap-up** (1.5 hours)

**Total:** 9 hours

---

## 💫 Task 1: README Documentation (2 hours)

### 1.1 Component README Files (1.5 hours)

Create `/packages/dyn-ui-react/src/components/{Component}/README.md` for each:

#### DinInput/README.md
```markdown
# DinInput Component

## Overview
Text input field using shared Input family tokens.

## Features
- Text input with placeholder support
- Error and success states
- Clear button functionality
- 3 size variants: small, medium (default), large
- Full dark mode + high contrast support
- WCAG AA+ accessibility

## Usage
```jsx
import DinInput from './DinInput';

<DinInput 
  placeholder="Enter text"
  size="medium"
  error={false}
  disabled={false}
/>
```

## Props
- `value`: string - Input value
- `onChange`: (value) => void - Change handler
- `placeholder`: string - Placeholder text
- `size`: 'small' | 'medium' | 'large'
- `error`: boolean - Show error state
- `success`: boolean - Show success state
- `disabled`: boolean - Disable input
- `errorText`: string - Error message
- `successText`: string - Success message

## Tokens Used
- `--dyn-color-primary-60` - Focus state
- `--dyn-color-danger-60` - Error state
- `--dyn-color-success-60` - Success state
- `--dyn-spacing-2` - Internal padding
- `--dyn-font-size-base` - Text size

## Examples

### Basic Input
```jsx
<DinInput placeholder="Full name" />
```

### Error State
```jsx
<DinInput error={true} errorText="This field is required" />
```

### Success State
```jsx
<DinInput success={true} successText="Valid input" />
```

### All Sizes
```jsx
<DinInput size="small" />
<DinInput size="medium" />
<DinInput size="large" />
```

## Accessibility
- Full keyboard navigation support
- Focus ring visible (3px blue outline)
- Error text associated with input (aria-describedby)
- Screen reader announces error/success states
- WCAG AA compliant

## Dark Mode
Automatically switches colors based on system preference or `prefers-color-scheme: dark`.

## Related Components
- DinCheckbox - Checkbox input
- DinRadio - Radio button
- DinToggle - On/off switch
- DinSelect - Dropdown select
```

**Repeat for:**
- DinCheckbox/README.md
- DinRadio/README.md
- DinToggle/README.md
- DinSelect/README.md

### 1.2 Main Components README (0.5 hours)

Create `/packages/dyn-ui-react/README-COMPONENTS.md` with overview:

```markdown
# DYN UI Components - 100% Design Token Compliance

## Overview
All components use shared design tokens for consistent UI/UX.

## Component Families

### Input Family (P1)
All 5 components share Foundation tokens:
- DinInput (foundation)
- DinCheckbox (inherits)
- DinRadio (inherits)
- DinToggle (inherits + animation)
- DinSelect (inherits + dropdown)

### Core Components (P0)
- DynFlex (layout)
- DynBadge (visual indicator)
- DynModal (dialog)

### Token Structure
```
--dyn-color-primary-60      (Focus states)
--dyn-color-danger-60       (Error states)
--dyn-color-success-60      (Success states)
--dyn-spacing-2/3/4         (Spacing)
--dyn-font-size-*           (Typography)
```

### Dark Mode
All components support:
- System preference (prefers-color-scheme)
- Manual override (data-color-scheme)
- CSS variables for all colors

### Accessibility
- WCAG AA+ compliant
- Full keyboard navigation
- Focus ring on all interactive elements
- ARIA attributes where needed
- Screen reader friendly
```

---

## 📊 Task 2: Token Registry (2 hours)

### 2.1 Create Token Documentation (2 hours)

Create `/docs/TOKEN-REGISTRY.md`:

```markdown
# Design Token Registry

## Overview
Complete list of all design tokens used in DYN UI components.

## Token Naming Convention
`--dyn-{component}-{property}-{state}`

Example: `--dyn-input-border-focus`

## Color Tokens

### Primary Colors
- `--dyn-color-primary-60`: #007ACC (Focus states)
- `--dyn-color-primary-hover`: #0066CC
- `--dyn-color-primary-active`: #004999

### Status Colors
- `--dyn-color-danger-60`: #DC3545 (Error states)
- `--dyn-color-success-60`: #28A745 (Success states)
- `--dyn-color-warning-60`: #FFC107 (Warning states)

### Grayscale
- `--dyn-color-white`: #FFFFFF
- `--dyn-color-gray-100`: #F5F5F5
- `--dyn-color-gray-200`: #E0E0E0
- `--dyn-color-gray-600`: #606060
- `--dyn-color-gray-900`: #1A1A1A

### Dark Mode Colors
- `--dyn-color-gray-800`: #242424
- `--dyn-color-gray-100`: #E0E0E0 (light text on dark)

## Spacing Tokens
- `--dyn-spacing-1`: 4px
- `--dyn-spacing-2`: 8px
- `--dyn-spacing-3`: 12px
- `--dyn-spacing-4`: 16px

## Typography Tokens
- `--dyn-font-size-small`: 12px
- `--dyn-font-size-base`: 14px
- `--dyn-font-size-lg`: 16px
- `--dyn-font-weight-regular`: 400
- `--dyn-font-weight-medium`: 500
- `--dyn-font-weight-semibold`: 600
- `--dyn-line-height-normal`: 1.5

## Border Tokens
- `--dyn-border-width`: 1px
- `--dyn-border-color-default`: #D0D0D0
- `--dyn-border-radius-base`: 4px

## Component-Specific Tokens

### Input Tokens
- `--dyn-input-height`: 40px
- `--dyn-input-padding-x`: 12px
- `--dyn-input-padding-y`: 8px
- `--dyn-input-focus-ring`: 0 0 0 3px rgba(0, 122, 204, 0.2)
- `--dyn-input-error-border`: var(--dyn-color-danger-60)
- `--dyn-input-success-border`: var(--dyn-color-success-60)

### Checkbox Tokens
- `--dyn-checkbox-size`: 20px
- `--dyn-checkbox-border-radius`: 4px
- `--dyn-checkbox-checked-bg`: var(--dyn-color-primary-60)
- `--dyn-checkbox-unchecked-bg`: var(--dyn-color-white)

### Radio Tokens
- `--dyn-radio-size`: 20px
- `--dyn-radio-border-radius`: 50%
- `--dyn-radio-selected-bg`: var(--dyn-color-primary-60)
- `--dyn-radio-unselected-bg`: var(--dyn-color-white)

### Toggle Tokens
- `--dyn-toggle-width`: 48px
- `--dyn-toggle-height`: 24px
- `--dyn-toggle-border-radius`: 12px
- `--dyn-toggle-on-bg`: var(--dyn-color-primary-60)
- `--dyn-toggle-off-bg`: var(--dyn-color-gray-200)
- `--dyn-toggle-transition`: all 250ms cubic-bezier(0.4, 0, 0.2, 1)

### Select Tokens
- `--dyn-select-height`: 40px
- `--dyn-select-border`: 1px solid var(--dyn-border-color-default)
- `--dyn-select-focus-border`: var(--dyn-color-primary-60)
- `--dyn-select-dropdown-shadow`: 0 10px 20px rgba(0, 0, 0, 0.1)

## Token Fallback Strategy

### Principle: Var > Fallback > Hardcoded

Example:
```css
color: var(--dyn-color-primary-60, #007ACC, var(--color-primary, #007ACC));
```

### Three-Level Fallback
1. **Level 1:** Custom property (`--dyn-color-primary-60`)
2. **Level 2:** Named fallback (`#007ACC`)
3. **Level 3:** Browser default or inherited

## Dark Mode Implementation

### Automatic (System Preference)
```css
@media (prefers-color-scheme: dark) {
  :root {
    --dyn-color-gray-100: #E0E0E0;
    --dyn-color-gray-900: #1A1A1A;
  }
}
```

### Manual (Data Attribute)
```css
[data-color-scheme="dark"] {
  --dyn-color-gray-100: #E0E0E0;
  --dyn-color-gray-900: #1A1A1A;
}
```

## High Contrast Mode

### Support for prefers-contrast: more
```css
@media (prefers-contrast: more) {
  :root {
    --dyn-border-width: 2px;
    --dyn-color-primary-60: #0033CC; /* Higher saturation */
  }
}
```

## Animation Tokens
- `--dyn-toggle-transition`: 250ms cubic-bezier(0.4, 0, 0.2, 1)
- `--dyn-select-dropdown-animation`: slideDown 250ms cubic-bezier(...)

## Token Validation

All tokens must follow:
- ✅ `--dyn-` prefix (DYN UI)
- ✅ Kebab-case naming
- ✅ Component-specific where applicable
- ✅ Include fallback values
- ✅ Used consistently across components
- ✅ Documented with examples

## Usage Examples

### Using a Token
```css
.myButton {
  background-color: var(--dyn-color-primary-60, #007ACC);
  padding: var(--dyn-spacing-3, 12px);
  font-size: var(--dyn-font-size-base, 14px);
}
```

### Adding a New Token
1. Define in `:root` block
2. Add dark mode override if needed
3. Add high contrast override if needed
4. Document in this registry
5. Use `var(--dyn-name, fallback)` in CSS

## Future Additions
- Shadow tokens (--dyn-shadow-*)
- Gradient tokens (--dyn-gradient-*)
- Duration tokens (--dyn-duration-*)
- Z-index tokens (--dyn-z-*)
```

---

## 📊 Task 3: Migration Guide v1 → v2 (1.5 hours)

### 3.1 Create Migration Document (1.5 hours)

Create `/docs/MIGRATION-GUIDE-V1-V2.md`:

```markdown
# Migration Guide: v1 → v2 (100% Token Compliance)

## Overview
DYN UI v2 refactors all components to use Design Tokens instead of hardcoded values.

## Breaking Changes

### 1. Token-Based Colors

**Before (v1):**
```css
.button {
  background-color: #007ACC; /* hardcoded */
  color: #FFFFFF; /* hardcoded */
}
```

**After (v2):**
```css
.button {
  background-color: var(--dyn-color-primary-60, #007ACC);
  color: var(--dyn-color-white, #FFFFFF);
}
```

### 2. Component Naming

**Before (v1):**
- `DynFlexOld` → Renamed to `DynFlex`
- `BadgeOld` → Renamed to `DynBadge`

**After (v2):**
```jsx
import { DynFlex, DynBadge, DynModal } from 'dyn-ui';
```

### 3. Props Changes

**Before (v1):**
```jsx
<DynButton color="blue" background="#007ACC" />
```

**After (v2):**
```jsx
<DynButton variant="primary" /> <!-- Uses tokens internally -->
```

## Migration Steps

### Step 1: Update Imports
```jsx
// Old
import Button from 'dyn-ui-react/Button';

// New
import { DynButton } from 'dyn-ui-react';
```

### Step 2: Update Component Usage
```jsx
// Old
<Button color="#007ACC" size="large" />

// New
<DynButton variant="primary" size="large" />
```

### Step 3: Update Custom Styles

If using custom CSS:

```css
/* Old */
.myComponent {
  background: #007ACC;
  color: #FFFFFF;
}

/* New */
.myComponent {
  background: var(--dyn-color-primary-60, #007ACC);
  color: var(--dyn-color-white, #FFFFFF);
}
```

### Step 4: Test Dark Mode

Add dark mode testing:

```html
<!-- Toggle dark mode -->
<button onclick="document.documentElement.setAttribute('data-color-scheme', 'dark')">
  Dark Mode
</button>
```

### Step 5: Verify Accessibility

Run axe-core audit:

```bash
npm run test:a11y
```

## Component Migration Examples

### DinInput Migration

**v1:**
```jsx
<input 
  style={{ 
    backgroundColor: '#FFFFFF',
    borderColor: '#D0D0D0',
    color: '#1A1A1A'
  }}
/>
```

**v2:**
```jsx
<DinInput 
  value={text}
  onChange={setText}
  placeholder="Enter text"
/>
<!-- Tokens applied automatically -->
```

### DynButton Migration

**v1:**
```jsx
<button style={{
  backgroundColor: '#007ACC',
  color: '#FFFFFF'
}}>
  Click Me
</button>
```

**v2:**
```jsx
<DynButton variant="primary">
  Click Me
</DynButton>
```

## Troubleshooting

### Dark Mode Not Working

Check if `prefers-color-scheme: dark` is set:

```css
@media (prefers-color-scheme: dark) {
  /* Colors should change here */
}
```

### Colors Look Wrong

Verify fallback values in tokens:

```css
/* Wrong - no fallback */
color: var(--dyn-color-primary-60);

/* Correct - with fallback */
color: var(--dyn-color-primary-60, #007ACC);
```

### Accessibility Issues

Run audit to find issues:

```bash
npm run test:a11y -- --fix
```

## Support

For migration questions, refer to:
- Token Registry: `/docs/TOKEN-REGISTRY.md`
- Component README: `/src/components/{Component}/README.md`
- P0/P1 Implementation Plans: `/docs/`
```

---

## 📊 Task 4: Team Training (2 hours)

### 4.1 Training Session Content (1.5 hours)

**Duration:** 90 minutes  
**Attendees:** All developers, QA, designers, PM

#### Section 1: Overview (15 min)
- Why token-based design?
- Benefits of shared tokens
- Architecture overview

#### Section 2: Component Family Pattern (20 min)
- Foundation tokens (DinInput)
- Inheritance pattern
- All 5 Input components
- Real examples

#### Section 3: Using Components (20 min)
- Import statements
- Props usage
- Size variants
- State management
- Live coding examples

#### Section 4: Token System (15 min)
- Token naming convention
- Color tokens
- Spacing tokens
- Animation tokens
- CSS variable syntax

#### Section 5: Dark Mode & Accessibility (15 min)
- Dark mode support
- High contrast support
- Keyboard navigation
- Screen reader testing
- WCAG AA compliance

#### Section 6: Q&A (5 min)
- Questions answered
- Resources shared
- Next steps

### 4.2 Training Materials (0.5 hours)

Prepare:
- Slides with examples
- Live code demos
- Component showcase (Storybook)
- Token reference guide
- Recording for absent team members

---

## 📊 Task 5: Project Wrap-up (1.5 hours)

### 5.1 Final Checklist (1.5 hours)

- [ ] All 5 P1 PRs merged to main
- [ ] All documentation committed
- [ ] Token registry complete
- [ ] Migration guide done
- [ ] Team training session scheduled
- [ ] Storybook deployed
- [ ] README updated
- [ ] CHANGELOG updated
- [ ] Version bumped (v2.0.0)
- [ ] Release notes prepared
- [ ] Team trained and ready
- [ ] Success metrics reviewed

### 5.2 Success Metrics Review

```
✅ 8 Components Refactored
✅ 150+ Tokens Implemented
✅ 100% Design Token Compliance
✅ WCAG AA+ Accessibility
✅ Dark Mode Support
✅ High Contrast Support
✅ 80%+ Jest Coverage
✅ Complete Documentation
✅ Team Trained
✅ 6-Week Timeline Met
```

### 5.3 Next Phases

- **P2 (Future):** Additional component families
- **P3 (Future):** Design system documentation
- **P4 (Future):** Token automation tools

---

## 📚 Daily Schedule

### Monday
- Create DinInput README (0.5h)
- Create other component READMEs (1h)

### Tuesday
- Create Token Registry (2h)

### Wednesday
- Create Migration Guide (1.5h)
- Prepare training materials (0.5h)

### Thursday
- Team Training Session (1.5h)
- Q&A and feedback (0.5h)

### Friday
- Final wrap-up and review (1.5h)
- Update documentation (1h)
- Version release (0.5h)

---

## ✅ Success Criteria

- ✅ All component READMEs written
- ✅ Complete token registry created
- ✅ Migration guide finished
- ✅ Team trained (attendance >= 80%)
- ✅ Documentation reviewed and approved
- ✅ Release notes prepared
- ✅ Version 2.0.0 released

---

**Week 6 Total Time:** 9 hours  
**Team Members Involved:** Developers, QA, PM, Design  
**Success:** All documentation complete + Team ready to maintain
