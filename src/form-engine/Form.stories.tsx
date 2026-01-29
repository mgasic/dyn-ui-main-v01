// ============================================================================
// STORYBOOK STORIES: FormEngine
// ============================================================================

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FormEngine } from './FormEngine';
import { useFormEngine } from './hooks/useFormEngine';
import type { FormConfig, Values, Errors } from './types';

const meta = {
  title: 'FormEngine / FormEngine',
  component: FormEngine,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof FormEngine>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// EXAMPLE 1: Basic Contact Form
// ============================================================================

const contactFormConfig: FormConfig = {
  sections: [
    {
      title: 'Contact Information',
      fields: [
        {
          id: 'firstName',
          label: 'First Name',
          type: 'text',
          required: true,
          placeholder: 'Enter your first name',
          minLength: 2,
          maxLength: 50,
        },
        {
          id: 'email',
          label: 'Email Address',
          type: 'email',
          required: true,
          placeholder: 'you@example.com',
        },
        {
          id: 'phone',
          label: 'Phone Number',
          type: 'tel',
          placeholder: '+1 (555) 000-0000',
        },
      ],
    },
    {
      title: 'Message',
      fields: [
        {
          id: 'message',
          label: 'Your Message',
          type: 'text',
          required: true,
          placeholder: 'Type your message here...',
          minLength: 10,
          maxLength: 500,
        },
        {
          id: 'subscribe',
          label: 'Subscribe to our newsletter',
          type: 'checkbox',
        },
      ],
    },
  ],
};

export const BasicContactForm: Story = {
  render: () => {
    const [result, setResult] = useState<Values | null>(null);

    return (
      <div>
        <FormEngine
          config={contactFormConfig}
          initialValues={{ firstName: '', email: '', phone: '', message: '', subscribe: false }}
          onSubmit={(values) => {
            console.log('Form submitted:', values);
            setResult(values);
          }}
          submitButtonText="Send Message"
        />
        {result && (
          <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#e8f5e9', borderRadius: '4px' }}>
            <h3>Submitted Data:</h3>
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </div>
    );
  },
};

// ============================================================================
// EXAMPLE 2: Form with Radio Buttons
// ============================================================================

const radioFormConfig: FormConfig = {
  sections: [
    {
      title: 'Subscription Plan',
      fields: [
        {
          id: 'plan',
          label: 'Choose your plan',
          type: 'radio',
          required: true,
          options: [
            { value: 'basic', label: 'Basic - $9/month' },
            { value: 'pro', label: 'Pro - $29/month' },
            { value: 'enterprise', label: 'Enterprise - Custom pricing' },
          ],
        },
      ],
    },
  ],
};

export const FormWithRadio: Story = {
  render: () => {
    const [result, setResult] = useState<Values | null>(null);

    return (
      <div>
        <FormEngine
          config={radioFormConfig}
          initialValues={{ plan: '' }}
          onSubmit={(values) => {
            console.log('Selected plan:', values);
            setResult(values);
          }}
          submitButtonText="Select Plan"
        />
        {result && (
          <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#e3f2fd', borderRadius: '4px' }}>
            <h3>Selected:</h3>
            <p>Plan: <strong>{result.plan}</strong></p>
          </div>
        )}
      </div>
    );
  },
};

// ============================================================================
// EXAMPLE 3: Form with Dropdowns
// ============================================================================

const dropdownFormConfig: FormConfig = {
  sections: [
    {
      title: 'Personal Details',
      fields: [
        {
          id: 'country',
          label: 'Country',
          type: 'dropdown',
          required: true,
          options: [
            { value: 'us', label: 'United States' },
            { value: 'uk', label: 'United Kingdom' },
            { value: 'ca', label: 'Canada' },
            { value: 'au', label: 'Australia' },
          ],
        },
        {
          id: 'experience',
          label: 'Experience Level',
          type: 'dropdown',
          required: true,
          options: [
            { value: 'beginner', label: 'Beginner' },
            { value: 'intermediate', label: 'Intermediate' },
            { value: 'advanced', label: 'Advanced' },
            { value: 'expert', label: 'Expert' },
          ],
        },
      ],
    },
  ],
};

export const FormWithDropdowns: Story = {
  render: () => {
    const [result, setResult] = useState<Values | null>(null);

    return (
      <div>
        <FormEngine
          config={dropdownFormConfig}
          initialValues={{ country: '', experience: '' }}
          onSubmit={(values) => {
            console.log('Form submitted:', values);
            setResult(values);
          }}
          submitButtonText="Continue"
        />
        {result && (
          <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f3e5f5', borderRadius: '4px' }}>
            <h3>Submitted Data:</h3>
            <p>Country: <strong>{result.country}</strong></p>
            <p>Experience: <strong>{result.experience}</strong></p>
          </div>
        )}
      </div>
    );
  },
};

// ============================================================================
// EXAMPLE 4: Complex Multi-Section Form
// ============================================================================

const complexFormConfig: FormConfig = {
  sections: [
    {
      title: 'Account Information',
      fields: [
        {
          id: 'username',
          label: 'Username',
          type: 'text',
          required: true,
          minLength: 3,
          maxLength: 20,
          pattern: '^[a-zA-Z0-9_]+$',
          helperText: 'Letters, numbers, and underscores only',
        },
        {
          id: 'email',
          label: 'Email',
          type: 'email',
          required: true,
        },
        {
          id: 'age',
          label: 'Age',
          type: 'number',
          required: true,
          min: 18,
          max: 120,
        },
      ],
    },
    {
      title: 'Preferences',
      fields: [
        {
          id: 'theme',
          label: 'Theme',
          type: 'radio',
          required: true,
          options: [
            { value: 'light', label: 'Light' },
            { value: 'dark', label: 'Dark' },
            { value: 'auto', label: 'Auto' },
          ],
        },
        {
          id: 'notifications',
          label: 'Enable notifications',
          type: 'checkbox',
        },
        {
          id: 'language',
          label: 'Language',
          type: 'dropdown',
          required: true,
          options: [
            { value: 'en', label: 'English' },
            { value: 'es', label: 'Spanish' },
            { value: 'fr', label: 'French' },
            { value: 'de', label: 'German' },
          ],
        },
      ],
    },
  ],
};

export const ComplexForm: Story = {
  render: () => {
    const [result, setResult] = useState<Values | null>(null);
    const [errors, setErrors] = useState<Errors>({});

    return (
      <div>
        <FormEngine
          config={complexFormConfig}
          initialValues={{
            username: '',
            email: '',
            age: '',
            theme: '',
            notifications: false,
            language: '',
          }}
          onSubmit={(values) => {
            console.log('Complex form submitted:', values);
            setResult(values);
          }}
          onError={(formErrors) => {
            console.error('Form errors:', formErrors);
            setErrors(formErrors);
          }}
          submitButtonText="Create Account"
        />
        {result && (
          <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#e8f5e9', borderRadius: '4px' }}>
            <h3>Account Created!</h3>
            <pre style={{ fontSize: '0.85rem' }}>{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
        {Object.keys(errors).length > 0 && (
          <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#ffebee', borderRadius: '4px' }}>
            <h3>Validation Errors:</h3>
            <ul>
              {Object.entries(errors).map(([key, error]) => error && <li key={key}>{error}</li>)}
            </ul>
          </div>
        )}
      </div>
    );
  },
};

// ============================================================================
// EXAMPLE 5: Using useFormEngine Hook
// ============================================================================

const hookFormConfig: FormConfig = {
  sections: [
    {
      title: 'Feedback',
      fields: [
        {
          id: 'name',
          label: 'Your Name',
          type: 'text',
          required: true,
        },
        {
          id: 'rating',
          label: 'Rating',
          type: 'radio',
          required: true,
          options: [
            { value: '5', label: '⭐⭐⭐⭐⭐ Excellent' },
            { value: '4', label: '⭐⭐⭐⭐ Good' },
            { value: '3', label: '⭐⭐⭐ Average' },
            { value: '2', label: '⭐⭐ Poor' },
            { value: '1', label: '⭐ Very Poor' },
          ],
        },
      ],
    },
  ],
};

const UseFormEngineExample = () => {
  const form = useFormEngine({
    config: hookFormConfig,
    initialValues: { name: '', rating: '' },
    onSubmit: async (values) => {
      console.log('Submitting feedback:', values);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert('Thank you for your feedback!');
    },
  });

  return (
    <form onSubmit={(e) => { e.preventDefault(); form.submit(); }} style={{ maxWidth: '500px' }}>
      <div style={{ marginBottom: '1rem' }}>
        <label>
          Name:
          <input
            type="text"
            {...form.getFieldProps('name')}
            style={{
              marginLeft: '0.5rem',
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
        </label>
        {form.state.errors.name && <div style={{ color: 'red' }}>{form.state.errors.name}</div>}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <p>Rating:</p>
        {[
          { value: '5', label: '⭐⭐⭐⭐⭐ Excellent' },
          { value: '4', label: '⭐⭐⭐⭐ Good' },
          { value: '3', label: '⭐⭐⭐ Average' },
          { value: '2', label: '⭐⭐ Poor' },
          { value: '1', label: '⭐ Very Poor' },
        ].map((opt) => (
          <label key={opt.value} style={{ display: 'block', marginBottom: '0.5rem' }}>
            <input
              type="radio"
              name="rating"
              value={opt.value}
              checked={form.state.values.rating === opt.value}
              onChange={() => form.setFieldValue('rating', opt.value)}
            />
            {' '}{opt.label}
          </label>
        ))}
        {form.state.errors.rating && <div style={{ color: 'red' }}>{form.state.errors.rating}</div>}
      </div>

      <button
        type="submit"
        disabled={form.state.isSubmitting}
        style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: '#2196f3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        {form.state.isSubmitting ? 'Submitting...' : 'Submit Feedback'}
      </button>
    </form>
  );
};

export const UseFormEngineHook: Story = {
  render: () => <UseFormEngineExample />,
};
