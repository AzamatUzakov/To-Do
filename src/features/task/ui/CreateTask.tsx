import React, { useEffect, useState } from "react";
import { Modal, Input, Select } from "antd";
import { useTaskStore } from "../model/TaskStore";
import { useBoardStore } from "@/features/board/model/BoardStore";
import { createTaskRequest } from "../api/TaskApi";

interface CreateTaskProps {}

const CreateTask: React.FC<CreateTaskProps> = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [columnId, setColumnId] = useState<string | undefined>(undefined);
  const [priority, setPriority] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<string | undefined>(undefined);
  const columns = useBoardStore((state) => state.columns);

  const fetchColumns = useBoardStore((state) => state.fetchColumns);

  const isModalOpen = useTaskStore((state) => state.isModalOpen);
  const closeModal = useTaskStore((state) => state.closeModal);
  const addTask = useTaskStore((state) => state.addTasks);

  useEffect(() => {
    fetchColumns();
  }, [fetchColumns]);

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setColumnId(undefined);
    setPriority(undefined);
    setStatus(undefined);
  };

  async function createTask() {
    try {
      const newTask = await createTaskRequest(
        title,
        description,
        columnId,
        priority,
        status,
      );
      addTask(newTask);
      clearForm();
      closeModal();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <Modal
        key={String(isModalOpen)}
        title="Создание задачи"
        footer={null}
        onCancel={closeModal}
        open={isModalOpen}
      >
        <div className="flex flex-col gap-4 w-full py-2">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Название задачи"
          />

          <Input.TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Описание задачи"
            rows={3}
          />

          <Select
            value={columnId}
            onChange={(value) => setColumnId(value)}
            placeholder="Выберите колонку"
            options={columns.map((col) => ({
              label: col.title,
              value: col.id,
            }))}
          />

          <Select
            value={priority}
            onChange={(value) => setPriority(value)}
            placeholder="Приоритет"
            options={[
              { label: "Низкий", value: "low" },
              { label: "Средний", value: "medium" },
              { label: "Высокий", value: "high" },
            ]}
          />

          <Select
            value={status}
            onChange={(value) => setStatus(value)}
            placeholder="Статус"
            options={[
              { label: "В работе", value: "todo" },
              { label: "В процессе", value: "in-progress" },
              { label: "Выполнено", value: "done" },
            ]}
          />

          <button
            onClick={createTask}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white font-medium rounded-md shadow hover:bg-blue-600 active:scale-95 transition-transform"
          >
            Сохранить
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default CreateTask;
