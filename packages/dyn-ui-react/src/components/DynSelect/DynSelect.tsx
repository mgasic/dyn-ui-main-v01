import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
  useMemo,
  useId,
} from 'react';
import { cn } from '../../utils/classNames';
import type {
  DynSelectProps,
  DynSelectRef,
  DynSelectOption
} from './DynSelect.types';
import { DYN_SELECT_DEFAULT_PROPS } from './DynSelect.types';
import { DynFieldContainer } from '../DynFieldContainer';
import { useDynFieldValidation } from '../../hooks/useDynFieldValidation';
import { DynIcon } from '../DynIcon';
import { DynDropdown } from '../DynDropdown';
import type { DynDropdownRef, DynDropdownItem } from '../DynDropdown';
import styles from './DynSelect.module.css';

export const DynSelect = forwardRef<DynSelectRef, DynSelectProps>(
  (
    {
      name,
      value: propValue,
      defaultValue,
      onChange,
      options = [],
      groups = [],
      placeholder = 'Select...',
      label,
      help,
      helpText,
      errorText: errorMessageText,
      errorMessage,
      required = false,

      disabled = false,
      readOnly = false,
      size = DYN_SELECT_DEFAULT_PROPS.size,
      multiple = DYN_SELECT_DEFAULT_PROPS.multiple,
      searchable = DYN_SELECT_DEFAULT_PROPS.searchable,
      clearable = DYN_SELECT_DEFAULT_PROPS.clearable,
      filterOption,
      searchPlaceholder = 'Search...',
      maxMenuHeight,
      loading = false,
      noOptionsMessage = DYN_SELECT_DEFAULT_PROPS.noOptionsMessage,
      visible = DYN_SELECT_DEFAULT_PROPS.visible,
      id,
      className,
      style,
      ...rest
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue ?? (multiple ? [] : ''));
    const value = propValue !== undefined ? propValue : internalValue;

    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [focused, setFocused] = useState(false);

    const dropdownRef = useRef<DynDropdownRef>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const fallbackId = useId();
    const fieldId = id || name || fallbackId;

    const resolvedHelpText = helpText ?? help;
    const resolvedErrorText = errorMessageText ?? errorMessage;

    const { error, validate, clearError } = useDynFieldValidation({
      value,
      required,
      validation: [], // Can be extended if validation prop is added
      customError: resolvedErrorText,
    });


    const updateValue = (newValue: any) => {
      setInternalValue(newValue);
      onChange?.(newValue);
      clearError();
    };

    useImperativeHandle(ref, () => ({
      focus: () => setIsOpen(true),
      blur: () => setIsOpen(false),
      clear: () => updateValue(multiple ? [] : ''),
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      getValue: () => value,
    }), [value, multiple]);

    useEffect(() => {
      if (propValue !== undefined) {
        setInternalValue(propValue);
      }
    }, [propValue]);

    const filteredOptions = useMemo(() => {
      if (!searchable || !searchTerm) return options;

      const search = searchTerm.toLowerCase();
      return options.filter(option => {
        if (filterOption) return filterOption(option, searchTerm);
        return option.label.toLowerCase().includes(search);
      });
    }, [options, searchTerm, searchable, filterOption]);

    const selectedOptions = useMemo(() => {
      if (multiple && Array.isArray(value)) {
        return options.filter(opt => value.includes(opt.value));
      }
      return options.find(opt => opt.value === value);
    }, [options, value, multiple]);

    if (!visible) return null;

    const handleOptionSelect = (option: DynSelectOption) => {
      if (option.disabled) return;

      if (multiple) {
        const currentArr = Array.isArray(value) ? [...value] : [];
        const index = currentArr.indexOf(option.value);
        if (index > -1) {
          currentArr.splice(index, 1);
        } else {
          currentArr.push(option.value);
        }
        updateValue(currentArr);
      } else {
        updateValue(option.value);
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      updateValue(multiple ? [] : '');
    };

    const dropdownItems: DynDropdownItem[] = filteredOptions.map(opt => ({
      id: String(opt.value),
      label: (
        <div className={cn(styles['dyn-select-option-content'])}>
          {multiple && (
            <span className={cn(styles['dyn-select-checkbox'], {
              [styles['dyn-select-checkbox--checked']]: Array.isArray(value) && value.includes(opt.value)
            })}>
              {(Array.isArray(value) && value.includes(opt.value)) && <DynIcon icon="dyn-icon-check" size="small" />}
            </span>
          )}
          <span>{opt.label}</span>
        </div>
      ),
      disabled: opt.disabled,
      onClick: () => handleOptionSelect(opt),
      className: cn(
        styles['dyn-select-option'],
        (multiple ? (Array.isArray(value) && value.includes(opt.value)) : value === opt.value) && styles['dyn-select-option--selected']
      )
    }));

    if (filteredOptions.length === 0) {
      dropdownItems.push({
        id: 'no-options',
        label: <div className={styles['dyn-select-empty']}>{noOptionsMessage}</div>,
        disabled: true
      });
    }

    const resolvedError = resolvedErrorText ?? (error || undefined);


    const selectClasses = cn(
      styles['dyn-select'],
      styles[`dyn-select--${size}`],
      isOpen && styles['dyn-select--open'],
      focused && styles['dyn-select--focused'],
      resolvedError && styles['dyn-select--error'],
      disabled && styles['dyn-select--disabled'],
      readOnly && styles['dyn-select--readonly'],
      loading && styles['dyn-select--loading']
    );

    const triggerContent = (
      <div className={styles['dyn-select-content']}>
        {multiple && Array.isArray(selectedOptions) && selectedOptions.length > 0 ? (
          <div className={styles['dyn-select-tags']}>
            {selectedOptions.map(opt => (
              <span key={String(opt.value)} className={styles['dyn-select-tag']}>
                {opt.label}
                {!disabled && !readOnly && (
                  <button
                    type="button"
                    className={styles['dyn-select-tag-remove']}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOptionSelect(opt);
                    }}
                  >
                    <DynIcon icon="dyn-icon-close" size="small" />
                  </button>
                )}
              </span>
            ))}
          </div>
        ) : (
          <span className={cn(styles['dyn-select-text'], !selectedOptions && styles['dyn-select-placeholder'])}>
            {(selectedOptions && !Array.isArray(selectedOptions)) ? selectedOptions.label : placeholder}
          </span>
        )}
      </div>
    );

    return (
      <DynFieldContainer
        label={label}
        helpText={resolvedHelpText}
        required={required}
        errorText={resolvedError}
        className={className}
        htmlFor={fieldId}
      >

        <div ref={containerRef} className={styles['dyn-select-container']} style={style}>
          <DynDropdown
            ref={dropdownRef}
            isOpen={isOpen}
            onOpenChange={setIsOpen}
            disabled={disabled}
            trigger={
              <div
                className={selectClasses}
                id={fieldId}
                tabIndex={disabled || readOnly ? -1 : 0}
                role="combobox"
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                data-size={size}
                onFocus={() => setFocused(true)}

                onBlur={() => {
                  setFocused(false);
                  validate();
                }}
                onKeyDown={(e) => {
                  if (disabled || readOnly) return;
                  if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
                    e.preventDefault();
                    setIsOpen(true);
                  }
                  if (e.key === 'Escape') {
                    setIsOpen(false);
                  }
                }}
              >
                {triggerContent}
                <div className={styles['dyn-select-actions']}>
                  {clearable && value && !disabled && !readOnly && (
                    <button type="button" className={styles['dyn-select-clear']} onClick={handleClear}>
                      <DynIcon icon="dyn-icon-close" />
                    </button>
                  )}
                  <div className={cn(styles['dyn-select-arrow'], isOpen && styles['dyn-select-arrow--up'])}>
                    <DynIcon icon={loading ? "dyn-icon-loading" : "dyn-icon-arrow-down"} />
                  </div>
                </div>
              </div>
            }
            usePortal={true}
            offset={4}
            closeOnItemClick={!multiple}
            triggerType="click"
            className={styles['dyn-select-dropdown-wrapper']}
          >
            {searchable && (
              <div className={styles['dyn-select-search']}>
                <input
                  type="text"
                  autoFocus
                  placeholder={searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={styles['dyn-select-search-input']}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}
            <div className={styles['dyn-select-options']} style={{ maxHeight: maxMenuHeight }}>
              {dropdownItems.map(item => (
                <button
                  key={item.id}
                  type="button"
                  disabled={item.disabled}
                  className={cn(styles.item, item.className)}
                  onClick={(e) => item.onClick?.(item as any, e as any)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </DynDropdown>
        </div>
      </DynFieldContainer>
    );
  }
);

DynSelect.displayName = 'DynSelect';
export default DynSelect;
