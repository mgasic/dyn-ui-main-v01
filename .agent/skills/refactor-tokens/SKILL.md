---
name: Refactor Tokens
description: Automates the process of upgrading legacy components to be 100% compliant with the new Design Token System.
---

# Refactor Tokens Skill

This skill guides the Agent to take an existing, non-compliant component and refactor it to meet the "Golden Audit" standards.

## 🎯 Goal
Eliminate hardcoded values and standardize CSS class names in existing components.

## 🔍 Audit Steps (Mental Check)
Before changing code, the Agent must identify:
1.  **Hardcoded Hex/RGB**: e.g., `#2563eb` -> needs `--dyn-color-primary`.
2.  **Hardcoded Spacing**: e.g., `8px` -> needs `--dyn-spacing-sm`.
3.  **Legacy Naming**: e.g., `.btn-primary` -> needs `.primary` or `.variantPrimary`.
4.  **Missing Fallbacks**: `var(--token)` -> needs `var(--token, fallback)`.

## 🛠️ Execution Process

### Step 1: CSS Refactoring (`.module.css`)

1.  **Create/Update `:root` Block**:
    *   Move all hardcoded values from the component class to CSS variables in a `:root` block at the top of the file.
    *   **Pattern**: `--dyn-[component]-[property]-[state]`.
    *   **Rule**: Use 3-level fallback: `var(--dyn-token, var(--legacy-token-or-global, hardcoded-fallback))`.

    ```css
    /* BEFORE */
    .root {
      background: #ffffff;
      padding: 16px;
    }

    /* AFTER */
    :root {
      --dyn-card-bg: var(--dyn-semantic-surface, #ffffff);
      --dyn-card-padding: var(--dyn-spacing-lg, 1rem); /* 16px */
    }
    .root {
      background: var(--dyn-card-bg);
      padding: var(--dyn-card-padding);
    }
    ```

2.  **Standardize Class Names**:
    *   Convert kebab-case (e.g., `.card-header`) to camelCase (e.g., `.cardHeader`).
    *   Standardize variants (e.g., `.size-sm` -> `.sizeSmall`).

### Step 2: React Refactoring (`.tsx`)

1.  **Update Class References**:
    *   Update `styles.className` calls to match the new camelCase CSS names.
    *   Example: `styles['card-header']` -> `styles.cardHeader`.

2.  **Remove Inline Styles**:
    *   If `style={{ ... }}` is used for static values, move them to `.module.css`.

### Step 3: Verification

1.  **Run Tests**: `npm test [Component]` to ensure logic hasn't broken.
2.  **Visual Check**: Verify in Storybook that styles look identical (or better).

## ⚠️ Critical Rules

*   **Do NOT** change the public API (props) of the component unless explicitly requested.
*   **Do NOT** delete existing logic.
*   **ALWAYS** keep the hardcoded value as the *3rd argument* in the `var()` fallback to ensure the component doesn't break if tokens fail to load.

---
**Reference**: See `docs/TECHNICAL_DOCUMENTATION.md` for the official constraints.
