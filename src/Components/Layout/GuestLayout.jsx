import React from "react";
import { Outlet } from "react-router-dom";

function GuestLayout() {
    return (
        <>
            <div id="loading">
                <div id="loading-content">
                    <div className="overlay" style={{ display: "none" }}>
                        <i className="fas fa-3x fa-sync-alt fa-spin" />
                        <div className="text-bold pt-2">Loading...</div>
                    </div>
                </div>
            </div>
            <Outlet />
        </>
    );
}

export default GuestLayout;
