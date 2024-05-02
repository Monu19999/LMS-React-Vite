import React from "react";
import { Form } from "react-bootstrap";
import { Controller } from "react-hook-form";

export default function Step1({ fields, errors, onSubmit, button }) {
    // console.log(fields);
    return (
        <Form
            className="d-flex py-3 w-100 flex-column gap-3"
            onSubmit={onSubmit}
        >
            <Form.Group
                className="d-flex flex-column"
                controlId="formGroupFName"
            >
                <Form.Label>First Name</Form.Label>

                <Form.Control
                    type="text"
                    name="first_name"
                    placeholder="Enter First Name"
                    {...fields.first_name}
                    className={`${
                        errors?.first_name?.type == "required"
                            ? "input-error"
                            : ""
                    }`}
                />
            </Form.Group>
            {errors?.first_name?.type === "required" && (
                <p className="errorMsg">{errors.first_name.message}</p>
            )}
            <Form.Group
                className="d-flex flex-column"
                controlId="formGroupLName"
            >
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                    type="text"
                    name="last_name"
                    placeholder="Enter Last Name"
                    {...fields.last_name}
                />
            </Form.Group>
            {errors?.last_name?.type === "required" && (
                <p className="errorMsg">{errors.last_name.message}</p>
            )}
            <Form.Group
                className="d-flex flex-column"
                controlId="formGroupUsername"
            >
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    name="username"
                    placeholder="Enter Username"
                    {...fields.username}
                />
            </Form.Group>
            {errors?.username?.type === "required" && (
                <p className="errorMsg">{errors.username.message}</p>
            )}
            {/* {errors?.username?.type === "server" && (
                <p className="errorMsg">{errors.username.message}</p>
            )} */}
            <Form.Group
                className="d-flex flex-column"
                controlId="formGroupPassword"
            >
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    {...fields.password}
                />
            </Form.Group>
            {errors?.password?.type === "required" && (
                <p className="errorMsg">{errors.password.message}</p>
            )}
            <Form.Group
                className="d-flex flex-column"
                controlId="formGroupConfirmPassword"
            >
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    name="password_confirmation"
                    placeholder="Confirm Password"
                    {...fields.password_confirmation}
                />
            </Form.Group>
            {errors?.password_confirmation?.type === "required" && (
                <p className="errorMsg">
                    {errors.password_confirmation.message}
                </p>
            )}
            {errors?.password_confirmation?.type === "validate" && (
                <p className="errorMsg">
                    {errors.password_confirmation.message}
                </p>
            )}
            {button}
        </Form>
    );
}
