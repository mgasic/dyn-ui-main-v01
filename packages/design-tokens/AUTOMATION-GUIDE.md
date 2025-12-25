# 🤖 DESIGN TOKENS - AUTOMATION GUIDE

## 📋 Quick Start

### Validate Tokens

```bash
cd packages/design-tokens
npm run tokens:validate
```

### Generate Tokens

```bash
npm run tokens:build
```

**Note:** Validation runs automatically before build.

### Watch Mode (Development)

```bash
npm run tokens:watch
# Automatically regenerates on JSON changes
```

### Clean Generated Files

```bash
npm run tokens:clean
```

---

## ✅ PHASE 1: Validation & CI/CD

### Token Validation Rules

`npm run tokens:validate` enforces:

1. **Valid JSON Syntax**
   - All JSON files must parse correctly
   - No trailing commas or missing quotes

2. **Token Values Required**
   - Every token must have a `value` property
   - Value cannot be null, undefined, or empty
   
   ```json
   ❌ { "color": {} }                    // Missing value
   ❌ { "color": { "value": null } }    // Null value
   ✅ { "color": { "value": "#000" } }  // Valid
   ```

3. **Naming Conventions**
   - Keys must use `camelCase` or `kebab-case`
   - No spaces, special chars, or SCREAMING_SNAKE_CASE
   
   ```json
   ❌ "My Color": {}           // Space
   ❌ "MY_COLOR": {}           // SCREAMING_SNAKE_CASE
   ✅ "myColor": {}            // camelCase
   ✅ "my-color": {}           // kebab-case
   ```

4. **No Duplicate Tokens**
   - Token names must be unique across all files
   - Prevents accidental overrides
   
   ```
   ❌ tokens/color.json has --dyn-color-primary
   ❌ tokens/button.json ALSO has --dyn-color-primary
   ```

### GitHub Actions Workflow

**File:** `.github/workflows/design-tokens-generate.yml`

**Triggers on:**
- Push to `main` or `develop` branches
- Changes to `packages/design-tokens/tokens/**`
- Changes to `packages/design-tokens/style-dictionary.config.v2.js`
- Manual trigger via GitHub UI

**Workflow steps:**

```
1. Checkout code
2. Setup Node.js 18
3. Install dependencies
4. 🔍 Validate tokens (npm run tokens:validate)
5. 🎨 Generate CSS (npm run tokens:build)
6. 🧪 Run tests (npm run test)
7. 📝 Auto-commit generated files
8. 📊 Generate workflow summary
```

**Auto-commit behavior:**
- Only commits if files changed
- Commits to: `packages/design-tokens/styles/generated/**`
- Commit message: `chore: regenerate design tokens`
- Author: `Design Tokens Bot`

### Development Workflow

```bash
# 1. Edit token JSON
vim packages/design-tokens/tokens/my-component.json

# 2. Validate locally (optional, CI/CD also validates)
npm run tokens:validate

# 3. Generate CSS locally
npm run tokens:build

# 4. Test in Storybook
npm run storybook

# 5. Commit token changes (NOT generated files)
git add packages/design-tokens/tokens/
git commit -m "feat: update button token colors"
git push

# 6. GitHub Actions automatically:
#    - Validates tokens
#    - Generates CSS
#    - Commits generated files
#    - Sends notification
```

---

## 🎯 What Gets Generated

### From JSON Source

```
tokens/
├── responsive-tabs.json  → styles/generated/responsive-tabs.css
├── table.json            → styles/generated/table.css
└── color/, animation/... → styles/generated/foundations.css
```

### Output Structure

```
styles/generated/
├── responsive-tabs.css   ✅ AUTO-GENERATED
├── table.css             ✅ AUTO-GENERATED
└── foundations.css       ✅ AUTO-GENERATED

build/js/
└── tokens.js             ✅ JavaScript export

build/ts/
└── tokens.d.ts           ✅ TypeScript types
```

---

## 🔧 Configuration

### Main Config: `style-dictionary.config.v2.js`

**Features:**

- ✅ Custom transform for shorter names
- ✅ Dark theme support via media queries
- ✅ Separate files per component
- ✅ JavaScript/TypeScript output
- ✅ **Shade-aware dark theme detection** (see below)

### Custom Transform: Shorter Names

