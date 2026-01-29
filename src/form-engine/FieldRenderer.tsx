// ============================================================================
// FIELD RENDERER: JSON → DynUI COMPONENTS
// ============================================================================

import React from 'react';
import { AnyField, DropdownField, RadioField } from './types';

interface FieldRendererProps {
  field: AnyField;
  value: any;
  error?: string;
  touched?: boolean;
  onChange: (value: any) => void;
  onBlur?: () => void;
}

/**
 * Radio Group Component
 */
const RadioGroup: React.FC<
  FieldRendererProps & { options: { value: string; label: string }[] }
> = ({ field, value, error, touched, onChange, options, onBlur }) => (
  <fieldset className="fe-radio-group">
    <legend className="fe-field-label">
      {field.label}
      {field.required && <span className="fe-required">*</span>}
    </legend>
    <div className="fe-radio-options">
      {options.map((opt) => (
        <label key={opt.value} className="fe-radio-label">
          <input
            type="radio"
            name={field.id}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            onBlur={onBlur}
            disabled={false}
          />
          <span>{opt.label}</span>
        </label>
      ))}
    </div>
    {touched && error && <div className="fe-error-message">{error}</div>}
    {field.helperText && <div className="fe-helper-text">{field.helperText}</div>}
  </fieldset>
);

/**
 * Dropdown Component
 */
const Dropdown: React.FC<
  FieldRendererProps & { options: { value: string; label: string }[] }
> = ({ field, value, error, touched, onChange, options, onBlur }) => (
  <div className="fe-form-group">
    <label htmlFor={field.id} className="fe-field-label">
      {field.label}
      {field.required && <span className="fe-required">*</span>}
    </label>
    <select
      id={field.id}
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      className="fe-select"
    >
      <option value="">-- Select --</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    {touched && error && <div className="fe-error-message">{error}</div>}
    {field.helperText && <div className="fe-helper-text">{field.helperText}</div>}
  </div>
);

/**
 * Text Input Component
 */
const TextInput: React.FC<FieldRendererProps> = ({
  field,
  value,
  error,
  touched,
  onChange,
  onBlur,
}) => (
  <div className="fe-form-group">
    <label htmlFor={field.id} className="fe-field-label">
      {field.label}
      {field.required && <span className="fe-required">*</span>}
    </label>
    <input
      id={field.id}
      type={field.type}
      name={field.id}
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      placeholder={field.placeholder}
      minLength={field.minLength}
      maxLength={field.maxLength}
      min={field.min}
      max={field.max}
      step={field.step}
      className={`fe-input ${touched && error ? 'fe-input--error' : ''}`}
    />
    {touched && error && <div className="fe-error-message">{error}</div>}
    {field.helperText && <div className="fe-helper-text">{field.helperText}</div>}
  </div>
);

/**
 * Checkbox Component
 */
const Checkbox: React.FC<FieldRendererProps> = ({
  field,
  value,
  error,
  touched,
  onChange,
  onBlur,
}) => (
  <div className="fe-form-group">
    <label htmlFor={field.id} className="fe-checkbox-label">
      <input
        id={field.id}
        type="checkbox"
        name={field.id}
        checked={value ?? false}
        onChange={(e) => onChange(e.target.checked)}
        onBlur={onBlur}
      />
      <span>{field.label}</span>
      {field.required && <span className="fe-required">*</span>}
    </label>
    {touched && error && <div className="fe-error-message">{error}</div>}
    {field.helperText && <div className="fe-helper-text">{field.helperText}</div>}
  </div>
);

/**
 * Main FieldRenderer Component
 * Maps JSON field definition to appropriate DynUI component
 */
export const FieldRenderer: React.FC<FieldRendererProps> = (props) => {
  const { field } = props;

  switch (field.type) {
    case 'radio': {
      const radioField = field as RadioField;
      return (
        <RadioGroup
          {...props}
          options={radioField.options}
        />
      );
    }

    case 'dropdown': {
      const ddField = field as DropdownField;
      const options = ddField.options ?? [];
      return (
        <Dropdown
          {...props}
          options={options}
        />
      );
    }

    case 'checkbox':
      return <Checkbox {...props} />;

    default:
      return <TextInput {...props} />;
  }
};
