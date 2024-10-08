import React, { useEffect, useState } from "react";
import CourseItem from "@src/Pages/courses/includes/CourseItem";
import { useSelector, useDispatch } from "react-redux";
import { getSearchCourses } from "@src/features/app/CourseSlice";
import Pagination from "@src/Utilities/Pagination";
import BootstrapSpinner from "@src/Components/BootstrapSpinner";
import { getDepartments } from "@src/features/app/AppSlice";
import { setSearch } from "@src/features/app/CourseSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Col, Container, Row } from "react-bootstrap";

function Courses() {
    const { departments } = useSelector((state) => state.app);
    const { course_loading, search, search_courses } = useSelector(
        (state) => state.course
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: search,
    });

    // For fetching departments in app slice
    useEffect(() => {
        dispatch(getDepartments());

        let search_params = {};
        for (const entry of searchParams.entries()) {
            const [param, value] = entry;
            search_params[param] = value;
        }
        if (Object.values(search_params).length > 0) {
            dispatch(setSearch({ ...search, ...search_params }));
            reset({ ...search, ...search_params });
        }
        // console.log("search_params => ", search_params);
        // if (search.hasOwnProperty("department")) {
        //     let id = search.department.split("_")[1];
        //     const filteredOffices =
        //         departments.find((dep) => dep.id === parseInt(id))?.offices ||
        //         [];
        //     console.log("filteredOffices => ", filteredOffices);
        //     setDepartmentoffices(filteredOffices);
        // }
        dispatch(getSearchCourses(navigate));
    }, []);

    let handleFormFilter = (e) => {
        // e.preventDefault();
        dispatch(getSearchCourses(navigate));
    };

    let handleFormFilterOnChange = (e) => {
        let value = "";
        if (e.target.name === "department" || e.target.name === "office") {
            const encrId =
                e.target.selectedOptions[0].getAttribute("data-encr_id");
            const departmentId = e.target.value;
            if (encrId) {
                value = encrId + "_" + departmentId;
            } else {
                value = null;
            }
        } else {
            value = e.target.value;
        }

        let updated_search = {
            ...search,
            [e.target.name]: value,
            page: null,
        };

        dispatch(setSearch(updated_search));
    };

    function changePage(data) {
        dispatch(setSearch({ ...search, page: data.page }));
        dispatch(getSearchCourses(navigate));
    }

    function handleResetSearch() {
        const copy_search = { ...search };
        Object.keys(copy_search).forEach(
            (value) => (copy_search[value] = null)
        );
        dispatch(setSearch(copy_search));
        reset(copy_search);
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
            <div className="container-xxl mb-4 pb-4">
                <Container className="shadow">
                    <Row className="mb-4">
                        {/* <div className="col-12" style={{ backgroundColor: "#06bbcc" }}>
                            <div className="d-flex justify-content-center pt-4">
                                <h4>Search Course</h4>
                            </div>
                        </div> */}
                        <Col
                            lg={12}
                            className="wow fadeInUp inner-page-container-mb"
                            style={{ backgroundColor: "#06bbcc" }}
                        >
                            <div className="search-title">
                                {/* Search Form Start */}
                                <form onSubmit={handleSubmit(handleFormFilter)}>
                                    <div className="row justify-content-center">
                                        <div className="col-md-6 mb-2">
                                            <div className="form-group">
                                                <label>Department</label>
                                                <select
                                                    className="form-control"
                                                    {...register("department", {
                                                        onChange:
                                                            handleFormFilterOnChange,
                                                    })}
                                                    value={
                                                        search.department
                                                            ? search.department.split(
                                                                  "_"
                                                              )[1]
                                                            : null
                                                    }
                                                >
                                                    <option
                                                        value={null}
                                                        data-encr_id={null}
                                                        selected
                                                    >
                                                        Please Select
                                                    </option>
                                                    {departments &&
                                                        departments.map(
                                                            (department) => (
                                                                <option
                                                                    data-encr_id={
                                                                        department.encr_id
                                                                    }
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
                                                            )
                                                        )}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Office</label>
                                                <select
                                                    className="form-control"
                                                    {...register("office", {
                                                        onChange: (e) => {
                                                            handleFormFilterOnChange(
                                                                e
                                                            );
                                                        },
                                                    })}
                                                    value={
                                                        search.office &&
                                                        search.office.split(
                                                            "_"
                                                        )[1]
                                                    }
                                                >
                                                    <option
                                                        value={null}
                                                        data-encr_id={null}
                                                    >
                                                        Please Select
                                                    </option>
                                                    {search.department &&
                                                        departments
                                                            .find(
                                                                (
                                                                    department
                                                                ) => {
                                                                    return (
                                                                        department.id ===
                                                                        parseInt(
                                                                            search.department.split(
                                                                                "_"
                                                                            )[1]
                                                                        )
                                                                    );
                                                                }
                                                            )
                                                            ?.offices.map(
                                                                (office) => (
                                                                    <option
                                                                        data-encr_id={
                                                                            office.encr_id
                                                                        }
                                                                        value={
                                                                            office.id
                                                                        }
                                                                        key={
                                                                            office.id
                                                                        }
                                                                    >
                                                                        {
                                                                            office.title_en
                                                                        }
                                                                    </option>
                                                                )
                                                            )}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-2">
                                            <div className="form-group">
                                                <label>
                                                    Search By Course Name
                                                </label>
                                                <input
                                                    type="text"
                                                    autoComplete="off"
                                                    {...register(
                                                        "course_name",
                                                        {
                                                            onChange: (e) => {
                                                                handleFormFilterOnChange(
                                                                    e
                                                                );
                                                            },
                                                        }
                                                    )}
                                                    className="form-control"
                                                    placeholder="Search By Title"
                                                />
                                            </div>
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
                        </Col>
                    </Row>

                    {/* All searched Courses Start */}
                    <div className="container-xxl py-5">
                        <Container>
                            <div
                                className="text-center wow fadeInUp"
                                data-wow-delay="0.1s"
                            >
                                <h1 className="mb-5">All Courses</h1>
                            </div>
                            <Row>
                                {course_loading ? (
                                    <BootstrapSpinner />
                                ) : (
                                    search_courses?.data &&
                                    search_courses.data.map((course) => {
                                        return (
                                            <Col
                                                lg={4}
                                                md={6}
                                                className="mb-4"
                                                key={course.id}
                                            >
                                                <CourseItem
                                                    course={course}
                                                    upload={
                                                        course.course.upload
                                                    }
                                                />
                                            </Col>
                                        );
                                    })
                                )}
                            </Row>
                        </Container>
                    </div>
                    {/* All searched Courses Start */}

                    {/* Searched Courses Pagination Start */}
                    <Row className="justify-content-center mb-4 ">
                        <Col md={12} className="text-center">
                            <Pagination
                                changePage={changePage}
                                data={search_courses}
                            />
                        </Col>
                    </Row>
                    {/* Searched Courses Pagination End */}
                </Container>
            </div>
        </>
    );
}

export default Courses;
