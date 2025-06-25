import { useCallback, useMemo } from 'react';
import {
    ReactFlow,
    useReactFlow,
    Controls,
    Background,
    MiniMap,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import DefaultNode from '@/components/DefaultNode';
import RootNode from '@/components/RootNode';

const nodeTypes = {
    defaultNode: DefaultNode,
    rootNode: RootNode,
};

const colorHexCodes = [
    "#FFFFFF", // White
    "#000000", // Black
    "#FF0000", // Red
    "#00FF00", // Green
    "#0000FF", // Blue
    "#FFFF00", // Yellow
    "#00FFFF", // Cyan / Aqua
    "#FF00FF", // Magenta / Fuchsia
    "#FFA500", // Orange
    "#800080", // Purple
    "#FFC0CB", // Pink
    "#A52A2A", // Brown
    "#808080", // Gray
    "#D3D3D3", // Light Gray
    "#A9A9A9", // Dark Gray
    "#000080", // Navy
    "#008080", // Teal
    "#808000", // Olive
    "#800000", // Maroon
    "#FFD700"  // Gold
];


const FlowCanvas = ({
    nodes,
    edges,
    setNodes,
    setEdges,
    setSelectedNodeId,
    setClickPosition,
    setShowNodePicker,
    selectedNodeId,
}) => {
    const { screenToFlowPosition } = useReactFlow();

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
            setEdges((eds) => {
                return addEdge({
                    ...params, style: {
                        stroke: getRandomColor(),
                        strokeWidth: 2
                    }
                }, eds)
            }),
        []
    );

    const onPaneContextMenu = (e) => {
        e.preventDefault();
        const flowPos = screenToFlowPosition({ x: e.clientX, y: e.clientY });
        setClickPosition(flowPos);
        setShowNodePicker(true);
    };

    const getRandomColor = () => {
        const randomIndex = Math.floor(Math.random() * colorHexCodes.length);
        return colorHexCodes[randomIndex];
    };

    const displayedEdges = useMemo(() => {
        return edges.map((edge) => {
            const isConnected = edge.source === selectedNodeId || edge.target === selectedNodeId;
            return {
                ...edge,
                style: {
                    stroke: isConnected ? '#6366f1' : edge.style.stroke,
                    strokeWidth: isConnected ? 3 : 2,
                },
            };
        });
    }, [edges, selectedNodeId]);

    const onDeleteNode = (id) => {
        setNodes((nds) => nds.filter((n) => n.id !== id));
        setEdges((eds) => eds.filter((e) => e.source !== id && e.target !== id));
        setSelectedNodeId(null);
    };

    return (
        <ReactFlow
            nodes={nodes.map((node) => ({
                ...node,
                data: {
                    ...node.data,
                    id: node.id,
                    onDelete: onDeleteNode,
                },
            }))}
            edges={displayedEdges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={(e, node) => setSelectedNodeId(node.id)}
            onPaneClick={() => setSelectedNodeId(null)}
            onPaneContextMenu={onPaneContextMenu}
            nodeTypes={nodeTypes}
            fitView
        >
            <Background color="#333" gap={20} />
            <Controls />
            <MiniMap nodeStrokeWidth={3} />
        </ReactFlow>
    );
};

export default FlowCanvas;