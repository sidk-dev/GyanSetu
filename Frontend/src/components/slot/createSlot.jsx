import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { createSlot } from "../../api/auth_api";

function CreateSlot() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const mutation = useMutation({
    mutationFn: createSlot,
    onSuccess: () => {
      alert("Slot created successfully!");
      reset();
    },
    onError: (error) => {
      alert(
        error?.response?.data?.non_field_errors?.[0] || "Failed to create slot",
      );
    },
  });

  const onSubmit = (data) => mutation.mutate(data);

  return (
    <div className="max-w-3xl mx-auto p-6 rounded-xl bg-secondary border border-primary-dark shadow-lg ">
      <h2 className="text-2xl font-semibold text-neutral-light mb-6">
        Create a Slot
      </h2>

      {mutation.isError && (
        <p className="mb-4 text-error text-sm">
          {mutation.error?.response?.data?.non_field_errors?.[0] ||
            "Failed to create slot"}
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Skill (e.g. Playing Guitar)"
            {...register("skill_text", { required: "Skill is required" })}
            className={`w-full rounded-lg px-4 py-2 bg-bg border ${
              errors.skill_text ? "border-error" : "border-primary-dark"
            } text-neutral-light placeholder-neutral-medium focus:outline-none focus:ring-2 ${
              errors.skill_text
                ? "focus:ring-error"
                : "focus:ring-primary-light"
            } transition`}
          />
          {errors.skill_text && (
            <span className="text-error text-sm mt-1">
              {errors.skill_text.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <textarea
            placeholder="Describe more about your requirements..."
            rows={4}
            {...register("description", {
              required: "Description is required",
            })}
            className={`w-full rounded-lg px-4 py-2 bg-bg border ${
              errors.description ? "border-error" : "border-primary-dark"
            } text-neutral-light placeholder-neutral-medium focus:outline-none focus:ring-2 ${
              errors.description
                ? "focus:ring-error"
                : "focus:ring-primary-light"
            } transition`}
          />
          {errors.description && (
            <span className="text-error text-sm mt-1">
              {errors.description.message}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-neutral-medium text-sm mb-1">
              Start Time
            </label>
            <input
              type="datetime-local"
              {...register("start_time", {
                required: "Start time is required",
              })}
              className={`w-full rounded-lg px-4 py-2 bg-bg border ${
                errors.start_time ? "border-error" : "border-primary-dark"
              } text-neutral-light focus:outline-none focus:ring-2 ${
                errors.start_time
                  ? "focus:ring-error"
                  : "focus:ring-primary-light"
              } transition`}
            />
            {errors.start_time && (
              <span className="text-error text-sm mt-1">
                {errors.start_time.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-neutral-medium text-sm mb-1">End Time</label>
            <input
              type="datetime-local"
              {...register("end_time", { required: "End time is required" })}
              className={`w-full rounded-lg px-4 py-2 bg-bg border ${
                errors.end_time ? "border-error" : "border-primary-dark"
              } text-neutral-light focus:outline-none focus:ring-2 ${
                errors.end_time
                  ? "focus:ring-error"
                  : "focus:ring-primary-light"
              } transition`}
            />
            {errors.end_time && (
              <span className="text-error text-sm mt-1">
                {errors.end_time.message}
              </span>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={mutation.isLoading}
          className="w-full bg-accent hover:bg-accent-light text-neutral-dark py-3 rounded-lg font-medium transition disabled:opacity-50"
        >
          {mutation.isLoading ? "Posting..." : "Post Slot"}
        </button>
      </form>
    </div>
  );
}

export default CreateSlot;
