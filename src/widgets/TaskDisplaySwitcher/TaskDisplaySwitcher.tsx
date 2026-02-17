import TaskBoard from "./TaskBoard";

interface TaskDisplaySwitcherProps {}

const TaskDisplaySwitcher: React.FC<TaskDisplaySwitcherProps> = () => {
  return (
    <div className="min-h-screen bg-gray-600 p-4 md:p-8">
      <TaskBoard />
    </div>
  );
};

export default TaskDisplaySwitcher;
