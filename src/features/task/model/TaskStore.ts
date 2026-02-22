import { create } from "zustand";
import {
  deleteTaskRequest,
  editTaskRequest,
  getTasksRequest,
  updateColumnRequest,
  updtTaskOrderRequest,
} from "../api/TaskApi";

interface Task {
  id: string;
  title: string;
  description: string;
  columnId: string;
  priority: string;
  status: string;
  order?: number;
  completed?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface TaskStore {
  isModalOpen: boolean;
  isEditModalOpen: boolean;
  isViewModalOpen: boolean;

  editingTaskId: string | null;
  viewTaskId: string | null;

  tasks: Task[];
  openModal: () => void;
  closeModal: () => void;

  openEditModal: (taskId: string) => void;
  closeEditModal: () => void;

  openViewTask: (taskId: string) => void;
  closeViewTask: () => void;

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

  reorderTasks: (draggedId: string, overId: string) => Promise<void>;

  updateTaskColumn: (taskId: string, columnId: string) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  isModalOpen: false,
  isEditModalOpen: false,
  isViewModalOpen: false,
  editingTaskId: null,
  viewTaskId: null,
  tasks: [],

  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),

  openEditModal: (taskId: string) =>
    set({ isEditModalOpen: true, editingTaskId: taskId }),
  closeEditModal: () => set({ isEditModalOpen: false, editingTaskId: null }),

  openViewTask: (taskId: string) =>
    set({ isViewModalOpen: true, viewTaskId: taskId }),
  closeViewTask: () => set({ isViewModalOpen: false, viewTaskId: null }),

  //Метод для отоброжение задачек
  fetchTasks: async () => {
    try {
      const result = await getTasksRequest();
      const sorted = result.sort(
        (a: Task, b: Task) => (a.order ?? 999) - (b.order ?? 999),
      );
      set({ tasks: sorted });
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

  //Метод для обновление id колонки, для drag and dropa
  updateTaskColumn: async (taskId: string, columnId: string) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, columnId } : task,
      ),
    }));

    try {
      await updateColumnRequest(taskId, columnId);
    } catch (e) {
      console.log(e);
    }
  },

  reorderTasks: async (draggedId, overId) => {
    const tasks = useTaskStore.getState().tasks;
    const result = [...tasks];
    const fromIndex = result.findIndex((t) => t.id === draggedId);
    const toIndex = result.findIndex((t) => t.id === overId);

    const [moved] = result.splice(fromIndex, 1);
    result.splice(toIndex, 0, moved);

    const reindexed = result.map((task, i) => ({ ...task, order: i }));

    set({ tasks: reindexed });

    try {
      const updts = reindexed.filter((task, i) => tasks[i]?.id !== task.id);
      for (let task of updts) {
        await updtTaskOrderRequest(task.id, task.order!);
      }
    } catch (err) {
      console.log(err);
      set({ tasks });
    }
  },

  addTasks: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
}));
