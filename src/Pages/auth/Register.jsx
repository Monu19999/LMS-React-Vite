import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import { useForm } from "react-hook-form";
import { register as RegisterUser } from "@src/features/app/AuthSlice";
import { getDepartments } from "@src/features/app/AppSlice";
import { setMessages } from "@src/features/app/AuthSlice";

export default function Register() {
    const [user_id, setUserId] = useState(0);
    const [activeStep, setActiveStep] = useState(1);
    const [offices, setOffices] = useState([]);
    const [selectedOffice, setSelectedOffice] = useState("");

    const user_loading = useSelector((state) => state.auth.user_loading);
    const auth_state = useSelector((state) => state.auth);
    const { departments } = useSelector((state) => state.app);

    const dispatch = useDispatch();

    // For fetching departments in app slice
    useEffect(() => {
        dispatch(getDepartments());
        dispatch(
            setMessages({
                errors: [],
                success_message: null,
                error_message: null,
                user_loading: false,
                is_otp_set: false,
            })
        );
    }, []);

    const handleChangeDepartment = (e) => {
        const selectedDepartment = e.target.value;

        const selectedDepartmentObj = departments.find(
            (department) => department.id === parseInt(selectedDepartment)
        );
        setOffices(
            selectedDepartmentObj == undefined
                ? []
                : selectedDepartmentObj.offices
        );
        setSelectedOffice("");
    };

    const handleOfficeChange = (e) => {
        setSelectedOffice(e.target.value);
    };

    const {
        register,
        watch,
        handleSubmit,
        trigger,
        reset,
        formState: { errors },
        getValues,
    } = useForm({});

    const onSubmit = async (data) => {
        let extra_data = { step: activeStep };
        if (user_id != 0) {
            extra_data["id"] = user_id;
        }
        data = { ...data, ...extra_data };
        let response = await dispatch(RegisterUser(data));
        if (!response.payload.hasOwnProperty("errors")) {
            dispatch(
                setMessages({
                    errors: [],
                    success_message: null,
                    error_message: null,
                    is_otp_set: false,
                })
            );
            if (activeStep == 2) {
                localStorage.removeItem("temp_user");
            } else {
                if (response.payload.hasOwnProperty("user_id")) {
                    setUserId(response.payload.user_id);
                }
                if (response.payload.hasOwnProperty("user")) {
                    localStorage.setItem(
                        "temp_user",
                        JSON.stringify(response.payload.user)
                    );
                }
            }
            setActiveStep((previous) => previous + 1);
        }
    };

    // console.log(getValues())
    function getStepContent(activeStep) {
        switch (activeStep) {
            case 1:
                return (
                    <Step1
                        fields={{
                            mobile: register("mobile", {
                                required: "Mobile Number is Required!",
                                minLength: {
                                    value: 10,
                                    message:
                                        "The mobile must be at least 10 characters.",
                                },
                                maxLength: {
                                    value: 10,
                                    message:
                                        "The mobile must not be greater than 10 characters.",
                                },
                            }),
                            mobile_otp: register("mobile_otp", {
                                required: "Mobile OTP is Required!",
                            }),
                        }}
                        authState={auth_state}
                        userLoading={user_loading}
                        onTrigger={trigger}
                        errors={errors}
                        onSubmit={handleSubmit(onSubmit)}
                        button={setFormButton()}
                    />
                );
            case 2:
                return (
                    <Step2
                        fields={{
                            first_name: register("first_name", {
                                required: "First Name is Required!",
                                pattern: {
                                    value: /^[a-zA-Z\s]+$/,
                                    message:
                                        "First name should contain only characters.",
                                },
                            }),
                            last_name: register("last_name", {
                                required: "Last Name is Required!",
                                pattern: {
                                    value: /^[a-zA-Z\s]+$/,
                                    message:
                                        "Last name should contain only characters.",
                                },
                            }),
                            email: register("email", {
                                required: "Email is Required!",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@(mp\.gov\.in|mp\.nic\.in)$/i,
                                    message: "Not a valid Email!",
                                },
                            }),
                            username: register("username", {
                                required: "Username is Required!",
                                minLength: {
                                    value: 4,
                                    message:
                                        "Username must be at least 4 characters long",
                                },
                                // pattern: {
                                //     value: /^[a-zA-Z](?!.*([a-zA-Z0-9_])\1\1)[a-zA-Z0-9_]{3,}$/,
                                //     message:
                                //         "Username must contain alphabets, numbers or underscore and start with an alphabet",
                                // },
                                validate: {
                                    verifyInputs: (username) => {
                                        let regularExpression =
                                            /^[A-Za-z0-9_]+$/;
                                        if (!regularExpression.test(username)) {
                                            return "Username may contain alphabets, numbers or underscores only.";
                                        }
                                    },
                                    startWithAlphabet: (username) => {
                                        let regularExpression = /^[A-Za-z]+/;
                                        if (!regularExpression.test(username)) {
                                            return "Username must start with the alphabet.";
                                        }
                                    },
                                    repetedChar: (username) => {
                                        if (
                                            username.match(/(.)\1{2,}/g)
                                                ?.length > 0
                                        ) {
                                            return "Username must not contain 3 or more consecutive characters.";
                                        }
                                    },
                                },
                            }),
                            password: register("password", {
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
                            }),
                            password_confirmation: register(
                                "password_confirmation",
                                {
                                    required: "Confirm Password is Required!",
                                    validate: (val) => {
                                        if (watch("password") != val) {
                                            return "Your passwords do no match";
                                        }
                                    },
                                }
                            ),
                            fk_department_id: register("fk_department_id", {
                                required: "Department is Required!",
                                onChange: handleChangeDepartment,
                            }),
                            fk_office_id: register("fk_office_id", {
                                required: "Office is Required!",
                                onChange: handleOfficeChange,
                            }),
                        }}
                        errors={errors}
                        onSubmit={handleSubmit(onSubmit)}
                        button={setFormButton()}
                        offices={offices}
                        departments={departments}
                        selectedOffice={selectedOffice}
                        authState={auth_state}
                        userLoading={user_loading}
                    />
                );
            case 3:
                return <Step3 />;
            default:
                return "Unknown step";
        }
    }

    const handleResetForm = () => {
        localStorage.removeItem("temp_user");
        reset({
            first_name: "",
            last_name: "",
            email: "",
            username: "",
            password: "",
            password_confirmation: "",
            fk_department_id: "",
            fk_office_id: "",
        });
    };

    const handlePreviousStep = () => {
        localStorage.removeItem("temp_user");
        reset({
            first_name: "",
            last_name: "",
            email: "",
            username: "",
            password: "",
            password_confirmation: "",
            fk_department_id: "",
            fk_office_id: "",
        });
        setActiveStep(1);
    };

    function setFormButton() {
        if (activeStep === 2) {
            return (
                <div className="row justify-content-center mt-4">
                    <div className="col-md-3 d-flex gap-2">
                        <div className="form-group">
                            <Button
                                className="form-control submit px-3"
                                type="submit"
                                variant="secondary"
                                onClick={handlePreviousStep}
                            >
                                Back
                            </Button>
                        </div>
                        <div className="form-group">
                            <Button
                                className="form-control submit px-4"
                                type="submit"
                                variant="primary"
                            >
                                Submit
                            </Button>
                        </div>
                        <div className="form-group">
                            <Button
                                className="form-control submit px-3"
                                type="button"
                                variant="secondary"
                                onClick={handleResetForm}
                            >
                                Reset
                            </Button>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="form-group">
                    <Button
                        variant="primary"
                        type="submit"
                        className="form-control btn btn-primary submit px-3"
                    >
                        Submit
                    </Button>
                </div>
            );
        }
    }
    return <>{getStepContent(activeStep)}</>;
}
