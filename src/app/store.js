import { configureStore, isRejectedWithValue } from '@reduxjs/toolkit';
import authReducer from '@src/features/app/AuthSlice';
import appReducer from '@src/features/app/AppSlice';
import courseReducer from '@src/features/app/CourseSlice';
import homeReducer from '@src/features/app/HomeSlice';
import memberReducer from '@src/features/member/MemberSlice';
import Cookies from 'js-cookie';

const errorsMiddleware = (store) => (next) => (action) => {
    // console.log(action.type);
    if (action.type != undefined) {
        const { payload } = action;
        if (isRejectedWithValue(action)) {
            if (payload?.status == 401) {
                Cookies.remove("token", "");
                Cookies.remove("user", "");
                window.location.reload();
            }
            // if (payload.status == 500) {
            //     console.log(payload.status);
            // }
        }
    }
    return next(action);
};

export default configureStore({
    reducer: {
        app: appReducer,
        auth: authReducer,
        course: courseReducer,
        home: homeReducer,

        member: memberReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).prepend(errorsMiddleware),

})