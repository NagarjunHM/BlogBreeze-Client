import axios from "axios";
import useStore from "@/store/useStore";
import { useNavigate } from "react-router-dom";

const configureAxios = () => {
  const { setToken, resetValues } = useStore.getState();
  const navigate = useNavigate();

  const instance = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
      "Content-Type": "application/json",
      timeout: 1000,
    },
    withCredentials: true,
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error?.config;

      if (error.response.status === 403 || error.response.status === 401) {
        try {
          const response = await axios.get(
            "http://localhost:5000/api/user/refreshToken",
            {
              withCredentials: true,
            }
          );

          setToken(response.data);

          originalRequest.headers.Authorization = `Bearer ${response.data}`;

          return axios(originalRequest);
        } catch (err) {
          console.log("Token refresh failed: ", err.response.data);
          resetValues();
          navigate("/signin");
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export default configureAxios;
