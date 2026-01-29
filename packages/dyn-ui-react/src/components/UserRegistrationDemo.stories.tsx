import type { Meta, StoryObj } from '@storybook/react';
import { UserRegistrationDemo } from './UserRegistrationDemo';

const meta: Meta<typeof UserRegistrationDemo> = {
    title: 'Integration/UserRegistrationDemo',
    component: UserRegistrationDemo,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof UserRegistrationDemo>;

export const RegistrationFlow: Story = {
    args: {
        pageId: 3,
    },
};
