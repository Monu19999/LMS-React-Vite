import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDashboard } from "@src/features/member/MemberSlice";

function UserDashboard() {
    const dispatch = useDispatch();

    const member = useSelector((state) => state.member.pages);

    useEffect(() => {
        dispatch(getDashboard());
    }, []);

    return (
        <>
            <div>
                <h1>
                    Enrolled Course: {member?.dashboard?.enrolled_courses_count}
                </h1>
                <h1>Certificate: {member?.dashboard?.certificates_count}</h1>
                <h1>
                    Course completion:{" "}
                    {member?.dashboard?.completed_courses_count}
                </h1>
            </div>
        </>
    );
}

export default UserDashboard;
