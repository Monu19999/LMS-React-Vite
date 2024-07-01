import { useForm } from "react-hook-form";
import BootstrapSpinner from "@src/Components/BootstrapSpinner";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { forgotPassword } from "@src/features/app/AuthSlice";

export default function ForgetPassword() {
    const user_loading = useSelector((state) => state.auth.user_loading);
    const auth_state = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = async (data) => {
        let response = await dispatch(forgotPassword(data));
        let payload = response.payload;
        if (payload?.status == 200) {
            navigate("/auth/reset-password-link-sent");
        }
    };
    return (
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
                    <Link
                        to="/auth/login"
                        className="btn btn-white btn-outline-white"
                    >
                        Sign In
                    </Link>
                </div>
            </div>
            <div className="login-wrap p-3 p-lg-5">
                <div className="d-flex">
                    <div className="w-100">
                        <h3 className="mb-3">Forgot Password</h3>
                    </div>
                </div>

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
                    <Form
                        onSubmit={handleSubmit(onSubmit)}
                        style={{ width: "100%" }}
                    >
                        <Form.Group
                            className="form-group mb-3"
                            controlId="formGroupEmail"
                        >
                            <Form.Label className="label">
                                Email (ACCEPTS ONLY GOV.IN OR NIC.IN)
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
                                {errors.email?.message}
                            </Form.Text>
                        </Form.Group>
                        <div className="d-flex flex-column my-4 ">
                            <div>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    style={{
                                        width: "100%",
                                    }}
                                >
                                    Send
                                </Button>
                            </div>
                        </div>
                    </Form>
                )}
            </div>
        </div>
    );
}
