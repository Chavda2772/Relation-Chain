import { Trash2, PenIcon, User2 } from 'lucide-react';
import { Handle, Position } from '@xyflow/react';

const TestNode = ({
    data,
    topHandle = true,
    bottomHandle = true,
    leftHandle = false,
    rightHandle = false,
    selected
}) => {
    return (
        <div className='flex gap-1'>
            {/* Child Spouce */}
            <div
                className={`relative w-28 bg-gray-200 rounded-2xl border-2 
            ${selected ? 'border-red-500 shadow-lg scale-105' : 'border-red-400'} 
            transition-transform duration-200 text-center pt-10 pb-2`}
            >
                {/* Avatar Circle */}
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                    <div className="w-20 h-20 rounded-full border-2 border-red-400 bg-white shadow overflow-hidden">
                        <img
                            src={data.avatar || "https://i.pravatar.cc/100?img=35"}
                            alt="avatar"
                            className="w-full h-full object-cover rounded-full"
                        />
                    </div>
                </div>

                {/* Name */}
                <div className="mt-3 font-medium text-gray-800 text-sm capitalize">
                    {data.name || 'Unnamed'}
                </div>

                {bottomHandle && (
                    <Handle
                        id="spouse"
                        type="source"
                        position={Position.Bottom}
                        className="!bg-orange-500 !w-2 !h-2 !rounded-full"
                        style={{ bottom: 0, left: '50%', transform: 'translate(-50%, 60%)' }}
                    />
                )}
            </div>

            {/* Parent Spouse */}
            <div
                className={`relative w-32 bg-white rounded-2xl border-2 
            ${selected ? 'border-red-500 shadow-lg scale-105' : 'border-red-400'} 
            transition-transform duration-200 text-center pt-10 pb-2`}
            >
                {/* Avatar Circle */}
                <div className="absolute -top-14 left-1/2 transform -translate-x-1/2">
                    <div className="w-24 h-24 rounded-full border-2 border-red-400 bg-white shadow overflow-hidden">
                        <img
                            src={data.avatar || "https://i.pravatar.cc/100?img=32"}
                            alt="avatar"
                            className="w-full h-full object-cover rounded-full"
                        />
                    </div>
                </div>

                {/* Name */}
                <div className="mt-3 font-medium text-gray-800 text-sm capitalize">
                    {data.name || 'Unnamed'}
                </div>

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
                        style={{ top: '50%', left: 0, transform: 'translate(-65%, -50%)' }}
                    />
                )}
                {rightHandle && (
                    <Handle
                        id="horizontal"
                        type="source"
                        position={Position.Right}
                        className="!bg-orange-500 !w-2 !h-2 !rounded-full"
                        style={{ top: '50%', right: 0, transform: 'translate(65%, -50%)' }}
                    />
                )}
            </div>

            {/* Child Spouce */}
            <div
                className={`relative w-28 bg-gray-200 rounded-2xl border-2 
            ${selected ? 'border-red-500 shadow-lg scale-105' : 'border-red-400'} 
            transition-transform duration-200 text-center pt-10 pb-2`}
            >
                {/* Avatar Circle */}
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                    <div className="w-20 h-20 rounded-full border-2 border-red-400 bg-white shadow overflow-hidden">
                        <img
                            src={data.avatar || "https://i.pravatar.cc/100?img=38"}
                            alt="avatar"
                            className="w-full h-full object-cover rounded-full"
                        />
                    </div>
                </div>

                {/* Name */}
                <div className="mt-3 font-medium text-gray-800 text-sm capitalize">
                    {data.name || 'Unnamed'}
                </div>

                {bottomHandle && (
                    <Handle
                        id="random"
                        type="source"
                        position={Position.Bottom}
                        className="!bg-orange-500 !w-2 !h-2 !rounded-full"
                        style={{ bottom: 0, left: '50%', transform: 'translate(-50%, 60%)' }}
                    />
                )}
            </div>
        </div>
    );
};

export default TestNode;
