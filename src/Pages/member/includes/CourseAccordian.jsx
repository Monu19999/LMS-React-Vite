import React from "react";
import { Accordion, Col, Row } from "react-bootstrap";
import RenderCourseHierarchyBC from "@src/Pages/courses/includes/RenderCourseHierarchyBC";
import CourseItem from "@src/Pages/courses/includes/CourseItem";

export default function CourseAccordian({ filtered_course, index }) {
    return (
        <Accordion defaultActiveKey="0" className="member-courses">
            <Accordion.Item eventKey={String(index)}>
                <Accordion.Header>
                    {filtered_course?.active_category_courses.length > 0 && (
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <RenderCourseHierarchyBC
                                    course_hierarchy={
                                        filtered_course
                                            .active_category_courses[0]
                                            .course_hierarchy
                                    }
                                />
                            </ol>
                        </nav>
                    )}
                </Accordion.Header>
                <Accordion.Body>
                    <Row>
                        {filtered_course.active_category_courses.map(
                            (course) => (
                                <Col
                                    lg={4}
                                    md={6}
                                    className="mb-4"
                                    key={course.id}
                                >
                                    <CourseItem
                                        course={course}
                                        upload={course?.course?.upload}
                                    />
                                </Col>
                            )
                        )}
                    </Row>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}
