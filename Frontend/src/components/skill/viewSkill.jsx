import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSkills, deleteSkill } from "../../api/auth_api";

function ViewSkills({ userId = null }) {
  const queryClient = useQueryClient();

  const {
    data: skills,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["skills", userId],
    queryFn: () => getSkills(userId),
  });

  const { mutate: removeSkill, isPending: isDeleting } = useMutation({
    mutationFn: deleteSkill,
    onSuccess: () => {
      queryClient.invalidateQueries(["skills"]);
    },
  });

  if (isLoading)
    return (
      <p className="text-center mt-6 text-neutral-medium ">Loading skills...</p>
    );

  if (isError)
    return (
      <p className="text-center mt-6 text-error ">
        {error?.response?.data?.message || "Failed to load skills."}
      </p>
    );

  return (
    <div className="mt-8 p-6 rounded-xl border border-primary-dark">
      <h2 className="text-xl mb-5 font-semibold text-neutral-light">Skills</h2>

      {skills.length === 0 ? (
        <p className="text-center text-neutral-medium">No skills added yet.</p>
      ) : (
        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-bg border border-primary-dark text-neutral-light text-sm"
            >
              <span>{skill.skill_text}</span>
              {!userId && (
                <button
                  onClick={() => removeSkill(skill.id)}
                  disabled={isDeleting}
                  className="text-error hover:opacity-80 font-semibold transition disabled:opacity-50"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewSkills;
