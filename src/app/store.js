import { configureStore } from '@reduxjs/toolkit';
import appReducer from '@features/app/AppSlice';

export default configureStore({
    reducer: {
        app: appReducer
    },
})