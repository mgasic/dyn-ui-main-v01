import { HTMLAttributes } from 'react';

/**
 * DinComponentTemplate svojstva
 */
export interface DinComponentTemplateProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Variant ili stil komponente
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'tertiary';

  /**
   * Veličina komponente
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Disabled stanje
   * @default false
   */
  disabled?: boolean;

  /**
   * Sadržaj komponente
   */
  children?: React.ReactNode;
}
