import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setTheme, updateTheme } from "@src/features/app/AppSlice";
import { useEffect } from "react";
import { getUser } from "@src/features/app/AuthSlice";
import { Logout } from "@src/Pages/auth/Logout";
import $ from "jquery";
import LoginMenu from "@src/Pages/member/includes/LoginMenu";

function Settings() {
    const theme = useSelector((state) => state.app.theme);
    const dispatch = useDispatch();

    // const handleGetUser = async () => {
    //     let response = await dispatch(getUser());
    //     console.log(response);
    //     let payload = response.payload;
    //     if (
    //         payload.hasOwnProperty("message") &&
    //         payload.message === "Unauthenticated."
    //     ) {
    //         navigate("/");
    //     }
    // };

    useEffect(() => {
        // handleGetUser();
        dispatch(setTheme());
        // dispatch(setSize());

        const addFontSize = () => {
            let affectedElements = $("p, h1, h2, h3, h4, h5, h6, li, a");
            affectedElements.each(function () {
                var $this = $(this);
                $this.data("orig-size", $this.css("font-size"));
            });
        };
        if (document.readyState === "complete") {
            addFontSize();
        } else {
            window.addEventListener("load", addFontSize);
            return () => document.removeEventListener("load", addFontSize);
        }
    }, []);

    const handleChangeFontSize = (value) => {
        let affectedElements = $("p, h1, h2, h3, h4, h5, h6, li, a");
        if (value == 0) {
            affectedElements.each(function () {
                var $this = $(this);
                $this.css("font-size", $this.data("orig-size"));
            });
        } else {
            affectedElements.each(function () {
                var $this = $(this);
                $this.css(
                    "font-size",
                    parseInt($this.css("font-size")) + value
                );
            });
        }
    };

    return (
        <div id="topbar">
            <div className="d-flex align-items-center ">
                <div className="container-fluid d-flex justify-content-end">
                    <ul className="d-flex align-items-center list-unstyled m-0 justify-content-end">
                        <li className="px-0">
                            <div
                                className="theme-switch"
                                data-toggle="tooltip"
                                title="Change Theme"
                            >
                                <input
                                    className="theme-switch_toggle"
                                    id="themeSwitchToggle"
                                    type="checkbox"
                                    defaultChecked={theme ? true : false}
                                    onClick={() => dispatch(updateTheme())}
                                />
                                <label
                                    className="theme-switch_label"
                                    htmlFor="themeSwitchToggle"
                                />
                            </div>
                        </li>
                        <li className="px-0">
                            <Link
                                to="#"
                                id="btn-decrease"
                                className="js-font-decrease"
                                data-toggle="tooltip"
                                data-placement="bottom"
                                data-original-title="A-"
                                onClick={() => handleChangeFontSize(-1)}
                            >
                                A-
                            </Link>
                        </li>
                        <li className="px-0">
                            <Link
                                to="#"
                                id="btn-orig"
                                className="js-font-normal"
                                data-toggle="tooltip"
                                data-placement="bottom"
                                data-original-title="A"
                                onClick={() => handleChangeFontSize(0)}
                            >
                                A
                            </Link>
                        </li>
                        <li className="px-0">
                            <Link
                                to="#"
                                id="btn-increase"
                                className="js-font-increase"
                                data-toggle="tooltip"
                                data-placement="bottom"
                                data-original-title="A+"
                                onClick={() => handleChangeFontSize(+1)}
                            >
                                A+
                            </Link>
                        </li>
                    </ul>
                    <div className="contact-info d-flex align-items-center">
                        <Link to="page/screen-reader" className="d-sm-hide">
                            <i className="fa fa-book px-2" />
                            <span className="d-none-head">Screen Reader</span>
                        </Link>
                        {/* <a
                            href="#"
                            onClick={() => {
                                const section =
                                    document.querySelector("#quickInformation");
                                window.scrollTo(
                                    section.offsetLeft,
                                    section.offsetTop - 250
                                );
                                // section.scrollIntoView({
                                //     behavior: "smooth",
                                //     block: "start",
                                // });
                            }}
                            className="d-sm-hide"
                        >
                            <i className="fa fa-fast-forward font-13 px-2" />
                            <span className="d-none-head">
                                Skip to Nav Content
                            </span>
                        </a> */}
                        <Link to="#" className="d-sm-hide">
                            <i className="fa fa-fast-forward font-13 px-2" />
                            <span className="d-none-head">
                                Skip to Main Content
                            </span>
                        </Link>
                        <LoginMenu />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;
