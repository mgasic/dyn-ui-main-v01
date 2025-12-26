# DynAvatar - Implementation Guide

**Component Type**: Display Component (Profile Picture)  
**Status**: Existing - Needs Refactor  
**Priority**: P1 - Important  
**Time to Fix**: 4-5 hours  
**Current Score**: 72% ⚠️ FAIR  
**Target Score**: 85%+ ✅  
**Last Updated**: December 26, 2025

---

## 1. Component Overview

**DynAvatar** is a component that displays user profile pictures with fallback to initials. It's primarily used in:
- User profiles
- Comment sections
- Team/member lists
- Header user indicators
- Chat applications

The component supports multiple display modes (image, initials, icon) and includes optional status badges for online/offline indicators.

---

## 2. Current State Analysis

### 2.1 Existing Files

```
packages/dyn-ui-react/src/components/DynAvatar/
├── DynAvatar.tsx                    (Main component - 11.5 KB)
├── DynAvatar.types.ts               (TypeScript types - 3 KB)
├── DynAvatar.module.css             (Styles - 8.8 KB)
├── DynAvatar.test.tsx               (Tests - 12.3 KB)
├── DynAvatar.stories.tsx            (Storybook - 3.8 KB)
└── index.ts                         (Exports - 261 B)
```

### 2.2 Current Functionality

**Exported Types**:
```typescript
- DynAvatarProps
- DynAvatarSize ('xs' | 'sm' | 'md' | 'lg' | 'xl')
- DynAvatarStatus ('online' | 'offline' | 'away' | 'busy')
```

**Current Props**:
- `src?: string` - Image URL
- `alt?: string` - Alt text
- `initials?: string` - Fallback initials
- `size?: DynAvatarSize` - Avatar size (default: 'md')
- `status?: DynAvatarStatus` - Status badge
- `shape?: 'circle' | 'square'` - Avatar shape (default: 'circle')
- `interactive?: boolean` - Click handler support
- `onStatusChange?: (status: DynAvatarStatus) => void`
- `className?: string` - Custom CSS class
- `ref?: ForwardedRef<HTMLDivElement>`

**Features Working**:
✅ Image display with fallback
✅ Initials rendering
✅ Status badge positioning
✅ Ref forwarding
✅ Keyboard navigation
✅ Dark mode support (via CSS variables)
✅ 42+ comprehensive tests (78% coverage)
✅ Full ARIA accessibility

### 2.3 Identified Gaps

**CRITICAL** ❌:
1. CSS Token Non-Compliance (65% score)
   - Uses hardcoded pixel values instead of design tokens
   - Examples:
     - `.status { width: 12px; }` → Should use token
     - `.badge { top: -4px; right: -4px; }` → Should use tokens
     - Border values hardcoded → Should reference tokens
   - Impact: Violates design system compliance
   - Fix Time: 2-3 hours

**IMPORTANT** 🟡:
1. Unused CSS Classes (1 hour)
   - `.badge` - Declared but not used
   - `.group` - Declared but not used
   - `.groupItem` - Declared but not used
   - `.dyn-sr-only` - Should be moved to global styles

2. Missing Documentation (1-2 hours)
   - No JSDoc on component
   - No JSDoc on internal functions
   - No usage examples
   - No prop descriptions

**OPTIONAL** 💡:
1. Image Loading
   - No timeout for stuck image loads
   - Could add loading skeleton
   - Could optimize with useCallback

---

## 3. Design Token Integration

### 3.1 Required Tokens

**Avatar-Specific Tokens** (New - to create):
```json
{
  "--dyn-avatar-size-xs": "24px",
  "--dyn-avatar-size-sm": "32px",
  "--dyn-avatar-size-md": "40px",
  "--dyn-avatar-size-lg": "56px",
  "--dyn-avatar-size-xl": "72px",
  "--dyn-avatar-status-size": "12px",
  "--dyn-avatar-status-offset": "-4px",
  "--dyn-avatar-border-width": "2px",
  "--dyn-avatar-border-color": "var(--dyn-color-surface)"
}
```

**Global Tokens to Use** (Already exist):
- `--dyn-color-*` (backgrounds)
- `--dyn-color-text-*` (text colors)
- `--dyn-border-radius-*` (rounded corners)
- `--dyn-shadow-*` (shadows)
- `--dyn-transition-*` (animations)
- `--dyn-spacing-*` (padding/margin)

### 3.2 CSS Analysis

**Current CSS Issues**:

