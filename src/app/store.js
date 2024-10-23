import { configureStore, isRejectedWithValue } from '@reduxjs/toolkit';
import authReducer from '@src/features/app/AuthSlice';
import appReducer from '@src/features/app/AppSlice';
import courseReducer from '@src/features/app/CourseSlice';
import qbmsExamReducer from '@src/features/app/QbmsExamSlice';
import homeReducer from '@src/features/app/HomeSlice';
import memberReducer from '@src/features/member/MemberSlice';
import rateReducer from '@src/features/app/RateSlice';
import Cookies from 'js-cookie';

const errorsMiddleware = (store) => (next) => (action) => {
    if (action.type != undefined) {
        const { payload } = action;
        if (isRejectedWithValue(action)) {
            if (payload?.status == 401) {
                // Cookies.remove("token", "");
                // Cookies.remove("user", "");
                // window.location.reload();
            }
            if (payload.status == 500) {
                console.log(payload.status);
            }
        }
    }
    return next(action);
};

export default configureStore({
    reducer: {
        app: appReducer,
        auth: authReducer,
        course: courseReducer,
        qbms_exam: qbmsExamReducer,
        home: homeReducer,
        rating: rateReducer,

        member: memberReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).prepend(errorsMiddleware),

})