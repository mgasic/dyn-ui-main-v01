# Design Token System Audit

**Date**: January 19, 2026  
**Status**: ⚠️ **PARTIAL INTEGRATION**

---

## Executive Summary

The project has a **centralized design token system** (`packages/design-tokens`) that generates CSS variables, but **components are not using the generated tokens**. Instead, they rely on **inline fallback values** and custom CSS variables.

---

## Current State

### Token Generation (`packages/design-tokens`)

✅ **Working Token Build System**:
- Uses Style Dictionary to generate tokens
- Output: `styles/foundations/index.css`, component-specific CSS files
- Build command: `pnpm run tokens:build`
- Generated format: `----dyn-*` (⚠️ **FOUR dashes - BUG!**)

### Generated Token Files

```
styles/
├── foundations/
│   └── index.css          # Foundation tokens (--dyn-color-*, --dyn-spacing-*, etc.)
├── components/
│   ├── badge.css          # Badge-specific tokens
│   ├── avatar.css         # Avatar-specific tokens
│   ├── table.css          # Table-specific tokens
│   └── responsive-tabs.css
```

### Problem: Generated Tokens Have Incorrect Naming

**`styles/foundations/index.css`:**
```css
:root {
  ----dyn-transition-all: all 0.2s ease-in-out;  /* ❌ 4 dashes */
  ----dyn-spacing-xs: 4rem;                       /* ❌ Should be 4px */
  ----dyn-border-radius-sm: 2rem;                 /* ❌ Should be 2px */
}
```

**Issues**:
1. ❌ `----dyn-*` (four dashes) instead of `--dyn-*` (two dashes)
2. ❌ Wrong units (`rem` instead of `px` for spacing/borders)
3. ❌ Tokens **not imported** into component CSS

---

## Component Usage Patterns

### Current Pattern (Inline Fallbacks)

**Example from `DynButton.module.css`:**
```css
.root {
  border-radius: var(--dyn-button-border-radius, 
                 var(--dyn-border-radius-md, 
                 var(--border-radius-md, 0.5rem)));
  
  padding: var(--dyn-button-padding-y) 
           var(--dyn-button-padding-x);
  
  color: var(--dyn-color-primary, 
        var(--color-primary, #2563eb));  /* ❌ Hardcoded fallback */
}
```

**This approach**:
- ✅ Works without central token system
- ✅ Has fallback values
- ❌ **Doesn't use generated tokens**
- ❌ Duplicates token definitions across files
- ❌ Inconsistent with centralized design system

---

## What SHOULD Happen

### Ideal Architecture

```
design-tokens/
├── tokens/              # JSON token definitions
│   ├── color/
│   ├── spacing/
│   └── typography/
├── build/
│   ├── css/
│   │   └── tokens.css  # ✅ Generated: :root { --dyn-spacing-xs: 4px; }
│   └── js/tokens.js

dyn-ui-react/
├── src/
│   ├── index.css       # ✅ Import: @import "@dyn-ui/design-tokens/build/css/tokens.css"
│   └── components/
│       └── DynButton/
│           └── DynButton.module.css  # ✅ Use: padding: var(--dyn-spacing-xs);
```

### Correct Token Usage

**`dyn-ui-react/src/index.css`:**
```css
/* Import centralized tokens */
@import '@dyn-ui/design-tokens/build/css/tokens.css';
```

**`DynButton.module.css`:**
```css
.root {
  /* Use global tokens directly - NO hardcoded fallbacks */
  padding: var(--dyn-spacing-sm) var(--dyn-spacing-md);
  border-radius: var(--dyn-border-radius-md);
  color: var(--dyn-color-primary);
  
  /* Component-scoped tokens override globals */
  --dyn-button-bg: var(--dyn-color-primary);
  background: var(--dyn-button-bg);
}
```

---

## Critical Issues

### 1. Token Generation Bug

**File**: `packages/design-tokens/style-dictionary.config.v2.js`

```javascript
// ❌ CURRENT: Generates ----dyn-*
name: '----dyn-' + token.path.join('-')

// ✅ SHOULD BE:
name: '--dyn-' + token.path.join('-')
```

### 2. Wrong Units

**Current**:
```css
----dyn-spacing-xs: 4rem;      /* ❌ rem */
----dyn-border-width-sm: 1rem; /* ❌ rem */
```

**Should be**:
```css
--dyn-spacing-xs: 4px;         /* ✅ px */
--dyn-border-width-sm: 1px;    /* ✅ px */
```

### 3. No Import Path

Components **don't import** generated token CSS:
- ❌ No `@import` in `dyn-ui-react/src/index.css`
- ❌ Components define own fallback values
- ❌ No single source of truth

---

## Recommendations

### Phase 1: Fix Token Generation (CRITICAL)

1. **Fix Style Dictionary config**:
   ```bash
   # Edit: packages/design-tokens/style-dictionary.config.v2.js
   # Change: ----dyn-* → --dyn-*
   # Fix units: rem → px for spacing/borders
   ```

2. **Rebuild tokens**:
   ```bash
   pnpm run tokens:build
   ```

3. **Verify generated CSS**:
   ```bash
   cat packages/design-tokens/styles/foundations/index.css
   # Should show: --dyn-spacing-xs: 4px;
   ```

### Phase 2: Import Tokens into React Package

1. **Add import to `dyn-ui-react/src/index.css`**:
   ```css
   @import '@dyn-ui/design-tokens/styles/foundations/index.css';
   @import '@dyn-ui/design-tokens/styles/components/index.css';
   ```

2. **Update `package.json`**:
   ```json
   {
     "dependencies": {
       "@dyn-ui/design-tokens": "workspace:*"
     }
   }
   ```

### Phase 3: Refactor Components (LOW PRIORITY)

Remove hardcoded fallbacks from component CSS - **only if you want maximum consistency**.

Current approach (inline fallbacks) **works fine** for:
- Standalone components
- Published npm packages
- Projects without central token system

---

## Decision Points

### Option A: Keep Current Approach (Recommended for now)
- ✅ Components work standalone
- ✅ No breaking changes
- ✅ Fallback values ensure portability
- ⚠️ Token duplication across files
- ⚠️ Manual sync required

### Option B: Full Token Integration
- ✅ Single source of truth
- ✅ Centralized theming
- ✅ Easier to maintain consistency
- ❌ Requires token system to be present
- ❌ Breaking change if published separately
- ❌ More complex build process

---

## Immediate Action Items

1. **FIX** `style-dictionary.config.v2.js`:
   - Change `----dyn-*` → `--dyn-*`
   - Fix units (rem → px where appropriate)

2. **VERIFY** build output:
   - Run `pnpm run tokens:build`
   - Check generated CSS

3. **DOCUMENT** decision:
   - Keep inline fallbacks OR
   - Import central tokens

4. **UPDATE** this audit with final decision

---

## Status

- ⚠️ **Token generation has bugs** (4 dashes, wrong units)
- ⚠️ **Components don't import generated tokens**
- ✅ **Components work** (using inline fallbacks)
- 📝 **Decision needed**: Full integration vs. current approach
