import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BootstrapSpinner from "@src/Components/BootstrapSpinner";
import { useParams } from "react-router-dom";
import { getCourse } from "@src/features/app/CourseSlice";
import CanAttemptExam from "./CanAttemptExam";

export default function ExpiredNotice({ exam }) {
    console.log("exam");
    console.log(exam?.category_course?.configuration);
    let { course_id } = useParams();
    const dispatch = useDispatch();
    const { exam_loading, can_attempt, left_hours } = useSelector(
        (state) => state.qbms_exam
    );
    const course = useSelector((state) => state.course.course);

    const [left_hours_to_attempt, setLeftHourToAttempt] = useState(null);

    const hoursLeft = () => {
        setLeftHourToAttempt(
            24 -
                Math.floor(
                    (new Date().getTime() -
                        new Date(exam?.submitted_at).getTime()) /
                        (1000 * 60 * 60)
                )
        );
    };

    useEffect(() => {
        // if course content not found
        if (course == null) {
            // Fetch the course
            dispatch(getCourse(course_id));
        }
        hoursLeft();
    }, []);

    const DoesProvideCertificate = () => {
        if (course?.configuration?.is_provide_certificate == 1) {
            return (
                <>
                    Please collect your certificate from My Certificate menu on
                    your dashboard in some time.
                </>
            );
        }
    };

    return (
        <>
            {exam_loading && <BootstrapSpinner />}
            {exam_loading == false && exam && (
                <>
                    {/* {"left_hours_to_attempt => " + left_hours} */}
                    {/* {left_hours_to_attempt < 0 ? (
                        <h1>Attempts are over</h1>
                    ) : (
                    )} */}
                    <div className="expired-notice">
                        {left_hours > 0 && (
                            <>
                                {exam?.is_time_expired == 1 &&
                                    exam?.submitted_at != null && (
                                        <span>Time Expired!!!</span>
                                    )}
                                {exam?.is_time_expired == 0 &&
                                    exam?.submitted_at != null && (
                                        <span>
                                            Thanks for Quiz Submission!!!
                                        </span>
                                    )}
                                <p>
                                    Your quiz has been submitted successfully!
                                </p>
                                {exam?.submitted_at != null && (
                                    <>
                                        <p>
                                            <strong>
                                                Questions Attempted:
                                            </strong>{" "}
                                            {exam?.no_of_correct_answers}/
                                            {exam?.no_of_questions}
                                        </p>
                                        <p>
                                            <strong>Percentage:</strong>{" "}
                                            {exam?.percentage}%
                                        </p>
                                        {exam?.is_passed == true ? (
                                            <p>
                                                You passed this quiz.{" "}
                                                <DoesProvideCertificate />
                                            </p>
                                        ) : (
                                            <>
                                                <p>
                                                    You failed in this quiz.
                                                    {!can_attempt && (
                                                        <span>
                                                            You have reached no
                                                            of attempts.
                                                        </span>
                                                    )}
                                                </p>
                                            </>
                                        )}
                                    </>
                                )}
                            </>
                        )}
                        <CanAttemptExam />
                        {/* {exam?.submitted_at != null && (
                            <>
                                {exam?.is_passed == false && (
                                    <>
                                        <p>
                                            {can_attempt && (
                                                <>
                                                    {left_hours >
                                                    0 ? (
                                                        <span>
                                                            Batter luck after{" "}
                                                            {
                                                                left_hours
                                                            }{" "}
                                                            Hours.
                                                        </span>
                                                    ) : (
                                                        <span>
                                                            You are now able to
                                                            attempt the quiz.
                                                        </span>
                                                    )}
                                                </>
                                            )}
                                        </p>
                                    </>
                                )}
                            </>
                        )} */}
                    </div>
                </>
            )}
        </>
    );
}
