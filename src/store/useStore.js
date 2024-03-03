import { create } from "zustand";
import { persist } from "zustand/middleware";
import { loginUserAPI } from "@/api_layers/userApi";

const useStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: "",
      newBlog: {
        title: "",
        picture: "", // This is where the file input value will be stored
        description: "",
        code: "",
      },

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

      setNewBlog: (name, value) => {
        set((state) => ({
          ...state,
          newBlog: { ...state.newBlog, [name]: value },
        }));
      },

      // to reset all values
      resetValues: () => {
        set({ isAuthenticated: false, token: "", newBlog: {} });
      },
    }),
    { name: "user" }
  )
);

export default useStore;
