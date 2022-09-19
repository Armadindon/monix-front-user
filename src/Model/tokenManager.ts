
export const setToken = (token: string, rememberMe: boolean) => {
  if (rememberMe) window.localStorage.setItem("token", token);
};

export const getTokenFromLocalStorage = () =>
  window.localStorage.getItem("token") || undefined;
