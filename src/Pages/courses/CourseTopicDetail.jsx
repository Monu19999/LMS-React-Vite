import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getCourseTopic } from "@src/features/app/CourseSlice";
import parse from "html-react-parser";

export default function CourseTopicDetail() {
    let { topic_id } = useParams();

    const course_topic = useSelector((state) => state.course.course_topic);

    const dispatch = useDispatch();

    useEffect(() => {
        // console.log(topic_id);
        if (topic_id) {
            dispatch(getCourseTopic(topic_id));
        }
    }, []);

    const checkMimeType = (upload) => {
        if (upload.file_mime_type == "application/video") {
            return <a href="/">Video</a>;
        } else if (upload.file_mime_type == "application/pdf") {
            return <a href="/">PDF</a>;
        }
    };

    const uploadsList = () => {
        if (course_topic?.uploads) {
            return (
                <ul>
                    {course_topic.uploads.map((upload) => {
                        return <li key={upload.id}>{checkMimeType(upload)}</li>;
                    })}
                </ul>
            );
        }
    };

    return (
        <>
            <div
                className="container-fluid py-4 mb-4 "
                style={{
                    backgroundColor: "#343747",
                    minHeight: 100,
                }}
            >
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <nav aria-label="breadcrumb" className="mb-4">
                                <ol className="breadcrumb ">
                                    <li className="breadcrumb-item">
                                        <Link className="text-white" to="/">
                                            Home
                                        </Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <Link className="text-white" to="/">
                                            {
                                                course_topic?.course
                                                    ?.assigned_admin
                                                    ?.course_category
                                                    ?.category_name_en
                                            }
                                        </Link>
                                    </li>
                                    <li
                                        className="breadcrumb-item text-white active"
                                        aria-current="page"
                                    >
                                        {
                                            course_topic?.course?.assigned_admin
                                                ?.category_course
                                                ?.course_name_en
                                        }
                                    </li>
                                </ol>
                            </nav>
                            <p className="display-6 text-white animated slideInDown mb-4">
                                {course_topic?.title}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {course_topic?.summary && parse(course_topic?.summary)}
            {uploadsList()}
        </>
    );
}
