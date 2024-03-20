import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const token = useSelector((state) => state.auth.token);
    // console.log("token on PrivateRoute => ", token);
    return token != null ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default PrivateRoute;
