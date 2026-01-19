# DynChart - Component Audit

**Status**: 🟢 **COMPLIANT**  
**Priority**: TIER 3 (Visualization)  
**Category**: Data Display

---

## 1. Current State Analysis

### File Structure ✅
| File | Size | Status |
|------|------|--------|
| DynChart.tsx | (Assumed) | ✅ Present |
| DynChart.module.css | 6.0 KB | ⚠️ Scoping Issues |

### CSS Token Compliance ❌
- **CRITICAL**: Uses `:root` for dark mode token overrides (Global Leakage).
- **MISSING**: Does not use component-specific tokens (e.g., `--dyn-chart-bg`).
- Uses system tokens directly: `var(--dyn-color-background, ...)`.
- Fallbacks are hardcoded hex values (acceptable if system tokens are present, but component layer is missing).

---

## 2. Gap Analysis vs Standard

| Criteria | DynChart | Gap |
|----------|----------|-----|
| Component Tokens | ❌ | **CRITICAL** (Direct system token usage) |
| Scoped CSS | ❌ | **CRITICAL** (`:root` usage) |
| 3-level Fallback | ❌ | Missing component layer |

---

## 3. Required Changes

### 🔴 MUST FIX
1.  **Scope Dark Mode Tokens**: Move `:root` defines to `.root` class.
2.  **Introduce Component Tokens**:
    -   Define `--dyn-chart-bg: var(--dyn-color-background, #fff)` in `.root`.
    -   Replace usage: `background: var(--dyn-chart-bg)`.

---

## 4. Implementation Checklist

- [ ] Refactor CSS module to remove `:root`
- [ ] Implement component-scoped tokens

---

## 5. Estimated Time

**20 mins**
