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
    ConnectionLineType
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

const FlowCanvas = ({ nodeTypes, setClickPosition, setShowNodePicker }) => {
    const dispatch = useDispatch();
    const { screenToFlowPosition } = useReactFlow();

    const nodes = useSelector((state) => state.canvas.nodes);
    const edges = useSelector((state) => state.canvas.edges);
    const selectedNodeId = useSelector((state) => state.canvas.selectedNodeId);

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
                    type: ConnectionLineType.Step,
                    style: { stroke: '#000000', strokeWidth: 2 }
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