import type { Meta, StoryObj } from '@storybook/react';
import { DynToastProvider, useToast } from './ToastContext';
import { DynButton } from '../DynButton';

// Wrapper component to provide context to stories
const ToastDemo = () => {
    const { success, error, warning, info, addToast } = useToast();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
                <DynButton
                    label="Show Success"
                    kind="primary"
                    onClick={() => success('Operation completed successfully', { description: 'Your changes have been saved.' })}
                />
                <DynButton
                    label="Show Error"
                    kind="primary"
                    danger
                    onClick={() => error('Something went wrong', { description: 'Please try again later.' })}
                />
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
                <DynButton
                    label="Show Warning"
                    kind="secondary"
                    onClick={() => warning('Low disk space', { description: 'You are running out of storage.' })}
                />
                <DynButton
                    label="Show Info"
                    kind="secondary"
                    onClick={() => info('New update available', { description: 'Version 2.0 is now live.' })}
                />
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
                <DynButton
                    label="With Action"
                    kind="tertiary"
                    onClick={() => info('File deleted', {
                        action: {
                            label: 'Undo',
                            onClick: () => success('Undo successful')
                        },
                        duration: 10000
                    })}
                />
                <DynButton
                    label="Infinite Toast"
                    kind="tertiary"
                    onClick={() => addToast({
                        type: 'default',
                        message: 'I stay until you close me',
                        duration: 0
                    })}
                />
            </div>
        </div>
    );
};

const meta = {
    title: 'Feedback/DynToast',
    component: DynToastProvider,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
Notification system with portal rendering, auto-dismiss, and queue management.

## Setup
Wrap your application root with \`DynToastProvider\`.

\`\`\`tsx
import { DynToastProvider } from '@dyn-ui/react';

function App() {
  return (
    <DynToastProvider>
      <YourApp />
    </DynToastProvider>
  );
}
\`\`\`

## Usage
Use the \`useToast\` hook to trigger notifications.

\`\`\`tsx
import { useToast } from '@dyn-ui/react';

function MyComponent() {
  const { success, error } = useToast();
  
  return <button onClick={() => success('Saved!')}>Save</button>;
}
\`\`\`
        `,
            },
        },
    },
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div style={{ minHeight: '300px' }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof DynToastProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
    render: (args) => (
        <DynToastProvider {...args}>
            <ToastDemo />
        </DynToastProvider>
    ),
    args: {
        defaultPosition: 'top-right',
        maxToasts: 5,
        defaultDuration: 5000,
    },
};

export const PositionTopLeft: Story = {
    render: () => (
        <DynToastProvider defaultPosition="top-left">
            <ToastDemo />
        </DynToastProvider>
    ),
};

export const PositionBottomCenter: Story = {
    render: () => (
        <DynToastProvider defaultPosition="bottom-center">
            <ToastDemo />
        </DynToastProvider>
    ),
};
