import BaseNode from './BaseNode';

const ParentNode = ({ data, selected }) => {
    return (
        <BaseNode
            data={data}
            bottomHandle={true}
            selected={selected}
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
        </BaseNode>
    );
};

export default ParentNode;
