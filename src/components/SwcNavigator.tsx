import React, { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { mockSwcTypesTree } from '../mockData';
import type { SwcNode } from '../mockData';

interface SwcNavigatorProps {
    onSelect: (node: { id: string; name: string; type: string }) => void;
}

// Icons for SWC tree
const FolderIcon = () => <span style={{ color: 'var(--icon-folder)' }}>📁</span>;
const SwcIcon = () => <span style={{ color: 'var(--icon-swc)' }}>🔷</span>;
const RPortIcon = () => <span style={{ color: 'var(--icon-port-r)' }}>◀</span>;
const PPortIcon = () => <span style={{ color: 'var(--icon-port-p)' }}>▶</span>;
const IBIcon = () => <span style={{ color: 'var(--icon-ib)' }}>⚙</span>;

const getIcon = (type: string) => {
    switch (type) {
        case 'folder': return <FolderIcon />;
        case 'swc': return <SwcIcon />;
        case 'rport': return <RPortIcon />;
        case 'pport': return <PPortIcon />;
        case 'ib': return <IBIcon />;
        default: return <FolderIcon />;
    }
};

interface TreeNodeProps {
    node: SwcNode;
    selectedId: string | null;
    onSelect: (node: { id: string; name: string; type: string }) => void;
    onToggle: (nodeId: string) => void;
    level: number;
}

const TreeNodeComponent: React.FC<TreeNodeProps> = ({ node, selectedId, onSelect, onToggle, level }) => {
    const hasChildren = node.children && node.children.length > 0;
    const isSelected = selectedId === node.id;

    return (
        <div>
            <div
                className={`tree-node ${isSelected ? 'selected' : ''}`}
                style={{ paddingLeft: `${level * 12 + 4}px`, display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '1px 4px', gap: '2px', minHeight: '20px' }}
                onClick={() => onSelect({ id: node.id, name: node.name, type: node.type })}
            >
                <span
                    style={{ width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: hasChildren ? 'pointer' : 'default' }}
                    onClick={(e) => {
                        e.stopPropagation();
                        if (hasChildren) onToggle(node.id);
                    }}
                >
                    {hasChildren && (
                        node.expanded ? <ChevronDown size={10} color="var(--text-secondary)" /> : <ChevronRight size={10} color="var(--text-secondary)" />
                    )}
                </span>
                <span style={{ marginRight: 4, fontSize: '10px' }}>{getIcon(node.type)}</span>
                <span style={{ fontSize: 12, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{node.name}</span>
            </div>
            {hasChildren && node.expanded && (
                <div>
                    {node.children!.map(child => (
                        <TreeNodeComponent
                            key={child.id}
                            node={child}
                            selectedId={selectedId}
                            onSelect={onSelect}
                            onToggle={onToggle}
                            level={level + 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const SwcNavigator: React.FC<SwcNavigatorProps> = ({ onSelect }) => {
    const [treeData, setTreeData] = useState<SwcNode>(mockSwcTypesTree);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const handleSelect = (node: { id: string; name: string; type: string }) => {
        setSelectedId(node.id);
        onSelect(node);
    };

    const toggleNode = (nodes: SwcNode, nodeId: string): SwcNode => {
        if (nodes.id === nodeId) {
            return { ...nodes, expanded: !nodes.expanded };
        }
        if (nodes.children && nodes.children.length > 0) {
            return {
                ...nodes,
                children: nodes.children.map(child => toggleNode(child, nodeId))
            };
        }
        return nodes;
    };

    const handleToggle = (nodeId: string) => {
        setTreeData(prev => toggleNode(prev, nodeId));
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: 'var(--bg-panel)' }}>
            <div className="panel-header">
                <span className="panel-header-title">SwcTypes</span>
            </div>
            <div className="toolbar">
                <button className="toolbar-btn" title="Add">➕</button>
                <button className="toolbar-btn" title="Delete">🗑️</button>
                <div className="toolbar-separator" />
                <button className="toolbar-btn" title="Refresh">🔄</button>
                <button className="toolbar-btn" title="Collapse All">📂</button>
            </div>
            <div style={{ flex: 1, overflow: 'auto', padding: '2px 0' }}>
                <TreeNodeComponent
                    node={treeData}
                    selectedId={selectedId}
                    onSelect={handleSelect}
                    onToggle={handleToggle}
                    level={0}
                />
            </div>
        </div>
    );
};

export default SwcNavigator;
