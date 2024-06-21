import React, { useState } from "react";

import Accordion from "react-bootstrap/Accordion";
export default function FAQ() {
    const [accordionContent, setAccordionContent] = useState([
        {
            category_title: "category 1",
            contents: [
                {
                    heading: "Heading1",
                    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut  enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor i    reprehenderit in voluptate velit esse cillum dolore eu fugiat    nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",
                },
            ],
        },
        {
            category_title: "category 1",
            contents: [
                {
                    heading: "Heading1",
                    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut  enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor i    reprehenderit in voluptate velit esse cillum dolore eu fugiat    nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",
                },
                {
                    heading: "Heading2",
                    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut  enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor i    reprehenderit in voluptate velit esse cillum dolore eu fugiat    nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",
                },
            ],
        },
        {
            category_title: "category 1",
            contents: [
                {
                    heading: "Heading1",
                    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut  enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor i    reprehenderit in voluptate velit esse cillum dolore eu fugiat    nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",
                },
                {
                    heading: "Heading2",
                    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut  enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor i    reprehenderit in voluptate velit esse cillum dolore eu fugiat    nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",
                },

                {
                    heading: "Heading2",
                    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut  enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor i    reprehenderit in voluptate velit esse cillum dolore eu fugiat    nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",
                },
            ],
        },
    ]);
    return (
        <>
            {/* Header Start */}
            <div className="container-fluid bg-primary py-4 mb-4 page-header">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10 text-center">
                            <h1 className="display-3 text-white animated slideInDown">
                                FAQs
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
            {/* Header End */}
            <div className="container">
                <Accordion>
                    {accordionContent?.map((item, index) => (
                        <div key={index}>
                            <Accordion.Item eventKey={index}>
                                <Accordion.Header>
                                    {item.category_title}
                                </Accordion.Header>
                                <Accordion.Body>
                                    {item.contents.map((content, index) => (
                                        <div
                                            key={index}
                                            style={{
                                                border: "2px dashed skyblue",
                                            }}
                                            className="p-2 rounded-3 mb-2"
                                        >
                                            <div className="d-flex gap-2 ">
                                                <i className="bi bi-question-circle fa-lg"></i>{" "}
                                                <h4>{content.heading}</h4>
                                            </div>
                                            <div>
                                                <p>{content.body}</p>
                                            </div>
                                        </div>
                                    ))}
                                </Accordion.Body>
                            </Accordion.Item>
                        </div>
                    ))}
                </Accordion>
            </div>
        </>
    );
}
