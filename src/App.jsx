import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "@src/pages/Home";
import Page from "@src/pages/Page";
import BootstrapSpinner from "@src/components/BootstrapSpinner";
import Layout from "@src/components/Layout/Layout";

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
