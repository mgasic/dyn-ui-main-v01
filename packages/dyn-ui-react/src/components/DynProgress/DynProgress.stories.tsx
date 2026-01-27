import type { Meta, StoryObj } from '@storybook/react';
import { DynProgress } from './DynProgress';

const meta = {
    title: 'Feedback/DynProgress',
    component: DynProgress,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
A flexible, accessible progress bar component for displaying progress indicators,
loading states, and completion percentages.

## Features
- Multiple status variants (default, success, error, warning, info)
- Size variants (xs, sm, md, lg, xl)
- Indeterminate mode for unknown durations
- Striped and animated variants
- Full accessibility support (ARIA)
- Dark mode compatible via design tokens
        `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        value: {
            control: { type: 'range', min: 0, max: 100 },
            description: 'Current progress value',
        },
        status: {
            control: 'select',
            options: ['default', 'success', 'error', 'warning', 'info'],
        },
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl'],
        },
        indeterminate: {
            control: 'boolean',
        },
        striped: {
            control: 'boolean',
        },
        animated: {
            control: 'boolean',
        },
        showPercentage: {
            control: 'boolean',
        },
        label: {
            control: 'text',
        },
    },
} satisfies Meta<typeof DynProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

// ==========================================================================
// BASIC STORIES
// ==========================================================================

export const Default: Story = {
    args: {
        value: 50,
    },
};

export const WithLabel: Story = {
    args: {
        value: 75,
        label: 'Uploading file...',
        showPercentage: true,
    },
};

export const Complete: Story = {
    args: {
        value: 100,
        status: 'success',
        label: 'Upload complete',
        showPercentage: true,
    },
};

// ==========================================================================
// STATUS VARIANTS
// ==========================================================================

export const StatusVariants: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <DynProgress value={60} status="default" label="Default" showPercentage />
            <DynProgress value={100} status="success" label="Success" showPercentage />
            <DynProgress value={40} status="error" label="Error" showPercentage />
            <DynProgress value={70} status="warning" label="Warning" showPercentage />
            <DynProgress value={50} status="info" label="Info" showPercentage />
        </div>
    ),
};

// ==========================================================================
// SIZE VARIANTS
// ==========================================================================

export const SizeVariants: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <DynProgress value={60} size="xs" label="Extra Small" />
            <DynProgress value={60} size="sm" label="Small" />
            <DynProgress value={60} size="md" label="Medium (Default)" />
            <DynProgress value={60} size="lg" label="Large" />
            <DynProgress value={60} size="xl" label="Extra Large" />
        </div>
    ),
};

// ==========================================================================
// INDETERMINATE MODE
// ==========================================================================

export const Indeterminate: Story = {
    args: {
        indeterminate: true,
        label: 'Loading...',
    },
};

export const IndeterminateVariants: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <DynProgress indeterminate status="default" label="Processing..." />
            <DynProgress indeterminate status="info" label="Fetching data..." />
            <DynProgress indeterminate status="warning" label="Retrying..." />
        </div>
    ),
};

// ==========================================================================
// STRIPED & ANIMATED
// ==========================================================================

export const Striped: Story = {
    args: {
        value: 70,
        striped: true,
        label: 'Striped Progress',
        showPercentage: true,
    },
};

export const StripedAnimated: Story = {
    args: {
        value: 50,
        striped: true,
        animated: true,
        label: 'Animated Stripes',
        showPercentage: true,
    },
};

// ==========================================================================
// CUSTOM FORMATTING
// ==========================================================================

export const CustomFormat: Story = {
    args: {
        value: 50,
        max: 100,
        label: 'Download Progress',
        showPercentage: true,
        formatValue: (value) => `${value} MB / 100 MB`,
    },
};

// ==========================================================================
// USE CASES
// ==========================================================================

export const FileUpload: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
            <DynProgress
                value={100}
                status="success"
                label="document.pdf"
                showPercentage
            />
            <DynProgress
                value={75}
                status="default"
                label="image.png"
                showPercentage
            />
            <DynProgress
                value={35}
                status="default"
                label="video.mp4"
                showPercentage
            />
            <DynProgress
                indeterminate
                status="info"
                label="archive.zip"
            />
        </div>
    ),
};

export const StepProgress: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <DynProgress
                value={60}
                size="lg"
                status="default"
                label="Step 3 of 5: Payment Details"
                formatValue={() => '3/5'}
                showPercentage
            />
        </div>
    ),
};

// ==========================================================================
// ACCESSIBILITY
// ==========================================================================

export const WithAriaLabel: Story = {
    args: {
        value: 50,
        'aria-label': 'File upload progress: 50% complete',
    },
};
