import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { availableCourses } from "@src/features/member/MemberSlice";
import CourseItem from "@src/Pages/courses/includes/CourseItem";
import { Link } from "react-router-dom";
import BootstrapSpinner from "@src/Components/BootstrapSpinner";

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
                                        {category.category_courses.map(
                                            (course) => {
                                                return (
                                                    course.enrollments.length ==
                                                        0 && (
                                                        <div
                                                            className="col-lg-4 col-md-6 mb-4"
                                                            key={course.id}
                                                        >
                                                            <CourseItem
                                                                course={course}
                                                            />
                                                        </div>
                                                    )
                                                );
                                            }
                                        )}
                                    </div>
                                </div>
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
