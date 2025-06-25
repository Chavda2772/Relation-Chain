import CoreNode from './CoreNode';

const DefaultNode = ({ data, selected }) => {
    return (
        <CoreNode selected={selected}>
            <div className="flex items-center gap-3">
                <img
                    src={data.avatar || "https://i.pravatar.cc/100?img=62"}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                    <div className="font-semibold text-gray-800 text-sm">
                        {data.name || 'Unnamed'}
                    </div>
                    <div className="text-xs text-gray-500">
                        {data.title || 'No title'}
                    </div>
                </div>
            </div>
        </CoreNode >
    );
};

export default DefaultNode;
