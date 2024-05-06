import React, { useEffect } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login, setMessages } from "@src/features/app/AuthSlice";
import BootstrapSpinner from "@src/Components/BootstrapSpinner";

export default function Login() {
    const user_loading = useSelector((state) => state.auth.user_loading);
    const auth_state = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let default_values =
        import.meta.env.VITE_APP_ENV == "production"
            ? {}
            : {
                  defaultValues: {
                      email: "hw.sharma9@mp.gov.in",
                      password: "password",
                  },
              };
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm(default_values);

    const resetMessages = () => {
        dispatch(
            setMessages({
                errors: [],
                success_message: null,
                error_message: null,
                user_loading: false,
                is_otp_set: false,
            })
        );
    };
    // Resetting error messages
    useEffect(() => {
        resetMessages();
    }, []);

    // Handle user login form submittion
    const loginUser = async (user) => {
        let response = await dispatch(login(user));
        let data = response.payload?.data;
        if (response.hasOwnProperty("errors")) {
            return;
        } else if (data?.status == 200) {
            resetMessages();
            navigate("/member");
        }
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
                {user_loading && <BootstrapSpinner />}
                {auth_state?.error_message && (
                    <div className="alert alert-danger alert-block mt-3 ml-3 mr-3">
                        <strong>{auth_state.error_message}</strong>
                    </div>
                )}
                <Form
                    className="d-flex py-3 w-100 flex-column gap-3"
                    onSubmit={handleSubmit(loginUser)}
                >
                    <Form.Group
                        className="d-flex flex-column"
                        controlId="formGroupEmail"
                    >
                        <Form.Label className="font-weight-bold">
                            Email (Accepts only gov.in or nic.in)
                        </Form.Label>
                        <Form.Control
                            style={{ borderRadius: "5px" }}
                            type="text"
                            placeholder="Enter Email"
                            {...register("email", {
                                required: "Email is Required!",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@(mp\.gov\.in|mp\.nic\.in)$/i,
                                    message: "Not a valid Email!",
                                },
                            })}
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
                        controlId="formGroupPassword"
                    >
                        <Form.Label className="font-weight-bold">
                            Password
                        </Form.Label>
                        <Form.Control
                            style={{ borderRadius: "5px" }}
                            type="password"
                            placeholder="Password"
                            {...register("password", {
                                required: "Password is Required!",
                            })}
                        />
                        {errors?.password?.type === "required" && (
                            <p className="errorMsg">
                                {errors.password.message}
                            </p>
                        )}
                    </Form.Group>
                    <div className="gap-2 d-flex">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            {...register("remember")}
                        />
                        <span>Remember me</span>
                    </div>

                    <div className="d-flex gap-1 align-items-center">
                        <div
                            className="d-flex flex-wrap"
                            style={{ width: "70%", textAlign: "left" }}
                        >
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
                            <Link
                                to="/auth/register"
                                style={{ textDecoration: "underline" }}
                                className="text-dark"
                            >
                                Register a new membership
                            </Link>
                        </div>
                        <button
                            style={{
                                borderRadius: "8px",
                                padding: "8px 12px",
                                backgroundColor: "black",
                                color: "white",
                                transition: "background-color 0.3s, color 0.3s",
                            }}
                            disabled={user_loading}
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
                </Form>
            </div>
        </div>
    );
}
