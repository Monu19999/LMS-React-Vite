import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { enrollCourse } from "@src/features/app/CourseSlice";

function Enrolled({ course, className, style }) {
    const auth_states = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleEnroll = async () => {
        console.log("enroll course");
        let response = await dispatch(enrollCourse(course.id));
        console.log(response);
        if (
            response.payload.hasOwnProperty("message") &&
            response.payload.message === "Unauthenticated."
        ) {
            navigate("/auth/login");
        }
    };

    const hasEnrolled = function (enrolments) {
        if (enrolments) {
            console.log("here");
            let enrolled_user = enrolments.filter((enrolment) => {
                if (
                    enrolment.fk_user_id == auth_states.user.id &&
                    enrolment.status == 1
                ) {
                    return enrolment.fk_user_id;
                }
            });
            return enrolled_user.length > 0;
        }
    };

    if (auth_states?.user) {
        if (course?.enrollments?.length === 1) {
            // hasEnrolled(course.enrollments);
            if (
                course.enrollments[0].fk_user_id == auth_states.user.id &&
                course.enrollments[0].status == 1
            ) {
                return (
                    <button
                        type="button"
                        className={className}
                        style={style || {}}
                    >
                        Enrolled
                    </button>
                );
            }
        }
    }
    return (
        <button
            type="button"
            onClick={handleEnroll}
            className={className}
            style={style || {}}
        >
            Enroll Now
        </button>
    );
}

export default Enrolled;
