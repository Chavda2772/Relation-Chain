import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setSelectedNodeId,
    setNodesAction,
    setEdgesAction,
} from '@/redux/slices/canvasSlice';

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

const colorHexCodes = [
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
    "#000080", // Navy
    "#008080", // Teal
    "#808000", // Olive
    "#800000", // Maroon
    "#FFD700"  // Gold
];

const FlowCanvas = ({ nodeTypes, setClickPosition, setShowNodePicker }) => {
    const dispatch = useDispatch();
    const { screenToFlowPosition } = useReactFlow();

    const nodes = useSelector((state) => state.canvas.nodes);
    const edges = useSelector((state) => state.canvas.edges);
    const selectedNodeId = useSelector((state) => state.canvas.selectedNodeId);

    const getRandomColor = () => {
        const randomIndex = Math.floor(Math.random() * colorHexCodes.length);
        return colorHexCodes[randomIndex];
    };

    const onNodesChange = useCallback(
        (changes) => {
            dispatch(setNodesAction(applyNodeChanges(changes, nodes)));
        },
        [dispatch, nodes]
    );

    const onEdgesChange = useCallback(
        (changes) => {
            dispatch(setEdgesAction(applyEdgeChanges(changes, edges)));
        },
        [dispatch, edges]
    );

    const onConnect = useCallback(
        (params) => {
            const newEdges = addEdge(
                {
                    ...params,
                    style: { stroke: getRandomColor(), strokeWidth: 2 }
                },
                edges
            );
            dispatch(setEdgesAction(newEdges));
        },
        [dispatch, edges]
    );

    const onPaneContextMenu = (e) => {
        e.preventDefault();
        const flowPos = screenToFlowPosition({ x: e.clientX, y: e.clientY });
        setClickPosition(flowPos);
        setShowNodePicker(true);
    };


    const displayedEdges = useMemo(() => {
        return edges.map((edge) => {
            const isConnected = edge.source === selectedNodeId || edge.target === selectedNodeId;
            return {
                ...edge,
                style: {
                    stroke: isConnected ? '#6366f1' : (edge.style?.stroke || '#aaa'),
                    strokeWidth: isConnected ? 3 : 2,
                },
            };
        });
    }, [edges, selectedNodeId]);

    return (
        <ReactFlow
            nodes={nodes.map((node) => ({
                ...node,
                data: {
                    ...node.data,
                    id: node.id,
                },
            }))}
            edges={displayedEdges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={(e, node) => dispatch(setSelectedNodeId(node.id))}
            onPaneClick={() => dispatch(setSelectedNodeId(null))}
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