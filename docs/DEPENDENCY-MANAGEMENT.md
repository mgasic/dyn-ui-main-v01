# 📦 DEPENDENCY MANAGEMENT GUIDE

## 🎯 Overview

Ovaj projekat koristi **pnpm catalog** za centralizovano upravljanje verzijama dependency-ja kroz ceo monorepo.

---

## 🔑 Key Concept: Catalog

**Catalog** omogućava definisanje verzija na jednom mestu (`pnpm-workspace.yaml`) i korišćenje istih verzija u svim paketima.

### Benefits

✅ **Single Source of Truth** - Jedna verzija za ceo projekat  
✅ **Guaranteed Compatibility** - Sve verzije su testirane zajedno  
✅ **Easy Updates** - Ažuriraj na jednom mestu  
✅ **No Version Conflicts** - Ista verzija svuda  
✅ **Official Versions** - Samo stable, proveren releases  

---

## 📚 How It Works

### 1. Define Versions in Catalog

**File:** `pnpm-workspace.yaml`

```yaml
catalog:
  # Define version once
  style-dictionary: ^3.9.2
  typescript: ^5.6.3
  react: ^18.3.1
```

### 2. Use in Package

**File:** `packages/design-tokens/package.json`

```json
{
  "devDependencies": {
    "style-dictionary": "catalog:",  // ← Uses version from catalog
    "typescript": "catalog:"
  }
}
```

### 3. Install

```bash
# From root
pnpm install

# pnpm resolves "catalog:" to actual versions
```

---

## 🛠️ Catalog Categories

### Build Tools

| Package | Version | Purpose |
|---------|---------|----------|
| `rollup` | ^4.9.6 | Bundling |
| `vite` | ^5.4.11 | Dev server |
| `typescript` | ^5.6.3 | Type checking |
| `turbo` | ^2.3.3 | Monorepo build |

### Design Tokens

| Package | Version | Purpose |
|---------|---------|----------|
| `style-dictionary` | ^3.9.2 | Token generation |
| `nodemon` | ^3.1.9 | Watch mode |

### React Ecosystem

| Package | Version | Purpose |
|---------|---------|----------|
| `react` | ^18.3.1 | UI library |
| `react-dom` | ^18.3.1 | DOM renderer |
| `@types/react` | ^18.3.18 | TypeScript types |

### Testing

| Package | Version | Purpose |
|---------|---------|----------|
| `vitest` | ^2.1.8 | Test runner |
| `@testing-library/react` | ^16.1.0 | React testing |
| `@playwright/test` | ^1.49.1 | E2E testing |

### Storybook

| Package | Version | Purpose |
|---------|---------|----------|
| `storybook` | ^8.4.7 | Component dev |
| `@storybook/react` | ^8.4.7 | React integration |
| `@storybook/react-vite` | ^8.4.7 | Vite integration |

---

## 📝 Usage Examples

### Adding New Package with Catalog

**1. Add to catalog (if not exists):**

```yaml
# pnpm-workspace.yaml
catalog:
  my-new-package: ^1.2.3
```

**2. Use in package.json:**

```json
{
  "devDependencies": {
    "my-new-package": "catalog:"
  }
}
```

**3. Install:**

```bash
pnpm install
```

---

### Adding Package NOT in Catalog

If a package is specific to one workspace and not used elsewhere:

```json
{
  "devDependencies": {
    "specific-package": "^1.0.0"  // ← Direct version
  }
}
```

---

### Updating Catalog Version

**1. Edit catalog:**

```yaml
# pnpm-workspace.yaml
catalog:
  typescript: ^5.7.0  # Updated from ^5.6.3
```

**2. Reinstall everywhere:**

```bash
pnpm install
```

**3. All packages using `"typescript": "catalog:"` get updated!**

---

## ⚙️ Installation Workflow

### Initial Setup

```bash
# Clone repo
git clone <repo-url>
cd dyn-ui-main-v02

# Install all dependencies (from root)
pnpm install

# All packages get dependencies from catalog
```

### Adding New Workspace Package

```bash
# 1. Create package
mkdir packages/my-package
cd packages/my-package

# 2. Create package.json
cat > package.json <<EOF
{
  "name": "@dyn-ui/my-package",
  "version": "0.1.0",
  "devDependencies": {
    "typescript": "catalog:",
    "rollup": "catalog:"
  }
}
EOF

# 3. Install from root
cd ../..
pnpm install
```

---

## 🔍 Checking Installed Versions

### List All Dependencies

```bash
pnpm list --depth=0
```

### Check Specific Package

