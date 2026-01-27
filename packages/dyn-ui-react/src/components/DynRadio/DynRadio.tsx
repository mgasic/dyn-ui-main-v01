import React, { forwardRef, useId, createContext, useContext, useState, useEffect } from 'react';
import classNames from 'classnames';
import { DynRadioProps, DynRadioGroupProps } from './DynRadio.types';
import styles from './DynRadio.module.css';

// Context for Radio Group communication
interface RadioGroupContextType {
    name: string;
    value?: string;
    onChange: (value: string) => void;
    error?: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextType | null>(null);

export const DynRadioGroup: React.FC<DynRadioGroupProps> = ({
    name: nameProp,
    value: controlledValue,
    defaultValue,
    onChange,
    label,
    description,
    error,
    direction = 'vertical',
    children,
    className,
}) => {
    const [internalValue, setInternalValue] = useState<string | undefined>(defaultValue);
    const value = controlledValue !== undefined ? controlledValue : internalValue;
    const uniqueName = useId();
    const name = nameProp || uniqueName;

    const handleChange = (newValue: string) => {
        if (controlledValue === undefined) {
            setInternalValue(newValue);
        }
        onChange?.(newValue);
    };

    return (
        <RadioGroupContext.Provider value={{ name, value, onChange: handleChange, error }}>
            <div className={classNames(styles.groupContainer, className)} role="radiogroup" aria-labelledby={label ? `${name}-label` : undefined}>
                {label && (
                    <span id={`${name}-label`} className={styles.groupLabel}>
                        {label}
                    </span>
                )}
                {description && <div className={styles.groupDescription}>{description}</div>}
                <div className={classNames(styles.group, { [styles.horizontal]: direction === 'horizontal' })}>
                    {children}
                </div>
            </div>
        </RadioGroupContext.Provider>
    );
};

export const DynRadio = forwardRef<HTMLInputElement, DynRadioProps>(
    (
        {
            label,
            description,
            error: errorProp,
            className,
            value,
            checked: checkedProp,
            onChange,
            disabled,
            ...props
        },
        ref
    ) => {
        const id = useId();
        const groupContext = useContext(RadioGroupContext);

        // Determine state based on Group Context or local props
        const isChecked = groupContext
            ? groupContext.value === value
            : checkedProp;

        const name = groupContext ? groupContext.name : props.name;
        const isError = groupContext ? groupContext.error : errorProp;

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (disabled) return;

            const newChecked = e.target.checked;

            if (groupContext) {
                if (newChecked) {
                    groupContext.onChange(value);
                }
            } else {
                onChange?.(newChecked, value);
            }
        };

        return (
            <div className={classNames(styles.container, className)}>
                <label
                    htmlFor={id}
                    className={classNames(styles.wrapper, {
                        [styles.wrapperDisabled]: disabled,
                        [styles.error]: isError,
                    })}
                >
                    <input
                        {...props}
                        ref={ref}
                        id={id}
                        type="radio"
                        name={name}
                        value={value}
                        checked={isChecked}
                        onChange={handleChange}
                        disabled={disabled}
                        className={styles.input}
                    />
                    <div className={styles.check}>
                        <div className={styles.dot} />
                    </div>
                    {label && <span className={styles.label}>{label}</span>}
                </label>
                {description && <div className={styles.description}>{description}</div>}
            </div>
        );
    }
);

DynRadio.displayName = 'DynRadio';
