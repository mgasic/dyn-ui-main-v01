import type { Meta, StoryObj } from '@storybook/react';
import { DynUpload } from './DynUpload';

const meta: Meta<typeof DynUpload> = {
    title: 'Inputs/DynUpload',
    component: DynUpload,
    tags: ['autodocs'],
    argTypes: {
        disabled: { control: 'boolean' },
        error: { control: 'boolean' },
    },
};

export default meta;
type Story = StoryObj<typeof DynUpload>;

export const Default: Story = {
    args: {},
};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
};

export const ErrorState: Story = {
    args: {
        error: true,
        description: 'Upload failed or invalid format',
    },
};

export const ImageOnly: Story = {
    args: {
        accept: 'image/*',
        description: 'Only images (JPG, PNG) allowed',
    },
};

export const Multiple: Story = {
    args: {
        multiple: true,
        label: 'Upload multiple files',
    },
};
