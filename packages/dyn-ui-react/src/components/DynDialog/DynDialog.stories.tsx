
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DynDialog } from './DynDialog';
import { DynButton } from '../DynButton';
import { DynDialogRef } from './DynDialog.types';

const meta: Meta<typeof DynDialog> = {
    title: 'Components/DynDialog',
    component: DynDialog,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DynDialog>;

import { DynDialogProvider, useDialog } from './DialogContext';

const HookDemo = () => {
    const { confirm, alert, prompt } = useDialog();
    const [lastAction, setLastAction] = React.useState<string>('None');

    const showConfirm = async () => {
        const result = await confirm({
            title: 'Delete Item?',
            message: 'Are you sure you want to delete this item? This action cannot be undone.',
            confirmLabel: 'Delete',
            cancelLabel: 'Keep',
        });
        setLastAction(`Confirm result: ${result}`);
    };

    const showAlert = async () => {
        await alert('Operation completed successfully!', 'Success');
        setLastAction('Alert closed');
    };

    const showPrompt = async () => {
        const result = await prompt('Please enter your email address:', 'Subscribe', 'user@example.com');
        setLastAction(`Prompt result: ${result}`);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
                <DynButton onClick={showConfirm}>Show Confirm</DynButton>
                <DynButton onClick={showAlert}>Show Alert</DynButton>
                <DynButton onClick={showPrompt}>Show Prompt</DynButton>
            </div>
            <div>Last Action: {lastAction}</div>
        </div>
    );
};

export const WithProvider: Story = {
    render: () => (
        <DynDialogProvider>
            <HookDemo />
        </DynDialogProvider>
    ),
};

const DialogDemo = () => {
    const dialogRef = React.useRef<DynDialogRef>(null);
    const [lastAllocution, setLastAction] = React.useState<string>('None');

    const showConfirm = async () => {
        const result = await dialogRef.current?.confirm({
            title: 'Delete Item?',
            message: 'Are you sure you want to delete this item? This action cannot be undone.',
            confirmLabel: 'Delete',
            cancelLabel: 'Keep',
        });
        setLastAction(`Confirm result: ${result}`);
    };

    const showAlert = async () => {
        await dialogRef.current?.alert('Operation completed successfully!', 'Success');
        setLastAction('Alert closed');
    };

    const showPrompt = async () => {
        const result = await dialogRef.current?.prompt('Please enter your email address:', 'Subscribe', 'user@example.com');
        setLastAction(`Prompt result: ${result}`);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
                <DynButton onClick={showConfirm}>Show Confirm</DynButton>
                <DynButton onClick={showAlert}>Show Alert</DynButton>
                <DynButton onClick={showPrompt}>Show Prompt</DynButton>
            </div>
            <div>Last Action: {lastAllocution}</div>
            <DynDialog ref={dialogRef} />
        </div>
    );
};

export const Interactive: Story = {
    render: () => <DialogDemo />,
};
