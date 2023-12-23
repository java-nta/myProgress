import { Navigate, createBrowserRouter } from "react-router-dom";
import Authentication from "./authentication/Authentication";
import Login from "./authentication/Login";
import SignUp from "./authentication/SignUp";
import UserManager from "./mini-coding/user manager/UserManager";
import AppLayout from "./mini-coding/AppLayout";
import Dashboard from "./mini-coding/Dashboard";
import UiDesign from "./mini-coding/uidesgin/UiDesign";

const router = createBrowserRouter([
  {
    path: process.env.PUBLIC_URL + "/",
    element: <AppLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: process.env.PUBLIC_URL + "/",
        element: <Navigate to="/dashboard" />,
      },
      {
        path: process.env.PUBLIC_URL + "usermanager",
        element: <UserManager />,
      },
      {
        path: process.env.PUBLIC_URL + "uidesign",
        element: <UiDesign />,
      },
    ],
  },

  {
    path: process.env.PUBLIC_URL + "/",
    element: <Authentication />,
    children: [
      {
        path: process.env.PUBLIC_URL + "login",
        element: <Login />,
      },
      {
        path: process.env.PUBLIC_URL + "signup",
        element: <SignUp />,
      },
    ],
  },
]);
export default router;
