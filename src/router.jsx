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
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path:"/",
        element: <Navigate to="/dashboard"/>
      },
      {
        path: "usermanager",
        element: <UserManager />,
      },
      {
        path: "uidesign",
        element: <UiDesign />,
      },
    ],
  },

  {
    path: "/",
    element: <Authentication />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
]);
export default router;
