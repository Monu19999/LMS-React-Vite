import FooterMenu from "@src/Pages/includes/FooterMenu";
import Settings from "@src/pages/includes/Settings";
import Navbar from "@src/pages/includes/Navbar";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import useFetch from "@src/Hooks/useFetch";
import BootstrapSpinner from "../BootstrapSpinner";
import api from "@src/apis/api";

export default function Layout() {
    const { isLoading, serverError, apiData } = useFetch("GET", api("api"), {});
    //http://localhost:8000/api/home
    return (
        <>
            {/* Spinner Start */}
            <div
                id="spinner"
                className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
            >
                <div
                    className="spinner-border text-primary"
                    style={{ width: "3rem", height: "3rem" }}
                    role="status"
                >
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
            {/* Spinner End */}
            <Settings />
            {isLoading && <BootstrapSpinner />}
            {apiData?.data.top_menus && (
                <Navbar menus={apiData.data.top_menus} />
            )}
            {/* <Navbar /> */}

            <Outlet />

            {/* Footer Start */}
            <div
                className="container-fluid bg-dark text-light footer wow fadeIn"
                data-wow-delay="0.1s"
            >
                {apiData?.data.bottom_menus && (
                    <FooterMenu menus={apiData.data.bottom_menus} />
                )}
                {/* <FooterMenu /> */}
                <div className="container">
                    <div className="copyright">
                        <div className="row">
                            <div className="col-md-4 col-lg-4 text-center text-md-start mb-3 mb-md-0">
                                ©{" "}
                                <a className="border-bottom" href="index.html">
                                    e-shiksha
                                </a>
                                , All Right Reserved.
                            </div>
                            <div className="col-md-4 col-lg-4 text-center">
                                Last Update On : 03 Nov 2023, 15:50
                            </div>
                            <div className="col-md-4 col-lg-4 text-center text-md-end">
                                <div className="footer-menu">
                                    Designed and Developed By{" "}
                                    <a
                                        className="border-bottom"
                                        href="index.html"
                                    >
                                        MPSEDC (CoE)
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Footer End */}

            {/* Back to Top */}
            <a
                href="index.html"
                className="btn btn-lg btn-primary btn-lg-square back-to-top"
            >
                <i className="bi bi-arrow-up" />
            </a>
        </>
    );
}
