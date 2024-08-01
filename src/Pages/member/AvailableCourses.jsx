import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { availableCourses } from "@src/features/member/MemberSlice";
import CourseItem from "@src/Pages/courses/includes/CourseItem";
import { Accordion, AccordionBody, AccordionButton, AccordionItem } from "react-bootstrap";
import RenderCourseHierarchyBC from "../courses/includes/RenderCourseHierarchyBC";
import BootstrapSpinner from "@src/Components/BootstrapSpinner";

const AvailableCourses = () => {
    const dispatch = useDispatch();

    const Memberloading = useSelector((state) => state.member.member_loading);
    const member = useSelector((state) => state.member.pages);

    useEffect(() => {
        dispatch(availableCourses());
    }, [dispatch]);

    const hasAvailableCourses = member?.available_courses?.available_courses?.length > 0;
console.log()
  if(member?.available_courses?.available_courses){
    return (
        <>
            <h2 className="mb-4">Available Courses</h2>
            {Memberloading ? (
                <BootstrapSpinner />
            ) : (
                <>
                    {hasAvailableCourses ? (
                        member.available_courses?.available_courses.map((category) => (
                            <Accordion key={category.id}>
                                <AccordionItem>
                                    <AccordionButton>
                                        {category?.category_courses?.length > 0 && (
                                            <nav aria-label="breadcrumb">
                                                <ol className="breadcrumb">
                                                    <RenderCourseHierarchyBC
                                                        course_hierarchy={
                                                            category.category_courses[0].course_hierarchy
                                                        }
                                                    />
                                            {console.log(category)}
                                                </ol>
                                            </nav>
                                        )}
                                    </AccordionButton>
                                    <AccordionBody>
                                        <div className="row">
                                            {category.active_category_courses?.map((course) => (
                                                <div className="col-lg-4 col-md-6 mb-4" key={course.id}>
                                                    <CourseItem course={course} />
                                                </div>
                                            ))}
                                           
                                        </div>
                                        
                                    </AccordionBody>
                                </AccordionItem>
                            </Accordion>
                        ))
                    ) : (
                        <h1 className="text-center">No Available Courses</h1>
                    )}
                </>
            )}
        </>
    );
  }
};

export default AvailableCourses;
