import parse from "html-react-parser";

export default function QuestionOptions({ question, clickAnswer }) {
    const GetOption = ({ option }) => {
        return (
            <>
                {[0, 2].includes(question.qbms_question.language_type) && (
                    <>
                        <p>{option.option_hi}</p>
                    </>
                )}
                {/* {option.option_hi != null && option.option_en != null && <br />} */}
                {[1, 2].includes(question.qbms_question.language_type) && (
                    <>
                        <p>{option.option_en}</p>
                    </>
                )}
            </>
        );
    };
    return (
        <>
            <div className="row">
                {question.qbms_question?.options?.map((option, index) => {
                    return (
                        <div className="col-md-12 col-lg-6" key={option.id}>
                            <div className="d-flex justify-content-left gap-3 align-items-center">
                                <input
                                    type="radio"
                                    name="answer"
                                    disabled={
                                        question.is_answer_correct != null
                                    }
                                    defaultChecked={
                                        question.is_answer_correct == index
                                    }
                                    onClick={() =>
                                        clickAnswer(index, option.id)
                                    }
                                />{" "}
                                <div className="options">
                                    <GetOption option={option} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
