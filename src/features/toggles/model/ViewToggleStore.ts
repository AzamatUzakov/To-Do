import { create } from "zustand";

interface ViewStore {
  viewMode: "Kanban" | "List";
  setViewMode: (mode: "List" | "Kanban") => void;
}

export const switchViewStore = create<ViewStore>((set) => ({
  viewMode: "Kanban",
  setViewMode: (mode) => set({ viewMode: mode }),
}));
