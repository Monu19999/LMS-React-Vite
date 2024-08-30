import React, { useEffect, useState } from "react";
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
import { useForm } from "react-hook-form";
const MyCourses = () => {
    const dispatch = useDispatch();
    const { register, getValues, reset } = useForm();
    const [filteredCourses, setFilteredCourses] = useState([]);
    const Memberloading = useSelector((state) => state.member.member_loading);
    const member = useSelector((state) => state.member.pages);

    useEffect(() => {
        dispatch(myCourses());
    }, []);

    useEffect(() => {
        reset();
        if (member?.my_courses?.my_courses) {
            setFilteredCourses(member?.my_courses?.my_courses);
        }
    }, [member]);

    const handleFormFilterOnChange = () => {
        const filtertext = getValues("course_name").toLowerCase();

        const filteredCourse = member?.my_courses?.my_courses
            .map((availableCourse) => {
                const filterCourse =
                    availableCourse.active_category_courses.filter((acc) => {
                        return acc.course_name_en
                            .toLowerCase()
                            .includes(filtertext);
                    });

                return {
                    ...availableCourse,
                    active_category_courses: filterCourse,
                };
            })
            .filter(
                (availableCourse) =>
                    availableCourse.active_category_courses.length > 0
            );

        setFilteredCourses(filteredCourse);
        // console.log(filteredCourses)
    };
    return (
        <>
            <h4 className="mb-4 heading-bg">My Courses</h4>
            <div className="container">
                <div className="row mb-4">
                    <div
                        className="col-lg-12 wow fadeInUp"
                        style={{ backgroundColor: "#06bbcc" }}
                    >
                        <div className="search-title">
                            {/* Search Form Start */}
                            <form>
                                <div className="row justify-content-center">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            autoComplete="off"
                                            {...register("course_name", {
                                                onChange:
                                                    handleFormFilterOnChange,
                                            })}
                                            className="form-control"
                                            placeholder="Search By Course Name"
                                        />
                                    </div>
                                </div>
                            </form>
                            {/* Search Form End */}
                        </div>
                    </div>
                </div>
            </div>
            {Memberloading ? (
                <BootstrapSpinner />
            ) : (
                <>
                    {filteredCourses.length > 0 ? (
                        filteredCourses.map((my_course, index) => (
                            <Accordion
                                key={my_course.id}
                                defaultActiveKey="0"
                                className="member-courses"
                            >
                                <AccordionItem eventKey={String(index)}>
                                    <AccordionButton>
                                        {my_course?.active_category_courses
                                            ?.length > 0 && (
                                            <nav aria-label="breadcrumb">
                                                <ol className="breadcrumb">
                                                    <RenderCourseHierarchyBC
                                                        course_hierarchy={
                                                            my_course
                                                                .active_category_courses[0]
                                                                .course_hierarchy
                                                        }
                                                    />
                                                </ol>
                                            </nav>
                                        )}
                                    </AccordionButton>
                                    <AccordionBody>
                                        <div className="row">
                                            {my_course.active_category_courses.map(
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
                                                                    upload={
                                                                        course
                                                                            .course
                                                                            .upload
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
