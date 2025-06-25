import { Handle, Position } from '@xyflow/react';

const DefaultNode = ({ data }) => {
    return (
        <div className="bg-white border-2 border-blue-300 rounded-lg shadow-md px-4 py-2 w-56 text-left relative">
            <Handle
                type="target"
                position={Position.Top}
                style={{ background: '#56ccf2' }}
            />

            {/* Avatar and Text Row */}
            <div className="flex items-center gap-3">
                <img
                    src={data.avatar || "https://i.pravatar.cc/40"} // Fallback avatar
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                    <div className="font-semibold text-gray-800 text-sm">
                        {data.name || "Richard"}
                    </div>
                    <div className="text-xs text-gray-500">{data.title || "Feldman"}</div>
                </div>
            </div>

            {/* Output handle at bottom center */}
            <Handle
                type="source"
                position={Position.Bottom}
                style={{ background: '#27ae60' }}
            />
        </div>
    );
};

export default DefaultNode;
