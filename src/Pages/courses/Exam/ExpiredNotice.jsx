import React from "react";

export default function ExpiredNotice({ exam }) {
    // console.log(exam);

    return (
        <>
            {exam && (
                <div className="expired-notice">
                    {exam?.is_time_expired == 1 &&
                        exam?.submitted_at != null && (
                            <span>Time Expired!!!</span>
                        )}
                    {exam?.is_time_expired == 0 &&
                        exam?.submitted_at != null && (
                            <span>Thanks for Quiz Submission!!!</span>
                        )}
                    <p>Your quiz has been submitted successfully!</p>
                </div>
            )}
        </>
    );
}
