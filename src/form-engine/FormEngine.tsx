// ============================================================================
// FORM ENGINE: STATE + VALIDATION + RENDERING
// ============================================================================

import React, { useState, useCallback, ReactNode } from 'react';
import { FormConfig, FormState, Values, Errors } from './types';
import { validateForm, validateField, hasErrors } from './validation';
import { FieldRenderer } from './FieldRenderer';
import './form-engine.css';

export interface FormEngineProps {
  config: FormConfig;
  initialValues?: Values;
  onSubmit: (values: Values) => void | Promise<void>;
  onError?: (errors: Errors) => void;
  children?: ReactNode;
  submitButtonText?: string;
  submitButtonClass?: string;
}

/**
 * Main FormEngine Component
 * Manages state, validation, and rendering of forms from JSON config
 */
export const FormEngine: React.FC<FormEngineProps> = ({
  config,
  initialValues = {},
  onSubmit,
  onError,
  children,
  submitButtonText = 'Submit',
  submitButtonClass = 'fe-btn-primary',
}) => {
  const [state, setState] = useState<FormState>({
    values: initialValues,
    errors: {},
    touched: {},
    isSubmitting: false,
    isDirty: false,
  });

  /**
   * Handle field change
   */
  const handleFieldChange = useCallback((fieldId: string, value: any) => {
    setState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [fieldId]: value,
      },
      isDirty: true,
    }));
  }, []);

  /**
   * Handle field blur
   */
  const handleFieldBlur = useCallback((fieldId: string) => {
    setState((prev) => ({
      ...prev,
      touched: {
        ...prev.touched,
        [fieldId]: true,
      },
    }));

    // Validate this field
    const field = getAllFields().find((f) => f.id === fieldId);
    if (field) {
      const error = validateField(field, state.values[fieldId]);
      setState((prev) => ({
        ...prev,
        errors: {
          ...prev.errors,
          [fieldId]: error,
        },
      }));
    }
  }, [state.values]);

  /**
   * Get all fields from config
   */
  const getAllFields = () => {
    return config.sections.flatMap((section) => section.fields);
  };

  /**
   * Handle form submission
   */
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      // Mark all fields as touched
      const allFields = getAllFields();
      const touched: Record<string, boolean> = {};
      allFields.forEach((field) => {
        touched[field.id] = true;
      });

      setState((prev) => ({
        ...prev,
        touched,
      }));

      // Validate form
      const errors = validateForm(config, state.values);

      setState((prev) => ({
        ...prev,
        errors,
      }));

      if (hasErrors(errors)) {
        onError?.(errors);
        return;
      }

      // Submit
      setState((prev) => ({
        ...prev,
        isSubmitting: true,
      }));

      try {
        await onSubmit(state.values);
        setState((prev) => ({
          ...prev,
          isSubmitting: false,
        }));
      } catch (error) {
        setState((prev) => ({
          ...prev,
          isSubmitting: false,
        }));
        console.error('Form submission error:', error);
      }
    },
    [config, state.values, onSubmit, onError]
  );

  /**
   * Reset form
   */
  const handleReset = useCallback(() => {
    setState({
      values: initialValues,
      errors: {},
      touched: {},
      isSubmitting: false,
      isDirty: false,
    });
  }, [initialValues]);

  return (
    <form onSubmit={handleSubmit} className="fe-form" noValidate>
      {/* Render sections */}
      {config.sections.map((section) => (
        <section key={section.title} className="fe-section">
          <h2 className="fe-section-title">{section.title}</h2>
          <div className="fe-section-fields">
            {section.fields.map((field) => (
              <FieldRenderer
                key={field.id}
                field={field}
                value={state.values[field.id]}
                error={state.errors[field.id]}
                touched={state.touched[field.id]}
                onChange={(value) => handleFieldChange(field.id, value)}
                onBlur={() => handleFieldBlur(field.id)}
              />
            ))}
          </div>
        </section>
      ))}

      {/* Custom content */}
      {children}

      {/* Actions */}
      <div className="fe-form-actions">
        <button
          type="submit"
          disabled={state.isSubmitting}
          className={submitButtonClass}
        >
          {state.isSubmitting ? 'Submitting...' : submitButtonText}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="fe-btn-secondary"
        >
          Reset
        </button>
      </div>
    </form>
  );
};
