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
      console.error(error);
      alert(
        error?.response?.data?.non_field_errors?.[0] || "Failed to create slot"
      );
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="border rounded-lg shadow-sm p-6 flex-shrink-0">
      <h2 className="text-xl font-semibold mb-4">Create a Slot</h2>

      {mutation.isError && (
        <p className="mb-4 text-red-600">
          {mutation.error?.response?.data?.non_field_errors?.[0] ||
            "Failed to create slot"}
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Skill (e.g. React Mentoring)"
            {...register("skill_text", { required: "Skill is required" })}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
              errors.skill_text
                ? "focus:ring-red-500 border-red-500"
                : "focus:ring-cyan-300"
            }`}
          />
          {errors.skill_text && (
            <span className="text-red-500 text-sm">
              {errors.skill_text.message}
            </span>
          )}
        </div>

        <div>
          <textarea
            placeholder="Describe what this slot is about..."
            rows={4}
            {...register("description", {
              required: "Description is required",
            })}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
              errors.description
                ? "focus:ring-red-500 border-red-500"
                : "focus:ring-cyan-300"
            }`}
          />
          {errors.description && (
            <span className="text-red-500 text-sm">
              {errors.description.message}
            </span>
          )}
        </div>

        <div>
          <label className="text-sm text-gray-600">Start Time</label>
          <input
            type="datetime-local"
            {...register("start_time", { required: "Start time is required" })}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
              errors.start_time
                ? "focus:ring-red-500 border-red-500"
                : "focus:ring-cyan-300"
            }`}
          />
          {errors.start_time && (
            <span className="text-red-500 text-sm">
              {errors.start_time.message}
            </span>
          )}
        </div>

        <div>
          <label className="text-sm text-gray-600">End Time</label>
          <input
            type="datetime-local"
            {...register("end_time", { required: "End time is required" })}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
              errors.end_time
                ? "focus:ring-red-500 border-red-500"
                : "focus:ring-cyan-300"
            }`}
          />
          {errors.end_time && (
            <span className="text-red-500 text-sm">
              {errors.end_time.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={mutation.isLoading}
          className="w-full bg-cyan-600 text-white py-2 rounded hover:bg-cyan-700 transition disabled:opacity-50"
        >
          {mutation.isLoading ? "Posting..." : "Post Slot"}
        </button>
      </form>
    </div>
  );
}

export default CreateSlot;
