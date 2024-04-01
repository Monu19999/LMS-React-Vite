import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { enrollCourse } from "@src/features/app/CourseSlice";
import Enrolled from "./EnrollCourse";

// function Enrolled({ course }) {
//     const auth_states = useSelector((state) => state.auth);

//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const handleEnroll = async () => {
//         // console.log("enroll course");
//         let response = await dispatch(enrollCourse(course.id));
//         if (
//             response.payload.hasOwnProperty("message") &&
//             response.payload.message === "Unauthenticated."
//         ) {
//             navigate("/auth/login");
//         }
//     };

//     if (auth_states?.user) {
//         if (course?.enrollments?.length === 1) {
//             if (course.enrollments[0].fk_user_id == auth_states.user.id) {
//                 return (
//                     <button
//                         type="button"
//                         className="flex-shrink-0 btn btn-sm btn-primary px-3"
//                         style={{
//                             borderRadius: "0 30px 30px 0",
//                         }}
//                     >
//                         Enrolled
//                     </button>
//                 );
//             }
//         }
//     }
//     return (
//         <button
//             type="button"
//             onClick={handleEnroll}
//             className="flex-shrink-0 btn btn-sm btn-primary px-3"
//             style={{
//                 borderRadius: "0 30px 30px 0",
//             }}
//         >
//             Enroll Now
//         </button>
//     );
// }

function CourseItem({ course }) {
  return (
    <div className="course-item bg-light">
      <div className="position-relative overflow-hidden">
        <img
          className="img-fluid"
          src={course?.upload?.file_path ?? "assets/img/course-1.jpg"}
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
          <Enrolled
            course={course}
            className="flex-shrink-0 btn btn-sm btn-primary px-3"
            style={{
              borderRadius: "0 30px 30px 0",
            }}
          />
        </div>
      </div>
      <div className="text-center p-4 pb-0 min-h">
        <h5 className="mb-4">
          {course?.assigned_admin?.category_course?.course_name_en}
        </h5>
      </div>
      <div className="d-flex border-top">
        <small className="flex-fill text-center border-end py-2">
          <i className="fa fa-clock text-primary me-2" /> Duration - 10 Hrs
        </small>
      </div>
    </div>
  );
}

export default CourseItem;
