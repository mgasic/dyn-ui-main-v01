import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import { cn } from '../../utils/classNames';
import type {
  DynDatePickerProps,
  DynDatePickerRef,
  DynDatePickerSize
} from './DynDatePicker.types';
import { DYN_DATE_PICKER_DEFAULT_PROPS } from './DynDatePicker.types';
import { DynFieldContainer } from '../DynFieldContainer';
import { useDynFieldValidation } from '../../hooks/useDynFieldValidation';
import { useDynDateParser } from '../../hooks/useDynDateParser';
import { DynIcon } from '../DynIcon';
import { DynDropdown } from '../DynDropdown';
import styles from './DynDatePicker.module.css';

const MAX_DATE_LENGTH = 10;

const sizeClassMap: Record<DynDatePickerSize, string | undefined> = {
  small: styles.sizeSmall,
  medium: undefined,
  large: styles.sizeLarge,
};

export const DynDatePicker = forwardRef<DynDatePickerRef, DynDatePickerProps>(
  (
    {
      id: idProp,
      name,
      label,
      help,
      helpText,
      placeholder = 'dd/mm/yyyy',
      disabled = false,
      readonly = false,
      required = false,

      optional = false,
      visible = DYN_DATE_PICKER_DEFAULT_PROPS.visible,
      value: propValue,
      errorMessage,
      errorText: errorMessageText,
      validation,
      className,
      size = DYN_DATE_PICKER_DEFAULT_PROPS.size,
      onChange,
      onBlur,
      onFocus,
      min,
      max,
      'data-testid': dataTestId = 'dyn-date-picker',
      ...rest
    },
    ref
  ) => {
    const instanceId = useId();
    const inputId = idProp ?? name ?? instanceId;
    const dropdownId = `${inputId}-dropdown`;

    const resolvedHelpText = helpText ?? help;
    const resolvedErrorText = errorMessageText ?? errorMessage;

    const triggerRef = useRef<HTMLDivElement>(null);

    const inputRef = useRef<HTMLInputElement>(null);

    const [value, setValue] = useState<Date | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [focused, setFocused] = useState(false);

    const format = 'dd/MM/yyyy'; // Standard format
    const locale = 'en-US';

    const { error, validate, clearError } = useDynFieldValidation({
      value,
      required,
      validation: [], // Can be extended
      customError: resolvedErrorText,
    });


    const {
      displayValue,
      setDisplayValue,
      formatDate,
      parseDate,
      isValidDate,
      getRelativeDescription,
    } = useDynDateParser({
      format,
      locale,
    });

    const parseExternalValue = useCallback(
      (input: string | undefined): Date | null => {
        if (!input) return null;
        const candidate = new Date(input);
        return isValidDate(candidate) ? candidate : null;
      },
      [isValidDate]
    );

    useEffect(() => {
      const nextValue = parseExternalValue(propValue);
      setValue(nextValue);
      setDisplayValue(nextValue ? formatDate(nextValue) : '');
    }, [propValue, formatDate, parseExternalValue, setDisplayValue]);

    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
      blur: () => inputRef.current?.blur(),
      validate: () => validate(),
      clear: () => {
        setValue(null);
        setDisplayValue('');
        onChange?.('');
        clearError();
      },
      getValue: () => (value ? value.toISOString().split('T')[0] : undefined),
    }), [validate, value, clearError, onChange, setDisplayValue]);

    const emitChange = useCallback(
      (nextValue: Date | null) => {
        setValue(nextValue);
        setDisplayValue(nextValue ? formatDate(nextValue) : '');
        onChange?.(nextValue ? nextValue.toISOString().split('T')[0] : '');
      },
      [formatDate, onChange, setDisplayValue]
    );

    const handleInputChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setDisplayValue(inputValue);

        const parsedDate = parseDate(inputValue);
        if (parsedDate && isValidDate(parsedDate)) {
          emitChange(parsedDate);
          clearError();
        } else if (!inputValue) {
          emitChange(null);
          clearError();
        }
      },
      [parseDate, isValidDate, emitChange, clearError, setDisplayValue]
    );

    const handleTodayClick = useCallback(() => {
      const today = new Date();
      emitChange(today);
      clearError();
      setIsOpen(false);
    }, [emitChange, clearError]);

    const handleClearClick = useCallback((e: React.MouseEvent) => {
      e.stopPropagation();
      emitChange(null);
      clearError();
      inputRef.current?.focus();
    }, [emitChange, clearError]);

    const handleBlur = useCallback(() => {
      setFocused(false);
      validate();
      onBlur?.();
    }, [validate, onBlur]);

    const handleFocus = useCallback(() => {
      setFocused(true);
      clearError();
      onFocus?.();
    }, [clearError, onFocus]);

    const handleKeyDown = useCallback(
      (event: KeyboardEvent<HTMLInputElement>) => {
        switch (event.key) {
          case 'Enter':
          case 'ArrowDown':
            if (!isOpen) {
              setIsOpen(true);
              event.preventDefault();
            }
            break;
          case 'Escape':
            if (isOpen) {
              setIsOpen(false);
              event.preventDefault();
            }
            break;
          default:
            break;
        }
      },
      [isOpen]
    );

    if (!visible) return null;

    const fieldError = resolvedErrorText ?? (error || undefined);


    const inputClasses = cn(
      styles.input,
      sizeClassMap[size],
      focused && styles.stateFocused,
      Boolean(fieldError) && styles.stateError,
      disabled && styles.stateDisabled,
      readonly && styles.stateReadonly,
      isOpen && styles.stateOpen

    );

    const relativeText = useMemo(
      () => (value ? getRelativeDescription(value) : null),
      [value, getRelativeDescription]
    );

    return (
      <DynFieldContainer
        label={label}
        helpText={resolvedHelpText}
        required={required}
        optional={optional}
        errorText={fieldError}
        className={className}
        htmlFor={inputId}
      >

        <div ref={triggerRef} className={styles.container} data-testid={dataTestId} style={rest.style}>
          <DynDropdown
            isOpen={isOpen}
            onOpenChange={setIsOpen}
            disabled={disabled}
            trigger={

              <div className={styles.inputContainer}>
                <input
                  ref={inputRef}
                  id={inputId}
                  name={name ?? inputId}
                  type="text"
                  className={inputClasses}
                  placeholder={placeholder}
                  value={displayValue}
                  disabled={disabled}
                  readOnly={readonly}
                  onChange={handleInputChange}

                  onBlur={handleBlur}
                  onFocus={handleFocus}
                  onKeyDown={handleKeyDown}
                  aria-invalid={Boolean(fieldError)}
                  aria-expanded={isOpen}
                  aria-controls={isOpen ? dropdownId : undefined}
                  maxLength={MAX_DATE_LENGTH}
                  data-size={size}
                  {...rest}
                />

                <div className={styles.inputActions}>
                  {displayValue && !readonly && !disabled && (
                    <button

                      type="button"
                      className={styles.clearButton}
                      onClick={handleClearClick}
                      tabIndex={-1}
                      aria-label="Clear date"
                    >
                      <DynIcon icon="close" size="small" />
                    </button>
                  )}
                  <div className={styles.calendarIcon}>
                    <DynIcon icon="calendar" />
                  </div>

                </div>
              </div>
            }
            placement="bottom-start"
            offset={4}
            usePortal={true}
            aria-label="Open calendar"
          >

            <div id={dropdownId} className={styles.dropdown} role="dialog">
              <div className={styles.shortcuts}>
                <button type="button" className={styles.shortcut} onClick={handleTodayClick}>
                  Today
                </button>
                <button type="button" className={styles.shortcut} onClick={(e) => handleClearClick(e)}>
                  Clear
                </button>
              </div>

              <div>
                <div className={styles.helpTitle}>Accepted formats:</div>
                <ul className={styles.helpList}>
                  <li className={styles.helpListItem}>dd/mm/yyyy (e.g., 25/12/2023)</li>
                  <li className={styles.helpListItem}>today, tomorrow, yesterday</li>
                  <li className={styles.helpListItem}>Natural language</li>
                </ul>
              </div>
            </div>
          </DynDropdown>

          {relativeText && <div className={styles.relativeText}>{relativeText}</div>}
        </div>
      </DynFieldContainer>
    );
  }
);

DynDatePicker.displayName = 'DynDatePicker';
export default DynDatePicker;
