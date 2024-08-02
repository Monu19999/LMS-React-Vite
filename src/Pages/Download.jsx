import React, { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import api from "@src/apis/api";
import PageHeader from "@src/Pages/includes/PageHeader";
import { Link, useLoaderData } from "react-router-dom";

export async function loader() {
    const res = await fetch(api("download_contents"), {
        mode: "cors",
        method: "get",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    const downloads = await res.json();
    return { downloads };
}

export function Download() {
    const [filteredContent, setFilteredContent] = useState([]);
    const { downloads } = useLoaderData();

    const {
        register,
        handleSubmit,
        getValues,
        reset,
        formState: { errors },
    } = useForm();

    const handleFormFilter = () => {
        const title = getValues().title.toLowerCase().trim();
        const updatedContent = downloads.data.download_content.filter((item) =>
            item.title_en.toLowerCase().includes(title)
        );
        setFilteredContent(updatedContent);
    };

    const handleResetSearch = () => {
        reset();
        setFilteredContent(downloads.data.download_content);
    };

    const fetchVideoContents = async () => {
        try {
            const res = await fetch(api("download_contents"), {
                mode: "cors",
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const json = await res.json();
            setFilteredContent(json.data.download_content);
            setDownloads(json.data.download_content);
            // console.log(filteredContent)
        } catch (error) {
            console.error("Failed to fetch video contents:", error);
        }
    };

    useEffect(() => {
        setFilteredContent(downloads.data.download_content);
        // setDownloads(downloads.data.download_content);
    }, [downloads]);
    return (
        <>
            <PageHeader title="Download">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb justify-content-center">
                        <li className="breadcrumb-item">
                            <Link className="text-white" to="/">
                                Home
                            </Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link className="text-white" to="/download">
                                Downloads
                            </Link>
                        </li>
                    </ol>
                </nav>
            </PageHeader>
            <div className="container-xxl" style={{ minHeight:"450px"}}>
                <div className="container shadow inner-page-container-mb " >
                    <div className="row mb-4">
                        <div
                            className="col-lg-12 wow fadeInUp mb-4"
                            style={{ backgroundColor: "#06bbcc" }}
                        >
                            <div className="search-title">
                                {/* Search Form Start */}
                                <form onSubmit={handleSubmit(handleFormFilter)}>
                                    <div className="row justify-content-center">
                                        <div className="col-lg-8 col-md-6 mt-3">
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    autoComplete="off"
                                                    {...register("title")}
                                                    className="form-control"
                                                    placeholder="Search By Title"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6 mb-2">
                                            <div className="form-group mt-4">
                                                <button
                                                    className="btn btn-dark py-md-2 px-md-4 animated slideInRight"
                                                    style={{
                                                        borderRadius: 40,
                                                        marginRight: 20,
                                                    }}
                                                    type="submit"
                                                >
                                                    Search
                                                </button>
                                                <button
                                                    className="btn btn-light py-md-2 px-md-4 animated slideInRight"
                                                    style={{ borderRadius: 40 }}
                                                    type="button"
                                                    onClick={handleResetSearch}
                                                >
                                                    <i className="fas fa-refresh" />{" "}
                                                    Reset
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                {/* Search Form End */}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="container mb-4">
                            <div className="row">
                                <div className="col-12 mb-4">
                                    <div className="table-responsive">
                                    <table className="table table-striped table-bordered table-hover align-items-center justify-content-center">
                                        <thead class="thead-dark">
                                            <tr>
                                                <th style={{width:"5%"}}>S No.</th>
                                                <th style={{width:"75%"}}>
                                                    Title
                                                </th>
                                                <th style={{width:"20%"}}>Download</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredContent?.map(
                                                (item, index) => (
                                                    <tr key={index}>
                                                        <th scope="row">
                                                            {index + 1}
                                                        </th>
                                                        <td >
                                                            {item.title_en}
                                                        </td>
                                                        <td>
                                                            <a
                                                                href={
                                                                    item?.upload
                                                                        .download_path
                                                                }
                                                                download={true}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                <i className="bi bi-cloud-arrow-down fa-lg"></i>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Download;
