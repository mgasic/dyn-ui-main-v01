import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { DynTooltip } from './DynTooltip';

describe('DynTooltip', () => {
    it('renders children correctly', () => {
        render(
            <DynTooltip content="Tooltip content">
                <button>Trigger</button>
            </DynTooltip>
        );
        expect(screen.getByText('Trigger')).toBeInTheDocument();
    });

    it('shows tooltip on hover after delay', async () => {
        const user = userEvent.setup();
        render(
            <DynTooltip content="Tooltip content" delay={100}>
                <button>Trigger</button>
            </DynTooltip>
        );

        const trigger = screen.getByText('Trigger');
        await user.hover(trigger);

        // Should not be visible immediately
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

        // Should be visible after delay
        await waitFor(() => {
            expect(screen.getByRole('tooltip')).toBeInTheDocument();
            expect(screen.getByText('Tooltip content')).toBeInTheDocument();
        });
    });

    it('hides tooltip on mouse leave', async () => {
        const user = userEvent.setup();
        render(
            <DynTooltip content="Tooltip content" delay={0}>
                <button>Trigger</button>
            </DynTooltip>
        );

        const trigger = screen.getByText('Trigger');
        await user.hover(trigger);

        await waitFor(() => {
            expect(screen.getByRole('tooltip')).toBeInTheDocument();
        });

        await user.unhover(trigger);

        await waitFor(() => {
            expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
        });
    });

    it('applies custom class name', async () => {
        const user = userEvent.setup();
        render(
            <DynTooltip content="Tooltip content" delay={0} className="custom-class">
                <button>Trigger</button>
            </DynTooltip>
        );

        await user.hover(screen.getByText('Trigger'));

        await waitFor(() => {
            const tooltip = screen.getByRole('tooltip');
            expect(tooltip).toHaveClass('custom-class');
        });
    });
});
