import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ReadCheckBox from "./includes/ReadCheckBox";
import Placeholder from "react-bootstrap/Placeholder";

export default function CourseTopicList({ course, course_id }) {
    const course_loading = useSelector((state) => state.course.course_loading);
    const auth_user = useSelector((state) => state.auth.user);
    const enrollments = useSelector((state) => state.course.course.enrollments);
    const navigate = useNavigate();
    return (
        <>
            <h4>Course contains:</h4>
            <div className="col-lg-8 p-0">
                <div className="accordion" id="regularAccordionRobots">
                    {course_loading ? (
                        <ListGroup className="d-flex gap-2">
                            <Placeholder.Button
                                xs={10}
                                bg="light"
                                size="xl"
                                aria-hidden="true"
                            />
                            <Placeholder.Button
                                xs={10}
                                bg="light"
                                size="lg"
                                aria-hidden="true"
                            />
                            <Placeholder.Button
                                xs={10}
                                bg="light"
                                size="lg"
                                aria-hidden="true"
                            />
                        </ListGroup>
                    ) : (
                        <ListGroup>
                            {course.topics.map((topic) => {
                                return (
                                    <ListGroup.Item key={topic.id}>
                                        <div className="d-flex justify-content-between">
                                            <h5>
                                                {auth_user &&
                                                enrollments?.length > 0 ? (
                                                    <Link
                                                        to={`/course/${course.encr_id}/topic/${topic.encr_id}/show`}
                                                    >
                                                        {topic.title}
                                                    </Link>
                                                ) : (
                                                    <span onClick={()=>{
                                                        alert("please login to show content")
                                                        navigate("/auth/login")
                                                    }}>
                                                    {topic.title}
                                                    </span>
                                                    
                                                )}
                                            </h5>
                                            {auth_user &&
                                                enrollments?.length > 0 && (
                                                    <ReadCheckBox
                                                        topic={topic}
                                                        course_id={course_id}
                                                    />
                                                )}
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
                    )}
                </div>
            </div>
        </>
    );
}
