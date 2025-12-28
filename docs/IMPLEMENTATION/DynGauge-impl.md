# DynGauge – Implementation Guide

## Component Overview
DynGauge is a visual indicator used to display a numeric value within a predefined range.  It renders gauges in circular, arc and linear forms, with optional ranges highlighted in different colours, tick marks and labels.  The gauge supports configurable size, thickness, rounding, animation and range definitions.  It uses a `<canvas>` element for drawing and provides accessible attributes (`role="progressbar"`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow`).  The component should be responsive, support dark mode and allow consumers to customise colours and sizes via design tokens or props.

## Current State Analysis
The current implementation includes a fairly comprehensive React component that draws gauge arcs, ranges and ticks on a canvas.  It supports different sizes (`small`, `medium`, `large`) and types (`arc`, `circle`, `line`) and exposes props for ranges, rounding, animation and formatting.  However, the drawing logic contains numerous hard‑coded values and colours.  For example, tick marks and labels are drawn with the hex colour `#666666` and the centre of the gauge uses `#ffffff`【427558994007309†L209-L221】【427558994007309†L252-L254】.  The range colours are determined by props but default to `#0066cc`, and gauge sizes are fixed to pixel values.  Design tokens are not used for colours, thickness or sizes, so dark mode and custom theming are difficult.  There is limited test coverage and minimal Storybook documentation.  Accessibility is provided via ARIA attributes but there is no screen‑reader fallback (e.g., textual description) if canvas cannot render.

## Implementation Instructions
1. **Tokenize gauge styles** – Define a set of `--dyn-gauge-*` tokens to replace all hard‑coded drawing values.  Key tokens should include:

   - `--dyn-gauge-bg-color` – default background arc colour.
   - `--dyn-gauge-track-color` – colour of the unfilled arc.
   - `--dyn-gauge-value-color` – colour of the filled portion.  
   - `--dyn-gauge-tick-color` – colour of tick marks and labels【427558994007309†L209-L221】.
   - `--dyn-gauge-center-color` – colour of the gauge centre marker【427558994007309†L252-L254】.
   - `--dyn-gauge-font-family` / `--dyn-gauge-font-size` for tick labels.  
   - `--dyn-gauge-thickness` – thickness of the arc line.  
   - `--dyn-gauge-radius-offset` – extra padding inside the gauge.  
   - Size tokens: `--dyn-gauge-size-small`, `--dyn-gauge-size-medium`, `--dyn-gauge-size-large`.  

   Provide dark‑mode overrides by defining the same tokens under `.dark .dyn-gauge`.  Each token should follow the three‑level fallback pattern.

2. **Expose tokens via CSS module** – Move any fixed numeric values out of the React code into the CSS module.  For example, define `.dyn-gauge` with `--radius-offset: var(--dyn-gauge-radius-offset)` and `.dyn-gauge__tick` classes that read `--dyn-gauge-tick-color`.  Use CSS variables to style the `<canvas>` container.  For actual canvas drawing, read the tokens using `getComputedStyle(canvas).getPropertyValue('--dyn-gauge-tick-color')` inside the drawing logic.  This allows theme overrides to propagate into canvas rendering.

3. **Refactor the React implementation** – Keep the existing gauge drawing algorithm but replace hard‑coded colours with the variables from step 2.  Accept additional props such as `colorTokens?: Partial<Record<'bg' | 'value' | 'tick' | 'center', string>>` to allow overriding tokens at runtime.  Add a `fallback?: ReactNode` prop that renders alternative content (e.g., a textual representation) for users with reduced motion or screen readers.  Ensure that `role="meter"` (for gauge semantics) or `role="progressbar"` is set appropriately and that `aria-valuetext` provides a formatted value description.

4. **Improve responsiveness and sizing** – Replace fixed pixel sizes with tokenised values from the size tokens.  Compute `gaugeDimensions` based on `size` and allow consumers to override via props.  Provide CSS for `.sizeSmall`, `.sizeMedium` and `.sizeLarge` classes that set width and height using tokens.

5. **Expand tests and documentation** – Write unit tests verifying that colours and sizes adapt when tokens change (mocking `getComputedStyle`), that different gauge types render correctly, and that ARIA attributes are applied.  Provide Storybook examples demonstrating arc, circle and line gauges with custom ranges, dark mode and responsive sizing.  Document the tokens and props in JSDoc and the README.

## Validation Checklist
Ensure the following for DynGauge:

- [ ] All drawing colours and sizes reference `--dyn-gauge-*` tokens instead of hard‑coded values【427558994007309†L209-L221】【427558994007309†L252-L254】.
- [ ] Tokens have three‑level fallbacks and dark‑mode overrides.
- [ ] The CSS module exposes variables for canvas drawing and the React code reads them via `getComputedStyle`.
- [ ] Props allow overriding colours and provide a fallback rendering for non‑canvas environments.
- [ ] Size variants (`small`, `medium`, `large`) and custom sizes are supported via tokens.
- [ ] Unit tests cover token application, gauge types, dark mode and accessibility attributes.
- [ ] Storybook includes examples for arc, circle and line gauges, custom ranges and dark mode.
