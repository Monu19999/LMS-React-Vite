import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getDepartments } from "@src/features/app/AppSlice";

export default function Step4({
    fields,
    errors,
    onSubmit,
    button,
    user,
    ...props
}) {
    return (
        <Form
            className="d-flex py-3 w-100 flex-column gap-3"
            onSubmit={onSubmit}
        >
            <Form.Group
                className="d-flex flex-column"
                controlId="formGroupDepartments"
            >
                <Form.Label>Departments</Form.Label>
                <Form.Select
                    name="fk_department_id"
                    {...fields.fk_department_id}
                    onChange={props.handleDepartmentChange}
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
                <Form.Select
                    {...fields.fk_office_id}
                    name="fk_office_id"
                    onChange={props.handleChangeOffice}
                >
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
