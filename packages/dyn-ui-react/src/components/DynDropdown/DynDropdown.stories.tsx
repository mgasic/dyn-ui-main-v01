import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DynDropdown } from './DynDropdown';
import { DynButton } from '../DynButton';

const meta: Meta<typeof DynDropdown> = {
    title: 'Components/DynDropdown',
    component: DynDropdown,
    tags: ['autodocs'],
    argTypes: {
        placement: {
            control: 'select',
            options: ['bottom-start', 'bottom-end', 'top-start', 'top-end'],
        },
        triggerType: {
            control: 'radio',
            options: ['click', 'hover'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof DynDropdown>;

export const Default: Story = {
    args: {
        trigger: <DynButton label="Open Dropdown" />,
        items: [
            { id: 'profile', label: 'User Profile' },
            { id: 'settings', label: 'Settings' },
            { id: 'divider-1', type: 'divider' },
            { id: 'logout', label: 'Logout', className: 'text-danger' },
        ],
        onItemClick: (item) => alert(`Clicked: ${item.label}`),
    },
};

export const WithIcons: Story = {
    args: {
        trigger: <DynButton label="Actions" kind="secondary" />,
        items: [
            { id: 'edit', label: 'Edit', icon: '📝' },
            { id: 'copy', label: 'Copy', icon: '📋' },
            { id: 'delete', label: 'Delete', icon: '🗑️', disabled: true },
        ],
    },
};

export const CustomContent: Story = {
    args: {
        trigger: <DynButton label="Custom Content" />,
        children: (
            <div style={{ padding: '16px', maxWidth: '300px' }}>
                <h3>Custom Header</h3>
                <p>You can render any React content inside the dropdown.</p>
                <DynButton label="Accept" size="small" fullWidth />
            </div>
        ),
    },
};
