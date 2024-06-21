import { Placeholder } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import RenderCourseHierarchyBC from "./RenderCourseHierarchyBC";

export default function CourseBradeCrumb({
    category_course,
    course_hierarchy,
}) {
    const course_topic_loading = useSelector(
        (state) => state.course.course_topic_loading
    );

    const RenderHomeBC = () => {
        return (
            <li className="breadcrumb-item active">
                <Link to="/">Home</Link>
            </li>
        );
    };

    const RenderCourseNameBC = () => {
        return (
            <li className="breadcrumb-item active" aria-current="page">
                {category_course?.course_name_en}
            </li>
        );
    };

    return (
        <nav aria-label="breadcrumb" className="mb-4">
            <ol className="breadcrumb">
                {course_topic_loading ? (
                    <Placeholder.Button xs={2} aria-hidden="true" />
                ) : (
                    <>
                        <RenderHomeBC />
                        <RenderCourseHierarchyBC
                            course_hierarchy={course_hierarchy}
                        />
                        <RenderCourseNameBC />
                    </>
                )}
            </ol>
        </nav>
    );
}
