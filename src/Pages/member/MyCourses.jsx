import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userCourses } from "@src/features/member/MemberSlice";
import CourseItem from "../courses/includes/CourseItem";

const MyCourses = () => {
    const dispatch = useDispatch();

    const member = useSelector((state) => state.member.pages);

    useEffect(() => {
        dispatch(userCourses());
    }, []);

    return (
        <>
            <h1>My Courses</h1>
            <div className="accordion" id="accordionExample">
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
                            Accordion Item #1
                        </button>
                    </h2>
                    <div
                        id="collapseOne"
                        className="accordion-collapse collapse show"
                        data-bs-parent="#accordionExample"
                    >
                        <div class="accordion-body">
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
            </div>
        </>
    );
};

export default MyCourses;
