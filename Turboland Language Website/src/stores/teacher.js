import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const teacherStore = create(
  persist(
    (set) => ({
      id: "",
      name: "",
      email: "",
      password: "",
      profilePic: "",
      setId: (id) => set({ id }),
      setName: (name) => set({ name }),
      setEmail: (email) => set({ email }),
      setPassword: (password) => set({ password }),
      setProfilePic: (profilePic) => set({ profilePic }),
      clearAllFields: () => {
        set({
          id:"",
          name: "",
          email: "",
          password: "",
          profilePic: "",
        });
      },
    }),
    {
      name: "student-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
