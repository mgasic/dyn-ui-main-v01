import type { Meta, StoryObj } from '@storybook/react-vite';
import { DynModal } from './DynModal';
import { DynButton } from '../DynButton';
import React, { useState } from 'react';

const meta: Meta<typeof DynModal> = {
    title: 'Overlays/DynModal',
    component: DynModal,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: ['small', 'medium', 'large'],
        },
        fullscreen: { control: 'boolean' },
        centered: { control: 'boolean' },
        isOpen: { control: 'boolean' },
        loading: { control: 'boolean' },
    },
};

export default meta;
type Story = StoryObj<typeof DynModal>;

const ModalWithState = (args: any) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <DynButton onClick={() => setIsOpen(true)}>Open Modal</DynButton>
            <DynModal
                {...args}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            >
                <p>This is the content of the modal. You can place any React components here.</p>
                <p>It supports design tokens and dark mode out of the box.</p>
            </DynModal>
        </>
    );
};

export const Default: Story = {
    render: (args) => <ModalWithState {...args} />,
    args: {
        title: 'Modal Title',
        children: 'Modal content goes here.',
    },
};

export const WithFooter: Story = {
    render: (args) => <ModalWithState {...args} />,
    args: {
        title: 'Confirmation',
        children: 'Are you sure you want to proceed with this action?',
        footer: (
            <div style={{ display: 'flex', gap: '8px' }}>
                <DynButton kind="secondary">Cancel</DynButton>
                <DynButton kind="primary">Confirm</DynButton>
            </div>
        ),
    },
};

export const Sizes: Story = {
    render: () => {
        const [openSize, setOpenSize] = useState<string | null>(null);
        return (
            <div style={{ display: 'flex', gap: '8px' }}>
                <DynButton onClick={() => setOpenSize('small')}>Small</DynButton>
                <DynButton onClick={() => setOpenSize('medium')}>Medium</DynButton>
                <DynButton onClick={() => setOpenSize('large')}>Large</DynButton>

                <DynModal
                    isOpen={openSize === 'small'}
                    onClose={() => setOpenSize(null)}
                    title="Small Modal"
                    size="small"
                >
                    This is a small modal.
                </DynModal>

                <DynModal
                    isOpen={openSize === 'medium'}
                    onClose={() => setOpenSize(null)}
                    title="Medium Modal"
                    size="medium"
                >
                    This is a medium modal.
                </DynModal>

                <DynModal
                    isOpen={openSize === 'large'}
                    onClose={() => setOpenSize(null)}
                    title="Large Modal"
                    size="large"
                >
                    This is a large modal.
                </DynModal>
            </div>
        );
    }
};

export const Fullscreen: Story = {
    render: (args) => <ModalWithState {...args} />,
    args: {
        title: 'Fullscreen Modal',
        fullscreen: true,
        children: 'This modal takes up the entire screen.',
        footer: <DynButton onClick={() => { }}>Close</DynButton>
    },
};

export const Loading: Story = {
    render: (args) => <ModalWithState {...args} />,
    args: {
        title: 'Loading Modal',
        loading: true,
        children: 'The modal is in a loading state, which dims the content.',
    },
};
