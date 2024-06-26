import React from "react";
import { useForm } from "react-hook-form";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { Link, useLoaderData } from "react-router-dom";

function ChangePassword() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        reset();
    };

    return (
        <div className="container ">
            <div className="row justify-content-center mt-4">
                <div className="col-md-6 shadow inner-page-container-mb">
                    <div className="row justify-content-center">
                    <div className="col-md-12 bg-white p-lg-5 ">
                    <Form
                        className="d-flex py-3 w-100 flex-column gap-3"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Row>
                            {/* Current Password */}
                            <Col md={12}>
                                <Form.Group
                                    className="form-group mb-3"
                                    controlId="formGroupCurrentPassword"
                                >
                                    <Form.Label className="label">
                                        Current Password
                                    </Form.Label>
                                    <Form.Control
                                        className="mb-2"
                                        type="password"
                                        placeholder="Enter Current Password"
                                        aria-describedby="currentPasswordHelpBlock"
                                        {...register("currentPassword", {
                                            required:
                                                "Current password is required",
                                            minLength: {
                                                value: 8,
                                                message:
                                                    "Password must be at least 8 characters long",
                                            },
                                            pattern: {
                                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
                                                message:
                                                    "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character",
                                            },
                                        })}
                                        isInvalid={!!errors.currentPassword}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.currentPassword?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        
                            {/* New Password */}
                            <Col md={12}>
                                <Form.Group
                                    className="form-group mb-3"
                                    controlId="formGroupNewPassword"
                                >
                                    <Form.Label className="label">
                                        New Password
                                    </Form.Label>
                                    <Form.Control
                                        className="mb-2"
                                        type="password"
                                        placeholder="Enter New Password"
                                        aria-describedby="newPasswordHelpBlock"
                                        {...register("newPassword", {
                                            required:
                                                "New password is required",
                                            minLength: {
                                                value: 8,
                                                message:
                                                    "Password must be at least 8 characters long",
                                            },
                                            pattern: {
                                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
                                                message:
                                                    "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character",
                                            },
                                            validate: (val) => {
                                                if (
                                                    watch("currentPassword") ===
                                                    val
                                                ) {
                                                    return "New password should be different from the current password";
                                                }
                                            },
                                        })}
                                        isInvalid={!!errors.newPassword}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.newPassword?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        
                            {/* Confirm Password */}
                            <Col md={12}>
                                <Form.Group
                                    className="form-group mb-3"
                                    controlId="formGroupConfirmPassword"
                                >
                                    <Form.Label className="label">
                                        Confirm Password
                                    </Form.Label>
                                    <Form.Control
                                        className="mb-2"
                                        type="password"
                                        placeholder="Confirm New Password"
                                        aria-describedby="confirmPasswordHelpBlock"
                                        {...register("confirmPassword", {
                                            required:
                                                "Confirm password is required",
                                            validate: (val) => {
                                                if (
                                                    watch("newPassword") !== val
                                                ) {
                                                    return "Passwords do not match";
                                                }
                                            },
                                        })}
                                        isInvalid={!!errors.confirmPassword}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.confirmPassword?.message}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            <Col md={12} className="d-flex gap-2">

                            <Link type="submit" className="btn btn-primary py-2 px-4 " style={{ borderRadius: 40, marginRight:"10px" }} >
                            Change Password{" "}
                                        
                                    </Link>
                                    <Link type="button" className="btn btn-secondary py-2 px-4 " style={{ borderRadius: 40, color:"#fff" }} >
                                        Reset{""}
                                        
                                    </Link>
                                {/* <Button
                                    type="submit"
                                    className="form-control btn btn-primary px-4"
                                >
                                    Change Password
                                </Button>
                                <Button
                                    type="button"
                                    className="form-control btn btn-secondary"
                                    onClick={() => reset()}
                                >
                                    Reset
                                </Button> */}
                            </Col>
                        </Row>
                        
                    </Form>
                </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChangePassword;
