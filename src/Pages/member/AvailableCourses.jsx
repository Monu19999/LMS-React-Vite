import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { availableCourses } from "@src/features/member/MemberSlice";
import CourseItem from "@src/Pages/courses/includes/CourseItem";
import {
    Accordion,
    AccordionBody,
    AccordionButton,
    AccordionItem,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const AvailableCourses = () => {
    const dispatch = useDispatch();

    const member = useSelector((state) => state.member.pages);

    useEffect(() => {
        dispatch(availableCourses());
    }, []);

    return (
        <>
            <h2 className="mb-4">Available Courses</h2>
            {member?.available_courses?.available_courses.length > 0 ? (
                member?.available_courses?.available_courses.map((category) => (
                    <div key={category.id}>
                        <div
                            className="d-flex justify-content-between mb-2"
                            style={{
                                borderBottom: "1px solid #d8e7e9",
                                padding: "0 10px",
                            }}
                        >
                            <h5>{category.category_name_en}</h5>
                            <Link
                                to={`/courses?department=${category.fk_department_id}`}
                            >
                                View all
                            </Link>
                        </div>
                        <div
                            className="row"
                            style={{ padding: "1rem 1.25rem" }}
                        >
                            {category.category_courses.map((course) => {
                                return (
                                    course.enrollments.length == 0 && (
                                        <div
                                            className="col-lg-4 col-md-6 mb-4"
                                            key={course.id}
                                        >
                                            <CourseItem course={course} />
                                        </div>
                                    )
                                );
                            })}
                        </div>
                    </div>
                    // <Accordion key={category.id}>
                    //     <AccordionItem>
                    //         <AccordionButton>
                    //             {category.category_name_en}
                    //         </AccordionButton>
                    //         <AccordionBody>
                    //             <div className="row">
                    //                 {category.category_courses.map(
                    //                     (category_course) => {
                    //                         return (
                    //                             category_course.enrollments
                    //                                 .length == 0 && (
                    //                                 <div
                    //                                     className="col-lg-4 col-md-6 mb-4"
                    //                                     key={
                    //                                         category_course
                    //                                             .course.id
                    //                                     }
                    //                                 >
                    //                                     <CourseItem
                    //                                         course={
                    //                                             category_course
                    //                                         }
                    //                                     />
                    //                                 </div>
                    //                             )
                    //                         );
                    //                     }
                    //                 )}
                    //             </div>
                    //         </AccordionBody>
                    //     </AccordionItem>
                    // </Accordion>
                ))
            ) : (
                <h1 className="text-center">No Available Courses</h1>
            )}
        </>
    );
};

export default AvailableCourses;
