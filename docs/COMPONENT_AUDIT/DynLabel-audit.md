# DynLabel - Component Audit

**Status**: 🔴 **CRITICAL (10%)**  
**Priority**: TIER 2 (Important)  
**Category**: Display/Form Components

---

## 1. Current State Analysis

### File Structure 🔴
| File | Size | Status |
|------|------|--------|
| DynLabel.tsx | 2.4 KB | ⚠️ Outdated |
| DynLabel.tsx.bak | 1.7 KB | ❌ Delete |
| DynLabel.types.ts | 107 B | 🔴 **CRITICAL: Minimal** |
| DynLabel.module.css | 6.4 KB | ✅ Good |
| DynLabel.module.scss | 2.0 KB | ❌ Delete SCSS |
| DynLabel.stories.tsx | 1.8 KB | ⚠️ Minimal |
| index.ts | 93 B | ✅ Present |

### Props API 🔴 (`DynLabel.types.ts`)
```typescript
export interface DynLabelProps {
  htmlFor?: string;
  required?: boolean;
  children?: React.ReactNode;
}
```
**Severely lacking standard props.**

---

## 2. Gap Analysis vs DynAvatar Template

| Criteria | DynAvatar | DynLabel | Gap |
|----------|-----------|----------|-----|
| forwardRef | ✅ | ❓ Check | ? |
| extends BaseComponentProps | ✅ | ❌ | 100% |
| extends AccessibilityProps | ✅ | ❌ | 100% |
| Default props object | ✅ | ❌ | 100% |
| 3-level token fallback | ✅ | ⚠️ Check | 50% |
| Dark mode | ✅ | ⚠️ Check | 50% |

**Overall Gap: 80%** - Needs almost full rewrite.

---

## 3. Required Changes

### 🔴 MUST FIX (Critical)

#### 1. Rewrite DynLabel.types.ts

```typescript
import type { LabelHTMLAttributes } from 'react';
import type { BaseComponentProps, AccessibilityProps } from '../../types';

export type DynLabelSize = 'small' | 'medium' | 'large';
export type DynLabelColor = 'default' | 'primary' | 'danger' | 'success' | 'warning';

export interface DynLabelProps extends 
  BaseComponentProps,
  AccessibilityProps,
  Omit<LabelHTMLAttributes<HTMLLabelElement>, keyof BaseComponentProps | keyof AccessibilityProps> {
  
  /** Associated input ID */
  htmlFor?: string;
  
  /** Size variant */
  size?: DynLabelSize;
  
  /** Color variant */
  color?: DynLabelColor;
  
  /** Required indicator */
  required?: boolean;
  
  /** Disabled state */
  disabled?: boolean;
  
  /** Block display */
  block?: boolean;
  
  /** No wrap */
  noWrap?: boolean;
}

export type DynLabelRef = HTMLLabelElement;

export const DYN_LABEL_DEFAULT_PROPS = {
  size: 'medium',
  color: 'default',
  required: false,
  disabled: false,
  block: false,
} as const;
```

#### 2. Clean up files
- Delete `DynLabel.tsx.bak`
- Delete `DynLabel.module.scss`

#### 3. Update DynLabel.tsx
- Use new types
- Implement forwardRef
- Implement standard CSS classes

### 🟡 SHOULD FIX
- Verify CSS module uses `--dyn-label-*` tokens
- Add dark mode support

---

## 4. Implementation Checklist

- [ ] Rewrite types 🔴
- [ ] Rewrite component 🔴
- [ ] Delete backup/legacy files 🔴
- [ ] Add default props
- [ ] Add forwardRef
- [ ] Add displayName
- [ ] Expand Storybook
- [ ] Add tests

---

## 5. Estimated Time

**3 hours**
- Cleanup: 10 min
- Rewrite: 2 hours
- Testing: 50 min
