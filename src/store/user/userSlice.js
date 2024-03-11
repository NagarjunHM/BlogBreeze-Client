import { create } from "zustand";
import { persist } from "zustand/middleware";

const userSlice = create(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      token: "",
      email: "",
      id: "",
      name: "",
    }),
    { name: "user" }
  )
);

export default userSlice;
