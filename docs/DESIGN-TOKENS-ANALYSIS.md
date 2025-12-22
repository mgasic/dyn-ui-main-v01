# 🔬 DESIGN TOKENS - DETALJANA ANALIZA I PLAN

**Date:** 22.12.2025  
**Status:** Analysis Complete  
**Conclusion:** ✅ Sistem JE implementiran, ali sa HIBRIDNIM pristupom

---

## 📊 TRENUTNO STANJE

### ✅ ŠTA POSTOJI

#### 1. Style Dictionary Setup

**Lokacija:** `packages/design-tokens/`

```javascript
// style-dictionary.config.js
module.exports = {
  source: ['tokens/**/*.json'],  // ✅ POSTOJI
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'build/css/',     // ✅ POSTOJI
      files: [{
        destination: 'tokens.css',
        format: 'css/variables'
      }]
    }
  }
};
```

**Status:** ✅ **Konfiguracija postoji i radi**

---

#### 2. JSON Token Source Files

**Lokacija:** `packages/design-tokens/tokens/`

```
tokens/
├── animation/            ✅ POSTOJI
├── color/                ✅ POSTOJI
├── shadow/               ✅ POSTOJI
├── size/                 ✅ POSTOJI
├── responsive-tabs.json  ✅ POSTOJI (komponentni tokeni)
└── table.json            ✅ POSTOJI (komponentni tokeni)
```

**Primer: responsive-tabs.json**
```json
{
  "dyn": {
    "responsiveTabs": {
      "color": {
        "background": {
          "inactive": {
            "value": "#E0D78C",
            "description": "Background color for inactive tabs"
          },
          "active": {
            "value": "#FFFEF7"
          }
        }
      }
    }
  }
}
```

**Status:** ✅ **JSON tokeni POSTOJE za ResponsiveTabs i Table**

---

#### 3. Generated CSS Output

**Lokacija:** `packages/design-tokens/build/css/tokens.css`

```css
/**
 * Do not edit directly
 * Generated on Sat, 04 Oct 2025 11:57:09 GMT
 */

:root {
  --animation-transition-all: all 0.2s ease-in-out;
  --color-action-default: #0066cc;
  --color-base-white: #ffffff;
  /* ... */
}
```

**Problem:** ⚠️ **responsive-tabs tokeni NISU u generiranom fajlu!**

**Razlog:** Style Dictionary config **NIJE** pokrenut nakon dodavanja `responsive-tabs.json`

---

#### 4. Manual CSS Files (Hybrid Approach)

**Lokacija:** `packages/design-tokens/styles/components/`

```
styles/components/
├── button-like.css         ✅ Ručno pisan
├── input-like.css          ✅ Ručno pisan
├── responsive-tabs.css     ✅ Ručno pisan (naš novi)
├── table-like.css          ✅ Ručno pisan
└── index.css               ✅ Imports all
```

**Primer: responsive-tabs.css**
```css
:root {
  /* Ručno pisani tokeni */
  --dyn-responsive-tabs-bg-inactive: #E0D78C;
  --dyn-responsive-tabs-bg-active: #FFFEF7;
  /* ... */
}
```

**Status:** ✅ **Ručni CSS postoji i RADI**

---

## 🔍 PROBLEM: HIBRIDNI PRISTUP

### Trenutna Arhitektura

```
JSON Source (tokens/)          Manual CSS (styles/)
       ↓                              ↓
Style Dictionary               Direct Write
       ↓                              ↓
  build/css/                    styles/components/
   tokens.css                    responsive-tabs.css
       ↓                              ↓
  (NE KORISTI SE)              (KORISTI SE U APP-u)
```

### Zašto Hibrid?

1. **Style Dictionary output** (`build/css/tokens.css`) - generisan, ali **ZASTAREO**
2. **Manual CSS** (`styles/components/`) - ručno pisan, **AKTUELAN** i u upotrebi
3. **JSON tokeni** (`tokens/responsive-tabs.json`) - postoje, ali **NISU REGENERISANI**

---

## 🎯 PLAN: PRELAZAK NA ČIST STYLE DICTIONARY WORKFLOW

### FAZA 1: Setup & Configuration (30 min)

#### 1.1 Ažuriraj Style Dictionary Config

