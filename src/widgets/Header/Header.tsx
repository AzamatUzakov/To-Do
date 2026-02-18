import React, { useState } from "react";
import Search from "@/features/search/Search";
import { useBoardStore } from "@/features/board/model/BoardStore";

import logo from "../../shared/assets/images/logo.svg";

import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { Flex, Segmented } from "antd";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../shared/ui/select";
import CreateBoard from "@/features/board/ui/CreateBoard";
import { useTaskStore } from "@/features/task/model/TaskStore";
import CreateTask from "@/features/task/ui/CreateTask";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const openModalColumn = useBoardStore((state) => state.openModal);
  const isOpenModalColumn = useBoardStore((state) => state.isModalOpen);

  const openModalTask = useTaskStore((state) => state.openModal);
  const isOpenModalTask = useTaskStore((state) => state.isModalOpen);

  return (
    <header>
      <div className="flex justify-between items-center">
        <div className="flex w-[150px] gap-2">
          <img src={logo} className="w-[30px]" alt="logo" />
          <p className="font-bold text-[18px]">TaskFlow</p>
        </div>
        <div className="hidden md:block w-[60%]">
          <Search />
        </div>

        <div className="flex items-center gap-3">
          <Flex gap="small" align="flex-start" vertical>
            <Segmented
              shape="round"
              options={[
                { value: "light", icon: <SunOutlined /> },
                { value: "dark", icon: <MoonOutlined /> },
              ]}
            />
          </Flex>

          <Select defaultValue="ru">
            <SelectTrigger className="cursor-pointer h-[34px]">
              <SelectValue placeholder="Language" />
            </SelectTrigger>

            <SelectContent className="cursor-pointer w-[40px] bg-white">
              <SelectGroup>
                <SelectItem
                  value="ru"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  RU
                </SelectItem>

                <SelectItem
                  value="en"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  EN
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="block md:hidden mt-4">
        <Search />
      </div>

      <div className="mt-3 flex justify-between md:mt-5">
        <Segmented
          orientation="horizontal"
          options={[
            { value: "List", icon: <BarsOutlined /> },
            { value: "Kanban", icon: <AppstoreOutlined /> },
          ]}
        />
        <div className="flex gap-3">
          <button
            onClick={openModalTask}
            className="bg-blue-600 cursor-pointer text-white font-medium text-[12px] flex justify-center items-center gap-1 md:text-[14px] px-3 md:px-4 h-[34px] rounded-full hover:bg-blue-700 transition-colors duration-200"
          >
            <span className="text-xl">+</span>
            Создать задачу
          </button>
          <button
            onClick={openModalColumn}
            className="bg-blue-600 cursor-pointer text-white font-medium text-[12px] flex justify-center items-center gap-1 md:text-[14px] px-3 md:px-4 h-[34px] rounded-full hover:bg-blue-700 transition-colors duration-200"
          >
            <span className="text-xl">+</span>
            Создать Колонку
          </button>
        </div>
      </div>
      {isOpenModalColumn && <CreateBoard />}
      {isOpenModalTask && <CreateTask />}

    </header>
  );
};

export default Header;
