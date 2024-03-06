// axiosInstance.js
import axios from "axios";
import useStore from "@/store/useStore";

const configureAxios = () => {
  // const { token } = useStore.getState();

  const instance = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
      "Content-Type": "application/json",
      timeout: 1000,
    },
  });

  instance.interceptors.request.use(
    (config) => {
      const token = config.headers.Authorization?.split(" ")[1];

      // console.log(token);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};

export default configureAxios;
