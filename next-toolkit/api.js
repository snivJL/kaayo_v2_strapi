import axios from "axios";
import Cookie from "js-cookie";

const api = axios.create({
  baseURL: "http://localhost:1337",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + Cookie.get("jwt"),
  },
});

api.interceptors.request.use(
  (request) => {
    api.defaults.headers.common["Authorization"] =
      "Bearer " + Cookie.get("jwt");
    console.log("Starting Request", request);
    return request;
  },
  function (error) {
    console.log("REQUEST ERROR", error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    return response;
  },
  function (error) {
    error = error.response.data;
    console.log("RESPONSE ERROR", error);
    let errorMsg = error.message || "";
    if (error.errors && error.errors.message)
      errorMsg = errorMsg + ": " + error.errors.message;
    console.error(errorMsg);
    return Promise.reject(error);
  }
);

export default api;
