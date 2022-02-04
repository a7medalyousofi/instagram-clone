import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";
import * as ROUTES from "../constants/routes";

export default function IsLoggedInUser({ user, pathname }) {
  const isAuth = () => {
    if (user) {
      return <Navigate to={ROUTES.DASHBOARD} />;
    }
    if (!user) {
      return <Navigate to={pathname} />;
    }
  };
  return isAuth;
}

IsLoggedInUser.propTypes = {
  user: PropTypes.object,
  pathname: PropTypes.string.isRequired,
};
