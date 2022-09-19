
export const setToken = (token: string) => {
  window.localStorage.setItem("token", token);
};

export const getTokenFromLocalStorage = () =>
  window.localStorage.getItem("token") || undefined;
