# 🎨 Phase 1 Migration Guide - Hybrid State Elimination

**Status:** Phase 1 of Design Tokens Stabilization  
**Date:** December 25, 2025  
**Impact:** Single source of truth, automated token generation  

---

## 📋 Overview

Phase 1 eliminates the **hybrid state** where both manual and auto-generated token CSS files existed, causing confusion and potential inconsistencies.

### What Changed

| Aspect | Before | After |
|--------|--------|-------|
| **Source of Truth** | Hybrid (manual + auto) | Single (auto-generated from JSON) |
| **Build Process** | Manual `npm run tokens:build` | Automatic CI/CD |
| **Validation** | None | Full validation on build |
| **Token Imports** | `styles/components/*` (legacy) | `styles/generated/*` (auto-generated) |

---

## ✅ Completed Tasks

### 1. Validation Script Added

```bash
npm run tokens:validate
```

Validates:
- ✅ JSON syntax correctness
- ✅ Every token has a value
- ✅ Naming conventions (camelCase/kebab-case)
- ✅ No duplicate token names
- ✅ Required properties present

### 2. GitHub Actions Workflow

Automatically triggered on:
- Push to `main` or `develop` branches
- Changes in `packages/design-tokens/tokens/**`
- Changes in `packages/design-tokens/style-dictionary.config.v2.js`

**Workflow steps:**
1. Validate all tokens
2. Generate CSS from JSON
3. Run tests
4. Auto-commit generated files

### 3. Updated NPM Scripts

```json
{
  "scripts": {
    "tokens:validate": "node scripts/validate-tokens.js",
    "tokens:build": "npm run tokens:validate && style-dictionary build -c style-dictionary.config.v2.js",
    "tokens:watch": "nodemon --watch tokens --exec npm run tokens:build",
    "tokens:clean": "npx rimraf styles/generated build/js build/ts",
    "dev": "npm run tokens:watch"
  }
}
```

---

## 🔄 Migration Steps for Team

### For Developers

#### 1. Update Your Branch

```bash
git checkout main
git pull origin main
git checkout your-feature-branch
git merge main
```

#### 2. Install Dependencies

```bash
cd packages/design-tokens
npm ci
```

#### 3. Build Tokens Locally

```bash
npm run tokens:build
```

#### 4. Remove Old Imports

**BEFORE (❌ Legacy):**
```css
@import '../../design-tokens/styles/components/button-like.css';
@import '../../design-tokens/styles/components/input-like.css';
```

**AFTER (✅ New):**
```css
@import '../../design-tokens/styles/generated/button-like.css';
@import '../../design-tokens/styles/generated/input-like.css';
```

#### 5. Test Components

```bash
# Run Storybook
npm run storybook

# Test dark mode
# (Preference > prefers-color-scheme > Dark in browser DevTools)
```

### For Design System Maintainers

#### 1. Update Token JSON Only

Do NOT manually edit CSS files in `styles/components/`  
Do edit token definitions in `tokens/` directory

**Example:** Changing a button color

```bash
# ❌ Don't do this
vim packages/design-tokens/styles/components/button-like.css

# ✅ Do this instead
vim packages/design-tokens/tokens/components/button.json
# Then:
npm run tokens:build  # or CI/CD does it automatically
```

#### 2. Commit Token JSON Changes

```bash
git add packages/design-tokens/tokens/
git commit -m "feat: update button token colors"
git push

# GitHub Actions automatically:
# 1. Validates tokens
# 2. Generates CSS
# 3. Commits generated files
# 4. Notifies team
```

#### 3. Never Commit Generated Files

Generated files are committed automatically by CI/CD:  
`packages/design-tokens/styles/generated/*`

---

## 📊 Validation Checklist

### Local Development

- [ ] Ran `npm run tokens:build` successfully
- [ ] No validation errors in console
- [ ] All CSS files generated in `styles/generated/`
- [ ] Components import from `styles/generated/`
- [ ] Storybook renders without errors
- [ ] Dark mode works correctly

### Before Committing

- [ ] Only `tokens/` directory JSON files modified
- [ ] No manual CSS edits
- [ ] `npm run tokens:validate` passes
- [ ] `npm run tokens:build` succeeds
- [ ] Tests pass: `npm run test`

### CI/CD Verification

- [ ] GitHub Actions workflow ran successfully
- [ ] No validation failures in logs
- [ ] Generated files auto-committed
- [ ] Workflow summary shows all tasks completed

---

## 🚀 Next Steps

### Immediate (This PR)

- [x] Add validation script
- [x] Add GitHub Actions workflow
- [x] Update npm scripts
- [x] Create migration guide

### Short Term (Week 1-2)

- [ ] Merge Phase 1 PR
- [ ] Update AUTOMATION-GUIDE.md
- [ ] Train team on new workflow
- [ ] Monitor CI/CD for issues

### Phase 2 (Weeks 3-4)

- [ ] Add dark mode test suite
- [ ] Create TOKEN_USAGE_GUIDE.md
- [ ] Document troubleshooting
- [ ] Setup test coverage reporting

---

## 🔗 Related Documentation

- [AUTOMATION-GUIDE.md](./AUTOMATION-GUIDE.md) - Token build process
- [DARK-THEME-STRATEGY.md](./DARK-THEME-STRATEGY.md) - Dark mode implementation
- [NAMING_CONVENTIONS.md](./NAMING_CONVENTIONS.md) - Token naming rules
- [README.md](../README.md) - Overview

---

## ❓ FAQ

### Q: Where should I edit tokens?

**A:** Only in `packages/design-tokens/tokens/` directory (JSON files).  
Generated CSS is auto-created from JSON.

### Q: How do I test tokens locally?

**A:** Run `npm run tokens:watch` for live rebuild while editing tokens.

### Q: What if validation fails?

**A:** Check error messages from `npm run tokens:validate`.  
Common issues:
- Missing `value` property in token
- Duplicate token names
- Invalid JSON syntax
- Non-camelCase/kebab-case names

### Q: Can I commit generated files?

**A:** No! GitHub Actions auto-commits them.  
Your commits should only include `tokens/` JSON changes.

### Q: What's the difference between Light and Dark themes?

**A:** See [DARK-THEME-STRATEGY.md](./DARK-THEME-STRATEGY.md)  
Key: Use `darkTheme` key in JSON for theme-specific overrides.

---

**Questions?** Contact the Design System team  
**Status:** ✅ Phase 1 Ready
