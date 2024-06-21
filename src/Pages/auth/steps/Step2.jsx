import React from "react";
import { Form } from "react-bootstrap";
import BootstrapSpinner from "@src/Components/BootstrapSpinner";

export default function Step2({
    fields,
    errors,
    onSubmit,
    button,
    authState,
    userLoading,
    ...props
}) {
    return (
        <div className="wrap d-md-flex">
            <div className="col-md-12 bg-white p-lg-5">
                <div className="d-flex">
                    <div className="w-100 text-center">
                        <h3 className="mb-4">Sign Up</h3>
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
                <Form
                    className="d-flex py-3 w-100 flex-column gap-3"
                    onSubmit={onSubmit}
                >
                    <div className="row">
                        {/* First Name */}
                        <div className="col-md-6">
                            <Form.Group
                                className="form-group mb-3"
                                controlId="formGroupFName"
                            >
                                <Form.Label className="label">
                                    First Name
                                </Form.Label>

                                <Form.Control
                                    className="mb-2"
                                    type="text"
                                    placeholder="Enter First Name"
                                    aria-describedby="first_nameHelpBlock"
                                    {...fields.first_name}
                                />
                                {/* className={`${
                                        errors?.first_name?.type == "required"
                                            ? "input-error"
                                            : ""
                                    }`} */}
                                <Form.Text
                                    id="first_nameHelpBlock"
                                    className="text-danger"
                                >
                                    {["required", "pattern"].includes(
                                        errors?.first_name?.type
                                    ) && <>{errors.first_name.message}</>}
                                </Form.Text>
                            </Form.Group>
                        </div>

                        {/* Last Name */}
                        <div className="col-md-6">
                            <Form.Group
                                className="form-group mb-3"
                                controlId="formGroupLName"
                            >
                                <Form.Label className="label">
                                    Last Name
                                </Form.Label>
                                <Form.Control
                                    className="mb-2"
                                    type="text"
                                    placeholder="Enter Last Name"
                                    aria-describedby="last_nameHelpBlock"
                                    {...fields.last_name}
                                />
                                <Form.Text
                                    id="last_nameHelpBlock"
                                    className="text-danger"
                                >
                                    {["required", "pattern"].includes(
                                        errors?.last_name?.type
                                    ) && <>{errors.last_name.message}</>}
                                </Form.Text>
                            </Form.Group>
                        </div>

                        {/* Email */}
                        <div className="col-md-6">
                            <Form.Group
                                className="form-group mb-3"
                                controlId="formGroupEmail"
                            >
                                <Form.Label className="label">
                                    Email (Accepts only gov.in or nic.in)
                                </Form.Label>
                                <Form.Control
                                    className="mb-2"
                                    type="text"
                                    placeholder="Enter Email"
                                    aria-describedby="emailHelpBlock"
                                    {...fields.email}
                                />
                                <Form.Text
                                    id="emailHelpBlock"
                                    className="text-danger"
                                >
                                    {["required", "pattern"].includes(
                                        errors?.email?.type
                                    ) && <>{errors.email.message}</>}
                                </Form.Text>
                            </Form.Group>
                        </div>

                        {/* Username */}
                        <div className="col-md-6">
                            <Form.Group
                                className="form-group mb-3"
                                controlId="formGroupUsername"
                            >
                                <Form.Label className="label">
                                    Username
                                </Form.Label>
                                <Form.Control
                                    className="mb-2"
                                    type="text"
                                    placeholder="Enter Username"
                                    aria-describedby="usernameHelpBlock"
                                    {...fields.username}
                                />
                                <Form.Text
                                    id="usernameHelpBlock"
                                    className="text-danger"
                                >
                                    {[
                                        "required",
                                        "minLength",
                                        // "pattern",
                                        "verifyInputs",
                                        "startWithAlphabet",
                                        "repetedChar",
                                    ].includes(errors?.username?.type) && (
                                        <>{errors.username.message}</>
                                    )}
                                </Form.Text>
                            </Form.Group>
                        </div>

                        {/* Password */}
                        <div className="col-md-6">
                            <Form.Group
                                className="form-group mb-3"
                                controlId="formGroupPassword"
                            >
                                <Form.Label className="label">
                                    Password
                                </Form.Label>
                                <Form.Control
                                    className="mb-2"
                                    type="password"
                                    placeholder="Password"
                                    aria-describedby="passwordHelpBlock"
                                    {...fields.password}
                                />
                                <Form.Text
                                    id="passwordHelpBlock"
                                    className="text-danger"
                                >
                                    {[
                                        "required",
                                        "minLength",
                                        "pattern",
                                    ].includes(errors?.password?.type) && (
                                        <>{errors.password.message}</>
                                    )}
                                </Form.Text>
                            </Form.Group>
                        </div>

                        {/* Confirm Password */}
                        <div className="col-md-6">
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
                                    {...fields.password_confirmation}
                                />
                                <Form.Text
                                    id="password_confirmationHelpBlock"
                                    className="text-danger"
                                >
                                    {errors?.password_confirmation?.type ===
                                        "required" && (
                                        <p className="errorMsg">
                                            {
                                                errors.password_confirmation
                                                    .message
                                            }
                                        </p>
                                    )}
                                    {errors?.password_confirmation?.type ===
                                        "validate" && (
                                        <p className="errorMsg">
                                            {
                                                errors.password_confirmation
                                                    .message
                                            }
                                        </p>
                                    )}
                                </Form.Text>
                            </Form.Group>
                        </div>

                        {/* Department */}
                        <div className="col-md-6">
                            <Form.Group
                                className="form-group mb-3"
                                controlId="formGroupDepartments"
                            >
                                <Form.Label className="label">
                                    Departments
                                </Form.Label>
                                <Form.Select
                                    aria-describedby="fk_department_idHelpBlock"
                                    {...fields.fk_department_id}
                                >
                                    <option value="">Select Department</option>
                                    {props?.departments.map((department) => {
                                        return (
                                            <option
                                                value={department.id}
                                                key={department.id}
                                            >
                                                {department.title_en}
                                            </option>
                                        );
                                    })}
                                </Form.Select>
                                <Form.Text
                                    id="fk_department_idHelpBlock"
                                    className="text-danger"
                                >
                                    {errors?.fk_department_id?.type ===
                                        "required" && (
                                        <p className="errorMsg">
                                            {errors.fk_department_id.message}
                                        </p>
                                    )}
                                </Form.Text>
                            </Form.Group>
                        </div>

                        {/* Office */}
                        <div className="col-md-6">
                            <Form.Group
                                className="form-group mb-3"
                                controlId="formGroupOffice"
                            >
                                <Form.Label className="label">
                                    Office
                                </Form.Label>
                                <Form.Select
                                    aria-describedby="fk_office_idHelpBlock"
                                    {...fields.fk_office_id}
                                >
                                    <option value="">Select Office</option>
                                    {props?.offices.map((office) => (
                                        <option
                                            key={office.id}
                                            value={office.id}
                                        >
                                            {office.title_en}
                                        </option>
                                    ))}
                                </Form.Select>
                                <Form.Text
                                    id="fk_office_idHelpBlock"
                                    className="text-danger"
                                >
                                    {errors?.fk_office_id?.type ===
                                        "required" && (
                                        <p className="errorMsg">
                                            {errors.fk_office_id.message}
                                        </p>
                                    )}
                                </Form.Text>
                            </Form.Group>
                        </div>
                    </div>
                    {button}
                </Form>
            </div>
        </div>
    );
}
