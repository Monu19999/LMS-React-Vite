import React from "react";
import { Button, ModalFooter } from "react-bootstrap";
import BootstrapModal from "@src/Components/BootstrapModal";
import { setPage } from "@src/features/app/QbmsExamSlice";
import { useDispatch, useSelector } from "react-redux";

export default function ExamPagination(props) {
    // props: page, setPage, totalPage, question
    // console.log(props);
    const page = useSelector((state) => state.qbms_exam.page);
    const [confirm, setConfirm] = React.useState(false);
    const { totalPage, question } = props;

    const dispatch = useDispatch();

    const handlePrev = () => {
        if (page > 0) {
            dispatch(setPage(page - 1));
        }
    };
    const handleSaveAndNext = () => {
        if (page < totalPage) {
            props.saveAnswer({
                updated_page: page + 1,
                question: question?.id,
                action: "update_answer",
                time_expired: 0,
            });
        }
    };
    const handleQuizSubmit = () => {
        props.saveAnswer({
            updated_page: page,
            question: question?.id,
            action: "update_exam",
            time_expired: 0,
        });
    };
    return (
        <>
            <div className="d-flex justify-content-between">
                {/* {JSON.stringify(question.is_answer_correct)}
                {props.answer} */}
                {page > 0 ? (
                    <Button variant="primary" onClick={handlePrev}>
                        Previous
                    </Button>
                ) : (
                    <span></span>
                )}
                {page >= 0 && page < totalPage - 1 ? (
                    <Button variant="primary" onClick={handleSaveAndNext}>
                        {props.answer == null ||
                        question.is_answer_correct != null
                            ? "Next"
                            : "Save & Next"}
                    </Button>
                ) : (
                    <Button variant="success" onClick={() => setConfirm(true)}>
                        Submit
                    </Button>
                )}
            </div>
            <BootstrapModal
                size="sm"
                show={confirm}
                onHide={() => setConfirm(false)}
                backdrop="static"
                keyboard={false}
                title="Confirmation"
                body="Do you really want to submit the quiz?"
            >
                <ModalFooter className="d-flex justify-content-between">
                    <Button
                        type="button"
                        variant="primary"
                        onClick={() => {
                            setConfirm(false);
                            handleQuizSubmit();
                        }}
                    >
                        Yes
                    </Button>
                    <Button
                        type="button"
                        variant="secondary"
                        data-dismiss="modal"
                        onClick={() => {
                            setConfirm(false);
                        }}
                    >
                        No
                    </Button>
                </ModalFooter>
            </BootstrapModal>
        </>
    );
}
