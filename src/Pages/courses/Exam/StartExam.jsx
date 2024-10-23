import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { startQbmsExam } from "@src/features/app/QbmsExamSlice";
import { useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import CountdownTimer from "./Timer/CountdownTimer";
import ExamPagination from "./ExamPagination";
import QuestionOptions from "./QuestionOptions";
import ExpiredNotice from "./ExpiredNotice";
import {
    updateQbmsExamAnswer,
    setCountDownTime,
} from "@src/features/app/QbmsExamSlice";
import { setPage } from "@src/features/app/QbmsExamSlice";
import BootstrapSpinner from "@src/Components/BootstrapSpinner";

export default function StartExam() {
    const page = useSelector((state) => state.qbms_exam.page);
    const [question, setQuestion] = useState({});
    const [answer, setAnswer] = useState(null);
    let { course_id } = useParams();
    const exam = useSelector((state) => state.qbms_exam.exam);
    const count_down_time = useSelector(
        (state) => state.qbms_exam.count_down_time
    );
    const exam_loading = useSelector((state) => state.qbms_exam.exam_loading);

    const dispatch = useDispatch();

    useEffect(() => {
        if (Object.keys(exam).length === 0 && exam.constructor === Object) {
            dispatch(startQbmsExam({ course: course_id }));
        }
    }, [exam]);

    useEffect(() => {
        if (exam?.exam_questions) {
            setQuestion(exam?.exam_questions[page]);
            setAnswer(exam?.exam_questions[page].is_answer_correct);
        }
    }, [exam, page, question]);

    const CountDownExpired = async () => {
        console.log("CountDownExpired");

        let response = await dispatch(
            updateQbmsExamAnswer({
                id: exam.id,
                updated_page: page,
                question: exam?.exam_questions[page].id,
                action: "update_exam",
                time_expired: 1,
            })
        );
        setAnswer(null);
    };

    const handleClickAnswer = (answer) => {
        // console.log("handleClickAnswer => " + answer);
        setAnswer(answer);
    };

    const handleSaveAnswer = async ({ updated_page, ...params }) => {
        // console.log("handleSaveAnswer => ");
        // console.log(question);
        // console.log(params);
        if (answer != null && question.is_answer_correct == null) {
            let response = await dispatch(
                updateQbmsExamAnswer({ id: exam.id, answer: answer, ...params })
            );
            // console.log("response");
            // console.log(response);
            // if (response.payload.status === 200) {
            //     dispatch(setPage(updated_page));
            // }
        }
        dispatch(setPage(updated_page));
        setAnswer(null);
    };

    return (
        <>
            <div className="container-xxl">
                <Container className="p-0 py-3">
                    {/* {count_down_time} {exam.submitted_at} */}

                    {Object.keys(exam).length > 0 && (
                        <>
                            <>
                                {(count_down_time == 0 ||
                                    exam.submitted_at != null) && (
                                    <ExpiredNotice exam={exam} />
                                )}
                                {count_down_time != 0 &&
                                    exam.submitted_at == null && (
                                        <>
                                            {/* {count_down} */}
                                            <Row>
                                                <Col md={6}>
                                                    <h1>
                                                        Course Name:{" "}
                                                        {
                                                            exam
                                                                ?.category_course
                                                                ?.course_name_en
                                                        }
                                                    </h1>
                                                </Col>
                                                {count_down_time > 0 && (
                                                    <Col md={6}>
                                                        <CountdownTimer
                                                            handleCountDownExpired={
                                                                CountDownExpired
                                                            }
                                                            targetDate={
                                                                count_down_time
                                                            }
                                                        />
                                                    </Col>
                                                )}
                                            </Row>
                                            {exam_loading && (
                                                <BootstrapSpinner />
                                            )}
                                            {exam_loading == false &&
                                            count_down_time > 0 ? (
                                                <>
                                                    <Row>
                                                        <Col md={12}>
                                                            <h4>
                                                                Question{" "}
                                                                {page + 1}/
                                                                {
                                                                    exam
                                                                        .exam_questions
                                                                        ?.length
                                                                }
                                                            </h4>

                                                            <p>
                                                                {
                                                                    question
                                                                        ?.question
                                                                        ?.question_en
                                                                }
                                                            </p>
                                                            <QuestionOptions
                                                                question={{
                                                                    is_answer_correct:
                                                                        exam
                                                                            ?.exam_questions[
                                                                            page
                                                                        ]
                                                                            .is_answer_correct,
                                                                    qbms_question:
                                                                        question?.question,
                                                                }}
                                                                clickAnswer={
                                                                    handleClickAnswer
                                                                }
                                                            />
                                                        </Col>
                                                    </Row>
                                                </>
                                            ) : (
                                                <ExpiredNotice />
                                            )}
                                            <ExamPagination
                                                totalPage={
                                                    exam.exam_questions?.length
                                                }
                                                question={
                                                    exam?.exam_questions[page]
                                                }
                                                answer={answer}
                                                saveAnswer={handleSaveAnswer}
                                            />
                                        </>
                                    )}
                            </>
                        </>
                    )}
                </Container>
            </div>
        </>
    );
}
