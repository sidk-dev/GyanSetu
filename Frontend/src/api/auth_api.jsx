import axios from "axios";
import { BASE_URL } from "../constants/axiosBase";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Runs before a request is sent
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

// Change password (authenticated)
export const changePassword = async (data) => {
  const res = await api.post("accounts/change-password/", data);
  return res.data;
};

// Get logged-in user profile
export const getProfile = async () => {
  const res = await api.get("accounts/");
  return res.data;
};

export const getUserProfileById = async (userId) => {
  const res = await api.get(`accounts/?id=${userId}`);
  return res;
};

// Update logged-in user profile
export const updateProfile = async (data) => {
  const res = await api.patch("accounts/", data);
  return res.data;
};

// Create a new slot
export const createSlot = async (payload) => {
  const { data } = await api.post("slots/", payload);
  return data;
};

// Book a slot
export const bookSlot = async (slotId) => {
  const { data } = await api.post(`slots/book/${slotId}/`);
  return data;
};

// Delete a slot
export const deleteSlot = async (slotId) => {
  const { data } = await api.delete(`slots/${slotId}/`);
  return data;
};

// Fetch slots (supports pagination & optional profile filter)
export const fetchSlots = async ({ pageParam = null, queryKey }) => {
  const [, { isProfile, userId }] = queryKey;

  const params = new URLSearchParams();

  if (pageParam) params.append("page_cursor", pageParam);
  if (isProfile) params.append("is_profile", "true");
  if (userId) params.append("id", userId);

  const url = `slots/?${params.toString()}`;
  const { data } = await api.get(url);

  return data;
};

// Get user's skills
export const getSkills = async (userId) => {
  let response;

  if (userId) {
    response = await api.get(`skills/?id=${userId}`);
  } else {
    response = await api.get("skills/");
  }

  return response.data;
};

// Save a skill
export const saveSkill = async (payload) => {
  const { data } = await api.post("skills/", payload);
  return data;
};

// Delete a skill
export const deleteSkill = async (id) => {
  const { data } = await api.delete(`skills/${id}/`);
  return data;
};
