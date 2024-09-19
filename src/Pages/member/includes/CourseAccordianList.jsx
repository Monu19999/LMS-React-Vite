import React from "react";
import CourseAccordian from "./CourseAccordian";

export default function CourseAccordianList(props) {
    return props.filtered_courses.length > 0 ? (
        props.filtered_courses.map((filtered_course, index) => (
            <CourseAccordian
                filtered_course={filtered_course}
                index={index}
                key={filtered_course.id}
            />
        ))
    ) : (
        <h4 className="text-center">{props.children}</h4>
    );
}
