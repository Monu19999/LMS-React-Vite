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
import { setPage, setQuestion } from "@src/features/app/QbmsExamSlice";
import BootstrapSpinner from "@src/Components/BootstrapSpinner";
import parse from "html-react-parser";
import ExamBoard from "./ExamBoard";

export default function StartExam() {
    let { course_id } = useParams();
    const [answer, setAnswer] = useState(null);
    const [option_id, setOptionId] = useState(null);
    const [warning, setWarning] = useState("");
    const page = useSelector((state) => state.qbms_exam.page);
    const exam = useSelector((state) => state.qbms_exam.exam);
    const state_question = useSelector((state) => state.qbms_exam.question);
    const count_down_time = useSelector(
        (state) => state.qbms_exam.count_down_time
    );
    const count_down = useSelector((state) => state.qbms_exam.count_down);
    const exam_loading = useSelector((state) => state.qbms_exam.exam_loading);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startQbmsExam({ course: course_id }));
    }, []);

    // useEffect(() => {
    //     if (exam == null) {
    //         dispatch(startQbmsExam({ course: course_id }));
    //     } else {
    //         dispatch(setCountDownTime());
    //     }
    // }, [exam]);

    useEffect(() => {
        if (
            exam?.exam_questions.length > 0 &&
            exam?.exam_questions[page]?.is_answer_correct
        ) {
            setAnswer(exam?.exam_questions[page]?.is_answer_correct);
        }
    }, [exam, page, state_question]);

    // Handle Screen Visibility
    useEffect(() => {
        const handleVisibilityChange = () => {
            // console.log(document.visibilityState);

            if (document.visibilityState === "hidden") {
                // dispatch(setCountDownTime(0));
                setWarning("Warning: Do not change the screen");
            }
            if (document.visibilityState === "visible") {
                const timeout = setTimeout(() => {
                    setWarning("");
                    clearTimeout(timeout);
                }, 3000);
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange
            );
        };
    }, []);

    const stopQuiz = () => {
        dispatch(
            updateQbmsExamAnswer({
                id: exam.id,
                updated_page: page,
                answer: answer,
                answer_id: option_id,
                question: exam?.exam_questions[page].id,
                action: "update_exam",
                time_expired: 1,
            })
        );
    };

    useEffect(() => {
        if (exam?.submitted_at == null) {
            if (count_down_time == 0) {
                // dispatch(setCountDownTime(null));
                stopQuiz();
                setAnswer(null);
                setOptionId(null);
                return;
            } else if (count_down_time < 0) {
                stopQuiz();
                return;
            }
        }
    }, [count_down_time]);

    const handleClickAnswer = (answer, option_id) => {
        setAnswer(answer);
        setOptionId(option_id);
    };

    const handleSaveAnswer = async ({ updated_page, is_submit, ...params }) => {
        if (
            ((answer != null && !is_submit) || is_submit) &&
            state_question.is_answer_correct == null
        ) {
            await dispatch(
                updateQbmsExamAnswer({
                    id: exam.id,
                    answer: answer,
                    answer_id: option_id,
                    ...params,
                })
            );
        }
        dispatch(setPage(updated_page));
        setAnswer(null);
        setOptionId(null);
    };

    return (
        <>
            <div className="container-xxl shadow mt-4 mb-4 p-4">
                <Container className="p-0 py-3">
                    {/* {count_down_time} {count_down}
                    <h5>
                        Selected Answer = {answer} {option_id}
                    </h5> */}
                    {warning && <h2 className="text-danger">{warning}</h2>}
                    {/* {exam_loading && <BootstrapSpinner />} */}
                    {exam != null && (
                        <>
                            {(count_down_time == 0 ||
                                exam.submitted_at != null) && (
                                <ExpiredNotice exam={exam} />
                            )}
                            {count_down_time > 0 &&
                                exam.submitted_at == null && (
                                    <>
                                        {/* {count_down} */}
                                        <Row>
                                            <Col md={6}>
                                                <h1>
                                                    Course Name:{" "}
                                                    {
                                                        exam?.category_course
                                                            ?.course_name_en
                                                    }
                                                </h1>
                                            </Col>
                                            <Col md={6}>
                                                <ExamBoard
                                                    count_down_time={
                                                        count_down_time
                                                    }
                                                />
                                                {/* <CountdownTimer
                                                        handleCountDownExpired={
                                                            CountDownExpired
                                                        }
                                                        targetDate={
                                                            count_down_time
                                                        }
                                                    /> */}
                                            </Col>
                                        </Row>
                                        {exam_loading && <BootstrapSpinner />}
                                        {exam_loading == false && (
                                            <>
                                                <Row>
                                                    <Col md={12}>
                                                        <h4>
                                                            Question {page + 1}/
                                                            {
                                                                exam
                                                                    .exam_questions
                                                                    ?.length
                                                            }
                                                        </h4>
                                                        <div className="quiz_question">
                                                            <div className="question_en">
                                                                {state_question
                                                                    ?.qbms_question
                                                                    ?.question_en &&
                                                                    parse(
                                                                        state_question
                                                                            ?.qbms_question
                                                                            ?.question_en
                                                                    )}
                                                            </div>
                                                            <div className="question_hi">
                                                                {state_question
                                                                    ?.qbms_question
                                                                    ?.question_hi &&
                                                                    parse(
                                                                        state_question
                                                                            ?.qbms_question
                                                                            ?.question_hi
                                                                    )}
                                                            </div>
                                                            <div className="question_options">
                                                                {exam
                                                                    ?.exam_questions
                                                                    .length >
                                                                    0 && (
                                                                    <QuestionOptions
                                                                        question={{
                                                                            is_answer_correct:
                                                                                exam
                                                                                    ?.exam_questions[
                                                                                    page
                                                                                ]
                                                                                    ?.is_answer_correct,
                                                                            qbms_question:
                                                                                state_question?.qbms_question,
                                                                        }}
                                                                        clickAnswer={
                                                                            handleClickAnswer
                                                                        }
                                                                    />
                                                                )}
                                                            </div>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </>
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
                    )}
                </Container>
            </div>
        </>
    );
}
