import React, { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import api from "@src/apis/api";
import PageHeader from "@src/Pages/includes/PageHeader";
import { Link, useLoaderData } from "react-router-dom";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";

export async function loader() {
    const res = await fetch(api("download_contents"), {
        mode: "cors",
        method: "get",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    const downloads = await res.json();
    return { downloads };
}

export function Download() {
    const [filteredContent, setFilteredContent] = useState([]);
    const { downloads } = useLoaderData();

    const {
        register,
        handleSubmit,
        getValues,
        reset,
        formState: { errors },
    } = useForm();

    const handleFormFilter = () => {
        const title = getValues().title.toLowerCase().trim();
        const updatedContent = downloads.data.download_content.filter((item) =>
            item.title_en.toLowerCase().includes(title)
        );
        setFilteredContent(updatedContent);
    };

    const handleResetSearch = () => {
        reset();
        setFilteredContent(downloads.data.download_content);
    };

    const fetchVideoContents = async () => {
        try {
            const res = await fetch(api("download_contents"), {
                mode: "cors",
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const json = await res.json();
            setFilteredContent(json.data.download_content);
            setDownloads(json.data.download_content);
            // console.log(filteredContent)
        } catch (error) {
            console.error("Failed to fetch video contents:", error);
        }
    };

    useEffect(() => {
        setFilteredContent(downloads.data.download_content);
        // setDownloads(downloads.data.download_content);
    }, [downloads]);
    return (
        <>
            <PageHeader title="Download">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb justify-content-center">
                        <li className="breadcrumb-item">
                            <Link className="text-white" to="/">
                                Home
                            </Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link className="text-white" to="/download">
                                Downloads
                            </Link>
                        </li>
                    </ol>
                </nav>
            </PageHeader>
            <div className="container-xxl" style={{ minHeight: "450px" }}>
                <Container className="shadow inner-page-container-mb ">
                    <Row className="mb-4">
                        <Col
                            lg={12}
                            className="wow fadeInUp mb-4"
                            style={{ backgroundColor: "#06bbcc" }}
                        >
                            <div className="search-title">
                                {/* Search Form Start */}
                                <Form onSubmit={handleSubmit(handleFormFilter)}>
                                    <Row className="justify-content-center">
                                        <Col lg={8} md={6} className="mt-3">
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    autoComplete="off"
                                                    {...register("title")}
                                                    className="form-control"
                                                    placeholder="Search By Title"
                                                />
                                            </div>
                                        </Col>
                                        <Col lg={4} md={6} className="mb-2">
                                            <div className="form-group mt-4">
                                                <Button
                                                    variant="dark"
                                                    className="py-md-2 px-md-4 animated slideInRight"
                                                    style={{
                                                        borderRadius: 40,
                                                        marginRight: 20,
                                                    }}
                                                    type="submit"
                                                >
                                                    Search
                                                </Button>
                                                <Button
                                                    variant="light"
                                                    className="py-md-2 px-md-4 animated slideInRight"
                                                    style={{ borderRadius: 40 }}
                                                    type="button"
                                                    onClick={handleResetSearch}
                                                >
                                                    <i className="fas fa-refresh" />{" "}
                                                    Reset
                                                </Button>
                                            </div>
                                        </Col>
                                    </Row>
                                </Form>
                                {/* Search Form End */}
                            </div>
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col className="col-12 mb-4">
                            <div className="table-responsive">
                                <Table
                                    responsive
                                    striped
                                    bordered
                                    hover
                                    className="align-items-center justify-content-center"
                                >
                                    <thead class="thead-dark">
                                        <tr>
                                            <th style={{ width: "5%" }}>
                                                S No.
                                            </th>
                                            <th style={{ width: "75%" }}>
                                                Title
                                            </th>
                                            <th style={{ width: "20%" }}>
                                                Download
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredContent?.map((item, index) => (
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{item.title_en}</td>
                                                <td>
                                                    <a
                                                        href={
                                                            item?.upload
                                                                .download_path
                                                        }
                                                        download={true}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <i className="bi bi-cloud-arrow-down fa-lg"></i>
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default Download;
