import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

function GuestLayout() {
    const token = useSelector((state) => state.auth.token);
    return (
        <>
            <div
                className="container-fluid py-4"
                style={{
                    minHeight: "92vh",
                    backgroundColor: "#343747",
                }}
            >
                <div className="container-fluid position-relative p-0">
                    <div className="container-fluid ">
                        <div className="container" id="login-form">
                            <div className="row justify-content-center">
                                <div className="col-md-12 col-lg-10">
                                    <Outlet />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="container-fluid bg-dark text-light footer wow fadeIn"
                data-wow-delay="0.1s"
            >
                <div className="container">
                    <div className="copyright">
                        <div className="row">
                            <div className="col-md-6 col-lg-6 text-center text-md-start mb-3 mb-md-0">
                                ©{" "}
                                <a className="border-bottom" href="#">
                                    e-shiksha
                                </a>
                                , All Right Reserved.
                            </div>
                            <div className="col-md-6 col-lg-6 text-center text-md-end">
                                <div className="footer-menu">
                                    Designed and Developed By{" "}
                                    <a className="border-bottom" href="#">
                                        MPSEDC (CoE)
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default GuestLayout;
