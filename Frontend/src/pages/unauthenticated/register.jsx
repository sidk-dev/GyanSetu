import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router";
import { INDIA_REGION_CHOICES } from "../../constants/regions";
import { getDistricts, registerApi } from "../../api/unauth_api";
import RegisterSvg from "../../assets/register.svg";

function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const selectedRegion = watch("region");

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
    mutationFn: registerApi,
    onSuccess: () => navigate("/login", { replace: true }),
  });

  const onSubmit = (data) => mutate(data);

  const firstNameError =
    errors.first_name?.message || error?.response?.data?.first_name;
  const lastNameError =
    errors.last_name?.message || error?.response?.data?.last_name;
  const emailError = errors.email?.message || error?.response?.data?.email;
  const passwordError =
    errors.password?.message || error?.response?.data?.password;
  const regionError = errors.region?.message || error?.response?.data?.region;
  const districtError =
    errors.district?.message || error?.response?.data?.district;

  const inputBase =
    "w-full rounded-lg px-3 py-2 bg-bg text-neutral-light placeholder-neutral-medium border focus:outline-none focus:ring-2";

  return (
    <div className="flex flex-1 min-h-screen py-4 bg-bg">
      {/* Left: Form */}
      <div className="flex w-full md:w-1/2 items-center justify-center px-6">
        <div className="w-full max-w-md rounded-xl border border-primary-dark bg-secondary p-8 shadow-lg">
          <h1 className="text-3xl font-semibold text-center text-neutral-light mb-2">
            Create Account
          </h1>
          <p className="text-center text-neutral-medium mb-6">
            Sign up to get started
          </p>

          {isError && (
            <p className="mb-4 text-center text-sm text-error">
              {error?.response?.data?.message || "Registration failed"}
            </p>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-5"
          >
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-neutral-medium mb-1">
                First name
              </label>
              <input
                {...register("first_name", {
                  required: "First name is required",
                })}
                className={`${inputBase} ${
                  firstNameError
                    ? "border-error focus:ring-error"
                    : "border-primary-dark focus:ring-primary-light"
                }`}
              />
              {firstNameError && (
                <p className="mt-1 text-sm text-error">{firstNameError}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-neutral-medium mb-1">
                Last name
              </label>
              <input
                {...register("last_name", {
                  required: "Last name is required",
                })}
                className={`${inputBase} ${
                  lastNameError
                    ? "border-error focus:ring-error"
                    : "border-primary-dark focus:ring-primary-light"
                }`}
              />
              {lastNameError && (
                <p className="mt-1 text-sm text-error">{lastNameError}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-neutral-medium mb-1">
                Email
              </label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className={`${inputBase} ${
                  emailError
                    ? "border-error focus:ring-error"
                    : "border-primary-dark focus:ring-primary-light"
                }`}
              />
              {emailError && (
                <p className="mt-1 text-sm text-error">{emailError}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-neutral-medium mb-1">
                Password
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                })}
                className={`${inputBase} ${
                  passwordError
                    ? "border-error focus:ring-error"
                    : "border-primary-dark focus:ring-primary-light"
                }`}
              />
              {passwordError && (
                <p className="mt-1 text-sm text-error">{passwordError}</p>
              )}
            </div>

            {/* Region */}
            <div>
              <label className="block text-sm font-medium text-neutral-medium mb-1">
                State / UT
              </label>
              <select
                {...register("region", { required: "State is required" })}
                className={`${inputBase} ${
                  regionError
                    ? "border-error focus:ring-error"
                    : "border-primary-dark focus:ring-primary-light"
                }`}
              >
                <option value="">Select State / UT</option>
                {INDIA_REGION_CHOICES.map((state) => (
                  <option key={state.value} value={state.value}>
                    {state.label}
                  </option>
                ))}
              </select>
              {regionError && (
                <p className="mt-1 text-sm text-error">{regionError}</p>
              )}
            </div>

            {/* District */}
            <div>
              <label className="block text-sm font-medium text-neutral-medium mb-1">
                District
              </label>
              <select
                disabled={!selectedRegion || loadingDistricts}
                {...register("district", {
                  required: "District is required",
                })}
                className={`${inputBase} disabled:opacity-60`}
              >
                <option value="">
                  {loadingDistricts
                    ? "Loading districts..."
                    : "Select District"}
                </option>
                {districts.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
              {districtError && (
                <p className="mt-1 text-sm text-error">{districtError}</p>
              )}
              {districtFetchError && (
                <p className="mt-1 text-sm text-error">
                  Failed to load districts
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-lg bg-accent py-2.5 font-medium text-neutral-dark transition hover:bg-accent-light disabled:opacity-50"
            >
              {isPending ? "Creating account..." : "Create account"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <Link to="/login" className="text-accent hover:underline">
              Already have an account? Log in
            </Link>
          </div>
        </div>
      </div>

      {/* Right: Illustration */}
      <div className="hidden md:flex w-1/2 items-center justify-center">
        <img src={RegisterSvg} alt="Register" className="max-w-[75%]" />
      </div>
    </div>
  );
}

export default Register;
