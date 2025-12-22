# 🤖 DESIGN TOKENS - AUTOMATION GUIDE

## 📋 Quick Start

### Generate Tokens
```bash
cd packages/design-tokens
npm run tokens:build
```

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

## 🎯 What Gets Generated

### From JSON Source:
```
tokens/
├── responsive-tabs.json  → styles/generated/responsive-tabs.css
├── table.json            → styles/generated/table.css
└── color/, animation/... → styles/generated/foundations.css
```

### Output Structure:
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

### Step 3: Build
```bash
npm run tokens:build
```

### Step 4: Import in App
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

### Current State (Hybrid)
```
✅ tokens/responsive-tabs.json (source)
✅ styles/components/responsive-tabs.css (manual)
❌ styles/generated/responsive-tabs.css (missing)
```

### After Migration
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

## 🚀 CI/CD Integration

### GitHub Actions (Future)

```yaml
name: Generate Design Tokens
on:
  push:
    paths:
      - 'packages/design-tokens/tokens/**'

jobs:
  generate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm install
      - run: npm run tokens:build
      - uses: stefanzweifel/git-auto-commit-action@v4
        with:
          commit_message: 'chore: regenerate design tokens'
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

---

## 📚 Resources

- **Style Dictionary Docs:** https://amzn.github.io/style-dictionary/
- **Dark Theme Strategy:** `docs/DARK-THEME-STRATEGY.md`
- **Full Analysis:** `docs/DESIGN-TOKENS-ANALYSIS.md`
- **Main README:** `packages/design-tokens/README.md`

---

## ✅ Checklist: Adding New Component Tokens

- [ ] Create JSON file in `tokens/my-component.json`
- [ ] Add component tokens (light theme)
- [ ] Add dark theme tokens under `darkTheme` (optional)
- [ ] Add filter to `style-dictionary.config.v2.js`
- [ ] Run `npm run tokens:build`
- [ ] Verify output in `styles/generated/my-component.css`
- [ ] Check shade tokens are in `:root` (not in media query)
- [ ] Check `darkTheme` tokens are in media query
- [ ] Import in `styles/index.css`
- [ ] Test in Storybook (light + dark mode)
- [ ] Commit JSON + config (NOT generated CSS)

---

**Status:** 🟢 Ready for Use  
**Next:** Run `npm run tokens:build` and verify output!
