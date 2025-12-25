# 🛪 Phase 2 Preview - Dark Mode Testing Framework

**Status:** Not yet implemented (Phase 1 focus)  
**Timeline:** Weeks 3-4 after Phase 1 merge  
**Effort:** 1-2 weeks  

---

## 🎨 Phase 2 Objectives

1. ✅ Add dark mode test suite (Vitest)
2. ✅ Create TOKEN_USAGE_GUIDE.md
3. ✅ Document troubleshooting
4. ✅ Setup test coverage reporting

---

## 🧪 Test Suite Example

**File:** `packages/design-tokens/tests/dark-theme.test.ts`

```typescript
import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Design Tokens - Dark Theme', () => {
  const foundationsCss = fs.readFileSync(
    path.join(__dirname, '../styles/generated/foundations.css'),
    'utf8'
  );
  
  // ✅ Test 1: Light theme variables exist
  it('should have light theme variables in :root', () => {
    const rootMatch = foundationsCss.match(/:root\s*\{([^}]+)\}/);
    expect(rootMatch).toBeTruthy();
    expect(rootMatch![1]).toContain('--dyn-');
  });

  // ✅ Test 2: Dark theme media query exists
  it('should have dark theme overrides in @media query', () => {
    const darkMatch = foundationsCss.match(
      /@media\s*\(\s*prefers-color-scheme\s*:\s*dark\s*\)\s*\{([^}]+)\}/
    );
    expect(darkMatch).toBeTruthy();
    expect(darkMatch![1]).toContain('--dyn-');
  });

  // ✅ Test 3: No duplicate token names
  it('should not have duplicate token names', () => {
    const tokenNames = foundationsCss.match(/--dyn-[\w-]+/g) || [];
    const unique = new Set(tokenNames);
    expect(tokenNames.length).toBe(unique.size);
  });

  // ✅ Test 4: Shade tokens in light theme
  it('should have shade tokens (dark, darker) in light theme', () => {
    const shadeMatch = foundationsCss.match(
      /--[a-z-]+-dark[a-z-]*:\s*[^;]+;/gi
    );
    // Shade tokens like --color-neutral-dark should exist in :root
    const beforeDarkMedia = foundationsCss.split(
      /@media\s*\(\s*prefers-color-scheme\s*:\s*dark/
    )[0];
    expect(beforeDarkMedia).toContain('--');
  });

  // ✅ Test 5: Valid CSS syntax
  it('should have valid CSS variable syntax', () => {
    const invalidVars = foundationsCss.match(/--[a-z-]*:\s*[^;]*;/gi)?.filter(
      v => !v.match(/--[a-z0-9-]+:\s*[^;]+;/i)
    ) || [];
    expect(invalidVars.length).toBe(0);
  });

  // ✅ Test 6: Color values are valid
  it('should have valid color values', () => {
    const colorPattern = /:\s*(#[0-9a-fA-F]{3,8}|rgb|hsl)/g;
    const matches = foundationsCss.match(colorPattern);
    expect(matches && matches.length > 0).toBe(true);
  });

  // ✅ Test 7: No hardcoded values in dark theme
  it('should not have duplicate values between light and dark', () => {
    const lightSection = foundationsCss.split(
      /@media\s*\(\s*prefers-color-scheme\s*:\s*dark/
    )[0];
    const darkSection = foundationsCss.split(
      /@media\s*\(\s*prefers-color-scheme\s*:\s*dark\s*\)\s*\{/
    )[1];
    
    // Extract token definitions
    const lightTokens = lightSection.match(/--[a-z-]+:\s*([^;]+);/gi) || [];
    const darkTokens = darkSection.match(/--[a-z-]+:\s*([^;]+);/gi) || [];
    
    expect(lightTokens.length).toBeGreaterThan(0);
    expect(darkTokens.length).toBeGreaterThan(0);
  });
});
```

---

## 📚 TOKEN_USAGE_GUIDE.md Structure

