import { create } from "zustand";
import { persist } from "zustand/middleware";

export const userSlice = create(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      token: "",
      email: "",
      id: "",
      name: "",
      path: "",
      profilePicture: "",
      newBlog: {
        title: "",
        picture: "",
        description: "",
        content: "",
        tag: "",
      },

      // user auth
      loginUser: (isAuthenticated, token, email, name, id, profilePicture) => {
        set({ isAuthenticated, token, email, name, id, profilePicture });
      },

      // to add blog data
      setNewBlog: (name, value) => {
        set((state) => ({
          ...state,
          newBlog: { ...state.newBlog, [name]: value },
        }));
      },

      // set token
      setToken: (token) => {
        set({ token });
      },

      // set pathname
      setPath: (path) => {
        set({ path });
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

      // reset all values
      resetValues: () => {
        set({
          newBlog: {
            title: "",
            picture: "",
            description: "",
            content: "",
          },
          isAuthenticated: false,
          name: "",
          id: "",
          email: "",
          token: "",
          profilePicture: "",
        });
      },
    }),
    { name: "user" }
  )
);
