import React from "react";
import OwlCarousel from "react-owl-carousel";
import FooterSlider from "@src/Pages/includes/FooterSlider";
import api from "@src/apis/api";
import useFetch from "@src/Hooks/useFetch";
import BootstrapSpinner from "@src/Components/BootstrapSpinner";

export default function Home() {
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
            },
            992: {
                items: 3,
            },
        },
    };
    const { isLoading, serverError, apiData } = useFetch(
        "GET",
        api("home"),
        {}
    );
    return (
        <>
            {/* hero slider */}
            {/* Carousel Start */}
            <div className="container-fluid p-0 mb-5">
                <OwlCarousel
                    {...slider_options}
                    className="owl-carousel header-carousel position-relative"
                >
                    <div className="owl-carousel-item position-relative">
                        <img
                            className="img-fluid"
                            src="assets/img/carousel-1.jpg"
                            alt="carousel-1.jpg"
                        />
                        <div
                            className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center"
                            style={{ background: "rgba(24, 29, 56, .7)" }}
                        >
                            <div className="container">
                                <div className="row justify-content-start">
                                    <div className="col-sm-10 col-lg-8">
                                        {/* <h5 class="text-primary text-uppercase mb-3 animated slideInDown">
                                            e-Shiksha{" "}
                                        </h5> */}
                                        <h1 className="display-4 text-white animated slideInDown mb-4">
                                            {" "}
                                            Learning Management System
                                        </h1>
                                        <a
                                            href="index.html"
                                            className="btn btn-primary py-md-2 px-md-4 me-3 animated slideInLeft"
                                            style={{ borderRadius: 40 }}
                                        >
                                            Read More
                                        </a>
                                        <a
                                            href="index.html"
                                            className="btn btn-light py-md-2 px-md-4 animated slideInRight"
                                            style={{ borderRadius: 40 }}
                                        >
                                            Enroll Now
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="owl-carousel-item position-relative">
                        <img
                            className="img-fluid"
                            src="assets/img/carousel-2.jpg"
                            alt="carousel-2.jpg"
                        />
                        <div
                            className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center"
                            style={{ background: "rgba(24, 29, 56, .7)" }}
                        >
                            <div className="container">
                                <div className="row justify-content-start">
                                    <div className="col-sm-10 col-lg-8">
                                        <h1 className="display-4 text-white animated slideInDown mb-4">
                                            Learning Management System
                                        </h1>
                                        <a
                                            href="index.html"
                                            className="btn btn-primary py-md-2 px-md-4 me-3 animated slideInLeft"
                                            style={{ borderRadius: 40 }}
                                        >
                                            Read More
                                        </a>
                                        <a
                                            href="index.html"
                                            className="btn btn-light py-md-2 px-md-4 animated slideInRight"
                                            style={{ borderRadius: 40 }}
                                        >
                                            Enroll Now
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </OwlCarousel>
            </div>
            {/* Carousel End */}
            <div className="container mb-4">
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
                                {apiData?.data?.department_onboarded_count
                                    ? apiData.data.department_onboarded_count
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
                                {apiData?.data?.courses_enrolled
                                    ? apiData.data.courses_enrolled
                                    : 0}
                            </span>
                            <p>Courses Enrolled </p>
                        </div>
                    </div>
                    <div
                        className="four col-md-6 col-lg-3 wow zoomIn"
                        data-wow-delay="0.3s"
                    >
                        <div className="counter-box">
                            <span className="counter">
                                {apiData?.data?.registered_users
                                    ? apiData.data.registered_users
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
                            <span className="counter">350</span>
                            <p>Total Certification</p>
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
                                <h1 className="mb-4">Welcome to e-Shiksha</h1>
                                <p className="mb-4">
                                    eShiksha is an education management portal
                                    which simplifies the management and provides
                                    enormous facilities to an Institute. Our
                                    portal assists educators to manage, analyze
                                    and report extensive data, while making your
                                    institutes management "A cashless and
                                    paperless management".{" "}
                                </p>
                                <a
                                    className="btn btn-primary py-2 px-4 mt-2"
                                    href="index.html"
                                    style={{ borderRadius: 40 }}
                                >
                                    Find out more
                                    <i
                                        className="fas fa-arrow-alt-circle-right"
                                        style={{ marginLeft: 10 }}
                                    />
                                </a>
                            </div>
                        </div>
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
                        {isLoading && <BootstrapSpinner />}
                        {apiData?.data?.department_onboarded &&
                            apiData.data.department_onboarded.map(
                                (department_onboarded) => {
                                    return (
                                        <div
                                            className="col-xs-12 col-md-6 col-lg-3 mb-4"
                                            key={department_onboarded.id}
                                        >
                                            <div className="thumbnail">
                                                <div className="thumb-logo">
                                                    <img
                                                        src="assets/img/logo.png"
                                                        alt="logo.png"
                                                        style={{ height: 70 }}
                                                    />
                                                    <h4 className="mt-2">
                                                        {
                                                            department_onboarded.title_en
                                                        }
                                                    </h4>
                                                </div>
                                                <div className="caption">
                                                    <img
                                                        src="assets/img/logo.png"
                                                        alt="logo.png"
                                                        style={{ height: 70 }}
                                                    />
                                                    <h4 className="mt-2">
                                                        {
                                                            department_onboarded.title_en
                                                        }
                                                    </h4>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                            )}
                        {/* <div className="col-xs-12 col-md-6 col-lg-3 mb-4">
                            <div className="thumbnail">
                                <div className="thumb-logo">
                                    <img
                                        src="/assets/img/logo.png"
                                        alt="logo.png"
                                        style={{ height: 70 }}
                                    />
                                    <h4 className="mt-2">MAP_IT - TCU</h4>
                                </div>
                                <div className="caption">
                                    <img
                                        src="/assets/img/logo.png"
                                        alt="logo.png"
                                        style={{ height: 70 }}
                                    />
                                    <h4 className="mt-2">MAP_IT - TCU</h4>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-6 col-lg-3 mb-4">
                            <div className="thumbnail">
                                <div className="thumb-logo">
                                    <img
                                        src="/assets/img/departments/iti.jpg"
                                        alt="iti.jpg"
                                        style={{ height: 70 }}
                                    />
                                    <h4 className="mt-2">Skill Development</h4>
                                </div>
                                <div className="caption">
                                    <img
                                        src="/assets/img/departments/iti.jpg"
                                        alt="iti.jpg"
                                        style={{ height: 70 }}
                                    />
                                    <h4 className="mt-2">Skill Development</h4>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-6 col-lg-3 mb-4">
                            <div className="thumbnail">
                                <div className="thumb-logo">
                                    <img
                                        src="/assets/img/departments/phq.png"
                                        alt="phq.png"
                                        style={{ height: 70 }}
                                    />
                                    <h4 className="mt-2">
                                        Police Head Quarters
                                    </h4>
                                </div>
                                <div className="caption">
                                    <img
                                        src="/assets/img/departments/phq.png"
                                        alt="phq.png"
                                        style={{ height: 70 }}
                                    />
                                    <h4 className="mt-2">
                                        Police Head Quarters
                                    </h4>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-6 col-lg-3 mb-4">
                            <div className="thumbnail">
                                <div className="thumb-logo">
                                    <img
                                        src="/assets/img/departments/mptaas.png"
                                        alt="mptaas.png"
                                        style={{ height: 70 }}
                                    />
                                    <h4 className="mt-2">MP-TAAS</h4>
                                </div>
                                <div className="caption">
                                    <img
                                        src="/assets/img/departments/mptaas.png"
                                        alt="mptaas.png"
                                        style={{ height: 70 }}
                                    />
                                    <h4 className="mt-2">MP-TAAS</h4>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-6 col-lg-3 mb-4">
                            <div className="thumbnail">
                                <div className="thumb-logo">
                                    <img
                                        src="/assets/img/departments/epco.jpg"
                                        alt="epco.jpg"
                                        style={{ height: 70 }}
                                    />
                                    <h4 className="mt-2">EPCO</h4>
                                </div>
                                <div className="caption">
                                    <img
                                        src="/assets/img/departments/epco.jpg"
                                        alt="epco.jpg"
                                        style={{ height: 70 }}
                                    />
                                    <h4 className="mt-2">EPCO</h4>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-6 col-lg-3 mb-4">
                            <div className="thumbnail">
                                <div className="thumb-logo">
                                    <img
                                        src="/assets/img/logo.png"
                                        alt="logo.png"
                                        style={{ height: 70 }}
                                    />
                                    <h4 className="mt-2">Higher Education</h4>
                                </div>
                                <div className="caption">
                                    <img
                                        src="/assets/img/logo.png"
                                        alt="logo.png"
                                        style={{ height: 70 }}
                                    />
                                    <h4 className="mt-2">Higher Education</h4>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-6 col-lg-3 mb-4">
                            <div className="thumbnail">
                                <div className="thumb-logo">
                                    <img
                                        src="/assets/img/departments/dmi.png"
                                        alt="dmi.png"
                                        style={{ height: 70 }}
                                    />
                                    <h4 className="mt-2">DMI</h4>
                                </div>
                                <div className="caption">
                                    <img
                                        src="/assets/img/departments/dmi.png"
                                        alt="dmi.png"
                                        style={{ height: 70 }}
                                    />
                                    <h4 className="mt-2">DMI</h4>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-6 col-lg-3 mb-4">
                            <div className="thumbnail">
                                <div className="thumb-logo">
                                    <img
                                        src="/assets/img/logo.png"
                                        alt="logo.png"
                                        style={{ height: 70 }}
                                    />
                                    <h4 className="mt-2">MP-Tender</h4>
                                </div>
                                <div className="caption">
                                    <img
                                        src="/assets/img/logo.png"
                                        alt="logo.png"
                                        style={{ height: 70 }}
                                    />
                                    <h4 className="mt-2">MP-Tender</h4>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 text-center">
                            <a
                                className="btn btn-primary py-2 px-4 mt-2"
                                href="index.html"
                                style={{ borderRadius: 40 }}
                            >
                                Find out more{" "}
                                <i
                                    className="fas fa-arrow-alt-circle-right"
                                    style={{ marginLeft: 10 }}
                                />
                            </a>
                        </div> */}
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
                        <h1 className="mb-5">Our Courses</h1>
                    </div>
                    <OwlCarousel
                        className="owl-carousel courses-carousel position-relative"
                        {...course_options}
                    >
                        <div className="owl-carousel-item active">
                            <div className="wow fadeInUp" data-wow-delay="0.1s">
                                <div className="course-item bg-light">
                                    <div className="position-relative overflow-hidden">
                                        <img
                                            className="img-fluid"
                                            src="assets/img/course-1.jpg"
                                            alt="course-1.jpg"
                                        />
                                        <div className="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4">
                                            <a
                                                href="index.html"
                                                className="flex-shrink-0 btn btn-sm btn-primary px-3 border-end"
                                                style={{
                                                    borderRadius:
                                                        "30px 0 0 30px",
                                                }}
                                            >
                                                View
                                            </a>
                                            <a
                                                href="index.html"
                                                className="flex-shrink-0 btn btn-sm btn-primary px-3"
                                                style={{
                                                    borderRadius:
                                                        "0 30px 30px 0",
                                                }}
                                            >
                                                Enroll Now
                                            </a>
                                        </div>
                                    </div>
                                    <div className="text-center p-4 pb-0 min-h">
                                        <h5 className="mb-4">
                                            Advance Oracle Apex Training
                                        </h5>
                                    </div>
                                    <div className="d-flex border-top">
                                        <small className="flex-fill text-center border-end py-2">
                                            <i className="fa fa-clock text-primary me-2" />{" "}
                                            Duration - 10 Hrs
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="owl-carousel-item active">
                            <div className="wow fadeInUp" data-wow-delay="0.3s">
                                <div className="course-item bg-light">
                                    <div className="position-relative overflow-hidden">
                                        <img
                                            className="img-fluid"
                                            src="assets/img/course-2.jpg"
                                            alt="course-2.jpg"
                                        />
                                        <div className="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4">
                                            <a
                                                href="index.html"
                                                className="flex-shrink-0 btn btn-sm btn-primary px-3 border-end"
                                                style={{
                                                    borderRadius:
                                                        "30px 0 0 30px",
                                                }}
                                            >
                                                View
                                            </a>
                                            <a
                                                href="index.html"
                                                className="flex-shrink-0 btn btn-sm btn-primary px-3"
                                                style={{
                                                    borderRadius:
                                                        "0 30px 30px 0",
                                                }}
                                            >
                                                Enroll Now
                                            </a>
                                        </div>
                                    </div>
                                    <div className="text-center p-4 pb-0 min-h">
                                        <h5 className="mb-4">
                                            Solar Technician (Electrical) -
                                            (Trade Code-560)
                                        </h5>
                                    </div>
                                    <div className="d-flex border-top">
                                        <small className="flex-fill text-center border-end py-2">
                                            <i className="fa fa-clock text-primary me-2" />
                                            Duration - 1.49 Hrs
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </OwlCarousel>
                    <div className="col-12 text-center">
                        <a
                            className="btn btn-primary py-2 px-4 mt-4"
                            href="index.html"
                            style={{ borderRadius: 40 }}
                        >
                            Find out more{" "}
                            <i
                                className="fas fa-arrow-alt-circle-right"
                                style={{ marginLeft: 10 }}
                            />
                        </a>
                    </div>
                </div>
            </div>
            {/* Courses End */}

            <FooterSlider />
        </>
    );
}
