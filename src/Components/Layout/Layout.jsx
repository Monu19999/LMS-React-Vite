import FooterMenu from "@src/Pages/includes/FooterMenu";
import Settings from "@src/Pages/includes/Settings";
import Navbar from "@src/Pages/includes/Navbar";
import { Outlet } from "react-router-dom";
import useFetch from "@src/Hooks/useFetch";
import BootstrapSpinner from "@src/Components/BootstrapSpinner";
import api from "@src/apis/api";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAppData } from "@src/features/app/AppSlice";

// Load css
// import "@public/assets/css/bootstrap.min.css";
// import "@public/assets/css/style.css";
// import "@public/assets/css/change.css";
// import "@public/assets/lib/animate/animate.min.css";

// import "@public/assets/lib/wow/wow.min.js";
// import "@public/assets/lib/easing/easing.min.js";
// import "@public/assets/lib/waypoints/waypoints.min.js";
// import "@public/assets/js/main.js";
// import "@public/assets/js/global-min.js";

export default function Layout() {
    const { isLoading, serverError, apiData } = useFetch("GET", api("api"), {});
    // const { app_state, app_loading } = useSelector((state) => state.app);

    // const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(getAppData());
    // }, []);
    // if (app_loading) return <BootstrapSpinner />;

    // let nevbar = () => {
    //     if (app_state?.data?.top_menus) {
    //         console.log("yes");
    //     } else {
    //         console.log("no");
    //     }
    // };

    return (
        <>
            {/* Spinner End */}
            <Settings />
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
                href="#"
                className="btn btn-lg btn-primary btn-lg-square back-to-top"
            >
                <i className="bi bi-arrow-up" />
            </a>
        </>
    );
}
