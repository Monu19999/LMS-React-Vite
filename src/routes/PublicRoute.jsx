import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = () => {
    const token = useSelector((state) => state.auth.token);
    console.log("token on PublicRoute => ", token);
    return token != null ? <Navigate to="/front" /> : <Outlet />;
};

export default PublicRoute;
