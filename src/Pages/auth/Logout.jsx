import { useDispatch } from "react-redux";
import { logout } from "@src/features/app/AuthSlice";

export const Logout = (props) => {
    const dispatch = useDispatch();

    const handleLogout = async (e) => {
        e.preventDefault();
        await dispatch(logout());
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
