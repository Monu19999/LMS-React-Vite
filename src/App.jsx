import {
    Route,
    RouterProvider,
    createHashRouter,
    createRoutesFromElements,
    isRouteErrorResponse,
    useRouteError,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "@src/Pages/Home";
import Page from "@src/Pages/Page";
import Courses from "@src/Pages/courses/Courses";
import PublicLayout from "@src/Components/Layout/Public/PublicLayout";
import Course from "@src/Pages/courses/Course";
import GuestLayout from "@src/Components/Layout/Guest/GuestLayout";
import Login from "@src/Pages/auth/Login";
import UserDashboard from "@src/Pages/member/UserDashboard";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import Register from "@src/Pages/auth/Register";
import MyCourses from "@src/Pages/member/MyCourses";
import MyCertificates from "@src/Pages/member/MyCertificates";
import AvailableCourses from "@src/Pages/member/AvailableCourses";
import ForgetPassword from "./Pages/auth/ForgetPassword";
import ResetPasswordLinkSent from "./Pages/auth/ResetPasswordLinkSent";
import ResetPassword from "./Pages/auth/ResetPassword";
import StudentLayout from "@src/Components/Layout/Student/StudentLayout";
import Download, { loader as downloadLoader } from "./Pages/Download";
import Video, { loader as videoLoader } from "./Pages/Video";
import Feedback from "./Pages/Feedback";
import FAQ, { loader as faqLoader } from "./Pages/FAQ";
import ChangePassword from "./Pages/member/ChangePassword";
import Profile from "./Pages/member/Profile";
import Topic from "./Pages/courses/topics/Topic";
import Test from "./Test";

const router = createHashRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route element={<PublicLayout />}>
                <Route index element={<Home />} />
                <Route exact path="dashboard" element={<Home />} />
                <Route
                    exact
                    path="download"
                    element={<Download />}
                    loader={downloadLoader}
                />
                <Route
                    exact
                    path="video"
                    element={<Video />}
                    loader={videoLoader}
                />
                <Route exact path="page/:page" element={<Page />} />
                <Route exact path="courses" element={<Courses />} />
                <Route exact path="feedback" element={<Feedback />} />
                <Route exact path="faq" element={<FAQ />} loader={faqLoader} />
                <Route
                    exact
                    path="course/:course_id/show"
                    element={<Course />}
                />
                <Route element={<PrivateRoute />}>
                    <Route
                        exact
                        path="course/:course_id/topic/:topic_id/show"
                        element={<Topic />}
                    />
                    <Route
                        exact
                        path="test/:course_id/topic/:topic_id/show"
                        element={<Test />}
                    />
                </Route>
            </Route>
            <Route path="member" element={<PrivateRoute />}>
                <Route element={<StudentLayout />}>
                    <Route index element={<UserDashboard />} />
                    <Route path="profile" element={<Profile />} />
                    <Route
                        path="change-password"
                        element={<ChangePassword />}
                    />
                    <Route exact path="member" element={<UserDashboard />} />
                    <Route exact path="courses" element={<MyCourses />}></Route>
                    <Route
                        exact
                        path="certificates"
                        element={<MyCertificates />}
                    ></Route>
                    <Route
                        exact
                        path="available_courses"
                        element={<AvailableCourses />}
                    ></Route>
                </Route>
            </Route>
            <Route path="auth" element={<PublicRoute />}>
                <Route element={<GuestLayout />}>
                    <Route index element={<Login />} />
                    <Route exact path="login" element={<Login />} />
                    <Route
                        exact
                        path="reset-password/:token/:email"
                        element={<ResetPassword />}
                    />
                    <Route
                        exact
                        path="reset-password-link-sent"
                        element={<ResetPasswordLinkSent />}
                    />
                    <Route exact path="register" element={<Register />} />
                    <Route
                        exact
                        path="forget-password"
                        element={<ForgetPassword />}
                    />
                </Route>
            </Route>
            <Route path="*" element={<Home />} />
        </Route>
    )
);
function App() {
    const token = useSelector((state) => state.auth.token);
    return <RouterProvider router={router} />;
}

export default App;
