// Packages
import { useState, useEffect } from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Components
import FlowCanvas from './FlowCanvas'

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

const NodeCanvasPage = () => {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);
    const [selectedNodeId, setSelectedNodeId] = useState(null);
    const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
    const [showNodePicker, setShowNodePicker] = useState(false);

    const handleAddNode = (type) => {
        const newNode = {
            id: `${Date.now()}`,
            type: type,
            position: clickPosition,
            data: {
                name: `${type === 'rootNode' ? 'Root' : 'Default'} Node`,
                title: '',
                avatar: type === 'rootNode' ? 'https://i.pravatar.cc/100?img=3' : ''
            }
        };
        setNodes((prev) => [...prev, newNode]);
        setShowNodePicker(false);
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Delete' && selectedNodeId) {
                // Remove selected node
                setNodes((nds) => nds.filter((node) => node.id !== selectedNodeId));

                // Remove connected edges
                setEdges((eds) => eds.filter((edge) => edge.source !== selectedNodeId && edge.target !== selectedNodeId));

                // Clear selection
                setSelectedNodeId(null);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedNodeId, setNodes, setEdges]);

    return (
        <>
            <div className="w-screen h-screen">
                <ReactFlowProvider>
                    <FlowCanvas
                        nodes={nodes}
                        edges={edges}
                        setNodes={setNodes}
                        setEdges={setEdges}
                        setSelectedNodeId={setSelectedNodeId}
                        clickPosition={clickPosition}
                        setClickPosition={setClickPosition}
                        setShowNodePicker={setShowNodePicker}
                        selectedNodeId={selectedNodeId}
                    />
                </ReactFlowProvider>
            </div>

            {showNodePicker && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
                    <div className="bg-white rounded-lg p-4 shadow-lg w-64 space-y-2">
                        <h3 className="text-lg font-semibold mb-2">Choose Node Type</h3>
                        <button
                            className="w-full bg-purple-100 hover:bg-purple-200 text-purple-800 font-medium py-2 rounded"
                            onClick={() => handleAddNode('rootNode')}
                        >
                            ➕ Root Node
                        </button>
                        <button
                            className="w-full bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium py-2 rounded"
                            onClick={() => handleAddNode('defaultNode')}
                        >
                            ➕ Default Node
                        </button>
                        <button
                            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 rounded"
                            onClick={() => setShowNodePicker(false)}
                        >
                            ❌ Cancel
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default NodeCanvasPage;
