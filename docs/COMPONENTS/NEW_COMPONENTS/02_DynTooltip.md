# DynTooltip Component Specification (NEW)

**Priority**: 🟡 P1 - IMPORTANT (Week 3)  
**Effort**: 2.5 hours  
**Type**: Overlay/Info  
**Status**: 🔴 MISSING - CREATE NEW

---

## PURPOSE

Small informational popover component for displaying helpful text on hover, focus, or click. Used for contextual help on buttons, icons, and form fields.

---

## FEATURES

### Core Functionality

- [ ] Tooltip text display
- [ ] Multiple positioning (top, bottom, left, right)
- [ ] Auto-positioning (avoid screen edges)
- [ ] Show on hover/focus/click
- [ ] Keyboard support (ESC closes)
- [ ] ARIA labels and roles
- [ ] Smooth animations
- [ ] Arrow pointer
- [ ] Dark mode support
- [ ] Responsive (mobile-friendly)
- [ ] Max width for long text
- [ ] Color themes

---

## TOKEN DEFINITIONS

```
✅ --dyn-tooltip-bg              /* Background */
✅ --dyn-tooltip-color           /* Text color */
✅ --dyn-tooltip-font-size       /* Font size */
✅ --dyn-tooltip-padding-y       /* Vertical padding */
✅ --dyn-tooltip-padding-x       /* Horizontal padding */
✅ --dyn-tooltip-border-radius   /* Radius */
✅ --dyn-tooltip-shadow          /* Shadow */
✅ --dyn-tooltip-max-width       /* Max width */
✅ --dyn-tooltip-z-index         /* Z-index (1500) */
✅ --dyn-tooltip-gap             /* Gap from trigger */
✅ --dyn-tooltip-transition      /* Animation */
✅ --dyn-tooltip-arrow-size      /* Arrow size */
```

---

## PROPS

```tsx
interface TooltipProps {
  title?: string;              /* Content */
  content?: React.ReactNode;   /* React content */
  position?: 'top' | 'bottom' | 'left' | 'right'; /* Position */
  trigger?: 'hover' | 'focus' | 'click';         /* Trigger */
  autoPosition?: boolean;      /* Avoid edges */
  variant?: 'dark' | 'light';  /* Color theme */
  maxWidth?: string;           /* Max width */
  delayShow?: number;          /* Delay ms */
  delayHide?: number;          /* Delay ms */
  children: React.ReactNode;   /* Trigger element */
}
```

---

## VARIANTS

### Position
- [ ] `position="top"` (default) - Above
- [ ] `position="bottom"` - Below
- [ ] `position="left"` - Left side
- [ ] `position="right"` - Right side
- [ ] Auto-positioning - Detect screen edge

### Trigger
- [ ] `trigger="hover"` (default) - On mouse over
- [ ] `trigger="focus"` - On focus
- [ ] `trigger="click"` - On click

### Theme
- [ ] `variant="dark"` (default) - Dark bg
- [ ] `variant="light"` - Light bg
- [ ] `variant="info"` - Info styling
- [ ] `variant="warning"` - Warning styling

---

## CSS STRUCTURE

```css
:root {
  --dyn-tooltip-bg: rgba(31, 41, 55, 0.95);
  --dyn-tooltip-color: #ffffff;
  --dyn-tooltip-font-size: var(--dyn-font-size-sm, 0.875rem);
  --dyn-tooltip-padding-y: var(--dyn-spacing-xs, 0.25rem);
  --dyn-tooltip-padding-x: var(--dyn-spacing-sm, 0.5rem);
  --dyn-tooltip-border-radius: var(--dyn-radius-sm, 0.375rem);
  --dyn-tooltip-shadow: var(--dyn-shadow-lg);
  --dyn-tooltip-max-width: 250px;
  --dyn-tooltip-z-index: var(--dyn-z-index-tooltip, 1500);
  --dyn-tooltip-gap: 8px;
  --dyn-tooltip-transition: all var(--dyn-transition-base, 200ms);
  --dyn-tooltip-arrow-size: 6px;
}

.tooltip {
  position: absolute;
  background-color: var(--dyn-tooltip-bg);
  color: var(--dyn-tooltip-color);
  font-size: var(--dyn-tooltip-font-size);
  padding: var(--dyn-tooltip-padding-y) var(--dyn-tooltip-padding-x);
  border-radius: var(--dyn-tooltip-border-radius);
  box-shadow: var(--dyn-tooltip-shadow);
  max-width: var(--dyn-tooltip-max-width);
  z-index: var(--dyn-tooltip-z-index);
  white-space: normal;
  word-wrap: break-word;
  opacity: 0;
  pointer-events: none;
  transition: var(--dyn-tooltip-transition);
  transform: translateY(-4px);
}

.tooltipVisible {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
}

.tooltipArrow {
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
}

/* Positions */
.tooltipTop .tooltipArrow {
  bottom: calc(-1 * var(--dyn-tooltip-arrow-size));
  left: 50%;
  transform: translateX(-50%);
  border-width: var(--dyn-tooltip-arrow-size) var(--dyn-tooltip-arrow-size) 0;
  border-color: var(--dyn-tooltip-bg) transparent transparent;
}

.tooltipBottom .tooltipArrow {
  top: calc(-1 * var(--dyn-tooltip-arrow-size));
  left: 50%;
  transform: translateX(-50%);
  border-width: 0 var(--dyn-tooltip-arrow-size) var(--dyn-tooltip-arrow-size);
  border-color: transparent transparent var(--dyn-tooltip-bg);
}

/* Themes */
.tooltipLight {
  --dyn-tooltip-bg: #ffffff;
  --dyn-tooltip-color: #1f2937;
  border: 1px solid #d1d5db;
}

.tooltipWarning {
  --dyn-tooltip-bg: var(--dyn-color-warning, #f59e0b);
  --dyn-tooltip-color: #ffffff;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --dyn-tooltip-bg: rgba(55, 65, 81, 0.95);
  }
}
```

