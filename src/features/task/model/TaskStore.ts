import { create } from "zustand";
import {
  deleteTaskRequest,
  editTaskRequest,
  getTasksRequest,
} from "../api/TaskApi";

interface Task {
  id: string;
  title: string;
  description: string;
  columnId: string;
  priority: string;
  status: string;
}

interface TaskStore {
  isModalOpen: boolean;
  isEditModalOpen: boolean;
  editingTaskId: string | null;

  tasks: Task[];
  openModal: () => void;
  closeModal: () => void;
  openEditModal: (taskId: string) => void;
  closeEditModal: () => void;
  addTasks: (task: Task) => void;
  fetchTasks: () => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  editTask: (
    taskId: string,
    title: string,
    description: string,
    priority: string | undefined,
    columnId: string | undefined,
    status: string | undefined,
  ) => Promise<void>;
}

export const useTaskStore = create<TaskStore>((set) => ({
  isModalOpen: false,
  isEditModalOpen: false,
  editingTaskId: null,
  tasks: [],

  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
  openEditModal: (taskId: string) => set({ isEditModalOpen: true,editingTaskId:taskId }),
  closeEditModal: () => set({ isEditModalOpen: false, editingTaskId:null }),

  //Метод для отоброжение задачек
  fetchTasks: async () => {
    try {
      const result = await getTasksRequest();
      set({ tasks: result });
    } catch (e) {
      console.log(e);
    }
  },

  //Метод для удаление Task
  deleteTask: async (id: string) => {
    try {
      await deleteTaskRequest(id);
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
      }));
    } catch (err) {
      console.log(err);
    }
  },

  //Метод для изменение task
  editTask: async (taskId, title, description, priority, columnId, status) => {
    try {
      const updtTask = await editTaskRequest(
        taskId,
        title,
        description,
        priority,
        columnId,
        status,
      );
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === taskId ? updtTask : task,
        ),
      }));
    } catch (err) {
      console.log(err);
    }
  },
  addTasks: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
}));
