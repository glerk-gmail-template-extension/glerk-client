import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "jotai";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import CreateGroup from "./pages/Group/Modal/CreateGroup";
import UpdateGroup from "./pages/Group/Modal/UpdateGroup";
import DeleteGroup from "./pages/Group/Modal/DeleteGroup";
import Main from "./pages/Main";
import Template from "./pages/Template";
import ErrorPage from "./pages/Error";
import AppWrapper from "./components/ui/AppWrapper";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppWrapper />,
    children: [
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        index: true,
        element: <Navigate replace to="/groups" />,
      },
      {
        path: "groups",
        element: <Main />,
        children: [
          { path: "new", element: <CreateGroup /> },
          { path: "edit/:groupId", element: <UpdateGroup /> },
          { path: "delete/:groupId", element: <DeleteGroup /> },
        ],
      },
      { path: "templates/new", element: <Template /> },
      {
        path: "templates/edit/:templateId",
        element: <Template />,
      },
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
