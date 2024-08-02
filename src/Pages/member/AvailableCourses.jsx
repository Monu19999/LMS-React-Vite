import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { availableCourses } from "@src/features/member/MemberSlice";
import CourseItem from "@src/Pages/courses/includes/CourseItem";
import BootstrapSpinner from "@src/Components/BootstrapSpinner";
import { Accordion } from "react-bootstrap";
import RenderCourseHierarchyBC from "../courses/includes/RenderCourseHierarchyBC";


const AvailableCourses = () => {
    const dispatch = useDispatch();

    const Memberloading = useSelector((state) => state.member.member_loading);
    const member = useSelector((state) => state.member.pages);

    useEffect(() => {
        dispatch(availableCourses());
    }, [dispatch]);

    const hasAvailableCourses = member?.available_courses?.available_courses?.length > 0;

  if(member?.available_courses?.available_courses){
    return (
        <>
            <h4 className="mb-4 heading-bg">Available Courses</h4>
            {Memberloading ? (
                <BootstrapSpinner />
            ) : (
                <>
                    {member?.available_courses?.available_courses.length > 0 ? (
                        member?.available_courses?.available_courses.map(
                            (available_course, index) => (
                                <Accordion
                                    key={available_course.id}
                                    defaultActiveKey="0"
                                >
                                    <Accordion.Item eventKey={String(index)}>
                                        <Accordion.Header>
                                            {available_course
                                                ?.active_category_courses
                                                .length > 0 && (
                                                <nav aria-label="breadcrumb">
                                                    <ol className="breadcrumb">
                                                        <RenderCourseHierarchyBC
                                                            course_hierarchy={
                                                                available_course
                                                                    .active_category_courses[0]
                                                                    .course_hierarchy
                                                            }
                                                        />
                                                    </ol>
                                                </nav>
                                            )}
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <div className="row">
                                                {available_course.active_category_courses.map(
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
                                                                    upload={
                                                                        course
                                                                            .course
                                                                            .upload
                                                                    }
                                                                />
                                                            </div>
                                                        );
                                                    }
                                                )}
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
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
  }
};

export default AvailableCourses;
