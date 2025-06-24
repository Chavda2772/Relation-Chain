import { useState, useRef } from "react";
import { Stage, Layer } from "react-konva";
import Node from "./Node";

const initialNodes = [
    { id: 1, x: 100, y: 100, label: "Node A", width: 150, height: 70 },
    { id: 2, x: 300, y: 250, label: "Node B", width: 150, height: 70 },
];

const NodeCanvasPage = () => {
    const stageRef = useRef();
    const [nodes, setNodes] = useState(initialNodes);
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [selectedId, setSelectedId] = useState(null);
    const [isDraggingNode, setIsDraggingNode] = useState(false);

    const MIN_SCALE = 0.5;
    const MAX_SCALE = 2;

    const handleWheel = (e) => {
        e.evt.preventDefault();
        const scaleBy = 1.05;
        const oldScale = scale;
        const pointer = stageRef.current.getPointerPosition();

        const direction = e.evt.deltaY > 0 ? -1 : 1;
        let newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;
        newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, newScale));

        const mousePointTo = {
            x: (pointer.x - position.x) / oldScale,
            y: (pointer.y - position.y) / oldScale,
        };

        const newPos = {
            x: pointer.x - mousePointTo.x * newScale,
            y: pointer.y - mousePointTo.y * newScale,
        };

        setScale(newScale);
        setPosition(newPos);
    };

    const handleNodeDragStart = () => setIsDraggingNode(true);

    const handleNodeDragEnd = (id, pos) => {
        setNodes((prev) => prev.map((node) => (node.id === id ? { ...node, ...pos } : node)));
        setIsDraggingNode(false);
    };

    const handleResize = (id, size) => {
        setNodes((prev) =>
            prev.map((node) => (node.id === id ? { ...node, ...size } : node))
        );
    };

    const handleStageDblClick = () => {
        const stage = stageRef.current;
        const pointer = stage.getPointerPosition();
        const transform = stage.getAbsoluteTransform().copy().invert();
        const canvasPos = transform.point(pointer);

        const newNode = {
            id: Date.now(),
            x: canvasPos.x,
            y: canvasPos.y,
            label: `Node ${nodes.length + 1}`,
            width: 150,
            height: 70,
        };

        setNodes((prev) => [...prev, newNode]);
    };

    return (
        <div className="w-screen h-screen overflow-hidden">
            <Stage
                ref={stageRef}
                width={window.innerWidth}
                height={window.innerHeight}
                scaleX={scale}
                scaleY={scale}
                x={position.x}
                y={position.y}
                draggable={!isDraggingNode}
                onWheel={handleWheel}
                onDblClick={handleStageDblClick}
                onMouseDown={(e) => {
                    if (e.target === e.target.getStage()) {
                        setSelectedId(null); // Deselect when clicking empty canvas
                    }
                }}
                style={{ backgroundColor: "#f5f5f5", cursor: "grab" }}
            >
                {/* Nodes */}
                <Layer>
                    {nodes.map((node) => (
                        <Node
                            key={node.id}
                            id={node.id}
                            x={node.x}
                            y={node.y}
                            label={node.label}
                            width={node.width}
                            height={node.height}
                            isSelected={selectedId === node.id}
                            onSelect={() => setSelectedId(node.id)}
                            onDragStart={handleNodeDragStart}
                            onDragEnd={handleNodeDragEnd}
                            onResize={handleResize}
                            scale={scale}
                        />
                    ))}
                </Layer>
            </Stage>
        </div>
    );
};

export default NodeCanvasPage;
