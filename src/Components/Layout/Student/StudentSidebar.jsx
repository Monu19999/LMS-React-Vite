import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ProfileImage from "./ProfileImage";

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
                    <ProfileImage upload={user?.upload} className="img" />
                    <h3>{user?.name}</h3>
                </div>
            </div>
            <ul className="list-unstyled components mb-5">
                <li>
                    <NavLink
                        end
                        to="/member"
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active" : ""
                        }
                    >
                        <span className="fa fa-home mr-3" /> Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        end
                        to="/member/available_courses"
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active" : ""
                        }
                    >
                        <span className="fa fa-gift mr-3" /> Available Courses
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        end
                        to="/member/courses"
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active" : ""
                        }
                    >
                        <span className="fas fa-book mr-3" /> My Courses
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        end
                        to="/member/certificates"
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active" : ""
                        }
                    >
                        <span className="fas fa-user-graduate mr-3" /> My
                        Certificate
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        end
                        to="/member/change-password"
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active" : ""
                        }
                    >
                        <span className="fas fa-lock mr-3" /> Change
                        Password
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        end
                        to="/member/profile"
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "active" : ""
                        }
                    >
                        <span className="fas fa-user mr-3" /> Profile
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default StudentSidebar;
