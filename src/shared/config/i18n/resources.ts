export const resources = {
  en: {
    translation: {
      addTask: "Add task",
      delete: "Delete",
      status: "Status",
      search: "Search...",
      searchTasks: "Search tasks...",
      language: "Language",
      save: "Save",
      header: {
        appName: "TaskFlow",
        createTask: "Create task",
        createColumn: "Create column",
      },
      priority: {
        high: "High",
        medium: "Medium",
        low: "Low",
      },
      statusLabels: {
        todo: "To do",
        inProgress: "In progress",
        done: "Done",
      },
      modals: {
        createColumn: "Create column",
        createTask: "Create task",
        editTask: "Edit task",
        viewTask: "View task",
      },
      placeholders: {
        columnName: "Column name",
        taskTitle: "Task title",
        taskDescription: "Task description",
        selectColumn: "Select column",
        priority: "Priority",
      },
      viewTask: {
        title: "Title",
        description: "Description",
        priority: "Priority",
        column: "Column",
        completed: "Completed",
        createdAt: "Created at",
        updatedAt: "Updated at",
        yes: "Yes",
        no: "No",
      },
      aria: {
        dragTask: "Drag task",
        edit: "Edit",
        delete: "Delete",
      },
    },
  },
  ru: {
    translation: {
      addTask: "Добавить задачу",
      delete: "Удалить",
      status: "Статус",
      search: "Поиск...",
      searchTasks: "Поиск задач...",
      language: "Язык",
      save: "Сохранить",
      header: {
        appName: "TaskFlow",
        createTask: "Создать задачу",
        createColumn: "Создать колонку",
      },
      priority: {
        high: "Высокий",
        medium: "Средний",
        low: "Низкий",
      },
      statusLabels: {
        todo: "К выполнению",
        inProgress: "В процессе",
        done: "Готово",
      },
      modals: {
        createColumn: "Создание колонки",
        createTask: "Создание задачи",
        editTask: "Изменение задачи",
        viewTask: "Просмотр задачи",
      },
      placeholders: {
        columnName: "Название колонки",
        taskTitle: "Название задачи",
        taskDescription: "Описание задачи",
        selectColumn: "Выберите колонку",
        priority: "Приоритет",
      },
      viewTask: {
        title: "Название",
        description: "Описание",
        priority: "Приоритет",
        column: "Колонка",
        completed: "Выполнено",
        createdAt: "Создано",
        updatedAt: "Обновлено",
        yes: "Да",
        no: "Нет",
      },
      aria: {
        dragTask: "Перетащить задачу",
        edit: "Редактировать",
        delete: "Удалить",
      },
    },
  },
} as const;

export type AppLanguage = keyof typeof resources;
