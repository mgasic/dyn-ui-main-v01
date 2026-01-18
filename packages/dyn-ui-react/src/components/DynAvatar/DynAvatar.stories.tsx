import type { Meta, StoryObj } from '@storybook/react';
import { DynAvatar } from './DynAvatar';
import type { DynAvatarProps } from './DynAvatar.types';

const meta: Meta<typeof DynAvatar> = {
  title: 'Components/DynAvatar',
  component: DynAvatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Avatar component aligned with design token system.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    alt: {
      control: { type: 'text' },
      description: 'Alt text for accessibility',
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Avatar size using design token scale',
    },
    shape: {
      control: { type: 'select' },
      options: ['circle', 'square', 'rounded'],
      description: 'Avatar shape variant',
    },
    status: {
      control: { type: 'select' },
      options: ['online', 'offline', 'busy', 'away'],
      description: 'Status indicator',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Loading state - shows only spinner',
    },
    error: {
      control: { type: 'boolean' },
      description: 'Error state',
    },
  },
};

export default meta;
type Story = StoryObj<DynAvatarProps>;

export const Default: Story = {
  args: {
    alt: 'User Avatar',
    initials: 'JD',
    size: 'md',
  },
};

export const WithImage: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    alt: 'John Doe',
    size: 'md',
  },
};

export const Interactive: Story = {
  args: {
    alt: 'Clickable Avatar',
    initials: 'CU',
    size: 'lg',
    onClick: () => alert('Avatar clicked!'),
  },
};

export const Loading: Story = {
  args: {
    alt: 'Avatar',
    loading: true,
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Loading state shows only the animated spinner. Initials and images are hidden.',
      },
    },
  },
};

export const AllSizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <DynAvatar {...args} size="xs" alt="XS" initials="XS" />
      <DynAvatar {...args} size="sm" alt="SM" initials="SM" />
      <DynAvatar {...args} size="md" alt="MD" initials="MD" />
      <DynAvatar {...args} size="lg" alt="LG" initials="LG" />
      <DynAvatar {...args} size="xl" alt="XL" initials="XL" />
    </div>
  ),
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'All available sizes using design token scale.',
      },
    },
  },
};

export const AllStatuses: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <DynAvatar {...args} status="online" alt="Online" initials="ON" />
      <DynAvatar {...args} status="away" alt="Away" initials="AW" />
      <DynAvatar {...args} status="busy" alt="Busy" initials="BU" />
      <DynAvatar {...args} status="offline" alt="Offline" initials="OF" />
    </div>
  ),
  args: {
    size: 'lg',
  },
  parameters: {
    docs: {
      description: {
        story: 'All status indicators with semantic meaning.',
      },
    },
  },
};

export const LoadingStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <DynAvatar alt="Loading XS" loading size="xs" />
      <DynAvatar alt="Loading SM" loading size="sm" />
      <DynAvatar alt="Loading MD" loading size="md" />
      <DynAvatar alt="Loading LG" loading size="lg" />
      <DynAvatar alt="Loading XL" loading size="xl" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Loading spinners across all sizes.',
      },
    },
  },
};

export const AllShapes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <DynAvatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          alt="Circle"
          shape="circle"
          size="lg"
        />
        <div style={{ marginTop: '0.5rem', fontSize: '12px', color: '#666' }}>circle</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <DynAvatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          alt="Rounded"
          shape="rounded"
          size="lg"
        />
        <div style={{ marginTop: '0.5rem', fontSize: '12px', color: '#666' }}>rounded</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <DynAvatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          alt="Square"
          shape="square"
          size="lg"
        />
        <div style={{ marginTop: '0.5rem', fontSize: '12px', color: '#666' }}>square</div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All shape variants: circle (default), rounded, and square.',
      },
    },
  },
};

export const WithBadge: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <DynAvatar
          alt="Notifications"
          initials="JD"
          badge={5}
          size="lg"
        />
        <div style={{ marginTop: '0.5rem', fontSize: '12px', color: '#666' }}>Simple number</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <DynAvatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          alt="Messages"
          badge={{ content: '99+', color: 'danger', variant: 'solid' }}
          size="lg"
        />
        <div style={{ marginTop: '0.5rem', fontSize: '12px', color: '#666' }}>Config object</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <DynAvatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          alt="Verified"
          badge={<span style={{ fontSize: '10px' }}>✓</span>}
          size="lg"
        />
        <div style={{ marginTop: '0.5rem', fontSize: '12px', color: '#666' }}>Custom element</div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badge overlay with different configurations: simple number, config object with DynBadge props, and custom React element.',
      },
    },
  },
};

export const ErrorState: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
      <DynAvatar alt="Error" error size="md" initials="ER" />
      <DynAvatar alt="Error Large" error size="lg" initials="EL" />
      <DynAvatar
        src="https://invalid-url-that-will-fail.jpg"
        alt="Failed Image"
        size="lg"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Error states: explicit error prop and image load failure with automatic fallback.',
      },
    },
  },
};

export const CustomFallback: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <DynAvatar
          alt="Custom Icon"
          size="lg"
          fallback={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
            </svg>
          }
        />
        <div style={{ marginTop: '0.5rem', fontSize: '12px', color: '#666' }}>Custom SVG</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <DynAvatar
          alt="Emoji"
          size="lg"
          fallback={<span style={{ fontSize: '24px' }}>👤</span>}
        />
        <div style={{ marginTop: '0.5rem', fontSize: '12px', color: '#666' }}>Emoji</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <DynAvatar alt="Children" size="lg">
          <span style={{ fontSize: '20px', fontWeight: 'bold' }}>?</span>
        </DynAvatar>
        <div style={{ marginTop: '0.5rem', fontSize: '12px', color: '#666' }}>Children prop</div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Custom fallback content: SVG icon, emoji, or children prop.',
      },
    },
  },
};

export const LazyLoading: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    alt: 'Lazy Loaded Avatar',
    size: 'lg',
    imageLoading: 'lazy',
  },
  parameters: {
    docs: {
      description: {
        story: 'Avatar with lazy image loading strategy for performance optimization.',
      },
    },
  },
};

export const AvatarGroup: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ display: 'flex' }}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} style={{ marginLeft: i === 1 ? 0 : '-12px' }}>
            <DynAvatar
              src={`https://i.pravatar.cc/150?img=${i + 10}`}
              alt={`User ${i}`}
              size="md"
              style={{
                border: '2px solid white',
                boxShadow: '0 0 0 1px rgba(0,0,0,0.1)'
              }}
            />
          </div>
        ))}
        <div style={{ marginLeft: '-12px' }}>
          <DynAvatar
            alt="+3 more"
            initials="+3"
            size="md"
            style={{
              border: '2px solid white',
              boxShadow: '0 0 0 1px rgba(0,0,0,0.1)'
            }}
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Avatar group composition showing overlapping avatars with "+N more" indicator.',
      },
    },
  },
};

export const WithImageErrorCallback: Story = {
  render: () => (
    <DynAvatar
      src="https://invalid-url.jpg"
      alt="Error Callback"
      size="lg"
      loadTimeout={3000}
      onImageError={(e) => {
        console.log('Image error:', e);
        // In real app, could log to analytics
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Avatar with custom loadTimeout (3s) and onImageError callback for error handling.',
      },
    },
  },
};

