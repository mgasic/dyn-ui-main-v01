# 📚 Design Tokens Documentation Index

**DYN UI Main v01 - Design Tokens System**  
**Last Updated:** December 25, 2025  
**Status:** Phase 1 Complete, Ready for Implementation  

---

## 🎯 Quick Navigation

### 🏃 Quick Start

**I want to...**

- **Use design tokens in components** → See [USAGE.md](./USAGE.md) (Phase 2, coming soon)
- **Add new tokens** → See [AUTOMATION-GUIDE.md](../AUTOMATION-GUIDE.md) "How to Add New Tokens" section
- **Understand dark mode** → See [DARK-THEME-STRATEGY.md](./DARK-THEME-STRATEGY.md)
- **Set up Phase 1** → See [PHASE-1-MIGRATION.md](./PHASE-1-MIGRATION.md)

---

## 📖 Documentation Sections

### 🎨 Understanding the System

#### [README (parent)](../README.md)
**Overview of the design tokens system**
- What are design tokens?
- Architecture overview
- Key concepts
- Getting started

#### [DARK-THEME-STRATEGY.md](./DARK-THEME-STRATEGY.md)
**Deep dive into dark mode implementation**
- Shade names vs dark theme
- JSON structure for dark theme
- Testing dark mode
- Common mistakes

#### [NAMING_CONVENTIONS.md](./NAMING_CONVENTIONS.md)
**Token naming guidelines**
- camelCase vs kebab-case
- Token organization
- Component token patterns
- Best practices

---

### 🛠️ Building & Automation

#### [AUTOMATION-GUIDE.md](../AUTOMATION-GUIDE.md) ⭐ START HERE
**Complete automation and build guide**
- Validation rules (Phase 1)
- Build process explanation
- GitHub Actions workflow (Phase 1)
- Step-by-step token creation
- Dark theme support
- Migration from manual CSS
- Troubleshooting

---

### 📋 Implementation Plans

#### [PHASE-1-MIGRATION.md](./PHASE-1-MIGRATION.md)
**Migration guide for Phase 1 implementation**
- What changed in Phase 1?
- Migration steps for developers
- Updated imports
- Testing checklist
- FAQ

#### [PHASE-1-IMPLEMENTATION-CHECKLIST.md](./PHASE-1-IMPLEMENTATION-CHECKLIST.md)
**Detailed implementation checklist for team**
- Week 1: Setup & local testing
- Week 2: GitHub Actions & training
- Test cases with examples
- Troubleshooting guide
- Success metrics
- Role responsibilities

#### [PHASE-2-TESTING.md](./PHASE-2-TESTING.md)
**Phase 2 preview - Testing framework**
- Dark mode test suite (Vitest examples)
- TOKEN_USAGE_GUIDE structure
- Test coverage targets
- Accessibility testing
- Phase 2 timeline

---

## 🎯 Phase Overview

### Phase 1: ✅ COMPLETE - Validation & CI/CD

