# 🚩 Project Irregularities and Deviations Report
**Date:** January 28, 2026
**Auditor:** Antigravity Agent
**Scope:** `packages/dyn-ui-react`

---

## 📋 Executive Summary
A detailed audit of the `dyn-ui-react` package was conducted against the `GOLDEN_AUDIT_CHECKLIST.md` and `DESIGN_TOKEN_SYSTEM.md`. While the project shows a high level of adherence to the architectural standards (3-Level Fallback, CSS Modules), minor naming inconsistencies and legacy patterns were detected.

## 🚨 Identified Irregularities

### 1. Naming Convention Inconsistency (Size Variants)
**Severity:** 🟡 Moderate (Consistency Issue)
**Location:** `DynAvatar` vs `DynButton`/`DynInput`

**Observation:**
There is a lack of standardization in how size variants are named in CSS classes and component logic.
*   **Standard (Majority):** Uses proper full words (`Small`, `Medium`, `Large`).
    *   `DynButton`: `.sizeSmall`, `.sizeMedium`, `.sizeLarge`
    *   `DynInput`: `.inputSmall`, `.inputMedium`, `.inputLarge`
*   **Deviation:** `DynAvatar` uses mixed abbreviation styles.
    *   `DynAvatar`: `.sizeXs`, `.sizeSm`, `.sizeM` (Not Md?), `.sizeLg`, `.sizeXl`

**Recommendation:**
Standardize all components to use either full words OR widely accepted T-shirt sizing key (e.g., `sm`, `md`, `lg`) consistently. Given `DynButton` and `DynInput` are core inputs, their "Full Word" approach seems to be the intended standard for class names, while props might remain short (`size="md"`).
*   **Proposed Fix:** Rename `DynAvatar` classes to `.sizeExtraSmall`, `.sizeSmall`, `.sizeMedium`, `.sizeLarge`, `.sizeExtraLarge` to match `DynButton`.

### 2. Typographical Inconsistency (`sizeM` vs `sizeMd`)
**Severity:** 🟡 Moderate
**Location:** `DynAvatar.module.css`

**Observation:**
Within `DynAvatar` itself, the naming scheme switches between 2-letter codes (`sm`, `xs`) and 1-letter code (`M` for Medium).
*   `.sizeXs` (2 letters)
*   `.sizeSm` (2 letters)
*   `.sizeM` (1 letter - Inconsistent)
*   `.sizeLg` (2 letters)

**Recommendation:**
If using abbreviations, use `.sizeMd`. If using full words (preferred by `DynButton`), use `.sizeMedium`.

### 3. Utility vs Component Class Naming
**Severity:** 🟢 Minor (Architecture choice)
**Location:** `DynBox` vs Others

**Observation:**
`DynBox` uses a unique prefixing strategy (`.boxPSm`, `.boxBgPrimary`) which differs from the standard `.root` or `.container` pattern.
**Context:** This is likely intentional as `DynBox` is a polymorphic utility primitive, but it deviates from the standard "Component" structure.
**Recommendation:** Explicitly document `DynBox` as a "Primitive/Utility" that follows a different naming standard in the Technical Documentation to prevent Agents from trying to "fix" it or replicating this pattern for standard components.

### 4. Hardcoded Values as Fallbacks (Compliance Verification)
**Severity:** 🟢 Passed (With Note)
**Location:** Global
**Observation:**
Extensive use of hex codes was found in CSS files (e.g., `#2563eb`).
**Verification:** Manual inspection of `DynButton` and `DynInput` confirms these are correctly populated as the *3rd argument* in the `var()` fallback chain.
*   Example: `var(--token, var(--fallback, #hex))`
**Action:** No fix needed, but the "Linter" rule for Agents must be smart enough to distinguish `color: #hex` (Bad) from `var(..., #hex)` (Good).

---

## 🛠️ Remediation Plan

1.  **Standardize `DynAvatar`**: Refactor `DynAvatar.module.css` and `DynAvatar.tsx` to use `.sizeMedium` instead of `.sizeM` (and others) to align with `DynButton`.
2.  **Update Documentation**: Explicitly verify the "Naming Convention" section in `TECHNICAL_DOCUMENTATION.md` to specify "Full Words" for class names (CamelCase) is the required standard (`sizeSmall`, not `sizeSm`).
3.  **Agent Rules**: Add a rule to the Agent Knowledge Base to check for "T-shirt sizing" inconsistencies.
