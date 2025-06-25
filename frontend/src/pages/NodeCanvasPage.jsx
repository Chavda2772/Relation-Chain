// @/pages/NodeCanvasPage.jsx

import { useCallback, useMemo, useState } from 'react';
import {
    ReactFlow,
    Controls,
    Background,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import DefaultNode from '@/components/DefaultNode';
import RootNode from '@/components/RootNode';

const initialNodes = [
    {
        id: '1',
        type: 'rootNode',
        position: { x: 300, y: 0 },
        data: {
            name: 'Feldman',
            title: 'First',
            avatar: 'https://i.pravatar.cc/100?img=68',
        },
    },
    {
        id: '2',
        type: 'defaultNode',
        position: { x: 0, y: 200 },
        data: {
            name: 'Richard',
            title: 'Second',
            avatar: 'https://i.pravatar.cc/100?img=65',
        },
    },
    {
        id: '3',
        type: 'defaultNode',
        position: { x: 300, y: 200 },
        data: {
            name: 'Emma',
            title: 'Third',
        },
    },
    {
        id: '4',
        type: 'defaultNode',
        position: { x: 600, y: 200 },
        data: {
            name: 'Lucas',
            title: 'Fourth',
        },
    },
    {
        id: '5',
        type: 'defaultNode',
        position: { x: 0, y: 400 },
        data: {
            name: 'Richard',
            title: 'Five',
            avatar: 'https://i.pravatar.cc/100?img=64',
        },
    },
    {
        id: '6',
        type: 'defaultNode',
        position: { x: 300, y: 400 },
        data: {
            name: 'Emma',
            title: 'Six',
            avatar: 'https://i.pravatar.cc/100?img=63',
        },
    },
    {
        id: '7',
        type: 'defaultNode',
        position: { x: 600, y: 400 },
        data: {
            name: 'Lucas',
            title: 'Seven',
            avatar: 'https://i.pravatar.cc/100?img=60',
        },
    },
];

const initialEdges = [];

const nodeTypes = {
    defaultNode: DefaultNode,
    rootNode: RootNode,
};

const NodeCanvasPage = () => {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);
    const [selectedNodeId, setSelectedNodeId] = useState(null);

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

    const displayedEdges = useMemo(() => {
        return edges.map((edge) => {
            const isConnected =
                edge.source === selectedNodeId || edge.target === selectedNodeId;
            return {
                ...edge,
                style: {
                    stroke: isConnected ? '#6366f1' : '#aaa',
                    strokeWidth: isConnected ? 3 : 2,
                },
            };
        });
    }, [edges, selectedNodeId]);

    return (
        <div className="w-screen h-screen">
            <ReactFlow
                nodes={nodes}
                edges={displayedEdges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodeClick={(e, node) => setSelectedNodeId(node.id)}
                onPaneClick={() => setSelectedNodeId(null)}
                nodeTypes={nodeTypes}
                fitView
            >
                <Background color="#333" gap={20} />
                <Controls />
            </ReactFlow>
        </div>
    );
};

export default NodeCanvasPage;
