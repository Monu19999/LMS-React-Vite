import React from "react";

export default function Step3() {
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
                    Your registration request successfully sent to concern
                    department. once it is approved you will be able to login in
                    the system with your user name and password.
                </p>
            </div>
        </div>
    );
}
