import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import api from "@src/apis/api";
import PageHeader from "@src/Pages/includes/PageHeader";
import { Link, useLoaderData } from "react-router-dom";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";

export const loader = async () => {
    try {
        const res = await fetch(api("video_contents"), {
            mode: "cors",
            method: "get",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const videos = await res.json();
        return { videos };
        // console.log(data.data.video_content);
        // setVideos(data.data.video_content);
        // setFilteredContent(data.data.video_content);
        // console.log(filteredContent)
    } catch (error) {
        console.error("Failed to fetch video contents:", error);
    }
};

function Video() {
    const [filteredContent, setFilteredContent] = useState([]);
    const { videos } = useLoaderData();

    const {
        register,
        handleSubmit,
        getValues,
        reset,
        formState: { errors },
    } = useForm();

    const handleFormFilter = () => {
        const title = getValues().title.toLowerCase().trim();
        const updatedContent = videos.data.video_content.filter((item) =>
            item.title_en.toLowerCase().includes(title)
        );
        setFilteredContent(updatedContent);
    };

    const handleResetSearch = () => {
        reset();
        setFilteredContent(videos.data.video_content);
    };

    useEffect(() => {
        setFilteredContent(videos.data.video_content);
    }, []);

    return (
        <>
            <PageHeader title="Video">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb justify-content-center">
                        <li className="breadcrumb-item">
                            <Link className="text-white" to="/">
                                Home
                            </Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link className="text-white" to="/download">
                                Videos
                            </Link>
                        </li>
                    </ol>
                </nav>
            </PageHeader>
            <div className="container-xxl " style={{ minHeight: "450px" }}>
                <Container className="shadow inner-page-container-mb ">
                    <Row className="mb-4">
                        <Col
                            lg={12}
                            className="wow fadeInUp"
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
                                                    {...register("title", {
                                                        required:
                                                            "Title is required.",
                                                    })}
                                                    className="form-control"
                                                    placeholder="Search By Title"
                                                />
                                            </div>
                                            {errors.title && (
                                                <p className="text-danger">
                                                    {errors.title.message}
                                                </p>
                                            )}
                                        </Col>
                                        <Col lg={4} md={6} className="mb-2">
                                            <div className="form-group mt-3">
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
                            <Table
                                responsive
                                striped
                                bordered
                                hover
                                className="align-items-center justify-content-center"
                            >
                                <thead class="thead-dark">
                                    <tr>
                                        <th>S.No</th>
                                        <th>Title</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredContent?.map((item, index) => (
                                        <tr key={index}>
                                            <th scope="row">{item.id}</th>
                                            <td>
                                                <a
                                                    href={item.video_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {item.title_en}
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default Video;
