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
    isError: districtError,
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
    onSuccess: () => {
      navigate("/login", { replace: true });
    },
  });

  const onSubmit = (data) => mutate(data);

  const emailError = errors.email?.message || error?.response?.data?.email;
  const firstNameError =
    errors.first_name?.message || error?.response?.data?.first_name;
  const lastNameError =
    errors.last_name?.message || error?.response?.data?.last_name;
  const passwordError =
    errors.password?.message || error?.response?.data?.password;
  const regionError = errors.region?.message || error?.response?.data?.region;
  const districtErrorMsg =
    errors.district?.message || error?.response?.data?.district;

  return (
    <div className="flex flex-1">
      <div className="flex w-full md:w-1/2 items-center justify-center px-6 py-6">
        <div className="w-full max-w-md border shadow-lg rounded-xl p-8">
          <h1 className="text-3xl font-bold text-center text-accent mb-2">
            Create Account ✨
          </h1>
          <p className="text-center text-gray-200 mb-4">
            Sign up to get started
          </p>

          {/* Server error */}
          {isError && (
            <div className="pb-2 text-center text-sm text-red-500">
              {error?.response?.data?.message || "Registration failed"}
            </div>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-5"
          >
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">
                First name
              </label>
              <input
                className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                  firstNameError ? "border-red-500" : "border-gray-300"
                }`}
                {...register("first_name", {
                  required: "First name is required",
                })}
              />
              {firstNameError && (
                <p className="mt-1 text-sm text-red-500">{firstNameError}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Last name
              </label>
              <input
                className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                  lastNameError ? "border-red-500" : "border-gray-300"
                }`}
                {...register("last_name", {
                  required: "Last name is required",
                })}
              />
              {lastNameError && (
                <p className="mt-1 text-sm text-red-500">{lastNameError}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Email address
              </label>
              <input
                type="email"
                className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                  emailError ? "border-red-500" : "border-gray-300"
                }`}
                {...register("email", {
                  required: "Email is required",
                })}
              />
              {emailError && (
                <p className="mt-1 text-sm text-red-500">{emailError}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Password
              </label>
              <input
                type="password"
                className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                  passwordError ? "border-red-500" : "border-gray-300"
                }`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters",
                  },
                })}
              />
              {passwordError && (
                <p className="mt-1 text-sm text-red-500">{passwordError}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">
                State / UT
              </label>
              <select
                className={`w-full rounded-md border px-3 py-2 ${
                  regionError ? "border-red-500" : "border-gray-300"
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
                <p className="mt-1 text-sm text-red-500">{regionError}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">
                District
              </label>
              <select
                disabled={!selectedRegion || loadingDistricts}
                className="w-full rounded-md border px-3 py-2 disabled:bg-gray-400"
                {...register("district", {
                  required: "District is required",
                })}
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

              {districtErrorMsg && (
                <p className="mt-1 text-sm text-red-500">{districtErrorMsg}</p>
              )}

              {districtError && (
                <p className="mt-1 text-sm text-red-500">
                  Failed to load districts
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-md bg-cyan-600 py-2.5 text-white font-semibold hover:bg-cyan-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
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

      <div className="hidden md:flex w-1/2 items-center justify-center">
        <img
          src={RegisterSvg}
          alt="Register illustration"
          className="max-w-[75%]"
        />
      </div>
    </div>
  );
}

export default Register;
