# 🏗️ Component Architecture Registry

**Purpose**: This document defines the **Unified Standard** for component implementation.
**Strategy**: **Strict Component Tokens**.

Every component, regardless of complexity (from `DynBox` to `DynDatePicker`), MUST define its own semantic tokens in a dedicated JSON file. We do NOT use foundation tokens (e.g., `var(--dyn-spacing-md)`) directly in component CSS.

---

## 📐 The Golden Rule: Component Token Isolation

### 1. Token Definition (JSON)
Every component must have a corresponding definitions file in `packages/design-tokens/tokens/[component].json`.
This file maps **Component Semantic Tokens** to **Foundation Tokens**.

*   **Pattern**: `<component>.<category>.<property>.<variant>`
*   **Example (`box.json`)**:
    ```json
    {
      "box": {
        "padding": {
          "sm": { "value": "{spacing.sm}" },
          "md": { "value": "{spacing.md}" }
        },
        "bg": {
          "primary": { "value": "{color.theme.primary}" }
        }
      }
    }
    ```

### 2. Styles (CSS Modules)
Components consume *only* their generated component tokens.
*   ✅ **CORRECT**: `padding: var(--dyn-box-padding-sm);`
*   ❌ **WRONG**: `padding: var(--dyn-spacing-sm);` (Bypassing the component layer)

### 3. Implementation (React)
*   **Class Mapping**: Props map to CSS classes that utilize these specific variables.
*   **Naming**: Use CamelCase for classes (`.boxPaddingSm`) matching prop values where possible, or BEM-style modifiers (`.box--padding-sm`) if strictly following the new convention. *(Decision: We are standardizing on CamelCase for internal CSS Modules to match React prop naming conventions, e.g., `sizeSm`)*.

---

## 📚 Component Registry

### [DynBox](file:///e:/PROGRAMING/AI_Projects/dyn-ui-main-v02/packages/dyn-ui-react/src/components/DynBox/DynBox.tsx)
*   **Pattern**: Layout Primitive
*   **Status**: 🔄 **Refactor Pending** (Transitioning to JSON Tokens)
*   **Goal**: Create `box.json` and replace direct foundation references.

### [DynFlex](file:///e:/PROGRAMING/AI_Projects/dyn-ui-main-v02/packages/dyn-ui-react/src/components/DynFlex/DynFlex.tsx)
*   **Pattern**: Layout Primitive
*   **Status**: 🔄 **Pending**
*   **Goal**: Create `flex.json` for specific gap/aliasing if needed, or keep minimal if it only orchestrates layout.

### [DynGrid](file:///e:/PROGRAMING/AI_Projects/dyn-ui-main-v02/packages/dyn-ui-react/src/components/DynGrid/DynGrid.tsx)
*   **Pattern**: UI Component (Data Grid)
*   **Status**: 🔄 **Pending**
*   **Goal**: Create `grid.json` for border colors, header backgrounds, and row striping.

... (Other components will be added as they are migrated)
