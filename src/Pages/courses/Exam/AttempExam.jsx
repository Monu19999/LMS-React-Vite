import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { getQbmsExam } from "@src/features/app/QbmsExamSlice";
import { useDispatch, useSelector } from "react-redux";

export default function AttempExam() {
    let { course_id } = useParams();
    const [attempt, setAttempt] = useState(false);
    const exam = useSelector((state) => state.qbms_exam.exam);
    const dispatch = useDispatch();

    useEffect(() => {
        if (
            Object.keys(exam).length === 0 &&
            exam.constructor === Object &&
            !attempt
        ) {
            dispatch(getQbmsExam({ course: course_id }));
            setAttempt(true);
        }
    }, [exam]);

    return (
        <div className="container-xxl">
            <Container className="p-0 py-3">
                <h1>Instructions</h1>
                <ul>
                    <li>Instructions 1</li>
                    <li>Instructions 2</li>
                    <li>Instructions 3</li>
                    <li>Instructions 4</li>
                    <li>Instructions 5</li>
                </ul>

                <hr />
                <Link to={`/course/${course_id}/start-exam`}>
                    <Button>Start Exam</Button>
                </Link>
            </Container>
        </div>
    );
}
