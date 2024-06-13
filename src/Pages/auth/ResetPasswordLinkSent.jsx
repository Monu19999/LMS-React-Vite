import React from "react";
import { useSelector } from "react-redux";

export default function ResetPasswordLinkSent() {
    const auth_state = useSelector((state) => state.auth);

    const ResetPasswordLink = () => {
        if (auth_state?.reset_password_url != "") {
            return <a href={auth_state.reset_password_url}>Reset Password</a>;
        } else {
            return "";
        }
        return auth_state?.reset_password_url != ""
            ? auth_state.reset_password_url
            : "";
    };
    return (
        <div
            role="alert"
            className="alert alert-primary p-2"
            style={{ marginTop: "100px" }}
        >
            <div className="d-flex ">
                <p
                    style={{
                        margin: 0,
                        padding: "50px",
                        fontSize: "20px",
                    }}
                >
                    Reset password link sent to your email successfully.
                    <ResetPasswordLink />
                </p>
            </div>
        </div>
    );
}
