import { configureStore } from '@reduxjs/toolkit';
import appReducer from '@src/features/app/AppSlice';

export default configureStore({
    reducer: {
        app: appReducer
    },
})