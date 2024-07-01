import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAppData } from "@src/features/app/AppSlice";
import FooterMenu from "@src/Components/Layout/includes/FooterMenu";
import Settings from "@src/Components/Layout/includes/Settings";
import Navbar from "@src/Components/Layout/includes/Navbar";
import ScrollToTop from "@src/Components/Layout/includes/ScrollToTop";
import FooterCopyright from "@src/Components/Layout/includes/FooterCopyright";
import Toaster from "@src/Components/Toaster";

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

function PublicLayout() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAppData());
    }, []);

    return (
        <>
            {/* Spinner End */}
            <Settings />
            <Navbar />
            <Outlet />
            {/* Footer Start */}
            <div
                className="container-fluid bg-dark text-light footer wow fadeIn"
                data-wow-delay="0.1s"
            >
                <FooterMenu />
                <FooterCopyright />
            </div>
            {/* Footer End */}

            <ScrollToTop />
            <Toaster />
        </>
    );
}

export default PublicLayout;
