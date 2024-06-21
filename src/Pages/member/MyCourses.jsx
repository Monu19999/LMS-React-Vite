import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myCourses } from "@src/features/member/MemberSlice";
import CourseItem from "@src/Pages/courses/includes/CourseItem";
import {
    Accordion,
    AccordionBody,
    AccordionButton,
    AccordionItem,
} from "react-bootstrap";
import BootstrapSpinner from "@src/Components/BootstrapSpinner";
import RenderCourseHierarchyBC from "../courses/includes/RenderCourseHierarchyBC";

const MyCourses = () => {
    const dispatch = useDispatch();

    const Memberloading = useSelector((state) => state.member.member_loading);
    const member = useSelector((state) => state.member.pages);

    useEffect(() => {
        dispatch(myCourses());
    }, []);

    return (
        <>
            <h2 className="mb-4">My Courses</h2>
            {Memberloading ? (
                <BootstrapSpinner />
            ) : (
                <>
                    {member?.my_courses?.my_courses.length > 0 ? (
                        member?.my_courses?.my_courses.map((category) => (
                            <Accordion key={category.id}>
                                <AccordionItem>
                                    <AccordionButton>
                                        {category?.category_courses.length >
                                            0 && (
                                            <nav aria-label="breadcrumb">
                                                <ol className="breadcrumb">
                                                    <RenderCourseHierarchyBC
                                                        course_hierarchy={
                                                            category
                                                                .category_courses[0]
                                                                .course_hierarchy
                                                        }
                                                    />
                                                </ol>
                                            </nav>
                                        )}
                                    </AccordionButton>
                                    <AccordionBody>
                                        <div className="row">
                                            {category.category_courses.map(
                                                (course) => {
                                                    return (
                                                        course.enrollments
                                                            .length > 0 && (
                                                            <div
                                                                className="col-lg-4 col-md-6 mb-4"
                                                                key={course.id}
                                                            >
                                                                <CourseItem
                                                                    course={
                                                                        course
                                                                    }
                                                                />
                                                            </div>
                                                        )
                                                    );
                                                }
                                            )}
                                        </div>
                                    </AccordionBody>
                                </AccordionItem>
                            </Accordion>
                        ))
                    ) : (
                        <h1 className="text-center">No Course Enrolled Yet!</h1>
                    )}
                </>
            )}
        </>
    );
};

export default MyCourses;
