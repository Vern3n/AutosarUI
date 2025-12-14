import React, { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { mockARData } from '../mockData';
import type { ARXMLNode } from '../mockData';

interface TreeNavigatorProps {
    onSelect: (node: ARXMLNode) => void;
}

const TreeNavigator: React.FC<TreeNavigatorProps> = ({ onSelect }) => {
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [filterText, setFilterText] = useState('');

    const toggleExpand = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleSelect = (node: ARXMLNode) => {
        setSelectedId(node.id);
        onSelect(node);
    };

    // Icons removed per user request
    const getIcon = () => {
        return null;
    };

    const renderTree = (nodes: ARXMLNode[], depth: number = 0) => {
        return nodes.map(node => {
            const isExpanded = expanded[node.id];

            return (
                <div key={node.id}>
                    <div
                        className={`tree-node ${selectedId === node.id ? 'selected' : ''}`}
                        style={{
                            paddingLeft: depth * 16 + 4,
                            paddingTop: 2,
                            paddingBottom: 2,
                            paddingRight: 4,
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer'
                        }}
                        onClick={() => handleSelect(node)}
                    >
                        <span onClick={(e) => toggleExpand(node.id, e)} style={{ width: 16, display: 'flex', justifyContent: 'center' }}>
                            {node.children && node.children.length > 0 && (
                                isExpanded ? <ChevronDown size={12} color="var(--text-secondary)" /> : <ChevronRight size={12} color="var(--text-secondary)" />
                            )}
                        </span>
                        {getIcon()}
                        <span style={{ fontSize: 12, whiteSpace: 'nowrap', color: 'var(--text-primary)' }}>{node.label}</span>
                    </div>
                    {isExpanded && node.children && (
                        <div>
                            {renderTree(node.children, depth + 1)}
                        </div>
                    )}
                </div>
            );
        });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: 'var(--bg-panel)' }}>
            <div className="panel-header">
                <span className="panel-header-title">AR Navigator</span>
            </div>
            <div style={{ padding: '4px 6px', borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-toolbar)' }}>
                <input
                    type="text"
                    placeholder="type filter text"
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '3px 6px',
                        fontSize: '12px',
                        border: '1px solid var(--border-color)',
                        backgroundColor: 'var(--bg-input)',
                        color: 'var(--text-primary)',
                        borderRadius: '2px',
                    }}
                />
            </div>
            <div style={{ flex: 1, overflow: 'auto', paddingTop: 5 }}>
                {renderTree(mockARData)}
            </div>
        </div>
    );
};

export default TreeNavigator;
