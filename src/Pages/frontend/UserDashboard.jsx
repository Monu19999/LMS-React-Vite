import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "@src/features/app/AuthSlice";

function UserDashboard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
        navigate("/auth/login");
    };
    return (
        <>
            <Link to="/">Home</Link>
            <a href="#" onClick={handleLogout}>
                Logout
            </a>
        </>
    );
}

export default UserDashboard;