---

## REQUIREMENTS CHECKLIST

### CSS
- [ ] All tokens use `--dyn-tooltip-*`
- [ ] All values tokenized
- [ ] 3-level fallback
- [ ] Arrow styling
- [ ] Multiple position styles
- [ ] Theme variants
- [ ] Dark mode
- [ ] Animations smooth

### React Component
- [ ] Portal for rendering outside DOM
- [ ] Position calculation
- [ ] Auto-positioning with edge detection
- [ ] Keyboard handling (ESC)
- [ ] Trigger handling (hover/focus/click)
- [ ] Delay support
- [ ] ForwardRef
- [ ] TypeScript types
- [ ] ARIA attributes

### Testing
- [ ] All positions work
- [ ] All triggers work
- [ ] Auto-positioning
- [ ] Arrow positioning
- [ ] Keyboard ESC
- [ ] Delay settings
- [ ] Portal rendering
- [ ] All themes
- [ ] Dark mode
- [ ] 80%+ coverage

### Storybook
- [ ] Basic with text
- [ ] All positions
- [ ] All triggers
- [ ] All themes
- [ ] With icons
- [ ] Long text with wrapping
- [ ] Near edges (auto-position demo)
- [ ] Dark mode

---

## AI VERIFICATION PROMPT

```
AI Task: Verify DynTooltip Implementation

1. TOKEN VERIFICATION
   - All tokens start with --dyn-tooltip-
   - All have 3-level fallback
   - Z-index correct (should be 1500, above modal 1400)

2. POSITIONING
   - Calculate position for all 4 directions
   - Auto-detect screen edges
   - Arrow points to trigger element
   - Gap spacing correct

3. TRIGGER HANDLING
   - Hover: show on mouseenter, hide on mouseleave
   - Focus: show on focus, hide on blur
   - Click: toggle on click, close on ESC

4. ANIMATION
   - Smooth fade in/out
   - Transform animation
   - Transition timing

5. ACCESSIBILITY
   - ARIA role="tooltip"
   - aria-labelledby on trigger
   - ESC key closes
   - Focus management

6. DARK MODE
   - Colors update
   - Contrast maintained
   - Arrow color correct

Output: Comprehensive verification
```

---

## DELIVERABLES

### Files to Create
1. `packages/dyn-ui-react/src/components/DynTooltip/DynTooltip.tsx`
2. `packages/dyn-ui-react/src/components/DynTooltip/DynTooltip.types.ts`
3. `packages/dyn-ui-react/src/components/DynTooltip/DynTooltip.module.css`
4. `packages/dyn-ui-react/src/components/DynTooltip/DynTooltip.stories.tsx`
5. `packages/dyn-ui-react/src/components/DynTooltip/DynTooltip.test.tsx`
6. `packages/dyn-ui-react/src/components/DynTooltip/index.ts`

### PR Checklist
- [ ] All positions working
- [ ] All triggers working
- [ ] Auto-positioning correct
- [ ] Keyboard support
- [ ] Portal rendering
- [ ] 80%+ coverage
- [ ] Commit: `feat(DynTooltip): create overlay with token compliance`

---

**Status**: 🔴 MISSING - Create new  
**Effort**: 2.5 hours  
**Deadline**: Week 3
