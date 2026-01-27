import React, { useState } from 'react';
import classNames from 'classnames';
import { DynAccordionProps } from './DynAccordion.types';
import { DynAccordionItem } from './DynAccordionItem';
import styles from './DynAccordion.module.css';

export const DynAccordion: React.FC<DynAccordionProps> = ({
    items,
    multiple = false,
    defaultExpanded = [],
    expanded: controlledExpanded,
    onChange,
    className,
    variant = 'default',
}) => {
    const [internalExpanded, setInternalExpanded] = useState<string[]>(defaultExpanded);

    const isControlled = controlledExpanded !== undefined;
    const expandedIds = isControlled ? controlledExpanded : internalExpanded;

    const handleToggle = (id: string) => {
        let newExpanded: string[];

        if (expandedIds.includes(id)) {
            newExpanded = expandedIds.filter((itemId) => itemId !== id);
        } else {
            newExpanded = multiple ? [...expandedIds, id] : [id];
        }

        if (!isControlled) {
            setInternalExpanded(newExpanded);
        }

        onChange?.(newExpanded);
    };

    return (
        <div
            className={classNames(
                styles.accordion,
                { [styles.accordionBordered]: variant === 'bordered' },
                className
            )}
        >
            {items.map((item) => (
                <DynAccordionItem
                    key={item.id}
                    {...item}
                    variant={variant}
                    isExpanded={expandedIds.includes(item.id)}
                    onToggle={() => handleToggle(item.id)}
                />
            ))}
        </div>
    );
};
