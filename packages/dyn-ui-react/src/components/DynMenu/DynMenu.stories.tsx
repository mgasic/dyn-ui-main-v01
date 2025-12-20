/**
 * DynMenu Storybook Stories - FIXED VERSION
 * Interactive examples and documentation for navigation menu component
 *
 * FIXED: Removed non-existent props like 'menus', 'collapsed', 'filter', etc.
 * Now using only the actual implemented props: 'items', 'orientation', 'onAction'
 */

import type { Meta, StoryObj } from '@storybook/react-vite';
import { DynMenu } from './DynMenu';
import { DynMenuItem } from './DynMenu.types';
import React from 'react';

const meta: Meta<typeof DynMenu> = {
  title: 'Navigation/DynMenu',
  component: DynMenu,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
The DynMenu component provides a hierarchical navigation menu system with:

- **Horizontal/Vertical Orientation** - Support for both menu directions
- **Hierarchical structure** - Support for nested menu items with children
- **Keyboard navigation** - Full keyboard support (arrow keys, enter, escape)
- **ARIA support** - Full accessibility with proper ARIA attributes
- **Responsive design** - Works on all screen sizes
- **Action callbacks** - Execute actions when menu items are clicked

## Usage

\`\`\`tsx
import { DynMenu } from '@dyn-ui/react';

const menuItems = [
  {
    label: 'File',
    children: [
      { label: 'New', action: () => console.log('New') },
      { label: 'Open', action: () => console.log('Open') }
    ]
  },
  {
    label: 'Edit',
    children: [
      { label: 'Copy', action: () => console.log('Copy') },
      { label: 'Paste', action: () => console.log('Paste') }
    ]
  }
];

<DynMenu items={menuItems} orientation="horizontal" />
\`\`\`
        `
      }
    }
  },
  argTypes: {
    items: {
      description: 'Array of menu items with hierarchical structure',
      control: { type: 'object' }
    },
    orientation: {
      description: 'Menu orientation (horizontal or vertical)',
      control: { type: 'radio', options: ['horizontal', 'vertical'] }
    },
    onAction: {
      description: 'Callback fired when a menu item action is executed',
      action: 'action'
    }
  }
};

export default meta;
type Story = StoryObj<typeof DynMenu>;

// ====== Sample Menu Data ======

// Horizontal menu - File/Edit/View/Help style
const horizontalMenuItems: DynMenuItem[] = [
  {
    label: 'File',
    children: [
      {
        label: 'New',
        action: () => console.log('File > New')
      },
      {
        label: 'Open',
        action: () => console.log('File > Open')
      },
      {
        label: 'Save',
        action: () => console.log('File > Save')
      },
      {
        label: 'Exit',
        action: () => console.log('File > Exit')
      }
    ]
  },
  {
    label: 'Edit',
    children: [
      {
        label: 'Undo',
        action: () => console.log('Edit > Undo')
      },
      {
        label: 'Redo',
        action: () => console.log('Edit > Redo')
      },
      {
        label: 'Cut',
        action: () => console.log('Edit > Cut')
      },
      {
        label: 'Copy',
        action: () => console.log('Edit > Copy')
      },
      {
        label: 'Paste',
        action: () => console.log('Edit > Paste')
      }
    ]
  },
  {
    label: 'View',
    children: [
      {
        label: 'Zoom In',
        action: () => console.log('View > Zoom In')
      },
      {
        label: 'Zoom Out',
        action: () => console.log('View > Zoom Out')
      },
      {
        label: 'Reset Zoom',
        action: () => console.log('View > Reset Zoom')
      }
    ]
  },
  {
    label: 'Help',
    children: [
      {
        label: 'Documentation',
        action: () => console.log('Help > Documentation')
      },
      {
        label: 'About',
        action: () => console.log('Help > About')
      }
    ]
  }
];

// Vertical menu - Dashboard style
const verticalMenuItems: DynMenuItem[] = [
  {
    label: 'Dashboard',
    action: () => console.log('Dashboard')
  },
  {
    label: 'Products',
    children: [
      {
        label: 'All Products',
        action: () => console.log('All Products')
      },
      {
        label: 'Categories',
        action: () => console.log('Categories')
      },
      {
        label: 'Inventory',
        action: () => console.log('Inventory')
      }
    ]
  },
  {
    label: 'Orders',
    children: [
      {
        label: 'Pending Orders',
        action: () => console.log('Pending Orders')
      },
      {
        label: 'Completed Orders',
        action: () => console.log('Completed Orders')
      }
    ]
  },
  {
    label: 'Customers',
    action: () => console.log('Customers')
  },
  {
    label: 'Settings',
    action: () => console.log('Settings')
  }
];

// Simple menu without submenus
const simpleMenuItems: DynMenuItem[] = [
  {
    label: 'Home',
    action: () => console.log('Home')
  },
  {
    label: 'About',
    action: () => console.log('About')
  },
  {
    label: 'Services',
    action: () => console.log('Services')
  },
  {
    label: 'Contact',
    action: () => console.log('Contact')
  }
];

// ====== Stories ======

/**
 * Default horizontal menu with nested items
 */
export const HorizontalMenu: Story = {
  args: {
    items: horizontalMenuItems,
    orientation: 'horizontal'
  }
};

/**
 * Vertical menu suitable for sidebars
 */
export const VerticalMenu: Story = {
  args: {
    items: verticalMenuItems,
    orientation: 'vertical'
  }
};

/**
 * Simple flat menu without submenus
 */
export const SimpleMenu: Story = {
  args: {
    items: simpleMenuItems,
    orientation: 'horizontal'
  }
};

/**
 * Menu with action handler callback
 */
export const WithActionHandler: Story = {
  args: {
    items: horizontalMenuItems,
    orientation: 'horizontal',
    onAction: (item: string | DynMenuItem) => {
      if (typeof item === 'string') {
        console.log('Menu action:', item);
      } else if (item.action) {
        if (typeof item.action === 'function') {
          item.action();
        } else {
          console.log('Menu action:', item.action);
        }
      }
    }
  }
};

/**
 * Vertical sidebar-style menu
 */
export const SidebarMenu: Story = {
  parameters: {
    layout: 'fullscreen'
  },
  render: () => (
    <div style={{ display: 'flex', height: '400px' }}>
      <aside style={{ width: '250px', borderRight: '1px solid #eee', padding: '16px' }}>
        <h3>Navigation</h3>
        <DynMenu
          items={verticalMenuItems}
          orientation="vertical"
          onAction={(action) => {
            if (typeof action === 'function') {
              (action as () => void)();
            }
          }}
        />
      </aside>
      <main style={{ flex: 1, padding: '16px' }}>
        <p>Content area...</p>
      </main>
    </div>
  )
};

/**
 * Simple navigation bar
 */
export const NavigationBar: Story = {
  parameters: {
    layout: 'fullscreen'
  },
  render: () => (
    <nav style={{ borderBottom: '1px solid #eee', padding: '12px 16px', background: '#f9f9f9' }}>
      <DynMenu
        items={simpleMenuItems}
        orientation="horizontal"
        onAction={(action) => {
            if (typeof action === 'function') {
              (action as () => void)();
            }
          }}
      />
    </nav>
  )
};
