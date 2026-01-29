import type { Meta, StoryObj } from '@storybook/react';
import { BackendIntegrationDemo } from './BackendIntegrationDemo';

const meta: Meta<typeof BackendIntegrationDemo> = {
    title: 'Integration/BackendDemo',
    component: BackendIntegrationDemo,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'Demonstrates frontend-backend integration. Requires backend server running on port 3001.',
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof BackendIntegrationDemo>;

// IDs correspond to the Seed Data
// 1 = DynButton (Dashboard)
// 2 = DynTable (Dashboard)
// 3 = DynSwitch (Settings)

export const ButtonFromBackend: Story = {
    args: {
        componentId: 1,
    },
};

export const TableFromBackend: Story = {
    args: {
        componentId: 2,
    },
};

export const SwitchFromBackend: Story = {
    args: {
        componentId: 3,
    },
};

export const AvatarFromBackend: Story = {
    args: {
        componentId: 4,
    },
};

export const BadgeFromBackend: Story = {
    args: {
        componentId: 5,
    },
};

export const ProgressFromBackend: Story = {
    args: {
        componentId: 6,
    },
};
