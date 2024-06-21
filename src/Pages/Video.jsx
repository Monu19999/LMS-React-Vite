import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import api from "@src/apis/api";

function Video() {
    const [filteredContent, setFilteredContent] = useState([]);
    const [videos, setVideos] = useState([]);

    const fetchVideosLink = async () => {
        try {
            const res = await fetch(api("video_contents"), {
                mode: "cors",
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            console.log(data.data.video_content);
            setVideos(data);
            setFilteredContent(data.data.video_content);
            console.log(filteredContent);
        } catch (error) {
            console.error("Failed to fetch video contents:", error);
        }
    };

    useEffect(() => {
        fetchVideosLink();
    }, []);

    const {
        register,
        handleSubmit,
        getValues,
        reset,
        formState: { errors },
    } = useForm();

    const handleFormFilter = () => {
        const title = getValues().title.toLowerCase();
        const updatedContent = videos.data.video_content.filter((item) =>
            item.title_en.toLowerCase().includes(title)
        );
        setFilteredContent(updatedContent);
        // console.log(filteredContent)
    };

    const handleResetSearch = () => {
        reset();
        setFilteredContent([]);
    };

    return (
        <>
            {/* Header Start */}
            <div className="container-fluid bg-primary py-4 mb-4 page-header">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10 text-center">
                            <h1 className="display-3 text-white animated slideInDown">
                                Video
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-xxl">
                <div className="row mb-4">
                    <div
                        className="col-lg-12 wow fadeInUp"
                        style={{ backgroundColor: "#06bbcc" }}
                    >
                        <div className="search-title">
                            {/* Search Form Start */}
                            <form onSubmit={handleSubmit(handleFormFilter)}>
                                <div className="row justify-content-center">
                                    <div className="col-md-6 row mt-3">
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                autoComplete="off"
                                                {...register("title", {
                                                    required:
                                                        "Title is required.",
                                                })}
                                                className="form-control"
                                                placeholder="Search By Title"
                                            />
                                        </div>
                                        {errors.title && (
                                            <p className="errorMsg">
                                                {errors.title.message}
                                            </p>
                                        )}
                                    </div>
                                    <div className="col-md-6 mb-2">
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
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <table className="table table-striped align-items-center justify-content-center">
                                <thead>
                                    <tr>
                                        <th scope="col">S.No</th>
                                        <th scope="col" className="px-5">
                                            Name
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredContent?.map((item, index) => (
                                        <tr key={index}>
                                            <th scope="row">{item.id}</th>
                                            <td>
                                                <a
                                                    href={item.video_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {item.title_en}
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Video;
