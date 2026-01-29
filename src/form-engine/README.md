# FormEngine

Production-ready form system for DynUI built on TypeScript, React, and JSON configuration.

## Features

✅ **JSON-based configuration** - Define forms as data  
✅ **Type-safe** - Full TypeScript support  
✅ **Validation** - Built-in field and form validation  
✅ **FieldRenderer** - Automatic JSON → Component mapping  
✅ **State management** - React hooks-based  
✅ **Imperative API** - useFormEngine hook for complex scenarios  
✅ **Storybook ready** - 5 comprehensive examples  
✅ **Responsive CSS** - Mobile-first styling  
✅ **Accessibility** - ARIA labels, semantic HTML  

## Installation

```bash
npm install
```

## Quick Start

### Basic Usage

```tsx
import { FormEngine } from './form-engine';
import type { FormConfig } from './form-engine';

const config: FormConfig = {
  sections: [
    {
      title: 'Contact',
      fields: [
        {
          id: 'email',
          label: 'Email',
          type: 'email',
          required: true,
        },
      ],
    },
  ],
};

export function App() {
  return (
    <FormEngine
      config={config}
      onSubmit={(values) => console.log(values)}
    />
  );
}
```

### With useFormEngine Hook

```tsx
import { useFormEngine } from './form-engine';

const form = useFormEngine({
  config,
  initialValues: { email: '' },
  onSubmit: async (values) => {
    await api.submit(values);
  },
});

// Use form.state, form.setFieldValue(), etc.
```

## Field Types

| Type | Props | Example |
|------|-------|----------|
| `text` | minLength, maxLength, pattern, placeholder | Basic text input |
| `email` | pattern, placeholder | Email validation |
| `tel` | placeholder | Phone number |
| `number` | min, max, step | Numeric input |
| `date` | - | Date picker |
| `radio` | **options** (required) | Single selection |
| `dropdown` | **options** (required), dropdownRef | Dropdown select |
| `checkbox` | - | Boolean toggle |

## Configuration Example

```typescript
const config: FormConfig = {
  sections: [
    {
      title: 'Personal Info',
      fields: [
        {
          id: 'firstName',
          label: 'First Name',
          type: 'text',
          required: true,
          minLength: 2,
          maxLength: 50,
          placeholder: 'Enter first name',
          helperText: 'At least 2 characters',
        },
        {
          id: 'email',
          label: 'Email',
          type: 'email',
          required: true,
        },
        {
          id: 'country',
          label: 'Country',
          type: 'dropdown',
          required: true,
          options: [
            { value: 'us', label: 'USA' },
            { value: 'uk', label: 'UK' },
          ],
        },
        {
          id: 'agreeTerms',
          label: 'I agree to terms',
          type: 'checkbox',
          required: true,
        },
      ],
    },
  ],
};
```

## API Reference

### FormEngine Props

```typescript
interface FormEngineProps {
  config: FormConfig;              // Form configuration
  initialValues?: Values;          // Initial field values
  onSubmit: (values: Values) => void | Promise<void>;
  onError?: (errors: Errors) => void;
  submitButtonText?: string;       // Default: "Submit"
  submitButtonClass?: string;      // CSS class for button
}
```

### useFormEngine Hook

```typescript
const form = useFormEngine({
  config,
  initialValues,
  onSubmit,
  onError,
});

// Returns:
// - form.state: FormState
// - form.setFieldValue(id, value)
// - form.setFieldTouched(id, boolean)
// - form.validateField(id) → Promise<error | undefined>
// - form.validateForm() → Promise<Errors>
// - form.submit()
// - form.reset()
// - form.getFieldProps(id) → {value, onChange, onBlur}
```

## Validation

Validation runs automatically on blur and submit. Custom patterns:

```typescript
const fields = [
  {
    id: 'username',
    type: 'text',
    pattern: '^[a-zA-Z0-9_]+$',  // Regex pattern
    errorMessage: 'Letters, numbers, underscores only',
  },
];
```

## Storybook

Run Storybook to see examples:

```bash
npm run storybook
```

Includes:
- Basic contact form
- Radio button selection
- Dropdown selection
- Multi-section form with validation
- useFormEngine hook example

## CSS Variables

Customize via CSS variables:

```css
:root {
  --color-surface: #fff;
  --color-border: #ccc;
  --color-text: #333;
  --color-primary: #2196f3;
  --color-primary-hover: #1976d2;
}
```

## Testing

Each component is fully typed and testable:

```typescript
test('validates required field', () => {
  const { getByText } = render(
    <FormEngine config={config} onSubmit={jest.fn()} />
  );
  fireEvent.click(getByText('Submit'));
  expect(getByText('Email is required')).toBeInTheDocument();
});
```

## License

MIT
