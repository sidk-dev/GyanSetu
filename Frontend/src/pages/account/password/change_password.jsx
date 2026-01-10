import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

function ChangePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/accounts/change-password/",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      // Optionally, you could also redirect or show a toast
      console.log("Password changed successfully");
    },
  });

  const onSubmit = (data) => mutate(data);

  return (
    <div className="flex-1 flex flex-col">
      <main className="flex-1">
        <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow-sm ">
          <h1 className="text-3xl mb-6 text-center font-bold">
            Change Password
          </h1>

          {/* Server error */}
          {isError && (
            <p className="mb-4 text-red-600 text-center">
              {error?.response?.data?.message ||
                error?.response?.data?.new_password ||
                "Failed to change password"}
            </p>
          )}

          {/* Success message */}
          {isSuccess && (
            <p className="mb-4 text-green-600 text-center">
              Password changed successfully!
            </p>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
            noValidate
          >
            {/* Old Password */}
            <div>
              <input
                type="password"
                placeholder="Old Password"
                {...register("old_password", {
                  required: "Old password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                  maxLength: { value: 128, message: "Maximum 128 characters" },
                })}
                className="w-full p-2 border rounded"
              />
              {errors.old_password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.old_password.message}
                </p>
              )}
            </div>

            {/* New Password */}
            <div>
              <input
                type="password"
                placeholder="New Password"
                {...register("new_password", {
                  required: "New password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                  maxLength: { value: 128, message: "Maximum 128 characters" },
                })}
                className="w-full p-2 border rounded"
              />
              {errors.new_password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.new_password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-cyan-600 text-white py-2 rounded disabled:opacity-50"
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
