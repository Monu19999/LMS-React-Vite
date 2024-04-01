import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { enrollCourse } from "@src/features/app/CourseSlice";

function Enrolled({ course , className, style}) {
    const auth_states = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleEnroll = async () => {
        // console.log("enroll course");
        let response = await dispatch(enrollCourse(course.id));
        if (
            response.payload.hasOwnProperty("message") &&
            response.payload.message === "Unauthenticated."
        ) {
            navigate("/auth/login");
        }
    };

    if (auth_states?.user) {
        if (course?.enrollments?.length === 1) {
            if (course.enrollments[0].fk_user_id == auth_states.user.id) {
                return (
                    <button
                        type="button"
                        className="flex-shrink-0 btn btn-sm btn-primary px-3"
                        style={{
                            borderRadius: "0 30px 30px 0",
                        }}
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
            style={style}
        >
            Enroll Now
        </button>
    );
}

export default Enrolled;
