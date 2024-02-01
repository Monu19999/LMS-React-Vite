import { Link } from "react-router-dom";
import CreateMenuTree from "@src/Utilities/CreateMenuTree";
import { useEffect, useState } from "react";

function Navbar(props) {
    function createLink(menu) {
        if (menu.menu_type == 1) {
            return menu.page ? "page/" + menu.page.slug : "/";
        } else if (menu.menu_type == 2) {
            return menu.db_controller_route
                ? "module/" + menu.db_controller_route.route
                : "/";
        } else {
            return menu.custom_url;
        }
    }

    function makeLi(menu, deep) {
        return (
            <li
                key={menu.id}
                className={
                    deep > 0
                        ? "c-navbar__dropdown-item"
                        : "c-navbar__item c-navbar__item--dropdown"
                }
            >
                {menu.children ? (
                    <>
                        <button className="c-navbar__link">
                            {menu.title_en}
                            <svg
                                className="c-navbar__link-icon"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M2.217 8.502l1.435-1.435L12 15.415l8.348-8.348L21.783 8.5 12 18.284 2.217 8.501z"
                                />
                            </svg>
                        </button>
                        {makeMenuTree(menu.children, deep + 1)}
                    </>
                ) : (
                    <>
                        <Link
                            to={createLink(menu)}
                            className={
                                deep > 0
                                    ? "c-navbar__dropdown-link"
                                    : "c-navbar__link"
                            }
                            style={deep > 0 ? {} : { color: "#06bbcc" }}
                        >
                            {menu.title_en}
                        </Link>
                    </>
                )}
            </li>
        );
    }
    function loopMenuObj(menus, deep) {
        return Object.values(menus).map((menu) => {
            return makeLi(menu, deep);
        });
    }
    function makeMenuTree(menus, deep = 0) {
        let ul_classes = "c-navbar__list";
        if (deep == 1) {
            ul_classes = "c-navbar__dropdown-list";
        }
        if (deep > 0) {
            return (
                <div className="c-navbar__dropdown">
                    <div className="c-navbar__dropdown-wrapper">
                        <ul className={ul_classes}>
                            {loopMenuObj(menus, deep)}
                        </ul>
                    </div>
                </div>
            );
        } else {
            return <ul className={ul_classes}>{loopMenuObj(menus, deep)}</ul>;
        }
    }
    const [menus, setMenus] = useState("");
    useEffect(() => {
        let menu_tree = props.menus ? makeMenuTree(props.menus) : "";
        setMenus(menu_tree);
    }, []);

    useEffect(() => {
        BEGlobal.Init();
        FEGlobal.Init();
    }, [menus]);

    return (
        <>
            {/* Navbar Start */}
            <nav className="c-navbar shadow" id="js-navbar">
                <div className="container-fluid">
                    <div className="row">
                        <div className="c-navbar__container">
                            <div
                                id="hs_cos_wrapper_navigation-primary"
                                className="hs_cos_wrapper hs_cos_wrapper_widget hs_cos_wrapper_type_module"
                                data-hs-cos-general-type="widget"
                                data-hs-cos-type="module"
                            >
                                <div className="c-navbar__links js-navbar-links">
                                    {/* js-navbar-links */}
                                    {menus}
                                    {/* <ul className="c-navbar__list">
                                        <li className="c-navbar__item c-navbar__item--dropdown">
                                            <Link
                                                to="/"
                                                className="c-navbar__link active"
                                                style={{ color: "#06bbcc" }}
                                            >
                                                Home
                                            </Link>
                                        </li>
                                        <li className="c-navbar__item c-navbar__item--dropdown">
                                            <Link
                                                to="/about-us"
                                                className="c-navbar__link "
                                            >
                                                About
                                            </Link>
                                        </li>
                                        <li className="c-navbar__item c-navbar__item--dropdown">
                                            <button className="c-navbar__link ">
                                                Courses
                                                <svg
                                                    className="c-navbar__link-icon"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M2.217 8.502l1.435-1.435L12 15.415l8.348-8.348L21.783 8.5 12 18.284 2.217 8.501z"
                                                    />
                                                </svg>
                                            </button>
                                            <div className="c-navbar__dropdown">
                                                <div className="c-navbar__dropdown-wrapper">
                                                    <ul className="c-navbar__dropdown-list">
                                                        <li className="c-navbar__dropdown-item">
                                                            <Link
                                                                to="/"
                                                                className="c-navbar__dropdown-link"
                                                            >
                                                                <span>
                                                                    MAP_IT - TCU
                                                                    (29)
                                                                </span>
                                                                <span>
                                                                    Creating the
                                                                    most
                                                                    effective
                                                                    learning
                                                                    experience
                                                                </span>
                                                            </Link>
                                                        </li>
                                                        <li className="c-navbar__dropdown-item">
                                                            <Link
                                                                to="/"
                                                                className="c-navbar__dropdown-link"
                                                            >
                                                                <span>
                                                                    Skill
                                                                    Development
                                                                    (40)
                                                                </span>
                                                                <span>
                                                                    Creating the
                                                                    most
                                                                    effective
                                                                    learning
                                                                    experience
                                                                </span>
                                                            </Link>
                                                        </li>
                                                        <li className="c-navbar__dropdown-item">
                                                            <Link
                                                                to="/"
                                                                className="c-navbar__dropdown-link"
                                                            >
                                                                <span>
                                                                    Police Head
                                                                    Quarters
                                                                    (53)
                                                                </span>
                                                                <span>
                                                                    Creating the
                                                                    most
                                                                    effective
                                                                    learning
                                                                    experience
                                                                </span>
                                                            </Link>
                                                        </li>
                                                        <li className="c-navbar__dropdown-item">
                                                            <Link
                                                                to="/"
                                                                className="c-navbar__dropdown-link"
                                                            >
                                                                <span>
                                                                    MPRRDA (24)
                                                                </span>
                                                                <span>
                                                                    Creating the
                                                                    most
                                                                    effective
                                                                    learning
                                                                    experience
                                                                </span>
                                                            </Link>
                                                        </li>
                                                        <li className="c-navbar__dropdown-item">
                                                            <Link
                                                                to="/"
                                                                className="c-navbar__dropdown-link"
                                                            >
                                                                <span>
                                                                    2nd Dropdown
                                                                </span>
                                                                <span>
                                                                    Results from
                                                                    some of the
                                                                    companies
                                                                    using eduMe
                                                                </span>
                                                                <svg viewBox="0 0 24 24">
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        clipRule="evenodd"
                                                                        d="M8.502 21.783l-1.435-1.435L15.415 12 7.067 3.652 8.5 2.217 18.284 12l-9.782 9.784z"
                                                                    />
                                                                </svg>
                                                            </Link>
                                                            <div className="c-navbar__dropdown-sub">
                                                                <div className="c-navbar__dropdown-sub-wrapper">
                                                                    <ul className="c-navbar__dropdown-sub-list">
                                                                        <li className="c-navbar__dropdown-sub-item">
                                                                            <Link
                                                                                to="/"
                                                                                className="c-navbar__dropdown-sub-link"
                                                                            >
                                                                                <span>
                                                                                    menu
                                                                                    123
                                                                                </span>
                                                                                <span>
                                                                                    79%
                                                                                    training
                                                                                    engagement
                                                                                    rate
                                                                                </span>
                                                                            </Link>
                                                                        </li>
                                                                        <li className="c-navbar__dropdown-sub-item">
                                                                            <Link
                                                                                to="/"
                                                                                className="c-navbar__dropdown-sub-link"
                                                                            >
                                                                                <span>
                                                                                    Menu
                                                                                    1234
                                                                                </span>
                                                                                <span>
                                                                                    Onboarding
                                                                                    time
                                                                                    reduced
                                                                                    by
                                                                                    13%
                                                                                </span>
                                                                            </Link>
                                                                        </li>
                                                                        <li className="c-navbar__dropdown-sub-item">
                                                                            <Link
                                                                                to="/"
                                                                                className="c-navbar__dropdown-sub-link"
                                                                            >
                                                                                <span>
                                                                                    Menu
                                                                                    12345
                                                                                </span>
                                                                                <span>
                                                                                    70%
                                                                                    reduction
                                                                                    in
                                                                                    time
                                                                                    to
                                                                                    productivity
                                                                                </span>
                                                                            </Link>
                                                                        </li>
                                                                        <li className="c-navbar__dropdown-sub-item">
                                                                            <Link
                                                                                to="/"
                                                                                className="c-navbar__dropdown-sub-link"
                                                                            >
                                                                                <span>
                                                                                    Menu
                                                                                    123456
                                                                                </span>
                                                                                <span>
                                                                                    Onboarding
                                                                                    time
                                                                                    reduced
                                                                                    by
                                                                                    over
                                                                                    50%
                                                                                </span>
                                                                            </Link>
                                                                        </li>
                                                                        <li className="c-navbar__dropdown-sub-item">
                                                                            <Link
                                                                                to="/"
                                                                                className="c-navbar__dropdown-sub-link"
                                                                            >
                                                                                <span>
                                                                                    Menu
                                                                                    1234567
                                                                                </span>
                                                                                <span>
                                                                                    99%
                                                                                    reduction
                                                                                    in
                                                                                    time
                                                                                    to
                                                                                    productivity
                                                                                </span>
                                                                            </Link>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="c-navbar__item c-navbar__item--dropdown">
                                            <Link
                                                to="/"
                                                className="c-navbar__link "
                                            >
                                                Download
                                            </Link>
                                        </li>
                                        <li className="c-navbar__item c-navbar__item--dropdown">
                                            <Link
                                                to="/"
                                                className="c-navbar__link "
                                            >
                                                Videos
                                            </Link>
                                        </li>
                                        <li className="c-navbar__item c-navbar__item--dropdown">
                                            <Link
                                                to="/"
                                                className="c-navbar__link "
                                            >
                                                Contact
                                            </Link>
                                        </li>
                                    </ul> */}
                                </div>
                                <div className="c-navbar__menu-container">
                                    <button
                                        className="c-navbar__menu"
                                        id="js-navbar-menu-toggle"
                                        aria-controls="js-navbar-links"
                                    >
                                        <span>
                                            <span className="u-visually-hide" />
                                        </span>
                                    </button>
                                </div>
                                <div className="navbar-2">
                                    <Link
                                        to="/"
                                        className="navbar-brand d-flex align-items-center px-4 p-4"
                                    >
                                        <img
                                            src="/assets/img/logo.png"
                                            alt="logo.png"
                                        />
                                        <div
                                            className="ml-2"
                                            style={{ marginLeft: 10 }}
                                        >
                                            <p className="name">e-Shiksha</p>
                                            <span className="subhead">
                                                Govt. of Madhya Pradesh
                                            </span>
                                        </div>
                                    </Link>
                                </div>
                                <div className="navbar-3 c-navbar__buttons ">
                                    <Link
                                        className="btn btn-primary py-2 px-4 fa-search-toggle"
                                        to="/"
                                        style={{ borderRadius: 40 }}
                                    >
                                        <span className="d-none-head">
                                            Search
                                        </span>{" "}
                                        <i className="fas fa-search" />
                                    </Link>
                                    <div className="search-box">
                                        <input type="text" name="search" />
                                        <input
                                            type="button"
                                            defaultValue="Search"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            {/* Navbar End */}
        </>
    );
}

export default Navbar;
