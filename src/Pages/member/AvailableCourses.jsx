import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { availableCourses } from "@src/features/member/MemberSlice";
import CourseItem from "@src/Pages/courses/includes/CourseItem";
import { Link } from "react-router-dom";
import BootstrapSpinner from "@src/Components/BootstrapSpinner";
import {
    Accordion,
    AccordionBody,
    AccordionButton,
    AccordionItem,
} from "react-bootstrap";

const AvailableCourses = () => {
    const dispatch = useDispatch();

    const Memberloading = useSelector((state) => state.member.member_loading);
    const member = useSelector((state) => state.member.pages);

    useEffect(() => {
        dispatch(availableCourses());
    }, []);

    return (
        <>
            <h2 className="mb-4">Available Courses</h2>
            {Memberloading ? (
                <BootstrapSpinner />
            ) : (
                <>
                    {member?.available_courses?.available_courses.length > 0 ? (
                        member?.available_courses?.available_courses.map(
                            (category) => (
                                <Accordion key={category.id}>
                                    <AccordionItem>
                                        <AccordionButton>
                                            {category.category_name_en}
                                        </AccordionButton>
                                        <AccordionBody>
                                            <div className="row">
                                                {category.category_courses.map(
                                                    (course) => {
                                                        return (
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
                                                        );
                                                    }
                                                )}
                                            </div>
                                        </AccordionBody>
                                    </AccordionItem>
                                </Accordion>
                            )
                        )
                    ) : (
                        <h1 className="text-center">No Available Courses</h1>
                    )}
                </>
            )}
        </>
    );
};

export default AvailableCourses;
