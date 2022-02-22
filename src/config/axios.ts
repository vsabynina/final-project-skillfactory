import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://sf-final-project.herokuapp.com",
});

axiosInstance.interceptors.request.use((config) => {
  const userFromLocalStorage = localStorage.getItem("user");
  const user = userFromLocalStorage ? JSON.parse(userFromLocalStorage) : {};

  const urlWithoutAuth = ["/auth/sign_up", "/auth/sign_in", "/public/report"];
  if (
    user.token &&
    config.headers &&
    config.url &&
    urlWithoutAuth.some((el) => el !== config.url)
  ) {
    config.headers["Authorization"] = `Bearer ${user.token}`;
  }
  return config;
});
