import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../../../api/unauth_api";

function ResetPassword() {
  const { uidb64, token } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: (data) => resetPassword(uidb64, token, data.new_password),
    onSuccess: () => {
      navigate("/login");
    },
  });

  const onSubmit = (data) => mutate(data);

  return (
    <div className="flex flex-1 items-center justify-center px-6 py-6">
      <div className="w-full max-w-md border shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center text-accent mb-2">
          Reset Password 🔑
        </h1>
        <p className="text-center text-gray-200 mb-4">
          Enter a new password to continue
        </p>

        {/* Server error */}
        {isError && (
          <div className="pb-2 text-center text-sm text-red-500">
            {error?.response?.data?.message || "Failed to reset password"}
          </div>
        )}

        {isSuccess && (
          <div className="pb-2 text-center text-sm text-green-500">
            Password reset successful! Redirecting to login...
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-5"
        >
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              New Password
            </label>
            <input
              type="password"
              className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                errors.new_password ? "border-red-500" : "border-gray-300"
              }`}
              {...register("new_password", {
                required: "New password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
                maxLength: { value: 128, message: "Maximum 128 characters" },
              })}
            />
            {errors.new_password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.new_password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-md bg-cyan-600 py-2.5 text-white font-semibold hover:bg-cyan-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <a href="/login" className="text-accent hover:underline">
            Back to login
          </a>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
