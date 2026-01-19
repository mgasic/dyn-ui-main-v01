import React, { useEffect, useCallback, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils/classNames';
import { DynIcon } from '../DynIcon';
import type { DynModalProps } from './DynModal.types';
import { DYN_MODAL_DEFAULT_PROPS } from './DynModal.types';
import styles from './DynModal.module.css';

/**
 * DynModal Component
 * A customizable modal component with overlay, header, body, and footer sections.
 */
export const DynModal: React.FC<DynModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    footer,
    size = DYN_MODAL_DEFAULT_PROPS.size,
    fullscreen = DYN_MODAL_DEFAULT_PROPS.fullscreen,
    centered = DYN_MODAL_DEFAULT_PROPS.centered,
    closeOnBackdropClick = DYN_MODAL_DEFAULT_PROPS.closeOnBackdropClick,
    closeOnEsc = DYN_MODAL_DEFAULT_PROPS.closeOnEsc,
    showCloseButton = DYN_MODAL_DEFAULT_PROPS.showCloseButton,
    loading = DYN_MODAL_DEFAULT_PROPS.loading,
    className,
    style,
    portalContainer = typeof document !== 'undefined' ? document.body : undefined,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
    id: idProp,
    ...rest
}) => {
    const generatedId = useId();
    const modalId = idProp || generatedId;
    const titleId = `${modalId}-title`;
    const bodyId = `${modalId}-body`;
    const modalRef = useRef<HTMLDivElement>(null);

    // Handle Escape key
    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (closeOnEsc && event.key === 'Escape') {
                onClose();
            }
        },
        [closeOnEsc, onClose]
    );

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            // Logic for scroll lock could be added here
            document.body.style.overflow = 'hidden';
        } else {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [isOpen, handleKeyDown]);

    const handleBackdropClick = (event: React.MouseEvent) => {
        if (closeOnBackdropClick && event.target === event.currentTarget) {
            onClose();
        }
    };

    if (!isOpen || !portalContainer) return null;

    const modalClasses = cn(
        styles.modalContainer,
        size === 'small' && styles.modalSmall,
        size === 'medium' && styles.modalMedium,
        size === 'large' && styles.modalLarge,
        fullscreen && styles.modalFullscreen,
        loading && styles.modalLoading,
        className
    );

    return createPortal(
        <div
            className={cn(styles.modalOverlay, styles.open)}
            onClick={handleBackdropClick}
            role="presentation"
        >
            <div
                ref={modalRef}
                id={modalId}
                className={modalClasses}
                style={style}
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? titleId : ariaLabelledBy}
                aria-describedby={ariaDescribedBy || bodyId}
                aria-label={ariaLabel}
                {...rest}
            >
                {(title || showCloseButton) && (
                    <header className={styles.modalHeader}>
                        {title && (
                            <h2 id={titleId} className={styles.modalTitle}>
                                {title}
                            </h2>
                        )}
                        {showCloseButton && (
                            <button
                                type="button"
                                className={styles.modalClose}
                                onClick={onClose}
                                aria-label="Close modal"
                            >
                                <DynIcon icon="dyn-icon-close" size="medium" />
                            </button>
                        )}
                    </header>
                )}

                <main id={bodyId} className={styles.modalBody}>
                    {children}
                </main>

                {footer && (
                    <footer className={styles.modalFooter}>
                        {footer}
                    </footer>
                )}
            </div>
        </div>,
        portalContainer
    );
};

DynModal.displayName = 'DynModal';

export default DynModal;
