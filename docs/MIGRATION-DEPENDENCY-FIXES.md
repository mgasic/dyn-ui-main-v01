# 🔄 DEPENDENCY VERSION FIXES - MIGRATION GUIDE

## 🎯 Summary

Rešavanje peer dependency konflikata nakon pnpm install.

---

## 🐞 Problems Identified

### 1. Vite Version Mismatch

**Problem:**
```
✗ unmet peer vite@"^5.0.0 || ^6.0.0 || ^7.0.0-0": found 4.5.14
```

**Root Cause:**
- `vitest` 2.x zahteva `vite` >= 5.0.0
- Projekat koristi `vite` 4.5.14 (zastarela verzija)

**Solution:**
- ✅ Upgrade `vite` na `^5.4.11`

---

### 2. Storybook Version Mix (v8 vs v9)

**Problem:**
```
✗ unmet peer storybook@^8.6.14: found 9.1.10
✗ unmet peer storybook@^9.1.12: found 9.1.10
```

**Root Cause:**
- Mix verzija: `storybook@9.1.10` sa `addon-essentials@8.6.14`
- Addons iz v8 nisu kompatibilni sa core v9

**Solution:**
- ✅ Sve Storybook pakete na `^9.1.12`

---

### 3. Vitest Version Mismatch

**Problem:**
```
✗ unmet peer @vitest/ui@2.1.9: found 3.2.4
✗ unmet peer @vitest/browser@2.1.9: found 3.2.4
```

**Root Cause:**
- `vitest@2.1.9` ali `@vitest/ui@3.2.4` i `@vitest/browser@3.2.4`
- Peer dependency mismatch

**Solution:**
- ✅ Align sve vitest pakete na `^2.1.9`

---

## ✅ Applied Fixes

### Updated Catalog Versions

**File:** `pnpm-workspace.yaml`

```yaml
catalog:
  # Build Tools
  vite: ^5.4.11              # ↑ Upgraded from 4.5.14
  rollup: ^4.52.3            # ↑ Updated to latest
  typescript: ^5.9.3         # ↑ Updated to latest
  
  # Design Tokens
  style-dictionary: ^3.9.2   # ✅ Latest v3 stable
  nodemon: ^3.1.11           # ↑ Updated
  
  # Testing
  vitest: ^2.1.9             # ✅ Matched
  '@vitest/ui': ^2.1.9       # ✅ Matched with vitest
  '@vitest/browser': ^2.1.9  # ✅ Matched with vitest
  '@vitest/coverage-v8': ^2.1.9
  
  # Storybook v9 (All aligned)
  storybook: ^9.1.12         # ✅ Stable v9
  '@storybook/react': ^9.1.12
  '@storybook/react-vite': ^9.1.12
  '@storybook/addon-essentials': ^9.1.12    # ↑ v8 → v9
  '@storybook/addon-interactions': ^9.1.12  # ↑ v8 → v9
  '@storybook/addon-a11y': ^9.1.12
  '@storybook/addon-docs': ^9.1.12
  '@storybook/addon-controls': ^9.1.12
  '@storybook/addon-vitest': ^9.1.12
```

---

## 📦 How to Apply Fixes

### Step 1: Pull Latest Changes

```bash
git fetch origin
git checkout feature/tokens-automation
git pull
```

### Step 2: Clean Install

```bash
# Remove existing installations
rm -rf node_modules pnpm-lock.yaml
rm -rf packages/*/node_modules

# Fresh install with updated catalog
pnpm install
```

### Step 3: Verify Fixes

```bash
# Check peer dependencies
pnpm list --depth 0

# Should NOT show peer dependency errors
```

---

## 🔍 Verification

### Check Vite Version

```bash
pnpm list vite

# Expected:
# vite@5.4.11
```

### Check Storybook Versions

```bash
pnpm list storybook @storybook/addon-essentials

# Expected:
# storybook@9.1.12
# @storybook/addon-essentials@9.1.12
```

### Check Vitest Versions

```bash
pnpm list vitest @vitest/ui @vitest/browser

# Expected:
# vitest@2.1.9
# @vitest/ui@2.1.9
# @vitest/browser@2.1.9
```

