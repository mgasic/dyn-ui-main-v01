import { InputHTMLAttributes, ReactNode } from 'react';

export interface DynRadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    /**
     * Label to display next to the radio button.
     */
    label?: ReactNode;

    /**
     * Helper text or error message below the radio.
     */
    description?: ReactNode;

    /**
     * Whether the radio is in an error state.
     */
    error?: boolean;

    /**
     * Callback when the checked state changes.
     */
    onChange?: (checked: boolean, value: string) => void;

    /**
     * Value of the radio button.
     */
    value: string;
}

export interface DynRadioGroupProps {
    /**
     * The name attribute for all radio buttons in the group.
     * If not provided, a unique name will be generated.
     */
    name?: string;

    /**
     * The value of the currently selected radio button.
     */
    value?: string;

    /**
     * Default selected value (uncontrolled).
     */
    defaultValue?: string;

    /**
     * Callback when the selected value changes.
     */
    onChange?: (value: string) => void;

    /**
     * Label for the group (rendered as a legend or label).
     */
    label?: ReactNode;

    /**
     * Helper text or error message for the group.
     */
    description?: ReactNode;

    /**
     * Whether the group is in an error state.
     */
    error?: boolean;

    /**
     * Direction of the radio buttons.
     * @default 'vertical'
     */
    direction?: 'vertical' | 'horizontal';

    /**
     * Children should be DynRadio components.
     */
    children: ReactNode;

    /**
     * Additional class name.
     */
    className?: string;
}
