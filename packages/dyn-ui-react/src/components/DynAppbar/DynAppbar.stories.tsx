import type { Meta, StoryObj } from '@storybook/react';
import { DynAppbar } from './DynAppbar';
import { DynButton } from '../DynButton';

const meta: Meta<typeof DynAppbar> = {
    title: 'Components/DynAppbar',
    component: DynAppbar,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        title: 'Application Title',
        leftContent: <DynButton icon="menu" kind="tertiary" aria-label="Menu" style={{ color: 'white' }} />,
        rightContent: (
            <div style={{ display: 'flex', gap: '8px' }}>
                <DynButton icon="search" kind="tertiary" aria-label="Search" style={{ color: 'white' }} />
                <DynButton icon="notifications" kind="tertiary" aria-label="Notifications" style={{ color: 'white' }} />
                <DynButton label="Login" kind="secondary" style={{ color: 'white', borderColor: 'white' }} />
            </div>
        ),
    },
};

export const WithCenterContent: Story = {
    args: {
        title: 'Dashboard',
        centerContent: <span style={{ color: 'white', opacity: 0.8 }}>Last updated: Just now</span>,
        rightContent: <DynButton label="Logout" kind="secondary" style={{ color: 'white', borderColor: 'white' }} />,
    },
};
