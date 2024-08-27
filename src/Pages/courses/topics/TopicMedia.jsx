import React from "react";
import { Nav, Placeholder } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function TopicMedia({ course_topic }) {
    const course_topic_loading = useSelector(
        (state) => state.course.course_topic_loading
    );

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
    return (
        <div className="p-4 col-12 shadow" style={{ minHeight: "350px" }}>
            {/* widget Tags */}
            <div className="widget widget-tags">
                <div
                    className="widget-title"
                    style={{
                        borderBottom: "1px solid #dedede",
                        marginBottom: "10px",
                    }}
                >
                    <h3 className="mb-4">Related Documents</h3>
                </div>
                <div className="widget-body mt-4">
                    {course_topic_loading ? (
                        <>
                            <Placeholder.Button xs={10} aria-hidden="true" />
                            <Placeholder.Button xs={10} aria-hidden="true" />
                            <Placeholder.Button xs={10} aria-hidden="true" />
                        </>
                    ) : (
                        // uploadsList()
                        <h1>button</h1>
                    )}
                </div>
            </div>
            {/* End widget Tags */}
        </div>
    );
}
