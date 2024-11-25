import { useSelector } from "react-redux";
import React from "react";

export default function CanAttemptExam() {
    const { can_attempt, exam, left_hours } = useSelector(
        (state) => state.qbms_exam
    );
    return (
        <>
            {exam?.submitted_at != null && (
                <>
                    {exam?.is_passed == false && (
                        <>
                            <p>
                                {can_attempt && (
                                    <>
                                        {left_hours > 0 ? (
                                            <span>
                                                Batter luck after {left_hours}{" "}
                                                Hours.
                                            </span>
                                        ) : (
                                            <span>
                                                You are now able to attempt the
                                                quiz.
                                            </span>
                                        )}
                                    </>
                                )}
                                {(!can_attempt || left_hours < 0) && (
                                    <span>
                                        You are not able to attempt the quiz.
                                    </span>
                                )}
                            </p>
                        </>
                    )}
                </>
            )}
        </>
    );
}
