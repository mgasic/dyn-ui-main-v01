# DynIcon - Component Audit

**Status**: ✅ **GOOD (85%)**  
**Priority**: TIER 2 (Important)  
**Category**: Display Components

---

## 1. Current State Analysis

### File Structure ✅
| File | Size | Status |
|------|------|--------|
| DynIcon.tsx | 6.4 KB | ✅ Complete |
| DynIcon.types.ts | 1.2 KB | ✅ Good |
| DynIcon.module.css | 3.7 KB | ✅ Good |
| DynIcon.test.tsx | 4.7 KB | ✅ Good |
| DynIcon.stories.tsx | 1.5 KB | ⚠️ Minimal |
| icons.ts | 5.1 KB | ✅ Asset library |
| index.ts | 89 B | ✅ Present |

### Props API ✅ (8 props)
- `icon` - String name or ReactNode
- `size` - small/medium/large or number/string
- `tone` - Semantic color tone
- `color` - Custom color override
- `spin` - Animation
- `disabled` - Interaction state
- `children` - Fallback content
- `data-testid`

### Architecture
- Uses `icons.ts` as a registry of SVG paths
- Supports both predefined icons and custom React nodes

---

## 2. Gap Analysis vs DynAvatar Template

| Criteria | DynAvatar | DynIcon | Gap |
|----------|-----------|---------|-----|
| forwardRef | ✅ | ⚠️ Check | 10% |
| extends BaseComponentProps | ✅ | ❌ | 15% |
| extends AccessibilityProps | ✅ | ❌ | 15% |
| DynIconRef export | ✅ | ❌ | 10% |
| Default props object | ✅ | ✅ | 0% |
| displayName | ✅ | ⚠️ Check | 5% |
| Storybook | 15 stories | 2 stories | 20% |
| Dark mode | ✅ | N/A (inherits) | 0% |

**Overall Gap: ~20%**

---

## 3. Required Changes

### 🔴 MUST FIX

#### 1. Extend BaseComponentProps & AccessibilityProps

In `DynIcon.types.ts`:
```typescript
import { BaseComponentProps, AccessibilityProps } from '../../types';

export interface DynIconProps extends 
  BaseComponentProps, 
  AccessibilityProps,
  Omit<HTMLAttributes<HTMLSpanElement>, 'color' | keyof BaseComponentProps> {
  // ...
}
```

#### 2. Add DynIconRef type

```typescript
export type DynIconRef = HTMLSpanElement;
```

#### 3. Add displayName

```typescript
DynIcon.displayName = 'DynIcon';
```

### 🟡 SHOULD FIX

#### 4. Expand Storybook stories
- [ ] AllIcons (gallery)
- [ ] AllSizes
- [ ] AllTones
- [ ] CustomColor
- [ ] Spinning
- [ ] IconWithText (composition)

#### 5. Verify CSS tokens
Ensure generic size tokens map to Design Tokens.

### 🟢 NICE TO HAVE

#### 6. Icon Registry System
Move `icons.ts` to a centralized icon management system or use a third-party library wrapper if planned.

---

## 4. Implementation Checklist

- [x] File structure complete
- [ ] Extend BaseComponentProps ⚠️
- [ ] Extend AccessibilityProps ⚠️
- [ ] Add DynIconRef ⚠️
- [ ] Add displayName ⚠️
- [ ] Expand Storybook
- [x] CSS module exists

---

## 5. Estimated Time

**2 hours**
- Types update: 30 min
- Storybook gallery: 1 hour
- CSS verification: 30 min

---

## 6. Template Value

DynIcon serves as the foundation for:
- Button icons
- Input icons
- Status indicators
- Navigation items
