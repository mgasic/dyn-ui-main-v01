import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { DynResponsiveTabs } from './DynResponsiveTabs';
import type { DynResponsiveTabItem } from './DynResponsiveTabs.types';

const meta: Meta<typeof DynResponsiveTabs> = {
  title: 'Components/DynResponsiveTabs',
  component: DynResponsiveTabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'DynResponsiveTabs is a flexible tabs component that automatically transforms into an accordion on smaller screens. It supports nested tabs composition, keyboard navigation, and full accessibility features. The component follows WCAG 2.1 AA guidelines and integrates seamlessly with the DYN UI design token system.\n\n## Features\n\n- **Responsive Design**: Automatically switches between tabs and accordion based on viewport\n- **Multiple Orientations**: Horizontal and vertical tab layouts\n- **Nested Tabs Support**: Compose complex layouts with parent and child tab groups\n- **Keyboard Navigation**: Arrow keys, Home, and End key support\n- **Full Accessibility**: WCAG 2.1 AA compliant with proper ARIA attributes\n- **Design Tokens**: Consistent theming with light and dark mode support\n- **Icon Support**: String icon names or custom React nodes\n- **Flexible Content**: Support for any React content including nested components',
      },
    },
  },
  argTypes: {
    tabs: {
      description: 'Array of tab items with label, content, icon, and disabled state',
      control: 'object',
    },
    defaultActive: {
      control: 'number',
      description: 'Index of initially active tab',
      table: {
        defaultValue: { summary: '0' },
      },
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Tab orientation layout',
      table: {
        defaultValue: { summary: 'horizontal' },
      },
    },
    responsive: {
      control: 'boolean',
      description: 'Enable responsive behavior (tabs to accordion)',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    breakpoint: {
      control: 'number',
      description: 'Breakpoint in pixels for switching to accordion',
      table: {
        defaultValue: { summary: '768' },
      },
    },
    allowCollapse: {
      control: 'boolean',
      description: 'Allow collapsing active accordion item',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    tabIdentifier: {
      control: 'text',
      description: 'Unique identifier for nested tab groups',
    },
    'aria-label': {
      control: 'text',
      description: 'Accessible label for tab list',
    },
    onChange: {
      action: 'tab changed',
      description: 'Callback when active tab changes',
    },
  },
  args: {
    defaultActive: 0,
    orientation: 'horizontal',
    responsive: true,
    breakpoint: 768,
    allowCollapse: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample tabs data
const sampleTabs: DynResponsiveTabItem[] = [
  {
    label: 'Overview',
    icon: 'home',
    content: (
      <div>
        <h3>Overview Content</h3>
        <p>This is the overview section with important information about the product.</p>
        <p>
          The responsive tabs component automatically adapts to different screen sizes,
          providing an optimal user experience on both desktop and mobile devices.
        </p>
      </div>
    ),
  },
  {
    label: 'Features',
    icon: 'star',
    content: (
      <div>
        <h3>Features</h3>
        <ul>
          <li>Responsive design that adapts to screen size</li>
          <li>Accessible by default with ARIA support</li>
          <li>Design token integration for consistent theming</li>
          <li>Dark mode ready out of the box</li>
          <li>Keyboard navigation support</li>
          <li>Nested tabs composition capability</li>
        </ul>
      </div>
    ),
  },
  {
    label: 'Documentation',
    icon: 'book',
    content: (
      <div>
        <h3>Documentation</h3>
        <p>Comprehensive documentation for developers and designers.</p>
        <p>
          Find detailed API references, usage examples, and best practices
          in our documentation portal.
        </p>
      </div>
    ),
  },
  {
    label: 'Settings',
    icon: 'settings',
    content: (
      <div>
        <h3>Settings</h3>
        <p>Configure your preferences and customize the component behavior.</p>
        <p>All settings are persisted and synchronized across sessions.</p>
      </div>
    ),
  },
];

/**
 * The default tabs configuration with horizontal orientation.
 */
export const Default: Story = {
  args: {
    tabs: sampleTabs,
    defaultActive: 0,
    orientation: 'horizontal',
    responsive: true,
  },
};

/**
 * Vertical orientation for sidebar navigation patterns.
 */
export const Vertical: Story = {
  args: {
    tabs: sampleTabs,
    orientation: 'vertical',
    responsive: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Vertical tabs are ideal for sidebar navigation or when you have many tab items that would overflow horizontally.',
      },
    },
  },
};

/**
 * Non-responsive tabs that maintain their layout on all screen sizes.
 */
export const NonResponsive: Story = {
  args: {
    tabs: sampleTabs,
    responsive: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Disable responsive behavior to keep tabs layout consistent across all viewports.',
      },
    },
  },
};

