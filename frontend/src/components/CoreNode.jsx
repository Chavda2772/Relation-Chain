import { Handle, Position } from '@xyflow/react';

const CoreNode = ({
    topHandle = true,
    bottomHandle = true,
    selected,
    children
}) => {
    return (
        <div
            className={`bg-white rounded-lg shadow-md px-4 py-2 w-56 text-left relative transition-all duration-200 ring-1 hover:scale-110
            ${selected ? 'ring-purple-400 shadow-lg' : 'ring-purple-200'}`}
        >
            {/* Node Content */}
            {children}

            {/* Target Handle - Top Center */}
            {topHandle && (
                <Handle
                    type="target"
                    position={Position.Top}
                    className="!bg-sky-400 !w-3 !h-3 !rounded-full"
                    style={{
                        top: 0,
                        left: '50%',
                    }}
                />
            )}

            {/* Source Handle - Bottom Center */}
            {bottomHandle && (
                <Handle
                    type="source"
                    position={Position.Bottom}
                    className="!bg-purple-500 !w-3 !h-3 !rounded-full"
                    style={{
                        top: '100%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                />
            )}
        </div>
    );
};

export default CoreNode;
