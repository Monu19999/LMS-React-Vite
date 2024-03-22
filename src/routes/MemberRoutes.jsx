import React from "react";
import { Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import UserLayout from "@src/Components/Layout/UserLayout";
import UserDashboard from "@src/Pages/member/UserDashboard";
import MyCourses from "@src/Pages/member/MyCourses";
import MyCertificates from "@src/Pages/member/MyCertificates";
import AvailableCourses from "@src/Pages/member/AvailableCourses";

const MemberRoutes = () => {
    return (
        <Route path="/member" element={<PrivateRoute />}>
            <Route path="/member" element={<UserLayout />}>
                <Route index element={<UserDashboard />} />
                <Route exact path="courses" element={<MyCourses />}></Route>
                <Route
                    exact
                    path="certificates"
                    element={<MyCertificates />}
                ></Route>
                <Route
                    exact
                    path="available_courses"
                    element={<AvailableCourses />}
                ></Route>
            </Route>
        </Route>
    );
};

export default MemberRoutes;
