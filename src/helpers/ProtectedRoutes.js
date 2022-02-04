// import PropTypes from "prop-types";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import Dashboard from "../pages/dashboard";
import Login from "../pages/login";

function ProtectedRoutes({ user }) {
  const isAuth = user;
  const location = useLocation();

  // let dashboard = <Dashboard />;
  // let login = <Login />;

  // if (location.pathname === ROUTES.LOGIN && user) {
  //   dashboard = <Navigate to={ROUTES.DASHBOARD} />;
  // } else if (location.pathname === ROUTES.SIGN_UP && user) {
  //   dashboard = <Navigate to={ROUTES.DASHBOARD} />;
  // }
  if (location.pathname === ROUTES.LOGIN && isAuth) {
    return <Navigate to={ROUTES.DASHBOARD} replace={true} />;
  }
  return isAuth ? <Outlet /> : <Navigate to={ROUTES.LOGIN} />;
}

export default ProtectedRoutes;

// ProtectedRoute.propTypes = {
//   user: PropTypes.object,
// };
