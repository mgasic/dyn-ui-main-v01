import type { ReactNode } from 'react';
import type { BaseComponentProps } from '../../types/theme';

export interface DynLabelProps extends BaseComponentProps {
  /** Associated form element ID */
  htmlFor?: string;

  /** Disabled state */
  disabled?: boolean;

  /** Required field indicator */
  required?: boolean;

  /** Optional field indicator */
  optional?: boolean;

  /** Help text to display */
  helpText?: string;

  /** Label content */
  children?: ReactNode;
}

export const DYN_LABEL_DEFAULT_PROPS = {
  disabled: false,
  required: false,
  optional: false,
} as const;