**What:** Eliminate hybrid state, add automation  
**Status:** Ready for merge (PR #39)  
**Timeline:** 2 weeks implementation  

**Deliverables:**
- ✅ Token validation script
- ✅ GitHub Actions workflow
- ✅ Updated NPM scripts
- ✅ Migration documentation

**See:**
- [PHASE-1-MIGRATION.md](./PHASE-1-MIGRATION.md)
- [PHASE-1-IMPLEMENTATION-CHECKLIST.md](./PHASE-1-IMPLEMENTATION-CHECKLIST.md)

### Phase 2: 🎯 PLANNED - Testing & Usage Guide

**What:** Dark mode tests, usage documentation  
**Timeline:** Weeks 3-4 after Phase 1  

**Deliverables:**
- Dark mode test suite (Vitest)
- TOKEN_USAGE_GUIDE.md with DO/DON'T
- Troubleshooting documentation
- Test coverage reporting

**See:**
- [PHASE-2-TESTING.md](./PHASE-2-TESTING.md)

### Phase 3: 📊 PLANNED - W3C Compliance

**What:** Migrate to W3C Design Tokens format  
**Timeline:** Weeks 5-6 after Phase 1  

**Deliverables:**
- W3C compliant JSON format
- Backward compatibility layer
- Tool interoperability
- Future-proof structure

---

## 🔍 Understanding Key Concepts

### Three-Layer Architecture

```
LAYER 1: Foundation
├── Colors (100+)
├── Typography (20+)
├── Spacing (8)
├── Sizing (10)
├── Borders (14)
├── Shadows (4)
├── Animations (9)
├── Opacity (4)
├── Z-Index (8)
└── Focus States (4)

LAYER 2: Component Base
├── Button patterns
├── Input patterns
├── Layout patterns
├── Interactive states
└── Data display patterns

LAYER 3: Theme
├── Dark mode (@media prefers-color-scheme: dark)
├── High contrast (accessibility)
└── Theme overrides
```

### JSON Token Structure

**Basic Token:**
```json
{
  "dyn": {
    "myComponent": {
      "color": {
        "value": "#0066cc"
      }
    }
  }
}
```

**Dark Theme Token:**
```json
{
  "dyn": {
    "myComponent": {
      "color": { "value": "#0066cc" },
      "darkTheme": {
        "color": { "value": "#3399ff" }
      }
    }
  }
}
```

### Shade Names vs Dark Theme

**Shade Names (stay in :root):**
```json
{ "color": { "dark": { "value": "#666666" } } }
```

**Dark Theme (go in @media query):**
```json
{ "color": { "value": "#FFF" }, "darkTheme": { "color": { "value": "#000" } } }
```

---

## ✅ Workflows

### Development Workflow (After Phase 1)

```bash
# 1. Edit token JSON
vim tokens/my-component.json

# 2. Validate locally (optional)
npm run tokens:validate

# 3. Generate CSS
npm run tokens:build

# 4. Test in Storybook
npm run storybook

# 5. Commit JSON only
git add tokens/
git commit -m "feat: update tokens"
git push

# 6. GitHub Actions:
#    - Validates tokens
#    - Generates CSS
#    - Auto-commits generated files
```

### Adding New Component Tokens

1. Create JSON file: `tokens/my-component.json`
2. Add tokens (light theme)
3. Add dark theme tokens (optional, under `darkTheme` key)
4. Update `style-dictionary.config.v2.js` with filter
5. Run `npm run tokens:build`
6. Verify CSS in `styles/generated/my-component.css`
7. Import in `styles/index.css`
8. Test in Storybook
9. Commit changes

**See:** [AUTOMATION-GUIDE.md](../AUTOMATION-GUIDE.md) for detailed examples

---

## 🐛 Troubleshooting Guide

### Validation Fails

**Error:** "Token has no value"  
**Fix:** Add `"value"` property to token  
**See:** [AUTOMATION-GUIDE.md](../AUTOMATION-GUIDE.md) - Troubleshooting section

### Generated Files Not Created

**Error:** No CSS files in `styles/generated/`  
**Cause:** Filter in config doesn't match JSON file  
**Fix:** Check file name and filter pattern  
**See:** [AUTOMATION-GUIDE.md](../AUTOMATION-GUIDE.md) - Troubleshooting section

### Dark Mode Not Working

**Error:** Dark theme values not in media query  
**Cause:** Tokens not under `darkTheme` branch in JSON  
**Fix:** Move tokens under `darkTheme` key  
**See:** [DARK-THEME-STRATEGY.md](./DARK-THEME-STRATEGY.md)

**More help:** [AUTOMATION-GUIDE.md](../AUTOMATION-GUIDE.md) - Troubleshooting section

---

## 📊 Current Status

### Phase 1 Implementation

| Component | Status | Details |
|-----------|--------|----------|
| Validation Script | ✅ Complete | `scripts/validate-tokens.js` |
| GitHub Actions | ✅ Complete | `.github/workflows/design-tokens-generate.yml` |
| NPM Scripts | ✅ Updated | Validation integrated in build |
| Migration Guide | ✅ Complete | `PHASE-1-MIGRATION.md` |
| Checklist | ✅ Complete | `PHASE-1-IMPLEMENTATION-CHECKLIST.md` |
| PR Ready | ✅ Yes | PR #39 |

### Validation Rules (Phase 1)

- ✅ JSON syntax validation
- ✅ Required token values
- ✅ Naming convention enforcement
- ✅ Duplicate detection

### GitHub Actions (Phase 1)

- ✅ Triggers on token changes
- ✅ Validates before build
- ✅ Auto-generates CSS
- ✅ Runs tests
- ✅ Auto-commits generated files

---

## 🚀 Getting Started

### For New Team Members

1. Read: [README (parent)](../README.md) - Overview
2. Read: [AUTOMATION-GUIDE.md](../AUTOMATION-GUIDE.md) - Build process
3. Read: [DARK-THEME-STRATEGY.md](./DARK-THEME-STRATEGY.md) - Dark mode
4. Try: Add a token locally
5. Test: Run `npm run tokens:build`
6. Done: You understand the system!

### For Phase 1 Implementation

1. Read: [PHASE-1-MIGRATION.md](./PHASE-1-MIGRATION.md) - What changed
2. Read: [PHASE-1-IMPLEMENTATION-CHECKLIST.md](./PHASE-1-IMPLEMENTATION-CHECKLIST.md) - Team tasks
3. Setup: Follow Week 1 checklist
4. Verify: Run all test cases
5. Train: Teach team new workflow

### For Design System Maintenance

1. Read: [AUTOMATION-GUIDE.md](../AUTOMATION-GUIDE.md) - Complete guide
2. Read: [NAMING_CONVENTIONS.md](./NAMING_CONVENTIONS.md) - Token structure
3. Reference: [DARK-THEME-STRATEGY.md](./DARK-THEME-STRATEGY.md) - Theme implementation
4. Maintain: Review PRs for token changes
5. Monitor: GitHub Actions workflow health

---

## 📞 FAQ

**Q: Where should I edit tokens?**  
A: Only in `packages/design-tokens/tokens/` directory (JSON files). Generated CSS is auto-created.

**Q: Can I commit generated files?**  
A: No! GitHub Actions auto-commits them. Commit only `tokens/` JSON changes.

**Q: How do I test dark mode?**  
A: See [DARK-THEME-STRATEGY.md](./DARK-THEME-STRATEGY.md) - Testing section

**Q: What's the difference between shade names and dark theme?**  
A: See [DARK-THEME-STRATEGY.md](./DARK-THEME-STRATEGY.md) - Key Differences section

**Q: How do I validate tokens locally?**  
A: Run `npm run tokens:validate` (after Phase 1)

**Q: What if validation fails?**  
A: See [AUTOMATION-GUIDE.md](../AUTOMATION-GUIDE.md) - Troubleshooting section

**More FAQ:** [PHASE-1-MIGRATION.md](./PHASE-1-MIGRATION.md) - FAQ section

---

## 🔗 Related Resources

- **Analysis PR:** https://github.com/mgasic/dyn-ui-main-v01/pull/38
- **Phase 1 PR:** https://github.com/mgasic/dyn-ui-main-v01/pull/39
- **Style Dictionary Docs:** https://amzn.github.io/style-dictionary/
- **W3C Design Tokens:** https://design-tokens.github.io/community-group/format/

---

## 📅 Roadmap

**Phase 1 (Weeks 1-2):** ✅ COMPLETE
- Validation script
- GitHub Actions workflow
- Documentation

**Phase 2 (Weeks 3-4):** 🎯 PLANNED
- Dark mode test suite
- TOKEN_USAGE_GUIDE
- Troubleshooting docs

**Phase 3 (Weeks 5-6):** 📊 PLANNED
- W3C format migration
- Tool interoperability
- Final stabilization

---

## ⚠️ Important Notes

✅ **DO:**
- Edit tokens in `tokens/` directory
- Let GitHub Actions generate CSS
- Commit only JSON changes
- Test dark mode changes
- Validate before push

❌ **DON'T:**
- Manually edit `styles/generated/` CSS
- Manually commit generated files
- Hardcode colors/spacing in components
- Use SCREAMING_SNAKE_CASE for tokens
- Create duplicate token names

---

**Status:** 🟢 Phase 1 Complete - Ready for Implementation  
**Last Updated:** December 25, 2025  
**Next:** Review PR #39 and begin Phase 1 implementation
