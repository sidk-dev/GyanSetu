import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../../api/auth_api";

function ChangePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      localStorage.removeItem("token");
      window.location.href = "/login";
    },
  });

  const onSubmit = (data) => mutate(data);

  const oldPasswordError =
    errors.old_password?.message || error?.response?.data?.old_password;
  const newPasswordError =
    errors.new_password?.message || error?.response?.data?.new_password;
  const serverMessage =
    error?.response?.data?.message || error?.response?.data?.detail;

  return (
    <div className="flex-1 flex flex-col bg-bg ">
      <main className="flex-1">
        <div className="max-w-md mx-auto mt-20 p-8 border border-primary-dark rounded-xl shadow-lg bg-secondary">
          <h1 className="text-3xl mb-6 text-center font-semibold text-neutral-light">
            Change Password
          </h1>

          {isError && serverMessage && (
            <p className="mb-4 text-error text-center">{serverMessage}</p>
          )}

          {isSuccess && (
            <p className="mb-4 text-success text-center">
              Password changed successfully!
            </p>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
            noValidate
          >
            <div>
              <label className="block text-sm font-medium text-neutral-medium mb-1">
                Old Password
              </label>
              <input
                type="password"
                placeholder="Old Password"
                {...register("old_password", {
                  required: "Old password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                  maxLength: { value: 128, message: "Maximum 128 characters" },
                })}
                className={`w-full rounded-lg px-3 py-2 bg-bg text-neutral-light placeholder-neutral-medium border focus:outline-none focus:ring-2 ${
                  oldPasswordError
                    ? "border-error focus:ring-error"
                    : "border-primary-dark focus:ring-primary-light"
                }`}
              />
              {oldPasswordError && (
                <p className="mt-1 text-sm text-error">{oldPasswordError}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-medium mb-1">
                New Password
              </label>
              <input
                type="password"
                placeholder="New Password"
                {...register("new_password", {
                  required: "New password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                  maxLength: { value: 128, message: "Maximum 128 characters" },
                })}
                className={`w-full rounded-lg px-3 py-2 bg-bg text-neutral-light placeholder-neutral-medium border focus:outline-none focus:ring-2 ${
                  newPasswordError
                    ? "border-error focus:ring-error"
                    : "border-primary-dark focus:ring-primary-light"
                }`}
              />
              {newPasswordError && (
                <p className="mt-1 text-sm text-error">{newPasswordError}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-lg bg-accent py-2.5 font-medium text-neutral-dark transition hover:bg-accent-light disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Changing..." : "Change Password"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default ChangePassword;
