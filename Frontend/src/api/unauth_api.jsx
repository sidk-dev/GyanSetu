import axios from "axios";
import { BASE_URL } from "../constants/axiosBase";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Login
export const login = async (data) => {
  const res = await api.post("accounts/login/", data);
  return res.data;
};

// Register
export const registerApi = async (data) => {
  const res = await api.post("accounts/register/", data);
  return res.data;
};

// Forgot password
export const forgotPassword = async (data) => {
  const res = await api.post("accounts/forgot-password/", data);
  return res.data;
};

// Reset password
export const resetPassword = async ({ uidb64, token, new_password }) => {
  const res = await api.post(`accounts/reset-password/${uidb64}/${token}/`, {
    new_password,
  });
  return res.data;
};

// Get districts by region (public)
export const getDistricts = async (region) => {
  const res = await api.get(`accounts/districts/${region}`);
  return Object.entries(res.data).map(([value, label]) => ({
    value,
    label,
  }));
};
