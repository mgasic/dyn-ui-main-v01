# DynChart – Implementation Guide

## Component Overview

DynChart renders data visualisations such as line, bar, and pie charts using the canvas API under the hood.  It accepts a data array and a configuration object to define the type of chart, axes, labels, colours and interactive behaviours (tooltips, click events).  It must support responsive resizing, dark mode styling, high‑contrast accessibility, and fallback content for users who cannot view canvas elements (screen readers).  The component is central for dashboards and analytics views in Dyn UI, and therefore must be performant, tokenised and accessible.

## Current State Analysis

The existing implementation can be found at `packages/dyn-ui-react/src/components/DynChart`.  There are companion docs in `docs/COMPONENT_AUDITS/DynChart_AUDIT.md` and action plans.  The audit identified several critical issues:

* **Dark mode CSS bug** – The CSS module defines dark‑mode variables in a `@media (prefers-color-scheme: dark)` block using `:root` as the selector.  This leaks the tokens globally and breaks the token architecture【454883878784045†L30-L46】.
* **Hard‑coded colours** – The canvas rendering logic uses literal colour values (e.g., `'#00bFFF'`, `'#333'`) instead of reading from CSS variables.  This prevents theme switching and dark mode support【454883878784045†L84-L116】.
* **Accessibility gaps** – There is no fallback table representation of the chart data for screen readers; keyboard navigation is limited and lacks focus management; ARIA roles and labels are missing.
* **Test coverage** – Tests cover only ~50 % of functionality.  Missing cases include dark mode rendering, responsive resizing, tooltips, keyboard navigation and screen reader fallback.
* **Documentation** – The README and storybook stories are minimal and do not document all chart types and options.

## Implementation Instructions

1. **Refactor token usage**.  Create or update `DynChart.module.css` to define chart‑specific tokens with three‑level fallbacks.  Use a `.container` wrapper for scoping.  Tokens should cover canvas colours (background, axis lines, grid lines, dataset colours), font sizes, padding, tooltip styling, legend spacing, etc.  For example:

    ```css
    .container {
      --dyn-chart-bg: var(--dyn-chart-bg-base, var(--dyn-color-surface, #ffffff));
      --dyn-chart-axis: var(--dyn-chart-axis-base, var(--dyn-color-border, #d0d7de));
      --dyn-chart-grid: var(--dyn-chart-grid-base, var(--dyn-color-border-muted, #e1e4e8));
      --dyn-chart-text: var(--dyn-chart-text-base, var(--dyn-color-text-primary, #24292e));
      /* dataset colours (primary, secondary, tertiary) */
      --dyn-chart-dataset-1: var(--dyn-chart-dataset-1-base, var(--dyn-color-accent-primary, #1f77b4));
      --dyn-chart-dataset-2: var(--dyn-chart-dataset-2-base, var(--dyn-color-accent-secondary, #ff7f0e));
      /* ... additional tokens ... */
    }

    @media (prefers-color-scheme: dark) {
      .container {
        --dyn-chart-bg: var(--dyn-chart-bg-dark, var(--dyn-color-surface-dark, #0d1117));
        --dyn-chart-axis: var(--dyn-chart-axis-dark, var(--dyn-color-border-dark, #30363d));
        --dyn-chart-grid: var(--dyn-chart-grid-dark, var(--dyn-color-border-muted-dark, #21262d));
        --dyn-chart-text: var(--dyn-chart-text-dark, var(--dyn-color-text-primary-dark, #c9d1d9));
        --dyn-chart-dataset-1: var(--dyn-chart-dataset-1-dark, var(--dyn-color-accent-primary-dark, #58a6ff));
        --dyn-chart-dataset-2: var(--dyn-chart-dataset-2-dark, var(--dyn-color-accent-secondary-dark, #ffb380));
      }
    }
    ```

    Ensure all tokens are referenced by the canvas rendering logic (see next step) and avoid global `:root` overrides.

