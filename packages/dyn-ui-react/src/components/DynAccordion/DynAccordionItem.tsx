import React from 'react';
import classNames from 'classnames';
import { DynAccordionItemProps } from './DynAccordion.types';
import styles from './DynAccordion.module.css';

export const DynAccordionItem: React.FC<DynAccordionItemProps> = ({
    id,
    title,
    content,
    disabled,
    isExpanded,
    onToggle,
}) => {
    return (
        <div className={classNames(styles.item, { [styles.expanded]: isExpanded })}>
            <button
                type="button"
                className={classNames(styles.header, { [styles.disabled]: disabled })}
                onClick={onToggle}
                aria-expanded={isExpanded}
                aria-controls={`content-${id}`}
                id={`header-${id}`}
                disabled={disabled}
            >
                <span className={styles.title}>{title}</span>
                <span className={styles.icon} aria-hidden="true">
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M5 7.5L10 12.5L15 7.5"
                            stroke="currentColor"
                            strokeWidth="1.67"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </span>
            </button>
            <div
                className={styles.contentWrapper}
                id={`content-${id}`}
                role="region"
                aria-labelledby={`header-${id}`}
            >
                <div className={styles.content}>
                    <div className={styles.contentInner}>
                        {content}
                    </div>
                </div>
            </div>
        </div>
    );
};
