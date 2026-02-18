import { useTaskStore } from "@/features/task/model/TaskStore";
import TaskBoard from "./TaskBoard";
import EditTask from "@/features/task/ui/EditTask";
import ViewTask from "@/features/task/ui/ViewTask";

interface TaskDisplaySwitcherProps {}

const TaskDisplaySwitcher: React.FC<TaskDisplaySwitcherProps> = () => {
  const isEditModalOpen = useTaskStore((state) => state.isEditModalOpen);
  const editingTaskId = useTaskStore((state) => state.editingTaskId);

  const isViewModalOpen = useTaskStore((state) => state.isViewModalOpen);
  const viewTaskId = useTaskStore((state) => state.viewTaskId);

  return (
    <div className="min-h-[80vh] bg-gray-100 p-4 mt-3 rounded-2xl md:p-8">
      <TaskBoard />

      {isEditModalOpen && editingTaskId && <EditTask taskId={editingTaskId} />}
      {isViewModalOpen && viewTaskId && <ViewTask taskId={viewTaskId} />}
    </div>
  );
};

export default TaskDisplaySwitcher;
