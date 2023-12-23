import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../Api";
import ToastMessage from "../mini-coding/core/ToastMessage";
import ShowPasswordEye from "../mini-coding/core/ShowPasswordEye";
import { useAuthContext } from "./AuthContext";

const Login = () => {
  const [toast, setToast] = useState(null);
  const [allInputs, setAllInputs] = useState({
    username: "",
    email: "",
  });
  const { setCurrentUser, userToken } = useAuthContext();
  useEffect(() => {
    setToast(null);
  }, []);
  const onChange = (e) => {
    setAllInputs({ ...allInputs, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    api
      .post("/auth/login", {
        username: allInputs.username,
        password: allInputs.password,
      })
      .then((response) => {
        if (response.status === 200) {
          setToast(
            <ToastMessage
              icon={"fa fa-circle-check"}
              iconColor={"text-success"}
              headMssg={"Welcome"}
              bodyMssg={"Login success."}
            />
          );
          setTimeout(() => {
            setCurrentUser(response.data);
          }, 4000);
        }
      })
      .catch(({ response }) => {
        console.log(response);
        setToast(
          <ToastMessage
            icon={"fa-close"}
            iconColor={"text-danger"}
            headMssg={"Warning"}
            bodyMssg={response.data.message}
          />
        );
        // if (response && response.data.errors) {
        //   const er = response.data.errors;
        //   switch (true) {
        //     case Boolean(er.username): {
        //       setToast(
        //         <ToastMessage
        //           icon={"fa-close ps-3"}
        //           iconColor={"text-danger"}
        //           headMssg={"Warning"}
        //           bodyMssg={er.username}
        //         />
        //       );
        //       break;
        //     }
        //     case Boolean(er.password): {
        //       setToast(
        //         <ToastMessage
        //           icon={"fa-close ps-3"}
        //           iconColor={"text-danger"}
        //           headMssg={"Warning"}
        //           bodyMssg={er.password}
        //         />
        //       );
        //       break;
        //     }
        //     default: {
        //       console.log(response);
        //     }
        //   }
        // }
      });
  };

  if (userToken) {
    return <Navigate to={"/dashboard"} />;
  }
  return (
    <>
      {toast && toast}
      <form
        action=""
        onSubmit={handleLogin}
        className="form-login d-flex flex-column"
      >
        <p className="text-light m-0">
          Welcome back! Enter your information and join the team
        </p>
        <div className="d-flex flex-column gap-1">
          <label htmlFor="username" className="">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={onChange}
          />
        </div>
        <div className="d-flex flex-column gap-1 mt-1 position-relative">
          <label htmlFor="password" className="">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={onChange}
          />
        </div>
        <div className="text-end">
          <ShowPasswordEye />
        </div>
        <div className="d-flex justify-content-between mt-1">
          <div className="d-flex align-items-center gap-1">
            <input type="checkbox" id="remembreme" />
            <label htmlFor="rememberme" className="mx-1 ">
              Remember me
            </label>
          </div>
          <a href="/login">Forget my password?</a>
        </div>
        <div className="d-flex">
          <button className="btn btn-purple w-100 mt-2 fw-medium">Login</button>
        </div>
        <div className="d-flex">
          <a
            href="/signup"
            className="btn btn-outline-dark w-100 mt-2 fw-medium"
          >
            Sign Up
          </a>
        </div>
        <div className="text-center fw-medium mt-1">Or</div>
        <div className="d-flex">
          <button className="btn btn-outline-dark w-100 mt-2 fw-medium">
            Sign with google
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;
