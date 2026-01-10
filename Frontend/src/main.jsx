import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";
import { RouterProvider } from "react-router/dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Layout from "./Layout.jsx";
import Home from "./pages/main/home.jsx";
import Login from "./pages/account/login.jsx";
import Register from "./pages/account/register.jsx";
import ChangePassword from "./pages/account/password/change_password.jsx";
import ResetPassword from "./pages/account/password/reset_password.jsx";
import ForgotPassword from "./pages/account/password/forgot_password.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" Component={Layout}>
      <Route path="" Component={Home} />
      <Route path="login" Component={Login} />
      <Route path="register" Component={Register} />
      <Route path="change-password" Component={ChangePassword} />
      <Route path="forgot-password" Component={ForgotPassword} />
      <Route path="reset-password/:uidb64/:token" Component={ResetPassword} />
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
