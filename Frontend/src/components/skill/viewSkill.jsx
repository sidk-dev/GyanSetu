import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSkills, deleteSkill } from "../../api/auth_api";

function ViewSkills({ userId = null }) {
  const queryClient = useQueryClient();

  // Fetch skills
  const {
    data: skills,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["skills"],
    queryFn: () => getSkills(userId),
  });

  // Delete skill mutation
  const { mutate: removeSkill, isPending: isDeleting } = useMutation({
    mutationFn: deleteSkill,
    onSuccess: () => {
      // Refresh the skills list after deletion
      queryClient.invalidateQueries(["skills"]);
    },
    onError: (err) => {
      console.error("Failed to delete skill:", err);
    },
  });

  if (isLoading) return <p className="text-center mt-4">Loading skills...</p>;
  if (isError)
    return (
      <p className="text-center mt-4 text-red-500">
        {error?.response?.data?.message || "Failed to load skills."}
      </p>
    );

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow-lg">
      <h2 className="text-2xl mb-4 font-bold text-center text-accent">
        Skills
      </h2>

      {skills.length === 0 ? (
        <p className="text-center text-gray-400">No skills added yet.</p>
      ) : (
        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="flex items-center bg-gray-800 text-white px-3 py-1 rounded-full"
            >
              <span>{skill.skill_text}</span>
              {!userId && (
                <button
                  onClick={() => removeSkill(skill.id)}
                  disabled={isDeleting}
                  className="ml-2 text-red-500 hover:text-red-400 font-bold"
                >
                  &times;
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
