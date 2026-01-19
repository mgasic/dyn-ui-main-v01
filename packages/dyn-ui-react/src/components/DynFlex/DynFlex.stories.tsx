import type { Meta, StoryObj } from '@storybook/react';
import { DynFlex } from './DynFlex';
import { DynButton } from '../DynButton';

const meta: Meta<typeof DynFlex> = {
    title: 'Components/Layout/DynFlex',
    component: DynFlex,
    tags: ['autodocs'],
    argTypes: {
        direction: {
            control: 'radio',
            options: ['row', 'column'],
        },
        justify: {
            control: 'select',
            options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
        },
        align: {
            control: 'select',
            options: ['start', 'center', 'end', 'baseline', 'stretch'],
        },
        wrap: {
            control: 'radio',
            options: ['nowrap', 'wrap'],
        },
        gap: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
        },
        inline: {
            control: 'boolean',
        },
        as: {
            control: 'text',
            description: 'Polymorphic component tag (e.g. section, main)',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

const Box = ({ color = '#e0e0e0', width = 50, height = 50, text = '' }) => (
    <div
        style={{
            backgroundColor: color,
            width: width,
            height: height,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #ccc',
            borderRadius: '4px',
        }}
    >
        {text}
    </div>
);

export const Default: Story = {
    args: {
        gap: 'md',
        children: (
            <>
                <Box text="1" />
                <Box text="2" />
                <Box text="3" />
            </>
        ),
    },
};

export const Column: Story = {
    args: {
        direction: 'column',
        gap: 'md',
        children: (
            <>
                <Box text="1" />
                <Box text="2" />
                <Box text="3" />
            </>
        ),
    },
};

export const Centered: Story = {
    args: {
        justify: 'center',
        align: 'center',
        gap: 'lg',
        style: { height: '200px', border: '1px dashed #999' },
        children: (
            <>
                <Box text="A" color="#ffcccc" />
                <Box text="B" color="#ccffcc" />
                <Box text="C" color="#ccccff" />
            </>
        ),
    },
};

export const WithButtons: Story = {
    args: {
        justify: 'between',
        align: 'center',
        gap: 'md',
        style: { width: '100%', padding: '10px', border: '1px solid #eee' },
        children: (
            <>
                <strong>Toolbar</strong>
                <DynFlex gap="sm">
                    <DynButton label="Cancel" kind="secondary" />
                    <DynButton label="Save" kind="primary" />
                </DynFlex>
            </>
        ),
    },
};
