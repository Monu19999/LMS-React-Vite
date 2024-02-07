import React from "react";

function api() {
    return <div>{import.meta.env.VITE_APP_NAME}</div>;
}

export default api;