/**
 * Accordion mode with collapsible panels (view on mobile or narrow viewport).
 */
export const WithCollapse: Story = {
  args: {
    tabs: sampleTabs,
    responsive: true,
    allowCollapse: true,
    breakpoint: 768,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'In accordion mode, allow users to collapse the active panel by clicking its header again. Switch to mobile viewport or narrow your browser to see this in action.',
      },
    },
  },
};

/**
 * Accordion mode forced (always visible) with collapse functionality.
 */
export const AccordionWithCollapse: Story = {
  render: () => {
    const tabs: DynResponsiveTabItem[] = [
      {
        label: 'Section 1',
        icon: 'folder',
        content: (
          <div style={{ padding: '1rem' }}>
            <h4>Section 1 Content</h4>
            <p>This section can be collapsed by clicking the header again.</p>
            <p>Try clicking the same section header to close it.</p>
          </div>
        ),
      },
      {
        label: 'Section 2',
        icon: 'document',
        content: (
          <div style={{ padding: '1rem' }}>
            <h4>Section 2 Content</h4>
            <p>All sections can be closed simultaneously with allowCollapse enabled.</p>
          </div>
        ),
      },
      {
        label: 'Section 3',
        icon: 'settings',
        content: (
          <div style={{ padding: '1rem' }}>
            <h4>Section 3 Content</h4>
            <p>Click any header to toggle its content visibility.</p>
          </div>
        ),
      },
    ];

    return (
      <div>
        <div
          style={{
            padding: '1rem',
            marginBottom: '1rem',
            backgroundColor: 'var(--dyn-color-surface-secondary, #f9fafb)',
            border: '1px solid var(--dyn-color-border-subtle, #e5e7eb)',
            borderRadius: '0.25rem',
          }}
        >
          <strong>📱 Accordion Mode Active</strong>
          <p style={{ fontSize: '0.875rem', margin: '0.5rem 0 0 0' }}>
            This example is forced to accordion mode with collapse enabled.
            Click any section header to expand/collapse it. Click again to close.
          </p>
        </div>
        <DynResponsiveTabs
          tabs={tabs}
          responsive={true}
          allowCollapse={true}
          breakpoint={99999} // Force accordion mode
          defaultActive={0}
          aria-label="Collapsible accordion example"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Accordion mode with `allowCollapse` enabled. Click any section header to toggle its visibility. ' +
          'When collapsed, all sections can be closed simultaneously. This is forced to accordion mode ' +
          'using a very high breakpoint value for demonstration purposes.',
      },
    },
  },
};

/**
 * Tabs with disabled state demonstration.
 */
export const WithDisabledTab: Story = {
  args: {
    tabs: sampleTabs.map((tab, index) => ({
      ...tab,
      disabled: index === 2,
    })),
  },
  parameters: {
    docs: {
      description: {
        story: 'Individual tabs can be disabled to prevent user interaction while maintaining visual context.',
      },
    },
  },
};

/**
 * Many tabs demonstrating overflow handling.
 */
export const ManyTabs: Story = {
  args: {
    tabs: Array.from({ length: 8 }, (_, i) => ({
      label: `Tab ${i + 1}`,
      content: (
        <div>
          <h3>Tab {i + 1} Content</h3>
          <p>This is the content for tab number {i + 1}.</p>
        </div>
      ),
    })),
  },
  parameters: {
    docs: {
      description: {
        story: 'When there are many tabs, the component handles overflow gracefully and adapts to mobile accordion view.',
      },
    },
  },
};

