# DynAccordion – Implementation Analysis & Action Plan

## 📋 Component Information
- **Tier**: TIER1
- **Status**: ❌ PLANNED (Not yet implemented)
- **Current Completeness**: 0%
- **Priority**: P0
- **Effort Estimate**: 25-30 hours (from scratch)

---

## 1. SPECIFICATION (from docs/IMPLEMENTATION/DynAccordion-impl.md)

### Component Overview
DynAccordion groups multiple panels of content where only one or several panels can be expanded at a time. Each accordion item has a header that toggles the visibility of its content. It should support:
- Single and multiple expansion modes
- Disabling individual items
- Callbacks when item is opened/closed
- Keyboard navigation (Up/Down arrows, Enter/Space)
- ARIA accessibility (aria-expanded, aria-controls, role="button"/"region")
- Responsive design

### Implementation Requirements (from impl guide)
1. **API Design**: DynAccordionProps with items, multi, defaultOpenIds/openIds, onChange, animation
2. **Ref Interface**: toggle(id), open(id), close(id) methods via useImperativeHandle
3. **Keyboard Navigation**: Full a11y support with keyboard bindings
4. **Token System**: --dyn-accordion-* tokens with 3-level fallbacks
5. **CSS Module**: BEM classes with hover, active, disabled, open states + dark mode
6. **Testing**: Unit tests + jest-axe + all state combinations
7. **Storybook**: Multiple stories demonstrating all configurations

---

## 2. CURRENT STATE ANALYSIS

### File Structure
```
DynAccordion/ ← DOES NOT EXIST
├── DynAccordion.tsx ❌
├── DynAccordion.types.ts ❌
├── DynAccordion.module.css ❌
├── DynAccordion.stories.tsx ❌
├── DynAccordion.test.tsx ❌
└── index.ts ❌
```

### Current Status
- **Exists in repo**: NO
- **Classification**: PLANNED component - needs full implementation
- **Reference spec**: Available in docs/COMPONENTS (if exists)

---

## 3. GAP ANALYSIS

### Missing Components (100% missing)
- 🔴 **CRITICAL**: Core React component (DynAccordion.tsx)
- 🔴 **CRITICAL**: TypeScript types (DynAccordion.types.ts)
- 🔴 **CRITICAL**: CSS module with tokens (DynAccordion.module.css)
- 🔴 **CRITICAL**: Tests with jest-axe (DynAccordion.test.tsx)
- 🟡 **HIGH**: Storybook stories (DynAccordion.stories.tsx)
- 🟡 **HIGH**: Index export (index.ts)

### Why This is TIER1
DynAccordion should be TIER3/4 (complex component with state management), but created as TIER1 placeholder for initial planning.

---

## 4. ACTION PLAN

### Phase 1: Setup & Types (2-3 hours)
1. Create `DynAccordion.types.ts` with `DynAccordionProps` interface
   - items: Array<{ id: string; header: ReactNode; content: ReactNode; disabled?: boolean }>
   - multi?: boolean (default: false)
   - defaultOpenIds?: string[]
   - openIds?: string[]
   - onChange?: (openIds: string[]) => void
   - animation?: boolean
2. Define ref interface with methods: toggle, open, close
3. Follow pattern from COMPLETE_KNOWLEDGE_BASE.md #Token Categories & Values

### Phase 2: Component Implementation (12-15 hours)
1. Create `DynAccordion.tsx` using forwardRef + useImperativeHandle
2. Implement state management (controlled/uncontrolled)
3. Add keyboard navigation:
   - Up/Down: Move focus between headers
   - Enter/Space: Toggle focused panel
   - Home/End: Jump to first/last
4. Render headers with aria-expanded, aria-controls
5. Render content regions with role="region", id matching aria-controls
6. Support disabled items

### Phase 3: Styling & Tokens (5-7 hours)
1. Create `DynAccordion.module.css` with token structure:
   ```css
   --dyn-accordion-header-bg
   --dyn-accordion-header-text
   --dyn-accordion-header-hover-bg
   --dyn-accordion-header-active-bg
   --dyn-accordion-header-disabled-text
   --dyn-accordion-content-bg
   --dyn-accordion-border-color
   --dyn-accordion-animation-duration
   ```
2. Implement 3-level fallback pattern
3. Add dark mode support
4. Support prefers-reduced-motion
5. Use BEM classes: .dyn-accordion, .dyn-accordion__header, .dyn-accordion__content, .dyn-accordion__icon

### Phase 4: Testing & Stories (4-5 hours)
1. Write `DynAccordion.test.tsx`:
   - Controlled vs uncontrolled modes
   - Single vs multi open behavior
   - Keyboard navigation
   - Disabled items
   - Ref methods (toggle, open, close)
   - jest-axe accessibility tests
   - Dark mode token application
2. Create `DynAccordion.stories.tsx`:
   - Basic single open
   - Multi open mode
   - Disabled items
   - Custom header/content
   - Dark mode variants
   - Without animation

### Phase 5: Documentation (1-2 hours)
1. Create `index.ts` with proper exports
2. Add JSDoc comments to all props and methods
3. Update component README with API table
4. Add examples in Storybook

---

## 5. VALIDATION CRITERIA

Before PR merge, verify:
- [ ] All tokens follow `--dyn-accordion-*` pattern with 3-level fallbacks
- [ ] API supports items, multi, controlled/uncontrolled openIds, onChange callback
- [ ] Ref methods exposed: toggle(id), open(id), close(id)
- [ ] Keyboard navigation working: Up/Down/Home/End/Enter/Space
- [ ] ARIA attributes correct: aria-expanded, aria-controls, role attributes
- [ ] Unit tests cover all states (single/multi, keyboard, disabled, ref methods)
- [ ] jest-axe tests passing (accessibility compliance)
- [ ] Dark mode working correctly
- [ ] Storybook stories demonstrate major configurations
- [ ] JSDoc and README updated
- [ ] Component exports correctly from index.ts

---

## 📊 Summary

- **Action**: CREATE from scratch
- **Timeline**: 25-30 hours (1 developer, 1 week)
- **Complexity**: HIGH (state management, keyboard nav, accessibility)
- **Next Step**: Start Phase 1 (Types) - use COMPLETE_KNOWLEDGE_BASE.md as reference
- **Template Reference**: Use `docs/TEMPLATES/TEMPLATE-DynComponent.*` as base
- **Estimated Completion**: 1 week with focused development