```css
/* ❌ BEFORE - Hardcoded values */
.status {
  width: 12px;  /* Hardcoded */
  height: 12px;  /* Hardcoded */
  border: 2px solid;  /* Hardcoded */
}

.badge {
  top: -4px;  /* Hardcoded */
  right: -4px;  /* Hardcoded */
  min-width: 20px;  /* Hardcoded */
}

.avatar {
  width: 40px;  /* Hardcoded - should be size token */
  height: 40px;  /* Hardcoded - should be size token */
  border-radius: 50%;  /* Hardcoded - should be token */
}
```

**Solution - Use Tokens with Fallbacks**:

```css
/* ✅ AFTER - Token-based with fallbacks */
.status {
  width: var(--dyn-avatar-status-size, var(--avatar-status-size, 12px));
  height: var(--dyn-avatar-status-size, var(--avatar-status-size, 12px));
  border: var(--dyn-avatar-border-width, var(--dyn-border-width, 2px)) solid 
          var(--dyn-avatar-border-color, var(--dyn-color-surface, white));
}

.badge {
  top: var(--dyn-avatar-status-offset, var(--avatar-status-offset, -4px));
  right: var(--dyn-avatar-status-offset, var(--avatar-status-offset, -4px));
  min-width: calc(var(--dyn-avatar-status-size, 12px) + 8px);
}

.sizeXs {
  width: var(--dyn-avatar-size-xs, var(--avatar-size-xs, 24px));
  height: var(--dyn-avatar-size-xs, var(--avatar-size-xs, 24px));
}

.sizeMd {
  width: var(--dyn-avatar-size-md, var(--avatar-size-md, 40px));
  height: var(--dyn-avatar-size-md, var(--avatar-size-md, 40px));
}
```

---

## 4. Implementation Instructions

### 4.1 Code Changes Required

**FILE: `packages/dyn-ui-react/src/components/DynAvatar/DynAvatar.module.css`**

**Change 1**: Replace hardcoded size values (Lines 5-50)

```css
/* BEFORE - Line 5-12 */
.sizeXs {
  width: 24px;
  height: 24px;
  font-size: 12px;
}

.sizeSm {
  width: 32px;
  height: 32px;
  font-size: 14px;
}

/* AFTER */
.sizeXs {
  width: var(--dyn-avatar-size-xs, 24px);
  height: var(--dyn-avatar-size-xs, 24px);
  font-size: calc(var(--dyn-avatar-size-xs, 24px) / 2);
}

.sizeSm {
  width: var(--dyn-avatar-size-sm, 32px);
  height: var(--dyn-avatar-size-sm, 32px);
  font-size: calc(var(--dyn-avatar-size-sm, 32px) / 2);
}
```

**Change 2**: Replace status/badge hardcoded values (Lines 60-80)

```css
/* BEFORE - Line 65-75 */
.status {
  position: absolute;
  width: 12px;
  height: 12px;
  border: 2px solid;
  border-radius: 50%;
  top: -4px;
  right: -4px;
}

/* AFTER */
.status {
  position: absolute;
  width: var(--dyn-avatar-status-size, 12px);
  height: var(--dyn-avatar-status-size, 12px);
  border: var(--dyn-avatar-border-width, 2px) solid 
          var(--dyn-avatar-border-color, var(--dyn-color-surface, white));
  border-radius: 50%;
  top: var(--dyn-avatar-status-offset, -4px);
  right: var(--dyn-avatar-status-offset, -4px);
}
```

**Change 3**: Remove unused CSS classes (Lines 90-120)

```css
/* DELETE - These are NOT used */
/* ❌ .badge - Declared but unused */
/* ❌ .group - Declared but unused */
/* ❌ .groupItem - Declared but unused */
/* ❌ .dyn-sr-only - Move to global styles */
```

**Change 4**: Add proper border radius tokens (New addition after line 50)

```css
/* ADD - Border radius with tokens */
.circle {
  border-radius: var(--dyn-border-radius-full, 50%);
}

.square {
  border-radius: var(--dyn-border-radius-sm, 4px);
}
```

---

### 4.2 TypeScript Changes

**FILE: `packages/dyn-ui-react/src/components/DynAvatar/DynAvatar.tsx`**

**Change 1**: Add JSDoc to component (Line 1, before component)

