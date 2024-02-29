import { create } from "zustand";
import { loginUserAPI } from "@/api_layers/userApi";

const useStore = create((set, get) => ({
  isAuthenticated: false,
  token: "",

  loginUser: async (email, password) => {
    try {
      const res = await loginUserAPI(email, password);

      if (res.status === 200) {
        set({ isAuthenticated: true, token: res.data, error: "" });
      }
    } catch (err) {
      throw err;
    }
  },
}));

export default useStore;
