import { ReactNode } from 'react';

export interface AccordionItem {
    id: string;
    title: ReactNode;
    content: ReactNode;
    disabled?: boolean;
}

export interface DynAccordionProps {
    /**
     * Array of accordion items
     */
    items: AccordionItem[];

    /**
     * Whether multiple items can be expanded simultaneously
     * @default false
     */
    multiple?: boolean;

    /**
     * IDs of items that are expanded by default
     */
    defaultExpanded?: string[];

    /**
     * Controlled expanded items IDs
     */
    expanded?: string[];

    /**
     * Callback when expanded items change
     */
    onChange?: (expandedIds: string[]) => void;

    /**
     * Additional class name for container
     */
    className?: string;

    /**
     * Variant for styling
     * @default 'default'
     */
    variant?: 'default' | 'bordered';
}

export interface DynAccordionItemProps extends AccordionItem {
    isExpanded: boolean;
    onToggle: () => void;
    variant?: 'default' | 'bordered';
}
