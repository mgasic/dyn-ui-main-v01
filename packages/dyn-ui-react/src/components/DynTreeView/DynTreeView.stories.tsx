import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import DynTreeView from './DynTreeView';
import { DynTreeViewProps, DynTreeNode } from './DynTreeView.types';

const meta: Meta<typeof DynTreeView> = {
  title: 'Data Display/DynTreeView',
  component: DynTreeView,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A hierarchical tree component for displaying and managing nested data structures with selection, checking, and search capabilities.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    checkable: {
      control: 'boolean',
      description: 'Show checkboxes for node selection'
    },
    selectable: {
      control: 'boolean',
      description: 'Allow node selection by clicking'
    },
    multiple: {
      control: 'boolean',
      description: 'Allow multiple node selection'
    },
    showIcon: {
      control: 'boolean',
      description: 'Show node icons'
    },
    showLine: {
      control: 'boolean',
      description: 'Show connecting lines between nodes'
    },
    searchable: {
      control: 'boolean',
      description: 'Enable search functionality'
    },
    defaultExpandAll: {
      control: 'boolean',
      description: 'Expand all nodes by default'
    },
    height: {
      control: { type: 'number' },
      description: 'Fixed height for scrollable tree'
    },
  },
};

export default meta;
type Story = StoryObj<typeof DynTreeView>;

// Sample tree data
const fileSystemData: DynTreeNode[] = [
  {
    key: 'documents',
    title: 'Documents',
    icon: 'folder',
    children: [
      { key: 'doc1', title: 'Report.pdf', icon: 'file' },
      { key: 'doc2', title: 'Presentation.pptx', icon: 'file' },
      {
        key: 'projects',
        title: 'Projects',
        icon: 'folder',
        children: [
          {
            key: 'project1',
            title: 'Website Redesign',
            icon: 'desktop',
            children: [
              { key: 'wireframes', title: 'Wireframes.fig', icon: 'file' },
              { key: 'assets', title: 'Assets', icon: 'folder' },
              { key: 'code', title: 'Source Code', icon: 'settings' },
            ],
          },
          {
            key: 'project2',
            title: 'Mobile App',
            icon: 'user',
            children: [
              { key: 'mockups', title: 'Mockups.sketch', icon: 'file' },
              { key: 'prototype', title: 'Prototype.html', icon: 'share' },
            ],
          },
        ],
      },
    ],
  },
  {
    key: 'images',
    title: 'Images',
    icon: 'folder',
    children: [
      { key: 'photo1', title: 'Vacation.jpg', icon: 'file' },
      { key: 'photo2', title: 'Profile.png', icon: 'file' },
      {
        key: 'screenshots',
        title: 'Screenshots',
        icon: 'folder',
        children: [
          { key: 'screen1', title: 'Dashboard.png', icon: 'desktop' },
          { key: 'screen2', title: 'Settings.png', icon: 'settings' },
        ],
      },
    ],
  },
  {
    key: 'downloads',
    title: 'Downloads',
    icon: 'folder',
    children: [
      { key: 'software1', title: 'VSCode-Setup.exe', icon: 'download' },
      { key: 'software2', title: 'Chrome-Installer.dmg', icon: 'download' },
      { key: 'archive', title: 'Archive.zip', icon: 'folder', disabled: true },
    ],
  },
  { key: 'readme', title: 'README.md', icon: 'edit' },
];

const organizationData: DynTreeNode[] = [
  {
    key: 'ceo',
    title: 'CEO - John Smith',
    icon: 'user',
    children: [
      {
        key: 'engineering',
        title: 'Engineering',
        icon: 'settings',
        children: [
          {
            key: 'frontend',
            title: 'Frontend Team',
            icon: 'desktop',
            children: [
              { key: 'dev1', title: 'Alice Johnson - Senior Developer', icon: 'user' },
              { key: 'dev2', title: 'Bob Wilson - Developer', icon: 'user' },
              { key: 'dev3', title: 'Carol Davis - Junior Developer', icon: 'user' },
            ],
          },
          {
            key: 'backend',
            title: 'Backend Team',
            icon: 'settings',
            children: [
              { key: 'dev4', title: 'David Brown - Lead Developer', icon: 'user' },
              { key: 'dev5', title: 'Emma Taylor - Developer', icon: 'user' },
            ],
          },
        ],
      },
      {
        key: 'design',
        title: 'Design',
        icon: 'edit',
        children: [
          { key: 'designer1', title: 'Frank Miller - UI Designer', icon: 'edit' },
          { key: 'designer2', title: 'Grace Lee - UX Designer', icon: 'edit' },
        ],
      },
      {
        key: 'marketing',
        title: 'Marketing',
        icon: 'share',
        children: [
          { key: 'marketer1', title: 'Henry White - Marketing Manager', icon: 'info' },
          { key: 'marketer2', title: 'Ivy Chen - Content Creator', icon: 'edit' },
        ],
      },
    ],
  },
];

