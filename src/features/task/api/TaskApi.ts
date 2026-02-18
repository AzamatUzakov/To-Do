//Функция для post задачек
export const createTaskRequest = async (
  title: string,
  description: string | undefined,
  columnId: string | undefined,
  priority: string | undefined,
  status: string | undefined,
  // completed: boolean,
) => {
  const postRequest = await fetch("http://localhost:3001/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: crypto.randomUUID(),
      title,
      description,
      columnId,
      priority,
      status,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }),
  });
  if (!postRequest.ok) {
    throw new Error("Ошибка при при post в tasks");
  }
  return await postRequest.json();
};

//Функция для принятие
export const getTasksRequest = async () => {
  const getRequest = await fetch("http://localhost:3001/tasks");
  if (!getRequest.ok) {
    throw new Error("Ошибка при get задачек");
  }
  return await getRequest.json();
};

//Функция для удалиение таски если удалиться калонка
export const deleteTasksByColumnRequest = async (columnId: string) => {
  const response = await fetch(
    `http://localhost:3001/tasks?columnId=${columnId}`,
  );

  const tasks = await response.json();
  console.log(tasks);

  for (let task of tasks) {
    await fetch(`http://localhost:3001/tasks/${task.id}`, {
      method: "DELETE",
    });
  }
};

//Запрос для удаление таски
export const deleteTaskRequest = async (id: string) => {
  const deleteRequest = await fetch(`http://localhost:3001/tasks/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!deleteRequest.ok) {
    throw new Error("Ошибка при delete запросе на task");
  }
};

//Функция для измение Task
export const editTaskRequest = async (
  taskId: string,
  newTitle: string,
  newDescription: string,
  newPriority: string | undefined,
  newColumnId: string | undefined,
  newStatus: string | undefined,
) => {
  const editRequest = await fetch(`http://localhost:3001/tasks/${taskId}`, {
    method: "PATCH",
    body: JSON.stringify({
      title: newTitle,
      description: newDescription,
      priority: newPriority,
      columnId: newColumnId,
      status: newStatus,
      updatedAt: new Date().toISOString(),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!editRequest.ok) {
    throw new Error("Ошибка при изменении EDIT task");
  }
  return await editRequest.json();
};
