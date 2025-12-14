import React, { useState } from 'react';
import { mockPortsData, mockInternalBehaviorsData, mockRunnablesData } from '../mockData';
import type { PortData, InternalBehaviorData, RunnableData } from '../mockData';

interface EditorPanelProps {
    selectedSwc: { id: string; name: string } | null;
    onRowSelect?: (row: PortData | InternalBehaviorData | RunnableData, tabType: string) => void;
}

const TABS = [
    { id: 'ports', label: 'Ports', icon: '🔌' },
    { id: 'internal-behaviors', label: 'Internal Behaviors', icon: '⚙️' },
    { id: 'runnables', label: 'Runnables', icon: '▶️' }
];

const EditorPanel: React.FC<EditorPanelProps> = ({ selectedSwc, onRowSelect }) => {
    const [activeTab, setActiveTab] = useState('ports');
    const [selectedRowId, setSelectedRowId] = useState<string | null>(null);

    const handleRowClick = (row: PortData | InternalBehaviorData | RunnableData) => {
        setSelectedRowId(row.id);
        if (onRowSelect) onRowSelect(row, activeTab);
    };

    const renderPortsTable = () => (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
                <tr>
                    <th style={{ position: 'sticky', top: 0, background: 'var(--bg-header)', padding: '6px 10px', textAlign: 'left', fontWeight: 500, color: 'var(--text-header)', borderBottom: '1px solid var(--border-color)' }}>Name</th>
                    <th style={{ position: 'sticky', top: 0, background: 'var(--bg-header)', padding: '6px 10px', textAlign: 'left', fontWeight: 500, color: 'var(--text-header)', borderBottom: '1px solid var(--border-color)' }}>Type</th>
                    <th style={{ position: 'sticky', top: 0, background: 'var(--bg-header)', padding: '6px 10px', textAlign: 'left', fontWeight: 500, color: 'var(--text-header)', borderBottom: '1px solid var(--border-color)' }}>Interface</th>
                </tr>
            </thead>
            <tbody>
                {mockPortsData.map(row => (
                    <tr
                        key={row.id}
                        className={selectedRowId === row.id ? 'selected' : ''}
                        onClick={() => handleRowClick(row)}
                        style={{ cursor: 'pointer' }}
                    >
                        <td style={{ padding: '5px 10px', borderBottom: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>{row.name}</td>
                        <td style={{ padding: '5px 10px', borderBottom: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
                            <span style={{
                                display: 'inline-block',
                                padding: '2px 8px',
                                borderRadius: '2px',
                                fontSize: '10px',
                                fontWeight: 500,
                                background: row.type === 'RequiredPort' ? 'rgba(78, 201, 176, 0.2)' : 'rgba(220, 220, 170, 0.2)',
                                color: row.type === 'RequiredPort' ? 'var(--icon-port-r)' : 'var(--icon-port-p)',
                                marginRight: '6px'
                            }}>
                                {row.type === 'RequiredPort' ? 'R' : 'P'}
                            </span>
                            {row.type}
                        </td>
                        <td style={{ padding: '5px 10px', borderBottom: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>{row.interface}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    const renderInternalBehaviorsTable = () => (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
                <tr>
                    <th style={{ position: 'sticky', top: 0, background: 'var(--bg-header)', padding: '6px 10px', textAlign: 'left', fontWeight: 500, color: 'var(--text-header)', borderBottom: '1px solid var(--border-color)' }}>Name</th>
                    <th style={{ position: 'sticky', top: 0, background: 'var(--bg-header)', padding: '6px 10px', textAlign: 'left', fontWeight: 500, color: 'var(--text-header)', borderBottom: '1px solid var(--border-color)' }}>Short Name</th>
                    <th style={{ position: 'sticky', top: 0, background: 'var(--bg-header)', padding: '6px 10px', textAlign: 'left', fontWeight: 500, color: 'var(--text-header)', borderBottom: '1px solid var(--border-color)' }}>Description</th>
                </tr>
            </thead>
            <tbody>
                {mockInternalBehaviorsData.map(row => (
                    <tr
                        key={row.id}
                        className={selectedRowId === row.id ? 'selected' : ''}
                        onClick={() => handleRowClick(row)}
                        style={{ cursor: 'pointer' }}
                    >
                        <td style={{ padding: '5px 10px', borderBottom: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>{row.name}</td>
                        <td style={{ padding: '5px 10px', borderBottom: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>{row.shortName}</td>
                        <td style={{ padding: '5px 10px', borderBottom: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>{row.description}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    const renderRunnablesTable = () => (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
                <tr>
                    <th style={{ position: 'sticky', top: 0, background: 'var(--bg-header)', padding: '6px 10px', textAlign: 'left', fontWeight: 500, color: 'var(--text-header)', borderBottom: '1px solid var(--border-color)' }}>Name</th>
                    <th style={{ position: 'sticky', top: 0, background: 'var(--bg-header)', padding: '6px 10px', textAlign: 'left', fontWeight: 500, color: 'var(--text-header)', borderBottom: '1px solid var(--border-color)' }}>Symbol</th>
                    <th style={{ position: 'sticky', top: 0, background: 'var(--bg-header)', padding: '6px 10px', textAlign: 'left', fontWeight: 500, color: 'var(--text-header)', borderBottom: '1px solid var(--border-color)' }}>Concurrent</th>
                </tr>
            </thead>
            <tbody>
                {mockRunnablesData.map(row => (
                    <tr
                        key={row.id}
                        className={selectedRowId === row.id ? 'selected' : ''}
                        onClick={() => handleRowClick(row)}
                        style={{ cursor: 'pointer' }}
                    >
                        <td style={{ padding: '5px 10px', borderBottom: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>{row.name}</td>
                        <td style={{ padding: '5px 10px', borderBottom: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>{row.symbol}</td>
                        <td style={{ padding: '5px 10px', borderBottom: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>{row.canBeInvokedConcurrently ? 'Yes' : 'No'}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    const renderContent = () => {
        if (!selectedSwc) {
            return (
                <div className="empty-state">
                    <span className="empty-state-icon">📋</span>
                    <span className="empty-state-text">Select a Software Component to view its contents</span>
                </div>
            );
        }

        switch (activeTab) {
            case 'ports':
                return mockPortsData.length > 0 ? renderPortsTable() : (
                    <div className="empty-state">
                        <span className="empty-state-icon">🔌</span>
                        <span className="empty-state-text">No ports defined. Click "Add" to create a new port.</span>
                    </div>
                );
            case 'internal-behaviors':
                return mockInternalBehaviorsData.length > 0 ? renderInternalBehaviorsTable() : (
                    <div className="empty-state">
                        <span className="empty-state-icon">⚙️</span>
                        <span className="empty-state-text">No internal behaviors defined.</span>
                    </div>
                );
            case 'runnables':
                return mockRunnablesData.length > 0 ? renderRunnablesTable() : (
                    <div className="empty-state">
                        <span className="empty-state-icon">▶️</span>
                        <span className="empty-state-text">No runnables defined.</span>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: 'var(--bg-editor)' }}>
            <div style={{ display: 'flex', background: 'var(--bg-header)', borderBottom: '1px solid var(--border-color)', minHeight: '28px' }}>
                {TABS.map(tab => (
                    <button
                        key={tab.id}
                        style={{
                            padding: '6px 14px',
                            background: activeTab === tab.id ? 'var(--tab-active)' : 'var(--tab-inactive)',
                            borderRight: '1px solid var(--border-color)',
                            cursor: 'pointer',
                            fontSize: '12px',
                            color: activeTab === tab.id ? 'var(--text-bright)' : 'var(--text-secondary)',
                            borderBottom: activeTab === tab.id ? '2px solid var(--accent-blue)' : 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                        }}
                        onClick={() => {
                            setActiveTab(tab.id);
                            setSelectedRowId(null);
                        }}
                    >
                        <span style={{ fontSize: '10px' }}>{tab.icon}</span>
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="toolbar">
                <button className="toolbar-btn" title="Add">➕</button>
                <button className="toolbar-btn" title="Delete">🗑️</button>
                <div className="toolbar-separator" />
                <button className="toolbar-btn" title="Move Up">⬆️</button>
                <button className="toolbar-btn" title="Move Down">⬇️</button>
            </div>

            <div style={{ flex: 1, overflow: 'auto' }}>
                {renderContent()}
            </div>
        </div>
    );
};

export default EditorPanel;