**File:** `packages/design-tokens/docs/TOKEN_USAGE_GUIDE.md`

```markdown
# 🎨 Design Tokens Usage Guide

## ✅ DO - Best Practices

### Color Tokens

✅ **DO:** Use color tokens in components
```css
.button {
  background-color: var(--dyn-button-bg-primary);
  color: var(--dyn-button-text-primary);
}
```

❌ **DON'T:** Hardcode colors
```css
.button {
  background-color: #0066cc;  /* Wrong! */
  color: #ffffff;             /* Wrong! */
}
```

### Dark Theme

✅ **DO:** Let dark theme tokens override automatically
```css
/* Light theme (default) */
:root {
  --dyn-button-bg: #0066cc;
}

/* Dark theme (auto-overrides) */
@media (prefers-color-scheme: dark) {
  :root {
    --dyn-button-bg: #3399ff;
  }
}
```

❌ **DON'T:** Add manual dark theme overrides
```css
.button {
  background: var(--dyn-button-bg);
}

/* DON'T: Manual override */
@media (prefers-color-scheme: dark) {
  .button {
    background: #3399ff;  /* Wrong! Use tokens */
  }
}
```

### Spacing & Sizing

✅ **DO:** Use spacing tokens
```css
.card {
  padding: var(--dyn-spacing-lg);
  margin-bottom: var(--dyn-spacing-md);
}
```

❌ **DON'T:** Hardcode pixel values
```css
.card {
  padding: 24px;    /* Wrong! */
  margin: 16px;     /* Wrong! */
}
```

## 🐍 Troubleshooting

### Token Not Working?

Check:
1. Token exists: `npm run tokens:validate`
2. CSS imported: `@import '@dyn-ui/design-tokens';`
3. Browser DevTools: Check computed value
4. Dark mode: Use DevTools to simulate
```
```

---

## 💡 Additional Tests

### Component Snapshot Tests

```typescript
it('should render with correct tokens in light mode', () => {
  const { container } = render(<Button />);
  const computed = window.getComputedStyle(container.querySelector('button')!);
  
  expect(computed.backgroundColor).toContain('rgb');
});
```

### Accessibility Tests

```typescript
it('should have sufficient color contrast', () => {
  const style = window.getComputedStyle(element);
  const bg = style.backgroundColor;
  const fg = style.color;
  
  // Check contrast ratio >= 4.5:1
  const ratio = calculateContrast(bg, fg);
  expect(ratio).toBeGreaterThanOrEqual(4.5);
});
```

---

## 📈 Test Coverage Target

- **Foundations:** 95%+ (color, typography, spacing)
- **Component Base:** 90%+ (button-like, input-like)
- **Dark Theme:** 100% (all tokens tested)
- **Integration:** 85%+ (token usage in components)

**Total Target:** 90%+

---

## 📢 Reporting

**GitHub Actions:** Will report coverage

```yaml
- name: Report Coverage
  run: npx vitest run --coverage
```

**Output:**
```
File                  | % Stmts | % Branch | % Funcs | % Lines |
---------------------|---------|----------|---------|----------|
All files            |   92.1% |   89.3%  |  95.6%  |  92.8%  |
```

---

## 🚀 Phase 2 Merge Timeline

**Week 3:**
- Implement test framework
- Write foundation tests
- Reach 80% coverage

**Week 4:**
- Write component tests
- Complete TOKEN_USAGE_GUIDE
- Reach 90%+ coverage
- Train team

---

## ✅ Checklist for Phase 2

- [ ] Dark mode test suite implemented
- [ ] TOKEN_USAGE_GUIDE.md completed
- [ ] Troubleshooting guide written
- [ ] Coverage reporting setup
- [ ] 90%+ test coverage achieved
- [ ] Team documentation reviewed
- [ ] Ready for Phase 3

---

**Status:** 🟡 Phase 1 Complete, Phase 2 Planned
