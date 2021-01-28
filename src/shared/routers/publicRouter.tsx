import React from "react";

import { Redirect } from "react-router";
import Register from "@view/Login/Register";
import Login from "@view/Login/Login/Login";

export const publicRouter: Array<object> = [
  {
    path: "/login",
    exact: true,
    main: () => <Login />,
  },
  {
    path: "/register",
    exact: true,
    main: () => <Register />,
  },
  {
    path: "",
    exact: true,
    main: () => <Redirect to={"/register"} />,
  },
];