const childTabs1: DynResponsiveTabItem[] = [
  {
    label: 'Responsive Tab 1',
    content: (
      <div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nibh urna,
          euismod ut ornare non, volutpat vel tortor. Integer laoreet placerat suscipit.
          Sed sodales scelerisque commodo. Nam porta cursus lectus. Proin nunc erat,
          gravida a facilisis quis, ornare id lectus. Proin consectetur nibh quis urna
          gravida mollis.
        </p>
      </div>
    ),
  },
  {
    label: 'Responsive Tab 2',
    content: (
      <div>
        <p>
          Sed sodales scelerisque commodo. Nam porta cursus lectus. Proin nunc erat,
          gravida a facilisis quis, ornare id lectus. Proin consectetur nibh quis urna
          gravida mollis.
        </p>
      </div>
    ),
  },
  {
    label: 'Responsive Tab 3',
    content: (
      <div>
        <p>
          Suspendisse blandit velit Integer laoreet placerat suscipit. Sed sodales
          scelerisque commodo. Nam porta cursus lectus. Proin nunc erat, gravida a
          facilisis quis, ornare id lectus.
        </p>
      </div>
    ),
  },
  {
    label: 'Long name Responsive Tab 4',
    content: (
      <div>
        <p>
          Integer laoreet placerat suscipit. Sed sodales scelerisque commodo. Nam porta
          cursus lectus. Proin nunc erat, gravida a facilisis quis, ornare id lectus.
          Proin consectetur nibh quis urna gravida mollis.
        </p>
      </div>
    ),
  },
];

const childTabs2: DynResponsiveTabItem[] = [
  {
    label: 'Product Details',
    icon: 'info',
    content: (
      <div>
        <h4>Product Specifications</h4>
        <ul>
          <li>Dimension: 10 x 5 x 3 cm</li>
          <li>Weight: 250g</li>
          <li>Material: Premium ABS plastic</li>
          <li>Color: Midnight Black</li>
        </ul>
      </div>
    ),
  },
  {
    label: 'Pricing',
    icon: 'currency-dollar',
    content: (
      <div>
        <h4>Pricing Information</h4>
        <p>Standard: $99.99</p>
        <p>Premium: $149.99</p>
        <p>Enterprise: Contact sales</p>
      </div>
    ),
  },
  {
    label: 'Reviews',
    icon: 'star',
    content: (
      <div>
        <h4>Customer Reviews</h4>
        <p>⭐⭐⭐⭐⭐ 5.0 out of 5 stars (128 reviews)</p>
        <p>"Excellent product, highly recommended!"</p>
      </div>
    ),
  },
];

// Helper to create parent tabs dynamically if needed, or static
const getParentTabs = (orientation: 'horizontal' | 'vertical') => [
  {
    label: 'Horizontal 1',
    content: (
      <>
        <DynResponsiveTabs
          tabs={childTabs1}
          orientation="vertical"
          tabIdentifier="child-vertical-1"
          defaultActive={0}
          aria-label="Child vertical tabs group 1"
        />
        <div
          style={{
            marginTop: '1rem',
            padding: '1rem',
            border: '1px dashed var(--dyn-color-border-subtle, #e5e7eb)',
            borderRadius: '0.25rem',
            backgroundColor: 'var(--dyn-color-surface-secondary, #f9fafb)',
          }}
        >
          <strong>Child 1 Container</strong>
          <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
            This demonstrates how content can appear outside nested tabs
          </p>
        </div>
      </>
    ),
  },
  {
    label: 'Horizontal 2',
    content: (
      <>
        <DynResponsiveTabs
          tabs={childTabs2}
          orientation="vertical"
          tabIdentifier="child-vertical-2"
          defaultActive={0}
          aria-label="Child vertical tabs group 2"
        />
        <div
          style={{
            marginTop: '1rem',
            padding: '1rem',
            border: '1px dashed var(--dyn-color-border-subtle, #e5e7eb)',
            borderRadius: '0.25rem',
            backgroundColor: 'var(--dyn-color-surface-secondary, #f9fafb)',
          }}
        >
          <strong>Child 2 Container</strong>
          <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
            Different child tabs with icons and structured content
          </p>
        </div>
      </>
    ),
  },
  {
    label: 'Horizontal 3',
    content: (
      <div style={{ padding: '1rem' }}>
        <h3>Regular Content</h3>
        <p>This tab contains only regular content without nested tabs.</p>
        <p>
          You can mix nested tabs with regular content tabs in the same parent
          tab group for maximum flexibility.
        </p>
        <div
          style={{
            marginTop: '1rem',
            padding: '1rem',
            border: '1px dashed var(--dyn-color-border-subtle, #e5e7eb)',
            borderRadius: '0.25rem',
            backgroundColor: 'var(--dyn-color-surface-secondary, #f9fafb)',
          }}
        >
          <strong>Regular Container</strong>
          <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
            No nested tabs here, just standard content
          </p>
        </div>
      </div>
    ),
  },
];

