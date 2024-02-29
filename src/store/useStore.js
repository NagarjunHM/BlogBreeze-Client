import { create } from "zustand";
import { persist } from "zustand/middleware";
import { loginUserAPI } from "@/api_layers/userApi";

const useStore = create(
  persist(
    (set) => ({
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

      resetValues: () => {
        set({ isAuthenticated: false, token: "" });
      },
    }),
    { name: "user" }
  )
);

export default useStore;
