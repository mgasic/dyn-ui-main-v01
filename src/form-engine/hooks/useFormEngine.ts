// ============================================================================
// CUSTOM HOOK: useFormEngine
// Provides imperative API for form management
// ============================================================================

import { useState, useCallback, useRef } from 'react';
import { FormConfig, FormState, Values, Errors } from '../types';
import { validateForm, validateField, hasErrors } from '../validation';

export interface UseFormEngineOptions {
  config: FormConfig;
  initialValues?: Values;
  onSubmit: (values: Values) => void | Promise<void>;
  onError?: (errors: Errors) => void;
}

export interface UseFormEngineReturn {
  state: FormState;
  setFieldValue: (fieldId: string, value: any) => void;
  setFieldTouched: (fieldId: string, touched: boolean) => void;
  validateField: (fieldId: string) => Promise<string | undefined>;
  validateForm: () => Promise<Errors>;
  submit: () => Promise<void>;
  reset: () => void;
  getFieldProps: (fieldId: string) => {
    value: any;
    onChange: (e: any) => void;
    onBlur: () => void;
  };
}

/**
 * Custom hook for imperative form management
 * Useful when you need more control over form logic
 */
export const useFormEngine = ({
  config,
  initialValues = {},
  onSubmit,
  onError,
}: UseFormEngineOptions): UseFormEngineReturn => {
  const [state, setState] = useState<FormState>({
    values: initialValues,
    errors: {},
    touched: {},
    isSubmitting: false,
    isDirty: false,
  });

  const submitRef = useRef(false);

  const setFieldValue = useCallback((fieldId: string, value: any) => {
    setState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [fieldId]: value,
      },
      isDirty: true,
    }));
  }, []);

  const setFieldTouched = useCallback((fieldId: string, touched: boolean) => {
    setState((prev) => ({
      ...prev,
      touched: {
        ...prev.touched,
        [fieldId]: touched,
      },
    }));
  }, []);

  const validateFieldValue = useCallback(
    async (fieldId: string): Promise<string | undefined> => {
      const fields = config.sections.flatMap((section) => section.fields);
      const field = fields.find((f) => f.id === fieldId);

      if (!field) return undefined;

      const error = validateField(field, state.values[fieldId]);

      setState((prev) => ({
        ...prev,
        errors: {
          ...prev.errors,
          [fieldId]: error,
        },
      }));

      return error;
    },
    [config, state.values]
  );

  const validateFormAll = useCallback(async (): Promise<Errors> => {
    const errors = validateForm(config, state.values);
    setState((prev) => ({
      ...prev,
      errors,
    }));
    return errors;
  }, [config, state.values]);

  const submit = useCallback(async () => {
    submitRef.current = true;

    // Mark all as touched
    const fields = config.sections.flatMap((section) => section.fields);
    const touched: Record<string, boolean> = {};
    fields.forEach((field) => {
      touched[field.id] = true;
    });

    setState((prev) => ({
      ...prev,
      touched,
    }));

    // Validate
    const errors = await validateFormAll();

    if (hasErrors(errors)) {
      onError?.(errors);
      submitRef.current = false;
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
      throw error;
    } finally {
      submitRef.current = false;
    }
  }, [config, state.values, validateFormAll, onSubmit, onError]);

  const reset = useCallback(() => {
    setState({
      values: initialValues,
      errors: {},
      touched: {},
      isSubmitting: false,
      isDirty: false,
    });
  }, [initialValues]);

  const getFieldProps = useCallback(
    (fieldId: string) => ({
      value: state.values[fieldId] ?? '',
      onChange: (e: any) => {
        const value = e.target?.value ?? e;
        setFieldValue(fieldId, value);
      },
      onBlur: () => setFieldTouched(fieldId, true),
    }),
    [state.values, setFieldValue, setFieldTouched]
  );

  return {
    state,
    setFieldValue,
    setFieldTouched,
    validateField: validateFieldValue,
    validateForm: validateFormAll,
    submit,
    reset,
    getFieldProps,
  };
};