```bash
pnpm list style-dictionary

# Output:
# packages/design-tokens
# └── style-dictionary@3.9.2
```

### Verify Catalog Resolution

```bash
pnpm why style-dictionary

# Shows where it's used and version from catalog
```

---

## 🐛 Troubleshooting

### "catalog:" not resolved?

**Problem:**
```bash
ERR_PNPM_NO_MATCHING_VERSION_INSIDE_CATALOG
```

**Solution:**
1. Check package name in `pnpm-workspace.yaml`
2. Ensure pnpm version >= 9.0
3. Run `pnpm install` from root

### Version Conflicts

**Problem:**
```
Package A wants react@18.3.1
Package B wants react@19.0.0
```

**Solution:**
```yaml
# pnpm-workspace.yaml
catalog:
  react: ^18.3.1  # ← Force single version
```

All packages must use `"react": "catalog:"`

### Missing Package in Catalog

**Problem:**
```json
{
  "devDependencies": {
    "new-package": "catalog:"  // ❌ Not defined
  }
}
```

**Solution:**
Add to `pnpm-workspace.yaml` first:
```yaml
catalog:
  new-package: ^1.0.0
```

---

## 📊 Version Selection Criteria

### Choosing Versions

Versions in catalog are selected based on:

1. **✅ Official Release** - No beta/alpha/rc
2. **✅ Stable** - At least 1 month old
3. **✅ Compatible** - Tested together
4. **✅ LTS (if applicable)** - Long-term support
5. **✅ No Breaking Changes** - Within semver range

### Update Strategy

- **Patch updates** (↑ ^1.2.3 → ^1.2.4): Immediate
- **Minor updates** (↑ ^1.2.0 → ^1.3.0): Weekly review
- **Major updates** (↑ ^1.0.0 → ^2.0.0): Quarterly, with migration plan

---

## 📝 Current Catalog (Summary)

```yaml
# Latest stable versions as of Dec 2025
catalog:
  # Core
  typescript: ^5.6.3
  react: ^18.3.1
  
  # Build
  rollup: ^4.9.6
  vite: ^5.4.11
  turbo: ^2.3.3
  
  # Design Tokens
  style-dictionary: ^3.9.2  # Latest stable
  nodemon: ^3.1.9
  
  # Testing
  vitest: ^2.1.8
  '@testing-library/react': ^16.1.0
  
  # Storybook v8 (Stable)
  storybook: ^8.4.7
  '@storybook/react': ^8.4.7
```

**Full list:** See `pnpm-workspace.yaml`

---

## ✅ Best Practices

### DO ✅

1. **Always use catalog for shared dependencies**
   ```json
   { "react": "catalog:" }
   ```

2. **Update catalog versions regularly**
   ```bash
   pnpm update --latest --interactive
   ```

3. **Test after catalog updates**
   ```bash
   pnpm test
   pnpm build
   ```

4. **Document breaking changes**
   - Update CHANGELOG.md
   - Add migration guide

### DON'T ❌

1. **Don't use direct versions for shared deps**
   ```json
   { "react": "^18.3.1" }  // ❌ Use catalog instead
   ```

2. **Don't mix catalog and direct**
   ```json
   {
     "react": "catalog:",     // ✅
     "react-dom": "^18.3.1"  // ❌ Should also be catalog
   }
   ```

3. **Don't skip testing after updates**

---

## 🚀 Migration from Direct Versions

### Before (Direct Versions)

```json
// packages/design-tokens/package.json
{
  "devDependencies": {
    "style-dictionary": "^3.9.0",
    "typescript": "^5.3.3"
  }
}
```

### After (Catalog)

```json
// packages/design-tokens/package.json
{
  "devDependencies": {
    "style-dictionary": "catalog:",
    "typescript": "catalog:"
  }
}
```

```yaml
# pnpm-workspace.yaml
catalog:
  style-dictionary: ^3.9.2
  typescript: ^5.6.3
```

### Migration Steps

1. **Add all versions to catalog**
2. **Replace versions with `"catalog:"`**
3. **Run `pnpm install` from root**
4. **Test everything**
5. **Commit**

---

## 📚 Resources

- **pnpm Catalog Docs:** https://pnpm.io/catalogs
- **Workspace Guide:** https://pnpm.io/workspaces
- **Version Ranges:** https://semver.npmjs.com/

---

## 📞 Support

For questions:
- Check `pnpm-workspace.yaml` for defined versions
- Run `pnpm why <package>` to see usage
- Review this guide

---

**Status:** ✅ Active  
**Last Updated:** Dec 22, 2025
