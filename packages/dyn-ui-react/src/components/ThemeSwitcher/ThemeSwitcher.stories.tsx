import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeSwitcher } from './ThemeSwitcher';
import { ThemeProvider } from '../../theme/ThemeProvider';

const meta: Meta<typeof ThemeSwitcher> = {
  title: 'Utilities/ThemeSwitcher',
  component: ThemeSwitcher,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A theme switcher component that allows users to toggle between light, dark, and system themes.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [(Story) => <ThemeProvider><Story /></ThemeProvider>],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'Size of the switcher buttons',
    },
    rounded: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'full'],
      description: 'Border radius of the container',
    },
    themes: {
      control: 'object',
      description: 'Available themes to display',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ThemeSwitcher>;

export const Default: Story = {
  args: {},
};

export const WithCustomLabels: Story = {
  args: {
    labels: {
      light: '☀️ Light',
      dark: '🌙 Dark',
      system: '💻 System'
    },
  },
};

export const LightDarkOnly: Story = {
  args: {
    themes: ['light', 'dark'],
    labels: { light: 'Light', dark: 'Dark', system: 'System' },
  },
};

export const SizeSmall: Story = {
  args: {
    size: 'sm',
    labels: { light: 'Light', dark: 'Dark', system: 'System' },
  },
};

export const SizeMedium: Story = {
  args: {
    size: 'md',
    labels: { light: 'Light', dark: 'Dark', system: 'System' },
  },
};

export const RoundedFull: Story = {
  args: {
    rounded: 'full',
    labels: { light: 'Light', dark: 'Dark', system: 'System' },
  },
};

export const RoundedSmall: Story = {
  args: {
    rounded: 'sm',
    labels: { light: 'Light', dark: 'Dark', system: 'System' },
  },
};

export const WithIcons: Story = {
  args: {
    labels: {
      light: '☀️',
      dark: '🌙',
      system: '🖥️'
    },
  },
};

export const Compact: Story = {
  args: {
    size: 'sm',
    rounded: 'full',
    themes: ['light', 'dark'],
    labels: { light: 'L', dark: 'D', system: 'S' },
  },
};

export const WithCallback: Story = {
  args: {
    labels: { light: 'Light', dark: 'Dark', system: 'System' },
    onChange: (theme) => {
      console.log('Theme changed to:', theme);
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <p style={{ marginBottom: '8px', fontWeight: 500 }}>Size: sm</p>
        <ThemeProvider>
          <ThemeSwitcher size="sm" />
        </ThemeProvider>
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontWeight: 500 }}>Size: md</p>
        <ThemeProvider>
          <ThemeSwitcher size="md" />
        </ThemeProvider>
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontWeight: 500 }}>Rounded: full</p>
        <ThemeProvider>
          <ThemeSwitcher rounded="full" />
        </ThemeProvider>
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontWeight: 500 }}>With Icons</p>
        <ThemeProvider>
          <ThemeSwitcher labels={{ light: '☀️', dark: '🌙', system: '🖥️' }} />
        </ThemeProvider>
      </div>
    </div>
  ),
};
