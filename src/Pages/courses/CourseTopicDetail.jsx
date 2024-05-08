import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getCourseTopic } from "@src/features/app/CourseSlice";
import parse from "html-react-parser";
import { Button, Modal } from "react-bootstrap";
import ReactPlayer from "react-player";

export default function CourseTopicDetail() {
    let { topic_id } = useParams();
    const [showModal, setShowModal] = useState(false);
    const videoRef = useRef(ReactPlayer);

    const course_topic = useSelector((state) => state.course.course_topic);

    const dispatch = useDispatch();

    useEffect(() => {
        if (topic_id) {
            dispatch(getCourseTopic(topic_id));
        }
    }, []);

    function MyVerticallyCenteredModal(props) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Video
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                                    controlsList: "nodownload", // nodownload => disable download, nofullscreen => disable fullscreen, noplaybackrate => disable playback speed
                                    disablePictureInPicture: true,
                                },
                            },
                        }}
                        ref={videoRef}
                        onContextMenu={(e) => e.preventDefault()}
                        // onProgress={() => {
                        //     videoRef.current.getCurrentTime() >= played &&
                        //         setPlayed(videoRef.current.getCurrentTime());
                        // }}
                        // onSeek={() => {
                        //     videoRef.current.getCurrentTime() > played &&
                        //         videoRef.current.seekTo(played);
                        // }}
                    />
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer> */}
            </Modal>
        );
    }

    const checkMimeType = (upload) => {
        if (upload.file_mime_type == "application/video") {
            return (
                <>
                    <Button
                        variant="primary"
                        onClick={() => setShowModal(true)}
                    >
                        View Video
                    </Button>
                    <MyVerticallyCenteredModal
                        show={showModal}
                        onHide={() => setShowModal(false)}
                        upload={upload}
                    />
                </>
            );
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
