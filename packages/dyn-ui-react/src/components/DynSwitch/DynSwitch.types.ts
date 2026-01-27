import { InputHTMLAttributes, ReactNode } from 'react';

export type DynSwitchSize = 'sm' | 'md' | 'lg';
export type DynSwitchColor = 'primary' | 'success' | 'danger' | 'warning' | 'info';

export interface DynSwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
    /**
     * The size of the switch.
     * @default 'md'
     */
    size?: DynSwitchSize;

    /**
     * The color theme of the switch when active.
     * @default 'primary'
     */
    color?: DynSwitchColor;

    /**
     * Label to display next to the switch.
     */
    label?: ReactNode;

    /**
     * Callback when the checked state changes.
     */
    onChange?: (checked: boolean) => void;

    /**
     * Helper text or error message below the switch.
     */
    description?: ReactNode;

    /**
     * Whether the switch is in an error state.
     */
    error?: boolean;
}