**Input (JSON):**

```json
{
  "dyn": {
    "responsiveTabs": {
      "color": {
        "background": {
          "inactive": { "value": "#E0D78C" }
        }
      }
    }
  }
}
```

**Output (CSS):**

```css
--dyn-responsive-tabs-bg-inactive: #E0D78C;
```

**Not:**

```css
--dyn-responsive-tabs-color-background-inactive: #E0D78C; /* ❌ Too long */
```

---

## 📝 How to Add New Tokens

### Step 1: Create/Edit JSON

**Example:** `tokens/my-component.json`

```json
{
  "dyn": {
    "myComponent": {
      "color": {
        "background": {
          "value": "#FFFFFF"
        }
      },
      "darkTheme": {
        "color": {
          "background": {
            "value": "#000000"
          }
        }
      }
    }
  }
}
```

### Step 2: Add to Config

**Edit:** `style-dictionary.config.v2.js`

```javascript
files: [
  // ... existing files
  {
    destination: 'my-component.css',
    format: 'css/variables-with-dark',
    filter: (token) => {
      return token.filePath.includes('my-component.json');
    }
  }
]
```

### Step 3: Validate

```bash
npm run tokens:validate
```

### Step 4: Build

```bash
npm run tokens:build
```

### Step 5: Import in App

```css
/* styles/index.css */
@import './generated/my-component.css';
```

---

## 🎨 Dark Theme Support

### ⚠️ IMPORTANT: Shade Names vs Dark Theme

**Our system distinguishes between:**

1. **Shade names** (e.g., `dark`, `darker`) - color variations within the SAME theme
2. **Dark theme tokens** (under `darkTheme` branch) - alternative values for dark MODE

#### ✅ Correct: Shade Names in Light Theme

```json
{
  "color": {
    "neutral": {
      "dark": {
        "70": { "value": "#666666" }  // ← Shade name, NOT dark theme!
      }
    },
    "feedback": {
      "negative": {
        "dark": { "value": "#d32f2f" },    // ← Shade name
        "darker": { "value": "#b71c1c" }  // ← Shade name
      }
    }
  }
}
```

**Generated CSS (in `:root`, not media query):**

```css
:root {
  --color-neutral-dark-70: #666666;        /* ✅ In light theme */
  --color-feedback-negative-dark: #d32f2f;  /* ✅ In light theme */
  --color-feedback-negative-darker: #b71c1c; /* ✅ In light theme */
}
```

#### ✅ Correct: Dark Theme Branch

```json
{
  "dyn": {
    "button": {
      "color": { "value": "#0066cc" },
      "darkTheme": {                    // ← Explicit keyword!
        "color": { "value": "#3399ff" }
      }
    }
  }
}
```

**Generated CSS:**

```css
:root {
  --dyn-button-color: #0066cc;  /* ✅ Light theme default */
}

@media (prefers-color-scheme: dark) {
  :root {
    --dyn-button-color: #3399ff;  /* ✅ Dark theme override */
  }
}
```

### Key Rule

✅ **Only tokens under `darkTheme` branch go into media query**  
✅ **All other tokens (including shade names like `dark`) stay in `:root`**

---

## 🔄 Migration from Manual CSS

### Current State (Hybrid - Before Phase 1)

```
✅ tokens/responsive-tabs.json (source)
✅ styles/components/responsive-tabs.css (manual)
❌ styles/generated/responsive-tabs.css (missing)
```

### After Phase 1 (Single Source of Truth)

```
✅ tokens/responsive-tabs.json (source)
✅ styles/generated/responsive-tabs.css (auto-generated)
❌ styles/components/responsive-tabs.css (REMOVED)
```

### Migration Steps

1. **Generate tokens:**

   ```bash
   npm run tokens:build
   ```

2. **Verify output:**

   ```bash
   cat styles/generated/responsive-tabs.css
   # Should match manual CSS values
   ```

3. **Update imports:**

   ```css
   /* OLD */
   @import './components/responsive-tabs.css';

   /* NEW */
   @import './generated/responsive-tabs.css';
   ```

4. **Test in Storybook:**

   ```bash
   npm run storybook
   ```

5. **Remove manual file:**

   ```bash
   rm styles/components/responsive-tabs.css
   ```

---

## 📊 File Naming Convention

