import React from "react";
import OwlCarousel from "react-owl-carousel";
import "@public/assets/lib/owlcarousel/assets/owl.carousel.min.css";

function FooterSlider() {
    const options = {
        animateIn: "fadeIn",
        animateOut: "fadeOut",
        items: 6,
        margin: 0,
        stagePadding: 0,
        smartSpeed: 450,
        autoplay: true,
        loop: true,
        navText: ["<img src='prevArrow.png'>", "<img src='nextArrow.png'>"],
        dots: false,
        responsiveClass: true,
        responsive: {
            0: {
                items: 2,
                nav: false,
            },
            600: {
                items: 4,
                nav: false,
            },
            1000: {
                items: 8,
                nav: false,
                loop: false,
                margin: 0,
            },
        },
    };
    return (
        <>
            {/* footer logos Start */}
            <div id="logo-slider">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-12" style={{ padding: 0 }}>
                            <div className="footer-section-row">
                                <OwlCarousel
                                    className="first-img  owl-carousel owl-theme owl-loaded owl-drag"
                                    {...options}
                                >
                                    <div className="owl-stage-outer">
                                        <div
                                            className="owl-stage"
                                            style={{
                                                transform:
                                                    "translate3d(0px, 0px, 0px)",
                                                transition: "all 0s ease 0s",
                                            }}
                                        >
                                            <div className="owl-item active">
                                                <div className="item">
                                                    <img
                                                        src="/assets/img/departments/scroll/cmhelpline.png"
                                                        className="img-fluid"
                                                        alt="cmhelpline.png"
                                                    />
                                                </div>
                                            </div>
                                            <div className="owl-item">
                                                <div className="item">
                                                    <img
                                                        src="/assets/img/departments/scroll/fomp.png"
                                                        className="img-fluid"
                                                        alt="fomp.png"
                                                    />
                                                </div>
                                            </div>
                                            <div className="owl-item">
                                                <div className="item">
                                                    <img
                                                        src="/assets/img/departments/scroll/indiaportal.png"
                                                        className="img-fluid"
                                                        alt="indiaportal.png"
                                                    />
                                                </div>
                                            </div>
                                            <div className="owl-item">
                                                <div className="item">
                                                    <img
                                                        src="/assets/img/departments/scroll/investmp.png"
                                                        className="img-fluid"
                                                        alt="investmp.png"
                                                    />
                                                </div>
                                            </div>
                                            <div className="owl-item">
                                                <div className="item">
                                                    <img
                                                        src="/assets/img/departments/scroll/lokseva.png"
                                                        className="img-fluid"
                                                        alt="lokseva.png"
                                                    />
                                                </div>
                                            </div>
                                            <div className="owl-item">
                                                <div className="item">
                                                    <img
                                                        src="/assets/img/departments/scroll/mapit.png"
                                                        className="img-fluid"
                                                        alt="mapit.png"
                                                    />
                                                </div>
                                            </div>
                                            <div className="owl-item">
                                                <div className="item">
                                                    <img
                                                        src="/assets/img/departments/scroll/mpcode.png"
                                                        className="img-fluid"
                                                        alt="mpcode.png"
                                                    />
                                                </div>
                                            </div>
                                            <div className="owl-item">
                                                <div className="item">
                                                    <img
                                                        src="/assets/img/departments/scroll/mpdashboard.png"
                                                        className="img-fluid"
                                                        alt="mpdashboard.png"
                                                    />
                                                </div>
                                            </div>
                                            <div className="owl-item">
                                                <div className="item">
                                                    <img
                                                        src="/assets/img/departments/scroll/mpdashboard.png"
                                                        className="img-fluid"
                                                        alt="mpdashboard.png"
                                                    />
                                                </div>
                                            </div>
                                            <div className="owl-item">
                                                <div className="item">
                                                    <img
                                                        src="/assets/img/departments/scroll/mpgov.png"
                                                        className="img-fluid"
                                                        alt="mpgov.png"
                                                    />
                                                </div>
                                            </div>
                                            <div className="owl-item">
                                                <div className="item">
                                                    <img
                                                        src="/assets/img/departments/scroll/mpinfo.png"
                                                        className="img-fluid"
                                                        alt="mpinfo.png"
                                                    />
                                                </div>
                                            </div>
                                            <div className="owl-item">
                                                <div className="item">
                                                    <img
                                                        src="/assets/img/departments/scroll/mptourism.png"
                                                        className="img-fluid"
                                                        alt="mptourism.png"
                                                    />
                                                </div>
                                            </div>
                                            <div className="owl-item">
                                                <div className="item">
                                                    <img
                                                        src="/assets/img/departments/scroll/rajbhavan.png"
                                                        className="img-fluid"
                                                        alt="rajbhavan.png"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </OwlCarousel>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* footer logos End */}
        </>
    );
}

export default FooterSlider;
