import { useEffect, useState } from "react";
import "./Usermanager.css";
import api from "../../Api";
import $ from "jquery";
import ToastMessage from "../core/ToastMessage";
import ShowPasswordEye from "../core/ShowPasswordEye";
const UserManager = () => {
  /*----------------
    Inputs section
    ----------------*/
  const [allInputs, setAllInputs] = useState({
    search: "",
    username: "",
    password: "",
    confirmation: "",
    email: "",
    userId: "",
  });

  const onChange = (e) => {
    invalidInput("*", false);
    if (e.target.name === "password" || e.target.name === "confirmation") {
      passwordMatch();
    }
    if (e.target.name === "userId" && e.target.value <= 0) {
      e.target.value = null;
    }
    setAllInputs({ ...allInputs, [e.target.name]: e.target.value });
  };
  const emptyInputs = () => {
    setAllInputs({
      search: "",
      username: "",
      password: "",
      confirmation: "",
      email: "",
      userId: "",
    });
  };
  /*--------------
    Modal toggles
    --------------*/
  const addModalToggle = () => {
    invalidInput("*", false);
    emptyInputs();
    $(".delete-modal").removeClass("manager-modal-show");
    $(".add-modal").toggleClass("manager-modal-show");
  };
  const deleteModalToggle = () => {
    emptyInputs();
    invalidInput("#id", false);
    $(".add-modal").removeClass("manager-modal-show");
    $(".delete-modal").toggleClass("manager-modal-show");
  };
  const passwordMatch = () => {
    let passwordInputs = document.querySelectorAll("#password, #confirmation");

    if (
      passwordInputs[0].value.length < 8 ||
      passwordInputs[0].value !== passwordInputs[1].value
    ) {
      $("#password, #confirmation").addClass("border-danger");
      $("#submit-form").attr("disabled", "");
    } else {
      $("#password, #confirmation").removeClass("border-danger");
      $("#submit-form").removeAttr("disabled");
    }
  };
  /*-------------
   & validation inputs
    -------------*/

  const invalidInput = (selector, on = true) => {
    on
      ? $(selector).addClass("border-danger")
      : $(selector).removeClass("border-danger");
  };

  /*----------------
    Api requests
    ----------------*/
  const [users, setUsers] = useState([]);
  const [toast, setToast] = useState(null);
  useEffect(() => {
    api
      .get("/user/")
      .then(({ data }) => {
        setUsers(data);
      })
      .catch((er) => console.log(er));
  }, []);
  const refresh = () => {
    api
      .get("/user/")
      .then(({ data }) => {
        emptyInputs();
        setUsers(data);
      })
      .catch((er) => console.log(er));
  };
  const deleteUserHandler = (e) => {
    setToast(null);
    e.preventDefault();
    api
      .delete(`/user/${allInputs.userId}`)
      .then((response) => {
        deleteModalToggle();
        invalidInput("id", false);
        refresh();
        setToast(
          <ToastMessage
            icon={"fa-trash"}
            iconColor={"text-danger"}
            headMssg={"Delete"}
            bodyMssg={"User has been deleted."}
          />
        );
      })
      .catch((err) => {
        invalidInput("#id");
        setToast(
          <ToastMessage
            icon={"fa-exclamation"}
            iconColor={"text-danger"}
            headMssg={"Warning"}
            bodyMssg={"User id not founded."}
          />
        );
      });
  };
  const addUserHandler = (e) => {
    setToast(null);
    e.preventDefault();
    api
      .post("/auth/signup", {
        username: allInputs.username,
        password: allInputs.password,
        email: allInputs.email,
      })
      .then((response) => {
        addModalToggle();
        refresh();
        setToast(
          <ToastMessage
            icon={"fa-circle-check"}
            iconColor={"text-success"}
            headMssg={"Success"}
            bodyMssg={"User has been added."}
          />
        );
      })
      .catch(({ response }) => {
        const errors = response.data.errors;
        if (response.status === 400) {
          if (errors) {
            switch (true) {
              case Boolean(errors.username): {
                invalidInput("#username");
                setToast(
                  <ToastMessage
                    icon={"fa-exclamation ps-3"}
                    iconColor={"text-warning"}
                    headMssg={"Warning"}
                    bodyMssg={errors.username}
                  />
                );
                break;
              }
              case errors.email: {
                invalidInput("#email");
                setToast(
                  <ToastMessage
                    icon={"fa-exclamation ps-3"}
                    iconColor={"text-warning"}
                    headMssg={"Warning"}
                    bodyMssg={errors.email}
                  />
                );
                break;
              }
              default: {
                invalidInput("#password");
                setToast(
                  <ToastMessage
                    icon={"fa-exclamation ps-3"}
                    iconColor={"text-warning"}
                    headMssg={"Warning"}
                    bodyMssg={errors.password}
                  />
                );
                break;
              }
            }
          } else {
            invalidInput("#username,#email");
            setToast(
              <ToastMessage
                icon={"fa-exclamation ps-3"}
                iconColor={"text-warning"}
                headMssg={"Warning"}
                bodyMssg={"Username or email exist"}
              />
            );
          }
        } else {
          console.error(response);
        }
      });
  };
  const searchHandler = (e) => {
    e.preventDefault();
    api
      .get(`/user/${allInputs.search}`)
      .then(({ data }) => {
        setUsers(data);
        if (data.length === 0) {
          setToast(
            <ToastMessage
              icon={"fa-close"}
              iconColor={"text-warning"}
              headMssg={"Warning"}
              bodyMssg={"No user found."}
            />
          );
        }
      })
      .catch((er) => console.log(er));
  };
  const deleteAll = (e) => {
    setToast(null);
    api
      .delete("/user/all")
      .then((response) => {
        deleteModalToggle();
        refresh();
        setToast(
          <ToastMessage
            icon={"fa-trash"}
            iconColor={"text-danger"}
            headMssg={"Delete"}
            bodyMssg={"All User are deleted."}
          />
        );
      })
      .catch(({ response }) => {
        console.log(response.data);
      });
  };
  return (
    <>
      {toast && toast}
      <div className="user-manager d-flex flex-column align-items-center">
        <div className="">
          <h1 className="text-dingo mt-5 d-flex align-items-center gap-2">
            <i className="fa fa-database"></i>
            <span>User manager</span>
          </h1>
        </div>
        {/* MANAGER MENU */}
        <div className="manager-menu d-flex align-items-center flex-wrap">
          <form
            action=""
            onSubmit={searchHandler}
            className="d-flex align-items-center gap-1"
          >
            <input
              value={allInputs.search}
              onChange={onChange}
              type="text"
              name="search"
              placeholder="search by username"
              className="w-100"
            />
            <button className="btn btn-search">
              <i className="fa fa-search"></i>
            </button>
            <button type="button" onClick={refresh} className="btn btn-search">
              <i className="fa fa-arrows-rotate"></i>
            </button>
          </form>
          <div className="d-flex align-items-center gap-1">
            <button
              onClick={addModalToggle}
              type="button"
              className="btn d-flex align-items-center gap-1"
            >
              <i className="fa fa-plus"></i>
              <span className="fw-medium">Add</span>
            </button>
            <button
              onClick={deleteModalToggle}
              type="button"
              className="btn d-flex align-items-center gap-1"
            >
              <i className="fa fa-trash"></i>
              <span className="fw-medium">Delete</span>
            </button>
          </div>
        </div>
        {/* MANAGER MODAL FORM */}
        <div className="d-flex flex-column add-modal manager-modal gap-1">
          <h1>Add User</h1>
          <form
            onSubmit={addUserHandler}
            action=""
            className="form-login d-flex flex-column gap-2 mt-4"
          >
            <div className="d-flex flex-column gap-1">
              <input
                value={allInputs.username}
                required
                onChange={onChange}
                type="text"
                id="username"
                name="username"
                placeholder="Username"
              />
              <p className="text-danger fade d-none small m-0 px-1">
                Username exist
              </p>
            </div>
            <div className="d-flex flex-column gap-1">
              <input
                value={allInputs.email}
                required
                onChange={onChange}
                name="email"
                type="email"
                id="email"
                placeholder="Email"
              />
            </div>
            <div className="d-flex flex-column gap-1 mt-1 position-relative">
              <input
                autoComplete="password"
                value={allInputs.password}
                required
                onChange={onChange}
                name="password"
                type="password"
                id="password"
                placeholder="password"
              />
            </div>
            <div className="d-flex flex-column gap-1 mt-1 position-relative">
              <input
                autoComplete="password"
                value={allInputs.confirmation}
                required
                type="password"
                id="confirmation"
                onChange={onChange}
                name="confirmation"
                placeholder="Confirme password"
              />
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex gap-1">
                <button className="btn" id="submit-form">
                  <span className="fw-medium">Add</span>
                </button>
                <button onClick={addModalToggle} type="button" className="btn">
                  <span className="fw-medium">Cancel</span>
                </button>
              </div>
              <ShowPasswordEye />
            </div>
          </form>
        </div>
        <div className="delete-modal d-flex flex-column manager-modal gap-1">
          <h1>Delete User</h1>
          <p></p>
          <form
            action=""
            onSubmit={deleteUserHandler}
            className="form-login d-flex flex-column gap-2"
          >
            <div className="d-flex flex-column gap-1">
              <input
                value={allInputs.userId}
                onChange={onChange}
                type="number"
                name="userId"
                id="id"
                placeholder="Enter the user Id"
              />
            </div>
            <p className="text-danger small m-0">
              *Double the check the Id before deleting !
            </p>
            <div className="d-flex justify-content-end gap-1">
              <button className="btn " type="button" onClick={deleteAll}>
                <span className="fw-medium">Delete All</span>
              </button>
              <button className="btn">
                <span className="fw-medium">Delete</span>
              </button>
              <button onClick={deleteModalToggle} type="button" className="btn">
                <span className="fw-medium">Cancel</span>
              </button>
            </div>
          </form>
        </div>
        {/* USERS LIST */}
        <div className="user-list">
          <table>
            <thead>
              <tr>
                <td>#id</td>
                <td>username</td>
                <td>email</td>
                <td>roles</td>
                <td>created at</td>
                <td>actions</td>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td className="user-role">
                      {user.roles.split(",").map((role) => (
                        <span key={role}>
                          {(role + "").substring(5).toLocaleUpperCase()}
                        </span>
                      ))}
                    </td>
                    <td>{user.createdAt}</td>
                    <td className="">
                      <i className="fa fa-edit"></i>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6}>No user founded</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default UserManager;
