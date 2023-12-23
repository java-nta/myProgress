import { Outlet } from "react-router";
import "./AppLayout.css";
import { Link } from "react-router-dom";
import $ from "jquery";
import { useAuthContext } from "../authentication/AuthContext";
import { useEffect, useState } from "react";
import ToastMessage from "./core/ToastMessage";
function AppLayout() {
  const showMenu = () => {
    $(".menu").toggleClass("menu-show");
  };
  const { currentUser, userToken, logout } = useAuthContext();
  const [toast, setToast] = useState(null);
  const handleLogin = () => {
    logout();
    logoutModalToggle();
    setToast(
      <ToastMessage
        icon={"fa-circle-check"}
        iconColor={"text-success"}
        headMssg={"Success"}
        bodyMssg={"You logout."}
      />
    );
  };
  const logoutModalToggle = () => {
    $(".logout-modal").toggleClass("logout-modal-show");
    console.log("clicked");
  };
  useEffect(() => {
    setToast(null);
  }, []);
  return (
    <>
      {toast && toast}
      <div className="side-bar">
        <button className="btn-dingo bar-toggle text-dingo" onClick={showMenu}>
          <i className="fa fa-bars-staggered"></i>
        </button>
        <div
          className="d-flex flex-column justify-content-between"
          style={{ height: "90%" }}
        >
          <div className="menu top-menu">
            <p className="text-dingo fs-1">
              {currentUser &&
                currentUser.username.toUpperCase()}
            </p>
            <p className="text-light small">Projet</p>
            <div className="d-flex flex-column gap-2">
              <Link
                to="/dashboard"
                className="sidebar-link text-dingo d-flex align-items-center"
              >
                <i className="fa fa-dharmachakra col-md-2"></i>
                <span>Dashboard</span>
              </Link>
              <Link
                to="/usermanager"
                className="sidebar-link text-dingo d-flex align-items-center"
              >
                <i className="fa fa-database col-md-2"></i>
                <span>User manager</span>
              </Link>
              <Link
                to="/uidesign"
                className="sidebar-link text-dingo d-flex align-items-center"
              >
                <i className="fa fa-chess col-md-2"></i>
                <span>UI design</span>
              </Link>
            </div>
          </div>
          <div className="menu bot-menu">
            <p className="text-light small">Authentication</p>
            <div className="d-flex flex-column gap-2">
              <Link
                to="/#"
                className="sidebar-link text-dingo d-flex align-items-center"
              >
                <i className="fa fa-gear col-md-2"></i>
                <span>Setting</span>
              </Link>
              <Link
                to=""
                className="sidebar-link text-dingo d-flex align-items-center"
              >
                <i className="fa fa-bell col-md-2"></i>
                <span>Notifications</span>
              </Link>
              {userToken ? (
                <>
                  <div className="d-flex align-items-center justify-content-between sidebar-link">
                    <Link
                      to={"/"}
                      className="d-flex align-items-center text-dingo  "
                    >
                      <i className="fa fa-circle-user col-md-6"></i>
                      <span className="">Profil</span>
                    </Link>
                    <button
                      type="button"
                      className="btn logout"
                      onClick={logoutModalToggle}
                    >
                      <i className="fa fa-arrow-right-from-bracket text-danger"></i>
                    </button>
                  </div>

                  <button
                    type="button"
                    className="btn sidebar-link logout-mini"
                    onClick={logoutModalToggle}
                  >
                    <i className="fa fa-arrow-right-from-bracket text-danger"></i>
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="sidebar-link text-dingo d-flex align-items-center"
                >
                  <i className="fa fa-circle-user col-md-2"></i>
                  <span>Log in (optional)</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="side-content">
        <div className="logout-modal d-flex flex-column gap-1 text-light">
          <h1 className="text-dingo">Logout</h1>
          <p>Are sure you want logout?</p>
          <div className="col-md-12 text-end">
            <button
              className="btn btn-danger me-1"
              type="button"
              onClick={handleLogin}
            >
              <span className="fw-medium">Logout</span>
            </button>
            <button
              onClick={logoutModalToggle}
              type="button"
              className="btn btn-dark"
            >
              <span className="fw-medium">Cancel</span>
            </button>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default AppLayout;
