import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readCourseTopic } from "@src/features/app/CourseSlice";
import Spinner from "react-bootstrap/Spinner";
import { setCourse } from "@src/features/app/CourseSlice";

export default function ReadCheckBox({ topic, course_id }) {
    const dispatch = useDispatch();
    const auth_user = useSelector((state) => state.auth.user);
    const course = useSelector((state) => state.course.course);

    const [read_course, setReadCourse] = useState(false);

    const setCourseState = (course_copy) => {
        let topic_index = course_copy.course.topics.findIndex(
            (course_topic) => course_topic.id == topic.id
        );
        course_copy.course.topics[topic_index]["read_exists"] = true;
        return course_copy;
    };

    const handleRhowCheckBox = async (params) => {
        setReadCourse(true);
        let response = await dispatch(readCourseTopic(params));
        const payload = response.payload;
        if (payload.status == 200) {
            let course_copy = JSON.parse(JSON.stringify(course));
            let updated_course_copy = setCourseState(course_copy);
            dispatch(setCourse(updated_course_copy));
        }
        setReadCourse(false);
    };
    if (auth_user) {
        if (read_course) {
            return <Spinner animation="grow" size="sm" />;
        } else {
            if (topic.read_exists) {
                return (
                    <h4>
                        <i className="fa fa-check"></i>
                    </h4>
                );
            } else {
                return (
                    <>
                        <input
                            type="checkbox"
                            label="Check to set read!"
                            onClick={() => {
                                handleRhowCheckBox({
                                    course_id: course_id,
                                    topic_id: topic.encr_id,
                                });
                            }}
                        />
                    </>
                );
            }
        }
    }
}
