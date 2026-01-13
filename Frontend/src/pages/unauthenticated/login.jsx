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

  const emailError = errors?.email?.message || error?.response?.data?.email;

  const passwordError =
    errors?.password?.message || error?.response?.data?.password;

  return (
    <div className="flex flex-1">
      {/* Left: Form */}
      <div className="flex w-full md:w-1/2 items-center justify-center px-6 py-6">
        <div className="w-full max-w-md border shadow-lg rounded-xl p-8">
          <h1 className="text-3xl font-bold text-center text-accent mb-2">
            Welcome Back 👋
          </h1>
          <p className="text-center text-gray-200 mb-4">
            Please Log In to your account
          </p>

          {/* Server error */}
          {isError && (
            <div className="pb-2 text-center text-sm text-red-500">
              {error?.response?.data?.message || "Login failed"}
            </div>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-5"
          >
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Email address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                  emailError ? "border-red-500" : "border-gray-300"
                }`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid email address",
                  },
                })}
              />
              {emailError && (
                <p className="mt-1 text-sm text-red-500">{emailError}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                  passwordError ? "border-red-500" : "border-gray-300"
                }`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters",
                  },
                  maxLength: {
                    value: 128,
                    message: "Password is too long",
                  },
                })}
              />
              {passwordError && (
                <p className="mt-1 text-sm text-red-500">{passwordError}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-md bg-cyan-600 py-2.5 text-white font-semibold hover:bg-cyan-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
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

      <div className="hidden md:flex w-1/2 items-center justify-center ">
        <img src={LoginSvg} alt="Login illustration" className="max-w-[75%]" />
      </div>
    </div>
  );
}

export default Login;
