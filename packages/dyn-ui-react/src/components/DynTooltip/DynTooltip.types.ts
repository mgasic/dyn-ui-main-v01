import { ReactElement, ReactNode } from 'react';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface DynTooltipProps {
    /**
     * The content to display inside the tooltip
     */
    content: string | ReactNode;

    /**
     * Preferred position of the tooltip
     * @default 'top'
     */
    position?: TooltipPosition;

    /**
     * Delay in milliseconds before showing the tooltip
     * @default 200
     */
    delay?: number;

    /**
     * The element that triggers the tooltip
     */
    children: ReactElement;

    /**
     * Optional class name for the tooltip container
     */
    className?: string;
}
