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
import CreateGroup from "./pages/Group/CreateGroup";
import UpdateGroup from "./pages/Group/UpdateGroup";
import DeleteGroup from "./pages/Group/DeleteGroup";
import TemplateList from "./pages/TemplateList";
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
        element: <Navigate replace to="/templates" />,
      },
      {
        path: "templates",
        element: <TemplateList />,
        children: [
          { path: "groups/new", element: <CreateGroup /> },
          { path: "groups/edit", element: <UpdateGroup /> },
          { path: "groups/delete", element: <DeleteGroup /> },
        ],
      },
      { path: "templates/new", element: <Template /> },
      { path: "templates/edit/:id", element: <Template /> },
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
