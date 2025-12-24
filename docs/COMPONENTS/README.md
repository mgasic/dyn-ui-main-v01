# DYN UI - COMPONENT SPECIFICATIONS & CHECKLISTS

**Complete directory of all component specifications with AI verification prompts and implementation checklists.**

---

## 📋 OVERVIEW

This folder contains detailed specifications for every component in the DYN UI system, organized by priority:

- **P0 - CRITICAL** (Week 1-2): 3 components requiring immediate attention
- **P1 - IMPORTANT** (Week 3-4): 5 components for core functionality  
- **P2 - NICE-TO-HAVE** (Week 5): Additional components
- **NEW - MISSING**: Components to be created from scratch

**Total Components**: 12 (7 existing + 5 new)  
**Estimated Effort**: 6 weeks  
**Quality Bar**: 100% design token compliance + 80%+ test coverage

---

## 🔍 START HERE

### For Quick Overview

👉 **[COMPONENT_CHECKLIST_INDEX.md](COMPONENT_CHECKLIST_INDEX.md)**

Master index with:
- All components listed with priority
- Quick status badges
- Direct links to each spec
- Verification commands
- Progress tracking table

### For Implementation

1. **Read the checklist index** (5 min)
2. **Pick a component** (based on priority)
3. **Read its specification** (15-20 min)
4. **Run verification command** (see spec)
5. **Follow checklist** (tasks are clear)
6. **Create PR** with completed checklist

---

## 📏 COMPONENT STRUCTURE

Each component specification file includes:

### 1. Problem Statement
- **What's wrong with current state** (if exists)
- **Issues to fix** (prioritized)
- **Code examples** of current problems

### 2. Solution
- **Proposed structure** (CSS/React patterns)
- **Token definitions** (complete list)
- **Code examples** of correct implementation

### 3. Requirements Checklist
- **CSS Requirements** - token naming, fallback, dark mode, etc.
- **React Requirements** - props, accessibility, types
- **Testing Requirements** - coverage, accessibility, variants
- **Storybook Requirements** - stories to create

### 4. Token Definitions
- **Complete list** of all `--dyn-component-*` tokens
- **Default values** with fallbacks
- **Variants** that override tokens

### 5. AI Verification Prompt
- **Specific command** for AI verification
- **Exact checks** to perform
- **Output format** expected

### 6. Deliverables
- **Files to create/modify**
- **PR checklist** with specific items
- **Commit message** format

---

## 👨‍👩‍👦 FOR DIFFERENT ROLES

### For Developers

1. **Read spec file** for your component
2. **Follow Requirements Checklist**
3. **Use AI Verification Prompt** to verify work
4. **Run tests** for 80%+ coverage
5. **Create PR** with checklist items checked

### For AI Agents/Copilot

1. **Find component spec** from index
2. **Read complete specification**
3. **Review current code** (if exists)
4. **Run verification prompt** from spec
5. **Implement checklist items**
6. **Create PR** with all boxes checked

### For Reviewers

1. **Check PR includes spec link**
2. **Verify checklist items are checked**
3. **Review token naming** (all `--dyn-*`)
4. **Verify 3-level fallback** on tokens
5. **Check test coverage** (80%+)
6. **Check dark mode** section exists
7. **Verify responsive** section exists

### For QA/Testing

1. **Read Storybook Stories** section in spec
2. **Test each story** in browser
3. **Test dark mode** toggle
4. **Test responsive** sizes
5. **Test all variants**
6. **Test keyboard navigation** (if applicable)
7. **Test accessibility** features

---

## 📄 FOLDER STRUCTURE

```
docs/COMPONENTS/
├── README.md                          (This file)
├── COMPONENT_CHECKLIST_INDEX.md        (Master index - START HERE)
│
├── P0_CRITICAL/                       (Week 1-2)
│   ├── 01_DynFlex.md                 (Scope isolation)
│   ├── 02_DynBadge.md                (Token naming)
│   └── 03_DynModal.md                (Hard-code → tokens)
│
├── P1_IMPORTANT/                      (Week 3-4)
│   ├── 01_DynButton.md               (Audit)
│   └── 02_DynInput.md                (Audit)
│
└── NEW_COMPONENTS/                    (To be created)
    ├── 01_DynCard.md                 (Container)
    ├── 02_DynTooltip.md              (Overlay)
    └── 03_DynDropdown.md             (Selection)
```

---

## ✅ CHECKLIST TEMPLATE

Every spec file contains a section like this:

```markdown
### Quick Checklist

[Implementation tasks]
- [ ] Task 1
- [ ] Task 2
- [ ] Task 3
- etc.
```

**Copy this to your PR description and mark items as complete** ✓

---

## 🚀 QUICK START EXAMPLES

### Example 1: Work on P0 Component

```bash
# 1. Read the checklist index
open COMPONENT_CHECKLIST_INDEX.md

# 2. Pick DynFlex (P0)
# 3. Read its spec
open P0_CRITICAL/01_DynFlex.md

# 4. Review current code
open packages/dyn-ui-react/src/components/DynFlex/DynFlex.module.css

# 5. Make changes
# - Move tokens to .module.css
# - Rename to --dyn-flex-*
# - Add dark mode section
# - Add responsive section

# 6. Test
npm test DynFlex

# 7. Create PR
git add .
git commit -m "refactor(DynFlex): 100% token compliance"
git push origin feat/dynflex-refactor

# Include in PR description:
# - Link to spec: docs/COMPONENTS/P0_CRITICAL/01_DynFlex.md
# - Checklist items marked complete
# - Test coverage result (80%+)
```

