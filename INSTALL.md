# 🚀 INSTALLATION GUIDE

## 📍 Prerequisites

- **Node.js:** >= 18.0.0 (LTS recommended)
- **pnpm:** >= 9.0.0 (for catalog support)

### Install pnpm (if needed)

```bash
# Via npm
npm install -g pnpm@latest

# Verify version
pnpm --version
# Should be >= 9.0.0
```

---

## 💾 Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/mgasic/dyn-ui-main-v01.git
cd dyn-ui-main-v01
```

### 2. Checkout Feature Branch (for catalog support)

```bash
git checkout feature/tokens-automation
```

### 3. Install All Dependencies

```bash
# From root - installs for all packages
pnpm install
```

**This will:**
- Read `pnpm-workspace.yaml` catalog
- Install dependencies for all packages
- Use centralized versions from catalog
- Link workspace packages

### 4. Build Everything

```bash
pnpm run build
```

### 5. Run Storybook

```bash
pnpm run storybook
```

Open: http://localhost:6006

---

## 📦 What Gets Installed

### From Catalog (`pnpm-workspace.yaml`)

All packages use **same versions** defined in catalog:

| Category | Packages |
|----------|----------|
| **Build** | rollup, vite, typescript, turbo |
| **Tokens** | style-dictionary, nodemon |
| **React** | react, react-dom, @types/react |
| **Testing** | vitest, @testing-library/react |
| **Storybook** | storybook, @storybook/react |

**Full list:** See `pnpm-workspace.yaml` catalog section

---

## 📝 Project Structure After Install

```
dyn-ui-main-v01/
├── packages/
│   ├── design-tokens/
│   │   ├── node_modules/       ✅ style-dictionary, etc.
│   │   └── package.json        (uses "catalog:")
│   └── dyn-ui-react/
│       ├── node_modules/       ✅ react, etc.
│       └── package.json        (uses "catalog:")
├── node_modules/           ✅ Shared dependencies
├── pnpm-lock.yaml          ✅ Lock file
└── pnpm-workspace.yaml     ✅ Catalog definitions
```

---

## 🧑‍💻 Per-Package Commands

### Design Tokens

```bash
cd packages/design-tokens

# Generate tokens
pnpm run tokens:build

# Watch mode
pnpm run tokens:watch

# Build package
pnpm run build
```

### React Components

```bash
cd packages/dyn-ui-react

# Build
pnpm run build

# Test
pnpm test

# Storybook
pnpm run storybook
```

---

## 🔧 Common Tasks

### Add New Dependency

#### Shared Dependency (for multiple packages)

**1. Add to catalog:**
```yaml
# pnpm-workspace.yaml
catalog:
  my-package: ^1.0.0
```

**2. Use in package.json:**
```json
{
  "devDependencies": {
    "my-package": "catalog:"
  }
}
```

**3. Install:**
```bash
pnpm install
```

#### Package-Specific Dependency

```bash
cd packages/my-package
pnpm add my-specific-dep
```

### Update Dependencies

```bash
# Interactive update (catalog)
pnpm update --latest --interactive

# Update specific package
pnpm update style-dictionary

# Update all
pnpm update
```

### Clean & Reinstall

```bash
# Remove all node_modules
rm -rf node_modules packages/*/node_modules

# Remove lock file
rm pnpm-lock.yaml

# Fresh install
pnpm install
```

---

## 🐛 Troubleshooting

### "catalog:" not resolved

**Error:**
```
ERR_PNPM_NO_MATCHING_VERSION_INSIDE_CATALOG
No matching version found for <package> inside the catalog
```

**Solution:**
1. Check package exists in `pnpm-workspace.yaml` catalog
2. Ensure pnpm version >= 9.0: `pnpm --version`
3. Run from root: `pnpm install`

### style-dictionary not found

**Error:**
```
'style-dictionary' is not recognized as an internal or external command
```

**Solution:**
```bash
# Check if installed
pnpm list style-dictionary

# If missing, install from root
cd <project-root>
pnpm install

# Verify
cd packages/design-tokens
pnpm run tokens:build
```

### Version conflicts

**Error:**
```
Package X requires Y@^1.0.0 but catalog defines Y@^2.0.0
```

**Solution:**
```yaml
# pnpm-workspace.yaml
# Adjust catalog version to satisfy all packages
catalog:
  Y: ^1.0.0  # Downgrade if needed
```

### pnpm version too old

**Error:**
```
Unknown option: 'catalog'
```

**Solution:**
```bash
# Update pnpm
npm install -g pnpm@latest

# Verify
pnpm --version  # Should be >= 9.0.0
```

---

## ✅ Verification Checklist

After installation, verify:

```bash
# 1. pnpm version
pnpm --version
# ✅ Should be >= 9.0.0

# 2. Dependencies installed
ls node_modules
# ✅ Should have packages

# 3. Workspace packages linked
pnpm list @dyn-ui/design-tokens
# ✅ Should show workspace link

# 4. Catalog resolved
pnpm list style-dictionary
# ✅ Should show version from catalog

# 5. Build works
pnpm run build
# ✅ Should complete without errors

# 6. Storybook works
pnpm run storybook
# ✅ Should open on localhost:6006
```

---

## 📚 Additional Resources

- **Dependency Management:** [docs/DEPENDENCY-MANAGEMENT.md](docs/DEPENDENCY-MANAGEMENT.md)
- **Design Tokens Setup:** [packages/design-tokens/AUTOMATION-GUIDE.md](packages/design-tokens/AUTOMATION-GUIDE.md)
- **pnpm Catalog Docs:** https://pnpm.io/catalogs
- **pnpm Workspace Docs:** https://pnpm.io/workspaces

---

## 🚀 Next Steps

After successful installation:

1. **Generate Design Tokens:**
   ```bash
   cd packages/design-tokens
   pnpm run tokens:build
   ```

2. **Explore Components:**
   ```bash
   pnpm run storybook
   ```

3. **Run Tests:**
   ```bash
   pnpm test
   ```

4. **Read Documentation:**
   - [DEPENDENCY-MANAGEMENT.md](docs/DEPENDENCY-MANAGEMENT.md)
   - [DESIGN-TOKENS-ANALYSIS.md](docs/DESIGN-TOKENS-ANALYSIS.md)
   - [AUTOMATION-GUIDE.md](packages/design-tokens/AUTOMATION-GUIDE.md)

---

**Happy Coding!** 🎉
