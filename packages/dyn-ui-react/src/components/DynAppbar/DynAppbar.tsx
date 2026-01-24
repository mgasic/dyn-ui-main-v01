import React, { forwardRef } from 'react';
import { cn } from '../../utils/classNames';
import { DynAppbarProps } from './DynAppbar.types';
import styles from './DynAppbar.module.css';

// Explicit position mapping for type safety
const POSITION_MAP: Record<'sticky' | 'fixed', string> = {
    sticky: styles.sticky,
    fixed: styles.fixed,
};

export const DynAppbar = forwardRef<HTMLDivElement, DynAppbarProps>(
    (
        {
            leftContent,
            rightContent,
            title,
            centerContent,
            position = 'static',
            className,
            children,
            ...rest
        },
        ref
    ) => {
        const rootClasses = cn(
            styles.container,
            position !== 'static' && POSITION_MAP[position as 'sticky' | 'fixed'],
            className
        );

        return (
            <header ref={ref} className={rootClasses} {...rest}>
                {(leftContent || title) && (
                    <div className={styles.left}>
                        {leftContent}
                        {title && (
                            <div className={styles.title}>
                                {typeof title === 'string' ? <h3>{title}</h3> : title}
                            </div>
                        )}
                    </div>
                )}

                {centerContent && <div className={styles.center}>{centerContent}</div>}

                {children && <div className={styles.center}>{children}</div>}

                {rightContent && <div className={styles.right}>{rightContent}</div>}
            </header>
        );
    }
);

DynAppbar.displayName = 'DynAppbar';

export default DynAppbar;
