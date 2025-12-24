# P2 - NICE-TO-HAVE COMPONENTS (Week 5)

**Priority**: 🟡 P2 - Low priority, high value  
**Timeline**: Week 5  
**Total Effort**: ~12 hours

---

## COMPONENTS IN THIS TIER

These components enhance the system but aren't critical:

1. **DynTab** (3 hours) - Tabbed interface
2. **DynPagination** (3 hours) - Page navigation
3. **DynAlert** (2 hours) - Status/notification messages
4. **DynSpinner** (2 hours) - Loading indicator
5. **DynBreadcrumb** (2 hours) - Navigation path

---

## 1️⃣ DynTab - Tabbed Interface

**Type**: Navigation/Layout  
**Effort**: 3 hours  
**Status**: 🔴 MISSING - Create new

### Purpose
Tabbable content interface for organizing related content into separate panels.

### Features
- [ ] Tab header with active indicator
- [ ] Tab content panels
- [ ] Keyboard navigation (arrow keys)
- [ ] ARIA labels and roles
- [ ] Scroll on overflow (mobile)
- [ ] Icon support in tabs
- [ ] Disabled tab state
- [ ] Lazy-load content option
- [ ] Dark mode
- [ ] Responsive (vertical on mobile)

### Tokens
```
--dyn-tab-bg
--dyn-tab-color
--dyn-tab-border-bottom
--dyn-tab-active-color
--dyn-tab-active-border-color
--dyn-tab-padding-x
--dyn-tab-padding-y
--dyn-tab-font-weight
--dyn-tab-hover-bg
--dyn-tab-transition
```

### Files to Create
```
DynTab/
├── DynTab.tsx
├── DynTab.types.ts
├── DynTab.module.css
├── DynTab.stories.tsx
├── DynTab.test.tsx
└── index.ts
```

---

## 2️⃣ DynPagination - Page Navigation

**Type**: Navigation  
**Effort**: 3 hours  
**Status**: 🔴 MISSING - Create new

### Purpose
Component for navigating between pages of data.

### Features
- [ ] Previous/Next buttons
- [ ] Page number buttons
- [ ] "Go to page" input
- [ ] Items per page selector
- [ ] Total items display
- [ ] Disabled first/last when at edges
- [ ] Keyboard navigation
- [ ] Ellipsis for skipped pages
- [ ] Mobile compact mode
- [ ] Dark mode

### Tokens
```
--dyn-pagination-bg
--dyn-pagination-border
--dyn-pagination-color
--dyn-pagination-button-bg
--dyn-pagination-button-bg-active
--dyn-pagination-button-color-active
--dyn-pagination-button-padding-y
--dyn-pagination-button-padding-x
--dyn-pagination-button-border-radius
--dyn-pagination-gap
```

---

## 3️⃣ DynAlert - Status Messages

**Type**: Display/Notification  
**Effort**: 2 hours  
**Status**: 🔴 MISSING - Create new

### Purpose
Component for displaying success, warning, error, or info messages.

### Features
- [ ] Multiple severity levels (success, warning, error, info)
- [ ] Icon indicator
- [ ] Close button
- [ ] Optional action button
- [ ] Icon customization
- [ ] Title + description
- [ ] Auto-dismiss option (timer)
- [ ] Animations
- [ ] Full-width or inline
- [ ] Dark mode

### Tokens
```
--dyn-alert-bg-success
--dyn-alert-bg-warning
--dyn-alert-bg-error
--dyn-alert-bg-info
--dyn-alert-color-success
--dyn-alert-color-warning
--dyn-alert-color-error
--dyn-alert-color-info
--dyn-alert-border-success
--dyn-alert-border-warning
--dyn-alert-border-error
--dyn-alert-border-info
--dyn-alert-padding-y
--dyn-alert-padding-x
--dyn-alert-border-radius
```

---

## 4️⃣ DynSpinner - Loading Indicator

**Type**: Feedback  
**Effort**: 2 hours  
**Status**: 🔴 MISSING - Create new

### Purpose
Component for indicating loading/processing state.

### Features
- [ ] Circular spinner (CSS animation)
- [ ] Size variants (small, medium, large)
- [ ] Color variants
- [ ] With label/text
- [ ] Overlay mode (full page)
- [ ] Inline mode
- [ ] Custom animation speed
- [ ] Dark mode
- [ ] Responsive

### Tokens
```
--dyn-spinner-size
--dyn-spinner-border-width
--dyn-spinner-color-primary
--dyn-spinner-color-secondary
--dyn-spinner-animation-duration
--dyn-spinner-text-color
--dyn-spinner-text-size
```

