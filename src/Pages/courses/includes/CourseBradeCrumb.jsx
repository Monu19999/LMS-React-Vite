import { Placeholder } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function CourseBradeCrumb({
    category_course,
    course_hierarchy,
}) {
    const course_topic_loading = useSelector(
        (state) => state.course.course_topic_loading
    );

    const resetHierarchyLevel = (hierarchy, hierarchy_html = []) => {
        if (hierarchy?.hierarchy_level) {
            hierarchy_html.push(hierarchy?.hierarchy_level);
            if (hierarchy?.parent) {
                return resetHierarchyLevel(hierarchy.parent, hierarchy_html);
            }
        }
        return hierarchy_html.reverse();
    };

    const MakeBC = ({ course_hierarchies }) => {
        return course_hierarchies.map((hierarchy) => {
            return (
                <li
                    className="breadcrumb-item text-white active"
                    key={hierarchy.id}
                >
                    {hierarchy.title_en}
                </li>
            );
        });
    };

    const RenderHomeBC = () => {
        return (
            <li className="breadcrumb-item">
                <Link className="text-white" to="/">
                    Home
                </Link>
            </li>
        );
    };

    const RenderCourseHierarchyBC = () => {
        const course_hierarchies = resetHierarchyLevel(course_hierarchy);
        return <MakeBC course_hierarchies={course_hierarchies} />;
    };

    const RenderCourseNameBC = () => {
        return (
            <li
                className="breadcrumb-item text-white active"
                aria-current="page"
            >
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
                        <RenderCourseHierarchyBC />
                        <RenderCourseNameBC />
                    </>
                )}
            </ol>
        </nav>
    );
}
