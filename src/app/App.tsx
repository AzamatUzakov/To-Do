import Header from "../widgets/Header/Header";
import TaskDisplaySwitcher from "@/widgets/TaskDisplaySwitcher/TaskDisplaySwitcher";

function App() {
  return (
    <div className="mx-3 my-4 md:mx-10 my-5">
      <Header />
      <TaskDisplaySwitcher />
    </div>
  );
}

export default App;
