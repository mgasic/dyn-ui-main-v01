import type { Meta, StoryObj } from '@storybook/react';
import { DinComponentTemplate } from './DinComponentTemplate';

const meta = {
  title: 'Components/DinComponentTemplate',
  component: DinComponentTemplate,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Opis komponente sa detaljima o korišćenju.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DinComponentTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default story - Primary variant, medium size
 */
export const Default: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    children: 'Component Content',
  },
};

/**
 * Primary variant - Koristi se za glavne akcije
 */
export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    children: 'Primary Action',
  },
};

/**
 * Secondary variant - Koristi se za sekundarne akcije
 */
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    children: 'Secondary Action',
  },
};

/**
 * Tertiary variant - Koristi se za terciarne akcije
 */
export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    size: 'medium',
    children: 'Tertiary Action',
  },
};

/**
 * Small size - Za kompaktne layout-e
 */
export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'small',
    children: 'Small',
  },
};

/**
 * Large size - Za istaknute akcije
 */
export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'large',
    children: 'Large Action',
  },
};

/**
 * Disabled state - Neaktivna komponenta
 */
export const Disabled: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    disabled: true,
    children: 'Disabled',
  },
};

/**
 * All variants side-by-side
 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '10px', padding: '20px' }}>
      <DinComponentTemplate variant="primary">Primary</DinComponentTemplate>
      <DinComponentTemplate variant="secondary">Secondary</DinComponentTemplate>
      <DinComponentTemplate variant="tertiary">Tertiary</DinComponentTemplate>
    </div>
  ),
};

/**
 * All sizes side-by-side
 */
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '10px', padding: '20px', alignItems: 'center' }}>
      <DinComponentTemplate size="small">Small</DinComponentTemplate>
      <DinComponentTemplate size="medium">Medium</DinComponentTemplate>
      <DinComponentTemplate size="large">Large</DinComponentTemplate>
    </div>
  ),
};

/**
 * Dark mode preview
 */
export const DarkMode: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    children: 'Dark Mode',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};
