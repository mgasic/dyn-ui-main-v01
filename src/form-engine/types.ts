// ============================================================================
// FORM ENGINE TYPE DEFINITIONS
// ============================================================================

export type FieldType =
  | 'text'
  | 'email'
  | 'tel'
  | 'number'
  | 'date'
  | 'radio'
  | 'dropdown'
  | 'checkbox';

export interface BaseField {
  id: string;
  label: string;
  type: FieldType;
  required?: boolean;
  errorMessage?: string;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  helperText?: string;
}

export interface RadioField extends BaseField {
  type: 'radio';
  options: { value: string; label: string }[];
}

export interface DropdownField extends BaseField {
  type: 'dropdown';
  dropdownRef?: string; // npr. "drzavljanstva"
  options?: { value: string; label: string }[];
}

export interface CheckboxField extends BaseField {
  type: 'checkbox';
  checked?: boolean;
}

export type AnyField = BaseField | RadioField | DropdownField | CheckboxField;

export type Values = Record<string, any>;
export type Errors = Record<string, string | undefined>;

export interface DropdownLists {
  [key: string]: { code: string; name: string }[];
}

export interface FormSection {
  title: string;
  fields: AnyField[];
}

export interface FormConfig {
  sections: FormSection[];
  dropdownLists?: DropdownLists;
  occupations?: { code: string; name: string }[];
  activities?: { code: string; name: string }[];
}

export interface ValidationRule {
  type: 'required' | 'minLength' | 'maxLength' | 'pattern' | 'min' | 'max' | 'email';
  value?: any;
  message: string;
}

export interface FormState {
  values: Values;
  errors: Errors;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
  isDirty: boolean;
}
