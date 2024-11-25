import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourse } from "@src/features/app/CourseSlice";
import { useParams } from "react-router-dom";
import BootstrapSpinner from "@src/Components/BootstrapSpinner";

export default function CheckCourseAttempts({ children }) {
    let { course_id } = useParams();
    const dispatch = useDispatch();
    const course = useSelector((state) => state.course.course);

    useEffect(() => {
        // if course content not found
        if (course == null) {
            // Fetch the course
            dispatch(getCourse(course_id));
        }
        console.log(course);
    }, []);

    return <>{children}</>;
}
