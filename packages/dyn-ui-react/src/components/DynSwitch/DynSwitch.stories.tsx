import type { Meta, StoryObj } from '@storybook/react';
import { DynSwitch } from './DynSwitch';
import { useState } from 'react';

const meta: Meta<typeof DynSwitch> = {
    title: 'Inputs/DynSwitch',
    component: DynSwitch,
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
        },
        color: {
            control: 'select',
            options: ['primary', 'success', 'danger', 'warning', 'info'],
        },
        disabled: {
            control: 'boolean',
        },
        error: {
            control: 'boolean',
        },
    },
};

export default meta;
type Story = StoryObj<typeof DynSwitch>;

export const Default: Story = {
    args: {
        label: 'Enable Notifications',
    },
};

export const Checked: Story = {
    args: {
        label: 'Checked State',
        defaultChecked: true,
    },
};

export const Disabled: Story = {
    args: {
        label: 'Disabled Switch',
        disabled: true,
    },
};

export const WithDescription: Story = {
    args: {
        label: 'Airplane Mode',
        description: 'Disable all wireless connections',
    },
};

export const Sizes: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <DynSwitch size="sm" label="Small" />
            <DynSwitch size="md" label="Medium" />
            <DynSwitch size="lg" label="Large" />
        </div>
    ),
};

export const Colors: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <DynSwitch color="primary" defaultChecked label="Primary" />
            <DynSwitch color="success" defaultChecked label="Success" />
            <DynSwitch color="danger" defaultChecked label="Danger" />
            <DynSwitch color="warning" defaultChecked label="Warning" />
            <DynSwitch color="info" defaultChecked label="Info" />
        </div>
    ),
};

export const Controlled = () => {
    const [checked, setChecked] = useState(false);
    return (
        <DynSwitch
            checked={checked}
            onChange={setChecked}
            label={`Controlled: ${checked ? 'On' : 'Off'}`}
        />
    );
};
