import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: "",
      email: "",
      id: "",
      newBlog: {
        title: "",
        picture: "",
        description: "",
        content: "",
      },

      loginUser: (isAuthenticated, token, email, id) => {
        set({ isAuthenticated, token, email, id });
      },

      setNewBlog: (name, value) => {
        set((state) => ({
          ...state,
          newBlog: { ...state.newBlog, [name]: value },
        }));
      },

      setToken: (token) => {
        set({ token });
      },

      // to reset all values
      resetValues: () => {
        set({
          isAuthenticated: false,
          token: "",
          id: "",
          newBlog: {
            title: "",
            picture: "",
            description: "",
            content: "",
          },
          email: "",
        });
      },

      // to reset newBlog
      resetNewBlog: () => {
        set({
          newBlog: {
            title: "",
            picture: "",
            description: "",
            content: "",
          },
        });
      },
    }),
    { name: "user" }
  )
);

export default useStore;
