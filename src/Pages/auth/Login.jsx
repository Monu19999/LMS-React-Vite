import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "@src/features/app/AuthSlice";

const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(mp\.gov\.in|mp\.nic\.in)$/i;
    return emailRegex.test(email);
};

const isValidPassword = (password) => {
    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};

export default function Login() {
    const [email, setEmail] = useState("hw.sharma9@mp.gov.in");
    const [password, setPassword] = useState("password");
    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });

    const auth_state = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const saveEmployee = async (e) => {
        e.preventDefault();
        // console.log(validateForm());
        if (validateForm()) {
            const employee = { email, password };

            let response = await dispatch(login(employee));

            if (auth_state.error_message == "") {
                navigate("/member");
            }
        }
    };

    const validateForm = () => {
        let valid = true;
        //const { name, email, password } = formData;
        const errorsCopy = { ...errors };
        if (!email.trim()) {
            errorsCopy.email = "Email is required";
            valid = false;
        } else if (isValidEmail(email) == false) {
            errorsCopy.email = "Email is invalid";
            valid = false;
        } else {
            errorsCopy.email = "";
        }

        if (!password.trim()) {
            errorsCopy.password = "Password is required";
            valid = false;
        }
        //  else if (!isValidPassword(password)) {
        //     errorsCopy.password =
        //         "Password must be 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character";
        //     valid = false;
        // }
        else {
            errorsCopy.password = "";
        }

        setErrors(errorsCopy);
        return valid;
    };

    return (
        <div className="d-flex flex-column my-3 gap-3 align-items-center">
            <div className="d-flex justify-content-center">
                <img
                    height={64}
                    width={64}
                    src="/public/assets/img/logo.png"
                    alt=""
                />
            </div>

            <div
                className="card d-flex align-items-center shadow-sm p-3 bg-white"
                style={{ borderRadius: "10px", width: "400px" }}
            >
                {auth_state?.error_message && (
                    <div className="alert alert-danger alert-block mt-3 ml-3 mr-3">
                        <strong>{auth_state.error_message}</strong>
                    </div>
                )}
                <form
                    className="d-flex py-3 w-100 flex-column gap-3"
                    onSubmit={saveEmployee}
                >
                    <div className="d-flex flex-column">
                        <label
                            htmlFor="email"
                            className="from-label font-weight-bold"
                        >
                            Email
                        </label>
                        <input
                            style={{ borderRadius: "5px" }}
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && (
                            <div className="text-danger">{errors.email}</div>
                        )}
                    </div>
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
                        {errors.password && (
                            <div className="text-danger">{errors.password}</div>
                        )}
                    </div>
                    <div className="gap-2 d-flex">
                        <input
                            type="checkbox"
                            name="remember-me"
                            className="form-check-input"
                        />
                        <span>Remember me</span>
                    </div>

                    <div className="d-flex gap-3 align-items-center justify-content-end">
                        <Link
                            to="/auth/forget-password"
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
                                Forgot your Password?
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
                            Log in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
