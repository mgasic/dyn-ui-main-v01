import type { Meta, StoryObj } from '@storybook/react';
import { DynTextArea } from './DynTextArea';

const meta: Meta<typeof DynTextArea> = {
  title: 'Form/DynTextArea',
  component: DynTextArea,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Dynamic textarea component with validation, resize control, and WCAG 2.1 AA support. Uses DynFieldContainer for consistent alignment of labels and error messages.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
      description: 'Determines the resize behavior',
    },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    required: { control: 'boolean' },
    optional: { control: 'boolean' },
    rows: { control: 'number' },
    cols: { control: 'number' },
    placeholder: { control: 'text' },
    help: { control: 'text' },
  },
  args: {
    label: 'Description',
    placeholder: 'Enter a detailed description...',
    rows: 4,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    help: 'You can use markdown syntax for formatting.',
  },
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '1rem', maxWidth: 640 }}>
      <DynTextArea label="Basic" placeholder="Standard field" />
      <DynTextArea label="Required" required placeholder="You must fill this field" />
      <DynTextArea label="With Error" errorMessage="Invalid description" value="some text" />
      <DynTextArea label="Disabled" disabled value="Disabled input" />
      <DynTextArea label="Read Only" readonly value="Display only content" />
    </div>
  ),
};

export const ResizeOptions: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '1rem', maxWidth: 640 }}>
      <DynTextArea label="No Resize" resize="none" placeholder="Resize disabled" />
      <DynTextArea label="Horizontal" resize="horizontal" rows={3} />
      <DynTextArea label="Vertical" resize="vertical" rows={6} />
      <DynTextArea label="Both Directions" resize="both" rows={5} />
    </div>
  ),
};

export const DarkTheme: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  render: () => (
    <div data-theme="dark" style={{ padding: '2rem', background: '#111827', borderRadius: 12 }}>
      <div style={{ display: 'grid', gap: '1rem', maxWidth: 640 }}>
        <DynTextArea label="Description" placeholder="Enter details" />
        <DynTextArea label="With Error" errorMessage="Error" value="Description" />
        <DynTextArea label="Tip" help="Help text in dark mode" />
      </div>
    </div>
  ),
};
