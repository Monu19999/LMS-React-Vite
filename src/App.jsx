import { Suspense, useEffect } from "react";
import { Navigate, Route, Routes, redirect } from "react-router-dom";
import Home from "@src/Pages/Home";
import Page from "@src/Pages/Page";
import CoursesList from "@src/Pages/courses/CoursesList";
import BootstrapSpinner from "@src/Components/BootstrapSpinner";
import Layout from "@src/Components/Layout/Layout";
import CourseView from "@src/Pages/courses/CourseView";
import GuestLayout from "@src/Components/Layout/GuestLayout";
import Login from "@src//Pages/auth/Login";
import { useSelector } from "react-redux";

function App() {
    const token = useSelector((state) => state.auth.token);
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route
                        index
                        element={
                            <Suspense fallback={<BootstrapSpinner />}>
                                <Home />
                            </Suspense>
                        }
                    />
                    {/* <Route
                        exact
                        path="login"
                        element={
                            <Suspense fallback={<BootstrapSpinner />}>
                                <Login />
                            </Suspense>
                        }
                    /> */}
                    <Route
                        exact
                        path="dashboard"
                        element={
                            <Suspense fallback={<BootstrapSpinner />}>
                                <Home />
                            </Suspense>
                        }
                    />
                    <Route
                        exact
                        path="page/:page"
                        element={
                            <Suspense fallback={<BootstrapSpinner />}>
                                <Page />
                            </Suspense>
                        }
                    />
                    <Route
                        exact
                        path="courses"
                        element={
                            <Suspense fallback={<BootstrapSpinner />}>
                                <CoursesList />
                            </Suspense>
                        }
                    />
                    <Route
                        exact
                        path="course/:course_id/show"
                        element={
                            <Suspense fallback={<BootstrapSpinner />}>
                                <CourseView />
                            </Suspense>
                        }
                    />
                </Route>
                <Route path="/auth" element={<GuestLayout />}>
                    <Route
                        index
                        element={
                            <Suspense fallback={<BootstrapSpinner />}>
                                {token == null ? (
                                    <Login />
                                ) : (
                                    <Navigate to="/dashboard" />
                                )}
                            </Suspense>
                        }
                    />
                    <Route
                        exact
                        path="login"
                        element={
                            <Suspense fallback={<BootstrapSpinner />}>
                                {token == null ? (
                                    <Login />
                                ) : (
                                    <Navigate to="/dashboard" />
                                )}
                            </Suspense>
                        }
                    />
                </Route>
                <Route
                    path="*"
                    element={
                        <Suspense fallback={<BootstrapSpinner />}>
                            <Home />
                        </Suspense>
                    }
                />
            </Routes>
        </>
    );
}

export default App;
