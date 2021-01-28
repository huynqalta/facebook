import Schedule from "src/ui/view/Schedule";
import * as Loadable from "react-loadable";
import { router } from "./../translateKey/index";
import PageNotFound from "src/ui/view/PageNotFound";
import React from "react";
import LoadingComponent from "@components/commons/LoadingComponent/loadingComponent";
import { USERSYSTEM } from "@config/index";
import UserSystem from "@view/UserSystem";

export const Employee = Loadable({
  loader: () => import("@view/Employee"),
  loading: LoadingComponent,
});

export const Profile = Loadable({
  loader: () => import("@view/Employee/component/Profile"),
  loading: LoadingComponent,
});

export const TagManager = Loadable({
  loader: () => import("@view/TagManager"),
  loading: LoadingComponent,
});

export const Group = Loadable({
  loader: () => import("@view/Group"),
  loading: LoadingComponent,
});

export const Test = Loadable({
  loader: () => import("@view/Test"),
  loading: LoadingComponent,
});
export const TestHoa = Loadable({
  loader: () => import("@view/TestHoa"),
  loading: LoadingComponent,
});

import {
  SCHEDULE_DETAILS,
  DETAI_MODULE,
  PAGE,
  PAGE_DETAIL,
  DETAI_MODULE_PAGE,
  MEDIA_ASSET,
  TAG_MANAGER,
  GROUP,
} from "@config/index";
import FormArticle from "@view/Category/component/Article/FormArticle";
import Parameter from "@view/Parameter";

export const privateRouter: Array<object> = [
  {
    path: "/",
    exact: true,
    permissionCode: "ALLOW",
    main: () => <Employee />,
  },
  {
    path: ["/employee", "/employee/:from/:Id"],
    exact: true,
    permissionCode: "ALLOW",
    main: () => <Employee />,
  },
  {
    path: ["/profile/:type", "/profile/:type/:idEmployee"],
    exact: true,
    permissionCode: "ALLOW",
    main: () => <Profile />,
  },
  {
    path: USERSYSTEM,
    exact: true,
    permissionCode: "ALLOW",
    main: () => <UserSystem />,
  },
  {
    path: GROUP,
    exact: true,
    permissionCode: "ALLOW",
    main: () => <Group />,
  },
  {
    path: TAG_MANAGER,
    exact: true,
    permissionCode: "ALLOW",
    main: () => <TagManager />,
  },
  {
    path: "/testHoa",
    exact: true,
    permissionCode: "ALLOW",
    main: () => <TestHoa />,
  },
  {
    path: "/parameter",
    exact: true,
    permissionCode: "ALLOW",
    main: () => <Parameter />,
  },
  // {
  //   path: MEDIA_ASSET,
  //   exact: true,
  //   permissionCode: "ALLOW",
  //   main: () => <MediaAsset />,
  // },

  {
    path: "",
    exact: true,
    permissionCode: "ALLOW",
    main: () => <PageNotFound />,
  },
];
