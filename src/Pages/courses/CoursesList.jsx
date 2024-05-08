import React, { useEffect, useState } from "react";
import CourseItem from "@src/Pages/courses/includes/CourseItem";
import { useSelector, useDispatch } from "react-redux";
import { getCourses } from "@src/features/app/CourseSlice";
import Pagination from "@src/Utilities/Pagination";
import BootstrapSpinner from "@src/Components/BootstrapSpinner";
import { getDepartments } from "@src/features/app/AppSlice";
import { setSearch, resetSearch } from "@src/features/app/CourseSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getSearchCourses } from "@src/features/app/CourseSlice";

function CoursesList() {
    const navigate = useNavigate();

    const { departments, app_loading } = useSelector((state) => state.app);

    const { search_courses, courses, course_loading, search } = useSelector(
        (state) => state.course
    );

    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();

    // For fetching departments in app slice
    useEffect(() => {
        dispatch(getDepartments());
    }, []);

    useEffect(() => {
        let search = {};
        for (const entry of searchParams.entries()) {
            const [param, value] = entry;
            search[param] = value;
        }
        if (Object.values(search).length > 0) {
            dispatch(setSearch(search));
        }
        dispatch(getSearchCourses(navigate));
    }, []);

    let handleFormFilter = (e) => {
        e.preventDefault();
        dispatch(getSearchCourses(navigate));
    };

    let handleFormFilterOnChange = (e) => {
        dispatch(
            setSearch({
                ...search,
                [e.target.name]: e.target.value,
                page: null,
            })
        );
    };

    function changePage(data) {
        dispatch(setSearch({ ...search, page: data.page }));
        dispatch(getSearchCourses(navigate));
    }

    return (
        <>
            {/* Header Start */}
            <div className="container-fluid bg-primary py-4 mb-4 page-header">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10 text-center">
                            <h1 className="display-3 text-white animated slideInDown">
                                Courses
                            </h1>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb justify-content-center">
                                    <li className="breadcrumb-item">
                                        <a className="text-white" href="#">
                                            Home
                                        </a>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <a className="text-white" href="#">
                                            Pages
                                        </a>
                                    </li>
                                    <li
                                        className="breadcrumb-item text-white active"
                                        aria-current="page"
                                    >
                                        Courses
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            {/* Header End */}
            <div className="container-xxl ">
                <div className="container">
                    <div className="row mb-4">
                        {/* Print Button Start */}
                        <div className="innertitle d-flex justify-content-end mb-4 p-0">
                            <a
                                href="#"
                                className="btn btn-primary btn-sm pull-right"
                            >
                                <span className="fa fa-print"> Print</span>
                            </a>
                        </div>
                        {/* Print Button End */}
                        {/* Search Form Start */}
                        <div className="col-12">
                            <div
                                className="wow fadeInUp"
                                data-wow-delay="0.1s"
                                style={{
                                    visibility: "visible",
                                    animationDelay: "0.1s",
                                    animationName: "fadeInUp",
                                }}
                            >
                                <h4>Search Course</h4>
                            </div>
                        </div>
                        <div
                            className="col-lg-12 wow fadeInUp"
                            style={{ backgroundColor: "#06bbcc" }}
                        >
                            <div className="search-title">
                                <form onSubmit={handleFormFilter}>
                                    <div className="row">
                                        <div className="col-md-5">
                                            <div className="form-group">
                                                <label>Department</label>
                                                <select
                                                    name="department"
                                                    id="department"
                                                    className="form-control"
                                                    onChange={
                                                        handleFormFilterOnChange
                                                    }
                                                    value={search.department}
                                                >
                                                    <option value="">
                                                        Please Select
                                                    </option>
                                                    {departments &&
                                                        departments.map(
                                                            (department) => {
                                                                return (
                                                                    <option
                                                                        value={
                                                                            department.id
                                                                        }
                                                                        key={
                                                                            department.id
                                                                        }
                                                                    >
                                                                        {
                                                                            department.title_en
                                                                        }
                                                                    </option>
                                                                );
                                                            }
                                                        )}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>
                                                    Search By Course Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="course_name"
                                                    id="course_name"
                                                    autoComplete="off"
                                                    value={search.course_name}
                                                    onChange={
                                                        handleFormFilterOnChange
                                                    }
                                                    className="form-control"
                                                    placeholder="Search By Title"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group mt-28">
                                                <br />
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
                                                    name="search-all"
                                                    id="search-all"
                                                    onClick={() =>
                                                        dispatch(resetSearch())
                                                    }
                                                >
                                                    <i className="fas fa-refresh" />{" "}
                                                    Reset
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {/* Search Form End */}
                    </div>

                    {/* All searched Courses Start */}
                    <div className="container-xxl py-5">
                        <div className="container ">
                            <div
                                className="text-center wow fadeInUp"
                                data-wow-delay="0.1s"
                            >
                                <h1 className="mb-5">All Courses</h1>
                            </div>
                            <div className="row">
                                {course_loading ? (
                                    <BootstrapSpinner />
                                ) : (
                                    search_courses?.courses?.data &&
                                    search_courses?.courses?.data.map((course) => {
                                        return (
                                            <div
                                                className="col-lg-4 col-md-6 mb-4"
                                                key={course.id}
                                            >
                                                <CourseItem course={course} />
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </div>
                    {/* All searched Courses Start */}

                    {/* Searched Courses Pagination Start */}
                    <div className="row mb-4 ">
                        <div className="col-12 text-center">
                            <Pagination
                                changePage={changePage}
                                data={courses.courses}
                            />
                            {/* <ul className="pagination pagination-lg d-flex justify-content-center">
                                <li className="page-item">
                                    <a
                                        className="page-link"
                                        href="#"
                                        aria-label="Previous"
                                    >
                                        «
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#">
                                        1
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link " href="#">
                                        2
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#">
                                        3
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#">
                                        4
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#">
                                        5
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#">
                                        6
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#">
                                        7
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#">
                                        8
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#">
                                        9
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a
                                        className="page-link"
                                        href="#"
                                        aria-label="Next"
                                    >
                                        »
                                    </a>
                                </li>
                            </ul> */}
                        </div>
                    </div>
                    {/* Searched Courses Pagination End */}
                </div>
            </div>
        </>
    );
}

export default CoursesList;
