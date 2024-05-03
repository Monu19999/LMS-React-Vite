import React, { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "@src/features/app/AuthSlice";
import { sendOTP } from "@src/features/app/AuthSlice";

export default function Step2({ fields, errors, onSubmit, button, user }) {
    const mobileRef = useRef();
    const is_otp_set = useSelector((state) => state.auth.is_otp_set);
    console.log(errors);
    console.log("user => ", user);
    const dispatch = useDispatch();
    const handleSendOTP = async () => {
        console.log("send otp => ", mobileRef);
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
                    id: user.id,
                    type: "mobile",
                    mobile: mobileRef.current,
                })
            );
            // const json = await response.payload;
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
                controlId="formGroupMobile"
            >
                {/* <input type="hidden" name="type" value="mobile" /> */}
                <Form.Label>Mobile</Form.Label>
                <div className="d-flex gap-2">
                    <Form.Control
                        type="text"
                        name="mobile"
                        ref={mobileRef}
                        onKeyUp={(e) => (mobileRef.current = e.target.value)}
                        placeholder="Enter Mobile"
                        {...fields.mobile}
                    />
                    <Button
                        variant="secondary"
                        type="button"
                        onClick={handleSendOTP}
                    >
                        Send OTP
                    </Button>
                </div>
                {errors?.mobile?.type === "required" && (
                    <p className="errorMsg">{errors.mobile.message}</p>
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
                        name="mobile_otp"
                        placeholder="Enter OTP"
                        {...fields.mobile_otp}
                    />
                    {errors?.mobile_otp?.type === "required" && (
                        <p className="errorMsg">{errors.mobile_otp.message}</p>
                    )}
                </Form.Group>
            )}
            {button}
        </Form>
    );
}