/**
 * Nested tabs example: horizontal parent with vertical children.
 */
export const NestedTabs: Story = {
  render: (args) => {
    // Parent tabs (horizontal) - recreating is cheap, content is stable references if possible
    // But JSX elements are always new.
    // However, moving logic out clarifies it.
    const parentTabs = getParentTabs(args.orientation as any);
    content: (
      <div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nibh urna,
          euismod ut ornare non, volutpat vel tortor. Integer laoreet placerat suscipit.
          Sed sodales scelerisque commodo. Nam porta cursus lectus. Proin nunc erat,
          gravida a facilisis quis, ornare id lectus. Proin consectetur nibh quis urna
          gravida mollis.
        </p>
      </div>
    ),
      },
      {
  label: 'Responsive Tab 2',
    content: (
      <div>
        <p>
          Sed sodales scelerisque commodo. Nam porta cursus lectus. Proin nunc erat,
          gravida a facilisis quis, ornare id lectus. Proin consectetur nibh quis urna
          gravida mollis.
        </p>
      </div>
    ),
      },
{
  label: 'Responsive Tab 3',
    content: (
      <div>
        <p>
          Suspendisse blandit velit Integer laoreet placerat suscipit. Sed sodales
          scelerisque commodo. Nam porta cursus lectus. Proin nunc erat, gravida a
          facilisis quis, ornare id lectus.
        </p>
      </div>
    ),
      },
{
  label: 'Long name Responsive Tab 4',
    content: (
      <div>
        <p>
          Integer laoreet placerat suscipit. Sed sodales scelerisque commodo. Nam porta
          cursus lectus. Proin nunc erat, gravida a facilisis quis, ornare id lectus.
          Proin consectetur nibh quis urna gravida mollis.
        </p>
      </div>
    ),
      },
    ];

const childTabs2: DynResponsiveTabItem[] = [
  {
    label: 'Product Details',
    icon: 'info',
    content: (
      <div>
        <h4>Product Specifications</h4>
        <ul>
          <li>Dimension: 10 x 5 x 3 cm</li>
          <li>Weight: 250g</li>
          <li>Material: Premium ABS plastic</li>
          <li>Color: Midnight Black</li>
        </ul>
      </div>
    ),
  },
  {
    label: 'Pricing',
    icon: 'currency-dollar',
    content: (
      <div>
        <h4>Pricing Information</h4>
        <p>Standard: $99.99</p>
        <p>Premium: $149.99</p>
        <p>Enterprise: Contact sales</p>
      </div>
    ),
  },
  {
    label: 'Reviews',
    icon: 'star',
    content: (
      <div>
        <h4>Customer Reviews</h4>
        <p>⭐⭐⭐⭐⭐ 5.0 out of 5 stars (128 reviews)</p>
        <p>"Excellent product, highly recommended!"</p>
      </div>
    ),
  },
];


