import { create } from "zustand";
import { deleteColumnRequest, getColumnsRequest } from "../api/BoardApi";

interface Column {
  id: string;
  title: string;
}

interface BoardStore {
  isModalOpen: boolean;
  columns: Column[];
  openModal: () => void;
  closeModal: () => void;
  addColumn: (column: Column) => void;
  fetchColumns: () => Promise<void>;
  deleteColumn: (id: string) => Promise<void>;
}

export const useBoardStore = create<BoardStore>((set) => ({
  isModalOpen: false,
  columns: [],
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),

  //Метод запроса для принятие
  fetchColumns: async () => {
    try {
      const result = await getColumnsRequest();
      set({ columns: result });
    } catch (e) {
      console.log(e);
    }
  },

  //Метод удаление
  deleteColumn: async (id: string) => {
    try {
      deleteColumnRequest(id);
      set((state) => ({
        columns: state.columns.filter((col) => col.id !== id),
      }));
    } catch (err) {
      console.log(err);
    }
  },

  //Метод для добовление
  addColumn: (column) =>
    set((state) => ({
      columns: [...state.columns, column],
    })),
}));
