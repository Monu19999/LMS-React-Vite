import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Logout } from "@src/Pages/auth/Logout";

export default function LoginMenu() {
    const user = useSelector((state) => state.auth.user);

    const LoginMenuLink = (props) => {
        return (
            <>
                <Link
                    className="d-sm-hide dropdown-toggle"
                    data-bs-toggle="dropdown"
                    to={props.linkto}
                >
                    <i className="fa fa-user font-13 px-2" />
                    <span className="d-none-head">{props.title}</span>
                </Link>
                <ul className="dropdown-menu">{props.children}</ul>
            </>
        );
    };

    const UnAuthDropdown = () => {
        return (
            <>
                <LoginMenuLink linkto="#" title="Login">
                    <li>
                        <Link className="dropdown-item" to="/auth/login">
                            Student Login
                        </Link>
                    </li>
                </LoginMenuLink>
            </>
        );
    };

    const AuthDropdown = ({ user }) => {
        return (
            <>
                <LoginMenuLink linkto="#" title={"Welcome " + user.first_name}>
                    <li>
                        <Link to="/member" className="dropdown-item">
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Logout className="dropdown-item">Logout</Logout>
                    </li>
                </LoginMenuLink>
            </>
        );
    };

    const LoginMenuDropdown = () => {
        return user ? <AuthDropdown user={user} /> : <UnAuthDropdown />;
    };

    return (
        <>
            <LoginMenuDropdown />
        </>
    );
}
