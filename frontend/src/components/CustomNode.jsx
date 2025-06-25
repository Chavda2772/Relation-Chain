// @/components/CustomNode.jsx
import { Handle, Position } from '@xyflow/react';

const CustomNode = ({ data }) => {
    return (
        <div
            style={{
                padding: 10,
                borderRadius: 8,
                background: '#2c2c2c',
                border: '1px solid #444',
                color: '#fff',
                minWidth: 150,
                fontSize: 14,
            }}
        >
            <Handle
                type="target"
                position={Position.Left}
                style={{ background: '#56ccf2' }}
            />
            <div>{data.label || 'Custom Node'}</div>
            <Handle
                type="source"
                position={Position.Right}
                style={{ background: '#27ae60' }}
            />
        </div>
    );
};

export default CustomNode;