**Trenutno:**
```javascript
module.exports = {
  source: ['tokens/**/*.json'],
  platforms: {
    css: {
      buildPath: 'build/css/',
      files: [{
        destination: 'tokens.css',  // ❌ Jedan fajl za SVE
      }]
    }
  }
};
```

**NOVO:**
```javascript
module.exports = {
  source: ['tokens/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'styles/',  // ✅ Output u styles/
      files: [
        {
          // Foundation tokens
          destination: 'foundations/generated.css',
          format: 'css/variables',
          filter: (token) => !token.path.includes('component')
        },
        {
          // Component tokens - SEPARATE FILES
          destination: 'components/responsive-tabs-generated.css',
          format: 'css/variables',
          filter: (token) => token.path.includes('responsiveTabs')
        },
        {
          // Table component
          destination: 'components/table-generated.css',
          format: 'css/variables',
          filter: (token) => token.path.includes('table')
        }
      ]
    }
  }
};
```

---

#### 1.2 Dodaj Build Skripe

**package.json:**
```json
{
  "scripts": {
    "tokens:build": "style-dictionary build",
    "tokens:watch": "nodemon --watch tokens --exec npm run tokens:build",
    "tokens:clean": "rm -rf styles/foundations/generated.css styles/components/*-generated.css"
  }
}
```

---

### FAZA 2: Transform Naming Convention (1 sat)

#### Problem: Naming Mismatch

**JSON:**
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

**Style Dictionary Output:**
```css
--dyn-responsive-tabs-color-background-inactive: #E0D78C;
```

**Željeni Output:**
```css
--dyn-responsive-tabs-bg-inactive: #E0D78C;
```

#### Rešenje: Custom Transform

**Kreiraj:** `packages/design-tokens/transforms/name-shortener.js`

```javascript
module.exports = {
  name: 'name/cti/kebab-short',
  type: 'name',
  transformer: (token, options) => {
    const path = token.path.slice(1); // Remove 'dyn'
    
    // Custom mappings
    const replacements = {
      'color-background': 'bg',
      'color-text': 'text',
      'border-width': 'border-width',
      'border-radius': 'border-radius',
      'spacing-tab-padding': 'tab-padding',
      'typography-fontSize': 'font-size',
      'typography-fontWeight': 'font-weight'
    };
    
    let name = path.join('-');
    
    // Apply replacements
    Object.entries(replacements).forEach(([long, short]) => {
      name = name.replace(long, short);
    });
    
    return `--dyn-${name}`;
  }
};
```

**Registruj u config:**
```javascript
const StyleDictionary = require('style-dictionary');
const nameShortener = require('./transforms/name-shortener');

StyleDictionary.registerTransform(nameShortener);

module.exports = {
  // ... config
};
```

---

### FAZA 3: Dodaj Dark Theme Support (30 min)

#### 3.1 Extend JSON sa Dark Tokenima

**tokens/responsive-tabs.json:**
```json
{
  "dyn": {
    "responsiveTabs": {
      "light": {
        "color": {
          "background": {
            "inactive": { "value": "#E0D78C" }
          }
        }
      },
      "dark": {
        "color": {
          "background": {
            "inactive": { "value": "#2E2E24" }
          }
        }
      }
    }
  }
}
```

#### 3.2 Custom Format za Dark Theme

**formats/css-with-dark.js:**
```javascript
module.exports = {
  name: 'css/variables-with-dark',
  formatter: ({ dictionary, file, options }) => {
    const lightTokens = dictionary.allTokens.filter(t => t.path.includes('light'));
    const darkTokens = dictionary.allTokens.filter(t => t.path.includes('dark'));
    
    return `
:root {
${lightTokens.map(t => `  ${t.name}: ${t.value};`).join('\n')}
}

@media (prefers-color-scheme: dark) {
  :root {
${darkTokens.map(t => `    ${t.name}: ${t.value};`).join('\n')}
  }
}
`;
  }
};
```

---

### FAZA 4: Automated Workflow (1 sat)

#### 4.1 Pre-commit Hook

**husky + lint-staged:**
```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "tokens/**/*.json": [
      "npm run tokens:build",
      "git add styles/"
    ]
  }
}
```

#### 4.2 CI/CD Integration

**GitHub Actions:**
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
          file_pattern: 'packages/design-tokens/styles/'