```typescript
/**
 * DynAvatar - User Profile Picture Component
 * 
 * Displays a user's profile picture with fallback to initials.
 * Supports multiple sizes, shapes, and status indicators.
 * 
 * @example
 * ```tsx
 * <DynAvatar
 *   src="/user.jpg"
 *   alt="User profile"
 *   size="md"
 *   status="online"
 * />
 * ```
 * 
 * @see {@link DynAvatarProps} for available props
 */
```

**Change 2**: Add JSDoc to functions (Throughout file)

```typescript
/**
 * Renders the avatar content (image, initials, or icon)
 * @param src - Image URL
 * @param initials - Fallback initials text
 * @returns ReactElement
 */
const renderContent = (src?: string, initials?: string): ReactNode => {
  // ...
}
```

---

### 4.3 Component Usage & Dependencies

**Used In**:
- Header components (user menu)
- Comment sections
- User list views
- Profile pages
- Team/member cards

**Depends On**:
- React Core (forwardRef, useState, useEffect)
- No external dependencies
- CSS Modules for styling

**Components That Depend On It**:
- DynUserCard (shows avatar)
- DynCommentList (displays user avatars)
- DynTeamGrid (team member avatars)

---

## 5. Testing & Storybook

### 5.1 Current Test Coverage (78%)

**What's Covered** ✅:
- Image loading and display
- Initials rendering and formatting
- Size variations (xs, sm, md, lg, xl)
- Status badge visibility and positioning
- Shape variations (circle, square)
- Fallback behavior
- Click handler
- Ref forwarding
- Accessibility attributes
- Dark mode transitions

**Test File**: `packages/dyn-ui-react/src/components/DynAvatar/DynAvatar.test.tsx` (12.3 KB)

**Tests to Add** (to reach 85%+):
1. CSS token variable application
2. Missing image error handling with timeout
3. Status change callback with different states
4. Keyboard navigation (arrow keys if interactive)
5. CSS class presence validation

**Example Test to Add**:
```typescript
test('applies design tokens from CSS variables', () => {
  const { container } = render(<DynAvatar size="md" />);
  const avatar = container.querySelector('.avatar');
  const computed = window.getComputedStyle(avatar!);
  
  // Should use token variable
  expect(computed.width).toBe('var(--dyn-avatar-size-md)');
});
```

### 5.2 Storybook Stories

**Current Stories** ✅:
- Default
- Sizes (xs, sm, md, lg, xl)
- With Image
- With Initials
- Status Indicators
- Shapes (circle, square)
- Interactive Mode

**Stories to Add** (Optional):
1. Dark Mode Variants
2. Loading State
3. Error State
4. Custom Colors (via CSS classes)
5. Combined Features (large + status + custom class)

**Storybook File**: `packages/dyn-ui-react/src/components/DynAvatar/DynAvatar.stories.tsx`

---

## 6. Files to Modify/Create/Delete

### ADD (Create New)
```
None - Working with existing files
```

### MODIFY (Update Existing)
```
📝 packages/dyn-ui-react/src/components/DynAvatar/DynAvatar.module.css
   - Lines 5-50: Replace hardcoded sizes with tokens
   - Lines 60-80: Replace status badge hardcoded values
   - Lines 90-120: Remove unused CSS classes
   - New: Add border-radius token variables
   - Estimated time: 45 minutes

📝 packages/dyn-ui-react/src/components/DynAvatar/DynAvatar.tsx
   - Line 1: Add JSDoc to component
   - Lines 15-30: Add JSDoc to functions
   - Line 50: Add comment about token usage
   - Estimated time: 30 minutes

📝 packages/dyn-ui-react/src/components/DynAvatar/DynAvatar.test.tsx
   - Add 5 new tests for token application
   - Add test for error handling with timeout
   - Estimated time: 45 minutes

📝 packages/dyn-ui-react/src/components/DynAvatar/DynAvatar.stories.tsx
   - Add dark mode control (optional)
   - Estimated time: 15 minutes
```

### DELETE (Remove)
```
None - All files are needed
```

---

## 7. Design Token Constants

**Create/Update Token File**:
`packages/dyn-ui-react/src/styles/tokens.css` or similar

```css
/* Avatar Size Tokens */
:root {
  --dyn-avatar-size-xs: 24px;
  --dyn-avatar-size-sm: 32px;
  --dyn-avatar-size-md: 40px;
  --dyn-avatar-size-lg: 56px;
  --dyn-avatar-size-xl: 72px;
  
  /* Status Badge Tokens */
  --dyn-avatar-status-size: 12px;
  --dyn-avatar-status-offset: -4px;
  --dyn-avatar-border-width: 2px;
  --dyn-avatar-border-color: var(--dyn-color-surface);
}

/* Dark Mode Adjustments */
@media (prefers-color-scheme: dark) {
  :root {
    --dyn-avatar-border-color: var(--dyn-color-surface-dark);
  }
}
```

