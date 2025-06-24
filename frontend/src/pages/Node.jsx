import { useEffect, useRef } from "react";
import { Group, Rect, Text, Transformer } from "react-konva";

const Node = ({
    id,
    x,
    y,
    label,
    width = 150,
    height = 70,
    isSelected,
    onSelect,
    onDragStart,
    onDragEnd,
    onResize
}) => {
    const groupRef = useRef();
    const trRef = useRef();

    useEffect(() => {
        if (isSelected && trRef.current && groupRef.current) {
            trRef.current.nodes([groupRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected, width, height]);

    return (
        <>
            <Group
                ref={groupRef}
                x={x}
                y={y}
                draggable
                onClick={onSelect}
                onTap={onSelect}
                onDragStart={onDragStart}
                onDragEnd={(e) => {
                    onDragEnd(id, { x: e.target.x(), y: e.target.y() });
                }}
                onTransformEnd={() => {
                    const node = groupRef.current;
                    const rect = node.findOne("Rect");
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();

                    node.scaleX(1);
                    node.scaleY(1);

                    onResize(id, {
                        width: Math.max(100, rect.width() * scaleX),
                        height: Math.max(50, rect.height() * scaleY),
                    });
                }}
            >
                <Rect
                    name="Rect"
                    width={width}
                    height={height}
                    fill="#fff"
                    stroke="#999"
                    cornerRadius={10}
                    shadowBlur={5}
                />
                <Text
                    text={label}
                    fontSize={18}
                    padding={10}
                    fill="#333"
                    width={width}
                    height={height}
                    align="center"
                    verticalAlign="middle"
                />
            </Group>

            {isSelected && (
                <Transformer
                    ref={trRef}
                    boundBoxFunc={(oldBox, newBox) => {
                        if (newBox.width < 100 || newBox.height < 50) return oldBox;
                        return newBox;
                    }}
                    enabledAnchors={["top-left", "top-right", "bottom-left", "bottom-right"]}
                />
            )}
        </>
    );
};

export default Node;
