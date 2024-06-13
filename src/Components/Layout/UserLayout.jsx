import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "@public/assets/dashboard/css/style.css";
// import "@public/assets/dashboard/css/font-awesome.min.css";
import { getAppData } from "@src/features/app/AppSlice";
import Navbar from "@src/Pages/includes/Navbar";
import FooterMenu from "@src/Pages/includes/FooterMenu";
import LoginMenu from "@src/Pages/member/includes/LoginMenu";

function UserLayout() {
    const member = useSelector((state) => state.member);
    const auth_state = useSelector((state) => state.auth);
    const app_state = useSelector((state) => state.app);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAppData());
    }, []);

    let navbar_menu = () => {
        if (app_state?.data?.top_menus) {
            return <Navbar menus={app_state.data.top_menus} />;
        }
    };

    let footer_menu = () => {
        if (app_state?.data?.bottom_menus) {
            return <FooterMenu menus={app_state.data.bottom_menus} />;
        }
    };

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
            {navbar_menu()}
            <div className="container-fluid py-5" id="dashboard-layout">
                <div className="wrapper d-flex align-items-stretch">
                    <nav id="sidebar">
                        <div className="custom-menu">
                            <button
                                type="button"
                                id="sidebarCollapse"
                                className="btn btn-primary"
                            >
                                <i
                                    className="fa fa-bars text-white"
                                    aria-hidden="true"
                                ></i>
                            </button>
                        </div>
                        <div
                            className="img bg-wrap text-center py-4"
                            style={{
                                backgroundImage:
                                    "url(assets/img/dashboard/bg_1.jpg)",
                            }}
                        >
                            <div className="user-logo">
                                <div
                                    className="img"
                                    style={{
                                        backgroundImage:
                                            "url(assets/img/dashboard/logo.jpg)",
                                    }}
                                />
                                <h3>{auth_state?.user?.name}</h3>
                            </div>
                        </div>
                        <ul className="list-unstyled components mb-5">
                            <li className="active">
                                <Link to="/member">
                                    <span className="fa fa-home mr-3" />{" "}
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link to="/member/available_courses">
                                    <span className="fa fa-gift mr-3" />{" "}
                                    Available Courses
                                </Link>
                            </li>
                            <li>
                                <Link to="/member/courses">
                                    <span className="fas fa-book mr-3" /> My
                                    Courses
                                </Link>
                            </li>
                            <li>
                                <Link to="/member/certificates">
                                    <span className="fas fa-user-graduate mr-3" />{" "}
                                    My Certificate
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    {/* Page Content  */}
                    <div id="content" className="p-4 p-md-5 pt-5">
                        {member?.error}
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserLayout;
