import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function ReqAuth({ allowedRoles }) {
    const { isLoggedIn, role } = useSelector((state) => state.auth);
    const location = useLocation();
    return isLoggedIn && allowedRoles.find((myrole) => myrole === role) ? (
        <Outlet />
    ) : isLoggedIn ? (
        <Navigate to={"/denied"} state={{ from: location }} replace />
    ) : (
        <Navigate to={"/login"} state={{ from: location }} replace />
    )
}

export default ReqAuth;