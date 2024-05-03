import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSubmit } from "react-router-dom";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import Step4 from "./steps/Step4";
import { useForm } from "react-hook-form";
import { register as RegisterUser } from "@src/features/app/AuthSlice";
import { getDepartments } from "@src/features/app/AppSlice";
import { setMessages } from "@src/features/app/AuthSlice";
import BootstrapSpinner from "@src/Components/BootstrapSpinner";

export default function Register() {
    const [user, setUser] = useState({});
    const user_loading = useSelector((state) => state.auth.user_loading);
    const auth_state = useSelector((state) => state.auth);
    const [activeStep, setActiveStep] = useState(1);

    const [offices, setOffices] = useState([]);
    const [selectedOffice, setSelectedOffice] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { departments } = useSelector((state) => state.app);

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
        console.log(selectedDepartment);

        const selectedDepartmentObj = departments.find(
            (department) => department.id === parseInt(selectedDepartment)
        );
        console.log(selectedDepartmentObj);
        setOffices(
            selectedDepartmentObj == undefined
                ? []
                : selectedDepartmentObj.offices
        );
        setSelectedOffice("");
    };

    const handleOfficeChange = (e) => {
        const selectedOffice = e.target.value;
        // console.log("office", selectedOffice);
        setSelectedOffice(selectedOffice);
    };

    const form_fields = {
        1: {
            first_name: "Harshwardhan",
            last_name: "Sharma",
            username: "hw.sharma91",
            password: "password",
            password_confirmation: "password",
        },
        2: {
            mobile: "7879651192",
            mobile_otp: "",
        },
        3: {
            email: "",
            email_otp: "",
        },
        4: {
            fk_department_id: "",
            fk_office_id: "",
        },
    };

    const {
        register,
        watch,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({
        defaultValues: {
            ...form_fields[activeStep],
        },
    });

    // useEffect(() => {
    //     let current_step = localStorage.getItem("current_step");
    //     if (current_step) {
    //         if (activeStep == null) {
    //             setActiveStep(parseInt(current_step));
    //         }
    //     } else {
    //         console.log("current_step");
    //         setActiveStep(1);
    //         console.log(activeStep);
    //         localStorage.setItem("current_step", activeStep);
    //     }
    // }, [activeStep]);

    const onSubmit = async (data) => {
        let extra_data = { step: activeStep };
        if (user?.id) {
            extra_data["id"] = user.id;
        }
        data = { ...data, ...extra_data };
        console.log("form1");
        console.log("errors => ", errors);
        console.log("data => ", data);
        let response = await dispatch(RegisterUser(data));
        if (response.payload.hasOwnProperty("errors")) {
            console.log(response.payload.errors);
        } else {
            console.log("form successfully submitted!");
            dispatch(
                setMessages({
                    errors: [],
                    success_message: null,
                    error_message: null,
                    is_otp_set: false,
                })
            );
            localStorage.setItem(
                "temp_user",
                JSON.stringify(response.payload.user)
            );
            setUser(response.payload.user);
            if (activeStep == 4) {
                localStorage.removeItem("temp_user");
                navigate("/member");
            } else {
                setActiveStep((previous) => previous + 1);
            }
        }
    };

    function getStepContent(activeStep) {
        switch (activeStep) {
            case 1:
                return (
                    <Step1
                        fields={{
                            first_name: register("first_name", {
                                required: "First Name is Required!",
                                pattern: {
                                    value: /^[a-zA-Z]+$/,
                                    message:
                                        "First name should contain only characters.",
                                },
                            }),
                            last_name: register("last_name", {
                                required: "Last Name is Required!",
                                pattern: {
                                    value: /^[a-zA-Z]+$/,
                                    message:
                                        "Last name should contain only characters.",
                                },
                            }),
                            username: register("username", {
                                required: "Username is Required!",
                            }),
                            password: register("password", {
                                required: "Password is Required!",
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
                        }}
                        errors={errors}
                        onSubmit={handleSubmit(onSubmit)}
                        button={setFormButton()}
                    />
                );
            case 2:
                return (
                    <Step2
                        fields={{
                            mobile: register("mobile", {
                                required: "Mobile is Required!",
                            }),
                            mobile_otp: register("mobile_otp", {
                                required: "Mobile OTP is Required!",
                            }),
                        }}
                        errors={errors}
                        user={user}
                        onSubmit={handleSubmit(onSubmit)}
                        button={setFormButton()}
                    />
                );
            case 3:
                return (
                    <Step3
                        fields={{
                            email: register("email", {
                                required: "Email is Required!",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@(mp\.gov\.in|mp\.nic\.in)$/i,
                                    message: "Not a valid Email!",
                                },
                            }),
                            email_otp: register("email_otp", {
                                required: "Email OTP is Required!",
                            }),
                        }}
                        errors={errors}
                        user={user}
                        onSubmit={handleSubmit(onSubmit)}
                        button={setFormButton()}
                    />
                );
            case 4:
                return (
                    <Step4
                        fields={{
                            fk_department_id: register("fk_department_id", {
                                required: "Department is Required!",
                            }),
                            fk_office_id: register("fk_office_id", {
                                required: "Office is Required!",
                            }),
                        }}
                        errors={errors}
                        user={user}
                        handleDepartmentChange={handleChangeDepartment}
                        handleChangeOffice={handleOfficeChange}
                        onSubmit={handleSubmit(onSubmit)}
                        button={setFormButton()}
                        offices={offices}
                        departments={departments}
                        selectedOffice={selectedOffice}
                    />
                );
            default:
                return "Unknown step";
        }
    }

    const handleResetForm = () => {
        localStorage.removeItem("temp_user");
        setActiveStep(1);
    };

    function setFormButton() {
        if (activeStep === 4) {
            return (
                <div className="d-flex gap-2">
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    <Button
                        variant="primary"
                        type="button"
                        onClick={handleResetForm}
                    >
                        Reset
                    </Button>
                </div>
            );
        } else {
            return (
                <Button variant="primary" type="submit">
                    Next
                </Button>
            );
        }
    }
    return (
        <div className="d-flex flex-column my-3 gap-3 align-items-center">
            <div className="d-flex justify-content-center">
                <Link to="/">
                    <img
                        height={64}
                        width={64}
                        src="assets/img/logo.png"
                        alt="logo"
                    />
                </Link>
            </div>
            <div
                className="card d-flex align-items-center shadow-sm p-3 bg-white"
                style={{ borderRadius: "10px", width: "400px" }}
            >
                {auth_state?.success_message && (
                    <div
                        className="alert alert-success alert-block"
                        style={{ marginBottom: "0px" }}
                    >
                        <strong>{auth_state.success_message}</strong>
                    </div>
                )}
                {auth_state?.error_message && (
                    <div
                        className="alert alert-danger alert-block"
                        style={{ marginBottom: "0px" }}
                    >
                        <strong>{auth_state.error_message}</strong>
                        {Object.values(auth_state?.errors).map((error, key) => (
                            <div
                                className="alert alert-danger alert-block mt-1 ml-3 mr-3"
                                key={key}
                            >
                                <strong>{error}</strong>
                            </div>
                        ))}
                    </div>
                )}
                {user_loading ? (
                    <BootstrapSpinner />
                ) : (
                    getStepContent(activeStep)
                )}

                <div className="d-flex gap-3 align-items-center justify-content-end">
                    <Link
                        to="/auth/login"
                        style={{ textDecoration: "underline" }}
                        className="text-dark"
                    >
                        <span
                            onMouseEnter={(e) => {
                                e.target.style.color = "blue";
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.color = "black";
                            }}
                        >
                            Already registered?
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
}