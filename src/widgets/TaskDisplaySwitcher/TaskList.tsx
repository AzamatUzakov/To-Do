import TaskCard from "@/entities/task/ui/TaskCard";
import { useTaskStore } from "@/features/task/model/TaskStore";
import React, { useEffect } from "react";

interface TaskListProps {}

const TaskList: React.FC<TaskListProps> = () => {
  const tasks = useTaskStore((state) => state.tasks);

  const fetchTasks = useTaskStore((state) => state.fetchTasks);
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="flex flex-col gap-4 md:flex-row md:overflow-x-auto md:pb-4">
      <div className="flex flex-col gap-2  flex-1">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
