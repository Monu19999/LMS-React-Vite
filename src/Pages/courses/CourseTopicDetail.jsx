import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getCourseTopic } from "@src/features/app/CourseSlice";
import parse from "html-react-parser";
import { Button, Modal, Nav } from "react-bootstrap";
import ReactPlayer from "react-player";
import Placeholder from "react-bootstrap/Placeholder";
import { updateTopic } from "@src/features/app/CourseSlice";
import { pdfjs } from "react-pdf";
import { Document, Page } from "react-pdf";
import BootstrapSpinner from "@src/Components/BootstrapSpinner";
import PDFReader from "./includes/Pdf/PDFReader";
import GoogleDocsViewer from "react-google-docs-viewer";

export default function CourseTopicDetail() {
    let { course_id, topic_id } = useParams();
    //   const [showVideoModal, setShowVideoModal] = useState(false);
    //   const [showPdfModal, setShowPdfModal] = useState(false);
    //   const [showPptModal, setShowPptModal] = useState(false);
    const [showModalType, setShowModalType] = useState({
        video: false,
        pdf: false,
        ppt: false,
    });
    const videoRef = useRef(ReactPlayer);

    let [previous, setPrevious] = useState(null);
    let [next, setNext] = useState(null);

    const course_topic_loading = useSelector(
        (state) => state.course.course_topic_loading
    );
    const course_topic = useSelector((state) => state.course.course_topic);

    const dispatch = useDispatch();

    const handleGetCourseTopic = async (params) => {
        let response = await dispatch(getCourseTopic(params));
        const payload = response.payload;
        if (payload.status == 200) {
            const data = payload.data;
            setPrevious(data.previous);
            setNext(data.next);
            dispatch(updateTopic(data.current));
        }
    };
    useEffect(() => {
        if (course_id && topic_id) {
            handleGetCourseTopic({ course_id, topic_id });
        }
    }, []);

    const checkFileMimeType = (FileMimeType) => {
        return (
            FileMimeType === "application/video" ||
            FileMimeType === "application/pdf" ||
            FileMimeType === "application/vnd.ms-powerpoint" ||
            FileMimeType ===
                "application/vnd.openxmlformats-officedocument.presentationml.presentation"
        );
    };

    const setModalBodyContent = (props) => {
        let content = null;
        const isSupportedType = checkFileMimeType(props.upload.file_mime_type);

        if (isSupportedType) {
            if (props.upload.file_mime_type === "application/video") {
                content = (
                    <ReactPlayer
                        url={props.upload.file_path}
                        playing={false}
                        controls={true}
                        pip={false}
                        onPlay={() => console.log("played")}
                        onPause={() => console.log("paused")}
                        onEnded={() => console.log("ended")}
                        config={{
                            file: {
                                attributes: {
                                    controlsList: "nodownload",
                                    disablePictureInPicture: true,
                                },
                            },
                        }}
                        width="100%"
                    />
                );
            } else if (props.upload.file_mime_type === "application/pdf") {
                content = (
                    <PDFReader
                        file_path={props.upload.preview_path}
                        configuration={props.configuration}
                    />
                );
            } else {
                content = (
                    <GoogleDocsViewer
                        width="100%"
                        height="400px"
                        fileUrl={props.upload.preview_path}
                    />
                );
            }
        } else {
            content = <p>Unsupported file type</p>;
        }

        return content;
    };

    function MyVerticallyCenteredModal(props) {
        // console.log(props.upload.preview_path);
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {props.upload.file_mime_type === "application/video"
                            ? "Video"
                            : props.upload.file_mime_type === "application/pdf"
                            ? "PDF"
                            : "PPT"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>{setModalBodyContent(props)}</Modal.Body>
            </Modal>
        );
    }

    const checkMimeType = (upload, configuration) => {
        if (upload.file_mime_type === "application/video") {
            return (
                <>
                    <Button
                        variant="primary"
                        onClick={(prev) =>
                            setShowModalType({ ...prev, video: true })
                        }
                    >
                        View Video
                    </Button>
                    <MyVerticallyCenteredModal
                        show={showModalType.video}
                        onHide={(prev) =>
                            setShowModalType({ ...prev, video: false })
                        }
                        upload={upload}
                    />
                </>
            );
        } else if (upload.file_mime_type === "application/pdf") {
            return (
                <>
                    <Button
                        variant="primary"
                        onClick={(prev) =>
                            setShowModalType({ ...prev, pdf: true })
                        }
                    >
                        View PDF
                    </Button>
                    <MyVerticallyCenteredModal
                        show={showModalType.pdf}
                        onHide={(prev) =>
                            setShowModalType({ ...prev, pdf: false })
                        }
                        upload={upload}
                        configuration={configuration}
                    />
                </>
            );
        } else if (
            upload.file_mime_type === "application/vnd.ms-powerpoint" ||
            upload.file_mime_type ===
                "application/vnd.openxmlformats-officedocument.presentationml.presentation"
        ) {
            return (
                <>
                    <Button
                        variant="primary"
                        onClick={(prev) =>
                            setShowModalType({ ...prev, ppt: true })
                        }
                    >
                        View PPT
                    </Button>
                    <MyVerticallyCenteredModal
                        show={showModalType.ppt}
                        onHide={(prev) =>
                            setShowModalType({ ...prev, ppt: false })
                        }
                        upload={upload}
                    />
                </>
            );
        }
    };

    const uploadsList = () => {
        if (course_topic?.uploads) {
            return (
                <Nav
                    defaultActiveKey="/home"
                    className="flex-column gap-2"
                    as="ul"
                >
                    {course_topic.uploads.map((upload) => {
                        return (
                            <Nav.Item as="li" key={upload.id}>
                                {checkMimeType(
                                    upload,
                                    course_topic?.course?.assigned_admin
                                        ?.category_course?.configuration
                                )}
                            </Nav.Item>
                        );
                    })}
                </Nav>
            );
        }
    };

    // console.log(course_topic);
    const updated_at = course_topic?.updated_at
        ? new Date(course_topic?.updated_at)
        : "";
    return (
        <>
            <div
                className="container-fluid pt-4 mb-4 "
                style={{
                    backgroundColor: "#343747",
                    minHeight: 50,
                }}
            >
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-12">
                            <nav aria-label="breadcrumb" className="mb-4">
                                <ol className="breadcrumb">
                                    {/* <Placeholder
                                        xs={2}
                                        bg="light"
                                        size="lg"
                                        aria-hidden="true"
                                    /> */}
                                    {course_topic_loading ? (
                                        <Placeholder.Button
                                            xs={2}
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <>
                                            <li className="breadcrumb-item">
                                                <Link
                                                    className="text-white"
                                                    to="/"
                                                >
                                                    Home
                                                </Link>
                                            </li>
                                            <li className="breadcrumb-item">
                                                <Link
                                                    className="text-white"
                                                    to="/"
                                                >
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
                                                    course_topic?.course
                                                        ?.assigned_admin
                                                        ?.category_course
                                                        ?.course_name_en
                                                }
                                            </li>
                                        </>
                                    )}
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            {/* {course_topic?.summary && parse(course_topic?.summary)}
            {uploadsList()} */}

            <div className="blog-single gray-bg mt-4 mb-4">
                <div className="container mt-4 mb-4">
                    <div className="row align-items-start mb-4">
                        <div className="col-lg-8 ">
                            <div className="col-12  p-4 shadow">
                                <article className="article">
                                    <div className="article-title mb-2">
                                        {course_topic_loading ? (
                                            <Placeholder.Button
                                                xs={4}
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <>
                                                <h2>{course_topic?.title}</h2>
                                                <div className="media">
                                                    <div
                                                        className="media-body"
                                                        style={{
                                                            borderBottom:
                                                                "1px solid #dedede",
                                                            marginBottom:
                                                                "10px",
                                                        }}
                                                    >
                                                        <strong>
                                                            Last Updated On -{" "}
                                                        </strong>
                                                        <span>26 FEB 2020</span>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    <div className="article-content">
                                        {course_topic_loading ? (
                                            <>
                                                <p aria-hidden="true">
                                                    <Placeholder.Button
                                                        as="p"
                                                        xs={6}
                                                        aria-hidden="true"
                                                        animation="glow"
                                                    />
                                                    <Placeholder.Button
                                                        as="p"
                                                        xs={12}
                                                        aria-hidden="true"
                                                        animation="glow"
                                                    />
                                                    <Placeholder.Button
                                                        as="p"
                                                        xs={8}
                                                        aria-hidden="true"
                                                        animation="glow"
                                                    />
                                                    <Placeholder.Button
                                                        as="p"
                                                        xs={10}
                                                        aria-hidden="true"
                                                        animation="glow"
                                                    />
                                                    <Placeholder.Button
                                                        as="p"
                                                        xs={12}
                                                        aria-hidden="true"
                                                        animation="glow"
                                                    />
                                                </p>
                                            </>
                                        ) : (
                                            <>
                                                {course_topic?.summary &&
                                                    parse(
                                                        course_topic?.summary
                                                    )}
                                            </>
                                        )}
                                    </div>
                                    <div
                                        className="d-flex justify-content-between"
                                        style={{
                                            borderTop: "1px solid #dedede",
                                            paddingTop: "20px",
                                        }}
                                    >
                                        {previous ? (
                                            <Button
                                                variant="secondary"
                                                onClick={() =>
                                                    handleGetCourseTopic({
                                                        course_id: course_id,
                                                        topic_id: previous,
                                                    })
                                                }
                                            >
                                                Previous
                                            </Button>
                                        ) : (
                                            <span></span>
                                        )}
                                        {next ? (
                                            <Button
                                                variant="primary"
                                                onClick={() =>
                                                    handleGetCourseTopic({
                                                        course_id: course_id,
                                                        topic_id: next,
                                                    })
                                                }
                                            >
                                                Next
                                            </Button>
                                        ) : (
                                            <span></span>
                                        )}
                                    </div>
                                </article>
                            </div>
                        </div>
                        <div className="col-lg-4 blog-aside">
                            <div className="p-4 col-12 shadow">
                                {/* Author */}
                                {/* <div className="widget widget-author">
                                <div className="widget-title">
                                    <h3>Author</h3>
                                </div>
                                <div className="widget-body">
                                    <div className="media align-items-center">
                                        <div className="media-body">
                                            <h6>Rachel Roth</h6>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                                {/* End Author */}
                                {/* widget Tags */}
                                <div className="widget widget-tags">
                                    <div
                                        className="widget-title"
                                        style={{
                                            borderBottom: "1px solid #dedede",
                                            marginBottom: "10px",
                                        }}
                                    >
                                        <h3>Related Documents</h3>
                                    </div>
                                    <div className="widget-body">
                                        {uploadsList()}
                                    </div>
                                </div>
                                {/* End widget Tags */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
