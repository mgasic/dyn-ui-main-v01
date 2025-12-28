# DynTabs – Implementation Guide

## Component Overview
DynTabs provides tabbed navigation for switching between multiple content panels.  Tabs may be horizontal or vertical, scrollable or full‑width, and support various variants such as underline, pills or boxed styles.  The component should manage active state, expose an `onSelect` callback, support keyboard navigation (arrow keys and Home/End), and be accessible (`role="tablist"`, `role="tab"`, `role="tabpanel"`).  Variants should integrate smoothly with dark mode and high‑contrast modes.

## Current State Analysis
DynTabs is considered production‑ready with a high overall score, but the audit identifies several areas for improvement.  CSS class names do not follow the DynUI convention; for example, the root class is generic and sub‑classes are not namespaced.  Variant‑specific tokens (e.g., active/inactive tab background, underline colour, border radius) are missing and fallback patterns are incomplete【508384399870549†L85-L104】.  TypeScript constants and CSS classes do not match, and JSDoc comments are absent【508384399870549†L107-L121】.  While features such as keyboard navigation, orientation and lazy rendering are well implemented, improvements in naming and tokenization could raise the quality from 82% to 86%.

## Implementation Instructions
1. **Rename CSS classes** – Adopt a consistent BEM naming scheme: `.dyn-tabs` for the root container, `.dyn-tabs__list` for the `<ul>` element, `.dyn-tabs__tab` for each tab button and `.dyn-tabs__panel` for the content section.  Provide modifier classes for orientation (`.vertical`), variant style (`.underline`, `.pills`, `.boxed`) and size.  Remove legacy class names to avoid confusion【508384399870549†L85-L104】.

2. **Define tab tokens** – Create `--dyn-tabs-*` design tokens for various aspects of the tab UI with three‑level fallbacks.  Key tokens include:

   - `--dyn-tabs-tab-color` / `--dyn-tabs-tab-bg` – default text and background colours.  
   - `--dyn-tabs-tab-active-color` / `--dyn-tabs-tab-active-bg` – active tab colours.  
   - `--dyn-tabs-tab-hover-color` / `--dyn-tabs-tab-hover-bg` – hover state.  
   - `--dyn-tabs-border-color` / `--dyn-tabs-border-width` / `--dyn-tabs-border-radius` – border styling for boxed variants.  
   - `--dyn-tabs-underline-color` / `--dyn-tabs-underline-height` – underline variant.  
   - `--dyn-tabs-padding-x` / `--dyn-tabs-padding-y` / `--dyn-tabs-gap` – spacing.  
   - Size tokens: small/medium/large heights and font sizes.  

   Provide dark‑mode tokens under `.dark .dyn-tabs` and high‑contrast overrides.

3. **Update the CSS module** – Replace hard‑coded values with the tokens defined above.  Implement variant classes: `.dyn-tabs--underline` applies a bottom border using `--dyn-tabs-underline-color` and `--dyn-tabs-underline-height`; `.dyn-tabs--pills` uses rounded corners and active background; `.dyn-tabs--boxed` applies border to tabs.  Add orientation modifiers: `.dyn-tabs--vertical` sets flex direction to column and changes border placement.  Ensure all tokens have a three‑level fallback and that dark mode is scoped correctly【508384399870549†L85-L104】.

4. **Synchronise types and constants** – Define `DynTabItem` with `key: string`, `label: ReactNode`, `disabled?: boolean`, and optional `icon?: ReactNode`.  Define `DynTabsProps` with `items: DynTabItem[]`, `activeKey: string`, `onSelect: (key: string) => void`, `orientation?: 'horizontal' | 'vertical'`, `variant?: 'underline' | 'pills' | 'boxed'`, `size?: 'small' | 'medium' | 'large'`, `className?`.  Export these types and ensure CSS class names match the `variant` and `orientation` values【508384399870549†L107-L121】.

5. **Improve accessibility and docs** – Continue to render `role="tablist"`, `role="tab"` and `role="tabpanel"`.  Ensure keyboard navigation supports arrow keys, Home/End and deletion; update tests to cover orientation changes and variant classes.  Write JSDoc for all public interfaces and add a README section describing tokens, variants and usage.  Add Storybook stories for each variant and orientation, including dark‑mode examples.

## Validation Checklist
Ensure the following before merging:

- [ ] All CSS classes follow the BEM naming pattern and align with the TypeScript constants【508384399870549†L85-L104】.
- [ ] All design tokens (`--dyn-tabs-*`) are defined with three‑level fallback and dark‑mode overrides.
- [ ] Variants (`underline`, `pills`, `boxed`) and sizes (`small`, `medium`, `large`) are implemented and documented.
- [ ] Types `DynTabItem` and `DynTabsProps` are complete and exported, with JSDoc comments【508384399870549†L107-L121】.
- [ ] Accessibility features (ARIA roles, keyboard navigation) work for both horizontal and vertical orientations.
- [ ] Unit tests cover orientation, variants, dark mode, hover/active states and keyboard interactions.
- [ ] Storybook examples showcase all variants and include dark mode and responsive scenarios.
