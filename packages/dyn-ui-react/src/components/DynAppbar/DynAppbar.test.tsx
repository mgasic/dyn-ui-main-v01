import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DynAppbar } from './DynAppbar';

describe('DynAppbar', () => {
    it('renders with default props', () => {
        render(<DynAppbar data-testid="appbar" />);
        expect(screen.getByTestId('appbar')).toBeInTheDocument();
    });

    it('renders title as string', () => {
        render(<DynAppbar title="My App" />);
        expect(screen.getByText('My App')).toBeInTheDocument();
    });

    it('renders title as custom element', () => {
        render(<DynAppbar title={<span data-testid="custom-title">Custom</span>} />);
        expect(screen.getByTestId('custom-title')).toBeInTheDocument();
    });

    it('renders left content', () => {
        render(<DynAppbar leftContent={<button>Menu</button>} />);
        expect(screen.getByRole('button', { name: 'Menu' })).toBeInTheDocument();
    });

    it('renders right content', () => {
        render(<DynAppbar rightContent={<button>Settings</button>} />);
        expect(screen.getByRole('button', { name: 'Settings' })).toBeInTheDocument();
    });

    it('renders center content', () => {
        render(<DynAppbar centerContent={<input placeholder="Search" />} />);
        expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    });

    it('renders children in center slot', () => {
        render(<DynAppbar><span>Child content</span></DynAppbar>);
        expect(screen.getByText('Child content')).toBeInTheDocument();
    });

    it('applies position classes', () => {
        const { container } = render(<DynAppbar position="fixed" data-testid="appbar" />);
        const appbar = screen.getByTestId('appbar');
        expect(appbar.className).toContain('fixed');
    });

    it('applies custom className', () => {
        render(<DynAppbar className="custom-class" data-testid="appbar" />);
        expect(screen.getByTestId('appbar')).toHaveClass('custom-class');
    });

    it('renders as header element', () => {
        render(<DynAppbar data-testid="appbar" />);
        expect(screen.getByTestId('appbar').tagName).toBe('HEADER');
    });

    it('forwards ref', () => {
        const ref = React.createRef<HTMLDivElement>();
        render(<DynAppbar ref={ref} />);
        expect(ref.current).toBeInstanceOf(HTMLElement);
    });

    it('passes through additional props', () => {
        render(<DynAppbar aria-label="Main navigation" data-testid="appbar" />);
        expect(screen.getByTestId('appbar')).toHaveAttribute('aria-label', 'Main navigation');
    });

    it('renders all slots together', () => {
        render(
            <DynAppbar
                title="App Title"
                leftContent={<button>Left</button>}
                centerContent={<span>Center</span>}
                rightContent={<button>Right</button>}
            />
        );
        expect(screen.getByText('App Title')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Left' })).toBeInTheDocument();
        expect(screen.getByText('Center')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Right' })).toBeInTheDocument();
    });

    describe('positions', () => {
        it.each(['static', 'fixed', 'sticky'] as const)(
            'applies %s position class',
            (position) => {
                const { container } = render(<DynAppbar position={position} data-testid="appbar" />);
                const appbar = screen.getByTestId('appbar');

                if (position !== 'static') {
                    expect(appbar.className).toContain(position);
                } else {
                    // Static is default, no specific class applied
                    expect(appbar.className).not.toContain('fixed');
                    expect(appbar.className).not.toContain('sticky');
                }
            }
        );
    });
});
