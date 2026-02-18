export const resources = {
  en: {
    translation: {
      addTask: "Add task",
      delete: "Delete",
      status: "Status",
      search: "Search...",

      // Header
      header: {
        appName: "TaskFlow",
        createTask: "Create task",
        createColumn: "Create column",
      },

      // ...остальное без изменений
    },
  },
  ru: {
    translation: {
      addTask: "Добавить задачу",
      delete: "Удалить",
      status: "Статус",
      search: "Поиск...",

      // Header
      header: {
        appName: "TaskFlow",
        createTask: "Создать задачу",
        createColumn: "Создать колонку",
      },

    },
  },
} as const;

export type AppLanguage = keyof typeof resources;
