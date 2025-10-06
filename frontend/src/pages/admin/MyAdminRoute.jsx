import { Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const MyAdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo && userInfo.data.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default MyAdminRoute;
