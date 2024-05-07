import React, { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "@src/features/app/AuthSlice";
import { sendOTP } from "@src/features/app/AuthSlice";
import { Link } from "react-router-dom";
import BootstrapSpinner from "@src/Components/BootstrapSpinner";

export default function Step1({
    fields,
    errors,
    onSubmit,
    button,
    onTrigger,
    authState,
    userLoading,
}) {
    const is_otp_set = useSelector((state) => state.auth.is_otp_set);

    const mobileRef = useRef();
    const dispatch = useDispatch();

    const handleSendOTP = async () => {
        if (mobileRef.current != "" && mobileRef.current != undefined) {
            dispatch(
                setMessages({
                    errors: [],
                    success_message: null,
                    error_message: null,
                })
            );
            const response = await dispatch(
                sendOTP({
                    type: "mobile",
                    mobile: mobileRef.current,
                })
            );
        }
        onTrigger("mobile");
    };

    return (
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
                    <p className="text-white">Already have an account?</p>
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
                        <h3 className="mb-3">Sign Up</h3>
                    </div>
                </div>
                {userLoading && <BootstrapSpinner />}
                {authState?.success_message && (
                    <div
                        className="alert alert-success alert-block"
                        style={{
                            marginBottom: "0px",
                        }}
                    >
                        <strong>{authState.success_message}</strong>
                    </div>
                )}
                {authState?.error_message && (
                    <div
                        className="alert alert-danger alert-block"
                        style={{
                            marginBottom: "0px",
                        }}
                    >
                        <strong>{authState.error_message}</strong>
                        {Object.values(authState?.errors).map((error, key) => (
                            <div
                                className="alert alert-danger alert-block mt-1 ml-3 mr-3"
                                key={key}
                            >
                                <strong>{error}</strong>
                            </div>
                        ))}
                    </div>
                )}
                {!authState?.error_message && !authState?.success_message && (
                    <div role="alert" className="alert alert-primary p-2 mb-3">
                        <div className="d-flex ">
                            <i
                                className="fa fa-info-circle mr-4"
                                style={{
                                    marginRight: 10,
                                    marginTop: 5,
                                }}
                            />
                            <p
                                style={{
                                    margin: 0,
                                }}
                            >
                                Enter mobile number and click 'get OTP' to
                                confirm it. An OTP will be sent to your phone
                                via SMS. Copy the OTP from the SMS and enter
                                into OTP box then, click the 'submit' button.
                            </p>
                        </div>
                    </div>
                )}
                <Form className="signin-form" onSubmit={onSubmit}>
                    {/* Mobile Number */}
                    <Form.Group
                        className="form-group mb-3"
                        controlId="formGroupMobile"
                    >
                        <Form.Label className="label">
                            Enter Your Mobile Number
                        </Form.Label>
                        <Form.Control
                            type="text"
                            className="mb-2"
                            ref={mobileRef}
                            onKeyUp={(e) => {
                                onTrigger("mobile");
                                return (mobileRef.current = e.target.value);
                            }}
                            placeholder="Enter Your Mobile Number"
                            {...fields.mobile}
                        />
                        <Form.Text
                            id="first_nameHelpBlock"
                            className="text-danger"
                        >
                            {["required", "minLength", "maxLength"].includes(
                                errors?.mobile?.type
                            ) && <>{errors.mobile.message}</>}
                        </Form.Text>
                    </Form.Group>
                    <div className="form-group mt-4">
                        <button
                            type="button"
                            className="form-control btn btn-primary submit px-3"
                            onClick={handleSendOTP}
                        >
                            Get OTP
                        </button>
                    </div>

                    {/* OTP */}
                    {is_otp_set && (
                        <div className="row">
                            <Form.Group
                                className="form-group mb-3"
                                controlId="formGroupOTP"
                            >
                                <Form.Label>Enter OTP</Form.Label>
                                <Form.Control
                                    type="text"
                                    className="mb-2"
                                    name="mobile_otp"
                                    placeholder="Enter OTP"
                                    {...fields.mobile_otp}
                                />
                                <Form.Text
                                    id="first_nameHelpBlock"
                                    className="text-danger"
                                >
                                    {["required"].includes(
                                        errors?.mobile_otp?.type
                                    ) && <>{errors.mobile_otp.message}</>}
                                </Form.Text>
                            </Form.Group>
                            {button}
                        </div>
                    )}
                </Form>
            </div>
        </div>
    );
}
