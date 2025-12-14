import type { IJsonModel } from 'flexlayout-react';

export const defaultLayoutConfig: IJsonModel = {
    global: {
        tabEnableClose: true,
        tabSetEnableMaximize: true,
        tabSetMinWidth: 100,
        tabSetMinHeight: 100,
    },
    borders: [],
    layout: {
        type: "row",
        weight: 100,
        children: [
            // Left Column: Navigator panels
            {
                type: "row",
                weight: 20,
                children: [
                    {
                        type: "tabset",
                        weight: 60,
                        enableTabStrip: true,
                        children: [
                            {
                                type: "tab",
                                name: "AR Navigator",
                                component: "ar_explorer",
                                id: "ar_explorer"
                            },
                            {
                                type: "tab",
                                name: "SwcTypes Navigator",
                                component: "swc_navigator",
                                id: "swc_nav"
                            }
                        ],
                        selected: 0
                    },
                    {
                        type: "tabset",
                        weight: 40,
                        children: [
                            {
                                type: "tab",
                                name: "Description View",
                                component: "description_view",
                                id: "description"
                            }
                        ]
                    }
                ],
                config: {
                    type: "column"
                }
            },
            // Center-Right Column
            {
                type: "row",
                weight: 80,
                children: [
                    // Main Editor Area
                    {
                        type: "tabset",
                        weight: 70,
                        id: "main_tabset",
                        children: [
                            {
                                type: "tab",
                                name: "SW Component Config",
                                component: "editor_panel",
                                id: "editor_panel",
                                enableClose: false
                            }
                        ],
                        selected: 0
                    },
                    // Right side: Properties
                    {
                        type: "tabset",
                        weight: 30,
                        children: [
                            {
                                type: "tab",
                                name: "Properties",
                                component: "properties",
                                id: "properties"
                            },
                            {
                                type: "tab",
                                name: "Problems",
                                component: "problems",
                                id: "problems"
                            },
                            {
                                type: "tab",
                                name: "Console",
                                component: "console",
                                id: "console"
                            },
                            {
                                type: "tab",
                                name: "Terminal",
                                component: "terminal",
                                id: "terminal"
                            }
                        ]
                    }
                ],
                config: {
                    type: "column"
                }
            }
        ]
    }
};
