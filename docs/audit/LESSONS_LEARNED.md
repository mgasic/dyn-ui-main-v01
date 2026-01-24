# 🎓 Lessons Learned: Component Audit & Refactor

This document captures key findings and patterns established during the refactoring of `DynBox` and `DynFlex`. Use this as a reference when auditing other components.

## 1. Token Usage Strategy
- **❌ Anti-Pattern**: Hardcoded pixel maps in TSX (e.g., `const map = { sm: '8px' }`).
- **✅ Best Practice**: Use CSS Variables derived from tokens (e.g., `var(--dyn-spacing-sm)`).
- **Why**: Ensures theme changes propagate instantly without code changes.

## 2. Architecture: Layout vs. UI Components
It is crucial to distinguish between **Layout Primitives** and **UI Components**:

### A. Layout Primitives (Box, Flex, Grid, Stack)
*   **Strategy**: **Direct Foundation Access**.
*   **Why**: Layouts are generic containers. They don't have "semantics" like a primary button does. Creating `--dyn-flex-gap-sm` that just points to `--dyn-spacing-sm` creates unnecessary indirection.
*   **Implementation**: Map props directly to foundation utility classes.
    *   `gap="sm"` -> `.gapSm { gap: var(--dyn-spacing-sm); }`

### B. UI Components (Button, Card, Input, Badge)
*   **Strategy**: **Component Tokens (JSON)**.
*   **Why**: These have semantic meaning and branding. We want to be able to change "Button Padding" separately from global "Spacing Scale".
*   **Implementation**: Define distinct tokens in `design-tokens/tokens/button.json`.
    *   `button.json` -> `{ "padding": "{size.spacing.md}" }`
    *   CSS -> `padding: var(--dyn-button-padding);`

## 3. Styling Implementation (Class-First)
- **❌ Anti-Pattern**: Heavy use of `style={{ ... }}` for everything.
- **✅ Best Practice**: Prefer CSS Modules classes for standard token values.
  - Example: `p="sm"` -> maps to `.boxPSm` class which sets `--dyn-box-padding`.
- **Why**: Better performance (smaller DOM), easier debugging, and consistent specificity.
- **Exception**: Use inline styles `styleVars` only for:
  - Dynamic/Arbitrary values (e.g., `width={123}`).
  - Specific directions not covered by utility classes (e.g., `pt="sm"` might use a var if a specific class doesn't exist, though adding utility classes is preferred).

## 4. CSS Modules Naming
- **Convention**: Use CamelCase for class names matching the prop structure.
  - Prop: `bg="primary"` -> Class: `.boxBgPrimary`
  - Prop: `p="lg"` -> Class: `.boxPLg`
- **Avoid**: Kebab-case in CSS modules (e.g., `.box-bg-primary`) unless legacy support is strictly legally required. CamelCase maps cleaner to JS object keys.

## 5. Test Adaptation
- **Issue**: Tests often check for specific inline styles (`toHaveStyle`).
- **Fix**: When moving to class-based tokens, tests must update to check for **classes** (`toHaveClass`) or simply verify the visual outcome if possible.
- **Gotcha**: If a component optimizes `p="sm"` to a class, `toHaveStyle({ '--dyn-box-padding': ... })` will FAIL. Remove these redundant assertions.

## 6. Strict TypeScript Types
- **Goal**: Ensure prop types match the **exact keys** available in design tokens.
- **Action**: Update `*.types.ts` to include all new token keys (e.g., `2xs`, `3xl`, `4xl`, `none`) identified in the foundation files.

## 7. Build & Linting
- **Observation**: `outputReferences: true` in Style Dictionary causes build warnings about filtered tokens.
- **Resolution**: These are false positives in a multi-file CSS architecture. As long as `index.css` is loaded, the variables resolve correctly in the browser.
