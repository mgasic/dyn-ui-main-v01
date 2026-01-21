import type { Meta, StoryObj } from '@storybook/react';
import DynIcon from './DynIcon';
import { IconDictionaryProvider } from '../../providers/IconDictionaryProvider';

const meta: Meta<typeof DynIcon> = {
  title: 'Components/DynIcon',
  component: DynIcon,
  decorators: [
    Story => (
      <IconDictionaryProvider>
        <div style={{ padding: '2rem', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <Story />
        </div>
      </IconDictionaryProvider>
    ),
  ],
  argTypes: {
    icon: {
      control: 'text',
      description: 'Dictionary key, class string, or icon identifier',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'small', 'medium', 'large'],
    },
    tone: {
      control: 'select',
      options: ['success', 'warning', 'danger', 'info', undefined],
    },
    strokeWidth: {
      control: { type: 'range', min: 0.5, max: 4, step: 0.5 },
    },
    mirror: {
      control: 'select',
      options: [undefined, 'horizontal', 'vertical', 'both'],
    },
    spin: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    onClick: { action: 'clicked' },
  },
  args: {
    icon: 'ok',
    size: 'md',
    spin: false,
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof DynIcon>;

export const Sizes: Story = {
  render: () => (
    <>
      <DynIcon icon="check" size="xs" />
      <DynIcon icon="check" size="sm" />
      <DynIcon icon="check" size="md" />
      <DynIcon icon="check" size="lg" />
      <DynIcon icon="check" size="xl" />
    </>
  ),
};

export const StrokeWeights: Story = {
  render: () => (
    <>
      <DynIcon icon="close" size="xl" strokeWidth={1} />
      <DynIcon icon="close" size="xl" strokeWidth={2} />
      <DynIcon icon="close" size="xl" strokeWidth={3} />
      <DynIcon icon="close" size="xl" strokeWidth={4} />
    </>
  ),
};

export const Mirroring: Story = {
  render: () => (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <p>Original</p>
        <DynIcon icon="warning" size="xl" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <p>Horizontal</p>
        <DynIcon icon="warning" size="xl" mirror="horizontal" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <p>Vertical</p>
        <DynIcon icon="warning" size="xl" mirror="vertical" />
      </div>
    </>
  ),
};

export const Interactive: Story = {
  args: {
    icon: 'search',
    size: 'xl',
    onClick: () => alert('Clicked!'),
  },
};
