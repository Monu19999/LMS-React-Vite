import React, { useEffect } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login, setMessages } from "@src/features/app/AuthSlice";
import BootstrapSpinner from "@src/Components/BootstrapSpinner";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

export default function Login() {
    const user_loading = useSelector((state) => state.auth.user_loading);
    const auth_state = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const default_values =
        import.meta.env.VITE_APP_ENV === "production"
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
        getValues, // Add this to get form values
        setValue, // Add this to set form values
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
        const savedEmail = Cookies.get("loggedInUserEmail");
        const encryptedPassword = Cookies.get("loggedInUserPassword");
        if (savedEmail && encryptedPassword) {
            const decryptedPassword = CryptoJS.AES.decrypt(encryptedPassword, '8103379969').toString(CryptoJS.enc.Utf8);
            setValue("email", savedEmail);
            setValue("password", decryptedPassword);
        }
    }, [setValue]);

    // Handle user login form submission
    const loginUser = async (user) => {
        let response = await dispatch(login(user));
        let data = response.payload?.data;
        // console.log(data);
        if (response.hasOwnProperty("errors")) {
            return;
        } else if (data?.status === 200) {
            resetMessages();
            navigate("/member");
        }
    };

    // Handle remember me checkbox change
    const handleRememberMe = () => {
        const { email, password } = getValues();
        if (email && password) {
            const encryptedPassword = CryptoJS.AES.encrypt(password, '8103379969').toString();
            Cookies.set("loggedInUserEmail", email);
            Cookies.set("loggedInUserPassword", encryptedPassword);
        }
    };
    return (
        <>
            <div className="wrap d-md-flex">
                <div className="text-wrap p-4  text-center d-flex align-items-center order-md-last">
                    <div className="text w-100">
                        <div className="d-flex justify-content-center mb-4">
                            <Link to="/">
                                <img
                                    width={80}
                                    src="assets/img/logo.png"
                                    alt="logo"
                                />
                            </Link>
                        </div>
                        <h2>Welcome to e-Shiksha (LMS)</h2>
                        <p className="text-white">Don’t have an account?</p>
                        <Link
                            to="/auth/register"
                            className="btn btn-white btn-outline-white"
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
                <div className="login-wrap p-3 p-lg-5">
                    <div className="d-flex">
                        <div className="w-100">
                            <h3 className="mb-3">Sign In</h3>
                        </div>
                    </div>
                    <Form
                        action="1/index.html"
                        className="signin-form"
                        onSubmit={handleSubmit(loginUser)}
                    >
                        {user_loading && <BootstrapSpinner />}
                        {auth_state?.error_message && (
                            <div className="alert alert-danger alert-block mt-3 ml-3 mr-3">
                                <strong>{auth_state.error_message}</strong>
                            </div>
                        )}
                        <Form.Group
                            className="form-group mb-3"
                            controlId="formGroupEmail"
                        >
                            <Form.Label className="label">
                                Email (Accepts only gov.in or nic.in)
                            </Form.Label>
                            <Form.Control
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
                            <Form.Text
                                id="first_nameHelpBlock"
                                className="text-danger"
                            >
                                {["required", "pattern"].includes(
                                    errors?.email?.type
                                ) && <>{errors.email.message}</>}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group
                            className="form-group mb-3"
                            controlId="formGroupPassword"
                        >
                            <Form.Label className="label">Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                {...register("password", {
                                    required: "Password is Required!",
                                })}
                            />
                            <Form.Text
                                id="first_nameHelpBlock"
                                className="text-danger"
                            >
                                {["required"].includes(
                                    errors?.password?.type
                                ) && <>{errors.password.message}</>}
                            </Form.Text>
                        </Form.Group>
                        <div className="form-group mt-4">
                            <button
                                type="submit"
                                className="form-control btn btn-primary submit px-3"
                            >
                                Sign In
                            </button>
                        </div>
                        <div className="form-group d-md-flex">
                            <div className="w-50 text-left d-flex ">
                                <input
                                    type="checkbox"
                                    {...register("remember")}
                                    onChange={handleRememberMe}
                                    checked={ Cookies.get('loggedInUserEmail') ? true : false }
                                />
                                <label className="checkbox-wrap checkbox-primary mb-0">
                                    Remember Me{" "}
                                </label>
                            </div>
                            <div className="w-50 text-md-right">
                                <Link to="/auth/forget-password">
                                    Forgot Password
                                </Link>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    );
}
