import { create } from "zustand";
import { persist } from "zustand/middleware";

export const userSlice = create(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      token: "hello",
      email: "",
      id: "",
      name: "",
      newBlog: {
        title: "",
        picture: "",
        description: "",
        content: "",
      },

      // user auth
      loginUser: (isAuthenticated, token, email, id) => {
        set({ isAuthenticated, token, email, id });
      },

      // to add blog data
      setNewBlog: (name, value) => {
        set((state) => ({
          ...state,
          newBlog: { ...state.newBlog, [name]: value },
        }));
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
