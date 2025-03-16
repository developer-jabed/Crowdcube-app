import { useContext } from "react";

import { Navigate, useLocation } from "react-router";
import PropTypes from "prop-types";
import { ClipLoader } from "react-spinners";  
import { AuthContext } from "../Provider/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="spinner-container">
        <ClipLoader size={50} color="#00bcd4" loading={loading} />
      </div>
    );
  }

  if (user && user?.email) {
    return children;
  }

  return <Navigate to="/auth/login" state={location.pathname} />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
