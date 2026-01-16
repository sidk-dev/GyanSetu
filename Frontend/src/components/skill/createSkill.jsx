import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { saveSkill } from "../../api/auth_api";

export default function CreateSkillModal() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const queryClient = useQueryClient();

  // Mutation to save skill
  const {
    mutate: addSkill,
    isPending,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: saveSkill,
    onSuccess: () => {
      queryClient.invalidateQueries(["skills"]); // Refresh skills elsewhere
      reset(); // Clear form
      setIsOpen(false); // Close modal
    },
    onError: (err) => {
      console.error("Failed to save skill:", err);
    },
  });

  const onSubmit = (data) => addSkill(data);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-md bg-cyan-600 px-4 py-2 text-white font-medium mt-4 hover:bg-cyan-700"
      >
        Add Skill
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-10"
      >
        {/* Overlay */}
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

        {/* Centered panel */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md rounded-xl bg-gray-900 p-6 shadow-lg">
            <DialogTitle className="text-xl font-semibold text-white">
              Add New Skill
            </DialogTitle>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">
                  Skill Name
                </label>
                <input
                  type="text"
                  placeholder="Enter skill"
                  {...register("skill_text", { required: "Skill is required" })}
                  className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                    errors.skill_text ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.skill_text && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.skill_text.message}
                  </p>
                )}
                {isError && error?.response?.data?.message && (
                  <p className="mt-1 text-sm text-red-500">
                    {error.response.data.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-md bg-gray-700 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="rounded-md bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-700 disabled:opacity-50"
                >
                  {isPending ? "Saving..." : "Save Skill"}
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
