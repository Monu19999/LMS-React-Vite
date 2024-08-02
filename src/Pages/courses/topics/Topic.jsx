import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
    getCourseTopic,
    setTopic,
    convertCourseMedia,
} from "@src/features/app/CourseSlice";
import parse from "html-react-parser";
import { Button, Nav } from "react-bootstrap";
import ReactPlayer from "react-player";
import Placeholder from "react-bootstrap/Placeholder";
import PDFReader from "@src/Pages/courses/includes/Pdf/PDFReader";
import GoogleDocsViewer from "react-google-docs-viewer";
import DateFormat from "@src/Utilities/DateFormat";
import BootstrapModal from "@src/Components/BootstrapModal";
import CourseBradeCrumb from "@src/Pages/courses/includes/CourseBradeCrumb";
import BootstrapSpinner from "@src/Components/BootstrapSpinner";
import PaginatedHtml from "@src/Utilities/PaginatedHtml";

export default function Topic() {
    let { course_id, topic_id } = useParams();
    const [showModalType, setShowModalType] = useState({
        video: false,
        pdf: false,
        ppt: false,
        html: false,
    });

    let [previous, setPrevious] = useState(null);
    let [next, setNext] = useState(null);
    let [fileLoading, setFileLoading] = useState(false);

    const course_topic_loading = useSelector(
        (state) => state.course.course_topic_loading
    );
    const course_topic = useSelector((state) => state.course.course_topic);

    const dispatch = useDispatch();

    const [convert, setConvert] = useState({});

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

    const fileConvertHandler = async (upload) => {
        const response = await dispatch(convertCourseMedia(upload));
        const payload = response.payload;
        setConvert(payload);
    };

    useEffect(() => {
        if (course_id && topic_id) {
            handleGetCourseTopic({ course_id, topic_id });
            // fileConvertHandler();
        }
    }, []);

    const fetchFile = async (file) => {
        setFileLoading(true);
        const response = await fetch(file, {
            mode: "cors",
            method: "GET",
            headers: {
                "access-control-allow-origin": "*",
                "Content-type": "application/json; charset=UTF-8",
            },
            cache: "no-cache",
        });
        if (response.status == 200) {
            setFileLoading(false);
        }
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

    const checkFIleLoad = (preview_path) => {
        fetch(preview_path)
            .then((response) => {
                if (response.status === 200) {
                    console.log("SUCCESSS");
                    return response.json();
                } else if (response.status === 408) {
                    console.log("SOMETHING WENT WRONG");
                    this.setState({ requestFailed: true });
                }
            })
            .then((data) => {
                this.setState({ isLoading: false, downlines: data.response });
                console.log("DATA STORED");
            })
            .catch((error) => {
                this.setState({ requestFailed: true });
            });
    };

    const setModalBodyContent = ({ upload, configuration }) => {
        console.log("here => " + upload);
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
                        file_path={upload.preview_path}
                        configuration={configuration}
                    />
                );
            } else if (upload.file_mime_type === "application/html") {
                content = fileLoading ? (
                    <BootstrapSpinner />
                ) : (
                    <PDFReader
                        file_path={upload.preview_path}
                        configuration={configuration}
                    />
                    // <GoogleDocsViewer
                    //     width="100%"
                    //     height="400px"
                    //     fileUrl={upload.preview_path}
                    //     onClick={() => checkFIleLoad(upload.preview_path)}
                    // />
                    // <PaginatedHtml file_path={upload.preview_path} />
                );
            }
        } else {
            content = <p>Unsupported file type</p>;
        }

        return content;
    };

    function MyVerticallyCenteredModal(props) {
        return (
            <BootstrapModal
                title={course_topic?.title}
                body={setModalBodyContent(props)}
                {...props}
            />
        );
    }

    const RenderUploadsButton = ({ upload, configuration }) => {
        if (upload.file_mime_type === "application/video") {
            return (
                <>
                    <span>Watch video</span>
                    <Button
                        variant="primary"
                        onClick={(prev) =>
                            setShowModalType({ ...prev, video: true })
                        }
                    >
                        <i
                            className="bi bi-play"
                            style={{ fontSize: "24px" }}
                        ></i>
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
                    <span>View PDF </span>
                    <Button
                        variant="primary"
                        onClick={(prev) =>
                            setShowModalType({ ...prev, pdf: true })
                        }
                    >
                        <i
                            className="bi bi-eye"
                            style={{ fontSize: "24px" }}
                        ></i>
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
        } else {
            return (
                <>
                    <span>View PPT </span>
                    <Button
                        variant="primary"
                        onClick={(prev) => {
                            setShowModalType({ ...prev, pdf: true });
                        }}
                    >
                        <i
                            className="bi bi-eye"
                            style={{ fontSize: "24px" }}
                        ></i>
                    </Button>
                    {convert?.pdf_path && (
                        <MyVerticallyCenteredModal
                            show={showModalType.ppt}
                            onHide={(prev) =>
                                setShowModalType({ ...prev, pdf: false })
                            }
                            upload={convert.pdf_path}
                        />
                    )}
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
                                                    <div className="media">
                                                        <div
                                                            className="media-body pb-2"
                                                            style={{
                                                                borderBottom:
                                                                    "1px solid #dedede",
                                                                marginBottom:
                                                                    "10px",
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
                                                            course_id:
                                                                course_id,
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
                                                            course_id:
                                                                course_id,
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

    return <RenderTopic />;
}
