import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import BootstrapSpinner from "@src/Components/BootstrapSpinner";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
    resetPassword,
    verifyResetPasswordLink,
} from "@src/features/app/AuthSlice";

export default function ResetPassword() {
    const params = useParams();
    const user_loading = useSelector((state) => state.auth.user_loading);
    const auth_state = useSelector((state) => state.auth);
    const [validating_link, setValidatingLink] = useState(true);
    const [is_valid, setIsValid] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        watch,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: params.email,
            password: "Admin@123",
            password_confirmation: "Admin@123",
        },
    });

    const verifyResetPassword = async (params) => {
        console.log(params);
        let response = await dispatch(verifyResetPasswordLink(params));
        let payload = response.payload;
        setValidatingLink(false);
        if (payload.status == 404) {
            setIsValid(false);
        }
        if (payload.status == 200) {
            setIsValid(true);
        }
    };

    useEffect(() => {
        verifyResetPassword(params);
    }, [params]);

    const handleResetPassword = async (credentials) => {
        let request = { ...credentials, ...params };
        let response = await dispatch(resetPassword(request));
        let payload = response.payload;
        if (payload.status == 200) {
            navigate("/auth/login");
        }
    };

    return (
        <>
            {validating_link && <BootstrapSpinner />}
            {!validating_link && !is_valid ? (
                <div
                    role="alert"
                    className="alert alert-primary p-2"
                    style={{ marginTop: "100px" }}
                >
                    <div className="d-flex ">
                        <p
                            style={{
                                margin: 0,
                                padding: "50px",
                                fontSize: "20px",
                            }}
                        >
                            This url is not valid.
                        </p>
                    </div>
                </div>
            ) : (
                <div className="wrap d-md-flex">
                    <div className="text-wrap p-4  text-center d-flex align-items-center order-md-last">
                        <div className="text w-100">
                            <div className="d-flex justify-content-center mb-4">
                                <Link to="/">
                                    <img
                                        width={80}
                                        src="assets/img/logo.png"
                                        alt="logo"
                                    />
                                </Link>
                            </div>
                            <h2>Welcome to e-Shiksha (LMS)</h2>
                            <Link
                                to="/auth/login"
                                className="btn btn-white btn-outline-white"
                            >
                                Sign In
                            </Link>
                        </div>
                    </div>
                    <div className="login-wrap p-3 p-lg-5">
                        <div className="d-flex">
                            <div className="w-100">
                                <h3 className="mb-3">Reset Password</h3>
                            </div>
                        </div>
                        <Form
                            className="signin-form"
                            onSubmit={handleSubmit(handleResetPassword)}
                        >
                            {user_loading && <BootstrapSpinner />}
                            {auth_state?.error_message && (
                                <div
                                    className="alert alert-danger alert-block"
                                    style={{ marginBottom: "0px" }}
                                >
                                    <strong>{auth_state.error_message}</strong>
                                    {Object.values(auth_state?.errors).map(
                                        (error, key) => (
                                            <div
                                                className="alert alert-danger alert-block mt-1 ml-3 mr-3"
                                                key={key}
                                            >
                                                <strong>{error}</strong>
                                            </div>
                                        )
                                    )}
                                </div>
                            )}
                            <Form.Group
                                className="form-group mb-3"
                                controlId="formGroupEmail"
                            >
                                <Form.Label className="label">
                                    Email (Accepts only gov.in or nic.in)
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Email"
                                    disabled
                                    {...register("email", {
                                        required: "Email is Required!",
                                    })}
                                />
                                <Form.Text
                                    id="first_nameHelpBlock"
                                    className="text-danger"
                                >
                                    {errors.email?.message}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group
                                className="form-group mb-3"
                                controlId="formGroupPassword"
                            >
                                <Form.Label className="label">
                                    Password
                                </Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    {...register("password", {
                                        required: "Password is Required!",
                                        minLength: {
                                            value: 8,
                                            message:
                                                "Password must be 8 characters long",
                                        },
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
                                            message:
                                                "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character",
                                        },
                                    })}
                                />
                                <Form.Text
                                    id="first_nameHelpBlock"
                                    className="text-danger"
                                >
                                    {errors.password?.message}
                                </Form.Text>
                            </Form.Group>

                            {/* Confirm Password */}
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
                                    placeholder="Confirm Password"
                                    aria-describedby="password_confirmationHelpBlock"
                                    {...register("password_confirmation", {
                                        required:
                                            "Confirm Password is Required!",
                                        validate: (val) => {
                                            if (watch("password") != val) {
                                                return "Your passwords do no match";
                                            }
                                        },
                                    })}
                                />
                                <Form.Text
                                    id="password_confirmationHelpBlock"
                                    className="text-danger"
                                >
                                    {errors.password_confirmation?.message}
                                </Form.Text>
                            </Form.Group>
                            <div className="form-group mt-4">
                                <button
                                    type="submit"
                                    className="form-control btn btn-primary submit px-3"
                                >
                                    Reset Password
                                </button>
                            </div>
                        </Form>
                    </div>
                </div>
            )}
        </>
    );
}
