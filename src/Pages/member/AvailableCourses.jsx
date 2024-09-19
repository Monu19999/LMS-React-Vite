import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { availableCourses } from "@src/features/member/MemberSlice";
import BootstrapSpinner from "@src/Components/BootstrapSpinner";
import { useForm } from "react-hook-form";
import CourseAccordianList from "./includes/CourseAccordianList";
import CourseSearchForm from "./includes/CourseSearchForm";

const AvailableCourses = () => {
    const dispatch = useDispatch();
    const [filteredCourses, setFilteredCourses] = useState([]);

    const Memberloading = useSelector((state) => state.member.member_loading);
    const member = useSelector((state) => state.member.pages);

    useEffect(() => {
        dispatch(availableCourses());
    }, []);

    useEffect(() => {
        if (member?.available_courses?.available_courses) {
            setFilteredCourses(member.available_courses.available_courses);
        }
    }, [member]);

    const handleFormFilterOnChange = (input_value) => {
        const filteredCourse = member?.available_courses?.available_courses
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
            <h4 className="mb-4 heading-bg">Available Courses</h4>

            <CourseSearchForm onChangeCallback={handleFormFilterOnChange} />

            {Memberloading ? (
                <BootstrapSpinner />
            ) : (
                <CourseAccordianList filtered_courses={filteredCourses}>
                    {filteredCourses.length === 0 && "No Available Courses"}
                </CourseAccordianList>
            )}
        </>
    );
};

export default AvailableCourses;