### JSON Sources

```
tokens/
├── responsive-tabs.json    (component)
├── table.json              (component)
├── color/base.json         (foundation)
└── animation/timing.json   (foundation)
```

### Generated CSS

```
styles/generated/
├── responsive-tabs.css     (from responsive-tabs.json)
├── table.css               (from table.json)
└── foundations.css         (from color/, animation/, etc.)
```

---

## 🐛 Troubleshooting

### Validation Errors

**Error:** `Token has no value`

```bash
Fix: Add "value" property to token

❌ { "color": { } }
✅ { "color": { "value": "#000" } }
```

**Error:** `Duplicate token names`

```bash
Fix: Rename one of the duplicate tokens

Check: grep -r "--dyn-color-primary" tokens/
```

**Error:** `Invalid JSON syntax`

```bash
Fix: Check for:
  - Missing closing braces/brackets
  - Trailing commas
  - Unquoted strings
  - Invalid characters
```

### Tokens Not Generated?

1. **Check file path:**

   ```bash
   ls tokens/responsive-tabs.json
   # Should exist
   ```

2. **Check config filter:**

   ```javascript
   filter: (token) => {
     console.log(token.filePath); // Debug
     return token.filePath.includes('responsive-tabs.json');
   }
   ```

3. **Run with verbose:**

   ```bash
   style-dictionary build -c style-dictionary.config.v2.js --verbose
   ```

### Names Don't Match?

Check custom transform in `style-dictionary.config.v2.js`:

```javascript
StyleDictionary.registerTransform({
  name: 'name/dyn/short',
  transformer: (token) => {
    console.log('Input:', token.path);
    console.log('Output:', token.name);
    // ...
  }
});
```

### Dark Theme Not Working?

Check JSON structure:

```json
{
  "dyn": {
    "component": {
      "color": { "value": "light" },
      "darkTheme": {              // ← Must be named 'darkTheme'
        "color": { "value": "dark" }
      }
    }
  }
}
```

### Shade Tokens Missing from Light Theme?

If you see tokens like `--color-neutral-dark-70` missing from `:root`, check:

1. **Verify they're NOT under `darkTheme` branch**
2. **Check the `isDarkThemeToken()` function in config**
3. **See:** `docs/DARK-THEME-STRATEGY.md` for details

### CI/CD Workflow Failed?

Check GitHub Actions logs:

1. Go to: https://github.com/mgasic/dyn-ui-main-v01/actions
2. Click on failed workflow
3. Expand failed step for error details
4. Common issues:
   - Validation errors (fix tokens)
   - Node version mismatch (check setup-node action)
   - Missing dependencies (check npm ci)

---

## 📚 Resources

- **Style Dictionary Docs:** https://amzn.github.io/style-dictionary/
- **Dark Theme Strategy:** `docs/DARK-THEME-STRATEGY.md`
- **Full Analysis:** `docs/DESIGN-TOKENS-ANALYSIS.md`
- **Phase 1 Migration:** `docs/PHASE-1-MIGRATION.md`
- **Main README:** `packages/design-tokens/README.md`

---

## ✅ Checklist: Adding New Component Tokens

- [ ] Create JSON file in `tokens/my-component.json`
- [ ] Add component tokens (light theme)
- [ ] Add dark theme tokens under `darkTheme` (optional)
- [ ] Run `npm run tokens:validate` (no errors)
- [ ] Add filter to `style-dictionary.config.v2.js`
- [ ] Run `npm run tokens:build`
- [ ] Verify output in `styles/generated/my-component.css`
- [ ] Check shade tokens are in `:root` (not in media query)
- [ ] Check `darkTheme` tokens are in media query
- [ ] Import in `styles/index.css`
- [ ] Test in Storybook (light + dark mode)
- [ ] Commit only JSON + config (NOT generated CSS)
- [ ] GitHub Actions auto-commits generated files

---

## 🚀 Phase 1 Status

✅ **Validation Script:** Implemented  
✅ **GitHub Actions Workflow:** Active  
✅ **NPM Scripts:** Updated  
✅ **Documentation:** Complete  

**Next:** Phase 2 (Tests + Usage Guide)

---

**Status:** 🟢 Ready for Use  
**Last Updated:** December 25, 2025  
**Version:** 1.0 (Phase 1)
