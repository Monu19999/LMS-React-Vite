import { useDispatch } from "react-redux";
import { logout } from "@src/features/app/AuthSlice";
import { useNavigate } from "react-router-dom";

export const Logout = (props) => {
    const dispatch = useDispatch();

    const handleLogout = async (e) => {
        e.preventDefault();
        dispatch(logout());
    };

    return (
        <a
            href="#"
            onClick={handleLogout}
            {...props}
            style={{ cursor: "pointer" }}
        >
            {props.children}
        </a>
    );
};
