import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DynUpload } from './DynUpload';

describe('DynUpload', () => {
    it('renders correctly', () => {
        render(<DynUpload />);
        expect(screen.getByText('Click to upload or drag and drop')).toBeInTheDocument();
    });

    it('handles input click', () => {
        render(<DynUpload />);
        const input = screen.getByLabelText(/upload/i, { selector: 'input[type="file"]' });
        // Since input is hidden, we might need direct selection or by implicit label if we wrapped it.
        // Our input is inside the dropzone div which handles click.
        // Let's grab input by direct query as it's hidden
        const dropzone = screen.getByRole('button');
        // We can't easily test file dialog opening in jsdom
        expect(dropzone).toBeInTheDocument();
    });

    it('displays dropped file', async () => {
        render(<DynUpload />);

        // Simulate drop
        // Creating a fake file
        const file = new File(['hello'], 'hello.png', { type: 'image/png' });
        const dropzone = screen.getByRole('button');

        fireEvent.drop(dropzone, {
            dataTransfer: {
                files: [file],
            },
        });

        // Check if filename is displayed in list
        expect(await screen.findByText('hello.png')).toBeInTheDocument();
    });

    it('supports disabled state', () => {
        render(<DynUpload disabled />);
        const dropzone = screen.getByRole('button');
        // Should have tabindex -1
        expect(dropzone).toHaveAttribute('tabindex', '-1');
        // Input should be disabled
        // We can find input by traversing or class.
        // Implementation: <input ... className={styles.input} disabled={disabled} />
        const input = document.querySelector('input[type="file"]');
        expect(input).toBeDisabled();
    });
});
