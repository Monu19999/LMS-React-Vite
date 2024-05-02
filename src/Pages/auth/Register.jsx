import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "@src/features/app/AuthSlice";
import { getDepartments } from "@src/features/app/AppSlice";
import { sendOTP } from "@src/features/app/AuthSlice";

const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(mp\.gov\.in|mp\.nic\.in)$/i;
    //   console.log("email => ", emailRegex.test(email));
    return emailRegex.test(email);
};
const isValidMobile = (mobile) => {
    const mobileRegex = /^[6-9]\d{9}$/;
    console.log("mobile => ", mobileRegex.test(mobile));
    return mobileRegex.test(mobile);
};

// const isValidPassword = (password) => {
//   const passwordRegex =
//     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//   return passwordRegex.test(password);
// };

const isValidfirst_name = (first_name) => {
    const first_nameRegex = /^[a-zA-Z\s]+$/;
    return first_nameRegex.test(first_name);
};

const isValidlast_name = (last_name) => {
    const last_nameRegex = /^[a-zA-Z\s]+$/;
    return last_nameRegex.test(last_name);
};

export default function Register() {
    const { departments } = useSelector((state) => state.app);
    //   console.log("department list ", departments);
    const [first_name, setFirstName] = useState("harsh");
    const [last_name, setLastName] = useState("sharama");
    const [username, setUsername] = useState("hw.sharma91");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("password");
    const [password_confirmation, setPasswordConfirmation] =
        useState("password");
    const [mobile, setMobile] = useState("");
    const [step, setStep] = useState(1);
    const [offices, setOffices] = useState([]);
    const [selectedOffice, setSelectedOffice] = useState("");

    const [user, setUser] = useState({});

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
        const selectedOffice = e.target.value;
        // console.log("office", selectedOffice);
        setSelectedOffice(selectedOffice);
    };

    const [errors, setErrors] = useState({
        1: {
            first_name: "",
            last_name: "",
            username: "",
            password: "",
            password_confirmation: "",
        },
        2: {
            mobile: "",
        },
        3: {
            email: "",
        },
        4: {
            fk_department_id: "",
            fk_office_id: "",
        },
    });

    const auth_state = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    // For fetching departments in app slice
    useEffect(() => {
        dispatch(getDepartments());
    }, []);

    const saveEmployee = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const employee = {
                1: {
                    step: step,
                    first_name,
                    last_name,
                    username,
                    password,
                    password_confirmation,
                },
                2: {
                    step: step,
                    id: user?.id,
                    mobile,
                },
                3: {
                    step: step,
                    id: user?.id,
                    email,
                },
                4: {
                    step: step,
                    id: user?.id,
                    fk_department_id: selectedOffice,
                    fk_office_id: selectedOffice,
                },
            };
            let response = await dispatch(register(employee[step]));
            console.log("response => ", response.payload.user);
            if (response) {
                if (response?.payload?.user) {
                    localStorage.setItem("temp_user", response.payload.user);
                    setUser(response.payload.user);
                    nextStep();
                }
                // if (step == 4) {
                // if (auth_state.error_message === "") {
                //     navigate("/member");
                // }
                // }
            }
        }
    };

    const handleSendOTP = async () => {
        let response = await dispatch(sendOTP());
        console.log(response);
    };

    const validateForm = () => {
        let valid = true;
        const errorsCopy = { ...errors[step] };
        // console.log(errorsCopy);

        if (step == 1) {
            if (!first_name.trim()) {
                errorsCopy.first_name = "First name is required";
                valid = false;
            } else if (!isValidfirst_name(first_name)) {
                errorsCopy.first_name = "First name is invalid";
                valid = false;
            } else {
                errorsCopy.first_name = "";
            }

            if (!last_name.trim()) {
                errorsCopy.last_name = "Last name is required";
                valid = false;
            } else if (!isValidlast_name(last_name)) {
                errorsCopy.last_name = "Last name is invalid";
                valid = false;
            } else {
                errorsCopy.last_name = "";
            }

            if (!username.trim()) {
                errorsCopy.username = "Username is required";
                valid = false;
            } else {
                errorsCopy.username = "";
            }

            if (!password.trim()) {
                errorsCopy.password = "Password is required";
                valid = false;
            } else {
                errorsCopy.password = "";
            }

            if (!password_confirmation.trim()) {
                errorsCopy.password_confirmation =
                    "Confirm Password is Required";
                valid = false;
            } else if (password_confirmation !== password) {
                errorsCopy.password_confirmation = "password not match";
                valid = false;
            } else {
                errorsCopy.password_confirmation = "";
            }
        }

        if (step == 2) {
            if (!mobile.trim()) {
                errorsCopy.mobile = "Mobile number is required";
                valid = false;
            } else if (!isValidMobile(mobile)) {
                errorsCopy.mobile = "Mobile number is invalid";
                valid = false;
            } else {
                errorsCopy.mobile = "";
            }
        }

        if (step == 3) {
            if (!email.trim()) {
                errorsCopy.email = "Email is required";
                valid = false;
            } else if (!isValidEmail(email)) {
                errorsCopy.email = "Email is invalid";
                valid = false;
            } else {
                errorsCopy.email = "";
            }
        }

        if (step == 4) {
            if (!fk_department_id.trim()) {
                errorsCopy.fk_department_id = "department id is required";
                valid = false;
            } else {
                errorsCopy.fk_department_id = "";
            }

            if (!fk_office_id.trim()) {
                errorsCopy.fk_office_id = "office id is required";
                valid = false;
            } else {
                errorsCopy.fk_office_id = "";
            }
        }
        // console.log(errorsCopy);
        // console.log(step);
        // console.log({ ...errors, [step]: errorsCopy });
        setErrors({ ...errors, [step]: errorsCopy });
        return valid;
    };

    const basicInfoSection = () => {
        return (
            <div>
                {/* first name field */}
                <div className="d-flex flex-column">
                    <label htmlFor="first_name" className="form-label ">
                        First Name
                    </label>
                    <input
                        // required
                        style={{ borderRadius: "5px" }}
                        type="text"
                        className="form-control"
                        value={first_name}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    {errors[step].first_name && (
                        <div className="text-danger">
                            {errors[step].first_name}
                        </div>
                    )}
                </div>

                {/* last name field */}
                <div className="d-flex flex-column">
                    <label htmlFor="last_name" className="form-label">
                        Last Name
                    </label>
                    <input
                        // required
                        style={{ borderRadius: "5px" }}
                        type="text"
                        className="form-control"
                        value={last_name}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    {errors[step].last_name && (
                        <div className="text-danger">
                            {errors[step].last_name}
                        </div>
                    )}
                </div>

                {/* username field */}
                <div className="d-flex flex-column">
                    <label htmlFor="username" className="form-label">
                        User Name
                    </label>
                    <input
                        // required
                        style={{ borderRadius: "5px" }}
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    {errors[step].username && (
                        <div className="text-danger">
                            {errors[step].username}
                        </div>
                    )}
                </div>

                {/*  password field */}
                <div className="d-flex flex-column">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        style={{ borderRadius: "5px" }}
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors[step].password && (
                        <div className="text-danger">
                            {errors[step].password}
                        </div>
                    )}
                </div>

                {/* confirm password field */}
                <div className="d-flex flex-column">
                    <label htmlFor="password" className="form-label">
                        Confirm Password
                    </label>
                    <input
                        style={{ borderRadius: "5px" }}
                        type="password"
                        className="form-control"
                        value={password_confirmation}
                        onChange={(e) =>
                            setPasswordConfirmation(e.target.value)
                        }
                    />
                    {errors[step].password_confirmation && (
                        <div className="text-danger">
                            {errors[step].password_confirmation}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const mobileVarificationSection = () => {
        return (
            <div>
                <div>
                    <label htmlFor="mobile">Mobile</label>
                </div>
                <div className="d-flex gap-2 align-items-center ">
                    <input
                        type="text"
                        name="mobile"
                        className="form-control"
                        style={{ width: "250px" }}
                        onChange={(e) => setMobile(e.target.value)}
                    />
                    <button type="button" onClick={handleSendOTP}>
                        Send OTP{" "}
                    </button>
                </div>
                {errors[step].mobile && (
                    <div className="text-danger">{errors[step].mobile}</div>
                )}
                <div className="py-3 d-flex flex-column">
                    <label>Verify OTP</label>
                    <input
                        type="text"
                        name="otp"
                        maxLength="4"
                        className="form-control"
                    />
                </div>
            </div>
        );
    };

    const emailVerificationSection = () => {
        return (
            <div>
                {/* email field */}
                <div className="d-flex flex-column">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <div className="d-flex align-items-center gap-2">
                        <input
                            style={{ borderRadius: "5px", width: "250px" }}
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />{" "}
                        <span>Send OTP</span>
                    </div>
                    {errors[step].email && (
                        <div className="text-danger">{errors[step].email}</div>
                    )}
                </div>
                <div className="py-3 d-flex flex-column">
                    <label>Verify OTP</label>
                    <input
                        type="text"
                        name="otp"
                        maxLength="4"
                        className="form-control"
                    />
                </div>
            </div>
        );
    };

    const departmentOfficeSection = () => {
        return (
            <div>
                {/* Departments and Offices */}
                <div>
                    <div className="d-flex flex-column">
                        <div>
                            <label htmlFor="department">Department</label>
                        </div>
                        <div>
                            <select
                                name="department"
                                onChange={handleChangeDepartment}
                                style={{ width: "100%" }}
                                className="form-control"
                            >
                                <option>Select Department---</option>
                                {departments &&
                                    departments.map((department) => {
                                        return (
                                            <option
                                                value={department.id}
                                                key={department.id}
                                            >
                                                {department.title_en}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                    </div>

                    <div className="py-3">
                        <div>
                            <label htmlFor="office">Office</label>
                        </div>
                        <div>
                            <select
                                // value={selectedOffice}
                                onChange={handleOfficeChange}
                                name="office"
                                style={{ width: "100%" }}
                                className="form-control"
                            >
                                <option value="">Select Office---</option>
                                {offices.map((office) => (
                                    <option key={office.id} value={office.id}>
                                        {office.title_en}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

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
                    <button
                        style={{
                            borderRadius: "8px",
                            padding: "8px 12px",
                            backgroundColor: "black",
                            color: "white",
                            transition: "background-color 0.3s, color 0.3s",
                        }}
                        className="btn btn-dark text-white"
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor =
                                "rgba(0, 0, 0, 0.8)";
                            e.target.style.color = "white";
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = "black";
                            e.target.style.color = "white";
                        }}
                    >
                        Register
                    </button>
                </div>
            </div>
        );
    };

    const nextStep = () => {
        console.log("called", step);
        if (step === 1) {
            // Validate basic info fields
            if (
                !errors[step].first_name &&
                !errors[step].last_name &&
                // !errors[step].email &&
                !errors[step].password &&
                !errors[step].password_confirmation
            ) {
                setStep(step + 1);
            }
        } else if (step === 2) {
            // Validate mobile verification fields
            if (!errors.mobile) {
                setStep(step + 1);
            }
        } else if (step === 3) {
            // Validate email verification fields
            if (!errors.email) {
                setStep(step + 1);
            }
        }
        // Add similar checks for other steps if needed
    };
    const createButton = () => {
        return (
            <button onClick={saveEmployee}>
                {step < 4 ? "Next" : "Register"}
            </button>
        );
    };
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
                {auth_state?.error_message && (
                    <div className="alert alert-danger alert-block mt-3 ml-3 mr-3">
                        <strong>{auth_state.error_message}</strong>
                        {Object.values(auth_state?.errors).map((error, key) => (
                            <div
                                className="alert alert-danger alert-block mt-3 ml-3 mr-3"
                                key={key}
                            >
                                <strong>{error}</strong>
                            </div>
                        ))}
                    </div>
                )}
                <form
                    className="d-flex py-3 w-100 flex-column gap-3"
                    onSubmit={saveEmployee}
                >
                    {step === 1 && basicInfoSection()}
                    {step === 2 && mobileVarificationSection()}
                    {step === 3 && emailVerificationSection()}
                    {step === 4 && departmentOfficeSection()}

                    <div>{createButton()}</div>
                </form>
            </div>
        </div>
    );
}
