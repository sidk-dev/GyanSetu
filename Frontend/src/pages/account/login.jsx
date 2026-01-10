import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, Link } from "react-router";

const sendLoginData = async (data) => {
  const response = await axios.post(
    "http://127.0.0.1:8000/api/accounts/login/",
    data,
    { headers: { "Content-Type": "application/json" } }
  );
  return response.data;
};

function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: sendLoginData,
    onSuccess: (data) => {
      console.log("On Success: ", data);
      localStorage.setItem("token", data.token);
      navigate("/", { replace: true });
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <div className="flex-1 flex flex-col">
      <main className="flex-1">
        <div className="max-w-md mx-auto mt-20 p-6 border rounded">
          <h1 className="text-3xl mb-6 text-center">Login</h1>

          {/* Server error */}
          {isError && (
            <p className="mb-4 text-red-600 text-center">
              {error?.response?.data?.message || "Login failed"}
            </p>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Email */}
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 border rounded"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Entered value does not match email format",
                  },
                })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password */}
            <div className="mb-6">
              <input
                type="password"
                placeholder="Password"
                className="w-full p-2 border rounded"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  maxLength: {
                    value: 128,
                    message: "Password is too long",
                  },
                })}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-cyan-600 text-white py-2 rounded disabled:opacity-50"
            >
              {isPending ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Extra buttons */}
          <div className="mt-4 flex justify-between">
            <Link
              to="/forgot-password"
              className="text-sm text-accent hover:underline"
            >
              Forgot Password?
            </Link>
            <Link
              to="/register"
              className="text-sm text-accent hover:underline"
            >
              Register
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;
