import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setTheme, updateTheme } from "@src/features/app/AppSlice";
import { useEffect } from "react";
import { getUser } from "@src/features/app/AuthSlice";
import { Logout } from "@src/Pages/auth/Logout";

function Settings() {
    const user = useSelector((state) => state.auth.user);
    const theme = useSelector((state) => state.app.theme);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser());
        dispatch(setTheme());
        // dispatch(setSize());
    }, []);

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
                                // onClick={() => dispatch(changeFontSize(-1))}
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
                                // onClick={() => dispatch(changeFontSize(0))}
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
                                // onClick={() => dispatch(changeFontSize(1))}
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
                        <Link to="#" className="d-sm-hide">
                            <i className="fa fa-fast-forward font-13 px-2" />
                            <span className="d-none-head">
                                Skip to Nav Content
                            </span>
                        </Link>
                        <Link to="#" className="d-sm-hide">
                            <i className="fa fa-fast-forward font-13 px-2" />
                            <span className="d-none-head">
                                Skip to Main Content
                            </span>
                        </Link>
                        <a
                            href="#"
                            className="d-sm-hide dropdown-toggle"
                            data-bs-toggle="dropdown"
                        >
                            <i className="fa fa-user font-13 px-2" />
                            <span className="d-none-head">Login</span>
                        </a>
                        <ul className="dropdown-menu">
                            {user ? (
                                <>
                                    <li>
                                        <Link
                                            className="dropdown-item"
                                            to="/member"
                                        >
                                            Welcome {user.first_name}
                                        </Link>
                                    </li>
                                    <li>
                                        <Logout className="dropdown-item">
                                            Logout
                                        </Logout>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link
                                            className="dropdown-item"
                                            to="/auth/login"
                                        >
                                            Student Login
                                        </Link>
                                    </li>
                                </>
                            )}
                            {/* <li>
                                <Link className="dropdown-item" to="#">
                                    Department Login
                                </Link>
                            </li> */}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;
