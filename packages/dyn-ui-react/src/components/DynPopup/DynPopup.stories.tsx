import type { Meta, StoryObj } from '@storybook/react';
import { DynPopup } from './DynPopup';
import { DynButton } from '../DynButton';

const meta: Meta<typeof DynPopup> = {
    title: 'Overlay/DynPopup',
    component: DynPopup,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        placement: {
            control: 'select',
            options: ['bottom-start', 'bottom-end', 'top-start', 'top-end', 'left-start', 'right-start'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof DynPopup>;

const defaultItems = [
    { id: '1', label: 'View Details', onClick: () => alert('View Details clicked') },
    { id: '2', label: 'Edit', onClick: () => alert('Edit clicked') },
    { id: '3', label: 'Delete', danger: true, onClick: () => alert('Delete clicked') },
];

export const Default: Story = {
    args: {
        items: defaultItems,
    },
};

export const CustomTrigger: Story = {
    args: {
        items: defaultItems,
        trigger: <DynButton>Options</DynButton>,
    },
};

export const CustomContent: Story = {
    args: {
        trigger: <DynButton kind="secondary">Custom Content</DynButton>,
        children: (
            <div style={{ padding: '1rem', width: '200px' }}>
                <h4>Custom Popup</h4>
                <p>This popup contains arbitrary content instead of a list of items.</p>
            </div>
        ),
    },
};

export const WithIcons: Story = {
    args: {
        items: [
            { id: '1', label: 'Save', icon: <span>💾</span> },
            { id: '2', label: 'Share', icon: <span>🔗</span> },
            { id: 'div1', label: '', divider: true },
            { id: '3', label: 'Delete', icon: <span>🗑️</span>, danger: true },
        ],
    },
};

export const DisabledItems: Story = {
    args: {
        items: [
            { id: '1', label: 'Active Action' },
            { id: '2', label: 'Disabled Action', disabled: true },
        ],
    },
};
