import type { Meta, StoryObj } from '@storybook/react';
import { DynInput } from './DynInput';
import { MASK_PATTERNS } from '../../hooks/useDynMask';

const meta: Meta<typeof DynInput> = {
  title: 'Form/DynInput',
  component: DynInput,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'DynInput je standardizovana input komponenta sa validacijom, maskiranjem, ikonama i clear funkcionalnošću. Implementira WCAG 2.1 AA, koristi dizajn tokene i Vitest za testove.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search', 'currency'],
      description: 'Input type'
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      description: 'Size variant'
    },
    mask: {
      control: 'select',
      options: [undefined, ...Object.values(MASK_PATTERNS)],
      description: 'Mask pattern'
    },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    required: { control: 'boolean' },
    optional: { control: 'boolean' },
    showCleanButton: { control: 'boolean' },
    showSpinButtons: { control: 'boolean' },
    icon: { control: 'text', description: 'Icon name or ReactNode' },
    placeholder: { control: 'text' },
    help: { control: 'text' },
    value: { control: 'text' },
    currencyConfig: {
      control: 'object',
      description: 'Currency formatting configuration'
    }
  },
  args: {
    label: 'Input',
    size: 'medium',
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'Enter full name',
    help: 'User identification field',
    showCleanButton: true
  }
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '1rem', maxWidth: 480 }}>
      <DynInput label="Small" size="small" placeholder="Small" />
      <DynInput label="Medium" size="medium" placeholder="Medium" />
      <DynInput label="Large" size="large" placeholder="Large" />
    </div>
  )
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '1rem', maxWidth: 480 }}>
      <DynInput label="Required" required placeholder="Required field" />
      <DynInput label="Optional" optional placeholder="Optional field" />
      <DynInput label="With Error" errorMessage="Invalid input" />
      <DynInput label="Disabled" disabled value="Disabled" />
      <DynInput label="Readonly" readonly value="Read only" />
    </div>
  )
};

export const WithIconAndClear: Story = {
  args: {
    label: 'Search',
    icon: 'search',
    placeholder: 'Search...',
    showCleanButton: true
  }
};

export const Masking: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '1rem', maxWidth: 480 }}>
      <DynInput label="Phone" mask={MASK_PATTERNS.phone} placeholder="(11) 9999-9999" />
      <DynInput label="CPF" mask={MASK_PATTERNS.cpf} placeholder="000.000.000-00" />
      <DynInput label="Credit Card" mask={MASK_PATTERNS.creditCard} placeholder="0000 0000 0000 0000" />
    </div>
  )
};

export const Types: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '1rem', maxWidth: 480 }}>
      <DynInput label="Email" type="email" placeholder="email@example.com" />
      <DynInput label="Password" type="password" placeholder="••••••••" />
      <DynInput label="Age" type="number" placeholder="18" min={0} max={120} />
      <DynInput label="Phone" type="tel" placeholder="" />
    </div>
  )
};

export const Currency: Story = {
  args: {
    label: 'Amount',
    type: 'currency',
    value: 1234.56,
    showSpinButtons: true,
    step: 50,
    min: 0,
    currencyConfig: {
      symbol: '$',
      currencyCode: 'USD',
      decimalSeparator: '.',
      thousandSeparator: ',',
      precision: 2
    }
  }
};

export const NumberWithSpinButtons: Story = {
  args: {
    label: 'Quantity',
    type: 'number',
    value: 2,
    step: 1,
    min: 0,
    max: 10,
    showSpinButtons: true
  }
};

export const DarkTheme: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: () => (
    <div data-theme="dark" style={{ padding: '2rem', background: '#1a1a1a', borderRadius: 8 }}>
      <div style={{ display: 'grid', gap: '1rem', maxWidth: 480 }}>
        <DynInput label="Email" type="email" placeholder="email@example.com" />
        <DynInput label="With Error" errorMessage="Error" />
        <DynInput label="Readonly" readonly value="Read only" />
      </div>
    </div>
  )
};

