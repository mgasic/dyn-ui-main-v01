# DynModal - Component Audit

**Status**: 🔴 **STUB (10%)**  
**Priority**: TIER 2 (Important)  
**Category**: Overlay Components

---

## 1. Current State Analysis

### File Structure 🔴 CRITICAL
| File | Size | Status |
|------|------|--------|
| DynModal.module.css | 12.6 KB | ✅ CSS exists |
| DynModal.tsx | ❌ | 🔴 **MISSING** |
| DynModal.types.ts | ❌ | 🔴 **MISSING** |
| DynModal.test.tsx | ❌ | 🔴 **MISSING** |
| DynModal.stories.tsx | ❌ | 🔴 **MISSING** |
| index.ts | ❌ | 🔴 **MISSING** |

### CSS Analysis
The CSS file exists (12.6KB) which suggests:
- Styling has been defined
- Component was planned but not implemented
- May have been deleted or never completed

---

## 2. Full Implementation Required

This component needs to be **created from scratch** following the DynAvatar template.

---

## 3. Required Implementation

### 🔴 CREATE ALL FILES

#### 1. Create DynModal.types.ts

```typescript
import type { ReactNode } from 'react';
import type { BaseComponentProps, AccessibilityProps } from '../../types';

export type DynModalSize = 'small' | 'medium' | 'large' | 'fullscreen';

export interface DynModalProps extends BaseComponentProps, AccessibilityProps {
  /** Whether the modal is open */
  open: boolean;
  
  /** Close handler */
  onClose: () => void;
  
  /** Modal title */
  title?: ReactNode;
  
  /** Modal content */
  children: ReactNode;
  
  /** Footer content */
  footer?: ReactNode;
  
  /** Modal size */
  size?: DynModalSize;
  
  /** Close on overlay click */
  closeOnOverlayClick?: boolean;
  
  /** Close on Escape key */
  closeOnEscape?: boolean;
  
  /** Show close button */
  showCloseButton?: boolean;
  
  /** Center modal vertically */
  centered?: boolean;
  
  /** Prevent body scroll when open */
  lockScroll?: boolean;
  
  /** Animation on open/close */
  animated?: boolean;
  
  /** Portal container */
  portalTarget?: HTMLElement | null;
  
  /** Custom overlay className */
  overlayClassName?: string;
  
  /** Focus trap */
  trapFocus?: boolean;
  
  /** Return focus on close */
  returnFocus?: boolean;
  
  /** Initial focus element */
  initialFocus?: React.RefObject<HTMLElement>;
  
  /** Role */
  role?: 'dialog' | 'alertdialog';
}

export interface DynModalRef {
  close: () => void;
  getElement: () => HTMLDivElement | null;
}

export const DYN_MODAL_DEFAULT_PROPS = {
  size: 'medium',
  closeOnOverlayClick: true,
  closeOnEscape: true,
  showCloseButton: true,
  centered: true,
  lockScroll: true,
  animated: true,
  trapFocus: true,
  returnFocus: true,
  role: 'dialog',
} as const;
```

#### 2. Create DynModal.tsx

Implement with:
- forwardRef
- Portal rendering
- Focus trap
- Scroll lock
- Keyboard handling (Escape)
- ARIA attributes
- Animation support

#### 3. Create DynModal.test.tsx

Test cases:
- Opens and closes correctly
- Focus trap works
- Escape key closes
- Overlay click closes (when enabled)
- ARIA attributes correct
- Body scroll locked
- Return focus on close

#### 4. Create DynModal.stories.tsx

Stories:
- Default
- AllSizes
- WithFooter
- Centered
- Fullscreen
- NestedModals
- ConfirmDialog
- FormModal

#### 5. Create index.ts

```typescript
export { DynModal } from './DynModal';
export type { DynModalProps, DynModalRef, DynModalSize } from './DynModal.types';
```

---

## 4. Implementation Checklist

- [ ] Create DynModal.types.ts
- [ ] Create DynModal.tsx with:
  - [ ] forwardRef
  - [ ] Portal rendering
  - [ ] Focus trap
  - [ ] Scroll lock
  - [ ] Escape key handling
  - [ ] Overlay click handling
  - [ ] ARIA attributes
  - [ ] Animation
- [ ] Create DynModal.test.tsx
- [ ] Create DynModal.stories.tsx
- [ ] Create index.ts
- [ ] Verify existing CSS works
- [ ] Add dark mode CSS if needed
- [ ] Add high contrast CSS

---

## 5. Estimated Time

**8-10 hours**
- Types: 30 min
- Component implementation: 4-5 hours
- Tests: 2 hours
- Storybook: 1.5 hours
- CSS adjustments: 1 hour

---

## 6. Priority

**HIGH** - Modal is a fundamental UI component needed for:
- Confirmations
- Forms
- Alerts
- Content overlays

Should be implemented early in Phase 2.

---

## 7. CSS Analysis

The existing CSS (12.6KB) should be reviewed to understand:
- Token naming conventions used
- Animation definitions
- Size variants
- Z-index management

This can guide the implementation.

---

## 8. Related Components

After DynModal, consider:
- **DynConfirmDialog** - Confirmation modal preset
- **DynDrawer** - Slide-in panel (if needed)
- **DynAlertDialog** - Alert with role="alertdialog"
