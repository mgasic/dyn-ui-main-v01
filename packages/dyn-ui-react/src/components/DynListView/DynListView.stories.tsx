import type { Meta, StoryObj } from '@storybook/react-vite';
import DynListView from './DynListView';
import { DynListViewProps, ListAction } from './DynListView.types';

const meta: Meta<typeof DynListView> = {
  title: 'Data Display/DynListView',
  component: DynListView,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A flexible list component for displaying and managing collections of data with built-in selection, actions, and expansion capabilities.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    data: {
      description: 'Array of data items to display in the list'
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size variant of the list items'
    },
    selectable: {
      control: 'boolean',
      description: 'Enable item selection with checkboxes'
    },
    bordered: {
      control: 'boolean',
      description: 'Show borders around the list'
    },
    dividers: {
      control: 'boolean',
      description: 'Show dividers between list items'
    },
    striped: {
      control: 'boolean',
      description: 'Show alternating background colors (zebra pattern)'
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state'
    },
    height: {
      control: { type: 'number' },
      description: 'Fixed height for scrollable list'
    },
    emptyText: {
      control: 'text',
      description: 'Text to show when no data is available'
    },
    loadingText: {
      control: 'text',
      description: 'Text shown during loading state'
    },
    selectAllText: {
      control: 'text',
      description: 'Text for the "Select All" checkbox'
    },
  },
};

export default meta;
type Story = StoryObj<typeof DynListView>;

// Sample data
const sampleData = [
  { id: 1, title: 'Task 1', description: 'Complete project documentation', priority: 'High', status: 'In Progress' },
  { id: 2, title: 'Task 2', description: 'Review code changes', priority: 'Medium', status: 'Pending' },
  { id: 3, title: 'Task 3', description: 'Update dependencies', priority: 'Low', status: 'Completed' },
  { id: 4, title: 'Task 4', description: 'Fix reported bugs', priority: 'High', status: 'In Progress' },
  { id: 5, title: 'Task 5', description: 'Optimize performance', priority: 'Medium', status: 'Pending' },
];

const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', active: true },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', active: true },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', active: false },
];

const sampleActions: ListAction[] = [
  {
    key: 'edit',
    title: 'Edit',
    onClick: (item) => alert(`Edit ${item.title || item.name}`),
  },
  {
    key: 'delete',
    title: 'Delete',
    type: 'danger',
    onClick: (item) => alert(`Delete ${item.title || item.name}`),
  },
];

// Default story
export const Default: Story = {
  args: {
    data: sampleData,
    size: 'medium',
    bordered: true,
    selectable: false,
    loading: false,
  },
};

// With Selection
export const WithSelection: Story = {
  args: {
    ...Default.args,
    selectable: true,
    selectedKeys: ['1', '3'],
    onSelectionChange: (keys, items) => {
      console.log('Selected keys:', keys);
      console.log('Selected items:', items);
    },
  },
};

// With Actions
export const WithActions: Story = {
  args: {
    ...Default.args,
    actions: sampleActions,
  },
};

// Small Size
export const SmallSize: Story = {
  args: {
    ...Default.args,
    size: 'small',
    data: users,
  },
};

// Large Size
export const LargeSize: Story = {
  args: {
    ...Default.args,
    size: 'large',
    data: users,
  },
};

// Loading State
export const Loading: Story = {
  args: {
    ...Default.args,
    loading: true,
  },
};

// Empty State
export const Empty: Story = {
  args: {
    ...Default.args,
    data: [],
  },
};

// Custom Empty Text
export const CustomEmptyText: Story = {
  args: {
    ...Default.args,
    data: [],
    emptyText: 'No tasks found. Create your first task to get started!',
  },
};

// Fixed Height (Scrollable)
export const FixedHeight: Story = {
  args: {
    ...Default.args,
    height: 300,
    data: [
      ...sampleData.map(item => ({ ...item, id: `${item.id}-1` })),
      ...sampleData.map(item => ({ ...item, id: `${item.id}-2` })),
      ...sampleData.map(item => ({ ...item, id: `${item.id}-3` }))
    ],
  },
};

// Custom Render Item
export const CustomRenderItem: Story = {
  args: {
    ...Default.args,
    data: users,
    renderItem: (user) => (
      <div style={{ padding: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: user.active ? '#22c55e' : '#ef4444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            {user.name.charAt(0)}
          </div>
          <div>
            <div style={{ fontWeight: '600' }}>{user.name}</div>
            <div style={{ fontSize: '14px', color: '#666' }}>{user.email}</div>
            <div style={{ fontSize: '12px', color: '#999' }}>
              {user.role} • {user.active ? 'Active' : 'Inactive'}
            </div>
          </div>
        </div>
      </div>
    ),
  },
};

// All Features Combined
export const AllFeatures: Story = {
  args: {
    data: sampleData,
    size: 'medium',
    selectable: true,
    bordered: true,
    actions: sampleActions,
    height: 400,
    onSelectionChange: (keys, items) => {
      console.log('Selection changed:', { keys, items });
    },
  },
};

// With Dividers
export const WithDividers: Story = {
  args: {
    data: sampleData,
    size: 'medium',
    bordered: true,
    dividers: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'List items with dividers between them for improved visual separation.'
      }
    }
  }
};

// Striped Variant
export const Striped: Story = {
  args: {
    data: sampleData,
    size: 'medium',
    bordered: true,
    striped: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Alternating background colors (zebra pattern) for better scannability.'
      }
    }
  }
};

// Dividers with Selection
export const DividersWithSelection: Story = {
  args: {
    data: sampleData,
    size: 'medium',
    bordered: true,
    dividers: true,
    selectable: true,
  },
};

// Striped with Actions
export const StripedWithActions: Story = {
  args: {
    data: sampleData,
    size: 'medium',
    bordered: true,
    striped: true,
    actions: sampleActions,
  },
};

// Localized Text
export const LocalizedText: Story = {
  args: {
    data: [],
    bordered: true,
    loading: false,
    emptyText: 'Nema dostupnih podataka',
    loadingText: 'Učitavanje...',
    selectAllText: 'Izaberi sve',
  },
  parameters: {
    docs: {
      description: {
        story: 'Example with localized (Serbian) text for internationalization support.'
      }
    }
  }
};

// Loading with Custom Text
export const LoadingCustomText: Story = {
  args: {
    data: [],
    bordered: true,
    loading: true,
    loadingText: 'Please wait, loading data...',
  },
};

// Combined Variants (Dividers + Striped)
export const CombinedVariants: Story = {
  args: {
    data: [
      ...sampleData.map(item => ({ ...item, id: `${item.id}-1` })),
      ...sampleData.map(item => ({ ...item, id: `${item.id}-2` }))
    ],
    size: 'medium',
    bordered: true,
    dividers: true,
    striped: true,
    height: 400,
  },
  parameters: {
    docs: {
      description: {
        story: 'Both dividers and striped enabled for maximum visual distinction.'
      }
    }
  }
};
