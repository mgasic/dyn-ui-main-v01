import type { Meta, StoryObj } from '@storybook/react';
import { DynAccordion } from './DynAccordion';

const meta: Meta<typeof DynAccordion> = {
    title: 'Data Display/DynAccordion',
    component: DynAccordion,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'bordered'],
        },
        multiple: {
            control: 'boolean',
        },
    },
};

export default meta;
type Story = StoryObj<typeof DynAccordion>;

const defaultItems = [
    {
        id: '1',
        title: 'Accordion Item 1',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
        id: '2',
        title: 'Accordion Item 2',
        content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
        id: '3',
        title: 'Accordion Item 3',
        content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    },
];

export const Default: Story = {
    args: {
        items: defaultItems,
    },
};

export const Bordered: Story = {
    args: {
        items: defaultItems,
        variant: 'bordered',
    },
};

export const Multiple: Story = {
    args: {
        items: defaultItems,
        multiple: true,
    },
};

export const DefaultExpanded: Story = {
    args: {
        items: defaultItems,
        defaultExpanded: ['1'],
    },
};

export const WithDisabledItem: Story = {
    args: {
        items: [
            ...defaultItems.slice(0, 2),
            {
                id: '3',
                title: 'Disabled Item',
                content: 'This item cannot be opened.',
                disabled: true,
            },
        ],
    },
};
