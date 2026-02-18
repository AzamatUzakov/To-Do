import { useTaskStore } from "@/features/task/model/TaskStore";
import TaskBoard from "./TaskBoard";
import EditTask from "@/features/task/ui/EditTask";
import ViewTask from "@/features/task/ui/ViewTask";
import TaskList from "./TaskList";
import { switchViewStore } from "@/features/toggles/model/ViewToggleStore";

interface TaskDisplaySwitcherProps {}

const TaskDisplaySwitcher: React.FC<TaskDisplaySwitcherProps> = () => {
  const isEditModalOpen = useTaskStore((state) => state.isEditModalOpen);
  const editingTaskId = useTaskStore((state) => state.editingTaskId);

  const isViewModalOpen = useTaskStore((state) => state.isViewModalOpen);
  const viewTaskId = useTaskStore((state) => state.viewTaskId);

  const viewMode = switchViewStore((state) => state.viewMode);

  return (
    <div className="min-h-[80vh] p-4 mt-5 rounded-2xl bg-gray-100 dark:bg-[rgba(36,99,235,0.2)] md:p-8">
      {viewMode === "Kanban" ? <TaskBoard /> : <TaskList />}{" "}
      {isEditModalOpen && editingTaskId && <EditTask taskId={editingTaskId} />}
      {isViewModalOpen && viewTaskId && <ViewTask taskId={viewTaskId} />}
    </div>
  );
};

export default TaskDisplaySwitcher;
