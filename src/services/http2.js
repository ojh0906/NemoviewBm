import axios from "axios";
import store from "../store";
import router from "../_router";

export const http2 = axios.create({
    baseURL: "https://api.nemoview.com",
    // baseURL: "http://52.79.71.82:8888",
    // baseURL: "http://localhost:10001",
    headers: { "content-type": "application/json" },
});

http2.interceptors.request.use(
  (config) => {
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

http2.interceptors.response.use(
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

http2.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
