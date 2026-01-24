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

/**
 * DynSelect Component
 * Standardized with Design Tokens & CSS Modules
 */
const DynSelectInner = <T extends string | number>(
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
  }: DynSelectProps<T>,
  ref: React.Ref<DynSelectRef<T>>
) => {
  const [internalValue, setInternalValue] = useState<T | T[]>(defaultValue ?? (multiple ? [] : '' as unknown as T));
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
    validation: [],
    customError: resolvedErrorText,
  });

  const updateValue = (newValue: T | T[]) => {
    setInternalValue(newValue);
    onChange?.(newValue);
    clearError();
  };

  useImperativeHandle(ref, () => ({
    focus: () => setIsOpen(true),
    blur: () => setIsOpen(false),
    clear: () => updateValue(multiple ? [] : '' as unknown as T),
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
      return options.filter(opt => (value as T[]).includes(opt.value));
    }
    return options.find(opt => opt.value === value);
  }, [options, value, multiple]);

  if (!visible) return null;

  const handleOptionSelect = (option: DynSelectOption<T>) => {
    if (option.disabled) return;

    if (multiple) {
      const currentArr = Array.isArray(value) ? [...(value as T[])] : [];
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
    updateValue(multiple ? [] : '' as unknown as T);
  };

  const dropdownItems: DynDropdownItem[] = filteredOptions.map(opt => ({
    id: String(opt.value),
    label: (
      <div className={styles.optionContent}>
        {multiple && (
          <span className={cn(styles.checkbox, {
            [styles.checkboxChecked]: Array.isArray(value) && (value as T[]).includes(opt.value)
          })}>
            {(Array.isArray(value) && (value as T[]).includes(opt.value)) && <DynIcon icon="check" size="small" />}
          </span>
        )}
        <span>{opt.label}</span>
      </div>
    ),
    disabled: opt.disabled,
    onClick: () => handleOptionSelect(opt),
    className: cn(
      styles.option,
      (multiple ? (Array.isArray(value) && (value as T[]).includes(opt.value)) : value === opt.value) && styles.optionSelected
    )
  }));

  if (filteredOptions.length === 0) {
    dropdownItems.push({
      id: 'no-options',
      label: <div className={styles.empty}>{noOptionsMessage}</div>,
      disabled: true
    });
  }

  const resolvedError = resolvedErrorText ?? (error || undefined);

  // Size mapping - explicit map instead of string interpolation
  const SIZE_MAP: Record<string, string> = {
    small: styles.sizeSmall || '',
    medium: styles.sizeMedium || '',
    large: styles.sizeLarge || '',
  };

  const selectClasses = cn(
    styles.root,
    SIZE_MAP[size],
    {
      [styles.open]: isOpen,
      [styles.focused]: focused,
      [styles.error]: !!resolvedError,
      [styles.disabled]: disabled,
      [styles.readonly]: readOnly,
      [styles.loading]: loading
    }
  );

  const triggerContent = (
    <div className={styles.content}>
      {multiple && Array.isArray(selectedOptions) && (selectedOptions as DynSelectOption<T>[]).length > 0 ? (
        <div className={styles.tags}>
          {(selectedOptions as DynSelectOption<T>[]).map(opt => (
            <span key={String(opt.value)} className={styles.tag}>
              {opt.label}
              {!disabled && !readOnly && (
                <button
                  type="button"
                  className={styles.tagRemove}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOptionSelect(opt);
                  }}
                >
                  <DynIcon icon="close" size="small" />
                </button>
              )}
            </span>
          ))}
        </div>
      ) : (
        <span className={cn(styles.text, !selectedOptions && styles.placeholder)}>
          {selectedOptions && !Array.isArray(selectedOptions) ? (selectedOptions as DynSelectOption<T>).label : placeholder}
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
      <div ref={containerRef} className={styles.container} style={style}>
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
              <div className={styles.actions}>
                {clearable && value && !disabled && !readOnly && (
                  <button type="button" className={styles.clear} onClick={handleClear}>
                    <DynIcon icon="close" size="small" />
                  </button>
                )}
                <div className={cn(styles.arrow, { [styles.arrowUp]: isOpen })}>
                  <DynIcon icon={loading ? "loading" : "chevron-down"} size="small" />
                </div>
              </div>
            </div>
          }
          usePortal={true}
          offset={4}
          closeOnItemClick={!multiple}
          triggerType="click"
          className={styles.dropdownWrapper}
        >
          {searchable && (
            <div className={styles.search}>
              <input
                type="text"
                autoFocus
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
          <div className={styles.options} style={{ maxHeight: maxMenuHeight }}>
            {dropdownItems.map(item => (
              <button
                key={item.id}
                type="button"
                disabled={item.disabled}
                className={cn(styles.option, item.className)}
                onClick={(e) => item.onClick?.(item, e)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </DynDropdown>
      </div>
    </DynFieldContainer>
  );
};

export const DynSelect = forwardRef(DynSelectInner) as <T extends string | number>(
  props: DynSelectProps<T> & { ref?: React.Ref<DynSelectRef<T>> }
) => React.ReactElement;

(DynSelect as any).displayName = 'DynSelect';
export default DynSelect;



