import React, { useState } from "react";
import { Button, Nav, Placeholder } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    getCourseTopic,
    setTopic,
    convertCourseMedia,
} from "@src/features/app/CourseSlice";
import BootstrapModal from "@src/Components/BootstrapModal";
import ReactPlayer from "react-player";
import PDFReader from "@src/Pages/courses/includes/Pdf/PDFReader";
import BootstrapSpinner from "@src/Components/BootstrapSpinner";
import GoogleDocsViewer from "react-google-docs-viewer";

export default function TopicMedia({ course_topic }) {
    const [showModalType, setShowModalType] = useState({
        video: false,
        pdf: false,
        ppt: false,
    });
    let [fileLoading, setFileLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const dispatch = useDispatch();

    // const checkFIleLoad = (preview_path) => {
    //     fetch(preview_path)
    //         .then((response) => {
    //             if (response.status === 200) {
    //                 console.log("SUCCESSS");
    //                 return response.json();
    //             } else if (response.status === 408) {
    //                 console.log("SOMETHING WENT WRONG");
    //                 this.setState({ requestFailed: true });
    //             }
    //         })
    //         .then((data) => {
    //             this.setState({ isLoading: false, downlines: data.response });
    //             console.log("DATA STORED");
    //         })
    //         .catch((error) => {
    //             this.setState({ requestFailed: true });
    //         });
    // };

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
        let content = null;
        const isSupportedType = checkFileMimeType(upload.file_mime_type);

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
            } else {
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

    const RenderUploadsButton = ({ upload, configuration }) => {
        console.log(upload);
        const handleShowModal = (upload, configuration) => {
            fileConvertHandler(upload, configuration);
        };

        if (upload.file_mime_type === "application/video") {
            return (
                <>
                    <span>Watch video</span>
                    <Button
                        variant="primary"
                        onClick={() => handleShowModal(upload, configuration)}
                    >
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
                    <Button
                        variant="primary"
                        onClick={() => handleShowModal(upload, configuration)}
                    >
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
                        onClick={() => handleShowModal(upload, configuration)}
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

    return (
        course_topic?.uploads && (
            <>
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
                <MyVerticallyCenteredModal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    size="xl"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                />
            </>
        )
    );
}
