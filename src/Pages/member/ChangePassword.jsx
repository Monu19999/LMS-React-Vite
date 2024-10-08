import { toast } from "react-toastify";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import ServerErrors from "@src/Components/ServerErrors";
import BootstrapSpinner from "@src/Components/BootstrapSpinner";
import api from "@src/apis/api";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getAuthHeaders } from "@src/features/app/AuthSlice";

function ChangePassword() {
    const [loading, setLoader] = useState(false);
    const [errorsMessage, setErrorsMessage] = useState("");
    const [serverErrors, setServerErrors] = useState({});
    const user = useSelector((state) => state.auth.user);
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isDirty, isValid, isSubmitSuccessful },
    } = useForm({
        mode: "all",
    });

    const handleFormSubmit = async (credentials) => {
        setLoader(true);
        try {
            let headers = getAuthHeaders();
            const { data } = await axios.patch(
                api("auth_change_password", { user_id: user.id }),
                credentials,
                { headers }
            );
            if (data.status == 200) {
                toast(data.message);
            }
        } catch (error) {
            const { response } = error;
            if (response.status == 404) {
                setErrorsMessage(response.data.message);
            }
            if (response.status == 422) {
                setServerErrors(response.data.errors);
            }
        }
        setLoader(false);
    };

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful, reset]);

    return (
        <>
            <h4 className="mb-4 heading-bg">Change Password</h4>
            <Row className="justify-content-center">
                <Col xl={6}>
                    {/* Account details card*/}
                    <div className="card mb-4" style={{ height: "100%" }}>
                        <div className="card-header">Change Password</div>
                        <div className="card-body">
                            <Form
                                className="d-flex py-3 w-100 flex-column gap-3"
                                onSubmit={handleSubmit(handleFormSubmit)}
                            >
                                {loading && <BootstrapSpinner />}
                                {errorsMessage && (
                                    <div
                                        className="alert alert-danger alert-block"
                                        style={{
                                            marginBottom: "0px",
                                        }}
                                    >
                                        <strong>{errorsMessage}</strong>
                                    </div>
                                )}
                                {Object.values(serverErrors).length > 0 && (
                                    <ServerErrors errors={serverErrors} />
                                )}
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
                                                {...register(
                                                    "current_password",
                                                    {
                                                        required:
                                                            "Current password is required",
                                                    }
                                                )}
                                                // isInvalid={
                                                //     !!errors.current_password
                                                // }
                                            />
                                            <Form.Text
                                                id="currentPasswordHelpBlock"
                                                className="text-danger"
                                            >
                                                {
                                                    errors.current_password
                                                        ?.message
                                                }
                                            </Form.Text>
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
                                                {...register("password", {
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
                                                })}
                                                // isInvalid={!!errors.password}
                                            />
                                            <Form.Text
                                                id="newPasswordHelpBlock"
                                                className="text-danger"
                                            >
                                                {errors.password?.message}
                                            </Form.Text>
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
                                                {...register(
                                                    "password_confirmation",
                                                    {
                                                        required:
                                                            "Confirm password is required",
                                                        validate: (val) => {
                                                            if (
                                                                watch(
                                                                    "password"
                                                                ) !== val
                                                            ) {
                                                                return "Passwords do not match";
                                                            }
                                                        },
                                                    }
                                                )}
                                                // isInvalid={
                                                //     !!errors.password_confirmation
                                                // }
                                            />
                                            <Form.Text
                                                id="confirmPasswordHelpBlock"
                                                className="text-danger"
                                            >
                                                {
                                                    errors.password_confirmation
                                                        ?.message
                                                }
                                            </Form.Text>
                                        </Form.Group>
                                    </Col>

                                    <Col md={12} className="d-flex gap-2">
                                        <Button
                                            variant="primary"
                                            type="submit"
                                            className="py-2 px-4 "
                                            style={{
                                                borderRadius: 40,
                                                marginRight: "10px",
                                            }}
                                            disabled={
                                                !isDirty ||
                                                !isValid ||
                                                isSubmitSuccessful
                                            }
                                        >
                                            Change Password{" "}
                                        </Button>
                                        <Button
                                            variant="secondary"
                                            type="button"
                                            className="py-2 px-4 "
                                            style={{
                                                borderRadius: 40,
                                                color: "#fff",
                                            }}
                                            onClick={() => reset()}
                                        >
                                            Reset{""}
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    );
}

export default ChangePassword;
