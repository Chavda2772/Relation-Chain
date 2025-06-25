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

import DefaultNode from '@/components/DefaultNode.jsx';
import RootNode from '@/components/RootNode.jsx';

const initialNodes = [
    {
        id: '1',
        type: 'rootNode',
        position: { x: 150, y: 0 },
        data: {
            name: 'First',
            title: 'Feldman',
            avatar: 'https://i.pravatar.cc/100?img=68'
        }
    },
    {
        id: '2',
        type: 'defaultNode',
        position: { x: 0, y: 100 },
        data: {
            name: 'Richard',
            title: 'Second',
            avatar: 'https://i.pravatar.cc/100?img=65'
        }
    },
    {
        id: '3',
        type: 'defaultNode',
        position: { x: 300, y: 100 },
        data: {
            name: 'Richard',
            title: 'Third',
        }
    },
];

const initialEdges = [];

const nodeTypes = {
    rootNode: RootNode,
    defaultNode: DefaultNode,
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
                zoomOnScroll
            >
                <Background color="#333" gap={20} />
                <Controls />
            </ReactFlow>
        </div>
    );
};

export default NodeCanvasPage;
