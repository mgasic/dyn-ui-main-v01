# 📋 P1 QA PHASE - Complete Validation Plan

**Status:** 🚀 Ready for Week 5  
**Duration:** 1 Week (Nedelja 5)  
**Target:** 100% Quality Gate Pass

---

## 🎯 Phase Overview

P1 QA Phase focuses on validating all 5 Input family components:

- ✅ DinInput (#30)
- ✅ DinCheckbox (#31)
- ✅ DinRadio (#32)
- ✅ DinToggle (#33)
- ✅ DinSelect (#34)

**Goal:** Merge all 5 PRs with 100% compliance and zero defects

---

## 📊 QA Checklist

### 1️⃣ Code Review (2 hours)

#### Token Compliance
- [ ] All tokens use `--dyn-` prefix
- [ ] Naming: `--dyn-component-property-state`
- [ ] No hardcoded values (all use CSS variables)
- [ ] Fallback chain correct (var > fallback > hardcoded)
- [ ] Inheritance from DinInput working (P1 components)

#### CSS Quality
- [ ] No duplicate token definitions
- [ ] Consistent spacing in CSS
- [ ] Comments explain each section
- [ ] Selectors are specific enough
- [ ] Media queries properly organized

#### Naming Consistency
- [ ] DinInput: `--dyn-input-*`
- [ ] DinCheckbox: `--dyn-checkbox-*`
- [ ] DinRadio: `--dyn-radio-*`
- [ ] DinToggle: `--dyn-toggle-*`
- [ ] DinSelect: `--dyn-select-*`

#### Documentation
- [ ] Each PR has detailed description
- [ ] Token connection documented
- [ ] Features clearly listed
- [ ] Component states explained
- [ ] Size variants documented

---

### 2️⃣ Visual Testing (2 hours)

#### Component States

**All Components:**
- [ ] Default state renders correctly
- [ ] Focus state shows focus ring
- [ ] Focus ring is visible (contrast OK)
- [ ] Error state shows red styling
- [ ] Success state shows green styling
- [ ] Disabled state shows reduced opacity
- [ ] Disabled state is not interactive

**DinInput Specific:**
- [ ] Placeholder text visible
- [ ] Clear button works
- [ ] Text input functional
- [ ] Error icon visible
- [ ] Success icon visible

**DinCheckbox Specific:**
- [ ] Unchecked state: white background
- [ ] Checked state: blue background with checkmark
- [ ] Checkmark visible when checked
- [ ] Checkbox group vertical layout
- [ ] Checkbox group horizontal layout

**DinRadio Specific:**
- [ ] Unselected state: white background
- [ ] Selected state: blue background with dot
- [ ] Inner dot visible when selected
- [ ] Radio group vertical layout
- [ ] Radio group horizontal layout

**DinToggle Specific:**
- [ ] Off state: gray background, thumb left
- [ ] On state: blue background, thumb right
- [ ] Thumb slides smoothly (animation visible)
- [ ] Optional on/off labels display correctly
- [ ] Animation is 250ms (smooth, not instant)

**DinSelect Specific:**
- [ ] Closed state: regular input style
- [ ] Open state: dropdown menu appears
- [ ] Dropdown options visible
- [ ] Chevron icon present
- [ ] Chevron rotates 180° when open
- [ ] Selected option highlighted
- [ ] Option hover state works
- [ ] Helper text visible below select

#### Size Variants
- [ ] Small size: all 5 components
- [ ] Medium size: all 5 components (default)
- [ ] Large size: all 5 components
- [ ] Size differences are visually correct
- [ ] Touch targets adequate (min 44x44px)

#### Color & Contrast
- [ ] Colors match design system
- [ ] Focus ring color matches primary
- [ ] Error color matches danger
- [ ] Success color matches success
- [ ] Text contrast ratio >= 4.5:1
- [ ] Focus indicator contrast >= 3:1

---

### 3️⃣ Dark Mode Testing (1.5 hours)

#### Dark Mode Colors
- [ ] DinInput: background switches to dark
- [ ] DinCheckbox: background switches to dark
- [ ] DinRadio: background switches to dark
- [ ] DinToggle: off state switches to dark gray
- [ ] DinSelect: dropdown background switches to dark
- [ ] Text color readable on dark background
- [ ] Border color visible on dark background

#### Dark Mode Contrast
- [ ] All text contrast OK on dark mode
- [ ] Focus ring visible on dark mode
- [ ] Error/Success colors distinguishable
- [ ] Placeholder text visible
- [ ] Icons visible and clear

#### Dark Mode Activation
- [ ] Test with `prefers-color-scheme: dark`
- [ ] Test with `@media (prefers-color-scheme: dark)` media query
- [ ] Test with data attribute: `[data-color-scheme="dark"]`
- [ ] All 3 methods work correctly

---

### 4️⃣ High Contrast Mode Testing (1 hour)

#### High Contrast Colors
- [ ] Borders become 2px instead of 1px
- [ ] Colors increase in saturation
- [ ] Text becomes bolder
- [ ] Focus indicators more prominent

#### High Contrast Activation
- [ ] Test with `prefers-contrast: more`
- [ ] All components visually adjusted
- [ ] No information lost
- [ ] Readability improved

---

### 5️⃣ Animation Testing (1.5 hours)

#### DinToggle Animation
- [ ] Thumb translates smoothly (250ms)
- [ ] Cubic-bezier timing: (0.4, 0, 0.2, 1)
- [ ] No jank or stuttering
- [ ] Animation on all size variants
- [ ] Animation respects `prefers-reduced-motion: reduce`

#### DinSelect Animation
- [ ] Chevron rotates 180° on open (250ms)
- [ ] Dropdown slides down smoothly
- [ ] SlideDown keyframe: translateY(-8px) → 0
- [ ] All animations on all size variants
- [ ] Animations respect `prefers-reduced-motion: reduce`

#### Prefers-Reduced-Motion
- [ ] DinToggle: no animation, instant toggle
- [ ] DinSelect: no animation, instant open/close
- [ ] No transition delays
- [ ] Chevron stays rotated (no animation)

---

### 6️⃣ Accessibility Testing (2 hours)

#### Keyboard Navigation
- [ ] All components focusable with Tab
- [ ] Tab order is logical
- [ ] Focus ring visible on all components
- [ ] Focus outline offset correct (2px)
- [ ] Can escape from dropdown with Esc

#### ARIA Attributes
- [ ] DinInput: `type="text"`, `aria-label` if needed
- [ ] DinCheckbox: `type="checkbox"`, `aria-checked`
- [ ] DinRadio: `type="radio"`, `aria-checked`
- [ ] DinToggle: `role="switch"`, `aria-checked`
- [ ] DinSelect: `role="combobox"`, `aria-expanded`

#### Screen Reader Testing
- [ ] axe-core audit passes (0 critical)
- [ ] Labels announced correctly
- [ ] States announced (checked, selected, disabled)
- [ ] Error/Success states announced
- [ ] Helper text associated with input

#### Focus Management
- [ ] Focus visible on all interactive elements
- [ ] Focus ring color sufficient contrast
- [ ] Focus indicator not removed
- [ ] Focus trap works in dropdown (DinSelect)

#### Color Contrast
- [ ] WCAG AA: 4.5:1 for normal text
- [ ] WCAG AA: 3:1 for large text
- [ ] WCAG AA: 3:1 for focus indicators
- [ ] Error text: 4.5:1 contrast
- [ ] Success text: 4.5:1 contrast

#### WCAG Compliance
- [ ] Level: AA (minimum requirement)
- [ ] All 50 Level AA success criteria met
- [ ] No ARIA conflicts
- [ ] Semantic HTML used where possible
- [ ] No keyboard traps

---

### 7️⃣ Responsive Testing (1.5 hours)

#### Breakpoints
- [ ] Mobile (< 480px): all components responsive
- [ ] Tablet (480px - 768px): all components work
- [ ] Desktop (> 768px): all components work
- [ ] Component size increases on mobile
- [ ] Touch targets >= 44x44px on mobile

#### Component Behavior
- [ ] DinInput: full width on mobile
- [ ] DinCheckbox: larger size on mobile
- [ ] DinRadio: larger size on mobile
- [ ] DinToggle: larger size on mobile
- [ ] DinSelect: full width on mobile, dropdown adjusts

#### Dropdown Positioning (DinSelect)
- [ ] Dropdown opens correctly on mobile
- [ ] Dropdown doesn't go off-screen
- [ ] Dropdown scrolls on mobile if needed
- [ ] Max-height: 250px-300px on mobile
- [ ] Options readable on mobile

---

### 8️⃣ Jest Testing (2 hours)

#### Test Structure
- [ ] Test file for each component
- [ ] Tests use `render()` from React Testing Library
- [ ] Tests use `screen.getByRole()` for queries
- [ ] Tests follow AAA pattern (Arrange, Act, Assert)

#### Test Coverage

**DinInput:**
- [ ] Renders with placeholder
- [ ] Value updates on input
- [ ] Error state shows error styles
- [ ] Success state shows success styles
- [ ] Disabled state prevents interaction
- [ ] Clear button clears input
- [ ] All size variants render

**DinCheckbox:**
- [ ] Renders unchecked by default
- [ ] Checks/unchecks on click
- [ ] `aria-checked` updates
- [ ] Group vertical/horizontal layouts
- [ ] All size variants work
- [ ] Disabled state prevents toggle

**DinRadio:**
- [ ] Renders unselected by default
- [ ] Selects on click
- [ ] `aria-checked` updates
- [ ] Only one radio selected in group
- [ ] Group vertical/horizontal layouts
- [ ] All size variants work

**DinToggle:**
- [ ] Renders off by default
- [ ] Toggles on click
- [ ] `aria-checked` updates
- [ ] Optional labels render
- [ ] All size variants work
- [ ] Animation works (CSS transition)

**DinSelect:**
- [ ] Renders closed by default
- [ ] Opens on click
- [ ] Options visible when open
- [ ] Can select option
- [ ] Selected option highlighted
- [ ] Chevron rotates
- [ ] All size variants work
- [ ] Disabled state prevents opening

#### Test Coverage Goals
- [ ] >= 80% code coverage
- [ ] All user interactions tested
- [ ] All states tested
- [ ] All sizes tested
- [ ] Error cases tested

---

### 9️⃣ Storybook Testing (1.5 hours)

#### Story Structure
- [ ] One story file per component
- [ ] Export as `default` meta + named exports for variants
- [ ] Stories use component with proper props

#### Story Variants

**Each component should have:**
- [ ] Default (basic usage)
- [ ] Small size
- [ ] Large size
- [ ] Disabled state
- [ ] Error state
- [ ] Success state
- [ ] Focused state (if applicable)

#### Storybook Features
- [ ] Stories render without errors
- [ ] Controls/knobs work for props
- [ ] Dark mode toggle works
- [ ] Accessibility panel shows info
- [ ] A11y audit integrated

#### Documentation
- [ ] Component description
- [ ] Props documented with types
- [ ] Usage examples clear
- [ ] Related components listed

---

### 🔟 Mobile Responsive Detailed (1 hour)

#### Touch Interactions
- [ ] All buttons/inputs >= 44x44px
- [ ] No hover-only functionality
- [ ] Touch targets have spacing
- [ ] Double-tap zoom not disabled
- [ ] Viewport meta tag correct

#### Mobile Layout
- [ ] Components full width on small screens
- [ ] Dropdowns fit screen height
- [ ] No horizontal scroll needed
- [ ] Readable on small screens
- [ ] Font size >= 16px (no auto zoom)

---

## 📋 Daily Checklist

### Day 1 (Monday) - Code Review & Visual
- [ ] Code review all 5 PRs (2h)
- [ ] Visual testing all states (2h)
- [ ] Document any issues
- [ ] Request changes if needed

### Day 2 (Tuesday) - Dark Mode & High Contrast
- [ ] Dark mode testing all components (1.5h)
- [ ] High contrast mode testing (1h)
- [ ] Animation testing (1.5h)
- [ ] Screenshot comparison

### Day 3 (Wednesday) - Accessibility
- [ ] Keyboard navigation testing (1.5h)
- [ ] Axe-core audit (0.5h)
- [ ] ARIA attributes verification (0.5h)
- [ ] Screen reader testing (1h)

### Day 4 (Thursday) - Testing & Responsive
- [ ] Jest tests implementation (2h)
- [ ] Jest test execution (1h)
- [ ] Storybook setup (1h)
- [ ] Responsive testing (1.5h)

### Day 5 (Friday) - Final Validation & Merge
- [ ] Final visual regression check (1h)
- [ ] All test suites passing (1h)
- [ ] Code review approvals (0.5h)
- [ ] Merge all PRs (0.5h)
- [ ] Deploy to staging (0.5h)
- [ ] Final stakeholder sign-off (0.5h)

---

## 🔴 Defect Severity Levels

### Critical (Block Merge)
- Hard-coded values found
- Token naming inconsistent
- Dark mode colors wrong
- Focus ring invisible
- WCAG AA violations

### High (Request Changes)
- Animation not smooth
- Size variant missing
- Accessibility issue minor
- Test coverage < 80%

### Medium (Nice to Have)
- Comment clarity
- Code formatting
- Documentation typo

### Low (Polish)
- Spacing suggestions
- Naming variations
- Performance micro-optimization

---

## ✅ Success Criteria

### All PRs Must Have:
- ✅ Code review approved
- ✅ All visual states correct
- ✅ Dark mode working
- ✅ High contrast working
- ✅ Animations smooth
- ✅ Accessibility passing (WCAG AA)
- ✅ Jest tests >= 80% coverage
- ✅ Storybook stories complete
- ✅ Mobile responsive verified
- ✅ 0 Critical defects

### Quality Gates
- Code coverage: >= 80%
- A11y violations: 0
- Console errors: 0
- Console warnings: 0 (for compliance issues)
- Accessibility score: 90+

---

## 📊 Metrics to Track

```
Defects Found: ___
Defects Fixed: ___
Code Review Comments: ___
Test Cases Written: ___
Test Coverage: ___%
Accessibility Issues: ___
Mobile Issues: ___
Dark Mode Issues: ___
Animation Issues: ___

Target: 0 Critical | 0-2 High | 0-3 Medium
```

---

## 🏁 QA Sign-Off

**When all checks pass and 0 critical defects remain:**

- [ ] QA Lead signs off
- [ ] Tech Lead approves
- [ ] PM confirms merge
- [ ] All 5 PRs merged to main
- [ ] Deployed to staging
- [ ] Ready for Week 6 documentation

---

## 📝 Notes

- Use Chrome DevTools for testing
- Use axe DevTools for accessibility
- Use NVDA/JAWS for screen reader testing
- Use Wave for contrast checking
- Document all findings with screenshots
- Create tickets for any defects

---

**QA Phase Duration: 5 Days (1 Week)**  
**Target Completion: Friday EOD**  
**Next Phase: Documentation (Week 6)**
