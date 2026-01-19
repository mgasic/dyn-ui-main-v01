import type { InputHTMLAttributes } from 'react';
import type { BaseComponentProps, AccessibilityProps } from '../../types';

export type DynDatePickerSize = 'small' | 'medium' | 'large';

export interface DynDatePickerProps extends BaseComponentProps, AccessibilityProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'value' | 'onChange' | 'onBlur' | 'onFocus' | keyof BaseComponentProps | keyof AccessibilityProps> {
    /** Input name */
    name?: string;

    /** Current date value (YYYY-MM-DD) */
    value?: string;

    /** Default date value */
    defaultValue?: string;

    /** Callback on date change */
    onChange?: (value: string) => void;

    /** Blur callback */
    onBlur?: () => void;

    /** Focus callback */
    onFocus?: () => void;

    /** Whether the field is optional (shows "Optional" label) */
    optional?: boolean;

    /** Validation rules */
    validation?: any[];

    /** Label for the field */
    label?: string;

    /** Alias for helpText */
    help?: string;

    /** Alias for errorText */
    errorMessage?: string;

    /** Helper text */
    helpText?: string;

    /** Validation error */
    errorText?: string;

    /** Required field */
    required?: boolean;

    /** Disabled field */
    disabled?: boolean;

    /** Readonly field */
    readonly?: boolean;

    /** Size variant */
    size?: DynDatePickerSize;

    /** Min date (YYYY-MM-DD) */
    min?: string;

    /** Max date (YYYY-MM-DD) */
    max?: string;

    /** Placeholder */
    placeholder?: string;

    /** Visibility */
    visible?: boolean;
}

export interface DynDatePickerRef {
    /** Focus input */
    focus: () => void;
    /** Blur input */
    blur: () => void;
    /** Clear input */
    clear: () => void;
    /** Get value */
    getValue: () => string | undefined;
}

export const DYN_DATE_PICKER_DEFAULT_PROPS = {
    size: 'medium',
    visible: true,
} as const;