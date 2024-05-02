import React, { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "@src/features/app/AuthSlice";
import { sendOTP } from "@src/features/app/AuthSlice";

export default function Step3({ fields, errors, onSubmit, button, user }) {
    const emailRef = useRef();
    const is_otp_set = useSelector((state) => state.auth.is_otp_set);
    console.log(errors);
    console.log("user => ", user);
    const dispatch = useDispatch();
    const handleSendOTP = async () => {
        console.log("send otp => ", emailRef);
        if (emailRef.current != "" && emailRef.current != undefined) {
            dispatch(
                setMessages({
                    errors: [],
                    success_message: null,
                    error_message: null,
                })
            );
            const response = await dispatch(
                sendOTP({
                    id: user.id,
                    type: "email",
                    email: emailRef.current,
                })
            );
            // const json = await response.payload;
            // console.log("json => ", json);
            // console.log("send otp response => ", response);
        }
    };
    return (
        <Form
            className="d-flex py-3 w-100 flex-column gap-3"
            onSubmit={onSubmit}
        >
            <Form.Group
                className="d-flex flex-column"
                controlId="formGroupFName"
            >
                <Form.Label>Email (Accepts only gov.in or nic.in)</Form.Label>
                <div className="d-flex gap-2">
                    <Form.Control
                        type="text"
                        name="email"
                        ref={emailRef}
                        onKeyUp={(e) => (emailRef.current = e.target.value)}
                        placeholder="Enter Email"
                        {...fields.email}
                    />
                    <Button
                        variant="secondary"
                        type="button"
                        onClick={handleSendOTP}
                    >
                        Send OTP
                    </Button>
                </div>
                {errors?.email?.type === "required" && (
                    <p className="errorMsg">{errors.email.message}</p>
                )}
            </Form.Group>
            {is_otp_set && (
                <Form.Group
                    className="d-flex flex-column"
                    controlId="formGroupOTP"
                >
                    <Form.Label>OTP</Form.Label>
                    <Form.Control
                        type="text"
                        name="email_otp"
                        placeholder="Enter OTP"
                        {...fields.email_otp}
                    />
                    {errors?.email_otp?.type === "required" && (
                        <p className="errorMsg">{errors.email_otp.message}</p>
                    )}
                </Form.Group>
            )}
            {button}
        </Form>
    );
}
