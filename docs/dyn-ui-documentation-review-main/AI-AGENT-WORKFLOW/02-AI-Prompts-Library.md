# 🤖 AI Prompts Library - Copy & Paste Ready

**For**: Claude, ChatGPT, GitHub Copilot, or any AI coding assistant  
**Purpose**: Ready-to-use prompts for automating component implementation  
**Status**: Production Ready  
**Date**: December 28, 2025

---

## 📋 How to Use This Library

1. **Choose your component** (DynAvatar, DynBadge, etc.)
2. **Copy the prompt** for that component
3. **Paste into your AI assistant**
4. **Adjust specifics** if needed
5. **Run and monitor**

---

## 📄 PROMPT 1: DynAvatar Implementation

### **Copy & Paste for Claude / ChatGPT:**

```markdown
You are an expert senior TypeScript/React developer. Your task is to implement 
the DynAvatar component following a comprehensive implementation guide.

## Mission
Implement DynAvatar component for DynUI design system with 95%+ test coverage,
full accessibility support, and complete documentation.

## Documentation to Follow
Read and follow ALL instructions from:
https://github.com/mgasic/dyn-ui-documentation-review/blob/main/IMPLEMENTATION-GUIDES/01-DynAvatar-Complete-Guide.md

This guide contains 11 sections with detailed implementation steps.

## Implementation Checklist (From Guide Section 8)
- [ ] CSS Token Refactoring: Replace all hardcoded colors with --dyn-avatar-* tokens
- [ ] Three-level fallback: var(--dyn-avatar-*, var(--legacy-*, default))
- [ ] Dark mode: @media (prefers-color-scheme: dark)
- [ ] High contrast: @media (prefers-contrast: more)
- [ ] Reduced motion: @media (prefers-reduced-motion: reduce)
- [ ] TypeScript types: Update all prop interfaces
- [ ] JSDoc comments: Full documentation for all functions
- [ ] Unit tests: Jest with 95%+ coverage
- [ ] Dark mode tests: prefers-color-scheme testing
- [ ] Accessibility tests: jest-axe with zero violations
- [ ] Storybook stories: All variants and sizes
- [ ] Git branch: feat/component-dynAvatar-integration
- [ ] Commit messages: Follow conventional commits
- [ ] Code review: Self-review against checklist

## Files to Create/Modify
1. src/components/Avatar/Avatar.module.scss
2. src/components/Avatar/Avatar.tsx
3. src/components/Avatar/Avatar.types.ts
4. src/components/Avatar/__tests__/Avatar.test.tsx
5. src/components/Avatar/Avatar.stories.tsx

## Success Criteria
✅ All 11 sections from guide implemented
✅ 95%+ test coverage
✅ Zero accessibility violations
✅ All 14 checklist items passed
✅ Storybook stories created
✅ Git branch created
✅ PR ready with documentation

## Step-by-Step Process

### Step 1: Read & Understand (5 min)
- Read section 1-3 to understand current state
- Identify 5 main gaps
- Review what needs fixing

### Step 2: CSS Token Refactoring (2 days)
Follow section 4.1 exactly:
- Modify Avatar.module.scss
- Replace ALL hardcoded colors
- Add three-level fallbacks
- Add dark mode overrides
- Add high contrast support
- Add reduced motion support

Example:
```scss
.avatar {
  color: var(--dyn-avatar-text, var(--legacy-text, #1a1a1a));
  background-color: var(--dyn-avatar-bg, var(--legacy-bg, #ffffff));
}
```

### Step 3: TypeScript Changes (1.5 days)
Follow section 4.2:
- Update Avatar.types.ts with all prop interfaces
- Add size type: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
- Add variant type: 'default' | 'error' | 'warning' | 'success'
- Add state type: 'default' | 'hover' | 'active' | 'focus' | 'disabled'
- Add JSDoc for all props

### Step 4: Write Tests (1 day)
Follow section 5:
- Create Avatar.test.tsx with Jest
- Test all sizes (5 variants)
- Test all variants (4 variants)
- Test dark mode (@media prefers-color-scheme: dark)
- Test high contrast (@media prefers-contrast: more)
- Test reduced motion (@media prefers-reduced-motion: reduce)
- Test accessibility with jest-axe
- Achieve 95%+ coverage

### Step 5: Create Storybook (1 day)
Follow section 6:
- Create Avatar.stories.tsx
- Export story for each size
- Export story for each variant
- Export story for each color
- Export interactive story
- Export dark mode story
- Export high contrast story

### Step 6: Documentation (4 hours)
Follow section 7:
- Add JSDoc to all exports
- Add README.md section
- Update main README with link

### Step 7: Git & PR (1 hour)
Follow section 9:
- Create branch: git checkout -b feat/component-dynAvatar-integration
- Run tests: npm run test (should be 95%+)
- Run a11y: npm run test:a11y (should be 0 violations)
- Commit: git commit -m "feat(Avatar): refactor with token system..."
- Push: git push origin feat/component-dynAvatar-integration
- Create PR with provided template

## Validation Checklist (Section 8)
Verify all 14 items:
1. [ ] All CSS variables follow --dyn-avatar-[property]-[state] pattern
2. [ ] Three-level fallbacks implemented
3. [ ] Dark mode overrides present
4. [ ] High contrast support added
5. [ ] Reduced motion support added
6. [ ] TypeScript types updated
7. [ ] JSDoc comments complete
8. [ ] Unit tests > 90% coverage
9. [ ] Dark mode tests included
10. [ ] Accessibility tests passing (jest-axe)
11. [ ] Storybook stories updated
12. [ ] Git commit messages follow pattern
13. [ ] Feature branch created
14. [ ] No console errors/warnings

## References
- Complete Guide: https://github.com/mgasic/dyn-ui-documentation-review/blob/main/IMPLEMENTATION-GUIDES/01-DynAvatar-Complete-Guide.md
- Token Strategy: [Link to design tokens guide]
- Testing Guide: [Link to testing guide]
- Checklist: https://github.com/mgasic/dyn-ui-documentation-review/blob/main/IMPLEMENTATION-GUIDES/CHECKLIST-Implementation.md

START NOW: Create the implementation plan and begin with step 2 (CSS refactoring).
```

---

## 📄 PROMPT 2: DynBadge Implementation

### **Copy & Paste for Claude / ChatGPT:**

```markdown
You are an expert senior TypeScript/React developer. Your task is to implement 
the DynBadge component following a comprehensive implementation guide.

## Mission
Implement DynBadge component for DynUI design system with 95%+ test coverage,
full accessibility support, and complete documentation.

## Documentation to Follow
Read and follow ALL instructions from:
https://github.com/mgasic/dyn-ui-documentation-review/blob/main/IMPLEMENTATION-GUIDES/02-DynBadge-Complete-Guide.md

## Key Differences (vs DynAvatar)
- DynBadge has GHOST variant (new)
- State suffixes: -default, -hover, -active, -focus, -disabled
- More color variants
- Animation support
- Positioned badges

## Implementation Checklist (From Guide Section 8)
- [ ] CSS Token Refactoring: --dyn-badge-* tokens
- [ ] Ghost variant: New transparency-based variant
- [ ] State suffixes: All 5 states
- [ ] Dark mode support
- [ ] High contrast support
- [ ] Reduced motion support
- [ ] TypeScript types: Updated with all variants
- [ ] JSDoc comments: Full documentation
- [ ] Unit tests: 95%+ coverage (14 test scenarios)
- [ ] Accessibility tests: jest-axe passing
- [ ] Storybook stories: All variants + ghost
- [ ] Animation stories: Transitions included
- [ ] Git workflow: Proper commits
- [ ] Validation: All 14 items passed

## Files to Create/Modify
1. src/components/Badge/Badge.module.scss
2. src/components/Badge/Badge.tsx
3. src/components/Badge/Badge.types.ts
4. src/components/Badge/__tests__/Badge.test.tsx
5. src/components/Badge/Badge.stories.tsx

## Success Criteria
✅ 95% test coverage (up from 72%)
✅ Zero accessibility violations
✅ Ghost variant working
✅ All 14 checklist items passed
✅ 7+ Storybook stories created
✅ Animation support included
✅ PR ready for review

## Timeline
- CSS Refactoring: 2 days
- TypeScript: 1.5 days
- Testing: 1 day
- Storybook: 1 day
- Verification: 1 day
- **Total**: 5-7 working days

[Continue with same structure as DynAvatar]
```

---

## 📄 PROMPT 3: Generic Component Template

### **Copy & Paste for Claude / ChatGPT:**

```markdown
You are implementing a [COMPONENT_NAME] component for DynUI design system.

## Instructions

1. **Read Guide**: 
   - Go to: https://github.com/mgasic/dyn-ui-documentation-review
   - Find: IMPLEMENTATION-GUIDES/[NN_-Component-Name]-Complete-Guide.md
   - Read ALL 11 sections

2. **Extract Requirements**:
   - Section 1: Current status
   - Section 3: Identified gaps
   - Section 4: Implementation tasks
   - Section 8: Validation checklist

3. **Implement Following Guide**:
   - Section 4.1: CSS Tokens
   - Section 4.2: TypeScript
   - Section 5: Tests
   - Section 6: Storybook
   - Section 7: Documentation

4. **Verify All Checklist Items**:
   - Use section 8 checklist (typically 14 items)
   - All must be checked before PR

5. **Create PR**:
   - Branch: feat/component-[name]-integration
   - Message: Follow conventional commits
   - Description: Use provided template

## Key Files
- Guide: [Component Name]-Complete-Guide.md
- Checklist: CHECKLIST-Implementation.md
- Template: TEMPLATE-New-Component.md (if needed)

## Success Definition
- ✅ All 11 sections completed
- ✅ 95%+ test coverage
- ✅ Zero a11y violations
- ✅ All checklist items verified
- ✅ Storybook stories created
- ✅ PR submitted and ready for review

BEGIN: Read the component guide first.
```

---

## 📄 PROMPT 4: For GitHub Copilot Chat

### **Use with @copilot or GitHub Copilot Chat:**

```
@copilot Implement the DynAvatar component according to this guide:
https://github.com/mgasic/dyn-ui-documentation-review/blob/main/IMPLEMENTATION-GUIDES/01-DynAvatar-Complete-Guide.md

Follow these steps:
1. Read section 4.1 (CSS Token Refactoring)
2. Apply all token changes to Avatar.module.scss
3. Create unit tests for all variants
4. Create Storybook stories
5. Verify against section 8 checklist

Must achieve:
- 95%+ test coverage
- Zero a11y violations
- All CSS tokens applied
```

---

## 📄 PROMPT 5: Multi-Component Batch

### **For Implementing Multiple Components:**

```markdown
Implement these components in order:

1. **DynAvatar** (5-7 days)
   - Guide: https://github.com/mgasic/dyn-ui-documentation-review/blob/main/IMPLEMENTATION-GUIDES/01-DynAvatar-Complete-Guide.md
   - Status: 91% (need 95%)
   - Priority: HIGH
   - Branch: feat/component-dynAvatar-integration

2. **DynBadge** (5-7 days)
   - Guide: https://github.com/mgasic/dyn-ui-documentation-review/blob/main/IMPLEMENTATION-GUIDES/02-DynBadge-Complete-Guide.md
   - Status: 95% (complete)
   - Priority: HIGH
   - Branch: feat/component-dynBadge-integration

## Process for Each
- Read guide (5 min)
- Understand requirements (3 min)
- Implement code (3-5 days)
- Write tests (1 day)
- Create Storybook (1 day)
- Verify checklist (2 hours)
- Create PR (30 min)

## Acceptance Criteria (ALL)
- ✅ 95%+ test coverage
- ✅ Zero a11y violations
- ✅ All 14 checklist items verified
- ✅ Storybook stories created
- ✅ PR submitted with documentation

START: Begin with DynAvatar on Monday. Report progress daily.
```

---

## 📄 PROMPT 6: Testing Focus

### **For Emphasizing Testing:**

```markdown
Write comprehensive tests for [COMPONENT_NAME] component.

## Test Requirements (From Section 5 of Guide)

### Unit Tests (Jest)
- Test all size variants
- Test all style variants  
- Test all color variants
- Test props validation
- Test callbacks and events
- **Coverage Target**: 95%+

### Accessibility Tests (jest-axe)
- Run axe() on all states
- Check ARIA labels
- Check keyboard navigation
- Check focus management
- **Violations Target**: 0

### Dark Mode Tests
- Test @media (prefers-color-scheme: dark)
- Verify token overrides
- Check contrast ratios
- **Pass**: All scenarios

### High Contrast Tests
- Test @media (prefers-contrast: more)
- Verify visual clarity
- **Pass**: All scenarios

### Reduced Motion Tests
- Test @media (prefers-reduced-motion: reduce)
- Verify animations disabled
- **Pass**: All scenarios

## Test File Structure
```
src/components/[Component]/__tests__/
├── [Component].test.tsx          # Main tests
├── [Component].a11y.test.tsx     # Accessibility
├── [Component].darkMode.test.tsx # Dark mode
├── [Component].snapshot.test.tsx # Snapshots
```

## Run Tests
```bash
npm run test -- [Component]           # All tests
npm run test:coverage                 # Coverage report
npm run test:a11y -- [Component]      # A11y only
```

Target: All passing, 95%+ coverage, 0 a11y violations
```

---

## 📄 PROMPT 7: Documentation Focus

### **For Emphasizing Documentation:**

```markdown
Create comprehensive documentation for [COMPONENT_NAME].

## JSDoc Comments (Section 7 of Guide)

### Component JSDoc
```typescript
/**
 * [Component] - [Short Description]
 * 
 * A flexible [component type] component that supports multiple variants,
 * sizes, and states. Fully accessible with dark mode and high contrast support.
 * 
 * @component
 * @example
 * <[Component] size="md" variant="default" />
 * 
 * @param {[Component]Props} props - Component props
 * @returns {JSX.Element} Rendered component
 * 
 * @see {@link https://github.com/mgasic/dyn-ui-documentation-review} for implementation guide
 * @see {@link /docs/GUIDES/05-Design-Tokens-Strategy.md} for token strategy
 */
```

### Props JSDoc
```typescript
interface [Component]Props {
  /** Component size variant */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  
  /** Visual variant/style */
  variant?: 'default' | 'error' | 'warning' | 'success';
  
  /** Current interactive state */
  state?: 'default' | 'hover' | 'active' | 'focus' | 'disabled';
  
  /** Aria label for accessibility */
  ariaLabel?: string;
  
  /** Additional CSS class names */
  className?: string;
}
```

## README Section

Add to main README.md:

```markdown
## [Component]

### Overview
[Component] is a [purpose] component for [use case].

### Features
- ✅ Multiple sizes (xs, sm, md, lg, xl)
- ✅ Multiple variants (default, error, warning, success)
- ✅ Dark mode support
- ✅ High contrast support
- ✅ Reduced motion support
- ✅ Full accessibility (WCAG 2.1 AA)

### Usage
```typescript
<[Component] size="md" variant="default" />
```

### Coverage
- Test Coverage: 95%+
- A11y Violations: 0
- Storybook Stories: [Number]

### Related
- Implementation Guide: [Link]
- Design Tokens: [Link]
- Storybook: [Link]
```

## Storybook Documentation

Add to [Component].stories.tsx:

```typescript
// Title
title: 'Components/[Component]',

// Description
parameters: {
  docs: {
    description: {
      component: '[Component description]',
    },
  },
},

// Arg types with descriptions
argTypes: {
  size: {
    control: 'select',
    options: ['xs', 'sm', 'md', 'lg', 'xl'],
    description: 'Size of the component',
    table: { defaultValue: { summary: 'md' } },
  },
}
```

Target: All JSDoc complete, README updated, Storybook documented
```

---

## 📄 PROMPT 8: Code Review Checklist

### **After Implementation - Self Review:**

```markdown
Self-review your [COMPONENT_NAME] implementation against this checklist.

## Code Quality Checklist

### Structure
- [ ] Component split into logical files
- [ ] Separate: types, component, styles, tests, stories
- [ ] Clear naming conventions
- [ ] No circular dependencies

### CSS/Styling
- [ ] All tokens use --dyn-[component]- prefix
- [ ] Three-level fallback system
- [ ] Dark mode styles included
- [ ] High contrast styles included
- [ ] Reduced motion styles included
- [ ] No hardcoded colors
- [ ] No !important flags

### TypeScript
- [ ] All props typed
- [ ] No 'any' types
- [ ] All exports documented
- [ ] Full JSDoc comments
- [ ] No console.log() statements

### Tests
- [ ] 95%+ coverage
- [ ] All variants tested
- [ ] All sizes tested
- [ ] Dark mode tested
- [ ] High contrast tested
- [ ] Reduced motion tested
- [ ] Accessibility tests (jest-axe)
- [ ] No skipped tests (no .skip)

### Accessibility
- [ ] jest-axe: 0 violations
- [ ] ARIA labels present
- [ ] Keyboard navigation works
- [ ] Focus visible
- [ ] Semantic HTML
- [ ] Sufficient color contrast

### Documentation
- [ ] JSDoc on all exports
- [ ] README section
- [ ] Storybook stories (all variants)
- [ ] Usage examples
- [ ] Comments on complex logic

### Git
- [ ] Branch: feat/component-[name]-integration
- [ ] Commits follow conventional commits
- [ ] Clear commit messages
- [ ] Related issues referenced
- [ ] No merge commits in PR

### Validation (Section 8)
- [ ] Item 1: CSS variables pattern ✓
- [ ] Item 2: Fallbacks ✓
- [ ] Item 3: Dark mode ✓
- [ ] Item 4: High contrast ✓
- [ ] Item 5: Reduced motion ✓
- [ ] Item 6: TypeScript ✓
- [ ] Item 7: JSDoc ✓
- [ ] Item 8: Tests 95%+ ✓
- [ ] Item 9: Dark mode tests ✓
- [ ] Item 10: Jest-axe ✓
- [ ] Item 11: Storybook ✓
- [ ] Item 12: Git commit messages ✓
- [ ] Item 13: Feature branch ✓
- [ ] Item 14: No console errors ✓

## When ALL checked:
- Run full test suite
- Build Storybook
- Create PR
- Request review
```

---

## 📊 Summary of Prompts

| # | Prompt | For | Best Used |
|---|--------|-----|----------|
| 1 | DynAvatar Implementation | Detailed | Full component |
| 2 | DynBadge Implementation | Detailed | Full component |
| 3 | Generic Component | Flexible | Any component |
| 4 | Copilot Chat | Quick | GitHub Copilot |
| 5 | Batch Multi | Process | Multiple components |
| 6 | Testing Focus | Specialized | Test emphasis |
| 7 | Documentation Focus | Specialized | Docs emphasis |
| 8 | Code Review | Checklist | Self-review |

---

## 🤖 How to Use with Different AI Tools

### **Claude (claude.ai or Claude API)**
1. Copy entire prompt
2. Paste in chat
3. Wait for Claude to read guide
4. Follow Claude's questions
5. Provide clarification if needed

### **ChatGPT (Plus or API)**
1. Create new chat
2. Paste prompt
3. Let ChatGPT process
4. Ask follow-up questions
5. Get code in response

### **GitHub Copilot Chat (@copilot)**
1. Use in PR comments
2. Reference specific lines
3. Ask for implementation
4. Accept or modify suggestions

### **Cursor (Cursor IDE)**
1. Use Cmd/Ctrl+K
2. Paste prompt
3. Select "AI Suggest"
4. Review and apply

---

## 📝 Tips for Best Results

1. **Provide Full Context**: Include guide links
2. **Be Specific**: Mention section numbers
3. **Set Expectations**: Define success criteria
4. **Request Format**: Ask for specific output format
5. **Validation**: Ask AI to verify against checklist
6. **Iteration**: Refine based on output

---

**Status**: ✅ Ready to Use  
**Created**: December 28, 2025  
**Version**: 1.0

---

**Happy prompting! 🤖✨**