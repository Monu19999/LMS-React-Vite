import React from "react";
import { Form } from "react-bootstrap";

export default function Step2({ fields, errors, onSubmit, button, ...props }) {
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
                    placeholder="Enter First Name"
                    {...fields.first_name}
                    className={`${
                        errors?.first_name?.type == "required"
                            ? "input-error"
                            : ""
                    }`}
                />
                {errors?.first_name?.type === "required" && (
                    <p className="errorMsg">{errors.first_name.message}</p>
                )}
            </Form.Group>
            <Form.Group
                className="d-flex flex-column"
                controlId="formGroupLName"
            >
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Last Name"
                    {...fields.last_name}
                />
                {errors?.last_name?.type === "required" && (
                    <p className="errorMsg">{errors.last_name.message}</p>
                )}
            </Form.Group>
            <Form.Group
                className="d-flex flex-column"
                controlId="formGroupEmail"
            >
                <Form.Label>Email (Accepts only gov.in or nic.in)</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Email"
                    {...fields.email}
                />
                {errors?.email?.type === "required" && (
                    <p className="errorMsg">{errors.email.message}</p>
                )}
                {errors?.email?.type === "pattern" && (
                    <p className="errorMsg">{errors.email.message}</p>
                )}
            </Form.Group>
            <Form.Group
                className="d-flex flex-column"
                controlId="formGroupUsername"
            >
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Username"
                    {...fields.username}
                />
                {errors?.username?.type === "required" && (
                    <p className="errorMsg">{errors.username.message}</p>
                )}
            </Form.Group>
            <Form.Group
                className="d-flex flex-column"
                controlId="formGroupPassword"
            >
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    {...fields.password}
                />
                {errors?.password?.type === "required" && (
                    <p className="errorMsg">{errors.password.message}</p>
                )}
            </Form.Group>
            <Form.Group
                className="d-flex flex-column"
                controlId="formGroupConfirmPassword"
            >
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    {...fields.password_confirmation}
                />
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
            </Form.Group>
            <Form.Group
                className="d-flex flex-column"
                controlId="formGroupDepartments"
            >
                <Form.Label>Departments</Form.Label>
                <Form.Select {...fields.fk_department_id}>
                    <option value="">Select Department</option>
                    {props?.departments.map((department) => {
                        return (
                            <option value={department.id} key={department.id}>
                                {department.title_en}
                            </option>
                        );
                    })}
                </Form.Select>
                {errors?.fk_department_id?.type === "required" && (
                    <p className="errorMsg">
                        {errors.fk_department_id.message}
                    </p>
                )}
            </Form.Group>
            <Form.Group
                className="d-flex flex-column"
                controlId="formGroupOffice"
            >
                <Form.Label>Office</Form.Label>
                <Form.Select {...fields.fk_office_id}>
                    <option value="">Select Office</option>
                    {props?.offices.map((office) => (
                        <option key={office.id} value={office.id}>
                            {office.title_en}
                        </option>
                    ))}
                </Form.Select>
                {errors?.fk_office_id?.type === "required" && (
                    <p className="errorMsg">{errors.fk_office_id.message}</p>
                )}
            </Form.Group>
            {button}
        </Form>
    );
}
