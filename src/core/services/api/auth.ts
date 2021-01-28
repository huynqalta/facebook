import jwt from "jsonwebtoken";
import { SERVICES } from "@config/index";
import apiService, { ServiceCMS } from "../apiService";

export const apilogin = async (data) => {
  return await ServiceCMS.executeApi({
    path: "/api/userCms/login",
    payload: data,
    method: "post",
    config: { isPrivate: false },
    customRes: (res) => {
      return res;
    },
  });
};

export const getAccountInfo = async () => {
  return await apiService.executeApi({
    path: "api/user/profile/2cb5db85-1fbd-4f67-bab1-9c806c94373c",
    customRes: (res) => {
      // return new User(res.data.data);
    },
  });
};

export const getToken = () => {
  return localStorage.getItem(SERVICES.AuthenticationHeaderField);
};

export const setToken = (token) => {
  localStorage.setItem(SERVICES.AuthenticationHeaderField, token);
};

export const clearToken = () => {
  localStorage.removeItem(SERVICES.AuthenticationHeaderField);
};

export const getInfoFromToken = () => {
  const token = getToken();
  if (!token) return;
  return jwt.decode(token);
};
