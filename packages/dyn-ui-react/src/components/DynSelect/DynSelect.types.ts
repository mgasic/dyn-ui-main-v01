import type { ReactNode } from 'react';
import type { BaseComponentProps, AccessibilityProps } from '../../types';

export interface DynSelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  icon?: ReactNode;
  group?: string;
  description?: string;
}

export type DynSelectSize = 'small' | 'medium' | 'large';

export interface DynSelectProps extends BaseComponentProps, AccessibilityProps {
  /** Input name */
  name?: string;

  /** Current value */
  value?: string | number | (string | number)[];

  /** Default value for uncontrolled usage */
  defaultValue?: string | number | (string | number)[];

  /** Callback on value change */
  onChange?: (value: string | number | (string | number)[]) => void;

  /** Options to display */
  options?: DynSelectOption[];

  /** Groups for categorized options */
  groups?: string[];

  /** Placeholder text */
  placeholder?: string;

  /** Label for the select field */
  label?: string;

  /** Alias for helpText for backward compatibility */
  help?: string;

  /** Alias for errorText for backward compatibility */
  errorMessage?: string;

  /** Optional/Helper text */
  helpText?: string;

  /** Validation error message */
  errorText?: string;

  /** Whether the field is required */
  required?: boolean;

  /** Whether the field is disabled */
  disabled?: boolean;

  /** Whether the field is readonly */
  readonly?: boolean;

  /** Size variant */
  size?: DynSelectSize;

  /** Support for multiple selection */
  multiple?: boolean;

  /** Searchable mode */
  searchable?: boolean;

  /** Clear button visibility */
  clearable?: boolean;

  /** Custom filter function for search */
  filterOption?: (option: DynSelectOption, searchText: string) => boolean;

  /** Add search placeholder */
  searchPlaceholder?: string;

  /** Max height of the dropdown menu */
  maxMenuHeight?: number | string;

  /** Loading state */
  loading?: boolean;

  /** Empty results message */
  noOptionsMessage?: ReactNode;

  /** Visibility */
  visible?: boolean;
}

export interface DynSelectRef {
  /** Focus the input */
  focus: () => void;
  /** Blur the input */
  blur: () => void;
  /** Clear the selection */
  clear: () => void;
  /** Open the dropdown */
  open: () => void;
  /** Close the dropdown */
  close: () => void;
  /** Get current value */
  getValue: () => string | number | (string | number)[] | undefined;
}

export const DYN_SELECT_DEFAULT_PROPS = {
  size: 'medium',
  multiple: false,
  searchable: false,
  clearable: false,
  visible: true,
  noOptionsMessage: 'No options found',
} as const;
