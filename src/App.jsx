import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "@src/Pages/Home";
import Page from "@src/Pages/Page";
import CoursesList from "@src/Pages/courses/CoursesList";
import BootstrapSpinner from "@src/Components/BootstrapSpinner";
import Layout from "@src/Components/Layout/Layout";
import CourseView from "./Pages/courses/CourseView";

function App() {
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
                    <Route
                        path="dashboard"
                        element={
                            <Suspense fallback={<BootstrapSpinner />}>
                                <Home />
                            </Suspense>
                        }
                    />
                    <Route
                        path="page/:page"
                        element={
                            <Suspense fallback={<BootstrapSpinner />}>
                                <Page />
                            </Suspense>
                        }
                    />
                    <Route
                        path="courses"
                        element={
                            <Suspense fallback={<BootstrapSpinner />}>
                                <CoursesList />
                            </Suspense>
                        }
                    />
                    <Route
                        path="course/:course_id/show"
                        element={
                            <Suspense fallback={<BootstrapSpinner />}>
                                <CourseView />
                            </Suspense>
                        }
                    />
                    <Route
                        path="*"
                        element={
                            <Suspense fallback={<BootstrapSpinner />}>
                                <Home />
                            </Suspense>
                        }
                    />
                </Route>
            </Routes>
        </>
    );
}

export default App;
