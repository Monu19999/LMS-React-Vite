import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { enrollCourse } from "@src/features/app/CourseSlice";

function CourseItem({ course }) {
    const dispatch = useDispatch();

    const course_states = useSelector((state) => state.course);

    const handleEnroll = () => {
        // console.log("enroll course");
        dispatch(enrollCourse(course.id));
        console.log(course_states);
    };

    return (
        <div className="course-item bg-light">
            <div className="position-relative overflow-hidden">
                <img
                    className="img-fluid"
                    src={
                        course?.upload?.file_path ??
                        "/public/assets/img/course-1.jpg"
                    }
                    alt={course?.upload?.original_name}
                />
                <div className="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4">
                    <Link
                        to={"/course/" + course.encr_id + "/show"}
                        className="flex-shrink-0 btn btn-sm btn-primary px-3 border-end"
                        style={{
                            borderRadius: "30px 0 0 30px",
                        }}
                    >
                        View
                    </Link>
                    <button
                        type="button"
                        onClick={handleEnroll}
                        className="flex-shrink-0 btn btn-sm btn-primary px-3"
                        style={{
                            borderRadius: "0 30px 30px 0",
                        }}
                    >
                        Enroll Now
                    </button>
                </div>
            </div>
            <div className="text-center p-4 pb-0 min-h">
                <h5 className="mb-4">
                    {course?.assigned_admin?.category_course?.course_name_en}
                </h5>
            </div>
            <div className="d-flex border-top">
                <small className="flex-fill text-center border-end py-2">
                    <i className="fa fa-clock text-primary me-2" /> Duration -
                    10 Hrs
                </small>
            </div>
        </div>
    );
}

export default CourseItem;
