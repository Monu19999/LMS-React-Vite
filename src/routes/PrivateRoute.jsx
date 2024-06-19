import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const PrivateRoute = () => {
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();

    useEffect(() => {
        if (token == null) {
            navigate("/auth/login");
        }
    }, [token]);

    return <Outlet />;
};

export default PrivateRoute;
