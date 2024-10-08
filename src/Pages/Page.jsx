import React from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "@src/Hooks/useFetch";
import BootstrapSpinner from "@src/Components/BootstrapSpinner";
import parse from "html-react-parser";
import api from "@src/apis/api";
import PageHeader from "./includes/PageHeader";
import { Col, Container, Row } from "react-bootstrap";

function Page() {
    let { page } = useParams();
    const { isLoading, serverError, apiData } = useFetch(
        "GET",
        api("page", page),
        {}
    );
    return (
        <>
            {isLoading && <BootstrapSpinner />}
            {!isLoading && apiData?.data && (
                <>
                    <PageHeader title={apiData?.data.page.title_en}>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb justify-content-center">
                                <li className="breadcrumb-item">
                                    <Link className="text-white" to="/">
                                        Home
                                    </Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <Link className="text-white" to="/">
                                        Pages
                                    </Link>
                                </li>
                                <li
                                    className="breadcrumb-item text-white active"
                                    aria-current="page"
                                >
                                    {apiData?.data.page.title_en}
                                </li>
                            </ol>
                        </nav>
                    </PageHeader>

                    <div className="container-xxl py-5">
                        <Container>
                            <Row className="g-5">
                                <Col
                                    lg={6}
                                    className="wow fadeInUp"
                                    data-wow-delay="0.1s"
                                    style={{ minHeight: 400 }}
                                >
                                    <div className="position-relative h-100">
                                        <img
                                            className="img-fluid position-absolute w-100 h-100"
                                            src="assets/img/e-book.png"
                                            alt={apiData?.data.page.title_en}
                                            style={{ objectFit: "cover" }}
                                        />
                                    </div>
                                </Col>
                                <Col
                                    lg={6}
                                    className="wow fadeInUp"
                                    data-wow-delay="0.3s"
                                    style={{ display: "table" }}
                                >
                                    <div
                                        style={{
                                            verticalAlign: "middle",
                                            display: "table-cell",
                                        }}
                                    >
                                        <h6 className="section-title bg-white text-start text-primary pe-3">
                                            {apiData?.data.page.title_en}
                                        </h6>
                                        {/* <h1 className="mb-4">Welcome to e-Shiksha</h1> */}
                                        <p className="mb-4">
                                            {apiData?.data &&
                                                parse(
                                                    apiData.data.page
                                                        .description_en
                                                )}
                                        </p>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </>
            )}
        </>
    );
}

export default Page;