```

---

### FAZA 5: Migration Strategy (2 sata)

#### 5.1 Migrate Existing Manual CSS

**Korak po korak:**

1. **Zadrži oba pristupa privremeno:**
   ```css
   /* styles/components/responsive-tabs.css */
   @import './responsive-tabs-generated.css'; /* Auto-generated */
   
   /* Fallback za legacy */
   :root {
     --dyn-responsive-tabs-bg-inactive: var(--dyn-responsive-tabs-bg-inactive, #E0D78C);
   }
   ```

2. **Test Coverage:**
   - Vizuelni test u Storybook
   - Unit testovi za token values
   - Screenshot diffing (Percy, Chromatic)

3. **Ukloni Manual CSS:**
   - Kada su svi testovi green
   - Obriši ručne CSS fajlove
   - Koristi samo generated

---

## 📦 IMPLEMENTACIJA - STEP BY STEP

### STEP 1: Verifikuj da Style Dictionary radi

```bash
cd packages/design-tokens
npm run build  # Ili npm run tokens:build ako postoji

# Expected output:
# ✓ style-dictionary build
# ✓ build/css/tokens.css
```

**Proveri:**
```bash
cat build/css/tokens.css
# Treba da vidis generated CSS
```

---

### STEP 2: Ažuriraj Config za Component Separation

**Kreiraj:** `packages/design-tokens/style-dictionary.config.v2.js`

```javascript
const StyleDictionary = require('style-dictionary');

// Custom transform za kraća imena
StyleDictionary.registerTransform({
  name: 'name/dyn/short',
  type: 'name',
  transformer: (token) => {
    const path = token.path.slice(1); // skip 'dyn'
    let name = path.join('-');
    
    // Shortcuts
    name = name.replace('color-background', 'bg');
    name = name.replace('color-text', 'text');
    name = name.replace('typography-fontSize', 'font-size');
    name = name.replace('typography-fontWeight', 'font-weight');
    name = name.replace('typography-fontFamily', 'font-family');
    
    return `--dyn-${name}`;
  }
});

// Custom format za dark theme
StyleDictionary.registerFormat({
  name: 'css/variables-with-dark',
  formatter: ({ dictionary }) => {
    const tokens = dictionary.allTokens;
    
    // Separate light and dark
    const lightTokens = tokens.filter(t => !t.path.includes('dark'));
    const darkTokens = tokens.filter(t => t.path.includes('dark'));
    
    let output = ':root {\n';
    lightTokens.forEach(token => {
      output += `  ${token.name}: ${token.value};\n`;
    });
    output += '}\n\n';
    
    if (darkTokens.length > 0) {
      output += '@media (prefers-color-scheme: dark) {\n';
      output += '  :root {\n';
      darkTokens.forEach(token => {
        const lightName = token.name.replace('-dark-', '-');
        output += `    ${lightName}: ${token.value};\n`;
      });
      output += '  }\n';
      output += '}\n';
    }
    
    return output;
  }
});

module.exports = {
  source: ['tokens/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      transforms: ['attribute/cti', 'name/dyn/short', 'time/seconds', 'content/icon', 'size/rem', 'color/css'],
      buildPath: 'styles/generated/',
      files: [
        {
          destination: 'responsive-tabs.css',
          format: 'css/variables-with-dark',
          filter: (token) => {
            return token.filePath.includes('responsive-tabs.json');
          }
        },
        {
          destination: 'table.css',
          format: 'css/variables-with-dark',
          filter: (token) => {
            return token.filePath.includes('table.json');
          }
        },
        {
          destination: 'foundations.css',
          format: 'css/variables',
          filter: (token) => {
            return !token.filePath.includes('responsive-tabs.json') && 
                   !token.filePath.includes('table.json');
          }
        }
      ]
    }
  }
};
```

---

### STEP 3: Ažuriraj package.json

```json
{
  "scripts": {
    "build": "npm run tokens:build && rollup -c rollup.config.mjs",
    "tokens:build": "style-dictionary build -c style-dictionary.config.v2.js",
    "tokens:watch": "nodemon --watch tokens --exec 'npm run tokens:build'",
    "tokens:clean": "rm -rf styles/generated"
  },
  "devDependencies": {
    "style-dictionary": "^3.9.0",
    "nodemon": "^3.0.0"
  }
}
```

---

### STEP 4: Run Build & Verify

```bash
cd packages/design-tokens
npm run tokens:clean
npm run tokens:build

