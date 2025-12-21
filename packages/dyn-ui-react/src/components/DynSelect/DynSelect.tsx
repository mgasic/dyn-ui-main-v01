/**
 * DynSelect - Advanced select component with search and virtual scrolling
 * Part of DYN UI Form Components Group - SCOPE 6
 */

import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
  useMemo
} from 'react';
import { cn } from '../../utils/classNames';
import type { DynSelectProps, DynFieldRef, SelectOption } from '../../types/field.types';
import { DynFieldContainer } from '../DynFieldContainer';
import { useDynFieldValidation } from '../../hooks/useDynFieldValidation';
import { DynIcon } from '../DynIcon';
import styles from './DynSelect.module.css';

export const DynSelect = forwardRef<DynFieldRef, DynSelectProps>(
  (
    {
      name,
      label,
      help,
      placeholder = 'Select...',
      disabled = false,
      readonly = false,
      required = false,
      optional = false,
      visible = true,
      value: propValue,
      errorMessage,
      validation,
      className,
      options = [],
      multiple = false,
      searchable = false,
      virtualScroll = false,
      loading = false,
      size = 'medium',
      onChange,
      onBlur,
      onFocus
    },
    ref
  ) => {
    const [value, setValue] = useState<string | string[]>(propValue || (multiple ? [] : ''));
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [focused, setFocused] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const { error, validate, clearError } = useDynFieldValidation({
      value,
      required,
      validation,
      customError: errorMessage
    });

    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
      validate: () => validate(),
      clear: () => {
        setValue(multiple ? [] : '');
        onChange?.(multiple ? [] : '');
        clearError();
      },
      getValue: () => value,
      setValue: (newValue: any) => {
        setValue(newValue);
        onChange?.(newValue);
      }
    }));

    const filteredOptions = useMemo(() => {
      if (!searchable || !searchTerm) return options;
      return options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }, [options, searchTerm, searchable]);

    const selectedOptions = useMemo(() => {
      if (multiple && Array.isArray(value)) {
        return options.filter(option => value.includes(option.value));
      } else if (!multiple) {
        return options.find(option => option.value === value) || null;
      }
      return null;
    }, [options, value, multiple]);

    useEffect(() => {
      setValue(propValue || (multiple ? [] : ''));
    }, [propValue, multiple]);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
          setIsOpen(false);
          setSearchTerm('');
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }
    }, [isOpen]);

    const handleToggle = () => {
      if (!disabled && !readonly) {
        setIsOpen(prev => !prev);
        if (!isOpen) {
          inputRef.current?.focus();
        }
      }
    };

    const handleOptionSelect = (option: SelectOption) => {
      if (option.disabled) return;

      if (multiple && Array.isArray(value)) {
        const newValue = value.includes(option.value)
          ? value.filter(v => v !== option.value)
          : [...value, option.value];
        setValue(newValue);
        onChange?.(newValue);
      } else {
        setValue(option.value);
        onChange?.(option.value);
        setIsOpen(false);
        setSearchTerm('');
      }

      clearError();
    };

    const handleRemoveOption = (optionValue: any, event: React.MouseEvent) => {
      event.stopPropagation();
      if (multiple && Array.isArray(value)) {
        const newValue = value.filter(v => v !== optionValue);
        setValue(newValue);
        onChange?.(newValue);
      }
    };

    const handleBlur = () => {
      setFocused(false);
      validate();
      onBlur?.();
    };

    const handleFocus = () => {
      setFocused(true);
      clearError();
      onFocus?.();
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'Enter':
        case ' ':
          if (!isOpen) {
            e.preventDefault();
            setIsOpen(true);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          setSearchTerm('');
          break;
        case 'ArrowDown':
          if (!isOpen) {
            setIsOpen(true);
          }
          break;
        default:
          break;
      }
    };

    if (!visible) return null;

    const resolvedError = errorMessage ?? (error || undefined);

    const selectClasses = cn(
      styles['dyn-select'],
      styles[`dyn-select--${size}`],
      {
        [styles['dyn-select--open']]: isOpen,
        [styles['dyn-select--focused']]: focused,
        [styles['dyn-select--error']]: Boolean(resolvedError),
        [styles['dyn-select--disabled']]: disabled,
        [styles['dyn-select--readonly']]: readonly,
        [styles['dyn-select--searchable']]: searchable,
        [styles['dyn-select--multiple']]: multiple,
        [styles['dyn-select--loading']]: loading
      }
    );

    const getDisplayText = () => {
      if (loading) return 'Loading...';

      if (multiple && Array.isArray(selectedOptions) && selectedOptions.length > 0) {
        return `${selectedOptions.length} selected`;
      } else if (!multiple && selectedOptions) {
        return (selectedOptions as SelectOption).label;
      }

      return placeholder;
    };

    const showPlaceholder = !selectedOptions ||
      (multiple && Array.isArray(selectedOptions) && selectedOptions.length === 0);

    return (
      <DynFieldContainer
        label={label}
        helpText={help}
        required={required}
        optional={optional}
        errorText={resolvedError}
        className={className}
        htmlFor={name}
      >
        <div ref={selectRef} className={styles['dyn-select-container']}>
          <div
            className={selectClasses}
            onClick={handleToggle}
            onKeyDown={handleKeyDown}
            tabIndex={disabled ? -1 : 0}
            role="combobox"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-invalid={Boolean(resolvedError)}
            aria-describedby={
              resolvedError ? `${name}-error` : help ? `${name}-help` : undefined
            }
            onBlur={handleBlur}
            onFocus={handleFocus}
          >
            <input
              ref={inputRef}
              type="hidden"
              id={name}
              name={name}
              value={multiple && Array.isArray(value) ? value.join(',') : value || ''}
            />

            <div className={styles['dyn-select-content']}>
              {multiple && Array.isArray(selectedOptions) && selectedOptions.length > 0 ? (
                <div className={styles['dyn-select-tags']}>
                  {selectedOptions.map((option) => (
                    <span key={option.value} className={styles['dyn-select-tag']}>
                      {option.label}
                      <button
                        type="button"
                        className={styles['dyn-select-tag-remove']}
                        onClick={(e) => handleRemoveOption(option.value, e)}
                        aria-label={`Remove ${option.label}`}
                      >
                        <DynIcon icon="dyn-icon-close" />
                      </button>
                    </span>
                  ))}
                </div>
              ) : (
                <span className={cn(styles['dyn-select-text'], {
                  [styles['dyn-select-placeholder']]: showPlaceholder
                })}>
                  {getDisplayText()}
                </span>
              )}
            </div>

            <div className={styles['dyn-select-arrow']}>
              <DynIcon
                icon={loading ? "dyn-icon-loading" : "dyn-icon-arrow-down"}
                className={cn({
                  [styles['dyn-select-arrow--up']]: isOpen && !loading
                })}
              />
            </div>
          </div>

          {isOpen && (
            <div className={styles['dyn-select-dropdown']}>
              {searchable && (
                <div className={styles['dyn-select-search']}>
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className={styles['dyn-select-search-input']}
                  />
                </div>
              )}

              <div className={styles['dyn-select-options']} role="listbox">
                {filteredOptions.length === 0 ? (
                  <div className={styles['dyn-select-empty']}>
                    {searchTerm ? 'No results found' : 'No options available'}
                  </div>
                ) : (
                  filteredOptions.map((option) => {
                    const isSelected = multiple && Array.isArray(value)
                      ? value.includes(option.value)
                      : value === option.value;

                    return (
                      <div
                        key={option.value}
                        className={cn(styles['dyn-select-option'], {
                          [styles['dyn-select-option--selected']]: isSelected,
                          [styles['dyn-select-option--disabled']]: option.disabled
                        })}
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => handleOptionSelect(option)}
                      >
                        {multiple && (
                          <span className={cn(styles['dyn-select-checkbox'], {
                            [styles['dyn-select-checkbox--checked']]: isSelected
                          })}>
                            {isSelected && <DynIcon icon="dyn-icon-check" />}
                          </span>
                        )}
                        <span className={styles['dyn-select-option-text']}>{option.label}</span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>
      </DynFieldContainer>
    );
  }
);

DynSelect.displayName = 'DynSelect';

export default DynSelect;
