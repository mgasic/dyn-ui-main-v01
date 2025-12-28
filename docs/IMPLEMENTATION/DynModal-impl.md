# DynModal – Implementation Guide

## Component Overview

DynModal provides an overlay dialog for displaying content that requires user interaction or focus. It supports customizable sizes (small, medium, large, fullscreen), a header with title and optional icon, body content, footer actions and an optional close button. The modal appears above a backdrop and traps focus, closing via the Escape key or backdrop click.

## Current State Analysis

**Existing files:** None. The modal component does not exist in the source code. There is no directory `packages/dyn-ui-react/src/components/DynModal/`.

**Identified gaps:**

- Implementation of the React component, type definitions, CSS module, tests, stories and index exports.
- Token definitions for overlay colour, z‑index, sizes, border radius, padding, box shadow, animations and transitions.
- Focus trapping and accessibility (ARIA roles, labelledby/description, keyboard navigation).
- Dark‑mode styling and responsive behaviour.

## Implementation Instructions

### 1. Code Structure

1. **Create a new folder** `packages/dyn-ui-react/src/components/DynModal/`.
2. Add files: `DynModal.tsx`, `DynModal.types.ts`, `DynModal.module.css`, `DynModal.stories.tsx`, `DynModal.test.tsx` and `index.ts`.

### 2. Define types

In `DynModal.types.ts` define the props interface and size enumeration:

```ts
// File: packages/dyn-ui-react/src/components/DynModal/DynModal.types.ts
export type DynModalSize = 'sm' | 'md' | 'lg' | 'full';

export interface DynModalProps {
  open: boolean;
  onClose: () => void;
  size?: DynModalSize;
  title?: string;
  hideCloseButton?: boolean;
  closeOnEsc?: boolean;
  closeOnBackdrop?: boolean;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  id?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}
```
Export `DynModalSize` and `DynModalProps`.

### 3. Implement the component

Create `DynModal.tsx` with the following structure:

```tsx
// File: packages/dyn-ui-react/src/components/DynModal/DynModal.tsx
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import type { DynModalProps } from './DynModal.types';
import styles from './DynModal.module.css';

export const DynModal: React.FC<DynModalProps> = ({
  open,
  onClose,
  size = 'md',
  title,
  hideCloseButton = false,
  closeOnEsc = true,
  closeOnBackdrop = true,
  footer,
  children,
  className,
  ...rest
}) => {
  const backdropRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Focus trap and close on ESC
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closeOnEsc) {
        onClose();
      }
      if (e.key === 'Tab' && modalRef.current) {
        // Cycle focus within modal (simple focus trap)
        const focusable = modalRef.current.querySelectorAll<HTMLElement>('a, button, input, select, textarea, [tabindex]');
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, closeOnEsc, onClose]);

  const handleBackdropClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (closeOnBackdrop && e.target === backdropRef.current) {
      onClose();
    }
  };

  if (!open) return null;
  return ReactDOM.createPortal(
    <div className={styles.backdrop} ref={backdropRef} onClick={handleBackdropClick}>
      <div
        className={`${styles.modal} ${styles[`modal--${size}`]} ${className ?? ''}`}
        role="dialog"
        aria-modal="true"
        ref={modalRef}
        {...rest}
      >
        <header className={styles.header}>
          {title && <h2 className={styles.title}>{title}</h2>}
          {!hideCloseButton && (
            <button onClick={onClose} className={styles.closeButton} aria-label="Close modal">
              ×
            </button>
          )}
        </header>
        <section className={styles.body}>{children}</section>
        {footer && <footer className={styles.footer}>{footer}</footer>}
      </div>
    </div>,
    document.body
  );
};

DynModal.displayName = 'DynModal';
export default DynModal;
```

### 4. CSS module

Define tokens in `DynModal.module.css` following the specification【183729093291080†L41-L106】:

```css
/* File: packages/dyn-ui-react/src/components/DynModal/DynModal.module.css */
.backdrop {
  --dyn-modal-backdrop-bg: var(--dyn-color-overlay, var(--legacy-color-overlay, rgba(0,0,0,0.4)));
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--dyn-modal-backdrop-bg);
  z-index: var(--dyn-z-index-modal, 1000);
}

.modal {
  --dyn-modal-bg: var(--dyn-color-neutral-0, var(--legacy-color-neutral-0, #fff));
  --dyn-modal-radius: var(--dyn-radius-lg, var(--legacy-radius-lg, 12px));
  --dyn-modal-shadow: var(--dyn-shadow-lg, var(--legacy-shadow-lg, 0 8px 32px rgba(0,0,0,0.25)));
  --dyn-modal-padding: var(--dyn-spacing-4, var(--legacy-spacing-4, 16px));
  max-width: var(--dyn-modal-width-md, 600px);
  max-height: 90vh;
  background-color: var(--dyn-modal-bg);
  border-radius: var(--dyn-modal-radius);
  box-shadow: var(--dyn-modal-shadow);
  padding: var(--dyn-modal-padding);
  overflow: auto;
  display: flex;
  flex-direction: column;
}

.modal--sm { max-width: var(--dyn-modal-width-sm, 400px); }
.modal--lg { max-width: var(--dyn-modal-width-lg, 800px); }
.modal--full { max-width: 100vw; width: 100%; height: 100%; border-radius: 0; }

.header { margin-bottom: var(--dyn-spacing-3, 12px); display: flex; justify-content: space-between; align-items: center; }
.title { font-size: var(--dyn-font-size-lg, var(--legacy-font-size-lg, 20px)); margin: 0; }
.body { flex-grow: 1; overflow-y: auto; }
.footer { margin-top: var(--dyn-spacing-3, 12px); }
.closeButton { border: none; background: transparent; font-size: 1.5rem; cursor: pointer; }

/* Dark mode overrides */
@media (prefers-color-scheme: dark) {
  .modal { --dyn-modal-bg: var(--dyn-color-neutral-900, #222); --dyn-modal-shadow: var(--dyn-shadow-lg, 0 8px 32px rgba(0,0,0,0.5)); }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .modal { transition: none; }
}
```

Add additional dark‑mode and high‑contrast adjustments as needed. Use 3‑level fallbacks for all tokens.

### 5. Stories and Tests

- **Storybook**: create `DynModal.stories.tsx` demonstrating small, medium, large and full‑screen modals, with and without headers, footers and close buttons. Include controls for `open`, `size`, `closeOnEsc` and `closeOnBackdrop`.
- **Tests** (`DynModal.test.tsx`):
  - Verify that the modal opens and closes based on the `open` prop.
  - Test the focus trap by tabbing through interactive elements and ensuring focus cycles.
  - Test that the ESC key and backdrop click call `onClose` when enabled.
  - Snapshot test the modal in different sizes.
  - Use `jest-axe` to check accessibility.

### 6. Git Workflow

- Branch: `feat/component-dynmodal`.
- Suggested commits:
  - `feat(DynModal): create modal component with focus trap and tokens`.
  - `test(DynModal): add unit tests and accessibility checks`.
  - `docs(DynModal): add Storybook stories for modal`.

### 7. Validation Checklist

- [ ] New files created and added to exports.
- [ ] Tokens defined with 3‑level fallback and dark‑mode support.
- [ ] Focus trap and accessibility implemented.
- [ ] Tests and stories cover all behaviours.
- [ ] PR passes lint, unit tests and design review.