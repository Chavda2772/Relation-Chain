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
            className={`relative w-32 bg-white rounded-2xl border-2 
                       ${selected ? 'border-red-500 shadow-lg scale-105' : 'border-red-400'} 
                       transition-transform duration-200 text-center pt-10 pb-2`}
        >
            {/* Action Bar */}
            {selected && (
                <div className="absolute -top-23 left-1/2 transform -translate-x-1/2 z-10 flex gap-1">
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
            <div className="absolute -top-14 left-1/2 transform -translate-x-1/2">
                {topHandle && (
                    <Handle
                        id="vertical"
                        type="target"
                        position={Position.Top}
                        className="!bg-orange-500 !w-2 !h-2 !rounded-full"
                        style={{ top: 0, left: '50%' }}
                    />
                )}
            </div>
            {bottomHandle && (
                <Handle
                    id="vertical"
                    type="source"
                    position={Position.Bottom}
                    className="!bg-orange-500 !w-2 !h-2 !rounded-full"
                    style={{ bottom: 0, left: '50%', transform: 'translate(-50%, 60%)' }}
                />
            )}
            {leftHandle && (
                <Handle
                    id="horizontal"
                    type="target"
                    position={Position.Left}
                    className="!bg-orange-500 !w-2 !h-2 !rounded-full"
                    style={{ top: '50%', left: 0, transform: 'translate(-50%, -50%)' }}
                />
            )}
            {rightHandle && (
                <Handle
                    id="horizontal"
                    type="source"
                    position={Position.Right}
                    className="!bg-orange-500 !w-2 !h-2 !rounded-full"
                    style={{ top: '50%', right: 0, transform: 'translate(50%, -50%)' }}
                />
            )}
        </div>
    );
};

export default CoreNode;
