import { useCallback, useState } from 'react';
import {
    ReactFlow,
    Controls,
    Background,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Initial node and edge data
const initialNodes = [
    {
        id: '1',
        type: 'input',
        position: { x: 100, y: 0 },
        data: { label: 'Hello' },
    },
    {
        id: '2',
        position: { x: 0, y: 100 },
        data: { label: 'World' },
    },
    {
        id: '3',
        position: { x: 200, y: 100 },
        data: { label: 'World' },
    },
];

const initialEdges = [];

function NodeCanvasPage() {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    // Update nodes when user drags/resizes/etc.
    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        []
    );

    // Update edges on change
    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        []
    );

    // Handle connection between nodes
    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge({ ...params, style: { stroke: '#999' } }, eds)),
        []
    );

    return (
        <div style={{ width: '100vw', height: '100vh', background: '#ffffff' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
                panOnScroll
                zoomOnScroll
            >
                <Background color="#333" />
                <Controls />
            </ReactFlow>
        </div>
    );
}

export default NodeCanvasPage;
