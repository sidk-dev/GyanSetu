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

  const {
    mutate: addSkill,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: saveSkill,
    onSuccess: () => {
      queryClient.invalidateQueries(["skills"]);
      reset();
      setIsOpen(false);
    },
  });

  const onSubmit = (data) => addSkill(data);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="mt-4 w-full rounded-lg bg-accent px-4 py-2 font-medium text-neutral-dark transition hover:bg-accent-light"
      >
        Add Skill
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-10 "
      >
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md rounded-xl bg-secondary border border-primary-dark p-6 shadow-xl">
            <DialogTitle className="text-xl font-semibold text-neutral-light">
              Add New Skill
            </DialogTitle>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-medium mb-1">
                  Skill Name
                </label>
                <input
                  type="text"
                  placeholder="Enter skill"
                  {...register("skill_text", { required: "Skill is required" })}
                  className={`w-full rounded-lg bg-bg px-3 py-2 text-neutral-light placeholder-neutral-medium border focus:outline-none focus:ring-2 ${
                    errors.skill_text
                      ? "border-error focus:ring-error"
                      : "border-primary-dark focus:ring-primary-light"
                  }`}
                />
                {errors.skill_text && (
                  <p className="mt-1 text-sm text-error">
                    {errors.skill_text.message}
                  </p>
                )}
                {isError && error?.response?.data?.message && (
                  <p className="mt-1 text-sm text-error">
                    {error.response.data.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-neutral-light bg-primary-dark hover:opacity-90 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-neutral-dark bg-accent hover:bg-accent-light transition disabled:opacity-50"
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
