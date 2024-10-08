import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { enrollCourse, getCourses } from "@src/features/app/CourseSlice";
import { useState } from "react";
import { availableCourses } from "@src/features/member/MemberSlice";
import { Button } from "react-bootstrap";

function EnrollCourse({ course, className, style, course_enrolment_loading }) {
    const auth_states = useSelector((state) => state.auth);
    const [course_enrolment_loading1, setCourseEnrolmentLoading] = useState(
        course_enrolment_loading
    );

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleEnroll = async (e) => {
        setCourseEnrolmentLoading(true);
        e.preventDefault();
        let response = await dispatch(
            enrollCourse({
                id: course.id,
                fk_department_id: course.course_hierarchy.fk_department_id,
                fk_office_id: course.course_hierarchy.fk_office_id,
            })
        );
        if (
            response.payload.status == 401 &&
            response.payload.message === "Unauthenticated."
        ) {
            navigate("/auth/login");
        }
        await dispatch(getCourses());
        await dispatch(availableCourses());
        setCourseEnrolmentLoading(false);
    };

    if (auth_states?.user) {
        if (course?.enrollments?.length === 1) {
            if (course.enrollments[0].fk_user_id == auth_states.user.id) {
                return (
                    <Button
                        type="button"
                        className={className}
                        style={style || {}}
                        disabled={course_enrolment_loading1}
                    >
                        {course_enrolment_loading1
                            ? "Enroling..."
                            : course.enrollments[0].status == 0
                            ? "Pending"
                            : "Enrolled"}
                    </Button>
                );
            }
        }
    }
    return (
        <Button
            type="button"
            onClick={handleEnroll}
            className={className}
            style={style || {}}
            disabled={course_enrolment_loading1}
        >
            {course_enrolment_loading1 ? "Enroling..." : "Enroll Now"}
        </Button>
    );
}

export default EnrollCourse;
