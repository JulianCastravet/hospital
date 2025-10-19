import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type Store = {
  userOptions: string[];
  setOption: (p: string[]) => void;
};

const userSettings = create<Store>()(
  devtools(
    persist(
      (set) => ({
        userOptions: [],
        setOption: (options: string[]) =>
          set((state: any) => ({
            userOptions: [...options],
          })),
      }),
      { name: "userSettingsLS" }
    ),
    { name: "userSettingsStore" }
  )
);

export default userSettings;
