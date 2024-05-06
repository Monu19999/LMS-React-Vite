import React from "react";
import { Form } from "react-bootstrap";

export default function Step2({ fields, errors, onSubmit, button, ...props }) {
    return (
        <Form
            className="d-flex py-3 w-100 flex-column gap-3"
            onSubmit={onSubmit}
        >
            {/* First Name */}
            <Form.Group
                className="d-flex flex-column"
                controlId="formGroupFName"
            >
                <Form.Label>First Name</Form.Label>

                <Form.Control
                    type="text"
                    placeholder="Enter First Name"
                    aria-describedby="first_nameHelpBlock"
                    {...fields.first_name}
                    className={`${
                        errors?.first_name?.type == "required"
                            ? "input-error"
                            : ""
                    }`}
                />
                <Form.Text id="first_nameHelpBlock" muted>
                    {["required", "pattern"].includes(
                        errors?.first_name?.type
                    ) && <>{errors.first_name.message}</>}
                </Form.Text>
            </Form.Group>

            {/* Last Name */}
            <Form.Group
                className="d-flex flex-column"
                controlId="formGroupLName"
            >
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Last Name"
                    aria-describedby="last_nameHelpBlock"
                    {...fields.last_name}
                />
                <Form.Text id="last_nameHelpBlock" muted>
                    {["required", "pattern"].includes(
                        errors?.last_name?.type
                    ) && <>{errors.last_name.message}</>}
                </Form.Text>
            </Form.Group>

            {/* Email */}
            <Form.Group
                className="d-flex flex-column"
                controlId="formGroupEmail"
            >
                <Form.Label>Email (Accepts only gov.in or nic.in)</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Email"
                    aria-describedby="emailHelpBlock"
                    {...fields.email}
                />
                <Form.Text id="emailHelpBlock" muted>
                    {["required", "pattern"].includes(errors?.email?.type) && (
                        <>{errors.email.message}</>
                    )}
                </Form.Text>
            </Form.Group>

            {/* Username */}
            <Form.Group
                className="d-flex flex-column"
                controlId="formGroupUsername"
            >
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Username"
                    aria-describedby="usernameHelpBlock"
                    {...fields.username}
                />
                <Form.Text id="usernameHelpBlock" muted>
                    {["required", "minLength", "pattern"].includes(
                        errors?.username?.type
                    ) && <>{errors.username.message}</>}
                </Form.Text>
            </Form.Group>

            {/* Password */}
            <Form.Group
                className="d-flex flex-column"
                controlId="formGroupPassword"
            >
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    aria-describedby="passwordHelpBlock"
                    {...fields.password}
                />
                <Form.Text id="passwordHelpBlock" muted>
                    {["required", "minLength", "pattern"].includes(
                        errors?.password?.type
                    ) && <>{errors.password.message}</>}
                </Form.Text>
            </Form.Group>

            {/* Confirm Password */}
            <Form.Group
                className="d-flex flex-column"
                controlId="formGroupConfirmPassword"
            >
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    aria-describedby="password_confirmationHelpBlock"
                    {...fields.password_confirmation}
                />
                <Form.Text id="password_confirmationHelpBlock" muted>
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
                </Form.Text>
            </Form.Group>

            {/* Department */}
            <Form.Group
                className="d-flex flex-column"
                controlId="formGroupDepartments"
            >
                <Form.Label>Departments</Form.Label>
                <Form.Select
                    aria-describedby="fk_department_idHelpBlock"
                    {...fields.fk_department_id}
                >
                    <option value="">Select Department</option>
                    {props?.departments.map((department) => {
                        return (
                            <option value={department.id} key={department.id}>
                                {department.title_en}
                            </option>
                        );
                    })}
                </Form.Select>
                <Form.Text id="fk_department_idHelpBlock" muted>
                    {errors?.fk_department_id?.type === "required" && (
                        <p className="errorMsg">
                            {errors.fk_department_id.message}
                        </p>
                    )}
                </Form.Text>
            </Form.Group>

            {/* Office */}
            <Form.Group
                className="d-flex flex-column"
                controlId="formGroupOffice"
            >
                <Form.Label>Office</Form.Label>
                <Form.Select
                    aria-describedby="fk_office_idHelpBlock"
                    {...fields.fk_office_id}
                >
                    <option value="">Select Office</option>
                    {props?.offices.map((office) => (
                        <option key={office.id} value={office.id}>
                            {office.title_en}
                        </option>
                    ))}
                </Form.Select>
                <Form.Text id="fk_office_idHelpBlock" muted>
                    {errors?.fk_office_id?.type === "required" && (
                        <p className="errorMsg">
                            {errors.fk_office_id.message}
                        </p>
                    )}
                </Form.Text>
            </Form.Group>
            {button}
        </Form>
    );
}
