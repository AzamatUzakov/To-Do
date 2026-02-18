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

/* Стили как в code.html */
const priorityConfig: Record<
  string,
  { label: string; dot: string; badge: string }
> = {
  high: {
    label: "Высокий",
    dot: "bg-orange-500",
    badge:
      "bg-rose-50 text-rose-600 border border-rose-200 dark:bg-orange-500/10 dark:text-orange-400 dark:border-transparent",
  },
  medium: {
    label: "Средний",
    dot: "bg-primary",
    badge:
      "bg-amber-50 text-amber-600 border border-amber-200 dark:bg-primary/10 dark:text-primary dark:border-transparent",
  },
  low: {
    label: "Низкий",
    dot: "bg-slate-400",
    badge:
      "bg-emerald-50 text-emerald-600 border border-emerald-200 dark:bg-slate-700 dark:text-slate-400 dark:border-transparent",
  },
};

const statusConfig: Record<string, { label: string; style: string; glow?: string }> = {
  todo: {
    label: "К выполнению",
    style:
      "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400",
    glow: "task-glow-todo",
  },
  "in-progress": {
    label: "В процессе",
    style: "bg-blue-100 text-blue-600 dark:bg-primary/20 dark:text-primary",
    glow: "task-glow-progress",
  },
  done: {
    label: "Готово",
    style:
      "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400",
    glow: "task-glow-done",
  },
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
  const glowClass = status.glow ?? "";

  const openEditModal = useTaskStore((state) => state.openEditModal);
  const openViewTask = useTaskStore((state) => state.openViewTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        openViewTask(task.id);
      }}
      className={`
        cursor-pointer group relative w-full
        bg-white dark:bg-surface-dark rounded-xl p-4
        shadow-sm border border-slate-100 dark:border-slate-800
        transition-all duration-200 hover:border-slate-700
        hover:-translate-y-px active:scale-[0.99]
        ${glowClass}
      `}
    >
      <div className="flex items-start gap-2 mb-2">
        <button
          className="
            mt-px text-slate-300 dark:text-slate-500
            hover:text-slate-500 dark:hover:text-slate-300
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
            text-slate-800 dark:text-slate-100 tracking-tight
            min-w-0
            ${task.completed ? "line-through text-slate-400 dark:text-slate-500" : ""}
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
            onClick={(e) => {
              e.stopPropagation();
              openEditModal(task.id);
            }}
            className="
          cursor-pointer relative z-50 p-1 rounded-md
              text-slate-500 hover:text-primary dark:text-slate-500 dark:hover:text-primary
              transition-colors
            "
            aria-label="Редактировать"
          >
            <Pencil size={12} strokeWidth={2.2} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteTask(task.id);
            }}
            className="
          cursor-pointer relative z-50 p-1 rounded-md
              text-slate-500 hover:text-red-400 dark:text-slate-500 dark:hover:text-red-400
              transition-colors
            "
            aria-label="Удалить"
          >
            <Trash2 size={12} strokeWidth={2.2} />
          </button>
        </div>
      </div>

      {task.description && (
        <p className="text-xs text-slate-400 mb-4 line-clamp-2 leading-relaxed pl-[30px]">
          {task.description}
        </p>
      )}

      <div className="flex items-center justify-between gap-2 flex-wrap">
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
          <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
            <Clock size={10} strokeWidth={2} />
            <span>{formatDate(task.createdAt)}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
