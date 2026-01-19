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

  const inputBase =
    "w-full rounded-lg px-3 py-2 bg-bg text-neutral-light placeholder-neutral-medium border focus:outline-none focus:ring-2";

  return (
    <div className="flex flex-1 min-h-screen items-center justify-center bg-bg px-6">
      <div className="w-full max-w-md rounded-xl border border-primary-dark bg-secondary p-8 shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-neutral-light mb-2">
          Forgot Password
        </h1>
        <p className="text-center text-neutral-medium mb-6">
          Enter your email to receive a reset link
        </p>

        {isError && (
          <p className="mb-4 text-center text-sm text-error">
            {error?.response?.data?.message ||
              "Failed to request password reset"}
          </p>
        )}

        {isSuccess && (
          <p className="mb-4 text-center text-sm text-success">
            Check your inbox for the reset link
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
              {...register("email", { required: "Email is required" })}
              className={`${inputBase} ${
                errors.email
                  ? "border-error focus:ring-error"
                  : "border-primary-dark focus:ring-primary-light"
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-error">{errors.email.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-lg bg-accent py-2.5 font-medium text-neutral-dark transition hover:bg-accent-light disabled:opacity-50 disabled:cursor-not-allowed"
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
