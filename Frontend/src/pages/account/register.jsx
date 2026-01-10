import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, Link } from "react-router";
import { INDIA_REGION_CHOICES } from "../../constants/regions";

const sendRegisterData = async (data) => {
  const response = await axios.post(
    "http://127.0.0.1:8000/api/accounts/register/",
    data,
    { headers: { "Content-Type": "application/json" } }
  );
  return response.data;
};

const getDistricts = async (region) => {
  try {
    const { data } = await axios.get(
      `http://127.0.0.1:8000/api/accounts/districts/${region}`
    );
    return Object.entries(data).map(([value, label]) => ({ value, label }));
  } catch (e) {
    throw new Error("Failed to fetch districts");
  }
};

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
    mutationFn: sendRegisterData,
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
  const _districtError =
    errors.district?.message || error?.response?.data?.district;

  return (
    <div className="flex-1 flex flex-col">
      <main className="flex-1">
        <div className="max-w-md mx-auto mt-20 p-6 border rounded">
          <h1 className="text-3xl mb-6 text-center">Register</h1>

          {/* Server error */}
          {isError && (
            <p className="mb-4 text-red-600 text-center">
              {error?.response?.data?.message || "Registration failed"}
            </p>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* First Name */}
            <div className="mb-4">
              <input
                placeholder="First Name"
                className="w-full p-2 border rounded"
                {...register("first_name", {
                  required: "First name is required",
                })}
              />
              {firstNameError && (
                <span className="text-red-500 text-sm">{firstNameError}</span>
              )}
            </div>

            {/* Last Name */}
            <div className="mb-4">
              <input
                placeholder="Last Name"
                className="w-full p-2 border rounded"
                {...register("last_name", {
                  required: "Last name is required",
                })}
              />
              {lastNameError && (
                <span className="text-red-500 text-sm">{lastNameError}</span>
              )}
            </div>

            {/* Email */}
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 border rounded"
                {...register("email", {
                  required: "Email is required",
                })}
              />
              {emailError && (
                <span className="text-red-500 text-sm">{emailError}</span>
              )}
            </div>

            {/* Password */}
            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                className="w-full p-2 border rounded"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters",
                  },
                })}
              />
              {passwordError && (
                <span className="text-red-500 text-sm">{passwordError}</span>
              )}
            </div>

            {/* State */}
            <div className="mb-4">
              <select
                className="w-full p-2 border rounded"
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
                <span className="text-red-500 text-sm">{regionError}</span>
              )}
            </div>

            {/* District */}
            <div className="mb-6">
              <select
                className="w-full p-2 border rounded disabled:bg-gray-400"
                disabled={!selectedRegion || loadingDistricts}
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

              {_districtError && (
                <span className="text-red-500 text-sm">{_districtError}</span>
              )}

              {districtError && (
                <span className="text-red-500 text-sm">
                  Failed to load districts
                </span>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-cyan-600 text-white py-2 rounded disabled:opacity-50"
            >
              {isPending ? "Registering..." : "Register"}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-4 text-center">
            <Link to="/login" className="text-sm text-accent hover:underline">
              Already have an account? Login
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Register;
