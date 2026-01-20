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

  const resetPasswordFn = (data) => {
    resetPassword(uidb64, token, data.new_password);
  };

  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: (data) => resetPasswordFn(data),
    onSuccess: () => navigate("/login"),
  });

  const onSubmit = (data) => mutate(data);

  const inputBase =
    "w-full rounded-lg px-3 py-2 bg-bg text-neutral-light placeholder-neutral-medium border focus:outline-none focus:ring-2";

  return (
    <div className="flex flex-1 min-h-screen items-center justify-center bg-bg px-6">
      <div className="w-full max-w-md rounded-xl border border-primary-dark bg-secondary p-8 shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-neutral-light mb-2">
          Reset Password
        </h1>
        <p className="text-center text-neutral-medium mb-6">
          Enter a new password to continue
        </p>

        {isError && (
          <p className="mb-4 text-center text-sm text-error">
            {error?.response?.data?.message || "Failed to reset password"}
          </p>
        )}

        {isSuccess && (
          <p className="mb-4 text-center text-sm text-success">
            Password reset successful! Redirecting to login...
          </p>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-5"
        >
          <div>
            <label className="block text-sm font-medium text-neutral-medium mb-1">
              New Password
            </label>
            <input
              type="password"
              {...register("new_password", {
                required: "New password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
                maxLength: { value: 128, message: "Maximum 128 characters" },
              })}
              className={`${inputBase} ${
                errors.new_password
                  ? "border-error focus:ring-error"
                  : "border-primary-dark focus:ring-primary-light"
              }`}
            />
            {errors.new_password && (
              <p className="mt-1 text-sm text-error">
                {errors.new_password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-lg bg-accent py-2.5 font-medium text-neutral-dark transition hover:bg-accent-light disabled:opacity-50 disabled:cursor-not-allowed"
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
