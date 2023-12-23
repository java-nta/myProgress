import "./Auth.css";

import { Outlet } from "react-router";
import { Navigate,Link } from "react-router-dom";
import { useAuthContext } from "./AuthContext";
const Authentication = () => {
  const { userToken } = useAuthContext();

  if(userToken && userToken !== undefined){
    return <Navigate to="/dashboard"/>
  }
  return (
    <div className="auth-wrapper">
      <h1 className="fw-bold mb-3">Authentication</h1>
      <Outlet />
      <Link to="/dashboard" className="btn btn-outline-dark mt-2 w-100">
        Dashboard
      </Link>
    </div>
  );
};

export default Authentication;
