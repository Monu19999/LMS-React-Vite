import React from "react";

export default function ServerErrors({ errors }) {
    return (
        <>
            <div
                className="alert alert-danger alert-block"
                style={{
                    marginBottom: "0px",
                }}
            >
                {Object.values(errors)?.map((error, key) => (
                    <div key={key}>
                        <strong>{error}</strong>
                    </div>
                ))}
            </div>
        </>
    );
}