content: (
  <>
    <DynResponsiveTabs
      tabs={childTabs1}
      orientation="vertical"
      tabIdentifier="child-vertical-1"
      defaultActive={0}
      aria-label="Child vertical tabs group 1"
    />
    <div
      style={{
        marginTop: '1rem',
        padding: '1rem',
        border: '1px dashed var(--dyn-color-border-subtle, #e5e7eb)',
        borderRadius: '0.25rem',
        backgroundColor: 'var(--dyn-color-surface-secondary, #f9fafb)',
      }}
    >
      <strong>Child 1 Container</strong>
      <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
        This demonstrates how content can appear outside nested tabs
      </p>
    </div>
  </>
),
      },
{
  label: 'Horizontal 2',
    content: (
      <>
        <DynResponsiveTabs
          tabs={childTabs2}
          orientation="vertical"
          tabIdentifier="child-vertical-2"
          defaultActive={0}
          aria-label="Child vertical tabs group 2"
        />
        <div
          style={{
            marginTop: '1rem',
            padding: '1rem',
            border: '1px dashed var(--dyn-color-border-subtle, #e5e7eb)',
            borderRadius: '0.25rem',
            backgroundColor: 'var(--dyn-color-surface-secondary, #f9fafb)',
          }}
        >
          <strong>Child 2 Container</strong>
          <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
            Different child tabs with icons and structured content
          </p>
        </div>
      </>
    ),
      },
{
  label: 'Horizontal 3',
    content: (
      <div style={{ padding: '1rem' }}>
        <h3>Regular Content</h3>
        <p>This tab contains only regular content without nested tabs.</p>
        <p>
          You can mix nested tabs with regular content tabs in the same parent
          tab group for maximum flexibility.
        </p>
        <div
          style={{
            marginTop: '1rem',
            padding: '1rem',
            border: '1px dashed var(--dyn-color-border-subtle, #e5e7eb)',
            borderRadius: '0.25rem',
            backgroundColor: 'var(--dyn-color-surface-secondary, #f9fafb)',
          }}
        >
          <strong>Regular Container</strong>
          <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
            No nested tabs here, just standard content
          </p>
        </div>
      </div>
    ),
      },
    ];

return (
  <div>
    <h2>Demo</h2>
    <p style={{ marginBottom: '1rem', color: 'var(--dyn-color-text-secondary, #6b7280)' }}>
      Selected tab: Responsive Tab 1
    </p>
    <DynResponsiveTabs
      tabs={parentTabs}
      orientation={args.orientation}
      tabIdentifier="parent-horizontal"
      defaultActive={0}
      aria-label="Main navigation tabs"
    />
  </div>
);
  },
parameters: {
  docs: {
    description: {
      story:
      'Complex nested tabs layout: horizontal parent tabs containing vertical child tabs. ' +
        'This pattern is perfect for complex interfaces like product catalogs, settings panels, ' +
        'or documentation sites. Each child tab group has its own unique `tabIdentifier` for ' +
        'proper styling and state management. The component automatically adapts to accordion ' +
        'mode on mobile devices.',
      },
  },
},
};

/**
 * Dark theme demonstration showing theming capabilities.
 */
export const DarkTheme: Story = {
  render: () => (
    <div
      data-theme="dark"
      style={{
        padding: '2rem',
        background: '#1a1a1a',
        borderRadius: '0.5rem',
        minHeight: '400px',
      }}
    >
      <h2 style={{ color: 'white', marginBottom: '1rem' }}>Dark Theme Tabs</h2>
      <DynResponsiveTabs
        tabs={sampleTabs}
        orientation="horizontal"
        defaultActive={0}
        aria-label="Dark theme navigation"
      />
    </div>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story:
          'Dark theme support is built-in through design tokens. All colors and contrast ratios ' +
          'are automatically adjusted for optimal visibility and accessibility in dark environments.',
      },
    },
  },
};

/**
 * Custom icons and styling demonstration.
 */