### Example 2: Work on NEW Component

```bash
# 1. Read the checklist index
open COMPONENT_CHECKLIST_INDEX.md

# 2. Pick DynCard (NEW)
# 3. Read its spec
open NEW_COMPONENTS/01_DynCard.md

# 4. Create component files
mkdir -p packages/dyn-ui-react/src/components/DynCard
touch DynCard.tsx DynCard.types.ts DynCard.module.css DynCard.stories.tsx DynCard.test.tsx index.ts

# 5. Implement from spec
# - Follow token definitions
# - Implement compound pattern
# - Add all variants
# - Add dark mode
# - Add responsive

# 6. Test
npm test DynCard

# 7. Create PR
git add .
git commit -m "feat(DynCard): create container with token compliance"
git push origin feat/dyncard-create

# Include in PR:
# - Link to spec: docs/COMPONENTS/NEW_COMPONENTS/01_DynCard.md
# - Checklist: all items checked
# - Storybook link
```

---

## 💾 AI VERIFICATION WORKFLOW

Each spec includes an **AI Verification Prompt**. Use it like this:

### Step 1: Prepare
```
Read the spec file completely
Understand the problem and solution
Locate the "AI Verification Prompt" section
```

### Step 2: Copy & Run
```
Copy the entire verification prompt
Paste to Claude/Copilot/your AI agent
Include the component reference (spec link)
```

### Step 3: Review Output
```
Read the AI's detailed audit report
Note any issues found
Fix issues in code
Re-run verification if major changes
```

### Step 4: Commit
```
Once all verification passes
Commit with reference to spec
Create PR with checklist marked
```

---

## 🔇 TOKEN NAMING RULES

**All tokens MUST follow these patterns:**

### Pattern 1: Component Token
```
--dyn-[component]-[property]-[state]
```

Examples:
- `--dyn-button-bg` ✓ (component: button, property: bg)
- `--dyn-button-bg-hover` ✓ (with state)
- `--dyn-input-border-focus` ✓
- `--dyn-badge-padding-y` ✓ (split property)

### Pattern 2: 3-Level Fallback
```
var(--dyn-component-X, var(--legacy-X, fallback-value))
```

Example:
```css
--dyn-button-bg: var(--dyn-color-primary, var(--legacy-btn-bg, #2563eb));
```

### Pattern 3: Foundation Token Reference
```
var(--dyn-color-primary, #fallback)
var(--dyn-spacing-md, 0.75rem)
var(--dyn-font-size-base, 1rem)
```

---

## ✅ QUALITY STANDARDS

### All Components MUST Have:

**CSS**
- ✓ All tokens use `--dyn-` prefix
- ✓ Tokens follow naming pattern
- ✓ 3-level fallback on every token
- ✓ No hard-coded values (except fallback)
- ✓ Dark mode section (`@media prefers-color-scheme: dark`)
- ✓ Responsive section (`@media max-width: 767px`)

**React**
- ✓ TypeScript types defined
- ✓ ForwardRef for DOM access
- ✓ JSDoc comments on props
- ✓ Proper error handling
- ✓ Accessibility ARIA attributes

**Testing**
- ✓ 80%+ Jest coverage minimum
- ✓ All variants tested
- ✓ All states tested
- ✓ Dark mode tested
- ✓ Responsive tested
- ✓ Accessibility tested

**Documentation**
- ✓ Storybook stories for all variants
- ✓ README or inline docs
- ✓ Examples in stories
- ✓ Dark mode story
- ✓ Responsive demo

---

## 📁 DOCUMENTATION REFERENCES

### Complete Knowledge Base
- [COMPLETE_KNOWLEDGE_BASE.md](../00_MASTER_KNOWLEDGE_BASE.md) - Master reference
- [KB_01_TOKEN_SYSTEM.md](../KB_01_TOKEN_SYSTEM.md) - Token definitions
- [KB_02_COMPONENTS.md](../KB_02_COMPONENTS.md) - Component structure
- [KB_03_NAMING.md](../KB_03_NAMING.md) - Naming conventions

---

## 📌 SUMMARY

| Aspect | Details |
|--------|----------|
| **Total Components** | 12 (7 existing + 5 new) |
| **Priority Levels** | P0 (3), P1 (5), P2 (4) |
| **Quality Bar** | 100% token compliance + 80%+ coverage |
| **Timeline** | 6 weeks total |
| **Weekly Pace** | P0: 1 week, P1: 1 week, P2: 1 week |
| **Deliverables** | PRs with completed checklists |
| **Format** | Markdown specs with AI prompts |

---

## 🦖 SUPPORT

### Questions about a component?
1. **Read its spec file** - Most answers there
2. **Check COMPONENT_CHECKLIST_INDEX.md** - Quick reference
3. **Review COMPLETE_KNOWLEDGE_BASE.md** - System-wide patterns

### Issues with implementation?
1. **Run the verification prompt** - AI will identify issues
2. **Check the requirement checklist** - Make sure all items done
3. **Test with 80%+ coverage** - Run npm test

### Ready to start?
1. **Open COMPONENT_CHECKLIST_INDEX.md** ← START HERE
2. **Pick your component** (by priority)
3. **Follow the spec** (it's a roadmap)
4. **Use AI verification** (from spec)
5. **Create PR** (mark checklist)

---

**Last Updated**: December 24, 2025  
**Status**: ✅ Complete & Ready for Implementation  
**Next Step**: Start with P0 components (DynFlex, DynBadge, DynModal)
