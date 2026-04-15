import { useQuery } from "@tanstack/react-query";
import { PencilIcon } from "@heroicons/react/24/outline";
import { useNavigate, useSearchParams } from "react-router";
import { getProfile, getUserProfileById } from "../../api/auth_api";
import SlotFeed from "../../components/slot/slotFeed";
import ViewSkills from "../../components/skill/viewSkill";
import CreateSkillModal from "../../components/skill/createSkill";

function ProfileField({
  label,
  value,
  valueClassName = "wrap-break-word sm:text-right",
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1.5 sm:gap-4 rounded-lg px-3 py-2 bg-bg/45 border border-primary-dark/50">
      <span className="font-medium text-accent/95 text-sm sm:text-base tracking-wide">
        {label}
      </span>
      <span
        className={`${valueClassName} text-sm sm:text-base text-neutral-light`}
      >
        {value}
      </span>
    </div>
  );
}

function Profile() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("id");

  const {
    data: profile,
    isLoading,
    isError,
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
    return (
      <div className="flex justify-center mt-20 text-error ">
        Failed to load profile.
      </div>
    );
  }

  const isOwnProfile = !userId;
  const user = isOwnProfile ? profile.data : profile.data.data;
  const displayName = `${user.first_name} ${user.last_name}`;
  const regionDistrict = `${user.region}${user.district ? ` / ${user.district}` : ""}`;

  const profileFields = [
    {
      label: "Name",
      value: displayName,
      valueClassName: "wrap-break-word sm:text-right",
    },
    {
      label: "Email",
      value: user.email,
      valueClassName: "break-all sm:text-right",
    },
    {
      label: "Gender",
      value: user.gender || "Not specified",
      valueClassName: "wrap-break-word sm:text-right",
    },
    {
      label: "Date of Birth",
      value: user.date_of_birth || "Not specified",
      valueClassName: "wrap-break-word sm:text-right",
    },
    {
      label: "Region / District",
      value: regionDistrict,
      valueClassName: "wrap-break-word sm:text-right",
    },
    ...(isOwnProfile
      ? [
          {
            label: "Credits",
            value: user.credits,
            valueClassName: "wrap-break-word sm:text-right",
          },
        ]
      : []),
  ];

  return (
    <div className="flex-1 flex flex-col bg-bg">
      <main className="relative flex-1 flex flex-col lg:flex-row px-4 sm:px-6 lg:px-10 py-5 sm:py-8 gap-5 sm:gap-7">
        <section
          className="w-full lg:w-1/3 border border-primary-dark/70 rounded-2xl shadow-xl p-4 sm:p-6 shrink-0 lg:sticky lg:top-18 lg:self-start bg-secondary/85 backdrop-blur-sm"
          aria-label="Profile details"
        >
          <div className="flex items-start justify-between gap-3 mb-5 sm:mb-6">
            <h1 className="text-2xl sm:text-3xl font-semibold text-neutral-light wrap-break-word leading-tight">
              {isOwnProfile ? "Your Profile" : displayName}
            </h1>
            {isOwnProfile && (
              <button
                onClick={() => navigate("/edit-profile")}
                className="p-2.5 rounded-full transition bg-bg/40 hover:bg-primary-dark/80 border border-primary-dark/60"
                title="Edit Profile"
              >
                <PencilIcon className="h-5 w-5 text-neutral-medium" />
              </button>
            )}
          </div>

          <div className="space-y-2.5 text-neutral-light">
            {profileFields.map((field) => (
              <ProfileField
                key={field.label}
                label={field.label}
                value={field.value}
                valueClassName={field.valueClassName}
              />
            ))}
            {user.bio && (
              <div className="mt-4 rounded-lg px-3 py-3 bg-bg/45 border border-primary-dark/50">
                <span className="font-medium text-accent/95 text-sm sm:text-base tracking-wide">
                  Bio
                </span>
                <p className="mt-1.5 text-sm sm:text-base text-neutral-light wrap-break-word leading-relaxed">
                  {user.bio}
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 pt-1">
            <ViewSkills userId={userId || undefined} />
          </div>
          {!userId && <CreateSkillModal />}
        </section>

        <section
          className="w-full lg:w-2/3 flex-1 border border-primary-dark/70 rounded-2xl shadow-xl p-4 sm:p-6 bg-secondary/70 backdrop-blur-sm"
          aria-label="User slots"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-5 text-neutral-light tracking-tight">
            {isOwnProfile ? "Your Slots" : `${user.first_name}'s Slots`}
          </h2>
          <SlotFeed userId={userId || undefined} isProfile={true} />
        </section>
      </main>
    </div>
  );
}

export default Profile;
