import { Link } from "react-router-dom";
import EnrollCourse from "./EnrollCourse";
import { useSelector } from "react-redux";

function CourseItem({ course }) {
    const course_enrolment_loading = useSelector(
        (state) => state.course.course_enrolment_loading
    );
    return (
        <div className="course-item bg-light">
            <div className="position-relative overflow-hidden">
                <img
                    className="img-fluid"
                    src={
                        course?.course?.upload?.preview_path ??
                        "assets/img/course-2.jpg"
                    }
                    alt={course?.course?.upload?.original_name}
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
                    <EnrollCourse
                        course={course}
                        className="flex-shrink-0 btn btn-sm btn-primary px-3"
                        style={{
                            borderRadius: "0 30px 30px 0",
                        }}
                        course_enrolment_loading={course_enrolment_loading}
                    />
                </div>
            </div>
            <div className="text-center p-4">
                <h5 className="mb-1">{course?.course_name_en}</h5>
                {/* <p style={{ marginTop: "none" }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p> */}
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
