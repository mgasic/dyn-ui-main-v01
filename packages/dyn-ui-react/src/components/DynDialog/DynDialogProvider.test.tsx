
import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { DynDialogProvider, useDialog } from './DialogContext';
import { DynButton } from '../DynButton';

const TestComponent = () => {
    const { confirm, alert, prompt } = useDialog();
    const [result, setResult] = React.useState<any>(null);

    return (
        <div>
            <DynButton onClick={async () => {
                const res = await confirm({ message: 'Confirm me' });
                setResult(res);
            }}>
                Confirm
            </DynButton>
            <DynButton onClick={async () => {
                await alert('Alert me');
                setResult('alert experienced');
            }}>
                Alert
            </DynButton>
            <DynButton onClick={async () => {
                const res = await prompt('Prompt me', undefined, 'default');
                setResult(res);
            }}>
                Prompt
            </DynButton>
            <div data-testid="result">{String(result)}</div>
        </div>
    );
};

describe('DynDialogProvider', () => {
    const user = userEvent.setup();

    it('provides dialog context to children', async () => {
        render(
            <DynDialogProvider>
                <TestComponent />
            </DynDialogProvider>
        );

        // Test Confirm
        await user.click(screen.getByText('Confirm'));
        expect(await screen.findByText('Confirm me')).toBeInTheDocument();
        await user.click(screen.getByText('OK'));
        await waitFor(() => expect(screen.getByTestId('result')).toHaveTextContent('true'));

        // Test Alert
        await user.click(screen.getByText('Alert'));
        expect(await screen.findByText('Alert me')).toBeInTheDocument();
        await user.click(screen.getByText('OK'));
        await waitFor(() => expect(screen.getByTestId('result')).toHaveTextContent('alert experienced'));

        // Test Prompt
        await user.click(screen.getByText('Prompt'));
        expect(await screen.findByText('Prompt me')).toBeInTheDocument();
        await user.click(screen.getByText('OK'));
        await waitFor(() => expect(screen.getByTestId('result')).toHaveTextContent('default'));
    });
});
