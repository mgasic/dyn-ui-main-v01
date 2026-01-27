import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DynSwitch } from './DynSwitch';

describe('DynSwitch', () => {
    it('renders correctly', () => {
        render(<DynSwitch label="Test Switch" />);
        expect(screen.getByRole('switch', { name: /test switch/i })).toBeInTheDocument();
    });

    it('handles default checked state', () => {
        render(<DynSwitch label="Checked" defaultChecked />);
        const switchEl = screen.getByRole('switch', { name: /checked/i });
        expect(switchEl).toBeChecked();
    });

    it('calls onChange when clicked', () => {
        const handleChange = vi.fn();
        render(<DynSwitch label="Click me" onChange={handleChange} />);

        const switchEl = screen.getByRole('switch', { name: /click me/i });
        fireEvent.click(switchEl);

        expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('respects disabled state', () => {
        const handleChange = vi.fn();
        render(<DynSwitch label="Disabled" disabled onChange={handleChange} />);

        const switchEl = screen.getByRole('switch', { name: /disabled/i });
        expect(switchEl).toBeDisabled();

        fireEvent.click(switchEl);
        expect(handleChange).not.toHaveBeenCalled();
    });

    it('renders description', () => {
        render(<DynSwitch label="Label" description="Desc text" />);
        expect(screen.getByText('Desc text')).toBeInTheDocument();
    });
});
