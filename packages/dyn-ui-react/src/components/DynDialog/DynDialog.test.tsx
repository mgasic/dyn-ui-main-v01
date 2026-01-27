
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useRef } from 'react';
import { DynDialog } from './DynDialog';
import { DynDialogRef } from './DynDialog.types';
import { DynButton } from '../DynButton';

// Wrapper component to test imperative API
const TestWrapper = () => {
    const dialogRef = useRef<DynDialogRef>(null);
    const [result, setResult] = React.useState<any>(null);

    const handleConfirm = async () => {
        const res = await dialogRef.current?.confirm({
            title: 'Confirm Title',
            message: 'Are you sure?',
        });
        setResult(res);
    };

    const handleAlert = async () => {
        await dialogRef.current?.alert('Alert Message', 'Alert Title');
        setResult('alert_closed');
    };

    const handlePrompt = async () => {
        const res = await dialogRef.current?.prompt('Enter name', 'Prompt Title', 'Default');
        setResult(res);
    };

    return (
        <div>
            <DynButton onClick={handleConfirm}>Trigger Confirm</DynButton>
            <DynButton onClick={handleAlert}>Trigger Alert</DynButton>
            <DynButton onClick={handlePrompt}>Trigger Prompt</DynButton>
            <div data-testid="result">{String(result)}</div>
            <DynDialog ref={dialogRef} />
        </div>
    );
};

describe('DynDialog', () => {
    const user = userEvent.setup();

    it('renders confirm dialog and handles confirmation', async () => {
        render(<TestWrapper />);

        await user.click(screen.getByText('Trigger Confirm'));

        expect(await screen.findByText('Confirm Title')).toBeInTheDocument();
        expect(screen.getByText('Are you sure?')).toBeInTheDocument();

        await user.click(screen.getByText('OK'));

        await waitFor(() => {
            expect(screen.queryByText('Confirm Title')).not.toBeInTheDocument();
            expect(screen.getByTestId('result')).toHaveTextContent('true');
        });
    });

    it('renders confirm dialog and handles cancellation', async () => {
        render(<TestWrapper />);

        await user.click(screen.getByText('Trigger Confirm'));

        expect(await screen.findByText('Confirm Title')).toBeInTheDocument();

        await user.click(screen.getByText('Cancel'));

        await waitFor(() => {
            expect(screen.queryByText('Confirm Title')).not.toBeInTheDocument();
            expect(screen.getByTestId('result')).toHaveTextContent('false');
        });
    });

    it('renders alert dialog (no cancel button)', async () => {
        render(<TestWrapper />);

        await user.click(screen.getByText('Trigger Alert'));

        expect(await screen.findByText('Alert Title')).toBeInTheDocument();
        expect(screen.getByText('Alert Message')).toBeInTheDocument();

        expect(screen.queryByText('Cancel')).not.toBeInTheDocument();

        await user.click(screen.getByText('OK'));

        await waitFor(() => {
            expect(screen.queryByText('Alert Title')).not.toBeInTheDocument();
            expect(screen.getByTestId('result')).toHaveTextContent('alert_closed');
        });
    });

    it('renders prompt dialog and returns input value', async () => {
        render(<TestWrapper />);

        await user.click(screen.getByText('Trigger Prompt'));

        expect(await screen.findByText('Prompt Title')).toBeInTheDocument();

        const input = screen.getByRole('textbox');
        expect(input).toHaveValue('Default');

        await user.clear(input);
        await user.type(input, 'New Value');

        await user.click(screen.getByText('OK'));

        await waitFor(() => {
            expect(screen.queryByText('Prompt Title')).not.toBeInTheDocument();
            expect(screen.getByTestId('result')).toHaveTextContent('New Value');
        });
    });

    it('returns null when prompt is cancelled', async () => {
        render(<TestWrapper />);

        await user.click(screen.getByText('Trigger Prompt'));

        expect(await screen.findByText('Prompt Title')).toBeInTheDocument();

        await user.click(screen.getByText('Cancel'));

        await waitFor(() => {
            expect(screen.queryByText('Prompt Title')).not.toBeInTheDocument();
            expect(screen.getByTestId('result')).toHaveTextContent('null');
        });
    });
});
