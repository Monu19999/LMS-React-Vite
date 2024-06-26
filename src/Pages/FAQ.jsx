import React, { useState } from "react";

import Accordion from "react-bootstrap/Accordion";
import PageHeader from "@src/Pages/includes/PageHeader";
import api from "@src/apis/api";
import { Link, useLoaderData } from "react-router-dom";

export async function loader() {
    const res = await fetch(api("faq_contents"), {
        mode: "cors",
        method: "get",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    const faq_contents = await res.json();
    return { faq_contents };
}

export default function FAQ() {
    const { faq_contents } = useLoaderData();
    return (
        <>
            <PageHeader title="FAQs">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb justify-content-center">
                        <li className="breadcrumb-item">
                            <Link className="text-white" to="/">
                                Home
                            </Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link className="text-white" to="/download">
                                FAQ's
                            </Link>
                        </li>
                    </ol>
                </nav>
            </PageHeader>
            <div className="container shadow inner-page-container-mb">
                <div className="row">
                    <div className="col-md-12 p-lg-5">
                    <Accordion>
                    {faq_contents.data?.faq_contents?.map((category, index) => (
                        <div key={index}>
                            <Accordion.Item eventKey={index}>
                                <Accordion.Header>
                                    {category.title_en}
                                </Accordion.Header>
                                <Accordion.Body>
                                    {category?.faq_contents.map(
                                        (faq_content, index) => (
                                            <div
                                                key={index}
                                                style={{
                                                    border: "2px dashed skyblue",
                                                }}
                                                className="p-2 rounded-3 mb-2"
                                            >
                                                <div className="d-flex gap-2 ">
                                                    <i className="bi bi-question-circle fa-lg"></i>{" "}
                                                    <h4>
                                                        {faq_content.question}
                                                    </h4>
                                                </div>
                                                <div>
                                                    <p>{faq_content.answer}</p>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </Accordion.Body>
                            </Accordion.Item>
                        </div>
                    ))}
                </Accordion>
                    </div>
                </div>
                
            </div>
        </>
    );
}
