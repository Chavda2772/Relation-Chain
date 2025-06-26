import { createSlice } from '@reduxjs/toolkit';

const initialNodes = [
    {
        id: '1',
        type: 'parentNode',
        position: { x: 300, y: 0 },
        data: {
            name: 'Feldman',
            title: 'First',
            avatar: 'https://i.pravatar.cc/100?img=68',
        },
    },
    {
        id: '2',
        type: 'childNode',
        position: { x: 0, y: 200 },
        data: {
            name: 'Richard',
            title: 'Second',
            avatar: 'https://i.pravatar.cc/100?img=65',
        },
    },
    {
        id: '3',
        type: 'childNode',
        position: { x: 300, y: 200 },
        data: {
            name: 'Emma',
            title: 'Third',
        },
    },
    {
        id: '4',
        type: 'testNode',
        position: { x: 600, y: 200 },
        data: {
            name: 'Lucas',
            title: 'Fourth',
        },
    },
    {
        id: '5',
        type: 'childNode',
        position: { x: 0, y: 400 },
        data: {
            name: 'Richard',
            title: 'Five',
            avatar: 'https://i.pravatar.cc/100?img=64',
        },
    },
    {
        id: '6',
        type: 'childNode',
        position: { x: 300, y: 400 },
        data: {
            name: 'Emma',
            title: 'Six',
            avatar: 'https://i.pravatar.cc/100?img=63',
        },
    },
    {
        id: '7',
        type: 'childNode',
        position: { x: 600, y: 400 },
        data: {
            name: 'Lucas',
            title: 'Seven',
            avatar: 'https://i.pravatar.cc/100?img=60',
        },
    },
];

const initialState = {
    nodes: initialNodes,
    edges: [],
    selectedNodeId: null,
};

const canvasSlice = createSlice({
    name: 'canvas',
    initialState,
    reducers: {
        setNodesAction: (state, action) => {
            state.nodes = action.payload;
        },
        setEdgesAction: (state, action) => {
            state.edges = action.payload;
        },
        setSelectedNodeId: (state, action) => {
            state.selectedNodeId = action.payload;
        },
        addNode: (state, action) => {
            const node = action.payload;
            state.nodes = [...state.nodes, node]
        },
        deleteNodeById: (state, action) => {
            const nodeId = action.payload;
            state.nodes = state.nodes.filter(node => node.id !== nodeId);
            state.edges = state.edges.filter(
                edge => edge.source !== nodeId && edge.target !== nodeId
            );
            if (state.selectedNodeId === nodeId) {
                state.selectedNodeId = null;
            }
        }
    }
});

export const {
    setNodesAction,
    setEdgesAction,
    setSelectedNodeId,
    addNode,
    deleteNodeById
} = canvasSlice.actions;

export default canvasSlice.reducer;