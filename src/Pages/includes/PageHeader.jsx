import React from "react";

function PageHeader(props) {
    return (
        <>
            {/* Header Start */}
            <div className="container-fluid bg-primary py-4 mb-4 page-header">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10 text-center">
                            <h1 className="display-3 text-white animated slideInDown">
                                {props.title}
                            </h1>
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
            {/* Header End */}
        </>
    );
}

export default PageHeader;
