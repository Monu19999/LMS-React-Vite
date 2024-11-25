import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourse } from "@src/features/app/CourseSlice";
import { useParams } from "react-router-dom";
import BootstrapSpinner from "@src/Components/BootstrapSpinner";

export default function CheckCourseCompleted({ children, error }) {
    let { course_id } = useParams();
    const dispatch = useDispatch();
    const course = useSelector((state) => state.course.course);
    const { course_loading, is_course_completed } = useSelector(
        (state) => state.course
    );

    useEffect(() => {
        // if course content not found
        if (course == null) {
            // Fetch the course
            dispatch(getCourse(course_id));
        }
        console.log(course);
    }, []);
    return (
        <>
            {
                course_loading ? (
                    <BootstrapSpinner />
                ) : !course_loading && // fetch course API is running
                  is_course_completed && // Check all topics are read
                  course?.qbms_exams_count == 0 && // Check if quiz is alread passed
                  course?.configuration?.is_provide_quiz == 1 ? ( // Check if office provide quiz
                    children // if true render children
                ) : (
                    error
                ) // if false render error message
            }
        </>
    );
}
