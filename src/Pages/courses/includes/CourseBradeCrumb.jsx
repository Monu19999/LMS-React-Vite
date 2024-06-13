import React from "react";
import { Placeholder } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function CourseBradeCrumb({ course, course_topic_loading }) {
    const makeBC = (hierarchies) => {
        return hierarchies.map((hierarchy) => {
            return (
                <li className="breadcrumb-item text-white active">
                    {hierarchy.title_en}
                </li>
            );
        });
    };

    const resetHierarchyLevel = (hierarchy, hierarchy_html = []) => {
        if (hierarchy?.hierarchy_level) {
            hierarchy_html.push(hierarchy?.hierarchy_level);
            if (hierarchy?.parent) {
                return resetHierarchyLevel(hierarchy.parent, hierarchy_html);
            }
        }
        return hierarchy_html;
    };

    return (
        <nav aria-label="breadcrumb" className="mb-4">
            <ol className="breadcrumb">
                {course_topic_loading ? (
                    <Placeholder.Button xs={2} aria-hidden="true" />
                ) : (
                    <>
                        <li className="breadcrumb-item">
                            <Link className="text-white" to="/">
                                Home
                            </Link>
                        </li>
                        {makeBC(resetHierarchyLevel(course?.course_hierarchy))}
                        <li
                            className="breadcrumb-item text-white active"
                            aria-current="page"
                        >
                            {
                                course?.course?.assigned_admin?.category_course
                                    ?.course_name_en
                            }
                        </li>
                    </>
                )}
            </ol>
        </nav>
    );
}
