import { create } from "zustand";
import axios from "@/axios/axios"; // Correct import

const useStore = create((set, get) => ({
  isAuthenticated: false,
  token: "",
  error: "",
  loading: false,

  userLogin: async (email, password) => {
    set({ loading: true });
    try {
      const result = await axios.post("http://localhost:5000/api/user/login", {
        email,
        password,
      });

      if (result.status === 200) {
        set({ isAuthenticated: true, token: result.data, error: "" });
      }
    } catch (err) {
      set({ error: err.response.data });
    } finally {
      set({ loading: false });
      console.log(get().isAuthenticated);
    }
  },
}));

export default useStore;
