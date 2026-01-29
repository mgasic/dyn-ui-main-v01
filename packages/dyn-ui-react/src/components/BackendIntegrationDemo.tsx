/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useComponentConfig } from '../hooks/useComponentConfig';
import { DynButton } from './DynButton';
import { DynTable } from './DynTable';
import { DynSwitch } from './DynSwitch';
import { DynLoading } from './DynLoading';
import { DynAvatar } from './DynAvatar';
import { DynBadge } from './DynBadge';
import { DynProgress } from './DynProgress';

interface BackendIntegrationDemoProps {
    pageId?: number;
    componentId?: number;
}

/**
 * Demo component to verify backend integration
 * Fetches component config by ID and renders the appropriate DynUI component
 */
export const BackendIntegrationDemo: React.FC<BackendIntegrationDemoProps> = ({ componentId }) => {
    // 1. Hook fetches config from http://localhost:3001/api/components/{componentId}
    const { config: rawConfig, loading, error, refresh } = useComponentConfig<any>(componentId);

    if (loading) return <DynLoading variant="pulse" label="Fetching config from backend..." />;

    if (error) {
        return (
            <div style={{ padding: '1rem', border: '1px solid red', borderRadius: '4px' }}>
                <h3 style={{ color: 'red' }}>Backend Error</h3>
                <p>{error.message}</p>
                <button onClick={refresh}>Retry</button>
            </div>
        );
    }

    if (!rawConfig) return <div>No configuration found</div>;

    // Normalize keys (ensure casing consistency for props like defaultChecked)
    const config: any = { ...rawConfig };
    if (rawConfig.defaultchecked !== undefined) config.defaultChecked = rawConfig.defaultchecked;
    if (rawConfig.componenttype !== undefined) config.componentType = rawConfig.componenttype;

    const type = config.componentType || '';

    // 2. Render component based on type
    return (
        <div style={{ padding: '1.5rem', border: '1px solid var(--dyn-neutral-mid-200)', borderRadius: '12px', background: 'var(--dyn-bg-canvas)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0 }}>Backend Config Loaded (Type: {type}, ID: {componentId})</h3>
                <DynBadge color="success">{type}</DynBadge>
            </div>

            <pre style={{ background: '#f5f5f5', padding: '0.75rem', fontSize: '12px', overflowX: 'auto', borderRadius: '4px', border: '1px solid #ddd' }}>
                {JSON.stringify(rawConfig, null, 2)}
            </pre>

            <div style={{ marginTop: '1.5rem', padding: '1.5rem', border: '2px dashed #999', borderRadius: '8px', display: 'flex', justifyContent: 'center', minHeight: '100px', alignItems: 'center' }}>
                {type === 'DynButton' && <DynButton {...config} />}
                {type === 'DynTable' && <DynTable {...config} data={config.items || []} />}
                {type === 'DynSwitch' && <DynSwitch {...config} />}
                {type === 'DynAvatar' && <DynAvatar {...config} />}
                {type === 'DynBadge' && <DynBadge {...config}>{config.children || config.content}</DynBadge>}
                {type === 'DynProgress' && <div style={{ width: '100%' }}><DynProgress {...config} /></div>}
            </div>
        </div>
    );
};