---

## 8. Validation Checklist

### Code Quality
- [ ] All hardcoded values replaced with tokens
- [ ] Unused CSS classes removed
- [ ] JSDoc comments added to component and functions
- [ ] Props properly typed in DynAvatar.types.ts
- [ ] Component exported from index.ts
- [ ] No TypeScript errors (`tsc --noEmit`)

### Design Tokens
- [ ] Avatar tokens defined in token file
- [ ] CSS uses 3-level fallback pattern: `var(--dyn-avatar-size-md, var(--avatar-size-md, 40px))`
- [ ] Global tokens imported/used where applicable
- [ ] Dark mode tokens applied
- [ ] Tokens validated in browser DevTools

### Testing
- [ ] All existing tests pass (78%)
- [ ] 5 new token-related tests added
- [ ] Test coverage ≥ 80%
- [ ] No console errors/warnings
- [ ] Run: `npm test -- DynAvatar`

### Accessibility
- [ ] ARIA attributes present
- [ ] Keyboard navigation works
- [ ] Color contrast > 4.5:1
- [ ] Screen reader compatible
- [ ] Run: `axe DevTools` in browser

### Storybook
- [ ] All stories load without errors
- [ ] Visual regression tests pass (if configured)
- [ ] Dark mode toggle works
- [ ] All size variants display correctly
- [ ] Status indicators render properly
- [ ] Run: `npm run storybook`

### Documentation
- [ ] Component README updated
- [ ] Usage examples added
- [ ] Props documented
- [ ] Known limitations listed
- [ ] Changelog updated

---

## 9. Git Workflow

### Branch Name
```
feat/DynAvatar-token-compliance
```

### Commit Messages
```bash
git commit -m "feat(DynAvatar): replace hardcoded CSS values with design tokens"
git commit -m "refactor(DynAvatar): remove unused CSS classes"
git commit -m "docs(DynAvatar): add JSDoc comments"
git commit -m "test(DynAvatar): add token application tests"
```

### PR Template
```markdown
## DynAvatar - Token Compliance & Refactor

### Changes
- Replace hardcoded CSS values with design tokens
- Remove 4 unused CSS classes
- Add JSDoc documentation
- Add 5 new tests

### Score Improvement
- Before: 72% ⚠️ FAIR
- After: 85%+ ✅ GOOD

### Testing
- [ ] All tests pass
- [ ] Coverage ≥ 80%
- [ ] Storybook renders correctly
- [ ] Dark mode verified

### Files Changed
- DynAvatar.module.css (tokens)
- DynAvatar.tsx (JSDoc)
- DynAvatar.test.tsx (new tests)
- DynAvatar.stories.tsx (optional)
```

---

## 10. Performance & Optimization Notes

### Current Performance
- Component renders quickly (< 16ms)
- No memory leaks detected
- Image loading handled with useEffect cleanup

### Potential Optimizations (Future)
1. Lazy load large images (lg, xl sizes)
2. Add image compression library
3. Use React.memo for performance
4. Optimize initials calculation with useMemo
5. Add image caching strategy

### Recommended Priority
- Phase 1 (CRITICAL): Token compliance ✅
- Phase 2 (HIGH): Documentation
- Phase 3 (MEDIUM): Optimizations

---

## 11. Summary & Timeline

### Time Breakdown
- CSS Token fixes: **45 min**
- TSX JSDoc & comments: **30 min**
- Remove unused CSS: **15 min**
- New tests: **45 min**
- Testing & validation: **30 min**
- **Total: 2.5-3 hours** (vs. 4-5 hours estimated)

### Expected Results
- CSS Token Compliance: 65% → 95% ✅
- Overall Score: 72% → 85%+ ✅
- Test Coverage: 78% → 82%+ ✅

### Success Criteria
- ✅ All hardcoded values use tokens
- ✅ No unused CSS classes
- ✅ JSDoc on all functions
- ✅ 5 new passing tests
- ✅ Score ≥ 85%
- ✅ Ready for production ✅

---

**Status**: Ready to implement  
**Next Step**: Start with CSS token changes in DynAvatar.module.css  
**Estimated Completion**: 2.5-3 hours
