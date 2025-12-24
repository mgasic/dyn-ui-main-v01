/**
 * DinComponentTemplate - Opis komponente
 * 
 * Varijante:
 * - variant: primary, secondary, tertiary
 * - size: small, medium, large
 * 
 * Stanja:
 * - default, hover, focus, active, disabled
 * 
 * @example
 * <DinComponentTemplate variant="primary" size="medium">
 *   Content
 * </DinComponentTemplate>
 */

import React from 'react';
import classNames from 'classnames';
import styles from './DinComponentTemplate.module.css';
import type { DinComponentTemplateProps } from './DinComponentTemplate.types';

/**
 * DinComponentTemplate - Reusable component
 * 
 * Svojstva:
 * - variant: Izgled komponente
 * - size: Veličina
 * - disabled: Disabled stanje
 * - className: Custom CSS klase
 * - children: Sadržaj
 */
export const DinComponentTemplate = React.forwardRef<
  HTMLDivElement,
  DinComponentTemplateProps
>(
  (
    {
      variant = 'primary',
      size = 'medium',
      disabled = false,
      className,
      children,
      ...rest
    },
    ref
  ) => {
    const variantClass = `variant${variant.charAt(0).toUpperCase() + variant.slice(1)}`;
    const sizeClass = `size${size.charAt(0).toUpperCase() + size.slice(1)}`;

    return (
      <div
        ref={ref}
        className={classNames(
          styles.componentTemplate,
          styles[variantClass],
          styles[sizeClass],
          {
            [styles.disabled]: disabled,
          },
          className
        )}
        role="region"
        aria-disabled={disabled}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

DinComponentTemplate.displayName = 'DinComponentTemplate';
