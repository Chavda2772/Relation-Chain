import { Group, Rect, Text } from "react-konva";

const Node = ({ id, x, y, label, onDragStart, onDragEnd }) => {
    return (
        <Group
            x={x}
            y={y}
            draggable
            onDragEnd={(e) =>
                onDragEnd(id, {
                    x: e.target.x(),
                    y: e.target.y(),
                })
            }
        >
            <Rect
                width={150}
                height={70}
                fill="#ffffff"
                stroke="#999"
                cornerRadius={10}
                shadowBlur={5}
            />
            <Text
                text={label}
                fontSize={18}
                padding={10}
                fill="#333"
            />
        </Group>
    );
};

export default Node;
