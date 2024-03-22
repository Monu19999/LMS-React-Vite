import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userCourses } from "@src/features/member/MemberSlice";

const MyCourses = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userCourses());
    }, []);

    return (
        <>
            <h1>My Courses</h1>
        </>
    );
};

export default MyCourses;
