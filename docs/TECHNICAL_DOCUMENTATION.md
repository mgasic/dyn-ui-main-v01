# 📘 DYN-UI Technical Documentation & Agent Manual

**Version:** 2.1 (Agent-Optimized)
**Date:** January 28, 2026
**Status:** ACTIVE

---

## 🚀 Introduction

This is the **Master Technical Code for DYN-UI**. It serves as the primary entry point for all Developers and AI Agents working on the project.
**CRITICAL:** strictly follow the rules defined here. Deviations will be rejected by the audit system.

For identifying exceptions and current codebase issues, verify [PROJECT_IRREGULARITIES_REPORT.md](audit/PROJECT_IRREGULARITIES_REPORT.md).

---

## 📚 1. Key Reference Documentation

You do not need to guess. The answers are in these files:

| Document | Purpose |
|----------|---------|
| **[COMPLETE_KNOWLEDGE_BASE.md](COMPLETE_KNOWLEDGE_BASE.md)** | **THE SOURCE OF TRUTH.** Contains all token values, CSS patterns, and template code. |
| **[DESIGN_TOKEN_SYSTEM.md](DESIGN_TOKEN_SYSTEM.md)** | Detailed breakdown of the 3-Layer Token System. |
| **[GOLDEN_AUDIT_CHECKLIST.md](FINAL_DOCUMENTATION_AND_INSTRUCTIONS/GOLDEN_AUDIT_CHECKLIST.md)** | The 5-level strict checklist for confirming component quality. |
| **[.agent/workflows/](../.agent/workflows/)** | Specific step-by-step instructions for common tasks (Analysis, Audit, Proposals). |

---

## 🤖 2. Operating Rules for AI Agents

When working on this codebase, you must adhere to the following **Prime Directives**:

### Rule #1: The 3-Layer Token Law
Never hardcode hex values, pixels, or fonts directly.
*   **Correction:** Use `var(--token-name, fallback)`.
*   **Allowed Exception:** You may use hardcoded values ONLY as the *3rd argument* (fallback) within a `var()` statement.
    *   ✅ `color: var(--dyn-button-text, #ffffff);`
    *   ❌ `color: #ffffff;`

### Rule #2: Naming Conventions are Absolute
*   **JavaScript/React:** Use `CamelCase` for props and variables.
*   **CSS Classes:** Use `camelCase`.
    *   ✅ `.root`, `.sizeSmall`, `.variantPrimary`
    *   ❌ `.btn-primary`, `.size-sm`, `.VariantPrimary`
*   **Size Variants:** Use **Full Words** for class names.
    *   ✅ `sizeSmall`, `sizeMedium`, `sizeLarge`
    *   ❌ `sizeSm`, `sizeMd`, `sizeLg` (Exception: `DynAvatar` currently uses mixed abbreviations. See Irregularities Report).

> [!NOTE]
> **Exception:** `DynBox` is a polymorphic utility primitive and may use short utility classes (e.g., `boxPSm`). This is an intentional deviation.

### Rule #3: The 6-File Component Standard
Every component must consist of exactly these files:
1.  `DynName.tsx` (Logic)
2.  `DynName.types.ts` (Interfaces)
3.  `DynName.module.css` (Styles)
4.  `DynName.stories.tsx` (Documentation)
5.  `DynName.test.tsx` (Verification)
6.  `index.ts` (Export)

### Rule #4: Verification First
Before confirming a task is complete, you MUST run:
1.  `npm run check:implementation` (General Audit)
2.  `npm run validate:components` (Type Check)
3.  `npm test [Component]` (Unit Tests)

---

## 🛠️ 3. Workflow Implementation

### Phase 1: Planning
*   Read `DESIGN_TOKEN_SYSTEM.md`.
*   Check `PROJECT_IRREGULARITIES_REPORT.md` for known issues in related components.
*   Create an `implementation_plan.md` artifact.

### Phase 2: Execution
*   Follow the **implementation workflow** in `COMPLETE_KNOWLEDGE_BASE.md`.
*   Use `MultiReplace` for complex edits, `Replace` for blocks.
*   **CSS Modules**: Define all variables in `:root` at the top of the file.

### Phase 3: Audit & Polish
*   Run the "Golden Audit Checklist".
*   Ensure **Dark Mode** works via token overrides (Layer 3).
*   Verify **Accessibility** (ARIA roles, keyboard nav).

---

## 🔍 4. Troubleshooting & FAQ

**Q: I found a hardcoded color in `DynAvatar`. Should I fix it?**
A: Yes, but check `PROJECT_IRREGULARITIES_REPORT.md` first. If it's a known legacy issue, prioritize stability. If it's new code, it is a bug.

**Q: Which size name should I use? `size="md"` or `size="medium"`?**
A: **Props** usually use short codes (`sm`, `md`, `lg`) for developer ergonomics. **CSS Classes** MUST use full names (`sizeSmall`, `sizeMedium`) to match the standard (DynButton).

**Q: How do I add a new token?**
A: You cannot add tokens in components. Tokens are defined in `packages/design-tokens`. If a token is missing, use a hardcoded fallback and flag it for the Design System team.

---

**End of Manual**
