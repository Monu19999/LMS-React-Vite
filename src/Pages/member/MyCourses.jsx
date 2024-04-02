import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userCourses } from "@src/features/member/MemberSlice";
import CourseItem from "@src/Pages/courses/includes/CourseItem";
import {
    Accordion,
    AccordionBody,
    AccordionButton,
    AccordionItem,
} from "react-bootstrap";

const MyCourses = () => {
    const dispatch = useDispatch();

    const member = useSelector((state) => state.member.pages);

    useEffect(() => {
        dispatch(userCourses());
    }, []);

    return (
        <>
            <h2 className="mb-4">My Courses</h2>
            {member?.my_courses?.my_courses.length > 0 && (
                <Accordion>
                    <AccordionItem>
                        <AccordionButton>PHP</AccordionButton>
                        <AccordionBody>
                            {member?.my_courses?.my_courses.map((course) => {
                                return (
                                    <div
                                        className="col-lg-4 col-md-6 mb-4"
                                        key={course.id}
                                    >
                                        <CourseItem course={course} />
                                    </div>
                                );
                            })}
                        </AccordionBody>
                    </AccordionItem>
                </Accordion>
            )}
            {/* <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                        >
                            PHP
                        </button>
                    </h2>
                    <div
                        id="collapseOne"
                        className="accordion-collapse collapse show"
                        data-bs-parent="#accordionExample"
                    >
                        <div className="accordion-body">
                            {member?.my_courses?.my_courses.map((course) => {
                                return (
                                    <div
                                        className="col-lg-4 col-md-6 mb-4"
                                        key={course.id}
                                    >
                                        <CourseItem course={course} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    );
};

export default MyCourses;
