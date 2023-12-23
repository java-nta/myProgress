import ToastMessage from "../mini-coding/core/ToastMessage";
import api from "../Api";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import $ from "jquery";
import ShowPasswordEye from "../mini-coding/core/ShowPasswordEye";

const SignUp = () => {
  const [toast, setToast] = useState(null);
  const [redirect, setRedirect] = useState(null);
  const [allInputs, setAllInputs] = useState({
    username: "",
    password: "",
    confirmation: "",
    email: "",
  });
  useEffect(() => {
    setToast(null);
    setRedirect(null);
  }, []);
  const passwordMatch = () => {
    let passwordInputs = document.querySelectorAll("#password, #confirmation");
    if (passwordInputs[0].value.length < 8) {
      $("#password, #confirmation").addClass("border-danger");
      $("#submit-form").attr("disabled", "");
    } else {
      $("#password, #confirmation").removeClass("border-danger");
      $("#submit-form").removeAttr("disabled");
    }
    if (passwordInputs[0].value !== passwordInputs[1].value) {
      $("#password, #confirmation").addClass("border-danger");
      $("#submit-form").attr("disabled", "");
    } else {
      $("#password, #confirmation").removeClass("border-danger");
      $("#submit-form").removeAttr("disabled");
    }
  };
  const onChange = (e) => {
    invalidInput(`#${e.target.name}`, false);
    passwordMatch();
    if (e.target.name === "userId" && e.target.value <= 0) {
      e.target.value = null;
    }
    setAllInputs({ ...allInputs, [e.target.name]: e.target.value });
  };
  const invalidInput = (selector, on = true) => {
    on
      ? $(selector).addClass("border-danger")
      : $(selector).removeClass("border-danger");
  };
  const signUpHandler = (e) => {
    setToast(null);
    e.preventDefault();
    api
      .post("/auth/signup", {
        username: allInputs.username,
        email: allInputs.email,
        password: allInputs.password,
      })
      .then((response) => {
        if (response.status === 201) {
          setToast(
            <ToastMessage
              icon={"fa fa-circle-check ps-3"}
              iconColor={"text-success"}
              headMssg={"Created"}
              bodyMssg={
                "Your account created. You will be directed to login page"
              }
            />
          );
          setTimeout(() => {
            setRedirect(true);
          }, 4000);
        }
      })
      .catch(({ response }) => {
        if (response && response.data.errors) {
          const er = response.data.errors;
          switch (true) {
            case Boolean(er.username): {
              setToast(
                <ToastMessage
                  icon={"fa-close ps-3"}
                  iconColor={"text-danger"}
                  headMssg={"Warning"}
                  bodyMssg={er.username}
                />
              );
              break;
            }
            case Boolean(er.email): {
              setToast(
                <ToastMessage
                  icon={"fa-close ps-3"}
                  iconColor={"text-danger"}
                  headMssg={"Warning"}
                  bodyMssg={er.email}
                />
              );
              break;
            }
            case Boolean(er.password): {
              setToast(
                <ToastMessage
                  icon={"fa-close ps-3"}
                  iconColor={"text-danger"}
                  headMssg={"Warning"}
                  bodyMssg={er.password}
                />
              );
              break;
            }
            default: {
            }
          }
        } else {
          setToast(
            <ToastMessage
              icon={"fa-close ps-3"}
              iconColor={"text-danger"}
              headMssg={"Warning"}
              bodyMssg={"Username or Email already used."}
            />
          );
        }
      });
  };
  // const signUpHandler = async (e) => {
  //   e.preventDefault();
  //   setToast(null);
  //   const response = await signUp(allInputs);
  //   if (response) {
  //     switch (true) {
  //       case response === 201: {
  //         setToast(
  //           <ToastMessage
  //             icon={"fa fa-circle-check"}
  //             iconColor={"success"}
  //             headMssg={"Created"}
  //             bodyMssg={
  //               "Your account created. You will be directed to login page"
  //             }
  //           />
  //         );
  //         setTimeout(() => {
  //           setRedirect(true)
  //         }, 5500);
  //         break;
  //       }
  //       case response.username :{
  //         console.log(redirect.username);
  //         break
  //       }
  //       default: {
  //         setToast(
  //           <ToastMessage
  //             icon={"fa-close ps-3"}
  //             iconColor={"text-danger"}
  //             headMssg={"Warning"}
  //             bodyMssg={response}
  //           />
  //         );
  //       }
  //     }
  //   }
  // };
  if (redirect) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      {toast}
      <form
        action=""
        onSubmit={signUpHandler}
        className="form-login d-flex flex-column"
      >
        <p className="text-light m-0">
          Ready to create a new account! Enter your information and join the
          team
        </p>
        <div className="d-flex flex-column gap-1">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={onChange}
          />
        </div>
        <div className="d-flex flex-column gap-1">
          <label htmlFor="username">Email</label>
          <input type="email" id="email" name="email" onChange={onChange} />
        </div>
        <div className="d-flex flex-column gap-1 mt-1 position-relative">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            autoComplete=""
            name="password"
            onChange={onChange}
          />
        </div>
        <div className="d-flex flex-column gap-1 mt-1 position-relative">
          <label htmlFor="password">Confirme password</label>
          <input
            type="password"
            id="confirmation"
            autoComplete=""
            name="confirmation"
            onChange={onChange}
          />
        </div>
        <div className="d-flex justify-content-between mt-1">
          <div className="d-flex align-items-center gap-1">
            <input type="checkbox" id="remembreme" />
            <label htmlFor="rememberme" className="mx-1">
              Recive update
            </label>
          </div>
          <ShowPasswordEye />
        </div>
        <div className="d-flex">
          <button className="btn btn-purple w-100 mt-2 fw-medium">
            Sign up
          </button>
        </div>
        <div className="d-flex">
          <a
            href="/login"
            className="btn btn-outline-dark w-100 mt-2 fw-medium"
          >
            Login
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

export default SignUp;
