import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myCourses } from "@src/features/member/MemberSlice";
import BootstrapSpinner from "@src/Components/BootstrapSpinner";
import { useForm } from "react-hook-form";
import CourseAccordianList from "./includes/CourseAccordianList";
import CourseSearchForm from "./includes/CourseSearchForm";
const MyCourses = () => {
    const dispatch = useDispatch();
    const [filteredCourses, setFilteredCourses] = useState([]);
    const Memberloading = useSelector((state) => state.member.member_loading);
    const member = useSelector((state) => state.member.pages);

    useEffect(() => {
        dispatch(myCourses());
    }, []);

    useEffect(() => {
        if (member?.my_courses?.my_courses) {
            setFilteredCourses(member?.my_courses?.my_courses);
        }
    }, [member]);

    const handleFormFilterOnChange = (input_value) => {
        const filteredCourse = member?.my_courses?.my_courses
            .map((availableCourse) => {
                const filterCourse =
                    availableCourse.active_category_courses.filter((acc) => {
                        return acc.course_name_en
                            .toLowerCase()
                            .includes(input_value);
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
    };
    return (
        <>
            <h4 className="mb-4 heading-bg">My Courses</h4>

            <CourseSearchForm onChangeCallback={handleFormFilterOnChange} />

            {Memberloading ? (
                <BootstrapSpinner />
            ) : (
                <CourseAccordianList filtered_courses={filteredCourses}>
                    {filteredCourses.length === 0 && "No Course Enrolled Yet!"}
                </CourseAccordianList>
            )}
        </>
    );
};

export default MyCourses;
