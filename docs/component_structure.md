# Component Structure Documentation

This document provides a detailed reference for the key React components in the AutosarUI application.

## 1. MainLayout (`src/components/MainLayout.tsx`)
**Purpose**: The central application shell. It orchestrates the entire UI using `flexlayout-react`, managing the state of selected items and rendering the appropriate sub-components (navigators, editors, panels) via a factory pattern.

### Props
*None (Top-level component)*

### Key State
| State Variable | Type | Description |
| :--- | :--- | :--- |
| `activeMenu` | `string \| null` | Controls which dropdown menu (File, Edit, Window, Help) is currently open. |
| `selectedNode` | `ARXMLNode \| null` | The currently selected node from the AR Navigator. |
| `selectedSwc` | `{id, name} \| null` | The currently selected Software Component. |
| `selectedItem` | `PortData \| ...` | The generic selected item (Port, Runnable, etc.) for the Properties Panel. |
| `model` | `FlexLayout.Model` | The mutable model object controlling the layout state. |

### Key Methods
- `factory(node: TabNode)`: The core rendering function. Maps FlexLayout node IDs (strings like "ar_explorer", "editor_panel") to actual React components.
- `handleARNodeSelect(node)`: Updates `selectedNode`. Checks if the "AR Config" tab exists; if not, adds it; otherwise, selects it.
- `handleSwcSelect(node)`: Updates `selectedSwc`. If the node is a generic SWC, opens the Editor Panel. If it's a specific child (port), updates `selectedItem`.
- `showView(component, name)`: Dynamically adds a new tab to the layout for the requested component.

---

## 2. EditorPanel (`src/components/EditorPanel.tsx`)
**Purpose**: The primary workspace for defining execution logic of a Software Component. It uses a tabbed interface to manage Ports, Internal Behaviors, and Runnables.

### Props
| Prop Name | Type | Description |
| :--- | :--- | :--- |
| `selectedSwc` | `{id, name} \| null` | The SWC currently being edited. |
| `onRowSelect` | `function` | Callback fired when a row in any table is clicked. |

### Render Structure
- **Toolbar**: Buttons for Add, Delete, Move Up/Down.
- **Tabs**: Internal navigation for "Ports", "Internal Behaviors", "Runnables".
- **Content Area**: Renders a dynamic table based on `activeTab`.
    - `renderPortsTable()`: Columns for Name, Type (R/P), Interface.
    - `renderInternalBehaviorsTable()`: Columns for Name, ShortName, Description.
    - `renderRunnablesTable()`: Columns for Name, Symbol, Concurrent flag.

---

## 3. PropertiesPanel (`src/components/PropertiesPanel.tsx`)
**Purpose**: A context-aware form container. It displays details for whatever item is globally selected, adapting its fields to match the item type.

### Props
| Prop Name | Type | Description |
| :--- | :--- | :--- |
| `selectedItem` | `Object \| null` | The data object to edit. |
| `itemType` | `string \| null` | Discriminator ('port', 'swc', 'runnables') to switch form templates. |
| `onPropertyChange` | `function` | Callback for updating values (currently logs to console). |

### Key Methods
- `renderProperties()`: Switch statement that delegates rendering to:
    - `renderPortProperties()`: Inputs for Name, Direction, Interface.
    - `renderSwcProperties()`: Inputs for ShortName, Category, Description.
    - `renderRunnableProperties()`: Inputs for Name, Symbol, Concurrency.

---

## 4. TreeNavigator (`src/components/TreeNavigator.tsx`)
**Purpose**: Displays the hierarchical structure of the ARXML configuration.

### Props
| Prop Name | Type | Description |
| :--- | :--- | :--- |
| `onSelect` | `(node: ARXMLNode) => void` | Callback when a tree node is clicked. |

### Internal Logic
- **Recursive Rendering**: `renderTree` calls itself to display nested children.
- **Filtering**: Includes a text input that updates `filterText` state (logic implementation pending).
- **Expansion**: Tracks open/closed state of folders via `expanded` map.

---

## 5. SwcNavigator (`src/components/SwcNavigator.tsx`)
**Purpose**: A specialized tree view for Software Components usage, featuring distinct icons for internal elements.

### Props
| Prop Name | Type | Description |
| :--- | :--- | :--- |
| `onSelect` | `function` | Selection callback passing standardized node data. |

### Key Features
- **Custom Icons**: Helper `getIcon(type)` renders distinct emojis/symbols for Folders, SWCs, Ports, and Behaviors.
- **Toggle Logic**: `handleToggle` recursively navigates the data structure to flip the `expanded` boolean.

