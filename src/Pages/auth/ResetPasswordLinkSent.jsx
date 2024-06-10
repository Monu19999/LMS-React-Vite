import React from "react";

export default function ResetPasswordLinkSent() {
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
                </p>
            </div>
        </div>
    );
}
