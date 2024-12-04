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
    }, []);

    const checkIfCourseCompleted = () => {
        return is_course_completed;
    };
    const checkIfQuizAlreadyPassed = () => {
        // if qbms_exams_count is 1 means quiz is already given and passed
        return course?.qbms_exams_count == 0;
    };
    const checkIfOfficeProvideQuiz = () => {
        course?.configuration?.is_provide_quiz == 0 &&
            console.log(`Office do not provides quiz.`);
        return course?.configuration?.is_provide_quiz == 1;
    };
    const CheckIfCourseHaveQuestions = () => {
        console.log(
            course?.questions_count,
            course?.configuration?.no_of_questions_in_quiz
        );

        course?.questions_count >=
            course?.configuration?.no_of_questions_in_quiz ==
            false && console.log("Course haven't enough questions to show.");
        return (
            course?.questions_count >=
            course?.configuration?.no_of_questions_in_quiz
        );
    };
    return (
        <>
            {course_loading ? (
                <BootstrapSpinner />
            ) : !course_loading && // fetch course API is running
              checkIfCourseCompleted() && // Check all topics are read
              checkIfQuizAlreadyPassed() && // Check if quiz is alread passed
              checkIfOfficeProvideQuiz() && // Check if office provide quiz
              CheckIfCourseHaveQuestions() ? ( // Check if course have enough questions to show
                children // if true render children
            ) : (
                error // if false render error message
            )}
        </>
    );
}
