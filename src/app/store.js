import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@src/features/app/AuthSlice';
import appReducer from '@src/features/app/AppSlice';
import courseReducer from '@src/features/app/CourseSlice';
import homeReducer from '@src/features/app/HomeSlice';
import memberReducer from '@src/features/member/MemberSlice';

export default configureStore({
    reducer: {
        app: appReducer,
        auth: authReducer,
        course: courseReducer,
        home: homeReducer,

        member: memberReducer,
    },
})