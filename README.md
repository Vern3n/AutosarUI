# AutosarUI (AutosarUI)

A React-based web application for viewing and editing AUTOSAR ARXML configurations. This tool provides a rich IDE-like interface with a flexible layout system, allowing users to navigate ARXML structures, configure software components, and inspect properties.

## Features

-   **Flexible Layout**: Draggable and resizable panels using `flexlayout-react`.
-   **AR Navigator**: Tree-based navigation of the AUTOSAR hierarchy.
-   **SWC Navigator**: Dedicated view for Software Component Types.
-   **Editor Panel**: Context-aware editing configuration for SW Components.
-   **Properties View**: Detailed inspection of selected items (Ports, Runnables, etc.).
-   **Description View**: Quick summary of selected nodes.

## Architecture

The application is built with **React**, **TypeScript**, and **Vite**.

### Key Components

-   **`MainLayout.tsx`**: The core container that initializes the `flexlayout-react` model and manages global state (menu actions, view visibility). It uses a factory pattern to render different components based on the layout configuration.
-   **`layoutConfig.ts`**: Defines the default 3-column layout structure (Navigator | Editor | Properties/Terminal).
-   **Navigators (`TreeNavigator`, `SwcNavigator`)**: Provide hierarchical views of the data.
-   **`EditorPanel`**: The main working area, updating based on the selected Software Component.
-   **`PropertiesPanel`**: Displays attributes of the currently selected item in the editor.

### Technology Stack

-   **React 19**: UI Library.
-   **Vite**: Build tool and dev server.
-   **TypeScript**: Type safety.
-   **flexlayout-react**: Docking layout manager.
-   **Lucide React**: Icon set.

## Getting Started

### Prerequisites

-   Node.js (Ensure you have a recent version installed)

### Installation

1.  Clone the repository.
2.  Install dependencies:

```bash
npm install
```

### Running the Application

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5193` (or the port shown in your terminal).

### Building for Production

To build the application for production:

```bash
npm run build
```

The output will be in the `dist` directory.

### Linting

Run ESLint to check for code quality issues:

```bash
npm run lint
```
