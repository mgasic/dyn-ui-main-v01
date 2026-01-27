import type { Meta, StoryObj } from '@storybook/react';
import { DynRadio, DynRadioGroup } from './DynRadio';
import { useState } from 'react';

const meta: Meta<typeof DynRadio> = {
    title: 'Inputs/DynRadio',
    component: DynRadio,
    tags: ['autodocs'],
    argTypes: {
        disabled: {
            control: 'boolean',
        },
        error: {
            control: 'boolean',
        },
    },
};

export default meta;
type Story = StoryObj<typeof DynRadio>;

export const Default: Story = {
    args: {
        value: 'option1',
        label: 'Option 1',
    },
};

export const WithDescription: Story = {
    args: {
        value: 'option2',
        label: 'Option With Details',
        description: 'This is some helper text providing more info.',
    },
};

export const Disabled: Story = {
    args: {
        value: 'option3',
        label: 'Disabled Option',
        disabled: true,
    },
};

export const Group = () => {
    const [value, setValue] = useState('apple');

    return (
        <DynRadioGroup
            label="Choose a fruit"
            description="Select your favorite fruit from the list"
            value={value}
            onChange={setValue}
        >
            <DynRadio value="apple" label="Apple" />
            <DynRadio value="banana" label="Banana" />
            <DynRadio value="orange" label="Orange" />
            <DynRadio value="grape" label="Grape" disabled description="Out of stock" />
        </DynRadioGroup>
    );
};

export const GroupHorizontal = () => (
    <DynRadioGroup label="Horizontal Group" direction="horizontal" name="h-group">
        <DynRadio value="yes" label="Yes" />
        <DynRadio value="no" label="No" />
        <DynRadio value="maybe" label="Maybe" />
    </DynRadioGroup>
);

export const GroupError = () => (
    <DynRadioGroup label="Error State" error name="error-group">
        <DynRadio value="1" label="Option 1" />
        <DynRadio value="2" label="Option 2" />
    </DynRadioGroup>
);
