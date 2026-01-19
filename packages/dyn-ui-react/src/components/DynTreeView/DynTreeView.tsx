import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { cn } from '../../utils/classNames';
import { DynTreeViewProps, DynTreeNode } from './DynTreeView.types';
import { DynIcon } from '../DynIcon';
import styles from './DynTreeView.module.css';

/**
 * DynTreeView Component
 * Standardized with Design Tokens & CSS Modules
 */
export const DynTreeView: React.FC<DynTreeViewProps> = ({
  treeData = [],
  checkable = true,
  selectable = true,
  multiple = false,
  expandedKeys = [],
  checkedKeys = [],
  selectedKeys = [],
  defaultExpandAll = false,
  showIcon = true,
  showLine = false,
  searchable = false,
  showSearch,
  onExpand,
  onCheck,
  onSelect,
  onSearch,
  height,
  className,
  id,
}) => {
  const [internalExpandedKeys, setInternalExpandedKeys] = useState<string[]>([]);
  const [internalCheckedKeys, setInternalCheckedKeys] = useState<string[]>([]);
  const [internalSelectedKeys, setInternalSelectedKeys] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');

  // Initial setup
  useEffect(() => {
    if (defaultExpandAll) {
      setInternalExpandedKeys(getAllKeys(treeData));
    } else if (expandedKeys.length > 0) {
      setInternalExpandedKeys(expandedKeys);
    }
  }, [defaultExpandAll, treeData, expandedKeys]);

  useEffect(() => {
    setInternalCheckedKeys(checkedKeys);
  }, [checkedKeys]);

  useEffect(() => {
    setInternalSelectedKeys(selectedKeys);
  }, [selectedKeys]);

  // Helper function to get all keys from tree data
  function getAllKeys(nodes: DynTreeNode[]): string[] {
    const keys: string[] = [];
    function collectKeys(nodeList: DynTreeNode[]) {
      nodeList.forEach(node => {
        keys.push(node.key);
        if (node.children) collectKeys(node.children);
      });
    }
    collectKeys(nodes);
    return keys;
  }

  // Filter tree data based on search
  const filteredTreeData = useMemo(() => {
    if (!searchValue.trim()) return treeData;

    function filterNodes(nodes: DynTreeNode[]): DynTreeNode[] {
      return nodes.reduce((filtered: DynTreeNode[], node) => {
        const matchesSearch = node.title.toLowerCase().includes(searchValue.toLowerCase());
        const filteredChildren = node.children ? filterNodes(node.children) : [];

        if (matchesSearch || filteredChildren.length > 0) {
          filtered.push({
            ...node,
            children: filteredChildren.length > 0 ? filteredChildren : node.children,
          });
        }
        return filtered;
      }, []);
    }
    return filterNodes(treeData);
  }, [treeData, searchValue]);

  // Handle node expansion
  const handleExpand = useCallback((key: string, expanded: boolean) => {
    const newExpandedKeys = expanded
      ? [...internalExpandedKeys, key]
      : internalExpandedKeys.filter(k => k !== key);

    setInternalExpandedKeys(newExpandedKeys);
    onExpand?.(newExpandedKeys);
  }, [internalExpandedKeys, onExpand]);

  // Handle node selection
  const handleSelect = useCallback((node: DynTreeNode, selected: boolean) => {
    if (!selectable || node.disabled) return;

    let newSelectedKeys: string[];
    if (multiple) {
      newSelectedKeys = selected
        ? [...internalSelectedKeys, node.key]
        : internalSelectedKeys.filter(k => k !== node.key);
    } else {
      newSelectedKeys = selected ? [node.key] : [];
    }

    setInternalSelectedKeys(newSelectedKeys);
    onSelect?.(newSelectedKeys);
  }, [selectable, multiple, internalSelectedKeys, onSelect]);

  // Handle node checking
  const handleCheck = useCallback((node: DynTreeNode, checked: boolean) => {
    if (!checkable || node.disabled) return;

    const newCheckedKeys = new Set(internalCheckedKeys);

    function getDescendantKeys(targetNode: DynTreeNode): string[] {
      const keys = [targetNode.key];
      if (targetNode.children) {
        targetNode.children.forEach(child => keys.push(...getDescendantKeys(child)));
      }
      return keys;
    }

    if (checked) {
      if (multiple) {
        const descendantKeys = getDescendantKeys(node);
        descendantKeys.forEach(key => newCheckedKeys.add(key));
      } else {
        newCheckedKeys.clear();
        newCheckedKeys.add(node.key);
      }
    } else {
      const descendantKeys = getDescendantKeys(node);
      descendantKeys.forEach(key => newCheckedKeys.delete(key));
    }

    const finalCheckedKeys = Array.from(newCheckedKeys);
    setInternalCheckedKeys(finalCheckedKeys);
    onCheck?.(finalCheckedKeys, { checked, node });
  }, [checkable, multiple, internalCheckedKeys, onCheck]);

  // Handle search
  const handleSearch = useCallback((value: string) => {
    setSearchValue(value);
    onSearch?.(value);

    if (value.trim()) {
      const matchingKeys = getAllKeys(filteredTreeData);
      setInternalExpandedKeys(prev => Array.from(new Set([...prev, ...matchingKeys])));
    }
  }, [onSearch, filteredTreeData]);

  // Render tree node
  const renderTreeNode = useCallback((node: DynTreeNode, level: number = 0): React.ReactNode => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = internalExpandedKeys.includes(node.key);
    const isSelected = internalSelectedKeys.includes(node.key);
    const isChecked = internalCheckedKeys.includes(node.key);

    const nodeClass = cn(
      styles.nodeContent,
      isSelected && styles.nodeSelected,
      node.disabled && styles.nodeDisabled
    );

    return (
      <div key={node.key} className={styles.node}>
        <div
          className={nodeClass}
          style={{ paddingLeft: level * 20 }}
          role="treeitem"
          aria-selected={isSelected}
          aria-expanded={hasChildren ? isExpanded : undefined}
          aria-disabled={node.disabled}
        >
          {/* Switcher */}
          {hasChildren ? (
            <div
              className={styles.switcher}
              onClick={() => handleExpand(node.key, !isExpanded)}
            >
              <DynIcon
                icon={isExpanded ? 'chevron-down' : 'chevron-right'}
                size="small"
              />
            </div>
          ) : (
            <div className={cn(styles.switcher, styles.switcherLeaf)} />
          )}

          {/* Checkbox */}
          {checkable && (
            <div className={styles.checkbox}>
              <input
                type="checkbox"
                checked={isChecked}
                disabled={node.disabled}
                onChange={(e) => handleCheck(node, e.target.checked)}
              />
            </div>
          )}

          {/* Icon */}
          {showIcon && (
            <div className={styles.icon}>
              {node.icon ? (
                typeof node.icon === 'string' ? <DynIcon icon={node.icon} size="small" /> : node.icon
              ) : (
                hasChildren ? <DynIcon icon="folder" size="small" /> : <DynIcon icon="file" size="small" />
              )}
            </div>
          )}

          {/* Title */}
          <div
            className={cn(styles.title, selectable && !node.disabled && styles.titleClickable)}
            onClick={selectable && !node.disabled ? () => handleSelect(node, !isSelected) : undefined}
          >
            {node.title}
          </div>
        </div>

        {/* Children */}
        {hasChildren && isExpanded && (
          <div className={styles.children}>
            {node.children!.map(child => renderTreeNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  }, [internalExpandedKeys, internalSelectedKeys, internalCheckedKeys, handleExpand, handleSelect, handleCheck, checkable, selectable, showIcon]);

  const treeViewClasses = cn(
    styles.root,
    showLine && styles.showLine,
    className
  );

  return (
    <div className={treeViewClasses} style={{ height }} role="tree" id={id}>
      {(showSearch ?? searchable) && (
        <div className={styles.search}>
          <input
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      )}

      <div className={styles.content}>
        {filteredTreeData.length > 0 ? (
          filteredTreeData.map(node => renderTreeNode(node))
        ) : (
          <div className={styles.empty}>
            {searchValue.trim() ? 'No matching nodes found' : 'No data available'}
          </div>
        )}
      </div>
    </div>
  );
};

export default DynTreeView;
