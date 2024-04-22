import { userSlice } from "@/store/userSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useAxios = () => {
  const { setToken, resetValues } = userSlice();
  const navigate = useNavigate();

  // const baseURL =
  //   process.env.NODE_ENV === "production"
  //     ? "https://blogbreeze-server.onrender.com/api/"
  //     : "http://localhost:5000/api/";

  const instance = axios.create({
    baseURL: "https://blogbreeze-server.onrender.com/api/",
    headers: { "Content-Type": "application/json", timeout: 1000 },
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
            "http://localhost:5000/api/users/refreshToken",
            {
              withCredentials: true,
            }
          );
          console.log(response);

          setToken(response.data);

          originalRequest.headers.Authorization = `Bearer ${response.data}`;

          return axios(originalRequest);
        } catch (err) {
          console.log("Token refresh failed: ", err.response.data);
          resetValues();
          navigate("/login");
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export default useAxios;
