import React from "react";
import { useTranslation } from "react-i18next";
import { useTaskStore } from "../model/TaskStore";
import { Modal } from "antd";
import { useBoardStore } from "@/features/board/model/BoardStore";

interface ViewTaskProps {
  taskId: string;
}

const ViewTask: React.FC<ViewTaskProps> = ({ taskId }) => {
  const { t } = useTranslation();
  const isOpenViewTask = useTaskStore((state) => state.isViewModalOpen);
  const closeViewTask = useTaskStore((state) => state.closeViewTask);

  const findTask = useTaskStore((state) =>
    state.tasks.find((task) => task.id === taskId),
  );
  const findColumn = useBoardStore((state) =>
    state.columns.find((col) => col.id === findTask?.columnId),
  );
  console.log(findTask);

  return (
    <div>
      <Modal
        title={t("modals.viewTask")}
        footer={null}
        onCancel={closeViewTask}
        open={isOpenViewTask}
      >
        <div className="flex flex-col gap-4 w-full py-2">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-400 uppercase tracking-wide">
              {t("viewTask.title")}
            </span>
            <span className="text-base font-medium text-gray-800">
              {findTask?.title}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-400 uppercase tracking-wide">
              {t("viewTask.description")}
            </span>
            <span className="text-sm text-gray-600 leading-relaxed">
              {findTask?.description || "—"}
            </span>
          </div>

          <div className="w-full h-px bg-gray-100" />

          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400 uppercase tracking-wide">
              {t("viewTask.priority")}
            </span>
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                findTask?.priority === "high"
                  ? "bg-red-100 text-red-600"
                  : findTask?.priority === "medium"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-green-100 text-green-600"
              }`}
            >
              {findTask?.priority === "high"
                ? t("priority.high")
                : findTask?.priority === "medium"
                  ? t("priority.medium")
                  : t("priority.low")}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400 uppercase tracking-wide">
              {t("viewTask.column")}
            </span>
            <span className="text-sm text-gray-700">{findColumn?.title}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400 uppercase tracking-wide">
              {t("viewTask.completed")}
            </span>
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                (findTask?.completed as boolean)
                  ? "bg-blue-100 text-blue-600"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {findTask?.completed ? t("viewTask.yes") : t("viewTask.no")}
            </span>
          </div>

          <div className="w-full h-px bg-gray-100" />

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-xs text-gray-400 uppercase tracking-wide">
                {t("viewTask.createdAt")}
              </span>
              <span className="text-gray-500 text-xs">
                {findTask?.createdAt
                  ? new Date(findTask.createdAt).toLocaleString("ru-RU")
                  : null}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-xs text-gray-400 uppercase tracking-wide">
                {t("viewTask.updatedAt")}
              </span>
              <span className="text-gray-500 text-xs">
                {findTask?.updatedAt
                  ? new Date(findTask.updatedAt).toLocaleString("ru-RU")
                  : null}
              </span>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ViewTask;
