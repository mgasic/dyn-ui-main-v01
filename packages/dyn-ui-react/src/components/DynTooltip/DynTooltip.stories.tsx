import type { Meta, StoryObj } from '@storybook/react';
import { DynTooltip } from './DynTooltip';
import { DynButton } from '../DynButton';

const meta: Meta<typeof DynTooltip> = {
    title: 'Components/DynTooltip',
    component: DynTooltip,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        position: {
            control: 'select',
            options: ['top', 'bottom', 'left', 'right'],
        },
        delay: { control: 'number' },
    },
    decorators: [
        (Story) => (
            <div style={{ padding: '80px', display: 'flex', justifyContent: 'center' }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof DynTooltip>;

export const Default: Story = {
    args: {
        content: 'This is a tooltip',
        children: <DynButton>Hover Me</DynButton>,
    },
};

export const Positions: Story = {
    render: () => (
        <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <DynTooltip content="Top Tooltip" position="top">
                <DynButton>Top</DynButton>
            </DynTooltip>
            <DynTooltip content="Right Tooltip" position="right">
                <DynButton>Right</DynButton>
            </DynTooltip>
            <DynTooltip content="Bottom Tooltip" position="bottom">
                <DynButton>Bottom</DynButton>
            </DynTooltip>
            <DynTooltip content="Left Tooltip" position="left">
                <DynButton>Left</DynButton>
            </DynTooltip>
        </div>
    ),
};

export const WithDelay: Story = {
    args: {
        content: 'Delayed Tooltip (500ms)',
        delay: 500,
        children: <DynButton>Hover to Wait</DynButton>,
    },
};

export const LongContent: Story = {
    args: {
        content: 'This is a much longer tooltip content that should wrap nicely within the max-width constraints.',
        position: 'bottom',
        children: <DynButton>Long Content</DynButton>,
    },
};
