import React, { useEffect, useState } from "react";
import { Button, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getCourseTopic, setTopic } from "./features/app/CourseSlice";
import parse from "html-react-parser";
import Placeholder from "react-bootstrap/Placeholder";
import CourseBradeCrumb from "@src/Pages/courses/includes/CourseBradeCrumb";
import DateFormat from "./Utilities/DateFormat";
import ReactPlayer from "react-player";
import PDFReader from "@src/Pages/courses/includes/Pdf/PDFReader";
import PaginatedHtml from "@src/Utilities/PaginatedHtml";
import BootstrapModal from "@src/Components/BootstrapModal";

function Test() {
    let { course_id, topic_id } = useParams();
    const [showModalType, setShowModalType] = useState({
        video: false,
        pdf: false,
        ppt: false,
        html: false,
    });
    const [previous, setPrevious] = useState(null);
    const [next, setNext] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const course_topic_loading = useSelector(
        (state) => state.course.course_topic_loading
    );
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

    const CourseTopicUpdatedAt = () => {
        let date = "";
        if (course_topic?.updated_at) {
            date = new Date(course_topic?.updated_at);
        } else if (course_topic?.created_at) {
            date = new Date(course_topic?.created_at);
        } else {
            return date;
        }
        return <DateFormat date={date} format="DD MMM YYYY" />;
    };

    const checkFileMimeType = (FileMimeType) => {
        const mime_types = [
            "application/video",
            "application/pdf",
            "application/vnd.ms-powerpoint",
            "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        ];
        return mime_types.includes(FileMimeType);
    };

    const setModalBodyContent = (upload, configuration) => {
        // console.log("here => ", upload.pdf_path.preview_path);
        let content = null;
        const isSupportedType = checkFileMimeType(upload?.file_mime_type);

        if (isSupportedType) {
            if (upload.file_mime_type === "application/video") {
                content = (
                    <ReactPlayer
                        url={upload.file_path}
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
            } else if (upload.file_mime_type === "application/pdf") {
                content = (
                    <PDFReader
                        preview_path={upload.preview_path}
                        download_path={upload.download_path}
                        // file_path={`DSA-Decoded.pdf`}
                        configuration={configuration}
                    />
                );
            } else {
                var extension = upload.preview_path.split(".").pop();
                content = fileLoading ? (
                    <BootstrapSpinner />
                ) : extension === "pdf" ? (
                    <PDFReader
                        preview_path={upload.preview_path}
                        download_path={upload.download_path}
                        configuration={configuration}
                    />
                ) : (
                    <PaginatedHtml file_path={upload.preview_path} />
                );
            }
        }
        //  else {
        //     content = <PaginatedHtml file_path={upload.preview_path} />;
        // }

        return content;
    };

    function MyVerticallyCenteredModal(props) {
        return (
            <BootstrapModal
                title={course_topic?.title}
                body={modalContent}
                {...props}
            />
        );
    }
    const RenderUploadsButton = ({ upload, configuration }) => {
        const handleShowModal = () => {
            fileConvertHandler(upload, configuration);
        };

        const fileConvertHandler = async (upload, configuration) => {
            if (
                upload.file_mime_type == "application/vnd.ms-powerpoint" ||
                upload.file_mime_type ==
                    "application/vnd.openxmlformats-officedocument.presentationml.presentation"
            ) {
                const response = await dispatch(convertCourseMedia(upload));
                const payload = response.payload;
                const content = setModalBodyContent(
                    payload.pdf_path,
                    configuration
                );
                setModalContent(content);
                setShowModal(true);
            } else {
                const content = setModalBodyContent(upload, configuration);
                setModalContent(content);
                setShowModal(true);
            }
            // console.log("payload=> ", payload);
            // setModalContent()
        };
        {
            {
                /* <MyVerticallyCenteredModal
                        show={showModalType.pdf}
                        onHide={(prev) =>
                            setShowModalType({ ...prev, pdf: false })
                        }
                        upload={upload}
                        configuration={configuration}
                    /> */
            }
        }

        if (upload.file_mime_type === "application/video") {
            return (
                <>
                    <span>Watch video</span>
                    <Button variant="primary" onClick={handleShowModal}>
                        <i
                            className="bi bi-play"
                            style={{ fontSize: "24px" }}
                        ></i>
                    </Button>
                </>
            );
        } else if (upload.file_mime_type === "application/pdf") {
            return (
                <>
                    <span>View PDF </span>
                    <Button variant="primary" onClick={handleShowModal}>
                        <i
                            className="bi bi-eye"
                            style={{ fontSize: "24px" }}
                        ></i>
                    </Button>
                </>
            );
        } else {
            return (
                <>
                    <span>View PPT </span>
                    <Button
                        variant="primary"
                        // onClick={fileConvertHandler}
                        onClick={handleShowModal}
                    >
                        <i
                            className="bi bi-eye"
                            style={{ fontSize: "24px" }}
                        ></i>
                    </Button>
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
                            <Nav.Item
                                as="li"
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    borderBottom: "1px dashed #ccc",
                                    marginBottom: "10px",
                                    paddingBottom: "10px",
                                }}
                                key={upload.id}
                            >
                                <RenderUploadsButton
                                    upload={upload}
                                    configuration={
                                        course_topic?.course?.assigned_admin
                                            ?.category_course?.configuration
                                    }
                                />
                            </Nav.Item>
                        );
                    })}
                </Nav>
            );
        }
    };

    const RenderTopic = () => {
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
                            <div className="col-lg-12 course-detail-bc">
                                {course_topic_loading ? (
                                    <Placeholder.Button
                                        xs={2}
                                        aria-hidden="true"
                                    />
                                ) : (
                                    <>
                                        <CourseBradeCrumb
                                            category_course={
                                                course_topic?.course
                                                    ?.assigned_admin
                                                    ?.category_course
                                            }
                                            course_hierarchy={
                                                course_topic?.course
                                                    ?.assigned_admin
                                                    ?.category_course
                                                    ?.course_hierarchy
                                            }
                                        />
                                    </>
                                )}
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
                                <div
                                    className="col-12 p-4 shadow"
                                    style={{ minHeight: "350px" }}
                                >
                                    <article className="article">
                                        <div className="article-title mb-2">
                                            {course_topic_loading ? (
                                                <Placeholder.Button
                                                    xs={4}
                                                    aria-hidden="true"
                                                />
                                            ) : (
                                                <>
                                                    <h3>
                                                        {course_topic?.title}
                                                    </h3>
                                                    <div
                                                        className="media"
                                                        style={{
                                                            display: "flex",
                                                            justifyContent:
                                                                "space-between",
                                                            borderBottom:
                                                                "1px solid #dedede",
                                                        }}
                                                    >
                                                        <div
                                                            className="media-body"
                                                            style={{
                                                                lineHeight:
                                                                    "50px",
                                                            }}
                                                        >
                                                            <strong>
                                                                Last Updated On
                                                                -
                                                            </strong>
                                                            <span>
                                                                <CourseTopicUpdatedAt />
                                                            </span>
                                                        </div>
                                                        <div className="mb-2">
                                                            <button
                                                                className="btn-secondary text-white px-2 py-1"
                                                                onClick={
                                                                    handleBack
                                                                }
                                                            >
                                                                <i className="bi bi-arrow-left">
                                                                    {" "}
                                                                </i>
                                                                back
                                                            </button>
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
                                                <Link
                                                    to={`/test/${course_id}/topic/${previous}/show`}
                                                >
                                                    <Button type="button">
                                                        Previous
                                                    </Button>
                                                </Link>
                                            ) : (
                                                <span></span>
                                            )}
                                            {next ? (
                                                <Link
                                                    to={`/test/${course_id}/topic/${next}/show`}
                                                >
                                                    <Button type="button">
                                                        Next
                                                    </Button>
                                                </Link>
                                            ) : (
                                                <span></span>
                                            )}
                                        </div>
                                    </article>
                                </div>
                            </div>
                            <div className="col-lg-4 blog-aside">
                                <div
                                    className="p-4 col-12 shadow"
                                    style={{ minHeight: "350px" }}
                                >
                                    {/* widget Tags */}
                                    <div className="widget widget-tags">
                                        <div
                                            className="widget-title"
                                            style={{
                                                borderBottom:
                                                    "1px solid #dedede",
                                                marginBottom: "10px",
                                            }}
                                        >
                                            <h3 className="mb-4">
                                                Related Documents
                                            </h3>
                                        </div>
                                        <div className="widget-body mt-4">
                                            {course_topic_loading ? (
                                                <>
                                                    <Placeholder.Button
                                                        xs={10}
                                                        aria-hidden="true"
                                                    />
                                                    <Placeholder.Button
                                                        xs={10}
                                                        aria-hidden="true"
                                                    />
                                                    <Placeholder.Button
                                                        xs={10}
                                                        aria-hidden="true"
                                                    />
                                                </>
                                            ) : (
                                                uploadsList()
                                            )}
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
    };
    return (
        <>
            <div className="row">
                <Button onClick={handleBack}>Back</Button>
            </div>
            <RenderTopic />
            <MyVerticallyCenteredModal
                show={showModal}
                onHide={() => setShowModal(false)}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            />
        </>
    );
}

export default Test;
