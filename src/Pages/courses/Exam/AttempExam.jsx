import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { getQbmsExam, updateState } from "@src/features/app/QbmsExamSlice";
import { useDispatch, useSelector } from "react-redux";
import { getCourse } from "@src/features/app/CourseSlice";
import BootstrapSpinner from "@src/Components/BootstrapSpinner";
import CheckCourseCompleted from "./CheckCourseCompleted";

export default function AttempExam() {
    let { course_id } = useParams();
    const dispatch = useDispatch();

    // useEffect(() => {
    //     if (exam == null && !attempt) {
    //         dispatch(getQbmsExam({ course: course_id }));
    //         setAttempt(true);
    //     }
    // }, [exam]);

    useEffect(() => {
        dispatch(
            updateState([
                { key: "count_down", value: 0 },
                { key: "count_down_time", value: null },
            ])
        );
    }, []);

    const StartQuiz = () => {
        return (
            <>
                <Link to={`/course/${course_id}/start-exam`}>
                    <Button variant="primary">Start Quiz</Button>
                </Link>
            </>
        );
    };
    const RanderInstructions = () => {
        return (
            <div className="instructions ">
                <h1>Guidelines to Online Examination for Students</h1>
                <h3>V.V. Important Instructions</h3>
                <ol>
                    <li>Arrange for stable Internet connectivity</li>
                    <li>
                        Giving examination on Laptop or Desktop is highly
                        recommended.
                    </li>
                    <li>
                        Make sure laptop is fully charged. UPS/Inverter for
                        laptop/desktop should be arranged for uninterrupted
                        power supply.
                    </li>
                    <li>
                        Students should have sufficient data in Fair Usage
                        Policy (FUP) / Internet plan with sufficient data pack
                        of internet service provider.
                    </li>
                    <li>
                        Close all browsers/tabs before starting the online
                        examination.
                    </li>
                    <li>
                        Once the exam starts, do not switch to any other
                        window/tab. On doing so, your attempt may be considered
                        as malpractice and your exam may get terminated.
                    </li>
                    <li>
                        Do Not Pickup/Receive the Call during the exam if you
                        are giving the exam on mobile. This also will be treated
                        as changing the window.
                    </li>
                    <li>
                        To avoid unwanted pop-ups, use of Ad Blocker is
                        recommended.
                    </li>
                    <li>
                        Clear browser cache memory on mobile and laptops. Clear
                        browsing history and also delete temp files.
                    </li>
                </ol>
            </div>
        );
    };

    return (
        <div className="container-xxl">
            <Container className="p-0 py-3">
                <Row>
                    <Col className="shadow mt-4 mb-4 p-4">
                        {/* {is_course_completed == false && "Not "}{" "}
                                Completed */}
                        <RanderInstructions />
                        <hr />
                        <CheckCourseCompleted>
                            <StartQuiz />
                        </CheckCourseCompleted>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
