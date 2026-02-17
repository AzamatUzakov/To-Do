import TaskBoard from "@/widgets/TaskDisplaySwitcher/TaskBoard";
import Header from "../widgets/Header/Header";
import CreateBoard from "@/features/board/ui/CreateBoard";

function App() {
  return (
    <div className="mx-3 my-4 md:mx-10 my-5">
      <Header />
      <TaskBoard />
    </div>
  );
}

export default App;
