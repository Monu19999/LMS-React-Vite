import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCourses } from "@src/features/app/CourseSlice";
import { getHomeData } from "@src/features/app/HomeSlice";
import { resetSearch } from "@src/features/app/CourseSlice";
import parse from "html-react-parser";
import OwlCarousel from "react-owl-carousel";
import FooterSlider from "@src/Components/Layout/includes/FooterSlider";
import BootstrapSpinner from "@src/Components/BootstrapSpinner";
import ShowImage from "@src/Utilities/ShowImage";
import CourseItem from "@src/Pages/courses/includes/CourseItem";

export default function Home() {
    const { homedata, home_loading } = useSelector((state) => state.home);
    const { courses, course_loading } = useSelector((state) => state.course);

    //   console.log(courses);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getHomeData());
        dispatch(getCourses());
    }, []);

    function createLink(item) {
        if (item.menu_type == 1) {
            return item.page ? "page/" + item.page.slug : "/";
        } else if (item.menu_type == 2) {
            return item.db_controller_route
                ? item.db_controller_route.route
                : "/";
        } else if (item.menu_type == 3) {
            return item.custom_url;
        } else {
            return "#";
        }
    }

    const slider_options = {
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>',
        ],
    };

    const course_options = {
        autoplay: true,
        smartSpeed: 1000,
        autoplayHoverPause: true,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav: false,
        responsive: {
            0: {
                items: 1,
            },
            768: {
                items: 2,
                startPosition: 1,
            },
            992: {
                items: 3,
                startPosition: 1,
            },
        },
    };

    return (
        <>
            {/* hero slider */}
            {/* Carousel Start */}
            {/* {isLoading && <BootstrapSpinner />} */}
            {homedata.sliders && (
                <div className="container-fluid p-0 mb-5">
                    <OwlCarousel
                        {...slider_options}
                        className="owl-carousel header-carousel position-relative"
                    >
                        {homedata.sliders.map((slider) => {
                            return (
                                <div
                                    className="owl-carousel-item position-relative"
                                    key={slider.id}
                                >
                                    <img
                                        className="img-fluid"
                                        src={
                                            slider?.upload
                                                ? ShowImage(
                                                      slider.upload.file_path
                                                  )
                                                : ""
                                        }
                                        alt={
                                            slider?.upload
                                                ? slider.upload.original_name
                                                : ""
                                        }
                                    />
                                    <div
                                        className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center"
                                        style={{
                                            background: "rgba(24, 29, 56, .7)",
                                        }}
                                    >
                                        <div className="container">
                                            <div className="row justify-content-start">
                                                <div className="col-sm-10 col-lg-8">
                                                    <h1 className="display-4 text-white animated slideInDown mb-4">
                                                        {slider.title_en}
                                                    </h1>
                                                    <a
                                                        href={createLink(
                                                            slider
                                                        )}
                                                        className="btn btn-primary py-md-2 px-md-4 me-3 animated slideInLeft"
                                                        style={{
                                                            borderRadius: 40,
                                                        }}
                                                    >
                                                        Read More
                                                    </a>
                                                    {/* <a
                                                        href="index.html"
                                                        className="btn btn-light py-md-2 px-md-4 animated slideInRight"
                                                        style={{
                                                            borderRadius: 40,
                                                        }}
                                                    >
                                                        Enroll Now
                                                    </a> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </OwlCarousel>
                </div>
            )}
            {/* Carousel End */}
            <div className="container mb-4" id="quickInformation">
                <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                    <h1>Quick Information</h1>
                </div>
                <div className="row">
                    <div
                        className="four col-md-6 col-lg-3  wow fadeInUp"
                        data-wow-delay="0.1s"
                    >
                        <div className="counter-box ">
                            <span className="counter">
                                {homedata.department_onboarded_count
                                    ? homedata.department_onboarded_count
                                    : 0}
                            </span>
                            <p>Total Departments Onboarded</p>
                        </div>
                    </div>
                    <div
                        className="four col-md-6 col-lg-3 wow zoomIn"
                        data-wow-delay="0.3s"
                    >
                        <div className="counter-box">
                            <span className="counter">
                                {homedata.courses_enrolled
                                    ? homedata.courses_enrolled
                                    : 0}
                            </span>
                            <p>Available Courses</p>
                        </div>
                    </div>
                    <div
                        className="four col-md-6 col-lg-3 wow zoomIn"
                        data-wow-delay="0.3s"
                    >
                        <div className="counter-box">
                            <span className="counter">
                                {homedata.registered_users
                                    ? homedata.registered_users
                                    : 0}
                            </span>
                            <p>Total Users Registered</p>
                        </div>
                    </div>
                    <div
                        className="four col-md-6 col-lg-3 wow zoomIn"
                        data-wow-delay="0.3s"
                    >
                        <div className="counter-box">
                            {" "}
                            <span className="counter">0</span>
                            <p>Total Certification Courses</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* About Start */}
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
                                    src="assets/img/e-book1.png"
                                    alt="e-book1.png"
                                    style={{ objectFit: "cover" }}
                                />
                            </div>
                        </div>
                        {homedata?.page && (
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
                                    <h1 className="mb-2">
                                        {homedata.page.title_en}
                                    </h1>
                                    <div className="mb-2">
                                        {parse(homedata.page.description_en)}
                                    </div>
                                    <a
                                        className="btn btn-primary py-2 px-4 mt-2"
                                        href="#"
                                        style={{ borderRadius: 40 }}
                                        onClick={() => {
                                            resetSearch();
                                            navigate(
                                                "page/" + homedata.page.slug
                                            );
                                        }}
                                    >
                                        Find out more
                                        <i
                                            className="fas fa-arrow-alt-circle-right"
                                            style={{ marginLeft: 10 }}
                                        />
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* About End */}
            {/* Categories Start */}
            <div
                className="container-fluid py-5 category"
                style={{
                    backgroundColor: "#eef4f5",
                    paddingLeft: 0,
                    paddingRight: 0,
                }}
            >
                <div className="container">
                    <div
                        className="text-center wow fadeInUp"
                        data-wow-delay="0.1s"
                    >
                        <h1 className="mb-5">Onboarded Departments</h1>
                    </div>
                    <div className="row">
                        {/* {isLoading && <BootstrapSpinner />} */}
                        {homedata.onboarded_departments &&
                            homedata.onboarded_departments.map(
                                (onboarded_department) => {
                                    return (
                                        <div
                                            className="col-xs-12 col-md-6 col-lg-3 mb-4"
                                            key={onboarded_department.id}
                                        >
                                            <div className="thumbnail">
                                                <div className="thumb-logo">
                                                    <img
                                                        src="assets/img/logo.png"
                                                        alt="logo.png"
                                                        style={{
                                                            height: "70px",
                                                        }}
                                                    />

                                                    <Link
                                                        to={`/courses?department=${onboarded_department.encr_id}_${onboarded_department.id}`}
                                                    >
                                                        <h4 className="mt-2">
                                                            {
                                                                onboarded_department.title_en
                                                            }
                                                        </h4>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                            )}
                    </div>
                </div>
            </div>
            {/* Categories Start */}
            {/* Courses Start */}
            <div className="container-xxl py-5">
                <div className="container ">
                    <div
                        className="text-center wow fadeInUp"
                        data-wow-delay="0.1s"
                    >
                        <h1 className="mb-5">Available Courses</h1>
                    </div>
                    {course_loading ? (
                        <BootstrapSpinner />
                    ) : (
                        <OwlCarousel
                            className="owl-carousel courses-carousel position-relative"
                            {...course_options}
                        >
                            {courses?.data &&
                                courses.data.length >= 0 &&
                                courses.data.map((course) => {
                                    return (
                                        <div
                                            className="owl-carousel-item active"
                                            key={course.id}
                                        >
                                            <div
                                                className="wow fadeInUp"
                                                data-wow-delay="0.1s"
                                            >
                                                <CourseItem
                                                    course={course}
                                                    upload={
                                                        course.course.upload
                                                    }
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                        </OwlCarousel>
                    )}
                    <div className="col-12 text-center">
                        <Link
                            className="btn btn-primary py-2 px-4 mt-4"
                            to="/courses"
                            style={{ borderRadius: 40 }}
                        >
                            Find out more{" "}
                            <i
                                className="fas fa-arrow-alt-circle-right"
                                style={{ marginLeft: 10 }}
                            />
                        </Link>
                    </div>
                </div>
            </div>
            {/* Courses End */}

            <FooterSlider />
        </>
    );
}
