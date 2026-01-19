import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DynDropdown } from './DynDropdown';
import React from 'react';

describe('DynDropdown', () => {
    const items = [
        { id: '1', label: 'Item 1' },
        { id: '2', label: 'Item 2' },
    ];

    it('renders trigger element', () => {
        render(<DynDropdown trigger={<button>Click me</button>} items={items} />);
        expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('is closed by default', () => {
        render(<DynDropdown trigger={<button>Click me</button>} items={items} />);
        expect(screen.queryByTestId('dyn-dropdown-menu')).not.toBeInTheDocument();
    });

    it('opens when trigger is clicked', () => {
        render(<DynDropdown trigger={<button>Click me</button>} items={items} />);
        fireEvent.click(screen.getByText('Click me'));
        const menu = screen.getByTestId('dyn-dropdown-menu');
        expect(menu.className).toContain('menuOpen');
    });

    it('opens when trigger is hovered (triggerType="hover")', () => {
        render(<DynDropdown trigger={<button>Hover me</button>} items={items} triggerType="hover" />);
        fireEvent.mouseEnter(screen.getByText('Hover me'));
        const menu = screen.getByTestId('dyn-dropdown-menu');
        expect(menu.className).toContain('menuOpen');
    });

    it('calls onItemClick when an item is clicked', () => {
        const onItemClick = vi.fn();
        render(
            <DynDropdown
                trigger={<button>Click me</button>}
                items={items}
                onItemClick={onItemClick}
            />
        );

        fireEvent.click(screen.getByText('Click me'));
        fireEvent.click(screen.getByText('Item 1'));

        expect(screen.queryByTestId('dyn-dropdown-menu')).not.toBeInTheDocument();
        expect(onItemClick).toHaveBeenCalledWith(
            expect.objectContaining({ id: '1', label: 'Item 1' }),
            expect.anything()
        );
    });

    it('closes on outside click by default', () => {
        render(
            <div>
                <div data-testid="outside">Outside</div>
                <DynDropdown trigger={<button>Click me</button>} items={items} />
            </div>
        );

        fireEvent.click(screen.getByText('Click me'));
        expect(screen.getByTestId('dyn-dropdown-menu')).toBeInTheDocument();

        fireEvent.mouseDown(screen.getByTestId('outside'));
        expect(screen.queryByTestId('dyn-dropdown-menu')).not.toBeInTheDocument();
    });
});
