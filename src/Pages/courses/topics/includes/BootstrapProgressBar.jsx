import React from "react";
import { ProgressBar } from "react-bootstrap";

const getVariant = (percentage) => {
    if (percentage < 100) {
        return "info";
    } else {
        return "success";
    }
};

function BootstrapProgressBar({ percentage }) {
    return (
        <div className="d-flex gap-4 align-item-center">
            <ProgressBar
                style={{ marginBottom: "20px", width: "350px" }}
                variant={getVariant(percentage)}
                now={percentage}
                // label={`${percentage}% course completed`}
            />{" "}
            <span className="text-white">{`${percentage}% course completed`}</span>
        </div>
    );
}

export default BootstrapProgressBar;
