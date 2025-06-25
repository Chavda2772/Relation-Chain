import CoreNode from './CoreNode';

const RootNode = ({ data, selected }) => {
    return (
        <CoreNode topHandle={false} selected={selected}>
            <div className="flex items-center gap-3">
                {data.avatar && (
                    <img
                        src={data.avatar}
                        alt="avatar"
                        className="w-10 h-10 rounded-full object-cover"
                    />
                )}
                <div>
                    <div className="font-semibold text-gray-800 text-sm">
                        {data.name || 'Unnamed'}
                    </div>
                    <div className="text-xs text-gray-500">
                        {data.title || 'No title'}
                    </div>
                </div>
            </div>
        </CoreNode>
    );
};

export default RootNode;
