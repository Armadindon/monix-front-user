export const setToken = (token: string) => {
  window.localStorage.setItem("token", token);
};

export const getTokenFromLocalStorage = () =>
  window.localStorage.getItem("token") || undefined;

export const clearTokenFromLocalStorage = () =>
  window.localStorage.removeItem("token");
