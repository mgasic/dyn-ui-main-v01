---
name: Create Component
description: Generates a new UI component following strict enterprise standards (6-file structure, Design Tokens, 3-Layer Architecture).
---

# Create Component Skill

This skill guides the Agent to create a **perfectly compliant** new component from scratch.

## 🎯 Goal
Create a new React component that passes the "Golden Audit" immediately upon creation.

## 🛠️ Prerequisites
*   **ComponentName**: PascalCase (e.g., `DynNewFeature`)
*   **Variant**: Optional (Default: `primary`)

## 📜 1. The 6-File Standard
You must create exactly these files in `packages/dyn-ui-react/src/components/[ComponentName]/`:

1.  `[ComponentName].tsx`
2.  `[ComponentName].types.ts`
3.  `[ComponentName].module.css`
4.  `[ComponentName].stories.tsx`
5.  `[ComponentName].test.tsx`
6.  `index.ts`

## 🚀 Execution Steps

### Step 1: Create Directory
```bash
mkdir packages/dyn-ui-react/src/components/[ComponentName]
```

### Step 2: Generate Logic (`.tsx`)
*   Use `forwardRef`.
*   Import stules from `./[ComponentName].module.css`.
*   Use `cn` or `classNames` utility if available, or manual join.
*   **Rule**: NO inline styles.

### Step 3: Generate Types (`.types.ts`)
*   Extend `React.HTMLAttributes<HTMLElement>` (or specific element).
*   Define `variant`, `size`, `disabled` if applicable.
*   Export interface `[ComponentName]Props`.

### Step 4: Generate Styles (`.module.css`)
*   **CRITICAL**: Start with `:root` block for Component Tokens.
*   **CRITICAL**: Use 3-Level Fallback: `var(--dyn-comp-prop, var(--dyn-global-prop, default))`.
*   **CRITICAL**: Define Dark Mode overrides in `@media (prefers-color-scheme: dark)`.

Example Boilerplate:
```css
:root {
  --dyn-[name]-bg: var(--dyn-semantic-surface, #ffffff);
  --dyn-[name]-color: var(--dyn-semantic-text, #1f2937);
  --dyn-[name]-padding: var(--dyn-spacing-md, 0.75rem);
}

.root {
  background-color: var(--dyn-[name]-bg);
  color: var(--dyn-[name]-color);
  padding: var(--dyn-[name]-padding);
}
```

### Step 5: Generate Storybook (`.stories.tsx`)
*   Define `meta` with `tags: ['autodocs']`.
*   Create `Primary`, `Secondary`, and `DarkMode` stories.

### Step 6: Generate Tests (`.test.tsx`)
*   Test rendering.
*   Test variant class application.
*   Test accessibility (if `testA11y` helper exists).

### Step 7: Export (`index.ts`)
*   Export component and props.

## ✅ Verification
After creating files, run:
1.  `npm run typecheck`
2.  `npm run lint`
3.  `npm test [ComponentName]` (to ensure basic tests pass)

## ⚠️ Common Pitfalls to Avoid
*   **Never** use `px` for padding/margin (use `--dyn-spacing-*`).
*   **Never** use hex codes in `.root` (use `--dyn-color-*` or semantic tokens).
*   **Always** prefix CSS variables with `--dyn-[componentName]-`.
*   **Always** name the main class `.root` or `.container` (be consistent).

---
**Reference**: See `docs/TECHNICAL_DOCUMENTATION.md` for the single source of truth.
