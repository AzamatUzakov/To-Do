import { create } from "zustand";

interface SearchStore {
  query: string;
  setQuery: (value: string) => void;
  clearQuery: () => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  query: "",
  setQuery: (value: string) => set({ query: value.trim() }),
  clearQuery: () => set({ query: "" }),
}));
