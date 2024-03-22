import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { logout } from "@src/features/app/AuthSlice";

function UserLayout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const member = useSelector((state) => state.member);

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
        navigate("/auth/login");
    };
    return (
        <>
            <div className="d-flex justify-content-between m-2 container mx-auto">
                <ul className="d-flex gap-2">
                    <li className="">
                        <Link to="/member">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/member/courses">My Courses</Link>
                    </li>
                    <li>
                        <Link to="/member/certificates">My Certificates</Link>
                    </li>
                    <li>
                        <Link to="/member/available_courses">
                            Available Courses
                        </Link>
                    </li>
                </ul>
                <ul className="d-flex gap-2">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <a
                            href="#"
                            onClick={handleLogout}
                            className="btn btn-primary"
                        >
                            Logout
                        </a>
                    </li>
                </ul>
            </div>
            {member?.error}
            <Outlet />
        </>
    );
}

export default UserLayout;
