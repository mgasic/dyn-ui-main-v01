import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import DynTable from './DynTable';
import { DynTableColumn, TableAction } from './DynTable.types';

const sampleData = [
  { id: 1, name: 'John Doe', age: 30, email: 'john@example.com', active: true },
  { id: 2, name: 'Jane Smith', age: 25, email: 'jane@example.com', active: false },
  { id: 3, name: 'Bob Johnson', age: 35, email: 'bob@example.com', active: true },
];

const sampleColumns: DynTableColumn[] = [
  { key: 'name', title: 'Name', sortable: true },
  { key: 'age', title: 'Age', type: 'number', sortable: true, align: 'right' },
  { key: 'email', title: 'Email', type: 'link' },
  { key: 'active', title: 'Active', type: 'boolean', align: 'center' },
];

const sampleActions: TableAction[] = [
  {
    key: 'edit',
    title: 'Edit',
    onClick: vi.fn(),
  },
  {
    key: 'delete',
    title: 'Delete',
    onClick: vi.fn(),
  },
];

describe('DynTable', () => {
  beforeEach(() => {
    sampleActions.forEach(action => {
      (action.onClick as ReturnType<typeof vi.fn>).mockClear();
    });
  });

  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<DynTable data={sampleData} columns={sampleColumns} />);
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    it('renders loading state', () => {
      render(<DynTable data={[]} columns={[]} loading />);
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders empty state', () => {
      render(<DynTable data={[]} columns={sampleColumns} />);
      expect(screen.getByText('No data available')).toBeInTheDocument();
    });

    it('renders all columns and data', () => {
      render(<DynTable data={sampleData} columns={sampleColumns} />);
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });

  describe('Selection', () => {
    it('renders selection checkboxes when selectable is multiple', () => {
      render(<DynTable data={sampleData} columns={sampleColumns} selectable="multiple" />);
      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes).toHaveLength(4); // 3 rows + header
    });

    it('handles row selection', () => {
      const onSelectionChange = vi.fn();
      render(
        <DynTable
          data={sampleData}
          columns={sampleColumns}
          selectable="multiple"
          onSelectionChange={onSelectionChange}
        />
      );

      const checkboxes = screen.getAllByRole('checkbox');
      fireEvent.click(checkboxes[1]); // Click first row checkbox

      expect(onSelectionChange).toHaveBeenCalledWith(['1'], [sampleData[0]]);
    });
  });

  describe('Sorting', () => {
    it('handles column sorting', () => {
      const onSort = vi.fn();
      render(
        <DynTable
          data={sampleData}
          columns={sampleColumns}
          onSort={onSort}
        />
      );

      const nameHeader = screen.getByText('Name').closest('th');
      fireEvent.click(nameHeader!);

      expect(onSort).toHaveBeenCalledWith('name', 'asc');
    });
  });

  describe('Actions', () => {
    it('renders action buttons', () => {
      render(<DynTable data={sampleData} columns={sampleColumns} actions={sampleActions} />);
      expect(screen.getAllByText('Edit')).toHaveLength(3);
    });

    it('calls action onClick handler', () => {
      render(<DynTable data={sampleData} columns={sampleColumns} actions={sampleActions} />);
      const editButtons = screen.getAllByText('Edit');
      fireEvent.click(editButtons[0]);
      expect(sampleActions[0].onClick).toHaveBeenCalledWith(sampleData[0], 0);
    });
  });

  describe('Pagination', () => {
    const pagination = {
      current: 1,
      pageSize: 2,
      total: 10,
      onChange: vi.fn(),
    };

    it('renders pagination controls', () => {
      render(
        <DynTable
          data={sampleData}
          columns={sampleColumns}
          pagination={pagination}
        />
      );
      expect(screen.getByText('Previous')).toBeInTheDocument();
      expect(screen.getByText('Next')).toBeInTheDocument();
      expect(screen.getByText('Page 1')).toBeInTheDocument();
    });

    it('handles pagination changes', () => {
      render(
        <DynTable
          data={sampleData}
          columns={sampleColumns}
          pagination={pagination}
        />
      );
      const nextButton = screen.getByText('Next');
      fireEvent.click(nextButton);
      expect(pagination.onChange).toHaveBeenCalledWith(2, 2);
    });
  });
});
