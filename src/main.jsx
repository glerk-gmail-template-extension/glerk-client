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
import ErrorPage from "./pages/Error";
import DeleteTemplate from "./pages/Template/Modal/DeleteTemplate";
import DeleteTemplates from "./pages/Template/Modal/DeleteTemplates";
import AppWrapper from "./components/ui/AppWrapper";

import "./index.css";
import CreateTemplate from "./pages/Template/CreateTemplate";
import UpdateTemplate from "./pages/Template/UpdateTemplate";

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
          {
            path: ":groupId/delete/templates",
            element: <DeleteTemplates />,
          },
        ],
      },
      { path: "templates/new", element: <CreateTemplate /> },
      {
        path: "templates/edit/:templateId",
        element: <UpdateTemplate />,
        children: [{ path: "delete", element: <DeleteTemplate /> }],
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
