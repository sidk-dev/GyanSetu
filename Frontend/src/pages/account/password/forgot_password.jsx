import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/accounts/forgot-password/",
        data,
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    },
  });

  const onSubmit = (data) => mutate(data);

  return (
    <div className="flex-1 flex flex-col">
      <main className="flex-1">
        <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow-sm ">
          <h1 className="text-3xl mb-6 text-center font-bold">
            Forgot Password
          </h1>

          {/* Server error */}
          {isError && (
            <p className="mb-4 text-red-600 text-center">
              {error?.response?.data?.message ||
                "Failed to request password reset"}
            </p>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-4"
          >
            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Email"
                {...register("email", { required: "Email is required" })}
                className="w-full p-2 border rounded"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-cyan-600 text-white py-2 rounded disabled:opacity-50"
            >
              {isPending ? "Sending..." : "Send Reset Link"}
            </button>

            {/* Success message */}
            {isSuccess && (
              <p className="mt-2 text-green-600 text-center">
                Check your inbox
              </p>
            )}

            {/* Extra buttons */}
            <div className="mt-4 flex justify-between">
              <a href="/login" className="text-sm text-accent hover:underline">
                Back to Login
              </a>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default ForgotPassword;
