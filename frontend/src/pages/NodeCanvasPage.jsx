// @/pages/NodeCanvasPage.jsx
import { useState, useCallback } from 'react';
import {
    ReactFlow,
    Controls,
    Background,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import CustomNode from '@/components/CustomNode.jsx';

const initialNodes = [
    {
        id: '1',
        type: 'customNode',
        position: { x: 100, y: 100 },
        data: { label: 'First Custom Node' },
    },
];

const initialEdges = [];

const nodeTypes = {
    customNode: CustomNode,
};

const NodeCanvasPage = () => {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        []
    );

    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        []
    );

    const onConnect = useCallback(
        (params) =>
            setEdges((eds) =>
                addEdge({ ...params, style: { stroke: '#aaa', strokeWidth: 2 } }, eds)
            ),
        []
    );

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView
                panOnScroll
                zoomOnScroll
            >
                <Background color="#333" gap={20} />
                <Controls />
            </ReactFlow>
        </div>
    );
};

export default NodeCanvasPage;
