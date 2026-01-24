import type { Meta, StoryObj } from '@storybook/react';
import { DynStack } from './DynStack';
import { DynBox } from '../DynBox';

const meta = {
    title: 'Layout/DynStack',
    component: DynStack,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'A flexible stack layout component for arranging children in vertical or horizontal layouts with customizable gap, alignment, and justification.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        direction: {
            control: 'select',
            options: ['vertical', 'horizontal', 'reverse'],
            description: 'Stack direction',
        },
        gap: {
            control: 'select',
            options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
            description: 'Gap between items',
        },
        align: {
            control: 'select',
            options: ['start', 'center', 'end', 'stretch', 'baseline'],
            description: 'Cross-axis alignment',
        },
        justify: {
            control: 'select',
            options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
            description: 'Main-axis justification',
        },
        wrap: {
            control: 'boolean',
            description: 'Allow items to wrap',
        },
    },
} satisfies Meta<typeof DynStack>;

export default meta;
type Story = StoryObj<typeof meta>;

const ExampleBox = ({ children, color = '#3b82f6' }: { children: React.ReactNode; color?: string }) => (
    <div
        style={{
            padding: '16px 24px',
            backgroundColor: color,
            color: 'white',
            borderRadius: '8px',
            fontWeight: 500,
        }}
    >
        {children}
    </div>
);

export const Default: Story = {
    args: {
        direction: 'vertical',
        gap: 'md',
        children: (
            <>
                <ExampleBox>Item 1</ExampleBox>
                <ExampleBox>Item 2</ExampleBox>
                <ExampleBox>Item 3</ExampleBox>
            </>
        ),
    },
};

export const Horizontal: Story = {
    args: {
        direction: 'horizontal',
        gap: 'md',
        children: (
            <>
                <ExampleBox>Item 1</ExampleBox>
                <ExampleBox>Item 2</ExampleBox>
                <ExampleBox>Item 3</ExampleBox>
            </>
        ),
    },
};

export const Vertical: Story = {
    args: {
        direction: 'vertical',
        gap: 'lg',
        children: (
            <>
                <ExampleBox>First</ExampleBox>
                <ExampleBox>Second</ExampleBox>
                <ExampleBox>Third</ExampleBox>
            </>
        ),
    },
};

export const WithAlignment: Story = {
    args: {
        direction: 'horizontal',
        gap: 'md',
        align: 'center',
        justify: 'between',
        style: { width: '100%', minWidth: '400px' },
        children: (
            <>
                <ExampleBox>Left</ExampleBox>
                <ExampleBox>Center</ExampleBox>
                <ExampleBox>Right</ExampleBox>
            </>
        ),
    },
};

export const AllGapSizes: Story = {
    render: () => (
        <DynStack direction="vertical" gap="xl">
            {(['none', 'xs', 'sm', 'md', 'lg', 'xl'] as const).map((gapSize) => (
                <div key={gapSize}>
                    <p style={{ marginBottom: '8px', fontWeight: 500 }}>Gap: {gapSize}</p>
                    <DynStack direction="horizontal" gap={gapSize}>
                        <ExampleBox color="#6366f1">A</ExampleBox>
                        <ExampleBox color="#6366f1">B</ExampleBox>
                        <ExampleBox color="#6366f1">C</ExampleBox>
                    </DynStack>
                </div>
            ))}
        </DynStack>
    ),
};

export const Wrapped: Story = {
    args: {
        direction: 'horizontal',
        gap: 'md',
        wrap: true,
        style: { maxWidth: '300px' },
        children: (
            <>
                <ExampleBox>Item 1</ExampleBox>
                <ExampleBox>Item 2</ExampleBox>
                <ExampleBox>Item 3</ExampleBox>
                <ExampleBox>Item 4</ExampleBox>
                <ExampleBox>Item 5</ExampleBox>
            </>
        ),
    },
};

export const NestedStacks: Story = {
    render: (args) => (
        <DynStack {...args} style={{ minHeight: '400px', border: '1px dashed #ccc', ...args.style }}>
            <DynStack direction="horizontal" gap="md" style={{ width: 'fit-content', border: '1px solid #e5e7eb', padding: '8px' }}>
                <ExampleBox color="#10b981">Row 1 - A</ExampleBox>
                <ExampleBox color="#10b981">Row 1 - B</ExampleBox>
            </DynStack>
            <DynStack direction="horizontal" gap="md" style={{ width: 'fit-content', border: '1px solid #e5e7eb', padding: '8px' }}>
                <ExampleBox color="#f59e0b">Row 2 - A</ExampleBox>
                <ExampleBox color="#f59e0b">Row 2 - B</ExampleBox>
                <ExampleBox color="#f59e0b">Row 2 - C</ExampleBox>
            </DynStack>
        </DynStack>
    ),
};

export const Reverse: Story = {
    args: {
        direction: 'reverse',
        gap: 'md',
        children: (
            <>
                <ExampleBox>First (appears last)</ExampleBox>
                <ExampleBox>Second</ExampleBox>
                <ExampleBox>Third (appears first)</ExampleBox>
            </>
        ),
    },
};

export const PolymorphicAs: Story = {
    args: {
        as: 'section',
        direction: 'vertical',
        gap: 'md',
        children: (
            <>
                <ExampleBox>Rendered as section element</ExampleBox>
                <ExampleBox>Item 2</ExampleBox>
            </>
        ),
    },
};
