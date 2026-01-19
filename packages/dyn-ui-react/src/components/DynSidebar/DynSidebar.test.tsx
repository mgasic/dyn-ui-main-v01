import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DynSidebar } from './DynSidebar';
import type { DynSidebarItem } from './DynSidebar.types';

const mockItems: DynSidebarItem[] = [
    { id: 'item1', label: 'Item 1', icon: 'home', onClick: jest.fn() },
    { id: 'item2', label: 'Item 2', icon: 'settings', onClick: jest.fn() },
    { id: 'item3', label: 'Item 3', icon: 'user', onClick: jest.fn() },
];

const mockFooterItems: DynSidebarItem[] = [
    { id: 'footer1', label: 'Footer 1', icon: 'log-out', onClick: jest.fn() },
];

describe('DynSidebar', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders with default props', () => {
        render(<DynSidebar />);
        expect(screen.getByRole('complementary')).toBeInTheDocument();
    });

    it('renders items', () => {
        render(<DynSidebar items={mockItems} />);
        expect(screen.getByText('Item 1')).toBeInTheDocument();
        expect(screen.getByText('Item 2')).toBeInTheDocument();
        expect(screen.getByText('Item 3')).toBeInTheDocument();
    });

    it('renders footer items', () => {
        render(<DynSidebar items={mockItems} footerItems={mockFooterItems} />);
        expect(screen.getByText('Footer 1')).toBeInTheDocument();
    });

    it('renders header', () => {
        render(<DynSidebar header={<div>Header</div>} items={mockItems} />);
        expect(screen.getByText('Header')).toBeInTheDocument();
    });

    it('handles item click', async () => {
        const user = userEvent.setup();
        render(<DynSidebar items={mockItems} />);

        await user.click(screen.getByText('Item 1'));
        expect(mockItems[0].onClick).toHaveBeenCalled();
    });

    it('shows active item', () => {
        render(<DynSidebar items={mockItems} activeId="item2" />);
        const activeButton = screen.getByText('Item 2').closest('button');
        expect(activeButton?.className).toContain('itemActive');
    });

    it('applies collapsed state', () => {
        const { container } = render(<DynSidebar items={mockItems} collapsed />);
        expect(container.querySelector('aside')?.className).toContain('collapsed');
    });

    it('hides labels when collapsed', () => {
        render(<DynSidebar items={mockItems} collapsed />);
        // Labels should not be visible
        expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
    });

    it('shows title tooltip when collapsed', () => {
        render(<DynSidebar items={mockItems} collapsed />);
        const buttons = screen.getAllByRole('button');
        expect(buttons[0]).toHaveAttribute('title', 'Item 1');
    });

    it('applies open state for mobile', () => {
        const { container } = render(<DynSidebar items={mockItems} open />);
        expect(container.querySelector('aside')?.className).toContain('open');
    });

    it('handles disabled items', async () => {
        const disabledItem = { ...mockItems[0], disabled: true };
        render(<DynSidebar items={[disabledItem, ...mockItems.slice(1)]} />);

        const button = screen.getByText('Item 1').closest('button');
        expect(button).toBeDisabled();
    });

    it('applies custom className', () => {
        const { container } = render(<DynSidebar items={mockItems} className="custom-class" />);
        expect(container.querySelector('aside')).toHaveClass('custom-class');
    });

    it('applies custom style', () => {
        const { container } = render(<DynSidebar items={mockItems} style={{ width: '300px' }} />);
        expect(container.querySelector('aside')).toHaveStyle({ width: '300px' });
    });

    it('renders icons from string names', () => {
        render(<DynSidebar items={mockItems} />);
        // DynIcon components should be rendered
        const buttons = screen.getAllByRole('button');
        expect(buttons.length).toBe(3);
    });

    it('renders custom icon elements', () => {
        const customItems: DynSidebarItem[] = [
            { id: 'custom', label: 'Custom', icon: <span data-testid="custom-icon">🎨</span> },
        ];
        render(<DynSidebar items={customItems} />);
        expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });

    it('separates main and footer navigation', () => {
        const { container } = render(
            <DynSidebar items={mockItems} footerItems={mockFooterItems} />
        );
        const nav = container.querySelector('nav');
        const footer = container.querySelector('[class*="footer"]');

        expect(nav).toBeInTheDocument();
        expect(footer).toBeInTheDocument();
    });

    describe('accessibility', () => {
        it('renders as aside element', () => {
            render(<DynSidebar items={mockItems} />);
            expect(screen.getByRole('complementary')).toBeInTheDocument();
        });

        it('items are focusable buttons', () => {
            render(<DynSidebar items={mockItems} />);
            const buttons = screen.getAllByRole('button');
            buttons.forEach(button => {
                expect(button.tagName).toBe('BUTTON');
            });
        });

        it('buttons have type="button"', () => {
            render(<DynSidebar items={mockItems} />);
            const buttons = screen.getAllByRole('button');
            buttons.forEach(button => {
                expect(button).toHaveAttribute('type', 'button');
            });
        });
    });
});
