import React from "react";

export default function QuestionOptions({ question, clickAnswer }) {
    console.log(question);

    return (
        <>
            {question.qbms_question?.options?.map((option, index) => {
                return (
                    <div key={option.id}>
                        <input
                            type="radio"
                            name="answer"
                            disabled={question.is_answer_correct != null}
                            defaultChecked={question.is_answer_correct == index}
                            onClick={() => clickAnswer(index)}
                        />{" "}
                        {[0, 2].includes(
                            question.qbms_question.language_type
                        ) && option.option_hi}{" "}
                        {[1, 2].includes(
                            question.qbms_question.language_type
                        ) && option.option_en}
                    </div>
                );
            })}
        </>
    );
}
