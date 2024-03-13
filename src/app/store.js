import { configureStore } from '@reduxjs/toolkit';
import appReducer from '@src/features/app/AppSlice';
import courseReducer from '@src/features/app/CourseSlice';
import homeReducer from '@src/features/app/HomeSlice';

export default configureStore({
    reducer: {
        app: appReducer,
        course: courseReducer,
        home: homeReducer
    },
})