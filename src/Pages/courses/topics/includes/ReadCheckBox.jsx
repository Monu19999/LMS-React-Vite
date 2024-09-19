import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readCourseTopic } from "@src/features/app/CourseSlice";
import Spinner from "react-bootstrap/Spinner";
import { setCourse } from "@src/features/app/CourseSlice";
import BootstrapModal from "@src/Components/BootstrapModal";
import { Button, ModalFooter } from "react-bootstrap";

export default function ReadCheckBox({ topic, course_id }) {
    const [confirm, setConfirm] = useState(false);
    const [read_course, setReadCourse] = useState(false);
    const [default_check, setDefaultCheck] = useState(false);

    const auth_user = useSelector((state) => state.auth.user);
    const course = useSelector((state) => state.course.course);

    const dispatch = useDispatch();

    const setCourseState = (course_copy) => {
        let topic_index = course_copy.course.topics.findIndex(
            (course_topic) => course_topic.id == topic.id
        );
        course_copy.course.topics[topic_index]["read_exists"] = true;
        return course_copy;
    };

    const handleReadCheckBox = async (params) => {
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
                    <div>
                        <i className="fa fa-check"></i>
                    </div>
                );
            } else {
                return (
                    <>
                        <input
                            type="checkbox"
                            label="Check to set read!"
                            checked={default_check}
                            onChange={() => setDefaultCheck(!default_check)}
                            onClick={() => {
                                setDefaultCheck(!default_check);
                                setConfirm(true);
                            }}
                        />
                        <BootstrapModal
                            size="sm"
                            show={confirm}
                            onHide={() => setConfirm(false)}
                            backdrop="static"
                            keyboard={false}
                            showclosebutton="false"
                            title="Confirmation"
                            body="Have you completed this topic?"
                        >
                            <ModalFooter className="d-flex justify-content-between">
                                <Button
                                    type="button"
                                    variant="primary"
                                    onClick={() => {
                                        setConfirm(false);
                                        handleReadCheckBox({
                                            course_id: course_id,
                                            topic_id: topic.encr_id,
                                        });
                                    }}
                                >
                                    Yes
                                </Button>
                                <Button
                                    type="button"
                                    variant="secondary"
                                    data-dismiss="modal"
                                    onClick={() => {
                                        setDefaultCheck(false);
                                        setConfirm(false);
                                    }}
                                >
                                    Not Yet!
                                </Button>
                            </ModalFooter>
                        </BootstrapModal>
                    </>
                );
            }
        }
    }
}