export const CustomIcons: Story = {
  args: {
    tabs: [
      {
        label: 'Dashboard',
        icon: '📊',
        content: <div><h3>Dashboard</h3><p>Analytics and metrics overview</p></div>,
      },
      {
        label: 'Messages',
        icon: '💬',
        content: <div><h3>Messages</h3><p>Your inbox and conversations</p></div>,
      },
      {
        label: 'Notifications',
        icon: '🔔',
        content: <div><h3>Notifications</h3><p>Recent activity and alerts</p></div>,
      },
      {
        label: 'Profile',
        icon: '👤',
        content: <div><h3>Profile</h3><p>Your account settings and preferences</p></div>,
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Use emoji or custom React components as icons for a unique visual style.',
      },
    },
  },
};

/**
 * Responsive behavior demonstration for mobile devices.
 */
export const ResponsiveBehavior: Story = {
  render: () => (
    <div>
      <div
        style={{
          padding: '1rem',
          marginBottom: '1rem',
          backgroundColor: 'var(--dyn-color-surface-secondary, #f9fafb)',
          borderRadius: '0.25rem',
        }}
      >
        <p style={{ fontSize: '0.875rem', margin: 0 }}>
          <strong>Tip:</strong> Resize your browser window or use device preview to see the
          responsive transformation from tabs to accordion.
        </p>
      </div>
      <DynResponsiveTabs
        tabs={sampleTabs}
        orientation="horizontal"
        responsive={true}
        breakpoint={768}
        allowCollapse={true}
        aria-label="Responsive navigation example"
      />
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story:
          'The component automatically switches to accordion mode on smaller screens. ' +
          'Test by resizing your browser or using Storybook viewport controls. ' +
          'The breakpoint can be customized via the `breakpoint` prop.',
      },
    },
  },
};

/**
 * Accessibility features and keyboard navigation.
 */
export const Accessibility: Story = {
  render: () => (
    <div style={{ maxWidth: '800px' }}>
      <div
        style={{
          padding: '1rem',
          marginBottom: '1rem',
          backgroundColor: 'var(--dyn-color-surface-secondary, #f9fafb)',
          border: '1px solid var(--dyn-color-border-subtle, #e5e7eb)',
          borderRadius: '0.25rem',
        }}
      >
        <h3 style={{ marginTop: 0 }}>Keyboard Navigation</h3>
        <ul style={{ marginBottom: 0, fontSize: '0.875rem' }}>
          <li><kbd>Tab</kbd> - Move focus between interactive elements</li>
          <li><kbd>→</kbd> / <kbd>←</kbd> - Navigate between tabs (horizontal)</li>
          <li><kbd>↓</kbd> / <kbd>↑</kbd> - Navigate between tabs (vertical or accordion)</li>
          <li><kbd>Home</kbd> - Jump to first tab</li>
          <li><kbd>End</kbd> - Jump to last tab</li>
          <li><kbd>Enter</kbd> / <kbd>Space</kbd> - Activate focused tab</li>
        </ul>
      </div>

      <DynResponsiveTabs
        tabs={sampleTabs}
        orientation="horizontal"
        aria-label="Accessible navigation example"
      />

      <div
        style={{
          marginTop: '1rem',
          padding: '1rem',
          backgroundColor: 'var(--dyn-color-surface-secondary, #f9fafb)',
          border: '1px solid var(--dyn-color-border-subtle, #e5e7eb)',
          borderRadius: '0.25rem',
          fontSize: '0.875rem',
        }}
      >
        <strong>Accessibility Features:</strong>
        <ul style={{ marginBottom: 0, marginTop: '0.5rem' }}>
          <li>WCAG 2.1 AA compliant color contrast</li>
          <li>Proper ARIA roles and attributes (<code>tablist</code>, <code>tab</code>, <code>tabpanel</code>)</li>
          <li>Screen reader friendly with descriptive labels</li>
          <li>Keyboard navigation support</li>
          <li>Focus management and visual indicators</li>
          <li>Disabled state clearly communicated</li>
        </ul>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Full keyboard navigation and accessibility support following WAI-ARIA Authoring Practices. ' +
          'The component is fully navigable via keyboard and provides proper screen reader announcements.',
      },
    },
  },
};
