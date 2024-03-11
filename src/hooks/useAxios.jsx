import axios from "axios";

const useAxios = () => {
  const instance = axios.create({
    baseURL: "http://localhost:5000/api/",
    headers: { "Content-Type": "application/json", timeout: 1000 },
    withCredentials: true,
  });

  return instance;
};

export default useAxios;
