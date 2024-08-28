import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { availableCourses } from "@src/features/member/MemberSlice";
import CourseItem from "@src/Pages/courses/includes/CourseItem";
import BootstrapSpinner from "@src/Components/BootstrapSpinner";
import { Accordion } from "react-bootstrap";
import RenderCourseHierarchyBC from "../courses/includes/RenderCourseHierarchyBC";
import { useForm } from "react-hook-form";

const AvailableCourses = () => {
    const { register, getValues, reset } = useForm();

    const dispatch = useDispatch();
    const [filteredCourses, setFilteredCourses] = useState([]);

    const Memberloading = useSelector((state) => state.member.member_loading);
    const member = useSelector((state) => state.member.pages);

    useEffect(() => {
        dispatch(availableCourses());
    }, [dispatch]);

    
    useEffect(() => {
        reset();
        if (member?.available_courses?.available_courses) {
            setFilteredCourses(member.available_courses.available_courses);
        }
    }, [member]);

    const handleFormFilterOnChange = () => {
        const filtertext = getValues("course_name").toLowerCase();

        const filteredCourse = member?.available_courses?.available_courses.map((availableCourse)=>{
            const filterCourse = availableCourse.active_category_courses.filter((acc)=>{
                return acc.course_name_en.toLowerCase().includes(filtertext);
            })

            return {
                ...availableCourse,
                active_category_courses:filterCourse
            }
        }).filter((availableCourse)=>(availableCourse.active_category_courses.length > 0));

        setFilteredCourses(filteredCourse);
        // console.log(filteredCourses)
    };

    return (
        <>
            <h4 className="mb-4 heading-bg">Available Courses</h4>

            <div className="container-xxl mb-4 pb-4">
                <div className="container shadow">
                    <div className="row mb-4">
                        <div className="col-lg-12 wow fadeInUp inner-page-container-mb" style={{ backgroundColor: "#06bbcc" }}>
                            <div className="search-title">
                                {/* Search Form Start */}
                                <form>
                                    <div className="row justify-content-center">
                                        <div className="mb-2">
                                            <div className="form-group">
                                                <label>Search By Course Name</label>
                                                <input
                                                    type="text"
                                                    autoComplete="off"
                                                    {...register("course_name", {
                                                        onChange: handleFormFilterOnChange,
                                                    })}
                                                    className="form-control"
                                                    placeholder="Search By Title"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                {/* Search Form End */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {Memberloading ? (
                <BootstrapSpinner />
            ) : (
                <>
                    {filteredCourses.length > 0 ? (
                        filteredCourses.map((available_course, index) => (
                            <Accordion key={available_course.id} defaultActiveKey="0">
                                <Accordion.Item eventKey={String(index)}>
                                    <Accordion.Header>
                                        {available_course?.active_category_courses.length > 0 && (
                                            <nav aria-label="breadcrumb">
                                                <ol className="breadcrumb">
                                                    <RenderCourseHierarchyBC
                                                        course_hierarchy={
                                                            available_course.active_category_courses[0].course_hierarchy
                                                        }
                                                    />
                                                </ol>
                                            </nav>
                                        )}
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <div className="row">
                                            {available_course.active_category_courses.map((course) => (
                                                <div className="col-lg-4 col-md-6 mb-4" key={course.id}>
                                                    <CourseItem course={course} upload={course.course.upload} />
                                                </div>
                                            ))}
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        ))
                    ) : (
                        <h1 className="text-center">No Available Courses</h1>
                    )}
                </>
            )}
        </>
    );
};

export default AvailableCourses;
