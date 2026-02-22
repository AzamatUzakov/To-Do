import TaskCard from "@/entities/task/ui/TaskCard";
import { useTaskStore } from "@/features/task/model/TaskStore";
import React, { useEffect, useRef } from "react";

interface TaskListProps {}

const TaskList: React.FC<TaskListProps> = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const fetchTasks = useTaskStore((state) => state.fetchTasks);
  const reorderTasks = useTaskStore((state) => state.reorderTasks);

  const draggedIdRef = useRef<string | null>(null);
  const draggedOverIdRef = useRef<string | null>(null);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleDrop = () => {
    const draggedId = draggedIdRef.current;
    const overId = draggedOverIdRef.current;

    if (!draggedId || !overId || draggedId === overId) return;

    reorderTasks(draggedId, overId);

    draggedIdRef.current = null;
    draggedOverIdRef.current = null;
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row md:overflow-x-auto md:pb-4">
      <div className="flex flex-col gap-2  flex-1">
        {tasks.map((task) => (
          <div
            key={task.id}
            onDragOver={(e) => {
              e.preventDefault();
              draggedOverIdRef.current = task.id;
            }}
            onDrop={handleDrop}
          >
            <TaskCard
              task={task}
              onDragStart={() => (draggedIdRef.current = task.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