---

## 🧪 Breaking Changes

### 1. Vite 4 → 5 Migration

**Potential Issues:**
- Plugin API changes (minor)
- Build output changes (minor)

**Action Required:**
- ✅ Test dev server: `pnpm run dev`
- ✅ Test build: `pnpm run build`

### 2. Storybook 8 → 9 Migration

**Changes:**
- New CLI commands
- Addon API updates
- Config file changes (automatic)

**Action Required:**
- ✅ Test Storybook: `pnpm run storybook`
- ✅ Check all stories load
- ✅ Test addons (a11y, interactions, docs)

**Migration Notes:**
- Most changes are backward compatible
- Storybook will auto-migrate config on first run
- Check `.storybook/main.ts` for any deprecation warnings

---

## ⚠️ Deprecated Packages (Ignore)

### Safe to Ignore

```
 WARN  deprecated @types/classnames@2.3.4
 WARN  deprecated @types/storybook__react@5.2.1
```

**Reason:**
- Used by sub-dependencies
- No action needed
- Will be removed in next major update by maintainers

---

## ✅ Post-Migration Checklist

### Build & Test

```bash
# 1. Clean install
pnpm install

# 2. Generate tokens
cd packages/design-tokens
pnpm run tokens:build

# 3. Build all packages
cd ../..
pnpm run build

# 4. Run tests
pnpm test

# 5. Start Storybook
pnpm run storybook
```

### Visual Verification

- [ ] Storybook loads without errors
- [ ] All stories visible
- [ ] Addons work (Controls, Docs, A11y)
- [ ] Dark mode toggle works
- [ ] Responsive tabs component renders correctly
- [ ] No console errors

---

## 📊 Before vs After

### Before (Mixed Versions)

| Package | Version | Issue |
|---------|---------|-------|
| vite | 4.5.14 | ❌ Too old |
| storybook | 9.1.10 | ✅ OK |
| @storybook/addon-essentials | 8.6.14 | ❌ v8 with v9 core |
| vitest | 2.1.9 | ✅ OK |
| @vitest/ui | 3.2.4 | ❌ Mismatch |
| @vitest/browser | 3.2.4 | ❌ Mismatch |

### After (Aligned Versions)

| Package | Version | Status |
|---------|---------|--------|
| vite | 5.4.11 | ✅ Latest LTS |
| storybook | 9.1.12 | ✅ Latest stable |
| @storybook/addon-essentials | 9.1.12 | ✅ Aligned |
| vitest | 2.1.9 | ✅ Stable |
| @vitest/ui | 2.1.9 | ✅ Matched |
| @vitest/browser | 2.1.9 | ✅ Matched |

---

## 🐛 Troubleshooting

### Still Getting Peer Dependency Warnings?

**Solution:**
```bash
# Nuclear option: completely clean and reinstall
rm -rf node_modules packages/*/node_modules pnpm-lock.yaml
pnpm install --force
```

### Storybook Not Starting?

**Check:**
```bash
# Ensure Storybook v9
pnpm list storybook

# If still v8, force upgrade
pnpm update storybook --latest
```

### Vite Build Errors?

**Check:**
```bash
# Ensure vite v5
pnpm list vite

# Update plugins
pnpm update @vitejs/plugin-react --latest
```

---

## 📚 Resources

- **Vite v5 Migration:** https://vite.dev/guide/migration.html
- **Storybook v9 Release:** https://storybook.js.org/blog/storybook-9-0/
- **Vitest Docs:** https://vitest.dev/

---

## 🚀 Next Steps

After successful migration:

1. **Generate tokens:**
   ```bash
   cd packages/design-tokens
   pnpm run tokens:build
   ```

2. **Test everything:**
   ```bash
   pnpm test
   pnpm run storybook
   ```

3. **Commit lock file:**
   ```bash
   git add pnpm-lock.yaml
   git commit -m "chore: update dependencies to resolve peer conflicts"
   ```

---

**Status:** ✅ Fixed  
**Commit:** [05a7178](https://github.com/mgasic/dyn-ui-main-v01/commit/05a7178724408dead8246e08273aeacc4208add4)  
**Date:** 22.12.2025
