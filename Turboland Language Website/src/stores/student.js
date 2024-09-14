import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const studentStore = create(
  persist(
    (set) => ({
      id: "",
      name: "",
      email: "",
      yearAndSection: "",
      profilePic: "",
      notify: undefined,
      classrooms: [],
      setId: (id) => set({ id }),
      setName: (name) => set({ name }),
      setEmail: (email) => set({ email }),
      setNotify: (notify) => set({ notify }),
      setYearAndSection: (yearAndSection) => set({ yearAndSection }),
      setProfilePic: (profilePic) => set({ profilePic }),
      setClassrooms: (classrooms) => set({ classrooms }),
      clearAllFields: () => {
        set({
          id: "",
          name: "",
          email: "",
          yearAndSection: "",
          profilePic: "",
          notify: undefined,
          classrooms: [],
        });
      },
    }),
    {
      name: "student-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
