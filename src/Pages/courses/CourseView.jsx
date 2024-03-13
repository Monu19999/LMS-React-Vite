import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import parse from "html-react-parser";
import { getCourse } from "@src/features/app/CourseSlice";
import ShowImage from "@src/Utilities/ShowImage";

function CourseView() {
    let { course_id } = useParams();

    const { course, loading } = useSelector((state) => {
        return state.course;
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if (course_id) {
            dispatch(getCourse(course_id));
        }
    }, []);

    if (loading) return <p>Loading...</p>;

    let topics = () => {
        if (course?.topics) {
            return (
                <>
                    <h4>This course includes:</h4>
                    <div className="col-lg-8 p-0">
                        <div className="accordion" id="regularAccordionRobots">
                            {course.topics.map((topic, index) => {
                                return (
                                    <div
                                        className="accordion-item"
                                        key={topic.id}
                                    >
                                        <h2
                                            id={"regularHeading" + topic.id}
                                            className="accordion-header"
                                        >
                                            <button
                                                className={
                                                    "accordion-button " +
                                                    (index != 0
                                                        ? "collapsed"
                                                        : "")
                                                }
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target={
                                                    "#regularCollapse" +
                                                    topic.id
                                                }
                                                aria-expanded={index != 0}
                                                aria-controls={
                                                    "regularCollapse" + topic.id
                                                }
                                            >
                                                {topic.title}
                                            </button>
                                        </h2>
                                        <div
                                            id={"regularCollapse" + topic.id}
                                            className={
                                                "accordion-collapse collapse " +
                                                (index == 0 ? "show" : "")
                                            }
                                            aria-labelledby={
                                                "regularHeading" + topic.id
                                            }
                                            data-bs-parent="#regularAccordionRobots"
                                        >
                                            <div className="accordion-body">
                                                {parse(topic.summary)}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </>
            );
        }
    };

    return (
        <>
            <div
                className="container-fluid py-4 mb-4 "
                style={{
                    backgroundColor: "#343747",
                    minHeight: 380,
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
                                                course?.assigned_admin
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
                                            course?.assigned_admin
                                                ?.category_course
                                                ?.course_name_en
                                        }
                                    </li>
                                </ol>
                            </nav>
                            <p className="display-6 text-white animated slideInDown mb-4">
                                {
                                    course?.assigned_admin?.category_course
                                        ?.course_name_en
                                }
                            </p>
                            <div
                                className="text-white mt-4 mb-4"
                                style={{ fontSize: 18 }}
                            >
                                {course?.description &&
                                    parse(course.description)}
                            </div>
                            <nav>
                                <ol className="view-course-update ">
                                    <li className="view-course-update">
                                        <Link className="text-white" to="/">
                                            <i className="fas fa-clock" /> Last
                                            updated 1/2024
                                        </Link>
                                    </li>
                                    <li
                                        className="view-course-update text-white active"
                                        aria-current="page"
                                    >
                                        <Link className="text-white" to="/">
                                            <i className="fas fa-globe" />
                                            English
                                        </Link>
                                    </li>
                                </ol>
                            </nav>
                            <p className="text-white">
                                4.50{" "}
                                <i className="fa fa-star" aria-hidden="true" />
                                <i className="fa fa-star" aria-hidden="true" />
                                <i className="fa fa-star" aria-hidden="true" />
                                <i className="fa fa-star" aria-hidden="true" />
                                <i
                                    className="fa fa-star-half"
                                    aria-hidden="true"
                                />
                            </p>
                        </div>
                        <div
                            className="col-lg-4"
                            style={{ position: "relative" }}
                        >
                            <div className="view-course-right-column">
                                <div className="position-relative overflow-hidden">
                                    <img
                                        className="img-fluid"
                                        src={
                                            course?.upload?.file_path ??
                                            ShowImage(
                                                "frontend/img/course-1.jpg",
                                                null
                                            )
                                        }
                                    />
                                    <div
                                        className="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4"
                                        style={{ top: "50%" }}
                                    >
                                        <button
                                            type="button"
                                            className="btn btn-lg btn-primary btn-lg-square"
                                            data-bs-toggle="modal"
                                            data-src="https://www.youtube.com/embed/Jfrjeg26Cwk"
                                            data-bs-target="#myModal"
                                        >
                                            <i
                                                className="fa fa-play"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </div>
                                    <div className="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4 mt-4">
                                        <Link
                                            to="/"
                                            className="flex-shrink-0 btn btn-sm btn-primary px-3 border-end"
                                            style={{
                                                borderRadius: "30px 30px",
                                            }}
                                        >
                                            Preview this course
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-12 px-4 list mt-4 mb-4">
                                    <h5>This course includes:</h5>
                                    <ul>
                                        <li>15 articles</li>
                                        <li>13 downloadable resources</li>
                                        <li>Full lifetime access</li>
                                        <li>Certificate of completion</li>
                                    </ul>
                                </div>
                                <div className="col-12 mt-4 text-center mb-4">
                                    <Link
                                        className="btn btn-primary px-4"
                                        to="/"
                                    >
                                        Enroll Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="modal fade"
                id="myModal"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                            <div className="ratio ratio-16x9">
                                <iframe
                                    className="embed-responsive-item"
                                    id="video"
                                    allowscriptaccess="always"
                                    allow="autoplay"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-xxl">
                <div className="container p-0">
                    <div className="container py-5">
                        <div className="row list">
                            <div
                                className="col-lg-8 p-4"
                                style={{
                                    border: "1px solid #d1d7dc",
                                    padding: "2.4rem 0",
                                }}
                            >
                                <div
                                    className="wow fadeInUp"
                                    data-wow-delay="0.1s"
                                >
                                    <h4>Course Information</h4>
                                    <p className="text-primary">
                                        Skill Development
                                    </p>
                                    <ul>
                                        <li>
                                            Full Name Solar Technician
                                            (Electrical) - (Trade Code-560)
                                        </li>
                                        <li>Category Skill Development</li>
                                        <li>Course Duration 1</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-4 list">
                            <div
                                className="wow fadeIndown p-0"
                                data-wow-delay="0.1s"
                            >
                                {topics()}
                            </div>
                        </div>
                        <div className="row mt-4 list">
                            <div className="wow fadeInUp" data-wow-delay="0.1s">
                                <h4>Course Description :</h4>
                                <p className="text-primary">Courtesy:</p>
                                <ul>
                                    <li>Bharat Skill</li>
                                    <li>
                                        Directorate General of Training (DGT)
                                    </li>
                                    <li>
                                        Ministry of Skill Development and
                                        Entrepreneurship
                                    </li>
                                    <li>Government of India</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CourseView;
