// Combined mock data from ReactAutosar and OpusReact/EasyUCEditor

// ============ ARXML Node Types (from ReactAutosar) ============
export interface ARXMLNode {
    id: string;
    label: string;
    type: 'package' | 'element' | 'container' | 'parameter';
    icon?: string;
    children?: ARXMLNode[];
    properties?: Record<string, string>;
}

export const mockARData: ARXMLNode[] = [
    {
        id: 'can-config-set',
        label: 'CanConfigSet "CanConfigSet"',
        type: 'container',
        children: [
            {
                id: 'can-controller',
                label: 'CanController "DAT_CANFD_ADASA"',
                type: 'container',
                children: [
                    {
                        id: 'can-hardware-object-1',
                        label: 'CanHardwareObject "ADASInfo1_ADASInfo1_CHNL_DAT_CANFD_DAT_CA"',
                        type: 'element',
                        properties: {
                            'CanControllerRef': '/RB/UBK/Project/EcucModuleConfigurationValues/Ca...',
                            'CanIdType': 'STANDARD',
                            'CanObjectType': 'TRANSMIT'
                        }
                    },
                    {
                        id: 'can-hardware-object-2',
                        label: 'CanHardwareObject "ADASInfo2_ADASInfo2_CHNL_DAT_CANFD_DAT_CA"',
                        type: 'element'
                    },
                    {
                        id: 'can-hardware-object-3',
                        label: 'CanHardwareObject "ADASInfo3_ADASInfo3_CHNL_DAT_CANFD_DAT_CA"',
                        type: 'element'
                    }
                ]
            },
            {
                id: 'can-controller-2',
                label: 'CanController "DAT_CANFD_ADASA_2"',
                type: 'container'
            }
        ]
    }
];

// ============ SWC Types (from OpusReact/EasyUCEditor) ============
export interface SwcNode {
    id: string;
    name: string;
    type: 'folder' | 'swc' | 'rport' | 'pport' | 'ib';
    expanded?: boolean;
    children?: SwcNode[];
}

export const mockSwcTypesTree: SwcNode = {
    id: 'root',
    name: 'SwcTypes',
    type: 'folder',
    expanded: true,
    children: [
        {
            id: 'swc-1',
            name: 'ApplicationSwComponentType_1',
            type: 'swc',
            expanded: true,
            children: [
                {
                    id: 'ports-1',
                    name: 'Ports',
                    type: 'folder',
                    expanded: true,
                    children: [
                        { id: 'port-1', name: 'RPort_Speed', type: 'rport', children: [] },
                        { id: 'port-2', name: 'PPort_Status', type: 'pport', children: [] }
                    ]
                },
                {
                    id: 'ib-1',
                    name: 'InternalBehaviors',
                    type: 'folder',
                    expanded: false,
                    children: [
                        { id: 'ibh-1', name: 'InternalBehavior_1', type: 'ib', children: [] }
                    ]
                }
            ]
        },
        {
            id: 'swc-2',
            name: 'ApplicationSwComponentType_2',
            type: 'swc',
            expanded: false,
            children: [
                {
                    id: 'ports-2',
                    name: 'Ports',
                    type: 'folder',
                    expanded: false,
                    children: [
                        { id: 'port-3', name: 'RPort_Torque', type: 'rport', children: [] },
                        { id: 'port-4', name: 'PPort_Control', type: 'pport', children: [] }
                    ]
                }
            ]
        }
    ]
};

// ============ Port Data ============
export interface PortData {
    id: string;
    name: string;
    type: 'RequiredPort' | 'ProvidedPort';
    interface: string;
}

export const mockPortsData: PortData[] = [
    { id: 'port-1', name: 'RPort_Speed', type: 'RequiredPort', interface: 'SenderReceiverInterface_Speed' },
    { id: 'port-2', name: 'PPort_Status', type: 'ProvidedPort', interface: 'SenderReceiverInterface_Status' },
    { id: 'port-3', name: 'RPort_Mode', type: 'RequiredPort', interface: 'ClientServerInterface_Mode' },
    { id: 'port-4', name: 'PPort_Diag', type: 'ProvidedPort', interface: 'ClientServerInterface_Diag' }
];

// ============ Internal Behaviors Data ============
export interface InternalBehaviorData {
    id: string;
    name: string;
    shortName: string;
    description: string;
}

export const mockInternalBehaviorsData: InternalBehaviorData[] = [
    { id: 'ib-1', name: 'InternalBehavior_1', shortName: 'IB_1', description: 'Main internal behavior' }
];

// ============ Runnables Data ============
export interface RunnableData {
    id: string;
    name: string;
    symbol: string;
    canBeInvokedConcurrently: boolean;
}

export const mockRunnablesData: RunnableData[] = [
    { id: 'run-1', name: 'Runnable_Init', symbol: 'Init_Func', canBeInvokedConcurrently: false },
    { id: 'run-2', name: 'Runnable_Main', symbol: 'Main_Func', canBeInvokedConcurrently: true }
];

// ============ Available Interfaces ============
export const mockAvailableInterfaces: string[] = [
    'SenderReceiverInterface_Speed',
    'SenderReceiverInterface_Status',
    'SenderReceiverInterface_Torque',
    'ClientServerInterface_Mode',
    'ClientServerInterface_Diag',
    'ClientServerInterface_Calibration'
];
