import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import "@public/assets/dashboard/css/style.css";
// import "@public/assets/dashboard/css/font-awesome.min.css";
import { getAppData } from "@src/features/app/AppSlice";
import Navbar from "@src/Components/Layout/includes/Navbar";
import FooterMenu from "@src/Components/Layout/includes/FooterMenu";
import LoginMenu from "@src/Pages/member/includes/LoginMenu";
import FooterCopyright from "@src/Components/Layout/includes/FooterCopyright";
import StudentSidebar from "./StudentSidebar";
import ScrollToTop from "@src/Components/Layout/includes/ScrollToTop";
import Toaster from "@src/Components/Toaster";

const StudentLayout = () => {
    const member = useSelector((state) => state.member);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAppData());
    }, []);

    return (
        <>
            <div id="topbar">
                <div className="d-flex align-items-center ">
                    <div className="container-fluid d-flex justify-content-end">
                        <div
                            className="contact-info d-flex align-items-center"
                            style={{ padding: "15px 0" }}
                        >
                            <LoginMenu />
                        </div>
                    </div>
                </div>
            </div>
            <Navbar />
            <div className="container-fluid py-5" id="dashboard-layout">
                <div className="wrapper d-flex align-items-stretch">
                    <StudentSidebar />
                    {/* Page Content  */}
                    <div id="content" className="p-4 p-md-5 pt-5">
                        {member?.error}
                        <Outlet />
                    </div>
                </div>
            </div>

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
};

export default StudentLayout;
