import { Trash2, PenIcon, User2 } from 'lucide-react';
import { Handle, Position } from '@xyflow/react';
import { useDispatch } from 'react-redux';
import { deleteNodeById } from '@/redux/slices/canvasSlice';

const CoreNode = ({
    data,
    topHandle = false,
    bottomHandle = false,
    leftHandle = false,
    rightHandle = false,
    selected,
    children
}) => {
    const dispatch = useDispatch();

    const handleProfileClick = () => {
        console.log("Profile");
    };

    const handleEditClick = () => {
        console.log("Edit");
    };

    const handleDeleteClick = () => {
        dispatch(deleteNodeById(data?.id));
    };

    return (
        <div
            className={`bg-white rounded-lg shadow-md px-4 py-2 w-56 text-left relative transition-all duration-200 ring-1 hover:scale-110
            ${selected ? 'ring-purple-400 shadow-lg' : 'ring-purple-200'}`}
        >
            {/* Action Bar */}
            {selected && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-10 flex gap-1">
                    <button
                        onClick={handleProfileClick}
                        className="bg-green-500 hover:bg-green-600 text-white text-xs px-2 py-1 flex gap-1 rounded shadow"
                    >
                        <User2 size={16} />
                        <span>Profile</span>
                    </button>
                    <button
                        onClick={handleEditClick}
                        className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-2 py-1 flex gap-1 rounded shadow"
                    >
                        <PenIcon size={16} />
                        <span>Edit</span>
                    </button>
                    <button
                        onClick={handleDeleteClick}
                        className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 flex gap-1 rounded shadow"
                    >
                        <Trash2 size={16} />
                        <span>Delete</span>
                    </button>
                </div>
            )}

            {/* Node Content */}
            {children}

            {/* Handles */}
            {topHandle && (
                <Handle
                    id="vertical"
                    type="target"
                    position={Position.Top}
                    className="!bg-sky-400 !w-3 !h-3 !rounded-full"
                    style={{ top: 0, left: '50%' }}
                />
            )}
            {bottomHandle && (
                <Handle
                    id="vertical"
                    type="source"
                    position={Position.Bottom}
                    className="!bg-purple-500 !w-3 !h-3 !rounded-full"
                    style={{ bottom: 0, left: '50%', transform: 'translate(-50%, 50%)' }}
                />
            )}
            {leftHandle && (
                <Handle
                    id="horizontal"
                    type="target"
                    position={Position.Left}
                    className="!bg-orange-500 !w-3 !h-3 !rounded-full"
                    style={{ top: '50%', left: 0, transform: 'translate(-50%, -50%)' }}
                />
            )}
            {rightHandle && (
                <Handle
                    id="horizontal"
                    type="source"
                    position={Position.Right}
                    className="!bg-lime-500 !w-3 !h-3 !rounded-full"
                    style={{ top: '50%', right: 0, transform: 'translate(50%, -50%)' }}
                />
            )}
        </div>
    );
};

export default CoreNode;
