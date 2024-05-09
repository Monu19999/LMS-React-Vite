import React from "react";
import { ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ShowCheckBox from "./ShowCheckBox";

export default function CourseTopicList({ course, course_id }) {
    const auth_user = useSelector((state) => state.auth.user);
    return (
        <>
            <h4>Course contains:</h4>
            <div className="col-lg-8 p-0">
                <div className="accordion" id="regularAccordionRobots">
                    <ListGroup>
                        {course.topics.map((topic, index) => {
                            return (
                                <ListGroup.Item key={topic.id}>
                                    <div className="d-flex justify-content-between">
                                        <h5>
                                            {auth_user ? (
                                                <Link
                                                    to={`/course/${course.encr_id}/course_topic/${topic.encr_id}/show`}
                                                >
                                                    {topic.title}
                                                </Link>
                                            ) : (
                                                topic.title
                                            )}
                                        </h5>
                                        <ShowCheckBox
                                            topic={topic}
                                            course_id={course_id}
                                        />
                                    </div>
                                </ListGroup.Item>
                                // <div
                                //     className="accordion-item"
                                //     key={topic.id}
                                // >
                                //     <h2
                                //         id={"regularHeading" + topic.id}
                                //         className="accordion-header"
                                //     >
                                //         <button
                                //             className={
                                //                 "accordion-button " +
                                //                 (index != 0
                                //                     ? "collapsed"
                                //                     : "")
                                //             }
                                //             type="button"
                                //             data-bs-toggle="collapse"
                                //             data-bs-target={
                                //                 "#regularCollapse" +
                                //                 topic.id
                                //             }
                                //             aria-expanded={index != 0}
                                //             aria-controls={
                                //                 "regularCollapse" + topic.id
                                //             }
                                //         >
                                //             {topic.title}
                                //         </button>
                                //     </h2>
                                //     <div
                                //         id={"regularCollapse" + topic.id}
                                //         className={
                                //             "accordion-collapse collapse " +
                                //             (index == 0 ? "show" : "")
                                //         }
                                //         aria-labelledby={
                                //             "regularHeading" + topic.id
                                //         }
                                //         data-bs-parent="#regularAccordionRobots"
                                //     >
                                //         <div className="accordion-body">
                                //             {parse(topic.summary)}
                                //             <Link
                                //                 to={`/course_topic/${topic.id}/show`}
                                //             >
                                //                 Show
                                //             </Link>
                                //         </div>
                                //     </div>
                                // </div>
                            );
                        })}
                    </ListGroup>
                </div>
            </div>
        </>
    );
}
