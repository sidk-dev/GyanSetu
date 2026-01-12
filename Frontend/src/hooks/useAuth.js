export const useAuth = () => {
  const token = localStorage.getItem("token");

  return {
    isAuthenticated: Boolean(token),
    token,
  };
};
