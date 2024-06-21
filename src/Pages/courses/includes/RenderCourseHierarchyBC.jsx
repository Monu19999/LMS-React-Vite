import React from "react";

function RenderCourseHierarchyBC({ course_hierarchy }) {
    const MakeBC = ({ course_hierarchies }) => {
        return course_hierarchies.map((hierarchy) => {
            return (
                <li className="breadcrumb-item active" key={hierarchy.id}>
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
        return hierarchy_html.reverse();
    };

    // const course_hierarchies = resetHierarchyLevel(course_hierarchy);
    return (
        <MakeBC course_hierarchies={resetHierarchyLevel(course_hierarchy)} />
    );
}

export default RenderCourseHierarchyBC;
