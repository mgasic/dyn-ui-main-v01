import type { Meta, StoryObj } from '@storybook/react';
import { DynLoading } from './DynLoading';

const meta = {
    title: 'Feedback/DynLoading',
    component: DynLoading,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
A versatile loading component supporting spinners, skeletons, and overlays.

## Features
- Multiple variants (spinner, dots, pulse, skeleton, overlay)
- Size variants (xs, sm, md, lg, xl)
- Color variants (semantic colors)
- Full accessibility support
- Dark mode compatible via design tokens
        `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['spinner', 'dots', 'pulse', 'skeleton', 'overlay'],
        },
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl'],
        },
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'neutral', 'white'],
        },
        label: {
            control: 'text',
        },
        description: {
            control: 'text',
        },
        blur: {
            control: 'boolean',
        },
        fixed: {
            control: 'boolean',
        },
        width: {
            control: 'text',
        },
        height: {
            control: 'text',
        },
        circle: {
            control: 'boolean',
        },
    },
} satisfies Meta<typeof DynLoading>;

export default meta;
type Story = StoryObj<typeof meta>;

// ==========================================================================
// BASIC STORIES
// ==========================================================================

export const Default: Story = {
    args: {
        variant: 'spinner',
    },
};

export const WithLabel: Story = {
    args: {
        label: 'Loading...',
    },
};

export const WithDescription: Story = {
    args: {
        label: 'Loading Data',
        description: 'Please wait while we fetch the latest updates.',
        size: 'lg',
        color: 'primary',
    },
};

// ==========================================================================
// VARIANTS
// ==========================================================================

export const Variants: Story = {
    render: () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <div style={{ textAlign: 'center' }}>
                <DynLoading variant="spinner" />
                <p>Spinner</p>
            </div>
            <div style={{ textAlign: 'center' }}>
                <DynLoading variant="dots" />
                <p>Dots</p>
            </div>
            <div style={{ textAlign: 'center' }}>
                <DynLoading variant="pulse" />
                <p>Pulse</p>
            </div>
        </div>
    ),
};

// ==========================================================================
// SKELETON
// ==========================================================================

export const Skeleton: Story = {
    render: () => (
        <div style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <DynLoading variant="skeleton" circle width={50} height={50} />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <DynLoading variant="skeleton" width="60%" height={20} />
                    <DynLoading variant="skeleton" width="40%" height={16} />
                </div>
            </div>
            <DynLoading variant="skeleton" height={100} />
            <DynLoading variant="skeleton" height={20} />
            <DynLoading variant="skeleton" height={20} />
        </div>
    ),
};

// ==========================================================================
// OVERLAY
// ==========================================================================

export const OverlayRelative: Story = {
    args: {
        variant: 'overlay',
        label: 'Loading content...',
        blur: true,
    },
    decorators: [
        (Story) => (
            <div style={{ position: 'relative', width: '100%', height: '300px', border: '1px solid #ccc', padding: '1rem' }}>
                <h3>Content Title</h3>
                <p>Some content that is being covered by the loading overlay.</p>
                <p>The overlay is absolute positioned within this relative container.</p>
                <Story />
            </div>
        ),
    ],
};

// ==========================================================================
// SIZES & COLORS
// ==========================================================================

export const Sizes: Story = {
    render: () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <DynLoading size="xs" />
            <DynLoading size="sm" />
            <DynLoading size="md" />
            <DynLoading size="lg" />
            <DynLoading size="xl" />
        </div>
    ),
};

export const Colors: Story = {
    render: () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <DynLoading color="primary" />
            <DynLoading color="secondary" />
            <DynLoading color="success" />
            <DynLoading color="danger" />
            <DynLoading color="warning" />
            <DynLoading color="info" />
            <DynLoading color="neutral" />
        </div>
    ),
};
