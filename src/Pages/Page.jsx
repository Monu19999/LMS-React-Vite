import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "@src/Hooks/useFetch";
import BootstrapSpinner from "@src/Components/BootstrapSpinner";
import parse from "html-react-parser";
import api from "@src/apis/api";
import image from "@public/assets/img/e-book.png";

function Page() {
    let { page } = useParams();
    const { isLoading, serverError, apiData } = useFetch(
        "GET",
        api("page", page),
        {}
    );
    // `http://localhost:8000/api/page/${page}/show`,
    return (
        <>
            {isLoading && <BootstrapSpinner />}
            {apiData?.data ? (
                <>
                    <div className="container-fluid bg-primary py-4 mb-5 page-header">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-10 text-center">
                                    <h1 className="display-3 text-white animated slideInDown">
                                        {apiData?.data.page.title_en}
                                    </h1>
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb justify-content-center">
                                            <li className="breadcrumb-item">
                                                <a
                                                    className="text-white"
                                                    href="#"
                                                >
                                                    Home
                                                </a>
                                            </li>
                                            <li className="breadcrumb-item">
                                                <a
                                                    className="text-white"
                                                    href="#"
                                                >
                                                    Pages
                                                </a>
                                            </li>
                                            <li
                                                className="breadcrumb-item text-white active"
                                                aria-current="page"
                                            >
                                                {apiData?.data.page.title_en}
                                            </li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container-xxl py-5">
                        <div className="container">
                            <div className="row g-5">
                                <div
                                    className="col-lg-6 wow fadeInUp"
                                    data-wow-delay="0.1s"
                                    style={{ minHeight: 400 }}
                                >
                                    <div className="position-relative h-100">
                                        <img
                                            className="img-fluid position-absolute w-100 h-100"
                                            src={image}
                                            alt={apiData?.data.page.title_en}
                                            style={{ objectFit: "cover" }}
                                        />
                                    </div>
                                </div>
                                <div
                                    className="col-lg-6 wow fadeInUp"
                                    data-wow-delay="0.3s"
                                    style={{ display: "table" }}
                                >
                                    <div
                                        style={{
                                            verticalAlign: "middle",
                                            display: "table-cell",
                                        }}
                                    >
                                        <h6 className="section-title bg-white text-start text-primary pe-3">
                                            {apiData?.data.page.title_en}
                                        </h6>
                                        {/* <h1 className="mb-4">Welcome to e-Shiksha</h1> */}
                                        <p className="mb-4">
                                            {apiData?.data
                                                ? parse(
                                                      apiData.data.page
                                                          .description_en
                                                  )
                                                : ""}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                ""
            )}
        </>
    );
}

export default Page;
