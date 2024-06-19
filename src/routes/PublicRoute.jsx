import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const PublicRoute = () => {
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();

    useEffect(() => {
        if (token != null) {
            navigate("/member");
        }
    }, [token]);

    return <Outlet />;
};

export default PublicRoute;
