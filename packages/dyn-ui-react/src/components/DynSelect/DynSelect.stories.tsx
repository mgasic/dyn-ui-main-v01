import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DynSelect } from './DynSelect';

const meta: Meta<typeof DynSelect> = {
  title: 'Components/DynSelect',
  component: DynSelect,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof DynSelect>;

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date', disabled: true },
  { value: 'elderberry', label: 'Elderberry' },
];

export const Default: Story = {
  args: {
    label: 'Select Fruit',
    options,
    placeholder: 'Choose a fruit...',
  },
};

export const MultiSelect: Story = {
  args: {
    label: 'Select Multiple Fruits',
    options,
    multiple: true,
    placeholder: 'Choose fruits...',
  },
};

export const Searchable: Story = {
  args: {
    label: 'Search Fruit',
    options,
    searchable: true,
    placeholder: 'Search fruit...',
  },
};

export const WithError: Story = {
  args: {
    label: 'Required Selection',
    options,
    placeholder: 'Choose a fruit...',
    required: true,
    errorText: 'This field is required',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Select',
    options,
    disabled: true,
    placeholder: 'Cannot select...',
  },
};
