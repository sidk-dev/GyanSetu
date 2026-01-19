import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router";
import { login } from "../../api/unauth_api";
import LoginSvg from "../../assets/login.svg";

function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      navigate("/dashboard", { replace: true });
    },
  });

  const onSubmit = (data) => mutate(data);

  const emailError = errors.email?.message || error?.response?.data?.email;
  const passwordError =
    errors.password?.message || error?.response?.data?.password;

  return (
    <div className="flex flex-1 min-h-screen bg-bg ">
      <div className="flex w-full md:w-1/2 items-center justify-center px-6">
        <div className="w-full max-w-md rounded-xl border border-primary-dark bg-secondary p-8 shadow-lg">
          <h1 className="text-3xl font-semibold text-center text-neutral-light mb-2">
            Welcome Back
          </h1>
          <p className="text-center text-neutral-medium mb-6">
            Log in to continue
          </p>

          {isError && (
            <p className="mb-4 text-center text-sm text-error">
              {error?.response?.data?.message || "Login failed"}
            </p>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-5"
          >
            <div>
              <label className="block text-sm font-medium text-neutral-medium mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid email address",
                  },
                })}
                className={`w-full rounded-lg px-3 py-2 bg-bg text-neutral-light placeholder-neutral-medium border focus:outline-none focus:ring-2 ${
                  emailError
                    ? "border-error focus:ring-error"
                    : "border-primary-dark focus:ring-primary-light"
                }`}
              />
              {emailError && (
                <p className="mt-1 text-sm text-error">{emailError}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-medium mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                  maxLength: { value: 128, message: "Password is too long" },
                })}
                className={`w-full rounded-lg px-3 py-2 bg-bg text-neutral-light placeholder-neutral-medium border focus:outline-none focus:ring-2 ${
                  passwordError
                    ? "border-error focus:ring-error"
                    : "border-primary-dark focus:ring-primary-light"
                }`}
              />
              {passwordError && (
                <p className="mt-1 text-sm text-error">{passwordError}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-lg bg-accent py-2.5 font-medium text-neutral-dark transition hover:bg-accent-light disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Signing in..." : "Log In"}
            </button>
          </form>

          <div className="mt-6 flex justify-between text-sm">
            <Link to="/forgot-password" className="text-accent hover:underline">
              Forgot password?
            </Link>
            <Link
              to="/register"
              className="text-accent hover:underline font-medium"
            >
              Create account
            </Link>
          </div>
        </div>
      </div>

      <div className="hidden md:flex w-1/2 items-center justify-center">
        <img src={LoginSvg} alt="Login" className="max-w-[75%]" />
      </div>
    </div>
  );
}

export default Login;
