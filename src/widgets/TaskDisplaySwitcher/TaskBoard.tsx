import React, { useEffect, useState } from "react";
import { useBoardStore } from "@/features/board/model/BoardStore";
import { FiTrash2 } from "react-icons/fi";

const TaskBoard: React.FC = () => {
  const columns = useBoardStore((state) => state.columns);
  const fetchColumns = useBoardStore((state) => state.fetchColumns);
  const deleteColumn = useBoardStore((state) => state.deleteColumn);

  useEffect(() => {
    fetchColumns();
  }, [fetchColumns]);

  return (
    <div className="min-h-[80vh] bg-gray-100 p-4 mt-3 rounded-2xl md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:overflow-x-auto md:pb-4">
        {columns.map((column) => (
          <div
            key={column.id}
            className="
              w-full
              md:flex-shrink-0 md:w-72
              bg-white rounded-2xl shadow-sm border border-gray-200
              flex flex-col
            "
          >
            {/* Column header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <h2 className="font-semibold text-gray-800 text-sm truncate">
                {column.title}
              </h2>
              <div className="flex items-center gap-2">
                <span className="ml-2 text-xs font-medium bg-gray-100 text-gray-500 rounded-full px-2 py-0.5">
                  {0}
                </span>

                <button
                  onClick={() => deleteColumn(column.id)}
                  className="p-1 rounded-md cursor-pointer text-red-500 hover:text-white hover:bg-red-500 transition-colors duration-200"
                >
                  <FiTrash2 size={14} />
                </button>
              </div>
            </div>

            {/* Tasks list */}
            {/* <div className="flex flex-col gap-2 p-3 flex-1">
              {column.tasks?.map((task) => (
                <div
                  key={task.id}
                  className="bg-gray-50 hover:bg-gray-100 transition-colors rounded-xl px-3 py-2.5 text-sm text-gray-700 cursor-pointer border border-gray-100"
                >
                  {task.title}
                </div>
              ))}

              <button className="mt-1 flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors py-1 px-1">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add task
              </button>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;
