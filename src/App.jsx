import { Navigate, Route, Routes, redirect } from "react-router-dom";
import Home from "@src/Pages/Home";
import Page from "@src/Pages/Page";
import CoursesList from "@src/Pages/courses/CoursesList";
import Layout from "@src/Components/Layout/Layout";
import CourseView from "@src/Pages/courses/CourseView";
import GuestLayout from "@src/Components/Layout/GuestLayout";
import Login from "@src/Pages/auth/Login";
import { useSelector } from "react-redux";
import UserDashboard from "@src/Pages/frontend/UserDashboard";
import UserLayout from "@src/Components/Layout/UserLayout";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";

function App() {
    const token = useSelector((state) => state.auth.token);
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    {/* <Route
                        exact
                        path="login"
                        element={
                            <Suspense fallback={<BootstrapSpinner />}>
                                <Login />
                            </Suspense>
                        }
                    /> */}
                    <Route exact path="dashboard" element={<Home />} />
                    <Route exact path="page/:page" element={<Page />} />
                    <Route exact path="courses" element={<CoursesList />} />
                    <Route
                        exact
                        path="course/:course_id/show"
                        element={<CourseView />}
                    />
                    <Route path="*" element={<Home />} />
                </Route>
                <Route path="/auth" element={<PublicRoute />}>
                    <Route path="/auth" element={<GuestLayout />}>
                        <Route index element={<Login />} />
                        <Route exact path="login" element={<Login />} />
                    </Route>
                </Route>
                <Route path="/front" element={<PrivateRoute />}>
                    <Route path="/front" element={<UserLayout />}>
                        <Route index element={<UserDashboard />} />
                    </Route>
                </Route>
            </Routes>
        </>
    );
}

export default App;
