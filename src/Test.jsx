import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getCourseTopic, setTopic } from "./features/app/CourseSlice";
import parse from "html-react-parser";

function Test() {
    let { course_id, topic_id } = useParams();
    const [previous, setPrevious] = useState(null);
    const [next, setNext] = useState(null);
    const course_topic = useSelector((state) => state.course.course_topic);
    const dispatch = useDispatch();

    const handleGetCourseTopic = async (params) => {
        let response = await dispatch(getCourseTopic(params));
        const payload = response.payload;
        if (payload?.status == 200) {
            const data = payload.data;
            setPrevious(data.previous);
            setNext(data.next);
            dispatch(setTopic(data.current));
        }
    };
    useEffect(() => {
        handleGetCourseTopic({ course_id, topic_id });
    }, [topic_id]);
    useEffect(() => {
        console.log(course_topic);
    }, [course_topic]);
    useEffect(() => {
        window.scrollTo(0, 0);
    });

    const handleBack = () => {
        console.log("clicked");
        window.history.back();
    };
    return (
        <>
            <div className="row">
                <Button onClick={handleBack}>Back</Button>
            </div>
            <div className="row">
                <h1>{course_topic?.title}</h1>
                <p>{course_topic?.summary && parse(course_topic?.summary)}</p>
                <p>{course_topic?.summary && parse(course_topic?.summary)}</p>
                <p>{course_topic?.summary && parse(course_topic?.summary)}</p>
                <p>{course_topic?.summary && parse(course_topic?.summary)}</p>
                <p>{course_topic?.summary && parse(course_topic?.summary)}</p>
            </div>
            <div className="row">
                {previous ? (
                    <Link to={`/test/${course_id}/topic/${previous}/show`}>
                        Previous
                    </Link>
                ) : null}
                {next ? (
                    <Link to={`/test/${course_id}/topic/${next}/show`}>
                        Next
                    </Link>
                ) : null}
            </div>
        </>
    );
}

export default Test;
