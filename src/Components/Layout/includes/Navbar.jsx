import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { mobileNavToggle } from "@src/features/app/AppSlice";
import { useDispatch, useSelector } from "react-redux";

function Navbar(props) {
    const [menus, setMenus] = useState("");
    const [isSearchBoxOpen, setIsSearchBoxOpen] = useState("none");
    const top_menus = useSelector((state) => state.app.data.top_menus);

    const dispatch = useDispatch();
    function createLink(item) {
        if (item.menu_type == 1) {
            return item.page ? "/page/" + item.page.slug : "/";
        } else if (item.menu_type == 2) {
            return item.db_controller_route
                ? "/" + item.db_controller_route.route
                : "/";
        } else if (item.menu_type == 3) {
            return item.custom_url;
        } else if (item.menu_type == 5) {
            return "/" + item.custom_url;
        } else {
            return "#";
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
                        <a className="c-navbar__link" style={{color: "rgb(6, 187, 204)"}}>
                            {menu.title_en}
                           
                        </a>
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

    useEffect(() => {
        BEGlobal.Init();
        FEGlobal.Init();
    }, [top_menus]);

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
                                    {top_menus && makeMenuTree(top_menus)}
                                </div>
                                <div className="c-navbar__menu-container">
                                    <button
                                        className="c-navbar__menu"
                                        id="js-navbar-menu-toggle"
                                        aria-controls="js-navbar-links"
                                        onClick={() =>
                                            dispatch(mobileNavToggle())
                                        }
                                    >
                                        <span>
                                            <span className="u-visually-hide" />
                                        </span>
                                    </button>
                                </div>
                                <div className="navbar-2">
                                    <Link
                                        to="/dashboard"
                                        className="navbar-brand d-flex align-items-center px-4 p-4"
                                    >
                                        <img
                                            src="assets/img/logo.png"
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
                                    {/* <span
                                        className="btn btn-primary py-2 px-4 fa-search-toggle"
                                        onClick={() =>
                                            setIsSearchBoxOpen(
                                                isSearchBoxOpen == "none"
                                                    ? "block"
                                                    : "none"
                                            )
                                        }
                                        style={{ borderRadius: 40 }}
                                    >
                                        <span className="d-none-head">
                                            Search
                                        </span>{" "}
                                        <i className="fas fa-search" />
                                    </span>
                                    <div
                                        className="search-box"
                                        style={{ display: isSearchBoxOpen }}
                                    >
                                        <input type="text" name="search" />
                                        <input
                                            type="button"
                                            defaultValue="Search"
                                        />
                                    </div> */}
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
