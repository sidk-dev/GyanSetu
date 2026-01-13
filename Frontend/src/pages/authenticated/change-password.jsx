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
      // console.log("Password changed successfully");
      localStorage.removeItem("token");
      window.location.href = "/login";
    },
    // onError: (error) => {
    //   console.log(error);
    // },
  });

  const onSubmit = (data) => mutate(data);

  const oldPasswordError =
    errors.old_password?.message || error?.response?.data?.old_password;
  const newPasswordError =
    errors.new_password?.message || error?.response?.data?.new_password;
  const serverMessage =
    error?.response?.data?.message || error?.response?.data?.detail;

  return (
    <div className="flex-1 flex flex-col ">
      <main className="flex-1">
        <div className="max-w-md mx-auto mt-20 p-8 border rounded-xl shadow-lg">
          <h1 className="text-3xl mb-6 text-center font-bold text-accent">
            Change Password
          </h1>

          {/* Server error */}
          {isError && serverMessage && (
            <p className="mb-4 text-red-500 text-center">{serverMessage}</p>
          )}

          {/* Success message */}
          {isSuccess && (
            <p className="mb-4 text-green-600 text-center">
              Password changed successfully!
            </p>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
            noValidate
          >
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">
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
                className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                  oldPasswordError ? "border-red-500" : "border-gray-300"
                }`}
              />
              {oldPasswordError && (
                <p className="mt-1 text-sm text-red-500">{oldPasswordError}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">
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
                className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                  newPasswordError ? "border-red-500" : "border-gray-300"
                }`}
              />
              {newPasswordError && (
                <p className="mt-1 text-sm text-red-500">{newPasswordError}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-md bg-cyan-600 py-2.5 text-white font-semibold hover:bg-cyan-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
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
