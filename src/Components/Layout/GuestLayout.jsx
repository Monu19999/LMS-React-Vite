import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

function GuestLayout() {
    const token = useSelector((state) => state.auth.token);
    return (
        <>
            <Outlet />
        </>
    );
}

export default GuestLayout;
