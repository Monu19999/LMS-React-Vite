import React, { useState } from "react";
import { Button, ModalFooter } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import BootstrapModal from "@src/Components/BootstrapModal";
import { useDispatch } from "react-redux";
import { readCourseTopic } from "@src/features/app/CourseSlice";

export default function PaginationButtons({
    course_topic,
    topic_id,
    read_topic_data,
    course_id,
    previous,
    next,
}) {
    const [confirm, setConfirm] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleNextButton = async (course_topic, next_topic_id) => {
        if (course_topic?.read_count === 0) {
            let response = await dispatch(
                readCourseTopic({
                    course_id: course_topic.course.encr_id,
                    topic_id,
                })
            );

            const payload = response.payload;
            if (payload.status == 200) {
                navigate(`/course/${course_id}/topic/${next_topic_id}/show`);
            }
        } else {
            navigate(`/course/${course_id}/topic/${next_topic_id}/show`);
        }
    };

    return (
        <>
            <div
                className="d-flex justify-content-between"
                style={{
                    borderTop: "1px solid #dedede",
                    paddingTop: "20px",
                }}
            >
                {previous ? (
                    <Link to={`/course/${course_id}/topic/${previous}/show`}>
                        <Button type="button">Previous</Button>
                    </Link>
                ) : (
                    <span></span>
                )}
                {next ? (
                    <Button
                        type="button"
                        onClick={() => {
                            course_topic?.read_count > 0
                                ? handleNextButton(
                                      course_topic,
                                      next ? next : course_topic.encr_id
                                  )
                                : setConfirm(true);
                        }}
                    >
                        Next
                    </Button>
                ) : (
                    read_topic_data?.total_topics_count &&
                    read_topic_data?.total_read_count &&
                    parseInt(read_topic_data?.total_read_count) ===
                        parseInt(read_topic_data?.total_topics_count) - 1 && (
                        <Button
                            type="button"
                            variant="success"
                            onClick={() => {
                                setConfirm(true);
                            }}
                        >
                            Complete
                        </Button>
                    )
                )}
            </div>

            <BootstrapModal
                size="sm"
                show={confirm}
                onHide={() => setConfirm(false)}
                backdrop="static"
                keyboard={false}
                title="Confirmation"
                body="Have you completed this topic?"
            >
                <ModalFooter className="d-flex justify-content-between">
                    <Button
                        type="button"
                        variant="primary"
                        onClick={() => {
                            setConfirm(false);
                            handleNextButton(
                                course_topic,
                                next ? next : course_topic.encr_id
                            );
                        }}
                    >
                        Yes
                    </Button>
                    <Button
                        type="button"
                        variant="secondary"
                        data-dismiss="modal"
                        onClick={() => setConfirm(false)}
                    >
                        Not Yet!
                    </Button>
                </ModalFooter>
            </BootstrapModal>
        </>
    );
}
