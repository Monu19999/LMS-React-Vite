import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import api from "@src/apis/api";
import PageHeader from "@src/Pages/includes/PageHeader";
import axios from "axios";
import ServerErrors from "@src/Components/ServerErrors";
import BootstrapSpinner from "@src/Components/BootstrapSpinner";
import { Link } from "react-router-dom";
import BootstrapToast from "@src/Components/BootstrapToast";

function Feedback() {
    const [loading, setLoader] = useState(false);
    const [serverErrors, setServerErrors] = useState([]);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async (data) => {
        let api_url = api("user_feedback");

        let headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
        };
        setLoader(true);

        axios
            .post(api_url, data, {
                headers,
            })
            .then((response) => {
                setLoader(false);
                if (response.status == 200) {
                    console.log(response.data.message);
                }
                reset();
            })
            .catch((error) => {
                setLoader(false);
                let response = error.response;
                console.log("error => ");
                console.log(error);
                console.log(response);
                if (response.status == 422) {
                    setServerErrors(response.data.errors);
                }
            });

        // try {
        //     const response = await fetch(api_url, {
        //         mode: "cors",
        //         // body: JSON.stringify(data),
        //         method: "POST",
        //         headers,
        //     });

        //     const json = await response.json();
        //     console.log(response);
        //     if (json.status !== 200) {
        //         throw new Error("Bad response", {
        //             cause: json,
        //         });
        //     }
        //     return json;
        //     // console.log(json);
        //     // reset();
        // } catch (error) {
        //     console.warn(error);
        // }
    };

    return (
        <>
            <PageHeader title="Feedback">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb justify-content-center">
                        <li className="breadcrumb-item">
                            <Link className="text-white" to="/">
                                Home
                            </Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link className="text-white" to="/download">
                                Feedback
                            </Link>
                        </li>
                    </ol>
                </nav>
            </PageHeader>
            <Container className="my-5">
                <div className="wrap d-md-flex">
                    <div className="col-md-12 bg-white">
                        <Form
                            className="d-flex w-100 flex-column gap-3"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            {loading && <BootstrapSpinner />}
                            {serverErrors.length > 0 && (
                                <ServerErrors errors={serverErrors} />
                            )}
                            <Row>
                                {/* Name */}
                                <Col md={6}>
                                    <Form.Group
                                        className="form-group mb-3"
                                        controlId="formGroupFName"
                                    >
                                        <Form.Label className="label">
                                            Name
                                        </Form.Label>
                                        <Form.Control
                                            className="mb-2"
                                            type="text"
                                            placeholder="Enter Name"
                                            aria-describedby="nameHelpBlock"
                                            {...register("name", {
                                                required: "Name is required",
                                            })}
                                            isInvalid={!!errors.name}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.name?.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>

                                {/* Email */}
                                <Col md={6}>
                                    <Form.Group
                                        className="form-group mb-3"
                                        controlId="formGroupEmail"
                                    >
                                        <Form.Label className="label">
                                            Email
                                        </Form.Label>
                                        <Form.Control
                                            className="mb-2"
                                            type="email"
                                            placeholder="Enter Email"
                                            aria-describedby="emailHelpBlock"
                                            {...register("email", {
                                                required: "Email is required",
                                                // pattern: {
                                                //     value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                                //     message:
                                                //         "Invalid email address",
                                                // },
                                            })}
                                            isInvalid={!!errors.email}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email?.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>

                                {/* Mobile */}
                                <Col md={6}>
                                    <Form.Group
                                        className="form-group mb-3"
                                        controlId="formGroupMobile"
                                    >
                                        <Form.Label className="label">
                                            Mobile
                                        </Form.Label>
                                        <Form.Control
                                            className="mb-2"
                                            type="tel"
                                            placeholder="Enter Mobile"
                                            aria-describedby="mobileHelpBlock"
                                            {...register("mobile", {
                                                required:
                                                    "Mobile number is required",
                                                pattern: {
                                                    value: /^[0-9]{10}$/,
                                                    message:
                                                        "Invalid mobile number",
                                                },
                                            })}
                                            isInvalid={!!errors.mobile}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.mobile?.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>

                                {/* Subject */}
                                <Col md={6}>
                                    <Form.Group
                                        className="form-group mb-3"
                                        controlId="formGroupSubject"
                                    >
                                        <Form.Label className="label">
                                            Subject
                                        </Form.Label>
                                        <Form.Control
                                            className="mb-2"
                                            type="text"
                                            placeholder="Enter Subject"
                                            aria-describedby="subjectHelpBlock"
                                            {...register("subject", {
                                                required: "Subject is required",
                                            })}
                                            isInvalid={!!errors.subject}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.subject?.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>

                                {/* Message */}
                                <Col md={6}>
                                    <Form.Group
                                        className="form-group mb-3"
                                        controlId="formGroupMessage"
                                    >
                                        <Form.Label className="label">
                                            Message
                                        </Form.Label>
                                        <Form.Control
                                            className="mb-2"
                                            as="textarea"
                                            placeholder="Enter Message"
                                            aria-describedby="messageHelpBlock"
                                            rows={3}
                                            {...register("message", {
                                                required: "Message is required",
                                            })}
                                            isInvalid={!!errors.message}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.message?.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="justify-content-center mt-4">
                                <Col md={3} className="d-flex gap-2">
                                    <Button
                                        type="submit"
                                        className="form-control btn btn-primary  px-4"
                                    >
                                        Submit
                                    </Button>
                                    <Button
                                        type="button"
                                        className="form-control btn btn-secondary"
                                        onClick={() => reset()}
                                    >
                                        Reset
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default Feedback;
