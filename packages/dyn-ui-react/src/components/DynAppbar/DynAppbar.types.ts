import { BaseComponentProps, AccessibilityProps } from '../../types';
import { ReactNode } from 'react';

export interface DynAppbarProps extends BaseComponentProps, AccessibilityProps {
    /**
     * Content to be placed on the left side (e.g., logo, menu button)
     */
    leftContent?: ReactNode;

    /**
     * Content to be placed on the rights side (e.g., profile, actions)
     */
    rightContent?: ReactNode;

    /**
     * Title text or element to be displayed in the center or left depending on layout
     */
    title?: ReactNode;

    /**
     * Center content
     */
    centerContent?: ReactNode;

    /**
     * Whether the appbar is sticky or fixed
     */
    position?: 'static' | 'sticky' | 'fixed';
}
