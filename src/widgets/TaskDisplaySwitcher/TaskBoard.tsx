import React, { useEffect } from "react";
import { useBoardStore } from "@/features/board/model/BoardStore";
import { FiTrash2 } from "react-icons/fi";
import TaskCard from "@/entities/task/ui/TaskCard";
import { useTaskStore } from "@/features/task/model/TaskStore";

const TaskBoard: React.FC = () => {
  const columns = useBoardStore((state) => state.columns);
  const fetchColumns = useBoardStore((state) => state.fetchColumns);
  const deleteColumn = useBoardStore((state) => state.deleteColumn);

  const tasks = useTaskStore((state) => state.tasks);
  const fetchTasks = useTaskStore((state) => state.fetchTasks);

  useEffect(() => {
    fetchColumns();
    fetchTasks();
  }, [fetchColumns, fetchTasks]);

  return (
      <div className="flex flex-col gap-4 md:flex-row md:overflow-x-auto md:pb-4">
        {columns.map((column) => (
          <div
            key={column.id}
            className="
              w-full
              md:flex-shrink-0 md:w-72
              bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-200 dark:border-slate-800
              flex flex-col
            "
          >
            {/* Column header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-slate-800">
              <h2 className="font-semibold text-gray-800 dark:text-slate-100 text-sm truncate">
                {column.title}
              </h2>
              <div className="flex items-center gap-2">
                {/*  <span className="ml-2 text-xs font-medium bg-gray-100 text-gray-500 rounded-full px-2 py-0.5">
                  {tasks.length > 0 ? tasks.length : 0}
                </span> */}

                <button
                  onClick={() => deleteColumn(column.id)}
                  className="p-1 rounded-md cursor-pointer text-red-500 hover:text-white hover:bg-red-500 transition-colors duration-200"
                >
                  <FiTrash2 size={14} />
                </button>
              </div>
            </div>
            {/* Tasks list */}
            <div className="flex flex-col gap-2 p-3 flex-1">
              {tasks
                .filter((task) => task.columnId === column.id)
                .map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
            </div>{" "}
          </div>
        ))}
      </div>
    
  );
};

export default TaskBoard;
