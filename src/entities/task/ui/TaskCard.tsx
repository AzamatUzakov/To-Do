import React from "react";
import { GripVertical, Pencil, Trash2, Clock } from "lucide-react";
import { useTaskStore } from "@/features/task/model/TaskStore";

interface Task {
  id: string;
  title: string;
  description: string;
  columnId: string;
  priority: string;
  status: string;
  completed?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface TaskCardProps {
  task: Task;
}

const priorityConfig: Record<
  string,
  { label: string; dot: string; badge: string }
> = {
  high: {
    label: "Высокий",
    dot: "bg-rose-500",
    badge: "bg-rose-50 text-rose-600 border border-rose-200",
  },
  medium: {
    label: "Средний",
    dot: "bg-amber-400",
    badge: "bg-amber-50 text-amber-600 border border-amber-200",
  },
  low: {
    label: "Низкий",
    dot: "bg-emerald-400",
    badge: "bg-emerald-50 text-emerald-600 border border-emerald-200",
  },
};

const statusConfig: Record<string, { label: string; style: string }> = {
  todo: { label: "К выполнению", style: "bg-slate-100 text-slate-500" },
  "in-progress": { label: "В процессе", style: "bg-blue-100 text-blue-600" },
  done: { label: "Готово", style: "bg-emerald-100 text-emerald-600" },
};

function formatDate(iso?: string) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "short",
  });
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const priority = priorityConfig[task.priority] ?? priorityConfig.medium;
  const status = statusConfig[task.status] ?? statusConfig.todo;

  const openEditModal = useTaskStore((state) => state.openEditModal);

  const deleteTask = useTaskStore((state) => state.deleteTask);
  return (
    <div
      className="
        group relative w-full
        bg-white rounded-xl
        shadow-sm shadow-slate-100
        border border-slate-100
        transition-all duration-200
        hover:shadow-md hover:shadow-slate-200/70
        hover:-translate-y-px
        active:scale-[0.99]
      "
    >
      <div
        className="
          absolute top-0 left-4 right-4 h-[2px] rounded-b-full
          bg-gradient-to-r from-rose-400 via-violet-400 to-blue-400
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
        "
      />

      <div className="flex items-start gap-2 px-3 pt-3 pb-2">
        <button
          className="
            mt-px text-slate-300
            hover:text-slate-500
            cursor-grab active:cursor-grabbing
            transition-colors duration-150
          
            touch-none
          "
          aria-label="Перетащить задачу"
        >
          <GripVertical size={16} strokeWidth={2} />
        </button>

        <h3
          className={`
            flex-1 text-[13px] font-semibold leading-snug
            text-slate-800 tracking-tight
            min-w-0
            ${task.completed ? "line-through text-slate-400" : ""}
          `}
        >
          {task.title}
        </h3>

        <div
          className="
          cursor-pointer
            flex items-center gap-0.5 flex-shrink-0
            opacity-100 md:opacity-0 md:group-hover:opacity-100
            transition-opacity duration-200
          "
        >
          <button
            onClick={() => openEditModal(task.id)}
            className="
          cursor-pointer
              p-1.5 rounded-lg text-slate-400
              hover:text-violet-500 hover:bg-violet-50
              active:bg-violet-100
              transition-all duration-150
            "
            aria-label="Редактировать"
          >
            <Pencil size={12} strokeWidth={2.2} />
          </button>
          <button
            onClick={() => deleteTask(task.id)}
            className="
          cursor-pointer

              p-1.5 rounded-lg text-slate-400
              hover:text-rose-500 hover:bg-rose-50
              active:bg-rose-100
              transition-all duration-150
            "
            aria-label="Удалить"
          >
            <Trash2 size={12} strokeWidth={2.2} />
          </button>
        </div>
      </div>

      {task.description && (
        <p className="px-3 pb-3 text-[11.5px] text-slate-400 leading-relaxed pl-[46px] line-clamp-2">
          {task.description}
        </p>
      )}

      {/* Divider */}
      <div className="mx-3 h-px bg-slate-100" />

      {/* Footer */}
      <div className="flex items-center gap-1.5 px-3 py-2 flex-wrap">
        {/* Priority badge */}
        <span
          className={`
            flex items-center gap-1 px-2 py-0.5
            rounded-full text-[10px] font-semibold tracking-wide
            ${priority.badge}
          `}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${priority.dot}`}
          />
          {priority.label}
        </span>

        <span
          className={`
            px-2 py-0.5 rounded-full
            text-[10px] font-semibold tracking-wide
            ${status.style}
          `}
        >
          {status.label}
        </span>

        {task.createdAt && (
          <div className="flex items-center gap-1 text-[10px] text-slate-400 ml-auto">
            <Clock size={10} strokeWidth={2} />
            <span>{formatDate(task.createdAt)}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
