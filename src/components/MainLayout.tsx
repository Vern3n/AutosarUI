import React, { useState } from 'react';
import { Layout, Model, TabNode, Actions, DockLocation } from 'flexlayout-react';
import { defaultLayoutConfig } from './layoutConfig';
import TreeNavigator from './TreeNavigator';
import EditorPanel from './EditorPanel';
import PropertiesPanel from './PropertiesPanel';
import SwcNavigator from './SwcNavigator';
import type { ARXMLNode, PortData, InternalBehaviorData, RunnableData } from '../mockData';
import ARConfigPanel from './ARConfigPanel';
import TerminalPanel from './TerminalPanel';
import '../index.css';

const MainLayout: React.FC = () => {
    const [selectedNode, setSelectedNode] = useState<ARXMLNode | null>(null);
    const [selectedSwc, setSelectedSwc] = useState<{ id: string; name: string } | null>(null);
    const [selectedItem, setSelectedItem] = useState<PortData | InternalBehaviorData | RunnableData | null>(null);
    const [selectedItemType, setSelectedItemType] = useState<string | null>(null);

    const [model, setModel] = useState(() => Model.fromJson(defaultLayoutConfig));

    // Requests from menu

    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [showViewSubMenu, setShowViewSubMenu] = useState(false);

    // ... effects

    React.useEffect(() => {
        const handleClickOutside = () => setActiveMenu(null);
        window.addEventListener('click', handleClickOutside);
        return () => window.removeEventListener('click', handleClickOutside);
    }, []);

    const handleMenuClick = (e: React.MouseEvent, menuName: string) => {
        e.stopPropagation();
        if (activeMenu === menuName) {
            setActiveMenu(null);
        } else {
            setActiveMenu(menuName);
            setShowViewSubMenu(false);
        }
    };

    const handleSubMenuClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowViewSubMenu(!showViewSubMenu);
    };

    const closeMenu = () => {
        setActiveMenu(null);
        setShowViewSubMenu(false);
    };

    const resetLayout = () => {
        const newModel = Model.fromJson(defaultLayoutConfig);
        setModel(newModel);
        closeMenu();
    };

    const showView = (component: string, name: string) => {
        model.doAction(Actions.addNode({
            type: "tab",
            component: component,
            name: name,
            id: component + "_" + Date.now(), // Ensure unique ID
            enableClose: true
        }, "main_tabset", DockLocation.CENTER, -1));
        closeMenu();
    };

    const handleARNodeSelect = (node: ARXMLNode) => {
        setSelectedNode(node);
        console.log('AR Node selected:', node);

        // Check if tab exists in model
        const nodeExists = model.getNodeById("ar_config_view_tab");

        if (nodeExists) {
            console.log('Tab exists, selecting it');
            model.doAction(Actions.selectTab("ar_config_view_tab"));
        } else {
            console.log('Adding AR Config tab to main_tabset...');
            model.doAction(Actions.addNode({
                type: "tab",
                component: "ar_config_panel",
                name: "AR Config",
                id: "ar_config_view_tab",
                enableClose: true
            }, "main_tabset", DockLocation.CENTER, -1));
        }
    };

    const handleSwcSelect = (node: { id: string; name: string; type: string }) => {
        if (node.type === 'swc') {
            setSelectedSwc(node);
            setSelectedItem(null);
            setSelectedItemType('swc');
            try {
                model.doAction(Actions.selectTab("editor_panel"));
            } catch (e) {
                console.error("Could not select SW Component Config tab", e);
            }
        } else {
            setSelectedItem({ id: node.id, name: node.name } as PortData);
            setSelectedItemType(node.type);
        }
    };

    const handleRowSelect = (row: PortData | InternalBehaviorData | RunnableData, tabType: string) => {
        setSelectedItem(row);
        setSelectedItemType(tabType);
    };

    const factory = (node: TabNode) => {
        const component = node.getComponent();

        switch (component) {
            case "ar_explorer":
                return <TreeNavigator onSelect={handleARNodeSelect} />;
            case "swc_navigator":
                return <SwcNavigator onSelect={handleSwcSelect} />;
            case "editor_panel": // Renamed UI-wise to 'SW Component Config' but keeping internal ID to avoid breaking layout config layout
                return <EditorPanel selectedSwc={selectedSwc} onRowSelect={handleRowSelect} />;
            case "ar_config_panel":
                return <ARConfigPanel selectedNode={selectedNode} />;
            case "properties":
                return (
                    <PropertiesPanel
                        selectedItem={selectedItem}
                        itemType={selectedItemType}
                    />
                );
            case "description_view":
                return (
                    <div style={{ padding: '10px', backgroundColor: 'var(--bg-panel)', height: '100%' }}>
                        <div className="panel-header" style={{ margin: '-10px -10px 10px -10px' }}>
                            <span className="panel-header-title">Description</span>
                        </div>
                        {selectedNode ? (
                            <div style={{ fontSize: '12px', color: 'var(--text-primary)' }}>
                                <strong>{selectedNode.label}</strong>
                                <p style={{ marginTop: '8px', color: 'var(--text-secondary)' }}>
                                    Type: {selectedNode.type}
                                </p>
                                {selectedNode.properties && (
                                    <div style={{ marginTop: '8px' }}>
                                        {Object.entries(selectedNode.properties).map(([key, value]) => (
                                            <div key={key} style={{ marginTop: '4px' }}>
                                                <span style={{ color: 'var(--text-secondary)' }}>{key}:</span>{' '}
                                                <span>{value}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                                Select a node to view its description.
                            </p>
                        )}
                    </div>
                );
            case "problems":
                return (
                    <div style={{ padding: '10px', backgroundColor: 'var(--bg-panel)', height: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-primary)' }}>
                            <span style={{ color: '#4ec9b0' }}>✓</span>
                            <span>0 errors, 0 warnings, 0 infos</span>
                        </div>
                    </div>
                );
            case "console":
                return (
                    <div style={{ padding: '10px', fontFamily: 'monospace', fontSize: '11px', backgroundColor: 'var(--bg-editor)', height: '100%', color: 'var(--text-primary)' }}>
                        <div style={{ color: 'var(--text-secondary)' }}>[Console Ready]</div>
                        <div style={{ marginTop: '4px' }}>&gt; Application started successfully</div>
                    </div>
                );
            case "terminal":
                return <TerminalPanel />;
            default:
                return <div style={{ padding: 10, color: 'var(--text-secondary)' }}>Unknown Component: {component}</div>;
        }
    };

    return (
        <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-dark)' }}>
            <div className="menubar">
                {/* ... File and Edit Menus ... */}
                <div className={`menu-item ${activeMenu === 'file' ? 'active' : ''}`} onClick={(e) => handleMenuClick(e, 'file')}>
                    File
                    {activeMenu === 'file' && (
                        <div className="dropdown-content" style={{ display: 'block' }}>
                            <span className="dropdown-item" onClick={closeMenu}>New</span>
                            <span className="dropdown-item" onClick={closeMenu}>Open File...</span>
                            <span className="dropdown-item" onClick={closeMenu}>Save</span>
                            <span className="dropdown-item" onClick={closeMenu}>Exit</span>
                        </div>
                    )}
                </div>
                <div className={`menu-item ${activeMenu === 'edit' ? 'active' : ''}`} onClick={(e) => handleMenuClick(e, 'edit')}>
                    Edit
                    {activeMenu === 'edit' && (
                        <div className="dropdown-content" style={{ display: 'block' }}>
                            <span className="dropdown-item" onClick={closeMenu}>Undo</span>
                            <span className="dropdown-item" onClick={closeMenu}>Redo</span>
                        </div>
                    )}
                </div>
                <div className={`menu-item ${activeMenu === 'window' ? 'active' : ''}`} onClick={(e) => handleMenuClick(e, 'window')}>
                    Window
                    {activeMenu === 'window' && (
                        <div className="dropdown-content" style={{ display: 'block' }}>
                            <span className="dropdown-item" onClick={resetLayout}>Reset Layout</span>
                            <div style={{ borderTop: '1px solid var(--border-color)', margin: '4px 0' }}></div>
                            <div className="dropdown-item dropdown-submenu" onClick={handleSubMenuClick}>
                                Show View
                                {showViewSubMenu && (
                                    <div className="dropdown-content" style={{ display: 'block' }}>
                                        <span className="dropdown-item" onClick={() => showView('ar_explorer', 'AR Navigator')}>AR Navigator</span>
                                        <span className="dropdown-item" onClick={() => showView('swc_navigator', 'SwcTypes Navigator')}>SwcTypes Navigator</span>
                                        <span className="dropdown-item" onClick={() => showView('editor_panel', 'SW Component Config')}>SW Component Config</span>
                                        <span className="dropdown-item" onClick={() => showView('properties', 'Properties')}>Properties</span>
                                        <span className="dropdown-item" onClick={() => showView('description_view', 'Description View')}>Description View</span>
                                        <span className="dropdown-item" onClick={() => showView('problems', 'Problems')}>Problems</span>
                                        <span className="dropdown-item" onClick={() => showView('console', 'Console')}>Console</span>
                                        <span className="dropdown-item" onClick={() => showView('terminal', 'Terminal')}>Terminal</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                {/* ... Help Menu ... */}
                <div className={`menu-item ${activeMenu === 'help' ? 'active' : ''}`} onClick={(e) => handleMenuClick(e, 'help')}>
                    Help
                    {activeMenu === 'help' && (
                        <div className="dropdown-content" style={{ display: 'block' }}>
                            <span className="dropdown-item" onClick={closeMenu}>About</span>
                        </div>
                    )}
                </div>
            </div>
            <div style={{ flex: 1, position: 'relative' }}>
                <Layout model={model} factory={factory} />
            </div>
        </div>
    );
};

export default MainLayout;
