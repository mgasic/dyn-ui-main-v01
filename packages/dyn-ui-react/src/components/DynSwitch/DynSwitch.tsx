import React, { forwardRef, useId } from 'react';
import classNames from 'classnames';
import { DynSwitchProps } from './DynSwitch.types';
import styles from './DynSwitch.module.css';

export const DynSwitch = forwardRef<HTMLInputElement, DynSwitchProps>(
    (
        {
            size = 'md',
            color = 'primary',
            label,
            description,
            error,
            className,
            style,
            disabled,
            onChange,
            id,
            ...props
        },
        ref
    ) => {
        const uniqueId = useId();
        const switchId = id || uniqueId;
        const labelId = `${switchId}-label`;

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (disabled) return;
            onChange?.(e.target.checked);
        };

        return (
            <div
                className={classNames(
                    styles.container,
                    styles[`size${size.charAt(0).toUpperCase()}${size.slice(1)}`],
                    styles[`color${color.charAt(0).toUpperCase()}${color.slice(1)}`],
                    {
                        [styles.error]: error,
                    },
                    className
                )}
                style={style}
            >
                <label
                    htmlFor={switchId}
                    className={classNames(styles.wrapper, {
                        [styles.wrapperDisabled]: disabled,
                    })}
                >
                    <input
                        {...props}
                        id={switchId}
                        ref={ref}
                        type="checkbox"
                        className={styles.input}
                        disabled={disabled}
                        onChange={handleChange}
                        role="switch"
                        aria-checked={props.checked || props.defaultChecked || false} // React handles unchecked for uncontrolled, but for ARIA explicit is good if controlled
                        aria-labelledby={label ? labelId : undefined}
                    />
                    <span className={styles.track} aria-hidden="true">
                        <span className={styles.thumb} />
                    </span>
                    {label && (
                        <span id={labelId} className={styles.label}>
                            {label}
                        </span>
                    )}
                </label>
                {description && <div className={styles.description}>{description}</div>}
            </div>
        );
    }
);

DynSwitch.displayName = 'DynSwitch';
