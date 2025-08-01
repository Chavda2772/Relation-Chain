import { configureStore } from '@reduxjs/toolkit';
import canvasReducer from './slices/canvasSlice';

export const store = configureStore({
    reducer: {
        canvas: canvasReducer,
    },
});
