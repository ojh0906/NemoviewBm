import axios from "axios";
import store from "../store";
import router from "../_router";

export const http = axios.create({
   baseURL: "https://bmapi.nemoview.com",
  // baseURL: "http://52.79.71.82:8888",
  // baseURL: "http://localhost:10001",
  headers: { "content-type": "application/json" },
});

http.interceptors.request.use(
  (config) => {
    const isAuthenticated = store.getters["isAuthenticated"];
    const isExpired = store.getters["isExpired"];
    if (isAuthenticated && !isExpired) {
      const token = store.getters["getAccessToken"];
      config.headers.Authorization = `Bearer ${token}`;
      //console.log("http token", store.getters["getAccessToken"]);
    }
    return config;
  },
  (error) => {
    // Do something with request error
      if (401 === error.response.status) {
          router.push('/login');
      } else {
          Promise.reject(error);
      }
  }
);

http.interceptors.response.use(
    function (response) {
        return response;
    }, function (error){
        if (401 === error.response.status) {
            router.push('/login');
        } else {
            Promise.reject(error);
        }
    }
)

http.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
