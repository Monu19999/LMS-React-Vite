import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function StudentSidebar() {
    const [isSidebarActive, SetSidebarActive] = useState(false);
    const user = useSelector((state) => state.auth.user);

    return (
        <nav id="sidebar" className={isSidebarActive ? "active" : ""}>
            <div className="custom-menu">
                <button
                    type="button"
                    id="sidebarCollapse"
                    className="btn btn-primary"
                    onClick={() => SetSidebarActive(!isSidebarActive)}
                >
                    <i className="fa fa-bars text-white" aria-hidden="true"></i>
                </button>
            </div>
            <div
                className="img bg-wrap text-center py-4"
                style={{
                    backgroundImage: "url(assets/img/dashboard/bg_1.jpg)",
                }}
            >
                <div className="user-logo">
                    <div
                        className="img"
                        style={{
                            backgroundImage:
                                "url(assets/img/dashboard/logo.jpg)",
                        }}
                    />
                    <h3>{user?.name}</h3>
                </div>
            </div>
            <ul className="list-unstyled components mb-5">
                <li className="active">
                    <Link to="/member">
                        <span className="fa fa-home mr-3" /> Dashboard
                    </Link>
                </li>
                <li>
                    <Link to="/member/available_courses">
                        <span className="fa fa-gift mr-3" /> Available Courses
                    </Link>
                </li>
                <li>
                    <Link to="/member/courses">
                        <span className="fas fa-book mr-3" /> My Courses
                    </Link>
                </li>
                <li>
                    <Link to="/member/certificates">
                        <span className="fas fa-user-graduate mr-3" /> My
                        Certificate
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default StudentSidebar;
