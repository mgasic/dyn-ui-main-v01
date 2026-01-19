import React from 'react';
import { cn } from '../../utils/classNames';
import type { DynLabelProps } from './DynLabel.types';
import { DYN_LABEL_DEFAULT_PROPS } from './DynLabel.types';
import styles from './DynLabel.module.css';

/**
 * DynLabel Component
 * Standardized label component for forms with requirement indicators and help text.
 */
export const DynLabel: React.FC<DynLabelProps> = ({
  children,
  htmlFor,
  disabled = DYN_LABEL_DEFAULT_PROPS.disabled,
  required = DYN_LABEL_DEFAULT_PROPS.required,
  optional = DYN_LABEL_DEFAULT_PROPS.optional,
  helpText,
  className,
  style,
  ...rest
}) => {
  const containerClasses = cn(
    styles['dyn-label-container']
  );

  const labelClasses = cn(
    styles['dyn-label'],
    disabled && styles['dyn-label--disabled'],
    (required || optional) && styles['dyn-label--with-requirement'],
    className
  );


  const renderRequirementIndicator = () => {
    if (required) {
      return (
        <span className={cn(styles['dyn-label-requirement'], styles['dyn-label--required'])}>
          <span className={styles['dyn-label-required-asterisk']} aria-hidden="true">*</span>
        </span>
      );
    }

    if (optional) {
      return (
        <span
          className={cn(styles['dyn-label-requirement'], styles['dyn-label--optional'])}
          data-testid="optional-indicator"
        >
          <span className={styles['dyn-label-optional-text']}>(optional)</span>
        </span>
      );
    }

    return null;
  };

  const renderHelpText = () => {
    if (!helpText) return null;

    return (
      <span className={styles['dyn-label-help-text']} id={htmlFor ? `${htmlFor}-help` : undefined}>
        {helpText}
      </span>
    );
  };

  const labelContent = (
    <span className={styles['dyn-label-text']}>
      {children}
      {renderRequirementIndicator()}
    </span>
  );

  const elementProps = {
    className: labelClasses,
    ...(htmlFor && { htmlFor }),
    ...(helpText && htmlFor && { 'aria-describedby': `${htmlFor}-help` }),
    ...rest
  };

  return (
    <div className={containerClasses} style={style} role="group">
      {htmlFor ? (
        <label {...elementProps}>
          {labelContent}
        </label>
      ) : (
        <span {...elementProps}>
          {labelContent}
        </span>
      )}
      {renderHelpText()}
    </div>
  );
};

DynLabel.displayName = 'DynLabel';

export default DynLabel;