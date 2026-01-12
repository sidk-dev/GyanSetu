import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";
import { RouterProvider } from "react-router/dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Layout from "./Layout.jsx";
import PublicRoute from "./routes/PublicRoutes.jsx";
import ProtectedRoute from "./routes/ProtectedRoutes.jsx";

import Home from "./pages/unauthenticated/home.jsx";
import Login from "./pages/unauthenticated/login.jsx";
import Register from "./pages/unauthenticated/register.jsx";
import ForgotPassword from "./pages/unauthenticated/password/forgot-password.jsx";
import ResetPassword from "./pages/unauthenticated/password/reset-password.jsx";

import Dashboard from "./pages/authenticated/dashboard.jsx";
import Profile from "./pages/authenticated/profile.jsx";
import EditProfile from "./pages/authenticated/edit-profile.jsx";
import ChangePassword from "./pages/authenticated/change-password.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route element={<PublicRoute />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route
          path="reset-password/:uidb64/:token"
          element={<ResetPassword />}
        />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="edit-profile" element={<EditProfile />} />
        <Route path="change-password" element={<ChangePassword />} />
      </Route>
    </Route>
  )
);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
