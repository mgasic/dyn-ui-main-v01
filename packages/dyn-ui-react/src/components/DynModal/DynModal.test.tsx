import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DynModal } from './DynModal';

describe('DynModal', () => {
    it('renders title and children when open', () => {
        render(
            <DynModal isOpen={true} onClose={() => { }} title="Test Modal">
                <div>Modal Content</div>
            </DynModal>
        );

        expect(screen.getByText('Test Modal')).toBeInTheDocument();
        expect(screen.getByText('Modal Content')).toBeInTheDocument();
    });

    it('does not render when closed', () => {
        render(
            <DynModal isOpen={false} onClose={() => { }}>
                <div>Modal Content</div>
            </DynModal>
        );

        expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
    });

    it('calls onClose when close button is clicked', () => {
        const onClose = vi.fn();
        render(
            <DynModal isOpen={true} onClose={onClose}>
                <div>Content</div>
            </DynModal>
        );

        const closeButton = screen.getByLabelText('Close modal');
        fireEvent.click(closeButton);

        expect(onClose).toHaveBeenCalled();
    });

    it('calls onClose when backdrop is clicked', () => {
        const onClose = vi.fn();
        const { container } = render(
            <DynModal isOpen={true} onClose={onClose}>
                <div>Content</div>
            </DynModal>
        );

        // Backdrop is the overlay. In our implementation it's the div wrapping the modal.
        const overlay = screen.getByRole('presentation');
        fireEvent.click(overlay);

        expect(onClose).toHaveBeenCalled();
    });

    it('calls onClose when Escape key is pressed', () => {
        const onClose = vi.fn();
        render(
            <DynModal isOpen={true} onClose={onClose}>
                <div>Content</div>
            </DynModal>
        );

        fireEvent.keyDown(document, { key: 'Escape' });

        expect(onClose).toHaveBeenCalled();
    });

    it('renders vertical stack of header, body and footer', () => {
        render(
            <DynModal
                isOpen={true}
                onClose={() => { }}
                title="Header"
                footer={<button>Footer Button</button>}
            >
                Body Content
            </DynModal>
        );

        expect(screen.getByText('Header')).toBeInTheDocument();
        expect(screen.getByText('Body Content')).toBeInTheDocument();
        expect(screen.getByText('Footer Button')).toBeInTheDocument();
    });

    it('applies size classes correctly', () => {
        const { getByRole } = render(
            <DynModal isOpen={true} onClose={() => { }} size="large">
                Content
            </DynModal>
        );
        const modal = getByRole('dialog');
        expect(modal.className).toContain('modalLarge');
    });
});