# Expected output:
# styles/generated/
#   ├── responsive-tabs.css
#   ├── table.css
#   └── foundations.css
```

**Proveri:**
```bash
cat styles/generated/responsive-tabs.css

# Expected:
# :root {
#   --dyn-responsive-tabs-bg-inactive: #E0D78C;
#   --dyn-responsive-tabs-bg-active: #FFFEF7;
#   ...
# }
# 
# @media (prefers-color-scheme: dark) {
#   :root {
#     --dyn-responsive-tabs-bg-inactive: #2E2E24;
#     ...
#   }
# }
```

---

### STEP 5: Update Index Import

**styles/components/index.css:**
```css
/* Import generated tokens */
@import '../generated/responsive-tabs.css';
@import '../generated/table.css';

/* Existing manual patterns */
@import './button-like.css';
@import './input-like.css';
@import './layout.css';
/* ... */
```

---

### STEP 6: Remove Manual responsive-tabs.css

```bash
# Backup first
cp styles/components/responsive-tabs.css styles/components/responsive-tabs.css.backup

# Delete manual file
rm styles/components/responsive-tabs.css
```

**Update imports u `styles/components/index.css`:**
```css
/* OLD */
/* @import './responsive-tabs.css'; */

/* NEW - already imported via generated */
/* Token files are imported via styles/index.css */
```

---

### STEP 7: Test u Storybook

```bash
cd ../../dyn-ui-react
npm run storybook
```

**Proveri:**
- [ ] Responsive tabs ima boje sa slike
- [ ] Dark mode radi
- [ ] Hover states rade
- [ ] Responsive layout radi

---

## 🎯 FINALNI WORKFLOW

```
1. Designer kreira novi token u Figma
   ↓
2. Izvozi JSON (ili ručno kreira responsive-tabs.json)
   ↓
3. Commit u git: tokens/responsive-tabs.json
   ↓
4. Pre-commit hook: npm run tokens:build
   ↓
5. Style Dictionary generiše CSS:
      styles/generated/responsive-tabs.css
   ↓
6. CSS se automatski commit-uje
   ↓
7. CI/CD build i deploy
   ↓
8. Komponenta koristi generated CSS ✅
```

---

## 📊 SUCCESS METRICS

### Pre Migracije (Current)
- ❌ Ručno pisanje CSS
- ❌ Dupliranje vrednosti
- ❌ Nema single source of truth
- ❌ Zastareli generated fajlovi

### Posle Migracije (Target)
- ✅ JSON kao single source of truth
- ✅ Auto-generisan CSS
- ✅ Dark theme automatski
- ✅ Pre-commit hooks
- ✅ CI/CD automation
- ✅ TypeScript types generated

---

## 🚀 NEXT STEPS

1. **IMMEDIATELY**: Pokreni `npm run tokens:build` da regenerišeš tokene
2. **TODAY**: Implementiraj STEP 1-7 (2 sata)
3. **THIS WEEK**: Dodaj pre-commit hooks
4. **NEXT SPRINT**: Migriraj sve ostale komponente

---

## 📁 FINAL FILE STRUCTURE

```
packages/design-tokens/
├── tokens/                      # SOURCE OF TRUTH
│   ├── color/
│   ├── animation/
│   ├── responsive-tabs.json     ✅ JSON source
│   └── table.json
├── styles/
│   ├── generated/               # AUTO-GENERATED (don't edit!)
│   │   ├── responsive-tabs.css  ← From JSON
│   │   ├── table.css            ← From JSON
│   │   └── foundations.css      ← From JSON
│   ├── components/              # MANUAL PATTERNS (not tokens)
│   │   ├── button-like.css      ← Semantic patterns
│   │   ├── input-like.css
│   │   └── index.css            ← Imports all
│   └── index.css                ← Main entry
├── scripts/
│   ├── generate-ts-types.mjs
│   └── validate-tokens.js
├── style-dictionary.config.v2.js  # NEW CONFIG
└── package.json
```

---

**Status:** 📋 **Plan Ready for Implementation**  
**Next:** Execute STEP 1-7
