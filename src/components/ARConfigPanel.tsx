import React, { useState, useEffect } from 'react';
import type { ARXMLNode } from '../mockData';
import { HelpCircle, ChevronRight, ChevronDown, Maximize2 } from 'lucide-react';
import TreeNavigator from './TreeNavigator';

interface ARConfigPanelProps {
    selectedNode: ARXMLNode | null;
}

const ARConfigPanel: React.FC<ARConfigPanelProps> = ({ selectedNode }) => {
    const [activeNode, setActiveNode] = useState<ARXMLNode | null>(selectedNode);

    useEffect(() => {
        setActiveNode(selectedNode);
    }, [selectedNode]);

    const [sectionsOpen, setSectionsOpen] = useState({
        systemConditions: false,
        annotations: false,
        postBuild: true,
        configVariant: false
    });

    const toggleSection = (section: keyof typeof sectionsOpen) => {
        setSectionsOpen(prev => ({ ...prev, [section]: !prev[section] }));
    };

    if (!activeNode) {
        return (
            <div className="empty-state">
                <div className="empty-state-icon">📋</div>
                <div className="empty-state-text">Select an item in AR Explorer to view configuration</div>
            </div>
        );
    }



    return (
        <div className="detail-editor" style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#fff', color: 'var(--text-primary)' }}>
            {/* Header */}
            <div style={{
                padding: '4px 10px',
                backgroundColor: 'var(--bg-panel)',
                borderBottom: '1px solid var(--border-color)',
                fontSize: '11px',
                display: 'flex',
                alignItems: 'center',
                height: '28px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', flex: 1, overflow: 'hidden' }}>
                    <span style={{ fontWeight: 600, marginRight: 5 }}>{activeNode.type === 'element' ? 'CanHardwareObject' : activeNode.type}</span>
                    <span style={{ color: '#0066cc', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        "{activeNode.label}"
                    </span>
                </div>
                <div style={{ marginLeft: '10px', display: 'flex', gap: 6 }}>
                    <Maximize2 size={12} color="var(--text-secondary)" style={{ cursor: 'pointer' }} />
                </div>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'row', overflow: 'hidden' }}>

                {/* Left: Internal Structure */}
                <div style={{ width: '250px', display: 'flex', flexDirection: 'column', borderRight: '1px solid var(--border-color)', backgroundColor: 'var(--bg-editor)' }}>
                    <div style={{ padding: '2px 5px', borderBottom: '1px solid var(--border-color)', fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                        Internal Structure
                    </div>
                    <div style={{ padding: '4px' }}>
                        <input
                            type="text"
                            placeholder="type filter text"
                            style={{
                                width: '100%',
                                padding: '2px 4px',
                                fontSize: '11px',
                                border: '1px solid var(--border-color)',
                                backgroundColor: 'var(--bg-input)',
                                color: 'var(--text-primary)'
                            }}
                        />
                    </div>
                    <div style={{ flex: 1, overflow: 'auto' }}>
                        <TreeNavigator onSelect={setActiveNode} />
                    </div>
                </div>

                {/* Center: Properties Table */}
                <div style={{ flex: 3, display: 'flex', flexDirection: 'column', borderRight: '1px solid var(--border-color)', minWidth: '300px', backgroundColor: 'var(--bg-editor)' }}>
                    <div style={{ flex: 1, overflow: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
                            <thead>
                                <tr style={{ backgroundColor: 'var(--bg-panel)', textAlign: 'left', color: 'var(--text-primary)' }}>
                                    <th style={{ width: 20, borderTop: '0', borderLeft: '0', borderRight: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: 2, textAlign: 'center' }}>?</th>
                                    <th style={{ borderBottom: '1px solid var(--border-color)', borderRight: '1px solid var(--border-color)', padding: '3px 6px', fontWeight: 'bold' }}>Name</th>
                                    <th style={{ borderBottom: '1px solid var(--border-color)', borderRight: '1px solid var(--border-color)', padding: '3px 6px', fontWeight: 'bold' }}>Value</th>
                                    <th style={{ width: 30, borderBottom: '1px solid var(--border-color)', borderRight: '1px solid var(--border-color)', padding: 2, textAlign: 'center' }}>...</th>
                                    <th style={{ width: 50, borderBottom: '1px solid var(--border-color)', padding: 2, textAlign: 'center' }}>Orig</th>
                                </tr>
                            </thead>
                            <tbody>
                                {activeNode.properties && Object.entries(activeNode.properties).map(([key, value]) => (
                                    <tr key={key} style={{ borderBottom: '1px solid var(--border-light)' }}>
                                        <td style={{ borderRight: '1px solid var(--border-color)', textAlign: 'center' }}><HelpCircle size={10} color="var(--text-secondary)" /></td>
                                        <td style={{ borderRight: '1px solid var(--border-color)', padding: '3px 6px' }}>{key}</td>
                                        <td style={{ borderRight: '1px solid var(--border-color)', padding: '3px 6px' }}>{String(value)}</td>
                                        <td style={{ borderRight: '1px solid var(--border-color)', textAlign: 'center' }}>+</td>
                                        <td style={{ textAlign: 'center' }}>[~]</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Right: Sidebar */}
                <div style={{ flex: 2, display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-editor)', minWidth: '200px' }}>
                    <div style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <div onClick={() => toggleSection('systemConditions')} style={{ padding: '4px 8px', backgroundColor: 'var(--bg-panel)', display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '11px', fontWeight: 600 }}>
                            {sectionsOpen.systemConditions ? <ChevronDown size={12} style={{ marginRight: 5 }} /> : <ChevronRight size={12} style={{ marginRight: 5 }} />}
                            System Conditions
                        </div>
                        {sectionsOpen.systemConditions && (<div style={{ padding: 10 }}>...</div>)}
                    </div>
                    <div style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <div onClick={() => toggleSection('annotations')} style={{ padding: '4px 8px', backgroundColor: 'var(--bg-panel)', display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '11px', fontWeight: 600 }}>
                            {sectionsOpen.annotations ? <ChevronDown size={12} style={{ marginRight: 5 }} /> : <ChevronRight size={12} style={{ marginRight: 5 }} />}
                            Annotations
                        </div>
                        {sectionsOpen.annotations && (<div style={{ padding: 10 }}>...</div>)}
                    </div>
                    <div style={{ borderBottom: '1px solid var(--border-color)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <div onClick={() => toggleSection('postBuild')} style={{ padding: '4px 8px', backgroundColor: '#dcebf5', color: '#000', display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '11px', fontWeight: 600, borderTop: '2px solid #007acc' }}>
                            {sectionsOpen.postBuild ? <ChevronDown size={12} style={{ marginRight: 5 }} /> : <ChevronRight size={12} style={{ marginRight: 5 }} />}
                            Post Build Variants
                        </div>
                        {sectionsOpen.postBuild && (
                            <div style={{ flex: 1, padding: 0 }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
                                    <thead>
                                        <tr style={{ textAlign: 'left', backgroundColor: 'var(--bg-panel)' }}>
                                            <th style={{ borderBottom: '1px solid var(--border-color)', borderRight: '1px solid var(--border-color)', padding: 4, fontWeight: 'normal', color: 'var(--text-secondary)' }}>Post Build Variant Criterion</th>
                                            <th style={{ borderBottom: '1px solid var(--border-color)', padding: 4, fontWeight: 'normal', color: 'var(--text-secondary)' }}>Value</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr><td style={{ borderRight: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: 8 }}></td><td style={{ borderBottom: '1px solid var(--border-color)', padding: 8 }}></td></tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                    <div style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <div onClick={() => toggleSection('configVariant')} style={{ padding: '4px 8px', backgroundColor: 'var(--bg-panel)', display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '11px', fontWeight: 600 }}>
                            {sectionsOpen.configVariant ? <ChevronDown size={12} style={{ marginRight: 5 }} /> : <ChevronRight size={12} style={{ marginRight: 5 }} />}
                            Implemented Config Variant
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ARConfigPanel;
