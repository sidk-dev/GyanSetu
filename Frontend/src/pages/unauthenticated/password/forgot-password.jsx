import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router";
import { forgotPassword } from "../../../api/unauth_api";

function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: forgotPassword,
  });

  const onSubmit = (data) => mutate(data);

  return (
    <div className="flex flex-1 items-center justify-center px-6 py-6">
      <div className="w-full max-w-md border shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center text-accent mb-2">
          Forgot Password 🔐
        </h1>
        <p className="text-center text-gray-200 mb-4">
          Enter your email to receive a reset link
        </p>

        {/* Server error */}
        {isError && (
          <div className="pb-2 text-center text-sm text-red-500">
            {error?.response?.data?.message ||
              "Failed to request password reset"}
          </div>
        )}

        {/* Success message */}
        {isSuccess && (
          <div className="pb-2 text-center text-sm text-green-500">
            Check your inbox for the reset link
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
              className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-md bg-cyan-600 py-2.5 text-white font-semibold hover:bg-cyan-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Sending..." : "Send reset link"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <Link to="/login" className="text-accent hover:underline">
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
