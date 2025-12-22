# 🌓 DARK THEME TOKEN STRATEGY

## Problem Statement

When generating CSS from design tokens, we need to distinguish between:

1. **Shade names** (e.g., `dark`, `darker`) - color variations within the same theme
2. **Dark theme tokens** (e.g., `darkTheme` branch) - alternative values for dark mode

### Example Conflict

**Token Structure:**
```json
{
  "color": {
    "neutral": {
      "dark": {
        "70": { "value": "#666666" },
        "90": { "value": "#333333" }
      }
    },
    "feedback": {
      "negative": {
        "dark": { "value": "#d32f2f" },
        "darker": { "value": "#b71c1c" }
      }
    }
  }
}
```

**Naive Filter (WRONG):**
```javascript
// ❌ BAD: Catches ALL tokens with 'dark' in path
const darkTokens = tokens.filter(t => t.path.includes('dark'));
```

**Result:**
- `color-neutral-dark-70` → Moved to dark mode media query ❌
- `color-feedback-negative-dark` → Moved to dark mode media query ❌
- Light mode loses these shade variables entirely! ❌

---

## Solution: Precise Dark Theme Detection

### Strategy

Only treat tokens as "dark theme" if they are under an explicit `darkTheme` branch:

```json
{
  "dyn": {
    "responsiveTabs": {
      "color": {
        "background": { "value": "#E0D78C" }  // ← Light theme
      },
      "darkTheme": {                          // ← Explicit dark branch
        "color": {
          "background": { "value": "#2E2E24" } // ← Dark theme
        }
      }
    }
  }
}
```

### Implementation

```javascript
function isDarkThemeToken(token) {
  // ONLY tokens under 'darkTheme' branch are dark theme
  return token.path.includes('darkTheme');
}

const lightTokens = tokens.filter(t => !isDarkThemeToken(t));
const darkTokens = tokens.filter(t => isDarkThemeToken(t));
```

---

## Token Path Examples

### ✅ Light Theme Tokens (Always in `:root`)

| Token Path | CSS Variable | Theme |
|------------|--------------|-------|
| `['color', 'neutral', 'dark', '70']` | `--color-neutral-dark-70` | Light |
| `['color', 'feedback', 'negative', 'dark']` | `--color-feedback-negative-dark` | Light |
| `['color', 'base', 'white']` | `--color-base-white` | Light |
| `['dyn', 'button', 'bg']` | `--dyn-button-bg` | Light |

### 🌙 Dark Theme Tokens (In Media Query)

| Token Path | CSS Variable | Theme |
|------------|--------------|-------|
| `['dyn', 'responsiveTabs', 'darkTheme', 'bg', 'inactive']` | `--dyn-responsive-tabs-bg-inactive` | Dark |
| `['dyn', 'button', 'darkTheme', 'bg']` | `--dyn-button-bg` | Dark |

---

## Generated CSS Output

### Foundations (No Dark Theme)

**Input:** `tokens/color/neutral.json`
```json
{
  "color": {
    "neutral": {
      "dark": {
        "70": { "value": "#666666" }
      }
    }
  }
}
```

**Output:** `styles/generated/foundations.css`
```css
:root {
  --color-neutral-dark-70: #666666;
}

/* No media query - shade name 'dark' is NOT dark theme */
```

---

### Component Tokens (With Dark Theme)

**Input:** `tokens/responsive-tabs.json`
```json
{
  "dyn": {
    "responsiveTabs": {
      "color": {
        "background": {
          "inactive": { "value": "#E0D78C" }
        }
      },
      "darkTheme": {
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

**Output:** `styles/generated/responsive-tabs.css`
```css
:root {
  /* Light theme - default */
  --dyn-responsive-tabs-bg-inactive: #E0D78C;
}

@media (prefers-color-scheme: dark) {
  :root {
    /* Dark theme - overrides light values */
    --dyn-responsive-tabs-bg-inactive: #2E2E24;
  }
}
```

---

## Naming Convention

### Shade Names (Part of Token Path)

```json
{
  "color": {
    "neutral": {
      "light": { ... },     // Shade: light
      "mid": { ... },       // Shade: mid
      "dark": { ... }       // Shade: dark (NOT dark theme!)
    },
    "feedback": {
      "negative": {
        "default": { ... },   // Shade: default
        "dark": { ... },      // Shade: dark (NOT dark theme!)
        "darker": { ... }     // Shade: darker (NOT dark theme!)
      }
    }
  }
}
```

### Dark Theme Branch (Explicit)

```json
{
  "dyn": {
    "component": {
      "property": { "value": "light-value" },
      "darkTheme": {                          // ← Explicit keyword
        "property": { "value": "dark-value" }
      }
    }
  }
}
```

---

## Migration Guide

### Adding Dark Theme to Existing Component

**Before (Light Only):**
```json
{
  "dyn": {
    "button": {
      "bg": { "value": "#0066cc" },
      "text": { "value": "#ffffff" }
    }
  }
}
```

**After (Light + Dark):**
```json
{
  "dyn": {
    "button": {
      "bg": { "value": "#0066cc" },
      "text": { "value": "#ffffff" },
      "darkTheme": {
        "bg": { "value": "#3399ff" },
        "text": { "value": "#000000" }
      }
    }
  }
}
```

**Generated CSS:**
```css
:root {
  --dyn-button-bg: #0066cc;
  --dyn-button-text: #ffffff;
}

@media (prefers-color-scheme: dark) {
  :root {
    --dyn-button-bg: #3399ff;
    --dyn-button-text: #000000;
  }
}
```

---

## Testing

### Verify Light Theme Includes Shades

```bash
cat styles/generated/foundations.css | grep "neutral-dark"
```

**Expected:**
```css
--color-neutral-dark-70: #666666;
--color-neutral-dark-90: #333333;
```

**NOT:**
```css
/* Empty - shades missing! ❌ */
```

### Verify Dark Theme Media Query

```bash
cat styles/generated/responsive-tabs.css | grep -A 10 "prefers-color-scheme"
```

**Expected:**
```css
@media (prefers-color-scheme: dark) {
  :root {
    --dyn-responsive-tabs-bg-inactive: #2E2E24;
    /* ... */
  }
}
```

---

## FAQ

### Q: Can I use `dark` as a shade name?
**A:** Yes! Shade names like `dark`, `darker`, `light`, `lighter` are fine. They won't be treated as dark theme tokens.

### Q: What if I have nested `darkTheme` branches?
**A:** The filter checks `token.path.includes('darkTheme')`, so any token with `darkTheme` in its path will be treated as dark theme.

### Q: Can I have different shade names in dark theme?
**A:** Yes, but structure them under `darkTheme` branch:
```json
{
  "color": {
    "primary": { "value": "#0066cc" },
    "darkTheme": {
      "color": {
        "primary": { "value": "#3399ff" }
      }
    }
  }
}
```

### Q: What about `light` shade names?
**A:** Same logic - `light` as a shade name is fine. Only `darkTheme` branch is special.

---

## Benefits

✅ **Shade names work correctly** - `dark`, `darker`, `light` are preserved  
✅ **Dark theme is opt-in** - Only components with `darkTheme` branch get media queries  
✅ **Consistent naming** - No need to avoid "dark" in shade names  
✅ **Clear intent** - `darkTheme` keyword makes it explicit  
✅ **Backward compatible** - Existing foundation tokens unchanged  

---

**Status:** ✅ Implemented in `style-dictionary.config.v2.js`  
**Commit:** [8d11b47](https://github.com/mgasic/dyn-ui-main-v01/commit/8d11b47164bea6c706e4fb8456073afecb354574)
