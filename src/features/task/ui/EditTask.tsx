import React, { useEffect, useState } from "react";
import { Modal, Input, Select } from "antd";
import { useTranslation } from "react-i18next";
import { useTaskStore } from "../model/TaskStore";
import { useBoardStore } from "@/features/board/model/BoardStore";

interface EditTaskProps {
  taskId: string;
}

const EditTask: React.FC<EditTaskProps> = ({ taskId }) => {
  const { t } = useTranslation();
  const [newTitle, setNewTitle] = useState<string>("");
  const [newDescription, setNewDescription] = useState<string>("");
  const [newPriority, setNewPriority] = useState<string | undefined>(undefined);
  const [newStatus, setNewStatus] = useState<string | undefined>(undefined);
  const [newColumnId, setNewColumnId] = useState<string | undefined>(undefined);

  const isEditModalOpen = useTaskStore((state) => state.isEditModalOpen);
  const closeEditModal = useTaskStore((state) => state.closeEditModal);
  const findTask = useTaskStore((state) =>
    state.tasks.find((task) => task.id === taskId),
  );
  const updtTask = useTaskStore((state) => state.editTask);

  const columns = useBoardStore((state) => state.columns);

  useEffect(() => {
    if (findTask) {
      setNewTitle(findTask.title);
      setNewDescription(findTask.description);
      setNewPriority(findTask.priority);
      setNewColumnId(findTask.columnId);
      setNewStatus(findTask.status);
    }
  }, [taskId]);

  const clearForm = () => {
    setNewTitle("");
    setNewDescription("");
    setNewPriority(undefined);
    setNewColumnId(undefined);
    setNewStatus(undefined);
  };

  //Фцнкция для изменение тасков
  async function editTask() {
    try {
      await updtTask(
        taskId,
        newTitle,
        newDescription,
        newPriority,
        newColumnId,
        newStatus,
      );

      clearForm();
      closeEditModal();
    } catch (e) {
      console.log(e);
    }
  }

  // console.log(newTitle, newDescription, newPriority);

  return (
    <div>
      <Modal
        title={t("modals.editTask")}
        footer={null}
        onCancel={closeEditModal}
        open={isEditModalOpen}
      >
        <div className="flex flex-col gap-4 w-full py-2">
          <Input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder={t("placeholders.taskTitle")}
          />

          <Input.TextArea
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            placeholder={t("placeholders.taskDescription")}
            rows={3}
          />

          <Select
            value={newPriority}
            onChange={(value) => setNewPriority(value)}
            placeholder={t("placeholders.priority")}
            options={[
              { label: t("priority.low"), value: "low" },
              { label: t("priority.medium"), value: "medium" },
              { label: t("priority.high"), value: "high" },
            ]}
          />
          <Select
            value={newColumnId}
            onChange={(value) => setNewColumnId(value)}
            placeholder={t("placeholders.selectColumn")}
            options={columns.map((col) => ({
              label: col.title,
              value: col.id,
            }))}
          />
          <button
            onClick={editTask}
            className="cursor-pointer flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white font-medium rounded-md shadow hover:bg-blue-600 active:scale-95 transition-transform"
          >
            {t("save")}
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

export default EditTask;
