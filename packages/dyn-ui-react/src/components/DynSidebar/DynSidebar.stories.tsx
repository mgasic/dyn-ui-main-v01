import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { DynSidebar } from './DynSidebar';
import type { DynSidebarItem } from './DynSidebar.types';

const meta = {
    title: 'Navigation/DynSidebar',
    component: DynSidebar,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'A navigation sidebar component with support for collapse/expand, icons, and mobile responsiveness.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        collapsed: {
            control: 'boolean',
            description: 'Whether the sidebar is collapsed',
        },
        open: {
            control: 'boolean',
            description: 'Whether the sidebar is open (mobile)',
        },
        activeId: {
            control: 'text',
            description: 'ID of the active item',
        },
    },
    decorators: [
        (Story) => (
            <div style={{ height: '500px', display: 'flex' }}>
                <Story />
                <div style={{ flex: 1, padding: '20px', backgroundColor: '#f5f5f5' }}>
                    Main Content Area
                </div>
            </div>
        ),
    ],
} satisfies Meta<typeof DynSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems: DynSidebarItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'home', onClick: () => console.log('Dashboard') },
    { id: 'projects', label: 'Projects', icon: 'folder', onClick: () => console.log('Projects') },
    { id: 'tasks', label: 'Tasks', icon: 'check-square', onClick: () => console.log('Tasks') },
    { id: 'calendar', label: 'Calendar', icon: 'calendar', onClick: () => console.log('Calendar') },
    { id: 'messages', label: 'Messages', icon: 'mail', onClick: () => console.log('Messages') },
];

const footerItems: DynSidebarItem[] = [
    { id: 'settings', label: 'Settings', icon: 'settings', onClick: () => console.log('Settings') },
    { id: 'logout', label: 'Logout', icon: 'log-out', onClick: () => console.log('Logout') },
];

export const Default: Story = {
    render: (args) => {
        const [activeId, setActiveId] = React.useState(args.activeId || 'dashboard');

        const handleItemClick = (item: DynSidebarItem) => {
            setActiveId(item.id);
            args.onItemClick?.(item);
        };

        return (
            <DynSidebar
                {...args}
                activeId={activeId}
                onItemClick={handleItemClick}
            />
        );
    },
    args: {
        items: sampleItems,
        activeId: 'dashboard',
    },
};

export const WithHeader: Story = {
    render: (args) => {
        const [activeId, setActiveId] = React.useState(args.activeId || 'projects');

        const handleItemClick = (item: DynSidebarItem) => {
            setActiveId(item.id);
            args.onItemClick?.(item);
        };

        return (
            <DynSidebar
                {...args}
                activeId={activeId}
                onItemClick={handleItemClick}
            />
        );
    },
    args: {
        items: sampleItems,
        header: (
            <div style={{ padding: '16px', fontWeight: 'bold', fontSize: '18px' }}>
                My App
            </div>
        ),
        activeId: 'projects',
    },
};

export const WithFooter: Story = {
    render: (args) => {
        const [activeId, setActiveId] = React.useState(args.activeId || 'dashboard');

        const handleItemClick = (item: DynSidebarItem) => {
            setActiveId(item.id);
            args.onItemClick?.(item);
        };

        return <DynSidebar {...args} activeId={activeId} onItemClick={handleItemClick} />;
    },
    args: {
        items: sampleItems,
        footerItems: footerItems,
        activeId: 'dashboard',
    },
};

export const Collapsed: Story = {
    render: (args) => {
        const [activeId, setActiveId] = React.useState(args.activeId || 'tasks');

        const handleItemClick = (item: DynSidebarItem) => {
            setActiveId(item.id);
            args.onItemClick?.(item);
        };

        return <DynSidebar {...args} activeId={activeId} onItemClick={handleItemClick} />;
    },
    args: {
        items: sampleItems,
        footerItems: footerItems,
        collapsed: true,
        activeId: 'tasks',
    },
};

export const WithDisabledItem: Story = {
    render: (args) => {
        const [activeId, setActiveId] = React.useState(args.activeId || 'dashboard');

        const handleItemClick = (item: DynSidebarItem) => {
            setActiveId(item.id);
            args.onItemClick?.(item);
        };

        return <DynSidebar {...args} activeId={activeId} onItemClick={handleItemClick} />;
    },
    args: {
        items: [
            ...sampleItems.slice(0, 2),
            { id: 'disabled', label: 'Disabled Item', icon: 'lock', disabled: true },
            ...sampleItems.slice(2),
        ],
        activeId: 'dashboard',
    },
};

export const FullExample: Story = {
    render: (args) => {
        const [activeId, setActiveId] = React.useState(args.activeId || 'projects');

        const handleItemClick = (item: DynSidebarItem) => {
            setActiveId(item.id);
            args.onItemClick?.(item);
        };

        return <DynSidebar {...args} activeId={activeId} onItemClick={handleItemClick} />;
    },
    args: {
        items: sampleItems,
        footerItems: footerItems,
        header: (
            <div style={{
                padding: '20px 16px',
                fontWeight: 'bold',
                fontSize: '20px',
                borderBottom: '1px solid rgba(0,0,0,0.1)'
            }}>
                🚀 App Name
            </div>
        ),
        activeId: 'projects',
    },
};

export const MobileOpen: Story = {
    render: (args) => {
        const [activeId, setActiveId] = React.useState(args.activeId || 'dashboard');

        const handleItemClick = (item: DynSidebarItem) => {
            setActiveId(item.id);
            args.onItemClick?.(item);
        };

        return <DynSidebar {...args} activeId={activeId} onItemClick={handleItemClick} />;
    },
    args: {
        items: sampleItems,
        footerItems: footerItems,
        open: true,
        activeId: 'dashboard',
    },
    parameters: {
        viewport: { defaultViewport: 'mobile1' },
    },
};

export const ManyItems: Story = {
    render: (args) => {
        const [activeId, setActiveId] = React.useState(args.activeId || 'analytics');

        const handleItemClick = (item: DynSidebarItem) => {
            setActiveId(item.id);
            args.onItemClick?.(item);
        };

        return <DynSidebar {...args} activeId={activeId} onItemClick={handleItemClick} />;
    },
    args: {
        items: [
            { id: 'home', label: 'Home', icon: 'home' },
            { id: 'analytics', label: 'Analytics', icon: 'bar-chart-2' },
            { id: 'users', label: 'Users', icon: 'users' },
            { id: 'products', label: 'Products', icon: 'package' },
            { id: 'orders', label: 'Orders', icon: 'shopping-cart' },
            { id: 'payments', label: 'Payments', icon: 'credit-card' },
            { id: 'reports', label: 'Reports', icon: 'file-text' },
            { id: 'notifications', label: 'Notifications', icon: 'bell' },
        ],
        footerItems: footerItems,
        activeId: 'analytics',
    },
};
