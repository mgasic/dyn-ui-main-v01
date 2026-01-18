# ThemeSwitcher - Component Audit

**Status**: ⚠️ **NEEDS REFACTOR (50%)**  
**Priority**: TIER 3 (Utility)  
**Category**: Utility Components

---

## 1. Current State Analysis

### File Structure ⚠️
| File | Size | Status |
|------|------|--------|
| ThemeSwitcher.tsx | 2.9 KB | ✅ Working but... inline styles? |
| ThemeSwitcher.types.ts | 138 B | ✅ Simple |
| ThemeSwitcher.stories.tsx | 510 B | ⚠️ Minimal |
| ThemeSwitcher.test.tsx | 186 B | 🔴 Stub only |
| index.ts | 113 B | ✅ Present |

### Implementation Issues
- **Heavy Inline Styles**: The component uses extensive `style={{...}}` blocks instead of CSS Modules.
- **Hardcoded Colors**: Uses strict hex fallbacks inside JS logic (`#3b82f6`, `#e5e7eb`).
- **No Token Utilization**: Bypasses the token system for spacing/borders.

---

## 2. Gap Analysis vs Standard

| Criteria | DynAvatar | ThemeSwitcher | Gap |
|----------|-----------|---------------|-----|
| CSS Modules | ✅ | ❌ | 100% |
| Token Usage | ✅ | ❌ | 100% |
| Tests | ✅ | ❌ | 100% |
| displayName | ✅ | ✅ | 0% |

---

## 3. Required Changes

### 🔴 MUST FIX

#### 1. Move Styles to CSS Module
Create `ThemeSwitcher.module.css` and move all inline styles there.
Use design tokens:
- Spacing: `var(--dyn-spacing-sm)`
- Colors: `var(--dyn-color-primary)` (without hardcoded hex fallbacks in CSS ideally)
- Radius: `var(--dyn-radius-md)`

#### 2. Remove Hardcoded Logic
Remove `getSpacing` and `getBorderRadius` functions. Use CSS classes:
```css
.switcher--sm { padding: ... }
.switcher--md { padding: ... }
```

### 🟡 SHOULD FIX

#### 3. Expand Tests
Add real interaction tests (click handler).

---

## 4. Implementation Checklist

- [ ] Create CSS Module 🔴
- [ ] Remove inline styles 🔴
- [ ] Refactor component to use classes
- [ ] Expand tests

---

## 5. Estimated Time

**1 hour**