const simpleData: DynTreeNode[] = [
  {
    key: 'parent1',
    title: 'Parent Node 1',
    children: [
      { key: 'child1-1', title: 'Child 1-1' },
      { key: 'child1-2', title: 'Child 1-2' },
      {
        key: 'child1-3',
        title: 'Child 1-3',
        children: [
          { key: 'grandchild1', title: 'Grandchild 1' },
          { key: 'grandchild2', title: 'Grandchild 2' },
        ],
      },
    ],
  },
  {
    key: 'parent2',
    title: 'Parent Node 2',
    children: [
      { key: 'child2-1', title: 'Child 2-1' },
      { key: 'child2-2', title: 'Child 2-2' },
    ],
  },
  { key: 'leaf', title: 'Leaf Node' },
];

// Default story
export const Default: Story = {
  args: {
    treeData: fileSystemData,
    checkable: false,
    selectable: true,
    multiple: false,
    showIcon: true,
    showLine: false,
    searchable: false,
    defaultExpandAll: false,
  },
};

// With Checkboxes
export const WithCheckboxes: Story = {
  render: (args) => {
    const [checkedKeys, setCheckedKeys] = React.useState<string[]>(args.checkedKeys || []);

    return (
      <DynTreeView
        {...args}
        checkedKeys={checkedKeys}
        onCheck={(keys, info) => {
          setCheckedKeys(keys);
          args.onCheck?.(keys, info);
        }}
      />
    );
  },
  args: {
    ...Default.args,
    checkable: true,
    checkedKeys: ['documents', 'doc1'],
    multiple: true,
  },
};

// Multiple Selection
export const MultipleSelection: Story = {
  render: (args) => {
    const [selectedKeys, setSelectedKeys] = React.useState<string[]>(args.selectedKeys || []);

    return (
      <DynTreeView
        {...args}
        selectedKeys={selectedKeys}
        onSelect={(keys, info) => {
          setSelectedKeys(keys);
          args.onSelect?.(keys, info);
        }}
      />
    );
  },
  args: {
    ...Default.args,
    multiple: true,
    selectedKeys: ['documents', 'images'],
  },
};

// With Search
export const WithSearch: Story = {
  args: {
    ...Default.args,
    searchable: true,
    onSearch: (value) => {
      console.log('Search:', value);
    },
  },
};

// Expand All by Default
export const ExpandedByDefault: Story = {
  args: {
    ...Default.args,
    defaultExpandAll: true,
  },
};

// With Connecting Lines
export const WithLines: Story = {
  args: {
    ...Default.args,
    showLine: true,
    expandedKeys: ['documents', 'projects'],
  },
};

// Without Icons
export const WithoutIcons: Story = {
  args: {
    treeData: simpleData,
    showIcon: false,
    expandedKeys: ['parent1'],
  },
};

// Organization Chart
export const OrganizationChart: Story = {
  render: (args) => {
    const [checkedKeys, setCheckedKeys] = React.useState<string[]>([]);
    const [selectedKeys, setSelectedKeys] = React.useState<string[]>([]);

    return (
      <DynTreeView
        {...args}
        checkedKeys={checkedKeys}
        selectedKeys={selectedKeys}
        onCheck={(keys, info) => {
          setCheckedKeys(keys);
          args.onCheck?.(keys, info);
        }}
        onSelect={(keys, info) => {
          setSelectedKeys(keys);
          args.onSelect?.(keys, info);
        }}
      />
    );
  },
  args: {
    treeData: organizationData,
    checkable: true,
    selectable: true,
    showIcon: true,
    defaultExpandAll: true,
    multiple: true,
  },
};

// Fixed Height (Scrollable)
export const FixedHeight: Story = {
  args: {
    ...Default.args,
    height: 300,
    defaultExpandAll: true,
  },
};

// Empty State
export const Empty: Story = {
  args: {
    ...Default.args,
    treeData: [],
  },
};

// All Features Combined
export const AllFeatures: Story = {
  render: (args) => {
    const [checkedKeys, setCheckedKeys] = React.useState<string[]>(args.checkedKeys || []);
    const [selectedKeys, setSelectedKeys] = React.useState<string[]>(args.selectedKeys || []);
    const [expandedKeys, setExpandedKeys] = React.useState<string[]>(args.expandedKeys || []);

    return (
      <DynTreeView
        {...args}
        checkedKeys={checkedKeys}
        selectedKeys={selectedKeys}
        expandedKeys={expandedKeys}
        onCheck={(keys, info) => {
          setCheckedKeys(keys);
          args.onCheck?.(keys, info);
        }}
        onSelect={(keys, info) => {
          setSelectedKeys(keys);
          args.onSelect?.(keys, info);
        }}
        onExpand={(keys) => {
          setExpandedKeys(keys);
          args.onExpand?.(keys);
        }}
      />
    );
  },
  args: {
    treeData: fileSystemData,
    checkable: true,
    selectable: true,
    multiple: true,
    showIcon: true,
    showLine: true,
    searchable: true,
    height: 400,
    expandedKeys: ['documents'],
    checkedKeys: ['doc1', 'photo1'],
    selectedKeys: ['projects'],
  },
};
