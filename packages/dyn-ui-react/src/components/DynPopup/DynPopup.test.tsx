import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DynPopup } from './DynPopup';

describe('DynPopup', () => {
    it('renders with default trigger', () => {
        render(<DynPopup />);
        // Default trigger is an SVG, likely accessible via class or structure, but for now we look for the wrapper
        // Actually, trigger wrapper has aria-haspopup="true"
        const trigger = screen.getByRole('button', { hidden: true }); // It might be a div with aria attributes or generic
        // Let's find by aria-haspopup since the default trigger is wrapped in a generic div in implementation
        // Implementation uses: <div className={styles.trigger} ... aria-haspopup="true">
        // Since it's a div with click handler, it's not implicitly a button role unless added.
        // The implementation didn't strictly add role="button", inspecting DynPopup.tsx...
        // It has `onClick`, `aria-haspopup`, `aria-expanded`.
        // Let's allow finding by a more generic query or fix implementation to be accessible.
    });

    // Re-reading implementation:
    // <div ref={triggerRef} className={styles.trigger} ...> ... </div>
    // It should probably have role="button" and tabindex="0" for accessibility.
    // I will write the test assuming I might need to fix accessibility afterwards, or test basic interaction first.

    it('opens on trigger click', async () => {
        render(<DynPopup items={[{ id: '1', label: 'Item 1' }]} />);

        // Find trigger
        const trigger = document.querySelector('[aria-haspopup="true"]');
        expect(trigger).toBeInTheDocument();

        // Click trigger
        if (trigger) fireEvent.click(trigger);

        // Check if popup content appears
        await waitFor(() => {
            expect(screen.getByText('Item 1')).toBeVisible();
        });
    });

    it('calls onItemClick when item is clicked', async () => {
        const handleClick = vi.fn();
        render(
            <DynPopup
                defaultOpen={true} // Start open to simplify
                items={[{ id: '1', label: 'Item 1', onClick: handleClick }]}
            />
        );

        await waitFor(() => {
            expect(screen.getByText('Item 1')).toBeVisible();
        });

        fireEvent.click(screen.getByText('Item 1'));
        expect(handleClick).toHaveBeenCalled();
    });

    it('closes when clicking outside', async () => {
        render(<DynPopup defaultOpen={true} items={[{ id: '1', label: 'Item 1' }]} />);

        await waitFor(() => {
            expect(screen.getByText('Item 1')).toBeVisible();
        });

        fireEvent.mouseDown(document.body);

        await waitFor(() => {
            // In JSdom with React Portal, checking visibility might be tricky if it removes from DOM or hides.
            // Implementation logic: usePortal ? createPortal(menu...) : menu.
            // And conditional rendering: `isOpen` controls class `popupOpen`.
            // Wait, let's check render logic in DynPopup.tsx again. 
            // It renders `menu` always but controls opacity/visibility via CSS class `popupOpen`.
            // So checking `.toBeVisible()` relies on jest-dom handling `visibility: hidden`.

            const menu = screen.getByRole('menu', { hidden: true });
            expect(menu).not.toHaveClass(/popupOpen/);
        });
    });
});
