import { useQuery } from "@tanstack/react-query";
import { PencilIcon } from "@heroicons/react/24/outline";
import { useNavigate, useSearchParams } from "react-router";
import { getProfile, getUserProfileById } from "../../api/auth_api";
import SlotFeed from "../../components/slot/slotFeed";
import ViewSkills from "../../components/skill/viewSkill";
import CreateSkillModal from "../../components/skill/createSkill";

function Profile() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("id");

  const {
    data: profile,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["profile", userId],
    queryFn: () => (userId ? getUserProfileById(userId) : getProfile()),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center mt-20 text-neutral-medium ">
        Loading profile...
      </div>
    );
  }

  if (isError) {
    console.error(error);
    return (
      <div className="flex justify-center mt-20 text-error ">
        Failed to load profile.
      </div>
    );
  }

  const isOwnProfile = !userId;
  let user;
  if (isOwnProfile) {
    user = profile.data;
  } else {
    user = profile.data.data;
  }

  return (
    <div className="flex-1 flex flex-col bg-bg ">
      <main className="flex-1 flex flex-col lg:flex-row px-4 sm:px-6 lg:px-8 py-6 gap-6">
        <div className="lg:w-1/3 border border-primary-dark rounded-lg shadow-sm p-6 shrink-0 sticky top-18 self-start bg-secondary">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-neutral-light">
              {isOwnProfile
                ? "Your Profile"
                : `${user.first_name} ${user.last_name}`}
            </h1>
            {isOwnProfile && (
              <button
                onClick={() => navigate("/edit-profile")}
                className="p-2 rounded-full transition hover:bg-primary-dark"
                title="Edit Profile"
              >
                <PencilIcon className="h-5 w-5 text-neutral-medium" />
              </button>
            )}
          </div>

          <div className="space-y-3 text-neutral-light">
            <div className="flex justify-between">
              <span className="font-medium text-accent">Name</span>
              <span>
                {user.first_name} {user.last_name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-accent">Email</span>
              <span>{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-accent">Gender</span>
              <span>{user.gender || "Not specified"}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-accent">Date of Birth</span>
              <span>{user.date_of_birth || "Not specified"}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-accent">Region / District</span>
              <span>
                {user.region}
                {user.district ? ` / ${user.district}` : ""}
              </span>
            </div>
            {isOwnProfile && (
              <div className="flex justify-between">
                <span className="font-medium text-accent">Credits</span>
                <span>{user.credits}</span>
              </div>
            )}
            {user.bio && (
              <div className="mt-3">
                <span className="font-medium text-accent">Bio</span>
                <p className="mt-1 text-neutral-light">{user.bio}</p>
              </div>
            )}
          </div>

          <ViewSkills userId={userId || undefined} />
          {!userId && <CreateSkillModal />}
        </div>

        <div className="lg:w-2/3 flex-1 border-2 border-primary-dark rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4 text-neutral-light">
            {isOwnProfile ? "Your Slots" : `${user.first_name}'s Slots`}
          </h2>
          <SlotFeed userId={userId || undefined} isProfile={true} />
        </div>
      </main>
    </div>
  );
}

export default Profile;
