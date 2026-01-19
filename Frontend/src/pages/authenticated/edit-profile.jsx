import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { INDIA_REGION_CHOICES } from "../../constants/regions";
import { getProfile, updateProfile } from "../../api/auth_api";
import { getDistricts } from "../../api/unauth_api";

function EditProfile() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const selectedRegion = watch("region");

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  useEffect(() => {
    if (profile?.data) {
      reset({
        first_name: profile.data.first_name || "",
        last_name: profile.data.last_name || "",
        email: profile.data.email || "",
        gender: profile.data.gender || "",
        date_of_birth: profile.data.date_of_birth || "",
        bio: profile.data.bio || "",
        region: profile.data.region || "",
        district: profile.data.district || "",
      });
    }
  }, [profile, reset]);

  const {
    data: districts = [],
    isLoading: loadingDistricts,
    isError: districtFetchError,
  } = useQuery({
    queryKey: ["districts", selectedRegion],
    queryFn: () => getDistricts(selectedRegion),
    enabled: !!selectedRegion,
  });

  useEffect(() => {
    setValue("district", "");
  }, [selectedRegion, setValue]);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => navigate("/profile"),
  });

  const onSubmit = (data) => mutate(data);
  const backendErrors = error?.response?.data || {};

  const firstNameError =
    errors.first_name?.message || backendErrors.first_name?.[0];
  const lastNameError =
    errors.last_name?.message || backendErrors.last_name?.[0];
  const emailError = errors.email?.message || backendErrors.email?.[0];
  const genderError = errors.gender?.message || backendErrors.gender?.[0];
  const dobError =
    errors.date_of_birth?.message || backendErrors.date_of_birth?.[0];
  const bioError = errors.bio?.message || backendErrors.bio?.[0];
  const regionError = errors.region?.message || backendErrors.region?.[0];
  const districtError = errors.district?.message || backendErrors.district?.[0];

  if (isLoading) {
    return (
      <div className="flex justify-center mt-20 text-neutral-medium ">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-bg ">
      <main className="flex-1">
        <div className="max-w-md mx-auto mt-20 p-6 border border-primary-dark rounded-xl shadow-lg bg-secondary">
          <h1 className="text-3xl mb-6 text-center font-semibold text-neutral-light">
            Edit Profile
          </h1>

          {isError && backendErrors.non_field_errors && (
            <p className="mb-4 text-error text-center">
              {backendErrors.non_field_errors[0]}
            </p>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mb-4">
              <input
                placeholder="First Name"
                className={`w-full p-2 rounded-lg bg-bg text-neutral-light placeholder-neutral-medium border focus:outline-none focus:ring-2 ${
                  firstNameError
                    ? "border-error focus:ring-error"
                    : "border-primary-dark focus:ring-primary-light"
                }`}
                {...register("first_name", {
                  required: "First name is required",
                })}
              />
              {firstNameError && (
                <span className="text-error text-sm">{firstNameError}</span>
              )}
            </div>

            <div className="mb-4">
              <input
                placeholder="Last Name"
                className={`w-full p-2 rounded-lg bg-bg text-neutral-light placeholder-neutral-medium border focus:outline-none focus:ring-2 ${
                  lastNameError
                    ? "border-error focus:ring-error"
                    : "border-primary-dark focus:ring-primary-light"
                }`}
                {...register("last_name", {
                  required: "Last name is required",
                })}
              />
              {lastNameError && (
                <span className="text-error text-sm">{lastNameError}</span>
              )}
            </div>

            <div className="mb-4">
              <input
                disabled
                className="w-full p-2 rounded-lg bg-primary-dark text-neutral-medium cursor-not-allowed border border-primary-dark"
                {...register("email")}
              />
              {emailError && (
                <span className="text-error text-sm">{emailError}</span>
              )}
            </div>

            <div className="mb-4">
              <select
                className={`w-full p-2 rounded-lg bg-bg text-neutral-light border focus:outline-none focus:ring-2 ${
                  genderError
                    ? "border-error focus:ring-error"
                    : "border-primary-dark focus:ring-primary-light"
                }`}
                {...register("gender")}
              >
                <option value="">Select Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
              </select>
              {genderError && (
                <span className="text-error text-sm">{genderError}</span>
              )}
            </div>

            <div className="mb-4">
              <input
                type="date"
                className={`w-full p-2 rounded-lg bg-bg text-neutral-light border focus:outline-none focus:ring-2 ${
                  dobError
                    ? "border-error focus:ring-error"
                    : "border-primary-dark focus:ring-primary-light"
                }`}
                {...register("date_of_birth")}
              />
              {dobError && (
                <span className="text-error text-sm">{dobError}</span>
              )}
            </div>

            <div className="mb-4">
              <textarea
                placeholder="Bio"
                rows={3}
                className={`w-full p-2 rounded-lg resize-none bg-bg text-neutral-light placeholder-neutral-medium border focus:outline-none focus:ring-2 ${
                  bioError
                    ? "border-error focus:ring-error"
                    : "border-primary-dark focus:ring-primary-light"
                }`}
                {...register("bio")}
              />
              {bioError && (
                <span className="text-error text-sm">{bioError}</span>
              )}
            </div>

            <div className="mb-4">
              <select
                className={`w-full p-2 rounded-lg bg-bg text-neutral-light border focus:outline-none focus:ring-2 ${
                  regionError
                    ? "border-error focus:ring-error"
                    : "border-primary-dark focus:ring-primary-light"
                }`}
                {...register("region", { required: "State is required" })}
              >
                <option value="">Select State / UT</option>
                {INDIA_REGION_CHOICES.map((state) => (
                  <option key={state.value} value={state.value}>
                    {state.label}
                  </option>
                ))}
              </select>
              {regionError && (
                <span className="text-error text-sm">{regionError}</span>
              )}
            </div>

            <div className="mb-6">
              <select
                className={`w-full p-2 rounded-lg bg-bg text-neutral-light border focus:outline-none focus:ring-2 disabled:bg-primary-dark ${
                  districtError
                    ? "border-error focus:ring-error"
                    : "border-primary-dark focus:ring-primary-light"
                }`}
                disabled={!selectedRegion || loadingDistricts}
                {...register("district", { required: "District is required" })}
              >
                <option value="">
                  {loadingDistricts
                    ? "Loading districts..."
                    : "Select District"}
                </option>
                {districts.map((district) => (
                  <option key={district.value} value={district.value}>
                    {district.label}
                  </option>
                ))}
              </select>
              {districtError && (
                <span className="text-error text-sm">{districtError}</span>
              )}
              {districtFetchError && (
                <span className="text-error text-sm">
                  Failed to load districts
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-accent text-neutral-dark py-2 rounded-lg font-medium transition hover:bg-accent-light disabled:opacity-50"
            >
              {isPending ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default EditProfile;
