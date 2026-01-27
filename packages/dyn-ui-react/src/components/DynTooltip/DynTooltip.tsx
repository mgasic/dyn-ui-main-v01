import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import { DynTooltipProps } from './DynTooltip.types';
import styles from './DynTooltip.module.css';

export const DynTooltip: React.FC<DynTooltipProps> = ({
    content,
    position = 'top',
    delay = 200,
    children,
    className,
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0 });

    const timeoutRef = useRef<NodeJS.Timeout>();
    const triggerRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);

    const updatePosition = useCallback(() => {
        if (!triggerRef.current || !tooltipRef.current) return;

        const triggerRect = triggerRef.current.getBoundingClientRect();
        const tooltipRect = tooltipRef.current.getBoundingClientRect();

        let top = 0;
        let left = 0;
        const gap = 8; // distance from trigger

        switch (position) {
            case 'top':
                top = triggerRect.top - tooltipRect.height - gap;
                left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
                break;
            case 'bottom':
                top = triggerRect.bottom + gap;
                left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
                break;
            case 'left':
                top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
                left = triggerRect.left - tooltipRect.width - gap;
                break;
            case 'right':
                top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
                left = triggerRect.right + gap;
                break;
        }

        // Basic viewport collision prevention (optional enhancement)
        // For now we just stick to the calculated position

        setCoords({ top, left });
    }, [position]);

    const handleMouseEnter = () => {
        timeoutRef.current = setTimeout(() => {
            setIsVisible(true);
            // Wait for render to calculate position correctly
            requestAnimationFrame(updatePosition);
        }, delay);
    };

    const handleMouseLeave = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsVisible(false);
    };

    // Recalculate position on scroll or resize when visible
    useEffect(() => {
        if (isVisible) {
            window.addEventListener('scroll', updatePosition, true);
            window.addEventListener('resize', updatePosition);
            updatePosition();
        }

        return () => {
            window.removeEventListener('scroll', updatePosition, true);
            window.removeEventListener('resize', updatePosition);
        };
    }, [isVisible, updatePosition]);

    return (
        <>
            <div
                ref={triggerRef}
                className={styles.tooltipContainer}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onFocus={handleMouseEnter}
                onBlur={handleMouseLeave}
            >
                {children}
            </div>

            {isVisible && createPortal(
                <div
                    ref={tooltipRef}
                    className={classNames(styles.tooltip, styles.tooltipVisible, className)}
                    style={{
                        top: coords.top,
                        left: coords.left
                    }}
                    role="tooltip"
                >
                    {content}
                </div>,
                document.body
            )}
        </>
    );
};

DynTooltip.displayName = 'DynTooltip';
