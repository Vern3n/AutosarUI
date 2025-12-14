import React from 'react';

const TerminalPanel: React.FC = () => {
    return (
        <div style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#1e1e1e',
            color: '#cccccc',
            fontFamily: 'Consolas, "Courier New", monospace',
            fontSize: '12px'
        }}>
            <div style={{
                padding: '4px 8px',
                backgroundColor: 'var(--bg-header)',
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
            }}>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Terminal</span>
                <span style={{ fontSize: '11px', color: 'var(--accent-blue)' }}>powershell</span>
            </div>
            <div style={{
                flex: 1,
                padding: '8px',
                overflow: 'auto'
            }}>
                <div style={{ color: '#6a9955' }}>PS C:\Users\&gt;</div>
                <div style={{ marginTop: '4px', color: '#569cd6' }}>
                    <span style={{ color: '#cccccc' }}>_ </span>
                    <span style={{
                        display: 'inline-block',
                        width: '8px',
                        height: '14px',
                        backgroundColor: '#cccccc',
                        animation: 'blink 1s infinite'
                    }}></span>
                </div>
            </div>
            <style>{`
                @keyframes blink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0; }
                }
            `}</style>
        </div>
    );
};

export default TerminalPanel;