2. **Tokenise canvas rendering**.  In `DynChart.tsx`, refactor the drawing logic so that colours and fonts are read from computed CSS variables rather than hard‑coded values.  You can extract tokens from the container using `getComputedStyle()` or by referencing CSS variables on the canvas context:

    ```ts
    const containerStyles = window.getComputedStyle(containerRef.current!);
    const bg = containerStyles.getPropertyValue('--dyn-chart-bg');
    const dataset1Color = containerStyles.getPropertyValue('--dyn-chart-dataset-1');
    // Use these values in canvas drawing instead of hard‑coded strings.
    ctx.fillStyle = dataset1Color.trim();
    ```

    Create helper functions to map dataset indices to token names.  Provide default colours via CSS fallback so the component can render without configuration.  Remove any literal colour strings from the drawing code.

3. **Implement accessibility fallback**.  Render a hidden HTML table representing the chart data so screen readers can access the information.  Use `aria-hidden="true"` on the canvas and `role="img"` with `aria-label` describing the chart.  Provide a visually hidden caption summarising what the chart conveys (e.g., “Sales over time: Q1 2024 – Q4 2024”).  Add keyboard focus styles and ensure the chart container is focusable if it supports interactions (e.g., clicking to highlight datasets).

4. **Improve interactions and events**.  Support keyboard navigation for charts that allow selection (e.g., bar charts where pressing arrow keys moves focus across bars).  For interactive tooltips, ensure they appear on keyboard focus as well as mouse hover.  Expose callbacks like `onPointFocus` or `onBarClick` and document them.  Provide prop options for enabling/disabling animation, customizing tooltip content, and controlling legend positioning.

5. **Enhance test coverage**.  Expand `DynChart.test.tsx` to cover:
   * Token application in both light and dark modes – check that canvas colours reflect the tokens.
   * Accessibility: presence of fallback table, correct `aria-label`, and no `axe` violations.
   * Responsive resizing – verify that charts re‑render correctly when the container size changes.  Use `ResizeObserver` mocks to simulate resizes.
   * Canvas drawing logic – use jest canvas mocks or a headless canvas API to assert that drawing functions are called with proper colours and positions.
   * Event handling: ensure callbacks fire when bars or points are clicked or focused.
   * All supported chart types (line, bar, pie) and configurations (stacked bars, multi‑dataset line charts, donut charts, etc.).

6. **Update documentation and examples**.  Write a README for DynChart that documents all props, including `type` (`'line' | 'bar' | 'pie' | …`), `data`, `options` (axes, legend, tooltip, responsive), `tokens` for customizing colours, and events.  Add comprehensive Storybook stories: each chart type with multiple datasets, dark mode, responsive container, interactive tooltips and accessibility demonstration.  Include code examples showing how to supply custom tokens via CSS and how to provide fallback table content.

7. **Git workflow**.  Create a branch (e.g., `feat/refactor-dyn-chart`).  Commit sequentially: token CSS refactor, canvas token integration, accessibility improvements, new tests, updated docs and stories.  Reference the audit report in the PR description and update the master index and implementation summary upon completion.

## Validation Checklist

- [ ] All chart styling is controlled via `--dyn-chart-*` tokens with three‑level fallbacks; dark mode tokens are scoped to `.container`.
- [ ] Canvas drawing functions read colours and other styling information from CSS variables rather than hard‑coded values.
- [ ] A semantic fallback table is rendered for screen readers, and the component has proper ARIA roles and labels.
- [ ] Keyboard navigation and focus management are implemented for interactive charts; tooltips are accessible via keyboard.
- [ ] Tests cover dark mode, responsive resizing, accessibility, token application and all chart types with at least 80 % coverage.
- [ ] README and Storybook stories document all props, tokens and usage scenarios.
- [ ] Component exports are updated, and the implementation summary reflects the refactor.
