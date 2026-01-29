// ============================================================================
// VALIDATION UTILITIES
// ============================================================================

import { AnyField, Values, Errors, FormState } from './types';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_REGEX = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;

/**
 * Validate a single field value
 */
export const validateField = (
  field: AnyField,
  value: any
): string | undefined => {
  // Check if required
  if (field.required && !value) {
    return field.errorMessage || `${field.label} is required`;
  }

  // If not required and empty, skip further validation
  if (!value) {
    return undefined;
  }

  const stringValue = String(value).trim();

  // Type-specific validation
  switch (field.type) {
    case 'email': {
      if (!EMAIL_REGEX.test(stringValue)) {
        return field.errorMessage || 'Invalid email format';
      }
      break;
    }

    case 'tel': {
      const telRegex = /^[\d\s\-\+\(\)]+$/;
      if (!telRegex.test(stringValue)) {
        return field.errorMessage || 'Invalid phone number';
      }
      break;
    }

    case 'number': {
      const numValue = Number(value);
      if (isNaN(numValue)) {
        return field.errorMessage || 'Must be a number';
      }
      if (field.min !== undefined && numValue < field.min) {
        return `Must be at least ${field.min}`;
      }
      if (field.max !== undefined && numValue > field.max) {
        return `Must be at most ${field.max}`;
      }
      break;
    }

    case 'text': {
      if (field.minLength && stringValue.length < field.minLength) {
        return `Minimum ${field.minLength} characters`;
      }
      if (field.maxLength && stringValue.length > field.maxLength) {
        return `Maximum ${field.maxLength} characters`;
      }
      if (field.pattern) {
        const regex = new RegExp(field.pattern);
        if (!regex.test(stringValue)) {
          return field.errorMessage || 'Invalid format';
        }
      }
      break;
    }

    case 'date': {
      const dateValue = new Date(value);
      if (isNaN(dateValue.getTime())) {
        return field.errorMessage || 'Invalid date';
      }
      break;
    }
  }

  return undefined;
};

/**
 * Validate all fields in the form
 */
export const validateForm = (
  config: { sections: any[] },
  values: Values
): Errors => {
  const errors: Errors = {};

  config.sections.forEach((section) => {
    section.fields.forEach((field: AnyField) => {
      const error = validateField(field, values[field.id]);
      if (error) {
        errors[field.id] = error;
      }
    });
  });

  return errors;
};

/**
 * Check if form has any errors
 */
export const hasErrors = (errors: Errors): boolean => {
  return Object.values(errors).some((error) => error !== undefined);
};

/**
 * Get all visible fields from config
 */
export const getVisibleFields = (
  config: { sections: any[] }
): AnyField[] => {
  return config.sections.flatMap((section) => section.fields);
};
