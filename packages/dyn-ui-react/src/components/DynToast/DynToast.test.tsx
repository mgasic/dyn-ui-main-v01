/**
 * DynToast Component Tests
 * @module DynToast
 */

import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DynToastProvider, useToast } from './ToastContext';

// Helper component to trigger toasts
const TestTrigger = () => {
    const { success, error, addToast, removeToast } = useToast();
    return (
        <div>
            <button onClick={() => success('Success Message')}>Trigger Success</button>
            <button onClick={() => error('Error Message')}>Trigger Error</button>
            <button onClick={() => addToast({ type: 'default', message: 'Custom Toast', duration: 0 })}>Trigger Custom</button>
            <button onClick={() => removeToast('test-id')}>Remove</button>
        </div>
    );
};

describe('DynToast', () => {
    afterEach(() => {
        vi.useRealTimers();
    });

    it('renders provider without crashing', () => {
        render(
            <DynToastProvider>
                <div>App Content</div>
            </DynToastProvider>
        );
        expect(screen.getByText('App Content')).toBeInTheDocument();
    });

    it('adds toast when helper function is called', async () => {
        const user = userEvent.setup();
        render(
            <DynToastProvider>
                <TestTrigger />
            </DynToastProvider>
        );

        await user.click(screen.getByText('Trigger Success'));

        // Check if toast appears
        expect(await screen.findByText('Success Message')).toBeInTheDocument();
    });

    it('renders different toast types', async () => {
        const user = userEvent.setup();
        render(
            <DynToastProvider>
                <TestTrigger />
            </DynToastProvider>
        );

        await user.click(screen.getByText('Trigger Error'));

        // Check for error class/attribute. Our component adds data-type="error"
        const toast = await screen.findByRole('alert');
        expect(toast).toHaveAttribute('data-type', 'error');
    });

    it('honors infinite duration (stays in DOM)', () => {
        vi.useFakeTimers();

        render(
            <DynToastProvider>
                <TestTrigger />
            </DynToastProvider>
        );

        // Use fireEvent for timer tests
        fireEvent.click(screen.getByText('Trigger Custom'));

        expect(screen.getByText('Custom Toast')).toBeInTheDocument();

        // Advance time significantly
        act(() => {
            vi.advanceTimersByTime(10000);
        });

        // Should still be visible
        expect(screen.getByText('Custom Toast')).toBeInTheDocument();
    });

    it('auto-dismisses after duration', () => {
        vi.useFakeTimers();

        render(
            // Set short default duration for test
            <DynToastProvider defaultDuration={1000}>
                <TestTrigger />
            </DynToastProvider>
        );

        // Trigger success (uses default duration)
        fireEvent.click(screen.getByText('Trigger Success'));

        expect(screen.getByText('Success Message')).toBeInTheDocument();

        // Advance time past duration (1000ms + buffer)
        act(() => {
            vi.advanceTimersByTime(1100);
        });

        // Should be gone
        expect(screen.queryByText('Success Message')).not.toBeInTheDocument();
    });

    it('removes toast when close button is clicked', async () => {
        const user = userEvent.setup();
        render(
            <DynToastProvider>
                <TestTrigger />
            </DynToastProvider>
        );

        await user.click(screen.getByText('Trigger Success'));
        const toastMessage = await screen.findByText('Success Message');

        // Find close button within the toast (closest role=alert)
        const toast = toastMessage.closest('[role="alert"]');

        const closeButton = toast!.querySelector('button[aria-label="Close notification"]');

        await user.click(closeButton as Element);

        expect(screen.queryByText('Success Message')).not.toBeInTheDocument();
    });
});
