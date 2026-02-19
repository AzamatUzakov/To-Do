import Search from "@/features/search/ui/Search";
import { useBoardStore } from "@/features/board/model/BoardStore";

import logo from "../../shared/assets/images/logo.svg";

import CreateBoard from "@/features/board/ui/CreateBoard";
import { useTaskStore } from "@/features/task/model/TaskStore";
import CreateTask from "@/features/task/ui/CreateTask";
import ViewToggle from "@/features/toggles/ui/ViewToggle";
import ThemeToggle from "@/features/toggles/ui/ThemeToggle";
import LanguageToggle from "@/features/toggles/ui/LanguageToggle";
import { useTranslation } from "react-i18next";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const openModalColumn = useBoardStore((state) => state.openModal);
  const isOpenModalColumn = useBoardStore((state) => state.isModalOpen);

  const openModalTask = useTaskStore((state) => state.openModal);
  const isOpenModalTask = useTaskStore((state) => state.isModalOpen);

  const {t} = useTranslation()

  return (
    <header className="dark:sticky dark:top-0 dark:z-50 dark:bg-background-dark/80 dark:backdrop-blur-md dark:border-b dark:border-slate-800 MB-2">
      <div className="flex justify-between items-center">
        <div className="flex w-[150px] gap-2">
          <img src={logo} className="w-[30px]" alt="logo" />
          <p className="font-bold text-[18px] text-foreground">TaskFlow</p>
        </div>
        <div className="hidden md:block w-[60%]">
          <Search />
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          <LanguageToggle />
        </div>
      </div>

      <div className="block md:hidden mt-4">
        <Search />
      </div>

      <div className="mt-3 flex justify-between md:mt-5">
        <ViewToggle />
        <div className="flex gap-3">
          <button
            onClick={openModalTask}
            className="bg-primary hover:bg-blue-600 cursor-pointer text-white font-medium text-[12px] flex justify-center items-center gap-1 md:text-[14px] px-3 md:px-4 h-[34px] rounded-xl hover:shadow-lg hover:shadow-primary/20 transition-all duration-200 active:scale-95"
          >
            <span className="text-xl">+</span>
        {t("header.createTask")}
          </button>
          <button
            onClick={openModalColumn}
            className="bg-primary hover:bg-blue-600 cursor-pointer text-white font-medium text-[12px] flex justify-center items-center gap-1 md:text-[14px] px-3 md:px-4 h-[34px] rounded-xl hover:shadow-lg hover:shadow-primary/20 transition-all duration-200 active:scale-95"
          >
            <span className="text-xl">+</span>
        {t("header.createColumn")}
          </button>
        </div>
      </div>
      {isOpenModalColumn && <CreateBoard />}
      {isOpenModalTask && <CreateTask />}
    </header>
  );
};

export default Header;
