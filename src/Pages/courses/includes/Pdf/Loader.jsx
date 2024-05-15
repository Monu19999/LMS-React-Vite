import React from "react";
import BootstrapSpinner from "@src/Components/BootstrapSpinner";

const Loader = ({ isLoading }) => {
    if (!isLoading) return null;
    return (
        <BootstrapSpinner />
        // <div
        //     id="loader"
        //     className="d-flex justify-content-center align-items-center flex-column"
        // >
        //     <img
        //         src="https://react-pdf.org/images/logo.png"
        //         alt="loader"
        //         className="mb-5 App-logo"
        //     />
        //     <p>Loading...</p>
        // </div>
    );
};

export default Loader;
