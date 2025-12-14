import React, { useState } from 'react';
import { mockAvailableInterfaces } from '../mockData';

interface PropertiesPanelProps {
    selectedItem: {
        id: string;
        name?: string;
        type?: string;
        interface?: string;
        shortName?: string;
        description?: string;
        symbol?: string;
        canBeInvokedConcurrently?: boolean;
    } | null;
    itemType: string | null;
    onPropertyChange?: (field: string, value: string | boolean) => void;
}

const TABS = [
    { id: 'general', label: 'General' },
    { id: 'details', label: 'Details' }
];

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({ selectedItem, itemType, onPropertyChange }) => {
    const [activeTab, setActiveTab] = useState('general');

    const handleInputChange = (field: string, value: string | boolean) => {
        console.log(`Property changed: ${field} = ${value}`);
        if (onPropertyChange) {
            onPropertyChange(field, value);
        }
    };

    if (!selectedItem) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: 'var(--bg-panel)' }}>
                <div className="panel-header">
                    <span className="panel-header-title">Properties</span>
                </div>
                <div className="empty-state">
                    <span className="empty-state-icon">📋</span>
                    <span className="empty-state-text">Select an item to view and edit its properties</span>
                </div>
            </div>
        );
    }

    const renderPortProperties = () => (
        <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px', paddingBottom: '4px', borderBottom: '1px solid var(--border-color)' }}>
                Port Configuration
            </div>

            <div style={{ marginBottom: '10px' }}>
                <label style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '3px', display: 'block' }}>Name</label>
                <input
                    type="text"
                    style={{ width: '100%', padding: '4px 8px', fontSize: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)', borderRadius: '2px' }}
                    value={selectedItem.name || ''}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                />
            </div>

            <div style={{ marginBottom: '10px' }}>
                <label style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '3px', display: 'block' }}>Type</label>
                <select
                    style={{ width: '100%', padding: '4px 8px', fontSize: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)', borderRadius: '2px' }}
                    value={selectedItem.type || 'RequiredPort'}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                >
                    <option value="RequiredPort">RequiredPort (R-Port)</option>
                    <option value="ProvidedPort">ProvidedPort (P-Port)</option>
                </select>
            </div>

            <div style={{ marginBottom: '10px' }}>
                <label style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '3px', display: 'block' }}>Interface</label>
                <select
                    style={{ width: '100%', padding: '4px 8px', fontSize: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)', borderRadius: '2px' }}
                    value={selectedItem.interface || ''}
                    onChange={(e) => handleInputChange('interface', e.target.value)}
                >
                    <option value="">-- Select Interface --</option>
                    {mockAvailableInterfaces.map(iface => (
                        <option key={iface} value={iface}>{iface}</option>
                    ))}
                </select>
            </div>
        </div>
    );

    const renderSwcProperties = () => (
        <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px', paddingBottom: '4px', borderBottom: '1px solid var(--border-color)' }}>
                Component Information
            </div>

            <div style={{ marginBottom: '10px' }}>
                <label style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '3px', display: 'block' }}>Short Name</label>
                <input
                    type="text"
                    style={{ width: '100%', padding: '4px 8px', fontSize: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)', borderRadius: '2px' }}
                    value={selectedItem.name || ''}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                />
            </div>

            <div style={{ marginBottom: '10px' }}>
                <label style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '3px', display: 'block' }}>Category</label>
                <select
                    style={{ width: '100%', padding: '4px 8px', fontSize: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)', borderRadius: '2px' }}
                    defaultValue="APPLICATION"
                    onChange={(e) => handleInputChange('category', e.target.value)}
                >
                    <option value="APPLICATION">APPLICATION</option>
                    <option value="SENSOR_ACTUATOR">SENSOR_ACTUATOR</option>
                    <option value="SERVICE">SERVICE</option>
                </select>
            </div>

            <div style={{ marginBottom: '10px' }}>
                <label style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '3px', display: 'block' }}>Description</label>
                <textarea
                    style={{ width: '100%', minHeight: '60px', padding: '6px 8px', fontSize: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)', borderRadius: '2px', resize: 'vertical', fontFamily: 'inherit' }}
                    value={selectedItem.description || ''}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Enter component description..."
                />
            </div>
        </div>
    );

    const renderRunnableProperties = () => (
        <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px', paddingBottom: '4px', borderBottom: '1px solid var(--border-color)' }}>
                Runnable Configuration
            </div>

            <div style={{ marginBottom: '10px' }}>
                <label style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '3px', display: 'block' }}>Name</label>
                <input
                    type="text"
                    style={{ width: '100%', padding: '4px 8px', fontSize: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)', borderRadius: '2px' }}
                    value={selectedItem.name || ''}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                />
            </div>

            <div style={{ marginBottom: '10px' }}>
                <label style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '3px', display: 'block' }}>Symbol</label>
                <input
                    type="text"
                    style={{ width: '100%', padding: '4px 8px', fontSize: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)', borderRadius: '2px' }}
                    value={selectedItem.symbol || ''}
                    onChange={(e) => handleInputChange('symbol', e.target.value)}
                />
            </div>

            <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <input
                    type="checkbox"
                    id="concurrent"
                    style={{ width: '14px', height: '14px', cursor: 'pointer', accentColor: 'var(--accent-blue)' }}
                    checked={selectedItem.canBeInvokedConcurrently || false}
                    onChange={(e) => handleInputChange('canBeInvokedConcurrently', e.target.checked)}
                />
                <label htmlFor="concurrent" style={{ fontSize: '12px', color: 'var(--text-primary)', cursor: 'pointer' }}>Can Be Invoked Concurrently</label>
            </div>
        </div>
    );

    const renderProperties = () => {
        switch (itemType) {
            case 'port':
            case 'ports':
                return renderPortProperties();
            case 'swc':
                return renderSwcProperties();
            case 'runnables':
                return renderRunnableProperties();
            default:
                return renderSwcProperties();
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: 'var(--bg-panel)' }}>
            <div className="panel-header">
                <span className="panel-header-title">Properties</span>
            </div>

            <div style={{ display: 'flex', background: 'var(--bg-header)', borderBottom: '1px solid var(--border-color)' }}>
                {TABS.map(tab => (
                    <button
                        key={tab.id}
                        style={{
                            padding: '5px 12px',
                            background: activeTab === tab.id ? 'var(--tab-active)' : 'var(--tab-inactive)',
                            borderRight: '1px solid var(--border-color)',
                            cursor: 'pointer',
                            fontSize: '11px',
                            color: activeTab === tab.id ? 'var(--text-bright)' : 'var(--text-secondary)',
                            borderBottom: activeTab === tab.id ? '2px solid var(--accent-blue)' : 'none',
                        }}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div style={{ flex: 1, overflow: 'auto', padding: '12px' }}>
                {activeTab === 'general' && renderProperties()}
                {activeTab === 'details' && (
                    <div style={{ marginBottom: '16px' }}>
                        <div style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px', paddingBottom: '4px', borderBottom: '1px solid var(--border-color)' }}>
                            Additional Details
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '3px', display: 'block' }}>ID</label>
                            <input
                                type="text"
                                style={{ width: '100%', padding: '4px 8px', fontSize: '12px', border: '1px solid transparent', background: 'var(--bg-dark)', color: 'var(--text-primary)', borderRadius: '2px' }}
                                value={selectedItem.id || ''}
                                readOnly
                            />
                        </div>
                    </div>
                )}
            </div>

            <div style={{ display: 'flex', gap: '8px', padding: '12px', borderTop: '1px solid var(--border-color)', background: 'var(--bg-toolbar)' }}>
                <button style={{ padding: '5px 14px', borderRadius: '2px', fontSize: '11px', fontWeight: 500, background: 'var(--accent-blue)', color: 'white', border: 'none', cursor: 'pointer' }}>
                    Apply
                </button>
                <button style={{ padding: '5px 14px', borderRadius: '2px', fontSize: '11px', fontWeight: 500, background: 'var(--bg-panel)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', cursor: 'pointer' }}>
                    Reset
                </button>
            </div>
        </div>
    );
};

export default PropertiesPanel;
