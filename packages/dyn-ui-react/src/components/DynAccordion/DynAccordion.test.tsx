import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DynAccordion } from './DynAccordion';

const defaultItems = [
    { id: '1', title: 'Item 1', content: 'Content 1' },
    { id: '2', title: 'Item 2', content: 'Content 2' },
];

describe('DynAccordion', () => {
    it('renders all items', () => {
        render(<DynAccordion items={defaultItems} />);
        expect(screen.getByText('Item 1')).toBeInTheDocument();
        expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    it('toggles item content on click', () => {
        render(<DynAccordion items={defaultItems} />);

        // Initial state: content hidden (implementation detail: usually via CSS or logic, strictly speaking checks aria-expanded)
        const button1 = screen.getByRole('button', { name: /item 1/i });
        expect(button1).toHaveAttribute('aria-expanded', 'false');

        // Click to expand
        fireEvent.click(button1);
        expect(button1).toHaveAttribute('aria-expanded', 'true');
        expect(screen.getByText('Content 1')).toBeVisible();

        // Click to collapse
        fireEvent.click(button1);
        expect(button1).toHaveAttribute('aria-expanded', 'false');
    });

    it('allows multiple items when multiple={} prop is true', () => {
        render(<DynAccordion items={defaultItems} multiple />);

        const button1 = screen.getByRole('button', { name: /item 1/i });
        const button2 = screen.getByRole('button', { name: /item 2/i });

        fireEvent.click(button1);
        fireEvent.click(button2);

        expect(button1).toHaveAttribute('aria-expanded', 'true');
        expect(button2).toHaveAttribute('aria-expanded', 'true');
    });

    it('only allows one item expanded by default', () => {
        render(<DynAccordion items={defaultItems} />);

        const button1 = screen.getByRole('button', { name: /item 1/i });
        const button2 = screen.getByRole('button', { name: /item 2/i });

        fireEvent.click(button1);
        expect(button1).toHaveAttribute('aria-expanded', 'true');

        fireEvent.click(button2);
        expect(button2).toHaveAttribute('aria-expanded', 'true');
        expect(button1).toHaveAttribute('aria-expanded', 'false');
    });

    it('respects controlled state', () => {
        const handleChange = vi.fn();
        const { rerender } = render(
            <DynAccordion items={defaultItems} expanded={['1']} onChange={handleChange} />
        );

        const button1 = screen.getByRole('button', { name: /item 1/i });
        const button2 = screen.getByRole('button', { name: /item 2/i });

        expect(button1).toHaveAttribute('aria-expanded', 'true');
        expect(button2).toHaveAttribute('aria-expanded', 'false');

        // Apply change
        fireEvent.click(button2);
        expect(handleChange).toHaveBeenCalledWith(['2']);

        // Re-render with new state to confirm it updates
        rerender(<DynAccordion items={defaultItems} expanded={['2']} onChange={handleChange} />);
        expect(button1).toHaveAttribute('aria-expanded', 'false');
        expect(button2).toHaveAttribute('aria-expanded', 'true');
    });
});