### Implementation Note
- Use pure CSS animations (no external libs)
- Use CSS keyframes for smooth rotation
- Support size variants via token

---

## 5️⃣ DynBreadcrumb - Navigation Path

**Type**: Navigation  
**Effort**: 2 hours  
**Status**: 🔴 MISSING - Create new

### Purpose
Component for showing navigation hierarchy/path.

### Features
- [ ] List of breadcrumb items
- [ ] Separator between items (/, >, etc.)
- [ ] Last item (current page) not clickable
- [ ] Icon support
- [ ] Max items with collapse option
- [ ] Mobile responsive (hide middle items)
- [ ] Active state styling
- [ ] Keyboard navigation
- [ ] Hover states
- [ ] Dark mode

### Tokens
```
--dyn-breadcrumb-color
--dyn-breadcrumb-color-active
--dyn-breadcrumb-font-size
--dyn-breadcrumb-separator
--dyn-breadcrumb-gap
--dyn-breadcrumb-link-hover-color
```

---

## ✅ IMPLEMENTATION CHECKLIST

### For Each Component

```
✓ Read this document
✓ Create component files (6 files per component)
✓ Define all --dyn-component-* tokens
✓ Implement variants
✓ Add dark mode section
✓ Add responsive section
✓ Write Storybook stories
✓ Write Jest tests (80%+ coverage)
✓ Verify with AI prompt
✓ Create PR with checklist
```

---

## 🚀 QUICK START

For each component:

```bash
# 1. Create component folder
mkdir -p packages/dyn-ui-react/src/components/DynComponentName

# 2. Create 6 files
touch DynComponentName.tsx
touch DynComponentName.types.ts
touch DynComponentName.module.css
touch DynComponentName.stories.tsx
touch DynComponentName.test.tsx
touch index.ts

# 3. Copy template from existing component
cp ../DynButton/* .

# 4. Update token names
sed -i 's/--dyn-button-/--dyn-componentname-/g' DynComponentName.module.css

# 5. Implement features per spec
# ... code changes ...

# 6. Test
npm test DynComponentName

# 7. PR
git add .
git commit -m "feat(DynComponentName): create with token compliance"
```

---

## 📊 PRIORITY ORDER

If you can only do some:

1. **DynAlert** (2h) - Most useful, quick
2. **DynSpinner** (2h) - Common use
3. **DynPagination** (3h) - Data heavy apps
4. **DynTab** (3h) - Content organization
5. **DynBreadcrumb** (2h) - Navigation

---

## 🎓 AI VERIFICATION TEMPLATE

For each component, use this verification prompt:

```
AI Task: Verify DynComponentName

Spec file: docs/COMPONENTS/P2_NICE_TO_HAVE/README.md (Section: DynComponentName)
Implementation: packages/dyn-ui-react/src/components/DynComponentName/

1. TOKEN VERIFICATION
   - All --dyn-componentname-* tokens defined
   - 3-level fallback on each
   - No hard-coded values

2. FEATURE VERIFICATION
   - All features from spec implemented
   - All variants working
   - All states handled

3. DARK MODE
   - @media (prefers-color-scheme: dark) present
   - Colors updated appropriately
   - Contrast maintained (4.5:1)

4. RESPONSIVE
   - @media (max-width: 767px) present
   - Mobile layout works
   - Touch targets 44px+

5. ACCESSIBILITY
   - ARIA roles present
   - ARIA labels correct
   - Keyboard navigation working
   - Focus visible

6. TESTING
   - 80%+ coverage
   - All variants tested
   - All states tested
   - Dark mode tested

Output: Verification report
```

---

## 📈 TIMELINE

**Week 5** (After P0 & P1 complete):

| Day | Component | Hours | Deliverable |
|-----|-----------|-------|-------------|
| Mon | DynAlert | 2 | PR merged |
| Tue | DynSpinner | 2 | PR merged |
| Wed | DynPagination | 3 | PR merged |
| Thu | DynTab | 3 | PR merged |
| Fri | DynBreadcrumb | 2 | PR merged |

**Total**: 12 hours, 5 PRs

---

## 💡 NOTES

- These are enhancers, not blockers
- Start only after P0 & P1 complete
- Can be parallelized (multiple people)
- Follow same token/testing patterns as P0/P1
- All must have 80%+ coverage + dark mode + responsive

---

**Status**: 🔴 Not started (Week 5 task)  
**Next**: Complete P0 & P1 first
