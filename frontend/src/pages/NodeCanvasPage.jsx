// Packages
import { useState, useEffect } from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedNodeId, addNode, deleteNodeById } from '@/redux/slices/canvasSlice';
import '@xyflow/react/dist/style.css';

// Components
import FlowCanvas from './FlowCanvas'
import ParentNode from '@/components/ParentNode';
import ChildNode from '@/components/ChildNode';
import SpouseNode from '@/components/SpouseNode';

// Utils
import { camelCaseToLabel } from '@/utils/commonFunction';

const nodeTypes = {
    parentNode: ParentNode,
    childNode: ChildNode,
    spouseNode: SpouseNode,
};

const NodeCanvasPage = () => {
    const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
    const [showNodePicker, setShowNodePicker] = useState(false);

    const nodes = useSelector((state) => state.canvas.nodes);
    const edges = useSelector((state) => state.canvas.edges);
    const selectedNodeId = useSelector((state) => state.canvas.selectedNodeId);
    const dispatch = useDispatch();

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
        dispatch(addNode(newNode));
        setShowNodePicker(false);
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Delete' && selectedNodeId) {
                // Remove selected node
                dispatch(deleteNodeById(selectedNodeId));

                // Clear selection
                setSelectedNodeId(null);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedNodeId, dispatch]);

    return (
        <>
            <div className="w-screen h-screen">
                <ReactFlowProvider>
                    <FlowCanvas
                        nodes={nodes}
                        edges={edges}
                        nodeTypes={nodeTypes}
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
                        {/* Iteration through types of Nodes */}
                        {Object.keys(nodeTypes).map((nodeType) => {
                            return (
                                <button
                                    className="w-full bg-purple-100 hover:bg-purple-200 text-purple-800 font-medium py-2 rounded"
                                    onClick={() => handleAddNode(nodeType)}
                                >
                                    {camelCaseToLabel(nodeType)}
                                </button>
                            )
                        })}
                        <button
                            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 rounded"
                            onClick={() => setShowNodePicker(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div >
            )}
        </>
    );
};

export default NodeCanvasPage;
