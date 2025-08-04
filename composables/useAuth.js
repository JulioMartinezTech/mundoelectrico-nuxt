// composables/useAuth.js

export const useAuth = () => {
  const token = useState("token", () => null);
  const user = useState("user", () => null);

  const setAuth = (jwt, userData) => {
    token.value = jwt;
    user.value = userData;
  };

  const logout = () => {
    token.value = null;
    user.value = null;
  };

  return {
    token,
    user,
    setAuth,
    logout,
  };
};
